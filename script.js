
const starterSkills = [
    {
        id: 1,
        name: "Aarav",
        teach: "Canva Design",
        category: "Creative",
        want: "Basic Python",
        about: "I can help you make clean posters and social media designs. Beginner-friendly!",
        contact: "",
        icon: "🎨"
    },

    {
        id: 2,
        name: "Meera",
        teach: "Basic Python",
        category: "Technology",
        want: "Public Speaking",
        about: "Let's start with variables, loops and tiny programs. Learning by practice.",
        contact: "",
        icon: "💻"
    },

    {
        id: 3,
        name: "Kabir",
        teach: "Public Speaking",
        category: "Life Skills",
        want: "Photography",
        about: "I can help with presentation confidence, speaking structure and practice.",
        contact: "",
        icon: "🎤"
    },

    {
        id: 4,
        name: "Ananya",
        teach: "Photography",
        category: "Creative",
        want: "Excel Basics",
        about: "Phone photography, composition and editing basics.",
        contact: "",
        icon: "📷"
    },

    {
        id: 5,
        name: "Riya",
        teach: "Excel Basics",
        category: "Academic",
        want: "French",
        about: "Spreadsheets, formulas and simple charts. Happy to exchange notes too.",
        contact: "",
        icon: "📊"
    },

    {
        id: 6,
        name: "Dev",
        teach: "French",
        category: "Language",
        want: "Guitar Basics",
        about: "Beginner French vocabulary and simple conversational practice.",
        contact: "",
        icon: "🇫🇷"
    },

    {
        id: 7,
        name: "Ishaan",
        teach: "Guitar Basics",
        category: "Creative",
        want: "Canva Design",
        about: "A few beginner chords, strumming patterns and practice tips.",
        contact: "",
        icon: "🎸"
    },

    {
        id: 8,
        name: "Sana",
        teach: "C++ Basics",
        category: "Technology",
        want: "Video Editing",
        about: "I can explain fundamentals, conditions, loops and simple programs.",
        contact: "",
        icon: "🧑‍💻"
    }
];


// Get all skills
function getSkills() {
    let custom = JSON.parse(localStorage.getItem("ssSkills") || "[]");

    return [...starterSkills, ...custom];
}


// Get skills added by users
function getCustom() {
    return JSON.parse(localStorage.getItem("ssSkills") || "[]");
}


// Get saved cards
function getSaved() {
    return JSON.parse(localStorage.getItem("ssSaved") || "[]");
}


// Mobile navigation
function toggleNav() {
    document.getElementById("nav")?.classList.toggle("open");
}


