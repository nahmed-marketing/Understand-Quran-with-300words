/**
 * ============================================================
 * GENERATED SCRIPT.JS — DO NOT EDIT DIRECTLY
 * Edit in admin.html dashboard and download this file
 * ============================================================
 */

// --- CASHFREE PAYMENT GATEWAY ---
const CHECKOUT_URL = " https://www.cashfree.com/pg/checkout";
const CASHFREE_APP_ID = "1084130b5b83e67546bfbb985b50314801";
const CASHFREE_SECRET = "cfsk_ma_prod_b8f3b4fbbd019b28a5179057bd86920f_2a42caaf";
const CASHFREE_MODE = "production";
const CASHFREE_CURRENCY = "INR";
const CASHFREE_RETURN_URL = "https://masterlibraries/thank-you.html";

// --- PRODUCT ---
const PRODUCT_PRICE = 299;
const PRODUCT_NAME = "Understand Al-Quran With 300 Words";

// --- GLOBAL STATISTICS ---
const GLOBAL_STATS = {
    totalMuslims: 1900000000,
    muslimsWhoUnderstandQuranArabic: 300000000,
    muslimsWhoDoNotUnderstandQuranArabic: 1600000000,
    sourceName: "SOURCE TO BE ADDED",
    sourceURL: ""
};

// --- META ADS CAMPAIGN ---
const CAMPAIGN_CONFIG = {
    headline: "Understand More of the Qur'an — One Word at a Time.",
    subheadline: "Many Qur'anic words may already sound familiar to you—especially if you speak Urdu. This ebook helps you recognize those words, understand their meanings, and begin seeing Qur'anic vocabulary with greater clarity.",
    ctaText: "Get Your Copy Now"
};

// --- META PIXEL ---
const META_PIXEL_ID = "YOUR_META_PIXEL_ID";
const PIXEL_ACTIVE = true;
const TRACK_EVENTS = {
    pageView: true,
    viewContent: true,
    initiateCheckout: true
};

// --- CONTENT SETTINGS ---
const CONTENT = {
    hero: {
        headline: "Understand More of the Qur'an — One Word at a Time.",
        subheadline: "Many Qur'anic words may already sound familiar to you—especially if you speak Urdu. This ebook helps you recognize those words, understand their meanings, and begin seeing Qur'anic vocabulary with greater clarity.",
        cta: "Get Your Copy Now"
    },
    reflection: {
        headline: "We Recite These Words Every Day. But Do We Know What They Mean?",
        question: "But how much do we understand?",
        hope: "This is not something to feel hopeless about. Every journey begins somewhere. And perhaps yours can begin with just one word."
    },
    final: {
        headline: "The Qur'an Is Closer Than You Think.",
        cta: "Get Your Copy & Start Learning"
    },
    bigIdea: {
        words: "300",
        coverage: "70%",
        themes: "5"
    },
    price: "₹299"
};

// --- SITE SETTINGS ---
const SITE_SETTINGS = {
    title: "Understand Al-Quran With 300 Words | Learn Qur'anic Vocabulary",
    description: "Learn 300 carefully selected Qur'anic words through meaningful themes, Arabic vocabulary, Roman Urdu meanings, English meanings, and example ayahs.",
    canonical: "https://masterlibraries.com/"
};

console.log('✅ 300 Words — Loaded with Cashfree settings!');

/**
 * ============================================================
 * CASHFREE PAYMENT FUNCTIONS
 * ============================================================
 */

