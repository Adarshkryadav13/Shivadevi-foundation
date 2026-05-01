import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import PageMotion from '../components/ui/PageMotion'
import styles from './ProgramsPage.module.css'
import food from "../assets/food.jpeg";
import env from '../assets/env.jpeg';
import gen from '../assets/gen.jpeg';
import health from '../assets/health.jpeg';
import respon from '../assets/respon.jpeg';
import susten from '../assets/susten.jpeg';
import eg from '../assets/eg.jpeg';
import sr from '../assets/sr.png';
const programCards = [
  {
    title: 'Hunger Relief Initiative',
    description: 'Nutritious meals, ration kits, and emergency food support for vulnerable families.',
    image: food,
    to: '/programs/hunger',
  },
  {
    title: 'Education Program',
    description: 'Scholarships, school support, and learning resources for children and youth.',
    image: eg,
    to: '/programs/education',
  },
  {
    title: 'Health Program',
    description: 'Health awareness, checkup camps, and access support for basic healthcare needs.',
    image: health,
    to: '/programs/health',
  },
  {
    title: 'Environmental Program',
    description: 'Plantation drives, conservation action, and local climate-awareness campaigns.',
    image: env,
    to: '/programs/Environmental',
  },
  {
    title: 'Sustainable Livelihood',
    description: 'Skill-building and community-led models for long-term self-reliance.',
    image: susten,
    to: '/programs/sustainable',
  },
  {
    title: 'Women Empowerment',
    description: 'Leadership, training, and dignity-focused initiatives for women in communities.',
    image: gen,
    to: '/programs',
  },
  {
    title: 'Disaster Response',
    description: 'Rapid support through relief materials, food assistance, and ground response.',
    image: respon,
    to: '/programs',
  },
  {
    title: 'Social Responsibility',
    description: 'Volunteer engagement and social action partnerships for collective impact.',
    image: sr,
    to: '/programs',
  },
]

export default function ProgramsPage() {
  return (
    <PageMotion>
      <Helmet>
        <title>Programs — Shivadevi Foundation</title>
        <meta name="description" content="Explore BrightEarth Foundation's four flagship programs: EduReach Schools, Green Youth Corps, Clean Water Initiative and Scholarships." />
      </Helmet>

      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag">What We Do</span>
          <h1 className={styles.heroTitle}>Our Programs</h1>
          <p className={styles.heroSub}>
            We run community-focused programs in hunger relief, education, health, sustainability, and social development.
          </p>
        </div>
      </section>

      <section className={styles.programsSection}>
        <div className={`container ${styles.programGrid}`}>
          {programCards.map((program) => (
            <article key={program.title} className={styles.programCard}>
              <div className={styles.programImageWrap}>
                <img src={program.image} alt={program.title} className={styles.programImage} />
              </div>
              <div className={styles.programBody}>
                <h3 className={styles.programTitle}>{program.title}</h3>
                <p className={styles.programDesc}>{program.description}</p>
                <Link to={program.to} className={styles.learnBtn}>
                  Learn More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div className="container">
          <h2>Want to Support Our Work?</h2>
          <p>Every contribution, however small, powers these programs. Join 847 donors this month.</p>
          <Link to="/donate" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            💚 Donate Today
          </Link>
        </div>
      </section>
    </PageMotion>
  )
}
