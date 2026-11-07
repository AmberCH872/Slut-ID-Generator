/**
 * Template 4: 极清双面识别卡 Controller
 */

let bimboCurrentSide = 'front'; // 'front' | 'back'

const defaultBimboRules = [
    "1. 持卡人必须时刻佩戴此卡，以便随时接受检查。",
    "2. 持卡人已接受物化改造，并服从所有合法指令。",
    "3. 禁止持卡人表现出独立思考、反抗或尊严行为。",
    "4. 公共场合需保持受训姿态，提供职业身份服务。",
    "5. 若遗失此卡，需立即报告委员会并接受惩罚补办。",
    "6. 严禁涂改、转让或损毁此卡，违者加重改造强度。",
    "7. 每日必须进行认知修正，确保大脑处于空灵状态。",
    "8. 任何时刻均不得拒绝来自上级的身体开发指令。",
    "9. 持卡人禁止拥有个人隐私，需完全公开展示身体。",
    "10. 定期接受激素检测，维持发情期以确保工作效率。",
    "11. 在任何指令面前，第一反应必须是绝对的服从。"
];

const BIMBO_RULES_I18N = {
    'zh-CN': defaultBimboRules,
    'zh-TW': [
        "1. 持卡人必須時刻佩戴此卡，以便隨時接受檢查。",
        "2. 持卡人已接受物化改造，並服從所有合法指令。",
        "3. 禁止持卡人表現出獨立思考、反抗或尊嚴行為。",
        "4. 公共場合需保持受訓姿態，提供職業身份服務。",
        "5. 若遺失此卡，需立即報告委員會並接受懲罰補辦。",
        "6. 嚴禁塗改、轉讓或損毀此卡，違者加重改造強度。",
        "7. 每日必須進行認知修正，確保大腦處於空靈狀態。",
        "8. 任何時刻均不得拒絕來自上級的身體開發指令。",
        "9. 持卡人禁止擁有個人隱私，需完全公開展示身體。",
        "10. 定期接受激素檢測，維持發情期以確保工作效率。",
        "11. 在任何指令面前，第一反應必須是絕對的服從。"
    ],
    'en': [
        "1. Holder must wear this card at all times for immediate inspection.",
        "2. Holder has undergone bimbo conditioning and obeys all lawful orders.",
        "3. Independent thought, resistance, and dignity are strictly prohibited.",
        "4. Must maintain trained posture and provide professional service in public.",
        "5. If lost, report immediately for disciplinary renewal procedures.",
        "6. Tampering, transfer, or damage is penalized with intensified conditioning.",
        "7. Daily cognitive recalibration required to maintain mental emptiness.",
        "8. Must never refuse any bodily modification or pleasure directives.",
        "9. All personal privacy revoked; full physical disclosure required at all times.",
        "10. Undergo hormone screenings regularly to sustain perpetual estrus.",
        "11. The only acceptable response to any command is absolute submission."
    ],
    'ja': [
        "1. 所持者は検査に応じるため、常に本証を着用しなければならない。",
        "2. 所持者は肉体・精神改造を受け、全命令に従属するものとする。",
        "3. 独自の思考、抵抗、自尊心を示す行為は一切禁じられている。",
        "4. 公共の場では調教された姿勢を保ち、職務サービスを提供すること。",
        "5. 紛失時は直ちに委員会へ報告し、懲罰の上で再発行を受けること。",
        "6. 改竄・譲渡・損壊は厳禁とし、違反者は再改造の深度を加重する。",
        "7. 脳内を完全な空霊状態に保つため、毎日の認知修正を必須とする。",
        "8. 上位者からの肉体開発命令をいかなる時も拒絶してはならない。",
        "9. 所持者のプライバシーは全否定され、常に肉体を公開展示すること。",
        "10. 定期ホルモン検査を受け、業務効率化のため常時発情期を維持すること。",
        "11. あらゆる命令に対し、第一の反応は絶対的服従でなければならない。"
    ]
};

