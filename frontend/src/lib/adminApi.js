// import api from './api'

// export const adminAPI = {

//   // ================= AUTH =================
//   login: (email, password) =>
//     api.post('/admin/login', { email, password }),


//   // ================= DASHBOARD =================
//   dashboard: () =>
//     api.get('/admin/dashboard'),


//   // ================= DONATIONS =================
//   donations: (params) =>
//     api.get('/admin/donations', { params }),


//   // ================= CONTACTS =================
//   contacts: (params) =>
//     api.get('/admin/contacts', { params }),

//   updateContact: (id, data) =>
//     api.patch(`/admin/contacts/${id}`, data),

  
//   // ================= VOLUNTEERS =================
//   volunteers: (params) =>
//     api.get('/admin/volunteers', { params }),


//   // ================= SUBSCRIBERS =================
//   subscribers: (params) =>
//     api.get('/admin/subscribers', { params }),


//   // ================= POSTS =================

//   // GET all posts
//   getPosts: () =>
//     api.get('/posts'),
  
//   // CREATE post
//   createPost: (data) => {
//     const token = localStorage.getItem("admin_token");
  
//     return api.post('/admin/posts', data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
        
//       },
//     });
//   },
//   // UPDATE post
//   updatePost: (id, data) =>
//     api.put(`/posts/${id}`, data),

//   // DELETE post
//   deletePost: (id) =>
//     api.delete(`/admin/posts/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }),


//   // ================= PROGRAMS =================

//   getPrograms: () =>
//     api.get('/admin/programs'),

//   createProgram: (data) =>
//     api.post('/admin/programs', data),
    

//   updateProgram: (id, data) =>
//     api.put(`/admin/programs/${id}`, data),

//   deleteProgram: (id) =>
//     api.delete(`/admin/programs/${id}`),
// }
import api from './api'

// ✅ common token
const getToken = () => localStorage.getItem("admin_token")

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

export const adminAPI = {

  // ================= AUTH =================
  login: (email, password) =>
    api.post('/admin/login', { email, password }),

  // ================= DASHBOARD =================
  dashboard: () =>
    api.get('/admin/dashboard', authConfig()),

  // ================= DONATIONS =================
  donations: (params) =>
    api.get('/admin/donations', { ...authConfig(), params }),

  // ================= CONTACTS =================
  contacts: (params) =>
    api.get('/admin/contacts', { ...authConfig(), params }),

  updateContact: (id, data) =>
    api.patch(`/admin/contacts/${id}`, data, authConfig()),
  
  deleteContact: (id) =>
    api.delete(`/admin/contacts/${id}`),

  // ================= VOLUNTEERS =================
  volunteers: (params) =>
    api.get('/admin/volunteers', { ...authConfig(), params }),

  // ================= SUBSCRIBERS =================
  subscribers: (params) =>
    api.get('/admin/subscribers', { ...authConfig(), params }),

  // ================= POSTS =================

  getPosts: () =>
    api.get('/admin/posts', authConfig()),

  createPost: (data) =>
    api.post('/admin/posts', data, {
      headers: {
        ...authConfig().headers,
        'Content-Type': 'multipart/form-data',
      },
    }),

  updatePost: (id, data) =>
    api.put(`/admin/posts/${id}`, data, authConfig()),

  deletePost: (id) =>
    api.delete(`/admin/posts/${id}`, authConfig()),

  // ================= PROGRAMS =================

  getPrograms: () =>
    api.get('/admin/programs', authConfig()),

  createProgram: (data) =>
    api.post('/admin/programs', data, authConfig()),

  updateProgram: (id, data) =>
    api.put(`/admin/programs/${id}`, data, authConfig()),

  deleteProgram: (id) =>
    api.delete(`/admin/programs/${id}`, authConfig()),

  // ================= EVENTS =================
  getEvents: () =>
    api.get('/admin/events', authConfig()),

  createEvent: (data) =>
    api.post('/admin/events', data, {
      headers: {
        ...authConfig().headers,
        'Content-Type': 'multipart/form-data',
      },
    }),

  updateEvent: (id, data) =>
    api.put(`/admin/events/${id}`, data, {
      headers: {
        ...authConfig().headers,
        'Content-Type': 'multipart/form-data',
      },
    }),

  deleteEvent: (id) =>
    api.delete(`/admin/events/${id}`, authConfig()),
}