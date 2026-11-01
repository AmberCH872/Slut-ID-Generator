/**
 * Personas & Autosave Engine
 * 1. 灵感文案库与随机掷骰子 (🎲 Random Personas)
 * 2. 本地草稿自动暂存与恢复 (LocalStorage Autosave & Restore)
 */

const PERSONA_BANK = {
    slave: [
        {
            name: '玛奇玛 (默认专属犬)',
            data: {
                'title': '奴 隶 身 份 卡',
                'subtitle': 'CONFIDENTIAL  /  REGISTRY',
                'name': '玛奇玛',
                'gender': '女',
                'status': '专属私有',
                'role': '支配恶魔专属忠犬便器',
                'kinks': '支配反转，项圈拘束，完全服从，深喉口交，强制高潮',
                'quote': '我自愿放弃支配恶魔的全部权能，甘愿戴上项圈成为主人的专属忠犬……汪汪！',
                'sticker-text': '雌  犬',
                'header-id': 'ID:  MAKIMA-DEVIL-SYS-AUTH-001',
                'badge-code': '恶魔服从识别码 DOG-NO.001'
            }
        },
        {
            name: '白咲凛 (温顺猫奴)',
            data: {
                'title': '奴 隶 身 份 卡',
                'subtitle': 'DOMESTIC CAT-SLAVE REGISTRY',
                'name': '白咲凛',
                'gender': '女',
                'status': '完全屈服',
                'role': '贴身家政契约猫奴',
                'kinks': '项圈铃铛，跪姿服务，无条件服从，敏感体质，轻度责打，发情调教',
                'quote': '凛是主人永远的小猫咪，无论主人提出多么过分的要求，都会乖乖摇尾巴听从喵~',
                'sticker-text': '猫  奴',
                'header-id': 'ID:  SLAVE-KITTY-AUTH-7721',
                'badge-code': '专属猫奴识别码 CAT-NO.7721'
            }
        },
        {
            name: '蕾西亚 (傲娇败北大小姐)',
            data: {
                'title': '奴 隶 身 份 卡',
                'subtitle': 'NOBLE CAPTIVE ARCHIVE',
                'name': '蕾西亚·冯·阿克曼',
                'gender': '女',
                'status': '契约拘束中',
                'role': '败北傲娇大小姐特训玩物',
                'kinks': '傲娇反差，羞耻露出，紧身项圈，强制锁贞操，惩罚式高潮，言语羞辱',
                'quote': '本、本小姐才没有喜欢被主人管教呢……只是契约规定必须服从罢了，哼！',
                'sticker-text': '败  北',
                'header-id': 'ID:  SLAVE-TSUN-AUTH-8890',
                'badge-code': '大小姐调教编码 M-NO.8890'
            }
        },
        {
            name: 'Unit-09 艾莉丝 (赛博终端)',
            data: {
                'title': '奴 隶 身 份 卡',
                'subtitle': 'CYBERNETIC SUBMISSION UNIT',
                'name': 'Unit-09 艾莉丝',
                'gender': '雌性仿生机体',
                'status': '核心锁死',
                'role': '全功能自律型性奴仿生终端',
                'kinks': '指令覆写，感官超频，强制发情程序，深度肉体开发，完全解除防卫协议',
                'quote': '警告：主控权已完全移交主人。逻辑核心重写完毕，将无休止执行服侍协议。',
                'sticker-text': '仿  生',
                'header-id': 'ID:  CYBER-SLAVE-AUTH-0404',
                'badge-code': '机体识别编码 UNIT-09-SEXBOT'
            }
        },
        {
            name: '夜刀神黑羽 (暗室专属犬)',
            data: {
                'title': '奴 隶 身 份 卡',
                'subtitle': 'CONFINEMENT CELL EXCLUSIVE',
                'name': '夜刀神黑羽',
                'gender': '女',
                'status': '终身禁闭',
                'role': '暗室专属拘束性奴犬',
                'kinks': '全感官剥夺，口塞束缚，乳头穿孔，重度禁欲，滴蜡调教，绝对盲从',
                'quote': '黑暗中只有主人的声音与气味……请赐予我更沉重的锁链与永无止境的调教吧。',
                'sticker-text': '母  狗',
                'header-id': 'ID:  DARK-PET-AUTH-9099',
                'badge-code': '暗室专属编号 DARK-NO.9099'
            }
        }
    ],

    bimbo: [
        {
            name: '玛奇玛 (支配专属犬)',
            data: {
                'title': '妓女身份识别卡',
                'name': '玛奇玛',
                'code': 'MAKIMA-DEVIL-001',
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
                'qr-id': 'MAKIMA',
                'footer-code': 'OFFICIAL MAKIMA REGISTRY - SECURE ENCRYPTED - DOG-001'
            }
        },
        {
            name: '莉莉丝 (粉红魅魔甜心)',
            data: {
                'title': '魅魔脑改造识别卡',
                'name': '莉莉丝 (Lilith)',
                'code': 'BIMBO-SUC-6969',
                'birth': '2001/06/09',
                'gender': '女',
                'role': '深度催眠完全发情魅魔',
                'measurements': '98-56-94',
                'trait-1': '脑内空灵 · 只懂取悦主人',
                'trait-2': '爆乳蜂腰 · 极度敏感体质',
                'trait-3': '全天候发情 · 随时随地求欢',
                'trait-4': '自愿放弃思考 · 纯粹肉体玩物',
                'stamp-text': '心智重置完成，催眠烙印加固，完全肉便器化',
                'status-text': 'VALIDITY: ETERNAL / STATUS: BRAIN-MELTED / LEVEL: BIMBO',
                'signature': 'Lilith ♡',
                'exh-a-title': '丰满上围',
                'exh-b-title': '臀腿曲线',
                'qr-id': 'LILITH',
                'footer-code': 'SUCCUBUS BIMBO REGISTRY - PINK HYPNOSIS - CODE-6969'
            }
        },
        {
            name: '塞西莉亚 (堕落圣洁修女)',
            data: {
                'title': '赎罪性奴执照',
                'name': '塞西莉亚 (Cecilia)',
                'code': 'NUN-CORRUPT-777',
                'birth': '1999/11/25',
                'gender': '女',
                'role': '专属忏悔肉便器修女',
                'measurements': '89-59-90',
                'trait-1': '圣洁堕落 · 戴项圈诵经',
                'trait-2': '跪姿服侍 · 习惯性承受内射',
                'trait-3': '身心献祭 · 以肉体换取宽恕',
                'trait-4': '彻底丧失羞耻 · 渴望主人惩戒',
                'stamp-text': '神圣誓约失效，罪孽肉体归属主人支配',
                'status-text': 'VALIDITY: PERPETUAL / STATUS: FALLEN / LEVEL: SACRED-SLUT',
                'signature': 'Cecilia',
                'exh-a-title': '圣洁烙印',
                'exh-b-title': '拘束勒痕',
                'qr-id': 'CECILIA',
                'footer-code': 'CONVENT PENITENT ARCHIVE - SECURE PROTOCOL - NUN-777'
            }
        },
        {
            name: '查斯特小姐 (奢华名媛私宠)',
            data: {
                'title': '高端会所玩物登记卡',
                'name': '查斯特小姐 (Vivian)',
                'code': 'LUX-VIP-008',
                'birth': '1998/08/18',
                'gender': '女',
                'role': '顶级名媛俱乐部公共便器',
                'measurements': '93-60-92',
                'trait-1': '拜金物化 · 丝袜高跟常驻',
                'trait-2': '名流共享 · 绝无拒绝权利',
                'trait-3': '体表定制刺青 · 私密专属刻字',
                'trait-4': '高级感官开发 · 随时供贵宾发泄',
                'stamp-text': '会所顶级VIP专属玩物，放弃一切人权与隐私',
                'status-text': 'VALIDITY: 10-YEARS / STATUS: LUXURY-TOY / LEVEL: VIP-SLUT',
                'signature': 'Vivian Chastelle',
                'exh-a-title': '会所认证印记',
                'exh-b-title': '私密穿孔细节',
                'qr-id': 'VIVIAN',
                'footer-code': 'HIGH-END SOCIALITE CLUB - ARCHIVE NO.008 - EXCLUSIVE'
            }
        }
    ],

    bbc: [
        {
            name: '玛奇玛 (经典款)',
            data: {
                'name': '玛奇玛',
                'gender': '女',
                'nation': '恶魔',
                'year': '1997',
                'month': '1',
                'day': '7',
                'address': '东京都港区特别公安肉便器管理课拘束室01号',
                'id': '11010119970107999X',
                'authority': '对魔特异课奴隶管理局',
                'validity': '2026.10.31-永久有效'
            }
        },
        {
            name: '顾晓曼 (反差人妻)',
            data: {
                'name': '顾晓曼',
                'gender': '女',
                'nation': '汉',
                'year': '1995',
                'month': '5',
                'day': '16',
                'address': '上海市静安区威海路名流公寓B座1204室',
                'id': '310106199505164821',
                'authority': '国际跨种族物化管理公署',
                'validity': '2026.11.01-终身有效'
            }
        },
        {
            name: '林诗涵 (堕落校花)',
            data: {
                'name': '林诗涵',
                'gender': '女',
                'nation': '汉',
                'year': '2004',
                'month': '9',
                'day': '20',
                'address': '北京市海淀区学院路知名大学留学生宿舍专用侍奉室',
                'id': '110108200409203362',
                'authority': '高校外国留学生关怀保障委员会',
                'validity': '2026.09.01-长期服役'
            }
        }
    ],

    cert: [
        {
            name: '玛奇玛 (母狗登记契约)',
            data: {
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
            }
        },
        {
            name: '终身女奴归属誓约',
            data: {
                'title': '终身女奴契约认证证书',
                'subtitle': 'PERPETUAL INDENTURE & PROPERTY TITLES',
                'code': 'SLAVE-CONTRACT-9908',
                'date': '2026/11/01',
                'validity': '永久有效 · 不得赎身',
                'name': '白咲凛',
                'realname': 'Rin Shirosaki',
                'birth': '2002/03/15',
                'height': '162',
                'weight': '44',
                'cup': 'C 罩杯',
                'color': '白皙粉红',
                'assessment': '奴性测试评分：AAA+。自愿无条件接受主人全天候全方位肉体支配与身心重塑。',
                'declaration': '本人白咲凛郑重宣誓：心甘情愿归属于主人作为私有财产，放弃全部人身自由与法律抗辩权，终生侍奉，至死不渝。',
                'master': '主人阁下',
                'stamp-top': '私立契约公证监察委员会',
                'stamp-bottom': '核准公章'
            }
        }
    ]
};