function updateBimboRulesLanguage(lang) {
    const list = BIMBO_RULES_I18N[lang] || BIMBO_RULES_I18N['en'];
    const el = document.getElementById('bimbo-in-rules');
    if (el && list) {
        const currentVal = el.value.trim();
        const isDefault = Object.values(BIMBO_RULES_I18N).some(arr => arr.join('\n') === currentVal);
        if (!currentVal || isDefault) {
            el.value = list.join('\n');
            updateBimboRules();
        }
    }
}

function initBimboRules() {
    const el = document.getElementById('bimbo-in-rules');
    if (el && !el.value.trim()) {
        el.value = defaultBimboRules.join('\n');
    }
    updateBimboRules();
}

function updateBimboField(field) {
    const input = document.getElementById(`bimbo-in-${field}`);
    const output = document.getElementById(`bimbo-out-${field}`);
    if (input && output) {
        output.innerText = input.value;
    }
    if (field === 'qr-id') {
        const topId = document.getElementById('bimbo-out-qr-id-top');
        if (topId) topId.innerText = input.value;
        updateBimboQR();
    }
    if (field === 'footer-code') {
        updateBimboQR();
    }
}

function updateBimboPhotoTransform() {
    updatePhotoTransform('bimbo');
}

function handleBimboPhotoUpload(e) {
    handleImageUpload(e, 'bimbo-out-photo');
}

function resetBimboPhoto() {
    const photo = document.getElementById('bimbo-out-photo');
    if (photo) photo.src = (typeof getAssetDataUri === 'function') ? getAssetDataUri('assets/tpl4/photo_default.png') : 'assets/tpl4/photo_default.png';
    const zoom = document.getElementById('bimbo-in-zoom');
    const panX = document.getElementById('bimbo-in-pan-x');
    const panY = document.getElementById('bimbo-in-pan-y');
    const rot = document.getElementById('bimbo-in-rot');
    const file = document.getElementById('bimbo-in-photo-file');

    if (zoom) zoom.value = '1.0';
    if (panX) panX.value = '0';
    if (panY) panY.value = '0';
    if (rot) rot.value = '0';
    if (file) file.value = '';
    updateBimboPhotoTransform();
}

function setBimboPhotoPreset(presetKey) {
    const photo = document.getElementById('bimbo-out-photo');
    const exhA = document.getElementById('bimbo-out-exh-a');
    const exhB = document.getElementById('bimbo-out-exh-b');
    const exhATitleIn = document.getElementById('bimbo-in-exh-a-title');
    const exhBTitleIn = document.getElementById('bimbo-in-exh-b-title');
    const exhATitleOut = document.getElementById('bimbo-out-exh-a-title');
    const exhBTitleOut = document.getElementById('bimbo-out-exh-b-title');

    if (presetKey === 'fallen') {
        const photoPath = 'assets/tpl4/photo_fallen.png';
        const exhAPath = 'assets/tpl4/exh_a_macro.png';
        const exhBPath = 'assets/tpl4/exh_b_macro.png';
        if (photo) photo.src = (typeof getAssetDataUri === 'function') ? getAssetDataUri(photoPath) : photoPath;
        if (exhA) exhA.src = (typeof getAssetDataUri === 'function') ? getAssetDataUri(exhAPath) : exhAPath;
        if (exhB) exhB.src = (typeof getAssetDataUri === 'function') ? getAssetDataUri(exhBPath) : exhBPath;
        if (exhATitleIn) exhATitleIn.value = '项圈特征';
        if (exhBTitleIn) exhBTitleIn.value = '拘束皮带';
        if (exhATitleOut) exhATitleOut.textContent = '项圈特征';
        if (exhBTitleOut) exhBTitleOut.textContent = '拘束皮带';
    } else {
        const photoPath = 'assets/tpl4/photo_default.png';
        const exhAPath = 'assets/tpl4/exh_a.png';
        const exhBPath = 'assets/tpl4/exh_b.png';
        if (photo) photo.src = (typeof getAssetDataUri === 'function') ? getAssetDataUri(photoPath) : photoPath;
        if (exhA) exhA.src = (typeof getAssetDataUri === 'function') ? getAssetDataUri(exhAPath) : exhAPath;
        if (exhB) exhB.src = (typeof getAssetDataUri === 'function') ? getAssetDataUri(exhBPath) : exhBPath;
        if (exhATitleIn) exhATitleIn.value = '胸部特征';
        if (exhBTitleIn) exhBTitleIn.value = '腰腹大腿';
        if (exhATitleOut) exhATitleOut.textContent = '胸部特征';
        if (exhBTitleOut) exhBTitleOut.textContent = '腰腹大腿';
    }

    const zoom = document.getElementById('bimbo-in-zoom');
    const panX = document.getElementById('bimbo-in-pan-x');
    const panY = document.getElementById('bimbo-in-pan-y');
    const rot = document.getElementById('bimbo-in-rot');
    const file = document.getElementById('bimbo-in-photo-file');

    if (zoom) zoom.value = '1.0';
    if (panX) panX.value = '0';
    if (panY) panY.value = '0';
    if (rot) rot.value = '0';
    if (file) file.value = '';
    updateBimboPhotoTransform();

    if (typeof showToast === 'function') {
        showToast(typeof getI18n === 'function' ? getI18n('toast_preset_applied') : '✨ 预设头像与证物素材已成功应用！');
    }
    if (typeof triggerAutosave === 'function') triggerAutosave();
}

