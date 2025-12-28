import { createHash, verify } from "crypto";

export async function hashEmail(email: string): Promise<string> {
  if (typeof window !== "undefined") {
    return hashEmailBrowser(email);
  }
  return createHash("sha384").update(email).digest("hex");
}

async function hashEmailBrowser(email: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest("SHA-384", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyUserSignature(
  emailHash: string,
  signature: string,
  publicKey: string
): Promise<boolean> {
  try {
    if (typeof window !== "undefined") {
      return verifySignatureBrowser(emailHash, signature, publicKey);
    }
    return verify(
      "sha384",
      Buffer.from(emailHash),
      { key: publicKey, padding: 1 },
      Buffer.from(signature, "base64")
    );
  } catch {
    return false;
  }
}

async function verifySignatureBrowser(
  emailHash: string,
  signature: string,
  publicKeyPem: string
): Promise<boolean> {
  try {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = publicKeyPem
      .replace(pemHeader, "")
      .replace(pemFooter, "")
      .replace(/\s/g, "");

    const binaryDer = atob(pemContents);
    const binaryDerArray = new Uint8Array(binaryDer.length);
    for (let i = 0; i < binaryDer.length; i++) {
      binaryDerArray[i] = binaryDer.charCodeAt(i);
    }

    const publicKey = await crypto.subtle.importKey(
      "spki",
      binaryDerArray.buffer,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-384" },
      false,
      ["verify"]
    );

    const signatureBytes = Uint8Array.from(atob(signature), (c) => c.charCodeAt(0));
    const dataBytes = new TextEncoder().encode(emailHash);

    return await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      publicKey,
      signatureBytes,
      dataBytes
    );
  } catch {
    return false;
  }
}
