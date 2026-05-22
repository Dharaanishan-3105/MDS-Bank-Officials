﻿// ═══════════════════════════════════════════════════════════
// MDS Bank — Core Script with GTM / GA4 DataLayer Integration
// ═══════════════════════════════════════════════════════════

function toggleSearchOverlay() {

  var overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  overlay.classList.toggle('active');

  // Focus input for a11y
  var input = document.getElementById('overlay-search-input');
  if (input && overlay.classList.contains('active')) {
    input.focus();
  }
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

var productComparisonData = {
  'Savings Account': {
    bestFor: 'Students, salary users, everyday banking',
    startingFee: 'Zero balance demo option',
    minimumBalance: 'Basic KYC demo requirement',
    keyBenefit: 'Easy online account opening',
    digitalAccess: 'Full mobile and net banking',
    rewards: 'Limited rewards',
    processingTime: 'Instant demo approval',
    supportType: 'Chat, phone, branch',
    idealUser: 'New bank customers',
    mainLimitation: 'Not designed for credit needs',
    recommendedAction: 'Open Account'
  },
  'Credit Card': {
    bestFor: 'Shopping, rewards, monthly spending',
    startingFee: '₹499 annual fee demo value',
    minimumBalance: 'Income eligibility demo rule',
    keyBenefit: 'Cashback and reward points',
    digitalAccess: 'Card controls and statements',
    rewards: 'High rewards',
    processingTime: '2–5 working days demo timeline',
    supportType: 'Card support and fraud help',
    idealUser: 'Regular spenders',
    mainLimitation: 'Late payment charges may apply',
    recommendedAction: 'Apply for Card'
  },
  'Personal Loan': {
    bestFor: 'Emergency or planned expenses',
    startingFee: '10.5% demo interest rate',
    minimumBalance: 'Salary or income proof demo rule',
    keyBenefit: 'Quick fund access',
    digitalAccess: 'EMI schedule and payment tracking',
    rewards: 'No rewards',
    processingTime: '24–48 hours demo timeline',
    supportType: 'Loan advisor support',
    idealUser: 'Users needing funds',
    mainLimitation: 'Interest cost applies',
    recommendedAction: 'Calculate EMI'
  },
  'Business Account': {
    bestFor: 'Small businesses and merchants',
    startingFee: '₹999 yearly demo fee',
    minimumBalance: 'Business KYC demo requirement',
    keyBenefit: 'Corporate payment support',
    digitalAccess: 'Business dashboard access',
    rewards: 'Merchant benefits',
    processingTime: '2–3 working days demo timeline',
    supportType: 'Relationship manager support',
    idealUser: 'Business owners',
    mainLimitation: 'More documents required',
    recommendedAction: 'Explore Business Banking'
  },
  'Digital Savings Account': {
    bestFor: 'Everyday savings and easy access',
    interestRate: '4.0% p.a.',
    minimumBalance: '₹0 minimum option',
    monthlyFee: 'No monthly fee',
    digitalAccess: 'Full mobile and net banking',
    debitCardAvailability: 'Yes',
    freeTransactions: 'Unlimited online transfers',
    idealUser: 'Digital-first savers',
    mainLimitation: 'Limited branch banking',
    recommendedAction: 'Open Savings Account'
  },
  'Salary Account': {
    bestFor: 'Salaried professionals',
    interestRate: '3.5% p.a.',
    minimumBalance: 'Zero balance',
    monthlyFee: 'No fee with salary credit',
    digitalAccess: 'Complete salary account management',
    debitCardAvailability: 'Yes',
    freeTransactions: 'Free debit transactions',
    idealUser: 'Salary earners',
    mainLimitation: 'Requires employer salary mandate',
    recommendedAction: 'Apply for Salary Account'
  },
  'Current Account': {
    bestFor: 'Business banking and high-volume transactions',
    interestRate: 'Not applicable',
    minimumBalance: '₹10,000 balance',
    monthlyFee: '₹250 maintenance fee',
    digitalAccess: 'Business net banking portal',
    debitCardAvailability: 'Yes',
    freeTransactions: 'Up to 100 free transactions',
    idealUser: 'SMEs and businesses',
    mainLimitation: 'Higher minimum balance',
    recommendedAction: 'Explore Current Account'
  },
  'Senior Citizen Savings Account': {
    bestFor: 'Retirees seeking safe returns',
    interestRate: '5.0% p.a.',
    minimumBalance: '₹1,000 minimum',
    monthlyFee: 'No monthly fee',
    digitalAccess: 'Easy senior-friendly banking',
    debitCardAvailability: 'Yes',
    freeTransactions: 'Free branch and online transactions',
    idealUser: 'Senior citizens',
    mainLimitation: 'Age-based eligibility',
    recommendedAction: 'Open Senior Savings'
  },
  'Classic Debit Card': {
    bestFor: 'Daily transactions and ATM withdrawals',
    annualFee: 'No annual fee',
    rewards: 'Basic cashbacks on select spends',
    atmLimit: '₹10,000 per day',
    onlineLimit: '₹50,000 per day',
    travelBenefits: 'Limited',
    fraudProtection: 'Chip + PIN security',
    eligibility: 'Savings account holders',
    mainLimitation: 'Lower reward rate',
    recommendedAction: 'Apply for Debit Card'
  },
  'Platinum Debit Card': {
    bestFor: 'Premium account holders',
    annualFee: '₹499 per year',
    rewards: 'Higher cashback and lounge access',
    atmLimit: '₹25,000 per day',
    onlineLimit: '₹1,00,000 per day',
    travelBenefits: 'Airport lounge access',
    fraudProtection: 'Enhanced fraud monitoring',
    eligibility: 'Income or deposit-based',
    mainLimitation: 'Annual fee applies',
    recommendedAction: 'Apply for Platinum Debit'
  },
  'Cashback Credit Card': {
    bestFor: 'Everyday spenders',
    annualFee: '₹999 per year',
    rewards: 'Up to 5% cashback',
    atmLimit: '₹25,000 per day',
    onlineLimit: '₹2,00,000 per day',
    travelBenefits: 'Fuel surcharge waiver',
    fraudProtection: 'Zero liability protection',
    eligibility: 'Minimum income required',
    mainLimitation: 'Rewards capped monthly',
    recommendedAction: 'Apply for Cashback Card'
  },
  'Travel Credit Card': {
    bestFor: 'Frequent travelers',
    annualFee: '₹1,499 per year',
    rewards: 'Air miles and lounge access',
    atmLimit: '₹30,000 per day',
    onlineLimit: '₹2,50,000 per day',
    travelBenefits: 'Airport lounge access and travel insurance',
    fraudProtection: 'International fraud alerts',
    eligibility: 'Frequent travelers',
    mainLimitation: 'Travel fee benefits need usage',
    recommendedAction: 'Apply for Travel Card'
  },
  'Home Loan': {
    bestFor: 'Home purchase financing',
    sampleInterestRate: '8.5% p.a.',
    loanAmountRange: '₹5L - ₹5Cr',
    tenureRange: '5 - 30 years',
    processingFee: '₹15,000 or 0.5%',
    approvalTime: '5–7 working days',
    documentsRequired: 'Income proof, property papers',
    emiSupport: 'Yes',
    mainLimitation: 'Longer approval documentation',
    recommendedAction: 'Check eligibility'
  },
  'Education Loan': {
    bestFor: 'Higher education abroad or domestic',
    sampleInterestRate: '9.2% p.a.',
    loanAmountRange: '₹1L - ₹50L',
    tenureRange: '1 - 10 years',
    processingFee: '₹10,000 flat',
    approvalTime: '3–5 working days',
    documentsRequired: 'Admission proof, academic records',
    emiSupport: 'Yes',
    mainLimitation: 'Co-applicant required',
    recommendedAction: 'Apply for Education Loan'
  },
  'Vehicle Loan': {
    bestFor: 'Car or bike purchase',
    sampleInterestRate: '8.8% p.a.',
    loanAmountRange: '₹50,000 - ₹50L',
    tenureRange: '1 - 7 years',
    processingFee: '₹5,000 flat',
    approvalTime: '1–3 working days',
    documentsRequired: 'Vehicle estimate, income proof',
    emiSupport: 'Yes',
    mainLimitation: 'Vehicle value dependent',
    recommendedAction: 'Calculate EMI'
  },
  'Business Current Account': {
    bestFor: 'Daily business transactions',
    fee: '₹199 monthly',
    transactionSupport: '100 free transactions monthly',
    payrollSupport: 'Limited payroll tools',
    merchantSupport: 'UPI and POS integration',
    dashboardAccess: 'Business portal access',
    relationshipManager: 'Dedicated manager available',
    idealBusinessType: 'SMEs and startups',
    mainLimitation: 'Monthly fee applies',
    recommendedAction: 'Open Business Current Account'
  },
  'Merchant Account': {
    bestFor: 'Retailers and online merchants',
    fee: '₹299 monthly',
    transactionSupport: 'Unlimited merchant settlements',
    payrollSupport: 'No payroll support',
    merchantSupport: 'Payment gateway and settlements',
    dashboardAccess: 'Merchant analytics dashboard',
    relationshipManager: 'Business support team',
    idealBusinessType: 'Retail and e-commerce',
    mainLimitation: 'Fee for payment gateway',
    recommendedAction: 'Set up Merchant Account'
  },
  'Payroll Account': {
    bestFor: 'Large payroll operations',
    fee: '₹399 monthly',
    transactionSupport: 'Bulk payout support',
    payrollSupport: 'Automated salary processing',
    merchantSupport: 'No merchant-specific tools',
    dashboardAccess: 'Payroll management dashboard',
    relationshipManager: 'Payroll specialist support',
    idealBusinessType: 'Enterprises and HR teams',
    mainLimitation: 'Best for larger payrolls',
    recommendedAction: 'Explore Payroll Account'
  },
  'Corporate Payment Solution': {
    bestFor: 'High-volume corporate payments',
    fee: 'Custom pricing',
    transactionSupport: 'Unlimited corporate transfers',
    payrollSupport: 'Yes',
    merchantSupport: 'Integrated merchant collections',
    dashboardAccess: 'Advanced corporate dashboard',
    relationshipManager: 'Dedicated corporate banker',
    idealBusinessType: 'Large corporations',
    mainLimitation: 'Minimum balance and documentation',
    recommendedAction: 'Contact corporate banking'
  }
};

var comparisonRowsMap = {
  generic: [
    { label: 'Best For', field: 'bestFor' },
    { label: 'Starting Fee / Rate', field: 'startingFee' },
    { label: 'Minimum Balance / Eligibility', field: 'minimumBalance' },
    { label: 'Key Benefit', field: 'keyBenefit' },
    { label: 'Digital Banking Access', field: 'digitalAccess' },
    { label: 'Rewards / Cashback', field: 'rewards' },
    { label: 'Processing Time', field: 'processingTime' },
    { label: 'Support Type', field: 'supportType' },
    { label: 'Ideal User', field: 'idealUser' },
    { label: 'Main Limitation', field: 'mainLimitation' },
    { label: 'Recommended Action', field: 'recommendedAction' }
  ],
  accounts: [
    { label: 'Best For', field: 'bestFor' },
    { label: 'Minimum Balance', field: 'minimumBalance' },
    { label: 'Interest Rate', field: 'interestRate' },
    { label: 'Monthly Fee', field: 'monthlyFee' },
    { label: 'Digital Banking Access', field: 'digitalAccess' },
    { label: 'Debit Card Availability', field: 'debitCardAvailability' },
    { label: 'Free Transactions', field: 'freeTransactions' },
    { label: 'Ideal User', field: 'idealUser' },
    { label: 'Main Limitation', field: 'mainLimitation' },
    { label: 'Recommended Action', field: 'recommendedAction' }
  ],
  cards: [
    { label: 'Best For', field: 'bestFor' },
    { label: 'Annual Fee', field: 'annualFee' },
    { label: 'Rewards / Cashback', field: 'rewards' },
    { label: 'ATM Withdrawal Limit', field: 'atmLimit' },
    { label: 'Online Spend Limit', field: 'onlineLimit' },
    { label: 'Travel Benefits', field: 'travelBenefits' },
    { label: 'Fraud Protection', field: 'fraudProtection' },
    { label: 'Eligibility', field: 'eligibility' },
    { label: 'Main Limitation', field: 'mainLimitation' },
    { label: 'Recommended Action', field: 'recommendedAction' }
  ],
  loans: [
    { label: 'Best For', field: 'bestFor' },
    { label: 'Sample Interest Rate', field: 'sampleInterestRate' },
    { label: 'Loan Amount Range', field: 'loanAmountRange' },
    { label: 'Tenure Range', field: 'tenureRange' },
    { label: 'Processing Fee', field: 'processingFee' },
    { label: 'Approval Time', field: 'approvalTime' },
    { label: 'Documents Required', field: 'documentsRequired' },
    { label: 'EMI Calculator Support', field: 'emiSupport' },
    { label: 'Main Limitation', field: 'mainLimitation' },
    { label: 'Recommended Action', field: 'recommendedAction' }
  ],
  business: [
    { label: 'Best For', field: 'bestFor' },
    { label: 'Monthly / Yearly Fee', field: 'fee' },
    { label: 'Transaction Support', field: 'transactionSupport' },
    { label: 'Payroll Support', field: 'payrollSupport' },
    { label: 'Merchant Collection Support', field: 'merchantSupport' },
    { label: 'Dashboard Access', field: 'dashboardAccess' },
    { label: 'Relationship Manager', field: 'relationshipManager' },
    { label: 'Ideal Business Type', field: 'idealBusinessType' },
    { label: 'Main Limitation', field: 'mainLimitation' },
    { label: 'Recommended Action', field: 'recommendedAction' }
  ]
};

var compareSelectionState = {
  selectedProducts: []
};

function getComparisonRows(wrapper) {
  var category = wrapper ? wrapper.dataset.comparisonCategory : 'accounts';
  return comparisonRowsMap[category] || comparisonRowsMap.generic || comparisonRowsMap.accounts;
}

function renderComparisonTable() {
  var wrapper = document.querySelector('.comparison-builder');
  if (!wrapper) return;

  var output = wrapper.querySelector('.compare-output');
  var messageEl = wrapper.querySelector('.comparison-message');
  var compareActionButtons = wrapper.querySelectorAll('.comparison-action-btn[data-action-type="compare"]');
  if (!output) return;

  var selected = compareSelectionState.selectedProducts;
  if (selected.length < 2) {
    output.innerHTML = '<div class="comparison-empty">Select at least 2 products to compare.</div>';
    if (messageEl) {
      messageEl.textContent = selected.length === 1 ? 'Select one more product to compare.' : 'Select at least 2 products to compare.';
    }
    compareActionButtons.forEach(function (btn) {
      btn.disabled = true;
    });
    return;
  }

  if (messageEl) {
    messageEl.textContent = selected.length + ' product' + (selected.length === 1 ? '' : 's') + ' selected for comparison.';
  }
  compareActionButtons.forEach(function (btn) {
    btn.disabled = false;
  });

  var rows = getComparisonRows(wrapper);
  var headerCells = selected.map(function (name) {
    return '<th>' + name + '</th>';
  }).join('');

  var bodyRows = rows.map(function (row) {
    return '<tr><td class="comparison-row-label">' + row.label + '</td>' + selected.map(function (name) {
      return '<td>' + (productComparisonData[name] ? productComparisonData[name][row.field] : '-') + '</td>';
    }).join('') + '</tr>';
  }).join('');

  output.innerHTML = '<div class="comparison-table-wrapper"><table class="product-comparison-table comparison-result-table"><thead><tr><th>Feature</th>' + headerCells + '</tr></thead><tbody>' + bodyRows + '</tbody></table></div>';
}

function updateCompareSelectionUI() {
  var buttons = document.querySelectorAll('.compare-select-btn');
  buttons.forEach(function (button) {
    var productName = button.dataset.productName;
    var selected = compareSelectionState.selectedProducts.indexOf(productName) !== -1;
    button.textContent = selected ? 'Added' : 'Add to Compare';
    button.classList.toggle('btn-selected', selected);
  });

  var cards = document.querySelectorAll('.compare-card');
  cards.forEach(function (card) {
    var name = card.dataset.productName;
    if (!name) return;
    var selected = compareSelectionState.selectedProducts.indexOf(name) !== -1;
    card.classList.toggle('compare-card-selected', selected);
  });
}

function updateComparisonMessage(message) {
  var wrapper = document.querySelector('.comparison-builder');
  if (!wrapper) return;
  var messageEl = wrapper.querySelector('.comparison-message');
  if (messageEl) {
    messageEl.textContent = message;
  }
}

function compareProductToggle(productName) {
  if (!productName || !productComparisonData[productName]) return;
  var index = compareSelectionState.selectedProducts.indexOf(productName);

  if (index !== -1) {
    compareSelectionState.selectedProducts.splice(index, 1);
    renderComparisonTable();
    updateCompareSelectionUI();
    updateComparisonMessage(compareSelectionState.selectedProducts.length < 2 ? 'Select at least 2 products to compare.' : compareSelectionState.selectedProducts.length + ' product' + (compareSelectionState.selectedProducts.length === 1 ? '' : 's') + ' selected for comparison.');
    return;
  }

  if (compareSelectionState.selectedProducts.length >= 3) {
    updateComparisonMessage('You can compare up to 3 products only.');
    return;
  }

  compareSelectionState.selectedProducts.push(productName);
  renderComparisonTable();
  updateCompareSelectionUI();
}

function clearComparisonSelection() {
  compareSelectionState.selectedProducts = [];
  renderComparisonTable();
  updateCompareSelectionUI();
  updateComparisonMessage('Select at least 2 products to compare.');
}

function initCompareFeature() {
  // Compare feature state/events for NON-compare pages.
  // (compare.html uses compare-system.js)
  if (window.__MDS_COMPARE_MODE__ === 'compare-page') return;

  /*
    Compare rebuild TODO:
    - Replace this implementation with a full centralized compare state + dynamic UI.
    - Ensure GA4 events fire ONLY on real actions.

    For now, this function exists to keep basic add/remove working.
  */
  // Compare feature: make selection buttons work on ANY page.
  // We use a separate container for the store UI panel (if present), but attach click handling globally.
  var wrapper = document.querySelector('.comparison-builder');
  // wrapper is the panel/table area; selection buttons exist even when it is missing.

  // If wrapper doesn't exist, still enable add/remove without crashing.
  // We'll only render the comparison table when wrapper is present.


  var COMPARE_STORAGE_KEY = 'mds_compare_selected_products_v1';
  var COMPARE_SESSION_ID_KEY = 'mds_compare_session_id_v1';

  var cfg = {
    maxLimit: 3,
    storage: 'localStorage', // change to 'sessionStorage' if desired
    page: {
      location: (window.location && window.location.href) || '',
      title: (document && document.title) || ''
    }
  };

  function getStorage() {
    try {
      if (cfg.storage === 'sessionStorage') return window.sessionStorage;
      return window.localStorage;
    } catch (e) {
      return null;
    }
  }

  function safeJsonParse(s) {
    if (!s) return null;
    try { return JSON.parse(s); } catch (e) { return null; }
  }

  function normalizeProduct(productName, productCategory) {
    var name = String(productName || '').trim();
    var category = String(productCategory || '').trim();
    if (!name) return null;
    // stable id: name is already unique in this dataset
    return {
      id: name,
      name: name,
      category: category || 'Unknown'
    };
  }

  function getSessionId() {
    try {
      var store = getStorage();
      if (!store) return 'no-storage';
      var existing = store.getItem(COMPARE_SESSION_ID_KEY);
      if (existing) return existing;
      var created = 'cmp_' + Math.random().toString(16).slice(2) + '_' + Date.now();
      store.setItem(COMPARE_SESSION_ID_KEY, created);
      return created;
    } catch (e) {
      return 'cmp_' + Math.random().toString(16).slice(2) + '_' + Date.now();
    }
  }

  var sessionId = getSessionId();

  function buildCommonTrackingParams(extra) {
    var state = store.getSelected();
    var selectedProducts = state.map(function (p) { return p.name; });
    return Object.assign({
      product_name: extra && extra.product_name ? extra.product_name : '',
      product_category: extra && extra.product_category ? extra.product_category : '',
      compare_count: state.length,
      selected_products: JSON.stringify(selectedProducts),
      error_type: extra && extra.error_type ? extra.error_type : '',
      compare_limit: String(cfg.maxLimit),
      page_location: cfg.page.location,
      page_title: cfg.page.title,
      compare_source: (extra && extra.compare_source) ? extra.compare_source : 'ui',
      compare_method: (extra && extra.compare_method) ? extra.compare_method : 'click',
      compare_session_id: sessionId
    }, extra || {});
  }

function track(eventName, params) {
    try {
      if (window.MDSTracking && typeof window.MDSTracking.track === 'function') {
        window.MDSTracking.track(eventName, params);
      } else {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(Object.assign({ event: eventName }, params));
      }
    } catch (e) {
      // no-op
    }

    if (window.__COMPARE_DEBUG__) {
      // eslint-disable-next-line no-console
      console.log('[CompareTrack]', eventName, params);
    }
  }

  var store = (function () {
    var selectedProducts = [];
    var hydrated = false;

    function persist() {
      var s = getStorage();
      if (!s) return;
      try {
        s.setItem(COMPARE_STORAGE_KEY, JSON.stringify(selectedProducts));
      } catch (e) {}
    }

    function hydrate() {
      if (hydrated) return;
      hydrated = true;
      var s = getStorage();
      if (!s) return;
      var raw = s.getItem(COMPARE_STORAGE_KEY);
      var arr = safeJsonParse(raw);
      if (Array.isArray(arr)) {
        selectedProducts = arr
          .map(function (x) {
            var p = normalizeProduct(x && x.name, x && x.category);
            return p ? p : null;
          })
          .filter(Boolean);
      }
    }

    function getSelected() {
      hydrate();
      return selectedProducts.slice();
    }

    function setSelected(next) {
      selectedProducts = next.slice();
      persist();
    }

    function hasProduct(id) {
      return selectedProducts.some(function (p) { return p.id === id; });
    }

    function add(product) {
      hydrate();
      var p = normalizeProduct(product && product.name, product && product.category);
      if (!p) return { ok: false, reason: 'invalid_product' };

      if (hasProduct(p.id)) return { ok: false, reason: 'duplicate' };
      if (selectedProducts.length >= cfg.maxLimit) return { ok: false, reason: 'limit_reached' };

      selectedProducts.push(p);
      persist();
      return { ok: true, product: p };
    }

    function remove(productId) {
      hydrate();
      var idx = selectedProducts.findIndex(function (p) { return p.id === productId; });
      if (idx === -1) return { ok: false, reason: 'not_found' };
      var removed = selectedProducts.splice(idx, 1)[0];
      persist();
      return { ok: true, product: removed };
    }

    function clear() {
      hydrate();
      selectedProducts = [];
      persist();
      return { ok: true };
    }

    function canSubmit() {
      hydrate();
      return selectedProducts.length >= 2;
    }

    return {
      getSelected: getSelected,
      add: add,
      remove: remove,
      clear: clear,
      canSubmit: canSubmit
    };
  })();

  // Patch old render logic to use store state
  function renderComparisonTableFromStore() {
    var selected = store.getSelected().map(function (p) { return p.name; });

    // Keep existing HTML structure but remove reliance on compareSelectionState
    var output = wrapper.querySelector('.compare-output');
    var messageEl = wrapper.querySelector('.comparison-message');
    var compareActionButtons = wrapper.querySelectorAll('.comparison-action-btn[data-action-type="compare"], .compare-run-btn');
    if (!output) return;

    // Close to avoid accidental auto-open: table should only be visible when valid
    // (renderComparisonTableFromStore will render empty state when invalid)


    if (selected.length < 2) {
      output.innerHTML = '<div class="comparison-empty">Select at least 2 products to compare.</div>';
      if (messageEl) {
        messageEl.textContent = selected.length === 1 ? 'Select one more product to compare.' : 'Select at least 2 products to compare.';
      }
      compareActionButtons.forEach(function (btn) { btn.disabled = true; });
      return;
    }

    if (messageEl) {
      messageEl.textContent = selected.length + ' product' + (selected.length === 1 ? '' : 's') + ' selected for comparison.';
    }
    compareActionButtons.forEach(function (btn) { btn.disabled = false; });

    var category = wrapper.dataset.comparisonCategory || 'generic';
    var rows = getComparisonRows(wrapper);
    var headerCells = selected.map(function (name) { return '<th>' + name + '</th>'; }).join('');

    var bodyRows = rows.map(function (row) {
      return '<tr><td class="comparison-row-label">' + row.label + '</td>' + selected.map(function (name) {
        return '<td>' + (productComparisonData[name] ? productComparisonData[name][row.field] : '-') + '</td>';
      }).join('') + '</tr>';
    }).join('');

    output.innerHTML = '<div class="comparison-table-wrapper"><table class="product-comparison-table comparison-result-table" role="table" aria-label="Product comparison"><thead><tr><th>Feature</th>' + headerCells + '</tr></thead><tbody>' + bodyRows + '</tbody></table></div>';
  }

  function updateCompareSelectionUIFromStore() {
    var selected = store.getSelected();
    var selectedIds = selected.map(function (p) { return p.id; });

    // selection buttons
    var addBtns = wrapper.querySelectorAll('.compare-select-btn');
    addBtns.forEach(function (btn) {
      var name = btn.dataset.productName;
      var category = btn.dataset.productCategory;
      var id = name;
      var isSelected = selectedIds.indexOf(id) !== -1;
      btn.textContent = isSelected ? 'Added' : 'Add to Compare';
      btn.classList.toggle('btn-selected', isSelected);
      btn.setAttribute('aria-pressed', String(isSelected));

      // Ensure remove UX doesn't require a separate button: click toggles
      btn.dataset._compare_category = category || '';
    });

    // cards
    var cards = wrapper.querySelectorAll('.compare-card');
    cards.forEach(function (card) {
      var name = card.dataset.productName;
      var isSelected = selectedIds.indexOf(name) !== -1;
      card.classList.toggle('compare-card-selected', isSelected);
    });

    // compare button enable/disable
    var compareRun = wrapper.querySelectorAll('.comparison-action-btn[data-action-type="compare"], .compare-run-btn');
    compareRun.forEach(function (btn) {
      btn.disabled = selectedIds.length < 2;
    });
  }

  function showToast(message, type) {
    // minimal toast (no extra CSS required)
    var existing = wrapper.querySelector('.compare-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'compare-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.cssText = [
      'position:fixed',
      'left:50%',
      'transform:translateX(-50%)',
      'bottom:20px',
      'z-index:2000',
      'padding:0.9rem 1.1rem',
      'border-radius:14px',
      'background:rgba(11,26,54,0.95)',
      'color:white',
      'border:1px solid rgba(255,255,255,0.18)',
      'box-shadow:0 12px 40px rgba(0,0,0,0.35)',
      'font-weight:700',
      'max-width:92vw',
      'text-align:center'
    ].join(';');

    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function () {
      if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
    }, 2400);
  }

  function validateAndTrackOnSubmit() {
    var selected = store.getSelected();
    var selectedCount = selected.length;

    var submitBtn = wrapper.querySelector('.comparison-action-btn[data-action-type="compare"], .compare-run-btn');
    if (submitBtn) submitBtn.disabled = true;

    if (!store.canSubmit()) {
      // compare_error only for validation failures
      var errorType = selectedCount < 2 ? 'min_items' : 'unknown';
      var payload = buildCommonTrackingParams({
        event_action: 'compare_submit_blocked',
        error_type: errorType,
        compare_count: String(selectedCount)
      });
      track('compare_error', payload);
      if (submitBtn) submitBtn.disabled = false;
      showToast('Please select at least 2 products to compare.', 'error');
      return false;
    }

    // compare_started/completed fire only after the table is rendered from current state.
    renderComparisonTableFromStore();
    updateCompareSelectionUIFromStore();
    track('compare_started', buildCommonTrackingParams({
      compare_method: 'submit',
      compare_source: 'ui',
      product_name: selected[0] ? selected[0].name : '',
      product_category: selected[0] ? selected[0].category : ''
    }));

    track('compare_completed', buildCommonTrackingParams({
      compare_method: 'click',
      compare_source: 'ui'
    }));

    // scroll into view for UX
    var output = wrapper.querySelector('.compare-output');
    if (output && output.scrollIntoView) {
      output.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return true;
  }

  function handleAddClick(btn) {
    var name = btn.dataset.productName;
    var category = btn.dataset.productCategory;
    var product = normalizeProduct(name, category);
    if (!product) return;

    var selectedBefore = store.getSelected().length;

    // toggle behavior: if already selected -> remove; else add
    var selectedIds = store.getSelected().map(function (p) { return p.id; });
    if (selectedIds.indexOf(product.id) !== -1) {
      var removed = store.remove(product.id);
      if (removed && removed.ok) {
        renderComparisonTableFromStore();
        updateCompareSelectionUIFromStore();
        track('compare_removed', buildCommonTrackingParams({
          product_name: removed.product.name,
          product_category: removed.product.category,
          compare_count: String(store.getSelected().length),
          compare_method: 'click',
          compare_source: 'ui'
        }));
        showToast('Removed from comparison.', 'info');
      }
      return;
    }

    var res = store.add(product);
    if (!res.ok) {
      if (res.reason === 'limit_reached') {
        track('compare_limit_reached', buildCommonTrackingParams({
          product_name: product.name,
          product_category: product.category,
          error_type: 'limit_reached',
          compare_method: 'click',
          compare_source: 'ui'
        }));
        showToast('You can compare up to ' + cfg.maxLimit + ' products.', 'error');
      } else if (res.reason === 'duplicate') {
        track('compare_duplicate_attempt', buildCommonTrackingParams({
          product_name: product.name,
          product_category: product.category,
          error_type: 'duplicate',
          compare_method: 'click',
          compare_source: 'ui'
        }));
        showToast('That product is already in your comparison.', 'error');
      }
      return;
    }

    // success add
    renderComparisonTableFromStore();
    updateCompareSelectionUIFromStore();

    track('compare_added', buildCommonTrackingParams({
      product_name: res.product.name,
      product_category: res.product.category,
      compare_count: String(selectedBefore + 1),
      compare_method: 'click',
      compare_source: 'ui'
    }));

    showToast('Added to comparison.', 'success');
  }

  function handleClearClick() {
    store.clear();
    renderComparisonTableFromStore();
    updateCompareSelectionUIFromStore();
    track('compare_clear', buildCommonTrackingParams({
      compare_method: 'click',
      compare_source: 'ui'
    }));
    showToast('Comparison cleared.', 'info');
  }

  // Event delegation: prevents double-binding bugs.
  // IMPORTANT: do NOT rely on wrapper.contains(...) because wrapper can be null on pages
  // where compare cards/buttons exist but the comparison panel is missing.
  (document.body || document.documentElement).addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var addBtn = t.closest('.compare-select-btn');
    if (addBtn) {
      // Only handle buttons that carry the expected data attributes
      if (addBtn.dataset && addBtn.dataset.productName) {
        e.preventDefault();
        handleAddClick(addBtn);
      }
      return;
    }

    var clearBtn = t.closest('.compare-clear-btn');
    if (clearBtn) {
      e.preventDefault();
      handleClearClick();
      return;
    }

    var compareRunBtn = t.closest('.comparison-action-btn[data-action-type="compare"], .compare-run-btn');
    if (compareRunBtn) {
      e.preventDefault();
      // validateAndTrackOnSubmit needs wrapper; if wrapper missing, just no-op.
      if (wrapper) validateAndTrackOnSubmit();
      return;
    }
  });

  // Initial render from persisted state
  updateCompareSelectionUIFromStore();
  renderComparisonTableFromStore();
}

