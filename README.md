# ScoreMyCV

ScoreMyCV is an ATS-focused resume analysis and optimization platform. It combines a React frontend, a Node.js/Express API gateway, and a Python FastAPI service that handles parsing, scoring, job matching, cover letter generation, and document export.

## What It Does

- Upload resumes in PDF or DOCX format
- Extract and analyze resume content
- Generate ATS-style scores and feedback
- Highlight missing keywords and weak sections
- Match resumes against job descriptions
- Generate tailored cover letters
- Export optimized content as PDF or DOCX

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, JWT, Multer
- ATS Engine: Python 3.10+, FastAPI, spaCy
- Database: MongoDB with Mongoose

## Project Structure

- `frontend/` - React single-page app
- `backend/` - Node.js API gateway
- `backend/python-service/` - FastAPI ATS/NLP service

## Prerequisites

- Node.js 18+
- npm
- Python 3.10+
- MongoDB

## Setup

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Install Python service dependencies

```bash
cd backend/python-service
python3 -m pip install -r requirements.txt
```

If spaCy asks for the English language model:

```bash
python3 -m spacy download en_core_web_sm
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
```

## Running the App

Open three terminals:

### Backend API

```bash
cd backend
npm run dev
```

### Python ATS service

```bash
cd backend/python-service
python3 main.py
```

### Frontend

```bash
cd frontend
npm run dev
```

## Environment Variables

The Node backend reads variables from `backend/.env` or the shell.

### Node backend

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `5000` | Node server port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/ai_resume_analyzer` | MongoDB connection string |
| `JWT_SECRET` | `development-secret-change-me` | JWT signing secret |
| `JWT_EXPIRES_IN` | `7d` | JWT expiration time |
| `BACKEND_URL` | `http://localhost:5000` | Public backend URL |
| `PYTHON_SERVICE_URL` | `http://127.0.0.1:8000` | Python ATS service URL |
| `MAX_FILE_SIZE_MB` | `10` | Resume upload size limit |
| `NODE_ENV` | `development` | Runtime mode |

### Python service

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `8000` | FastAPI port |
| `FRONTEND_ORIGIN` | `*` | Primary frontend origin for CORS |
| `ALLOWED_ORIGINS` | `http://localhost:5173,https://resumepilot-ai-frontend.vercel.app,http://localhost:5000,https://resumepilot-backend-api.vercel.app` | Additional allowed CORS origins |
| `OPENAI_API_KEY` | unset | Optional model-backed generation |
| `OPENAI_MODEL` | `gpt-4.1-mini` | Optional OpenAI model name |
| `LOG_LEVEL` | `INFO` | Service log level |
| `ATS_EXPORT_MAX_LINES` | `55` | Export formatting limit |

## API Overview

### Node backend

- `GET /health`
- `GET /`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `DELETE /api/auth/delete-account`
- `POST /api/resume/upload`
- `GET /api/resume/history`
- `GET /api/resume/:id`
- `DELETE /api/resume/:id`
- `POST /api/ats/analyze`
- `POST /api/ats/optimize`
- `POST /api/ats/generate-cover-letter`
- `POST /api/ats/export`
- `GET /api/jobs`
- `GET /api/jobs/matches`
- `GET /api/jobs/:id`
- `POST /api/jobs/apply`
- `GET /api/profile`
- `PUT /api/profile`
- `GET /api/profile/stats`
- `PUT /api/settings/theme`
- `PUT /api/settings/password`
- `POST /api/settings/logout`
- `DELETE /api/settings/delete-account`

### Python ATS service

- `GET /health`
- `POST /analyze`
- `POST /optimize`
- `POST /generate-cover-letter`
- `POST /match-job`
- `POST /export`

## Notes

- The Node backend talks to the Python service over HTTP, so both services must be running for full ATS functionality.
- Resume uploads are stored under `backend/src/uploads/`.
- The backend checks the Python service on startup and logs a warning if it is unavailable.
