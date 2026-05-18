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
  var wrapper = document.querySelector('.comparison-builder');
  if (!wrapper) return;

  var compareButtons = document.querySelectorAll('.compare-select-btn');
  compareButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var productName = button.dataset.productName;
      compareProductToggle(productName);
    });
  });

  var clearButtons = wrapper.querySelectorAll('.compare-clear-btn');
  clearButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      clearComparisonSelection();
    });
  });

  var compareActionButtons = wrapper.querySelectorAll('.comparison-action-btn[data-action-type="compare"]');
  compareActionButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      renderComparisonTable();
    });
  });

  renderComparisonTable();
  updateCompareSelectionUI();
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
  var form = document.getElementById('loan-form');
  if (!form) return;
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
  initQuizPage();
  initLoanCalculator();
  initOpenAccountPage();
  initCompareFeature();
  initVideoEngagement();
  initNavigationTracking();
  initDownloadTracking();
  initCTATracking();
  initFormFocusTracking();
  updateDashboardMetrics();
}


document.addEventListener('DOMContentLoaded', init);
