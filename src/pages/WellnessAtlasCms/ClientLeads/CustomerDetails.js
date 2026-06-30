/* =========================================================================
   Screen 1 — Customer Details  (Systems Audit)
   ========================================================================= */
window.WA = window.WA || {};
const { useState, useRef } = React;

/* severity helpers ------------------------------------------------------- */
WA.severity = function (score) {
    if (score < 25) return { tier: "healthy", label: "Healthy range", color: "#2f7d3a" };
    if (score < 50) return { tier: "mild", label: "Mild concern", color: "#c9a83a" };
    if (score < 75) return { tier: "moderate", label: "Moderate concern", color: "#cf7536" };
    return { tier: "severe", label: "Severe concern", color: "#c34b4b" };
};

/* systems audit data ----------------------------------------------------- */
WA.systems = [
    { id: "assim", icon: "bi-recycle", name: "Assimilation & Elimination", score: 27, rich: true },
    { id: "detox", icon: "bi-droplet-half", name: "Detoxification", score: 30 },
    { id: "defence", icon: "bi-shield", name: "Defence", score: 47 },
    { id: "cellcomm", icon: "bi-broadcast", name: "Cellular Communication", score: 71 },
    { id: "energy", icon: "bi-lightning-charge", name: "Energy", score: 43 },
    { id: "celltrans", icon: "bi-arrow-left-right", name: "Cellular Transport", score: 73 },
    { id: "structure", icon: "bi-person-standing", name: "Structure", score: 24 },
];

