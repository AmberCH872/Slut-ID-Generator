/**
 * Template 3: 登记证书 Controller
 */

const defaultCertTerms = [
    "1. 贱畜承认自己为天生女奴/母狗身份，仅供被主人随意使用、把玩、调教。",
    "2. 身体一切孔洞（口、阴、肛）均作为主人财产，供主人发泄时使用。",
    "3. 必须随时接受主人的内射、无套、吃精、拳交等一切主人安排的玩法，无权拒绝。",
    "4. 同意主人永久保留其任何影音资料，无需本人同意。",
    "5. 如有背叛、反抗或惹怒主人，愿无条件接受任何惨无人道惩罚。",
    "6. 本贱畜自愿终身永远服从，不得脱离，如有违背愿受最严厉惩罚。"
];

const CERT_TERMS_I18N = {
    'zh-CN': defaultCertTerms,
    'zh-TW': [
        "1. 賤畜承認自己為天生女奴/母狗身份，僅供被主人隨意使用、把玩、調教。",
        "2. 身體一切孔洞（口、陰、肛）均作為主人財產，供主人發泄時使用。",
        "3. 必須隨時接受主人的內射、無套、吃精、拳交等一切主人安排的玩法，無權拒絕。",
        "4. 同意主人永久保留其任何影音資料，無需本人同意。",
        "5. 如有背叛、反抗或惹怒主人，願無條件接受任何慘無人道懲罰。",
        "6. 本賤畜自願終身永遠服從，不得脫離，如有違背願受最嚴厲懲罰。"
    ],
    'en': [
        "1. Subject acknowledges her identity as born submissive/property, exclusively for Master's training and pleasure.",
        "2. All bodily faculties and personal freedom are surrendered unconditionally to Master's private possession.",
        "3. Must accept all training, discipline, physical intimacy, and commands as directed without refusal.",
        "4. Consents to Master perpetually archiving all records, audio, and video documentation without further permission.",
        "5. In case of disobedience or defiance, accepts unconditional disciplinary penalties.",
        "6. Subject enters this indenture voluntarily for life, renouncing all rights of revocation."
    ],
    'ja': [
        "1. 本奴隷は生まれながらの性奴隷であることを認め、主人の自由な愛玩調教対象となる。",
        "2. 身体の全開口部および個人の自由は主人の私有財産として無条件で供される。",
        "3. 中出し、生挿入、その他主人が命じるあらゆる調教指示を拒否する権利を持たない。",
        "4. 記録された映像・音声・写真等の全資料を主人が永久に保存・管理することに同意する。",
        "5. 反抗、命令違反、不敬行為があった場合、いかなる過酷な懲罰も無条件で受け入れる。",
        "6. 永久に服従を誓約し、いかなる場合も本契約の破棄または離脱を求めないことを誓う。"
    ]
};

function updateCertTermsLanguage(lang) {
    const list = CERT_TERMS_I18N[lang] || CERT_TERMS_I18N['en'];
    const termsInput = document.getElementById('cert-in-terms');
    if (termsInput && list) {
        const currentVal = termsInput.value.trim();
        const isDefault = Object.values(CERT_TERMS_I18N).some(arr => arr.join('\n') === currentVal);
        if (!currentVal || isDefault) {
            termsInput.value = list.join('\n');
            updateCertTerms();
        }
    }
}

const defaultCertData = {
    'title': '母狗登记证书',
    'subtitle': 'CERTIFICATE OF REGISTRATION & SUBMISSION',
    'code': 'MAKIMA-DEVIL-2026',
    'date': '2026/10/17',
    'validity': '终身（不可撤销）',
    'name': '玛奇玛',
    'realname': 'マキマ (Makima)',
    'birth': '1997/01/07',
    'height': '170',
    'weight': '50',
    'cup': 'E 罩杯',
    'color': '敏感粉嫩色',
    'assessment': '已彻底剥夺支配恶魔之权能，判定为极度渴望被管教、完全顺从主人的专属雌犬肉便器。',
    'declaration': '我自愿放弃支配恶魔的一切神性与自尊，从今往后只是一头必须戴着项圈摇尾乞怜的下贱母狗，感谢主人赐予我这份契约，让我成为您的专属发泄玩具。',
    'master': '至高无上的主人',
    'stamp-top': '公安对魔特异课肉便器管理协会',
    'stamp-bottom': '专用章'
};

