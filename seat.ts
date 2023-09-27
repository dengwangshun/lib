import { encode } from "https://deno.land/std/encoding/base64.ts";

class SEAT {
  baseUrl = "https://seat.bjfu.edu.cn";
  token: string;
  username: string;
  password: string;
  // userId: string;

  constructor(username: string, password: string, token?: string) {
    this.username = username;
    this.password = password;
    this.token = token || "";
  }

  async fetch(path: string, options: RequestInit = {}) {
    const method = options.method || "GET";
    const { id, date, requestKey } = await this.p(method);

    const headers = {
      loginType: "APPLET",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6945",
      actCode: "true",
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

      ...options.headers,
    };

    console.debug(this.baseUrl + path);
    const response = await fetch(this.baseUrl + path, {
      ...options,
      headers,
    });

    return await response.json();
  }

  async p(method: string) {
    const t = crypto.randomUUID();
    const n = new Date().getTime();
    const r = "seat::" + t + "::" + n + "::" + method.toUpperCase();

    const o = "leos3cr3t";
    const s = await this.hmacSha256(r, o);

    return {
      id: t,
      date: n,
      requestKey: s,
    };
  }

  async hmacSha256(message: string, key: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyBuf = encoder.encode(key);
    const importedKey = await crypto.subtle.importKey(
      "raw",
      keyBuf,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const data = encoder.encode(message);
    const signature = await crypto.subtle.sign("HMAC", importedKey, data);

    return Array.from(new Uint8Array(signature), (byte) =>
      byte.toString(16).padStart(2, "0")
    ).join("");
  }

  async login() {
    const response = await this.fetch(
      `/rest/auth?username=${this.username}&password=${encodeURI(
        this.password
      )}`
    );

    console.debug(response);

    if (response.status !== "success") {
      throw new Error("Login failed");
    }

    this.token = response.data.token;
  }

  async loadCaptchaImg() {
    const response = await this.fetch(
      `/cap/captcha/${this.token}?username=${this.username}`,
      {
        method: "POST",
      }
    );

    console.debug(response);
    if (response.status !== "OK") {
      throw new Error("Load captcha failed");
    }

    return response;
  }

  async checkCaptcha(token: string, position: { x: number; y: number }) {
    const response = await this.fetch(
      `/cap/checkCaptcha?` +
        new URLSearchParams({
          a: encode(new TextEncoder().encode(JSON.stringify([position]))),
          token,
          // userId: "8937",
          username: this.username,
        })
    );

    console.debug(response);
    if (response.status !== "OK") {
      throw new Error("Check captcha failed");
      // console.log("Check captcha failed");
    }

    return response;
  }

  async book(
    seat: number,
    date: string,
    startTime: number,
    endTime: number,
    authid: string
  ) {
    const response = await this.fetch(`/rest/v2/freeBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: this.token,
        startTime: startTime.toString(),
        endTime: endTime.toString(),
        seat: seat.toString(),
        date,
        authid,
      }),
    });

    console.info(response);
    if (response.status !== "success") {
      throw new Error("Book failed");
    }

    return response;
  }

  async room(date: string) {
    const response = await this.fetch(`/rest/v2/room/stats2/1/${date}`, {
      headers: {
        token: this.token,
      },
    });

    console.debug(response);

    if (response.status !== "success") {
      throw new Error("Room failed");
    }

    return response.data;
  }
}

const seat = new SEAT(
  "200501301",
  "0K@SKHEZ]2)RV]L3"
  // "d36b3db6a9d7ff5a062e7ac0911fd65b7af41eaf27102446"
);
// // await seat.login();
// const { token } = await seat.loadCaptchaImg();
// await seat.checkCaptcha(token, { x: 188, y: 63 });
// await seat.book(17701, "2022-02-22", 1290, 1320, token);

await seat.login();
// await seat.room("2023-09-26");

for (let i = 0; i < 10; i++) {
  const info = await seat.room("2023-09-26");
  console.log(info);
  await new Promise((resolve) => setTimeout(resolve, 50));
}

export default SEAT;
