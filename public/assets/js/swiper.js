/*!
 * Swiper JS  v1.0
 * Copyright @ 2026 The Ashen Hansaka Authors
 * Licensed under MIT
 */

// Slide Data
const SLIDES = [
  {
    name: "James & Emma Brookes",
    img: "https://picsum.photos/100/100?random=51",
    country: "United Kingdom",
    desc: "Ashen made our Ella expedition absolutely unforgettable! His deep knowledge of hidden waterfall tracks and local history combined with his brilliant photography skills gave us beautiful memories.",
    star: "5",
  },
  {
    name: "Ruwan Perera",
    img: "https://picsum.photos/100/100?random=52",
    country: "Sri Lanka",
    desc: "A truly multi-talented professional! He developed our adventure agency's booking web platform flawlessly, and then designed our premium mobile bar service for our opening event.",
    star: "4",
  },
  {
    name: "Charlotte Laurent",
    img: "https://picsum.photos/100/100?random=53",
    country: "France",
    desc: "Exceptional guiding experience around Galle and Matara! Ashen knows the best surfing spots, culture hubs, and brews the finest artisan coffee while camping. Highly recommended!",
    star: "5",
  }
];

// StellarNavigator Class
class StellarNavigator {
  constructor(slides, testimonialsEl, slideNavEl, controls) {
    this.slides = slides;
    this.testimonialsEl = testimonialsEl;
    this.slideNavEl = slideNavEl;
    this.controls = controls;
    this.slideCount = slides.length;
    this.activeIdx = 0;

    //
    const computedRadius = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--testimonials-radius",
      ),
    );
    this.radius = isNaN(computedRadius) ? 400 : computedRadius;

    this.angleStep = 360 / this.slideCount;
    this.animating = false;
    this.init();
  }

  init() {
    this.renderSlides();
    this.renderDots();
    this.attachEvents();
    this.update();
  }

  renderSlides() {
    this.testimonialsEl.innerHTML = "";
    this.slideEls = [];

    for (let i = 0; i < this.slideCount; i++) {
      const slide = document.createElement("div");
      slide.className = "testimonials-slide ss-row flex-row";

      const currentStars = Math.min(parseInt(this.slides[i].star || 0), 5);
      const blankStars = 5 - currentStars;

      slide.innerHTML = `
            <div class="ss-col-4 p-0">
              <div class="slide-image">
                  <img src="${this.slides[i].img}" alt="${this.slides[i].name}">
              </div>
            </div>
            <div class="ss-col-8">
              <div class="testimonial-content">
                  <h3 class="">${this.slides[i].name}</h3>
                  <h4 class="">${this.slides[i].country}</h4>
                  <span class="stars">
                    ${Array.from({ length: currentStars })
                      .map(() => `<i class="bi bi-star-fill"></i>`)
                      .join("")}
                    ${Array.from({ length: blankStars })
                      .map(() => `<i class="bi bi-star-fill star-blank"></i>`)
                      .join("")}
                  </span>
              </div>
            </div>
            <div class="ss-col-12 testimonial-desc">
                <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    <span>${this.slides[i].desc}</span>
                    <i class="bi bi-quote quote-icon-right"></i>
                </p>
            </div>
          `;

      this.testimonialsEl.appendChild(slide);
      this.slideEls.push(slide);
    }
  }

  getMaxAllowedDots() {
    const width = window.innerWidth;
    if (width <= 420) return 5;
    if (width <= 600) return 6;
    if (width <= 900) return 7;
    return 8;
  }

  renderDots() {
    this.slideNavEl.innerHTML = "";
    this.dotEls = [];

    for (let i = 0; i < this.slideCount; i++) {
      const dot = document.createElement("button");
      dot.className = "slide-nav-dot";
      dot.setAttribute(
        "aria-label",
        `Go to slide ${i + 1}: ${this.slides[i].name}`,
      );
      dot.setAttribute("tabindex", "0");
      dot.addEventListener("click", () => this.goTo(i));
      this.slideNavEl.appendChild(dot);
      this.dotEls.push(dot);
    }
  }

  attachEvents() {
    this.controls.prev.addEventListener("click", () => this.prev());
    this.controls.next.addEventListener("click", () => this.next());
    document.addEventListener("keydown", (e) => this.handleKey(e));
    this.testimonialsEl.addEventListener("wheel", (e) => this.handleWheel(e));

    // Touch Events
    this.testimonialsEl.addEventListener(
      "touchstart",
      (e) => this.handleTouchStart(e),
      { passive: true },
    );
    this.testimonialsEl.addEventListener(
      "touchmove",
      (e) => this.handleTouchMove(e),
      { passive: true },
    );
    this.testimonialsEl.addEventListener("touchend", (e) =>
      this.handleTouchEnd(e),
    );

    // Mouse Drag Events
    this.testimonialsEl.addEventListener("mousedown", (e) =>
      this.handleMouseDown(e),
    );

    window.addEventListener("resize", () => this.update());
  }

  update() {
    this.angleStep = 360 / this.slideCount;
    const computedRadius = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--testimonials-radius",
      ),
    );
    
    const width = window.innerWidth;

    if (width > 900) {
      this.radius = 500; 
    } else {
      this.radius = isNaN(computedRadius) ? 230 : computedRadius;
    }

    for (let i = 0; i < this.slideCount; i++) {
      this.slideEls[i].classList.toggle("active", i === this.activeIdx);
      this.slideEls[i].setAttribute("aria-hidden", i !== this.activeIdx);

      let diff = i - this.activeIdx;
      if (diff > this.slideCount / 2) {
        diff -= this.slideCount;
      } else if (diff < -this.slideCount / 2) {
        diff += this.slideCount;
      }

      const angle = (diff * this.angleStep * Math.PI) / 180;
      const x = Math.sin(angle) * this.radius;
      const z = Math.cos(angle) * this.radius;
      const zIndexCalculated = Math.round((z + this.radius) * 100);

      if (width <= 425) {
        if (i === this.activeIdx) {
          this.slideEls[i].style.opacity = "1";
          this.slideEls[i].style.visibility = "visible";
          this.slideEls[i].style.pointerEvents = "auto";
          this.slideEls[i].style.zIndex = "10000";
          this.slideEls[i].style.transform = "translateX(0px) scale(1)";
        } else {
          this.slideEls[i].style.opacity = "0";
          this.slideEls[i].style.visibility = "hidden";
          this.slideEls[i].style.pointerEvents = "none";
          this.slideEls[i].style.zIndex = "1";

          if (diff < 0) {
            this.slideEls[i].style.transform = "translateX(-320px) scale(0.7)";
          } else {
            this.slideEls[i].style.transform = "translateX(320px) scale(0.7)";
          }
        }
      } 
      else if (width <= 900) {
        if (Math.abs(diff) > 1) {
          this.slideEls[i].style.opacity = "0";
          this.slideEls[i].style.visibility = "hidden";
          this.slideEls[i].style.pointerEvents = "none";
        } else {
          const scaleValue = i === this.activeIdx ? "scale(1.15)" : "scale(0.85)";
          this.slideEls[i].style.opacity = i === this.activeIdx ? "1" : "0.5";
          this.slideEls[i].style.visibility = "visible";
          this.slideEls[i].style.pointerEvents = "auto";
          this.slideEls[i].style.zIndex = i === this.activeIdx ? 10000 : zIndexCalculated;
          
          this.slideEls[i].style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${diff * this.angleStep}deg) ${scaleValue}`;
        }
      } 
      else {
        const scaleValue = i === this.activeIdx ? "scale(1.15)" : "scale(0.9)";
        this.slideEls[i].style.visibility = "visible";
        this.slideEls[i].style.pointerEvents = "auto";
        
        this.slideEls[i].style.opacity = i === this.activeIdx ? "1" : "0.4"; 
        this.slideEls[i].style.zIndex = i === this.activeIdx ? 10000 : zIndexCalculated;
        
        this.slideEls[i].style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${diff * this.angleStep}deg) ${scaleValue}`;
      }
    }

    // --- Dynamic Dots ---
    const maxDots = this.getMaxAllowedDots();
    let startIdx = this.activeIdx - Math.floor(maxDots / 2);
    if (startIdx < 0) startIdx = 0;
    if (startIdx + maxDots > this.slideCount) startIdx = this.slideCount - maxDots;
    if (startIdx < 0) startIdx = 0;

    let endIdx = startIdx + maxDots;

    for (let i = 0; i < this.dotEls.length; i++) {
      this.dotEls[i].classList.toggle("active", i === this.activeIdx);
      if (i >= startIdx && i < endIdx) {
        this.dotEls[i].style.display = "block";
      } else {
        this.dotEls[i].style.display = "none";
      }
    }
  }

  goTo(idx) {
    if (this.animating || idx === this.activeIdx) return;
    this.activeIdx = idx;
    this.update();
  }

  next() {
    this.goTo((this.activeIdx + 1) % this.slideCount);
  }

  prev() {
    this.goTo((this.activeIdx - 1 + this.slideCount) % this.slideCount);
  }

  handleKey(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;

    if (this.testimonialsEl) {
      const rect = this.testimonialsEl.getBoundingClientRect();
      
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;
    }

    switch (e.key) {
      case "ArrowRight":
        this.next();
        break;
      case "ArrowLeft":
        this.prev();
        break;
      case "Home":
        this.goTo(0);
        break;
      case "End":
        this.goTo(this.slideCount - 1);
        break;
    }
  }

  handleWheel(e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (e.deltaX > 0) this.next();
      else this.prev();
    }
  }

  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.touchMoved = false;
  }

  handleTouchMove(e) {
    this.touchMoved = true;
    this.touchEndX = e.touches[0].clientX;
    this.touchEndY = e.touches[0].clientY;
  }

  handleTouchEnd(e) {
    if (!this.touchMoved) return;
    const dx = this.touchEndX - this.touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx > 0) this.prev();
      else this.next();
    }
  }

  handleMouseDown(e) {
    if (e.button !== 0) return;
    this.dragStartX = e.clientX;
    this.dragging = true;
    this.handleMouseMoveBound = this.handleMouseMove.bind(this);
    this.handleMouseUpBound = this.handleMouseUp.bind(this);
    document.addEventListener("mousemove", this.handleMouseMoveBound);
    document.addEventListener("mouseup", this.handleMouseUpBound);
  }

  handleMouseMove(e) {
    if (!this.dragging) return;
    const dx = e.clientX - this.dragStartX;
    if (Math.abs(dx) > 32) {
      if (dx > 0) this.prev();
      else this.next();
      this.dragging = false;
    }
  }

  handleMouseUp(e) {
    this.dragging = false;
    document.removeEventListener("mousemove", this.handleMouseMoveBound);
    document.removeEventListener("mouseup", this.handleMouseUpBound);
  }
}

