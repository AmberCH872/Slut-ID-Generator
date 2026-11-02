/**
 * Archival Wave Postmark & Embossed Seal Overlay System (复古档案波浪邮戳与防伪钢印系统)
 * Supports dynamic SVG rendering, realistic vintage wave cancellations, and 3D embossed relief seals.
 */

function normalizeTpl(tpl) {
    if (tpl === 'slave') return 'sc';
    return tpl;
}

const POSTMARK_CONFIGS = {
    sc: { enabled: false, style: 'wave', preset: 'photo', panX: 0, panY: 0, rot: -12, opacity: 85, color: '#dc2626', dept: '★ SPECIAL DEVIL REGISTRY DIV. ★', date: '' },
    bbc: { enabled: false, style: 'wave', preset: 'photo', panX: 0, panY: 0, rot: -10, opacity: 85, color: '#7c3aed', dept: '★ BBC METROPOLITAN BUREAU ★', date: '' },
    cert: { enabled: false, style: 'emboss', preset: 'photo', panX: 0, panY: 0, rot: -8, opacity: 80, color: '#b45309', dept: '★ OFFICIAL NOTARY NOTARIZED SEAL ★', date: '' },
    bimbo: { enabled: false, style: 'wave', preset: 'photo', panX: 0, panY: 0, rot: -14, opacity: 85, color: '#dc2626', dept: '★ BIMBO LICENSING ARCHIVES ★', date: '' }
};
POSTMARK_CONFIGS.slave = POSTMARK_CONFIGS.sc;

// Preset base coordinates [left, top] for standard 1011 × 638 px cards (and cert A4)
const POSTMARK_PRESET_POSITIONS = {
    sc: {
        photo: { left: 660, top: 165 },
        'bottom-right': { left: 660, top: 440 },
        'bottom-left': { left: 80, top: 440 },
        custom: { left: 660, top: 165 }
    },
    bbc: {
        photo: { left: 590, top: 380 },
        'bottom-right': { left: 640, top: 440 },
        'bottom-left': { left: 80, top: 440 },
        custom: { left: 590, top: 380 }
    },
    cert: {
        photo: { left: 510, top: 200 },
        'bottom-right': { left: 500, top: 880 },
        'bottom-left': { left: 100, top: 880 },
        custom: { left: 510, top: 200 }
    },
    bimbo: {
        photo: { left: 180, top: 380 },
        'bottom-right': { left: 650, top: 450 },
        'bottom-left': { left: 50, top: 450 },
        custom: { left: 180, top: 380 }
    }
};
POSTMARK_PRESET_POSITIONS.slave = POSTMARK_PRESET_POSITIONS.sc;

/**
 * Format today's date in YYYY.MM.DD
 */
function getTodayPostmarkDate() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
}

/**
 * Initialize Postmark System
 */
function initPostmarkSystem() {
    const today = getTodayPostmarkDate();
    ['sc', 'bbc', 'cert', 'bimbo'].forEach(tpl => {
        if (!POSTMARK_CONFIGS[tpl].date) {
            POSTMARK_CONFIGS[tpl].date = today;
        }
        const dateInput = document.getElementById(`${tpl}-in-postmark-date`);
        if (dateInput && !dateInput.value) {
            dateInput.value = today;
        }
        updatePostmark(tpl);
    });
}

/**
 * Toggle Postmark Enable
 */
function togglePostmark(tpl) {
    tpl = normalizeTpl(tpl);
    const chk = document.getElementById(`${tpl}-in-postmark-enable`);
    const controls = document.getElementById(`${tpl}-postmark-controls`);
    const layer = document.getElementById(`${tpl}-postmark-layer`);
    const isEnabled = chk ? chk.checked : false;

    POSTMARK_CONFIGS[tpl].enabled = isEnabled;

    if (controls) {
        controls.classList.toggle('hidden', !isEnabled);
    }
    if (layer) {
        layer.classList.toggle('hidden', !isEnabled);
    }

    if (isEnabled) {
        updatePostmark(tpl);
    }
    if (typeof triggerAutosave === 'function') {
        triggerAutosave(tpl === 'sc' ? 'slave' : tpl);
    }
}

