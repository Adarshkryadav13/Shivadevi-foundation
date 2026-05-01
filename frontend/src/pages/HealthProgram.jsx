import health from '../assets/health.jpeg';

export default function EducationProgram() {
    return (
      <div className='program'>
      <div className="program-section reverse">
  
        {/* LEFT IMAGE */}

        <div className="program-right">
          <img 
            src={health}
            alt="health-png" 
          />
        </div>
  
        {/* RIGHT CONTENT */}
        <div className="program-left">
          <h1>Healthcare Initiatives – Advancing SDG 3: Good Health & Well-being</h1>
  
          <p>
            At Shivadevi Foundation, we are deeply committed to building a healthier, stronger, and more resilient society. Guided by the vision of SDG 3: Good Health and Well-being, our
            healthcare initiatives focus on ensuring that quality health services, awareness, and preventive care reach even the most underserved communities.
            We believe that healthcare is not just about treatment—it is about awareness, prevention, accessibility, and dignity for every individual.
          </p>
  
          <h3>Our Approach</h3>
          <p>Our healthcare model is community-driven, inclusive, and impact-oriented. We actively engage with local communities, schools, and institutions to create sustainable health
            awareness and support systems. Through a combination of on-ground interventions and strategic partnerships, we are working to bridge the healthcare gap at the grassroots
            level.</p>
  
        </div>
      </div>
      <section className='program-edus'>
        <h3>What We Do</h3>
        <ol>
          <li>Health Awareness & Preventive Education</li>
          <p>We conduct regular awareness campaigns in rural and urban underserved areas, focusing on hygiene, nutrition, menstrual health, mental well-being, and substance abuse prevention. By educating communities, we empower individuals to take charge of their health.</p>
          <li>Free Health Check-up Camps</li>
          <p>We organize periodic medical camps offering basic health screenings such as blood pressure, sugar levels, hemoglobin tests, and eye check-ups. These camps help in early
          detection and timely intervention of health issues.</p>
          <li>Nutrition & Child Health Programs</li>
          <p>Our initiatives address malnutrition among children and support maternal health. We provide nutritional support, monitor child development, and conduct awareness sessions
          for pregnant and lactating women.</p>
          <li>Mental Health & Well-being</li>
          <p>Recognizing the importance of mental health, we organize counseling sessions, youth engagement programs, and awareness drives to reduce stigma and promote emotional
          well-being.</p>
          <li> Sanitation & Cleanliness Drives</li>
          <p>We actively promote hygiene and sanitation through cleanliness drives, safe drinking water awareness, and waste management initiatives—reducing the risk of preventable
          diseases.</p>
          <li>De-addiction & Nasha Mukti Campaigns</li>
          <p>Our foundation strongly advocates for a drug-free society. Through awareness programs, community engagement, and partnerships, we work towards preventing substance
          abuse and supporting rehabilitation efforts.</p>
          <li>Women Health & Hygiene Initiatives</li>
          <p>We empower women by addressing critical health issues such as menstrual hygiene, anemia, and reproductive health. Our programs include awareness sessions and
          distribution of essential hygiene products.</p>
          <li>Emergency Response & First Aid Training</li>
          <p>We train volunteers and community members in basic first aid and emergency response, enabling quicker and more effective action during critical situations.</p>
          <li>Connecting Communities to Government Healthcare Schemes</li>
          <p>We assist individuals in accessing government healthcare schemes and insurance programs, ensuring that financial limitations do not prevent them from receiving proper
          treatment.</p>
        </ol>
        <br />
        <h3>Our Future Vision</h3>
        <p>While we have made significant progress, we
continue to evolve. One of our key future
initiatives is to introduce Mobile Health Services
and Telemedicine, enabling us to reach remote
and underserved populations with timely medical
support and consultations.</p>
<br />
<h3>Why Partner With Us</h3>
<li>Proven grassroots impact across multiple health domains</li>
<li>Strong community trust and engagement</li>
<li>Scalable and sustainable healthcare interventions</li>
<li>Alignment with global development goals (SDGs)</li>
<br />
<h3>Join Us in Creating Healthier Communities</h3>
<p>We invite CSR partners, donors, volunteers, and organizations to collaborate with us in this mission.
Together, we can ensure that no individual is deprived of basic healthcare and well-being.</p>
<br />
<h2>Let’s build a healthier tomorrow—together.</h2>
      </section>
      </div>
    );
  }