// Initialization
window.addEventListener("DOMContentLoaded", () => {
  const testimonialsEl = document.getElementById("testimonials-container");
  const slideNavEl = document.getElementById("slide-nav");
  const controls = {
    prev: document.getElementById("prev-btn"),
    next: document.getElementById("next-btn"),
  };

  // This is where the slider comes into play
  const navigator = new StellarNavigator(
    SLIDES,
    testimonialsEl,
    slideNavEl,
    controls,
  );

  // Accessibility: Focus Management
  testimonialsEl.addEventListener("focus", () => {
    navigator.slideEls[navigator.activeIdx].focus();
  });

  // Reduced Motion options checking
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("reduced-motion");
  }
});

/**
// Gallery Slider ---------------
*/

const MAIN_SLIDE = [
  { name: "EAGLE", img: "https://u.cubeupload.com/Leo21/eagel1.jpg", des: "Eagles are majestic birds of prey..." },
  { name: "OWL", img: "https://u.cubeupload.com/Leo21/owl1.jpg", des: "Owls are nocturnal birds of prey..." },
  { name: "CROW", img: "https://u.cubeupload.com/Leo21/crow.jpg", des: "Crows are highly intelligent..." },
  { name: "BUTTERFLY", img: "https://u.cubeupload.com/Leo21/butterfly1.jpeg", des: "Butterflies, with their vibrant wings..." },
  { name: "OWL", img: "https://u.cubeupload.com/Leo21/owl2.jpg", des: "Owls have long been associated..." },
  { name: "EAGLE", img: "https://u.cubeupload.com/Leo21/eagel3.jpg", des: "Eagles represent freedom..." },
  { name: "KINGFISHER", img: "https://u.cubeupload.com/Leo21/kingfirser2.jpeg", des: "Kingfishers, with their dazzling..." },
  { name: "PARROT", img: "https://u.cubeupload.com/Leo21/parrot2.jpg", des: "Parrots are social creatures..." },
  { name: "HERON", img: "https://u.cubeupload.com/Leo21/heron.jpeg", des: "Herons are known for their striking..." },
  { name: "BUTTERFLY", img: "https://u.cubeupload.com/Leo21/butterfly2.jpg", des: "Butterflies, with their delicate..." },
  { name: "PARROT", img: "https://u.cubeupload.com/Leo21/parrot1.jpg", des: "Parrots are known for their long..." }
];

