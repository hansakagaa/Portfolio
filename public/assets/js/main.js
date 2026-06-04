/*!
 * Main JS  v1.0 
 * Copyright @ 2026 The Ashen Hansaka Authors
 * Licensed under MIT
 */

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#nav-menu a').forEach(nav_menu => {
    nav_menu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
  */
  document.querySelectorAll('.nav-menu .toggle-dropdown').forEach(nav_menu => {
    nav_menu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Header closer
  */
  const headerCloserBtn = document.querySelector('.header-closer');

  function headerCloser() {
    if(document.querySelector('.header-show')) {
      document.querySelector('#header').classList.remove('header-show');
      headerToggleBtn.classList.remove('bi-x');
      headerToggleBtn.classList.add('bi-list');
    }
  }
  headerCloserBtn.addEventListener('click', headerCloser);

  /**
   * Nav-menu Scrollspy
   */
  let navMenuLinks = document.querySelectorAll('.nav-menu a');

  function navMenuScrollspy() {
    navMenuLinks.forEach(navMenuLink => {
      if (!navMenuLink.hash) return;
      let section = document.querySelector(navMenuLink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.nav-menu a.active').forEach(link => link.classList.remove('active'));
        navMenuLink.classList.add('active');
      } else {
        navMenuLink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navMenuScrollspy);
  document.addEventListener('scroll', navMenuScrollspy);
  
  /**
   * Theme toggle button with Local Storage, Device Detection, and Image Switcher
   */
  document.addEventListener("DOMContentLoaded", () => {
      const toggleTrigger = document.getElementById("toggle-trigger");
      const bgContainer = document.getElementById("index-page");
      const favImg = document.getElementById("fav-img");

      const lightImgSrc = "assets/images/favicon.png"; 
      const darkImgSrc = "assets/images/favicon-dark.png";

      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      let currentTheme = "light";
      if (savedTheme) {
          currentTheme = savedTheme;
      } else if (prefersDark) {
          currentTheme = "dark";
      }

      if (currentTheme === "dark") {
          if (toggleTrigger) toggleTrigger.checked = true; 
          if (bgContainer) bgContainer.classList.add("dark-theme");
          if (favImg) favImg.src = darkImgSrc;
      } else {
          if (toggleTrigger) toggleTrigger.checked = false;
          if (bgContainer) bgContainer.classList.remove("dark-theme");
          if (favImg) favImg.src = lightImgSrc;
      }

      if (toggleTrigger) {
          toggleTrigger.addEventListener("change", () => {
              if (toggleTrigger.checked) {
                  if (bgContainer) bgContainer.classList.add("dark-theme");
                  if (favImg) favImg.src = darkImgSrc;
                  localStorage.setItem("theme", "dark"); 
              } else {
                  if (bgContainer) bgContainer.classList.remove("dark-theme");
                  if (favImg) favImg.src = lightImgSrc;
                  localStorage.setItem("theme", "light"); 
              }
          });
      }

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
              if (e.matches) {
                  if (toggleTrigger) toggleTrigger.checked = true;
                  if (bgContainer) bgContainer.classList.add("dark-theme");
                  if (favImg) favImg.src = darkImgSrc;
              } else {
                  if (toggleTrigger) toggleTrigger.checked = false;
                  if (bgContainer) bgContainer.classList.remove("dark-theme");
                  if (favImg) favImg.src = lightImgSrc;
              }
          }
      });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }
})();