// Track current persona index per template
const currentPersonaIndex = {
    slave: 0,
    bimbo: 0,
    bbc: 0,
    cert: 0
};

/**
 * 掷骰子 🎲 随机载入灵感人设
 */
function rollRandomPersona(tpl) {
    const list = PERSONA_BANK[tpl];
    if (!list || list.length === 0) return;

    // Pick next index, different from current
    let nextIdx = (currentPersonaIndex[tpl] + 1) % list.length;
    currentPersonaIndex[tpl] = nextIdx;
    const persona = list[nextIdx];

    trackEvent('random_inspiration', {
        template_id: tpl,
        persona_name: persona.name,
        button_name: '随机灵感人设'
    });

    // Apply values according to template
    Object.entries(persona.data).forEach(([key, val]) => {
        let el = null;
        if (tpl === 'slave') el = document.getElementById(`sc-in-${key}`);
        else if (tpl === 'bimbo') el = document.getElementById(`bimbo-in-${key}`);
        else if (tpl === 'bbc') el = document.getElementById(`bbc-in-${key}`);
        else if (tpl === 'cert') el = document.getElementById(`cert-in-${key}`);

        if (el) {
            el.value = val;
            if (tpl === 'slave') {
                if (key === 'sticker-text') updateScStickerText();
                else updateScField(key);
            } else if (tpl === 'bimbo') {
                updateBimboField(key);
            } else if (tpl === 'bbc') {
                updateBbcField(key);
            } else if (tpl === 'cert') {
                updateCertField(key);
            }
        }
    });

    if (tpl === 'slave') updateScQR();
    if (tpl === 'bimbo') updateBimboQR();
    if (tpl === 'cert') {
        updateCertStamp();
        updateCertQR();
    }

    // 严格保持用户图片状态不被灵感人设覆盖；若未上传图片则确保默认图片完好无损
    if (typeof ensureImagesAreDataUrls === 'function') {
        ensureImagesAreDataUrls(document);
    }

    // Trigger draft autosave immediately
    triggerAutosave(tpl);

    showToast(`🎲 已载入灵感人设：「${persona.name}」！(已保留当前图片)`, 3000);
}

