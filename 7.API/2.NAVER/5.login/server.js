import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const NAVER_AUTH_REDIRECT_URI = process.env.NAVER_AUTH_REDIRECT_URI;

const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
// https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=CLIENT_ID&state=STATE_STRING&redirect_uri=CALLBACK_URL
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';
// https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=jyvqXeaVOVmV&client_secret=527300A0_COq1_XV33cf&code=EIc5bFrl4RibFls1&state=9kgsGTfH4j7IyAkg
const NAVER_USERINFO_URL = 'https://openapi.naver.com/v1/nid/me';


app.use(express.static('public'));
app.use(morgan('dev'));


// Routes
app.get('/login', (req, res) => {
  // *** 1단계. 사용자를 네이버로 보내서 로그인할 수 있게 한다. ***
  // ※ 이 URL은 사용자 브라우저가 리디렉션하게 만들어서 사용자 브라우저 주소창에 보이므로, 규약에 client_secret은 넣지 않도록 되어 있다.
  const authURL = `${NAVER_AUTH_URL}?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_AUTH_REDIRECT_URI}&state=login`
  res.redirect(authURL);
});

// 사용자가 로그인했을 때 Callback URL - http://127.0.0.1:3000/api/oauth2/callback?code=Ykf5BGcp4BspXCF2PM&state=login
app.get('/api/oauth2/callback', async (req, res) => {
  const { code, state } = req.query;
  console.log(`사용자가 로그인 후 받아온 정보. code: ${code} / state: ${state}`);

  // *** 2단계. 사용자가 받아온 코드를 검증한다. ***
  // 사용자가 가지고 온 code가 네이버에서 발급해준 코드가 맞는지, BE에서 직접 네이버에게 물어본다.
  // (악의적인 사용자가 정보를 조작했을 수도 있으므로)
  // ※ BE에서 네이버에 직접 요청하는 URL이라서 사용자 브라우저 주소창에 보이지 않으므로, 이때는 client_secret 넣도록 되어 있다.
  const tokenUrl = new URL(NAVER_TOKEN_URL);
  tokenUrl.search = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: NAVER_CLIENT_ID,
    client_secret: NAVER_CLIENT_SECRET,
    code: code,
    state: state
  });

  // 아래와 같이 기존 방식(Query Parameter)대로 해도 된다.
  // https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=아이디&client_secret=비밀키&code=받은코드&state=9kgsGTfH4j7IyAkg
  // const tokenUrl2 =
  //   `${NAVER_TOKEN_URL}` +
  //   'grant_type=authorization_code' +
  //   `client_id=${NAVER_CLIENT_ID}` +
  //   `client_secret=${NAVER_CLIENT_SECRET}` +
  //   `code=${code}` +
  //   `state=${state}`;


  // callback URL 쿼리 파라미터를 통해서 받은 요청 정보를 조합해서 네이버에 Access Token 요청
  const token = await fetch(tokenUrl.toString());
  const tokenData = await token.json();
  console.log('Naver에 사용자 코드를 가지고 Access Token를 요청해서 받은 정보', tokenData);


  // *** 3단계. 네이버에서 코드 검증 후 발급한 접근 토근(Access Token)을 이용해서 사용자 정보를 받아온다. ***
  console.log('Naver에서 발급한 Access Token:', tokenData.access_token);
  const userInfoRes = await fetch(NAVER_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  if (!userInfoRes.ok) {
    throw new Error(`UserInfo 요청 실패: ${userInfoRes.status} `);
  }
  const userInfoData = await userInfoRes.json();
  console.log('Access Token을 가지고 요청한 사용자 정보:', userInfoData);

  res.json(userInfoData); // FE에서 원하는 헝태로 정보를 가공해서 FE에 응답 전송
  // res.json({ 'result': 'success' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
