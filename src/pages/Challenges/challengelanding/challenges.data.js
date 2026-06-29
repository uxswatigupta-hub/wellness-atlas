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

/** Map an arbitrary API record onto the card shape. Tolerant of common field names. */
export function normalizeChallenge(x) {
    if (!x || typeof x !== "object") return null;
    return {
        title: x.title || x.name || "",
        body: x.body || x.description || x.summary || "",
        date: x.date || x.dateRange || x.dates || "",
        month: x.month || x.monthLabel || "",
        status: (x.status || x.state || "upcoming").toLowerCase(),
        imageUrl: x.imageUrl || x.image || x.photo || x.picture || x.cover || null,
        img: x.imageLabel || x.label || "challenge",
        href: x.href || x.url || x.link || "#",
    };
}