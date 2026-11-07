/**
 * Template 5: 母畜明信片 (Kinky Postcard) Controller
 */

let postcardCurrentSide = 'front'; // 'front' | 'back'
let postcardCurrentStamp = 'stamp-wax-heart';
let postcardCurrentFrame = 'full'; // 'full' | 'polaroid' | 'postal'
let postcardCurrentFilter = 'normal'; // 'normal' | 'noir' | 'sepia' | 'cyber'
let postcardCurrentMark = 'kiss'; // 'kiss' | 'paw' | 'wax' | 'none'
let postcardCustomStampUrl = null;

const POSTCARD_STAMPS = [
    {
        id: 'stamp-wax-heart',
        name: '69¢ Wax Seal Heart',
        nameZh: '69¢ 蜡封爱心',
        denomination: '69¢',
        svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="120" fill="#fee2e2" rx="4" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,3" />
            <rect x="8" y="8" width="84" height="104" fill="#991b1b" rx="2" />
            <circle cx="50" cy="55" r="28" fill="#ef4444" stroke="#fca5a5" stroke-width="2" />
            <path d="M 50 68 C 36 50 25 38 35 28 C 45 18 50 30 50 32 C 50 30 55 18 65 28 C 75 38 64 50 50 68 Z" fill="#ffffff" />
            <text x="50" y="98" font-family="'Georgia', serif" font-size="11" fill="#fef2f2" font-weight="bold" text-anchor="middle">69¢</text>
            <text x="50" y="20" font-family="'Courier New', monospace" font-size="8" fill="#fca5a5" text-anchor="middle" letter-spacing="1">LOVE POST</text>
        </svg>`
    },
    {
        id: 'stamp-leather-paddle',
        name: 'Discipline Paddle',
        nameZh: '$1.00 惩戒皮拍',
        denomination: '$1.00',
        svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="120" fill="#fef2f2" rx="4" stroke="#991b1b" stroke-width="2" stroke-dasharray="3,3" />
            <rect x="8" y="8" width="84" height="104" fill="#450a0a" rx="2" />
            <g transform="translate(50, 52) rotate(25)">
                <rect x="-8" y="-22" width="16" height="26" rx="4" fill="#991b1b" stroke="#f87171" stroke-width="1.5"/>
                <rect x="-3" y="4" width="6" height="18" rx="1.5" fill="#1c1917" stroke="#a8a29e" stroke-width="1"/>
            </g>
            <text x="50" y="98" font-family="'Courier New', monospace" font-size="11" fill="#fecaca" font-weight="bold" text-anchor="middle">$1.00</text>
            <text x="50" y="20" font-family="'Courier New', monospace" font-size="8" fill="#ef4444" text-anchor="middle" letter-spacing="1">PRIORITY STING</text>
        </svg>`
    },
    {
        id: 'stamp-cuffs',
        name: 'Golden Restraints',
        nameZh: '45¢ 黄金手铐',
        denomination: '45¢',
        svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="120" fill="#fef3c7" rx="4" stroke="#d97706" stroke-width="2" stroke-dasharray="3,3" />
            <rect x="8" y="8" width="84" height="104" fill="#78350f" rx="2" />
            <circle cx="38" cy="52" r="14" fill="none" stroke="#fcd34d" stroke-width="3" />
            <circle cx="62" cy="52" r="14" fill="none" stroke="#fcd34d" stroke-width="3" />
            <line x1="48" y1="52" x2="52" y2="52" stroke="#fef08a" stroke-width="3" stroke-dasharray="2,2"/>
            <text x="50" y="98" font-family="'Cinzel', Georgia, serif" font-size="11" fill="#fef3c7" font-weight="bold" text-anchor="middle">45¢</text>
            <text x="50" y="20" font-family="'Cinzel', Georgia, serif" font-size="7" fill="#fbbf24" text-anchor="middle" letter-spacing="1">BOUND FAST</text>
        </svg>`
    },
    {
        id: 'stamp-collar',
        name: 'O-Ring Collar',
        nameZh: 'MASTER 锁喉项圈',
        denomination: 'MASTER',
        svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="120" fill="#f4f4f5" rx="4" stroke="#27272a" stroke-width="2" stroke-dasharray="3,3" />
            <rect x="8" y="8" width="84" height="104" fill="#18181b" rx="2" />
            <rect x="25" y="44" width="50" height="12" rx="2" fill="#3f3f46" stroke="#a1a1aa" stroke-width="1.5" />
            <circle cx="50" cy="62" r="8" fill="none" stroke="#e4e4e7" stroke-width="2.5" />
            <text x="50" y="98" font-family="'Cinzel', Georgia, serif" font-size="10" fill="#f4f4f5" font-weight="bold" text-anchor="middle">D/S CLASS</text>
            <text x="50" y="20" font-family="'Cinzel', Georgia, serif" font-size="7" fill="#a1a1aa" text-anchor="middle" letter-spacing="1">COLLARED</text>
        </svg>`
    },
    {
        id: 'stamp-kiss',
        name: 'Cherry Lips',
        nameZh: 'AIRMAIL 诱惑红唇',
        denomination: 'AIRMAIL',
        svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="120" fill="#ffe4e6" rx="4" stroke="#e11d48" stroke-width="2" stroke-dasharray="3,3" />
            <rect x="8" y="8" width="84" height="104" fill="#881337" rx="2" />
            <path d="M 30 52 C 38 42, 45 48, 50 50 C 55 48, 62 42, 70 52 C 65 62, 55 64, 50 62 C 45 64, 35 62, 30 52 Z" fill="#fb7185" stroke="#f43f5e" stroke-width="1.5" />
            <text x="50" y="98" font-family="'Helvetica Neue', sans-serif" font-size="10" fill="#ffe4e6" font-weight="bold" text-anchor="middle">SEALED</text>
            <text x="50" y="20" font-family="'Helvetica Neue', sans-serif" font-size="8" fill="#fda4af" text-anchor="middle" letter-spacing="1">AIRMAIL</text>
        </svg>`
    },
    {
        id: 'stamp-devil',
        name: 'Playful Horns',
        nameZh: '666 调皮恶魔角',
        denomination: '666',
        svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="120" fill="#f3e8ff" rx="4" stroke="#7c3aed" stroke-width="2" stroke-dasharray="3,3" />
            <rect x="8" y="8" width="84" height="104" fill="#581c87" rx="2" />
            <circle cx="50" cy="54" r="18" fill="#9333ea" />
            <path d="M 36 44 L 30 30 L 42 38 Z" fill="#c084fc" />
            <path d="M 64 44 L 70 30 L 58 38 Z" fill="#c084fc" />
            <text x="50" y="98" font-family="'Impact', sans-serif" font-size="12" fill="#f3e8ff" text-anchor="middle">MISCHIEF</text>
            <text x="50" y="20" font-family="'Courier New', monospace" font-size="8" fill="#d8b4fe" text-anchor="middle" letter-spacing="1">SPECIAL</text>
        </svg>`
    }
];

