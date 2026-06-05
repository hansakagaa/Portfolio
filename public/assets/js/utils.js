/*!
 * Utils JS  v1.0
 * Copyright @ 2026 The Ashen Hansaka Authors
 * Licensed under MIT
 */


/**
 * =========================================================================
 * GLOBAL DISMISSAL HANDLER (Event Delegation)
 * =========================================================================
 * 
 * REQUIREMENTS:
 * 1. The main parent container MUST have the attribute: [data-dismiss]
 *    Example: <div class="alert" data-dismiss="alert"> ... </div>
 * 
 * 2. The close button inside the alert MUST have the attribute: [aria-label="close"]
 *    Example: <button aria-label="close"> <i class="bi bi-x"></i> </button>
 * 
 * HOW IT WORKS:
 * This script listens for click events globally across the document. When a valid
 * close button is clicked, it identifies the closest parent alert component holding
 * the dismissal attribute and completely removes it from the DOM.
 */

(function() {
  "use strict";

    document.addEventListener('click', function (e) {
        
        const closeButton = e.target.closest('[aria-label="close"], [aria-label="Close"]');
        
        if (closeButton) {
            const alertBox = closeButton.closest('[data-dismiss]');

            if (alertBox) {
                alertBox.remove(); 
            }
        }
    });
})();