const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- Running Modular Web App Verification Suite ---');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Verify CSS files exist and are referenced
const cssFiles = ['css/base.css', 'css/tpl1_slave.css', 'css/tpl2_bbc.css', 'css/tpl3_cert.css', 'css/tpl4_bimbo.css'];
for (const f of cssFiles) {
    assert(fs.existsSync(f), `CSS file "${f}" must exist`);
    assert(html.includes(f), `index.html must link to "${f}"`);
}
console.log(`✓ All ${cssFiles.length} modular CSS files exist and are linked in index.html.`);

// 2. Load all JS files
const jsFiles = ['js/default_assets.js', 'js/i18n.js', 'js/export.js', 'js/personas.js', 'js/inspiration.js', 'js/postmark.js', 'js/tpl1_slave.js', 'js/tpl2_bbc.js', 'js/tpl3_cert.js', 'js/tpl4_bimbo.js', 'js/app.js'];
let combinedJs = '';
for (const f of jsFiles) {
    assert(fs.existsSync(f), `JS file "${f}" must exist`);
    assert(html.includes(f), `index.html must import script "${f}"`);
    combinedJs += '\n' + fs.readFileSync(f, 'utf8');
}
console.log(`✓ All ${jsFiles.length} modular JS files exist and are imported in index.html.`);

// 3. Extract defined functions and check inline event handlers
const definedFuncs = new Set([
    ...[...combinedJs.matchAll(/function\s+([a-zA-Z0-9_]+)/g)].map(m => m[1]),
    ...[...combinedJs.matchAll(/const\s+([a-zA-Z0-9_]+)\s*=\s*\(/g)].map(m => m[1]),
    ...[...combinedJs.matchAll(/let\s+([a-zA-Z0-9_]+)\s*=\s*\(/g)].map(m => m[1]),
    'parseInt', 'parseFloat', 'alert', 'confirm', 'setTimeout', 'clearTimeout', 'print'
]);

const eventMatches = [...html.matchAll(/(on[a-z]+)=["']([^"']+)["']/g)];
console.log(`Found ${eventMatches.length} inline event handlers in index.html.`);

for (const [_, attr, code] of eventMatches) {
    const calls = [...code.matchAll(/([a-zA-Z0-9_]+)\s*\(/g)].map(m => m[1]);
    for (const fn of calls) {
        if (fn === 'getElementById') continue;
        assert(definedFuncs.has(fn), `Function "${fn}" in ${attr}="${code}" must be defined in JS`);
    }
}
console.log('✓ All inline event handlers map to valid defined functions in JS modules.');

// 4. Verify unique DOM IDs
const definedIdsList = [...html.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
const definedIds = new Set(definedIdsList);
const idCounts = {};
for (const id of definedIdsList) {
    idCounts[id] = (idCounts[id] || 0) + 1;
}
const duplicateIds = Object.keys(idCounts).filter(id => idCounts[id] > 1);
assert.strictEqual(duplicateIds.length, 0, `Duplicate DOM IDs found: ${duplicateIds.join(', ')}`);
console.log(`✓ All ${definedIds.size} DOM IDs in index.html are completely unique.`);

// 5. Verify all getElementById calls reference IDs defined in HTML
const getByIdCalls = new Set([
    ...[...combinedJs.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]),
    ...[...html.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1])
]);

for (const id of getByIdCalls) {
    assert(definedIds.has(id), `Element ID "${id}" accessed via getElementById must exist in HTML`);
}
console.log(`✓ All ${getByIdCalls.size} static getElementById calls target existing DOM elements.`);

// 6. Verify dynamic photo transform IDs for 'sc', 'bbc', 'bimbo'
['sc', 'bbc', 'bimbo'].forEach(pfx => {
    ['in-zoom', 'in-pan-x', 'in-pan-y', 'in-rot', 'val-zoom', 'val-pan-x', 'val-pan-y', 'val-rot', 'out-photo'].forEach(suffix => {
        const id = `${pfx}-${suffix}`;
        assert(definedIds.has(id), `Dynamic photo transform ID "${id}" must exist in HTML`);
    });
});
console.log('✓ All dynamic photo transform IDs exist for sc, bbc, and bimbo templates.');

// 7. Verify font buttons exist for all 4 templates
['sc', 'bbc', 'cert', 'bimbo'].forEach(pfx => {
    ['sans', 'serif', 'handwriting', 'cute'].forEach(font => {
        const id = `${pfx}-font-btn-${font}`;
        assert(definedIds.has(id), `Font button ID "${id}" must exist in HTML`);
    });
});
console.log('✓ All font button IDs exist for sc, bbc, cert, and bimbo templates.');

// 8. Verify all image src references point to existing files
const imgSrcs = [
    ...[...html.matchAll(/src=["'](assets\/[^"']+)["']/g)].map(m => m[1]),
    ...[...combinedJs.matchAll(/['"](assets\/[^'"]+)['"]/g)].map(m => m[1])
];
console.log(`Checking ${imgSrcs.length} asset references...`);
for (const src of imgSrcs) {
    assert(fs.existsSync(src), `Asset file "${src}" referenced in code must exist on disk`);
}
console.log('✓ All asset files referenced in HTML and JS exist on disk.');

// 9. Verify 300 PPI (85.6mm * 54.0mm -> 1011 x 638 px) resolution standardization
const scHtmlMatch = html.match(/id="sc-card-node"[^>]*style="[^"]*width:\s*(\d+)px;\s*height:\s*(\d+)px;/);
assert(scHtmlMatch && scHtmlMatch[1] === '1011' && scHtmlMatch[2] === '638', 'sc-card-node in HTML must have width: 1011px; height: 638px');

const bbcHtmlMatch = html.match(/id="bbc-card-node"[^>]*style="[^"]*width:\s*(\d+)px;\s*height:\s*(\d+)px;/);
assert(bbcHtmlMatch && bbcHtmlMatch[1] === '1011' && bbcHtmlMatch[2] === '638', 'bbc-card-node in HTML must have width: 1011px; height: 638px');