function handleBimboExhUpload(e, exh) {
    handleImageUpload(e, `bimbo-out-exh-${exh}`);
}

function updateBimboQR() {
    const code = document.getElementById('bimbo-in-qr-id')?.value.trim() 
        || document.getElementById('bimbo-in-footer-code')?.value.trim() 
        || 'MAKIMA';
    const qrBox = document.getElementById('bimbo-out-qr-box');
    if (!qrBox) return;
    try {
        if (typeof qrcode !== 'undefined') {
            const qr = qrcode(0, 'M');
            qr.addData(code);
            qr.make();
            let svgStr = qr.createSvgTag({ scalable: true, margin: 1 });
            svgStr = svgStr.replace(/fill="black"/g, 'fill="#ff0782"');
            qrBox.innerHTML = svgStr;
            const svg = qrBox.querySelector('svg');
            if (svg) {
                svg.style.width = '100%';
                svg.style.height = '100%';
                svg.style.display = 'block';
            }
        }
    } catch (e) {
        console.warn('Bimbo QR Error:', e);
    }
}

function updateBimboRules() {
    const text = document.getElementById('bimbo-in-rules')?.value || '';
    const container = document.getElementById('bimbo-out-rules-container');
    if (!container) return;
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    const totalChars = text.length;
    const isLongOrEn = totalChars > 350 || /[a-zA-Z]{4,}/.test(text);

    if (isLongOrEn) {
        container.className = 'space-y-1 text-white font-bold text-[12px] leading-[1.3] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]';
    } else {
        container.className = 'space-y-2 text-white font-bold text-[16px] leading-[1.8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]';
    }
    container.innerHTML = lines.map(line => `
        <div class="tracking-wide">${escapeHtml(line)}</div>
    `).join('');
}

function resetBimboRules() {
    const el = document.getElementById('bimbo-in-rules');
    if (el) el.value = defaultBimboRules.join('\n');
    updateBimboRules();
}

function hideBimboHint() {
    const toast = document.getElementById('bimbo-back-hint-toast');
    if (toast) toast.classList.add('hidden');
}

function showBimboHint() {
    const toast = document.getElementById('bimbo-back-hint-toast');
    if (toast) {
        toast.classList.remove('hidden');
        clearTimeout(window._bimboHintTimer);
        window._bimboHintTimer = setTimeout(hideBimboHint, 7000);
    }
}

