/* =========================================
   HORIBLITIMATCH
   SCRIPT PRINCIPAL
========================================= */


/* ================= MENU ================= */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {

    hamburger.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");

        hamburger.classList.toggle(
            "active",
            isOpen
        );

        hamburger.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                    hamburger.classList.remove(
                        "active"
                    );

                    hamburger.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });
}


/* ================= REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= YEAR ================= */

const year =
    document.getElementById(
        "currentYear"
    );

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* ================= ESCAPE HTML ================= */

function escapeHTML(value) {

    return String(value)
        .replace(
            /[&<>"']/g,
            character => {

                const entities = {

                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"

                };

                return entities[
                    character
                ];

            }
        );

}


/* ================= ANNONCES ================= */

/*
    Les annonces du panel staff sont stockées
    temporairement dans localStorage pour la V1.

    Plus tard :
    localStorage
        ↓
    vraie base de données
*/


function getAnnouncements() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "horiblitimatch_announcements"
            ) || "[]"
        );

    } catch {

        return [];

    }

}


function displayHomeAnnouncements() {

    const container =
        document.getElementById(
            "homeAnnouncements"
        );

    if (!container) return;


    const announcements =
        getAnnouncements();


    if (!announcements.length) return;


    container.innerHTML =
        announcements
            .slice(0, 3)
            .map(
                announcement => {

                    return `
                        <article class="announcement-card reveal visible">

                            <div class="announcement-date">
                                ${escapeHTML(
                                    announcement.date
                                )}
                            </div>

                            <div>

                                <small>
                                    HORIBLITIMATCH
                                </small>

                                <h3>
                                    ${escapeHTML(
                                        announcement.title
                                    )}
                                </h3>

                                <p>
                                    ${escapeHTML(
                                        announcement.content
                                    )}
                                </p>

                            </div>

                            <span>
                                →
                            </span>

                        </article>
                    `;

                }
            )
            .join("");

}


displayHomeAnnouncements();