/**
 * Change Postmark Style (wave vs emboss)
 */
function setPostmarkStyle(tpl, style) {
    tpl = normalizeTpl(tpl);
    POSTMARK_CONFIGS[tpl].style = style;
    const btnWave = document.getElementById(`${tpl}-btn-pm-wave`);
    const btnEmboss = document.getElementById(`${tpl}-btn-pm-emboss`);
    const colorGroup = document.getElementById(`${tpl}-postmark-color-group`);

    if (btnWave && btnEmboss) {
        btnWave.className = (style === 'wave')
            ? 'px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-gray-950 shadow'
            : 'px-2.5 py-1.5 rounded-lg text-xs font-bold bg-gray-800 text-gray-300 hover:text-white';
        btnEmboss.className = (style === 'emboss')
            ? 'px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-gray-950 shadow'
            : 'px-2.5 py-1.5 rounded-lg text-xs font-bold bg-gray-800 text-gray-300 hover:text-white';
    }

    if (colorGroup) {
        // Color selector mainly used for wave, emboss is metallic/paper relief
        colorGroup.classList.toggle('hidden', style === 'emboss');
    }

    updatePostmark(tpl);
}

/**
 * Apply Postmark Preset Position
 */
function setPostmarkPreset(tpl, preset) {
    tpl = normalizeTpl(tpl);
    POSTMARK_CONFIGS[tpl].preset = preset;
    const panXInput = document.getElementById(`${tpl}-in-pm-pan-x`);
    const panYInput = document.getElementById(`${tpl}-in-pm-pan-y`);
    const rotInput = document.getElementById(`${tpl}-in-pm-rot`);

    if (preset === 'photo') {
        POSTMARK_CONFIGS[tpl].rot = (tpl === 'cert') ? -8 : -14;
    } else if (preset === 'bottom-right') {
        POSTMARK_CONFIGS[tpl].rot = -6;
    } else if (preset === 'bottom-left') {
        POSTMARK_CONFIGS[tpl].rot = 8;
    }

    POSTMARK_CONFIGS[tpl].panX = 0;
    POSTMARK_CONFIGS[tpl].panY = 0;

    if (panXInput) panXInput.value = '0';
    if (panYInput) panYInput.value = '0';
    if (rotInput) rotInput.value = String(POSTMARK_CONFIGS[tpl].rot);

    updatePostmark(tpl);
}

/**
 * Set Postmark Ink Color
 */
function setPostmarkColor(tpl, color) {
    tpl = normalizeTpl(tpl);
    POSTMARK_CONFIGS[tpl].color = color;
    updatePostmark(tpl);
}

/**
 * Update Postmark from inputs and render
 */
function updatePostmark(tpl) {
    tpl = normalizeTpl(tpl);
    const config = POSTMARK_CONFIGS[tpl];
    if (!config) return;

    // Read current input values
    const panX = parseInt(document.getElementById(`${tpl}-in-pm-pan-x`)?.value || '0', 10);
    const panY = parseInt(document.getElementById(`${tpl}-in-pm-pan-y`)?.value || '0', 10);
    const rot = parseInt(document.getElementById(`${tpl}-in-pm-rot`)?.value || String(config.rot), 10);
    const opacity = parseInt(document.getElementById(`${tpl}-in-pm-opacity`)?.value || '85', 10);
    const dept = document.getElementById(`${tpl}-in-pm-dept`)?.value || config.dept;
    const date = document.getElementById(`${tpl}-in-pm-date`)?.value || config.date;

    config.panX = panX;
    config.panY = panY;
    config.rot = rot;
    config.opacity = opacity;
    config.dept = dept;
    config.date = date;

    // Update value text displays
    const valRot = document.getElementById(`${tpl}-val-pm-rot`);
    const valOpacity = document.getElementById(`${tpl}-val-pm-opacity`);
    const valPanX = document.getElementById(`${tpl}-val-pm-pan-x`);
    const valPanY = document.getElementById(`${tpl}-val-pm-pan-y`);

    if (valRot) valRot.innerText = `${rot}°`;
    if (valOpacity) valOpacity.innerText = `${opacity}%`;
    if (valPanX) valPanX.innerText = `${panX}px`;
    if (valPanY) valPanY.innerText = `${panY}px`;

    const layer = document.getElementById(`${tpl}-postmark-layer`);
    if (!layer) return;

    if (!config.enabled) {
        layer.classList.add('hidden');
        return;
    }
    layer.classList.remove('hidden');

    // Calculate base position
    const basePos = (POSTMARK_PRESET_POSITIONS[tpl] && POSTMARK_PRESET_POSITIONS[tpl][config.preset])
        ? POSTMARK_PRESET_POSITIONS[tpl][config.preset]
        : { left: 600, top: 400 };

    const finalLeft = basePos.left + panX;
    const finalTop = basePos.top + panY;

    layer.style.left = `${finalLeft}px`;
    layer.style.top = `${finalTop}px`;
    layer.style.opacity = (opacity / 100).toString();
    layer.style.transform = `rotate(${rot}deg)`;
    layer.style.transformOrigin = 'center center';

    // Render SVG content
    layer.innerHTML = (config.style === 'wave')
        ? renderWavePostmarkSvg(tpl, config)
        : renderEmbossedSealSvg(tpl, config);
}

