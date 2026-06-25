import "./challenge1.css";
import toxinToxinImg from '../../assets/toxintoxin.png';
import Footer from "../../components/footer/footer";
import airImg from "../../assets/air.png";
import foodImg from "../../assets/pesticide.png";
import stressImg from "../../assets/stress.png";


export default function DetoxChallenge() {
    return (
        <>
            <section className="detox-section">

                {/* Left Column */}
                <div className="left-content">
                    <img
                        src={toxinToxinImg}
                        alt="Toxin-Toxin Bye Bye Challenge"
                    />

                    <h2 className="quote">
                        WE CAN'T STOP THE WORLD FROM PRODUCING TOXINS BUT WE CAN LEARN HOW TO
                        GET RID OF THEM...
                    </h2>
                </div>

                {/* Center Column */}
                <div className="middle-content">
                    <p className="subtitle">
                        A Gift Your Body Will Thank You For...
                    </p>

                    <h1 className="main-title">
                        TOXIN-TOXIN
                        <br />
                        BYE-BYE
                    </h1>

                    <p className="description">
                        Simple Steps to DETOXIFY OUR BODIES!!
                    </p>

                    <p className="dates">
                        5 Days of Impactful Habits : Jun 9th - 13th
                    </p>

                    <div className="registration-card">
                        <h3>Registrations Closed !!!</h3>
                        <p>For INR 299</p>
                    </div>
                </div>

            </section>
            
            <section className="toxins-section">
                <div className="toxins-container">
                    <h1 className="toxins-title">
                        CAN YOU REALLY STAY
                        <br />
                        AWAY FROM TOXINS IN YOUR
                        <br />
                        DAILY LIFE?
                    </h1>

                    {/* Card 1 */}
                    <div className="toxin-block">
                        <h2 className="question">
                            CAN YOU STOP THE POLLUTION IN YOUR CITY?
                        </h2>

                        <div className="toxin-card">
                            <div className="image-side">
                                <img src={airImg} alt="Air Pollution" />
                            </div>

                            <div className="text-side">
                                WE CANNOT ALWAYS CONTROL THE AIR WE BREATHE AND THE TOXINS THAT
                                COME ALONG WITH IT! BUT WE CAN TEACH OUR BODIES HOW TO ELIMINATE
                                THEM EFFECTIVELY.
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="toxin-block">
                        <h2 className="question right">
                            CAN YOU STOP THE USE OF PESTICIDES IN YOUR FOOD?
                        </h2>

                        <div className="toxin-card reverse">
                            <div className="text-side">
                                EVEN IF WE BUY ORGANIC VEGETABLES, WE CANNOT STOP TOXINS COMING
                                FROM FOOD! BUT WE CAN USE SOME TECHNIQUES TO REMOVE THEM FROM OUR
                                BODIES.
                            </div>

                            <div className="image-side">
                                <img src={foodImg} alt="Food Toxins" />
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="toxin-block">
                        <h2 className="question">
                            CAN YOU REMOVE STRESS FROM YOUR DAILY LIFE?
                        </h2>

                        <div className="toxin-card">
                            <div className="image-side">
                                <img src={stressImg} alt="Stress" />
                            </div>

                            <div className="text-side">
                                PERHAPS NOT! BUT WE CAN DEFINITELY LEARN SOME TECHNIQUES TO REDUCE
                                STRESS AND REMOVE THE TOXINS IT CREATES ON A REGULAR BASIS!
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}