// Ensure compare init runs exactly once per page
// (compare-system.js auto-inits on compare.html)
if (window.__MDS_COMPARE_MODE__ === 'compare-page') {
  window.__MDS_COMPARE_INIT_DONE__ = true;
}



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

window.searchIndex = window.searchIndex || [
  {
    title: 'Savings and Checking Accounts',
    desc: 'Open digital savings, salary, current, and senior citizen accounts with mobile banking access.',
    keywords: 'accounts account savings checking salary current senior citizen digital banking open account zero balance debit',
    category: 'Accounts',
    url: 'accounts.html'
  },
  {
    title: 'Credit and Debit Cards',
    desc: 'Compare cashback, travel, platinum, classic, credit, and debit cards with rewards and controls.',
    keywords: 'cards card credit debit cashback travel platinum rewards annual fee fraud protection limits controls',
    category: 'Cards',
    url: 'cards.html'
  },
  {
    title: 'Card Services and Controls',
    desc: 'Activate cards, block lost cards, request replacements, set spending limits, and manage travel notifications.',
    keywords: 'card services cards activate block lost replacement spending limits controls travel notification secure',
    category: 'Cards',
    url: 'card-services.html'
  },
  {
    title: 'Loans and Mortgages',
    desc: 'Explore personal, home, education, vehicle, and business loans with EMI support and eligibility guidance.',
    keywords: 'loans loan mortgage personal home education vehicle business emi interest financing borrow',
    category: 'Loans',
    url: 'loans.html'
  },
  {
    title: 'Loan Calculator',
    desc: 'Estimate monthly EMI payments for loan amount, interest rate, and tenure.',
    keywords: 'loan calculator emi payment interest tenure monthly loans estimate',
    category: 'Tools',
    url: 'loan-calculator.html'
  },
  {
    title: 'Business Banking',
    desc: 'Business current accounts, merchant accounts, payroll tools, payment support, and relationship manager access.',
    keywords: 'business banking merchant payroll current account corporate payment sme startup relationship manager',
    category: 'Business Banking',
    url: 'business-banking.html'
  },
  {
    title: 'Investments',
    desc: 'Investment options, risk profile tools, market resources, and long-term planning support.',
    keywords: 'investments investing market risk portfolio trading research planning wealth',
    category: 'Investments',
    url: 'investments.html'
  },
  {
    title: 'Security Center',
    desc: 'Fraud protection, safe digital banking practices, card security, and account safety resources.',
    keywords: 'security fraud protection safe banking phishing password otp card controls account safety secure',
    category: 'Security',
    url: 'security.html'
  },
  {
    title: 'Support Center',
    desc: 'Find help articles, FAQs, live chat, contact options, guides, and banking support resources.',
    keywords: 'support help faq faqs articles guides chat service contact questions banking',
    category: 'Support',
    url: 'support.html'
  },
  {
    title: 'Contact MDS Bank',
    desc: 'Contact customer support, email the banking team, find headquarters details, and review service hours.',
    keywords: 'contact support phone email headquarters hours customer service help',
    category: 'Support',
    url: 'contact.html'
  },
  {
    title: 'Branch and ATM Locator',
    desc: 'Search MDS Bank locations for branches, ATMs, cash deposit support, and nearby banking services.',
    keywords: 'locator branch atm locations city cash deposit nearby services banking',
    category: 'Locations',
    url: 'locator.html'
  },
  {
    title: 'Rates',
    desc: 'Review demo banking rates for savings, cards, loans, and deposit products.',
    keywords: 'rates interest savings loans cards deposits apr apy',
    category: 'Rates',
    url: 'rates.html'
  },
  {
    title: 'Digital Banking Dashboard',
    desc: 'View balances, transactions, card controls, transfers, alerts, analytics, and digital banking activity.',
    keywords: 'dashboard digital banking balances transactions transfers card controls alerts analytics login',
    category: 'Digital Banking',
    url: 'dashboard.html'
  },
  {
    title: 'Open Account',
    desc: 'Start a demo application for a new MDS Bank account with electronic disclosures.',
    keywords: 'open account apply application savings checking digital onboarding kyc',
    category: 'Accounts',
    url: 'open-account.html'
  },
  {
    title: 'Apply Now',
    desc: 'Submit a demo application for bank products, cards, loans, or accounts.',
    keywords: 'apply application cards loans accounts banking submit eligibility',
    category: 'Applications',
    url: 'apply.html'
  },
  {
    title: 'Product Quiz',
    desc: 'Answer a few questions to find a recommended banking product.',
    keywords: 'quiz recommend product accounts cards loans savings business',
    category: 'Tools',
    url: 'quiz.html'
  }
];