/**
 * Generate SVG for Cancellation Wave Postmark (复古波浪盖销戳)
 */
function renderWavePostmarkSvg(tpl, config) {
    const color = config.color || '#dc2626';
    const dept = escapeHtml(config.dept || '★ ARCHIVE VERIFICATION DIVISION ★');
    const dateStr = escapeHtml(config.date || getTodayPostmarkDate());
    const uniqueId = `pm-wave-${tpl}`;

    return `
        <div class="relative w-[340px] h-[140px] pointer-events-none select-none" style="color: ${color};">
            <svg viewBox="0 0 340 140" width="340" height="140" class="w-full h-full">
                <defs>
                    <!-- Vintage distress filter for ink bleed -->
                    <filter id="${uniqueId}-distress" x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
                <g filter="url(#${uniqueId}-distress)">
                    <!-- Left Circle Stamp -->
                    <g transform="translate(70, 70)">
                        <!-- Outer double circle -->
                        <circle r="60" fill="none" stroke="currentColor" stroke-width="2.6" opacity="0.95" />
                        <circle r="53" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.88" />
                        
                        <!-- Top & Bottom text along curved path -->
                        <path id="${uniqueId}-path-top" d="M -44,0 A 44,44 0 1,1 44,0" fill="none" />
                        <path id="${uniqueId}-path-bot" d="M 44,0 A 44,44 0 1,1 -44,0" fill="none" />
                        
                        <text font-size="8.8" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letter-spacing="1.2" fill="currentColor">
                            <textPath href="#${uniqueId}-path-top" startOffset="50%" text-anchor="middle">
                                ${dept}
                            </textPath>
                        </text>
                        <text font-size="8.5" font-weight="800" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letter-spacing="1.5" fill="currentColor">
                            <textPath href="#${uniqueId}-path-bot" startOffset="50%" text-anchor="middle">
                                OFFICIAL ARCHIVE
                            </textPath>
                        </text>

                        <!-- Center horizontal dividers and date -->
                        <line x1="-38" y1="-13" x2="38" y2="-13" stroke="currentColor" stroke-width="1.2" opacity="0.8" />
                        <text x="0" y="-1" font-size="12" font-weight="900" font-family="monospace" letter-spacing="1" text-anchor="middle" fill="currentColor">
                            ${dateStr}
                        </text>
                        <line x1="-38" y1="6" x2="38" y2="6" stroke="currentColor" stroke-width="1.2" opacity="0.8" />
                        <text x="0" y="20" font-size="9" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letter-spacing="2" text-anchor="middle" fill="currentColor">
                            SEC-VERIFIED
                        </text>
                    </g>

                    <!-- 4 Classical Archival Wavy Cancellation Bars -->
                    <g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.92">
                        <path d="M 132 40 C 158 24, 184 56, 210 40 C 236 24, 262 56, 288 40 C 304 30, 320 45, 334 40" />
                        <path d="M 132 58 C 158 42, 184 74, 210 58 C 236 42, 262 74, 288 58 C 304 48, 320 63, 334 58" />
                        <path d="M 132 76 C 158 60, 184 92, 210 76 C 236 60, 262 92, 288 76 C 304 66, 320 81, 334 76" />
                        <path d="M 132 94 C 158 78, 184 110, 210 94 C 236 78, 262 110, 288 94 C 304 84, 320 99, 334 94" />
                    </g>
                </g>
            </svg>
        </div>
    `;
}

