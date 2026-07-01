/**
 * Sample challenge data + an API-record normalizer.
 *
 * `status` drives where a challenge appears:
 *   "current"  -> featured "This Month's Challenge" banner
 *   "upcoming" -> Upcoming tab
 *   "past"     -> Past tab
 *
 * One challenge per month (2026). Replace this with live API data via the
 * `apiUrl` prop on <HealthChallenges/>; records are run through normalize().
 */

import cookingImg from "../../../assets/images/cooking.png";
import organCleanseImg from "../../../assets/images/organcleanse.jpg";
import gutHealthImg from "../../../assets/images/guthealth.jpeg";
import hairHealthImg from "../../../assets/images/hair.png";
import sleepImg from "../../../assets/images/sleep.png";
import toxinImg from "../../../assets/images/toxin.png";
import superPowerImg from "../../../assets/images/productivity.png";
import stepsImg from "../../../assets/images/10ksteps.jpeg";
import mirrorImg from "../../../assets/images/mirrorchallenge.png";
import festiveGlowImg from "../../../assets/images/festival.jpg";
import hormoneBalanceImg from "../../../assets/images/hormone.png";
import dopamineDetoxImg from "../../../assets/images/dopaminedetox.png";
import relationshipImg from "../../../assets/images/relationship.png";
import weightLossImg from "../../../assets/images/weightloss.png";
import saladImg from "../../../assets/images/salad.png";




export const SAMPLE_CHALLENGES = [
    { status: "past", month: "JAN", title: "5 Days to Kickstart Your New Year Weight Loss Resolution", body: "Resolutions fade away, but Habits transform Health! Begin now \u2014 your 1st step transforms everything!", date: "7TH JANUARY \u2013 11TH JANUARY 2026", img: "new-year reset", imageUrl: weightLossImg },
    { status: "past", month: "FEB", title: "5 Days To A Better Chemistry \u2014 A True Gift For You And Your Valentine", body: "Marriages are 'made' in heaven, Maintenance happens on Earth! Simple steps to a STRONGER RELATIONSHIP.", date: "11TH FEBRUARY \u2013 15TH FEBRUARY 2026", img: "couple / chemistry", imageUrl: relationshipImg },
    { status: "past", month: "APR", title: "Dopamine Detox", body: "Hack back your Reward System. From Chaos to Calm in 5 days\u2026 Find Focus & Feel in Control Again.", date: "8TH APRIL \u2013 12TH APRIL 2026", img: "calm focus", imageUrl: dopamineDetoxImg },
    { status: "past", month: "MAY", title: "5 Days Gut Cleansing Challenge", body: "Good gut health is the cornerstone for any sustainable weight loss and/or chronic disease reversal. Learn the FOUNDATIONAL PRINCIPLES of Gut Health.", date: "13TH MAY \u2013 17TH MAY 2026", img: "gut health", imageUrl: gutHealthImg },
    { status: "current", month: "JUN", title: "5 Days Organ Cleanse Challenge \u2014 Master the Art of Targeted Nutrition for a Healthier You!", body: "Reset your Body, Renew your Health! Five days of targeted nutrition to give your organs the support they quietly ask for.", date: "10TH JUNE \u2013 14TH JUNE 2026", img: "targeted nutrition", imageUrl: organCleanseImg },
    { status: "upcoming", month: "JUL", title: "Discover Deep Sleep Secrets in 5 Days", body: "De-Stress & Heal \u2014 Sleep like a baby, once again.", date: "8TH JULY \u2013 12TH JULY 2026", img: "deep sleep", imageUrl: sleepImg, href: "/sleep-challenge" },
    { status: "upcoming", month: "AUG", title: "Discover The Secrets To Making Your Daily Meals Healthier In 5 Days", body: "You Are What You Eat \u2014 Cook Smarter, Nourish Better, Choose Healthier.", date: "12TH AUGUST \u2013 16TH AUGUST 2026", img: "healthy meals", imageUrl: cookingImg },
    { status: "upcoming", month: "SEP", title: "Hormone Harmony for a Happier You", body: "5 Day Hormone Reset Challenge \u2014 Reset your body, renew your health.", date: "9TH SEPTEMBER \u2013 13TH SEPTEMBER 2026", img: "hormone balance", imageUrl: hormoneBalanceImg },
    { status: "upcoming", month: "OCT", title: "Discover The Secrets of Glowing & Guilt-free Festival in 5 Days", body: "This Festive Season \u2014 Glow Brighter, Eat Wiser, Cleanse Smarter.", date: "14TH OCTOBER \u2013 18TH OCTOBER 2026", img: "festive glow", imageUrl: festiveGlowImg },
    { status: "upcoming", month: "NOV", title: "Salad Is Your Best Friend", body: "Nourish Your Body, One Bowl at a Time\u2026 CRUNCH, COLOR & FLAVOR \u2014 Discover the Magic OF SALADS!", date: "18TH NOVEMBER \u2013 22ND NOVEMBER 2026", img: "fresh salad", imageUrl: saladImg },
    { status: "upcoming", month: "DEC", title: "Toxin-Toxin Bye-Bye : Simple Steps to Detoxify Our Bodies!!", body: "A Gift Your Body Will Thank You For\u2026 5 Days of Impactful Habits.", date: "9TH DECEMBER \u2013 13TH DECEMBER 2026", img: "detox", imageUrl: toxinImg, href: "/toxin-challenge" },
    { status: "upcoming", month: "TBA", title: "Discover Your Super Power \u2014 Power-up your productivity in 21 minutes daily", body: "What will you do if you discover your super power? Will you 10x your growth in the next 5 years?", date: "DATES TO BE ANNOUNCED", img: "super power", imageUrl: superPowerImg },
    { status: "upcoming", month: "TBA", title: "10K Steps Challenge \u2014 Unleash Your Potential", body: "Lace up your shoes, set your goals, and let's start walking towards a brighter, healthier future\u2014together!", date: "DATES TO BE ANNOUNCED", img: "10k steps", imageUrl: stepsImg },
    { status: "upcoming", month: "TBA", title: "Unleash The Secrets of Hair Health in 3 Days", body: "A Beautiful Me \u2014 Good Hair speaks louder than words.", date: "DATES TO BE ANNOUNCED", img: "hair health", imageUrl: hairHealthImg },
    { status: "upcoming", month: "TBA", title: "The Mirror Challenge (only for men)", body: "5 Days, 5 Shifts \u2014 take a step forward towards becoming a Complete Man.", date: "DATES TO BE ANNOUNCED", img: "the mirror", imageUrl: mirrorImg },
];

