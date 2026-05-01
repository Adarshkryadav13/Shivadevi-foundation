import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { format } from 'date-fns'
import PageMotion from '../components/ui/PageMotion'
import styles from './BlogPostPage.module.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
const MEDIA_BASE = API_BASE.startsWith('http')
  ? API_BASE.replace(/\/api\/?$/, '')
  : 'http://localhost:5001'
const resolveMediaUrl = (url) =>
  !url ? '' : url.startsWith('http') ? url : `${MEDIA_BASE}${url}`

// Fallback posts
const fallbackContent = {
  'trees-rajasthan': {
    title: '2.1 Million Trees: How Green Youth Corps Changed Rajasthan',
    publishedAt: '2024-02-15',
    author: { name: 'Aarav Rao', role: 'Program Lead' },
    body: 'This is fallback content for Rajasthan project...'
  },
  'girls-climate': {
    title: "Why Girls' Education is the Best Climate Solution",
    publishedAt: '2024-01-28',
    author: { name: 'Dr. Meera Nair', role: 'Founder' },
    body: 'This is fallback content for girls education...'
  },
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/posts/${slug}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false))
  }, [slug]);


  // 🔄 Loading
  if (loading) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--mid)' }}>
        Loading...
      </div>
    )
  }

  // ❌ Not found
  if (!post) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Post not found
        </h2>
        <Link to="/blog" className="btn-primary">← Back to Blog</Link>
      </div>
    )
  }

  return (
    <PageMotion>
      <Helmet>
        <title>{post.title} — Shivadevi Foundation</title>
      </Helmet>

      <article className={styles.article}>
        {/* HERO */}
        <div className={styles.heroSection}>
          <div className={`container ${styles.heroInner}`}>
            <Link to="/blog" className={styles.backLink}>← Back to Blog</Link>

            <h1 className={styles.title}>{post.title}</h1>

            <div className={styles.meta}>
              <div className={styles.avatar}>
                {post.author?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>

              <div>
                <div className={styles.authorName}>{post.author?.name}</div>

                <div className={styles.date}>
                  {post.publishedAt
                    ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
                    : ''}
                  {post.author?.role && ` · ${post.author.role}`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className={`container ${styles.content}`}>
          
          {/* 🖼 IMAGE */}
          {(post.images?.[0] || post.image) && (
            <img
              src={resolveMediaUrl(post.images?.[0] || post.image)}
              alt={post.title}
              style={{
                width: '100%',
                borderRadius: '12px',
                marginBottom: '20px'
              }}
            />
          )}

          {/* 📝 BODY */}
          {post.body ? (
            <p style={{ lineHeight: '1.8', fontSize: '1rem' }}>
              {post.body}
            </p>
          ) : (
            <div className={styles.placeholder}>
              <p>No content available.</p>
            </div>
          )}

          {/* CTA */}
          <div className={styles.cta}>
            <h3>Was this article helpful?</h3>
            <p>Support our work and help us create more impact stories like this.</p>
            <Link to="/donate" className="btn-primary">
              💚 Donate to Shivadevi
            </Link>
          </div>
        </div>
      </article>
    </PageMotion>
  )
}
