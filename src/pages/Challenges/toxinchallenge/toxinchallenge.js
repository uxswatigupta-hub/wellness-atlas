import logoImg from "../../../assets/logo/WellnessAtlas_Logo1.png";
import { useNavigate } from "react-router-dom";

/* ============================================================
   Toxin–Toxin, Bye-Bye · Wellness Atlas landing page
   Rebuilt on the UPDATED wellness-atlas.css (.wa-page theme).

   • Root carries `wa-page` → shared earth/clay theme (same as the
     Health & Sleep pages). Retheme everything from the CSS token block.
   • All colours read theme tokens (var(--accent), var(--forest), …).
   • Buttons are inline-styled (immune to app/global CSS collisions).
   • Bootstrap 5 grid (.row + .col-12 col-md-6 col-lg-4) → 3 / 2 / 1
     columns on desktop / tablet / mobile, automatically.

   PREREQUISITE — install Bootstrap and import once (index.js):
     npm i bootstrap
     import "bootstrap/dist/css/bootstrap.min.css";
     import "./styles/wellness-atlas.css";

   USAGE:
     import ToxinChallenge from "./toxinchallenge";
     <ToxinChallenge registrationOpen={false} price="299"
                     reviewsSlot={<PowerReviews/>} />
   ============================================================ */

import React from "react";

/* ---- type + token shorthands ---- */
const SERIF = "'Newsreader', Georgia, serif";
const SANS = "'Archivo', 'Helvetica Neue', Arial, sans-serif";

