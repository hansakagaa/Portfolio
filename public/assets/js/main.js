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
   * Hero section
   */
  document.addEventListener("DOMContentLoaded", () => {
    const words = ["Web Developer", "Local Guide", "Barista", "Bartender", "Photographer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 150;
    const erasingDelay = 70;
    const newWordDelay = 2000;
    const typedTextSpan = document.querySelector(".typing-text");

    function type() {
        if (!typedTextSpan) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, newWordDelay);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? erasingDelay : typingDelay);
        }
    }

    setTimeout(type, 1000);
  });

  /**
   * Hero social buttons toggle
  */
  const socialContainer = document.getElementById('social-btn');
  const toggleBtn = document.querySelector('.social-toggle');

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    
    const isActive = socialContainer.classList.toggle('active');
    
    if (isActive) {
      toggleBtn.classList.replace('bi-share-fill', 'bi-x');
    } else {
      toggleBtn.classList.replace('bi-x', 'bi-share-fill');
    }
  };

  const closeMenu = () => {
    if (socialContainer.classList.contains('active')) {
      socialContainer.classList.remove('active');
      toggleBtn.classList.replace('bi-x', 'bi-share-fill');
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);

  document.addEventListener('click', (e) => {
    if (!socialContainer.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener('scroll', closeMenu, { passive: true }); 

  /**
   * Initiate Pure Counter
   */
  document.addEventListener("DOMContentLoaded", function() {
    if (typeof Counter === 'function') {
      new Counter({
        selector: '.counter'
      });
    }
  });

  
  /**
   * Gallery Lightbox Popup
   */
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.photo-slide');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false; 

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5; 
        
        if (Math.abs(walk) > 5) {
            isDragging = true;
        }
        container.scrollLeft = scrollLeft - walk;
    });

    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            if (isDragging) return; 

            const img = slide.querySelector('img');
            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                
                if (typeof scrollTop !== 'undefined' && scrollTop) {
                    scrollTop.style.boxShadow = "var(--box-shadow-inset)";
                }
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {lightbox.classList.remove('active');}
        });
    }
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