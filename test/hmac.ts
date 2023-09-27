async function p(method: string) {
  const t = crypto.randomUUID();
  const n = new Date().getTime();
  const r = "seat::" + t + "::" + n + "::" + method.toUpperCase();

  const o = "leos3cr3t";
  const s = await hmacSha256(r, o);

  return {
    id: t,
    date: n,
    requestKey: s,
  };
}

async function hmacSha256(message: string, key: string): Promise<string> {
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

export default p;