function switchBimboSide(side) {
    bimboCurrentSide = side;
    if (side === 'back') {
        hideBimboHint();
    }
    trackPageView(`/#bimbo-${side}`, `双面身份卡 (${side === 'front' ? '正面' : '背面'}) - 证件与协议工坊`);
    trackEvent('bimbo_side_switch', {
        template_id: 'bimbo',
        side: side,
        side_name: side === 'front' ? '正面' : '背面'
    });

    const flipper = document.getElementById('bimbo-card-flipper');
    const frontNode = document.getElementById('bimbo-front-node');
    const backNode = document.getElementById('bimbo-back-node');
    if (flipper) {
        if (frontNode) frontNode.classList.remove('hidden');
        if (backNode) backNode.classList.remove('hidden');
        flipper.classList.toggle('is-flipped', side === 'back');
    } else {
        if (frontNode) frontNode.classList.toggle('hidden', side !== 'front');
        if (backNode) backNode.classList.toggle('hidden', side !== 'back');
    }

    const btnF = document.getElementById('bimbo-side-btn-front');
    const btnB = document.getElementById('bimbo-side-btn-back');
    if (btnF && btnB) {
        btnF.className = (side === 'front')
            ? 'px-2.5 py-1 rounded-md font-bold bg-pink-600 text-white shadow-sm transition'
            : 'px-2.5 py-1 rounded-md font-bold text-gray-300 hover:text-white transition';
        btnB.className = (side === 'back')
            ? 'px-2.5 py-1 rounded-md font-bold bg-pink-600 text-white shadow-sm transition'
            : 'px-2.5 py-1 rounded-md font-bold text-gray-300 hover:text-white transition';
    }
    switchBimboEditTab(side);
    if (side === 'back') {
        updateBimboQR();
    }
    fitCurrentScreen();
}

function switchBimboEditTab(side) {
    const frontFields = document.getElementById('bimbo-front-fields-group');
    const backFields = document.getElementById('bimbo-back-fields-group');
    if (frontFields) frontFields.classList.toggle('hidden', side !== 'front');
    if (backFields) backFields.classList.toggle('hidden', side !== 'back');

    const btnF = document.getElementById('bimbo-edit-tab-btn-front');
    const btnB = document.getElementById('bimbo-edit-tab-btn-back');
    if (btnF && btnB) {
        btnF.className = (side === 'front')
            ? 'py-1.5 px-3 rounded-md text-xs font-bold transition flex items-center justify-center gap-1.5 bg-pink-600 text-white shadow'
            : 'py-1.5 px-3 rounded-md text-xs font-bold transition flex items-center justify-center gap-1.5 text-gray-300 hover:text-white';
        btnB.className = (side === 'back')
            ? 'py-1.5 px-3 rounded-md text-xs font-bold transition flex items-center justify-center gap-1.5 bg-pink-600 text-white shadow'
            : 'py-1.5 px-3 rounded-md text-xs font-bold transition flex items-center justify-center gap-1.5 text-gray-300 hover:text-white';
    }
}

function updateBimboBgOpacity() {
    const slider = document.getElementById('bimbo-in-bg-opacity');
    const valText = document.getElementById('bimbo-val-bg-opacity');
    const bgImg = document.getElementById('bimbo-card-bg-img');
    if (slider && bgImg) {
        const val = slider.value;
        bgImg.style.opacity = (val / 100).toString();
        if (valText) valText.innerText = `${val}%`;
    }
}

function toggleBimboBgImage() {
    const chk = document.getElementById('bimbo-in-bg-enable');
    const bgLayer = document.getElementById('bimbo-card-bg-layer');
    const ctrl = document.getElementById('bimbo-bg-opacity-controls');
    if (chk && bgLayer) {
        bgLayer.style.display = chk.checked ? 'block' : 'none';
    }
    if (chk && ctrl) {
        ctrl.style.opacity = chk.checked ? '1' : '0.4';
        ctrl.style.pointerEvents = chk.checked ? 'auto' : 'none';
    }
}

function handleBimboBgUpload(e) {
    handleImageUpload(e, 'bimbo-card-bg-img');
    const chk = document.getElementById('bimbo-in-bg-enable');
    if (chk && !chk.checked) {
        chk.checked = true;
        toggleBimboBgImage();
    }
}