function initiateCashfreePayment() {
    // Build the payment data
    const paymentData = {
        appId: CASHFREE_APP_ID,
        orderId: 'ORDER_' + Date.now(),
        orderAmount: PRODUCT_PRICE,
        orderCurrency: CASHFREE_CURRENCY || 'INR',
        orderNote: PRODUCT_NAME,
        customerName: 'Customer',
        customerEmail: 'customer@example.com',
        customerPhone: '9999999999',
        returnUrl: CASHFREE_RETURN_URL || window.location.href,
        notifyUrl: CASHFREE_RETURN_URL || window.location.href
    };

    // For sandbox, use the sandbox URL
    const baseUrl = CASHFREE_MODE === 'production' 
        ? 'https://www.cashfree.com/pg/checkout'
        : 'https://sandbox.cashfree.com/pg/checkout';

    // Redirect to Cashfree checkout with parameters
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = baseUrl;

    Object.keys(paymentData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = paymentData[key];
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

// --- GET CHECKOUT URL (for backward compatibility) ---
function getCheckoutURL() {
    return CHECKOUT_URL;
}

function captureUTMParameters() {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    utmKeys.forEach(key => {
        const value = params.get(key);
        if (value) sessionStorage.setItem(key, value);
    });
}

function getUTMParameters() {
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const utmData = {};
    utmKeys.forEach(key => {
        const value = sessionStorage.getItem(key);
        if (value) utmData[key] = value;
    });
    return utmData;
}

function trackEvent(eventName, params = {}) {
    console.log(`[TRACK] ${eventName}`, params);
    if (typeof fbq !== 'undefined' && META_PIXEL_ID !== "YOUR_META_PIXEL_ID" && PIXEL_ACTIVE) {
        fbq('track', eventName, params);
    }
}

function trackPageView() { if (TRACK_EVENTS.pageView) trackEvent('PageView'); }
function trackViewContent() { if (TRACK_EVENTS.viewContent) trackEvent('ViewContent', { content_name: 'Understand Al-Quran With 300 Words', content_type: 'product', price: PRODUCT_PRICE }); }
function trackInitiateCheckout() { if (TRACK_EVENTS.initiateCheckout) trackEvent('InitiateCheckout', { content_name: 'Understand Al-Quran With 300 Words', content_type: 'product', price: PRODUCT_PRICE }); }

// --- SETUP CTAs with Cashfree ---
function setupCTAs() {
    document.querySelectorAll('a[href="#"], .btn, .btn-primary, .btn-gold, .btn-hero, .btn-final, .btn-sticky, .header-cta').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const isCTA = this.classList.contains('btn') || this.classList.contains('header-cta') || this.classList.contains('btn-sticky');
            if (isCTA && CASHFREE_APP_ID !== "YOUR_CASHFREE_APP_ID") {
                e.preventDefault();
                trackInitiateCheckout();
                // Use Cashfree payment flow
                initiateCashfreePayment();
            } else if (this.getAttribute('href') === '#') {
                e.preventDefault();
                document.getElementById('finalcta')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// --- NUMBER COUNTER ---
function animateNumber(element, target, duration = 2000) {
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(0 + (target - 0) * eased);
        if (target >= 1000000000) element.textContent = (current / 1000000000).toFixed(1) + 'B+';
        else if (target >= 1000000) element.textContent = (current / 1000000).toFixed(1) + 'M';
        else element.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else {
            if (target >= 1000000000) element.textContent = (target / 1000000000).toFixed(1) + 'B+';
            else if (target >= 1000000) element.textContent = (target / 1000000).toFixed(1) + 'M';
            else element.textContent = target.toLocaleString();
        }
    }
    requestAnimationFrame(update);
}

// --- PIE CHART ---
function updatePieChart(understand, translate) {
    const total = understand + translate;
    if (total === 0) { document.querySelector('.pie-center').textContent = '0%'; return; }
    const understandPercent = (understand / total) * 100;
    const translatePercent = (translate / total) * 100;
    const pieUnderstand = document.getElementById('pieUnderstand');
    const pieTranslate = document.getElementById('pieTranslate');
    const pieCenter = document.querySelector('.pie-center');
    const uAngle = (understandPercent / 100) * 360;
    const uRad = (uAngle - 90) * Math.PI / 180;
    const uX = 50 + 50 * Math.cos(uRad);
    const uY = 50 + 50 * Math.sin(uRad);
    const tAngle = 360 - (translatePercent / 100) * 360;
    const tRad = (tAngle - 90) * Math.PI / 180;
    const tX = 50 + 50 * Math.cos(tRad);
    const tY = 50 + 50 * Math.sin(tRad);
    if (understandPercent > 0) {
        pieUnderstand.style.clipPath = `polygon(50% 50%, 50% 0%, ${uX}% ${uY}%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`;
        pieUnderstand.style.transform = 'rotate(0deg)';
    }
    if (translatePercent > 0) {
        pieTranslate.style.clipPath = `polygon(50% 50%, 50% 0%, ${tX}% ${tY}%, 0% 0%, 0% 100%, 100% 100%, 100% 0%, 50% 0%)`;
        pieTranslate.style.transform = 'rotate(0deg)';
    }
    pieCenter.textContent = Math.round(understandPercent) + '%';
}

// --- BAR CHART ---
function updateBarChart(total, understand, translate) {
    const maxValue = Math.max(total, understand, translate);
    if (maxValue === 0) return;
    const barTotal = document.getElementById('barTotal');
    const barUnderstand = document.getElementById('barUnderstand');
    const barTranslate = document.getElementById('barTranslate');
    const barTotalLabel = document.getElementById('barTotalLabel');
    const barUnderstandLabel = document.getElementById('barUnderstandLabel');
    const barTranslateLabel = document.getElementById('barTranslateLabel');
    setTimeout(() => {
        barTotal.style.width = (total / maxValue * 100) + '%';
        barUnderstand.style.width = (understand / maxValue * 100) + '%';
        barTranslate.style.width = (translate / maxValue * 100) + '%';
    }, 300);
    const fmt = n => n >= 1000000000 ? (n/1000000000).toFixed(1)+'B' : n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(1)+'K' : n.toString();
    barTotalLabel.textContent = fmt(total);
    barUnderstandLabel.textContent = fmt(understand);
    barTranslateLabel.textContent = fmt(translate);
}

// --- HEADER SCROLL ---
function setupHeader() {
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        header?.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// --- STICKY CTA ---
function setupStickyCTA() {
    const stickyCta = document.getElementById('stickyCta');
    const hero = document.getElementById('hero');
    const finalCta = document.getElementById('finalcta');
    if (!stickyCta || !hero || !finalCta) return;
    window.addEventListener('scroll', () => {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const finalTop = finalCta.offsetTop;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        if (scrollY > heroBottom - 100 && scrollY < finalTop - windowHeight) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    });
}

// --- FAQ ---
function setupFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            document.querySelectorAll('.faq-question').forEach(other => {
                if (other !== this) other.setAttribute('aria-expanded', 'false');
            });
            this.setAttribute('aria-expanded', !expanded);
        });
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
        });
    });
}

