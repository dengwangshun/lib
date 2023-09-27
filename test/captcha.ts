import { encode } from "https://deno.land/std/encoding/base64.ts";
import p from "./hmac.ts";
import saveImage from "./save.ts";

// console.log(encode(new TextEncoder().encode('[{"x":261,"y":49}]')));

async function loadCaptchaImg(token: string, username: string) {
  const { id, date, requestKey } = await p("GET");
  const response = await fetch(
    `https://seat.bjfu.edu.cn/cap/captcha/${token}?username=${username}`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        logintype: "MOBILE",
        "sec-ch-ua":
          '"Microsoft Edge";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-hmac-request-key": requestKey,
        "x-request-date": date.toString(),
        "x-request-id": id,
        Referer: "https://seat.bjfu.edu.cn/libseat/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "POST",
    }
  );

  //   console.log(await response.json());

  return await response.json();
}

async function checkCaptcha(
  token: string,
  username: string,
  positon: { x: number; y: number }
) {
  const { id, date, requestKey } = await p("GET");
  const response = await fetch(
    // "https://seat.bjfu.edu.cn/cap/checkCaptcha?a=W3sieCI6MTg4LCJ5Ijo2M31d&token=9aa6f18a653e449f9f58778fdc511633&userId=8937&username=200501301",
    `https://seat.bjfu.edu.cn/cap/checkCaptcha?` +
      new URLSearchParams({
        a: encode(new TextEncoder().encode(JSON.stringify([positon]))),
        token,
        userId: "8937",
        username,
      }),
    {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        logintype: "MOBILE",
        "sec-ch-ua":
          '"Microsoft Edge";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-hmac-request-key": requestKey,
        "x-request-date": date.toString(),
        "x-request-id": id,
        Referer: "https://seat.bjfu.edu.cn/libseat/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );

  console.log(await response.json());
}

const token = "538f6521ce1c7e8e2bf199da200b813d569f2e5b26220928";
const username = "200501301";

// const data = await loadCaptchaImg(token, username);

// console.log(data.token);
// saveImage("captcha", data.image);
// saveImage("captcha_word", data.wordImage);
await checkCaptcha("11b691509348446bb2a55e762d8c2961", username, {
  x: 70,
  y: 70,
});
