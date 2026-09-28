```javascript
// ==============================
// MENU MOBILE
// ==============================

const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.querySelector(".sidebar");

mobileMenu.addEventListener("click", () => {
    sidebar.classList.toggle("show");
});


// ==============================
// DARK MODE
// ==============================

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkModeBtn.innerHTML = "☀️ Mode Terang";
    } else {
        darkModeBtn.innerHTML = "🌙 Mode Gelap";
    }

});


// ==============================
// DETAIL KARYA
// ==============================

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


function openWork(type) {

    const work = works[type];

    document.getElementById("modalCategory").textContent =
        work.category;

    document.getElementById("modalTitle").textContent =
        work.title;

    document.getElementById("modalText").textContent =
        work.text;

    document.getElementById("workModal")
        .classList.add("show");

}


function closeWork() {

    document.getElementById("workModal")
        .classList.remove("show");

}


// Klik area luar modal

document.getElementById("workModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeWork();
        }

    });


// ==============================
// FILTER KARYA
// ==============================

function filterWorks(category) {

    const cards =
        document.querySelectorAll(".searchable");

    cards.forEach(card => {

        if (card.dataset.category === category) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

    document.getElementById("karya")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==============================
// SEARCH
// ==============================

const searchInput =
    document.getElementById("searchInput");

searchInput.addEventListener("input", function() {

    const keyword =
        this.value.toLowerCase();

    const cards =
        document.querySelectorAll(".searchable");

    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(keyword)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// ==============================
// NAVIGASI AKTIF
// ==============================

const menuItems =
    document.querySelectorAll(".menu-item");

menuItems.forEach(item => {

    item.addEventListener("click", function() {

        menuItems.forEach(menu => {
            menu.classList.remove("active");
        });

        this.classList.add("active");

        // Tutup sidebar di HP
        sidebar.classList.remove("show");

    });

});
```