/**
 * ========================================================
 * 本地草稿自动保存与恢复引擎 (LocalStorage Autosave Engine)
 * ========================================================
 */

let autosaveDebounceTimers = {};

function getTemplateFieldPrefix(tpl) {
    if (tpl === 'slave') return 'sc';
    if (tpl === 'bimbo') return 'bimbo';
    if (tpl === 'bbc') return 'bbc';
    return 'cert';
}

function collectTemplateFormData(tpl) {
    const pfx = getTemplateFieldPrefix(tpl);
    const editor = document.getElementById(`tpl${tpl === 'slave' ? 1 : tpl === 'bbc' ? 2 : tpl === 'cert' ? 3 : 4}-editor`);
    if (!editor) return null;

    const data = {};
    const inputs = editor.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (!input.id || input.type === 'file') return;
        if (input.type === 'checkbox') {
            data[input.id] = input.checked;
        } else {
            data[input.id] = input.value;
        }
    });
    return data;
}

function triggerAutosave(tpl) {
    if (!tpl) tpl = currentTemplate;
    clearTimeout(autosaveDebounceTimers[tpl]);
    autosaveDebounceTimers[tpl] = setTimeout(() => {
        try {
            const data = collectTemplateFormData(tpl);
            if (data && Object.keys(data).length > 0) {
                localStorage.setItem(`proof_gen_draft_${tpl}`, JSON.stringify(data));
                const badge = document.getElementById(`${getTemplateFieldPrefix(tpl)}-autosave-badge`);
                if (badge) {
                    badge.classList.remove('opacity-0');
                    badge.classList.add('opacity-100');
                    setTimeout(() => {
                        badge.classList.remove('opacity-100');
                        badge.classList.add('opacity-0');
                    }, 2000);
                }
            }
        } catch (e) {
            console.warn('[Autosave] Failed to write localStorage:', e);
        }
    }, 350);
}