function normalizeSearchText(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function escapeSearchHtml(value) {
  return String(value || '').replace(/[&<>"']/g, function (char) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char];
  });
}

function trackSearchEvent(query, resultCount) {
  var payload = {
    search_term: query,
    result_count: resultCount,
    result_status: resultCount > 0 ? 'with_results' : 'no_results'
  };

  if (window.MDSTracking && typeof window.MDSTracking.trackAfterRender === 'function') {
    window.MDSTracking.trackAfterRender('view_search_results', payload);
  } else {
    window.dataLayer = window.dataLayer || [];
    setTimeout(function () {
      window.dataLayer.push(Object.assign({ event: 'view_search_results' }, payload));
    }, 0);
  }
}

window.performSearch = function () {
  var input = document.getElementById('search-page-input');
  var query = input ? String(input.value || '').trim() : '';



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

  var queryLower = normalizeSearchText(query);
  var terms = queryLower.split(/\s+/).filter(function (term) { return term.length > 1; });
  var index = window.searchIndex || [];

  var results = index.filter(function (item) {
    var text = normalizeSearchText([item.title, item.desc, item.keywords, item.category].join(' '));
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
      return '<a href="' + escapeSearchHtml(item.url) + '" class="search-result-item" data-track="search_result_click" data-event="search_result_click" data-category="site_search" data-label="' + escapeSearchHtml(item.title) + '" style="display:block; padding:1.5rem; margin-bottom:1rem; background:var(--light-card); border-radius:16px; border:1px solid var(--border-light); text-decoration:none; color:var(--text-light); transition:all 0.3s var(--ease);">' +
        '<div style="display:flex; justify-content:space-between; gap:1rem; align-items:flex-start;">' +
        '<div style="flex:1;">' +
        '<span style="font-size:0.75rem; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:1px;">' + escapeSearchHtml(item.category) + '</span>' +
        '<h3 style="margin:0.75rem 0 0.5rem; font-size:1.15rem;">' + escapeSearchHtml(item.title) + '</h3>' +
        '<p style="margin:0; color:var(--text-muted); font-size:0.95rem; line-height:1.6;">' + escapeSearchHtml(item.desc) + '</p>' +
        '</div>' +
        '<span style="font-size:1.5rem; color:var(--primary);">→</span>' +
        '</div>' +
        '</a>';
    }).join('');
  }

  var count = results.length;
  trackSearchEvent(query, count);

};


