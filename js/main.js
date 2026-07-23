// ================= sticky header =================

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header_section");

  if (window.scrollY > 20) {
    header.classList.add("header_sticky");
  } else {
    header.classList.remove("header_sticky");
  }

});


// =============== hide offcanvas when click menu =================

document.addEventListener("DOMContentLoaded", () => {

  const menu = document.querySelector(".offcanvas-body");

  if (!menu) return;

  menu.addEventListener("click", function (e) {

    const arrow = e.target.closest(".arrow");

    if (!arrow) return;

    e.preventDefault();

    const dropdown = arrow.closest(".dropdown");

    if (!dropdown) return;

    const isOpen = dropdown.classList.contains("active");

    // Close all siblings
    menu.querySelectorAll(".dropdown.active").forEach(item => {
      item.classList.remove("active");
    });

    // Open clicked one
    if (!isOpen) {
      dropdown.classList.add("active");
    }

  });

});


// ================About swiper=====================

swiper = new Swiper(".about_slider", {
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 13,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});


document.addEventListener("DOMContentLoaded", function () {
  const performanceTabs = document.querySelectorAll(".performance_tab");
  const performancePanels = document.querySelectorAll(".performance_tab_content");

  performanceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      performanceTabs.forEach((item) => item.classList.remove("active"));
      performancePanels.forEach((panel) => panel.classList.remove("active"));

      tab.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) {
        panel.classList.add("active");
      }
    });
  });
});



// ================ how it works slider =====================
gsap.registerPlugin(Draggable);

const track = document.querySelector(".timeline-track");
const fill = document.querySelector(".timeline-fill");
const handle = document.querySelector(".timeline-handle");
const steps = document.querySelectorAll(".timeline-step");
if(steps){
  /*----------------------------------
  Config
  -----------------------------------*/
  const totalSteps = 7;
  const maxIndex = totalSteps - 1;
  /*----------------------------------
  Master Timeline
  -----------------------------------*/
  const master = gsap.timeline({
    paused: true,
    defaults: {
      duration: 1,
      ease: "power3.inOut"
    }
  });

  /*----------------------------------
  Scene 1
  -----------------------------------*/

  master
    .from(".item1", {
      autoAlpha: 1
    }, 0)

    .from(".bag", {
      scale: .6,
      autoAlpha: 0
    }, 0);


  /*----------------------------------
  Scene 2
  -----------------------------------*/

  master
    .to(".bag", {
      x: 200,
      rotation: -12
    }, 1)
    .to(".item2", {
      autoAlpha: 1
    }, 1)
    .to(".popup-1", {
      autoAlpha: 1,
      y: 0
    }, 1);


  /*----------------------------------
  Scene 3
  -----------------------------------*/

  master
    .to(".bag", {
      y: -60,
      scale: .9
    }, 2)

    .to(".plant", {
      autoAlpha: 1,
      scale: 1
    }, 2);


  /*----------------------------------
  Scene 4
  -----------------------------------*/

  master
    .to(".roots", {
      autoAlpha: 1,
      scale: 1
    }, 3);


  /*----------------------------------
  Scene 5
  -----------------------------------*/

  master
    .to(".popup-2", {
      autoAlpha: 1,
      y: 0
    }, 4);


  /*----------------------------------
  Scene 6
  -----------------------------------*/

  master
    .to(".bag", {
      x: 380,
      rotation: 8
    }, 5);


  /*----------------------------------
  Scene 7
  -----------------------------------*/

  master
    .to(".finish", {
      autoAlpha: 1,
      y: 0
    }, 6);


  /*----------------------------------
  Helpers
  -----------------------------------*/

  function maxX() {
    return track.clientWidth;
  }
  function updateSteps(progress) {
    const active = Math.round(progress * maxIndex);
    steps.forEach((step, index) => {
      step.classList.remove("active", "completed");
      if (index < active) {
        step.classList.add("completed");
      }
      if (index === active) {
        step.classList.add("active");
      }
    });
  }

  /*----------------------------------
  Update
  -----------------------------------*/

  function update() {
    const progress = this.x / maxX();
    fill.style.width = `${progress * 100}%`;
    updateSteps(progress);
    master.progress(progress);
    if (progress >= 0.99) {
      handle.classList.add("finished");
    } else {
      handle.classList.remove("finished");
    }
  }

  /*----------------------------------
  Draggable
  -----------------------------------*/

  Draggable.create(handle, {
    type: "x",
    inertia: true,
    bounds: {
      minX: 0,
      maxX: maxX
    },

    snap(value) {
      const gap = maxX() / maxIndex;
      return Math.round(value / gap) * gap;
    },
    onPress() {
      this.applyBounds({
        minX: 0,
        maxX: maxX()
      });
    },
    onDrag: update,
    onThrowUpdate: update
  });

  /*----------------------------------
  Resize
  -----------------------------------*/
  window.addEventListener("resize", () => {
    gsap.set(handle, { x: 0 });
    fill.style.width = "0";
    master.progress(0);
    updateSteps(0);
  });
}

{
  const boxes = document.querySelectorAll(".toggle_box");
  if (boxes.length) {
    boxes.forEach(box => {
      const button = box.querySelector(".toggle_icon");
      if (!button) return;
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        boxes.forEach(item => {
          if (item !== box) {
            item.classList.remove("active");
          }
        });
        box.classList.toggle("active");
        document.body.classList.toggle(
          "popup-open",
          document.querySelector(".toggle_box.active")
        );
      });
    });

    document.addEventListener("click", () => {
      boxes.forEach(box => {
        box.classList.remove("active");
      });
      document.body.classList.remove("popup-open");
    });
  }
}











