/*!
 * Main JS  v1.0 
 * Copyright @ 2026 The Ashen Hansaka Authors
 * Licensed under MIT
 */

(function() {
  "use strict";




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