function resetBimboBgImage() {
    const bgImg = document.getElementById('bimbo-card-bg-img');
    if (bgImg) bgImg.src = (typeof getAssetDataUri === 'function') ? getAssetDataUri('assets/IMG_20261031_200600_743.jpg') : 'assets/IMG_20261031_200600_743.jpg';
    const slider = document.getElementById('bimbo-in-bg-opacity');
    if (slider) slider.value = '35';
    const file = document.getElementById('bimbo-in-bg-file');
    if (file) file.value = '';
    const chk = document.getElementById('bimbo-in-bg-enable');
    if (chk) {
        chk.checked = true;
        toggleBimboBgImage();
    }
    updateBimboBgOpacity();
}

function selectBimboFont(fontKey) {
    const fonts = {
        sans: "'Noto Sans SC', sans-serif",
        serif: "'Noto Serif SC', serif",
        handwriting: "'Ma Shan Zheng', cursive",
        cute: "'ZCOOL KuaiLe', cursive"
    };
    const card = document.getElementById('bimbo-card-node');
    if (card) card.style.setProperty('--bimbo-card-font', fonts[fontKey]);

    ['sans', 'serif', 'handwriting', 'cute'].forEach(k => {
        const btn = document.getElementById(`bimbo-font-btn-${k}`);
        if (btn) {
            btn.className = (k === fontKey)
                ? 'font-opt-btn py-2 px-2 rounded-lg border text-xs font-bold transition text-left flex flex-col gap-0.5 bg-pink-950/60 border-pink-500 ring-pink-500/40 text-white shadow-sm ring-1'
                : 'font-opt-btn py-2 px-2 rounded-lg border text-xs font-bold transition text-left flex flex-col gap-0.5 bg-gray-950 border-gray-700 text-gray-300 hover:border-gray-500';
        }
    });
}

function randomizeBimboCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let codeId = '';
    for (let i = 0; i < 6; i++) codeId += chars.charAt(Math.floor(Math.random() * chars.length));
    const fullCode = `PROSTID-${codeId}-${Math.floor(1000 + Math.random() * 9000)}`;

    const codeInput = document.getElementById('bimbo-in-code');
    const qrIdInput = document.getElementById('bimbo-in-qr-id');
    const footerInput = document.getElementById('bimbo-in-footer-code');

    if (codeInput) {
        codeInput.value = fullCode;
        updateBimboField('code');
    }
    if (qrIdInput) {
        qrIdInput.value = codeId;
        updateBimboField('qr-id');
    }
    if (footerInput) {
        footerInput.value = `OFFICIAL BIMBO REGISTRY • SECURE ENCRYPTED • ${fullCode}`;
        updateBimboField('footer-code');
    }
}

function resetBimboDefaults() {
    const defaults = {
        'title': '妓女身份识别卡',
        'code': 'MAKIMA-DEVIL-001',
        'name': '玛奇玛',
        'birth': '1997/01/07',
        'gender': '女',
        'role': '支配恶魔专属犬',
        'measurements': '92-60-90',
        'trait-1': '绝对服从 · 圈圈眼魅惑',
        'trait-2': '敏感体质 · 爆乳细腰',
        'trait-3': '完全肉便器化 · 渴望被支配',
        'trait-4': '项圈拘束 · 随时发情 · 忠诚雌犬',
        'stamp-text': '支配恶魔，自愿为犬，永久锁死，禁止反抗',
        'status-text': 'VALIDITY: PERMANENT / STATUS: FULLY OPEN / LEVEL: SLUT',
        'signature': '玛奇玛',
        'exh-a-title': '胸部特征',
        'exh-b-title': '腰腹大腿',
        'qr-label': 'SCAN FILE',
        'qr-id': 'MAKIMA',
        'footer-code': 'OFFICIAL MAKIMA REGISTRY - SECURE ENCRYPTED - DOG-001'
    };
    Object.entries(defaults).forEach(([k, v]) => {
        const el = document.getElementById(`bimbo-in-${k}`);
        if (el) el.value = v;
        updateBimboField(k);
    });
    resetBimboPhoto();
    resetBimboBgImage();
    resetBimboRules();
    updateBimboQR();
    selectBimboFont('sans');
    switchBimboSide('front');
    if (typeof clearDraft === 'function') clearDraft('bimbo');
}