function initSearchPage() {
  var searchInput = document.getElementById('search-page-input');
  if (!searchInput) return;
  var form = document.getElementById('searchForm');
  var searchDebounceTimer = null;

  function scheduleSearch() {
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(function () {
      window.performSearch();
    }, 300);
  }

  var query = getSearchQuery();
  if (query) {
    searchInput.value = query;
    window.performSearch();
  } else {
    window.performSearch();
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var nextQuery = String(searchInput.value || '').trim();
      var url = new URL(window.location.href);
      if (nextQuery) url.searchParams.set('q', nextQuery);
      else url.searchParams.delete('q');
      window.history.replaceState({}, '', url.pathname + url.search);
      scheduleSearch();
    });
  }

  searchInput.addEventListener('input', function () {
    var url = new URL(window.location.href);
    if (!String(searchInput.value || '').trim()) {
      url.searchParams.delete('q');
      window.history.replaceState({}, '', url.pathname);
    } else {
      url.searchParams.set('q', String(searchInput.value || '').trim());
      window.history.replaceState({}, '', url.pathname + url.search);
    }
    scheduleSearch();
  });
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

function initQuizPage() {
  var quizSteps = document.querySelectorAll('.quiz-step');
  if (!quizSteps.length) return;

  var answerButtons = document.querySelectorAll('.quiz-answer-btn');
  var resultContainer = document.getElementById('quiz-result');
  var quizResultTitle = document.getElementById('quiz-result-title');
  var quizResultDescription = document.getElementById('quiz-result-description');
  var resetBtn = document.getElementById('quiz-reset-btn');
  var answers = {};

  function showStep(stepIndex) {
    quizSteps.forEach(function (step, index) {
      step.classList.toggle('active', index === stepIndex);
    });
  }

  function calculateRecommendation() {
    var product = 'Savings Account';
    if (answers['1'] === 'run-business' || answers['4'] === 'business') {
      product = 'Business Account';
    } else if (answers['1'] === 'borrow-funds' || answers['3'] === 'loanOnly') {
      product = 'Personal Loan';
    } else if (answers['1'] === 'earn-rewards' || answers['2'] === 'frequent-spending' || answers['3'] === 'travel') {
      product = 'Credit Card';
    }
    return product;
  }

  function updateResult() {
    if (!resultContainer || !quizResultTitle || !quizResultDescription) return;
    var product = calculateRecommendation();
    resultContainer.dataset.recommendedProduct = product;
    quizResultTitle.textContent = product;
    quizResultDescription.textContent = 'Based on your answers, ' + product + ' is the best fit from our sample banking products.';
    resultContainer.classList.add('visible');
    showStep(quizSteps.length - 1);
  }

  answerButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var step = button.getAttribute('data-quiz-step');
      var answer = button.getAttribute('data-answer');
      var nextStep = parseInt(button.getAttribute('data-next-step'), 10);
      if (step) answers[step] = answer;
      if (nextStep && nextStep <= quizSteps.length) {
        showStep(nextStep - 1);
      } else {
        updateResult();
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      answers = {};
      resultContainer.dataset.recommendedProduct = '';
      showStep(0);
      var activeScroll = document.querySelector('.quiz-step.active');
      if (activeScroll) activeScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function initOpenAccountPage() {
  var formContainer = document.querySelector('.open-account-form');
  if (!formContainer) return;

  var steps = Array.prototype.slice.call(formContainer.querySelectorAll('.form-step'));
  var indicators = Array.prototype.slice.call(formContainer.querySelectorAll('.step'));
  var nextButtons = Array.prototype.slice.call(formContainer.querySelectorAll('.form-next-btn'));
  var prevButtons = Array.prototype.slice.call(formContainer.querySelectorAll('.form-prev-btn'));
  var submitButton = formContainer.querySelector('.form-submit-btn');
  var reviewContent = document.getElementById('review-content');
  var currentIndex = 0;

  function setStep(index) {
    if (index < 0 || index >= steps.length) return;
    currentIndex = index;
    steps.forEach(function (step, idx) {
      step.classList.toggle('active', idx === index);
    });
    indicators.forEach(function (dot, idx) {
      dot.classList.toggle('active', idx === index);
      dot.classList.toggle('completed', idx < index);
    });
  }

  function validateFields(step) {
    if (!step) return false;
    var inputs = step.querySelectorAll('input[required], select[required], textarea[required]');
    var ok = true;
    Array.prototype.forEach.call(inputs, function (input) {
      if (input.type === 'checkbox') {
        if (!input.checked) ok = false;
      } else {
        if (!input.value || !String(input.value).trim()) ok = false;
      }
    });
    return ok;
  }

  function fillReview() {
    if (!reviewContent) return;
    function value(id) {
      var el = document.getElementById(id);
      return el ? String(el.value || '').trim() : '';
    }
    var rows = [
      ['Full Name', value('app-name')],
      ['Email Address', value('app-email')],
      ['Phone Number', value('app-phone')],
      ['Date of Birth', value('app-dob')],
      ['Street Address', value('app-address')],
      ['City', value('app-city')],
      ['Country', value('app-country')],
      ['Product Type', value('app-product')],
      ['Initial Deposit', value('app-deposit')],
      ['Preferred Contact', value('app-contact')]
    ];
    reviewContent.innerHTML = rows.map(function (row) {
      return '<div style="display:flex; justify-content:space-between; gap:1rem; padding:0.75rem 0; border-bottom:1px solid rgba(0,0,0,0.05);">' +
        '<strong style="color:var(--text-muted);">' + row[0] + '</strong>' +
        '<span style="color:var(--text-light); font-weight:600;">' + (row[1] || '-') + '</span>' +
      '</div>';
    }).join('');
  }

  nextButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      var stepIndex = currentIndex;
      if (!validateFields(steps[stepIndex])) {
        var fields = steps[stepIndex].querySelectorAll('[required]');
        Array.prototype.forEach.call(fields, function (field) {
          if (field.reportValidity) field.reportValidity();
        });
        return;
      }
      if (stepIndex === steps.length - 2) {
        fillReview();
      }
      setStep(stepIndex + 1);
    });
  });

  prevButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      setStep(Math.max(0, currentIndex - 1));
    });
  });

  if (submitButton) {
    submitButton.addEventListener('click', function (e) {
      e.preventDefault();
      if (!validateFields(steps[currentIndex])) {
        var fields = steps[currentIndex].querySelectorAll('[required]');
        Array.prototype.forEach.call(fields, function (field) {
          if (field.reportValidity) field.reportValidity();
        });
        return;
      }
      alert('Demo: Your application has been submitted.');
      window.location.reload();
    });
  }

  setStep(0);
}

