/**
 * ===================================================================
 * M.S TRADERS - SURITOLA, DHAKA
 * Complete Business Ledger: PAWNA (Dues) · DENA (Liabilities) · EXPENSES
 * 100% Free Forever, Persistent Dual-Layer Storage, Zero Entry Barrier
 * ===================================================================
 */

(function () {
  'use strict';

  // Storage Keys
  const STORAGE_KEY_CUSTOMERS = 'ms_traders_customers_v2';
  const STORAGE_KEY_SUPPLIERS = 'ms_traders_suppliers_v2';
  const STORAGE_KEY_EXPENSES = 'ms_traders_expenses_v2';
  const STORAGE_KEY_PIN = 'ms_traders_pin_v1';
  const STORAGE_KEY_THEME = 'ms_traders_theme_v1';
  const STORAGE_KEY_LANG = 'ms_traders_lang_v1';
  const STORAGE_KEY_SUPABASE_URL = 'ms_supabase_url_v1';
  const STORAGE_KEY_SUPABASE_KEY = 'ms_supabase_key_v1';
  const SESSION_AUTH_KEY = 'ms_traders_auth_session';

  const DEFAULT_PIN = '1234';

  // ===================================================================
  // BILINGUAL TRANSLATION DICTIONARY
  // Authentic Old Dhaka Commercial Language & Crisp English
  // ===================================================================
  const i18n = {
    bn: {
      doc_title: 'M.S Traders | দেনা-পাওনা ও ডিজিটাল খাতা',
      shop_sub: 'এম. এস. ট্রেডার্স · সুরিতলা, ঢাকা',
      pin_label: 'পিন কোড দিন (PIN: 1234)',
      pin_error: 'ভুল পিন! সঠিক পিন দিন।',
      num_clear: 'মুছুন',
      num_enter: 'প্রবেশ',
      pin_hint: 'ডিফল্ট পিন: <strong>1234</strong>',

      // 3 Pillars
      lbl_pawna_title: 'মোট পাওনা (PAWNA / Dues)',
      tag_pawna: 'আদায় বাকি',
      note_pawna: 'কাস্টমারদের কাছে আমাদের বাকি পাওনা',

      lbl_dena_title: 'মোট দেনা (DENA / Liabilities)',
      tag_dena: 'পরিশোধ বাকি',
      note_dena: 'মহাজন ও সাপ্লায়ারদের কাছে আমাদের দেনা',

      lbl_cash_title: 'আজকের হাতে ক্যাশ (Net Cash)',
      tag_cash: 'আজকের ক্যাশ',
      note_cash: 'আজকের নগদ আদায় − পরিশোধ ও খরচ',

      // 4 Action Tiles
      btn_sale_text: 'নতুন মাল বিক্রি',
      btn_sale_sub: 'গজ ও গিরা মাপে বাকি বা ক্যাশ',
      btn_pay_text: 'কাস্টমার জমা গ্রহণ',
      btn_pay_sub: 'পাওনা টাকা আদায় এন্ট্রি',
      btn_dena_text: 'মহাজন দেনা এন্ট্রি',
      btn_dena_sub: 'সাপ্লায়ার বা মিল থেকে মাল ক্রয়',
      btn_expense_text: 'দোকান খরচ লিখুন',
      btn_expense_sub: 'চা, লেবার, গাড়ি ভাড়া ইত্যাদি',

      // Tabs
      tab_pawna: '👥 কাস্টমার পাওনা (PAWNA)',
      tab_dena: '🏭 মহাজন দেনা (DENA)',
      tab_expense: '💸 দোকান খরচ (EXPENSES)',

      // Search & Filters
      search_pawna_ph: 'কাস্টমারের নাম বা ফোন লিখুন...',
      search_dena_ph: 'মহাজন বা সাপ্লায়ারের নাম দিয়ে খুঁজুন...',
      pill_all: 'সবাই',
      pill_due: 'বাকি আছে',
      pill_paid: 'পরিশোধিত',

      // Empty states
      empty_pawna_title: 'কোনো কাস্টমার পাওনা নেই',
      empty_pawna_sub: 'উপরে "নতুন মাল বিক্রি" বাটনে চাপ দিয়ে প্রথম হিসাব শুরু করুন।',
      empty_dena_title: 'কোনো মহাজন বা সাপ্লায়ার দেনা নেই',
      empty_dena_sub: 'উপরে "মহাজন দেনা এন্ট্রি" বাটনে চাপ দিয়ে নতুন দেনা হিসাব যোগ করুন।',
      empty_exp_title: 'আজকে কোনো দোকান খরচ লেখা হয়নি',
      empty_exp_sub: 'চা-নাস্তা, পরিবহন বা অন্যান্য খরচ যোগ করতে বাটনে চাপ দিন।',

      // Card Action Buttons
      btn_card_sale: '＋বিক্রি',
      btn_card_pay: '৳জমা',
      btn_card_wa: '💬তাগাদা',
      btn_card_dena_bill: '＋বিল যোগ',
      btn_card_dena_pay: '৳পরিশোধ',
      status_paid: 'পরিশোধিত',
      status_due: 'বাকি',
      status_dena_due: 'দেনা',

      // Expense Strip
      lbl_today_exp: 'আজকের মোট দোকান খরচ',
      btn_add_exp: '＋ খরচ যোগ করুন',

      // Gauze & Ghira Measurement
      measure_preview: (g, gh, y, r, t) => `মোট মাপ: <strong>${g} গজ ${gh} গিরা (${y.toFixed(2)} গজ)</strong>` + (r > 0 ? ` × ৳${r}/গজ = <strong>৳${t.toLocaleString('en-BD')}</strong>` : ''),
      ghira_list: [
        '০ গিরা (পূর্ণ গজ)',
        '১ গিরা (১/১৬)',
        '২ গিরা (১/৮)',
        '৩ গিরা',
        '৪ গিরা (১ পোয়া / ০.২৫)',
        '৫ গিরা',
        '৬ গিরা',
        '৭ গিরা',
        '৮ গিরা (আধা গজ / ০.৫)',
        '৯ গিরা',
        '১০ গিরা',
        '১১ গিরা',
        '১২ গিরা (৩ পোয়া / ০.৭৫)',
        '১৩ গিরা',
        '১৪ গিরা',
        '১৫ গিরা',
        '১৬ গিরা (পূর্ণ ১ গজ)'
      ],

      // WhatsApp Message
      wa_msg: (name, sales, paid, due) => `আসসালামু আলাইকুম ${name} ভাই,\n\nM.S Traders (সুরিতলা, ঢাকা) থেকে আপনার বর্তমান হিসাব বিবরণী:\n• মোট ক্রয়: ৳${sales.toLocaleString('en-BD')}\n• মোট পরিশোধ: ৳${paid.toLocaleString('en-BD')}\n• বর্তমান বাকি পাওনা: *৳${due.toLocaleString('en-BD')}*\n\nঅনুগ্রহ করে সুবিধাজনক সময়ে পরিশোধ করবেন।\n\nধন্যবাদ,\nM.S Traders\nসুরিতলা, ঢাকা।`
    },

    en: {
      doc_title: 'M.S Traders | Receivables & Payables Ledger',
      shop_sub: 'M.S Traders · Suritola, Dhaka',
      pin_label: 'Enter Security PIN (PIN: 1234)',
      pin_error: 'Invalid PIN! Please enter the correct PIN.',
      num_clear: 'Clear',
      num_enter: 'Enter',
      pin_hint: 'Default PIN: <strong>1234</strong>',

      // 3 Pillars
      lbl_pawna_title: 'Total Receivables (PAWNA / Dues)',
      tag_pawna: 'To Collect',
      note_pawna: 'Outstanding money owed to us by customers',

      lbl_dena_title: 'Total Liabilities (DENA / Payables)',
      tag_dena: 'To Pay',
      note_dena: 'Money we owe to suppliers & mills',

      lbl_cash_title: 'Today\'s Net Cash (In Hand)',
      tag_cash: 'Cash Flow',
      note_cash: 'Today\'s cash collections minus payments & expenses',

      // 4 Action Tiles
      btn_sale_text: 'New Customer Sale',
      btn_sale_sub: 'Gauze & Ghira credit or cash sale',
      btn_pay_text: 'Customer Cash In',
      btn_pay_sub: 'Collect customer due settlement',
      btn_dena_text: 'Supplier Liability',
      btn_dena_sub: 'Purchase goods from mill/supplier',
      btn_expense_text: 'Shop Expense',
      btn_expense_sub: 'Tea, labor, transport, rent, bills',

      // Tabs
      tab_pawna: '👥 Receivables (PAWNA)',
      tab_dena: '🏭 Payables (DENA)',
      tab_expense: '💸 Daily Expenses',

      // Search & Filters
      search_pawna_ph: 'Search customer name or phone...',
      search_dena_ph: 'Search supplier or mill name...',
      pill_all: 'All',
      pill_due: 'Due Only',
      pill_paid: 'Settled',

      // Empty states
      empty_pawna_title: 'No Customer Dues',
      empty_pawna_sub: 'Click "New Customer Sale" above to record a transaction.',
      empty_dena_title: 'No Supplier Liabilities',
      empty_dena_sub: 'Click "Supplier Liability" above to record a purchase.',
      empty_exp_title: 'No Expenses Recorded Today',
      empty_exp_sub: 'Record tea, labor, or transport expenses anytime.',

      // Card Action Buttons
      btn_card_sale: '＋Sale',
      btn_card_pay: '৳Pay',
      btn_card_wa: '💬WA',
      btn_card_dena_bill: '＋Bill',
      btn_card_dena_pay: '৳Pay',
      status_paid: 'Settled',
      status_due: 'Due',
      status_dena_due: 'Owed',

      // Expense Strip
      lbl_today_exp: 'Today\'s Total Expenses',
      btn_add_exp: '＋ Add Expense',

      // Gauze & Ghira Measurement
      measure_preview: (g, gh, y, r, t) => `Total Measure: <strong>${g} Yds ${gh} Girah (${y.toFixed(2)} Yds)</strong>` + (r > 0 ? ` × ৳${r}/Yd = <strong>৳${t.toLocaleString('en-BD')}</strong>` : ''),
      ghira_list: [
        '0 Girah (Full Yard)',
        '1 Girah (1/16)',
        '2 Girah (1/8)',
        '3 Girah',
        '4 Girah (1/4 = 0.25)',
        '5 Girah',
        '6 Girah',
        '7 Girah',
        '8 Girah (1/2 = 0.50)',
        '9 Girah',
        '10 Girah',
        '11 Girah',
        '12 Girah (3/4 = 0.75)',
        '13 Girah',
        '14 Girah',
        '15 Girah',
        '16 Girah (Full 1 Yard)'
      ],

      // WhatsApp Message
      wa_msg: (name, sales, paid, due) => `Assalamu Alaikum ${name},\n\nAccount statement from M.S Traders (Suritola, Dhaka):\n• Total Purchases: ৳${sales.toLocaleString('en-BD')}\n• Total Paid: ৳${paid.toLocaleString('en-BD')}\n• Current Outstanding Due: *৳${due.toLocaleString('en-BD')}*\n\nPlease arrange payment at your convenience.\n\nThank you,\nM.S Traders\nSuritola, Dhaka.`
    }
  };

  // Application State
  let state = {
    customers: [],  // PAWNA (Customer Dues)
    suppliers: [],  // DENA (Supplier Liabilities)
    expenses: [],   // DOKAN KHOROCH (Daily Expenses)
    activeTab: 'pawna', // 'pawna' | 'dena' | 'expense'
    pawnaFilter: 'all',
    denaFilter: 'all',
    pawnaSearch: '',
    denaSearch: '',
    selectedPartyId: null,
    selectedSupplierId: null,
    currentTheme: 'light',
    currentLang: 'bn',
  };

  // DOM Elements Cache
  const el = {
    lockScreen: document.getElementById('lockScreen'),
    appContainer: document.getElementById('appContainer'),
    pinInput: document.getElementById('pinInput'),
    pinError: document.getElementById('pinError'),
    togglePinVis: document.getElementById('togglePinVis'),
    numKeys: document.querySelectorAll('.num-key[data-digit]'),
    numClear: document.getElementById('numClear'),
    numEnter: document.getElementById('numEnter'),

    // Top
    langToggleBtn: document.getElementById('langToggleBtn'),
    langLabel: document.getElementById('langLabel'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeIcon: document.getElementById('themeIcon'),
    openSettingsBtn: document.getElementById('openSettingsBtn'),
    lockAppBtn: document.getElementById('lockAppBtn'),
    cloudStatusBadge: document.getElementById('cloudStatusBadge'),
    cloudStatusText: document.getElementById('cloudStatusText'),

    // 3 Pillars
    statPawna: document.getElementById('statPawna'),
    statDena: document.getElementById('statDena'),
    statTodayCash: document.getElementById('statTodayCash'),
    lblPawnaTitle: document.getElementById('lblPawnaTitle'),
    lblDenaTitle: document.getElementById('lblDenaTitle'),
    lblCashTitle: document.getElementById('lblCashTitle'),
    notePawna: document.getElementById('notePawna'),
    noteDena: document.getElementById('noteDena'),
    noteCash: document.getElementById('noteCash'),

    // 4 Action Buttons
    btnQuickSale: document.getElementById('btnQuickSale'),
    btnQuickPayment: document.getElementById('btnQuickPayment'),
    btnQuickSupplierBill: document.getElementById('btnQuickSupplierBill'),
    btnQuickExpense: document.getElementById('btnQuickExpense'),

    // Tabs
    tabPawnaBtn: document.getElementById('tabPawnaBtn'),
    tabDenaBtn: document.getElementById('tabDenaBtn'),
    tabExpenseBtn: document.getElementById('tabExpenseBtn'),
    badgePawnaCount: document.getElementById('badgePawnaCount'),
    badgeDenaCount: document.getElementById('badgeDenaCount'),
    badgeExpenseCount: document.getElementById('badgeExpenseCount'),
    sectionPawna: document.getElementById('sectionPawna'),
    sectionDena: document.getElementById('sectionDena'),
    sectionExpense: document.getElementById('sectionExpense'),

    // Pawna (Customers)
    pawnaSearchInput: document.getElementById('pawnaSearchInput'),
    clearPawnaSearch: document.getElementById('clearPawnaSearch'),
    pillPawnaAll: document.getElementById('pillPawnaAll'),
    pillPawnaDue: document.getElementById('pillPawnaDue'),
    pillPawnaPaid: document.getElementById('pillPawnaPaid'),
    customerListContainer: document.getElementById('customerListContainer'),
    emptyPawnaState: document.getElementById('emptyPawnaState'),

    // Dena (Suppliers)
    denaSearchInput: document.getElementById('denaSearchInput'),
    clearDenaSearch: document.getElementById('clearDenaSearch'),
    pillDenaAll: document.getElementById('pillDenaAll'),
    pillDenaDue: document.getElementById('pillDenaDue'),
    pillDenaPaid: document.getElementById('pillDenaPaid'),
    supplierListContainer: document.getElementById('supplierListContainer'),
    emptyDenaState: document.getElementById('emptyDenaState'),

    // Expenses
    statTodayExpense: document.getElementById('statTodayExpense'),
    expenseListContainer: document.getElementById('expenseListContainer'),
    emptyExpenseState: document.getElementById('emptyExpenseState'),
    btnOpenExpenseModal: document.getElementById('btnOpenExpenseModal'),

    // Sale Modal (Gauze & Ghira)
    saleModal: document.getElementById('saleModal'),
    closeSaleModal: document.getElementById('closeSaleModal'),
    cancelSaleBtn: document.getElementById('cancelSaleBtn'),
    saleForm: document.getElementById('saleForm'),
    custNameInput: document.getElementById('custNameInput'),
    custPhoneInput: document.getElementById('custPhoneInput'),
    nameSuggestions: document.getElementById('nameSuggestions'),
    rexinDescInput: document.getElementById('rexinDescInput'),
    gauzeInput: document.getElementById('gauzeInput'),
    ghiraSelect: document.getElementById('ghiraSelect'),
    ratePerGauzeInput: document.getElementById('ratePerGauzeInput'),
    measureLivePreview: document.getElementById('measureLivePreview'),
    totalAmountInput: document.getElementById('totalAmountInput'),
    paidAmountInput: document.getElementById('paidAmountInput'),
    liveDuePill: document.getElementById('liveDuePill'),
    saleDateInput: document.getElementById('saleDateInput'),
    saleNoteInput: document.getElementById('saleNoteInput'),

    // Customer Payment Modal
    paymentModal: document.getElementById('paymentModal'),
    closePaymentModal: document.getElementById('closePaymentModal'),
    cancelPaymentBtn: document.getElementById('cancelPaymentBtn'),
    paymentForm: document.getElementById('paymentForm'),
    payCustomerSelect: document.getElementById('payCustomerSelect'),
    payAmountInput: document.getElementById('payAmountInput'),
    payMethodSelect: document.getElementById('payMethodSelect'),
    payDateInput: document.getElementById('payDateInput'),
    payNoteInput: document.getElementById('payNoteInput'),

    // Supplier Dena Modal
    supplierModal: document.getElementById('supplierModal'),
    closeSupplierModal: document.getElementById('closeSupplierModal'),
    cancelSupBtn: document.getElementById('cancelSupBtn'),
    supplierForm: document.getElementById('supplierForm'),
    supNameInput: document.getElementById('supNameInput'),
    supPhoneInput: document.getElementById('supPhoneInput'),
    supNameSuggestions: document.getElementById('supNameSuggestions'),
    supItemInput: document.getElementById('supItemInput'),
    supTotalInput: document.getElementById('supTotalInput'),
    supPaidInput: document.getElementById('supPaidInput'),
    liveSupDuePill: document.getElementById('liveSupDuePill'),
    supDateInput: document.getElementById('supDateInput'),
    supNoteInput: document.getElementById('supNoteInput'),

    // Pay Supplier Modal
    paySupplierModal: document.getElementById('paySupplierModal'),
    closePaySupModal: document.getElementById('closePaySupModal'),
    cancelPaySupBtn: document.getElementById('cancelPaySupBtn'),
    paySupForm: document.getElementById('paySupForm'),
    paySupSelect: document.getElementById('paySupSelect'),
    paySupAmountInput: document.getElementById('paySupAmountInput'),
    paySupMethodSelect: document.getElementById('paySupMethodSelect'),
    paySupDateInput: document.getElementById('paySupDateInput'),
    paySupNoteInput: document.getElementById('paySupNoteInput'),

    // Expense Modal
    expenseModal: document.getElementById('expenseModal'),
    closeExpenseModal: document.getElementById('closeExpenseModal'),
    cancelExpenseBtn: document.getElementById('cancelExpenseBtn'),
    expenseForm: document.getElementById('expenseForm'),
    expCatSelect: document.getElementById('expCatSelect'),
    expAmountInput: document.getElementById('expAmountInput'),
    expNoteInput: document.getElementById('expNoteInput'),
    expDateInput: document.getElementById('expDateInput'),

    // Customer Statement Modal
    statementModal: document.getElementById('statementModal'),
    closeStatementModal: document.getElementById('closeStatementModal'),
    stName: document.getElementById('stName'),
    stPhone: document.getElementById('stPhone'),
    stTotalSales: document.getElementById('stTotalSales'),
    stTotalPaid: document.getElementById('stTotalPaid'),
    stTotalDue: document.getElementById('stTotalDue'),
    stAddSaleBtn: document.getElementById('stAddSaleBtn'),
    stAddPayBtn: document.getElementById('stAddPayBtn'),
    stWhatsAppBtn: document.getElementById('stWhatsAppBtn'),
    stPrintBtn: document.getElementById('stPrintBtn'),
    stDeleteBtn: document.getElementById('stDeleteBtn'),
    stTimeline: document.getElementById('stTimeline'),

    // Supplier Statement Modal
    supStatementModal: document.getElementById('supStatementModal'),
    closeSupStatementModal: document.getElementById('closeSupStatementModal'),
    supStName: document.getElementById('supStName'),
    supStPhone: document.getElementById('supStPhone'),
    supStTotalPurchases: document.getElementById('supStTotalPurchases'),
    supStTotalPaid: document.getElementById('supStTotalPaid'),
    supStTotalDue: document.getElementById('supStTotalDue'),
    supStAddBillBtn: document.getElementById('supStAddBillBtn'),
    supStPayBtn: document.getElementById('supStPayBtn'),
    supStDeleteBtn: document.getElementById('supStDeleteBtn'),
    supStTimeline: document.getElementById('supStTimeline'),

    // Settings Modal & Cloud Sync
    settingsModal: document.getElementById('settingsModal'),
    closeSettingsModal: document.getElementById('closeSettingsModal'),
    supabaseUrlInput: document.getElementById('supabaseUrlInput'),
    supabaseKeyInput: document.getElementById('supabaseKeyInput'),
    saveCloudSyncBtn: document.getElementById('saveCloudSyncBtn'),
    disconnectCloudBtn: document.getElementById('disconnectCloudBtn'),
    cloudSyncFeedback: document.getElementById('cloudSyncFeedback'),
    downloadBackupBtn: document.getElementById('downloadBackupBtn'),
    restoreFileInput: document.getElementById('restoreFileInput'),
    oldPinInput: document.getElementById('oldPinInput'),
    newPinInput: document.getElementById('newPinInput'),
    changePinBtn: document.getElementById('changePinBtn'),
    pinChangeFeedback: document.getElementById('pinChangeFeedback'),
    resetAllDataBtn: document.getElementById('resetAllDataBtn'),
    quickBackupBtn: document.getElementById('quickBackupBtn'),
    quickCsvBtn: document.getElementById('quickCsvBtn'),

    // Print Receipt
    printableReceipt: document.getElementById('printableReceipt'),
    prCustName: document.getElementById('prCustName'),
    prDate: document.getElementById('prDate'),
    prPhone: document.getElementById('prPhone'),
    prItemsList: document.getElementById('prItemsList'),
    prTotalSales: document.getElementById('prTotalSales'),
    prTotalPaid: document.getElementById('prTotalPaid'),
    prTotalDue: document.getElementById('prTotalDue'),
  };

  // Helper Formats
  function formatMoney(n) {
    const num = Number(n || 0);
    return '৳' + num.toLocaleString('en-BD', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  function formatNum(n) {
    if (state.currentLang === 'en') return String(n);
    const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return String(n).replace(/[0-9]/g, d => bn[Number(d)]);
  }

  function getTodayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function escape(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ===================================================================
  // CALCULATIONS (PAWNA, DENA & NET CASH IN HAND)
  // ===================================================================
  function getCustomerStats(c) {
    const totalSales = (c.sales || []).reduce((sum, s) => sum + (Number(s.totalAmount) || 0), 0);
    const totalPaid = (c.payments || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const due = Math.max(0, totalSales - totalPaid);
    return { totalSales, totalPaid, due };
  }

  function getSupplierStats(s) {
    const totalPurchases = (s.purchases || []).reduce((sum, p) => sum + (Number(p.totalAmount) || 0), 0);
    const totalPaid = (s.payments || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const due = Math.max(0, totalPurchases - totalPaid);
    return { totalPurchases, totalPaid, due };
  }

  function calculateFinancialTotals() {
    const today = getTodayISO();

    let totalPawna = 0;
    let totalDena = 0;
    let todayCashIn = 0;
    let todayCashOut = 0;
    let todayExpenses = 0;

    // 1. Calculate Pawna (Customer Dues) and Cash In
    state.customers.forEach(c => {
      const st = getCustomerStats(c);
      totalPawna += st.due;

      (c.payments || []).forEach(p => {
        if (p.date === today) todayCashIn += Number(p.amount || 0);
      });
    });

    // 2. Calculate Dena (Supplier Liabilities) and Cash Out
    state.suppliers.forEach(s => {
      const st = getSupplierStats(s);
      totalDena += st.due;

      (s.payments || []).forEach(p => {
        if (p.date === today) todayCashOut += Number(p.amount || 0);
      });
    });

    // 3. Calculate Today's Expenses
    state.expenses.forEach(e => {
      if (e.date === today) {
        todayExpenses += Number(e.amount || 0);
      }
    });

    // Net cash flow today
    const netCashToday = todayCashIn - (todayCashOut + todayExpenses);

    return { totalPawna, totalDena, netCashToday, todayExpenses };
  }

  // ===================================================================
  // DUAL-LAYER PERMANENT STORAGE ENGINE
  // ===================================================================
  function getCloudConfig() {
    return {
      url: (localStorage.getItem(STORAGE_KEY_SUPABASE_URL) || '').trim().replace(/\/+$/, ''),
      key: (localStorage.getItem(STORAGE_KEY_SUPABASE_KEY) || '').trim()
    };
  }

  function isCloudConfigured() {
    const cfg = getCloudConfig();
    return !!(cfg.url && cfg.key);
  }

  function updateCloudBadge(status) {
    if (!el.cloudStatusBadge) return;
    if (status === 'synced') {
      el.cloudStatusBadge.className = 'cloud-badge cloud-synced';
      el.cloudStatusText.textContent = state.currentLang === 'bn' ? '☁️ ক্লাউড লাইভ সিঙ্ক' : '☁️ Cloud Synced';
      el.cloudStatusBadge.title = 'সব ডিভাইসে লাইভ ক্লাউড ডাটাবেস সক্রিয়';
    } else if (status === 'syncing') {
      el.cloudStatusBadge.className = 'cloud-badge';
      el.cloudStatusText.textContent = state.currentLang === 'bn' ? '🔄 সিঙ্ক হচ্ছে...' : '🔄 Syncing...';
    } else {
      el.cloudStatusBadge.className = 'cloud-badge local';
      el.cloudStatusText.textContent = state.currentLang === 'bn' ? 'লোকাল মেমোরি' : 'Local Storage';
      el.cloudStatusBadge.title = 'ডাটা ব্রাউজারে সংরক্ষিত (সেটিংস থেকে ক্লাউড অন করুন)';
    }
  }

  function loadData() {
    // 1. Instant Local Storage Load
    try {
      state.customers = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOMERS) || 'null') || [
        {
          id: 'c-1',
          name: 'আল-আমিন শু ফ্যাক্টরি',
          phone: '01712345678',
          created: new Date().toISOString(),
          sales: [
            { id: 's-1', date: getTodayISO(), itemDesc: '০.৮মিমি কালো রেক্সিন', gauze: 50, ghira: 8, totalYards: 50.5, rate: 220, totalAmount: 11110, note: 'চালান ১০৪' }
          ],
          payments: [
            { id: 'p-1', date: getTodayISO(), amount: 5000, method: 'ক্যাশ (নগদ)', note: 'নগদ জমা' }
          ]
        }
      ];

      state.suppliers = JSON.parse(localStorage.getItem(STORAGE_KEY_SUPPLIERS) || 'null') || [
        {
          id: 'sup-1',
          name: 'মেঘনা রেক্সিন মিলস',
          phone: '01898765432',
          address: 'নারায়ণগঞ্জ',
          created: new Date().toISOString(),
          purchases: [
            { id: 'sp-1', date: getTodayISO(), itemDesc: '১.২মিমি সোফা রেক্সিন ৫০ রোল লট', totalAmount: 45000, note: 'মিল মেমো ৮২০' }
          ],
          payments: [
            { id: 'spp-1', date: getTodayISO(), amount: 20000, method: 'ব্যাংক ট্রান্সফার', note: 'অ্যাডভান্স পেমেন্ট' }
          ]
        }
      ];

      state.expenses = JSON.parse(localStorage.getItem(STORAGE_KEY_EXPENSES) || 'null') || [
        { id: 'exp-1', category: 'চা ও নাস্তা', amount: 150, note: 'দোকানের চা বিল', date: getTodayISO() }
      ];

      saveLocalData();
    } catch (e) {
      console.warn('Storage read error:', e);
    }

    // 2. Background Cloud Sync
    if (isCloudConfigured()) {
      syncDownFromCloud();
    } else {
      updateCloudBadge('local');
    }
  }

  function saveLocalData() {
    localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(state.customers));
    localStorage.setItem(STORAGE_KEY_SUPPLIERS, JSON.stringify(state.suppliers));
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(state.expenses));
  }

  function saveData(syncType = 'all', item = null) {
    saveLocalData();
    if (isCloudConfigured()) {
      syncUpToCloud(syncType, item);
    }
  }

  // Cloud Sync Logic (Supabase REST)
  async function syncDownFromCloud() {
    if (!isCloudConfigured()) return;
    const { url, key } = getCloudConfig();
    updateCloudBadge('syncing');

    try {
      // Fetch customers
      const [resC, resS, resE] = await Promise.all([
        fetch(`${url}/rest/v1/ms_traders_customers?select=*&order=created.desc`, { headers: { apikey: key, Authorization: `Bearer ${key}` } }),
        fetch(`${url}/rest/v1/ms_traders_suppliers?select=*&order=created.desc`, { headers: { apikey: key, Authorization: `Bearer ${key}` } }),
        fetch(`${url}/rest/v1/ms_traders_expenses?select=*&order=created.desc`, { headers: { apikey: key, Authorization: `Bearer ${key}` } }),
      ]);

      if (resC.ok) {
        const rowsC = await resC.json();
        if (Array.isArray(rowsC) && rowsC.length > 0) state.customers = rowsC;
      }
      if (resS.ok) {
        const rowsS = await resS.json();
        if (Array.isArray(rowsS) && rowsS.length > 0) state.suppliers = rowsS;
      }
      if (resE.ok) {
        const rowsE = await resE.json();
        if (Array.isArray(rowsE) && rowsE.length > 0) state.expenses = rowsE;
      }

      saveLocalData();
      renderAll();
      updateCloudBadge('synced');
    } catch (err) {
      console.warn('Cloud sync down error:', err);
      updateCloudBadge('local');
    }
  }

  async function syncUpToCloud(syncType, item) {
    if (!isCloudConfigured()) return;
    const { url, key } = getCloudConfig();

    try {
      if (syncType === 'customer' && item) {
        await fetch(`${url}/rest/v1/ms_traders_customers`, {
          method: 'POST',
          headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' },
          body: JSON.stringify(item)
        });
      } else if (syncType === 'supplier' && item) {
        await fetch(`${url}/rest/v1/ms_traders_suppliers`, {
          method: 'POST',
          headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' },
          body: JSON.stringify(item)
        });
      } else if (syncType === 'expense' && item) {
        await fetch(`${url}/rest/v1/ms_traders_expenses`, {
          method: 'POST',
          headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' },
          body: JSON.stringify(item)
        });
      } else {
        // Bulk Sync All
        if (state.customers.length) {
          await fetch(`${url}/rest/v1/ms_traders_customers`, { method: 'POST', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' }, body: JSON.stringify(state.customers) });
        }
        if (state.suppliers.length) {
          await fetch(`${url}/rest/v1/ms_traders_suppliers`, { method: 'POST', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' }, body: JSON.stringify(state.suppliers) });
        }
      }
      updateCloudBadge('synced');
    } catch (err) {
      console.warn('Cloud upload error:', err);
    }
  }

  async function deleteCloudRecord(table, id) {
    if (!isCloudConfigured()) return;
    const { url, key } = getCloudConfig();
    try {
      await fetch(`${url}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { apikey: key, Authorization: `Bearer ${key}` }
      });
    } catch (e) {
      console.warn('Cloud delete error:', e);
    }
  }

  // ===================================================================
  // GAUZE & GHIRA MEASURE ENGINE
  // ===================================================================
  function calculateMeasure() {
    const gauze = parseFloat(el.gauzeInput.value) || 0;
    const ghira = parseInt(el.ghiraSelect.value, 10) || 0;
    const rate = parseFloat(el.ratePerGauzeInput.value) || 0;

    const totalYards = gauze + (ghira / 16);
    const calculatedTotal = rate > 0 ? Math.round(totalYards * rate) : 0;

    if (rate > 0) {
      el.totalAmountInput.value = calculatedTotal;
    }

    const L = i18n[state.currentLang];
    el.measureLivePreview.innerHTML = L.measure_preview(gauze, ghira, totalYards, rate, calculatedTotal);
    updateDueCalculation();
  }

  function updateDueCalculation() {
    const total = parseFloat(el.totalAmountInput.value) || 0;
    const paid = parseFloat(el.paidAmountInput.value) || 0;
    const due = Math.max(0, total - paid);
    el.liveDuePill.textContent = formatMoney(due);
  }

  function updateSupDueCalculation() {
    const total = parseFloat(el.supTotalInput.value) || 0;
    const paid = parseFloat(el.supPaidInput.value) || 0;
    const due = Math.max(0, total - paid);
    el.liveSupDuePill.textContent = formatMoney(due);
  }

  // ===================================================================
  // DASHBOARD RENDERING
  // ===================================================================
  function renderAll() {
    const totals = calculateFinancialTotals();

    // 1. The 3 Financial Pillars
    el.statPawna.textContent = formatMoney(totals.totalPawna);
    el.statDena.textContent = formatMoney(totals.totalDena);
    el.statTodayCash.textContent = formatMoney(totals.netCashToday);

    // Badges on tabs
    el.badgePawnaCount.textContent = formatNum(state.customers.length);
    el.badgeDenaCount.textContent = formatNum(state.suppliers.length);
    el.badgeExpenseCount.textContent = formatNum(state.expenses.filter(e => e.date === getTodayISO()).length);

    // 2. Render Active Tab Content
    if (state.activeTab === 'pawna') {
      renderPawnaList();
    } else if (state.activeTab === 'dena') {
      renderDenaList();
    } else if (state.activeTab === 'expense') {
      renderExpenseList(totals.todayExpenses);
    }
  }

  // RENDER PAWNA (CUSTOMERS)
  function renderPawnaList() {
    const L = i18n[state.currentLang];
    const q = (state.pawnaSearch || '').trim().toLowerCase();
    const filter = state.pawnaFilter;

    let filtered = state.customers.filter(c => {
      const match = !q || c.name.toLowerCase().includes(q) || c.phone.includes(q);
      if (!match) return false;
      const st = getCustomerStats(c);
      if (filter === 'due') return st.due > 0;
      if (filter === 'paid') return st.due === 0;
      return true;
    });

    filtered.sort((a, b) => getCustomerStats(b).due - getCustomerStats(a).due);

    if (filtered.length === 0) {
      el.customerListContainer.innerHTML = '';
      el.emptyPawnaState.classList.remove('hidden');
      return;
    }
    el.emptyPawnaState.classList.add('hidden');

    el.customerListContainer.innerHTML = filtered.map(c => {
      const st = getCustomerStats(c);
      const isPaid = st.due === 0;

      return `
        <div class="party-card" data-id="${escape(c.id)}" data-label="Customer">
          <div class="party-card-left">
            <span class="party-name">${escape(c.name)}</span>
            <span class="party-phone">📞 ${escape(c.phone)} · 📍 ${escape(c.address || 'সুরিতলা')}</span>
          </div>

          <div class="party-card-center">
            <span class="party-due-amount tabular-nums ${isPaid ? 'text-cash' : 'text-pawna'}">${formatMoney(st.due)}</span>
            <span class="party-due-status badge-pill ${isPaid ? 'cash-tag' : 'pawna-tag'}">
              ${isPaid ? L.status_paid : L.status_due}
            </span>
          </div>

          <div class="party-card-actions" onclick="event.stopPropagation()">
            <button type="button" class="btn-card-action btn-cust-sale" data-id="${escape(c.id)}">${L.btn_card_sale}</button>
            <button type="button" class="btn-card-action btn-cust-pay" data-id="${escape(c.id)}">${L.btn_card_pay}</button>
            <button type="button" class="btn-card-action btn-wa" data-id="${escape(c.id)}">${L.btn_card_wa}</button>
          </div>
        </div>
      `;
    }).join('');

    // Attach row events
    el.customerListContainer.querySelectorAll('.party-card').forEach(card => {
      card.addEventListener('click', () => openCustomerStatement(card.dataset.id));
    });
    el.customerListContainer.querySelectorAll('.btn-cust-sale').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); openSaleModal(btn.dataset.id); });
    });
    el.customerListContainer.querySelectorAll('.btn-cust-pay').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); openPaymentModal(btn.dataset.id); });
    });
    el.customerListContainer.querySelectorAll('.btn-wa').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); sendWhatsApp(btn.dataset.id); });
    });
  }

  // RENDER DENA (SUPPLIERS)
  function renderDenaList() {
    const L = i18n[state.currentLang];
    const q = (state.denaSearch || '').trim().toLowerCase();
    const filter = state.denaFilter;

    let filtered = state.suppliers.filter(s => {
      const match = !q || s.name.toLowerCase().includes(q) || s.phone.includes(q);
      if (!match) return false;
      const st = getSupplierStats(s);
      if (filter === 'due') return st.due > 0;
      if (filter === 'paid') return st.due === 0;
      return true;
    });

    filtered.sort((a, b) => getSupplierStats(b).due - getSupplierStats(a).due);

    if (filtered.length === 0) {
      el.supplierListContainer.innerHTML = '';
      el.emptyDenaState.classList.remove('hidden');
      return;
    }
    el.emptyDenaState.classList.add('hidden');

    el.supplierListContainer.innerHTML = filtered.map(s => {
      const st = getSupplierStats(s);
      const isPaid = st.due === 0;

      return `
        <div class="party-card supplier-card" data-id="${escape(s.id)}" data-label="Supplier">
          <div class="party-card-left">
            <span class="party-name">🏭 ${escape(s.name)}</span>
            <span class="party-phone">📞 ${escape(s.phone)} · 📍 ${escape(s.address || 'সাপ্লায়ার/মিল')}</span>
          </div>

          <div class="party-card-center">
            <span class="party-due-amount tabular-nums ${isPaid ? 'text-cash' : 'text-dena'}">${formatMoney(st.due)}</span>
            <span class="party-due-status badge-pill ${isPaid ? 'cash-tag' : 'dena-tag'}">
              ${isPaid ? L.status_paid : L.status_dena_due}
            </span>
          </div>

          <div class="party-card-actions" onclick="event.stopPropagation()">
            <button type="button" class="btn-card-action btn-sup-bill" data-id="${escape(s.id)}">${L.btn_card_dena_bill}</button>
            <button type="button" class="btn-card-action btn-sup-pay" data-id="${escape(s.id)}">${L.btn_card_dena_pay}</button>
          </div>
        </div>
      `;
    }).join('');

    el.supplierListContainer.querySelectorAll('.party-card').forEach(card => {
      card.addEventListener('click', () => openSupplierStatement(card.dataset.id));
    });
    el.supplierListContainer.querySelectorAll('.btn-sup-bill').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); openSupplierModal(btn.dataset.id); });
    });
    el.supplierListContainer.querySelectorAll('.btn-sup-pay').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); openPaySupplierModal(btn.dataset.id); });
    });
  }

  // RENDER EXPENSES
  function renderExpenseList(todayTotal) {
    el.statTodayExpense.textContent = formatMoney(todayTotal);
    const sorted = [...state.expenses].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    if (sorted.length === 0) {
      el.expenseListContainer.innerHTML = '';
      el.emptyExpenseState.classList.remove('hidden');
      return;
    }
    el.emptyExpenseState.classList.add('hidden');

    el.expenseListContainer.innerHTML = sorted.map(e => `
      <div class="exp-item-row" data-label="Expense">
        <div>
          <span class="exp-cat-badge">${escape(e.category)}</span>
          <strong style="margin-left: 8px; font-size: 13px;">${escape(e.note || e.category)}</strong>
          <small style="display:block; color:var(--text-muted); font-size: 11px; margin-top:2px;">${e.date}</small>
        </div>
        <div>
          <strong class="text-pawna tabular-nums" style="font-size: 16px;">−${formatMoney(e.amount)}</strong>
        </div>
      </div>
    `).join('');
  }

  // Switch Segmented Tabs
  function switchTab(tab) {
    state.activeTab = tab;
    el.tabPawnaBtn.classList.toggle('active', tab === 'pawna');
    el.tabDenaBtn.classList.toggle('active', tab === 'dena');
    el.tabExpenseBtn.classList.toggle('active', tab === 'expense');

    const mPawna = document.getElementById('mobileTabPawna');
    const mDena = document.getElementById('mobileTabDena');
    const mExp = document.getElementById('mobileTabExpense');
    if (mPawna) mPawna.classList.toggle('active', tab === 'pawna');
    if (mDena) mDena.classList.toggle('active', tab === 'dena');
    if (mExp) mExp.classList.toggle('active', tab === 'expense');

    el.sectionPawna.classList.toggle('hidden', tab !== 'pawna');
    el.sectionDena.classList.toggle('hidden', tab !== 'dena');
    el.sectionExpense.classList.toggle('hidden', tab !== 'expense');

    renderAll();
  }

  // ===================================================================
  // MODAL ACTIONS: PAWNA (SALE & CUSTOMER PAYMENT)
  // ===================================================================
  function openSaleModal(customerId = null) {
    el.saleForm.reset();
    el.gauzeInput.value = '1';
    el.ghiraSelect.value = '0';
    el.ratePerGauzeInput.value = '';
    el.totalAmountInput.value = '0';
    el.paidAmountInput.value = '0';
    el.saleDateInput.value = getTodayISO();

    if (customerId) {
      const c = state.customers.find(x => x.id === customerId);
      if (c) {
        el.custNameInput.value = c.name;
        el.custPhoneInput.value = c.phone;
      }
    }

    calculateMeasure();
    el.saleModal.classList.remove('hidden');
    el.custNameInput.focus();
  }

  function closeSaleModal() {
    el.saleModal.classList.add('hidden');
    el.nameSuggestions.classList.add('hidden');
  }

  function handleSaveSale(e) {
    e.preventDefault();
    const name = el.custNameInput.value.trim();
    const phone = el.custPhoneInput.value.trim();
    const itemDesc = el.rexinDescInput.value.trim() || 'রেক্সিন';
    const gauze = parseFloat(el.gauzeInput.value) || 0;
    const ghira = parseInt(el.ghiraSelect.value, 10) || 0;
    const rate = parseFloat(el.ratePerGauzeInput.value) || 0;
    const totalAmount = parseFloat(el.totalAmountInput.value) || 0;
    const paidAmount = parseFloat(el.paidAmountInput.value) || 0;
    const saleDate = el.saleDateInput.value || getTodayISO();
    const saleNote = el.saleNoteInput.value.trim();

    if (!name || !phone) {
      alert('নাম ও মোবাইল নম্বর আবশ্যক!');
      return;
    }

    const totalYards = gauze + (ghira / 16);
    const newSale = {
      id: 's-' + Date.now(),
      date: saleDate,
      itemDesc,
      gauze,
      ghira,
      totalYards: parseFloat(totalYards.toFixed(4)),
      rate,
      totalAmount,
      note: saleNote
    };

    let customer = state.customers.find(c => c.phone === phone || c.name.toLowerCase() === name.toLowerCase());

    if (customer) {
      customer.name = name;
      customer.phone = phone;
      customer.sales = customer.sales || [];
      customer.sales.push(newSale);
      if (paidAmount > 0) {
        customer.payments = customer.payments || [];
        customer.payments.push({ id: 'p-' + Date.now(), date: saleDate, amount: paidAmount, method: 'ক্যাশ (নগদ)', note: 'বিক্রির সময় নগদ জমা' });
      }
    } else {
      customer = {
        id: 'c-' + Date.now(),
        name,
        phone,
        address: 'সুরিতলা, ঢাকা',
        created: new Date().toISOString(),
        sales: [newSale],
        payments: []
      };
      if (paidAmount > 0) {
        customer.payments.push({ id: 'p-' + Date.now(), date: saleDate, amount: paidAmount, method: 'ক্যাশ (নগদ)', note: 'বিক্রির সময় নগদ জমা' });
      }
      state.customers.push(customer);
    }

    saveData('customer', customer);
    closeSaleModal();
    renderAll();
    if (state.selectedPartyId === customer.id) openCustomerStatement(customer.id);
  }

  function openPaymentModal(customerId = null) {
    el.paymentForm.reset();
    el.payDateInput.value = getTodayISO();

    el.payCustomerSelect.innerHTML = state.customers.map(c => {
      const st = getCustomerStats(c);
      return `<option value="${escape(c.id)}">${escape(c.name)} (পাওনা: ${formatMoney(st.due)})</option>`;
    }).join('');

    if (customerId) el.payCustomerSelect.value = customerId;
    el.paymentModal.classList.remove('hidden');
    el.payAmountInput.focus();
  }

  function closePaymentModal() { el.paymentModal.classList.add('hidden'); }

  function handleSavePayment(e) {
    e.preventDefault();
    const customerId = el.payCustomerSelect.value;
    const amount = parseFloat(el.payAmountInput.value) || 0;
    const method = el.payMethodSelect.value;
    const date = el.payDateInput.value || getTodayISO();
    const note = el.payNoteInput.value.trim();

    if (amount <= 0) { alert('সঠিক টাকার পরিমাণ লিখুন!'); return; }
    const customer = state.customers.find(c => c.id === customerId);
    if (!customer) return;

    customer.payments = customer.payments || [];
    customer.payments.push({ id: 'p-' + Date.now(), date, amount, method, note });

    saveData('customer', customer);
    closePaymentModal();
    renderAll();
    if (state.selectedPartyId === customer.id) openCustomerStatement(customer.id);
  }

  // ===================================================================
  // MODAL ACTIONS: DENA (SUPPLIER PURCHASE & PAYMENTS)
  // ===================================================================
  function openSupplierModal(supplierId = null) {
    el.supplierForm.reset();
    el.supTotalInput.value = '0';
    el.supPaidInput.value = '0';
    el.supDateInput.value = getTodayISO();
    updateSupDueCalculation();

    if (supplierId) {
      const s = state.suppliers.find(x => x.id === supplierId);
      if (s) {
        el.supNameInput.value = s.name;
        el.supPhoneInput.value = s.phone;
      }
    }

    el.supplierModal.classList.remove('hidden');
    el.supNameInput.focus();
  }

  function closeSupplierModal() { el.supplierModal.classList.add('hidden'); }

  function handleSaveSupplierBill(e) {
    e.preventDefault();
    const name = el.supNameInput.value.trim();
    const phone = el.supPhoneInput.value.trim();
    const itemDesc = el.supItemInput.value.trim() || 'রেক্সিন মাল ক্রয়';
    const totalAmount = parseFloat(el.supTotalInput.value) || 0;
    const paidAmount = parseFloat(el.supPaidInput.value) || 0;
    const date = el.supDateInput.value || getTodayISO();
    const note = el.supNoteInput.value.trim();

    if (!name || !phone) { alert('সাপ্লায়ারের নাম ও মোবাইল নম্বর আবশ্যক!'); return; }

    const newPurchase = {
      id: 'sp-' + Date.now(),
      date,
      itemDesc,
      totalAmount,
      note
    };

    let supplier = state.suppliers.find(s => s.phone === phone || s.name.toLowerCase() === name.toLowerCase());

    if (supplier) {
      supplier.name = name;
      supplier.phone = phone;
      supplier.purchases = supplier.purchases || [];
      supplier.purchases.push(newPurchase);
      if (paidAmount > 0) {
        supplier.payments = supplier.payments || [];
        supplier.payments.push({ id: 'spp-' + Date.now(), date, amount: paidAmount, method: 'ক্যাশ (নগদ)', note: 'মাল কেনার সময় জমা' });
      }
    } else {
      supplier = {
        id: 'sup-' + Date.now(),
        name,
        phone,
        address: 'সাপ্লায়ার / মিল',
        created: new Date().toISOString(),
        purchases: [newPurchase],
        payments: []
      };
      if (paidAmount > 0) {
        supplier.payments.push({ id: 'spp-' + Date.now(), date, amount: paidAmount, method: 'ক্যাশ (নগদ)', note: 'মাল কেনার সময় জমা' });
      }
      state.suppliers.push(supplier);
    }

    saveData('supplier', supplier);
    closeSupplierModal();
    renderAll();
    if (state.selectedSupplierId === supplier.id) openSupplierStatement(supplier.id);
  }

  function openPaySupplierModal(supplierId = null) {
    el.paySupForm.reset();
    el.paySupDateInput.value = getTodayISO();

    el.paySupSelect.innerHTML = state.suppliers.map(s => {
      const st = getSupplierStats(s);
      return `<option value="${escape(s.id)}">${escape(s.name)} (দেনা: ${formatMoney(st.due)})</option>`;
    }).join('');

    if (supplierId) el.paySupSelect.value = supplierId;
    el.paySupplierModal.classList.remove('hidden');
    el.paySupAmountInput.focus();
  }

  function closePaySupModal() { el.paySupplierModal.classList.add('hidden'); }

  function handleSaveSupplierPayment(e) {
    e.preventDefault();
    const supplierId = el.paySupSelect.value;
    const amount = parseFloat(el.paySupAmountInput.value) || 0;
    const method = el.paySupMethodSelect.value;
    const date = el.paySupDateInput.value || getTodayISO();
    const note = el.paySupNoteInput.value.trim();

    if (amount <= 0) { alert('সঠিক টাকার পরিমাণ লিখুন!'); return; }
    const supplier = state.suppliers.find(s => s.id === supplierId);
    if (!supplier) return;

    supplier.payments = supplier.payments || [];
    supplier.payments.push({ id: 'spp-' + Date.now(), date, amount, method, note });

    saveData('supplier', supplier);
    closePaySupModal();
    renderAll();
    if (state.selectedSupplierId === supplier.id) openSupplierStatement(supplier.id);
  }

  // ===================================================================
  // MODAL ACTIONS: DAILY EXPENSES (দোকান খরচ)
  // ===================================================================
  function openExpenseModal() {
    el.expenseForm.reset();
    el.expDateInput.value = getTodayISO();
    el.expenseModal.classList.remove('hidden');
    el.expAmountInput.focus();
  }

  function closeExpenseModal() { el.expenseModal.classList.add('hidden'); }

  function handleSaveExpense(e) {
    e.preventDefault();
    const category = el.expCatSelect.value;
    const amount = parseFloat(el.expAmountInput.value) || 0;
    const note = el.expNoteInput.value.trim();
    const date = el.expDateInput.value || getTodayISO();

    if (amount <= 0) { alert('সঠিক খরচের টাকা লিখুন!'); return; }

    const newExp = {
      id: 'exp-' + Date.now(),
      category,
      amount,
      note,
      date,
      created: new Date().toISOString()
    };

    state.expenses.unshift(newExp);
    saveData('expense', newExp);
    closeExpenseModal();
    renderAll();
  }

  // ===================================================================
  // STATEMENTS: CUSTOMER & SUPPLIER
  // ===================================================================
  function openCustomerStatement(customerId) {
    const customer = state.customers.find(c => c.id === customerId);
    if (!customer) return;
    state.selectedPartyId = customerId;
    const st = getCustomerStats(customer);

    el.stName.textContent = customer.name;
    el.stPhone.textContent = '📞 ' + customer.phone;
    el.stTotalSales.textContent = formatMoney(st.totalSales);
    el.stTotalPaid.textContent = formatMoney(st.totalPaid);
    el.stTotalDue.textContent = formatMoney(st.due);

    const allEvents = [];
    (customer.sales || []).forEach(s => allEvents.push({ type: 'sale', date: s.date, data: s }));
    (customer.payments || []).forEach(p => allEvents.push({ type: 'payment', date: p.date, data: p }));
    allEvents.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    if (allEvents.length === 0) {
      el.stTimeline.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-muted);">কোনো লেনদেনের রেকর্ড নেই।</div>`;
    } else {
      el.stTimeline.innerHTML = allEvents.map(ev => {
        if (ev.type === 'sale') {
          const s = ev.data;
          const uG = state.currentLang === 'bn' ? 'গজ' : 'Yds';
          const uGh = state.currentLang === 'bn' ? 'গিরা' : 'Girah';
          return `
            <div class="timeline-item">
              <div>
                <strong>📦 ${escape(s.itemDesc || 'রেক্সিন মাল')}</strong>
                <small style="display:block;color:var(--text-muted);">${ev.date} · ${s.gauze || 0} ${uG} ${s.ghira || 0} ${uGh} ${s.rate ? '@ ৳' + s.rate : ''}</small>
              </div>
              <div style="text-align:right;">
                <span class="text-pawna" style="font-size:14px;font-weight:700;font-family:var(--font-mono);">＋${formatMoney(s.totalAmount)}</span>
                <small style="display:block;color:var(--text-faint);">${escape(s.note || '')}</small>
              </div>
            </div>
          `;
        } else {
          const p = ev.data;
          return `
            <div class="timeline-item" style="border-left: 3px solid var(--cash-color);">
              <div>
                <strong class="text-cash">৳ জমা পরিশোধ (${escape(p.method || 'ক্যাশ')})</strong>
                <small style="display:block;color:var(--text-muted);">${ev.date} · ${escape(p.note || 'নগদ জমা')}</small>
              </div>
              <div style="text-align:right;">
                <span class="text-cash" style="font-size:14px;font-weight:700;font-family:var(--font-mono);">−${formatMoney(p.amount)}</span>
              </div>
            </div>
          `;
        }
      }).join('');
    }

    el.statementModal.classList.remove('hidden');
  }

  function openSupplierStatement(supplierId) {
    const supplier = state.suppliers.find(s => s.id === supplierId);
    if (!supplier) return;
    state.selectedSupplierId = supplierId;
    const st = getSupplierStats(supplier);

    el.supStName.textContent = supplier.name;
    el.supStPhone.textContent = '📞 ' + supplier.phone;
    el.supStTotalPurchases.textContent = formatMoney(st.totalPurchases);
    el.supStTotalPaid.textContent = formatMoney(st.totalPaid);
    el.supStTotalDue.textContent = formatMoney(st.due);

    const allEvents = [];
    (supplier.purchases || []).forEach(p => allEvents.push({ type: 'purchase', date: p.date, data: p }));
    (supplier.payments || []).forEach(p => allEvents.push({ type: 'payment', date: p.date, data: p }));
    allEvents.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    if (allEvents.length === 0) {
      el.supStTimeline.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-muted);">কোনো লেনদেনের রেকর্ড নেই।</div>`;
    } else {
      el.supStTimeline.innerHTML = allEvents.map(ev => {
        if (ev.type === 'purchase') {
          const p = ev.data;
          return `
            <div class="timeline-item" style="border-left: 3px solid var(--dena-color);">
              <div>
                <strong class="text-dena">🏭 ${escape(p.itemDesc || 'মাল ক্রয়')}</strong>
                <small style="display:block;color:var(--text-muted);">${ev.date} · ${escape(p.note || 'চালান')}</small>
              </div>
              <div style="text-align:right;">
                <span class="text-dena" style="font-size:14px;font-weight:700;font-family:var(--font-mono);">＋${formatMoney(p.totalAmount)}</span>
              </div>
            </div>
          `;
        } else {
          const p = ev.data;
          return `
            <div class="timeline-item" style="border-left: 3px solid var(--cash-color);">
              <div>
                <strong class="text-cash">৳ দেনা পরিশোধ (${escape(p.method || 'ব্যাংক/ক্যাশ')})</strong>
                <small style="display:block;color:var(--text-muted);">${ev.date} · ${escape(p.note || 'পরিশোধ')}</small>
              </div>
              <div style="text-align:right;">
                <span class="text-cash" style="font-size:14px;font-weight:700;font-family:var(--font-mono);">−${formatMoney(p.amount)}</span>
              </div>
            </div>
          `;
        }
      }).join('');
    }

    el.supStatementModal.classList.remove('hidden');
  }

  function sendWhatsApp(customerId) {
    const customer = state.customers.find(c => c.id === customerId);
    if (!customer) return;
    const st = getCustomerStats(customer);
    if (st.due <= 0) { alert('এই কাস্টমারের কোনো বাকি নেই!'); return; }

    let phone = customer.phone.replace(/[^0-9]/g, '');
    if (phone.startsWith('01')) phone = '88' + phone;

    const msg = i18n[state.currentLang].wa_msg(customer.name, st.totalSales, st.totalPaid, st.due);
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function triggerPrint() {
    const customer = state.customers.find(c => c.id === state.selectedPartyId);
    if (!customer) return;
    const st = getCustomerStats(customer);

    el.prCustName.textContent = customer.name;
    el.prPhone.textContent = customer.phone;
    el.prDate.textContent = new Date().toLocaleDateString(state.currentLang === 'bn' ? 'bn-BD' : 'en-US');

    el.prItemsList.innerHTML = (customer.sales || []).map(s => `
      <tr>
        <td>${escape(s.itemDesc || 'রেক্সিন')}</td>
        <td>${s.gauze || 0} গজ ${s.ghira || 0} গিরা</td>
        <td style="text-align:right">${s.rate ? '৳' + s.rate : '—'}</td>
        <td style="text-align:right">${formatMoney(s.totalAmount)}</td>
      </tr>
    `).join('');

    el.prTotalSales.textContent = formatMoney(st.totalSales);
    el.prTotalPaid.textContent = formatMoney(st.totalPaid);
    el.prTotalDue.textContent = formatMoney(st.due);

    window.print();
  }

  // ===================================================================
  // BACKUP & RESTORE (CUSTOMERS + SUPPLIERS + EXPENSES)
  // ===================================================================
  function downloadBackup() {
    const backupObj = {
      shop: 'M.S Traders',
      location: 'Suritola, Dhaka',
      exportedAt: new Date().toISOString(),
      customers: state.customers,
      suppliers: state.suppliers,
      expenses: state.expenses
    };

    const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ms-traders-complete-khata-${getTodayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function restoreBackup(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (parsed.customers) state.customers = parsed.customers;
        if (parsed.suppliers) state.suppliers = parsed.suppliers;
        if (parsed.expenses) state.expenses = parsed.expenses;

        saveData('all');
        renderAll();
        alert('সম্পূর্ণ ব্যাকআপ সফলভাবে পুনরুদ্ধার হয়েছে!');
        el.settingsModal.classList.add('hidden');
      } catch {
        alert('ভুল ব্যাকআপ ফাইল!');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  }

  function exportCsv() {
    const headers = ['Category', 'Name', 'Phone', 'Purchases / Sales', 'Paid', 'Current Due / Dena'];
    const rows = [
      ...state.customers.map(c => {
        const st = getCustomerStats(c);
        return ['PAWNA (Customer)', `"${c.name}"`, `"${c.phone}"`, st.totalSales, st.totalPaid, st.due];
      }),
      ...state.suppliers.map(s => {
        const st = getSupplierStats(s);
        return ['DENA (Supplier)', `"${s.name}"`, `"${s.phone}"`, st.totalPurchases, st.totalPaid, st.due];
      })
    ];

    const csv = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ms-traders-ledger-${getTodayISO()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ===================================================================
  // LANGUAGE & THEME
  // ===================================================================
  function setLanguage(lang) {
    state.currentLang = lang;
    localStorage.setItem(STORAGE_KEY_LANG, lang);
    document.documentElement.lang = lang;
    el.langLabel.textContent = lang === 'bn' ? 'English' : 'বাংলা';
    applyLanguageDOM();
    renderAll();
    calculateMeasure();
  }

  function applyLanguageDOM() {
    const L = i18n[state.currentLang];
    document.title = L.doc_title;
    document.querySelector('.shop-sub').textContent = L.shop_sub;
    el.lblPawnaTitle.textContent = L.lbl_pawna_title;
    document.querySelector('.pawna-tag').textContent = L.tag_pawna;
    el.notePawna.textContent = L.note_pawna;

    el.lblDenaTitle.textContent = L.lbl_dena_title;
    document.querySelector('.dena-tag').textContent = L.tag_dena;
    el.noteDena.textContent = L.note_dena;

    el.lblCashTitle.textContent = L.lbl_cash_title;
    document.querySelector('.cash-tag').textContent = L.tag_cash;
    el.noteCash.textContent = L.note_cash;

    document.getElementById('btnSaleText').textContent = L.btn_sale_text;
    document.getElementById('btnSaleSub').textContent = L.btn_sale_sub;
    document.getElementById('btnPayText').textContent = L.btn_pay_text;
    document.getElementById('btnPaySub').textContent = L.btn_pay_sub;
    document.getElementById('btnDenaText').textContent = L.btn_dena_text;
    document.getElementById('btnDenaSub').textContent = L.btn_dena_sub;
    document.getElementById('btnExpenseText').textContent = L.btn_expense_text;
    document.getElementById('btnExpenseSub').textContent = L.btn_expense_sub;

    el.tabPawnaBtn.querySelector('span:first-child').textContent = L.tab_pawna;
    el.tabDenaBtn.querySelector('span:first-child').textContent = L.tab_dena;
    el.tabExpenseBtn.querySelector('span:first-child').textContent = L.tab_expense;

    el.pawnaSearchInput.placeholder = L.search_pawna_ph;
    el.denaSearchInput.placeholder = L.search_dena_ph;
    el.pillPawnaAll.textContent = L.pill_all;
    el.pillPawnaDue.textContent = L.pill_due;
    el.pillPawnaPaid.textContent = L.pill_paid;
    el.pillDenaAll.textContent = L.pill_all;
    el.pillDenaDue.textContent = L.pill_due;
    el.pillDenaPaid.textContent = L.pill_paid;

    document.getElementById('emptyPawnaTitle').textContent = L.empty_pawna_title;
    document.getElementById('emptyPawnaSub').textContent = L.empty_pawna_sub;
    document.getElementById('emptyDenaTitle').textContent = L.empty_dena_title;
    document.getElementById('emptyDenaSub').textContent = L.empty_dena_sub;
    document.getElementById('emptyExpenseTitle').textContent = L.empty_exp_title;
    document.getElementById('emptyExpenseSub').textContent = L.empty_exp_sub;

    document.getElementById('lblTodayExpTitle').textContent = L.lbl_today_exp;
    el.btnOpenExpenseModal.textContent = L.btn_add_exp;

    // Ghira Options
    const curGhira = el.ghiraSelect.value;
    el.ghiraSelect.innerHTML = L.ghira_list.map((txt, i) => `<option value="${i}">${txt}</option>`).join('');
    el.ghiraSelect.value = curGhira;
  }

  function setTheme(t) {
    state.currentTheme = t;
    localStorage.setItem(STORAGE_KEY_THEME, t);
    document.body.classList.toggle('theme-dark', t === 'dark');
    document.body.classList.toggle('theme-light', t !== 'dark');
    el.themeIcon.textContent = t === 'dark' ? '☀️' : '🌙';
    const mobileThemeBtn = document.getElementById('mobileThemeBtn');
    if (mobileThemeBtn) mobileThemeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
  }

  // ===================================================================
  // PIN & AUTHENTICATION
  // ===================================================================
  function attemptUnlock() {
    const pin = el.pinInput.value.trim();
    const correct = localStorage.getItem(STORAGE_KEY_PIN) || DEFAULT_PIN;
    if (pin === correct) {
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      el.lockScreen.classList.add('hidden');
      el.appContainer.classList.remove('hidden');
      el.pinError.classList.add('hidden');
      el.pinInput.value = '';
      renderAll();
    } else {
      el.pinError.classList.remove('hidden');
      el.pinInput.value = '';
      el.pinInput.focus();
    }
  }

  function lockApp() {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    el.appContainer.classList.add('hidden');
    el.lockScreen.classList.remove('hidden');
    el.pinInput.value = '';
    el.pinError.classList.add('hidden');
    el.pinInput.focus();
  }

  // ===================================================================
  // EVENT BINDINGS
  // ===================================================================
  function bindEvents() {
    // PIN Pad
    el.numKeys.forEach(btn => btn.addEventListener('click', () => { if (el.pinInput.value.length < 8) el.pinInput.value += btn.dataset.digit; }));
    el.numClear.addEventListener('click', () => { el.pinInput.value = ''; el.pinError.classList.add('hidden'); });
    el.numEnter.addEventListener('click', attemptUnlock);
    el.pinInput.addEventListener('keydown', e => { if (e.key === 'Enter') attemptUnlock(); });
    el.togglePinVis.addEventListener('click', () => { el.pinInput.type = el.pinInput.type === 'password' ? 'text' : 'password'; });

    // Top Controls
    el.langToggleBtn.addEventListener('click', () => setLanguage(state.currentLang === 'bn' ? 'en' : 'bn'));
    el.themeToggleBtn.addEventListener('click', () => setTheme(state.currentTheme === 'dark' ? 'light' : 'dark'));
    el.openSettingsBtn.addEventListener('click', () => {
      const cfg = getCloudConfig();
      el.supabaseUrlInput.value = cfg.url;
      el.supabaseKeyInput.value = cfg.key;
      el.disconnectCloudBtn.classList.toggle('hidden', !isCloudConfigured());
      el.cloudSyncFeedback.textContent = '';
      el.settingsModal.classList.remove('hidden');
    });
    el.lockAppBtn.addEventListener('click', lockApp);

    // Mobile Navigation & Header Controls
    const mobileThemeBtn = document.getElementById('mobileThemeBtn');
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', () => setTheme(state.currentTheme === 'dark' ? 'light' : 'dark'));

    const mobileSettingsBtn = document.getElementById('mobileSettingsBtn');
    if (mobileSettingsBtn) mobileSettingsBtn.addEventListener('click', () => el.openSettingsBtn.click());

    const mobileLockBtn = document.getElementById('mobileLockBtn');
    if (mobileLockBtn) mobileLockBtn.addEventListener('click', lockApp);

    const mobileTabPawna = document.getElementById('mobileTabPawna');
    if (mobileTabPawna) mobileTabPawna.addEventListener('click', () => switchTab('pawna'));

    const mobileTabDena = document.getElementById('mobileTabDena');
    if (mobileTabDena) mobileTabDena.addEventListener('click', () => switchTab('dena'));

    const mobileTabExpense = document.getElementById('mobileTabExpense');
    if (mobileTabExpense) mobileTabExpense.addEventListener('click', () => switchTab('expense'));

    const mobileFabBtn = document.getElementById('mobileFabBtn');
    if (mobileFabBtn) mobileFabBtn.addEventListener('click', () => openSaleModal());

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => el.openSettingsBtn.click());

    // 4 Action Buttons
    el.btnQuickSale.addEventListener('click', () => openSaleModal());
    el.btnQuickPayment.addEventListener('click', () => openPaymentModal());
    el.btnQuickSupplierBill.addEventListener('click', () => openSupplierModal());
    el.btnQuickExpense.addEventListener('click', () => openExpenseModal());
    el.btnOpenExpenseModal.addEventListener('click', () => openExpenseModal());

    // Tabs
    el.tabPawnaBtn.addEventListener('click', () => switchTab('pawna'));
    el.tabDenaBtn.addEventListener('click', () => switchTab('dena'));
    el.tabExpenseBtn.addEventListener('click', () => switchTab('expense'));

    // Pawna Search & Filters
    el.pawnaSearchInput.addEventListener('input', e => {
      state.pawnaSearch = e.target.value;
      el.clearPawnaSearch.classList.toggle('hidden', !state.pawnaSearch);
      renderPawnaList();
    });
    el.clearPawnaSearch.addEventListener('click', () => {
      el.pawnaSearchInput.value = '';
      state.pawnaSearch = '';
      el.clearPawnaSearch.classList.add('hidden');
      renderPawnaList();
    });
    [el.pillPawnaAll, el.pillPawnaDue, el.pillPawnaPaid].forEach(pill => {
      pill.addEventListener('click', () => {
        [el.pillPawnaAll, el.pillPawnaDue, el.pillPawnaPaid].forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.pawnaFilter = pill.dataset.filter;
        renderPawnaList();
      });
    });

    // Dena Search & Filters
    el.denaSearchInput.addEventListener('input', e => {
      state.denaSearch = e.target.value;
      el.clearDenaSearch.classList.toggle('hidden', !state.denaSearch);
      renderDenaList();
    });
    el.clearDenaSearch.addEventListener('click', () => {
      el.denaSearchInput.value = '';
      state.denaSearch = '';
      el.clearDenaSearch.classList.add('hidden');
      renderDenaList();
    });
    [el.pillDenaAll, el.pillDenaDue, el.pillDenaPaid].forEach(pill => {
      pill.addEventListener('click', () => {
        [el.pillDenaAll, el.pillDenaDue, el.pillDenaPaid].forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.denaFilter = pill.dataset.filter;
        renderDenaList();
      });
    });

    // Sale Modal Inputs
    el.closeSaleModal.addEventListener('click', closeSaleModal);
    el.cancelSaleBtn.addEventListener('click', closeSaleModal);
    el.gauzeInput.addEventListener('input', calculateMeasure);
    el.ghiraSelect.addEventListener('change', calculateMeasure);
    el.ratePerGauzeInput.addEventListener('input', calculateMeasure);
    el.totalAmountInput.addEventListener('input', updateDueCalculation);
    el.paidAmountInput.addEventListener('input', updateDueCalculation);
    el.saleForm.addEventListener('submit', handleSaveSale);

    // Customer Payment Modal
    el.closePaymentModal.addEventListener('click', closePaymentModal);
    el.cancelPaymentBtn.addEventListener('click', closePaymentModal);
    el.paymentForm.addEventListener('submit', handleSavePayment);

    // Supplier Dena Modal
    el.closeSupplierModal.addEventListener('click', closeSupplierModal);
    el.cancelSupBtn.addEventListener('click', closeSupplierModal);
    el.supTotalInput.addEventListener('input', updateSupDueCalculation);
    el.supPaidInput.addEventListener('input', updateSupDueCalculation);
    el.supplierForm.addEventListener('submit', handleSaveSupplierBill);

    // Pay Supplier Modal
    el.closePaySupModal.addEventListener('click', closePaySupModal);
    el.cancelPaySupBtn.addEventListener('click', closePaySupModal);
    el.paySupForm.addEventListener('submit', handleSaveSupplierPayment);

    // Expense Modal
    el.closeExpenseModal.addEventListener('click', closeExpenseModal);
    el.cancelExpenseBtn.addEventListener('click', closeExpenseModal);
    el.expenseForm.addEventListener('submit', handleSaveExpense);

    // Statement Modals
    el.closeStatementModal.addEventListener('click', () => el.statementModal.classList.add('hidden'));
    el.stAddSaleBtn.addEventListener('click', () => openSaleModal(state.selectedPartyId));
    el.stAddPayBtn.addEventListener('click', () => openPaymentModal(state.selectedPartyId));
    el.stWhatsAppBtn.addEventListener('click', () => sendWhatsApp(state.selectedPartyId));
    el.stPrintBtn.addEventListener('click', triggerPrint);
    el.stDeleteBtn.addEventListener('click', () => {
      const c = state.customers.find(x => x.id === state.selectedPartyId);
      if (c && confirm(`কাস্টমার "${c.name}" এর খাতা মুছে ফেলবেন?`)) {
        state.customers = state.customers.filter(x => x.id !== c.id);
        saveData();
        deleteCloudRecord('ms_traders_customers', c.id);
        el.statementModal.classList.add('hidden');
        renderAll();
      }
    });

    el.closeSupStatementModal.addEventListener('click', () => el.supStatementModal.classList.add('hidden'));
    el.supStAddBillBtn.addEventListener('click', () => openSupplierModal(state.selectedSupplierId));
    el.supStPayBtn.addEventListener('click', () => openPaySupplierModal(state.selectedSupplierId));
    el.supStDeleteBtn.addEventListener('click', () => {
      const s = state.suppliers.find(x => x.id === state.selectedSupplierId);
      if (s && confirm(`মহাজন "${s.name}" এর দেনা খাতা মুছে ফেলবেন?`)) {
        state.suppliers = state.suppliers.filter(x => x.id !== s.id);
        saveData();
        deleteCloudRecord('ms_traders_suppliers', s.id);
        el.supStatementModal.classList.add('hidden');
        renderAll();
      }
    });

    // Cloud Settings
    el.saveCloudSyncBtn.addEventListener('click', async () => {
      const url = (el.supabaseUrlInput.value || '').trim().replace(/\/+$/, '');
      const key = (el.supabaseKeyInput.value || '').trim();
      if (!url || !key) { alert('URL এবং Key দিন!'); return; }
      el.cloudSyncFeedback.textContent = '🔄 পরীক্ষা করা হচ্ছে...';
      try {
        const res = await fetch(`${url}/rest/v1/ms_traders_customers?limit=1`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
        if (!res.ok) throw new Error('Failed');
        localStorage.setItem(STORAGE_KEY_SUPABASE_URL, url);
        localStorage.setItem(STORAGE_KEY_SUPABASE_KEY, key);
        el.cloudSyncFeedback.textContent = '✅ ক্লাউড ডাটাবেস সফলভাবে সংযুক্ত!';
        el.disconnectCloudBtn.classList.remove('hidden');
        await syncDownFromCloud();
        await syncUpToCloud('all');
      } catch {
        el.cloudSyncFeedback.textContent = '❌ সংযোগ ব্যর্থ! supabase_setup.sql রান করেছেন কি না যাচাই করুন।';
      }
    });

    el.disconnectCloudBtn.addEventListener('click', () => {
      if (confirm('ক্লাউড সংযোগ বিচ্ছিন্ন করে লোকাল মোডে ফিরবেন?')) {
        localStorage.removeItem(STORAGE_KEY_SUPABASE_URL);
        localStorage.removeItem(STORAGE_KEY_SUPABASE_KEY);
        el.supabaseUrlInput.value = '';
        el.supabaseKeyInput.value = '';
        el.disconnectCloudBtn.classList.add('hidden');
        updateCloudBadge('local');
      }
    });

    // Backup & Settings
    el.closeSettingsModal.addEventListener('click', () => el.settingsModal.classList.add('hidden'));
    el.downloadBackupBtn.addEventListener('click', downloadBackup);
    el.quickBackupBtn.addEventListener('click', downloadBackup);
    el.restoreFileInput.addEventListener('change', restoreBackup);
    el.quickCsvBtn.addEventListener('click', exportCsv);

    el.changePinBtn.addEventListener('click', () => {
      const oldP = el.oldPinInput.value.trim();
      const newP = el.newPinInput.value.trim();
      const correct = localStorage.getItem(STORAGE_KEY_PIN) || DEFAULT_PIN;
      if (oldP !== correct) { alert('পুরাতন পিন ভুল!'); return; }
      if (!newP || newP.length < 4) { alert('নতুন পিন কমপক্ষে ৪ সংখ্যার হতে হবে!'); return; }
      localStorage.setItem(STORAGE_KEY_PIN, newP);
      el.oldPinInput.value = '';
      el.newPinInput.value = '';
      alert('পিন সফলভাবে পরিবর্তন হয়েছে!');
    });

    el.resetAllDataBtn.addEventListener('click', () => {
      if (confirm('সতর্কতা: সমস্ত কাস্টমার, দেনা ও খরচের হিসাব মুছে ফেলবেন?')) {
        state.customers = [];
        state.suppliers = [];
        state.expenses = [];
        saveLocalData();
        renderAll();
        el.settingsModal.classList.add('hidden');
        alert('সকল তথ্য মুছে ফেলা হয়েছে।');
      }
    });

    // Backdrop close
    [el.saleModal, el.paymentModal, el.supplierModal, el.paySupplierModal, el.expenseModal, el.statementModal, el.supStatementModal, el.settingsModal].forEach(m => {
      m.addEventListener('click', e => { if (e.target === m) m.classList.add('hidden'); });
    });
  }

  // Init
  function init() {
    loadData();
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'light';
    setTheme(savedTheme);
    const savedLang = localStorage.getItem(STORAGE_KEY_LANG) || 'bn';
    setLanguage(savedLang);
    bindEvents();

    if (sessionStorage.getItem(SESSION_AUTH_KEY) === 'true') {
      el.lockScreen.classList.add('hidden');
      el.appContainer.classList.remove('hidden');
      renderAll();
    } else {
      lockApp();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
