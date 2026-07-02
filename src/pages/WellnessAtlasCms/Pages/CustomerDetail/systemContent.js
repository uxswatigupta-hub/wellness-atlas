/* =========================================================================
   Systems Audit — detailed content per bodily system.
   Integrated from the client's Wellness Profiling report. Each system is an
   ordered list of blocks; WA.SystemBody (in CustomerDetails.jsx) renders them.

   Block shapes:
     { h, p }                 heading + paragraph (p may be an array)
     { h, p, ul }             + bullet list
     { callout }              lightbulb "why it matters" box
     { h, steps: [[n,t,d]] }  numbered protocol
     { h, recs: [{icon,t,sub,items}] }   recommendation cards
   ========================================================================= */
export const systemContent = {
  /* ---- Assimilation & Elimination (27) -------------------------------- */
  assim: [
    { h: "What we're seeing", p: "An imbalance in the assimilation & elimination system (digestive health). Common signs when this system is compromised:",
      ul: ["Constipation or diarrhoea", "Gas and bloating", "Acidity or gastric reflux", "Stomach or intestinal pain", "Irregular bowel movements"] },
    { callout: "More than half of the immune system sits in the gut, so digestion affects far more than the stomach. When the gut is irritated it raises \u201Calarm cells\u201D that travel through the bloodstream and can surface as headaches, joint or muscle pain, skin issues, mood swings \u2014 even hormone changes." },
    { h: "Why it matters", p: "Gut damage builds up when high-fat, high-sugar or processed foods, allergens, infections, drugs, alcohol or harsh chemicals weaken the gut lining. Toxins (endotoxins) then slip into the bloodstream, and the immune response can drive ongoing issues like sinus congestion, joint pain, eczema and anxiety." },
    { h: "The 4R healing protocol", steps: [
      ["1", "Remove", "Eliminate allergic and irritating foods."],
      ["2", "Replace", "Support digestion with enzymes and a gut-friendly diet."],
      ["3", "Reinoculate", "Add prebiotics & probiotics to rebuild gut flora."],
      ["4", "Repair", "Use targeted nutrients to heal and strengthen the gut lining."] ] },
    { h: "Recommendations", recs: [
      { icon: "bi-heart-pulse", t: "Daily lifestyle", sub: "Supports gut healing automatically.", items: ["Drink 8\u201310 glasses of water daily", "Water first thing in the morning to ease bowel movements", "Do the detox as recommended", "Eat only 3 meals \u2014 let the gut rest between them", "Avoid fluids with meals (thin buttermilk only if needed)", "Chew thoroughly to reduce digestive load"] },
      { icon: "bi-x-octagon", t: "Trigger foods to avoid", sub: "Until acidity & bloating settle.", items: ["Refined carbohydrates", "Packaged foods, cookies, snacks", "Sugary drinks", "Junk food", "Excess sugar"] },
      { icon: "bi-egg-fried", t: "Probiotic foods to add", sub: "Rebuild healthy gut flora.", items: ["Begin with curd", "Gradually add other fermented foods"] },
      { icon: "bi-capsule", t: "Supplements", sub: "Targeted support to repair the gut.", items: ["Multivitamin", "Vitamin B-Complex", "Milk Thistle", "AVH", "Vitamin C"] } ] },
  ],

  /* ---- Detoxification (30) -------------------------------------------- */
  detox: [
    { h: "What we're seeing", p: "The detoxification system isn't working optimally. The body handles toxicity from three sources: medicines & drugs, environmental chemicals (cleaning products, pollutants), and endotoxins produced inside the body." },
    { callout: "Many toxins behave like fats. Since blood is mostly water and fats don't dissolve in it, these toxins stick to fatty tissue instead of flushing out. Before the body can remove them, the liver must first convert fat-like toxins into water-soluble forms." },
    { h: "How detoxification works", steps: [
      ["1", "CYP450 \u2014 break it down", "Liver enzymes take a fat-like toxin and convert it into an intermediate \u2014 easier to work with, but not fully safe yet."],
      ["2", "Conjugation \u2014 make it soluble", "A second group of enzymes attach a chemical \u201Ctail,\u201D making the toxin water-soluble so it can leave via urine, stool and bile."] ] },
    { h: "Why diet is critical", p: "Those chemical \u201Ctails\u201D come from nutrients \u2014 B vitamins, amino acids, sulfur compounds (garlic, onion, cruciferous vegetables), antioxidants and minerals. A poor, low-protein or highly-processed diet can't complete Phase 2, so toxins build up in fat tissue and the person feels heavy, tired, inflamed and sluggish. This can show as low energy, headaches, skin problems, PMS or hormonal imbalance, joint pain, digestive issues, anxiety and poor sleep." },
    { h: "Recommendations", recs: [
      { icon: "bi-flower1", t: "Detox-supportive diet", sub: "Supports Phase 1 & Phase 2.", items: ["Cruciferous veg (broccoli, cabbage, cauliflower, kale)", "Soluble fibre (chia, oats, fruits)", "Detox spices (turmeric, cinnamon, cumin, ginger)", "Foods rich in B vitamins", "Phytonutrient-rich vegetables & fruit"] },
      { icon: "bi-x-octagon", t: "Remove stressors", sub: "For a minimum reset period.", items: ["Wheat", "Caffeine", "Artificial sweeteners", "Sugar & chocolate", "Alcohol", "Colours, preservatives, processed foods"] },
      { icon: "bi-capsule", t: "Supplements", sub: "Strengthen liver detox pathways.", items: ["Iron", "Zinc", "Magnesium", "CFV", "Milk Thistle (liver cell repair)", "B-Complex"] } ] },
  ],

  /* ---- Defence (47) --------------------------------------------------- */
  defence: [
    { h: "What we're seeing", p: "The defence (immune) system needs support. But immunity depends heavily on the gut (assimilation/elimination) and detox systems \u2014 correct those first, and the immune system often settles and strengthens automatically." },
    { h: "Two types of immune imbalance", ul: [
      "Overactive \u2014 high inflammation: the body over-reacts to gluten, pollutants, xenobiotic chemicals (cleaning products, plastics, fragrances), AVH or excess alcohol \u2014 showing as allergies, skin issues, pain, fatigue and gut irritation.",
      "Underactive \u2014 frequent infections: falling sick often or getting severe infections means the immune response is too low."] },
    { callout: "The fix isn't only to reduce exposure to these foreign substances \u2014 the immune system also needs nutrients that help it send the correct anti-inflammatory signals to the rest of the body." },
    { h: "Recommendations", recs: [
      { icon: "bi-x-octagon", t: "Remove immune-reactive substances", sub: "Reduce or avoid.", items: ["Gluten", "Chemical pollutants", "Artificial additives", "Xenobiotics (cleaners, fragrances, plastics)", "Excess alcohol"] },
      { icon: "bi-egg-fried", t: "Immune-stabilising foods", sub: "Calm inflammation, balance response.", items: ["Mushrooms", "Vitamin C (1\u20136 g/day)", "Echinacea", "Curcumin (turmeric)", "Garlic (allicin)", "Omega-3 fats", "(Community: CFV + Garlic)"] },
      { icon: "bi-capsule", t: "Supportive supplements", sub: "Especially for underactive immunity.", items: ["Zinc", "Vitamins E, A & D", "Omega-3, folic acid, iron, copper", "L-lysine & L-arginine", "Echinacea"] } ] },
  ],

  /* ---- Cellular Communication (71) ------------------------------------ */
  cellcomm: [
    { h: "What we're seeing", p: "An imbalance in how the body's cells communicate. Before fixing this, we must first improve assimilation (digestion/absorption) and detoxification \u2014 when those falter, the communication system automatically goes out of balance." },
    { callout: "When communication is disrupted, glands make more and more hormones to get the same response \u2014 it's as if the cells stop \u201Clistening.\u201D This usually follows a high allostatic load: the body has been under stress too long, and cells become resistant to stress hormones like adrenaline and noradrenaline." },
    { h: "Why it matters", p: "Sustained high stress hormones start harming the brain, heart, digestive system, bones, muscles, skin and kidneys. Over time this drives high BP, diabetes, heart disease, stroke, dementia, ulcers, inflammatory bowel disease, and bone or muscle loss \u2014 a stage where the body feels like it has \u201Crun out of fuel.\u201D Stress also raises cytokines, spreading inflammation body-wide." },
    { h: "The real root causes", p: "Communication trouble is the result of deeper issues. Investigate:",
      ul: ["Hidden inflammation (check CRP levels)", "Insulin resistance (test insulin, estrogen, testosterone) \u2014 balance with phytonutrients and reduce stress load", "Poor fitness or digestive imbalance", "Toxicity blocking normal cell function"] },
  ],

  /* ---- Energy (43) ---------------------------------------------------- */
  energy: [
    { h: "What we're seeing", p: "The body's energy-production system \u2014 powered by mitochondria \u2014 isn't working at its best. When it slows, the brain, muscles and heart are affected first because they need the most energy." },
    { callout: "Mitochondria are tiny powerhouses in every cell that convert the food you eat and the oxygen you breathe into ATP \u2014 the body's energy currency. Free radicals are a normal by-product; when mitochondria are stressed, they build up and cause damage." },
    { h: "When mitochondria slow down", ul: [
      "Brain \u2014 mood issues, memory lapses, lack of focus",
      "Muscles \u2014 fatigue, exercise intolerance, chronic pain, low stamina",
      "Heart \u2014 low endurance, faster exhaustion, irregular function"] },
    { h: "Why it happens", p: "Several stressors weaken mitochondria: high inflammation, nutrient deficiencies (especially B vitamins, CoQ10, Omega-3, Vit C/D/E), high toxin load, insulin resistance, a sedentary lifestyle and excess oxidative stress \u2014 creating a cycle of low energy \u2192 more stress \u2192 more damage." },
    { h: "Recommendations", recs: [
      { icon: "bi-capsule", t: "Essential nutrient support", sub: "Protect mitochondria, aid ATP.", items: ["APP", "Coenzyme Q10", "Omega-3", "CFV", "High-dose natural B vitamins", "Vitamin C, D & E"] },
      { icon: "bi-bicycle", t: "Exercise (mitochondria multiply)", sub: "Cross-train, alternate 3 months.", items: ["Day 1: Cardio (walking, cycling, running, Zumba)", "Day 2: Yoga / Strength / HIIT / Pilates", "Boosts endurance, heart & brain function"] },
      { icon: "bi-hourglass-split", t: "Calorie restriction & fasting", sub: "Mild restriction helps cells.", items: ["Intermittent fasting reduces inflammation", "Supports fat-burning", "Improves mitochondrial health", "Slows cellular ageing"] } ] },
  ],

  /* ---- Cellular Transport (73) ---------------------------------------- */
  celltrans: [
    { h: "What we're seeing", p: "An imbalance in the transport system \u2014 specifically how the body moves glucose from the bloodstream into the cells. This points toward a glucose-transport and insulin-resistance issue." },
    { h: "How the normal system works", steps: [
      ["1", "Insulin released", "After you eat carbs, the pancreas releases insulin into the blood."],
      ["2", "Cells open their doors", "Insulin signals cells to open their glucose transporters."],
      ["3", "Blood sugar stays normal", "Glucose moves into the cells and blood sugar settles."] ] },
    { callout: "In insulin resistance the cells stop \u201Chearing\u201D insulin's signal. The pancreas makes more and more insulin to push glucose in \u2014 and over time this becomes the starting point of Metabolic Syndrome and Type 2 Diabetes." },
    { h: "Signs of a transport imbalance", p: "Together these lab patterns are known as Metabolic Syndrome:",
      ul: ["High triglycerides", "Low HDL", "High blood glucose", "Central obesity (belly fat / \u201Capple shape\u201D)", "Elevated blood pressure"] },
    { h: "Recommendations", recs: [
      { icon: "bi-egg-fried", t: "Food & dietary changes", sub: "Steady glucose release.", items: ["Reduce high-GI foods & refined carbs", "Avoid sweets and junk food", "Increase complex carbs (whole grains, millets)", "Add soluble fibre and protein", "Increase Omega-3; virgin oils in moderation", "Phytonutrients (APP, CFV)"] },
      { icon: "bi-bicycle", t: "Exercise & daily movement", sub: "Improves insulin sensitivity.", items: ["Minimum 25 min/day or 150 min/week", "A 20-minute walk after each meal", "Increase NEAT: steps, standing, chores"] },
      { icon: "bi-clipboard2-pulse", t: "Tests to monitor", sub: "Early detection prevents damage.", items: ["Fasting insulin", "HbA1c", "Oral glucose tolerance test", "Uric acid", "hs-CRP", "Triglyceride : HDL ratio"] } ] },
  ],

  /* ---- Structure (24) ------------------------------------------------- */
  structure: [
    { h: "What we're seeing", p: "An issue with the body's structural process \u2014 bones, muscles, joints, posture and deeper changes at the cellular level. Alignment work (yoga, weight-bearing exercise, mobility, posture) helps handle daily physical stress, but the deeper issues are functional, happening inside cells and tissues." },
    { h: "Cellular-level disruptions", ul: [
      "EMF radiation (phones, microwaves, 5G) can interfere with mitochondrial function, reducing energy and raising oxidative stress.",
      "POPs & BPA (from pesticides, processed packaging, microwaving) get stored in tissues, mimic hormones and disturb cellular communication and metabolism.",
      "Insulin resistance alters protein structure \u2014 e.g. HbA1c is distorted haemoglobin from glucose sticking to it.",
      "Glycotoxins (AGEs) from high-heat cooking (frying, grilling, roasting) damage proteins, trigger inflammation and accelerate ageing."] },
    { callout: "Excess abdominal fat isn't just \u201Cweight\u201D \u2014 it stores toxins like POPs and BPA that release inflammatory and hormone-disrupting signals, affecting the heart, liver, kidneys and brain over time." },
    { h: "Recommendations", recs: [
      { icon: "bi-person-arms-up", t: "Movement & exercise", sub: "Realign structure, improve balance.", items: ["Regular weight-bearing exercise", "Yoga for alignment & mobility", "Posture correction", "Daily stretching & strengthening"] },
      { icon: "bi-shield-check", t: "Reduce environmental toxins", sub: "Lower the structural toxic load.", items: ["Minimise plastic (especially with heat)", "Avoid pesticides & chemical products", "Reduce microwave usage", "EMF-safe practices"] },
      { icon: "bi-flower1", t: "Clean, phytonutrient-rich diet", sub: "Repair at the cellular level.", items: ["Unprocessed, phytonutrient-rich foods", "Reduce inflammation", "Help detoxify stored toxins", "Restore hormone balance"] } ] },
  ],
};