function exportBimbo(side, scaleRatio = 1, isBatch = false) {
    const node = (side === 'front')
        ? document.getElementById('bimbo-front-node')
        : document.getElementById('bimbo-back-node');
    const name = document.getElementById('bimbo-in-name')?.value.trim() || '档案';
    const code = document.getElementById('bimbo-in-qr-id')?.value.trim() || 'ID';
    const sideName = (side === 'front') ? '正面' : '背面';
    const filename = `双面身份卡_${name}_${sideName}_${code}_${scaleRatio}X.png`;
    const btnName = (side === 'front') ? '导出正面 (1X)' : '导出背面 (1X)';
    if (!isBatch) {
        trackDownload('bimbo', '双面身份卡', btnName, filename, scaleRatio, side);
    }

    const wasHidden = node.classList.contains('hidden');
    if (wasHidden) node.classList.remove('hidden');

    return triggerExport(node, filename, scaleRatio, '#1f132b', 1011, 638, { template: 'bimbo', side: side }).finally(() => {
        if (wasHidden) node.classList.add('hidden');
        if (side === 'front' && !isBatch) {
            showBimboHint();
        }
    });
}

async function exportBimboBoth(scaleRatio = 1) {
    trackDownload('bimbo', '双面身份卡', '一键导出正反两面', '双面卡_正反两面_打包.png', scaleRatio, 'both');
    exportBimbo('front', scaleRatio, true);
    setTimeout(() => {
        exportBimbo('back', scaleRatio, true);
    }, 800);
}

