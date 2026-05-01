import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { adminAPI } from "../../lib/adminApi";
import styles from "./Dashboard.module.css";

function StatCard({ icon, label, value, sub, color, to }) {
  const inner = (
    <motion.div
      className={styles.statCard}
      style={{ borderTop: `3px solid ${color}` }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      <div className={styles.statIcon} style={{ background: color + "18" }}>
        {icon}
      </div>
      <div className={styles.statInfo}>
        <div className={styles.statLabel}>{label}</div>
        <div className={styles.statValue}>{value ?? "—"}</div>
        {sub && <div className={styles.statSub}>{sub}</div>}
      </div>
    </motion.div>
  );
  return to ? (
    <Link to={to} style={{ textDecoration: "none" }}>
      {inner}
    </Link>
  ) : (
    inner
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminAPI
      .dashboard()
      .then((r) => setData(r.data))
      .catch((e) =>
        setError(e?.response?.data?.error || "Failed to load dashboard")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        Loading dashboard...
      </div>
    );
  if (error)
    return (
      <div className={styles.error}>⚠️ {error} — is the backend running?</div>
    );
  const { donations, contacts, volunteers, newsletter, posts, programs } = data || {};
  const totalRaised = donations?.totalRaised || 0;
  const goalAmount = 10000000; // ₹1 Crore
  const progress = Math.min((totalRaised / goalAmount) * 100, 100);

  return (
    <div className={styles.page}>
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard
          icon="💰"
          label="Total Raised"
          color="#2D7A4F"
          value={`₹${totalRaised.toLocaleString("en-IN")}`}
          sub={`${donations?.totalCount || 0} donations`}
          to="/admin/donations"
        />
        <StatCard
          icon="📊"
          label="Avg Donation"
          color="#1A90D9"
          value={`₹${(donations?.avgAmount || 0).toLocaleString("en-IN")}`}
          sub="per donor"
        />
        <StatCard
          icon="✉️"
          label="New Messages"
          color="#E8522A"
          value={contacts?.newCount ?? 0}
          sub="unread contacts"
          to="/admin/contacts"
        />
        <StatCard
          icon="🙋"
          label="Pending Volunteers"
          color="#C49A00"
          value={volunteers?.pendingCount ?? 0}
          sub="to review"
          to="/admin/volunteers"
        />
        <StatCard
          icon="📧"
          label="Subscribers"
          color="#534AB7"
          value={newsletter?.subscriberCount ?? 0}
          sub="active newsletter"
          to="/admin/subscribers"
        />
        <StatCard
          icon="📝"
          label="Posts"
          color="#7C3AED"
          value={posts?.count ?? 0}
          sub="total blog posts"
          to="/admin/posts"
        />
        <StatCard
          icon="📚"
          label="Programs"
          color="#059669"
          value={programs?.count ?? 0}
          sub="active programs"
          to="/admin/programs"
        />

        <StatCard
          icon="🌱"
          label="Fund Efficiency"
          color="#2D7A4F"
          value="92%"
          sub="goes to programs"
        />
      </div>

      {/* Annual Goal Progress */}
      <motion.div
        className={styles.goalCard}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className={styles.goalHeader}>
          <div>
            <h2 className={styles.cardTitle}>Annual Fundraising Goal</h2>
            <p className={styles.cardSub}>FY 2024–25</p>
          </div>
          <div className={styles.goalNumbers}>
            <span className={styles.goalRaised}>
              ₹{(totalRaised / 100000).toFixed(1)}L raised
            </span>
            <span className={styles.goalTarget}>of ₹1 Crore</span>
          </div>
        </div>
        <div className={styles.progressTrack}>
          <motion.div
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <div className={styles.progressMeta}>
          <span>{progress.toFixed(1)}% funded</span>
          <span>
            ₹{((goalAmount - totalRaised) / 100000).toFixed(1)}L remaining
          </span>
        </div>
      </motion.div>

      {/* Recent Donations Table */}
      <motion.div
        className={styles.tableCard}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className={styles.tableHeader}>
          <h2 className={styles.cardTitle}>Recent Donations</h2>
          <Link to="/admin/donations" className={styles.viewAll}>
            View All →
          </Link>
        </div>
        {donations?.recent?.length > 0 ? (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Cause</th>
                  <th>Date</th>
                  <th>Receipt</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.recent.map((d) => (
                  <tr key={d._id}>
                    <td>
                      <div className={styles.donorCell}>
                        <div className={styles.donorAvatar}>
                          {d.donorName?.charAt(0)}
                        </div>
                        <div>
                          <div className={styles.donorName}>{d.donorName}</div>
                          <div className={styles.donorEmail}>{d.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.amount}>
                      ₹{d.amount?.toLocaleString("en-IN")}
                    </td>
                    <td>
                      <span className={styles.causeBadge}>
                        {d.cause || "General"}
                      </span>
                    </td>
                    <td className={styles.dateCell}>
                      {d.createdAt
                        ? format(new Date(d.createdAt), "dd MMM yyyy")
                        : "—"}
                    </td>
                    <td className={styles.receiptCell}>
                      {d.receiptNumber || "—"}
                    </td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          styles["status_" + d.status]
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💰</div>
            <p>
              No donations yet. Once donors complete payments, they'll appear
              here.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
