/**
 * App Main Controller & Viewport Engine
 */

let currentTemplate = 'slave'; // 'slave' | 'bbc' | 'cert' | 'bimbo' | 'postcard'
let mobileMode = 'edit';       // 'edit' | 'preview'
let currentScale = 1.0;

window.addEventListener('DOMContentLoaded', () => {
    initBbcKinks();
    initCert();
    initBimboRules();
    if (typeof initPostcard === 'function') {
        initPostcard();
    }
    updateScQR();
    updateCertQR();
    updateBimboQR();
    initTouchZoom();
    setMobileMode('edit');
    if (typeof initPhotoTouchGestures === 'function') {
        initPhotoTouchGestures();
    }
    if (typeof initMobilePiP === 'function') {
        initMobilePiP();
    }
    if (typeof initFieldOverflowWarnings === 'function') {
        initFieldOverflowWarnings();
    }
    if (typeof initI18n === 'function') {
        initI18n();
    }
    if (typeof initAutosaveListeners === 'function') {
        initAutosaveListeners();
    }
    if (typeof initPostmarkSystem === 'function') {
        initPostmarkSystem();
    }

    const hash = location.hash.replace('#', '');
    if (hash === 'bimbo-back') {
        switchTemplate('bimbo');
        switchBimboSide('back');
    } else if (hash === 'postcard-back') {
        switchTemplate('postcard');
        if (typeof switchPostcardSide === 'function') {
            switchPostcardSide('back');
        }
    } else if (['slave', 'bbc', 'cert', 'bimbo', 'postcard'].includes(hash)) {
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
        bimbo: '🎀 双面身份卡',
        postcard: '💌 母畜明信片'
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
        bimbo: 'bg-pink-600',
        postcard: 'bg-amber-600'
    };

    ['slave', 'bbc', 'cert', 'bimbo', 'postcard'].forEach(t => {
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
            bimbo: 'border-pink-600',
            postcard: 'border-amber-600'
        };
        mobileSel.className = `w-full bg-gray-900 text-white font-bold text-xs rounded-xl border ${borderColors[tpl] || 'border-gray-700'} focus:outline-none appearance-none shadow-sm cursor-pointer truncate`;
    }

    document.getElementById('tpl1-editor')?.classList.toggle('hidden', tpl !== 'slave');
    document.getElementById('tpl2-editor')?.classList.toggle('hidden', tpl !== 'bbc');
    document.getElementById('tpl3-editor')?.classList.toggle('hidden', tpl !== 'cert');
    document.getElementById('tpl4-editor')?.classList.toggle('hidden', tpl !== 'bimbo');
    document.getElementById('tpl5-editor')?.classList.toggle('hidden', tpl !== 'postcard');

    document.getElementById('sc-card-node')?.classList.toggle('hidden', tpl !== 'slave');
    document.getElementById('bbc-card-node')?.classList.toggle('hidden', tpl !== 'bbc');
    document.getElementById('cert-certificate-node')?.classList.toggle('hidden', tpl !== 'cert');
    document.getElementById('bimbo-card-node')?.classList.toggle('hidden', tpl !== 'bimbo');
    document.getElementById('postcard-card-node')?.classList.toggle('hidden', tpl !== 'postcard');

    const bimboSelector = document.getElementById('bimbo-side-selector');
    if (bimboSelector) {
        bimboSelector.classList.toggle('hidden', tpl !== 'bimbo');
    }
    const postcardSelector = document.getElementById('postcard-side-selector');
    if (postcardSelector) {
        postcardSelector.classList.toggle('hidden', tpl !== 'postcard');
    }
    const pipFlip = document.getElementById('pip-btn-flip');
    if (pipFlip) {
        pipFlip.classList.toggle('hidden', tpl !== 'bimbo' && tpl !== 'postcard');
    }

    if (typeof loadDefaultPersonaForLanguage === 'function' && typeof currentLang !== 'undefined') {
        loadDefaultPersonaForLanguage(tpl, currentLang);
    }

    const tipEl = document.getElementById('card-dimension-tip');
    if (tipEl) {
        if (typeof t === 'function') {
            tipEl.innerText = t('dim_' + tpl);
        } else {
            const dims = {
                slave: '尺寸: 1011 × 638 px (85.6 × 54.0 mm @ 300 PPI)',
                bbc: '尺寸: 1011 × 638 px (85.6 × 54.0 mm @ 300 PPI)',
                cert: '尺寸: 850 × 1200 px (A4 协议标准)',
                bimbo: '尺寸: 1011 × 638 px (85.6 × 54.0 mm @ 300 PPI)',
                postcard: '尺寸: 1011 × 638 px (85.6 × 54.0 mm @ 300 PPI)'
            };
            tipEl.innerText = dims[tpl];
        }
    }

    fitCurrentScreen();
}

let isPipCollapsed = false;

function setMobileMode(mode) {
    mobileMode = mode;
    document.body.setAttribute('data-mobile-mode', mode);

    const aside = document.getElementById('editor-aside');
    const area = document.getElementById('canvas-area-wrapper');
    const btnEdit = document.getElementById('m-btn-edit');
    const btnPrev = document.getElementById('m-btn-preview');
    const floatBtnEdit = document.getElementById('m-float-btn-edit');
    const floatBtnPrev = document.getElementById('m-float-btn-prev');
    const pipBar = document.getElementById('pip-controls-bar');
    const pipFlip = document.getElementById('pip-btn-flip');

    const activeClasses = 'py-2 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 bg-red-600 text-white shadow';
    const inactiveClasses = 'py-2 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 bg-gray-900 text-gray-300 border border-gray-800';

    const floatActive = 'flex-1 py-2 px-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 bg-red-600 text-white shadow';
    const floatInactive = 'flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 bg-gray-900 text-gray-300 border border-gray-800';

    if (pipFlip) {
        pipFlip.classList.toggle('hidden', currentTemplate !== 'bimbo' && currentTemplate !== 'postcard');
    }

    if (mode === 'edit') {
        aside?.classList.remove('hidden');
        area?.classList.remove('hidden');
        if (pipBar) {
            pipBar.classList.toggle('hidden', window.innerWidth >= 768);
        }
        if (btnEdit) btnEdit.className = activeClasses;
        if (btnPrev) btnPrev.className = inactiveClasses;
        if (floatBtnEdit) floatBtnEdit.className = floatActive;
        if (floatBtnPrev) floatBtnPrev.className = floatInactive;
        fitCurrentScreen();
        setTimeout(fitCurrentScreen, 50);
    } else {
        aside?.classList.add('hidden');
        area?.classList.remove('hidden');
        if (pipBar) pipBar.classList.add('hidden');
        if (btnPrev) btnPrev.className = activeClasses;
        if (btnEdit) btnEdit.className = inactiveClasses;
        if (floatBtnPrev) floatBtnPrev.className = floatActive;
        if (floatBtnEdit) floatBtnEdit.className = floatInactive;
        fitCurrentScreen();
        setTimeout(fitCurrentScreen, 30);
        setTimeout(fitCurrentScreen, 150);
    }
}

function togglePipCollapse(forceState) {
    if (typeof forceState === 'boolean') {
        isPipCollapsed = forceState;
    } else {
        isPipCollapsed = !isPipCollapsed;
    }
    document.body.classList.toggle('pip-collapsed', isPipCollapsed);
    const btn = document.getElementById('pip-btn-collapse');
    if (btn) {
        btn.innerText = isPipCollapsed ? '➕' : '➖';
        btn.title = isPipCollapsed ? '展开画中画' : '缩小折叠';
    }
    if (!isPipCollapsed) {
        fitCurrentScreen();
    }
}

function pipFlipActiveCard() {
    if (currentTemplate === 'bimbo') {
        if (typeof flipBimboCard === 'function') flipBimboCard();
    } else if (currentTemplate === 'postcard') {
        if (typeof flipPostcardCard === 'function') flipPostcardCard();
    }
}

function initMobilePiP() {
    const main = document.getElementById('canvas-main');
    if (main) {
        main.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && mobileMode === 'edit' && !isPipCollapsed) {
                if (!e.target.closest('#canvas-top-bar') && !e.target.closest('#pip-btn-flip')) {
                    setMobileMode('preview');
                }
            }
        });
    }

    const wrapper = document.getElementById('canvas-area-wrapper');
    if (wrapper) {
        wrapper.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && mobileMode === 'edit' && isPipCollapsed) {
                if (!e.target.closest('#pip-btn-collapse')) {
                    togglePipCollapse(false);
                }
            }
        });
    }

    const aside = document.getElementById('editor-aside');
    if (aside) {
        aside.addEventListener('focusin', () => {
            if (window.innerWidth < 768 && mobileMode === 'edit') {
                document.body.classList.add('keyboard-open');
            }
        });
        aside.addEventListener('focusout', () => {
            document.body.classList.remove('keyboard-open');
        });
    }
}

