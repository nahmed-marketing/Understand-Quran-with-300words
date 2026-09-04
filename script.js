/**
 * ============================================================
 * CONFIGURATION – Edit these variables to customize your site
 * ============================================================
 */

// --- CHECKOUT CONFIGURATION ---
const CHECKOUT_URL = "YOUR_CHECKOUT_LINK_HERE";

// --- GLOBAL STATISTICS (replace with verified data) ---
const GLOBAL_STATS = {
    totalMuslims: 0,              // e.g. 1900000000
    muslimsWhoUnderstandQuranArabic: 0,  // e.g. 300000000
    muslimsWhoDoNotUnderstandQuranArabic: 0, // e.g. 1600000000
    sourceName: "SOURCE TO BE ADDED",
    sourceURL: ""
};

// --- META ADS CAMPAIGN CONFIGURATION ---
const CAMPAIGN_CONFIG = {
    headline: "",
    subheadline: "",
    ctaText: ""
};

// --- META PIXEL ---
const META_PIXEL_ID = "YOUR_META_PIXEL_ID";

/**
 * ============================================================
 * UTILITY FUNCTIONS
 * ============================================================
 */

// Capture UTM parameters
function captureUTMParameters() {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const utmData = {};
    utmKeys.forEach(key => {
        const value = params.get(key);
        if (value) {
            utmData[key] = value;
            sessionStorage.setItem(key, value);
        }
    });
    return utmData;
}

// Get stored UTM parameters
function getUTMParameters() {
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const utmData = {};
    utmKeys.forEach(key => {
        const value = sessionStorage.getItem(key);
        if (value) utmData[key] = value;
    });
    return utmData;
}

// Build checkout URL with UTM parameters
function getCheckoutURL() {
    let url = CHECKOUT_URL;
    const utm = getUTMParameters();
    const params = new URLSearchParams();
    Object.keys(utm).forEach(key => {
        if (utm[key]) params.set(key, utm[key]);
    });
    const queryString = params.toString();
    if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
    }
    return url;
}

// --- TRACKING FUNCTIONS ---
function trackEvent(eventName, params = {}) {
    console.log(`[TRACK] ${eventName}`, params);
    // Meta Pixel tracking placeholder
    if (typeof fbq !== 'undefined' && META_PIXEL_ID !== "YOUR_META_PIXEL_ID") {
        fbq('track', eventName, params);
    }
}

function trackPageView() {
    trackEvent('PageView');
}

function trackViewContent() {
    trackEvent('ViewContent', {
        content_name: 'Understand Al-Quran With 300 Words',
        content_type: 'product'
    });
}

function trackInitiateCheckout() {
    trackEvent('InitiateCheckout', {
        content_name: 'Understand Al-Quran With 300 Words',
        content_type: 'product'
    });
}

function trackScrollDepth(percentage) {
    trackEvent('ScrollDepth', { percentage });
}

// --- SCROLL DEPTH TRACKING ---
let scrollTracked = { 25: false, 50: false, 75: false, 100: false };

function trackScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    [25, 50, 75, 100].forEach(threshold => {
        if (scrollPercent >= threshold && !scrollTracked[threshold]) {
            scrollTracked[threshold] = true;
            trackScrollDepth(threshold);
        }
    });
}

/**
 * ============================================================
 * CTA HANDLING
 * ============================================================
 */

function setupCTAs() {
    const ctas = document.querySelectorAll('a[href="#"], .btn');
    ctas.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const isCTA = this.classList.contains('btn') || 
                          this.classList.contains('header-cta') || 
                          this.classList.contains('btn-sticky');
            
            if (isCTA && CHECKOUT_URL !== "YOUR_CHECKOUT_LINK_HERE") {
                e.preventDefault();
                trackInitiateCheckout();
                const url = getCheckoutURL();
                if (url && url !== "YOUR_CHECKOUT_LINK_HERE") {
                    window.location.href = url;
                } else {
                    // Fallback: scroll to final CTA
                    document.getElementById('finalcta').scrollIntoView({ behavior: 'smooth' });
                }
            } else if (this.getAttribute('href') === '#') {
                e.preventDefault();
                // Scroll to final CTA as fallback
                const target = document.getElementById('finalcta');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * ============================================================
 * NUMBER COUNTER ANIMATION
 * ============================================================
 */

function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (target - start) * eased);
        
        if (target >= 1000000000) {
            element.textContent = (current / 1000000000).toFixed(1) + 'B+';
        } else if (target >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M';
        } else {
            element.textContent = current.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (target >= 1000000000) {
                element.textContent = (target / 1000000000).toFixed(1) + 'B+';
            } else if (target >= 1000000) {
                element.textContent = (target / 1000000).toFixed(1) + 'M';
            } else {
                element.textContent = target.toLocaleString();
            }
        }
    }
    requestAnimationFrame(update);
}

