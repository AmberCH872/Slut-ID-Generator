/**
 * Template 1: 奴隶身份卡 Controller
 */

let scCurrentBgColor = '#ede4f8';

function updateScQR() {
    const code = document.getElementById('sc-in-badge-code')?.value.trim() 
        || document.getElementById('sc-in-header-id')?.value.trim() 
        || '恶魔服从识别码 DOG-NO.001';
    const qrBox = document.getElementById('sc-out-qr-box');
    if (!qrBox) return;
    try {
        if (typeof qrcode !== 'undefined') {
            const qr = qrcode(0, 'M');
            qr.addData(code);
            qr.make();
            qrBox.innerHTML = qr.createSvgTag({ scalable: true, margin: 1 });
            const svg = qrBox.querySelector('svg');
            if (svg) {
                svg.style.width = '100%';
                svg.style.height = '100%';
                svg.style.display = 'block';
            }
        }
    } catch (e) {
        console.error('Error generating slave QR code:', e);
    }
}

function updateScField(field) {
    const input = document.getElementById(`sc-in-${field}`);
    const output = document.getElementById(`sc-out-${field}`);
    if (input && output) {
        output.innerText = input.value;
    }
    if (field === 'badge-code' || field === 'header-id') {
        updateScQR();
    }
}

function updateScPhotoTransform() {
    updatePhotoTransform('sc');
}

function handleScPhotoUpload(e) {
    handleImageUpload(e, 'sc-out-photo');
}

function resetScPhoto() {
    const photo = document.getElementById('sc-out-photo');
    if (photo) photo.src = 'assets/tpl1/avatar_default.png';
    const zoom = document.getElementById('sc-in-zoom');
    const panX = document.getElementById('sc-in-pan-x');
    const panY = document.getElementById('sc-in-pan-y');
    const rot = document.getElementById('sc-in-rot');
    const file = document.getElementById('sc-in-photo-file');

    if (zoom) zoom.value = '1.0';
    if (panX) panX.value = '0';
    if (panY) panY.value = '0';
    if (rot) rot.value = '0';
    if (file) file.value = '';
    updateScPhotoTransform();
}

function toggleScSticker() {
    const chk = document.getElementById('sc-in-sticker-enable');
    const sticker = document.getElementById('sc-out-sticker');
    const ctrl = document.getElementById('sc-sticker-controls');
    if (chk && sticker) {
        sticker.style.display = chk.checked ? 'flex' : 'none';
    }
    if (chk && ctrl) {
        ctrl.style.display = chk.checked ? 'grid' : 'none';
    }
}

function updateScStickerText() {
    const input = document.getElementById('sc-in-sticker-text');
    const sticker = document.getElementById('sc-out-sticker');
    if (input && sticker) {
        sticker.innerText = input.value;
    }
}

function updateScStickerPos() {
    const slider = document.getElementById('sc-in-sticker-y');
    const sticker = document.getElementById('sc-out-sticker');
    const valText = document.getElementById('sc-val-sticker-y');
    if (slider && sticker) {
        sticker.style.top = `${slider.value}%`;
    }
    if (slider && valText) {
        valText.innerText = `${slider.value}%`;
    }
}

function selectScBg(color, name) {
    scCurrentBgColor = color;
    const card = document.getElementById('sc-card-node');
    if (card) card.style.setProperty('--sc-card-bg', color);
    const colorPicker = document.getElementById('sc-in-custom-bg');
    if (colorPicker) colorPicker.value = color;
}

function updateScBgOpacity() {
    const slider = document.getElementById('sc-in-bg-opacity');
    const valText = document.getElementById('sc-val-bg-opacity');
    const bgImg = document.getElementById('sc-card-bg-img');
    if (slider && bgImg) {
        const val = slider.value;
        bgImg.style.opacity = (val / 100).toString();
        if (valText) valText.innerText = `${val}%`;
    }
}

function toggleScBgImage() {
    const chk = document.getElementById('sc-in-bg-enable');
    const bgLayer = document.getElementById('sc-card-bg-layer');
    const ctrl = document.getElementById('sc-bg-opacity-controls');
    if (chk && bgLayer) {
        bgLayer.style.display = chk.checked ? 'block' : 'none';
    }
    if (chk && ctrl) {
        ctrl.style.opacity = chk.checked ? '1' : '0.4';
        ctrl.style.pointerEvents = chk.checked ? 'auto' : 'none';
    }
}

