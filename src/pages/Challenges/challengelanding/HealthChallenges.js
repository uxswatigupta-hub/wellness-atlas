import React, { useEffect, useMemo, useState } from "react";
import ChallengeCard from "./ChallengeCard";
import { SAMPLE_CHALLENGES, normalizeChallenge, selectChallengesForRegion } from "./challenges.data";
import communityImg from "../../../assets/logo/participating+communities.png";
import SiteNav from "../../../components/navbar/navbar";

function resolveEventsApiUrl(apiUrl) {
    return apiUrl.startsWith("/") ? apiUrl : `/${apiUrl}`;
}

function getAffiliateCode() {
    return new URLSearchParams(window.location.search).get("affcode") || "";
}

function inferIsIndia() {
    try {
        const locale = navigator.languages?.[0] || navigator.language || "";
        const region = typeof Intl.Locale === "function"
            ? new Intl.Locale(locale).region
            : String(locale).split(/[-_]/)[1]?.toUpperCase();
        if (region === "IN") return true;

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        if (timezone === "Asia/Kolkata" || timezone === "Asia/Calcutta") return true;
    } catch (err) {
        console.warn("[HealthChallenges] Country inference failed:", err);
    }

    return false;
}


/*const NAV_LEFT = ["home", "philosophy", "people", "offerings", "events", "testimonials"];
const NAV_RIGHT = ["learn", "weshare", "health2.0", "community.inc", "join"];*/

/**
 * HealthChallenges — Wellness Atlas challenges page.
 *
 * Props:
 *   apiUrl?  : string        — when set, challenges are fetched from here on mount.
 *                              Falls back to SAMPLE_CHALLENGES on empty/error.
 *   columns? : 2 | 3         — upcoming grid column count on desktop (default 3).
 *   theme?   : "" | "sleep" | "toxin"
 *                            — palette variant. "" (default) = health/earth.
 *                              Reuse this same component for the Sleep and
 *                              Toxin challenge pages by passing theme.
 *
 * Requires wellness-atlas.css (import once, after Bootstrap).
 */
