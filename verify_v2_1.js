const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function getWsUrl(port) {
    for (let i = 0; i < 30; i++) {
        try {
            const list = await new Promise((resolve, reject) => {
                http.get(`http://127.0.0.1:${port}/json`, res => {
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => resolve(JSON.parse(data)));
                }).on('error', reject);
            });
            const target = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
            if (target) {
                return target.webSocketDebuggerUrl;
            }
        } catch (e) {}
        await new Promise(r => setTimeout(r, 200));
    }
    throw new Error('Could not connect to Chrome debugger endpoint');
}

async function run() {
    console.log('=== Starting Chrome Headless v2.1 Verification Suite ===');
    const chromePort = 9224;
    const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
        '--headless=new',
        `--remote-debugging-port=${chromePort}`,
        '--no-sandbox',
        '--disable-gpu',
        '--window-size=1600,1000',
        'http://localhost:8088/index.html'
    ]);

    try {
        const wsUrl = await getWsUrl(chromePort);
        console.log('Connected to Chrome WebSocket CDP:', wsUrl);
        const ws = new WebSocket(wsUrl);

        let id = 1;
        const pending = new Map();
        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id && pending.has(msg.id)) {
                pending.get(msg.id)(msg);
                pending.delete(msg.id);
            }
        };

        function send(method, params = {}) {
            return new Promise((resolve) => {
                const reqId = id++;
                pending.set(reqId, resolve);
                ws.send(JSON.stringify({ id: reqId, method, params }));
            });
        }

        await new Promise(r => ws.onopen = r);
        await send('Page.enable');
        await send('Runtime.enable');
        await send('Emulation.setDeviceMetricsOverride', { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false });

        console.log('Navigating to http://localhost:8088/index.html ...');
        await send('Page.navigate', { url: 'http://localhost:8088/index.html' });

        for (let i = 0; i < 60; i++) {
            const ready = await evaluate("document.readyState === 'complete' && !!document.querySelector('header')");
            if (ready) break;
            await new Promise(r => setTimeout(r, 200));
        }

        async function evaluate(expression) {
            const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
            if (res.result && res.result.exceptionDetails) {
                throw new Error(`Eval failed: ${JSON.stringify(res.result.exceptionDetails)}`);
            }
            return res.result?.result?.value;
        }

        async function screenshot(filename, width = 1600, height = 1000) {
            const outDir = '/Users/orsonkrennic/proof_gen/test_screenshots';
            if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
            const filePath = `${outDir}/${filename}`;
            const res = await send('Page.captureScreenshot', {
                format: 'png',
                clip: { x: 0, y: 0, width, height, scale: 1 }
            });
            fs.writeFileSync(filePath, Buffer.from(res.result.data, 'base64'));
            console.log(`Saved screenshot: ${filePath} (${fs.statSync(filePath).size} bytes)`);
        }

        // Test 1: Check Version Badge
        console.log('\n--- 1. Testing Version Badges ---');
        const headerBadge = await evaluate("document.querySelector('header span.font-mono.font-bold')?.textContent.trim()");
        console.log(`Header Version Badge: "${headerBadge}" (Expected: "v2.1")`);
        if (headerBadge !== 'v2.1') throw new Error(`Wrong header version badge: ${headerBadge}`);

        const footerText = await evaluate("document.querySelector('aside .border-t strong.text-amber-400')?.textContent.trim()");
        console.log(`Footer Version Badge: "${footerText}" (Expected: "v2.1")`);
        if (footerText !== 'v2.1') throw new Error(`Wrong footer version text: ${footerText}`);

        // Switch language to zh-CN for testing
        await evaluate("changeLanguage('zh-CN')");
        await new Promise(r => setTimeout(r, 100));

        // Test 2: Privacy Banner and Censorship Studio on Desktop
        console.log('\n--- 2. Testing Privacy Banner & Censorship Studio ---');
        const privacyBanner = await evaluate("document.querySelector('#tpl1-editor [data-i18n=\"sec_privacy_title\"]')?.textContent.trim()");
        console.log('Privacy Banner Title:', privacyBanner);
        if (!privacyBanner || !privacyBanner.includes('100% 纯本地离线处理')) throw new Error('Privacy banner missing');

        // Test Sticker Styles
        console.log('Testing Heart sticker...');
        await evaluate("setCensorStyle('sc', 'heart')");
        await new Promise(r => setTimeout(r, 100));
        let stickerClass = await evaluate("document.getElementById('sc-out-sticker').className");
        if (!stickerClass.includes('censor-style-heart')) throw new Error('Heart style not applied');

        console.log('Testing Barcode sticker...');
        await evaluate("setCensorStyle('sc', 'barcode')");
        await new Promise(r => setTimeout(r, 100));
        stickerClass = await evaluate("document.getElementById('sc-out-sticker').className");
        if (!stickerClass.includes('censor-style-barcode')) throw new Error('Barcode style not applied');

        console.log('Testing Mosaic Blur sticker...');
        await evaluate("setCensorStyle('sc', 'mosaic')");
        await new Promise(r => setTimeout(r, 100));
        stickerClass = await evaluate("document.getElementById('sc-out-sticker').className");
        if (!stickerClass.includes('censor-style-mosaic')) throw new Error('Mosaic style not applied');

        console.log('Testing Classic Black Bar sticker...');
        await evaluate("setCensorStyle('sc', 'bar')");
        await new Promise(r => setTimeout(r, 100));
        stickerClass = await evaluate("document.getElementById('sc-out-sticker').className");
        if (!stickerClass.includes('censor-style-bar')) throw new Error('Bar style not applied');

        // Save Desktop Screenshot
        await screenshot('v2_1_desktop_main.png', 1600, 1000);

        // Test 3: Mobile Viewport (390 x 844) & PiP Live Preview
        console.log('\n--- 3. Testing Mobile Viewport & PiP Floating Window ---');
        await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
        await evaluate("setMobileMode('edit')");
        await new Promise(r => setTimeout(r, 200));

        const pipVisible = await evaluate("(() => { const el = document.getElementById('canvas-area-wrapper'); const s = window.getComputedStyle(el); return s.display !== 'none' && s.position === 'fixed'; })()");
        console.log('Mobile PiP window position fixed & visible:', pipVisible);
        if (!pipVisible) throw new Error('Mobile PiP window not fixed/visible in edit mode');

        const pipBarVisible = await evaluate("(() => { const el = document.getElementById('pip-controls-bar'); const s = window.getComputedStyle(el); return s.display !== 'none'; })()");
        console.log('Mobile PiP controls bar visible:', pipBarVisible);
        if (!pipBarVisible) throw new Error('Mobile PiP controls bar not visible in edit mode');

        // Check expanded state: NO title, only icon buttons
        const titleVisibleInExpanded = await evaluate("(() => { const el = document.getElementById('pip-title-badge'); return window.getComputedStyle(el).display !== 'none'; })()");
        console.log('PiP title badge visible in expanded mode (should be false):', titleVisibleInExpanded);
        if (titleVisibleInExpanded) throw new Error('PiP title badge should be hidden in expanded mode');

        const btnExpandIcon = await evaluate("document.getElementById('pip-btn-expand')?.innerText.trim()");
        console.log('PiP expand button content (should only be icon):', btnExpandIcon);
        if (btnExpandIcon !== '🔍') throw new Error(`Expected expand button to only be icon '🔍', got '${btnExpandIcon}'`);

        // Verify corner positions: Expand at bottom-left, Collapse at bottom-right
        const buttonPositions = await evaluate("(() => { const exp = document.getElementById('pip-btn-expand').getBoundingClientRect(); const col = document.getElementById('pip-btn-collapse').getBoundingClientRect(); const wrap = document.getElementById('canvas-area-wrapper').getBoundingClientRect(); return { expLeft: Math.round(exp.left - wrap.left), expBottom: Math.round(wrap.bottom - exp.bottom), colRight: Math.round(wrap.right - col.right), colBottom: Math.round(wrap.bottom - col.bottom), wrapW: wrap.width, wrapH: wrap.height }; })()");
        console.log('Floating button corner coordinates relative to PiP window:', buttonPositions);
        if (buttonPositions.expLeft > 25 || buttonPositions.expBottom > 25 || buttonPositions.colRight > 25 || buttonPositions.colBottom > 25) {
            throw new Error(`Buttons not at bottom-left/bottom-right corners: ${JSON.stringify(buttonPositions)}`);
        }

        // Verify preview card fills the window (matching clientWidth/clientHeight within the 1.5px border)
        const fillCheck = await evaluate("(() => { const box = document.getElementById('scaler-outer-box').getBoundingClientRect(); const main = document.getElementById('canvas-main'); return { boxW: Math.round(box.width), mainW: Math.round(main.clientWidth), boxH: Math.round(box.height), mainH: Math.round(main.clientHeight) }; })()");
        console.log('Preview card size vs PiP inner canvas size:', fillCheck);
        if (Math.abs(fillCheck.boxW - fillCheck.mainW) > 2 || Math.abs(fillCheck.boxH - fillCheck.mainH) > 2) {
            throw new Error(`Preview card does not fill PiP window: ${JSON.stringify(fillCheck)}`);
        }

        await screenshot('v2_1_mobile_edit_pip.png', 390, 844);

        // Test PiP Collapse
        console.log('Testing PiP minimize/collapse...');
        await evaluate("togglePipCollapse(true)");
        await new Promise(r => setTimeout(r, 150));
        const isCollapsed = await evaluate("document.body.classList.contains('pip-collapsed')");
        console.log('PiP collapsed class applied:', isCollapsed);
        if (!isCollapsed) throw new Error('PiP collapse failed');

        // Check collapsed capsule state: Title should be visible and say '实时预览'
        const titleVisibleInCollapsed = await evaluate("(() => { const el = document.getElementById('pip-title-badge'); return window.getComputedStyle(el).display !== 'none'; })()");
        const titleTextInCollapsed = await evaluate("document.getElementById('pip-title-badge')?.innerText.trim()");
        console.log('PiP title in collapsed capsule:', titleTextInCollapsed, 'visible:', titleVisibleInCollapsed);
        if (!titleVisibleInCollapsed || !titleTextInCollapsed.includes('实时预览')) {
            throw new Error(`Expected capsule title to show '实时预览', got: ${titleTextInCollapsed}`);
        }

        await screenshot('v2_1_mobile_pip_collapsed.png', 390, 844);

        await evaluate("togglePipCollapse(false)");
        await new Promise(r => setTimeout(r, 150));

        // Test Character Overflow Warning
        console.log('\n--- 4. Testing Character Limit & Overflow Warning ---');
        await evaluate("(() => { const input = document.getElementById('sc-in-name'); input.value = '超长测试姓名字符超出安全上限'; input.dispatchEvent(new Event('input', { bubbles: true })); })()");
        await new Promise(r => setTimeout(r, 100));
        const badgeText = await evaluate("document.getElementById('sc-in-name-overflow-badge')?.innerText");
        console.log('Overflow badge text:', badgeText);
        if (!badgeText || !badgeText.includes('/14')) throw new Error('Overflow badge not showing correct length');

        // Test Mobile Full Preview Mode
        console.log('\n--- 5. Testing Mobile Full Preview Mode ---');
        await evaluate("setMobileMode('preview')");
        await new Promise(r => setTimeout(r, 250));

        const asideHidden = await evaluate("(() => { const el = document.getElementById('editor-aside'); return window.getComputedStyle(el).display === 'none'; })()");
        console.log('Editor aside hidden in preview mode:', asideHidden);
        if (!asideHidden) throw new Error('Editor aside not hidden in preview mode');

        const canvasFullScreen = await evaluate("(() => { const el = document.getElementById('canvas-area-wrapper'); const s = window.getComputedStyle(el); return s.display === 'flex' && s.position === 'static'; })()");
        console.log('Canvas wrapper full screen static in preview mode:', canvasFullScreen);
        if (!canvasFullScreen) throw new Error('Canvas not full screen in preview mode');

        await screenshot('v2_1_mobile_full_preview.png', 390, 844);

        // Test Template 4 and 5 Censorship & 3D Flips
        console.log('\n--- 6. Testing Template 4 & 5 Censorship & Touch Gestures ---');
        await evaluate("switchTemplate('bimbo')");
        await new Promise(r => setTimeout(r, 200));
        const bimboSticker = await evaluate("!!document.getElementById('bimbo-out-sticker')");
        const bimboTouchGrid = await evaluate("!!document.getElementById('bimbo-touch-grid')");
        console.log('Template 4 sticker container:', bimboSticker, 'touch grid:', bimboTouchGrid);
        if (!bimboSticker || !bimboTouchGrid) throw new Error('Template 4 sticker/touch grid missing');

        await evaluate("switchTemplate('postcard')");
        await new Promise(r => setTimeout(r, 200));
        const postcardSticker = await evaluate("!!document.getElementById('postcard-out-sticker')");
        const postcardTouchGrid = await evaluate("!!document.getElementById('postcard-touch-grid')");
        console.log('Template 5 sticker container:', postcardSticker, 'touch grid:', postcardTouchGrid);
        if (!postcardSticker || !postcardTouchGrid) throw new Error('Template 5 sticker/touch grid missing');

        console.log('\n=== ALL v2.1 AUTOMATED VERIFICATION CHECKS PASSED PERFECTLY! ===\n');

    } finally {
        chrome.kill();
    }
}

run().catch(err => {
    console.error('Verification error:', err);
    process.exit(1);
});
