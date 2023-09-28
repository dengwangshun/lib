import SEAT from "../seat.ts";

const seat = new SEAT(
  "200501301",
  "0K@SKHEZ]2)RV]L3"
  // "d36b3db6a9d7ff5a062e7ac0911fd65b7af41eaf27102446"
);

await seat.login();

// const captchaDate = [];

// for (let i = 0; i < 10; i++) {
//   const data = await seat.loadCaptchaImg();
//     captchaDate.push(data);
// }

let captchaTokens = "";

for (let i = 0; i < 10; i++) {
  try {
    const data = await seat.loadCaptchaImg();
    // const image = await captchaImg(data.wordImage, data.image);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // const position = await captcha(image);
    const position = { x: 188, y: 63 };

    const checkResult = await seat.checkCaptcha(data.token, position);
    if (checkResult.status == "OK") {
      captchaTokens = data.token;
      break;
    }
  } catch (error) {
    console.error(error);
  }

  //   await new Promise((resolve) => setTimeout(resolve, 1000));
}
