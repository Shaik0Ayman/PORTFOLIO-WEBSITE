'use strict';



/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR
 * navbar will show after clicking menu button
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

navToggler.addEventListener("click", toggleNav);

const navClose = () => {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElements(navLinks, "click", navClose);



/**
 * HEADER and BACK TOP BTN
 * header and back top btn will be active after scrolled down to 100px of screen
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeEl = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeEl);



/**
 * Button hover ripple effect
 */

const buttons = document.querySelectorAll("[data-btn]");

const buttonHoverRipple = function (event) {
  this.style.setProperty("--top", `${event.offsetY}px`);
  this.style.setProperty("--left", `${event.offsetX}px`);
}

addEventOnElements(buttons, "mousemove", buttonHoverRipple);



/**
 * Scroll reveal
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    const isElementInsideWindow = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

    if (isElementInsideWindow) {
      revealElements[i].classList.add("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);

window.addEventListener("load", revealElementOnScroll);



/**
 * Custom cursor
 */

const cursor = document.querySelector("[data-cursor]");
const hoverElements = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];

const cursorMove = function (event) {
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;
}

window.addEventListener("mousemove", cursorMove);

addEventOnElements(hoverElements, "mouseover", function () {
  cursor.classList.add("hovered");
});

addEventOnElements(hoverElements, "mouseout", function () {
  cursor.classList.remove("hovered");
});

document.addEventListener('mousemove', function(e) {
  const heroBanner = document.querySelector('.hero-banner');
  const rect = heroBanner.getBoundingClientRect();
  const x = e.clientX - rect.left; // X position within the element
  const y = e.clientY - rect.top;  // Y position within the element

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const moveX = (x - centerX) / centerX * 10; // Adjust the multiplier for more/less movement
  const moveY = (y - centerY) / centerY * 10; // Adjust the multiplier for more/less movement

  heroBanner.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// ...existing code...

// Carousel logic for all carousels on the page
document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const carousel = wrapper.querySelector('.carousel');
  const cards = carousel.querySelectorAll('.gallery-card');
  const prevBtn = wrapper.querySelector('.carousel-btn.prev');
  const nextBtn = wrapper.querySelector('.carousel-btn.next');
  let currentIndex = 0;
  const visibleCards = 3;

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(carousel).gap) || 0;
    carousel.scrollTo({
      left: currentIndex * cardWidth,
      behavior: 'smooth'
    });
    updateButtons();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - visibleCards, 0);
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + visibleCards, cards.length - visibleCards);
    updateCarousel();
  });

  function updateButtons() {
    prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentIndex >= cards.length - visibleCards ? 'hidden' : 'visible';
  }
  updateButtons();
});

// ...existing code...
// ...existing code...

document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const carousel = wrapper.querySelector('.carousel');
  const cards = carousel.querySelectorAll('.gallery-card');
  const prevBtn = wrapper.querySelector('.carousel-btn.prev');
  const nextBtn = wrapper.querySelector('.carousel-btn.next');
  let currentIndex = 0;
  const visibleCards = 3;

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(carousel).gap) || 0;
    carousel.scrollTo({
      left: currentIndex * cardWidth,
      behavior: 'smooth'
    });
    updateButtons();
  }

  function updateButtons() {
    prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentIndex >= cards.length - visibleCards ? 'hidden' : 'visible';
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - visibleCards, 0);
    updateCarousel();
    pauseAutoScroll();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + visibleCards, cards.length - visibleCards);
    updateCarousel();
    pauseAutoScroll();
  });

  // --- Auto-scroll logic ---
  let autoScrollInterval;
  let autoScrollPaused = false;
function autoScroll() {
    if (autoScrollPaused) return;
    currentIndex = Math.min(currentIndex + visibleCards, cards.length - visibleCards);
    updateCarousel();
  }
  autoScrollInterval = setInterval(autoScroll, 8000);



  

  function pauseAutoScroll() {
    autoScrollPaused = true;
    clearInterval(autoScrollInterval);
    setTimeout(() => {
      autoScrollPaused = false;
      startAutoScroll();
    }, 10000); // pause for 8 seconds after interaction
  }

  // Pause on hover
  carousel.addEventListener('mouseenter', pauseAutoScroll);
  carousel.addEventListener('mouseleave', () => {
    autoScrollPaused = false;
    startAutoScroll();
  });

  updateCarousel();
  startAutoScroll();
});


// ...existing code...