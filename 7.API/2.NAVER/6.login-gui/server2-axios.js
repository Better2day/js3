import path from 'path';
// import { fileURLToPath } from 'url';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const NAVER_AUTH_REDIRECT_URI = process.env.NAVER_AUTH_REDIRECT_URI;

const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
// https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=CLIENT_ID&state=STATE_STRING&redirect_uri=CALLBACK_URL
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';
// https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=jyvqXeaVOVmV&client_secret=527300A0_COq1_XV33cf&code=EIc5bFrl4RibFls1&state=9kgsGTfH4j7IyAkg
const NAVER_USERINFO_URL = 'https://openapi.naver.com/v1/nid/me';


app.use(express.static('public'));

// 0. Express Session 설정
app.use(session({
  secret: 'oauth-login-user-basic',
  resave: false,
  saveUninitialized: true
}));
app.use(morgan('dev'));


// Auth Middleware
function checkLogin(req, res, next) {
  if (req.session.user) return next();

  res.status(403).sendFile(path.join(import.meta.dirname, 'public', 'error.html'));
}

// Routes
/*******************
 *   Page Request
 *******************/
app.get('/login', (req, res) => {
  // *** 1단계. 사용자를 네이버로 보내서 로그인할 수 있게 한다. ***
  // ※ 이 URL은 사용자 브라우저가 리디렉션하게 만들어서 사용자 브라우저 주소창에 보이므로, 규약에 client_secret은 넣지 않도록 되어 있다.
  const authURL = `${NAVER_AUTH_URL}?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_AUTH_REDIRECT_URI}&state=SESAC`
  res.redirect(authURL);
});

app.get('/dashboard', checkLogin, (req, res) => {
  // console.log(import.meta.url);
  res.sendFile(path.join(import.meta.dirname, 'public', 'dashboard.html'));
});

// 1. 사용자 페이지 전달
app.get('/user', checkLogin, (req, res) => {
  // console.log('import.meta.dirname:', import.meta.dirname);
  // console.log('fileURLToPath(import.meta.url):', fileURLToPath(import.meta.url));
  res.sendFile(path.join(import.meta.dirname, 'public', 'user.html'));
});

app.get('/error', (req, res) => {
  res.sendFile(path.join(import.meta.dirname, 'public', 'error.html'));
});

// 4. 사용자 로그아웃 처리 (네이버 계정 로그아웃이 아니라 내 웹사이트 세션 로그아웃)
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
});

// 5
// 5-1. / (root)에 접속
// 5-2. 네이버 로그인 → 성공시 dashboard로 보내기 (/dashboard)
// 5-3. 사용자 페이지 가보기 (/user)
// 5-4. 대시보드에 있는 로그아웃하기 → 로그아웃되었으면 root로 보내기 ( / )
// 5-9. 로그인하지 않은 상태에서 /dashboard or /user 등으로 가기 → 이걸 error.html로 보내는 기능 만들기
//      사용자가 회원 권한이 필요한 페이지로 갈 때마다, 가기 전에 미들웨어에 들러서 인증된 사용자인지 확인받는다 (세션 유무 판단)        
//      로그인하지 않은 사용자면 /error.html로 보낸다.

/******************
 *   API Request
 ******************/

// 2. 세션에 저장해둔 사용자 정보 전달하기 (json 형태 정보로 FE에 응답 전송)
app.get('/api/user', (req, res) => {
  console.log('req.session.user:', req.session.user);

  if (req.session?.user) {
    res.json(req.session.user);
  }
});

// 3. 로그인 성공시 아래 함수 안에서 서버 세션에 사용자 정보를 저장하도록 처리
// 1단계에서의 NAVER_AUTH_REDIRECT_URI = Callback URL (http://127.0.0.1:3000/api/oauth2/callback)
// 사용자가 네이버 로그인에 성공하면, 네이버에서는 이 URL에 code와 state 값을 쿼리 파라미터형태로 더해서 아래와 같은 URL을 만들고
// http://127.0.0.1:3000/api/oauth2/callback?code=Ykf5BGcp4BspXCF2PM&state=login  사용자 브라우저를 여기로 리디렉션
app.get('/api/oauth2/callback', async (req, res) => {
  const { code, state } = req.query;
  console.log(`사용자가 로그인 후 받아온 정보. code: ${code} / state: ${state}`);

  // *** 2단계. 사용자가 받아온 코드를 검증한다. ***
  // 사용자가 가지고 온 code가 네이버에서 발급해준 코드가 맞는지, BE에서 직접 네이버에게 물어본다.
  // (악의적인 사용자가 정보를 조작했을 수도 있으므로)
  // ※ BE에서 네이버에 직접 요청하는 URL이라서 사용자 브라우저 주소창에 보이지 않으므로, 이때는 client_secret 넣도록 되어 있다.
  // const tokenUrl = new URL(NAVER_TOKEN_URL);
  // tokenUrl.search = new URLSearchParams({
  //   grant_type: 'authorization_code',
  //   client_id: NAVER_CLIENT_ID,
  //   client_secret: NAVER_CLIENT_SECRET,
  //   code: code,
  //   state: state
  // });

  // 아래와 같이 기존 방식대로(Query Parameter 방식으로 해도 된다.)
  // https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=아이디&client_secret=비밀키&code=받은코드&state=9kgsGTfH4j7IyAkg
  const tokenUrl =
    `${NAVER_TOKEN_URL}` +
    'grant_type=authorization_code' +
    `client_id=${NAVER_CLIENT_ID}` +
    `client_secret=${NAVER_CLIENT_SECRET}` +
    `code=${code}` +
    `state=${state}`;

  // callback URL 쿼리 파라미터를 통해서 받은 요청 정보를 조합해서 네이버에 Access Token 요청
  const tokenRes = await axios.get(NAVER_TOKEN_URL, {
    params: {
      grant_type: 'authorization_code',
      client_id: NAVER_CLIENT_ID,
      client_secret: NAVER_CLIENT_SECRET,
      code: code,
      state: state
    }
  });
  const tokenData = tokenRes.data;
  console.log('요청해서 받은 최종 token:', tokenData);

  // *** 3단계. 네이버에서 코드 검증 후 발급한 접근 토근(Access Token)을 이용해서 사용자 정보를 받아온다. ***
  console.log('필요한 Access Token:', tokenData.access_token);
  const userInfoRes = await axios.get(NAVER_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  const userInfoData = userInfoRes.data;

  const userInfo = userInfoData.response;
  // 세션에 로그인 사용자 정보 저장
  req.session.user = {
    id: userInfo.id,
    name: userInfo.name || '미공개',
    nickname: userInfo.nickname || '미공개',
    email: userInfo.email,
    profile_image: userInfo.profile_image || null,
    age: userInfo.age || '미공개',
    gender:
      userInfo.gender === 'M'
        ? '남'
        : userInfo.gender === 'F'
          ? '여'
          : '미공개',
    birthdate: userInfo.birthyear + '-' + userInfo.birthday || '미공개',
    mobile: userInfo.mobile || '미공개',
  };

  res.redirect('/dashboard'); // 로그인 후 대시보드로 보내기
  // res.json(userInfoData); // 내가 원하는 정보를 가공해서 FE에 보내기
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
