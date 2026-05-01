import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageMotion from '../components/ui/PageMotion'
import styles from './AboutPage.module.css'
import img1 from '../assets/img1.jpeg'
import img2 from '../assets/img2.jpeg'
import img3 from '../assets/img3.jpeg'
import img4 from '../assets/img4.jpeg'
import img5 from '../assets/img5.jpeg'
import img6 from '../assets/img6.jpeg'
import img7 from '../assets/img7.jpeg'
import img8 from '../assets/img8.jpeg'
import img9 from '../assets/img9.jpeg'
import img12 from '../assets/img12.jpeg'
import img13 from '../assets/img13.jpeg'
import img14 from '../assets/img14.jpeg'
import img15 from '../assets/img15.jpeg'
import sp from '../assets/sp.jpeg'



const team = [
  { name: 'Mr. Vikas A.Pal', 
    role: 'Founder & Executive Director & Managing Trustee of Shivadevi Foundation. Environmentalist, Human rights expert and Disaster Management expert.', 
    initials: 'MN', color: '#2D7A4F', 
    bio: 'Former IFS officer turned social entrepreneur. 5+ years in conservation and rural education.',
    image: img1 },

  { name: 'Ms. Jyoti A. Pal', 
    role: 'Trustee and Secretary of the Shivadevi Foundation. Data Analytics expert and Women empowerment spokesperson. ', 
    initials: 'RK', color: '#1A90D9', 
    bio: 'IIT Bombay graduate. Passionate about education technology for underprivileged communities.',
  image: img2},

  { name: 'Mr. Ankushkumar Pal',
   role: 'Trustee and Treasurer of the Shivadevi Foundation. Educational expert & Founder of Newtons Academy, mumbai.', 
   initials: 'AS', color: '#C49A00',
    bio: 'Former investment banker who traded Wall Street for social impact 8 years ago.',
  image: img3 },

  { name: 'Mr. Ajay R. pal', 
    role: 'Trustee and Executive Member of Shivadevi Foundation. Business Analyst (Automotive Industry)', 
    initials: 'VP', color: '#E8522A', 
    bio: 'Wildlife biologist with expertise in reforestation and community-based conservation.',
  image: img4 },

  { name: 'Ms. Pradnya P. Durgade', 
    role: 'Core Team Member of Shivadevi Foundation. Social activist, women empowerment spokesperson, Skill development & youth development leader. HR & Administration Executive in RUMARA Engineering.', 
    initials: 'VP', color: '#E8522A', 
    bio: 'Wildlife biologist with expertise in reforestation and community-based conservation.',
  image: img5 },
  { name: 'Ms. Sayli Pendharkar ', 
    role: 'Core Team Support Member at Shivadevi Foundation. She brings extensive experience in the non-profit sector, with strong expertise in skilling, youth employability, rural livelihood development, and CSR partnerships. Her work is driven by a commitment to empowering communities and creating sustainable livelihood opportunities through impactful programs.', 
    initials: 'VP', color: '#E8522A', 
    bio: 'Wildlife biologist with expertise in reforestation and community-based conservation.',
  image: img15 },

  { name: 'Mr. Krishna Thakur', 
    role: 'Core  Team member of shivadevi foundation.', 
    initials: 'VP', color: '#E8522A', 
    bio: 'Wildlife biologist with expertise in reforestation and community-based conservation.',
  image: img6 },
  { name: 'Mr. Deepak Yadav', 
    role: 'Core Team member of shivadevi foundation', 
    initials: 'VP', color: '#E8522A', 
    bio: 'Wildlife biologist with expertise in reforestation and community-based conservation.',
  image: img7 },
  { name: 'Mr. Sachin Pandey', 
    role: 'Core Team member of shivadevi foundation', 
    initials: 'VP', color: '#E8522A', 
    bio: 'Wildlife biologist with expertise in reforestation and community-based conservation.',
  image: sp },
  { name: 'Mr. Suraj G. Kurmi', 
    role: 'Core Team Member of Shivadevi Foundation.Livelihood program expert.', 
    initials: 'VP', color: '#E8522A', 
    bio: 'Wildlife biologist with expertise in reforestation and community-based conservation.',
  image: img8 },
  { name: 'Mr. Shrikant Pal', 
    role: 'Core Team Member of Shivadevi Foundation. RTL design engineer in STMicroelectronics.', 
    initials: 'VP', color: '#E8522A', 
    bio: 'Wildlife biologist with expertise in reforestation and community-based conservation.',
  image: img9 },
  { name: 'Mr. Adarsh Yadav', 
    role: 'Frontent Website managing of shivadevi foundation', 
    initials: 'VP', color: '#E8522A', 
    bio: 'Wildlife biologist with expertise in reforestation and community-based conservation.',
  image: img12 },
  { name: 'Mr. Akash Yadav', 
    role:  'Software Engineer at Samsung Electronics, building efficient backend systems and ensuring performance, scalability, and reliability across web platforms.', 
    initials: 'VP', color: '#E8522A', 
    bio: 'Wildlife biologist with expertise in reforestation and community-based conservation.',
  image: img13 },
  { name: 'Mr. Rana mushkan', 
    role: 'Frontent Website managing of shivadevi foundation', 
    initials: 'VP', color: '#E8522A', 
    bio: 'Wildlife biologist with expertise in reforestation and community-based conservation.',
  image: img14},
 


]

