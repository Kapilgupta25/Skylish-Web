import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;
const SALT_BYTES = 16;

function getPasswordPepper() {
  const pepper = process.env.AUTH_PASSWORD_PEPPER;

  if (!pepper) {
    throw new Error("Missing AUTH_PASSWORD_PEPPER environment variable.");
  }

  return pepper;
}

export function validatePassword(password) {
  if (typeof password !== "string" || password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  return null;
}

export async function hashPassword(password) {
  const salt = randomBytes(SALT_BYTES).toString("hex");
  const derivedKey = await scrypt(`${password}${getPasswordPepper()}`, salt, KEY_LENGTH);

  return {
    salt,
    hash: Buffer.from(derivedKey).toString("hex"),
  };
}

export async function verifyPassword(password, salt, hash) {
  if (!password || !salt || !hash) {
    return false;
  }

  const derivedKey = await scrypt(`${password}${getPasswordPepper()}`, salt, KEY_LENGTH);
  const derivedBuffer = Buffer.from(derivedKey);
  const storedBuffer = Buffer.from(hash, "hex");

  if (derivedBuffer.length !== storedBuffer.length) {
    return false;
  }

  return timingSafeEqual(derivedBuffer, storedBuffer);
}
