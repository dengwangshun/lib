import p from "./hmac.ts";

const { id, date, requestKey } = await p("GET");

const url =
  "https://seat.bjfu.edu.cn/rest/auth?username=200501301&password=0K%40SKHEZ%5D2)RV%5DL3";
const options = {
  method: "GET",
  headers: {
    Connection: "keep-alive",
    loginType: "APPLET",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6945",
    actCode: "true",
    "Content-Type": "application/json",
    xweb_xhr: "1",
    user_ip: "1.1.1.1",
    "x-hmac-request-key": requestKey,
    "x-request-date": date.toString(),
    "x-request-id": id,
    Accept: "*/*",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh",
  },
};

const response = await fetch(url, options);
console.log(await response.json());