const POSTCARD_MARKS = {
    kiss: `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg" class="w-14 h-10">
        <path d="M 15 35 C 28 20, 42 28, 50 30 C 58 28, 72 20, 85 35 C 78 50, 62 55, 50 50 C 38 55, 22 50, 15 35 Z" fill="#dc2626" opacity="0.85"/>
        <path d="M 22 35 Q 50 42 78 35" stroke="#991b1b" stroke-width="2.5" fill="none"/>
    </svg>`,
    paw: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
        <ellipse cx="50" cy="65" rx="24" ry="20" fill="#e11d48" opacity="0.8" />
        <circle cx="25" cy="38" r="10" fill="#e11d48" opacity="0.8" />
        <circle cx="42" cy="25" r="11" fill="#e11d48" opacity="0.8" />
        <circle cx="58" cy="25" r="11" fill="#e11d48" opacity="0.8" />
        <circle cx="75" cy="38" r="10" fill="#e11d48" opacity="0.8" />
    </svg>`,
    wax: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-14 h-14">
        <circle cx="50" cy="50" r="42" fill="#991b1b" stroke="#7f1d1d" stroke-width="3" opacity="0.85" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="#fca5a5" stroke-width="1.5" stroke-dasharray="3,2" />
        <text x="50" y="44" font-family="'Cinzel', serif" font-size="9" fill="#fef2f2" font-weight="bold" text-anchor="middle" letter-spacing="1">CLAIMED</text>
        <text x="50" y="58" font-family="'Cinzel', serif" font-size="12" fill="#fef2f2" font-weight="bold" text-anchor="middle">MASTER</text>
        <text x="50" y="70" font-family="'Cinzel', serif" font-size="7" fill="#fca5a5" text-anchor="middle">VERIFIED</text>
    </svg>`,
    none: ''
};

