import axios from 'axios';

const API_BASE_URL = 'http://localhost:3007';

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptor to include the token in every request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Generic API call functions
const apiCall = async (method, endpoint, data = null, params = null) => {
  try {
    const config = { method, url: endpoint };
    if (data) config.data = data;
    if (params) config.params = params;

    const response = await api(config);
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} request:`, error);
    if (error.response && error.response.status === 401) {
      // Redirect to login page on unauthorized access
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    throw error;
  }
};

// API functions
export const getLogs = (params) => apiCall('get', '/api/logs', null, params);

export const login = async (credentials) => {
  try {
    const response = await apiCall('post', '/api/users/login', credentials);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { error: 'Invalid credentials. Please try again.' };
    }
    return { error: 'An error occurred. Please try again.' };
  }
};

export const logout = () => apiCall('post', '/api/users/logout');

export const deleteLogs = (id) => apiCall('delete', `/api/logs/${id}`);

export const signup = (data) => apiCall('post', '/api/users/signup', data);

// New function to export logs
export const exportLogs = async (format = 'csv') => {
  try {
    const response = await api.get(`/api/logs/export?format=${format}`, {
      responseType: 'blob', 
    });

    const blob = new Blob([response.data], {
      type: format === 'csv' ? 'text/csv' : 'application/json',
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `logs.${format}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error('Error exporting logs:', error);
    throw error;
  }
};

// Error handler for common errors
const handleCommonErrors = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // Handle unauthorized access
        break;
      case 403:
        // Handle forbidden access
        break;
      case 404:
        // Handle not found
        break;
      case 500:
        // Handle server error
        break;
      default:
        // Handle other errors
    }
  } else if (error.request) {
    // Handle network errors
  } else {
    // Handle other errors
  }
};


export { handleCommonErrors };