const bimboHtmlMatch = html.match(/id="bimbo-card-node"[^>]*style="[^"]*width:\s*(\d+)px;\s*height:\s*(\d+)px;/);
assert(bimboHtmlMatch && bimboHtmlMatch[1] === '1011' && bimboHtmlMatch[2] === '638', 'bimbo-card-node in HTML must have width: 1011px; height: 638px');

const tpl1Css = fs.readFileSync('css/tpl1_slave.css', 'utf8');
assert(tpl1Css.includes('width: 1011px;') && tpl1Css.includes('height: 638px;'), 'css/tpl1_slave.css must specify 1011px x 638px');

const tpl2Css = fs.readFileSync('css/tpl2_bbc.css', 'utf8');
assert(tpl2Css.includes('width: 1011px;') && tpl2Css.includes('height: 638px;'), 'css/tpl2_bbc.css must specify 1011px x 638px');

const tpl4Css = fs.readFileSync('css/tpl4_bimbo.css', 'utf8');
assert(tpl4Css.includes('width: 1011px;') && tpl4Css.includes('height: 638px;'), 'css/tpl4_bimbo.css must specify 1011px x 638px');

const appJs = fs.readFileSync('js/app.js', 'utf8');
assert(appJs.includes("currentTemplate === 'slave') return [1011, 638]"), 'app.js getActiveCardDimensions must return [1011, 638] for slave');
assert(appJs.includes("currentTemplate === 'bbc') return [1011, 638]"), 'app.js getActiveCardDimensions must return [1011, 638] for bbc');
assert(appJs.includes("currentTemplate === 'bimbo') return [1011, 638]"), 'app.js getActiveCardDimensions must return [1011, 638] for bimbo');

console.log('✓ All 3 cards strictly standardized to 1011 × 638 px (85.6mm × 54.0mm @ 300 PPI) across HTML, CSS, and JS.');

