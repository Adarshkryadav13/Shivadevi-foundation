import axios from 'axios'
import { getApiBase } from './siteConfig.js'

const resolvedApiBase = getApiBase()

const api = axios.create({
  baseURL: resolvedApiBase,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// 🔐 Request interceptor (attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
// 🔁 Response interceptor (FIXED)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // ❌ DO NOT auto delete token
    if (error.response?.status === 401) {
      console.warn("Unauthorized request (401)")
    }

    return Promise.reject(error)
  }
)


// ================= PUBLIC APIs =================

// 💰 Donations
export const donationAPI = {
  createOrder: (data) => api.post('/donations/create-order', data),
  verifyPayment: (data) => api.post('/donations/verify-payment', data),
  getHistory: () => api.get('/donations/history'),
}

// 📩 Contact
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
}

// 🙋 Volunteer
export const volunteerAPI = {
  register: (data) => api.post('/volunteers', data),
}

// 📧 Newsletter
export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
}

// 📝 Public Posts
export const postsAPI = {
  getPosts: () => api.get('/posts'),
  getSinglePost: (id) => api.get(`/posts/${id}`),
}

export default api