function initLoanCalculator() {

  // Demo CTA/event tracking for loan calculator

  var form = document.getElementById('loan-form');
  if (!form) return;

  // Support legacy markup that used inline onclick="calculateLoan()".
  // The current page markup calls calculateLoan(); we route it to the same calculator logic.
  window.calculateLoan = function () {
    if (!form) return;
    var calcBtn = form.querySelector('.emi-calculate-btn');
    if (calcBtn && calcBtn.click) calcBtn.click();
  };

  var amountEl = document.getElementById('loan-amount');
  var rateEl = document.getElementById('interest-rate');
  var termEl = document.getElementById('loan-term');
  var resultContainer = document.getElementById('loan-result');
  var monthlyEl = document.getElementById('monthly-payment');
  var interestEl = document.getElementById('total-interest');
  var costEl = document.getElementById('total-cost');
  var amountError = document.getElementById('loan-amount-error');
  var rateError = document.getElementById('interest-rate-error');
  var termError = document.getElementById('loan-term-error');
  var calcBtn = form.querySelector('.emi-calculate-btn');

  function resetErrors() {
    if (amountError) amountError.textContent = '';
    if (rateError) rateError.textContent = '';
    if (termError) termError.textContent = '';
  }

  function formatMoney(value) {
    return '$' + Number(value).toFixed(2);
  }

  function calculate() {
    resetErrors();
    var amount = parseFloat(amountEl.value);
    var apr = parseFloat(rateEl.value);
    var months = parseInt(termEl.value, 10);
    var valid = true;

    if (!amount || amount < 1000) {
      if (amountError) amountError.textContent = 'Enter a loan amount of at least $1,000.';
      valid = false;
    }
    if (isNaN(apr) || apr <= 0) {
      if (rateError) rateError.textContent = 'Enter a valid APR greater than 0.';
      valid = false;
    }
    if (!months || months < 1) {
      if (termError) termError.textContent = 'Enter a term of at least 1 month.';
      valid = false;
    }
    if (!valid) return;

    var monthlyRate = apr / 100 / 12;
    var payments = months;
    var monthly = amount;
    if (monthlyRate > 0) {
      var factor = Math.pow(1 + monthlyRate, payments);
      monthly = amount * monthlyRate * factor / (factor - 1);
    }
    var totalCost = monthly * payments;
    var interest = totalCost - amount;

    if (monthlyEl) monthlyEl.textContent = formatMoney(monthly);
    if (interestEl) interestEl.textContent = formatMoney(interest);
    if (costEl) costEl.textContent = formatMoney(totalCost);
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', calculate);
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
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-controls', 'primary-navigation');
    if (!navLinks.id) navLinks.id = 'primary-navigation';
    mobileToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', navLinks.classList.contains('active') ? 'true' : 'false');
    });
  }
}


