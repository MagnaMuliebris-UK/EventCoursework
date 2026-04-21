import {events} from './events.js';
const EVENTS = [...events];
 
// Load saved favourites from localStorage
let favorites = new Set(JSON.parse(localStorage.getItem('campusFavs') || '[]'));
 
function saveFavs() {
  localStorage.setItem('campusFavs', JSON.stringify([...favorites]));
}
 
function renderHome() {
  const grid = document.getElementById('home-featured');
  grid.innerHTML = '';
 
  EVENTS.forEach((ev, i) => {
    const isFav = favorites.has(ev.id);
    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.animationDelay = (i * 0.12) + 's';
 
    card.innerHTML = `
      <div class="event-card-img" style="background:${ev.bg}">${ev.emoji}</div>
      <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav(event, ${ev.id})" aria-label="Save">
        ${isFav ? '❤️' : '🤍'}
      </button>
      <div class="event-card-body">
        <span class="hc-tag ${ev.tag}">${ev.category}</span>
        <h3>${ev.title}</h3>
        <div class="event-meta">
          <span>📅 ${ev.date}</span>
          <span>🕐 ${ev.time}</span>
          <span>📍 ${ev.location}</span>
        </div>
      </div>`;
 
    grid.appendChild(card);
 
    // Scroll reveal — card animates in when it enters the viewport
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(card);
    }, 0);
  });
}
 
function toggleFav(e, id) {
  e.stopPropagation();
  const btn = e.currentTarget;
 
  if (favorites.has(id)) {
    favorites.delete(id);
    btn.classList.remove('active');
    btn.innerHTML = '🤍';
  } else {
    favorites.add(id);
    btn.classList.add('active');
    btn.innerHTML = '❤️';
    // Pop animation on save
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => btn.style.transform = '', 200);
  }
 
  saveFavs();
}
 
// Initialise the page
renderHome();