function initFieldOverflowWarnings() {
    const fieldsWithThresholds = [
        { id: 'sc-in-name', max: 14 },
        { id: 'sc-in-badge-code', max: 20 },
        { id: 'sc-in-vow', max: 55 },
        { id: 'sc-in-prop-1', max: 24 },
        { id: 'sc-in-prop-2', max: 24 },
        { id: 'sc-in-prop-3', max: 24 },
        { id: 'sc-in-prop-4', max: 24 },

        { id: 'bbc-in-name', max: 14 },
        { id: 'bbc-in-id-num', max: 22 },
        { id: 'bbc-in-address', max: 32 },

        { id: 'cert-in-name', max: 14 },
        { id: 'cert-in-master', max: 14 },
        { id: 'cert-in-code', max: 22 },

        { id: 'bimbo-in-name', max: 14 },
        { id: 'bimbo-in-code', max: 20 },
        { id: 'bimbo-in-title', max: 16 },

        { id: 'postcard-in-front-title', max: 16 },
        { id: 'postcard-in-recipient', max: 14 },
        { id: 'postcard-in-sender', max: 14 }
    ];

    fieldsWithThresholds.forEach(({ id, max }) => {
        const input = document.getElementById(id);
        if (!input) return;

        let badge = document.getElementById(`${id}-overflow-badge`);
        if (!badge) {
            badge = document.createElement('div');
            badge.id = `${id}-overflow-badge`;
            badge.className = 'text-[10px] font-mono mt-0.5 text-right transition-colors duration-150 text-gray-500 hidden';
            if (input.nextSibling) {
                input.parentNode.insertBefore(badge, input.nextSibling);
            } else {
                input.parentNode.appendChild(badge);
            }
        }

        const updateCount = () => {
            const len = input.value ? input.value.length : 0;
            if (len === 0) {
                badge.innerText = '';
                badge.classList.add('hidden');
                return;
            }
            badge.classList.remove('hidden');
            if (len <= max * 0.85) {
                badge.className = 'text-[10px] font-mono mt-0.5 text-right transition-colors text-gray-500';
                badge.innerText = `${len}/${max}`;
            } else if (len <= max) {
                badge.className = 'text-[10px] font-mono mt-0.5 text-right transition-colors text-amber-400 font-bold';
                badge.innerText = `${len}/${max} (${typeof t === 'function' ? t('overflow_warn_near') : '接近上限'})`;
            } else {
                badge.className = 'text-[10px] font-mono mt-0.5 text-right transition-colors text-red-400 font-black animate-pulse';
                badge.innerText = `${len}/${max} (${typeof t === 'function' ? t('overflow_warn_exceeded') : '已超长可能溢出'})`;
            }
        };

        input.addEventListener('input', updateCount);
        input.addEventListener('focus', updateCount);
    });
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
    if (currentTemplate === 'postcard') return [1011, 638];
    const cert = document.getElementById('cert-certificate-node');
    const h = (cert && cert.offsetHeight > 1200) ? cert.offsetHeight : 1200;
    return [850, h];
}

