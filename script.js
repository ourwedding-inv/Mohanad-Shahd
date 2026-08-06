/* ==========================================================================
   Mohanad & Shahd Wedding Invitation - Vanilla JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Airplane Takeoff Button (Landing Page)
  initAirplaneBtn();

  // 2. Initialize Countdown Timer
  initCountdown();

  // 3. Initialize Background Music Toggle
  initMusicPlayer();

  // 4. Initialize Scroll Intersection Observer
  initScrollAnimations();

  // 5. Initialize RSVP Form
  initRSVPForm();

  // 6. Initialize Guestbook Wishes
  initWishes();
});

/* ================= 1. AIRPLANE TAKEOFF ANIMATION ================= */
function initAirplaneBtn() {
  const openBtn = document.getElementById('openBtn');
  if (!openBtn) return;

  openBtn.addEventListener('click', () => {
    if (openBtn.classList.contains('launched')) return;

    const rect = openBtn.getBoundingClientRect();
    const planeBanner = document.getElementById('planeBanner');

    const clone = planeBanner.cloneNode(true);
    clone.removeAttribute('style');
    clone.classList.add('plane-fly');

    // Starting position: Airplane nose starts at button center
    clone.style.left = (rect.left + rect.width / 2) + 'px';
    clone.style.top = (rect.top - 100) + 'px';

    document.body.appendChild(clone);
    openBtn.classList.add('launched');

    requestAnimationFrame(() => clone.classList.add('flying'));

    // Move to next page after 6 seconds
    setTimeout(() => {
      window.location.href = openBtn.getAttribute('data-target') || 'main.html';
    }, 8000);
  });
}
function playTakeoffSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.8);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.9);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.9);
  } catch (e) {
    // Ignore audio errors
  }
}

/* ================= 2. COUNTDOWN TIMER ================= */
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl) return;

  const weddingDate = new Date('September 18, 2026 19:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minutesEl.innerText = '00';
      secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ================= 3. MUSIC PLAYER ================= */
let bgAudio = null;
let isPlaying = false;

function initMusicPlayer() {
  const musicBtn = document.getElementById('musicBtn');
  if (!musicBtn) return;

  bgAudio = new Audio('music.mp3');
  bgAudio.loop = true;
  bgAudio.volume = 0.35;

  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgAudio.pause();
      isPlaying = false;
      musicBtn.classList.remove('playing');
      musicBtn.querySelector('.music-status').innerText = musicBtn.getAttribute('data-off-text') || 'Play Music';
    } else {
      bgAudio.play().then(() => {
        isPlaying = true;
        musicBtn.classList.add('playing');
        musicBtn.querySelector('.music-status').innerText = musicBtn.getAttribute('data-on-text') || 'Music On';
      }).catch(() => {
        // Fallback
      });
    }
  });
}

/* ================= 4. SCROLL INTERSECTION OBSERVER ================= */
function initScrollAnimations() {
  const sections = document.querySelectorAll('.hidden');
  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.15 });

  sections.forEach((sec) => observer.observe(sec));
}

/* ================= 5. RSVP FORM ================= */
// function initRSVPForm() {
//   const rsvpForm = document.getElementById('rsvpForm');
//   const rsvpSuccess = document.getElementById('rsvpSuccess');

//   if (!rsvpForm) return;

//   rsvpForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const nameInput = document.getElementById('guestName');
//     const msgInput = document.getElementById('guestMessage');

//     if (!nameInput || !nameInput.value.trim()) return;

//     if (msgInput && msgInput.value.trim()) {
//       addWishToBoard(nameInput.value.trim(), msgInput.value.trim());
//     }

//     rsvpForm.style.display = 'none';
//     if (rsvpSuccess) {
//       rsvpSuccess.style.display = 'block';
//     }
//   });
// }

/* ================= 6. GUESTBOOK WISHES ================= */
// function initWishes() {
//   const wishForm = document.getElementById('wishForm');
//   if (!wishForm) return;

//   wishForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const authorEl = document.getElementById('wishAuthor');
//     const textEl = document.getElementById('wishText');

//     if (authorEl && textEl && authorEl.value.trim() && textEl.value.trim()) {
//       addWishToBoard(authorEl.value.trim(), textEl.value.trim());
//       textEl.value = '';
//     }
//   });
// }

// function addWishToBoard(author, text) {
//   const wishesList = document.getElementById('wishesList');
//   if (!wishesList) return;

//   const card = document.createElement('div');
//   card.className = 'card-box';
//   card.style.background = '#F8F4EE';
//   card.style.padding = '20px';
//   card.style.marginBottom = '16px';

//   card.innerHTML = `
//     <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
//       <strong style="color:#7A5C45; font-size:16px;">${escapeHtml(author)}</strong>
//       <span style="font-size:11px; color:#A67C52;">Just now</span>
//     </div>
//     <p style="color:#8B6B52; font-size:14px; line-height:1.6;">"${escapeHtml(text)}"</p>
//   `;

//   wishesList.prepend(card);
// }

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ================= LANGUAGE SWITCH ================= */
function changeLanguage(targetHtml) {
  window.location.href = targetHtml;
}