// ================ steps slider =====================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Find all slider containers on the page
  const sliders = document.querySelectorAll('.steps_slider');

  sliders.forEach((root) => {
    // 2. Scope selections to the current root element
    const counterCurrent = root.querySelector('.steps_slider__counter-current');
    const counterTotal = root.querySelector('.steps_slider__counter-total');
    const dotsWrap = root.querySelector('.steps_slider__progress-dots');
    const fillEl = root.querySelector('.steps_slider__progress-fill');
    const swiperEl = root.querySelector('.steps_slider__swiper');
    const slides = swiperEl.querySelectorAll('.swiper-slide');
    const prevBtn = root.querySelector('.steps_slider__nav--prev');
    const nextBtn = root.querySelector('.steps_slider__nav--next');

    const total = slides.length;
    counterTotal.textContent = total;

    // 3. Build dots for this specific slider
    const dots = [];
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'steps_slider__dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to step ${i + 1}`);
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }

    // 6. UI Update function scoped to this instance's elements
    function updateUI(instance) {
      const index = instance.activeIndex;

      counterCurrent.textContent = index + 1;

      const pct = total > 1 ? (index / (total - 1)) * 100 : 100;
      fillEl.style.width = `${pct}%`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.classList.toggle('is-done', i < index);
      });

      prevBtn.classList.toggle('is-boundary', instance.isBeginning || index === 0);
      nextBtn.classList.toggle('is-boundary', instance.isEnd || index === total - 1);
    }

    // 4. Initialize Swiper for this specific container
    const swiper = new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 450,
      autoHeight: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      keyboard: { enabled: true },
      a11y: true,
      on: {
        init: (instance) => updateUI(instance),
        slideChange: (instance) => updateUI(instance),
      },
    });

    // 5. Add click listeners scoped to the buttons within this root
    prevBtn.addEventListener('click', () => swiper.slidePrev());
    nextBtn.addEventListener('click', () => swiper.slideNext());

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => swiper.slideTo(index));
    });

    // 7. Watch for when the hidden section becomes visible (e.g. d-none removed)
    const sectionContainer = root.closest('.step_slider_inner_section');
    if (sectionContainer) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const isVisible = !sectionContainer.classList.contains('d-none');
            if (isVisible) {
              // Force Swiper to recalculate dimensions and update UI when shown
              setTimeout(() => {
                swiper.update();
                updateUI(swiper);
              }, 10);
            }
          }
        });
      });

      observer.observe(sectionContainer, { attributes: true });
    }
  });
});



// ===================slider calendar====================

document.addEventListener("DOMContentLoaded", function () {
  function dateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availableSlots = {
    [dateKey(addDays(today, 9))]: ["09:00-09:30"],
    [dateKey(addDays(today, 16))]: ["14:00-14:30", "16:00-16:30"]
  };

  const defaultTimeslots = ["09:00-09:30", "10:00-10:30"];
  document.querySelectorAll(".step_slider_inner_section").forEach(section => {
    const timeslotsEl = section.querySelector("#timeslots") || section.querySelector(".timeslots-vlog div");
    const calendarEl = section.querySelector(".calendar-container");

    if (!calendarEl || !timeslotsEl) return;
    const emptyStateEl = document.createElement("div");
    emptyStateEl.className = "empty-state";
    emptyStateEl.textContent = "Select a date to see available times";

    function renderTimeslots(date) {
      const key = dateKey(date);
      const slots = availableSlots[key] || defaultTimeslots;

      timeslotsEl.innerHTML = "";

      if (!slots || slots.length === 0) {
        const msg = document.createElement("div");
        msg.className = "empty-state";
        msg.textContent = "No timeslots available for this date.";
        timeslotsEl.appendChild(msg);
        return;
      }

      slots.forEach(slot => {
        const btn = document.createElement("button");
        btn.className = "timeslot-btn";
        btn.type = "button";
        btn.textContent = slot;
        btn.addEventListener("click", () => {
          section.querySelectorAll(".timeslot-btn").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
        });
        timeslotsEl.appendChild(btn);
      });
    }
    const cal = new calendar(calendarEl, {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      onDayClick: function (date) {
        cal.clearSelection();
        cal.selectDate(date);
        renderTimeslots(date);
      },
      onMonthChanged: function () {
        timeslotsEl.innerHTML = "";
        timeslotsEl.appendChild(emptyStateEl);
      }
    });
  });
});


document.addEventListener('click', function (e) {
  const card = e.target.closest('.clickable .expect_card');
  if (card) {
    const href = card.getAttribute('href') || card.querySelector('a[href^="#"]')?.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();

    const targetEl = document.querySelector(href);
    const innerArea = card.closest('.clickable .expected_inner_area');

    if (targetEl && innerArea) {
      innerArea.classList.add('d-none');
      targetEl.classList.remove('d-none');
    }
    return;
  }
  const backBtn = e.target.closest('.clickable .back_btn');
  if (backBtn) {
    e.preventDefault();
    const targetEl = backBtn.closest('[id]');
    if (!targetEl) return;
    const wrapper = targetEl.parentElement;
    const innerArea = wrapper?.querySelector('.clickable .expected_inner_area');

    if (targetEl && innerArea) {
      targetEl.classList.add('d-none');
      innerArea.classList.remove('d-none');
    }
  }
});