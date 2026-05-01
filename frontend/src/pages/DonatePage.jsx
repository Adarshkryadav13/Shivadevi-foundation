import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import PageMotion from '../components/ui/PageMotion'
import styles from './DonatePage.module.css'
import sbarcode from '../assets/sbarcode.png'

const amounts = [ 100,200,500, 1000, 2500, 5000, 10000]
const causes = [
  'Education ',
  'Hunger Relief',
  'Environmental Sustainability',
  'Sustainable Cities',
  'Health And gender equality',
  'Organisation Development',
]

const impactMap = {
  500: '📚 Provides books & stationery for 1 child for a full year',
  1000: '🌱 Plants 10 native saplings and trains 1 eco-volunteer',
  3000: ' women heath care and empowerment',
  5000: 'for a health checkup camp',
  10000: 'support education of student',
}

export default function DonatePage() {
  const location = useLocation()
  const passedAmount = parseInt(location.state?.amount?.replace(/[^0-9]/g, '')) || 1000

  const [amount, setAmount] = useState(passedAmount)
  const [customAmt, setCustomAmt] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [cause, setCause] = useState('General Fund')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [recurring, setRecurring] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showQrNotice, setShowQrNotice] = useState(false)

  const finalAmount = isCustom ? (parseInt(customAmt) || 0) : amount

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit Indian mobile number'
    if (finalAmount < 100) e.amount = 'Minimum donation is ₹100'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleDonate = () => {
    if (!validate()) return
    setShowPaymentModal(true)
    setShowQrNotice(true)
  }

  return (
    <PageMotion>
      <Helmet>
        <title>Donate — Shivadevi Foundation</title>
        <meta name="description" content="Support BrightEarth Foundation. 80G tax exempt. Every rupee goes to education and environment programs." />
      </Helmet>

      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag">Make a Difference</span>
          <h1 className={styles.title}>Your Generosity Transforms Lives</h1>
          {/* <p className={styles.sub}>80G Tax Exempt · SSL Secured · Instant Receipt · 92% to Programs</p> */}
        </div>
      </section>

      <section className={styles.main}>
        <div className={`container ${styles.grid}`}>
          {/* LEFT: Form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Choose Your Donation</h2>

            {/* Amount Selector */}
            <div className={styles.amtGrid}>
              {amounts.map(a => (
                <button
                  key={a}
                  className={`${styles.amtBtn} ${!isCustom && amount === a ? styles.amtActive : ''}`}
                  onClick={() => { setAmount(a); setIsCustom(false); setErrors({ ...errors, amount: '' }) }}
                >
                  ₹{a.toLocaleString('en-IN')}
                </button>
              ))}
              <button
                className={`${styles.amtBtn} ${isCustom ? styles.amtActive : ''}`}
                onClick={() => setIsCustom(true)}
              >
                Custom
              </button>
            </div>

            {isCustom && (
              <div className={styles.customWrap}>
                <span className={styles.rupee}>₹</span>
                <input
                  type="number"
                  className={styles.customInput}
                  placeholder="Enter amount"
                  value={customAmt}
                  min="100"
                  onChange={e => { setCustomAmt(e.target.value); setErrors({ ...errors, amount: '' }) }}
                />
              </div>
            )}
            {errors.amount && <p className={styles.err}>{errors.amount}</p>}

            {/* Impact Line */}
            {!isCustom && impactMap[amount] && (
              <div className={styles.impactLine}>
                <span>{impactMap[amount]}</span>
              </div>
            )}

            {/* Cause */}
            <label className={styles.label}>Donate towards</label>
            <select
              className={styles.select}
              value={cause}
              onChange={e => setCause(e.target.value)}
            >
              {causes.map(c => <option key={c}>{c}</option>)}
            </select>

            {/* Recurring toggle */}
            <label className={styles.recurringRow}>
              <input
                type="checkbox"
                checked={recurring}
                onChange={e => setRecurring(e.target.checked)}
                className={styles.checkbox}
              />
              <span>Make this a <strong>monthly recurring</strong> donation</span>
            </label>

            <hr className={styles.divider} />

            {/* Personal Info */}
            <h3 className={styles.subTitle}>Your Details</h3>
            <div className={styles.row2}>
              <div className={styles.field}>
                <label className={styles.label}>Full Name *</label>
                <input
                  className={`${styles.input} ${errors.name ? styles.inputErr : ''}`}
                  placeholder="Arjun Sharma"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className={styles.err}>{errors.name}</p>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Phone *</label>
                <input
                  className={`${styles.input} ${errors.phone ? styles.inputErr : ''}`}
                  placeholder="98765 43210"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && <p className={styles.err}>{errors.phone}</p>}
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email Address *</label>
              <input
                className={`${styles.input} ${errors.email ? styles.inputErr : ''}`}
                type="email"
                placeholder="arjun@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className={styles.err}>{errors.email}</p>}
            </div>

            <button className={styles.donateBtn} onClick={handleDonate}>
              Donate Now
            </button>
            {showQrNotice && (
              <p className={styles.qrNotice}>
                Scan the QR code in the right panel to complete your donation of ₹{finalAmount.toLocaleString('en-IN')}.
              </p>
            )}

           
          </div>

          {/* RIGHT: Sidebar */}
          <div className={styles.sidebar}>

          <div className={styles.sideCards} id="donation-qr-section">
              <h3 className={styles.sideTitle}>Bank Details</h3>

              {/* IMAGE */}
              <div className={styles.bankImage}>
                <img src={sbarcode} alt="QR Code" />
              </div>

              {/* DETAILS */}
              <div className={styles.bankDetails}>
                <p><strong>Account Name:</strong> Shivadevi Foundation</p>
                <p><strong>Bank Name:</strong> State Bank of India</p>
                <p><strong>Account No:</strong> 44869262609</p>
                <p><strong>IFSC Code:</strong> SBIN0018692</p>
                <p><strong>Branch:</strong> PBB MULUND WEST BRANCH(18692)</p>
              </div>
            </div>

            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Your Impact Promise</h3>
              {Object.entries(impactMap).map(([amt, desc]) => (
                <div key={amt} className={styles.promiseRow}>
                  <div className={styles.promiseAmt}>₹{parseInt(amt).toLocaleString('en-IN')}</div>
                  <div className={styles.promiseDesc}>{desc}</div>
                </div>
              ))}
            </div>

    
            <div className={styles.progressCard}>
              <h3 className={styles.sideTitle}>Annual Goal Progress</h3>
              <div className={styles.progressNums}>
                <span className={styles.raised}>₹0 Lakhs</span>
                <span className={styles.goalText}>of ₹1 Crore</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '2%' }} />
              </div>
              <p className={styles.progressMeta}>847 donors this month · 72% funded</p>
            </div>

            <div className={styles.trustCard}>
              <h3 className={styles.sideTitle}>Why Trust Us?</h3>
              {[
                ['🏛️', '(NPO) DARPAN'],
                ['📊', 'Annual reports published openly since 2026'],
                ['🏛️💰', 'E- ANUDAAN'],
                ['✅', 'Mumbai Public Trust Act, 1950'],
              ].map(([icon, text]) => (
                <div key={text} className={styles.trustRow}>
                  <span className={styles.trustIcon}>{icon}</span>
                  <span className={styles.trustText}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showPaymentModal && (
        <div className={styles.paymentOverlay} onClick={() => setShowPaymentModal(false)}>
          <div className={styles.paymentModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.paymentHeader}>
              <h3>Secure Donation Checkout</h3>
              <button
                type="button"
                className={styles.paymentClose}
                onClick={() => setShowPaymentModal(false)}
                aria-label="Close payment popup"
              >
                ×
              </button>
            </div>

            <div className={styles.paymentBody}>
              <p className={styles.paymentAmount}>Amount: ₹{finalAmount.toLocaleString('en-IN')}</p>
              <p className={styles.paymentMeta}>Cause: {cause}</p>
              <p className={styles.paymentMeta}>Donor: {form.name || 'Guest Donor'}</p>

              <div className={styles.paymentQrWrap}>
                <img src={sbarcode} alt="Donation payment QR code" className={styles.paymentQr} />
              </div>

              <p className={styles.paymentHelp}>
                Scan this QR with any UPI app to complete payment.
              </p>

              <div className={styles.paymentActions}>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => setShowPaymentModal(false)}
                >
                  I Have Paid
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageMotion>
  )
}
