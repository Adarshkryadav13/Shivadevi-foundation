import env from '../assets/env.jpeg';

export default function EducationProgram() {
    return (
      <div className='program'>

     
      <div className="program-section reverse">
  
        {/* LEFT IMAGE */}
        <div className="program-right">
          <img 
            src={env}
            alt="environmental-png" 
          />
        </div>
  
        {/* RIGHT CONTENT */}
        <div className="program-left">
          <h1>Environmental Sustainability – Advancing SDG 13, 14 & 15</h1>
  
            <p>
              At Shivadevi Foundation, we recognize that the health of our planet is directly connected to the well-being of humanity. Our environmental initiatives are aligned with SDG 13:
              Climate Action, SDG 14: Life Below Water, and SDG 15: Life on Land, driving meaningful action towards a cleaner, greener, and more sustainable future.
              We are committed to protecting natural ecosystems, reducing environmental degradation, and building climate-resilient communities through consistent and scalable
              interventions.
            </p>
  
        <h3>Our Approch</h3>
            <p>Our approach is action-oriented, community-driven, and impact-focused. We actively engage volunteers, local communities, institutions, and corporate partners to create
              measurable environmental impact at the grassroots level.
              By combining awareness with action, we ensure that environmental responsibility becomes a shared movement rather than an isolated effort.</p>
          </div>
      </div>
          <section className='program-edus'>
             <h3>What We Do</h3>
             <ol>
              <li>Tree Plantation & Green Drives</li>
              <li>Beach & Water Body Clean-up Campaigns</li>
              <li>Plastic-Free Awareness Initiatives</li>
              <li>Waste Management & Recycling Programs</li>
              <li> Climate Change Awareness & Youth Engagement</li>
              <li> Water Conservation Initiatives</li>
              <li>Biodiversity Protection Efforts</li>
              <li>Sustainable Livelihood Initiatives</li>
              <li>Climate & Disaster Response</li>
              <li>Collaborative Environmental Partnerships</li>
             </ol>
             <br />
             <h3>Our Vision for the Future</h3>
            <p>While we have already initiated impactful programs across
            multiple environmental domains, our vision is to expand
            these efforts on a much larger scale—reaching more
            communities, restoring more ecosystems, and driving long-
            term sustainability.
            To achieve this, strategic partnerships and CSR support are
            essential in enabling us to amplify our impact and implement
            large-scale environmental solutions.</p>
            <br />
            <h3>Why This Matters</h3>
            <li>Climate change is one of the greatest challenges of our time</li>
            <li>Pollution and environmental degradation directly impact health and livelihoods</li>
            <li>Our work is not just about environmental action—it is about securing the future of communities and the planet.</li>
            <br />
            <h3>Why Partner With Us</h3>
            <li>Proven track record of on-ground environmental initiatives</li>
            <li>Strong community engagement and volunteer network</li>
            <li>Alignment with global sustainability goals (SDGs)</li>
            <li>Transparent and accountable implementation</li>
            <li>Scalable and measurable impact programs</li>
            <br />
            <h2>We invite CSR partners, organizations, and individuals to join hands with Shivadevi Foundation in this mission.</h2>
            <h2>Together, we can restore balance, protect nature, and create a sustainable world for future generations.</h2>
            </section>
      </div>
    );
  }