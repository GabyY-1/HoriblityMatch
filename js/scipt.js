document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MENU MOBILE
    ========================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            nav.classList.toggle("open");

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                nav.classList.remove("open");

            });

        });

    }


    /* =========================
       ANNÉE FOOTER
    ========================= */

    document.querySelectorAll("[data-year]").forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =========================
       PAGE ANNONCES
    ========================= */

    if (document.getElementById("publicAnnouncements")) {
        loadPublicAnnouncements();
    }


    /* =========================
       PAGE PARTENAIRES
    ========================= */

    if (document.getElementById("publicPartners")) {
        loadPublicPartners();
    }


    /* =========================
       PAGE REALISATIONS
    ========================= */

    if (document.getElementById("publicProjects")) {
        loadPublicProjects();
    }


    /* =========================
       ACCUEIL
    ========================= */

    if (document.getElementById("homeAnnouncements")) {
        loadHomeAnnouncements();
    }

});


/* =====================================================
   UTILITAIRES
===================================================== */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/[&<>"']/g, character => {

            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return entities[character];

        });

}


function formatDate(date) {

    if (!date) {
        return "";
    }

    return new Date(date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

}


/* =====================================================
   ANNONCES PUBLIQUES
===================================================== */

async function loadPublicAnnouncements() {

    const container =
        document.getElementById("publicAnnouncements");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="loading-box">
            Chargement des annonces...
        </div>
    `;


    const {
        data,
        error
    } = await supabaseClient
        .from("annonces")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(error);

        container.innerHTML = `
            <div class="empty-box">
                Impossible de charger les annonces.
            </div>
        `;

        return;
    }


    if (!data || data.length === 0) {

        container.innerHTML = `
            <div class="empty-box">
                Aucune annonce pour le moment.
            </div>
        `;

        return;
    }


    container.innerHTML = data.map(item => `

        <article class="content-card">

            <div class="card-top">

                <span class="tag">
                    ${escapeHTML(item.categorie || "Information")}
                </span>

                <span class="date">
                    ${formatDate(item.created_at)}
                </span>

            </div>

            <h3>
                ${escapeHTML(item.titre)}
            </h3>

            <p>
                ${escapeHTML(item.contenu)}
            </p>

        </article>

    `).join("");

}


/* =====================================================
   ANNONCES ACCUEIL
===================================================== */

async function loadHomeAnnouncements() {

    const container =
        document.getElementById("homeAnnouncements");

    if (!container) {
        return;
    }


    const {
        data,
        error
    } = await supabaseClient
        .from("annonces")
        .select("*")
        .order("created_at", {
            ascending: false
        })
        .limit(3);


    if (error || !data || data.length === 0) {

        container.innerHTML = `
            <div class="empty-box">
                Aucune annonce récente.
            </div>
        `;

        return;
    }


    container.innerHTML = data.map(item => `

        <article class="mini-card">

            <span class="tag">
                ${escapeHTML(item.categorie || "Information")}
            </span>

            <h3>
                ${escapeHTML(item.titre)}
            </h3>

            <p>
                ${escapeHTML(item.contenu)}
            </p>

            <small>
                ${formatDate(item.created_at)}
            </small>

        </article>

    `).join("");

}


/* =====================================================
   PARTENAIRES
===================================================== */

async function loadPublicPartners() {

    const container =
        document.getElementById("publicPartners");

    if (!container) {
        return;
    }


    const {
        data,
        error
    } = await supabaseClient
        .from("partenaires")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(error);

        container.innerHTML = `
            <div class="empty-box">
                Impossible de charger les partenaires.
            </div>
        `;

        return;
    }


    if (!data || data.length === 0) {

        container.innerHTML = `
            <div class="empty-box">
                Aucun partenaire pour le moment.
            </div>
        `;

        return;
    }


    container.innerHTML = data.map(item => `

        <article class="content-card">

            <div class="partner-icon">
                ${escapeHTML(item.nom.charAt(0).toUpperCase())}
            </div>

            <h3>
                ${escapeHTML(item.nom)}
            </h3>

            <p>
                ${escapeHTML(item.description || "")}
            </p>

            ${
                item.lien
                ? `
                    <a
                        href="${escapeHTML(item.lien)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-link"
                    >
                        Découvrir le partenaire ↗
                    </a>
                `
                : ""
            }

        </article>

    `).join("");

}


/* =====================================================
   REALISATIONS
===================================================== */

async function loadPublicProjects() {

    const container =
        document.getElementById("publicProjects");

    if (!container) {
        return;
    }


    const {
        data,
        error
    } = await supabaseClient
        .from("realisations")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(error);

        container.innerHTML = `
            <div class="empty-box">
                Impossible de charger les réalisations.
            </div>
        `;

        return;
    }


    if (!data || data.length === 0) {

        container.innerHTML = `
            <div class="empty-box">
                Les réalisations seront bientôt disponibles.
            </div>
        `;

        return;
    }


    container.innerHTML = data.map(item => `

        <article class="content-card project-card">

            <div class="project-number">
                PROJET
            </div>

            <h3>
                ${escapeHTML(item.titre)}
            </h3>

            <p>
                ${escapeHTML(item.description || "")}
            </p>

            ${
                item.lien
                ? `
                    <a
                        href="${escapeHTML(item.lien)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-link"
                    >
                        Voir le projet ↗
                    </a>
                `
                : ""
            }

        </article>

    `).join("");

}
