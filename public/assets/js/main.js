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
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }
})();