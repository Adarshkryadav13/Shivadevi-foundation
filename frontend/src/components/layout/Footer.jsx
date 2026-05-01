import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import logo from '../../assets/logo.jpeg';
const footerLinks = {
  Organisation: [
    { label: 'About Us', to: '/about' },
    { label: 'Programs', to: '/programs' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
  ],
  'Get Involved': [
    { label: 'Donate', to: '/donate' },
    { label: 'Volunteer', to: '/contact' },
    { label: 'Corporate CSR', to: '/contact' },
    { label: 'Partner With Us', to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Use', to: '/terms' },
    { label: 'Annual Report', to: '/report' },
  ],
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>
          <Link to="/" className={styles.logo}>
        <img src={logo} alt="logo" />
        </Link>
          </div>
          <p className={styles.tagline}>
            Empowering youth and healing the planet — one community at a time.
          </p>
          {/* <div className={styles.socials}>
            {['🐦', '📘', '📸', '▶️', '🔗'].map((icon, i) => (
              <button key={i} className={styles.socialBtn} aria-label="social">
                {icon}
              </button>
            ))}
          </div> */}
          <div className={styles.badges}>
            <span className={styles.badge}>(NPO) DARPAN</span>
            <span className={styles.badge}>E- ANUDAAN</span>
            <span className={styles.badge}>⭐ Mumbai Public Trust Act, 1950</span>
          </div>
        </div>

        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group} className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>{group}</h4>
            <ul className={styles.linkList}>
              {links.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Shivadevi Foundation. All rights reserved. 
          Registered NGO · CIN: E-0040717(GBR)
        </p>
        {/* <p className={styles.love}>Made with 💚 for the planet</p> */}
      </div>
    </footer>
  )
}
