/**
 * ===================================================================
 * M.S TRADERS - SURITOLA, DHAKA
 * Zero Entry Barrier Digital Customer Khata & Transaction Ledger
 * 100% Free Forever, Persistent Browser Storage, Instant Bengali/English
 * ===================================================================
 */

(function () {
  'use strict';

  // Storage Keys
  const STORAGE_KEY_CUSTOMERS = 'ms_traders_customers_v1';
  const STORAGE_KEY_PIN = 'ms_traders_pin_v1';
  const STORAGE_KEY_THEME = 'ms_traders_theme_v1';
  const STORAGE_KEY_LANG = 'ms_traders_lang_v1';
  const STORAGE_KEY_SUPABASE_URL = 'ms_supabase_url_v1';
  const STORAGE_KEY_SUPABASE_KEY = 'ms_supabase_key_v1';
  const SESSION_AUTH_KEY = 'ms_traders_auth_session';

  const DEFAULT_PIN = '1234';

  // ===================================================================
  // BILINGUAL DICTIONARY (Authentic Old Dhaka Commercial Terms & English)
  // ===================================================================
  const i18n = {
    bn: {
      doc_title: 'M.S Traders | ডিজিটাল খাতা (Customer Ledger)',
      shop_sub: 'এম. এস. ট্রেডার্স · সুরিতলা, ঢাকা',
      pin_label: 'পিন কোড দিন (PIN: 1234)',
      pin_error: 'ভুল পিন! সঠিক পিন দিন।',
      num_clear: 'মুছুন',
      num_enter: 'প্রবেশ',
      pin_hint: 'ডিফল্ট পিন: <strong>1234</strong>',

      // Summary Banner
      lbl_total_due: 'মোট বাকি পাওনা (Market Due)',
      tag_total_due: 'আদায় বাকি',
      note_total_due: 'কাস্টমারদের কাছে মোট বাকি টাকা',
      lbl_today_paid: 'আজকের জমা (Today\'s Cash)',
      tag_today_paid: 'নগদ আদায়',
      note_today_paid: 'আজকে দোকানে নগদ জমা হয়েছে',
      lbl_customers: 'মোট পার্টি / কাস্টমার',
      tag_customers: 'খাতা',
      note_customers: 'সক্রিয় ক্রেতা ও কারখানা',
      count_suffix: ' জন',

      // Hero Buttons
      btn_quick_sale: 'নতুন মাল বিক্রি (New Sale)',
      btn_quick_sale_sub: 'গজ ও গিরা মাপে বিল তৈরি করুন',
      btn_quick_pay: 'টাকা জমা গ্রহণ (Receive Cash)',
      btn_quick_pay_sub: 'কাস্টমারের বাকি পরিশোধ এন্ট্রি',

      // Controls
      search_ph: 'পার্টির নাম বা মোবাইল নম্বর লিখুন...',
      pill_all: 'সবাই (All)',
      pill_due: 'বাকি আছে (Due)',
      pill_paid: 'পরিশোধ (Paid)',
      empty_title: 'খাতা খালি',
      empty_sub: 'উপরে "নতুন মাল বিক্রি" বাটনে চাপ দিয়ে প্রথম হিসাব শুরু করুন।',
      persist_badge: '💾 তথ্য এই ফোনে/কম্পিউটারে অটো-সেভ হচ্ছে',
      btn_backup: '📥 এক-ক্লিকে ব্যাকআপ নামান',
      btn_csv: '📊 এক্সেল ফাইল',

      // Sale Modal
      modal_sale_heading: 'নতুন মাল বিক্রি (New Sale)',
      lbl_name: 'কাস্টমার / কারখানার নাম *',
      ph_name: 'উদাঃ আল-আমিন শু / বাবুল ভাই',
      lbl_phone: 'মোবাইল নম্বর *',
      lbl_rexin: 'মালের বিবরণ (Rexin Item)',
      ph_rexin: 'উদাঃ ০.৮মিমি কালো রেক্সিন / সোফা লেদার',
      lbl_measure_header: 'মালের মাপ (Gauze & Ghira)',
      lbl_gauze: 'গজ (Gauze / Yards) *',
      unit_gauze: 'গজ',
      lbl_ghira: 'গিরা (Ghira Dropdown) *',
      lbl_rate: 'দর (প্রতি গজ ৳)',
      measure_preview: (g, gh, y, r, t) => `মোট মাপ: <strong>${g} গজ ${gh} গিরা (${y.toFixed(2)} গজ)</strong>` + (r > 0 ? ` × ৳${r}/গজ = <strong>৳${t.toLocaleString('en-BD')}</strong>` : ''),
      lbl_total_bill: 'মোট বিল (৳) *',
      hint_total_bill: 'মাপ ও দর থেকে অটো আসবে',
      lbl_paid_now: 'নগদ জমা দিলেন (৳)',
      hint_paid_now: 'বাকি থাকলে ০ রাখুন',
      lbl_due_now: 'বাকি রইলো (Due)',
      lbl_date: 'তারিখ',
      lbl_note: 'চালান বা মন্তব্য (ঐচ্ছিক)',
      ph_note: 'উদাঃ চালান নং ১০৪',
      btn_cancel: 'বাতিল',
      btn_save_sale: '💾 হিসাব রাখুন (Save)',

      // Receive Payment Modal
      modal_pay_heading: 'টাকা জমা গ্রহণ (Receive Cash)',
      lbl_pay_customer: 'কাস্টমার / পার্টি নির্বাচন করুন *',
      lbl_pay_amount: 'জমা টাকার পরিমাণ (৳) *',
      lbl_pay_method: 'পেমেন্ট মাধ্যম',
      lbl_pay_date: 'তারিখ',
      lbl_pay_note: 'নোট / মন্তব্য (ঐচ্ছিক)',
      ph_pay_note: 'উদাঃ দোকানে নগদ ক্যাশ দিলেন',
      btn_confirm_pay: '✅ জমা নিশ্চিত করুন',

      // Customer Card Buttons
      btn_card_sale: '＋বিক্রি',
      btn_card_pay: '৳জমা',
      btn_card_wa: '💬তাগাদা',
      status_paid: 'পরিশোধিত',
      status_due: 'বাকি',

      // Statement Modal
      lbl_st_sales: 'মোট মাল ক্রয়',
      lbl_st_paid: 'মোট নগদ জমা',
      lbl_st_due: 'বর্তমান বাকি (Due)',
      btn_st_sale: '＋ নতুন মাল বিক্রি',
      btn_st_pay: '৳ টাকা জমা',
      btn_st_wa: '💬 হোয়াটসঅ্যাপ তাগাদা',
      btn_st_print: '🖨️ রসিদ প্রিন্ট',
      btn_st_del: '🗑️ পার্টি মুছুন',
      lbl_st_history: 'লেনদেনের ইতিহাস (Sales & Payments)',
      no_history: 'কোনো লেনদেনের রেকর্ড নেই।',

      // WhatsApp Message
      wa_msg: (name, sales, paid, due) => `আসসালামু আলাইকুম ${name} ভাই,\n\nM.S Traders (সুরিতলা, ঢাকা) থেকে আপনার বর্তমান হিসাব বিবরণী:\n• মোট ক্রয়: ৳${sales.toLocaleString('en-BD')}\n• মোট পরিশোধ: ৳${paid.toLocaleString('en-BD')}\n• বর্তমান বাকি: *৳${due.toLocaleString('en-BD')}*\n\nঅনুগ্রহ করে সুবিধাজনক সময়ে পরিশোধ করবেন।\n\nধন্যবাদ,\nM.S Traders\nসুরিতলা, ঢাকা।`,

      // Settings
      set_heading: 'সেটিংস ও ডেটা ব্যাকআপ',
      set_card1_title: '💾 ডেটা ব্যাকআপ ও সুরক্ষা (Data Backup)',
      set_card1_sub: 'আপনার ফোনের স্টোরেজে হিসাবের একটি ব্যাকআপ ফাইল নামিয়ে রাখুন। কোনো তথ্য হারাবে না।',
      btn_dl_backup: '📥 ব্যাকআপ ফাইল ডাউনলোড (JSON)',
      lbl_restore_btn: '📤 ব্যাকআপ ফেরত আনুন (Restore)',
      set_card2_title: '🔐 পিন পরিবর্তন (Change PIN)',
      btn_change_pin: 'পিন বদলান',
      set_card3_title: '⚠️ সমস্ত তথ্য পরিষ্কার (Reset Data)',
      set_card3_sub: 'সব কাস্টমার ও বিক্রয়ের হিসাব চিরতরে মুছে যাবে।',
      btn_reset_all: 'সকল তথ্য মুছুন',

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
      ]
    },

    en: {
      doc_title: 'M.S Traders | Digital Customer Ledger',
      shop_sub: 'M.S Traders · Suritola, Dhaka',
      pin_label: 'Enter Security PIN (PIN: 1234)',
      pin_error: 'Invalid PIN! Please enter the correct PIN.',
      num_clear: 'Clear',
      num_enter: 'Enter',
      pin_hint: 'Default PIN: <strong>1234</strong>',

      // Summary Banner
      lbl_total_due: 'Total Market Due (To Collect)',
      tag_total_due: 'Receivables',
      note_total_due: 'Outstanding balance across all parties',
      lbl_today_paid: 'Today\'s Cash Collected',
      tag_today_paid: 'Cash In',
      note_today_paid: 'Total payments received today',
      lbl_customers: 'Total Parties / Customers',
      tag_customers: 'Parties',
      note_customers: 'Active buyers and shoe factories',
      count_suffix: ' parties',

      // Hero Buttons
      btn_quick_sale: 'New Sale Entry',
      btn_quick_sale_sub: 'Record yards & girah rexin sale',
      btn_quick_pay: 'Receive Cash Payment',
      btn_quick_pay_sub: 'Record customer due settlement',

      // Controls
      search_ph: 'Type party name or mobile number...',
      pill_all: 'All',
      pill_due: 'Due Only',
      pill_paid: 'Paid',
      empty_title: 'No Records Yet',
      empty_sub: 'Click "New Sale Entry" above to record your first transaction.',
      persist_badge: '💾 Data is auto-saved to this device',
      btn_backup: '📥 Download 1-Click Backup',
      btn_csv: '📊 Excel (CSV)',

      // Sale Modal
      modal_sale_heading: 'New Rexin Sale (Gauze & Ghira)',
      lbl_name: 'Customer / Factory Name *',
      ph_name: 'e.g. Al-Amin Footwear / Babul Bhai',
      lbl_phone: 'Mobile Number *',
      lbl_rexin: 'Rexin Item Description',
      ph_rexin: 'e.g. 0.8mm Black Rexin / Sofa Leather',
      lbl_measure_header: 'Measurement (Gauze & Ghira)',
      lbl_gauze: 'Gauze (Yards) *',
      unit_gauze: 'Yds',
      lbl_ghira: 'Ghira Dropdown (0-16) *',
      lbl_rate: 'Rate (৳ per yard)',
      measure_preview: (g, gh, y, r, t) => `Total Measure: <strong>${g} Yds ${gh} Girah (${y.toFixed(2)} Yds)</strong>` + (r > 0 ? ` × ৳${r}/Yd = <strong>৳${t.toLocaleString('en-BD')}</strong>` : ''),
      lbl_total_bill: 'Total Bill (৳) *',
      hint_total_bill: 'Auto-calculated from measure & rate',
      lbl_paid_now: 'Cash Paid Now (৳)',
      hint_paid_now: 'Leave 0 if full credit/due',
      lbl_due_now: 'Remaining Due',
      lbl_date: 'Date',
      lbl_note: 'Challan / Note (Optional)',
      ph_note: 'e.g. Challan #104',
      btn_cancel: 'Cancel',
      btn_save_sale: '💾 Save Entry',

      // Receive Payment Modal
      modal_pay_heading: 'Receive Cash Payment',
      lbl_pay_customer: 'Select Customer / Party *',
      lbl_pay_amount: 'Amount Received (৳) *',
      lbl_pay_method: 'Payment Method',
      lbl_pay_date: 'Date',
      lbl_pay_note: 'Note / Reference (Optional)',
      ph_pay_note: 'e.g. Handed cash at shop',
      btn_confirm_pay: '✅ Confirm Payment',

      // Customer Card Buttons
      btn_card_sale: '＋Sale',
      btn_card_pay: '৳Pay',
      btn_card_wa: '💬WA',
      status_paid: 'Paid',
      status_due: 'Due',

      // Statement Modal
      lbl_st_sales: 'Total Purchases',
      lbl_st_paid: 'Total Cash Paid',
      lbl_st_due: 'Current Due Balance',
      btn_st_sale: '＋ New Sale',
      btn_st_pay: '৳ Receive Cash',
      btn_st_wa: '💬 WhatsApp Reminder',
      btn_st_print: '🖨️ Print Receipt',
      btn_st_del: '🗑️ Delete Party',
      lbl_st_history: 'Transaction History (Sales & Payments)',
      no_history: 'No transactions recorded yet.',

      // WhatsApp Message
      wa_msg: (name, sales, paid, due) => `Assalamu Alaikum ${name},\n\nAccount statement from M.S Traders (Suritola, Dhaka):\n• Total Purchases: ৳${sales.toLocaleString('en-BD')}\n• Total Paid: ৳${paid.toLocaleString('en-BD')}\n• Current Outstanding Due: *৳${due.toLocaleString('en-BD')}*\n\nPlease arrange payment at your convenience.\n\nThank you,\nM.S Traders\nSuritola, Dhaka.`,

      // Settings
      set_heading: 'Settings & Data Backup',
      set_card1_title: '💾 Data Backup & Safety',
      set_card1_sub: 'Download a backup copy to your phone or computer to prevent any accidental loss.',
      btn_dl_backup: '📥 Download Backup File (JSON)',
      lbl_restore_btn: '📤 Restore Backup File',
      set_card2_title: '🔐 Change PIN',
      btn_change_pin: 'Update PIN',
      set_card3_title: '⚠️ Reset All Records',
      set_card3_sub: 'Permanently erases all customer accounts and transactions.',
      btn_reset_all: 'Clear All Data',

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
      ]
    }
  };

  // State
  let state = {
    customers: [],
    activeFilter: 'all',
    searchQuery: '',
    selectedPartyId: null,
    currentTheme: 'light',
    currentLang: 'bn',
  };

  // DOM Elements
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

    // Summary
    statTotalDue: document.getElementById('statTotalDue'),
    statTodayPaid: document.getElementById('statTodayPaid'),
    statCustomers: document.getElementById('statCustomers'),
    lblTotalDue: document.getElementById('lblTotalDue'),
    lblTodayCollected: document.getElementById('lblTodayCollected'),
    lblTotalCustomers: document.getElementById('lblTotalCustomers'),
    noteTotalDue: document.getElementById('noteTotalDue'),
    noteTodayPaid: document.getElementById('noteTodayPaid'),
    noteTotalCustomers: document.getElementById('noteTotalCustomers'),

    // Hero buttons
    btnQuickSale: document.getElementById('btnQuickSale'),
    btnQuickPayment: document.getElementById('btnQuickPayment'),
    btnQuickSaleText: document.getElementById('btnQuickSaleText'),
    btnQuickSaleSub: document.getElementById('btnQuickSaleSub'),
    btnQuickPayText: document.getElementById('btnQuickPayText'),
    btnQuickPaySub: document.getElementById('btnQuickPaySub'),

    // Search & Filter
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    filterPills: document.querySelectorAll('.f-pill'),
    customerListContainer: document.getElementById('customerListContainer'),
    emptyListState: document.getElementById('emptyListState'),
    quickBackupBtn: document.getElementById('quickBackupBtn'),
    quickCsvBtn: document.getElementById('quickCsvBtn'),

    // Sale Modal
    saleModal: document.getElementById('saleModal'),
    saleModalHeading: document.getElementById('saleModalHeading'),
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
    saveSaleSubmitBtn: document.getElementById('saveSaleSubmitBtn'),

    // Payment Modal
    paymentModal: document.getElementById('paymentModal'),
    payModalHeading: document.getElementById('payModalHeading'),
    closePaymentModal: document.getElementById('closePaymentModal'),
    cancelPaymentBtn: document.getElementById('cancelPaymentBtn'),
    paymentForm: document.getElementById('paymentForm'),
    payCustomerSelect: document.getElementById('payCustomerSelect'),
    payAmountInput: document.getElementById('payAmountInput'),
    payMethodSelect: document.getElementById('payMethodSelect'),
    payDateInput: document.getElementById('payDateInput'),
    payNoteInput: document.getElementById('payNoteInput'),
    savePaymentSubmitBtn: document.getElementById('savePaymentSubmitBtn'),

    // Statement Modal
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

    // Settings Modal
    settingsModal: document.getElementById('settingsModal'),
    closeSettingsModal: document.getElementById('closeSettingsModal'),
    downloadBackupBtn: document.getElementById('downloadBackupBtn'),
    restoreFileInput: document.getElementById('restoreFileInput'),
    oldPinInput: document.getElementById('oldPinInput'),
    newPinInput: document.getElementById('newPinInput'),
    changePinBtn: document.getElementById('changePinBtn'),
    pinChangeFeedback: document.getElementById('pinChangeFeedback'),
    resetAllDataBtn: document.getElementById('resetAllDataBtn'),

    // Cloud Database Sync
    cloudStatusBadge: document.getElementById('cloudStatusBadge'),
    cloudStatusText: document.getElementById('cloudStatusText'),
    supabaseUrlInput: document.getElementById('supabaseUrlInput'),
    supabaseKeyInput: document.getElementById('supabaseKeyInput'),
    saveCloudSyncBtn: document.getElementById('saveCloudSyncBtn'),
    disconnectCloudBtn: document.getElementById('disconnectCloudBtn'),
    cloudSyncFeedback: document.getElementById('cloudSyncFeedback'),

    // Print Slip
    printableReceipt: document.getElementById('printableReceipt'),
    prCustName: document.getElementById('prCustName'),
    prDate: document.getElementById('prDate'),
    prPhone: document.getElementById('prPhone'),
    prItemsList: document.getElementById('prItemsList'),
    prTotalSales: document.getElementById('prTotalSales'),
    prTotalPaid: document.getElementById('prTotalPaid'),
    prTotalDue: document.getElementById('prTotalDue'),
  };

  // Format money
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
  // PERMANENT CLOUD DATABASE (SUPABASE REST SYNC)
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

  async function syncDownFromCloud() {
    if (!isCloudConfigured()) {
      updateCloudBadge('local');
      return;
    }

    const { url, key } = getCloudConfig();
    updateCloudBadge('syncing');

    try {
      const res = await fetch(`${url}/rest/v1/ms_traders_customers?select=*&order=created.desc`, {
        method: 'GET',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error('Cloud fetch failed');
      }

      const rows = await res.json();
      if (Array.isArray(rows) && rows.length > 0) {
        state.customers = rows;
        localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(state.customers));
        renderAll();
      } else if (Array.isArray(rows) && rows.length === 0 && state.customers.length > 0) {
        // Cloud table is newly created; seed existing local data up to cloud
        await syncAllUpToCloud();
      }
      updateCloudBadge('synced');
    } catch (err) {
      console.warn('Cloud sync error (using local storage):', err);
      updateCloudBadge('local');
    }
  }

  async function syncAllUpToCloud() {
    if (!isCloudConfigured() || !state.customers.length) return;
    const { url, key } = getCloudConfig();

    try {
      await fetch(`${url}/rest/v1/ms_traders_customers`, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(state.customers)
      });
      updateCloudBadge('synced');
    } catch (e) {
      console.warn('Batch upload error:', e);
    }
  }

  async function syncCustomerToCloud(customer) {
    if (!isCloudConfigured()) return;
    const { url, key } = getCloudConfig();

    try {
      await fetch(`${url}/rest/v1/ms_traders_customers`, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(customer)
      });
      updateCloudBadge('synced');
    } catch (err) {
      console.warn('Customer cloud save error:', err);
    }
  }

  async function deleteCustomerFromCloud(customerId) {
    if (!isCloudConfigured()) return;
    const { url, key } = getCloudConfig();

    try {
      await fetch(`${url}/rest/v1/ms_traders_customers?id=eq.${encodeURIComponent(customerId)}`, {
        method: 'DELETE',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`
        }
      });
    } catch (err) {
      console.warn('Cloud delete error:', err);
    }
  }

  // ===================================================================
  // DATA PERSISTENCE & AUTO-SAVING (DUAL LAYER: LOCAL + CLOUD)
  // ===================================================================
  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CUSTOMERS);
      if (raw) {
        state.customers = JSON.parse(raw);
      } else {
        // Initial sample seed for M.S Traders
        state.customers = [
          {
            id: 'c-1',
            name: 'আল-আমিন শু ফ্যাক্টরি',
            phone: '01712345678',
            created: new Date().toISOString(),
            sales: [
              {
                id: 's-1',
                date: getTodayISO(),
                itemDesc: '০.৮মিমি কালো রেক্সিন',
                gauze: 50,
                ghira: 8,
                totalYards: 50.5,
                rate: 220,
                totalAmount: 11110,
                note: 'চালান নং ১০৪'
              }
            ],
            payments: [
              {
                id: 'p-1',
                date: getTodayISO(),
                amount: 5000,
                method: 'ক্যাশ (নগদ)',
                note: 'প্রাথমিক জমা'
              }
            ]
          },
          {
            id: 'c-2',
            name: 'বাবুল ভাই (সোফা মেকার)',
            phone: '01898765432',
            created: new Date().toISOString(),
            sales: [
              {
                id: 's-2',
                date: getTodayISO(),
                itemDesc: '১.২মিমি সোফা রেক্সিন (মেরুন)',
                gauze: 20,
                ghira: 0,
                totalYards: 20.0,
                rate: 340,
                totalAmount: 6800,
                note: 'দোকান থেকে ডেলিভারি'
              }
            ],
            payments: []
          }
        ];
        saveData();
      }
    } catch (e) {
      console.error('Data error:', e);
      state.customers = [];
    }

    // Attempt cloud sync in the background
    if (isCloudConfigured()) {
      syncDownFromCloud();
    } else {
      updateCloudBadge('local');
    }
  }

  function saveData(modifiedCustomer = null) {
    try {
      // 1. Instant local persistence
      localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(state.customers));

      // 2. Background permanent cloud persistence
      if (isCloudConfigured()) {
        if (modifiedCustomer) {
          syncCustomerToCloud(modifiedCustomer);
        } else {
          syncAllUpToCloud();
        }
      }
    } catch (e) {
      alert('সতর্কতা: স্টোরেজ সীমা অতিক্রম করেছে।');
    }
  }

  function getPartyStats(c) {
    const totalSales = (c.sales || []).reduce((sum, s) => sum + (Number(s.totalAmount) || 0), 0);
    const totalPaid = (c.payments || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const due = Math.max(0, totalSales - totalPaid);
    return { totalSales, totalPaid, due };
  }

  // ===================================================================
  // GAUZE & GHIRA CALCULATION ENGINE
  // ===================================================================
  function calculateMeasure() {
    const gauze = parseFloat(el.gauzeInput.value) || 0;
    const ghira = parseInt(el.ghiraSelect.value, 10) || 0;
    const rate = parseFloat(el.ratePerGauzeInput.value) || 0;

    const fractionalYards = ghira / 16;
    const totalYards = gauze + fractionalYards;
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

  // ===================================================================
  // DASHBOARD & CUSTOMER CARDS LIST
  // ===================================================================
  function renderAll() {
    const L = i18n[state.currentLang];
    const today = getTodayISO();

    let totalDue = 0;
    let todayPaid = 0;

    state.customers.forEach(c => {
      const st = getPartyStats(c);
      totalDue += st.due;

      (c.payments || []).forEach(p => {
        if (p.date === today) {
          todayPaid += Number(p.amount || 0);
        }
      });
    });

    el.statTotalDue.textContent = formatMoney(totalDue);
    el.statTodayPaid.textContent = formatMoney(todayPaid);
    el.statCustomers.textContent = formatNum(state.customers.length) + L.count_suffix;

    renderPartyCards();
  }

  function renderPartyCards() {
    const L = i18n[state.currentLang];
    const q = (state.searchQuery || '').trim().toLowerCase();
    const filter = state.activeFilter;

    let filtered = state.customers.filter(c => {
      const match = !q || c.name.toLowerCase().includes(q) || c.phone.includes(q);
      if (!match) return false;

      const st = getPartyStats(c);
      if (filter === 'due') return st.due > 0;
      if (filter === 'paid') return st.due === 0;
      return true;
    });

    // Sort by largest due first
    filtered.sort((a, b) => getPartyStats(b).due - getPartyStats(a).due);

    if (filtered.length === 0) {
      el.customerListContainer.innerHTML = '';
      el.emptyListState.classList.remove('hidden');
      return;
    }
    el.emptyListState.classList.add('hidden');

    el.customerListContainer.innerHTML = filtered.map(c => {
      const st = getPartyStats(c);
      const isPaid = st.due === 0;

      return `
        <div class="party-card" data-id="${escape(c.id)}">
          <div class="party-card-left">
            <span class="party-name">${escape(c.name)}</span>
            <span class="party-phone">📞 ${escape(c.phone)}</span>
          </div>

          <div class="party-card-center">
            <span class="party-due-amount ${isPaid ? 'text-success' : 'text-danger'}">${formatMoney(st.due)}</span>
            <span class="party-due-status ${isPaid ? 'paid-tag' : 'due-tag'}">
              ${isPaid ? L.status_paid : L.status_due}
            </span>
          </div>

          <div class="party-card-actions" onclick="event.stopPropagation()">
            <button type="button" class="btn-card-action btn-add-sale" data-id="${escape(c.id)}">${L.btn_card_sale}</button>
            <button type="button" class="btn-card-action btn-add-pay" data-id="${escape(c.id)}">${L.btn_card_pay}</button>
            <button type="button" class="btn-card-action btn-wa" data-id="${escape(c.id)}">${L.btn_card_wa}</button>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events
    el.customerListContainer.querySelectorAll('.party-card').forEach(card => {
      card.addEventListener('click', () => {
        openStatement(card.dataset.id);
      });
    });

    el.customerListContainer.querySelectorAll('.btn-add-sale').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openSaleModal(btn.dataset.id);
      });
    });

    el.customerListContainer.querySelectorAll('.btn-add-pay').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPaymentModal(btn.dataset.id);
      });
    });

    el.customerListContainer.querySelectorAll('.btn-wa').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sendWhatsApp(btn.dataset.id);
      });
    });
  }

  // ===================================================================
  // MODAL 1: NEW SALE MODAL
  // ===================================================================
  function openSaleModal(partyId = null) {
    el.saleForm.reset();
    el.gauzeInput.value = '1';
    el.ghiraSelect.value = '0';
    el.ratePerGauzeInput.value = '';
    el.totalAmountInput.value = '0';
    el.paidAmountInput.value = '0';
    el.saleDateInput.value = getTodayISO();

    if (partyId) {
      const c = state.customers.find(x => x.id === partyId);
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
    const rexinDesc = el.rexinDescInput.value.trim() || 'রেক্সিন';
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
      itemDesc: rexinDesc,
      gauze,
      ghira,
      totalYards: parseFloat(totalYards.toFixed(4)),
      rate,
      totalAmount,
      note: saleNote
    };

    let target = state.customers.find(c => c.phone === phone || c.name.toLowerCase() === name.toLowerCase());

    if (target) {
      target.name = name;
      target.phone = phone;
      target.sales = target.sales || [];
      target.sales.push(newSale);

      if (paidAmount > 0) {
        target.payments = target.payments || [];
        target.payments.push({
          id: 'p-' + Date.now(),
          date: saleDate,
          amount: paidAmount,
          method: 'ক্যাশ (নগদ)',
          note: 'বিক্রির সময় নগদ জমা'
        });
      }
    } else {
      target = {
        id: 'c-' + Date.now(),
        name,
        phone,
        created: new Date().toISOString(),
        sales: [newSale],
        payments: []
      };

      if (paidAmount > 0) {
        target.payments.push({
          id: 'p-' + Date.now(),
          date: saleDate,
          amount: paidAmount,
          method: 'ক্যাশ (নগদ)',
          note: 'বিক্রির সময় নগদ জমা'
        });
      }

      state.customers.push(target);
    }

    saveData();
    closeSaleModal();
    renderAll();

    if (state.selectedPartyId === target.id) {
      openStatement(target.id);
    }
  }

  // ===================================================================
  // MODAL 2: RECEIVE CASH MODAL
  // ===================================================================
  function openPaymentModal(preselectedId = null) {
    el.paymentForm.reset();
    el.payDateInput.value = getTodayISO();

    // Populate customer dropdown with all customers
    el.payCustomerSelect.innerHTML = state.customers.map(c => {
      const st = getPartyStats(c);
      return `<option value="${escape(c.id)}">${escape(c.name)} (বাকি: ${formatMoney(st.due)})</option>`;
    }).join('');

    if (preselectedId) {
      el.payCustomerSelect.value = preselectedId;
    }

    el.paymentModal.classList.remove('hidden');
    el.payAmountInput.focus();
  }

  function closePaymentModal() {
    el.paymentModal.classList.add('hidden');
  }

  function handleSavePayment(e) {
    e.preventDefault();

    const partyId = el.payCustomerSelect.value;
    const amount = parseFloat(el.payAmountInput.value) || 0;
    const method = el.payMethodSelect.value;
    const date = el.payDateInput.value || getTodayISO();
    const note = el.payNoteInput.value.trim();

    if (amount <= 0) {
      alert('সঠিক টাকার পরিমাণ লিখুন!');
      return;
    }

    const party = state.customers.find(c => c.id === partyId);
    if (!party) return;

    party.payments = party.payments || [];
    party.payments.push({
      id: 'p-' + Date.now(),
      date,
      amount,
      method,
      note
    });

    saveData();
    closePaymentModal();
    renderAll();

    if (state.selectedPartyId === party.id) {
      openStatement(party.id);
    }
  }

  // ===================================================================
  // MODAL 3: STATEMENT / KHATIAN
  // ===================================================================
  function openStatement(partyId) {
    const party = state.customers.find(c => c.id === partyId);
    if (!party) return;

    state.selectedPartyId = partyId;
    const st = getPartyStats(party);

    el.stName.textContent = party.name;
    el.stPhone.textContent = '📞 ' + party.phone;
    el.stTotalSales.textContent = formatMoney(st.totalSales);
    el.stTotalPaid.textContent = formatMoney(st.totalPaid);
    el.stTotalDue.textContent = formatMoney(st.due);

    // Merge transactions chronologically
    const allEvents = [];
    (party.sales || []).forEach(s => {
      allEvents.push({ type: 'sale', date: s.date, data: s });
    });
    (party.payments || []).forEach(p => {
      allEvents.push({ type: 'payment', date: p.date, data: p });
    });

    allEvents.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    if (allEvents.length === 0) {
      el.stTimeline.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-muted);">${i18n[state.currentLang].no_history}</div>`;
    } else {
      el.stTimeline.innerHTML = allEvents.map(ev => {
        if (ev.type === 'sale') {
          const s = ev.data;
          const uG = state.currentLang === 'bn' ? 'গজ' : 'Yds';
          const uGh = state.currentLang === 'bn' ? 'গিরা' : 'Girah';
          return `
            <div class="timeline-item">
              <div class="tl-left">
                <strong>📦 ${escape(s.itemDesc || 'রেক্সিন')}</strong>
                <small>${ev.date} · ${s.gauze || 0} ${uG} ${s.ghira || 0} ${uGh} ${s.rate ? '@ ৳' + s.rate : ''}</small>
              </div>
              <div class="tl-right">
                <span class="tl-amount text-danger">＋${formatMoney(s.totalAmount)}</span>
                <small style="display:block;color:var(--text-faint);">${escape(s.note || '')}</small>
              </div>
            </div>
          `;
        } else {
          const p = ev.data;
          return `
            <div class="timeline-item" style="border-left: 3px solid var(--paid-green);">
              <div class="tl-left">
                <strong class="text-success">৳ জমা পরিশোধ (${escape(p.method || 'ক্যাশ')})</strong>
                <small>${ev.date} · ${escape(p.note || 'নগদ জমা')}</small>
              </div>
              <div class="tl-right">
                <span class="tl-amount text-success">−${formatMoney(p.amount)}</span>
              </div>
            </div>
          `;
        }
      }).join('');
    }

    el.statementModal.classList.remove('hidden');
  }

  function sendWhatsApp(partyId) {
    const party = state.customers.find(c => c.id === partyId);
    if (!party) return;

    const st = getPartyStats(party);
    if (st.due <= 0) {
      alert(state.currentLang === 'bn' ? `${party.name} এর কোনো বাকি নেই!` : 'No outstanding balance!');
      return;
    }

    let cleanPhone = party.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('01')) cleanPhone = '88' + cleanPhone;

    const msg = i18n[state.currentLang].wa_msg(party.name, st.totalSales, st.totalPaid, st.due);
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function triggerPrint() {
    const party = state.customers.find(c => c.id === state.selectedPartyId);
    if (!party) return;

    const st = getPartyStats(party);
    el.prCustName.textContent = party.name;
    el.prPhone.textContent = party.phone;
    el.prDate.textContent = new Date().toLocaleDateString(state.currentLang === 'bn' ? 'bn-BD' : 'en-US');

    el.prItemsList.innerHTML = (party.sales || []).map(s => `
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

  function deleteParty() {
    const party = state.customers.find(c => c.id === state.selectedPartyId);
    if (!party) return;

    if (confirm(`আপনি কি নিশ্চিত যে "${party.name}" এর পুরো খাতা মুছে ফেলতে চান?`)) {
      const removedId = party.id;
      state.customers = state.customers.filter(c => c.id !== removedId);
      saveData();
      deleteCustomerFromCloud(removedId);
      el.statementModal.classList.add('hidden');
      renderAll();
    }
  }

  // ===================================================================
  // BACKUP & RESTORE (1-Click Simplicity)
  // ===================================================================
  function downloadBackup() {
    const backupObj = {
      shop: 'M.S Traders',
      location: 'Suritola, Dhaka',
      exportedAt: new Date().toISOString(),
      customers: state.customers
    };

    const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ms-traders-khata-${getTodayISO()}.json`;
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
        const list = Array.isArray(parsed) ? parsed : parsed.customers;
        if (!Array.isArray(list)) throw new Error('Invalid format');

        if (confirm(`ব্যাকআপ ফাইলে ${list.length} জন কাস্টমারের হিসাব আছে। এটি রিস্টোর করবেন?`)) {
          state.customers = list;
          saveData();
          renderAll();
          alert('ব্যাকআপ সফলভাবে রিস্টোর হয়েছে!');
          el.settingsModal.classList.add('hidden');
        }
      } catch {
        alert('ফাইলটি সঠিক JSON ব্যাকআপ নয়!');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  }

  function exportCsv() {
    const headers = ['Party Name', 'Mobile Number', 'Total Purchases (BDT)', 'Total Paid (BDT)', 'Current Due (BDT)'];
    const rows = state.customers.map(c => {
      const st = getPartyStats(c);
      return [
        `"${(c.name || '').replace(/"/g, '""')}"`,
        `"${(c.phone || '').replace(/"/g, '""')}"`,
        st.totalSales,
        st.totalPaid,
        st.due
      ];
    });

    const csv = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ms-traders-customers-${getTodayISO()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ===================================================================
  // LANGUAGE SWITCHER
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
    document.querySelector('.pin-label').textContent = L.pin_label;
    if (el.pinError) el.pinError.textContent = L.pin_error;
    if (el.numClear) el.numClear.textContent = L.num_clear;
    if (el.numEnter) el.numEnter.textContent = L.num_enter;

    el.lblTotalDue.textContent = L.lbl_total_due;
    document.querySelector('.due-tag').textContent = L.tag_total_due;
    el.noteTotalDue.textContent = L.note_total_due;

    el.lblTodayCollected.textContent = L.lbl_today_paid;
    document.querySelector('.paid-tag').textContent = L.tag_today_paid;
    el.noteTodayPaid.textContent = L.note_today_paid;

    el.lblTotalCustomers.textContent = L.lbl_customers;
    document.querySelector('.count-tag').textContent = L.tag_customers;
    el.noteTotalCustomers.textContent = L.note_customers;

    el.btnQuickSaleText.textContent = L.btn_quick_sale;
    el.btnQuickSaleSub.textContent = L.btn_quick_sale_sub;
    el.btnQuickPayText.textContent = L.btn_quick_pay;
    el.btnQuickPaySub.textContent = L.btn_quick_pay_sub;

    el.searchInput.placeholder = L.search_ph;
    document.getElementById('pillAll').textContent = L.pill_all;
    document.getElementById('pillDue').textContent = L.pill_due;
    document.getElementById('pillPaid').textContent = L.pill_paid;

    document.getElementById('emptyTitle').textContent = L.empty_title;
    document.getElementById('emptySub').textContent = L.empty_sub;
    document.querySelector('.persist-badge').textContent = L.persist_badge;
    el.quickBackupBtn.textContent = L.btn_backup;
    el.quickCsvBtn.textContent = L.btn_csv;

    // Sale Modal
    el.saleModalHeading.textContent = L.modal_sale_heading;
    document.getElementById('lblCustName').textContent = L.lbl_name;
    el.custNameInput.placeholder = L.ph_name;
    document.getElementById('lblCustPhone').textContent = L.lbl_phone;
    document.getElementById('lblRexinDesc').textContent = L.lbl_rexin;
    el.rexinDescInput.placeholder = L.ph_rexin;
    document.getElementById('lblMeasureHeader').textContent = L.lbl_measure_header;
    document.getElementById('lblGauze').textContent = L.lbl_gauze;
    document.getElementById('unitGauzeText').textContent = L.unit_gauze;
    document.getElementById('lblGhira').textContent = L.lbl_ghira;
    document.getElementById('lblRate').textContent = L.lbl_rate;
    document.getElementById('lblTotalBill').textContent = L.lbl_total_bill;
    document.getElementById('hintTotalBill').textContent = L.hint_total_bill;
    document.getElementById('lblPaidNow').textContent = L.lbl_paid_now;
    document.getElementById('hintPaidNow').textContent = L.hint_paid_now;
    document.getElementById('lblDueNow').textContent = L.lbl_due_now;
    document.getElementById('lblSaleDate').textContent = L.lbl_date;
    document.getElementById('lblSaleNote').textContent = L.lbl_note;
    el.saleNoteInput.placeholder = L.ph_note;
    el.cancelSaleBtn.textContent = L.btn_cancel;
    el.saveSaleSubmitBtn.textContent = L.btn_save_sale;

    // Ghira options
    const curGhira = el.ghiraSelect.value;
    el.ghiraSelect.innerHTML = L.ghira_list.map((txt, i) => `<option value="${i}">${txt}</option>`).join('');
    el.ghiraSelect.value = curGhira;

    // Payment Modal
    el.payModalHeading.textContent = L.modal_pay_heading;
    document.getElementById('lblPayCustomer').textContent = L.lbl_pay_customer;
    document.getElementById('lblPayAmount').textContent = L.lbl_pay_amount;
    document.getElementById('lblPayMethod').textContent = L.lbl_pay_method;
    document.getElementById('lblPayDate').textContent = L.lbl_date;
    document.getElementById('lblPayNote').textContent = L.lbl_pay_note;
    el.payNoteInput.placeholder = L.ph_pay_note;
    el.cancelPaymentBtn.textContent = L.btn_cancel;
    el.savePaymentSubmitBtn.textContent = L.btn_confirm_pay;

    // Statement Modal
    document.getElementById('lblStSales').textContent = L.lbl_st_sales;
    document.getElementById('lblStPaid').textContent = L.lbl_st_paid;
    document.getElementById('lblStDue').textContent = L.lbl_st_due;
    el.stAddSaleBtn.textContent = L.btn_st_sale;
    el.stAddPayBtn.textContent = L.btn_st_pay;
    el.stWhatsAppBtn.textContent = L.btn_st_wa;
    el.stPrintBtn.textContent = L.btn_st_print;
    el.stDeleteBtn.textContent = L.btn_st_del;
    document.getElementById('lblStHistoryTitle').textContent = L.lbl_st_history;

    // Settings Modal
    document.getElementById('settingsHeading').textContent = L.set_heading;
    document.getElementById('setCard1Title').textContent = L.set_card1_title;
    document.getElementById('setCard1Sub').textContent = L.set_card1_sub;
    el.downloadBackupBtn.textContent = L.btn_dl_backup;
    document.getElementById('lblRestoreBtn').textContent = L.lbl_restore_btn;
    document.getElementById('setCard2Title').textContent = L.set_card2_title;
    el.changePinBtn.textContent = L.btn_change_pin;
    document.getElementById('setCard3Title').textContent = L.set_card3_title;
    document.getElementById('setCard3Sub').textContent = L.set_card3_sub;
    el.resetAllDataBtn.textContent = L.btn_reset_all;
  }

  // ===================================================================
  // THEME & PIN
  // ===================================================================
  function setTheme(t) {
    state.currentTheme = t;
    localStorage.setItem(STORAGE_KEY_THEME, t);
    document.body.classList.toggle('theme-dark', t === 'dark');
    document.body.classList.toggle('theme-light', t !== 'dark');
    el.themeIcon.textContent = t === 'dark' ? '☀️' : '🌙';
  }

  function getSavedPin() {
    return localStorage.getItem(STORAGE_KEY_PIN) || DEFAULT_PIN;
  }

  function attemptUnlock() {
    const val = el.pinInput.value.trim();
    if (val === getSavedPin()) {
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
    el.pinInput.focus();
  }

  function handleChangePin() {
    const oldP = el.oldPinInput.value.trim();
    const newP = el.newPinInput.value.trim();
    if (oldP !== getSavedPin()) {
      el.pinChangeFeedback.textContent = '❌ পুরাতন পিন সঠিক নয়!';
      el.pinChangeFeedback.style.color = 'var(--due-red)';
      return;
    }
    if (!newP || newP.length < 4) {
      el.pinChangeFeedback.textContent = '❌ নতুন পিন কমপক্ষে ৪ সংখ্যার হতে হবে!';
      el.pinChangeFeedback.style.color = 'var(--due-red)';
      return;
    }
    localStorage.setItem(STORAGE_KEY_PIN, newP);
    el.oldPinInput.value = '';
    el.newPinInput.value = '';
    el.pinChangeFeedback.textContent = '✅ পিন সফলভাবে পরিবর্তন হয়েছে!';
    el.pinChangeFeedback.style.color = 'var(--paid-green)';
  }

  // Cloud Connect Handlers
  async function handleConnectCloud() {
    const url = (el.supabaseUrlInput.value || '').trim().replace(/\/+$/, '');
    const key = (el.supabaseKeyInput.value || '').trim();

    if (!url || !key) {
      el.cloudSyncFeedback.textContent = '❌ Supabase URL এবং Anon Key দিন!';
      el.cloudSyncFeedback.style.color = 'var(--due-red)';
      return;
    }

    el.cloudSyncFeedback.textContent = '🔄 সংযোগ পরীক্ষা করা হচ্ছে...';
    el.cloudSyncFeedback.style.color = 'var(--text-muted)';

    try {
      const res = await fetch(`${url}/rest/v1/ms_traders_customers?limit=1`, {
        method: 'GET',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`
        }
      });

      if (!res.ok) {
        throw new Error('Supabase table error');
      }

      localStorage.setItem(STORAGE_KEY_SUPABASE_URL, url);
      localStorage.setItem(STORAGE_KEY_SUPABASE_KEY, key);

      el.cloudSyncFeedback.textContent = '✅ ক্লাউড ডাটাবেস সফলভাবে সংযুক্ত হয়েছে!';
      el.cloudSyncFeedback.style.color = 'var(--paid-green)';
      el.disconnectCloudBtn.classList.remove('hidden');

      // Sync data immediately
      await syncDownFromCloud();
      await syncAllUpToCloud();
    } catch (err) {
      el.cloudSyncFeedback.textContent = '❌ সংযোগ ব্যর্থ! URL/Key ঠিক আছে কি না এবং supabase_setup.sql রান করেছেন কি না যাচাই করুন।';
      el.cloudSyncFeedback.style.color = 'var(--due-red)';
    }
  }

  function handleDisconnectCloud() {
    if (confirm('ক্লাউড সংযোগ বিচ্ছিন্ন করে লোকাল মেমোরিতে ফিরে যাবেন?')) {
      localStorage.removeItem(STORAGE_KEY_SUPABASE_URL);
      localStorage.removeItem(STORAGE_KEY_SUPABASE_KEY);
      el.supabaseUrlInput.value = '';
      el.supabaseKeyInput.value = '';
      el.disconnectCloudBtn.classList.add('hidden');
      el.cloudSyncFeedback.textContent = 'লোকাল মোডে পরিবর্তিত হয়েছে।';
      el.cloudSyncFeedback.style.color = 'var(--text-muted)';
      updateCloudBadge('local');
    }
  }

  // ===================================================================
  // EVENT BINDINGS
  // ===================================================================
  function bindEvents() {
    // Numpad
    el.numKeys.forEach(btn => {
      btn.addEventListener('click', () => {
        if (el.pinInput.value.length < 8) el.pinInput.value += btn.dataset.digit;
      });
    });
    el.numClear.addEventListener('click', () => {
      el.pinInput.value = '';
      el.pinError.classList.add('hidden');
    });
    el.numEnter.addEventListener('click', attemptUnlock);
    el.pinInput.addEventListener('keydown', e => { if (e.key === 'Enter') attemptUnlock(); });
    el.togglePinVis.addEventListener('click', () => {
      el.pinInput.type = el.pinInput.type === 'password' ? 'text' : 'password';
    });

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

    // Cloud settings buttons
    el.saveCloudSyncBtn.addEventListener('click', handleConnectCloud);
    el.disconnectCloudBtn.addEventListener('click', handleDisconnectCloud);

    // Hero buttons
    el.btnQuickSale.addEventListener('click', () => openSaleModal());
    el.btnQuickPayment.addEventListener('click', () => openPaymentModal());

    // Search & Filter
    el.searchInput.addEventListener('input', e => {
      state.searchQuery = e.target.value;
      el.clearSearchBtn.classList.toggle('hidden', !state.searchQuery);
      renderPartyCards();
    });
    el.clearSearchBtn.addEventListener('click', () => {
      el.searchInput.value = '';
      state.searchQuery = '';
      el.clearSearchBtn.classList.add('hidden');
      renderPartyCards();
    });
    el.filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        el.filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeFilter = pill.dataset.filter;
        renderPartyCards();
      });
    });

    // Backup quick actions
    el.quickBackupBtn.addEventListener('click', downloadBackup);
    el.quickCsvBtn.addEventListener('click', exportCsv);

    // Sale Modal Inputs
    el.closeSaleModal.addEventListener('click', closeSaleModal);
    el.cancelSaleBtn.addEventListener('click', closeSaleModal);
    el.gauzeInput.addEventListener('input', calculateMeasure);
    el.ghiraSelect.addEventListener('change', calculateMeasure);
    el.ratePerGauzeInput.addEventListener('input', calculateMeasure);
    el.totalAmountInput.addEventListener('input', updateDueCalculation);
    el.paidAmountInput.addEventListener('input', updateDueCalculation);
    el.saleForm.addEventListener('submit', handleSaveSale);

    // Name suggestions in Sale Modal
    el.custNameInput.addEventListener('input', e => {
      const val = e.target.value.trim().toLowerCase();
      if (!val) {
        el.nameSuggestions.classList.add('hidden');
        return;
      }
      const matches = state.customers.filter(c => c.name.toLowerCase().includes(val) || c.phone.includes(val));
      if (!matches.length) {
        el.nameSuggestions.classList.add('hidden');
        return;
      }
      el.nameSuggestions.innerHTML = matches.map(c => `
        <div class="suggestion-row" data-id="${escape(c.id)}">
          <strong>${escape(c.name)}</strong> · ${escape(c.phone)}
        </div>
      `).join('');
      el.nameSuggestions.classList.remove('hidden');

      el.nameSuggestions.querySelectorAll('.suggestion-row').forEach(row => {
        row.addEventListener('click', () => {
          const c = state.customers.find(x => x.id === row.dataset.id);
          if (c) {
            el.custNameInput.value = c.name;
            el.custPhoneInput.value = c.phone;
          }
          el.nameSuggestions.classList.add('hidden');
        });
      });
    });

    // Payment Modal
    el.closePaymentModal.addEventListener('click', closePaymentModal);
    el.cancelPaymentBtn.addEventListener('click', closePaymentModal);
    el.paymentForm.addEventListener('submit', handleSavePayment);

    // Statement Modal Actions
    el.closeStatementModal.addEventListener('click', () => el.statementModal.classList.add('hidden'));
    el.stAddSaleBtn.addEventListener('click', () => openSaleModal(state.selectedPartyId));
    el.stAddPayBtn.addEventListener('click', () => openPaymentModal(state.selectedPartyId));
    el.stWhatsAppBtn.addEventListener('click', () => sendWhatsApp(state.selectedPartyId));
    el.stPrintBtn.addEventListener('click', triggerPrint);
    el.stDeleteBtn.addEventListener('click', deleteParty);

    // Settings Modal
    el.closeSettingsModal.addEventListener('click', () => el.settingsModal.classList.add('hidden'));
    el.downloadBackupBtn.addEventListener('click', downloadBackup);
    el.restoreFileInput.addEventListener('change', restoreBackup);
    el.changePinBtn.addEventListener('click', handleChangePin);
    el.resetAllDataBtn.addEventListener('click', () => {
      if (confirm('সতর্কতা: সব কাস্টমার ও হিসাবের রেকর্ড চিরতরে মুছে ফেলবেন?')) {
        state.customers = [];
        saveData();
        renderAll();
        el.settingsModal.classList.add('hidden');
        alert('সকল তথ্য মুছে ফেলা হয়েছে।');
      }
    });

    // Close on backdrop click
    [el.saleModal, el.paymentModal, el.statementModal, el.settingsModal].forEach(m => {
      m.addEventListener('click', e => {
        if (e.target === m) m.classList.add('hidden');
      });
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
