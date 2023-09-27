import p from "./hmac.ts";

const { id, date, requestKey } = await p("GET");

const response = await fetch(
  "https://seat.bjfu.edu.cn/rest/v2/history/1/10?page=1&pageSize=10&token=token=b7ac444dde8e0510cc7a4138adee8d0826bf267026220431",
  {
    headers: {
      accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
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
