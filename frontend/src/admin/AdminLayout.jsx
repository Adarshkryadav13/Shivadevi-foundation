import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext';
import styles from './AdminLayout.module.css'

const navItems = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/donations', icon: '💚', label: 'Donations' },
  { to: '/admin/contacts', icon: '✉️', label: 'Contacts' },
  { to: '/admin/volunteers', icon: '🙋', label: 'Volunteers' },
  { to: '/admin/subscribers', icon: '📧', label: 'Subscribers' },
  {to: '/admin/posts',icon: '📧', label: 'posts'},
  {to:'/admin/events',icon:"📢 ", label:'UpcomingEvents'}
]

export default function AdminLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

  // Close sidebar on route change (mobile)
  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

  const pageTitle = navItems.find(n => location.pathname.startsWith(n.to))?.label || 'Admin'

  return (
    <div className={styles.shell}>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sideTop}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>🌱</span>
            <div>
              <div className={styles.brandName}>Shivadevi Foundation</div>
              <div className={styles.brandRole}>Admin Panel</div>
            </div>
          </div>

          <nav className={styles.nav}>
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.navActive : ''}`
                }
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.sideBottom}>
          <a href="/" target="_blank" rel="noopener" className={styles.viewSite}>
            <span>🌐</span> View Website
          </a>
          <div className={styles.adminInfo}>
            <div className={styles.adminAvatar}>
              {admin?.email?.charAt(0).toUpperCase()}
            </div>
            <div className={styles.adminEmail}>{admin?.email}</div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <button
            className={styles.hamburger}
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <div className={styles.topRight}>
            <span className={styles.onlineDot} />
            <span className={styles.onlineText}>Live</span>
          </div>
        </header>

        {/* Page content */}
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