function initAccordions() {
  var items = document.querySelectorAll('.accordion-item');
  items.forEach(function (item, index) {
    var header = item.querySelector('.accordion-header');
    var content = item.querySelector('.accordion-content');
    if (!header) return;
    if (!header.hasAttribute('tabindex')) header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
    if (content) {
      if (!content.id) content.id = 'accordion-content-' + index;
      header.setAttribute('aria-controls', content.id);
    }

    function toggleAccordion() {
      items.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('active');
          var otherHeader = other.querySelector('.accordion-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('active');
      header.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
      if (window.MDSTracking && item.classList.contains('active')) {
        window.MDSTracking.trackAfterRender('faq_interaction', {
          faq_category: header.getAttribute('data-faq-category') || '',
          faq_question: header.textContent.replace('+', '').trim()
        });
      }
    }

    header.addEventListener('click', toggleAccordion);
    header.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleAccordion();
      }
    });
  });
}


function initScrollReveal() {
  var elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;


  // Production-friendly reveal: IntersectionObserver for better performance than timers.
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
    return;
  }

  // Fallback for older browsers.
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
  (document.body || document.documentElement).addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var isExternal = /^https?:\/\//i.test(href) && link.hostname !== window.location.hostname;
    var section = link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : (link.getAttribute('data-section') || link.getAttribute('data-page-section') || '');

    if (window.MDSTracking) {
      window.MDSTracking.trackAfterRender(isExternal ? 'outbound_link_click' : 'navigation_click', {
        link_text: link.textContent.trim(),
        link_url: link.href,
        section: section
      });
    }
  });
}

