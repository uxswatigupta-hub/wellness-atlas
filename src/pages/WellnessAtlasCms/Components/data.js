/* =========================================================================
   Wellness Atlas CMS — shared data & helpers
   Path: src/pages/WellnessAtlasCms/Components/data.js
   ========================================================================= */

/* ---- client (the built-out detail record) ------------------------------ */
export const client = {
  name: "Swati Gupta",
  role: "Client",
  isLead: false,   // set true for leads not yet enrolled → opens Systems Report first
  meta: { age: "40 · Female", location: "Bengaluru, India", phone: "+91 97588 07786" },
  program: { start: "10 Apr 2026", end: "10 Jul 2026", weeks: 13 },
};

/* ---- left navigation --------------------------------------------------- */
export const navGroups = [
  { label: "Overview", items: [{ id: "dashboard", icon: "bi-grid-fill", label: "Dashboard" }] },
  { label: "Clients", items: [
    { id: "customers", icon: "bi-people-fill", label: "Customers / Leads" },
    { id: "team", icon: "bi-diagram-3-fill", label: "Team", leaderOnly: true } ] },
  { label: "Business", items: [
    { id: "transactions", icon: "bi-coin", label: "Transactions" },
    { id: "contribution", icon: "bi-pencil-square", label: "Contribution" } ] },
  { label: "Programs", items: [
    { id: "programs", icon: "bi-collection-fill", label: "Programs & Resources" },
    { id: "events", icon: "bi-calendar-event", label: "Events" },
    { id: "testimonials", icon: "bi-chat-quote", label: "Testimonials" } ] },
];
export const navAccount = { label: "Account", items: [
  { id: "profile", icon: "bi-person-vcard", label: "Profile" },
  { id: "logout", icon: "bi-box-arrow-right", label: "Logout" } ] };

/* ---- list rows --------------------------------------------------------- */
export const customers = [
  { id: "aarav", color: "#3a7d44", name: "Aarav Sharma", phone: "9886778299", email: "Aarav_Sh@gmail.com",
    status: "active", program: "Sp. Plant Based Inflammation", start: "15 Feb 2026", cmos: "Weightloss", more: 2,
    rating: 4.0, lastFu: "25 Mar 2026", lastUcd: "12 Mar 2026" },
  { id: "ananya", color: "#e08a4a", name: "Ananya Iyer", phone: "9835465479", email: "Ananya_Iy@gmail.com",
    status: "active", program: "Gut Recovery", start: "01 Jan 2026", cmos: "Digestive", more: 0,
    rating: 4.8, lastFu: "25 Mar 2026", lastUcd: "12 Mar 2026" },
  { id: "rohan", color: "#4a7fe0", name: "Rohan Gupta", phone: "9886778299", email: "Rohan_Gu@gmail.com",
    status: "risk", program: "No active program", start: "–", cmos: "Uric Acid", more: 1,
    rating: 4.2, lastFu: "25 Mar 2026", lastUcd: "12 Mar 2026" },
];
export const leads = [
  { id: "meera", color: "#e08a4a", name: "Meera Nair", phone: "9900112233", email: "meera.n@gmail.com",
    status: "new", program: "—", start: "—", cmos: "Weight Loss", more: 1, rating: null, lastFu: "—", lastUcd: "—" },
  { id: "karan", color: "#4a7fe0", name: "Karan Mehta", phone: "9812345678", email: "karan.m@gmail.com",
    status: "new", program: "—", start: "—", cmos: "Gut Health", more: 0, rating: null, lastFu: "—", lastUcd: "—" },
];

/* ---- systems audit ----------------------------------------------------- */
export function severity(score) {
  if (score < 25) return { tier: "healthy", label: "Healthy range", color: "#2f7d3a" };
  if (score < 50) return { tier: "mild", label: "Mild concern", color: "#c9a83a" };
  if (score < 75) return { tier: "moderate", label: "Moderate concern", color: "#cf7536" };
  return { tier: "severe", label: "Severe concern", color: "#c34b4b" };
}
export const systems = [
  { id: "assim", icon: "bi-recycle", name: "Assimilation & Elimination", score: 27, rich: true },
  { id: "detox", icon: "bi-droplet-half", name: "Detoxification", score: 30 },
  { id: "defence", icon: "bi-shield", name: "Defence", score: 47 },
  { id: "cellcomm", icon: "bi-broadcast", name: "Cellular Communication", score: 71 },
  { id: "energy", icon: "bi-lightning-charge", name: "Energy", score: 43 },
  { id: "celltrans", icon: "bi-arrow-left-right", name: "Cellular Transport", score: 73 },
  { id: "structure", icon: "bi-person-standing", name: "Structure", score: 24 },
];

