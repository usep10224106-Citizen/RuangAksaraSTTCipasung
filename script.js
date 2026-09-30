/* =========================================================
   RUANG AKSARA STT CIPASUNG
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   KONFIGURASI LOCAL STORAGE
   ========================================================= */

const STORAGE = {
    darkMode: "ruangAksaraDarkMode",
    favorites: "ruangAksaraFavorites",
    works: "ruangAksaraWorks",
    notifications: "ruangAksaraNotifications"
};


/* =========================================================
   HELPER LOCAL STORAGE
   ========================================================= */

function getStorage(key, fallback = []) {

    try {

        const data = localStorage.getItem(key);

        if (!data) {
            return fallback;
        }

        return JSON.parse(data);

    } catch (error) {

        console.warn(
            `Gagal membaca localStorage: ${key}`,
            error
        );

        return fallback;

    }

}


function setStorage(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {

        console.warn(
            `Gagal menyimpan localStorage: ${key}`,
            error
        );

        return false;

    }

}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function initMobileMenu() {

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.querySelector(".sidebar");

    if (!mobileMenu || !sidebar) {
        return;
    }


    mobileMenu.addEventListener(
        "click",
        function() {

            sidebar.classList.toggle("show");

        }
    );

}


function closeMobileMenu() {

    const sidebar =
        document.querySelector(".sidebar");

    if (sidebar) {

        sidebar.classList.remove("show");

    }

}


/* =========================================================
   DARK MODE
   ========================================================= */

function applyDarkMode() {

    const savedMode =
        localStorage.getItem(
            STORAGE.darkMode
        ) === "true";


    document.body.classList.toggle(
        "dark",
        savedMode
    );


    updateDarkModeButton();

}


function updateDarkModeButton() {

    const buttons =
        document.querySelectorAll(
            "#darkModeBtn, #darkButton"
        );


    buttons.forEach(button => {

        const isDark =
            document.body.classList.contains(
                "dark"
            );


        button.innerHTML =
            isDark
                ? "☀️ Mode Terang"
                : "🌙 Mode Gelap";

    });

}


function toggleDarkMode() {

    const isDark =
        document.body.classList.toggle(
            "dark"
        );


    localStorage.setItem(
        STORAGE.darkMode,
        isDark
    );


    updateDarkModeButton();

}


function initDarkMode() {

    applyDarkMode();


    const buttons =
        document.querySelectorAll(
            "#darkModeBtn, #darkButton"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            toggleDarkMode
        );

    });

}


/* =========================================================
   DATA KARYA LAMA / MODAL
   ========================================================= */

const works = {

    puisi: {

        category: "PUISI",

        title: "Langkah di Balik Aksara",

        text:
            "Setiap kata menyimpan cerita, " +
            "setiap baris menyimpan perjalanan. " +
            "Dari aksara kita belajar memahami " +
            "dunia dan diri sendiri."

    },


    cerita: {

        category: "CERITA",

        title: "Awal Sebuah Perjalanan",

        text:
            "Setiap perjalanan dimulai dari sebuah " +
            "langkah. Begitu pula sebuah cerita, " +
            "bermula dari keberanian untuk menuliskan " +
            "kata pertama."

    },


    artikel: {

        category: "ARTIKEL",

        title: "Menulis di Era Digital",

        text:
            "Di tengah perkembangan teknologi, " +
            "menulis tetap menjadi salah satu cara " +
            "untuk menyampaikan gagasan dan " +
            "pengetahuan."

    }

};


/* =========================================================
   BUKA DETAIL MODAL KARYA
   ========================================================= */

