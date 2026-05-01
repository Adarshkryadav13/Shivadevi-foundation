import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Public site
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProgramsPage from './pages/ProgramsPage'
import ProgramDetailPage from './pages/ProgramDetailPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import DonatePage from './pages/DonatePage'
//import DonateSuccessPage from './pages/DonateSuccessPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import Event from './pages/Event'
import ProgramHunger from './pages/ProgramHunger';
import EducationProgram from './pages/Educationprogram'
import HealthProgram from './pages/HealthProgram';
import Environmentalprogram from './pages/Environmentalprogram'
import SustainableProgram from './pages/SustainableProgram';
// Admin
import { AuthProvider } from './context/AuthContext'
import AdminGuard from './admin/AdminGuard'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import DonationsPage from './admin/pages/DonationsPage'
import ContactsPage from './admin/pages/ContactsPage'
import { VolunteersPage, SubscribersPage } from './admin/pages/VolunteersSubscribers'
import ManagePosts from './admin/pages/ManagePosts'
import ManageEvents from './admin/pages/ManageEvents'

export default function App() {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public website */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="programs" element={<ProgramsPage />} />
            <Route path="programs/:slug" element={<ProgramDetailPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="donate" element={<DonatePage />} />
            {/* <Route path="donate/success" element={<DonateSuccessPage />} /> */}
            <Route path="contact" element={<ContactPage />} />
            <Route path="event" element={<Event />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="programs/hunger" element={<ProgramHunger/>} />
            <Route path="/programs/education" element={<EducationProgram/>} />
            <Route path="/programs/health" element={<HealthProgram/>} />
            <Route path="/programs/sustainable" element={<SustainableProgram/>} />
            <Route path="/programs/Environmental" element={<Environmentalprogram/>} />

           



          </Route>

          {/* Admin login — public */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin panel — protected */}
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminLayout />
              </AdminGuard>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="donations" element={<DonationsPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="volunteers" element={<VolunteersPage />} />
            <Route path="subscribers" element={<SubscribersPage />} />
            <Route path="posts" element={<ManagePosts />} />
            <Route path="events" element={<ManageEvents />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  )
}
