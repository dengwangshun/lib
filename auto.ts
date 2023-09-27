import SEAT from "./seat.ts";
import captchaImg from "./image.ts";
import captcha from "./captcha.ts";

const username = "200501301";
const password = "0K@SKHEZ]2)RV]L3";

// const username = "200501307";
// const token = "ef2f3feb85bbcfa5a674e4f0d441f1644621326f27211808";

await delay(17, 58, 0, 0);
console.log(new Date());

const seat = new SEAT(username, password);
await seat.login();

const triggerTime = new Date().setHours(18, 0, 0, 0);
const targetDay = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${(new Date().getDate() + 1).toString().padStart(2, "0")}`;

while (Date.now() < triggerTime) {
  try {
    const status = await seat.room(targetDay);
    console.log(status[0]);

    if (status[0].free !== 0) {
      break;
    }
  } catch (error) {
    console.error(error);
  }
  await new Promise((resolve) => setTimeout(resolve, 250));
}

let captchaTokens = "";

for (let i = 0; i < 10; i++) {
  const data = await seat.loadCaptchaImg();
  const image = await captchaImg(data.wordImage, data.image);

  const position = await captcha(image);

  const checkResult = await seat.checkCaptcha(data.token, position);
  if (checkResult.status == "OK") {
    captchaTokens = data.token;
    break;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
}

if (captchaTokens == "") {
  throw new Error("Captcha failed");
}

// await delay(18, 0, 0, 0);

console.log(new Date());
const bookResult = await seat.book(22294, targetDay, 570, 1380, captchaTokens);
// console.log(bookResult);

function delay(h: number, m: number, s: number, ms: number) {
  const now = Date.now();
  const millis = new Date(now).setHours(h, m, s, ms) - now;
  console.log(millis / 1000, "s");
  return new Promise((resolve) => setTimeout(resolve, millis));
}
