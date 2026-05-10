import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { getApiBase, resolveMediaUrl } from '../lib/siteConfig.js'
import styles from './Event.module.css'

const API_BASE = getApiBase()

const formatEventDateRange = (event) => {
  const start = event.startDate || event.date
  if (!start) return 'Date TBD'
  const startLabel = new Date(start).toDateString()
  if (!event.endDate) return startLabel
  return `${startLabel} - ${new Date(event.endDate).toDateString()}`
}

const Event = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error('Failed to load events:', err)
        setEvents([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className={styles.page}>
        <div className="container">
          <p className={styles.state}>Loading upcoming events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Helmet>
        <title>Upcoming Events — Shivadevi Foundation</title>
      </Helmet>

      <div className="container">
        <div className={styles.hero}>
          <h2 className={styles.title}>Upcoming Events</h2>
          <p className={styles.subtitle}>Join our latest drives, camps and impact programs.</p>
        </div>

        {events.length === 0 ? (
          <p className={styles.state}>No upcoming events found.</p>
        ) : (
          <div className={styles.grid}>
            {events.map((event) => (
              <article key={event._id} className={styles.card}>
                {event.images?.[0] && (
                  <img
                    src={resolveMediaUrl(event.images[0])}
                    alt={event.title}
                    className={styles.image}
                  />
                )}

                <div className={styles.content}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  {event.description && (
                    <p className={styles.description}>{event.description}</p>
                  )}

                  <div className={styles.metaWrap}>
                    <span className={styles.meta}>
                      {formatEventDateRange(event)}
                    </span>
                    {event.time && <span className={styles.meta}>{event.time}</span>}
                    {event.location && <span className={styles.meta}>{event.location}</span>}
                    {event.category && <span className={styles.meta}>{event.category}</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Event
