import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageMotion from '../components/ui/PageMotion'

export default function NotFoundPage() {
  return (
    <PageMotion>
      <Helmet><title>404 — BrightEarth Foundation</title></Helmet>
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🌱</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '1rem' }}>Page Not Found</h1>
          <p style={{ color: 'var(--mid)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
            Looks like this page wandered off into the forest. Let's get you back on track.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/" className="btn-primary">← Go Home</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </PageMotion>
  )
}
