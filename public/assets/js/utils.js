/*!
 * Utils JS  v1.0
 * Copyright @ 2026 The Ashen Hansaka Authors
 * Licensed under MIT
 */


(function() {
  "use strict";
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
    document.addEventListener('click', function (e) {
        
        const closeButton = e.target.closest('[aria-label="close"], [aria-label="Close"]');
        
        if (closeButton) {
            const alertBox = closeButton.closest('[data-dismiss]');

            if (alertBox) {
                alertBox.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
                
                requestAnimationFrame(() => {
                    alertBox.style.opacity = "0";
                    alertBox.style.transform = "translateX(-25px) scale(0.95)";
                });

                alertBox.addEventListener('transitionend', function () {
                    alertBox.remove();
                }, { once: true });

                setTimeout(() => {
                    if (alertBox.parentNode) {
                        alertBox.remove();
                    }
                }, 350);
            }
        }
    });

    /**
     * =========================================================================
     * SMART TOOLTIP POSITIONER
     * =========================================================================
     * 
     * DESCRIPTION:
     * Calculates bounds for Top, Left, and Right edges of the viewport.
     * - Flips downward if space above is < 90px.
     * - Shifts right if clipping on the left edge.
     * - Shifts left if clipping on the right edge.
     */

    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            
            const safetyMarginX = 140; 

            if (rect.top < 90) {
                this.classList.add('tooltip-down');
            } else {
                this.classList.remove('tooltip-down');
            }

            if (rect.left < safetyMarginX) {
                this.classList.add('tooltip-left');
                this.classList.remove('tooltip-right');
            } else if (viewportWidth - rect.right < safetyMarginX) {
                this.classList.add('tooltip-right');
                this.classList.remove('tooltip-left');
            } else {
                this.classList.remove('tooltip-left', 'tooltip-right');
            }
        });
    });

    /**
     * =========================================================================
     * GLOBAL MAGNETIC BUTTON SYSTEM (JS CORE)
     * =========================================================================
     * * DESCRIPTION:
     * Calculates the exact dynamic distance between the mouse pointer and the 
     * center point of the button, applying a fractional translation to create the pull effect.
     */

    document.addEventListener("DOMContentLoaded", () => {
        
        document.querySelectorAll('[data-magnetic]').forEach(btn => {
            
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);

                const pullStrength = 0.35; 

                btn.style.transform = `translate(${x * pullStrength}px, ${y * pullStrength}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    });

})();