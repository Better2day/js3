const express = require("express");
// const got = require("got");
const axios = require("axios");
const { resolve } = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
// 최종 배포 코드일 때는 아래 키 커밋하지 말고, dotenv로 대체할 것. 아래는 코드에서 시험용
const secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

app.post("/confirm", async (req, res) => {
  var { paymentKey, orderId, amount } = req.body;

  // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
  // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
  // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
  var encryptedSecretKey = "Basic " + Buffer.from(secretKey + ":").toString("base64");

  // 결제 승인 API를 호출하세요.
  // 결제를 승인하면 결제수단에서 금액이 차감돼요.
  // @docs https://docs.tosspayments.com/guides/v2/payment-widget/integration#3-결제-승인하기
  /* 
  got
    .post("https://api.tosspayments.com/v1/payments/confirm", {
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
      json: {
        orderId: orderId,
        amount: amount,
        paymentKey: paymentKey,
      },
      responseType: "json",
    })
    .then(function (response) {
      // TODO: 결제 완료 비즈니스 로직을 구현하세요.
      console.log(response.body);
      res.status(response.statusCode).json(response.body);
    })
    .catch(function (error) {
      // TODO: 결제 실패 비즈니스 로직을 구현하세요.
      console.log(error.response.body);
      res.status(error.response.statusCode).json(error.response.body);
    });
     */
  try {
    const response = await axios.post("https://api.tosspayments.com/v1/payments/confirm",
      {
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        }
      },
      {
        orderId,
        amount,
        paymentKey
      }
    )

    // TODO: 결제 완료 비즈니스 로직을 구현하세요.
    console.log(response.data); // axios에서는 결과가 data에 들어온다.
    // 결제 성공 후에, 내 ID, 가격 등이 올바른 값으로 진행됐는지 검증, DB 저장 등 (시간 부족해서 수업에서는 못 함)

    res.status(response.status).json(response.data);
  } catch (error) {
    // TODO: 결제 실패 비즈니스 로직을 구현하세요.
    if (error.response) {
      console.log(error.response.status).json(error.response.data);
    } else {
      console.log(error.response.body);
      res.status(500).json({ message: '결제 승인 실패' });

    }

    res.status(error.response.status).json(error.response.body);
  }
});

// 이 라우트 타지 않고, express.static을 통해서 index가 제공될 것이다.
app.get('/', (req, res) => {
  const path = resolve('./public/product.html');
  res.sendFile(path);
});

app.get("/checkout", (req, res) => {
  var path = resolve("./public/checkout.html");
  res.sendFile(path);
});

app.get("/success", (req, res) => {
  var path = resolve("./public/success.html");
  res.sendFile(path);
});

app.get("/fail", (req, res) => {
  var path = resolve("./public/fail.html");
  res.sendFile(path);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT} 으로 샘플 앱이 실행되었습니다.`));
