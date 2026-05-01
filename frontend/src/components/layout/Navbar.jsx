import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'
import logo from '../../assets/logo.jpeg';
import { FaInstagram, FaTwitter, FaLinkedin,FaFacebook, FaYoutube } from 'react-icons/fa';

const navLinks = [
  
  { label: 'About', to: '/about' },
  { label: 'Upcoming Events', to: '/event' },
  { label: 'Programs', to: '/programs' },
  { label: 'Gallery', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]
const programOptions = [
  { label: "Hunger Relief", to: "/programs/hunger" },
  { label: "Health & Gender Equality", to: "/programs/health" },
  { label: "Education ", to: "/programs/education" },
  { label: "Environmental-Sustainability", to: "/programs/Environmental" },
  {label: "sustainable cities", to: "/programs/sustainable"}
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
   <div className={styles.muibox}>
  
   {/* LEFT SIDE */}
   <div className={styles.left}>
    
    <div className={styles.item}>
      <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24">
        <path d="M6.6 10.8C8.04 13.68 10.32 15.96 13.2 17.4L15.6 15C15.9 14.7 16.32 14.64 16.68 14.82C17.82 15.39 19.08 15.72 20.4 15.72C20.94 15.72 21.36 16.14 21.36 16.68V20.4C21.36 20.94 20.94 21.36 20.4 21.36C10.86 21.36 2.64 13.14 2.64 3.6C2.64 3.06 3.06 2.64 3.6 2.64H7.32C7.86 2.64 8.28 3.06 8.28 3.6C8.28 4.92 8.61 6.18 9.18 7.32C9.36 7.68 9.3 8.1 9 8.4L6.6 10.8Z" fill="currentColor"/>
      </svg>
      <span>+91-8779854112</span>
    </div>

    <div className={styles.item}>
            <svg
              className={styles.icon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M3 7L12 13L21 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
      <span>joinus@shivadevifoundation.org</span>
    </div>

   </div>

   {/* RIGHT SIDE */}
   <div className={styles.right}>
   <a href="https://www.instagram.com/shivadevi_foundation?igsh=cjFtY3pzM3Z1MnN3" target="_blank" rel="noreferrer">
      <FaInstagram className="icon" />
    </a>

    <a href="https://x.com/shivadevi_trust" target="_blank" rel="noreferrer">
      <FaTwitter className="icon" />
    </a>
    <a href="https://www.linkedin.com/company/shivadevi-foundation">
      <FaLinkedin className='icon'/>
    </a>
    <a href="https://www.facebook.com/people/Shivadevi-Foundation-Trust/61572004145207/?rdid=FKmnP4FEB4TfC5An&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17C8VJYsin%2F%3Fref%3D1">
      <FaFacebook className='icon' />
    </a>
    <a href="https://www.youtube.com/@shivadevifoundation">
    <FaYoutube className='icon'/>
    </a>

   </div>

   </div>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
        <img src={logo} alt="logo" />
        </Link>

        <nav className={styles.links}>
  {navLinks.map(link => {
    
    if (link.label === "Programs") {
      return (
        <div key={link.to} className={styles.dropdownWrapper}>
          
          <span className={styles.link}>
            {link.label} ▾
          </span>

          <div className={styles.dropdown}>
            {programOptions.map((item, i) => (
              <NavLink
                key={i}
                to={item.to}
                className={styles.dropdownItem}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

        </div>
      );
    }

    return (
      <NavLink
        key={link.to}
        to={link.to}
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        {link.label}
      </NavLink>
    );
  })}
</nav>

        <button
          className={styles.cta}
          onClick={() => navigate('/donate')}
        >
          💚 Donate Now
        </button>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? styles.barOpen : styles.bar}></span>
          <span className={menuOpen ? styles.barOpen2 : styles.bar}></span>
          <span className={menuOpen ? styles.barOpen3 : styles.bar}></span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/donate"
              className={styles.mobileCta}
              onClick={() => setMenuOpen(false)}
            >
              💚 Donate Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}