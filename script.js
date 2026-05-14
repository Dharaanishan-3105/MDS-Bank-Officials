﻿// ═══════════════════════════════════════════════════════════
// MDS Bank — Core Script with GTM / GA4 DataLayer Integration
// ═══════════════════════════════════════════════════════════

function toggleSearchOverlay() {

  var overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  overlay.classList.toggle('active');
}

window.submitSearch = function (event) {
  if (event) event.preventDefault();
  var input = document.getElementById('overlay-search-input');
  var searchTerm = input ? input.value.trim() : '';
  if (!searchTerm) return;

  var resultStatus = 'without_result';
  var params = new URLSearchParams({ q: searchTerm });

  window.location.href = 'search.html?' + params.toString();
};

window.downloadPDF = function (fileName, linkText) {

  if (!fileName) return;
  if (!fileName.toLowerCase().endsWith('.pdf')) {
    fileName = fileName + '.pdf';
  }
  var filePath = fileName.indexOf('/') === -1 && fileName.indexOf('\\') === -1 ? 'assets/files/' + fileName : fileName;
  var downloadUrl = filePath;
  var fileExtension = fileName.split('.').pop().toLowerCase();
  var label = linkText || 'Download ' + fileName;

  window.location.href = downloadUrl;
};


function setFieldError(field, message) {
  if (!field) return;
  field.classList.add('touched');
  var error = field.parentNode.querySelector('.error-msg');
  if (error) {
    error.textContent = message;
    error.style.display = 'block';
  }
}

function clearFieldError(field) {
  if (!field) return;
  var error = field.parentNode.querySelector('.error-msg');
  if (error) {
    error.textContent = '';
    error.style.display = 'none';
  }
}

window.handleContactSubmit = function (event) {
  if (event) event.preventDefault();
  var form = document.getElementById('contact-form');
  if (!form) return;

  var name = document.getElementById('contact-name');
  var email = document.getElementById('contact-email');
  var topic = document.getElementById('contact-topic');
  var message = document.getElementById('contact-message');
  var phone = document.getElementById('contact-phone');

  var hasError = false;
  [name, email, topic, message].forEach(function (field) {
    clearFieldError(field);
  });

  if (!name.value.trim()) {
    setFieldError(name, 'Full name is required.');
    hasError = true;
  }
  if (!email.value.trim()) {
    setFieldError(email, 'Email address is required.');
    hasError = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    setFieldError(email, 'A valid email address is required.');
    hasError = true;
  }
  if (!topic.value.trim()) {
    setFieldError(topic, 'Please select an inquiry type.');
    hasError = true;
  }
  if (!message.value.trim()) {
    setFieldError(message, 'Please share your message.');
    hasError = true;
  }

  if (hasError) {
    return;
  }

  form.reset();


  var successNode = document.createElement('div');
  successNode.className = 'dash-card text-center animate-up';
  successNode.innerHTML = '<div style="padding:2.5rem;">' +
    '<div class="icon-box" style="margin:0 auto 1.25rem; background:linear-gradient(135deg,var(--accent),var(--accent-dark));color:white;">✓</div>' +
    '<h2>Message sent</h2>' +
    '<p style="color:var(--text-muted); margin-top:1rem;">Thank you for contacting MDS Bank. We will respond shortly.</p>' +
    '</div>';
  form.parentNode.replaceChild(successNode, form);
};

function getSearchQuery() {
  var params = new URLSearchParams(window.location.search);
  return params.get('q') || '';
}

