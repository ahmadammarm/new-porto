'use strict';

$(document).ready(function(){
  // Tambahkan event click pada setiap judul kategori
  $('.skill-category-title').click(function(){
    // Sembunyikan semua daftar skill terlebih dahulu
    $('.skills-list').hide();

    // Temukan skill yang sesuai dengan judul yang diklik
    var index = $(this).index();
    var skillList = $('.skills-list').eq(index);

    // Periksa apakah skill list sudah ditampilkan atau belum
    if(skillList.is(':visible')){
      // Jika sudah ditampilkan, sembunyikan
      skillList.hide();
    } else {
      // Jika belum ditampilkan, tampilkan dan sembunyikan yang lain
      $('.skills-list').hide();
      skillList.show();
    }
  });

  // Tampilkan skill list untuk kategori "Language" secara default
  $('.language-skills').show();

  // Ubah warna judul kategori "Language" menjadi hsl(45, 100%, 72%)
  $('.skill-category-title.language h4').css('color', 'hsl(45, 100%, 72%)');

  // Tambahkan event click pada setiap judul skill
  $('.skills-item .title-wrapper').click(function(){
    // Ambil teks dari judul skill yang diklik
    var skillTitle = $(this).find('h5').text();
    
    // Lakukan sesuatu dengan judul skill yang diambil
    // Contohnya, mungkin tampilkan judul skill di tempat lain atau lakukan aksi khusus
    console.log(skillTitle); // Tampilkan judul skill di console
  });
});

function changeColor(clickedElement) {
  var elements = document.querySelectorAll('.skill-category-title h4');

  elements.forEach(function(element) {
    if (element === clickedElement) {
      element.style.color = "hsl(45, 100%, 72%)";
    } else {
      element.style.color = "";
    }
  });
}




// element toggle function
// const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// const toggle = document.querySelector('#toggle');
// const html = document.querySelector('html');

// toggle.addEventListener('click', function() {
//   toggle.checked ? html.classList.add('light') : html.classList.remove('light');
// })

// sidebar variables
const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector(".info_more-btn");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");


function elementToggleFunc(element) {
  // Lakukan operasi toggle pada elemen yang diberikan (misalnya, tampilkan atau sembunyikan)
  element.classList.toggle('active');
}

// Menggunakan event listener pada button dengan id "select"
select.addEventListener('click', function() {
  // Panggil fungsi elementToggleFunc dan kirimkan elemen this (button) sebagai argumen
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



const scriptURL = "https://script.google.com/macros/s/AKfycby-TIGP5hd3qZDQkAWczflI3qVDorrRt3egys1dGRolltGTEX6xI5XdumXT7CQdFqiAvA/exec";
      const form = document.forms["submit-to-google-sheet"];

      function handleSubmit(event) {
        event.preventDefault();
        const form = document.forms["submit-to-google-sheet"];
        const nameInput = form.elements["name"];
        const emailInput = form.elements["email"];
        const messageInput = form.elements["pesan"];

        if (!nameInput.value || !emailInput.value || !messageInput.value) {
          // Menampilkan SweetAlert jika terjadi kesalahan input
          Swal.fire({
            icon: "error",
            title: "Kesalahan",
            text: "Harap lengkapi semua kolom sebelum mengirim pesan",
          });
          return;
        }

        fetch(scriptURL, { method: "POST", body: new FormData(form) })
          .then((response) => {
            console.log("Success!", response);
            // Menampilkan SweetAlert setelah pengiriman berhasil
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Pesan telah terkirim",
              showConfirmButton: false,
              timer: 2000, // Menutup otomatis pesan setelah 2 detik
            });
            // Mereset inputan
            form.reset();
          })
          .catch((error) => {
            console.error("Error!", error.message);
            // Menampilkan SweetAlert jika terjadi kesalahan
            Swal.fire({
              icon: "error",
              title: "Kesalahan",
              text: "Terjadi kesalahan saat mengirim pesan",
            });
          });
      }



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}