import { createCanvas, loadImage } from "https://deno.land/x/canvas/mod.ts";

export default async function captchaImg(
  wordImageBase: string,
  imageBase: string
): Promise<string> {
  const wordImage = await loadImage(wordImageBase);
  const image = await loadImage(imageBase);

  const canvas = createCanvas(
    Math.max(wordImage.width(), image.width()),
    wordImage.height() + image.height()
  );
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);

  ctx.drawImage(wordImage, 0, image.height());

  const base64 = canvas.toDataURL("image/jpg");

  return base64;
}


