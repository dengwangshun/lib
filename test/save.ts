async function saveImage(filename: string, base64String: string) {
  const base64Data = base64String.split(",")[1];
  const uint8Array = new Uint8Array(
    atob(base64Data)
      .split("")
      .map((c) => c.charCodeAt(0))
  );
  await Deno.writeFile(
    filename + "." + base64String.split(";")[0].split("/")[1],
    uint8Array
  );
}

export default saveImage;