/**
 * Generate SVG for 3D Embossed Notary Seal (立体防伪钢印)
 */
function renderEmbossedSealSvg(tpl, config) {
    const dept = escapeHtml(config.dept || '★ OFFICIAL NOTARY NOTARIZED SEAL ★');
    const dateStr = escapeHtml(config.date || getTodayPostmarkDate());
    const uniqueId = `pm-emboss-${tpl}`;

    // 36-point scalloped starburst points
    const points = [];
    const numPoints = 36;
    const rOuter = 78;
    const rInner = 71;
    for (let i = 0; i < numPoints * 2; i++) {
        const r = (i % 2 === 0) ? rOuter : rInner;
        const angle = (i * Math.PI) / numPoints;
        const x = r * Math.sin(angle);
        const y = -r * Math.cos(angle);
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    const starburstPath = `M ${points.join(' L ')} Z`;

    return `
        <div class="relative w-[180px] h-[180px] pointer-events-none select-none" style="mix-blend-mode: overlay;">
            <svg viewBox="-90 -90 180 180" width="180" height="180" class="w-full h-full">
                <defs>
                    <!-- 3D Specular Relief Lighting Filters -->
                    <filter id="${uniqueId}-light" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="-1.5" dy="-1.5" stdDeviation="0.6" flood-color="#ffffff" flood-opacity="0.95" />
                        <feDropShadow dx="1.8" dy="1.8" stdDeviation="1" flood-color="#000000" flood-opacity="0.75" />
                    </filter>
                </defs>
                <g filter="url(#${uniqueId}-light)" fill="none" stroke="rgba(255, 255, 255, 0.85)">
                    <!-- Outer 36-point serrated gear border -->
                    <path d="${starburstPath}" stroke-width="2" fill="rgba(255, 255, 255, 0.05)" />
                    <!-- Concentric relief rings -->
                    <circle r="67" stroke-width="1.2" stroke-dasharray="2.5 1.5" />
                    <circle r="56" stroke-width="2.2" />
                    
                    <!-- Text path around ring -->
                    <path id="${uniqueId}-path-top" d="M -46,0 A 46,46 0 1,1 46,0" />
                    <path id="${uniqueId}-path-bot" d="M 46,0 A 46,46 0 1,1 -46,0" />

                    <text font-size="7.5" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letter-spacing="1.5" fill="rgba(255, 255, 255, 0.95)">
                        <textPath href="#${uniqueId}-path-top" startOffset="50%" text-anchor="middle">
                            ${dept}
                        </textPath>
                    </text>
                    <text font-size="7.5" font-weight="800" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letter-spacing="1.5" fill="rgba(255, 255, 255, 0.95)">
                        <textPath href="#${uniqueId}-path-bot" startOffset="50%" text-anchor="middle">
                            ★ AUTHENTIC SECURITY ★
                        </textPath>
                    </text>

                    <!-- Center Emblem: Multi-point Star & Date -->
                    <circle r="30" stroke-width="1.5" fill="rgba(255, 255, 255, 0.06)" />
                    <path d="M 0 -18 L 4.5 -5 L 18 -5 L 7 3.5 L 11 16 L 0 8.5 L -11 16 L -7 3.5 L -18 -5 L -4.5 -5 Z"
                        fill="rgba(255, 255, 255, 0.3)" stroke="rgba(255, 255, 255, 0.9)" stroke-width="1" />
                    <text x="0" y="24" font-size="8.5" font-weight="900" font-family="monospace" letter-spacing="1" text-anchor="middle" fill="rgba(255, 255, 255, 0.9)">
                        ${dateStr}
                    </text>
                </g>
            </svg>
        </div>
    `;
}
