import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { color, motion } from 'framer-motion'
import PageMotion from '../components/ui/PageMotion'
import styles from './HomePage.module.css'
import img10 from '../assets/img10.jpeg'
import img11 from '../assets/img11.jpeg'
import food from "../assets/food.jpeg";
import env from '../assets/env.jpeg';
import health from '../assets/health.jpeg';
import eg from '../assets/eg.jpeg';
import sr from '../assets/sr.png';
import apollo from '../assets/apollo.jpeg'
import CH from '../assets/CH.jpeg'
import MT from '../assets/MT.jpeg'
import N from '../assets/N.jpeg'
import RP from '../assets/RP.jpeg'
import RT from '../assets/RT.jpeg'
import SV from '../assets/SV.jpeg'
import TG from '../assets/TG.jpeg'
import TIN from '../assets/TIN.jpeg'
import UP from '../assets/UP.jpeg' 
import P from '../assets/P.jpeg'
import MF from "../assets/MF.jpeg"
import LC from '../assets/LC.png'
import MM from '../assets/MM.jpeg'
import YP from '../assets/YP.jpeg'
import dr from '../assets/dr.png'
import sop from '../assets/sop.png'
import iis from '../assets/iis.jpeg'
import DetailCard from './ProgramDetailPage';


const initiatives = [
  {
    title: "HUNGER RELIEF INITIATIVES",
    short: "ZERO HUNGER",
    color:'#FF6B35',
    image:food,
    slug: "hunger",
  },
  {
    title: "HEALTH CARE INITIATIVES",
    short: "GOOD HEALTH",
    color:'#22C55E',
    image:health,
    slug:"Health ",
  },
  {
    title: "EDUCATION & GENDER EQUALITY",
    short: "QUALITY EDUCATION",
    color:'#FF0000',
    image:eg,
    slug: "education",

  },
  {
    title: "ENVIRONMENTAL SUSTAINABILITY ",
    short: "LIFE ON LAND",
    color: '#22C55E',
    image:env,
    slug:"Environmental",
    
  },
  {
    title: "SUSTAINABLE CITIES & RESPONSIBLE LIVING ",
    short: "SUSTAINABLE CITIES AND COMMUNITIES",
    color: '#E84393',
    image:sr,
    slug:"sustainable",
  },

];

