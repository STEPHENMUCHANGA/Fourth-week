import axios from 'axios';

// Detect environment and choose correct API URL
const api = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5000/api' // local backend when developing
      : import.meta.env.VITE_API_BASE_URL || 'https://fourth-week.onrender.com/api', // production backend on Render
  withCredentials: true, // allows cookies/JWT to be sent if using auth
});

export default api;
