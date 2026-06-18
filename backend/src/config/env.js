const dotenv = require("dotenv");

dotenv.config();

const PYTHON_SERVICE_URL =
  process.env.PYTHON_SERVICE_URL || "http://127.0.0.1:8000";

const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ai_resume_analyzer",
  jwtSecret: process.env.JWT_SECRET || "development-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  backendUrl: process.env.BACKEND_URL || "http://localhost:5000",
  pythonServiceUrl: PYTHON_SERVICE_URL,
  maxFileSizeMb: Number(process.env.MAX_FILE_SIZE_MB || 10),
};

module.exports = env;
