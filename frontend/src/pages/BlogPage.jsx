// import { useState, useEffect } from 'react'
// import { Helmet } from 'react-helmet-async'
// import styles from './BlogPage.module.css'

// const categories = ['All', 'Environment', 'Education',' Plantation','Water', 'Blood Donation', 'Flood Relief ','Free Health Checkup Camp','Bir', 'Reports']

// export default function BlogPage() {
//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [activeCategory, setActiveCategory] = useState('All')
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5001/api/posts')
//       .then(res => res.json())
//       .then(data => {
//         console.log("POSTS:", data)
//         setPosts(data)
//       })
//       .catch(err => {
//         console.error('Error fetching posts:', err)
//       })
//       .finally(() => setLoading(false))
//   }, [])

//   // ✅ FILTER
//   const filtered =
//     activeCategory === 'All'
//       ? posts
//       : posts.filter(p =>
//           (p.category || "")
//             .toLowerCase()
//             .trim() === activeCategory.toLowerCase().trim()
//         )

//   // ✅ GROUP BY CATEGORY (IMPORTANT: filtered use karo)
//   const groupedPosts = filtered.reduce((acc, post) => {
//     const cat = post.category || "Other";

//     if (!acc[cat]) {
//       acc[cat] = [];
//     }

//     acc[cat].push(post);
//     return acc;
//   }, {});

//   return (
//     <>
//       <Helmet>
//         <title>Blog — Shivadevi Foundation</title>
//       </Helmet>

//       {/* Hero */}
//       <section className={styles.hero}>
//         <div className="container">
//           <h1 className={styles.heroTitle}>Blog & Shivafoundation Gallery</h1>
//         </div>
//       </section>

//       {/* Blog Section */}
//       <section className="section">
//         <div className="container">

//           {/* Filters */}
//           <div className={styles.filters}>
//             {categories.map(cat => (
//               <button
//                 key={cat}
//                 className={`${styles.filterBtn} ${
//                   activeCategory === cat ? styles.filterActive : ''
//                 }`}
//                 onClick={() => setActiveCategory(cat)}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           {/* Loading */}
//           {loading ? (
//             <p>Loading...</p>
//           ) : Object.keys(groupedPosts).length === 0 ? (
//             <p>No posts available</p>
//           ) : (

//             <div>
//               {Object.entries(groupedPosts).map(([category, items]) => (

//                 <div key={category} className={styles.categorySection}>

//                   {/* ✅ CATEGORY TITLE (ONLY ONCE) */}
//                   <h2 className={styles.categoryTitle}>
//                     {items[0]?.title}
//                   </h2>
//                   {/* IMAGES GRID */}
//                   <div className={styles.grid}>
//   {items.map(post => {

//     // ✅ handle both old + new data
//     const imgs = post.images && post.images.length > 0
//       ? post.images
//       : post.image
//         ? [post.image]
//         : [];

//     return imgs.map((img, i) => (
//       <div key={`${post._id}-${i}`} className={styles.imageCard}>
        
//         <div className={styles.imageWrapper}>
          
//           <img
//             src={`http://localhost:5001${img}`}
//             alt="gallery"
//             onClick={() => setSelectedImage(img)}
//           />

//         </div>

//       </div>
//     ));
//   })}
// </div>

//                 </div>

//               ))}
//             </div>

//           )}
//         </div>
//       </section>

//       {/* LIGHTBOX */}
//       {selectedImage && (
//         <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
//           <span className={styles.close}>×</span>
//           <img
//             src={`http://localhost:5001${selectedImage}`}
//             alt="full"
//             className={styles.lightboxImg}
//           />
//         </div>
//       )}

//     </>
//   )
// }

import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './BlogPage.module.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
const MEDIA_BASE = API_BASE.startsWith('http')
  ? API_BASE.replace(/\/api\/?$/, '')
  : 'http://localhost:5001'
