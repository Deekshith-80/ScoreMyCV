const dotenv = require("dotenv");

dotenv.config();

const parseOrigins = (value, fallback) => {
  const raw = value || fallback;
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const pythonServiceUrl = (() => {
  if (process.env.PYTHON_SERVICE_URL) {
    return process.env.PYTHON_SERVICE_URL;
  }

  const host = process.env.PYTHON_SERVICE_HOST || "127.0.0.1";
  const port = process.env.PYTHON_SERVICE_PORT || "8000";
  return `http://${host}:${port}`;
})();

const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ai_resume_analyzer",
  jwtSecret: process.env.JWT_SECRET || "development-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  frontendOrigins: parseOrigins(
    process.env.FRONTEND_ORIGIN,
    "https://resumepilot-ai-frontend.vercel.app,http://localhost:5173",
  ),
  backendUrl: process.env.BACKEND_URL || "http://localhost:5000",
  pythonServiceUrl,
  maxFileSizeMb: Number(process.env.MAX_FILE_SIZE_MB || 10),
};

module.exports = env;