/* the rich panel body (Assimilation & Elimination) ----------------------- */
WA.AssimilationBody = function AssimilationBody() {
    return (
        <div className="wa-acc__body">
            <div className="wa-sec">
                <div className="wa-sec__h">What we're seeing</div>
                <p style={{ marginTop: 0 }}>An <strong>imbalance in the assimilation &amp; elimination system</strong> (digestive
                    health). Common signs when this system is compromised:</p>
                <ul>
                    <li>Constipation or diarrhoea</li>
                    <li>Gas and bloating</li>
                    <li>Acidity or gastric reflux</li>
                    <li>Stomach or intestinal pain</li>
                    <li>Irregular bowel movements</li>
                </ul>
            </div>

            <div className="wa-sec">
                <div className="wa-sec__h">Why it matters</div>
                <div className="wa-info">
                    <i className="bi bi-lightbulb-fill"></i>
                    <div>More than half of the immune system sits in the gut, so digestion affects far more than the stomach.
                        When the gut is irritated it raises "alarm cells" that travel through the bloodstream and can surface as
                        headaches, joint or muscle pain, skin issues, mood swings — even hormone changes.</div>
                </div>
                <p>Gut damage builds up when high-fat, high-sugar or processed foods, allergens, infections, drugs, alcohol or
                    harsh chemicals weaken the gut lining. Toxins (endotoxins) then slip into the bloodstream, and the immune
                    response can drive ongoing issues like sinus congestion, joint pain, eczema and anxiety.</p>
            </div>

            <div className="wa-sec">
                <div className="wa-sec__h">The 4R healing protocol</div>
                <div className="wa-steps">
                    {[
                        ["1", "Remove", "Eliminate allergic and irritating foods."],
                        ["2", "Replace", "Support digestion with enzymes and a gut-friendly diet."],
                        ["3", "Reinoculate", "Add prebiotics & probiotics to rebuild gut flora."],
                        ["4", "Repair", "Use targeted supplements to heal the gut lining."],
                    ].map(([n, t, d]) => (
                        <div className="wa-step" key={n}>
                            <span className="wa-step__n">{n}</span>
                            <span className="wa-step__t"><strong>{t}</strong>{d}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="wa-sec">
                <div className="wa-sec__h">Your recommendations</div>
                <div className="wa-rec-grid wa-rec-grid--2">
                    <div className="wa-rec">
                        <p className="wa-rec__t"><i className="bi bi-heart-pulse"></i>Daily lifestyle</p>
                        <p className="wa-rec__sub">Supports gut healing automatically.</p>
                        <ul>
                            <li>Drink 8–10 glasses of water daily</li>
                            <li>Water first thing in the morning to ease bowel movements</li>
                            <li>Do the detox as recommended</li>
                            <li>Eat only 3 meals — let the gut rest between them</li>
                            <li>Avoid fluids with meals (thin buttermilk only if needed)</li>
                            <li>Chew thoroughly to reduce digestive load</li>
                        </ul>
                    </div>
                    <div className="wa-rec">
                        <p className="wa-rec__t"><i className="bi bi-x-octagon"></i>Trigger foods to avoid</p>
                        <p className="wa-rec__sub">Until acidity &amp; bloating settle.</p>
                        <ul>
                            <li>Refined carbohydrates</li>
                            <li>Packaged foods, cookies, snacks</li>
                            <li>Sugary drinks</li>
                            <li>Junk food</li>
                            <li>Excess sugar</li>
                        </ul>
                    </div>
                    <div className="wa-rec">
                        <p className="wa-rec__t"><i className="bi bi-egg-fried"></i>Probiotic foods to add</p>
                        <p className="wa-rec__sub">Rebuild healthy gut flora.</p>
                        <ul>
                            <li>Begin with curd</li>
                            <li>Gradually add other fermented foods</li>
                        </ul>
                    </div>
                    <div className="wa-rec">
                        <p className="wa-rec__t"><i className="bi bi-capsule"></i>Supplements</p>
                        <p className="wa-rec__sub">Targeted support to repair the gut.</p>
                        <ul>
                            <li>Multivitamin</li>
                            <li>Vitamin B-Complex</li>
                            <li>Milk Thistle</li>
                            <li>AVH</li>
                            <li>Vitamin C</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* one accordion row ------------------------------------------------------ */
WA.SystemRow = function SystemRow({ sys, isOpen, onToggle }) {
    const sev = WA.severity(sys.score);
    return (
        <div className={"wa-acc__item" + (isOpen ? " wa-acc__item--open" : "")}>
            <button className="wa-acc__head" onClick={onToggle} aria-expanded={isOpen}>
                <span className="wa-acc__icon"><i className={"bi " + sys.icon}></i></span>
                <span className="wa-acc__namecol">
                    <span className="wa-acc__nm">{sys.name}</span>
                    <span className="wa-sev-chip" style={{ color: sev.color }}>{sev.label}</span>
                </span>
                <span className="wa-acc__meter d-none d-md-block">
                    <span className="wa-meter-track">
                        <span className="wa-meter-fill" style={{ width: sys.score + "%", background: sev.color }}></span>
                        <span className="wa-meter-tick"></span>
                    </span>
                </span>
                <span className={"wa-acc__score wa-acc__score--" + sev.tier}>{sys.score}</span>
                <span className="wa-acc__chev"><i className={"bi " + (isOpen ? "bi-chevron-up" : "bi-chevron-down")}></i></span>
            </button>
            {isOpen && (
                sys.rich
                    ? <WA.AssimilationBody />
                    : <div className="wa-acc__body">
                        <p style={{ marginTop: 14 }}>
                            {sys.score < 25
                                ? "This system scored below 25 — within a healthy range. Maintain current lifestyle habits to keep it balanced."
                                : "The detailed protocol and recommendations for this system appear here once reviewed with the practitioner."}
                        </p>
                    </div>
            )}
        </div>
    );
};

/* accessible tablist ----------------------------------------------------- */
const SECTIONS = [
    { id: "body", label: "Body Composition" },
    { id: "habits", label: "Habits & Routine" },
    { id: "audit", label: "Systems Audit" },
];

WA.SectionTabs = function SectionTabs({ active, onChange }) {
    const refs = useRef({});
    const onKey = (e) => {
        const i = SECTIONS.findIndex((s) => s.id === active);
        let n = -1;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % SECTIONS.length;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + SECTIONS.length) % SECTIONS.length;
        else if (e.key === "Home") n = 0;
        else if (e.key === "End") n = SECTIONS.length - 1;
        if (n === -1) return;
        e.preventDefault();
        const next = SECTIONS[n].id;
        onChange(next);
        requestAnimationFrame(() => refs.current[next] && refs.current[next].focus());
    };
    return (
        <div className="wa-atabs" role="tablist" aria-label="Client record sections">
            {SECTIONS.map((s) => (
                <button key={s.id}
                    ref={(el) => (refs.current[s.id] = el)}
                    className={"wa-atab" + (active === s.id ? " wa-atab--active" : "")}
                    role="tab" id={"tab-" + s.id} aria-controls={"panel-" + s.id}
                    aria-selected={active === s.id} tabIndex={active === s.id ? 0 : -1}
                    onClick={() => onChange(s.id)} onKeyDown={onKey}>
                    {s.label}
                </button>
            ))}
        </div>
    );
};

/* the screen ------------------------------------------------------------- */
WA.CustomerDetails = function CustomerDetails({ onOpenProfile }) {
    const [tab, setTab] = useState("audit");
    const [open, setOpen] = useState("assim");

    const flagged = WA.systems.filter((s) => s.score >= 25).length;
    const top = WA.systems.reduce((a, b) => (b.score > a.score ? b : a));
    const healthy = WA.systems.length - flagged;

    return (
        <React.Fragment>
            <a className="wa-back" href="#" onClick={(e) => e.preventDefault()}>
                <i className="bi bi-chevron-left"></i><u>Back to All Clients</u>
            </a>

            {/* compact client context header */}
            <div className="wa-clienthdr">
                <div className="wa-clienthdr__avatar">PHOTO</div>
                <div className="wa-clienthdr__id">
                    <p className="wa-clienthdr__name">{WA.client.name}</p>
                    <div className="wa-clienthdr__meta">
                        <span><i className="bi bi-person"></i>{WA.client.meta.age}</span>
                        <span><i className="bi bi-geo-alt"></i>{WA.client.meta.location}</span>
                        <span><i className="bi bi-telephone"></i>{WA.client.meta.phone}</span>
                    </div>
                </div>
                <div className="wa-clienthdr__cta">
                    <button onClick={onOpenProfile}><i className="bi bi-graph-up"></i>Tracking</button>
                </div>
            </div>

            <section>
                <WA.SectionTabs active={tab} onChange={setTab} />

                {tab !== "audit" && (
                    <div className="wa-panel-empty" role="tabpanel" id={"panel-" + tab}
                        aria-labelledby={"tab-" + tab} tabIndex={0}>
                        {SECTIONS.find((s) => s.id === tab).label} — coming soon.
                    </div>
                )}

                {tab === "audit" && (
                    <div role="tabpanel" id="panel-audit" aria-labelledby="tab-audit" tabIndex={0}>
                        <div className="wa-info">
                            <i className="bi bi-info-circle-fill"></i>
                            <div>Each system is scored <strong>0–100 — higher means more concern</strong>. Anything
                                <strong> above 25</strong> needs attention, and a 75 is more severe than a 40. Systems under 25 are in a
                                healthy range — keep focusing on lifestyle basics.</div>
                        </div>

                        <div className="wa-summary">
                            <div className="wa-stat"><div className="wa-stat__k">Need attention</div>
                                <div className="wa-stat__v">{flagged} <small>of {WA.systems.length} systems</small></div></div>
                            <div className="wa-stat"><div className="wa-stat__k">Highest concern</div>
                                <div className="wa-stat__v">{top.score} <small>{top.name}</small></div></div>
                            <div className="wa-stat"><div className="wa-stat__k">In healthy range</div>
                                <div className="wa-stat__v">{healthy} <small>Structure</small></div></div>
                        </div>

                        <div className="wa-legend">
                            <span className="wa-legend__item"><span className="wa-legend__dot" style={{ background: "#2f7d3a" }}></span>Healthy &lt;25</span>
                            <span className="wa-legend__item"><span className="wa-legend__dot" style={{ background: "#c9a83a" }}></span>Mild 25–49</span>
                            <span className="wa-legend__item"><span className="wa-legend__dot" style={{ background: "#cf7536" }}></span>Moderate 50–74</span>
                            <span className="wa-legend__item"><span className="wa-legend__dot" style={{ background: "#c34b4b" }}></span>Severe 75+</span>
                        </div>

                        <div className="wa-listhead"><h3>Systems flagged</h3></div>

                        <div className="wa-acc">
                            {[...WA.systems].sort((a, b) => b.score - a.score).map((sys) => (
                                <WA.SystemRow key={sys.id} sys={sys} isOpen={open === sys.id}
                                    onToggle={() => setOpen(open === sys.id ? null : sys.id)} />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </React.Fragment>
    );
};