/* ---- followups --------------------------------------------------------- */
export const followups = [
  {
    num: 2, date: "08 May 2026", since: "4 weeks since followup #1", rating: 5,
    feedback: "Firstly I would like to thank you for continuous guidance. I attended a wedding and ate lesser and made conscious choices of food because of this program. If not for this, I am sure I would have made a lot of unhealthy choices. I get various notes in the form of info, videos and messages which are motivating and help me keep up with the program.",
    general: { exercise: 5, deviations: 2, lowSleep: 1, missedSupp: 0, lowWater: 1 },
    measurements: { Weight: ["83.6", "kg"], Arm: ["31", "cm"], Chest: ["94", "cm"], Hips: ["102", "cm"], Neck: ["34", "cm"], Thigh: ["56", "cm"], Waist: ["88", "cm"] },
    health: { "Bloating": "resolved", "Brain fog (confusion / forgetfulness)": "better", "Food sensitivities": "better",
      "Freshness & alertness on waking": "better", "Sleep quality": "better", "Tiredness & fatigue": "better",
      "Cravings": "better", "Sleepiness post meals": "resolved" },
    improved: ["Bloating", "Brain fog", "Food sensitivity", "Freshness on waking", "Sleep", "Tiredness", "Food cravings", "Sleepiness post meals"],
    resolved: ["Bloating", "Sleepiness post meals"],
  },
  {
    num: 1, date: "10 Apr 2026", since: "Baseline followup", rating: 5,
    feedback: "She shares good info and is composed. I didn't feel judged or pressurized. She has been encouraging me towards better habit building. Thank you.",
    general: { exercise: 3, deviations: 4, lowSleep: 3, missedSupp: 2, lowWater: 4 },
    measurements: { Weight: ["85", "kg"], Arm: ["32", "cm"], Chest: ["96", "cm"], Hips: ["104", "cm"], Neck: ["35", "cm"], Thigh: ["58", "cm"], Waist: ["91", "cm"] },
    health: { "Allergy/sensitivity to foods": "same", "Bloating": "better", "Brain fog (confusion / forgetfulness)": "same",
      "Gastric reflux": "better", "Pain in hands / wrists / ankles / feet": "same", "Sinus problem": "better",
      "Mood swings / anxiety / depression": "same", "Loss of strength": "same", "Poor concentration": "same",
      "Sleep quality": "better", "Tiredness & fatigue": "better", "Cravings": "same" },
    improved: ["Allergy/sensitivity", "Bloating", "Brain fog", "Gastric reflux", "Hand/wrist/ankle pain", "Sinus", "Freshness on waking", "Tingling in hands/feet", "Bone-weary feeling", "Low ambition/energy", "Mood/anxiety/depression", "Strength loss", "Poor concentration", "Sleep", "Tiredness", "Food cravings", "Sleepiness post meals"],
    resolved: [],
  },
];