window.performSearch = function () {
  var input = document.getElementById('search-page-input');
  var query = input ? input.value.trim() : '';
  var summary = document.getElementById('search-summary');
  var container = document.getElementById('search-results');
  var noResults = document.getElementById('no-results');

  if (!summary || !container || !noResults) return;

  if (!query) {
    summary.textContent = 'Enter a keyword to search our site for accounts, loans, cards, support, and dashboard help.';
    container.innerHTML = '';
    noResults.style.display = 'none';
    return;
  }

  var queryLower = query.toLowerCase();
  var terms = queryLower.split(/\s+/).filter(function (term) { return term.length > 1; });
  var index = window.searchIndex || [];

  var results = index.filter(function (item) {
    var text = (item.title + ' ' + item.desc + ' ' + item.keywords + ' ' + item.category).toLowerCase();
    return terms.every(function (term) {
      return text.indexOf(term) !== -1;
    });
  });

  if (results.length === 0) {
    summary.textContent = 'No results found for: "' + query + '"';
    container.innerHTML = '';
    noResults.style.display = 'block';
    var suggested = noResults.querySelector('.suggestion-term');
    if (suggested) suggested.textContent = query;
  } else {
    summary.textContent = results.length + ' result' + (results.length === 1 ? '' : 's') + ' for "' + query + '"';
    noResults.style.display = 'none';
    container.innerHTML = results.map(function (item) {
      return '<a href="' + item.url + '" class="search-result-item" style="display:block; padding:1.5rem; margin-bottom:1rem; background:var(--light-card); border-radius:16px; border:1px solid var(--border-light); text-decoration:none; color:var(--text-light); transition:all 0.3s var(--ease);">' +
        '<div style="display:flex; justify-content:space-between; gap:1rem; align-items:flex-start;">' +
        '<div style="flex:1;">' +
        '<span style="font-size:0.75rem; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:1px;">' + item.category + '</span>' +
        '<h3 style="margin:0.75rem 0 0.5rem; font-size:1.15rem;">' + item.title + '</h3>' +
        '<p style="margin:0; color:var(--text-muted); font-size:0.95rem; line-height:1.6;">' + item.desc + '</p>' +
        '</div>' +
        '<span style="font-size:1.5rem; color:var(--primary);">→</span>' +
        '</div>' +
        '</a>';
    }).join('');
  }

  var count = results.length;
  var status = count > 0 ? 'with_result' : 'without_result';

};


function initSearchPage() {
  var searchInput = document.getElementById('search-page-input');
  if (!searchInput) return;
  var query = getSearchQuery();
  if (query) {
    searchInput.value = query;
    window.performSearch();
  }
}

function initLocatorFiltering() {
  var filterButtons = document.querySelectorAll('.locator-filter button');
  var cards = document.querySelectorAll('.locator-card');
  var searchInput = document.getElementById('locator-search');
  if (!filterButtons.length || !cards.length) return;

  function updateLocator() {
    var activeButton = document.querySelector('.locator-filter button.active');
    var filter = activeButton ? activeButton.dataset.filter : 'all';
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    cards.forEach(function (card) {
      var service = (card.dataset.service || '').toLowerCase();
      var content = card.textContent.toLowerCase();
      var city = (card.dataset.city || '').toLowerCase();
      var matchesFilter = filter === 'all' || service.indexOf(filter) !== -1;
      var matchesQuery = !query || content.indexOf(query) !== -1 || city.indexOf(query) !== -1;
      card.style.display = matchesFilter && matchesQuery ? 'block' : 'none';
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterButtons.forEach(function (item) { item.classList.remove('active'); });
      button.classList.add('active');
      updateLocator();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', updateLocator);
  }
}

function highlightActiveNav() {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.nav-links a');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    if (href === page || (href === 'index.html' && page === '')) {
      link.classList.add('active');
    }
  });
}

