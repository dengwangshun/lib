import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";

import SEAT from "./seat.ts";

const app = new Application();
const router = new Router();

const captchaTokens: string[] = [];

const seat = new SEAT("200501301", "0K@SKHEZ]2)RV]L3");

await seat.login();

router.get("/login", async (ctx: Context) => {});

router.get("/captcha", async (ctx: Context) => {
  const data = await seat.loadCaptchaImg();
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.body = data;
});

router.options("/checkCaptcha", (ctx: Context) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  ctx.response.body = "";
});

router.post("/checkCaptcha", async (ctx: Context) => {
  const { token, position } = await ctx.request.body().value;
  console.log(token, position);
  const data = await seat.checkCaptcha(token, position);
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  if (data.status === "OK") {
    captchaTokens.push(token);
  }
  ctx.response.body = data;
});

router.get("/book", async (ctx: Context) => {
  // const { seat, date, startTime, endTime, authid } = ctx.request.url.searchParams;

  const authid = captchaTokens.pop();

  if (authid === undefined) {
    ctx.response.body = "No captcha token";
    return;
  }

  const delay = 1000 * 15;
  console.log(`${authid}: ${delay / 1000}s`);
  await new Promise((resolve) => setTimeout(resolve, delay));

  const data = await seat.book(17680, "2023-09-28", 1290, 1320, authid);
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.body = data;
});

app.use(router.routes());

app.use((ctx: Context) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