const PROGRAM_ITEM_ROUTE_MAP = {
    wa_chlg_sleep: "/sleep-challenge",
    wa_chlg_toxin: "/toxin-challenge",
};

const CHECKOUT_BASE_URL = "https://app.thewellnessatlas.com/basket_checkout/";
const CHECKOUT_SERVICE_ID = "frontend-service";

function getProgramItemId(value) {
    return String(value || "").toLowerCase();
}

function getChallengeFamilyKey(programItemId) {
    const normalized = getProgramItemId(programItemId);
    if (normalized.startsWith("wa_chlg_dom_")) return normalized.slice("wa_chlg_dom_".length);
    if (normalized.startsWith("wa_chlg_")) return normalized.slice("wa_chlg_".length);
    return normalized;
}

function getVariantType(programItemId) {
    return getProgramItemId(programItemId).startsWith("wa_chlg_dom_") ? "india" : "global";
}

function buildInternalRoute(path) {
    if (!path || path === "#") return "#";
    if (/^https?:\/\//i.test(path)) return path;

    const publicUrl = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${publicUrl}${normalizedPath}` || normalizedPath;
}

function pickCurrency(prices, isIndia) {
    const options = Array.isArray(prices) ? prices : [];
    if (!options.length) return isIndia ? "INR" : "USD";

    const availableCurrencies = options.map((price) => String(price.currency || "").toUpperCase()).filter(Boolean);
    if (isIndia && availableCurrencies.includes("INR")) return "INR";
    if (!isIndia && availableCurrencies.includes("USD")) return "USD";
    if (!isIndia) {
        const firstNonInr = availableCurrencies.find((currency) => currency !== "INR");
        if (firstNonInr) return firstNonInr;
    }
    return availableCurrencies[0] || (isIndia ? "INR" : "USD");
}

function buildCheckoutHref(eventId, currency, affcode) {
    if (!eventId || !currency) return "#";
    const url = new URL(CHECKOUT_BASE_URL);
    url.searchParams.set("event_id", String(eventId));
    url.searchParams.set("service_id", CHECKOUT_SERVICE_ID);
    if (affcode) {
        url.searchParams.set("affcode", affcode);
    }
    url.searchParams.set("currency", currency);
    return url.toString();
}

function decorateChallengeForRegion(challenge, isIndia, affcode) {
    const currency = pickCurrency(challenge.prices, isIndia);
    const checkoutHref = buildCheckoutHref(challenge.eventId, currency, affcode);
    const detailsHref = challenge.detailsHref || challenge.href || null;
    const hasDetails = Boolean(detailsHref && detailsHref !== "#");

    return {
        ...challenge,
        currency,
        checkoutHref,
        detailsHref,
        hasDetails,
        href: checkoutHref !== "#" ? checkoutHref : detailsHref,
    };
}

export function selectChallengesForRegion(challenges, isIndia, affcode = "") {
    const groups = new Map();

    for (const challenge of challenges || []) {
        const familyKey = challenge.familyKey || challenge.programItemId || challenge.title;
        const existing = groups.get(familyKey) || [];
        existing.push(challenge);
        groups.set(familyKey, existing);
    }

    return Array.from(groups.values()).map((variants) => {
        const preferredVariant = variants.find((variant) => variant.variantType === (isIndia ? "india" : "global"));
        const fallbackVariant = isIndia
            ? variants.find((variant) => variant.prices?.some((price) => String(price.currency || "").toUpperCase() === "INR"))
            : variants.find((variant) => variant.prices?.some((price) => String(price.currency || "").toUpperCase() !== "INR"));
        const chosen = preferredVariant || fallbackVariant || variants[0];
        return decorateChallengeForRegion(chosen, isIndia, affcode);
    });
}

function parseDateOnly(value) {
    if (!value) return null;
    if (value instanceof Date) {
        return new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }

    const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
        return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

function getToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function getOrdinal(day) {
    const mod10 = day % 10;
    const mod100 = day % 100;
    if (mod10 === 1 && mod100 !== 11) return `${day}ST`;
    if (mod10 === 2 && mod100 !== 12) return `${day}ND`;
    if (mod10 === 3 && mod100 !== 13) return `${day}RD`;
    return `${day}TH`;
}

function formatSingleDate(date) {
    if (!date) return "DATES TO BE ANNOUNCED";
    return `${getOrdinal(date.getDate())} ${date.toLocaleString("en-US", { month: "long" }).toUpperCase()} ${date.getFullYear()}`;
}

function formatDateRange(startDate, endDate) {
    if (!startDate && !endDate) return "DATES TO BE ANNOUNCED";
    if (!startDate) return formatSingleDate(endDate);
    if (!endDate || startDate.getTime() === endDate.getTime()) return formatSingleDate(startDate);

    const startMonth = startDate.toLocaleString("en-US", { month: "long" }).toUpperCase();
    const endMonth = endDate.toLocaleString("en-US", { month: "long" }).toUpperCase();

    if (startDate.getFullYear() === endDate.getFullYear() && startMonth === endMonth) {
        return `${getOrdinal(startDate.getDate())} ${startMonth} - ${getOrdinal(endDate.getDate())} ${endMonth} ${endDate.getFullYear()}`;
    }

    return `${formatSingleDate(startDate)} - ${formatSingleDate(endDate)}`;
}

function getStatus(startDate, endDate) {
    if (!startDate && !endDate) return "upcoming";
    const today = getToday();
    const start = startDate || endDate;
    const end = endDate || startDate;

    if (end && end < today) return "past";
    if (start && start > today) return "upcoming";
    return "current";
}

function getMonthLabel(startDate) {
    return startDate
        ? startDate.toLocaleString("en-US", { month: "short" }).toUpperCase()
        : "TBA";
}

function pickSampleMetadata(programItemId, title) {
    const programItem = (programItemId || "").toLowerCase();
    const titleText = (title || "").toLowerCase();

    if (PROGRAM_ITEM_ROUTE_MAP[programItem]) {
        return SAMPLE_CHALLENGES.find((sample) => sample.href === PROGRAM_ITEM_ROUTE_MAP[programItem]) || null;
    }

    return SAMPLE_CHALLENGES.find((sample) => sample.title.toLowerCase() === titleText) || null;
}

/** Map an arbitrary API record onto the card shape. Tolerant of common field names. */
export function normalizeChallenge(x) {
    if (!x || typeof x !== "object") return null;

    const programItemId = x.program_item_id || x.programItemId || "";
    if (!String(programItemId).toLowerCase().startsWith("wa_chlg")) return null;

    const title = x.title || x.name || "";
    const startDate = parseDateOnly(x.start_date || x.startDate || x.date);
    const endDate = parseDateOnly(x.end_date || x.endDate) || startDate;
    const sample = pickSampleMetadata(programItemId, title);
    const rawDetailsHref = PROGRAM_ITEM_ROUTE_MAP[String(programItemId).toLowerCase()] || sample?.href || x.href || x.url || x.link || "#";
    const detailsHref = buildInternalRoute(rawDetailsHref);

    return {
        title,
        body: x.body || x.description || x.summary || "",
        date: x.dateRange || x.dates || formatDateRange(startDate, endDate),
        month: x.month || x.monthLabel || getMonthLabel(startDate),
        status: getStatus(startDate, endDate),
        imageUrl: x.image_url || x.imageUrl || x.image || x.photo || x.picture || x.cover || sample?.imageUrl || null,
        img: x.imageLabel || x.label || sample?.img || "challenge",
        href: detailsHref,
        detailsHref,
        programItemId,
        familyKey: getChallengeFamilyKey(programItemId),
        variantType: getVariantType(programItemId),
        eventId: x.id || x.event_id || x.eventId || null,
        prices: Array.isArray(x.prices) ? x.prices : [],
        startDate,
        endDate,
        sortTs: (startDate || endDate)?.getTime() || Number.MAX_SAFE_INTEGER,
    };
}