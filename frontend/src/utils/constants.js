export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://resumepilot-backend-api.vercel.app/api";

export const THEME_OPTIONS = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' }
];

export const DASHBOARD_QUICK_ACTIONS = [
  { label: 'Upload Resume', to: '/resume-analyzer' },
  { label: 'Analyze Resume', to: '/resume-analyzer' },
  { label: 'Match Jobs', to: '/job-matcher' },
  { label: 'Edit Profile', to: '/profile' }
];
