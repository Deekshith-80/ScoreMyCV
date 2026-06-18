const http = require("http");
const axios = require("axios");
const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");
const seedJobsIfNeeded = require("./utils/seedJobs");
const { ensureDirSync } = require("./utils/fileHelpers");
const path = require("path");

const uploadsRoot = path.join(__dirname, "uploads");
const resumeDir = path.join(uploadsRoot, "resumes");
const avatarDir = path.join(uploadsRoot, "avatars");

const verifyPythonService = async () => {
  try {
    const response = await axios.get(`${env.pythonServiceUrl}/health`, {
      timeout: 5000,
    });
    if (response.status === 200) {
      console.log(`[python-service] reachable at ${env.pythonServiceUrl}`);
      return;
    }
  } catch (error) {
    console.warn(
      `[python-service] not reachable at ${env.pythonServiceUrl}: ${error.message}`,
    );
    console.warn(
      "Start the Python ATS service before scanning resumes: cd ../python-service && python3 main.py",
    );
  }
};

const startServer = async () => {
  ensureDirSync(uploadsRoot);
  ensureDirSync(resumeDir);
  ensureDirSync(avatarDir);

  await connectDB();
  await seedJobsIfNeeded();
  await verifyPythonService();

  const server = http.createServer(app);

  server.listen(env.port, () => {
    console.log(`Backend API running on port ${env.port}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Failed to start backend server:", error);
    process.exit(1);
  });
}

module.exports = app;