/* ---- profile / preferences -------------------------------------------- */
export function profileDefaults() {
  const C = (arr) => arr.map((a) => ({ l: a[0], on: !!a[1] }));
  return {
    name: "Swati Gupta",
    color: { hex: "#2f7d3a", name: "Forest Green" },
    size: "M",
    cards: [
      { icon: "bi-person", title: "Personal", rows: [
        ["Age", "40"], ["Gender", "Female"], ["Date of Birth", "27 April 1984"] ] },
      { icon: "bi-telephone", title: "Contact", rows: [
        ["Mobile", "+91 97588 07786"], ["E-mail", "gr8swati.gupta@gm…"],
        ["City", "Bengaluru"], ["Zip - Code", "560102"], ["Country", "India"] ] },
      { icon: "bi-people", title: "Family", rows: [
        ["Marital Status", "Married"], ["Anniversary", "10 December 2009"], ["No. of Children", "2"] ] },
      { icon: "bi-sliders", title: "Preferences", rows: [
        ["Diet", "Vegetarian"], ["Activity Level", "Moderate"],
        ["Wake / Sleep", "6:00 AM / 11:00 PM"], ["Allergies", "Lactose"] ] },
      { icon: "bi-bell", title: "Communication", rows: [
        ["Preferred Channel", "WhatsApp"], ["Language", "English, Hindi"],
        ["Best Time", "Evening"], ["Reminders", "Enabled"] ] },
    ],
    family: [
      { icon: "bi-house-heart", title: "Living & Family", wide: false, rows: [
        ["Living Situation", "With spouse & children"], ["No. of Children", "Two children"] ] },
      { icon: "bi-calendar-heart", title: "Key Dates", wide: false, rows: [
        ["Client Birthday", "27 Apr 1984"], ["Spouse Birthday", "12 Aug 1981"], ["Anniversary", "10 Dec 2009"] ] },
      { icon: "bi-people-fill", title: "Children", wide: false, rows: [
        ["Aarav (M)", "14 Mar 2012"], ["Ananya (F)", "2 Sep 2015"] ] },
      { icon: "bi-geo-alt", title: "Postal Address", wide: true, rows: [
        ["Address", "No. 24, 4th Cross, HSR Layout, Sector 3, Bengaluru, Karnataka 560102, India"] ] },
    ],
    chips: {
      food: C([["Home-cooked", 1], ["South Indian", 1], ["North Indian", 1], ["Traditional / Regional", 1],
        ["Chinese", 0], ["Italian", 1], ["Continental", 0], ["Mexican", 0], ["Thai", 0],
        ["Fast food (Indian)", 0], ["Fast food (Western)", 0], ["Enjoys spicy food", 1]]),
      hobby: C([["Reading", 1], ["Music / podcasts", 1], ["Cooking", 1], ["Movies / Series", 0],
        ["Sports / fitness", 0], ["Travel", 1], ["Gardening / nature", 1], ["Music / dance", 0],
        ["Spiritual practices", 1], ["Creative hobbies", 0]]),
      content: C([["Motivational / self-help", 1], ["Health & wellness", 1], ["Spiritual / philosophical", 1],
        ["Biographies / real-life", 0], ["Fiction / storytelling", 0], ["Light / fun", 1],
        ["Audio", 1], ["Video", 1], ["Reading", 1]]),
      special: C([["Words of appreciation", 1], ["Quality time / conversations", 1], ["Thoughtful gifts", 0],
        ["Acts of service", 0], ["Group experiences", 0]]),
      gift: C([["Personalised note", 1], ["An experience (workshop / event)", 1], ["Exclusive access", 0],
        ["Small thoughtful gift", 0], ["Public appreciation", 0]]),
      goal: C([["Quality time with family", 1], ["Health & confidence", 1], ["Looking & feeling good", 1],
        ["Professional growth", 0], ["Financial growth", 0], ["Spiritual growth", 1],
        ["Travel & experiences", 0], ["Creating impact", 0]]),
    },
  };
}
export function loadProfile() {
  try {
    const s = localStorage.getItem("wa-react-client-swati");
    if (s) {
      const parsed = JSON.parse(s);
      const ok = parsed && Array.isArray(parsed.cards) &&
        parsed.cards.every((c) => Array.isArray(c.rows) && c.rows.every((r) => Array.isArray(r)));
      if (ok) return parsed;
    }
  } catch (e) {}
  return profileDefaults();
}
export function saveProfile(data) {
  try { localStorage.setItem("wa-react-client-swati", JSON.stringify(data)); } catch (e) {}
}

/* ---- submitted followups (client form → coach tracking) ---------------- */
export const FOLLOWUP_STORE = "wa-followups-submitted";
export function loadSubmittedFollowups() {
  try { return JSON.parse(localStorage.getItem(FOLLOWUP_STORE) || "[]"); } catch (e) { return []; }
}
export function saveSubmittedFollowup(submission) {
  const existing = loadSubmittedFollowups();
  try { localStorage.setItem(FOLLOWUP_STORE, JSON.stringify([submission, ...existing])); } catch (e) {}
}
