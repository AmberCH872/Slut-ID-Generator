/**
 * App Main Controller & Viewport Engine
 */

let currentTemplate = 'slave'; // 'slave' | 'bbc' | 'cert' | 'bimbo'
let mobileMode = 'edit';       // 'edit' | 'preview'
let currentScale = 1.0;

window.addEventListener('DOMContentLoaded', () => {
    initBbcKinks();
    initCert();
    initBimboRules();
    updateScQR();
    updateCertQR();
    updateBimboQR();
    initTouchZoom();
    setMobileMode('edit');
    if (typeof initAutosaveListeners === 'function') {
        initAutosaveListeners();
    }

    const hash = location.hash.replace('#', '');
    if (hash === 'bimbo-back') {
        switchTemplate('bimbo');
        switchBimboSide('back');
    } else if (['slave', 'bbc', 'cert', 'bimbo'].includes(hash)) {
        switchTemplate(hash);
    } else {
        fitCurrentScreen();
        trackPageView('/#slave', '🏷️ 奴隶身份卡 - 证件与协议工坊');
        trackEvent('template_view', {
            template_id: 'slave',
            template_name: '🏷️ 奴隶身份卡'
        });
    }
    window.addEventListener('resize', () => {
        fitCurrentScreen();
    });

    // Modern ResizeObserver to guarantee auto-fit when layout or window settles
    if (typeof ResizeObserver !== 'undefined') {
        const mainEl = document.getElementById('canvas-main');
        if (mainEl) {
            const ro = new ResizeObserver(() => {
                fitCurrentScreen();
            });
            ro.observe(mainEl);
        }
    }
});

window.addEventListener('load', () => {
    fitCurrentScreen();
    setTimeout(fitCurrentScreen, 80);
});

function switchTemplate(tpl) {
    currentTemplate = tpl;
    if (location.hash !== '#' + tpl) {
        history.replaceState(null, '', '#' + tpl);
    }

    const templateNames = {
        slave: '🏷️ 奴隶身份卡',
        bbc: '♠️ 身份证',
        cert: '📜 登记证书',
        bimbo: '🎀 双面身份卡'
    };
    const tplName = templateNames[tpl] || tpl;
    trackPageView(`/#${tpl}`, `${tplName} - 证件与协议工坊`);
    trackEvent('template_view', {
        template_id: tpl,
        template_name: tplName
    });

    const tabColors = {
        slave: 'bg-red-600',
        bbc: 'bg-purple-700',
        cert: 'bg-blue-600',
        bimbo: 'bg-pink-600'
    };

    ['slave', 'bbc', 'cert', 'bimbo'].forEach(t => {
        const btn = document.getElementById(`tab-btn-${t}`);
        if (btn) {
            btn.className = (t === tpl)
                ? `px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${tabColors[t]} text-white shadow-md`
                : 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap text-gray-300 hover:text-white';
        }
    });

    const mobileSel = document.getElementById('mobile-template-select');
    if (mobileSel) {
        mobileSel.value = tpl;
        const borderColors = {
            slave: 'border-red-600',
            bbc: 'border-purple-600',
            cert: 'border-blue-600',
            bimbo: 'border-pink-600'
        };
        mobileSel.className = `w-full bg-gray-900 text-white font-bold text-xs rounded-xl border ${borderColors[tpl] || 'border-gray-700'} focus:outline-none appearance-none shadow-sm cursor-pointer truncate`;
    }

    document.getElementById('tpl1-editor')?.classList.toggle('hidden', tpl !== 'slave');
    document.getElementById('tpl2-editor')?.classList.toggle('hidden', tpl !== 'bbc');
    document.getElementById('tpl3-editor')?.classList.toggle('hidden', tpl !== 'cert');
    document.getElementById('tpl4-editor')?.classList.toggle('hidden', tpl !== 'bimbo');

    document.getElementById('sc-card-node')?.classList.toggle('hidden', tpl !== 'slave');
    document.getElementById('bbc-card-node')?.classList.toggle('hidden', tpl !== 'bbc');
    document.getElementById('cert-certificate-node')?.classList.toggle('hidden', tpl !== 'cert');
    document.getElementById('bimbo-card-node')?.classList.toggle('hidden', tpl !== 'bimbo');

    const sideSelector = document.getElementById('bimbo-side-selector');
    if (sideSelector) {
        sideSelector.classList.toggle('hidden', tpl !== 'bimbo');
    }

    const dims = {
        slave: '尺寸: 1011 × 638 px (85.6 × 54.0 mm @ 300 PPI)',
        bbc: '尺寸: 1011 × 638 px (85.6 × 54.0 mm @ 300 PPI)',
        cert: '尺寸: 850 × 1200 px (A4 协议标准)',
        bimbo: '尺寸: 1011 × 638 px (85.6 × 54.0 mm @ 300 PPI)'
    };
    const tipEl = document.getElementById('card-dimension-tip');
    if (tipEl) tipEl.innerText = dims[tpl];

    fitCurrentScreen();
}

