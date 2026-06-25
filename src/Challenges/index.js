import './index.css';
import { useState } from "react";

// 1. Import your three real local images at the very top
import organCleanseImg from '../assets/organcleanse.png';
import toxinToxinImg from '../assets/toxintoxin.png';
import cookingImg from '../assets/cooking.png';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

function Challenges() {
    const [activeTab, setActiveTab] = useState("upcoming");
    return (
        <div className="container">
            
            <div className="header">
                <h1>Challenges</h1>
                <button>🔔</button>
            </div>
            <div className="hero">
                <h2>Do You Have It In You?</h2>

                <p>
                    Discover a variety of exciting challenges designed to motivate and inspire you on your journey to a healthier lifestyle. From hydration and steps challenges to weight loss and cooking adventures, there's something for everyone! And that's not all—we have many more challenges waiting for you to explore.
                </p>
            </div>
            <div className="challenge-grid">
                <div className="challenge-card">
                    {/* 2. Swapped out Unsplash URL for your organCleanseImg */}
                    <img
                        src={organCleanseImg}
                        alt="Organ Cleanse Challenge"
                    />

                    <div className="challenge-content">
                        <h3>
                            5 Days Organ Cleanse Challenge
                        </h3>

                        <p>
                            Reset your body, renew your health!
                        </p>

                        <p>10th June - 14th June 2026</p>

                        <button>View Details</button>
                    </div>
                </div>
            </div>
            <div className="tabs">
                <button
                    className={activeTab === "upcoming" ? "active-tab" : ""}
                    onClick={() => setActiveTab("upcoming")}
                >
                    Upcoming Challenges
                </button>

                <button
                    className={activeTab === "past" ? "active-tab" : ""}
                    onClick={() => setActiveTab("past")}
                >
                    Past Challenges
                </button>
            </div>

            {activeTab === "upcoming" && (
                <div className="challenge-grid">
                    <div className="challenge-card">
                        {/* 3. Swapped out Unsplash URL for your toxinToxinImg */}
                        <img
                            src={toxinToxinImg}
                            alt="Toxin-Toxin Bye Bye Challenge"
                        />

                        <div className="challenge-content">
                            <h3>
                                Toxin-Toxin Bye Bye: Simple Steps to Detoxify Our Bodies!
                            </h3>

                            <p>
                                A Gift Your Body Will Thank You For! 5 Days of Impactful Habits.
                            </p>

                            <p>8th July - 12th July 2026</p>

                            <button>View Details</button>
                        </div>
                    </div>
                    <div className="challenge-card">
                        {/* 3. Swapped out Unsplash URL for your toxinToxinImg */}
                        <img
                            src={cookingImg}
                            alt="Cooking Challenge"
                        />

                        <div className="challenge-content">
                            <h3>
                                Discover The Secrets To Making Your Daily Meals Healthier In 5 Days
                            </h3>

                            <p>
                                You Are What You Eat - Cook Smarter, Nourish Better.
                            </p>

                            <p>12th August - 16th August 2026</p>

                            <button>View Details</button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "past" && (
                <div className="challenge-card">
                    <h3>Water Challenge</h3>
                    <p>Completed in May 2026</p>
                </div>
            )}

            <div className="how-to-join">
                <h2>How to Accept a Challenge?</h2>

                <p className="join-description">
                    Wellness Atlas Challenges are run every month for 3-5 days, and are priced between INR 299 - INR 999. If you would like to participate, we encourage that you contact a Wellness Atlas Member+ in your social circle (you are sure to find one) or reach back to the person who referred you to this page.
                </p>

                <p className="join-highlight">
                    NEVERTHELESS, IF ALL THAT FAILS, YOU CAN STILL CHOOSE TO FILL
                    OUR CONTACT US FORM. PLEASE GIVE US 48 HOURS TO REACH BACK TO YOU.
                </p>

                <button className="contact-button">
                    CONTACT US
                </button>
            </div>
        </div>
    );
}

export default Challenges;