function initDataAttributeTracking() {
  // Also provides page-specific event delegation for legacy inline handlers
  // that have been removed from HTML.

  function initCardsFilter() {
    // Cards page filter buttons are currently the only legacy inline handler.
    var container = document.getElementById('cards-container');
    if (!container) return;

    var wrap = document.querySelector('section');

    (document.body || document.documentElement).addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var btn = t.closest('[data-cards-filter]');
      if (!btn) return;

      e.preventDefault();
      var category = btn.getAttribute('data-cards-filter') || 'all';

      var cards = document.querySelectorAll('.card-item');
      cards.forEach(function (card) {
        card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
      });

      var btns = document.querySelectorAll('[data-cards-filter]');
      btns.forEach(function (b) {
        var cat = b.getAttribute('data-cards-filter');
        b.className = (cat === category) ? 'btn btn-primary' : 'btn btn-outline';
      });
    });
  }

  initCardsFilter();

  // Generic event emitter for elements marked with:
  // data-track="cta_click" (or any event type)
  // data-event="..." (GA4 event name)
  // data-category, data-label (optional)
  // data-cta-name, data-product-* (optional)
  try {
    (document.body || document.documentElement).addEventListener('click', function (e) {
      var el = e.target;
      if (!el || !el.closest) return;
      var trackEl = el.closest('[data-track][data-event], a[data-cta-name], button[data-cta-name]');
      if (!trackEl) return;

      // Allow navigation after pushing analytics
      e.preventDefault();

      var eventName = trackEl.getAttribute('data-event') || 'cta_click';
      if (eventName) {
        var payload = {
          event_action: trackEl.getAttribute('data-track') || trackEl.getAttribute('data-interaction-type') || 'click',
          event_label: trackEl.getAttribute('data-label') || trackEl.textContent.trim(),
          section: trackEl.getAttribute('data-section') || trackEl.getAttribute('data-page-section') || '',
          component: trackEl.getAttribute('data-component') || '',
          position: trackEl.getAttribute('data-position') || ''
        };

        var ctaName = trackEl.getAttribute('data-cta-name');
        if (ctaName) payload.cta_name = ctaName;

        var category = trackEl.getAttribute('data-category');
        if (category) payload.cta_category = category;

        // product attributes
        var prodCat = trackEl.getAttribute('data-product-category');
        if (prodCat) payload.product_category = prodCat;
        var prodName = trackEl.getAttribute('data-product-name');
        if (prodName) payload.product_name = prodName;
        var priority = trackEl.getAttribute('data-cta-priority');
        if (priority) payload.cta_priority = priority;

        // Track after DOM update timing (0ms)
        if (window.MDSTracking && typeof window.MDSTracking.trackAfterRender === 'function') {
          window.MDSTracking.trackAfterRender(eventName, payload);
        } else if (window.MDSTracking && typeof window.MDSTracking.track === 'function') {
          window.MDSTracking.track(eventName, payload);
        } else {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push(Object.assign({ event: eventName }, payload));
        }
      }

      var href = trackEl.getAttribute('href');
      if (href && trackEl.getAttribute('target') === '_blank') {
        window.open(href, '_blank', 'noopener');
      } else if (href) {
        window.location.href = href;
      }
    });
  } catch (e) {
    // no-op
  }
}