function openWork(type) {

    const work =
        works[type];

    if (!work) {
        return;
    }


    const workModal =
        document.getElementById(
            "workModal"
        );


    if (!workModal) {
        return;
    }


    const modalCategory =
        document.getElementById(
            "modalCategory"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalText =
        document.getElementById(
            "modalText"
        );


    if (modalCategory) {

        modalCategory.textContent =
            work.category;

    }


    if (modalTitle) {

        modalTitle.textContent =
            work.title;

    }


    if (modalText) {

        modalText.textContent =
            work.text;

    }


    workModal.classList.add(
        "show"
    );

}


/* =========================================================
   TUTUP MODAL
   ========================================================= */

function closeWork() {

    const workModal =
        document.getElementById(
            "workModal"
        );


    if (workModal) {

        workModal.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   EVENT MODAL
   ========================================================= */

function initWorkModal() {

    const workModal =
        document.getElementById(
            "workModal"
        );


    if (!workModal) {
        return;
    }


    workModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                workModal
            ) {

                closeWork();

            }

        }
    );

}


/* =========================================================
   FILTER KARYA
   ========================================================= */

function filterWorks(category) {

    const cards =
        document.querySelectorAll(
            ".searchable"
        );


    cards.forEach(card => {

        const cardCategory =
            (
                card.dataset.category ||
                ""
            ).toLowerCase();


        const targetCategory =
            (
                category ||
                ""
            ).toLowerCase();


        if (
            targetCategory === "semua" ||
            targetCategory === "all" ||
            cardCategory === targetCategory
        ) {

            card.style.display =
                "";

        } else {

            card.style.display =
                "none";

        }

    });


    const karyaSection =
        document.getElementById(
            "karya"
        );


    if (karyaSection) {

        karyaSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   SEARCH KARYA
   ========================================================= */

function initSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function() {

            const keyword =
                this.value
                    .toLowerCase()
                    .trim();


            const cards =
                document.querySelectorAll(
                    ".searchable"
                );


            cards.forEach(card => {

                const text =
                    card.innerText
                        .toLowerCase();


                if (
                    text.includes(keyword)
                ) {

                    card.style.display =
                        "";

                } else {

                    card.style.display =
                        "none";

                }

            });

        }
    );

}


/* =========================================================
   NAVIGASI SIDEBAR
   ========================================================= */

