/**
 * Template 2: 媚黑身份证 Controller
 */

const defaultBbcKinks = [
    { id: 'k1', text: '肛交', checked: true, col: 1 },
    { id: 'k2', text: '捆绑', checked: true, col: 1 },
    { id: 'k3', text: '狗奴', checked: true, col: 1 },
    { id: 'k4', text: '勒颈', checked: true, col: 1 },
    { id: 'k5', text: '拳交', checked: true, col: 1 },
    { id: 'k6', text: '口交', checked: true, col: 1 },
    { id: 'k7', text: '贞操锁', checked: true, col: 1 },
    { id: 'k8', text: '羞辱', checked: true, col: 1 },
    { id: 'k9', text: '服从', checked: true, col: 1 },
    { id: 'k10', text: '肛交后插嘴', checked: true, col: 2 },
    { id: 'k11', text: '家务奴', checked: true, col: 2 },
    { id: 'k12', text: '囚禁', checked: true, col: 2 },
    { id: 'k13', text: '兽交', checked: true, col: 2 },
    { id: 'k14', text: '轮奸', checked: true, col: 2 },
    { id: 'k15', text: '足交', checked: true, col: 2 },
    { id: 'k16', text: '乳交', checked: true, col: 2 },
    { id: 'k17', text: '寸止', checked: true, col: 2 },
    { id: 'k18', text: '放尿', checked: true, col: 2 }
];

let currentBbcKinks = JSON.parse(JSON.stringify(defaultBbcKinks));

function initBbcKinks() {
    renderBbcEditorKinks();
    renderBbcCardKinks();
}

function renderBbcEditorKinks() {
    const listEl = document.getElementById('bbc-kinks-list');
    if (!listEl) return;
    listEl.innerHTML = currentBbcKinks.map(k => `
        <label class="flex items-center gap-2 p-1.5 sm:p-2 rounded-lg bg-gray-950/40 border border-gray-800/60 hover:bg-gray-800/60 cursor-pointer text-xs transition">
            <input type="checkbox" ${k.checked ? 'checked' : ''} onchange="toggleBbcKink('${k.id}')"
                class="w-4 h-4 rounded bg-gray-950 border-gray-700 text-purple-600 focus:ring-0">
            <span class="text-gray-300 font-medium">${k.text}</span>
        </label>
    `).join('');
}

function renderBbcCardKinks() {
    const col1El = document.getElementById('bbc-out-col-1');
    const col2El = document.getElementById('bbc-out-col-2');
    if (!col1El || !col2El) return;

    const col1 = currentBbcKinks.filter(k => k.col === 1);
    const col2 = currentBbcKinks.filter(k => k.col === 2);

    const renderItem = (k) => `
        <div class="bbc-kink-item">
            <span class="bbc-kink-box ${k.checked ? 'checked' : ''}"></span>
            <span>${k.text}</span>
        </div>
    `;

    col1El.innerHTML = col1.map(renderItem).join('');
    col2El.innerHTML = col2.map(renderItem).join('');
}

function toggleBbcKink(id) {
    const item = currentBbcKinks.find(k => k.id === id);
    if (item) {
        item.checked = !item.checked;
        renderBbcCardKinks();
    }
}

function setAllBbcKinks(state) {
    currentBbcKinks.forEach(k => k.checked = state);
    renderBbcEditorKinks();
    renderBbcCardKinks();
}

function updateBbcField(field) {
    const input = document.getElementById(`bbc-in-${field}`);
    const output = document.getElementById(`bbc-out-${field}`);
    if (input && output) {
        if (field === 'validity') {
            output.innerHTML = input.value;
        } else {
            output.innerText = input.value;
        }
    }
}

function updateBbcPhotoTransform() {
    updatePhotoTransform('bbc');
}

function handleBbcPhotoUpload(e) {
    handleImageUpload(e, 'bbc-out-photo');
}

function resetBbcPhoto() {
    const photo = document.getElementById('bbc-out-photo');
    if (photo) photo.src = 'assets/tpl2/photo_default.png';
    const zoom = document.getElementById('bbc-in-zoom');
    const panX = document.getElementById('bbc-in-pan-x');
    const panY = document.getElementById('bbc-in-pan-y');
    const rot = document.getElementById('bbc-in-rot');
    const file = document.getElementById('bbc-in-photo-file');

    if (zoom) zoom.value = '1.0';
    if (panX) panX.value = '0';
    if (panY) panY.value = '0';
    if (rot) rot.value = '0';
    if (file) file.value = '';
    updateBbcPhotoTransform();
}

function selectBbcFont(fontKey) {
    const fonts = {
        sans: "'Noto Sans SC', sans-serif",
        serif: "'Noto Serif SC', serif",
        handwriting: "'Ma Shan Zheng', cursive",
        cute: "'ZCOOL KuaiLe', cursive"
    };
    const card = document.getElementById('bbc-card-node');
    if (card) card.style.setProperty('--bbc-card-font', fonts[fontKey]);

    ['sans', 'serif', 'handwriting', 'cute'].forEach(k => {
        const btn = document.getElementById(`bbc-font-btn-${k}`);
        if (btn) {
            btn.className = (k === fontKey)
                ? 'font-opt-btn py-2 px-2 rounded-lg border text-xs font-bold transition text-left flex flex-col gap-0.5 bg-purple-950/60 border-purple-500 ring-purple-500/40 text-white shadow-sm ring-1'
                : 'font-opt-btn py-2 px-2 rounded-lg border text-xs font-bold transition text-left flex flex-col gap-0.5 bg-gray-950 border-gray-700 text-gray-300 hover:border-gray-500';
        }
    });
}

function randomizeBbcDate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const dateInput = document.getElementById('bbc-in-issue-date');
    if (dateInput) {
        dateInput.value = `${y}/${m}/${d}`;
        updateBbcField('issue-date');
    }
}

function resetBbcDefaults() {
    const defaults = {
        'title': '媚黑爹大屌婊子身份证',
        'name': '玛奇玛',
        'banner-text': 'YES MASTER',
        'issue-date': '2026/10/17',
        'authority': '东京公安对魔特异课',
        'validity': '永久 <strong class="text-[#dc2626]">（强制）</strong>',
        'footer-slogan': '持此身份证明者系黑爹财产 应主动拒绝被黑爹以外者触摸及使用'
    };
    Object.entries(defaults).forEach(([k, v]) => {
        const el = document.getElementById(`bbc-in-${k}`);
        if (el) el.value = v;
        updateBbcField(k);
    });
    currentBbcKinks = JSON.parse(JSON.stringify(defaultBbcKinks));
    initBbcKinks();
    resetBbcPhoto();
    selectBbcFont('sans');
}

function exportBbc(scaleRatio = 1) {
    const node = document.getElementById('bbc-card-node');
    const name = document.getElementById('bbc-in-name')?.value.trim() || '媚黑奴';
    triggerExport(node, `媚黑身份证_${name}_${scaleRatio}X.png`, scaleRatio, '#ffffff', 1011, 638);
}