function initDownloadTracking() {
  (document.body || document.documentElement).addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest('a[download], a[href$=".pdf"]');
    if (!link) return;
    var payload = {
      file_name: (link.getAttribute('download') || link.getAttribute('href') || '').split('/').pop(),
      link_url: link.href,
      section: link.getAttribute('data-section') || link.getAttribute('data-page-section') || ''
    };
    if (window.MDSTracking) window.MDSTracking.trackAfterRender('file_download', payload);
  });
}



function initCTATracking() {
}


function initFormFocusTracking() {
  var startedForms = {};
  (document.body || document.documentElement).addEventListener('focusin', function (event) {
    var field = event.target;
    if (!field || !field.closest) return;
    var form = field.closest('form');
    if (!form) return;
    var formName = form.getAttribute('data-form-name') || form.id || form.getAttribute('name') || 'unnamed_form';
    if (startedForms[formName]) return;
    startedForms[formName] = true;
    if (window.MDSTracking) {
      window.MDSTracking.trackAfterRender('form_start', {
        form_name: formName,
        form_id: form.id || ''
      });
    }
  });

  (document.body || document.documentElement).addEventListener('submit', function (event) {
    var form = event.target;
    if (!form || !form.matches) return;
    var formName = form.getAttribute('data-form-name') || form.id || form.getAttribute('name') || 'unnamed_form';
    if (window.MDSTracking) {
      window.MDSTracking.trackAfterRender('form_submit', {
        form_name: formName,
        form_id: form.id || ''
      });
    }
  }, true);
}


function init() {
  highlightActiveNav();
  initMobileMenu();
  initAccordions();
  initScrollReveal();
  initDashboardFilters();
  initSearchPage();
  initLocatorFiltering();
  initQuizPage();
  initLoanCalculator();
  initOpenAccountPage();

  // CTA + nav click tracking (if data-track/data-event present)
  initDataAttributeTracking();

  // Compare init for non-compare pages.
  // For compare.html, we rely on compare-system.js as the single source of truth.
  if (window.__MDS_COMPARE_MODE__ !== 'compare-page') {
    initCompareFeature();
  }
  initVideoEngagement();
  if (typeof window.initExperienceCenter === 'function') {
    window.initExperienceCenter();
  }
  initNavigationTracking();

  initDownloadTracking();
  initCTATracking();
  initFormFocusTracking();
  updateDashboardMetrics();
}



// Legacy inline handlers fallback removed; keep data-action based handlers below.

document.addEventListener('DOMContentLoaded', init);

// ─────────────────────────────────────────────────────────────────────────────
// Inline-JS removal handlers (event delegation)
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  // Toggle search overlay (used by index.html)
  (document.body || document.documentElement).addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var toggle = t.closest('[data-action="toggle-search"]');
    if (toggle) {
      e.preventDefault();
      if (typeof window.toggleSearchOverlay === 'function') window.toggleSearchOverlay();
      return;
    }

    var liveChat = t.closest('[data-action="live-chat"]');
    if (liveChat) {
      e.preventDefault();
      alert('Demo: Live chat initiated. A representative will be with you shortly.');
      return;
    }

    var supportSearch = t.closest('[data-action="support-search"]');
    if (supportSearch) {
      e.preventDefault();
      var input = document.getElementById('support-search');
      var q = input ? String(input.value || '').trim() : '';
      if (q) window.location.href = 'search.html?q=' + encodeURIComponent(q);
      return;
    }

    var loanCalc = t.closest('[data-action="calculate-loan"]');
    if (loanCalc) {
      e.preventDefault();
      if (typeof window.calculateLoan === 'function') window.calculateLoan();
      else {
        var btn = document.querySelector('#loan-form .emi-calculate-btn');
        if (btn && btn.click) btn.click();
      }
      return;
    }

    var riskSuggest = t.closest('[data-action="risk-profile-suggestion"]');
    if (riskSuggest) {
      e.preventDefault();
      var knowledge = document.getElementById('risk-knowledge');
      var timeline = document.getElementById('risk-timeline');
      var profile = 'Balanced Growth';
      if (knowledge && timeline) {
        var k = knowledge.selectedIndex;
        var tIdx = timeline.selectedIndex;
        if (k === 0 && tIdx === 0) profile = 'Conservative';
        else if (k === 2 && tIdx === 2) profile = 'Aggressive Growth';
        else if (tIdx === 2) profile = 'Growth';
        else if (tIdx === 0) profile = 'Conservative';
      }
      alert('Your suggested profile is: ' + profile);
      return;
    }
  });

  // Contact submit
  (document.body || document.documentElement).addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.matches) return;

    if (form.matches('form[data-action="contact-submit"]')) {
      e.preventDefault();

      var topic = document.getElementById('contact-topic');
      // keep existing validation/UX from handleContactSubmit (which may still exist)
      var name = document.getElementById('contact-name');
      var email = document.getElementById('contact-email');
      var message = document.getElementById('contact-message');

      // simple client-side required checks to preserve UX
      var hasError = false;
      [name, email, topic, message].forEach(function (field) {
        if (field && field.required && !String(field.value || '').trim()) hasError = true;
      });
      if (hasError) return;

      alert('Thank you! Your message has been sent. We will respond within 24 hours.');
      if (typeof form.reset === 'function') form.reset();
      return;
    }

    // Overlay search submit
    if (form.matches('form[data-action="submit-search"]')) {
      e.preventDefault();
      if (typeof window.submitSearch === 'function') window.submitSearch(e);
      else {
        var input = document.getElementById('overlay-search-input');
        var searchTerm = input ? input.value.trim() : '';
        if (!searchTerm) return;
        window.location.href = 'search.html?' + new URLSearchParams({ q: searchTerm }).toString();
      }
    }
  }, true);
})();