function updateCertQR() {
    const code = document.getElementById('cert-in-code')?.value.trim() || 'MAKIMA-DEVIL-2026';
    const qrBox = document.getElementById('cert-out-qr-box');
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
        console.error('Error generating cert QR code:', e);
    }
}

function initCert() {
    const termsInput = document.getElementById('cert-in-terms');
    if (termsInput && !termsInput.value.trim()) {
        termsInput.value = defaultCertTerms.join('\n');
    }
    updateCertTerms();

    Object.entries(defaultCertData).forEach(([k, v]) => {
        const input = document.getElementById(`cert-in-${k}`);
        if (input && !input.value.trim()) {
            input.value = v;
        }
        updateCertField(k);
    });

    updateCertStamp();
    updateCertStampTransform();
    updateCertQR();
}

function updateCertField(field) {
    const input = document.getElementById(`cert-in-${field}`);
    const output = document.getElementById(`cert-out-${field}`);
    if (input && output) {
        output.innerText = input.value;
    }
    if (field === 'code') {
        updateCertQR();
    }
}

function updateCertTerms() {
    const text = document.getElementById('cert-in-terms')?.value || '';
    const container = document.getElementById('cert-out-terms-container');
    if (!container) return;
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    container.innerHTML = lines.map(line => `
        <p class="leading-relaxed text-gray-900">${escapeHtml(line)}</p>
    `).join('');
}

function resetCertTerms() {
    const el = document.getElementById('cert-in-terms');
    if (el) el.value = defaultCertTerms.join('\n');
    updateCertTerms();
}

function updateCertStamp() {
    const topText = document.getElementById('cert-in-stamp-top')?.value || '中华人民共和国特殊从业人员协会';
    const bottomText = document.getElementById('cert-in-stamp-bottom')?.value || '专用章';

    const stampTopEl = document.getElementById('cert-stamp-text-top');
    const stampBottomEl = document.getElementById('cert-stamp-text-bottom');

    if (stampTopEl) stampTopEl.textContent = topText;
    if (stampBottomEl) stampBottomEl.textContent = bottomText;
}

function updateCertStampTransform() {
    const rot = document.getElementById('cert-in-stamp-rot')?.value || '-14';
    const rotVal = document.getElementById('cert-stamp-rot-val');
    if (rotVal) rotVal.innerText = `${rot}°`;

    const stampWrapper = document.getElementById('cert-out-stamp-wrapper');
    if (stampWrapper) {
        stampWrapper.style.transform = `rotate(${rot}deg)`;
    }
}

function toggleCertPhoto() {
    const checked = document.getElementById('cert-toggle-photo')?.checked ?? true;
    const el = document.getElementById('cert-wrap-photo');
    if (el) el.style.display = checked ? 'flex' : 'none';
}

function toggleCertQr() {
    const checked = document.getElementById('cert-toggle-qr')?.checked ?? true;
    const el = document.getElementById('cert-wrap-qr');
    if (el) el.style.display = checked ? 'flex' : 'none';
}

function toggleCertStamp() {
    const checked = document.getElementById('cert-toggle-stamp')?.checked ?? true;
    const el = document.getElementById('cert-out-stamp-wrapper');
    if (el) el.style.display = checked ? 'block' : 'none';
}

function fillCertTodayDate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const str = `${y}/${m}/${d}`;
    const input = document.getElementById('cert-in-date');
    if (input) {
        input.value = str;
        updateCertField('date');
    }
}

