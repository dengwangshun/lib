import SEAT from "./seat.ts";
import captchaImg from "./image.ts";
import captcha from "./captcha.ts";

const username = "200501301";
const password = "0K@SKHEZ]2)RV]L3";

const seat = new SEAT(username, password);
await seat.login();

const data = await seat.loadCaptchaImg();
const image = await captchaImg(data.wordImage, data.image);

const position = await captcha(image);

const checkResult = await seat.checkCaptcha(data.token, position);

if (checkResult.status !== "OK") {
  throw new Error("Check captcha failed");
}

const bookResult = await seat.book(17680, "2023-09-28", 1290, 1320, data.token);
console.log(bookResult);
