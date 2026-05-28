const REQUIRED_AUTH_ENV = {
  credentials: [
    "MONGODB_URI",
    "AUTH_PASSWORD_PEPPER",
    "AUTH_SESSION_SECRET",
  ],
  google: [
    "MONGODB_URI",
    "AUTH_SESSION_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
  ],
};

export function getMissingEnvVars(keys) {
  return keys.filter((key) => !process.env[key]);
}

export function getAuthConfigError(mode = "credentials") {
  const requiredKeys = REQUIRED_AUTH_ENV[mode] || [];
  const missingKeys = getMissingEnvVars(requiredKeys);

  if (!missingKeys.length) {
    return null;
  }

  return `Missing environment variables: ${missingKeys.join(", ")}`;
}
