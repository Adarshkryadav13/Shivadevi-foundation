import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { adminAPI } from '../../lib/adminApi'
import styles from './Dashboard.module.css'

function ContactDrawer({ contact: c, onClose, onStatusChange, onDelete }) {
  if (!c) return null
  const statuses = ['new', 'read', 'replied', 'archived']

  return (
    <>
      <motion.div className={styles.drawerOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div className={styles.drawer} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerTitle}>Contact Message</div>
          <button className={styles.drawerClose} onClick={onClose}>✕</button>
        </div>

        <span className={`${styles.statusBadge} ${styles['status_' + c.status]}`} style={{ marginBottom: '1.5rem', display: 'inline-block' }}>{c.status}</span>

        {[
          ['From', `${c.firstName} ${c.lastName || ''}`],
          ['Email', c.email],
          ['Phone', c.phone || '—'],
          ['Interest', c.interest || '—'],
          ['Date', c.createdAt ? format(new Date(c.createdAt), 'dd MMM yyyy, hh:mm a') : '—'],
        ].map(([label, value]) => (
          <div key={label} className={styles.detailGroup}>
            <div className={styles.detailLabel}>{label}</div>
            <div className={styles.detailValue}>{value}</div>
          </div>
        ))}

        <div className={styles.detailGroup}>
          <div className={styles.detailLabel}>Message</div>
          <div style={{ background: 'var(--light)', borderRadius: 10, padding: '0.85rem', fontSize: '0.88rem', color: 'var(--dark)', lineHeight: 1.6, marginTop: '0.25rem' }}>
            {c.message}
          </div>
        </div>

        <div className={styles.detailGroup} style={{ marginTop: '1.5rem' }}>
          <div className={styles.detailLabel}>Update Status</div>
          <div className={styles.actionBtns}>
            {statuses.map(s => (
              <button
                key={s}
                className={`${styles.actionBtn} ${c.status === s ? styles.actionBtnGreen : ''}`}
                onClick={() => onStatusChange(c._id, s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <a
            href={`mailto:${c.email}?subject=Re: Your message to BrightEarth Foundation`}
            className={`${styles.actionBtn} ${styles.actionBtnGreen}`}
            style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '0.65rem' }}
          >
            ✉️ Reply via Email
          </a>
        </div>
        <button
          onClick={() => {
            onClose();
            onDelete(c._id);
          }}
          className={styles.actionBtn}
          style={{
            background: "#e53935",
            color: "#fff",
            marginTop: "10px",
            width: "100%"
          }}
        >
          🗑 Delete Message
        </button>
      </motion.div>
    </>
  )
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const fetchData = useCallback(() => {
    setLoading(true)
  
    adminAPI.contacts({ page, status })
      .then(r => {
        //console.log("CONTACT API:", r.data); 
        const data = r?.data || {}
        
  
        setContacts(r.data.contacts || r.data.data || r.data || []);
        setTotal(data.total || 0)
        setPages(data.pages || 1)
      })
      .catch(() => {
        setContacts([]) //  fallback
      })
      .finally(() => setLoading(false))
  }, [page, status])

  useEffect(() => { fetchData() }, [fetchData])

  const handleStatusChange = async (id, newStatus) => {
    try {
      console.log("Updating:", id, newStatus);
  
      await adminAPI.updateContact(id, { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
  
      // ✅ safer id check
      setContacts(prev =>
        prev.map(c =>
          (c._id || c.id) === id
            ? { ...c, status: newStatus }
            : c
        )
      );
  
      // ✅ update drawer also
      if ((selected?._id || selected?.id) === id) {
        setSelected(prev => ({ ...prev, status: newStatus }));
      }
  
    } catch (err) {
      console.log(err);
      toast.error('Failed to update status');
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
  
    try {
      await adminAPI.deleteContact(id);
  
      toast.success("Contact deleted");
  
      // remove from UI instantly
      setContacts(prev => prev.filter(c => (c._id || c.id) !== id));
  
      // close drawer if same item
      if ((selected?._id || selected?.id) === id) {
        setSelected(null);
      }
  
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete contact");
    }
  };
  const interestIcon = (interest) => {
    if (!interest) return '💬'
    if (interest.toLowerCase().includes('donate')) return '💚'
    if (interest.toLowerCase().includes('volunteer')) return '🙋'
    if (interest.toLowerCase().includes('csr')) return '🏢'
    if (interest.toLowerCase().includes('media')) return '📸'
    return '💬'
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.tableHeader}>
          <div>
            <h2 className={styles.cardTitle}>Contact Messages</h2>
            <p className={styles.cardSub}>{total} total messages</p>
          </div>
        </div>

        <div className={styles.filterBar}>
          <select className={styles.filterSelect} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
            <option value="">All Messages</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} />Loading contacts...</div>
        ) : !contacts || contacts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>✉️</div>
            
            <p>No contact messages yet.</p>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Interest</th>
                  <th>Message Preview</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              
              <tbody>
                {contacts?.map(c => (
                  <tr key={c._id} style={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
                    <td>
                      <div className={styles.donorCell}>
                        <div className={styles.donorAvatar} style={{ background: '#E6F1FB', color: '#185FA5' }}>
                          {c.firstName?.charAt(0)}
                        </div>
                        <div>
                          <div className={styles.donorName}>{c.firstName} {c.lastName}</div>
                          <div className={styles.donorEmail}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={styles.causeBadge} style={{ background: '#EEEDFE', color: '#534AB7' }}>{interestIcon(c.interest)} {c.interest || 'General'}</span></td>
                    <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--mid)', fontSize: '0.82rem' }}>
                      {c.message}
                    </td>
                    <td className={styles.dateCell}>{c.createdAt ? format(new Date(c.createdAt), 'dd MMM yy') : '—'}</td>
                    <td><span className={`${styles.statusBadge} ${styles['status_' + c.status]}`}>{c.status}</span></td>
                    <td onClick={e => e.stopPropagation()}>
                      <select
                        className={styles.filterSelect}
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                        value={c.status}
                        onChange={e => handleStatusChange(c._id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>

                      {/* 🔥 DELETE BUTTON */}
                      {/* <button
                        onClick={() => handleDelete(c._id)}
                        style={{
                          marginLeft: "6px",
                          background: "#e53935",
                          color: "#fff",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                      >
                        🗑 Delete Message
                      </button> */}
                    </td>
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

      <AnimatePresence>
        {selected && (
          <ContactDrawer
          contact={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
        )}
      </AnimatePresence>
    </div>
  )
}
