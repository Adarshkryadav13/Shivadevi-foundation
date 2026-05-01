import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { adminAPI } from '../../lib/adminApi'
import styles from './Dashboard.module.css'

function DonationDrawer({ donation: d, onClose }) {
  if (!d) return null
  return (
    <>
      <motion.div className={styles.drawerOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div className={styles.drawer} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerTitle}>Donation Details</div>
          <button className={styles.drawerClose} onClick={onClose}>✕</button>
        </div>
        <span className={`${styles.statusBadge} ${styles['status_' + d.status]}`} style={{ marginBottom: '1.5rem', display: 'inline-block' }}>{d.status}</span>
        {[
          ['Donor Name', d.donorName],
          ['Email', d.email],
          ['Phone', d.phone || '—'],
          ['Amount', `₹${d.amount?.toLocaleString('en-IN')}`],
          ['Cause', d.cause || 'General Fund'],
          ['Recurring', d.recurring ? 'Yes — Monthly' : 'One-time'],
          ['Receipt No.', d.receiptNumber || '—'],
          ['Razorpay Order ID', d.razorpayOrderId || '—'],
          ['Razorpay Payment ID', d.razorpayPaymentId || '—'],
          ['Date', d.createdAt ? format(new Date(d.createdAt), 'dd MMM yyyy, hh:mm a') : '—'],
        ].map(([label, value]) => (
          <div key={label} className={styles.detailGroup}>
            <div className={styles.detailLabel}>{label}</div>
            <div className={styles.detailValue}>{value}</div>
          </div>
        ))}
        <div className={styles.actionBtns}>
          <button className={`${styles.actionBtn} ${styles.actionBtnGreen}`} onClick={onClose}>Close</button>
        </div>
      </motion.div>
    </>
  )
}

export default function DonationsPage() {
  const [donations, setDonations] = useState([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    adminAPI.donations({ page, status, search })
      .then(r => { setDonations(r.data.donations); setTotal(r.data.total); setPages(r.data.pages) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [page, status, search])

  useEffect(() => { fetchData() }, [fetchData])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.tableHeader}>
          <div>
            <h2 className={styles.cardTitle}>All Donations</h2>
            <p className={styles.cardSub}>{total} total records</p>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filterBar}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
            <input
              className={styles.searchInput}
              placeholder="Search by name or email..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <button type="submit" style={{ padding: '0.5rem 1rem', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Search</button>
          </form>
          <select className={styles.filterSelect} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} />Loading donations...</div>
        ) : donations.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💰</div>
            <p>No donations found matching your filters.</p>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Cause</th>
                  <th>Type</th>
                  <th>Receipt</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map(d => (
                  <tr key={d._id} style={{ cursor: 'pointer' }} onClick={() => setSelected(d)}>
                    <td>
                      <div className={styles.donorCell}>
                        <div className={styles.donorAvatar}>{d.donorName?.charAt(0)}</div>
                        <div>
                          <div className={styles.donorName}>{d.donorName}</div>
                          <div className={styles.donorEmail}>{d.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.amount}>₹{d.amount?.toLocaleString('en-IN')}</td>
                    <td><span className={styles.causeBadge}>{d.cause || 'General'}</span></td>
                    <td><span className={styles.statusBadge} style={{ background: d.recurring ? '#E6F1FB' : '#F1EFE8', color: d.recurring ? '#185FA5' : '#5F5E5A' }}>{d.recurring ? 'Monthly' : 'One-time'}</span></td>
                    <td className={styles.receiptCell}>{d.receiptNumber || '—'}</td>
                    <td className={styles.dateCell}>{d.createdAt ? format(new Date(d.createdAt), 'dd MMM yy') : '—'}</td>
                    <td><span className={`${styles.statusBadge} ${styles['status_' + d.status]}`}>{d.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className={styles.pagination}>
            <button className={styles.pageBtn} onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
            <span className={styles.pageCurrent}>Page {page} of {pages}</span>
            <button className={styles.pageBtn} onClick={() => setPage(p => p + 1)} disabled={page === pages}>›</button>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selected && <DonationDrawer donation={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}
