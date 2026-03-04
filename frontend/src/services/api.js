import axios from 'axios';

const API_BASE_URL = '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data || response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/users/authenticate', { email, password }),
  register: (name, email, password) => api.post('/users', { name, email, password }),
};

export const doctorAPI = {
  getAll: () => api.get('/doctors'),
  getById: (id) => api.get(`/doctors/${id}`),
  getAvailable: (doctorId, date) => api.get(`/doctors/${doctorId}/appointments/available?date=${date}`),
};

export const appointmentAPI = {
  getAll: () => api.get('/appointments'),
  create: (doctorId, date, reason) => api.post('/appointments', { doctorId, date, reason }),
  getAvailable: (doctorId) => api.get(`/doctors/${doctorId}/appointments/available`),
};

export default api;