function initPostcard() {
    renderPostcardStampOptions();
    applyPostcardStamp();
    applyPostcardMark();
    updatePostcardPostcode();
    
    // Default date if empty
    const dateInput = document.getElementById('postcard-in-postmark-date');
    if (dateInput && !dateInput.value) {
        const d = new Date();
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        dateInput.value = `★ ${months[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')} ${d.getFullYear()} ★`;
        const outDate = document.getElementById('postcard-out-postmark-date');
        if (outDate) outDate.innerText = dateInput.value;
    }
}

function switchPostcardSide(side) {
    postcardCurrentSide = side;
    const flipper = document.getElementById('postcard-card-flipper');
    if (flipper) {
        if (side === 'back') {
            flipper.classList.add('is-flipped');
        } else {
            flipper.classList.remove('is-flipped');
        }
    }

    const btnFront = document.getElementById('postcard-side-btn-front');
    const btnBack = document.getElementById('postcard-side-btn-back');

    if (btnFront) {
        btnFront.className = (side === 'front')
            ? 'px-2 py-1 rounded-md font-bold bg-amber-600 text-white shadow-sm transition'
            : 'px-2 py-1 rounded-md font-bold text-gray-300 hover:text-white transition';
    }
    if (btnBack) {
        btnBack.className = (side === 'back')
            ? 'px-2 py-1 rounded-md font-bold bg-amber-600 text-white shadow-sm transition'
            : 'px-2 py-1 rounded-md font-bold text-gray-300 hover:text-white transition';
    }

    switchPostcardEditTab(side);
}

function flipPostcardCard() {
    const nextSide = (postcardCurrentSide === 'front') ? 'back' : 'front';
    switchPostcardSide(nextSide);
}

function switchPostcardEditTab(side) {
    const tabFront = document.getElementById('postcard-edit-tab-btn-front');
    const tabBack = document.getElementById('postcard-edit-tab-btn-back');
    const secFront = document.getElementById('postcard-edit-section-front');
    const secBack = document.getElementById('postcard-edit-section-back');

    if (tabFront) {
        tabFront.className = (side === 'front')
            ? 'flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 bg-amber-600 text-white shadow-sm'
            : 'flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 text-gray-400 hover:text-white';
    }
    if (tabBack) {
        tabBack.className = (side === 'back')
            ? 'flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 bg-amber-600 text-white shadow-sm'
            : 'flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 text-gray-400 hover:text-white';
    }

    secFront?.classList.toggle('hidden', side !== 'front');
    secBack?.classList.toggle('hidden', side !== 'back');
}

function updatePostcardField(field) {
    const input = document.getElementById(`postcard-in-${field}`);
    const output = document.getElementById(`postcard-out-${field}`);
    if (input && output) {
        output.innerText = input.value;
    }
}

