//slider jumbotron
const buttonsCarousel = document.querySelectorAll("[data-carousel-button]");

buttonsCarousel.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

//scrolltoview navbar onclick
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(this.getAttribute("href"));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  });
});

document.querySelectorAll('button[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(this.getAttribute("href"));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  });
});

//scrolltotop logo onclick
const logo = document.querySelector(".navbar-brand");
logo.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToTop();
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

//burger menu
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");
const brand = document.querySelector(".navbar-brand");

brand.addEventListener("click", () => {
  navbarCollapse.classList.remove("show");
});

navbarToggler.addEventListener("click", () => {
  if (navbarCollapse.classList.contains("show")) {
    navbarCollapse.classList.remove("show");
  } else {
    navbarCollapse.classList.add("show");
  }
});

const navLinks = document.querySelectorAll(".nav-link");
const dropLinks = document.querySelectorAll(".linkdropdown");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbarCollapse.classList.remove("show");
  });
});
dropLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbarCollapse.classList.remove("show");
  });
});

//wyszukiwarka onclick
const searchIconLink = document.getElementById("search-icon-link");
const searchBarContainer = document.querySelector(".search-bar-container");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  searchBarContainer.classList.toggle("show");
});

searchIconLink.addEventListener("click", () => {
  searchBarContainer.classList.toggle("show");
});

//masonry galeria
var macyInstance = Macy({
  container: ".gallery",
  trueOrder: false,
  waitForImages: false,
  margin: 24,
  columns: 3,
  breakAt: {
    1000: 2,
    520: 1,
  },
});

const gallery = document.querySelector(".gallery");
const loadMoreButton = document.getElementById("load-more");
const thumbnails = document.querySelectorAll(".item");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeButton = document.querySelector(".close");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const body = document.querySelector("body");
let currentIndex = 0;

const additionalImages = [
  "img/gal10.jpg",
  "img/gal11.jpg",
  "img/gal12.jpg",
  "img/gal13.jpg",
  "img/gal14.jpg",
  "img/gal15.jpg",
  "img/gal16.jpg",
  "img/gal17.jpg",
  "img/gal18.jpg",
  "img/gal19.jpg",
  "img/gal20.jpg",
  "img/gal21.jpg",
  "img/gal22.jpg",
  "img/gal23.jpg",
  "img/gal24.jpg",
];

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const imageUrl = thumbnail.src;
    modalImage.src = imageUrl;
    modal.style.display = "block";
    body.style.overflow = "hidden";
  });
});
function setupThumbnailClickListeners() {
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      const imageUrl = thumbnail.src;
      modalImage.src = imageUrl;
      modal.style.display = "block";
      body.style.overflow = "hidden";
    });
  });
}

setupThumbnailClickListeners();

function addImageAndUpdateListeners(imageUrl) {
  var img = document.createElement("img");
  img.src = imageUrl;
  img.classList.add("thumbnail");

  document.querySelector(".gallery").appendChild(img);

  macyInstance.reInit();

  setupThumbnailClickListeners();
}

let currentAdditionalImageIndex = 0;

loadMoreButton.addEventListener("click", function () {
  if (currentAdditionalImageIndex < additionalImages.length) {
    const imageUrlToAdd = additionalImages[currentAdditionalImageIndex];

    addImageAndReinit(imageUrlToAdd);

    currentAdditionalImageIndex++;

    if (currentAdditionalImageIndex === additionalImages.length) {
      loadMoreButton.disabled = true;
    }
  }
});

loadMoreButton.addEventListener('click', function(){
  gallery.classList.add('hide-gradient');
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
  body.style.overflow = "auto";
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
  const imageUrl = thumbnails[currentIndex].src;
  modalImage.src = imageUrl;
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % thumbnails.length;
  const imageUrl = thumbnails[currentIndex].src;
  modalImage.src = imageUrl;
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    body.style.overflow = "auto";
  }
});

function addImageAndReinit(imageUrl) {
  var img = document.createElement("img");
  img.src = imageUrl;
  img.classList.add("thumbnail");
  img.classList.add("item");
  gallery.appendChild(img);

  macyInstance.reInit();
  setupThumbnailClickListeners();
}