function selectCertFont(fontKey) {
    const fonts = {
        sans: "'Noto Sans SC', sans-serif",
        serif: "'Noto Serif SC', serif",
        handwriting: "'Ma Shan Zheng', cursive",
        cute: "'ZCOOL KuaiLe', cursive"
    };
    const card = document.getElementById('cert-certificate-node');
    if (card) card.style.setProperty('--cert-card-font', fonts[fontKey]);

    ['sans', 'serif', 'handwriting', 'cute'].forEach(k => {
        const btn = document.getElementById(`cert-font-btn-${k}`);
        if (btn) {
            btn.className = (k === fontKey)
                ? 'font-opt-btn py-2 px-2 rounded-lg border text-xs font-bold transition text-left flex flex-col gap-0.5 bg-blue-950/60 border-blue-500 ring-blue-500/40 text-white shadow-sm ring-1'
                : 'font-opt-btn py-2 px-2 rounded-lg border text-xs font-bold transition text-left flex flex-col gap-0.5 bg-gray-950 border-gray-700 text-gray-300 hover:border-gray-500';
        }
    });
}

function handleCertPhotoUpload(e) {
    handleImageUpload(e, 'cert-out-photo');
}

function setCertAvatarPreset(presetKey) {
    const photoEl = document.getElementById('cert-out-photo');
    if (!photoEl) return;
    let assetPath = 'assets/tpl3/photo_default.png';
    if (presetKey === 'collar') {
        assetPath = 'assets/tpl1/avatar_collar_uniform.png';
    }
    photoEl.src = (typeof getAssetDataUri === 'function') ? getAssetDataUri(assetPath) : assetPath;
    const file = document.getElementById('cert-in-photo-file');
    if (file) file.value = '';
    if (typeof showToast === 'function') {
        showToast(typeof getI18n === 'function' ? getI18n('toast_preset_applied') : '✨ 预设头像与证物素材已成功应用！');
    }
    if (typeof triggerAutosave === 'function') triggerAutosave();
}

function handleCertQrUpload(e) {
    const file = e.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
        const qrBox = document.getElementById('cert-out-qr-box');
        if (qrBox) {
            qrBox.innerHTML = `<img src="${evt.target.result}" class="w-full h-full object-contain" alt="Custom QR">`;
        }
    };
    reader.readAsDataURL(file);
}

function resetCertDefaults() {
    Object.entries(defaultCertData).forEach(([k, v]) => {
        const el = document.getElementById(`cert-in-${k}`);
        if (el) el.value = v;
        updateCertField(k);
    });
    resetCertTerms();
    updateCertStamp();
    const rot = document.getElementById('cert-in-stamp-rot');
    if (rot) rot.value = '-14';
    updateCertStampTransform();
    selectCertFont('serif');

    const photoEl = document.getElementById('cert-out-photo');
    if (photoEl) photoEl.src = (typeof getAssetDataUri === 'function') ? getAssetDataUri('assets/tpl3/photo_default.png') : 'assets/tpl3/photo_default.png';
    updateCertQR();

    const toggleP = document.getElementById('cert-toggle-photo');
    if (toggleP) { toggleP.checked = true; toggleCertPhoto(); }
    const toggleQ = document.getElementById('cert-toggle-qr');
    if (toggleQ) { toggleQ.checked = true; toggleCertQr(); }
    const toggleS = document.getElementById('cert-toggle-stamp');
    if (toggleS) { toggleS.checked = true; toggleCertStamp(); }
    if (typeof clearDraft === 'function') clearDraft('cert');
}

function exportCert(scaleRatio = 2) {
    const node = document.getElementById('cert-certificate-node');
    const name = document.getElementById('cert-in-name')?.value.trim() || '母狗';
    const code = document.getElementById('cert-in-code')?.value.trim() || '2026';
    const h = node ? node.offsetHeight : 1200;
    const filename = `登记证书_${name}_${code}_${scaleRatio}X.png`;
    const btnName = `高清证书 (${scaleRatio}X)`;
    trackDownload('cert', '登记证书', btnName, filename, scaleRatio);
    return triggerExport(node, filename, scaleRatio, '#ffffff', 850, h);
}

function printCert() {
    trackEvent('card_print', {
        template_id: 'cert',
        button_name: 'PDF / 打印'
    });
    window.print();
}