const mainSlider = document.querySelector('.main-slider');
const thumbnailWrapper = document.querySelector('.thumbnail-wrapper');
const nextBtn = document.querySelector('#slide-next');
const prevBtn = document.querySelector('#slide-prev');
const carousel = document.querySelector('.carousel');
const timeRunningBar = document.querySelector('.timeRunning');

function initSlider() {
  mainSlider.innerHTML = '';
  thumbnailWrapper.innerHTML = '';

  MAIN_SLIDE.forEach((slide, index) => {
    let mainItem = document.createElement('div');
    mainItem.classList.add('main-item', 'ss-skeleton');
    mainItem.style.backgroundImage = `url('${slide.img}')`;
    mainItem.setAttribute('data-index', index);
    mainItem.innerHTML = `
      <div class="content">
        <div class="item-header">${slide.name}</div>
        <div class="item-des">${slide.des}</div>
      </div>
    `;

    let imgLoader = new Image();
    imgLoader.src = slide.img;
    imgLoader.onload = () => {
      mainItem.style.backgroundImage = `url('${slide.img}')`;
      mainItem.classList.remove('ss-skeleton');
    };

    mainSlider.appendChild(mainItem);
  });

  for (let i = 2; i < MAIN_SLIDE.length; i++) { createThumb(MAIN_SLIDE[i]); }
  createThumb(MAIN_SLIDE[0]);
  createThumb(MAIN_SLIDE[1]);
}