const resolveMediaUrl = (url) =>
  !url ? '' : url.startsWith('http') ? url : `${MEDIA_BASE}${url}`
const getPostImages = (post) =>
  Array.isArray(post.images) && post.images.length > 0
    ? post.images
    : post.image
    ? [post.image]
    : []

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)
  const dynamicCategories = Array.from(
    new Set(
      posts
        .map((p) => (p.category || '').trim())
        .filter(Boolean)
    )
  )
  const categories = ['All', 'Reports', ...dynamicCategories.filter((c) => c.toLowerCase() !== 'reports')]

  // ✅ FETCH POSTS
  useEffect(() => {
    fetch(`${API_BASE}/posts`)
      .then(async (res) => {
        const data = await res.json()
        return data
      })
      .then(data => {
        setPosts(Array.isArray(data) ? data : [])
      })
      .catch(err => console.error('Error fetching posts:', err))
      .finally(() => setLoading(false))
  }, [])

  // ✅ FILTER POSTS
  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter(p =>
          (p.category || "")
            .toLowerCase()
            .trim() === activeCategory.toLowerCase().trim()
        )

  // ✅ GROUP BY CATEGORY
  const groupedPosts = filtered.reduce((acc, post) => {
    const cat = post.category || "Other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(post)
    return acc
  }, {})

  return (
    <>
      <Helmet>
        <title>Blog — Shivadevi Foundation</title>
      </Helmet>

      {/* HERO */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            Blog & Shivafoundation Gallery
          </h1>
        </div>
      </section>

      {/* BLOG */}
      <section className="section">
        <div className="container">

          {/* FILTER BUTTONS */}
          <div className={styles.filters}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${
                  activeCategory === cat ? styles.filterActive : ''
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* LOADING */}
          {loading ? (
            <p>Loading...</p>
          ) : Object.keys(groupedPosts).length === 0 ? (
            <p>No posts available</p>
          ) : (

            <div>
              {Object.entries(groupedPosts).map(([category, items]) => (

                <div key={category} className={styles.categorySection}>

                  {/* ✅ CATEGORY TITLE */}
                  <h2 className={styles.categoryTitle}>
                    {category}
                  </h2>

                  {/* IMAGE GRID */}
                  <div className={styles.grid}>
                    {items.map(post => {
                      const imgs = getPostImages(post)
                      const pdfUrl = post.pdf ? resolveMediaUrl(post.pdf) : ''

                      return (
                        <div key={post._id} className={styles.postBlock}>
                          <div className={styles.postHeader}>
                            <p className={styles.imageTitle}>
                              {post.title || 'Untitled post'}
                            </p>
                            {pdfUrl && (
                              <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.pdfBtn}
                              >
                                View PDF
                              </a>
                            )}
                          </div>

                          {imgs.length === 0 ? (
                            <div
                              className={styles.imageCard}
                              style={{
                                height: '250px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#f3f4f6',
                                color: '#475569',
                                fontWeight: 600,
                                textAlign: 'center',
                                padding: '12px',
                              }}
                            >
                              No image available
                            </div>
                          ) : (
                            <div className={styles.postImages}>
                              {imgs.map((img, i) => (
                                <div key={`${post._id}-${i}`} className={styles.imageCard}>
                                  <div className={styles.imageWrapper}>
                                    <img
                                      src={resolveMediaUrl(img)}
                                      alt={post.title || "gallery"}
                                      loading="lazy"
                                      onClick={() => setSelectedImage(img)}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                </div>

              ))}
            </div>

          )}
        </div>
      </section>

      {/* ✅ LIGHTBOX */}
      {selectedImage && (
        <div
          className={styles.lightbox}
          onClick={() => setSelectedImage(null)}
        >
          <span className={styles.close}>×</span>

          <img
            src={resolveMediaUrl(selectedImage)}
            alt="full"
            className={styles.lightboxImg}
          />
        </div>
      )}
    </>
  )
}