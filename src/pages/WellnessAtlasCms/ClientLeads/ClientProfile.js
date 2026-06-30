/* =========================================================================
   Screen 2 — Client Profile  (True North questionnaire + preferences)
   Editable: toggle Edit, change fields / chips / size / colour, Save persists.
   ========================================================================= */
window.WA = window.WA || {};
const { useState: useStateP } = React;

/* default profile data (from the questionnaire) -------------------------- */
WA.profileDefaults = function () {
    const C = (arr) => arr.map((a) => ({ l: a[0], on: !!a[1] }));
    return {
        name: "Swati Gupta",
        color: { hex: "#2f7d3a", name: "Forest Green" },
        size: "M",
        cards: [
            {
                icon: "bi-person", title: "Personal", rows: [
                    ["Age", "40"], ["Gender", "Female"], ["Date of Birth", "27 April 1984"]]
            },
            {
                icon: "bi-telephone", title: "Contact", rows: [
                    ["Mobile", "+91 97588 07786"], ["E-mail", "gr8swati.gupta@gm…"],
                    ["City", "Bengaluru"], ["Zip - Code", "560102"], ["Country", "India"]]
            },
            {
                icon: "bi-people", title: "Family", rows: [
                    ["Marital Status", "Married"], ["Anniversary", "10 December 2009"], ["No. of Children", "2"]]
            },
            {
                icon: "bi-sliders", title: "Preferences", rows: [
                    ["Diet", "Vegetarian"], ["Activity Level", "Moderate"],
                    ["Wake / Sleep", "6:00 AM / 11:00 PM"], ["Allergies", "Lactose"]]
            },
            {
                icon: "bi-bell", title: "Communication", rows: [
                    ["Preferred Channel", "WhatsApp"], ["Language", "English, Hindi"],
                    ["Best Time", "Evening"], ["Reminders", "Enabled"]]
            },
        ],
        family: [
            {
                icon: "bi-house-heart", title: "Living & Family", wide: false, rows: [
                    ["Living Situation", "With spouse & children"], ["No. of Children", "Two children"]]
            },
            {
                icon: "bi-calendar-heart", title: "Key Dates", wide: false, rows: [
                    ["Client Birthday", "27 Apr 1984"], ["Spouse Birthday", "12 Aug 1981"], ["Anniversary", "10 Dec 2009"]]
            },
            {
                icon: "bi-people-fill", title: "Children", wide: false, rows: [
                    ["Aarav (M)", "14 Mar 2012"], ["Ananya (F)", "2 Sep 2015"]]
            },
            {
                icon: "bi-geo-alt", title: "Postal Address", wide: true, rows: [
                    ["Address", "No. 24, 4th Cross, HSR Layout, Sector 3, Bengaluru, Karnataka 560102, India"]]
            },
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
};

WA.loadProfile = function () {
    try {
        const s = localStorage.getItem("wa-react-client-swati");
        if (s) {
            const parsed = JSON.parse(s);
            // shape guard: this app stores card rows as [key, value] arrays.
            const ok = parsed && Array.isArray(parsed.cards) &&
                parsed.cards.every((c) => Array.isArray(c.rows) && c.rows.every((r) => Array.isArray(r)));
            if (ok) return parsed;
        }
    } catch (e) { }
    return WA.profileDefaults();
};

/* chip-group renderer ---------------------------------------------------- */
function ChipGroup({ title, list, editing, onToggle, style }) {
    return (
        <div className="wa-chipgroup" style={style}>
            <p className="wa-chipgroup__k">{title}</p>
            <div className="wa-chips">
                {list.map((c, i) => (
                    <span key={i}
                        className={"wa-chip" + (c.on ? " wa-chip--on" : "") + (editing ? " wa-chip--edit" : "")}
                        onClick={editing ? () => onToggle(i) : undefined}>
                        {c.on && <i className="bi bi-check-lg"></i>}{c.l}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* editable field --------------------------------------------------------- */
function EField({ k, v, editing, onChange }) {
    return (
        <div className="wa-field">
            <span className="wa-field__k">{k}</span>
            {editing
                ? <input className="wa-edit-input" value={v} onChange={(e) => onChange(e.target.value)} />
                : <span className="wa-field__v">{v}</span>}
        </div>
    );
}

function Card({ card, editing, colCls, onRow }) {
    return (
        <div className={colCls}>
            <div className="wa-pcard">
                <div className="wa-pgroup__h"><i className={"bi " + card.icon}></i>{card.title}</div>
                {card.rows.map((r, ri) => (
                    <EField key={ri} k={r[0]} v={r[1]} editing={editing} onChange={(val) => onRow(ri, val)} />
                ))}
            </div>
        </div>
    );
}

/* the screen ------------------------------------------------------------- */
WA.ClientProfile = function ClientProfile({ title }) {
    const [data, setData] = useStateP(WA.loadProfile);
    const [editing, setEditing] = useStateP(false);
    const [backup, setBackup] = useStateP(null);

    const clone = (o) => JSON.parse(JSON.stringify(o));
    const upd = (m) => { const d = clone(data); m(d); setData(d); };

    const start = () => { setBackup(clone(data)); setEditing(true); };
    const cancel = () => { if (backup) setData(backup); setBackup(null); setEditing(false); };
    const save = () => {
        try { localStorage.setItem("wa-react-client-swati", JSON.stringify(data)); } catch (e) { }
        setBackup(null); setEditing(false);
    };

    const sizes = ["XS", "S", "M", "L", "XL"];

    return (
        <React.Fragment>
            <a className="wa-back" href="#" onClick={(e) => e.preventDefault()}>
                <i className="bi bi-chevron-left"></i><u>Back to Customer Details</u>
            </a>

            {/* head + edit controls */}
            <div className="wa-profilepage__head">
                <div className="wa-profile__avatar wa-profile__avatar--sm">CLIENT&nbsp;PHOTO</div>
                <div className="wa-profilepage__id">
                    {editing
                        ? <input className="wa-edit-name" value={data.name}
                            onChange={(e) => upd((d) => (d.name = e.target.value))} />
                        : <h2>{data.name}</h2>}
                    <span className="wa-profilepage__role">Client</span>
                </div>
                <div className="wa-edit-actions">
                    {!editing && <button className="wa-editbtn" onClick={start}><i className="bi bi-pencil"></i>Edit profile</button>}
                    {editing && <button className="wa-editbtn wa-editbtn--ghost" onClick={cancel}>Cancel</button>}
                    {editing && <button className="wa-editbtn wa-editbtn--save" onClick={save}><i className="bi bi-check-lg"></i>Save changes</button>}
                </div>
            </div>

            {editing && (
                <div className="wa-editbanner">
                    <i className="bi bi-pencil-square"></i>
                    Editing — change any field, tap chips, size or colour to toggle, then Save changes.
                </div>
            )}

            {/* snapshot cards */}
            <div className="row g-4">
                {data.cards.map((c, ci) => (
                    <Card key={ci} card={c} editing={editing} colCls="col-12 col-md-6 col-xl-4"
                        onRow={(ri, val) => upd((d) => (d.cards[ci].rows[ri][1] = val))} />
                ))}
            </div>

            {/* A. Personal Preferences */}
            <div className="wa-psection">
                <div className="wa-psection__bar"><span className="wa-psection__tag">A</span><h3>Personal Preferences</h3><span className="line"></span></div>
                <div className="wa-pcard">
                    <ChipGroup title="Food preferences" list={data.chips.food} editing={editing}
                        onToggle={(i) => upd((d) => (d.chips.food[i].on = !d.chips.food[i].on))} />
                    <ChipGroup title="Hobbies & interests" list={data.chips.hobby} editing={editing} style={{ marginTop: 18 }}
                        onToggle={(i) => upd((d) => (d.chips.hobby[i].on = !d.chips.hobby[i].on))} />
                    <ChipGroup title="Content they enjoy" list={data.chips.content} editing={editing} style={{ marginTop: 18 }}
                        onToggle={(i) => upd((d) => (d.chips.content[i].on = !d.chips.content[i].on))} />
                </div>
            </div>

            {/* B. Emotional Connectors & Delight Triggers */}
            <div className="wa-psection">
                <div className="wa-psection__bar"><span className="wa-psection__tag">B</span><h3>Emotional Connectors &amp; Delight Triggers</h3><span className="line"></span></div>
                <div className="row g-4">
                    <div className="col-12 col-lg-6">
                        <div className="wa-pcard">
                            <ChipGroup title="Ways to make them feel special" list={data.chips.special} editing={editing}
                                onToggle={(i) => upd((d) => (d.chips.special[i].on = !d.chips.special[i].on))} />
                            <ChipGroup title="Gifts they'd love" list={data.chips.gift} editing={editing} style={{ marginTop: 18 }}
                                onToggle={(i) => upd((d) => (d.chips.gift[i].on = !d.chips.gift[i].on))} />
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="wa-pcard">
                            <ChipGroup title="Dreams, aspirations & goals" list={data.chips.goal} editing={editing}
                                onToggle={(i) => upd((d) => (d.chips.goal[i].on = !d.chips.goal[i].on))} />
                            <div className="row g-3" style={{ marginTop: 6 }}>
                                <div className="col-6">
                                    <p className="wa-chipgroup__k">Favourite colour</p>
                                    {editing
                                        ? <div className="wa-edit-colorrow">
                                            <input type="color" className="wa-edit-color" value={data.color.hex}
                                                onChange={(e) => upd((d) => (d.color.hex = e.target.value))} />
                                            <input className="wa-edit-input" style={{ textAlign: "left", maxWidth: "none" }}
                                                value={data.color.name} onChange={(e) => upd((d) => (d.color.name = e.target.value))} />
                                        </div>
                                        : <span className="wa-swatch">
                                            <span className="wa-swatch__dot" style={{ background: data.color.hex }}></span>{data.color.name}
                                        </span>}
                                </div>
                                <div className="col-6">
                                    <p className="wa-chipgroup__k">Target clothing size</p>
                                    <div className="wa-sizepills">
                                        {sizes.map((s) => (
                                            <span key={s}
                                                className={"wa-sizepill" + (s === data.size ? " wa-sizepill--on" : "") + (editing ? " wa-sizepill--edit" : "")}
                                                onClick={editing ? () => upd((d) => (d.size = s)) : undefined}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* C. Family Structure & Key Information */}
            <div className="wa-psection">
                <div className="wa-psection__bar"><span className="wa-psection__tag">C</span><h3>Family Structure &amp; Key Information</h3><span className="line"></span></div>
                <div className="row g-4">
                    {data.family.map((c, ci) => (
                        <Card key={ci} card={c} editing={editing}
                            colCls={c.wide ? "col-12" : "col-12 col-md-6 col-xl-4"}
                            onRow={(ri, val) => upd((d) => (d.family[ci].rows[ri][1] = val))} />
                    ))}
                </div>
            </div>

            {/* UCD tracking (read-only activity log) */}
            <div className="wa-psection">
                <div className="wa-psection__bar"><span className="wa-psection__tag">UCD</span><h3>Unexpected Client Delight</h3><span className="line"></span></div>
                <div className="row g-4">
                    <div className="col-12 col-lg-7">
                        <div className="wa-pcard">
                            <div className="wa-pgroup__h"><i className="bi bi-phone"></i>Digital UCD</div>
                            <div className="wa-ucd" style={{ marginTop: 14 }}>
                                {[
                                    ["Trailblazer", "12 Jan"], ["Hydration Hero", "20 Jan"], ["Sugar Slayer", "3 Feb"],
                                    ["Salad Ninja", null], ["Label Legend", null], ["Unstoppable Wellness Warrior", null],
                                    ["\u201CLook How Far You've Come\u201D Video", null], ["Ultimate Wellness Warrior", null],
                                    ["Pause the Program gift", null], ["Extend the Program gift", null], ["Enrol in a challenge gift", null],
                                ].map(([name, date], i) => (
                                    <div key={i} className={"wa-ucd__row" + (date ? " wa-ucd__row--done" : "")}>
                                        <span className="wa-ucd__check"><i className="bi bi-check-lg"></i></span>
                                        <span className="wa-ucd__name">{name}</span>
                                        {date && <span className="wa-ucd__date">{date}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="wa-pcard">
                            <div className="wa-pgroup__h"><i className="bi bi-gift"></i>Physical UCD</div>
                            <div style={{ marginTop: 14 }}>
                                {[
                                    { t: "Gift / Flowers", icon: "bi-flower1", meta: [["Date", "14 Feb 2026"], ["Website", "IGP.com"], ["Item", "Tulip bouquet"], ["Amount", "₹1,299"]] },
                                    { t: "Food Sent", icon: "bi-bag-heart", meta: [["Date", "3 Mar 2026"], ["Source", "App order"], ["Item", "Fruit hamper"], ["Amount", "₹850"]] },
                                    { t: "Physical Meeting", icon: "bi-camera", meta: [["Date", "22 Mar 2026"], ["Photo", "Uploaded"]] },
                                ].map((c, i) => (
                                    <div className="wa-ucdcard" key={i}>
                                        <p className="wa-ucdcard__t"><i className={"bi " + c.icon}></i>{c.t}</p>
                                        <dl className="wa-ucdmeta">
                                            {c.meta.map(([dt, dd], j) => (
                                                <div key={j}><dt>{dt}</dt><dd>{dd}</dd></div>
                                            ))}
                                        </dl>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