const eyebrow = { fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(18px,2vw,22px)", color: "var(--accent)", margin: 0 };
const h1Style = { fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(44px,5.4vw,76px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "var(--ink)", margin: 0 };
const h2Style = { fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(28px,3.6vw,42px)", lineHeight: 1.12, letterSpacing: "-0.01em", color: "var(--ink)", margin: 0 };
const subStyle = { fontFamily: SERIF, fontSize: "clamp(19px,2vw,23px)", lineHeight: 1.5, color: "var(--ink-3)", margin: 0, textWrap: "pretty" };
const leadStyle = { fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(18px,2vw,23px)", color: "var(--accent)", margin: 0 };
const bodyStyle = { fontFamily: SANS, fontSize: 15.5, lineHeight: 1.65, color: "var(--ink-3)", margin: 0, textWrap: "pretty" };
const tagStyle = { fontFamily: SANS, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", margin: 0 };
const cardTitle = { fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(22px,2.2vw,27px)", lineHeight: 1.25, color: "var(--ink)", margin: 0 };

/* ---- buttons (inline so no global CSS can override them) ---- */
const btnSolid = {
    display: "inline-block", fontFamily: SANS, fontSize: 12, fontWeight: 700,
    letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none",
    padding: "14px 26px", borderRadius: "var(--btn-radius, 8px)",
    color: "var(--paper-2)", background: "var(--accent)", border: "1.5px solid var(--accent)",
    cursor: "pointer", whiteSpace: "nowrap", textAlign: "center", lineHeight: 1.2,
};
const ruleLine = { height: 2, width: "100%", maxWidth: 600, background: "var(--accent)", margin: "24px auto", borderRadius: 2 };

/* ============================================================ */
/* Image map                                                    */
/* ============================================================ */
const IMG = {
    hero: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=75",
    "reason-0": "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&q=70",
    "reason-1": "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&q=70",
    "reason-2": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=500&q=70",
    thinking: "https://images.unsplash.com/photo-1592621385612-4d7129426394?w=600&q=70",
    gift: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=900&q=75",
    "lesson-0": "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&q=70",
    "lesson-1": "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=70",
    "lesson-2": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=70",
    "lesson-3": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=70",
    "lesson-4": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=70",
    "lesson-5": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=70",
};

/* ============================================================ */
/* Data                                                         */
/* ============================================================ */
const REASONS = [
    { id: "reason-0", alt: "City pollution", title: "Can you stop the pollution in your city?", body1: "We cannot always control the air we breathe and the toxins that come along with it!", body2: "But we can teach our bodies how to eliminate them effectively." },
    { id: "reason-1", alt: "Pesticides on crops", title: "Can you stop the use of pesticides in your food?", body1: "Even if we buy organic vegetables, we cannot stop toxins coming from food!", body2: "But we can use some techniques to remove them from our bodies." },
    { id: "reason-2", alt: "Daily stress", title: "Can you remove stress from your daily life?", body1: "Perhaps not!", body2: "But we can definitely learn some techniques to reduce stress and remove the toxins it creates on regular basis!" },
];

const CHECKLIST = [
    "You want to learn simple yet impactful techniques to remove toxins from your body in your regular lifestyle.",
    "You are keen to boost your immune system and build a foundation of health for yourself for years to come.",
    "You feel fatigued and sluggish and are longing to experience higher energy throughout the day.",
    "You want to benefit by doing activities together with a large group of health enthusiasts and under guidance of health coaches.",
];

const HEALTHY_BENEFITS = [
    { bold: "It includes SIMPLE YET POWERFUL TECHNIQUES,", rest: " to remove toxins from your body," },
    { bold: "GUIDANCE AND SUPPORT,", rest: " to learn and implement the techniques," },
    { bold: "BENEFIT FROM GROUP ENERGY,", rest: " by practising with a large group of health enthusiasts!" },
];

const LIFESTYLE_CARDS = [
    { title: "One with poor lifestyle", body: "This is a no-brainer, and you know it! If your food habits are poor and your routine sedentary, this challenge is for you!" },
    { title: "One with average lifestyle", body: "Most of us belong here! Time to take charge of our health before a health issue comes looking for us!" },
    { title: "One with healthy lifestyle", body: "Knowing and doing are two different things and practising with a high energy group definitely helps!" },
];

const LESSONS = [
    {
        id: "lesson-0", tag: "RELEASING TOXINS #1", title: "By Cleansing The Gut", alt: "Green smoothie", paras: [
            "It is well known that a clean gut is foundation to good health!",
            "Also called the \u201Csecond brain\u201D, our gut plays a vital role in having a strong immune system, better synthesis of vitamins and minerals, absorption of nutrients, stronger psychological set up and many more aspects.",
            "Regular removal of toxins from the gut is important to ensure that we can enjoy good health!",
        ]
    },
    {
        id: "lesson-1", tag: "RELEASING TOXINS #2", title: "Via The Lymphatic System", alt: "Lymphatic massage", paras: [
            "Our lymphatic system plays a very vital role in our body's natural defense mechanism and removal of toxins from our body! But it is also the least spoken about aspect of our health today.",
            "Learning how to activate our lymphatic system and maintain a healthy circulation of lymph on a regular basis is extremely vital to eliminate toxins from our body and reduce instances of inflammation and ill health!",
        ]
    },
    {
        id: "lesson-2", tag: "RELEASING TOXINS #3", title: "Through The Skin", alt: "Skin care", paras: [
            "Skin is the largest organ in our body and one of the channels of waste elimination!",
            "Keeping a healthy and clean skin and using techniques to facilitate waste removal from the skin is an easy way to ensure that our body is able to get rid of toxins on a regular basis.",
        ]
    },
    {
        id: "lesson-3", tag: "RELEASING TOXINS #4", title: "Through The Oral Cavity", alt: "Oral health", paras: [
            "They say that if you don't want to look stupid, don't open your mouth! But the same is true if you haven't taken care of your oral health.",
            "Our body uses our oral cavity as an important channel to eliminate toxin build up. Learning techniques to remove them from our mouth and practising them regularly is vital to ensure that we allow our body to eliminate toxins effectively.",
        ]
    },
    {
        id: "lesson-4", tag: "RELEASING TOXINS #5", title: "Through The Breath", alt: "Breathing outdoors", paras: [
            "Although this may not be intuitive for many, breathing techniques can be very effective in removing toxins from our body!",
            "Learning and practising correct breathing techniques on one hand reduces the production of toxins at a cellular level and also accelerates the process of eliminating it from our bodies!",
        ]
    },
    {
        id: "lesson-5", tag: "BONUS", title: "Technique To Eliminate 10X Toxins!", alt: "Herbal detox tea", paras: [
            "While it is important to remove toxins from the gut, from time to time, it is also important that we clean the entire alimentary canal and remove all accumulated waste.",
            "This will be a bonus - and optional - activity for those participants who wants to go the extra mile!",
        ]
    },
];

const INCLUDES = [
    { text: "5 days of time tested and highly impactful techniques to remove toxins.", price: "(INR 1,999/-)" },
    { text: "Access to a highly motivated COMMUNITY for motivation.", price: "(INR 999/-)" },
    { text: "An opportunity to INSPIRE your loved ones towards a healthy life.", price: "(\u201CPriceless\u201D)" },
];

const TESTIMONIALS = [
    { author: "Mani & Shalini (Bangalore)", text: "Thank you so much for such a wonderful 5 day \u201CToxin Toxin, Bye Bye\u201D challenge! It was a great experience for both of us.\n\nWe learnt so many new things during the challenge, and so many of them like oil pulling have become a part of our daily routine. There were many clear benefits. We feel lighter and more energetic and Shalini also lost 1.5 kg!\n\nIt was an awesome experience and I hope everyone gets a chance to go through it. Thank you so much for your consistent guidance!" },
    { author: "Nishant (Delhi)", text: "Embarking on the 5-day \u201CToxin Toxin, Bye Bye\u201D challenge was a new adventure. While I had tried detox drinks before, committing to a full regimen was unexplored territory.\n\nIt pleasantly surprised me\u2014it wasn't about fasting but rather making subtle dietary adjustments each day. What stood out was its holistic approach, touching on lifestyle habits beyond food. Shedding 1.5 kg was just a bonus; the real gain was feeling more in control and confident.\n\nLooking back, it wasn't just a challenge\u2014it was a transformative journey toward a healthier, more empowered version of myself." },
    { author: "Shilpa (New Jersey, US)", text: "I have always been a fan of detox drinks and had joined this challenge expecting to try some new and exotic detox drinks!\n\nBut to my pleasant surprise, this full body toxin removal experience was new and simply amazing. It gave me a whole new perspective about detoxification. It is much more than a drink!\n\nMy body and mind felt light and relaxed. Along with that, sleep quality had improved and body fat had reduced. My mind became clearer and overthinking had also reduced. Thank you for this wonderful experience!" },
    { author: "Girish (Bangalore)", text: "Thank you so much for such an exciting experience! I always used to come across 5-day detox programs at yoga centers and resorts. They are usually costly and one needs to travel to attend them!\n\nBut you helped us do all of them from the comfort of our homes! Activities were clearly explained along with the reasons behind doing any activity. It was an eye opener to find out how much toxins do we put in our body!\n\nFelt very light and energetic after 5 days. Thank you so much for designing such a wonderful program and making us all healthy." },
];

const FAQS = [
    { q: "How is this challenge going to be different than other detox challenges?", a: "Most detox challenges limit themselves to detox drinks and other food elements. This challenge is carefully crafted to include time tested techniques to facilitate removal of toxins from your body!" },
    { q: "I have some health conditions. Should I participate?", a: "Unless you have a severe gut condition like IBS or are pregnant or nursing, you can participate. For guidance on your specific case, please discuss with the person who have invited you to participate in this challenge." },
    { q: "I have work related or family related commitments. Would I be able to participate?", a: "All activities that we will practice as part of this challenge do not require too much time and can be done with a little bit of preparation. It is possible to do them with your daily routine." },
    { q: "I already lead a healthy lifestyle. Would I derive any value from this challenge?", a: "We think so! One, it is possible that you would learn a thing or two that you didn't know. Second, it's easy to become consistent with a habit if we do it with a group of like minded people versus if we do it alone." },
    { q: "I am on medications. Do I need to consult my doctor before participating?", a: "We don't think it is required. You should continue to take your medications regularly, as prescribed by your doctor." },
    { q: "Will there be any personalised recommendations given with respect to my diet or lifestyle?", a: "While we would love to do so, the format of this challenge does not allow for that. Having said that, you are welcome to explore other individual program offerings with us. The person who has invited you will be able to guide you towards it." },
];

const FOOTER_LINKS = ["Terms of use", "Privacy policy", "About us", "FAQs", "Contact us", "Refund policy"];

/* ============================================================ */
/* Helpers                                                      */
/* ============================================================ */
function Section({ children, id, bg, max = 1180, py = "clamp(44px,6vw,76px)" }) {
    return (
        <section id={id} style={{ padding: `${py} 0`, background: bg }}>
            <div style={{ maxWidth: max, margin: "0 auto", padding: "0 clamp(22px,5vw,40px)" }}>{children}</div>
        </section>
    );
}

function Img({ id, alt, images, style, imgStyle }) {
    const src = (images && images[id]) || IMG[id];
    if (!src) return <div style={style} />;
    return (
        <div style={style}>
            <img src={src} alt={alt} referrerPolicy="no-referrer" loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...imgStyle }} />
        </div>
    );
}

function BigCta({ href, title, sub, max = 620 }) {
    return (
        <a href={href} style={{ display: "block", maxWidth: max, margin: "0 auto", background: "var(--accent)", color: "#fff", textDecoration: "none", padding: "20px 26px", borderRadius: "var(--btn-radius, 8px)", textAlign: "center" }}>
            <span style={{ display: "block", fontFamily: SANS, fontWeight: 700, fontSize: "clamp(20px,2.2vw,24px)", letterSpacing: "-0.01em" }}>{title}</span>
            <span style={{ display: "block", fontFamily: SANS, fontSize: 15, marginTop: 6, opacity: 0.92 }}>{sub}</span>
        </a>
    );
}

const frame = (ratio, accentBorder) => ({
    position: "relative", aspectRatio: ratio, overflow: "hidden",
    background: "var(--forest-2)", borderRadius: "var(--card-radius, 16px)",
    border: accentBorder ? "4px solid var(--accent)" : "1px solid var(--line)",
});

/* ============================================================ */
/* Component                                                    */
/* ============================================================ */
export default function ToxinChallenge({
    registrationOpen = false,
    price = "299",
    images = {},
    reviewsSlot = null,
    enrolHref = "#enrol",
}) {
    const heroCtaTitle = registrationOpen ? "Enrol Now" : "Registrations Closed !!!";
    const heroCtaSub = `For INR ${price}`;
    const bigCtaTitle = registrationOpen ? "Save Your Seat Now!" : "Registrations Closed!";
    const bigCtaSub = `Click Here To Save Your Seat Now For INR ${price}/-`;
    const navigate = useNavigate();
    return (
        <div className="wa-page">

            {/* NAV */}
            <header className="tt-nav">
                <div className="tt-container d-flex align-items-center justify-content-between" style={{ paddingTop: 16, paddingBottom: 16 }}>
                    <a href="/" className="tt-brand" style={{ gap: ".7rem" }}>
                        <img src={logoImg} alt="Wellness Atlas" className="tt-brand-logo" />
                        {/*<span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 20, color: "var(--ink)" }}>Wellness Atlas</span>*/}
                    </a>
                    <div className="d-none d-lg-flex align-items-center ms-auto" style={{ gap: "1.75rem" }}>
                        <a href="#how" className="tt-nav-link">How it works</a>
                        <a href="#faq" className="tt-nav-link">FAQ</a>
                        <a href="#stories" className="tt-nav-link">Stories</a>
                        <button type="button" className="ms-auto ms-lg-0" style={btnSolid} onClick={() => navigate("/login")}>LOGIN</button>
                    </div>
                    {/*<div className="d-flex align-items-center gap-3">
                        <span className="tt-nav-link">Dashboard</span>
                        <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--forest)", color: "var(--paper-2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontSize: 14, fontWeight: 600 }}>G</span>
                    </div>*/}


                </div>
            </header>

            {/* HERO */}
            <Section>
                <div className="row g-4 g-lg-5 align-items-center">
                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        <Img id="hero" images={images} style={frame("4 / 3")} alt="Woman meditating at sunrise" />
                        <p style={{ ...subStyle, fontStyle: "italic", fontSize: "clamp(16px,1.8vw,19px)", marginTop: 22 }}>We can't stop the world from producing toxins but we can learn how to get rid of them…</p>
                    </div>
                    <div className="col-12 col-lg-6 order-1 order-lg-2 text-center">
                        <p style={{ ...eyebrow, marginBottom: 10 }}>A Gift Your Body Will Thank You For…</p>
                        <h1 style={{ ...h1Style, marginBottom: 18 }}>TOXIN-TOXIN<br />BYE-BYE</h1>
                        <p style={{ ...subStyle, marginBottom: 14 }}>Simple Steps to <strong style={{ color: "var(--ink)" }}>Detoxify Our Bodies!!</strong></p>
                        <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: "var(--accent)", margin: "0 0 26px" }}>5 Days of Impactful Habits · July 9th – 13th</p>
                        <BigCta href={enrolHref} title={heroCtaTitle} sub={heroCtaSub} max={380} />
                    </div>
                </div>
            </Section>

            {/* DAILY LIFE — 3-up */}
            <Section>
                <h2 style={{ ...h2Style, textAlign: "center", marginBottom: 8 }}>Can you really stay away from toxins in your daily life?</h2>
                <p style={{ ...leadStyle, textAlign: "center", marginBottom: 44 }}>Maybe not!</p>
                <div className="row g-4 justify-content-center">
                    {REASONS.map((r) => (
                        <div className="col-12 col-md-6 col-lg-4" key={r.id}>
                            <div className="h-100 d-flex flex-column align-items-center text-center" style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--card-radius, 16px)", padding: "40px 28px 30px" }}>
                                <Img id={r.id} images={images} style={{ ...frame("1 / 1", true), width: 140, height: 140, borderRadius: "50%", marginBottom: 22, flex: "none" }} alt={r.alt} />
                                <h3 style={{ ...cardTitle, marginBottom: 14 }}>{r.title}</h3>
                                <p style={{ ...bodyStyle, marginBottom: 10 }}>{r.body1}</p>
                                <p style={{ ...bodyStyle, marginBottom: 26 }}>{r.body2}</p>
                                <a className="mt-auto" style={btnSolid} href={enrolHref}>ENROL NOW</a>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* QUOTE */}
            <Section max={880} py="clamp(36px,5vw,60px)">
                <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(22px,2.8vw,32px)", lineHeight: 1.45, color: "var(--ink)", textAlign: "center", margin: 0, textWrap: "pretty" }}>'Illness is the result of improper removal of toxins from the body!'</p>
            </Section>

            {/* FOR ME TOO */}
            <Section py="clamp(20px,3vw,32px)">
                <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--card-radius, 16px)", padding: "clamp(28px,4vw,48px)" }}>
                    <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(22px,2.4vw,28px)", color: "var(--ink)", textAlign: "center", margin: 0 }}>Is The TOXIN-TOXIN, BYE-BYE Challenge</h2>
                    <h2 style={{ ...h2Style, textAlign: "center", marginTop: 4 }}>For Me Too?</h2>
                    <div style={ruleLine} />
                    <p style={{ fontFamily: SERIF, fontSize: "clamp(18px,2vw,22px)", color: "var(--ink-3)", textAlign: "center", margin: 0 }}><strong style={{ color: "var(--ink)" }}>YES!</strong> This Challenge Is For You, Specially If…</p>
                    <div style={ruleLine} />
                    <div style={{ background: "var(--forest)", borderRadius: "var(--card-radius, 16px)", padding: "clamp(20px,3vw,32px)", marginTop: 12 }}>
                        <div className="row g-4 align-items-center">
                            <div className="col-12 col-md-4 col-lg-3">
                                <Img id="thinking" images={images} style={frame("3 / 4")} alt="Woman relaxing at home" />
                            </div>
                            <div className="col-12 col-md-8 col-lg-9">
                                <div className="d-flex flex-column gap-3">
                                    {CHECKLIST.map((c, i) => (
                                        <div className="d-flex gap-3 align-items-start" key={i}>
                                            <span style={{ color: "var(--accent)", fontSize: 18, lineHeight: 1.5, flex: "none" }}>✓</span>
                                            <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: "var(--paper-2)", margin: 0 }}>{c}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ALREADY HEALTHY */}
            <Section py="clamp(20px,3vw,32px)">
                <div className="text-center" style={{ background: "var(--paper-2)", border: "2px dashed var(--forest)", borderRadius: "var(--card-radius, 16px)", padding: "clamp(28px,4vw,48px)" }}>
                    <h2 style={{ ...h2Style, fontSize: "clamp(27px,3.6vw,34px)" }}>I already lead a healthy lifestyle!</h2>
                    <p style={{ fontFamily: SERIF, fontSize: 18, color: "var(--ink-3)", margin: "8px 0 26px" }}>Can the TOXIN-TOXIN, BYE-BYE Challenge still add value…??</p>
                    <div style={{ background: "var(--forest)", borderRadius: "var(--card-radius, 16px)", padding: "16px 20px" }}>
                        <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: 19, color: "var(--paper-2)", margin: 0 }}>YES! This Challenge Is For You too…</p>
                    </div>
                    <div className="mx-auto text-start" style={{ maxWidth: 760, marginTop: 26 }}>
                        {HEALTHY_BENEFITS.map((b, i) => (
                            <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: "var(--ink-3)", margin: "0 0 10px" }} key={i}><strong style={{ color: "var(--ink)" }}>{b.bold}</strong>{b.rest}</p>
                        ))}
                    </div>
                </div>
            </Section>

            {/* PARTICIPANTS — 3-up */}
            <Section>
                <h2 style={{ ...h2Style, textAlign: "center", marginBottom: 44 }}>Who can participate in this challenge?</h2>
                <div className="row g-4 justify-content-center">
                    {LIFESTYLE_CARDS.map((c, i) => (
                        <div className="col-12 col-md-6 col-lg-4" key={i}>
                            <div className="h-100 d-flex flex-column align-items-center text-center" style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--card-radius, 16px)", padding: "40px 28px 30px" }}>
                                <h3 style={{ ...cardTitle, marginBottom: 14 }}>{c.title}</h3>
                                <p style={{ ...bodyStyle, marginBottom: 26 }}>{c.body}</p>
                                <a className="mt-auto" style={btnSolid} href={enrolHref}>ENROL NOW</a>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* WHAT YOU'LL LEARN */}
            <Section id="how">
                <h2 style={{ ...h2Style, textAlign: "center", marginBottom: 44, fontSize: "clamp(30px,4.6vw,46px)", lineHeight: 1.12 }}>
                    What You'll Learn During The 'TOXIN TOXIN, BYE BYE' Challenge!
                </h2>
                <div className="d-flex flex-column gap-4">
                    {LESSONS.map((l) => (
                        <div key={l.id} style={{ background: "var(--forest)", borderRadius: "var(--card-radius, 16px)", overflow: "hidden" }}>
                            <div style={{ background: "var(--paper)", padding: "22px clamp(22px,4vw,40px)" }}>
                                <p style={{ ...tagStyle, marginBottom: 6 }}>{l.tag}</p>
                                <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(24px,3vw,32px)", letterSpacing: "-0.01em", color: "var(--ink)", margin: 0 }}>{l.title}</h3>
                            </div>
                            <div style={{ padding: "clamp(22px,4vw,44px)" }}>
                                <div className="row g-4 align-items-start">
                                    <div className="col-12 col-lg-8 order-2 order-lg-1">
                                        <div className="d-flex flex-column gap-3">
                                            {l.paras.map((p, i) => <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.65, color: "var(--paper-2)", opacity: 0.92, margin: 0 }} key={i}>{p}</p>)}
                                            <a className="align-self-start mt-2" style={btnSolid} href={enrolHref}>JOIN THE CHALLENGE NOW!</a>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4 order-1 order-lg-2">
                                        <Img id={l.id} images={images} style={frame("1 / 1", true)} alt={l.alt} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* FINAL CTA */}
            <Section id="enrol" max={880}>
                <div className="text-center">
                    <p style={{ fontFamily: SERIF, fontSize: "clamp(20px,2.2vw,26px)", color: "var(--ink-3)", margin: 0 }}>Here's Your Chance To Reboot Your Body,</p>
                    <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(24px,2.8vw,34px)", color: "var(--ink)", margin: "6px 0" }}>To Lead A "Healthier" Life …</p>
                    <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(28px,3.4vw,44px)", color: "var(--accent)", margin: "8px 0 28px" }}>…WILL YOU TAKE IT?!</p>
                    <BigCta href={enrolHref} title={bigCtaTitle} sub={bigCtaSub} />
                </div>
            </Section>

            {/* EVERYTHING YOU GET */}
            <Section max={820}>
                <div className="text-center">
                    <h2 style={{ ...h2Style, fontSize: "clamp(30px,4.2vw,42px)" }}>Here's Everything You Get</h2>
                    <p style={{ ...leadStyle, margin: "10px 0 28px" }}>When You Sign Up For The 'TOXIN TOXIN, BYE BYE' Challenge</p>
                </div>
                <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--card-radius, 16px)", overflow: "hidden" }}>
                    <Img id="gift" images={images} style={frame("16 / 9")} alt="Gift boxes" />
                    <div className="text-start" style={{ padding: "clamp(22px,3vw,32px)" }}>
                        {INCLUDES.map((inc, i) => (
                            <div className="d-flex gap-2 align-items-start" style={{ marginBottom: i === INCLUDES.length - 1 ? 0 : 14 }} key={i}>
                                <span style={{ color: "var(--accent)", fontSize: 13, lineHeight: 1.7, flex: "none" }}>●</span>
                                <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.55, color: "var(--ink)", margin: 0 }}>{inc.text} <strong style={{ color: "var(--accent)" }}>{inc.price}</strong></p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center">
                    <p style={{ fontFamily: SANS, fontSize: 19, color: "var(--muted)", textDecoration: "line-through", margin: "26px 0 4px" }}>Normally: INR 2,998/-</p>
                    <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(26px,2.6vw,34px)", color: "var(--accent)", margin: "0 0 28px" }}>Today's Price: INR {price}/-!</p>
                    <BigCta href={enrolHref} title={bigCtaTitle} sub={bigCtaSub} />
                </div>
            </Section>

            {/* FAQ — 2-up */}
            <Section id="faq">
                <h2 style={{ ...h2Style, textAlign: "center", marginBottom: 44 }}>Frequently Asked Questions</h2>
                <div className="row gx-4 gx-lg-5 gy-4">
                    {FAQS.map((f, i) => (
                        <div className="col-12 col-md-6" key={i}>
                            <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 19, lineHeight: 1.3, color: "var(--ink)", margin: "0 0 8px" }}>{f.q}</h3>
                            <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-3)", margin: 0 }}>{f.a}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* TESTIMONIALS — 2-up */}
            <Section id="stories">
                <h2 style={{ ...h2Style, textAlign: "center", marginBottom: 8 }}>Testimonials</h2>
                <p style={{ ...leadStyle, textAlign: "center", marginBottom: 44 }}>Hear real experiences from our lovely participants!</p>
                <div className="row g-4">
                    {TESTIMONIALS.map((t, i) => (
                        <div className="col-12 col-md-6" key={i}>
                            <div className="h-100 d-flex flex-column" style={{ background: "var(--forest)", borderRadius: "var(--card-radius, 16px)", padding: 30 }}>
                                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.65, color: "var(--paper-2)", whiteSpace: "pre-line", margin: 0 }}>{t.text}</p>
                                <cite style={{ fontFamily: SANS, fontWeight: 600, fontStyle: "normal", fontSize: 15, color: "var(--accent)", marginTop: "auto", paddingTop: 18 }}>— {t.author}</cite>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* REVIEWS slot */}
            {reviewsSlot && <Section py="0">{reviewsSlot}</Section>}

            {/* FOOTER */}
            <footer style={{ borderTop: "1px solid var(--line)", marginTop: 16 }}>
                <div className="text-center" style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(36px,5vw,56px) clamp(22px,5vw,40px)" }}>
                    <div className="d-flex flex-wrap justify-content-center gap-4 mb-3" style={{ fontFamily: SANS, fontSize: 14 }}>
                        {FOOTER_LINKS.map((l) => <span key={l} style={{ color: "var(--accent)", cursor: "pointer" }}>{l}</span>)}
                    </div>
                    <p style={{ fontFamily: SANS, fontSize: 13, color: "var(--muted)", margin: 0 }}>© Copyright 2024 Wellness Atlas</p>
                </div>
            </footer>
        </div>
    );
}
