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
    if (photo) photo.src = 'assets/tpl4/photo_default.webp';
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

function handleBimboExhUpload(e, exh) {
    handleImageUpload(e, `bimbo-out-exh-${exh}`);
}

function handleBimboQrUpload(e) {
    handleImageUpload(e, 'bimbo-out-qr');
}

function updateBimboRules() {
    const text = document.getElementById('bimbo-in-rules')?.value || '';
    const container = document.getElementById('bimbo-out-rules-container');
    if (!container) return;
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    container.innerHTML = lines.map(line => `
        <div class="tracking-wide">${escapeHtml(line)}</div>
    `).join('');
}

function resetBimboRules() {
    const el = document.getElementById('bimbo-in-rules');
    if (el) el.value = defaultBimboRules.join('\n');
    updateBimboRules();
}

function switchBimboSide(side) {
    bimboCurrentSide = side;
    const frontNode = document.getElementById('bimbo-front-node');
    const backNode = document.getElementById('bimbo-back-node');
    if (frontNode) frontNode.classList.toggle('hidden', side !== 'front');
    if (backNode) backNode.classList.toggle('hidden', side !== 'back');

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
    if (bgImg) bgImg.src = 'assets/IMG_20261031_200600_743.jpg';
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
        'exh-a-title': '制服束缚',
        'exh-b-title': '项圈调教',
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
    selectBimboFont('sans');
    switchBimboSide('front');
}

function exportBimbo(side, scaleRatio = 1) {
    const node = (side === 'front')
        ? document.getElementById('bimbo-front-node')
        : document.getElementById('bimbo-back-node');
    const name = document.getElementById('bimbo-in-name')?.value.trim() || '档案';
    const code = document.getElementById('bimbo-in-qr-id')?.value.trim() || 'ID';
    const sideName = (side === 'front') ? '正面' : '背面';
    const filename = `妓女身份识别卡_${name}_${sideName}_${code}_${scaleRatio}X.png`;

    const wasHidden = node.classList.contains('hidden');
    if (wasHidden) node.classList.remove('hidden');

    triggerExport(node, filename, scaleRatio, '#1f132b', 1011, 638).finally(() => {
        if (wasHidden) node.classList.add('hidden');
    });
}

async function exportBimboBoth(scaleRatio = 1) {
    exportBimbo('front', scaleRatio);
    setTimeout(() => {
        exportBimbo('back', scaleRatio);
    }, 800);
}