function selectPostcardPresetPhoto(src) {
    const img = document.getElementById('postcard-out-photo');
    if (img) img.src = src;

    // Reset transforms
    const zoomIn = document.getElementById('postcard-in-zoom');
    const panXIn = document.getElementById('postcard-in-pan-x');
    const panYIn = document.getElementById('postcard-in-pan-y');
    const rotIn = document.getElementById('postcard-in-rot');

    if (zoomIn) zoomIn.value = '1';
    if (panXIn) panXIn.value = '0';
    if (panYIn) panYIn.value = '0';
    if (rotIn) rotIn.value = '0';

    if (typeof updatePhotoTransform === 'function') {
        updatePhotoTransform('postcard');
    }
}

function setPostcardFrame(frame) {
    postcardCurrentFrame = frame;
    const container = document.getElementById('postcard-front-container');
    if (container) {
        container.classList.remove('frame-full', 'frame-polaroid', 'frame-postal');
        container.classList.add(`frame-${frame}`);
    }

    ['full', 'polaroid', 'postal'].forEach(f => {
        const btn = document.getElementById(`postcard-frame-btn-${f}`);
        if (btn) {
            btn.className = (f === frame)
                ? 'py-1 px-2.5 rounded-lg text-xs font-bold transition bg-amber-600 text-white shadow-sm'
                : 'py-1 px-2.5 rounded-lg text-xs font-bold transition bg-gray-800 text-gray-300 hover:text-white border border-gray-700';
        }
    });
}

function setPostcardFilter(filter) {
    postcardCurrentFilter = filter;
    const overlay = document.getElementById('postcard-photo-overlay');
    if (overlay) {
        overlay.classList.remove('filter-normal', 'filter-noir', 'filter-sepia', 'filter-cyber');
        overlay.classList.add(`filter-${filter}`);
    }

    ['normal', 'noir', 'sepia', 'cyber'].forEach(fl => {
        const btn = document.getElementById(`postcard-filter-btn-${fl}`);
        if (btn) {
            btn.className = (fl === filter)
                ? 'py-1 px-2.5 rounded-lg text-xs font-bold transition bg-amber-600 text-white shadow-sm'
                : 'py-1 px-2.5 rounded-lg text-xs font-bold transition bg-gray-800 text-gray-300 hover:text-white border border-gray-700';
        }
    });
}

function renderPostcardStampOptions() {
    const container = document.getElementById('postcard-stamp-options-container');
    if (!container) return;

    container.innerHTML = POSTCARD_STAMPS.map(stamp => `
        <button type="button" onclick="selectPostcardStamp('${stamp.id}')" id="postcard-stamp-btn-${stamp.id}"
            class="p-1 rounded-lg border ${postcardCurrentStamp === stamp.id ? 'border-amber-500 bg-amber-950/40 ring-1 ring-amber-500' : 'border-gray-700 bg-gray-900/60 hover:border-gray-500'} flex flex-col items-center gap-1 transition">
            <div class="w-12 h-14 overflow-hidden pointer-events-none flex items-center justify-center">
                ${stamp.svg}
            </div>
            <span class="text-[9.5px] font-mono text-gray-300 truncate max-w-[56px] text-center">${stamp.denomination}</span>
        </button>
    `).join('');
}

function selectPostcardStamp(stampId) {
    postcardCurrentStamp = stampId;
    postcardCustomStampUrl = null;
    renderPostcardStampOptions();
    applyPostcardStamp();
}

function handlePostcardCustomStampUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        postcardCustomStampUrl = e.target.result;
        postcardCurrentStamp = 'custom';
        renderPostcardStampOptions();
        applyPostcardStamp();
    };
    reader.readAsDataURL(file);
}

function applyPostcardStamp() {
    const wrapper = document.getElementById('postcard-stamp-svg-wrapper');
    if (!wrapper) return;

    if (postcardCustomStampUrl) {
        wrapper.innerHTML = `
            <div class="w-full h-full rounded-sm border-2 border-dashed border-red-700 bg-rose-50 p-1 flex flex-col items-center justify-between">
                <span class="text-[7px] font-mono font-bold text-red-900 uppercase">AIRMAIL</span>
                <img src="${postcardCustomStampUrl}" alt="Custom Stamp" class="w-full h-[85px] object-cover rounded">
                <span class="text-[7px] font-mono font-bold text-red-900 uppercase">OFFICIAL</span>
            </div>
        `;
        return;
    }

    const found = POSTCARD_STAMPS.find(s => s.id === postcardCurrentStamp) || POSTCARD_STAMPS[0];
    wrapper.innerHTML = found.svg;
}