// Simple in-view hook using IntersectionObserver (no extra dependency)
function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (options.triggerOnce) observer.disconnect()
      }
    }, { threshold: options.threshold || 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

// Simple animated number counter
function AnimatedNumber({ end, decimals = 0, duration = 2000 }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      setVal(parseFloat((eased * end).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, decimals, duration])
  return <>{val.toFixed(decimals)}</>
}

const impactStats = [
  { icon: '📚', num: 10, suffix: 'K+', label: ' COVID -19', desc: ' Beneficiary' },
  { icon: '🌳', num: 350, suffix: '+', label: 'Trees Planted', desc: 'In the last decade' },
  { icon: '🏘️', num: 1, suffix: '-Tones', label: 'Waste collected', desc: 'With clean water' },
]



const testimonials = [
  { quote: "First of all, I would like to express my gratitude to Shivadevi Foundation and Newton's Academy for inviting me to the annual function of the children and for promoting an initiative like a drug-free India. Your awareness and concern for society and children are truly commendable.", name: '(IRS) Sameer Wankhede', role: 'Directorate General of Taxpayer Services, CHENNAI ZONAL UNIT', initials: 'PD', color: '#2D7A4F' , image: img10},
  { quote: " Through our collaborative community health initiatives, I have seen their genuine commitment towards improving public health and spreading awareness at the grassroots level. I truly appreciate the efforts of the Shivadevi Foundation in bringing together professionals and volunteers for such meaningful work", name: 'Keval Salo', role: 'Director, Community Services, RCMMM', initials: 'AR', color: '#1A90D9', image: img11},
 
]

function StatCard({ icon, num, suffix, label, desc }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const decimals = num % 1 !== 0 ? 1 : 0
  return (
    <div ref={ref} className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statNum}>
        {inView ? <AnimatedNumber end={num} decimals={decimals} duration={2000} /> : (0).toFixed(decimals)}
        {suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statDesc}>{desc}</div>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [activeAmt, setActiveAmt] = useState('₹1,000')

  return (
    <PageMotion>
      <Helmet>
        <title>Shivadevi Foundation — Empowering Youth, Healing the Planet</title>
        <meta name="description" content="BrightEarth Foundation works at the intersection of youth education and environmental sustainability." />
      </Helmet>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className={styles.heroBadge}>
              <span className={styles.dot} />
              Empowering Futures Since 2020
            </div>
            <h1 className={styles.heroH1}>
              Nurturing <em>Young Minds</em> &amp; a Greener Planet
            </h1>
            <p className={styles.heroDesc}>
              Shivadevi Foundation bridges education and environment — equipping youth with knowledge, tools, and courage to build a sustainable tomorrow.
            </p>
            <div className={styles.heroBtns}>
              <button className="btn-primary" onClick={() => navigate('/donate')}>
                💚 Donate Today
              </button>
              <button className="btn-outline" onClick={() => navigate('/programs')}>
                Explore Programs
              </button>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroCards}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            {[
              { icon: '🦠', label: 'Covid-19 Pandemic', value: 'Helped more than 10K beneficiaries', color: '#E6F5EC' },
              { icon: '🌱', label: 'Trees Planted Till Now!', value: '350+', color: '#FFF8DC' },
              { icon: '🌍', label: 'Waste Management awareness workshop with -', value: '200+ Participants', color: '#E3F4FF' },
              { icon: '🧹', label: 'Cleanliness Drive!', value: '1 Tonne of Waste collected till now', color: '#E3F4FF' },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                className={styles.heroCard}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, delay: i * 1, repeat: Infinity, ease: 'easeInOut' }}
                style={i === 1 ? { marginLeft: '1.5rem' } : {}}
              >
                <div className={styles.hcIcon} style={{ background: card.color }}>
                  {card.icon}
                </div>
                <div>
                  <div className={styles.hcLabel}>{card.label}</div>
                  <div className={styles.hcValue}>{card.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className={styles.aboutStrip}>
        <div className="container">
          <div className={styles.aboutStrip_inner}>
            <div>
              <span className="section-tag">Who We Are</span>
              <h2 className="section-title">A Movement Born from Purpose</h2>
              <p className="section-desc">
              Shivadevi Foundation, founded in 2020, is a purpose-driven organization committed to creating meaningful social change through education, skill development, and community empowerment. Guided by compassion and a vision of equality, it works to uplift underprivileged individuals and build a better future through impactful initiatives and collaborative efforts.
              </p>
              <Link to="/about" className={`btn-primary ${styles.mt}`} style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                Learn Our Story →
              </Link>
            </div>
            <div className={styles.aboutValues}>
              {[
                { icon: '📖', title: 'Education First', desc: 'Holistic learning for every child' },
                { icon: '🌱', title: 'Climate Action', desc: 'Hands-on eco-programs' },
                { icon: '🤝', title: 'Community Led', desc: 'Rooted in local wisdom' },
                { icon: '🔍', title: 'Transparency', desc: 'Every rupee accounted for' },
              ].map(v => (
                <div key={v.title} className={styles.valCard}>
                  <div className={styles.valIcon}>{v.icon}</div>
                  <div>
                    <strong>{v.title}</strong>
                    <span>{v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className={`${styles.programsSection} section`}>
        <div className="container">
          <span className="section-tag">What We Do</span>
          <div className={styles.programsHeader}>
            <h2 className="section-title">Our Programs</h2>
            <Link to="/programs" className={styles.viewAll}>View All Programs →</Link>
          </div>

          <div className={styles.programsGrid}>
            {initiatives.map((item, i) => (

              <Link key={i} to={`/programs/${item.slug}`}>
                <DetailCard data={item} />
              </Link>

            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className={styles.impactSection}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.12)', color: '#F5C842' }}>Our Impact</span>
          <h2 className="section-title" style={{ color: '#fff' }}>Numbers That Tell the Story</h2>
          <div className={styles.impactGrid}>
            {impactStats.map(stat => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>
      {/* backup support */}
<div className={styles.partnersSection}>
{/* <p className={styles.tag}>Our Impact</p> */}
<h2 className={styles.title}>WHO BACKS US</h2>
<h4 className={styles.subtitle}>Our Social Impact Supporters </h4>

  <div className={styles.partnersGrid}>
  {[
  apollo,
  CH,
  MT,
  RP,
  RT,
  SV,
  TG,
  P,
  LC,
  dr,
  MF,
  MM,
  UP,
  YP,
  sop,
  iis,

  ].map((img, i) => (
    <div key={i} className={styles.partnerCard}>
      <img src={img} alt="partner" />
    </div>
  ))}
  </div>
</div>
      {/* corpatre support */}
      <div className={styles.impactSection}>
<h2 className="section-title" style={{ color: '#fff' }}>WHO BACKS US</h2>
<h4 className="section-title" style={{ color: '#fff' }}>Our Corporate Supporters </h4>

  <div className={styles.impactGrid}>
  {[
  N,
  TIN,

  ].map((img, i) => (
    <div key={i} className={styles.partnerCard}>
      <img src={img} alt="partner" />
    </div>
  ))}
  </div>
</div>
      {/* DONATE CTA */}
      <section className={`${styles.donateStrip} section`}>
        <div className="container">
          <div className={styles.donateInner}>
            <div>
              <span className="section-tag">Support Us</span>
              <h2 className="section-title">Make a Difference Today</h2>
              <p className="section-desc">Choose a quick amount and help us change lives.</p>
              <div className={styles.amtGrid}>
                {[ '₹100','₹200','₹500', '₹1,000', '₹2,500', '₹5,000', '₹10,000', 'Custom'].map(amt => (
                  <button
                    key={amt}
                    className={`${styles.amtBtn} ${activeAmt === amt ? styles.amtActive : ''}`}
                    onClick={() => setActiveAmt(amt)}
                  >
                    {amt}
                  </button>
                ))}
              </div>
              <button
                className="btn-primary"
                style={{ marginTop: '1.5rem' }}
                onClick={() => navigate('/donate', { state: { amount: activeAmt } })}
              >
                💚 Donate {activeAmt !== 'Custom' ? activeAmt : ''} Now
              </button>
            </div>
            <div className={styles.progressBox}>
              <p className={styles.progressLabel}>Annual Goal Progress</p>
              <div className={styles.progressNums}>
                <span className={styles.raised}>₹0</span>
                <span className={styles.goal}>Goal: ₹1 Crore</span>
              </div>
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  whileInView={{ width: '2%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  viewport={{ once: true }}
                />
              </div>
              <p className={styles.progressMeta}>Give Something Back To The Society!</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`section`} style={{ background: '#fff' }}>
        <div className="container">
          <span className="section-tag">Stories</span>
          <h2 className="section-title">Voices of Change</h2>
          <div className={styles.testiGrid}>
      {testimonials.map((t, index) => (
    <div key={index} className={styles.testiCard}>

      {/* Image */}
      <div className={styles.testiImageWrapper}>
        <img src={t.image} alt={t.name} className={styles.testiImage} />
      </div>

      {/* Content */}
      <div className={styles.testiContent}>
        <h3 className={styles.testiName}>{t.name}</h3>
        <p className={styles.testiRole}>{t.role}</p>
        <p className={styles.testiText}>{t.quote}</p>
       
      </div>

    </div>
  ))}
</div>
        </div>
      </section>
    </PageMotion>
  )
}
