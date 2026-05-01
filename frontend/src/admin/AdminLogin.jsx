import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import styles from './AdminLogin.module.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Please fill in all fields'); return }
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back!')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🌱</div>
          <div className={styles.logoText}>Shivadevi<span>Foundation</span></div>
          <div className={styles.logoSub}>Admin Portal</div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              className={styles.input}
              type="email"
              placeholder="admin@brightearth.org"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.passWrap}>
              <input
                className={styles.input}
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPass(v => !v)}
                aria-label="Toggle password"
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        {/* <div className={styles.hint}>
          <div className={styles.hintTitle}>Default credentials</div>
          <div className={styles.hintRow}>
            <span>Email:</span><code>admin@brightearth.org</code>
          </div>
          <div className={styles.hintRow}>
            <span>Password:</span><code>BrightEarth@2024!</code>
          </div>
          <div className={styles.hintNote}>
            Change these in <code>backend/.env</code> → <code>ADMIN_EMAIL</code> & <code>ADMIN_PASSWORD</code>
          </div>
        </div> */}

        <a href="/" className={styles.backLink}>← Back to website</a>
      </motion.div>
    </div>
  )
}
