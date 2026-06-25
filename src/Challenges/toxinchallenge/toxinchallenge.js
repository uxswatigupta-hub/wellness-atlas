import "./styles.css";
import logoImg from '../../assets/WellnessAtlas_Logo1.png';
/* ============================================================
   Toxin–Toxin, Bye-Bye · Wellness Atlas landing page
   React + Bootstrap 5.  Layout uses Bootstrap's grid:
     row + col-12 col-md-6 col-lg-4  →  3 cols desktop /
     2 cols tablet / 1 col mobile, automatically.

   PREREQUISITE — install Bootstrap and import it once:
     npm i bootstrap
     // src/index.js
     import "bootstrap/dist/css/bootstrap.min.css";

   USAGE:
     import ToxinChallenge from "./toxinchallenge";
     <ToxinChallenge registrationOpen={false} price="299"
                     reviewsSlot={<PowerReviews/>} />
   ============================================================ */

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

/* ---- helpers ---- */
function Img({ id, alt, images, className }) {
    const src = (images && images[id]) || IMG[id];
    if (!src) return <div className={className} />;
    return (
        <div className={className}>
            <img src={src} alt={alt} referrerPolicy="no-referrer" loading="lazy" />
        </div>
    );
}

function BigCta({ href, title, sub }) {
    return (
        <a className="tt-cta tt-cta-lg mx-auto" href={href} style={{ maxWidth: 620 }}>
            <span className="tt-cta-title">{title}</span>
            <span className="tt-cta-sub">{sub}</span>
        </a>
    );
}

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

    return (
        <div className="tt-root">
            {/* NAV */}
            <header className="tt-nav">
                <div className="tt-container d-flex align-items-center justify-content-between py-3">
                    <div className="d-flex align-items-center gap-2">
                        <div className="logo">
                            <img
                                src={logoImg}
                                alt="Wellness Atlas"
                            />
                        </div>
                        <span className="tt-brand-name">Wellness Atlas</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <span className="tt-nav-link">Dashboard</span>
                        <div className="tt-avatar">G</div>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section className="tt-container py-5">
                <div className="row g-4 g-lg-5 align-items-center">
                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        <Img id="hero" images={images} className="tt-img tt-hero-img" alt="Woman meditating at sunrise" />
                        <p className="tt-hero-caption mt-4 mb-0">We can't stop the world from producing toxins but we can learn how to get rid of them…</p>
                    </div>
                    <div className="col-12 col-lg-6 order-1 order-lg-2 text-center">
                        <p className="tt-eyebrow mb-1">A Gift Your Body Will Thank You For…</p>
                        <h1 className="tt-title mb-3">TOXIN-TOXIN<br />BYE-BYE</h1>
                        <p className="tt-subtitle mb-3">Simple Steps to <strong>Detoxify Our Bodies!!</strong></p>
                        <p className="tt-dateline mb-4">5 Days of Impactful Habits · July 9th – 13th</p>
                        <a className="tt-cta" href={enrolHref}>
                            <span className="tt-cta-title">{heroCtaTitle}</span>
                            <span className="tt-cta-sub">{heroCtaSub}</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* DAILY LIFE — 3-up grid */}
            <section className="tt-container py-4">
                <h2 className="tt-h2 text-center mb-2">Can you really stay away from toxins in your daily life?</h2>
                <p className="tt-lead text-center mb-5">Maybe not!</p>
                <div className="row g-4 justify-content-center">
                    {REASONS.map((r) => (
                        <div className="col-12 col-md-6 col-lg-4" key={r.id}>
                            <div className="tt-card tt-card--reason h-100 d-flex flex-column align-items-center text-center position-relative">
                                <Img id={r.id} images={images} className="tt-circle" alt={r.alt} />
                                <h3 className="tt-card-title mb-3">{r.title}</h3>
                                <p className="tt-card-body mb-2">{r.body1}</p>
                                <p className="tt-card-body mb-4">{r.body2}</p>
                                <a className="tt-enrol mt-auto" href={enrolHref}>ENROL NOW</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* QUOTE */}
            <section className="tt-container py-5 text-center" style={{ maxWidth: 880 }}>
                <p className="tt-quote mb-0">'Illness is the result of improper removal of toxins from the body!'</p>
            </section>

            {/* FOR ME TOO */}
            <section className="tt-container py-3">
                <div className="tt-panel">
                    <h2 className="tt-panel-kicker text-center mb-0">Is The TOXIN-TOXIN, BYE-BYE Challenge</h2>
                    <h2 className="tt-panel-h text-center mt-1 mb-0">For Me Too?</h2>
                    <div className="tt-rule mx-auto my-4" />
                    <p className="tt-panel-line text-center mb-0"><strong>YES!</strong> This Challenge Is For You, Specially If…</p>
                    <div className="tt-rule mx-auto my-4" />
                    <div className="tt-darkcard p-3 p-md-4 mt-3">
                        <div className="row g-4 align-items-center">
                            <div className="col-12 col-md-4 col-lg-3">
                                <Img id="thinking" images={images} className="tt-img tt-checkbox-img" alt="Woman relaxing at home" />
                            </div>
                            <div className="col-12 col-md-8 col-lg-9">
                                <div className="d-flex flex-column gap-3">
                                    {CHECKLIST.map((c, i) => (
                                        <div className="d-flex gap-3 align-items-start" key={i}>
                                            <span className="tt-check-mark">✓</span>
                                            <p className="tt-check-text mb-0">{c}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ALREADY HEALTHY */}
            <section className="tt-container py-3">
                <div className="tt-panel tt-panel--dashed text-center">
                    <h2 className="tt-panel-h mb-0" style={{ fontSize: "clamp(27px,3.6vw,34px)" }}>I already lead a healthy lifestyle!</h2>
                    <p className="mt-2 mb-4" style={{ fontSize: 18, color: "var(--ink-2)" }}>Can the TOXIN-TOXIN, BYE-BYE Challenge still add value…??</p>
                    <div className="tt-healthy-yes p-3"><p className="mb-0">YES! This Challenge Is For You too…</p></div>
                    <div className="tt-healthy-list mx-auto mt-4 text-start" style={{ maxWidth: 760 }}>
                        {HEALTHY_BENEFITS.map((b, i) => (
                            <p className="mb-2" key={i}><strong>{b.bold}</strong>{b.rest}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* PARTICIPANTS — 3-up grid */}
            <section className="tt-container py-4">
                <h2 className="tt-h2 text-center mb-5">Who can participate in this challenge?</h2>
                <div className="row g-4 justify-content-center">
                    {LIFESTYLE_CARDS.map((c, i) => (
                        <div className="col-12 col-md-6 col-lg-4" key={i}>
                            <div className="tt-card h-100 d-flex flex-column align-items-center text-center">
                                <h3 className="tt-card-title mb-3">{c.title}</h3>
                                <p className="tt-card-body mb-4">{c.body}</p>
                                <a className="tt-enrol mt-auto" href={enrolHref}>ENROL NOW</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* WHAT YOU'LL LEARN */}
            <section className="tt-container py-4">
                <h2 className="tt-h2 text-center mb-5" style={{ fontSize: "clamp(30px,4.6vw,46px)", lineHeight: 1.12 }}>
                    What You'll Learn During The 'TOXIN TOXIN, BYE BYE' Challenge!
                </h2>
                <div className="d-flex flex-column gap-4">
                    {LESSONS.map((l) => (
                        <div className="tt-lesson" key={l.id}>
                            <div className="tt-lesson-head">
                                <p className="tt-lesson-tag mb-1">{l.tag}</p>
                                <h3 className="tt-lesson-title mb-0">{l.title}</h3>
                            </div>
                            <div className="p-3 p-md-4 p-lg-5">
                                <div className="row g-4 align-items-start">
                                    <div className="col-12 col-lg-8 order-2 order-lg-1">
                                        <div className="tt-lesson-text d-flex flex-column gap-3">
                                            {l.paras.map((p, i) => <p className="mb-0" key={i}>{p}</p>)}
                                            <a className="tt-join align-self-start mt-2" href={enrolHref}>Join The Challenge Now!</a>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4 order-1 order-lg-2">
                                        <Img id={l.id} images={images} className="tt-img tt-lesson-img" alt={l.alt} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="tt-container py-5 text-center tt-finalcta" id="enrol" style={{ maxWidth: 880 }}>
                <p className="l1 mb-0">Here's Your Chance To Reboot Your Body,</p>
                <p className="l2 my-1">To Lead A "Healthier" Life …</p>
                <p className="l3 mt-2 mb-4">…WILL YOU TAKE IT?!</p>
                <BigCta href={enrolHref} title={bigCtaTitle} sub={bigCtaSub} />
            </section>

            {/* EVERYTHING YOU GET */}
            <section className="tt-container py-4 text-center" style={{ maxWidth: 820 }}>
                <h2 className="tt-h2 mb-0" style={{ fontSize: "clamp(30px,4.2vw,42px)" }}>Here's Everything You Get</h2>
                <p className="tt-lead mt-2 mb-4">When You Sign Up For The 'TOXIN TOXIN, BYE BYE' Challenge</p>
                <div className="tt-gift">
                    <Img id="gift" images={images} className="tt-img tt-gift-img" alt="Gift boxes" />
                    <div className="text-start p-3 px-md-4 pt-4">
                        {INCLUDES.map((inc, i) => (
                            <div className="tt-gift-item d-flex gap-2 align-items-start mb-3" key={i}>
                                <span className="tt-gift-dot">●</span>
                                <p className="mb-0">{inc.text} <strong>{inc.price}</strong></p>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="tt-price-old mt-4 mb-1">Normally: INR 2,998/-</p>
                <p className="tt-price-new mb-4">Today's Price: INR {price}/-!</p>
                <BigCta href={enrolHref} title={bigCtaTitle} sub={bigCtaSub} />
            </section>

            {/* TESTIMONIALS — 2-up grid */}
            <section className="tt-container py-5">
                <h2 className="tt-h2 text-center mb-2">Testimonials</h2>
                <p className="tt-lead text-center mb-5">Hear real experiences from our lovely participants!</p>
                <div className="row g-4">
                    {TESTIMONIALS.map((t, i) => (
                        <div className="col-12 col-md-6" key={i}>
                            <div className="tt-testimonial h-100 d-flex flex-column">
                                <p>{t.text}</p>
                                <cite className="mt-auto">— {t.author}</cite>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ — 2-up grid */}
            <section className="tt-container py-5">
                <h2 className="tt-h2 text-center mb-5">Frequently Asked Questions</h2>
                <div className="row gx-4 gx-lg-5 gy-4">
                    {FAQS.map((f, i) => (
                        <div className="col-12 col-md-6 tt-faq" key={i}>
                            <h3 className="mb-2">{f.q}</h3>
                            <p className="mb-0">{f.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* REVIEWS — Power.io embed slot */}
            {reviewsSlot && <section className="tt-container pb-5">{reviewsSlot}</section>}

            {/* FOOTER */}
            <footer className="tt-footer mt-4 py-5">
                <div className="tt-container text-center">
                    <div className="tt-footer-links d-flex flex-wrap justify-content-center gap-4 mb-3">
                        {FOOTER_LINKS.map((l) => <span key={l}>{l}</span>)}
                    </div>
                    <p className="tt-copyright mb-0">© Copyright 2024 Wellness Atlas</p>
                </div>
            </footer>
        </div>
    );
}