function handleScBgUpload(e) {
    handleImageUpload(e, 'sc-card-bg-img');
    const chk = document.getElementById('sc-in-bg-enable');
    if (chk && !chk.checked) {
        chk.checked = true;
        toggleScBgImage();
    }
}

function resetScBgImage() {
    const bgImg = document.getElementById('sc-card-bg-img');
    if (bgImg) bgImg.src = 'assets/IMG_20261031_200600_743.jpg';
    const slider = document.getElementById('sc-in-bg-opacity');
    if (slider) slider.value = '40';
    const file = document.getElementById('sc-in-bg-file');
    if (file) file.value = '';
    const chk = document.getElementById('sc-in-bg-enable');
    if (chk) {
        chk.checked = true;
        toggleScBgImage();
    }
    updateScBgOpacity();
}

function toggleScQR() {
    const chk = document.getElementById('sc-in-qr-enable');
    const qr = document.getElementById('sc-out-qr-container');
    if (chk && qr) {
        qr.style.display = chk.checked ? 'block' : 'none';
    }
}

function selectScFont(fontKey) {
    const fonts = {
        sans: "'Noto Sans SC', sans-serif",
        serif: "'Noto Serif SC', serif",
        handwriting: "'Ma Shan Zheng', cursive",
        cute: "'ZCOOL KuaiLe', cursive"
    };
    const card = document.getElementById('sc-card-node');
    if (card) card.style.setProperty('--sc-card-font', fonts[fontKey]);

    ['sans', 'serif', 'handwriting', 'cute'].forEach(k => {
        const btn = document.getElementById(`sc-font-btn-${k}`);
        if (btn) {
            btn.className = (k === fontKey)
                ? 'font-opt-btn py-2 px-2 rounded-lg border text-xs font-bold transition text-left flex flex-col gap-0.5 bg-red-950/60 border-red-500 ring-red-500/40 text-white shadow-sm ring-1'
                : 'font-opt-btn py-2 px-2 rounded-lg border text-xs font-bold transition text-left flex flex-col gap-0.5 bg-gray-950 border-gray-700 text-gray-300 hover:border-gray-500';
        }
    });
}

function randomizeScCode() {
    const rand5 = Math.floor(10000 + Math.random() * 90000);
    const headerInput = document.getElementById('sc-in-header-id');
    const badgeInput = document.getElementById('sc-in-badge-code');
    if (headerInput) {
        headerInput.value = `ID:  SLAVE-REG-SYS-AUTH-${rand5}`;
        updateScField('header-id');
    }
    if (badgeInput) {
        badgeInput.value = `奴隶识别码 SLAVE-NO.${rand5}`;
        updateScField('badge-code');
    }
}

function clearScFields() {
    ['name', 'gender', 'status', 'role', 'kinks', 'quote'].forEach(k => {
        const el = document.getElementById(`sc-in-${k}`);
        if (el) el.value = '';
        updateScField(k);
    });
}

function resetScDefaults() {
    const defaults = {
        'header-id': 'ID:  MAKIMA-DEVIL-SYS-AUTH-001',
        'badge-code': '恶魔服从识别码 DOG-NO.001',
        'title': '奴 隶 身 份 卡',
        'subtitle': 'CONFIDENTIAL  /  REGISTRY',
        'name': '玛奇玛',
        'gender': '女',
        'status': '专属私有',
        'role': '支配恶魔专属忠犬便器',
        'kinks': '支配反转，项圈拘束，完全服从，深喉口交，强制高潮',
        'quote': '我自愿放弃支配恶魔的全部权能，甘愿戴上项圈成为主人的专属忠犬……汪汪！',
        'sticker-text': '雌  犬'
    };
    Object.entries(defaults).forEach(([k, v]) => {
        const el = document.getElementById(`sc-in-${k}`);
        if (el) el.value = v;
        if (k === 'sticker-text') updateScStickerText();
        else updateScField(k);
    });
    resetScPhoto();
    resetScBgImage();
    selectScFont('sans');
    selectScBg('#ede4f8', '淡紫色');
    updateScQR();
}

function exportSc(scaleRatio = 1) {
    const node = document.getElementById('sc-card-node');
    const name = document.getElementById('sc-in-name')?.value.trim() || '奴隶';
    const code = (document.getElementById('sc-in-badge-code')?.value.match(/\d+/) || ['000'])[0];
    triggerExport(node, `奴隶身份卡_${name}_NO.${code}_${scaleRatio}X.png`, scaleRatio, scCurrentBgColor, 1011, 638);
}