function createThumb(slide) {
  let thumbItem = document.createElement('div');
  thumbItem.classList.add('thumb-item', 'ss-skeleton');
  thumbItem.style.backgroundImage = `url('${slide.img}')`;

  let imgLoader = new Image();
  imgLoader.src = slide.img;
  imgLoader.onload = () => {
    thumbItem.style.backgroundImage = `url('${slide.img}')`;
    thumbItem.classList.remove('ss-skeleton');
  };

  thumbnailWrapper.appendChild(thumbItem);
}

initSlider();

// --- Smart Dynamic Timer Settings ---
let timeRunning = 1000; 
let timeAutoNext = 7000;
let runTimeOut;

let timeLeft = timeAutoNext;
let timerStartTime;
let runNextAuto;
let isSliderVisible = false;

function startAutoNext() {
  if (!isSliderVisible) return;
  
  timerStartTime = Date.now();
  runNextAuto = setTimeout(() => { 
    nextBtn.click(); 
  }, timeLeft);

  if (timeRunningBar) {
    timeRunningBar.style.animationPlayState = 'running';
  }
}

function pauseAutoNext() {
  if (runNextAuto) {
    clearTimeout(runNextAuto);
    let elapsed = Date.now() - timerStartTime;
    timeLeft -= elapsed;
    if (timeLeft < 0) timeLeft = 0;
  }
    
  if (timeRunningBar) {
    timeRunningBar.style.animationPlayState = 'paused';
  }
}

function resetAutoNext() {
  clearTimeout(runNextAuto);
  timeLeft = timeAutoNext;

  if (timeRunningBar) {
    timeRunningBar.style.animation = 'none';
    timeRunningBar.offsetHeight; // Trigger Reflow
    timeRunningBar.style.animation = 'runningBar 7s linear 1 forwards';
    timeRunningBar.style.animationPlayState = 'running';
  }

  startAutoNext();
}

function showSlider(type) {
  let mainItems = document.querySelectorAll('.main-slider .main-item');
  let thumbItems = document.querySelectorAll('.thumbnail-wrapper .thumb-item');

  if (type === 'next') {
    mainSlider.appendChild(mainItems[0]);
    thumbnailWrapper.appendChild(thumbItems[0]);
    carousel.classList.add('next');
  } else {
    mainSlider.prepend(mainItems[mainItems.length - 1]);
    thumbnailWrapper.prepend(thumbItems[thumbItems.length - 1]);
    carousel.classList.add('prev');
  }

  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carousel.classList.remove('next');
    carousel.classList.remove('prev');
  }, timeRunning);

  resetAutoNext();
}

nextBtn.addEventListener('click', () => showSlider('next'));
prevBtn.addEventListener('click', () => showSlider('prev'));

// Arrow Keys Feature (With Viewport Check) ---
document.addEventListener('keydown', function (e) {
  if (e.altKey || e.ctrlKey || e.metaKey) return;

  if (carousel) {
    const rect = carousel.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;
  }

  if (e.key === "ArrowRight") {
    nextBtn.click();
  } else if (e.key === "ArrowLeft") {
    prevBtn.click();
  }
});

// Intersection Observer (Smart Pause & Resume) ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      isSliderVisible = true;
      startAutoNext();
    } else {
      pauseAutoNext();
      isSliderVisible = false;
    }
  });
}, { threshold: 0.1 });

if (carousel) {
  observer.observe(carousel);
}