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

      prevBtn.classList.toggle('is-boundary', instance.isBeginning);
      nextBtn.classList.toggle('is-boundary', instance.isEnd);
    }
  });
});



// ===================slider calendar====================

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

const timeslotsEl = document.getElementById("timeslots");
const emptyStateEl = document.getElementById("empty-state");

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
      document.querySelectorAll(".timeslot-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    timeslotsEl.appendChild(btn);
  });
}

const calendarEl = document.getElementById("calendar-container");
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