function setMobileMode(mode) {
    mobileMode = mode;
    document.body.setAttribute('data-mobile-mode', mode);

    const aside = document.getElementById('editor-aside');
    const area = document.getElementById('canvas-area-wrapper');
    const btnEdit = document.getElementById('m-btn-edit');
    const btnPrev = document.getElementById('m-btn-preview');
    const floatBtnEdit = document.getElementById('m-float-btn-edit');
    const floatBtnPrev = document.getElementById('m-float-btn-prev');

    const activeClasses = 'py-2 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 bg-red-600 text-white shadow';
    const inactiveClasses = 'py-2 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 bg-gray-900 text-gray-300 border border-gray-800';

    const floatActive = 'flex-1 py-2 px-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 bg-red-600 text-white shadow';
    const floatInactive = 'flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 bg-gray-900 text-gray-300 border border-gray-800';

    if (mode === 'edit') {
        aside?.classList.remove('hidden');
        area?.classList.add('hidden');
        if (btnEdit) btnEdit.className = activeClasses;
        if (btnPrev) btnPrev.className = inactiveClasses;
        if (floatBtnEdit) floatBtnEdit.className = floatActive;
        if (floatBtnPrev) floatBtnPrev.className = floatInactive;
    } else {
        aside?.classList.add('hidden');
        area?.classList.remove('hidden');
        if (btnPrev) btnPrev.className = activeClasses;
        if (btnEdit) btnEdit.className = inactiveClasses;
        if (floatBtnPrev) floatBtnPrev.className = floatActive;
        if (floatBtnEdit) floatBtnEdit.className = floatInactive;
        fitCurrentScreen();
        setTimeout(fitCurrentScreen, 30);
        setTimeout(fitCurrentScreen, 150);
    }
}

let touchStartDist = 0;
let touchStartScale = 1.0;
let lastTapTime = 0;

function initTouchZoom() {
    const main = document.getElementById('canvas-main');
    if (!main) return;

    main.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            touchStartDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            touchStartScale = currentScale;
        }
    }, { passive: true });

    main.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2 && touchStartDist > 0) {
            const currentDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const ratio = currentDist / touchStartDist;
            const newScale = Math.max(0.18, Math.min(2.2, Math.round(touchStartScale * ratio * 100) / 100));
            currentScale = newScale;
            applyCurrentScale();
        }
    }, { passive: true });

    // Double tap to toggle zoom between fit-screen and 100%
    main.addEventListener('touchend', (e) => {
        if (e.touches.length === 0) {
            touchStartDist = 0;
            const now = Date.now();
            if (now - lastTapTime < 320) {
                if (currentScale < 0.85) {
                    resetCurrentZoom(1.0);
                } else {
                    fitCurrentScreen();
                }
            }
            lastTapTime = now;
        }
    });
}

function getActiveCardDimensions() {
    if (currentTemplate === 'slave') return [1011, 638];
    if (currentTemplate === 'bbc') return [1011, 638];
    if (currentTemplate === 'bimbo') return [1011, 638];
    const cert = document.getElementById('cert-certificate-node');
    const h = (cert && cert.offsetHeight > 1200) ? cert.offsetHeight : 1200;
    return [850, h];
}

function getActiveCardNode() {
    if (currentTemplate === 'slave') return document.getElementById('sc-card-node');
    if (currentTemplate === 'bbc') return document.getElementById('bbc-card-node');
    if (currentTemplate === 'bimbo') return document.getElementById('bimbo-card-node');
    return document.getElementById('cert-certificate-node');
}

function fitCurrentScreen() {
    const main = document.getElementById('canvas-main');
    if (!main) return;

    const rect = main.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w < 80 || h < 80) {
        requestAnimationFrame(() => setTimeout(fitCurrentScreen, 50));
        return;
    }

    const style = window.getComputedStyle(main);
    const padL = parseFloat(style.paddingLeft) || 0;
    const padR = parseFloat(style.paddingRight) || 0;
    const padT = parseFloat(style.paddingTop) || 0;
    const padB = parseFloat(style.paddingBottom) || 0;

    // 8px breathing room prevents subpixel rounding jitter
    const availableW = Math.max(160, w - padL - padR - 8);
    const availableH = Math.max(160, h - padT - padB - 8);

    const [cardW, cardH] = getActiveCardDimensions();
    const scaleW = availableW / cardW;
    const scaleH = availableH / cardH;

    const idealScale = Math.min(scaleW, scaleH);
    currentScale = Math.max(0.18, Math.min(1.0, Math.floor(idealScale * 100) / 100));
    applyCurrentScale();
}

function adjustCurrentZoom(delta) {
    currentScale = Math.max(0.2, Math.min(2.0, currentScale + delta));
    applyCurrentScale();
}

function resetCurrentZoom(val) {
    currentScale = val;
    applyCurrentScale();
}

function applyCurrentScale() {
    const [w, h] = getActiveCardDimensions();
    const box = document.getElementById('scaler-outer-box');
    const card = getActiveCardNode();
    const zoomText = document.getElementById('global-zoom-text');

    if (box && card) {
        box.style.width = `${Math.round(w * currentScale)}px`;
        box.style.height = `${Math.round(h * currentScale)}px`;
        card.style.transform = `scale(${currentScale})`;
        card.style.transformOrigin = 'top left';
    }
    if (zoomText) {
        zoomText.innerText = `${Math.round(currentScale * 100)}%`;
    }
}
