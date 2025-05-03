import CryptoJS from "crypto-js";
import LZString from "lz-string";

export async function encryptJSON(
  jsonData: object,
  secretKey: string | CryptoJS.lib.WordArray
) {
  try {
    // Validate input
    if (!jsonData || typeof jsonData !== "object") {
      throw new Error("Input must be a valid JSON object");
    }

    // Stringify the JSON
    const jsonString = JSON.stringify(jsonData);

    // Compress the JSON string using LZ-String
    const compressedString = LZString.compressToBase64(jsonString);

    // Generate a 16-byte salt
    const salt = CryptoJS.lib.WordArray.random(16);

    // Derive key using PBKDF2
    const key = CryptoJS.PBKDF2(secretKey, salt, {
      keySize: 256 / 32,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA256,
    });

    // Generate a random IV
    const iv = CryptoJS.lib.WordArray.random(16);

    // Encrypt the compressed string
    const encrypted = CryptoJS.AES.encrypt(compressedString, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Combine salt, iv, and encrypted data
    const combinedData = salt.concat(iv).concat(encrypted.ciphertext);

    // Convert to base64 and make URL-safe
    const base64Encoded = combinedData
      .toString(CryptoJS.enc.Base64)
      .replace(/\+/g, "-") // Replace + with -
      .replace(/\//g, "_") // Replace / with _
      .replace(/=+$/, ""); // Remove trailing = padding

    // Ensure the result is under 2000 characters
    return base64Encoded.slice(0, 1990);
  } catch (error) {
    console.error("Encryption error:", error);
    throw error;
  }
}
