import { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import { adminAPI } from '../../lib/adminApi'
import styles from './Dashboard.module.css'

export function VolunteersPage() {
  const [volunteers, setVolunteers] = useState([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(() => {
    setLoading(true)
    adminAPI.volunteers({ page, status })
      .then(r => { setVolunteers(r.data.volunteers || []); setTotal(r.data.total || 0); setPages(r.data.pages || 1) })
      .catch(() => setVolunteers([]))
      .finally(() => setLoading(false))
  }, [page, status])

  useEffect(() => { fetchData() }, [fetchData])

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.tableHeader}>
          <div>
            <h2 className={styles.cardTitle}>Volunteers</h2>
            <p className={styles.cardSub}>{total} registrations</p>
          </div>
        </div>
        <div className={styles.filterBar}>
          <select className={styles.filterSelect} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} />Loading...</div>
        ) : volunteers.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🙋</div>
            <p>No volunteer registrations yet.</p>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Availability</th>
                  <th>Skills</th>
                  <th>Registered</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map(v => (
                  <tr key={v._id}>
                    <td>
                      <div className={styles.donorCell}>
                        <div className={styles.donorAvatar} style={{ background: '#EAF3DE', color: '#3B6D11' }}>{v.name?.charAt(0)}</div>
                        <div>
                          <div className={styles.donorName}>{v.name}</div>
                          <div className={styles.donorEmail}>{v.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: 'var(--mid)', fontSize: '0.85rem' }}>{v.city || '—'}</td>
                    <td><span className={styles.causeBadge}>{v.availability || '—'}</span></td>
                    <td style={{ color: 'var(--mid)', fontSize: '0.82rem', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {v.skills?.join(', ') || '—'}
                    </td>
                    <td className={styles.dateCell}>{v.createdAt ? format(new Date(v.createdAt), 'dd MMM yy') : '—'}</td>
                    <td><span className={`${styles.statusBadge} ${styles['status_' + v.status]}`}>{v.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pages > 1 && (
          <div className={styles.pagination}>
            <button className={styles.pageBtn} onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
            <span className={styles.pageCurrent}>Page {page} of {pages}</span>
            <button className={styles.pageBtn} onClick={() => setPage(p => p + 1)} disabled={page === pages}>›</button>
          </div>
        )}
      </div>
    </div>
  )
}

export function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(() => {
    setLoading(true)
    adminAPI.subscribers({ page })
      .then(r => { setSubscribers(r.data.subscribers || []); setTotal(r.data.total || 0); setPages(r.data.pages || 1) })
      .catch(() => setSubscribers([]))
      .finally(() => setLoading(false))
  }, [page])

  useEffect(() => { fetchData() }, [fetchData])

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.tableHeader}>
          <div>
            <h2 className={styles.cardTitle}>Newsletter Subscribers</h2>
            <p className={styles.cardSub}>{total} active subscribers</p>
          </div>
        </div>
        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} />Loading...</div>
        ) : subscribers.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📧</div>
            <p>No newsletter subscribers yet.</p>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Source</th>
                  <th>Subscribed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map(s => (
                  <tr key={s._id}>
                    <td style={{ fontWeight: 500, fontSize: '0.85rem' }}>{s.email}</td>
                    <td style={{ color: 'var(--mid)', fontSize: '0.85rem' }}>{s.name || '—'}</td>
                    <td><span className={styles.causeBadge} style={{ background: '#EEEDFE', color: '#534AB7' }}>{s.source || 'website'}</span></td>
                    <td className={styles.dateCell}>{s.createdAt ? format(new Date(s.createdAt), 'dd MMM yy') : '—'}</td>
                    <td><span className={`${styles.statusBadge} ${s.active ? styles.status_active : styles.status_inactive}`}>{s.active ? 'Active' : 'Unsubscribed'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pages > 1 && (
          <div className={styles.pagination}>
            <button className={styles.pageBtn} onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
            <span className={styles.pageCurrent}>Page {page} of {pages}</span>
            <button className={styles.pageBtn} onClick={() => setPage(p => p + 1)} disabled={page === pages}>›</button>
          </div>
        )}
      </div>
    </div>
  )
}
