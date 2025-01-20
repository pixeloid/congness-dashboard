import axios from 'axios';
import { API_CONFIG } from '@/api/config';
import { useAuthStore } from '@/store/authStore';


const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Bearer Token if Available
api.interceptors.request.use(
  (config) => {
    const state = useAuthStore.getState();
    const token = state.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//     'Content-Type': 'application/merge-patch+json' on PATCH requests
api.interceptors.request.use(
  (config) => {
    if (config.method === 'patch') {
      config.headers['Content-Type'] = 'application/merge-patch+json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized
      //    useAuthStore().actions.logout();
      // go to login page
      window.location.href = '/login';
    }

    if (error.response?.data?.['@type'] === 'hydra:Error') {
      const hydraError = error.response.data;
      const message = hydraError['hydra:description'] || hydraError.detail || 'An unexpected error occurred';
      return Promise.reject(new Error(message));
    }

    if (error.response?.data?.['@type'] === 'ConstraintViolationList') {
      const violations = error.response.data.violations;
      const messages = violations.map((violation: any) => `${violation.propertyPath}: ${violation.message}`).join(', ');
      return Promise.reject(new Error(messages));
    }

    const message = error.response?.data?.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;