// --- SCROLL REVEAL ---
function setupScrollReveal() {
    const elements = document.querySelectorAll('.theme-card, .benefit-card, .sample-card, .step, .testimonial-card, .infographic-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// --- SCROLL TRACKING ---
let scrollTracked = { 25: false, 50: false, 75: false, 100: false };
function trackScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    [25, 50, 75, 100].forEach(threshold => {
        if (scrollPercent >= threshold && !scrollTracked[threshold]) {
            scrollTracked[threshold] = true;
            trackEvent('ScrollDepth', { percentage: threshold });
        }
    });
}

// --- INIT ---
function init() {
    captureUTMParameters();
    trackPageView();
    setTimeout(trackViewContent, 2000);
    setupCTAs();
    setupHeader();
    setupStickyCTA();
    setupFAQ();
    setupScrollReveal();
    window.addEventListener('scroll', trackScroll, { passive: true });

    const stats = GLOBAL_STATS;
    const total = stats.totalMuslims || 1900000000;
    const understand = stats.muslimsWhoUnderstandQuranArabic || 300000000;
    const translate = stats.muslimsWhoDoNotUnderstandQuranArabic || 1600000000;
    const counterEl = document.getElementById('populationCounter');
    if (counterEl) animateNumber(counterEl, total);
    const sourceEl = document.getElementById('sourceName');
    if (sourceEl) sourceEl.textContent = stats.sourceName || "SOURCE TO BE ADDED";
    updatePieChart(understand, translate);
    updateBarChart(total, understand, translate);

    console.log('🔹 300 Words — Landing Page Loaded with Cashfree Integration');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