// 10. Verify i18n internationalization engine & language parity
const vm = require('vm');
const i18nJs = fs.readFileSync('js/i18n.js', 'utf8');
const i18nCtx = {
    localStorage: {
        getItem: () => null,
        setItem: () => null
    },
    navigator: {
        languages: ['en'],
        language: 'en'
    },
    document: {
        documentElement: {},
        title: '',
        querySelectorAll: () => [],
        getElementById: () => null
    }
};
vm.createContext(i18nCtx);
vm.runInContext(i18nJs + '\nthis.SUPPORTED_LANGS = SUPPORTED_LANGS; this.DEFAULT_FALLBACK_LANG = DEFAULT_FALLBACK_LANG; this.I18N_DICTIONARY = I18N_DICTIONARY; this.detectUserLanguage = detectUserLanguage;', i18nCtx);

assert(Array.isArray(i18nCtx.SUPPORTED_LANGS) && i18nCtx.SUPPORTED_LANGS.length === 4, 'SUPPORTED_LANGS must contain 4 languages');
assert(i18nCtx.DEFAULT_FALLBACK_LANG === 'en', 'DEFAULT_FALLBACK_LANG must default to "en"');
['zh-CN', 'zh-TW', 'en', 'ja'].forEach(lang => {
    assert(i18nCtx.SUPPORTED_LANGS.includes(lang), `SUPPORTED_LANGS must include "${lang}"`);
    assert(i18nCtx.I18N_DICTIONARY[lang], `I18N_DICTIONARY must contain translations for "${lang}"`);
});

// Parity check across dictionaries
const baseKeys = Object.keys(i18nCtx.I18N_DICTIONARY['zh-CN']);
['zh-TW', 'en', 'ja'].forEach(lang => {
    const lKeys = Object.keys(i18nCtx.I18N_DICTIONARY[lang]);
    const missing = baseKeys.filter(k => !lKeys.includes(k));
    assert.strictEqual(missing.length, 0, `Language "${lang}" is missing keys: ${missing.join(', ')}`);
});

// HTML data-i18n completeness
const dataI18nMatches = [...html.matchAll(/data-i18n=["']([^"']+)["']/g)].map(m => m[1]);
for (const k of dataI18nMatches) {
    assert(baseKeys.includes(k), `data-i18n attribute "${k}" in index.html must exist in I18N_DICTIONARY`);
}

// Device detection & fallback tests
const detectionCases = [
    { langs: ['zh-CN', 'zh'], lang: 'zh-CN', expected: 'zh-CN' },
    { langs: ['zh-TW', 'zh-HK'], lang: 'zh-TW', expected: 'zh-TW' },
    { langs: ['zh-HK'], lang: 'zh-HK', expected: 'zh-TW' },
    { langs: ['zh-Hant-TW'], lang: 'zh-Hant-TW', expected: 'zh-TW' },
    { langs: ['ja-JP', 'ja'], lang: 'ja-JP', expected: 'ja' },
    { langs: ['en-US', 'en'], lang: 'en-US', expected: 'en' },
    { langs: ['fr-FR', 'fr'], lang: 'fr-FR', expected: 'en' },
    { langs: ['de-DE'], lang: 'de-DE', expected: 'en' },
    { langs: ['ko-KR'], lang: 'ko-KR', expected: 'en' },
    { langs: [], lang: '', expected: 'en' }
];

for (const tc of detectionCases) {
    i18nCtx.navigator.languages = tc.langs;
    i18nCtx.navigator.language = tc.lang;
    const detected = i18nCtx.detectUserLanguage();
    assert.strictEqual(detected, tc.expected, `detectUserLanguage for ${JSON.stringify(tc.langs)} must be "${tc.expected}", got "${detected}"`);
}
console.log(`✓ i18n system fully verified: 4 languages (${i18nCtx.SUPPORTED_LANGS.join(', ')}), 100% dictionary parity (${baseKeys.length} keys), and accurate auto-detection/fallback.`);

console.log('--- All Modular Web App verification checks passed successfully! ---');
