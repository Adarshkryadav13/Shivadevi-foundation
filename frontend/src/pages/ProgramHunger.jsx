import food from "../assets/food.jpeg";
import { Link } from "react-router-dom";
export default function ProgramDetail() {

    return (
        <div className="program">
        <div className="program-section">

            {/* LEFT SIDE */}
            <div className="program-left">
                <h1>Hunger Relief Initiatives – Advancing SDG 2: Zero Hunger</h1>

                <p>
                    At Shivadevi Foundation, we are committed to addressing one of the most fundamental human needs—access to food. In alignment with SDG 2: Zero
                    Hunger, our hunger relief initiatives are designed to provide immediate food support while working towards long-term nutritional security for
                    vulnerable communities.

                </p>
                <span>
                    We believe that no individual should sleep hungry, and every meal served is a step toward dignity, health, and hope
                </span>

                <h3>Our Approach</h3>
                <p>
                    populations through targeted food distribution and emergency response efforts, we aim to reduce hunger while building pathways toward a healthier
                    future.
                </p>
            </div>
            {/* RIGHT SIDE */}
            <div className="program-right">
                <img
                    src={food}
                    alt="Hunger Relief"
                />
            </div>
            
        </div>
        <div className="program-middle">
            <h3>What We Do</h3>
                <ul>
                    <li>Food Distribution Drives</li>
                    <p>We conduct periodic food distribution drives for underprivileged communities, including daily wage workers, homeless individuals, and migrant
                        families. Our focus remains on delivering fresh, hygienic, and nutritious meals to those who need them the most.</p>
                    <li>Dry Ration Support</li>
                    <p>During times of need, we distribute essential ration kits containing staples such as rice, pulses, and cooking oil. These kits help families sustain
                        themselves over longer periods and reduce the risk of food insecurity.</p>
                    <li>Emergency Hunger Relief</li>
                    <p>In times of crisis—such as natural disasters, pandemics, or unexpected disruptions—we respond swiftly with food assistance. Our emergency drives
                        ensure that affected communities receive timely support when they are most vulnerable.</p>

                </ul>
<br />

                <h3>Why This Matters</h3>
                <p>
                    Millions still struggle with hunger and malnutrition
                    <br />
                    <p>Access to nutritious food directly impacts health, education, and productivity</p>
                    <p>Timely food support can transform lives and restore dignity</p>
                    <p>Through our initiatives, we are not just feeding people—we are nurturing communities and building a foundation for a
                        healthier society.</p>

                </p>
                <br />
                <h3>Our Future Vision </h3>
                <p>While we continue to strengthen our current efforts,
                    we are committed to expanding our impact through
                    more structured and sustainable initiatives:</p>
                <ul>
                   <span className="text">  1. Nutrition-Focused Food Programs </span>
                    <p>
                        We aim to go beyond basic food distribution by introducing
                        nutrition-based support systems. This includes providing
                        balanced meals and specialized nutrition kits for children,
                        pregnant women, and elderly individuals—helping combat
                        malnutrition and improve overall health outcomes.
                    </p>
                    <span className="text">2. School Feeding Programs </span> 
                    <p>
                        To support both education and nutrition, we plan to initiate
                        school feeding programs in underserved areas. By ensuring
                        that children receive at least one nutritious meal a day, we
                        aim to improve school attendance, concentration, and
                        long-term development.
                    </p>
                </ul>
                <br />
                <h3>Why Partner With Us</h3>
                <li>Strong grassroots presence and community trust</li>
                <li>Transparent and accountable operations</li>
                <li>Scalable hunger relief programs</li>
                <li>Alignment with global SDG goals</li>
                <li>Clear vision for sustainable impact</li>
                <br />

                <h3>Join Us in the Fight Against Hunger</h3>
                <p>We invite CSR partners, donors, and volunteers to join hands with Shivadevi Foundation in this
                mission. Together, we can ensure that no plate remains empty and no life is held back by hunger.</p>
                <br />
            <Link to="/donate" className="btn-primary">💚 Your support can turn hunger into hope.</Link>
            </div>

        </div>
        
        
    );
}