/**
 * ============================================================
 * PIE CHART
 * ============================================================
 */

function updatePieChart(understand, translate) {
    const total = understand + translate;
    if (total === 0) {
        document.querySelector('.pie-center').textContent = '0%';
        return;
    }
    
    const understandPercent = (understand / total) * 100;
    const translatePercent = (translate / total) * 100;
    
    const pieUnderstand = document.getElementById('pieUnderstand');
    const pieTranslate = document.getElementById('pieTranslate');
    const pieCenter = document.querySelector('.pie-center');
    
    // Understand segment: from 0 to understandPercent
    const understandAngle = (understandPercent / 100) * 360;
    const translateAngle = (translatePercent / 100) * 360;
    
    // Use clip-path with polygon for pie slices
    // For understand: from 0 to understandAngle
    const uAngle = understandAngle;
    const uRad = (uAngle - 90) * Math.PI / 180;
    const uX = 50 + 50 * Math.cos(uRad);
    const uY = 50 + 50 * Math.sin(uRad);
    
    const tAngle = 360 - translateAngle;
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

/**
 * ============================================================
 * BAR CHART
 * ============================================================
 */

function updateBarChart(total, understand, translate) {
    const maxValue = Math.max(total, understand, translate);
    if (maxValue === 0) return;
    
    const barTotal = document.getElementById('barTotal');
    const barUnderstand = document.getElementById('barUnderstand');
    const barTranslate = document.getElementById('barTranslate');
    const barTotalLabel = document.getElementById('barTotalLabel');
    const barUnderstandLabel = document.getElementById('barUnderstandLabel');
    const barTranslateLabel = document.getElementById('barTranslateLabel');
    
    const totalPercent = (total / maxValue) * 100;
    const understandPercent = (understand / maxValue) * 100;
    const translatePercent = (translate / maxValue) * 100;
    
    setTimeout(() => {
        barTotal.style.width = totalPercent + '%';
        barUnderstand.style.width = understandPercent + '%';
        barTranslate.style.width = translatePercent + '%';
    }, 300);
    
    barTotalLabel.textContent = formatNumber(total);
    barUnderstandLabel.textContent = formatNumber(understand);
    barTranslateLabel.textContent = formatNumber(translate);
}

function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

/**
 * ============================================================
 * HEADER SCROLL EFFECT
 * ============================================================
 */

function setupHeader() {
    const header = document.getElementById('siteHeader');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });
}

/**
 * ============================================================
 * STICKY CTA
 * ============================================================
 */

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

/**
 * ============================================================
 * FAQ ACCORDION
 * ============================================================
 */

function setupFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    
    questions.forEach(btn => {
        btn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            // Close other items
            questions.forEach(other => {
                if (other !== this) {
                    other.setAttribute('aria-expanded', 'false');
                }
            });
            this.setAttribute('aria-expanded', !expanded);
        });
        
        // Keyboard support
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * ============================================================
 * SCROLL REVEAL ANIMATIONS
 * ============================================================
 */

function setupScrollReveal() {
    const elements = document.querySelectorAll('.theme-card, .benefit-card, .sample-card, .step, .testimonial-card, .infographic-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * ============================================================
 * INITIALIZATION
 * ============================================================
 */

function init() {
    // Capture UTM parameters
    captureUTMParameters();
    
    // Track page view
    trackPageView();
    setTimeout(trackViewContent, 2000);
    
    // Setup CTAs
    setupCTAs();
    
    // Setup header
    setupHeader();
    
    // Setup sticky CTA
    setupStickyCTA();
    
    // Setup FAQ
    setupFAQ();
    
    // Setup scroll reveal
    setupScrollReveal();
    
    // Setup scroll tracking
    window.addEventListener('scroll', trackScroll, { passive: true });
    
    // Update infographics with data
    const stats = GLOBAL_STATS;
    const total = stats.totalMuslims || 1900000000;
    const understand = stats.muslimsWhoUnderstandQuranArabic || 300000000;
    const translate = stats.muslimsWhoDoNotUnderstandQuranArabic || 1600000000;
    
    // Population counter
    const counterEl = document.getElementById('populationCounter');
    if (counterEl) {
        animateNumber(counterEl, total);
    }
    
    // Source name
    const sourceEl = document.getElementById('sourceName');
    if (sourceEl) {
        sourceEl.textContent = stats.sourceName || "SOURCE TO BE ADDED";
    }
    
    // Pie chart
    updatePieChart(understand, translate);
    
    // Bar chart
    updateBarChart(total, understand, translate);
    
    console.log('🔹 Understand Al-Quran With 300 Words — Landing Page Ready');
    console.log('📊 Checkout URL:', CHECKOUT_URL);
    console.log('📈 Stats:', stats);
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