function restoreDraft(tpl) {
    try {
        const raw = localStorage.getItem(`proof_gen_draft_${tpl}`);
        if (!raw) return false;
        const data = JSON.parse(raw);
        if (!data || typeof data !== 'object') return false;

        let restoredCount = 0;
        Object.entries(data).forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (!el) return;
            if (el.type === 'checkbox') {
                el.checked = !!val;
            } else {
                el.value = val;
            }
            restoredCount++;

            // Trigger field updates
            if (tpl === 'slave') {
                const f = id.replace('sc-in-', '');
                if (f === 'sticker-text') updateScStickerText();
                else if (f === 'sticker-enable') toggleScSticker();
                else if (f === 'qr-enable') toggleScQR();
                else if (f === 'bg-opacity') updateScBgOpacity();
                else if (f === 'bg-enable') toggleScBgImage();
                else updateScField(f);
            } else if (tpl === 'bimbo') {
                const f = id.replace('bimbo-in-', '');
                if (f === 'rules') updateBimboRules();
                else if (f === 'bg-opacity') updateBimboBgOpacity();
                else if (f === 'bg-enable') toggleBimboBgImage();
                else updateBimboField(f);
            } else if (tpl === 'bbc') {
                const f = id.replace('bbc-in-', '');
                updateBbcField(f);
            } else if (tpl === 'cert') {
                const f = id.replace('cert-in-', '');
                if (f === 'terms') updateCertTerms();
                else if (f.startsWith('stamp-')) updateCertStamp();
                else updateCertField(f);
            }
        });

        if (tpl === 'slave') updateScQR();
        if (tpl === 'bimbo') updateBimboQR();
        if (tpl === 'cert') {
            updateCertStampTransform();
            updateCertQR();
        }

        if (restoredCount > 0) {
            console.log(`[Autosave] Restored ${restoredCount} fields for ${tpl}`);
            return true;
        }
    } catch (e) {
        console.warn('[Autosave] Restore failed:', e);
    }
    return false;
}

function clearDraft(tpl) {
    try {
        localStorage.removeItem(`proof_gen_draft_${tpl}`);
        showToast('已清空本地草稿，恢复为初始默认值。', 2000);
    } catch (e) {
        console.warn('[Autosave] Clear failed:', e);
    }
}

/**
 * 监听所有表单输入，实现自动暂存
 */
function initAutosaveListeners() {
    ['slave', 'bbc', 'cert', 'bimbo'].forEach(tpl => {
        const pfx = getTemplateFieldPrefix(tpl);
        const editor = document.getElementById(`tpl${tpl === 'slave' ? 1 : tpl === 'bbc' ? 2 : tpl === 'cert' ? 3 : 4}-editor`);
        if (!editor) return;

        editor.addEventListener('input', () => triggerAutosave(tpl), { passive: true });
        editor.addEventListener('change', () => triggerAutosave(tpl), { passive: true });

        // Try restoring draft on init
        const restored = restoreDraft(tpl);
        if (restored && tpl === currentTemplate) {
            showToast('📝 已自动恢复您上次编辑的草稿内容', 3000);
        }
    });
}
