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

    const hash = location.hash.replace('#', '');
    if (hash === 'bimbo-back') {
        switchTemplate('bimbo');
        switchBimboSide('back');
    } else if (['slave', 'bbc', 'cert', 'bimbo'].includes(hash)) {
        switchTemplate(hash);
    } else {
        fitCurrentScreen();
    }
    window.addEventListener('resize', fitCurrentScreen);

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
                ? `px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${tabColors[t]} text-white shadow-md`
                : 'px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap text-gray-300 hover:text-white';
        }
    });

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
    const aside = document.getElementById('editor-aside');
    const area = document.getElementById('canvas-area-wrapper');
    const btnEdit = document.getElementById('m-btn-edit');
    const btnPrev = document.getElementById('m-btn-preview');

    if (mode === 'edit') {
        aside?.classList.remove('hidden');
        area?.classList.add('hidden');
        if (btnEdit) btnEdit.className = 'py-2 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 bg-red-600 text-white shadow';
        if (btnPrev) btnPrev.className = 'py-2 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 bg-gray-900 text-gray-300 border border-gray-800';
    } else {
        aside?.classList.add('hidden');
        area?.classList.remove('hidden');
        if (btnPrev) btnPrev.className = 'py-2 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 bg-red-600 text-white shadow';
        if (btnEdit) btnEdit.className = 'py-2 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 bg-gray-900 text-gray-300 border border-gray-800';
        setTimeout(fitCurrentScreen, 50);
    }
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

    const isMobile = window.innerWidth < 768;
    const padX = isMobile ? 24 : 48;
    const padY = isMobile ? 24 : 48;

    const availableW = Math.max(160, w - padX);
    const availableH = Math.max(160, h - padY);

    const [cardW, cardH] = getActiveCardDimensions();
    const scaleW = availableW / cardW;
    const scaleH = availableH / cardH;

    const idealScale = isMobile ? scaleW : Math.min(scaleW, scaleH);
    currentScale = Math.max(0.2, Math.min(1.0, Math.round(idealScale * 100) / 100));
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
