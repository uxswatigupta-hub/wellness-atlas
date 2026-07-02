/* =========================================================================
   Systems Assessment — the client's self-reported symptom questionnaire.
   Read-only display of Yes/No answers grouped by bodily system, color-coded
   (red = concern flagged, green = clear). This is the raw input the Systems
   Report scores are derived from.
   Path: src/pages/WellnessAtlasCms/Pages/CustomerDetail/SystemsAssessment.jsx
   ========================================================================= */
import React, { useState } from "react";


  /* tone: "flag" (red) | "ok" (green) | null (not answered) */
  const F = (q, a) => ({ q, a, tone: "flag" });
  const K = (q, a) => ({ q, a, tone: "ok" });
  const B = (q) => ({ q, a: "—", tone: null });

  const GROUPS = [
    { title: "General indicators of health deterioration", items: [
      F("Has your weight increased or decreased by >10% (without you even trying)?", "Yes"),
      K("Do you take more than 2 medicines regularly?", "No"),
      F("Do you feel that your health has gone down in the last 2 years?", "Yes"),
      K("Is burning sensation common for you (in eyes, lips, while passing motion, passing urine etc.)?", "No"),
      K("If yes, which type?", "Sweet food"),
      K("Do you have regular dandruff?", "No"),
      K("Do you have a darkness on your forehead?", "No"),
      K("Do you have swelling in your face?", "No"),
      K("Do you have unwanted hair in wrong places?", "No"),
      F("Do you have excessive hairfall?", "Yes"),
      F("Do you get heel pain regularly?", "Yes"),
      K("Do you get frequent mouth ulcers?", "No"),
      F("Do you feel abnormally angry feeling during your periods?", "Yes"),
      K("Do you get cramps during periods?", "No"),
      K("Do you frequently get pimples/acne?", "No"),
      K("Are you menopausal?", "No"),
    ] },
    { title: "Digestive/Gut Health Indicators (Probiotic, Milk Thistle, AVH, Vitamin B, Fiber)", items: [
      F("Are you allergic or sensitive to many foods?", "Yes"),
      F("Do you suffer from frequent intestinal gas or bloating?", "Yes"),
      K("Is your BP higher than normal range?", "No"),
      K("Is stomach or intestinal pain a regular occurence?", "No"),
      F("Do you frequently get acidity/gastric reflux?", "Yes"),
      K("Are headaches a common occurence (>thrice a week)?", "No"),
      K("Do you feel your stomach has not cleared completely (>thrice a week)?", "No"),
      K("After eating do you experience joint or muscle pain?", "No"),
      K("Do you suffer from kidney stones?", "No"),
      K("Does your stool have an oily appearance or they float in the WC?", "No"),
      K("Is your blood sugar elevated?", "No"),
      K("Do you have trouble keeping your weight under control even though you watch your diet?", "No"),
      K("Do you frequently alternate between constipation and diarrhea?", "No"),
      K("Have you been told that you have chronic bad breath?", "No"),
      F("Are you frequently depressed, anxious or subject to mood swings?", "Yes"),
    ] },
    { title: "Detoxification/Liver health Indicators (Milk Thistle, Vitamin B, Fiber, AVH)", items: [
      B("Do you experience brain fog - frequently confused, forgetful, lacking clarity and focus?"),
      F("Do you feel sick with alcohol?", "Yes"),
      K("Do you feel sick with caffeine?", "No"),
      K("Have you ever been sick from exposure to chemicals?", "No"),
      F("Do you feel sick with cigarette smoke?", "Yes"),
      F("Is your body sensitive to some food items?", "Yes"),
      F("Do you frequently wake up tired/drained out in the morning as if you didn't sleep?", "Yes"),
      K("Sensitive to particular medications?", "No"),
      F("Do you feel sick with MSG in any food items?", "Yes"),
      K("Do you have body pain all the time without any workout?", "No"),
      F("Do you feel sick with some fragrances/odours?", "Yes"),
      F("Do you feel sick with smog/air pollution?", "Yes"),
      K("Do you get skin rashes sometimes?", "No"),
      F("Do you feel a tingling in your hands or feet?", "Yes"),
      K("Do you have a constant ringing sound in your ears?", "No"),
    ] },
    { title: "Defense/Immune System Indicators (PDO, Vitamin C, Vitamin D, Echinacea, Vasaka, Tulsi)", items: [
      K("Is stomach or intestinal pain a regular occurence?", "No"),
      F("Do you take Paracetamol/Disprin/Crocin/Iboprofen or pain killers frequently (2-3 times a month)?", "Yes"),
      K("Do you frequently take antibiotics to get over an infection?", "No"),
      K("Have you got any fungal infections of skin/nails/foot etc?", "No"),
      K("Is your grip getting weaker?", "No"),
      K("Do you get joint swelling after physical activity?", "No"),
      K("Do you feel leg pain or back pain all the time?", "No"),
      F("Do you have continuous pain in hands/wrists/ankles/feet?", "Yes"),
      F("Do you have chronic sinus infection?", "Yes"),
      K("Are you unusually sensitive to sun exposure?", "No"),
      K("Have you been got UTI or bladder infection more than once in the past?", "No"),
      K("Have fungal/bacterial/viral infections happened to you more than once in the last few months?", "No"),
      K("Do you get skin rashes sometimes?", "No"),
      F("Do you catch every cold and infection that's going around?", "Yes"),
      F("Does pain in your joints or muscles limit your physical activity or mobility?", "Yes"),
      B("Do you feel that you have lost significant amount of muscle mass over the past few years?"),
      K("Has your dentist told you that you have gum or periodontal disease?", "No"),
    ] },
    { title: "Inflammation/Hormonal/Cellular Communication Indicators (Ashwagandha, Vitamin D, Omega, CFV, Daily, APP)", items: [
      K("Do you take antidepressants?", "No"),
      K("Are you on blood pressure medication?", "No"),
      K("Do you have chronic infections of the sinuses, tonsils, intestines, skin or mouth?", "No"),
      K("Do you feel joint pain when the weather changes?", "No"),
      K("Is your libido low for your age?", "No"),
      K("Do you have night sweats?", "No"),
      F("Do you think your health is becoming poor because of stress?", "Yes"),
      B("Do you take Paracetamol/Disprin/Crocin/Iboprofen or pain killers frequently (2-3 times a month)?"),
      K("Do you get joint swelling after physical activity?", "No"),
      B("Do you frequently wake up tired/drained out in the morning as if you didn't sleep?"),
      B("Are you frequently depressed, anxious or subject to mood swings?"),
      F("Do you feel you are forgetting things?", "Yes"),
      F("Do you have trouble going to sleep or staying asleep?", "Yes"),
      F("Do you commonly feel tired and fatigued for no apparent reason?", "Yes"),
    ] },
    { title: "Cellular Transport Indicators", items: [
      K("Has your vision suddenly become worse in recent times?", "No"),
      F("Do you experience brain fog - frequently confused, forgetful, lacking clarity and focus?", "Yes"),
      K("Is your blood sugar elevated?", "No"),
      F("Do you have more fat around belly/waist area?", "Yes"),
      F("Do you feel sleepy after eating food?", "Yes"),
      K("Any concerns about the health of your heart or blood vessels?", "No"),
      K("Is your LDL higher than normal range?", "No"),
      K("Are you on any cholesterol lowering statin drugs?", "No"),
      K("Is your Triglyceride higher than normal range?", "No"),
      K("Is your BP higher than normal range?", "No"),
      K("Do you feel that you have lost significant amount of muscle mass over the past few years?", "No"),
      K("Does your blood report show low albumin/Hematocrit levels (answer No if you don't have a latest report)?", "No"),
      K("Have you ever been told that you have reduced kidney function?", "No"),
      F("Do you get digestive problems if you eat high-protein foods like non-veg, soya, eggs etc?", "Yes"),
    ] },
    { title: "Mitochondrial Damage/Oxidative stress/Energy dysfunction Indicators (CoQ10, Vitamin C, Vitamin B, CFV, Daily, APP)", items: [
      F("Do you experience brain fog - frequently confused, forgetful, lacking clarity and focus?", "Yes"),
      K("Are headaches a common occurence (>thrice a week)?", "No"),
      F("Do you feel extremely tired and burnt out on many days of the week?", "Yes"),
      F("Do you feel that even a small cold totally tires you out for a long time?", "Yes"),
      K("Do you feel that you just don't have energy to cope with the issues of daily living?", "No"),
      K("Do you find that you can't tolerate disturbances around you that you used to be able to ignore or dismiss or manage before?", "No"),
      K("Do you worry about undertaking an activity that incorporates exercise because you know that you won't feel good afterward?", "No"),
      F("Do you lack ambition or have low energy?", "Yes"),
      K("Do you feel older than your age?", "No"),
      F("Do you get muscle pain after even moderate exercise or activity?", "Yes"),
      F("Do you feel you are forgetting things?", "Yes"),
      K("Do you commonly suffer from shortness of breath?", "No"),
      F("Do you have trouble going to sleep or staying asleep?", "Yes"),
      K("Have you lost any of your senses of taste or smell over the past few years?", "No"),
      F("Do you commonly feel tired and fatigued for no apparent reason?", "Yes"),
    ] },
    { title: "Structural System Indicators (Vitamin D, CalMag, APP)", items: [
      B("Do you have trouble keeping your weight under control even though you watch your diet?"),
      F("Do you feel you are forgetting things?", "Yes"),
      K("Is your HbA1c more than 5.6?", "No"),
      K("Are you menopausal?", "No"),
      F("Do you have more fat around belly/waist area?", "Yes"),
      K("Do you feel that your height is decreasing or do you have any calcium deposits?", "No"),
      K("Do you have any back problems?", "No"),
      K("Is your bone density lesser than normal?", "No"),
      K("Do you frequently get a sore neck?", "No"),
      K("Do you eat more animal protein compared to vegetables?", "No"),
      F("Are you a frequent cell phone user?", "Yes"),
      K("Do you eat grilled/barbecued foods frequently (once a month or more)?", "No"),
      K("Do you feel cold while nobody around you does?", "No"),
      K("Do you avoid milk and dairy products?", "No"),
      F("Do you eat a lot of foods and drinks stored in plastic containers?", "Yes"),
    ] },
  ];



  const ICONS = ["bi-clipboard2-pulse", "bi-recycle", "bi-droplet-half", "bi-shield-plus",
                 "bi-activity", "bi-arrow-left-right", "bi-lightning-charge", "bi-person-standing"];

  function AssessSection({ icon, title, flagged, answered, isOpen, onToggle, items }) {
    return (
      <div className={"wa-acc__item" + (isOpen ? " wa-acc__item--open" : "")}>
        <button className="wa-acc__head" onClick={onToggle} aria-expanded={isOpen}>
          <span className="wa-acc__icon"><i className={"bi " + icon}></i></span>
          <span className="wa-acc__namecol">
            <span className="wa-acc__nm">{title}</span>
            <span className="wa-sev-chip" style={{ color: flagged > 0 ? "#b23b3b" : "var(--muted)" }}>
              {flagged > 0 ? flagged + " flagged" : "No concerns"} · {answered} answered
            </span>
          </span>
          <span className="wa-acc__chev"><i className={"bi " + (isOpen ? "bi-chevron-up" : "bi-chevron-down")}></i></span>
        </button>
        {isOpen && (
          <div className="wa-acc__body">
            <div className="wa-dl">
              {items.map((it, ii) => (
                <div key={ii}>
                  <div className="wa-dl__k">{it.q}</div>
                  <div className={"wa-dl__v" + (it.tone === "flag" ? " wa-dl__v--flag" : it.tone === "ok" ? " wa-dl__v--ok" : "")}>{it.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

export default function SystemsAssessment() {
    const [open, setOpen] = useState(() => new Set([0]));
    const toggle = (i) => setOpen((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });

    const total = GROUPS.reduce((s, g) => s + g.items.filter((i) => i.tone).length, 0);
    const flagged = GROUPS.reduce((s, g) => s + g.items.filter((i) => i.tone === "flag").length, 0);

    return (
      <div role="tabpanel" id="panel-assess" aria-labelledby="tab-assess" tabIndex={0}>
        <div className="wa-info">
          <i className="bi bi-info-circle-fill"></i>
          <div>The client's self-reported <strong>symptom questionnaire</strong> — the raw input the Systems Report
            scores are derived from. Answers <strong>flagged in red</strong> indicate a concern.</div>
        </div>

        <div className="wa-summary">
          <div className="wa-stat"><div className="wa-stat__k">Flagged concerns</div>
            <div className="wa-stat__v">{flagged} <small>of {total} answered</small></div></div>
          <div className="wa-stat"><div className="wa-stat__k">Symptom groups</div>
            <div className="wa-stat__v">{GROUPS.length} <small>bodily systems</small></div></div>
          <div className="wa-stat"><div className="wa-stat__k">Clear responses</div>
            <div className="wa-stat__v">{total - flagged} <small>no concern</small></div></div>
        </div>

        <div className="wa-listhead"><h3>Questionnaire responses</h3></div>

        <div className="wa-acc">
          {GROUPS.map((g, gi) => (
            <AssessSection key={gi} icon={ICONS[gi] || "bi-clipboard2-pulse"} title={g.title}
              flagged={g.items.filter((i) => i.tone === "flag").length}
              answered={g.items.filter((i) => i.tone).length}
              isOpen={open.has(gi)} onToggle={() => toggle(gi)} items={g.items} />
          ))}
        </div>
      </div>
    );
}
