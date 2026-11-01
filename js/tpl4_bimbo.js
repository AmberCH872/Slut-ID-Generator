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