function initNavigation() {

    const menuItems =
        document.querySelectorAll(
            ".menu-item"
        );


    if (!menuItems.length) {
        return;
    }


    menuItems.forEach(item => {

        item.addEventListener(
            "click",
            function() {

                menuItems.forEach(
                    menu => {

                        menu.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                closeMobileMenu();

            }
        );

    });

}


/* =========================================================
   FAVORITE SYSTEM
   ========================================================= */

function getFavorites() {

    return getStorage(
        STORAGE.favorites,
        []
    );

}


function saveFavorites(favorites) {

    return setStorage(
        STORAGE.favorites,
        favorites
    );

}


/* =========================================================
   AMBIL ID KARYA
   ========================================================= */

function getWorkIdFromCard(card) {

    if (!card) {
        return null;
    }


    /* Cek data-id */

    if (card.dataset.id) {

        return card.dataset.id;

    }


    /* Cek tombol baca karya */

    const readButton =
        card.querySelector(
            'a[href*="detail-karya.html?id="]'
        );


    if (readButton) {

        try {

            const url =
                new URL(
                    readButton.href,
                    window.location.href
                );


            const id =
                url.searchParams.get(
                    "id"
                );


            if (id) {
                return id;
            }

        } catch (error) {

            console.warn(
                "ID karya tidak dapat dibaca."
            );

        }

    }


    return null;

}


/* =========================================================
   TAMBAH / HAPUS FAVORIT
   ========================================================= */

function toggleFavorite(button) {

    if (!button) {
        return;
    }


    const card =
        button.closest(
            ".work-card"
        );


    if (!card) {
        return;
    }


    const titleElement =
        card.querySelector(
            "h3"
        );


    if (!titleElement) {
        return;
    }


    const categoryElement =
        card.querySelector(
            ".work-category"
        );


    const descriptionElement =
        card.querySelector(
            "p"
        );


    const imageElement =
        card.querySelector(
            "img"
        );


    const title =
        titleElement.innerText.trim();


    const category =
        categoryElement
            ? categoryElement.innerText.trim()
            : "KARYA";


    const description =
        descriptionElement
            ? descriptionElement.innerText.trim()
            : "";


    const image =
        imageElement
            ? imageElement.getAttribute(
                "src"
            )
            : "";


    let favorites =
        getFavorites();


    let workId =
        getWorkIdFromCard(card);


    /*
       Jika kartu lama belum mempunyai ID,
       gunakan ID berdasarkan judul.
    */

    if (!workId) {

        workId =
            "legacy-" +
            title
                .toLowerCase()
                .replace(
                    /[^a-z0-9]+/g,
                    "-"
                )
                .replace(
                    /^-|-$/g,
                    ""
                );

    }


    const existingIndex =
        favorites.findIndex(
            item =>
                String(item.id) ===
                String(workId)
        );


    /* =========================
       HAPUS FAVORIT
       ========================= */

    if (
        existingIndex !== -1
    ) {

        favorites.splice(
            existingIndex,
            1
        );


        button.innerHTML =
            "♡";


        button.classList.remove(
            "active"
        );


        button.title =
            "Tambah ke favorit";

    }


    /* =========================
       TAMBAH FAVORIT
       ========================= */

    else {

        favorites.push({

            id: workId,

            title: title,

            category: category,

            description:
                description,

            image:
                image,

            savedAt:
                new Date().toISOString()

        });


        button.innerHTML =
            "♥";


        button.classList.add(
            "active"
        );


        button.title =
            "Hapus dari favorit";

    }


    saveFavorites(
        favorites
    );

}


/* =========================================================
   UPDATE TOMBOL FAVORIT
   ========================================================= */

function updateFavoriteButtons() {

    const favorites =
        getFavorites();


    const cards =
        document.querySelectorAll(
            ".work-card"
        );


    cards.forEach(card => {

        const button =
            card.querySelector(
                ".favorite-button, .favorite-btn"
            );


        if (!button) {
            return;
        }


        const workId =
            getWorkIdFromCard(
                card
            );


        const titleElement =
            card.querySelector(
                "h3"
            );


        const title =
            titleElement
                ? titleElement.innerText.trim()
                : "";


        const isFavorite =
            favorites.some(
                item => {

                    if (
                        workId &&
                        item.id
                    ) {

                        return (
                            String(item.id) ===
                            String(workId)
                        );

                    }


                    return (
                        item.title ===
                        title
                    );

                }
            );


        if (isFavorite) {

            button.innerHTML =
                "♥";

            button.classList.add(
                "active"
            );

            button.title =
                "Hapus dari favorit";

        } else {

            button.innerHTML =
                "♡";

            button.classList.remove(
                "active"
            );

            button.title =
                "Tambah ke favorit";

        }

    });

}


/* =========================================================
   NOTIFICATION BADGE
   ========================================================= */

function updateNotificationBadge() {

    const notifications =
        getStorage(
            STORAGE.notifications,
            []
        );


    const unread =
        notifications.filter(
            notification =>
                !notification.read
        ).length;


    const badges =
        document.querySelectorAll(
            ".notification-badge, #notificationBadge"
        );


    badges.forEach(badge => {

        if (unread > 0) {

            badge.textContent =
                unread > 99
                    ? "99+"
                    : unread;

            badge.style.display =
                "flex";

        } else {

            badge.style.display =
                "none";

        }

    });

}


/* =========================================================
   KEYBOARD ESC UNTUK MODAL
   ========================================================= */

function initKeyboard() {

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeWork();

            }

        }
    );

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initMobileMenu();

        initDarkMode();

        initWorkModal();

        initSearch();

        initNavigation();

        initKeyboard();

        updateFavoriteButtons();

        updateNotificationBadge();

    }
);