function selectPostcardMark(markId) {
    postcardCurrentMark = markId;
    applyPostcardMark();

    ['kiss', 'paw', 'wax', 'none'].forEach(m => {
        const btn = document.getElementById(`postcard-mark-btn-${m}`);
        if (btn) {
            btn.className = (m === markId)
                ? 'py-1 px-2.5 rounded-lg text-xs font-bold transition bg-amber-600 text-white shadow-sm'
                : 'py-1 px-2.5 rounded-lg text-xs font-bold transition bg-gray-800 text-gray-300 hover:text-white border border-gray-700';
        }
    });
}

function applyPostcardMark() {
    const markContainer = document.getElementById('postcard-out-kiss-mark');
    if (markContainer) {
        markContainer.innerHTML = POSTCARD_MARKS[postcardCurrentMark] || '';
    }
}

function setPostcardFont(fontType) {
    const fonts = {
        sans: "'Noto Sans SC', sans-serif",
        serif: "'Noto Serif SC', serif",
        handwriting: "'Ma Shan Zheng', cursive, serif",
        cute: "'ZCOOL KuaiLe', cursive, sans-serif"
    };

    const chosenFont = fonts[fontType] || fonts.handwriting;
    document.documentElement.style.setProperty('--postcard-card-font', chosenFont);

    const msgEl = document.getElementById('postcard-out-message');
    if (msgEl) msgEl.style.fontFamily = chosenFont;

    const signEl = document.getElementById('postcard-out-signoff');
    if (signEl) signEl.style.fontFamily = chosenFont;

    const toEl = document.getElementById('postcard-out-to-name');
    if (toEl) toEl.style.fontFamily = chosenFont;

    const fromEl = document.getElementById('postcard-out-from-name');
    if (fromEl) fromEl.style.fontFamily = chosenFont;

    ['sans', 'serif', 'handwriting', 'cute'].forEach(f => {
        const btn = document.getElementById(`postcard-font-btn-${f}`);
        if (btn) {
            btn.className = (f === fontType)
                ? 'flex-1 py-1.5 rounded-lg text-xs font-bold transition bg-amber-600 text-white shadow-sm'
                : 'flex-1 py-1.5 rounded-lg text-xs font-bold transition bg-gray-800 text-gray-300 hover:text-white border border-gray-700';
        }
    });
}

function updatePostcardFontSize(size) {
    const val = parseInt(size, 10) || 18;
    const msgEl = document.getElementById('postcard-out-message');
    if (msgEl) msgEl.style.fontSize = `${val}px`;

    const valEl = document.getElementById('postcard-val-font-size');
    if (valEl) valEl.innerText = `${val}px`;
}

function updatePostcardPostcode() {
    const input = document.getElementById('postcard-in-postcode');
    const val = (input?.value || '690420').replace(/\D/g, '').padEnd(6, '0').slice(0, 6);
    if (input) input.value = val;

    const boxesContainer = document.getElementById('postcard-out-postcode-boxes');
    if (boxesContainer) {
        boxesContainer.innerHTML = val.split('').map(char => `
            <span class="postcard-code-box">${char}</span>
        `).join('');
    }
}

// ---------------- EXPORT FUNCTIONS ----------------