const milestones = [

  { year: '2026', event: 'Get registered under the NITI Aayog (NPO DARPAN) & E- Anudaan under the government of India. Boosted free medical camp and reached total 500 Beneficiaries.And also planted 350+ Trees across mumbai with the support of dedicated volunteers. Now we are working with 200+ volunteers across Mumbai. ' },
  { year: '2025', event: 'Get registered under the Mumbai Public Trust Act, 1950. Free medical camps in mulund west for 300 Beneficiaries.' },
  { year: '2024', event: 'Decided core area of work and expanded area of work.' },
  { year: '2023', event: 'Boosted with expertise in livelihood programs.' },
  { year: '2022', event: 'Awareness among the street vendors about PM Swanidhi and Samrudhi Scheme.' },
  { year: '2021', event: 'covid-19 Pandemic  started with  family members and friends.Sended ration and essential kits during the flood of satara sangli.  Distribution Of food packet & water bottles to migrants.Ration distribution to need people. Awareness about importance of vaccination. Total Beneficiary10k+' },
  { year: '2020', event: 'Shivadevi Foundation established in mumbai with 3 staff members.' },

]

export default function AboutPage() {
  return (
    <PageMotion>
      <Helmet>
        <title>About Us — Shivadevi Foundation</title>
        <meta name="description" content="Learn about BrightEarth Foundation — our mission, team, history and values driving change across India." />
      </Helmet>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag">Our Story</span>
          <h1 className={styles.heroTitle}>A Movement Born from Purpose</h1>
          <span className={styles.heroSub}>
            Shivadevi Foundation, founded in 2020, is a purpose-driven
            organization committed to creating meaningful social change
            through education, skill development, and community
            empowerment. Guided by compassion and a vision of equality, it
            works to uplift underprivileged individuals and build a better
            future through impactful initiatives and collaborative efforts.
          </span>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`section ${styles.missionSection}`}>
        <div className="container">
          <div className={styles.mvGrid}>
          <div className={styles.mvCard} style={{ borderTop: '4px solid var(--green)' }}>
              <div className={styles.mvIcon}>🤝</div>
              <h2>Our Moto</h2>
              <p>Give Something Back To The Society !</p>
            </div>
            <div className={styles.mvCard} style={{ borderTop: '4px solid var(--green)' }}>
              <div className={styles.mvIcon}>🎯</div>
              <h2>Our Mission</h2>
              <p>To empower underprivileged communities by providing access to quality education, skill development, and opportunities for sustainable growth. We are committed to creating an inclusive society where every individual, regardless of their background, can achieve their full potential with dignity and confidence. Through community-driven initiatives and meaningful partnerships, we strive to bring positive, long-lasting change and contribute toward a more equal and empowered future.</p>
            </div>
            <div className={styles.mvCard} style={{ borderTop: '4px solid var(--yellow-dark)' }}>
              <div className={styles.mvIcon}>🌟</div>
              <h2>Our Vision</h2>
              <p>We envisions a society where every individual has equal access to opportunities, education, and resources needed to lead a dignified and empowered life. We aspire to build strong, self-reliant communities driven by knowledge, skills, and compassion, where no one is left behind. Through continuous efforts and collective action, we aim to create a future defined by equality, sustainability, and inclusive growth for all.</p>
            </div>
            <div className={styles.mvCard} style={{ borderTop: '4px solid var(--sky)' }}>
              <div className={styles.mvIcon}>💡</div>
              <h2>Our Approach</h2>
              <p>We follow a community-centric and impact-driven approach, focusing on understanding the real needs of people at the grassroots level. We design and implement practical programs in education, skill development, and empowerment by collaborating with local communities, partners, and stakeholders. Our approach emphasizes sustainability, transparency, and active participation, ensuring that every initiative creates meaningful, long-term change and empowers individuals to become self-reliant and confident.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <span className="section-tag">What Drives Us</span>
          <h2 className="section-title">Our Core Values</h2>
          <div className={styles.valuesGrid}>
            {[
              { icon: '📖', title: 'Education as Right', desc: 'Every child deserves quality education — regardless of geography, caste or gender.' },
              { icon: '🌱', title: 'Ecological Integrity', desc: 'We protect and restore the natural systems that sustain all life.' },
              { icon: '🤝', title: 'Community Ownership', desc: 'Lasting change is built by communities, not done to them.' },
              { icon: '🔍', title: 'Radical Transparency', desc: 'We publish every rupee raised and spent. Trust is earned, not assumed.' },
              { icon: '⚖️', title: 'Equity & Inclusion', desc: 'We prioritise girls, tribal communities, and the most marginalised.' },
              { icon: '🔄', title: 'Systemic Thinking', desc: 'We address root causes, not just symptoms.' },
            ].map(v => (
              <div key={v.title} className={styles.valItem}>
                <div className={styles.valIcon}>{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`section ${styles.timelineSection}`}>
        <div className="container">
          <span className="section-tag">Our Journey</span>
          <h2 className="section-title">6 Years of Impact</h2>
          <div className={styles.timeline}>
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className={styles.timelineYear}>{m.year}</div>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>{m.event}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`section`} style={{ background: '#fff' }}>
        <div className="container">
          <span className="section-tag">The People</span>
          <h2 className="section-title">Meet Our Team</h2>
          <div className={styles.teamGrid}>
            {team.map((member) => (
              <div key={member.name} className={styles.cardWrapper}>

                {/* Image */}
                <div className={styles.imageWrapper}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className={styles.image}
                  />
                </div>

                {/* Card */}
                <div className={styles.card}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Join Our Mission</h2>
          <p className={styles.ctaSub}>Whether you donate, volunteer or partner — there's a place for you in this movement.</p>
          <div className={styles.ctaBtns}>
            <Link to="/donate" className="btn-primary">💚 Donate Now</Link>
            <Link to="/contact" className="btn-outline" style={{ borderColor: '#fff', color: '#fff' }}>Get Involved</Link>
          </div>
        </div>
      </section>
    </PageMotion>
  )
}
