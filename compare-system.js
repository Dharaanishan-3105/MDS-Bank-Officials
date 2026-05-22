// ═════════════════════════════════════════════════════════════════════════════
// MDS Bank Compare System - PRODUCTION (Single File)
// ═════════════════════════════════════════════════════════════════════════════
// Fixes: compare_count bug, duplicate events, stale DOM reads
// ═════════════════════════════════════════════════════════════════════════════

window.CompareSystem = (function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // STATE (Single source of truth)
  // ─────────────────────────────────────────────────────────────────────────

  var state = {
    selectedProducts: [],
    maxLimit: 3,
    storageKey: 'compare_products',
    sessionId: null
  };

  // ─────────────────────────────────────────────────────────────────────────
  // INITIALIZATION
  // ─────────────────────────────────────────────────────────────────────────

  function init() {
    state.sessionId = generateSessionId();
    restoreFromStorage();
    setupEventListeners();
    render();
  }

  function generateSessionId() {
    var stored = localStorage.getItem(state.storageKey + '_session');
    if (stored) return stored;
    var id = 'cmp_' + Math.random().toString(16).slice(2) + '_' + Date.now();
    localStorage.setItem(state.storageKey + '_session', id);
    return id;
  }

  function restoreFromStorage() {
    try {
      var stored = localStorage.getItem(state.storageKey);
      if (stored) {
        state.selectedProducts = JSON.parse(stored);
      }
    } catch (e) {}
  }

  function saveToStorage() {
    try {
      localStorage.setItem(state.storageKey, JSON.stringify(state.selectedProducts));
    } catch (e) {}
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────────────────────────────────────────────────

  function addProduct(name, category) {
    if (state.selectedProducts.some(p => p.name === name)) {
      toast('Already in comparison', 'error');
      track('compare_error', { error_type: 'duplicate', product_name: name });
      return false;
    }

    if (state.selectedProducts.length >= state.maxLimit) {
      toast('Max ' + state.maxLimit + ' products allowed', 'error');
      track('compare_limit_reached', { product_name: name });
      return false;
    }

    state.selectedProducts.push({ name, category });
    saveToStorage();
    render();
    toast('Added to comparison', 'success');
    track('compare_add', { product_name: name, product_category: category });
    return true;
  }

  function removeProduct(name) {
    var idx = state.selectedProducts.findIndex(p => p.name === name);
    if (idx === -1) return false;

    var removed = state.selectedProducts.splice(idx, 1)[0];
    saveToStorage();
    render();
    toast('Removed from comparison', 'info');
    track('compare_remove', { product_name: removed.name, product_category: removed.category });
    return true;
  }

  function toggleProduct(name, category) {
    if (state.selectedProducts.some(p => p.name === name)) {
      return removeProduct(name);
    }
    return addProduct(name, category);
  }

  function clearAll() {
    state.selectedProducts = [];
    saveToStorage();
    render();
    toast('Comparison cleared', 'info');
    track('compare_clear', {});
  }

  function getCount() {
    return state.selectedProducts.length;
  }

  function getSelected() {
    return state.selectedProducts.map(p => p.name);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDERING (From state, NOT DOM)
  // ─────────────────────────────────────────────────────────────────────────

  function render() {
    updateButtons();
    updateCards();
    updateTable();
    updateMessage();
  }

  function updateButtons() {
    document.querySelectorAll('.compare-select-btn').forEach(btn => {
      var name = btn.dataset.productName;
      var isSelected = state.selectedProducts.some(p => p.name === name);
      btn.textContent = isSelected ? 'Added' : 'Add to Compare';
      btn.classList.toggle('btn-selected', isSelected);
    });
  }

  function updateCards() {
    document.querySelectorAll('.compare-card').forEach(card => {
      var name = card.dataset.productName;
      var isSelected = state.selectedProducts.some(p => p.name === name);
      card.classList.toggle('compare-card-selected', isSelected);
    });
  }

  function updateTable() {
    var output = document.querySelector('.compare-output');
    if (!output) return;

    if (state.selectedProducts.length < 2) {
      output.innerHTML = '<div class="comparison-empty">Select at least 2 products to compare.</div>';
      return;
    }

    var selectedNames = state.selectedProducts.map(p => p.name);
    var rows = getComparisonRows();

    var headerCells = selectedNames.map(name => '<th>' + escapeHtml(name) + '</th>').join('');
    var bodyRows = rows.map(row => {
      var cells = selectedNames.map(name => {
        var value = productComparisonData[name] ? productComparisonData[name][row.field] : '-';
        return '<td>' + escapeHtml(value) + '</td>';
      }).join('');
      return '<tr><td class="comparison-row-label">' + escapeHtml(row.label) + '</td>' + cells + '</tr>';
    }).join('');

    output.innerHTML = '<table class="product-comparison-table"><thead><tr><th>Feature</th>' + headerCells + '</tr></thead><tbody>' + bodyRows + '</tbody></table>';
  }

  function updateMessage() {
    var msg = document.querySelector('.comparison-message');
    if (!msg) return;

    var count = state.selectedProducts.length;
    if (count < 2) {
      msg.textContent = count === 1 ? 'Select 1 more product' : 'Select at least 2 products';
    } else {
      msg.textContent = count + ' product' + (count === 1 ? '' : 's') + ' selected';
    }

    var compareBtn = document.querySelector('.compare-run-btn');
    if (compareBtn) {
      compareBtn.disabled = count < 2;
    }
  }

  function getComparisonRows() {
    return [
      { label: 'Best For', field: 'bestFor' },
      { label: 'Starting Fee', field: 'startingFee' },
      { label: 'Minimum Balance', field: 'minimumBalance' },
      { label: 'Key Benefit', field: 'keyBenefit' },
      { label: 'Digital Access', field: 'digitalAccess' },
      { label: 'Rewards', field: 'rewards' },
      { label: 'Processing Time', field: 'processingTime' },
      { label: 'Support Type', field: 'supportType' },
      { label: 'Ideal User', field: 'idealUser' },
      { label: 'Main Limitation', field: 'mainLimitation' },
      { label: 'Recommended Action', field: 'recommendedAction' }
    ];
  }

  // ─────────────────────────────────────────────────────────────────────────
  // EVENT HANDLERS
  // ─────────────────────────────────────────────────────────────────────────

  function setupEventListeners() {
    document.body.addEventListener('click', function (e) {
      var btn = e.target.closest('.compare-select-btn');
      if (btn) {
        e.preventDefault();
        toggleProduct(btn.dataset.productName, btn.dataset.productCategory);
        return;
      }

      var clearBtn = e.target.closest('.compare-clear-btn');
      if (clearBtn) {
        e.preventDefault();
        clearAll();
        return;
      }

      var compareBtn = e.target.closest('.compare-run-btn');
      if (compareBtn) {
        e.preventDefault();
        if (state.selectedProducts.length >= 2) {
          track('compare_view', { products: state.selectedProducts.length });
          document.querySelector('.compare-output')?.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // GA4 TRACKING (Only called AFTER state + render complete)
  // ─────────────────────────────────────────────────────────────────────────

  function track(eventName, params) {
    var eventData = {
      event: eventName,
      compare_count: String(state.selectedProducts.length),
      selected_products: JSON.stringify(state.selectedProducts.map(p => p.name)),
      page_location: window.location.href,
      page_title: document.title,
      compare_session_id: state.sessionId
    };

    Object.assign(eventData, params || {});

    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventData);
    } catch (e) {}

    console.log('[CompareTrack]', eventName, 'count=' + eventData.compare_count);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UI UTILITIES
  // ─────────────────────────────────────────────────────────────────────────

  function toast(message, type) {
    var existing = document.querySelector('.compare-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'compare-toast compare-toast-' + type;
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:2000;padding:12px 20px;border-radius:8px;color:white;font-weight:600;max-width:90vw;text-align:center;animation:slideUp 0.3s;background:' + (type === 'success' ? '#22a833' : type === 'error' ? '#dc143c' : '#333') + ';';

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2400);
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PUBLIC API
  // ─────────────────────────────────────────────────────────────────────────

  return {
    init,
    addProduct,
    removeProduct,
    toggleProduct,
    clearAll,
    getCount,
    getSelected,
    render,
    track
  };
})();

// Auto-init when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    CompareSystem.init();
  });
} else {
  CompareSystem.init();
}