async function exportPostcard(side, scaleRatio = 2) {
    const isFront = (side === 'front');
    const node = isFront ? document.getElementById('postcard-front-node') : document.getElementById('postcard-back-node');
    if (!node) return;

    const toName = document.getElementById('postcard-in-to-name')?.value || 'Recipient';
    const cleanName = toName.replace(/[\/\\?%*:|"<>]/g, '_').trim();
    const sideSuffix = isFront ? 'front' : 'back';
    const filename = `Kinky_Postcard_${cleanName}_${sideSuffix}_@${scaleRatio}x.png`;
    const bgColor = isFront ? '#0f0b12' : '#fbf8f0';

    const flipper = document.getElementById('postcard-card-flipper');
    const wasFlipped = flipper?.classList.contains('is-flipped');

    try {
        // Temporarily reset 3D rotation during capture to avoid angle distortion
        if (flipper) {
            flipper.style.transition = 'none';
            flipper.style.transform = 'none';
        }
        if (node) {
            node.style.transform = 'none';
        }

        await triggerExport(node, filename, scaleRatio, bgColor, 1011, 638, {
            template: 'postcard',
            templateName: '母畜明信片',
            side: side
        });
    } finally {
        if (flipper) {
            flipper.style.transition = '';
            flipper.style.transform = '';
            if (wasFlipped) flipper.classList.add('is-flipped');
            else flipper.classList.remove('is-flipped');
        }
        if (node) {
            node.style.transform = '';
        }
    }
}

async function exportPostcardCombined(scaleRatio = 2) {
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');

    if (overlay) overlay.classList.remove('hidden');
    if (loadingText) {
        loadingText.innerText = (typeof t === 'function')
            ? t('loading_rendering', { size: Math.round(1011 * scaleRatio) })
            : '正在生成双面明信片高清合并全览图...';
    }

    const frontNode = document.getElementById('postcard-front-node');
    const backNode = document.getElementById('postcard-back-node');
    const flipper = document.getElementById('postcard-card-flipper');
    const wasFlipped = flipper?.classList.contains('is-flipped');

    const toName = document.getElementById('postcard-in-to-name')?.value || 'Submissive';
    const fromName = document.getElementById('postcard-in-from-name')?.value || 'Master';
    const dispatchId = document.getElementById('postcard-in-dispatch-code')?.value || '#POST-2026-X8472';
    const cleanName = toName.replace(/[\/\\?%*:|"<>]/g, '_').trim();
    const filename = `Kinky_Postcard_${cleanName}_Combined_Full_@${scaleRatio}x.png`;

    try {
        if (typeof htmlToImage === 'undefined') {
            throw new Error('渲染引擎未就绪');
        }

        // Temporarily reset 3D rotation
        if (flipper) {
            flipper.style.transition = 'none';
            flipper.style.transform = 'none';
        }
        if (frontNode) frontNode.style.transform = 'none';
        if (backNode) backNode.style.transform = 'none';

        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }

        const frontDataUrl = await htmlToImage.toPng(frontNode, {
            pixelRatio: scaleRatio,
            backgroundColor: '#0f0b12',
            skipFonts: true,
            cacheBust: false,
            width: 1011,
            height: 638,
            style: { transform: 'none', position: 'static', margin: '0', left: '0', top: '0' }
        });

        const backDataUrl = await htmlToImage.toPng(backNode, {
            pixelRatio: scaleRatio,
            backgroundColor: '#fbf8f0',
            skipFonts: true,
            cacheBust: false,
            width: 1011,
            height: 638,
            style: { transform: 'none', position: 'static', margin: '0', left: '0', top: '0' }
        });

        const [imgFront, imgBack] = await Promise.all([
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = frontDataUrl;
            }),
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = backDataUrl;
            })
        ]);

        // Setup Canvas
        const cardW = 1011 * scaleRatio;
        const cardH = 638 * scaleRatio;
        const padX = Math.round(50 * scaleRatio);
        const headerH = Math.round(110 * scaleRatio);
        const gapH = Math.round(50 * scaleRatio);
        const footerH = Math.round(90 * scaleRatio);

        const canvasW = cardW + padX * 2;
        const canvasH = headerH + cardH + gapH + cardH + footerH;

        const canvas = document.createElement('canvas');
        canvas.width = canvasW;
        canvas.height = canvasH;
        const ctx = canvas.getContext('2d');

        // Background Warm Vintage Parchment
        const bgGrad = ctx.createLinearGradient(0, 0, 0, canvasH);
        bgGrad.addColorStop(0, '#1c1510');
        bgGrad.addColorStop(0.3, '#2b1e15');
        bgGrad.addColorStop(0.7, '#241912');
        bgGrad.addColorStop(1, '#150d08');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvasW, canvasH);

        // Ambient postal border line
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.2)';
        ctx.lineWidth = 2 * scaleRatio;
        ctx.strokeRect(padX / 2, padX / 2, canvasW - padX, canvasH - padX);

        // Header Title
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fef3c7';
        ctx.font = `900 ${Math.round(28 * scaleRatio)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Serif SC", serif`;
        ctx.fillText('KINKY POSTCARD • 母畜明信片双面存档', canvasW / 2, Math.round(54 * scaleRatio));

        ctx.fillStyle = 'rgba(251, 191, 36, 0.75)';
        ctx.font = `700 ${Math.round(13 * scaleRatio)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif`;
        ctx.fillText('OFFICIAL CARTE POSTALE ARCHIVE • 亲密契约与投递留存全览', canvasW / 2, Math.round(82 * scaleRatio));

        // Draw pill label helper
        const drawPill = (text, x, y, bgColor) => {
            ctx.save();
            ctx.fillStyle = bgColor;
            const pillH = Math.round(24 * scaleRatio);
            const pillW = Math.round(150 * scaleRatio);
            const r = Math.round(12 * scaleRatio);
            ctx.beginPath();
            ctx.roundRect(x, y - pillH, pillW, pillH, r);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = `800 ${Math.round(11 * scaleRatio)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(text, x + pillW / 2, y - pillH + Math.round(16 * scaleRatio));
            ctx.restore();
        };

        // Draw Front
        const frontY = headerH;
        drawPill('📸 正面 · VISUAL POSTER', padX, frontY - Math.round(8 * scaleRatio), '#b45309');
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
        ctx.shadowBlur = Math.round(30 * scaleRatio);
        ctx.shadowOffsetY = Math.round(10 * scaleRatio);
        ctx.drawImage(imgFront, padX, frontY, cardW, cardH);
        ctx.restore();

        // Draw Back
        const backY = frontY + cardH + gapH;
        drawPill('💌 背面 · CARTE POSTALE', padX, backY - Math.round(8 * scaleRatio), '#b91c1c');
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
        ctx.shadowBlur = Math.round(30 * scaleRatio);
        ctx.shadowOffsetY = Math.round(10 * scaleRatio);
        ctx.drawImage(imgBack, padX, backY, cardW, cardH);
        ctx.restore();

        // Footer Text
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255, 243, 199, 0.7)';
        ctx.font = `600 ${Math.round(12 * scaleRatio)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif`;
        const nowStr = new Date().toISOString().slice(0, 10);
        ctx.fillText(`收件人: ${toName}  |  寄件人: ${fromName}  |  邮件识别号: ${dispatchId}  |  存档日期: ${nowStr}`, canvasW / 2, canvasH - Math.round(48 * scaleRatio));

        ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
        ctx.font = `700 ${Math.round(11 * scaleRatio)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif`;
        ctx.fillText('HIGH FIDELITY OUTPUT • 证件与协议工坊 (https://amberch872.github.io/Slut-ID-Generator/)', canvasW / 2, canvasH - Math.round(26 * scaleRatio));

        const collageDataUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.download = filename;
        link.href = collageDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        openExportModal(collageDataUrl, filename, { template: 'postcard', side: 'collage' });
        trackDownload('postcard', '母畜明信片', '导出正反拼接展示长图', filename, scaleRatio, 'collage');
    } catch (err) {
        console.error('合成明信片长图失败:', err);
        alert('合成明信片长图提示: ' + (err.message || '渲染失败'));
    } finally {
        if (flipper) {
            flipper.style.transition = '';
            flipper.style.transform = '';
            if (wasFlipped) flipper.classList.add('is-flipped');
            else flipper.classList.remove('is-flipped');
        }
        if (frontNode) frontNode.style.transform = '';
        if (backNode) backNode.style.transform = '';
        if (overlay) overlay.classList.add('hidden');
    }
}

async function exportPostcardZip(scaleRatio = 2) {
    if (typeof JSZip === 'undefined') {
        alert('JSZip 压缩库未就绪，请使用合并长图导出');
        return;
    }

    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');

    if (overlay) overlay.classList.remove('hidden');
    if (loadingText) {
        loadingText.innerText = '正在生成并打包双面明信片 ZIP 压缩包...';
    }

    const frontNode = document.getElementById('postcard-front-node');
    const backNode = document.getElementById('postcard-back-node');
    const flipper = document.getElementById('postcard-card-flipper');
    const wasFlipped = flipper?.classList.contains('is-flipped');

    const toName = document.getElementById('postcard-in-to-name')?.value || 'Submissive';
    const cleanName = toName.replace(/[\/\\?%*:|"<>]/g, '_').trim();
    const zipFilename = `Kinky_Postcard_${cleanName}_Bundle.zip`;

    try {
        if (flipper) {
            flipper.style.transition = 'none';
            flipper.style.transform = 'none';
        }
        if (frontNode) frontNode.style.transform = 'none';
        if (backNode) backNode.style.transform = 'none';

        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }

        const frontBlob = await htmlToImage.toBlob(frontNode, {
            pixelRatio: scaleRatio,
            backgroundColor: '#0f0b12',
            skipFonts: true,
            cacheBust: false,
            width: 1011,
            height: 638,
            style: { transform: 'none', position: 'static', margin: '0', left: '0', top: '0' }
        });

        const backBlob = await htmlToImage.toBlob(backNode, {
            pixelRatio: scaleRatio,
            backgroundColor: '#fbf8f0',
            skipFonts: true,
            cacheBust: false,
            width: 1011,
            height: 638,
            style: { transform: 'none', position: 'static', margin: '0', left: '0', top: '0' }
        });

        const zip = new JSZip();
        zip.file('01_postcard_front.png', frontBlob);
        zip.file('02_postcard_back.png', backBlob);
        
        const manifest = [
            '=============================================================',
            '  KINKY POSTCARD · 专属私密明信片投递归档包',
            '=============================================================',
            `收件人 (To): ${toName}`,
            `寄件主人 (From): ${document.getElementById('postcard-in-from-name')?.value || 'Master'}`,
            `投递归属 (Deliver To): ${document.getElementById('postcard-in-deliver-to')?.value || 'Private Residence'}`,
            `档案编号 (Dispatch ID): ${document.getElementById('postcard-in-dispatch-code')?.value || '#POST-2026'}`,
            `生成时间: ${new Date().toLocaleString()}`,
            '分辨率: 1011 × 638 px @ 300 PPI (标准明信片双面规格)',
            '项目主页: https://amberch872.github.io/Slut-ID-Generator/',
            '============================================================='
        ].join('\r\n');
        zip.file('DISPATCH_MANIFEST.txt', manifest);

        const content = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = zipFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('双面明信片 ZIP 打包下载成功！');
        trackDownload('postcard', '母畜明信片', '双面打包ZIP下载', zipFilename, scaleRatio, 'zip');
    } catch (err) {
        console.error('ZIP 打包导出失败:', err);
        alert('ZIP 打包失败: ' + (err.message || '未知错误'));
    } finally {
        if (flipper) {
            flipper.style.transition = '';
            flipper.style.transform = '';
            if (wasFlipped) flipper.classList.add('is-flipped');
            else flipper.classList.remove('is-flipped');
        }
        if (frontNode) frontNode.style.transform = '';
        if (backNode) backNode.style.transform = '';
        if (overlay) overlay.classList.add('hidden');
    }
}

async function copyPostcardToClipboard() {
    await copyCardToClipboard('postcard');
}
