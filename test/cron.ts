function delay(h: number, m: number, s: number, ms: number) {
  const now = Date.now();
  const millis = new Date(now).setHours(h, m, s, ms) - now;
  console.log(millis / 1000, "s");
  return new Promise((resolve) => setTimeout(resolve, millis));
}

await delay()

console.log(new Date())