function getActiveCardNode() {
    if (currentTemplate === 'slave') return document.getElementById('sc-card-node');
    if (currentTemplate === 'bbc') return document.getElementById('bbc-card-node');
    if (currentTemplate === 'bimbo') return document.getElementById('bimbo-card-node');
    if (currentTemplate === 'postcard') return document.getElementById('postcard-card-node');
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

    const [cardW, cardH] = getActiveCardDimensions();

    // In mobile edit PiP mode, let preview card fill the mini window edge-to-edge
    if (window.innerWidth < 768 && mobileMode === 'edit' && !isPipCollapsed) {
        const scaleW = w / cardW;
        const scaleH = h / cardH;
        currentScale = Math.min(scaleW, scaleH);
        applyCurrentScale();
        return;
    }

    const style = window.getComputedStyle(main);
    const padL = parseFloat(style.paddingLeft) || 0;
    const padR = parseFloat(style.paddingRight) || 0;
    const padT = parseFloat(style.paddingTop) || 0;
    const padB = parseFloat(style.paddingBottom) || 0;

    // 8px breathing room prevents subpixel rounding jitter
    const availableW = Math.max(100, w - padL - padR - 8);
    const availableH = Math.max(60, h - padT - padB - 8);

    const scaleW = availableW / cardW;
    const scaleH = availableH / cardH;

    const idealScale = Math.min(scaleW, scaleH);
    currentScale = Math.max(0.08, Math.min(1.0, Math.floor(idealScale * 100) / 100));
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