export default function HealthChallenges({ apiUrl = "/event/api/v1/events", columns = 3, theme = "" }) {
    const [challenges, setChallenges] = useState(null);
    const [tab, setTab] = useState("upcoming"); // "upcoming" | "past"
    const [isIndia] = useState(() => inferIsIndia());
    const [affcode] = useState(() => getAffiliateCode());

    useEffect(() => {
        if (!apiUrl) return;
        let active = true;
        (async () => {
            try {
                const requestUrl = resolveEventsApiUrl(apiUrl);
                const res = await fetch(requestUrl, {
                    headers: {
                        Accept: "application/json",
                        "X-Service-Id": "frontend-service",
                    },
                });

                if (!res.ok) throw new Error("HTTP " + res.status + " for " + apiUrl);
                const data = await res.json();
                const list = Array.isArray(data)
                    ? data
                    : data.challenges || data.data || data.results || [];
                const mapped = list.map(normalizeChallenge).filter(Boolean);
                if (active && mapped.length) setChallenges(mapped);
            } catch (err) {
                console.warn("[HealthChallenges] API load failed, using sample data:", err);
            }
        })();
        return () => {
            active = false;
        };
    }, [apiUrl]);

    const cards = useMemo(() => {
        if (challenges && challenges.length) {
            return selectChallengesForRegion(challenges, isIndia, affcode);
        }
        return SAMPLE_CHALLENGES;
    }, [affcode, challenges, isIndia]);

    const sortedCards = useMemo(
        () => [...cards].sort((left, right) => (left.sortTs || Number.MAX_SAFE_INTEGER) - (right.sortTs || Number.MAX_SAFE_INTEGER)),
        [cards]
    );

    const featured = useMemo(
        () =>
            sortedCards.find((c) => c.status === "current") ||
            sortedCards.find((c) => c.status === "upcoming") ||
            [...sortedCards].reverse().find((c) => c.status === "past") ||
            sortedCards[0] ||
            {},
        [sortedCards]
    );
    const upcoming = useMemo(
        () => sortedCards.filter((c) => c.status === "upcoming"),
        [sortedCards]
    );
    const past = useMemo(
        () => [...sortedCards].filter((c) => c.status === "past").reverse(),
        [sortedCards]
    );

    const featuredHeading = featured.status === "current"
        ? "This Month's Challenge"
        : featured.status === "upcoming"
            ? "Upcoming Challenge"
            : "Featured Challenge";

    const featuredKicker = featured.status === "current"
        ? "NOW LIVE"
        : featured.status === "upcoming"
            ? "STARTING SOON"
            : "COMPLETED CHALLENGE";

    const featuredBadge = featured.status === "current"
        ? "NOW ON"
        : featured.status === "upcoming"
            ? "UP NEXT"
            : "DONE";

    const featuredImg = featured.imageUrl || featured.image;
    const featuredImgStyle = featuredImg
        ? {
            backgroundImage: `url("${featuredImg}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }
        : undefined;

    const pageClass = "wa-page" + (theme ? " wa-theme--" + theme : "");

    return (
        <div className={pageClass} style={{ "--cols": columns }}>

            <SiteNav />

            {/* HERO */}
            <header className="wa-hero">
                <div className="wa-hero__eyebrow">HEALTH CHALLENGES</div>
                <h1 className="wa-hero__title">Do You Have It In You?</h1>
                <p className="wa-hero__lede">
                    Discover a variety of exciting challenges designed to motivate and inspire you on your
                    journey to a healthier lifestyle. From hydration and steps challenges to weight loss and
                    cooking adventures, there&rsquo;s something for everyone! And that&rsquo;s not all&mdash;we have many
                    more challenges waiting for you to explore.
                </p>
            </header>

            <div className="wa-rule">
                <div />
            </div>

            {/* THIS MONTH'S CHALLENGE (FEATURED) */}
            <section className="wa-featured">
                <div className="wa-featured__head">
                    <h2>{featuredHeading}</h2>
                    <span className="wa-featured__kicker">{featured.date || featuredKicker}</span>
                </div>
                <div className="wa-featured__grid">
                    <div className="wa-featured__media">
                        <div className="wa-featured__img" style={featuredImgStyle} />
                        {!featuredImg && <span className="wa-featured__label">{featured.img}</span>}
                        <div className="wa-featured__badge">
                            <i />
                            {featuredBadge}
                        </div>
                    </div>
                    <div className="wa-featured__body">
                        <div className="wa-featured__date">{featured.date}</div>
                        <h3 className="wa-featured__title">{featured.title}</h3>
                        <p className="wa-featured__text">{featured.body || featured.description}</p>
                        <div className="wa-featured__cta">
                            <a href={featured.checkoutHref || featured.href || "#"} className="wa-btn wa-btn--solid">
                                JOIN THIS CHALLENGE
                            </a>
                            {featured.hasDetails ? (
                                <a href={featured.detailsHref} className="wa-btn wa-btn--outline">
                                    DETAILS
                                </a>
                            ) : (
                                <span className="wa-btn wa-btn--outline" aria-disabled="true">
                                    COMING SOON
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* UPCOMING / PAST (TABBED) */}
            <section className="wa-tabs-section">
                <div className="wa-tabs" role="tablist">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === "upcoming"}
                        className={"wa-tab" + (tab === "upcoming" ? " wa-tab--active" : "")}
                        onClick={() => setTab("upcoming")}
                    >
                        Upcoming<span className="wa-tab__badge">{upcoming.length}</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === "past"}
                        className={"wa-tab" + (tab === "past" ? " wa-tab--active" : "")}
                        onClick={() => setTab("past")}
                    >
                        Past<span className="wa-tab__badge">{past.length}</span>
                    </button>
                </div>

                {tab === "upcoming" && (
                    <>
                        <div className="wa-panel__note">ONE NEW CHALLENGE EVERY MONTH</div>
                        <div className="wa-grid wa-grid--up">
                            {upcoming.map((c, i) => (
                                <ChallengeCard key={c.title || i} challenge={c} variant="upcoming" />
                            ))}
                        </div>
                    </>
                )}

                {tab === "past" && (
                    <>
                        <div className="wa-panel__note">ALREADY COMPLETED IN 2026</div>
                        <div className="wa-grid wa-grid--past">
                            {past.map((c, i) => (
                                <ChallengeCard key={c.title || i} challenge={c} variant="past" />
                            ))}
                        </div>
                    </>
                )}
            </section>

            <div className="wa-rule">
                <div />
            </div>

            {/* HOW TO ACCEPT */}
            <section className="wa-howto">
                <h2>How to Accept a Challenge?</h2>
                <p className="wa-howto__p">
                    Wellness Atlas Challenges are run every month for 3&ndash;5 days, and are priced between
                    INR 299 &ndash; INR 999. If you would like to participate, we encourage that you contact a
                    Wellness Atlas Member+ in your social circle (you are sure to find one) or reach back to
                    the person who referred you to this page.
                </p>
                <p className="wa-howto__note">
                    NEVERTHELESS, IF ALL THAT FAILS, YOU CAN STILL CHOOSE TO FILL OUR CONTACT US FORM. PLEASE
                    GIVE US 48 HOURS TO REACH BACK TO YOU.
                </p>
                <div className="wa-howto__cta">
                    <button type="button" className="wa-btn wa-btn--outline">
                        CONTACT US
                    </button>
                </div>
            </section>

            <div className="wa-rule wa-rule--flush">
                <div />
            </div>

            {/* COMMUNITIES */}
            <section className="wa-comm">
                <div className="wa-comm__text">
                    <h3>Wellness Atlas Participating Communities</h3>
                    <p>
                        Wellness Atlas powers wellness communities whose members believe that prevention is
                        better than cure and who like to be actively engaged in the quest to improve their
                        wellness quotient by following time-tested principles of well being.
                    </p>
                </div>
                <div className="wa-comm__media">
                    <img src={communityImg} alt="Wellness Atlas Communities" />
                </div>
            </section>

            {/* FOOTER */}
            <footer className="wa-footer">
                <div className="wa-footer__links">
                    <span>Terms of use</span>
                    <span className="sep">|</span>
                    <span>Privacy policy</span>
                    <span className="sep">|</span>
                    <span>About us</span>
                    <span className="sep">|</span>
                    <span>Reach us</span>
                </div>
                <div>Helpline +91-82176-08659, support@thewellnessatlas.com</div>
            </footer>
        </div >
    );
}