// Prevent HTML from being inserted as text
function esc(str) {
    return String(str || "").replace(/[&<>"']/g, ch => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[ch]));
}


// Choose an icon according to category
function iconFor(cat) {
    return {
        Technology: "💻",
        Creative: "🎨",
        Academic: "📚",
        Language: "🌐",
        "Life Skills": "✨",
        Other: "🧩"
    }[cat] || "🧩";
}


// Create a skill card
function skillCard(skill, profile = false) {

    const saved = getSaved().includes(skill.id);

    return `
        <article class="skill-card">

            <div class="skill-top">

                <div class="avatar">
                    ${esc(skill.icon || iconFor(skill.category))}
                </div>

                <div>
                    <h3>${esc(skill.name)}</h3>
                    <small>Student community member</small>
                </div>

            </div>

            <span class="category-pill">
                ${esc(skill.category.toUpperCase())}
            </span>

            <h4>${esc(skill.teach)}</h4>

            <p>
                ${esc(skill.about || "Ready to share this skill with another learner.")}
            </p>

            <div class="swap-line">
                🔄 Wants to learn:
                <b>${esc(skill.want)}</b>
            </div>

            <div class="skill-actions">

                ${
                    profile

                    ? `<button class="button outline"
                        onclick="deleteSkill(${skill.id})">
                        Remove
                       </button>`

                    : `<button class="button secondary"
                        onclick="saveSkill(${skill.id})">
                        ${saved ? "Saved ✓" : "Save card"}
                       </button>

                       <button class="button main"
                        onclick="requestSwap(${skill.id})">
                        Connect
                       </button>`
                }

            </div>

        </article>
    `;
}


// Home page
function homeInit() {

    const grid = document.getElementById("homeSkills");

    if (grid) {
        grid.innerHTML = getSkills()
            .slice(0, 3)
            .map(s => skillCard(s))
            .join("");
    }

    const count = document.getElementById("totalSkills");

    if (count) {
        count.textContent = getSkills().length;
    }

    const people = document.getElementById("totalPeople");

    if (people) {
        people.textContent = new Set(
            getSkills().map(s => s.name)
        ).size;
    }
}


// Explore page
function renderExplore() {

    const grid = document.getElementById("exploreSkills");

    if (!grid) return;

    const search = (
        document.getElementById("skillSearch")?.value || ""
    ).toLowerCase();

    const category =
        document.getElementById("skillCategory")?.value || "all";

    const list = getSkills().filter(s => {

        return (
            (category === "all" || s.category === category)
            &&
            (
                `${s.name} ${s.teach} ${s.want} ${s.about} ${s.category}`
            ).toLowerCase().includes(search)
        );

    });

    grid.innerHTML = list.map(s => skillCard(s)).join("");

    const empty = document.getElementById("exploreEmpty");

    if (empty) {
        empty.hidden = list.length > 0;
    }
}


// Save or unsave a skill
function saveSkill(id) {

    let saved = getSaved();

    if (saved.includes(id)) {

        saved = saved.filter(x => x !== id);

    } else {

        saved.push(id);
    }

    localStorage.setItem("ssSaved", JSON.stringify(saved));

    renderExplore();
    homeInit();
    profileInit();
}


// Connect button
function requestSwap(id) {

    const skill = getSkills().find(s => s.id === id);

    if (!skill) return;

    alert(
        `Connect request demo!

You selected ${skill.name},
who can teach ${skill.teach}
and wants to learn ${skill.want}.

In a real website, this would send a message or connection request.`
    );
}


// Offer skill form
const offerForm = document.getElementById("offerForm");

if (offerForm) {

    offerForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const name = document.getElementById("personName").value.trim();

        const teach = document.getElementById("teachSkill").value.trim();

        const category = document.getElementById("teachCategory").value;

        const want = document.getElementById("wantSkill").value.trim();

        if (!name || !teach || !category || !want) {
            return;
        }

        const skill = {

            id: Date.now(),

            name: name,

            teach: teach,

            category: category,

            want: want,

            about: document.getElementById("aboutPerson").value.trim(),

            contact: document.getElementById("personContact").value.trim(),

            icon: iconFor(category)
        };

        const custom = getCustom();

        custom.unshift(skill);

        localStorage.setItem("ssSkills", JSON.stringify(custom));

        document.getElementById("offerMessage").textContent =
            "Your skill card is live! Visit Explore to see it.";

        offerForm.reset();

    });
}


// Find matching skills
function findMatches() {

    const input = (
        document.getElementById("matchSearch")?.value || ""
    ).trim().toLowerCase();

    const box = document.getElementById("matchResults");

    if (!box) return;

    if (!input) {

        box.innerHTML =
            "<p class='empty'>Please enter a skill you'd like to learn.</p>";

        return;
    }

    const matches = getSkills().filter(s =>
        s.teach.toLowerCase().includes(input)
    );

    box.innerHTML = `

        <h2 class="match-results-title">
            Results for "${esc(input)}"
        </h2>

        ${
            matches.length

            ? `
                <div class="match-note">
                    Found ${matches.length}
                    ${matches.length === 1 ? "person" : "people"}
                    offering a skill related to your search.
                </div>

                <div class="skill-grid">
                    ${matches.map(s => skillCard(s)).join("")}
                </div>
            `

            : `
                <div class="empty">
                    No one is offering "${esc(input)}" yet.
                    You could post a skill and request it as your learning goal!
                </div>
            `
        }

    `;
}


// Profile page
function profileInit() {

    const mine = document.getElementById("mySkills");

    if (mine) {

        const custom = getCustom();

        mine.innerHTML = custom.length

            ? custom.map(s => skillCard(s, true)).join("")

            : `
                <p class="empty">
                    You haven't posted skills yet.
                    <a class="text-link" href="offer.html">
                        Add your first skill →
                    </a>
                </p>
            `;
    }


    const savedBox = document.getElementById("savedSkills");

    if (savedBox) {

        const ids = getSaved();

        const saved = getSkills().filter(s => ids.includes(s.id));

        savedBox.innerHTML = saved.length

            ? saved.map(s => skillCard(s)).join("")

            : `
                <p class="empty">
                    No saved skill cards yet.
                    Explore and save cards you like.
                </p>
            `;
    }
}


// Delete a skill card
function deleteSkill(id) {

    let custom = getCustom().filter(s => s.id !== id);

    localStorage.setItem("ssSkills", JSON.stringify(custom));

    profileInit();
    homeInit();
}


// Clear all posted skills
function clearMyPosts() {

    if (confirm("Remove all skill cards you have posted?")) {

        localStorage.removeItem("ssSkills");

        profileInit();
        homeInit();
        renderExplore();
    }
}


// Run page functions
homeInit();
renderExplore();
profileInit();
