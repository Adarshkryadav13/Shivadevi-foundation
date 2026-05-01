import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { contactAPI } from '../lib/api'
import PageMotion from '../components/ui/PageMotion'
import styles from './ContactPage.module.css'

const interests = [
  'Donate / Sponsor',
  'Volunteer',
  'Corporate CSR / Partnership',
  'Media Inquiry',
  'Academic Research',
  'General Question'
]

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // ✅ FIXED: All validation inside handler
  const handleSubmit = async () => {
    if (!form.firstName.trim()) {
      toast.error("First name required")
      return
    }

    if (!form.email.trim()) {
      toast.error("Email required")
      return
    }

    if (!form.message.trim() || form.message.length < 10) {
      toast.error("Message must be at least 10 characters")
      return
    }

    setSubmitting(true)

    try {
      await contactAPI.submit(form)
    
      setSubmitted(true) // show success UI
      toast.success("Message sent!")
    
      // ⏳ show for 2 seconds then reset
      setTimeout(() => {
        setSubmitted(false)
    
        // reset form
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          interest: '',
          message: ''
        })
      }, 2000)
    
    } catch (err) {
      const msg =
        err?.response?.data?.errors?.[0]?.msg ||
        "Failed to send"
    
      toast.error(msg)
    }
  }

  return (
    <PageMotion>
      <Helmet>
        <title>Contact — Shivadevi Foundation</title>
      </Helmet>

      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag">Get In Touch</span>
          <h1 className={styles.heroTitle}>Let's Build Change Together</h1>
          <p className={styles.heroSub}>
            Whether you want to volunteer, partner, donate or simply learn more — we'd love to hear from you.
          </p>
        </div>
      </section>

     <section className={styles.contactWrap}>
   <div className={styles.container}>

    {/* LEFT SIDE */}
    <div className={styles.left}>

      <h2 className={styles.heading}>Connect With Us</h2>
      <p className={styles.sub}>
        We’re here to help and answer any question you might have.
      </p>

      <div className={styles.card}>
        <div className={styles.icon}>📍</div>
        <div>
          <h4>Address</h4>
          <p>511/A Royal Classic CHS , Mulund Goregaon Link-Road, Mulund West Mumbai 400080, India</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>📞</div>
        <div>
          <h4>Phone</h4>
          <p>+91 8779854112</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>✉️</div>
        <div>
          <h4>Email</h4>
          <p>joinus@shivadevifoundation.org</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>🕐</div>
        <div>
          <h4>Working Hours</h4>
          <p>Mon–Sat, 10 AM – 7 PM</p>
        </div>
      </div>

      {/* INVOLVEMENT */}
      <div className={styles.involve}>
        <h3>Ways to Get Involved</h3>
        <div className={styles.involveGrid}>
          <div>💚 Donate</div>
          <div>🙋 Volunteer</div>
          <div>🏢 CSR</div>
          <div>📸 Follow Us</div>
        </div>
      </div>

    </div>

 
    {/* RIGHT SIDE */}
{/* RIGHT SIDE */}
<div className={styles.formBox}>

  {submitted ? (
    <div className={styles.successBox}>
      <div className={styles.successIcon}>✅</div>
      <h2>Message Sent!</h2>
      <p>We’ll contact you within 24 hours.</p>
    </div>
  ) : (
    <>
      <div className={styles.formHeader}>
        <span className={styles.mailIcon}>✉️</span>
        <h3>Send Us a Message</h3>
      </div>

      {/* ROW 1 */}
      <div className={styles.row}>
        <input
          placeholder="First Name *"
          value={form.firstName}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
        />
        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
        />
        <input
          placeholder="Email *"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
      </div>

      {/* ROW 2 */}
      <div className={styles.row}>
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <select
          value={form.interest}
          onChange={(e) =>
            setForm({ ...form, interest: e.target.value })
          }
        >
          <option value="">Select Interest</option>
          {interests.map(i => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>

      {/* MESSAGE */}
      <textarea
        rows="5"
        placeholder="Message (min 10 characters) *"
        value={form.message}
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
      />

      {/* BUTTON */}
      <button
        className={styles.btn}
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? "Sending..." : "✈️ Send Message"}
      </button>

      <p className={styles.secure}>
        🔒 Your information is safe with us
      </p>
    </>
  )}

</div>
  </div>
</section>
    </PageMotion>
  )
}