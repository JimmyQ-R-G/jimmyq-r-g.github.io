// spa.js - JimmyQrg SPA main logic

// --- Tab renderers ---
function renderHome() {
  return `
    <section class="home-section">
      <h1 class="main-title">JIMMYQRG</h1>
      <div class="browser-box">
        <form id="browser-form">
          <input type="text" id="browser-input" placeholder="Search DuckDuckGo or enter URL..." autocomplete="off" />
          <button type="submit">Go</button>
        </form>
      </div>
      <div class="quick-links">
        <h2>Quick Apps</h2>
        <div class="quick-apps-list" id="quick-apps-list"></div>
      </div>
    </section>
  `;
}

function renderGames() {
  return `
    <section class="games-section">
      <h2>Games</h2>
      <div class="games-tabs">
        <button class="games-tab-btn" data-games-tab="all">All Games</button>
        <button class="games-tab-btn" data-games-tab="collections">Collections</button>
        <button class="games-tab-btn" data-games-tab="pending">Pending</button>
      </div>
      <div id="games-list"></div>
    </section>
  `;
}

function renderApps() {
  return `
    <section class="apps-section">
      <h2>Apps</h2>
      <div id="apps-list"></div>
    </section>
  `;
}

function renderUnblocks() {
  return `
    <section class="unblocks-section">
      <h2>Unblocks</h2>
      <div id="unblocks-list"></div>
    </section>
  `;
}

function renderContacts() {
  return `
    <section class="contacts-section">
      <h2>Contacts</h2>
      <div id="contacts-list"></div>
    </section>
  `;
}

// --- SPA Routing ---
const routes = {
  home: renderHome,
  games: renderGames,
  apps: renderApps,
  unblocks: renderUnblocks,
  contacts: renderContacts,
};

function setTab(tab) {
  const main = document.getElementById('spa-content');
  main.innerHTML = routes[tab] ? routes[tab]() : renderHome();
  window.location.hash = tab;
  if (tab === 'home') setupHome();
  if (tab === 'games') setupGames();
  if (tab === 'apps') setupApps();
  if (tab === 'unblocks') setupUnblocks();
  if (tab === 'contacts') setupContacts();
}

function setupNav() {
  document.getElementById('main-nav').addEventListener('click', e => {
    if (e.target.classList.contains('nav-btn')) {
      setTab(e.target.dataset.tab);
    }
  });
}

// --- Home browser logic ---
function setupHome() {
  const form = document.getElementById('browser-form');
  form.onsubmit = function(e) {
    e.preventDefault();
    const val = document.getElementById('browser-input').value.trim();
    let url = val;
    if (!val) return;
    if (!/^https?:\/\//.test(val) && !val.includes('.') && !val.startsWith('localhost')) {
      url = `https://duckduckgo.com/?q=${encodeURIComponent(val)}`;
    } else if (!/^https?:\/\//.test(val)) {
      url = 'https://' + val;
    }
    window.open(`https://rammerhead.fly.dev/unblocker.html?url=${encodeURIComponent(url)}`,'_blank');
  };
  renderQuickApps();
}

function renderQuickApps() {
  const apps = [
    { name: 'TikTok', icon: 'fab fa-tiktok', url: 'https://rammerhead.fly.dev/?raw=true&url=https://tiktok.com' },
    { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://rammerhead.fly.dev/?raw=true&url=https://youtube.com' },
    { name: 'gn-math', icon: 'fas fa-calculator', url: '/unblocks/gn-math.html' },
    { name: 'Deepseek', icon: 'fas fa-robot', url: 'https://rammerhead.fly.dev/?raw=true&url=https://chat.deepseek.com' },
    { name: 'Github', icon: 'fab fa-github', url: 'https://rammerhead.fly.dev/?raw=true&url=https://github.com' },
    { name: 'Twitch', icon: 'fab fa-twitch', url: 'https://rammerhead.fly.dev/?raw=true&url=https://twitch.tv' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://rammerhead.fly.dev/?raw=true&url=https://instagram.com' },
    { name: 'JimmyQrg Tools', icon: 'fas fa-wrench', url: '/tools/' },
  ];
  const list = document.getElementById('quick-apps-list');
  list.innerHTML = apps.map(app => `
    <a href="${app.url}" target="_blank" class="quick-app">
      <i class="${app.icon}"></i> ${app.name}
    </a>
  `).join('');
}

// --- Games logic ---
function setupGames() {
  // TODO: Fetch and render games from /game-images/games/ and figma-raw/games.json
}

// --- Apps logic ---
function setupApps() {
  // TODO: Fetch and render apps from /game-images/apps/ and figma-raw/apps.json
}

// --- Unblocks logic ---
function setupUnblocks() {
  // TODO: Fetch and render unblocks from /game-images/unblocks/ and figma-raw/unblocks.json
}

// --- Contacts logic ---
function setupContacts() {
  // TODO: Render contacts from figma-raw/contacts.json
}

// --- Initial load ---
window.addEventListener('DOMContentLoaded', () => {
  setupNav();
  const tab = window.location.hash.replace('#','') || 'home';
  setTab(tab);
});
