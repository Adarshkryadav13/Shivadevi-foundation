// import { useLocation, Link } from 'react-router-dom'
// import { Helmet } from 'react-helmet-async'
// import { motion } from 'framer-motion'
// import PageMotion from '../components/ui/PageMotion'
// import styles from './DonateSuccessPage.module.css'

// export default function DonateSuccessPage() {
//   const { state } = useLocation()
//   const { amount = 1000, name = 'Friend', email = '', paymentId = '' } = state || {}

//   return (
//     <PageMotion>
//       <Helmet><title>Thank You — Shivadevi Foundation</title></Helmet>
//       <section className={styles.page}>
//         <div className={styles.card}>
//           <motion.div
//             className={styles.checkCircle}
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: 'spring', stiffness: 200, damping: 12 }}
//           >
//             💚
//           </motion.div>
//           <motion.h1
//             className={styles.title}
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             Thank You, {name}!
//           </motion.h1>
//           <p className={styles.sub}>
//             Your donation of <strong>₹{Number(amount).toLocaleString('en-IN')}</strong> has been received and will go directly to our programs.
//           </p>
//           {paymentId && (
//             <div className={styles.receiptBox}>
//               <p className={styles.receiptLabel}>Payment ID</p>
//               <p className={styles.receiptId}>{paymentId}</p>
//               {email && <p className={styles.receiptEmail}>Receipt sent to <strong>{email}</strong></p>}
//             </div>
//           )}
//           <div className={styles.impact}>
//             <h3>What your donation does:</h3>
//             <div className={styles.impactGrid}>
//               {[
//                 ['🌱', '10 Saplings planted in your name'],
//                 ['📚', '1 child receives books for a year'],
//                 ['💧', 'Clean water access supported'],
//                 ['🎓', 'Scholarship fund contribution'],
//               ].map(([icon, text]) => (
//                 <div key={text} className={styles.impactItem}>
//                   <span>{icon}</span>
//                   <p>{text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className={styles.actions}>
//             <Link to="/" className="btn-primary">Back to Home</Link>
//             <Link to="/donate" className="btn-outline">Donate Again</Link>
//           </div>
//         </div>
//       </section>
//     </PageMotion>
//   )
// }
// later work on this page.. if need to connet razorpay