import React from "react";

/**
 * ChallengeCard — reusable challenge card.
 *
 * Props:
 *   challenge: {
 *     title, body|description, date, month,
 *     imageUrl?, img?  (img = monospace placeholder label when no imageUrl),
 *     href?
 *   }
 *   variant: "upcoming" | "past"
 */
export default function ChallengeCard({ challenge = {}, variant = "upcoming" }) {
    const { title, body, description, date, month, imageUrl, img, detailsHref, hasDetails } = challenge;
    const desc = body || description || "";
    const label = img || "challenge";
    const isPast = variant === "past";

    const imgStyle = imageUrl
        ? {
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }
        : undefined;

    if (isPast) {
        return (
            <article className="wa-card wa-card--past">
                <div className="wa-card__media wa-card__media--past">
                    <div className="wa-card__img" style={imgStyle} />
                    {!imageUrl && <span className="wa-card__label">{label}</span>}
                    <span className="wa-card__tag wa-card__tag--completed">COMPLETED</span>
                </div>
                <h3 className="wa-card__title wa-card__title--past">{title}</h3>
                <div className="wa-card__date wa-card__date--past">{date}</div>
            </article>
        );
    }

    return (
        <article className="wa-card">
            <div className="wa-card__media">
                <div className="wa-card__img" style={imgStyle} />
                {!imageUrl && <span className="wa-card__label">{label}</span>}
                {month && <span className="wa-card__tag wa-card__tag--month">{month}</span>}
            </div>
            <h3 className="wa-card__title">
                <span>{title}</span>
            </h3>
            <p className="wa-card__body">{desc}</p>
            <div className="wa-card__cta">
                {hasDetails ? (
                    <a href={detailsHref} className="wa-btn wa-btn--outline">
                        DETAILS
                    </a>
                ) : (
                    <span className="wa-btn wa-btn--outline" aria-disabled="true">
                        COMING SOON
                    </span>
                )}
            </div>
            <div className="wa-card__date">{date}</div>
        </article>
    );
}