function initMobileMenu() {
  var mobileToggle = document.querySelector('.mobile-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }
}


function initAccordions() {
  var items = document.querySelectorAll('.accordion-item');
  items.forEach(function (item) {
    var header = item.querySelector('.accordion-header');
    if (!header) return;
    header.addEventListener('click', function () {
      items.forEach(function (other) {
        if (other !== item) other.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });
}


function initScrollReveal() {
  var elements = document.querySelectorAll('.reveal');
  elements.forEach(function (el, index) {
    setTimeout(function () {
      el.classList.add('visible');
    }, 120 * index);
  });
}

function initDashboardFilters() {
  var selects = document.querySelectorAll('.dashboard-filter');
  selects.forEach(function (select) {
    select.addEventListener('change', function () {
      updateDashboardMetrics();
    });
  });
}


function updateDashboardMetrics() {
  var month = document.getElementById('filter-month');

  var monthValue = 1;
  if (month) {
    var map = { 'This Month': 1, 'Last Month': 0.97, 'Last Quarter': 1.05, 'Year to Date': 1.08 };
    monthValue = map[month.value] || 1;
  }

  var base = {
    customers: 520000,
    active: 396000,
    loans: 1280,
    cards: 870,
    transactions: 1840000,
    satisfaction: 94,
    alerts: 12,
    tickets: 25
  };

  var metrics = {
    customers: Math.round(base.customers * monthValue),
    active: Math.round(base.active * monthValue),
    loans: Math.round(base.loans * monthValue),
    cards: Math.round(base.cards * monthValue),
    transactions: Math.round(base.transactions * monthValue),
    satisfaction: Math.min(99, Math.round(base.satisfaction + (monthValue - 1) * 4)),
    alerts: Math.max(8, Math.round(base.alerts * monthValue)),
    tickets: Math.max(18, Math.round(base.tickets * monthValue))
  };

  var updates = [
    { id: 'metric-customers', value: metrics.customers.toLocaleString() + '+' },
    { id: 'metric-active', value: metrics.active.toLocaleString() + '+' },
    { id: 'metric-loans', value: metrics.loans.toLocaleString() },
    { id: 'metric-cards', value: metrics.cards.toLocaleString() },
    { id: 'metric-transactions', value: metrics.transactions.toLocaleString() },
    { id: 'metric-satisfaction', value: metrics.satisfaction + '%' },
    { id: 'metric-alerts', value: metrics.alerts.toString() },
    { id: 'metric-tickets', value: metrics.tickets.toString() }
  ];

  updates.forEach(function (item) {
    var el = document.getElementById(item.id);
    if (el) el.textContent = item.value;
  });
}

function initVideoEngagement() {
  var iframe = document.getElementById('promo-video');
  if (!iframe) return;

  window.onYouTubeIframeAPIReady = function () {
    var player = new YT.Player('promo-video', {
      events: {
        onStateChange: function (event) {
          if (event.data === YT.PlayerState.PLAYING) {
            if (!window.__videoStarted) {
              window.__videoStarted = true;
              var duration = event.target.getDuration();

            }
            if (window.__videoInterval) clearInterval(window.__videoInterval);
            window.__videoInterval = setInterval(function () {
              var currentTime = event.target.getCurrentTime();
              var duration = event.target.getDuration() || 1;
              var percent = Math.round((currentTime / duration) * 100);
              [25, 50, 75].forEach(function (threshold) {
                window.__videoProgressSent = window.__videoProgressSent || {};
                if (percent >= threshold && !window.__videoProgressSent[threshold]) {
                  window.__videoProgressSent[threshold] = true;

                }
              });
            }, 1000);
          }
          if (event.data === YT.PlayerState.ENDED) {
            if (window.__videoInterval) clearInterval(window.__videoInterval);
    var duration = event.target.getDuration();

          }
        }
      }
    });

  };

  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.body.appendChild(tag);
}

function initNavigationTracking() {
}


function initDownloadTracking() {
}


function initCTATracking() {
}


function initFormFocusTracking() {
}


function init() {
  highlightActiveNav();
  initMobileMenu();
  initAccordions();
  initScrollReveal();
  initDashboardFilters();
  initSearchPage();
  initLocatorFiltering();
  initVideoEngagement();
  initNavigationTracking();
  initDownloadTracking();
  initCTATracking();
  initFormFocusTracking();
  updateDashboardMetrics();
}


document.addEventListener('DOMContentLoaded', init);