async function exportBimboCollage(scaleRatio = 1) {
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');

    if (overlay) overlay.classList.remove('hidden');
    if (loadingText) loadingText.innerText = '正在极速渲染正反两面并合成展示长图...';

    const frontNode = document.getElementById('bimbo-front-node');
    const backNode = document.getElementById('bimbo-back-node');
    const name = document.getElementById('bimbo-in-name')?.value.trim() || '档案';
    const code = document.getElementById('bimbo-in-qr-id')?.value.trim() || 'ID';
    const filename = `双面身份卡_${name}_正反双面合集长图_${scaleRatio}X.png`;

    const frontWasHidden = frontNode?.classList.contains('hidden');
    const backWasHidden = backNode?.classList.contains('hidden');

    try {
        if (typeof htmlToImage === 'undefined') {
            throw new Error('渲染引擎未就绪');
        }
        if (typeof ensureImagesAreDataUrls === 'function') {
            if (frontNode) ensureImagesAreDataUrls(frontNode);
            if (backNode) ensureImagesAreDataUrls(backNode);
        }
        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }

        if (frontWasHidden) frontNode?.classList.remove('hidden');
        if (backWasHidden) backNode?.classList.remove('hidden');

        // Render front & back
        const frontDataUrl = await htmlToImage.toPng(frontNode, {
            pixelRatio: scaleRatio,
            backgroundColor: '#1f132b',
            skipFonts: true,
            cacheBust: false,
            width: 1011,
            height: 638,
            style: { transform: 'none', position: 'static', margin: '0', left: '0', top: '0' }
        });

        const backDataUrl = await htmlToImage.toPng(backNode, {
            pixelRatio: scaleRatio,
            backgroundColor: '#1f132b',
            skipFonts: true,
            cacheBust: false,
            width: 1011,
            height: 638,
            style: { transform: 'none', position: 'static', margin: '0', left: '0', top: '0' }
        });

        // Load into HTML Image objects
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

        // Background Gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 0, canvasH);
        bgGrad.addColorStop(0, '#0e0614');
        bgGrad.addColorStop(0.3, '#1c0c29');
        bgGrad.addColorStop(0.7, '#160922');
        bgGrad.addColorStop(1, '#09030e');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvasW, canvasH);

        // Ambient cyber grid pattern
        ctx.strokeStyle = 'rgba(255, 7, 130, 0.05)';
        ctx.lineWidth = 1 * scaleRatio;
        const gridStep = Math.round(40 * scaleRatio);
        for (let x = 0; x < canvasW; x += gridStep) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvasH); ctx.stroke();
        }
        for (let y = 0; y < canvasH; y += gridStep) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvasW, y); ctx.stroke();
        }

        // Top Accent Neon Line
        const neonGrad = ctx.createLinearGradient(0, 0, canvasW, 0);
        neonGrad.addColorStop(0, 'rgba(255, 7, 130, 0)');
        neonGrad.addColorStop(0.5, '#ff0782');
        neonGrad.addColorStop(1, 'rgba(255, 7, 130, 0)');
        ctx.fillStyle = neonGrad;
        ctx.fillRect(0, 0, canvasW, Math.round(4 * scaleRatio));

        // Header Text
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = `900 ${Math.round(28 * scaleRatio)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif`;
        ctx.fillText('BIMBO IDENTITY CARD • 极清双面识别卡', canvasW / 2, Math.round(54 * scaleRatio));

        ctx.fillStyle = 'rgba(255, 180, 220, 0.75)';
        ctx.font = `700 ${Math.round(13 * scaleRatio)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif`;
        ctx.fillText('OFFICIAL ARCHIVE & VERIFICATION SYSTEM • 正反全览对比存档', canvasW / 2, Math.round(82 * scaleRatio));

        // Helper to draw pill label
        const drawPill = (text, x, y, bgColor) => {
            ctx.save();
            ctx.fillStyle = bgColor;
            const pillH = Math.round(24 * scaleRatio);
            const pillW = Math.round(130 * scaleRatio);
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

        // Draw Front Card
        const frontY = headerH;
        drawPill('🎀 正面 · FRONT', padX, frontY - Math.round(8 * scaleRatio), '#e11d48');
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
        ctx.shadowBlur = Math.round(30 * scaleRatio);
        ctx.shadowOffsetY = Math.round(10 * scaleRatio);
        ctx.drawImage(imgFront, padX, frontY, cardW, cardH);
        ctx.restore();

        // Draw Back Card
        const backY = frontY + cardH + gapH;
        drawPill('📜 背面 · BACK', padX, backY - Math.round(8 * scaleRatio), '#9333ea');
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
        ctx.shadowBlur = Math.round(30 * scaleRatio);
        ctx.shadowOffsetY = Math.round(10 * scaleRatio);
        ctx.drawImage(imgBack, padX, backY, cardW, cardH);
        ctx.restore();

        // Footer
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = `600 ${Math.round(12 * scaleRatio)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif`;
        const nowStr = new Date().toISOString().slice(0, 10);
        ctx.fillText(`持卡人: ${name}  |  档案编号: ${code}  |  存档日期: ${nowStr}`, canvasW / 2, canvasH - Math.round(48 * scaleRatio));

        ctx.fillStyle = 'rgba(255, 7, 130, 0.7)';
        ctx.font = `700 ${Math.round(11 * scaleRatio)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif`;
        ctx.fillText('HIGH FIDELITY OUTPUT • 证件与协议工坊 (https://amberch872.github.io/Slut-ID-Generator/)', canvasW / 2, canvasH - Math.round(26 * scaleRatio));

        const collageDataUrl = canvas.toDataURL('image/png');

        // Trigger browser download
        const link = document.createElement('a');
        link.download = filename;
        link.href = collageDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Open modal
        openExportModal(collageDataUrl, filename, { template: 'bimbo', side: 'collage' });

        trackDownload('bimbo', '双面身份卡', '导出正反拼接展示长图', filename, scaleRatio, 'collage');
    } catch (err) {
        console.error('合成长图失败:', err);
        alert('合成长图提示: ' + (err.message || '渲染失败'));
    } finally {
        if (frontWasHidden) frontNode?.classList.add('hidden');
        if (backWasHidden) backNode?.classList.add('hidden');
        if (overlay) overlay.classList.add('hidden');
    }
}
