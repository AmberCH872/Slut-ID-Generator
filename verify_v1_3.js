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
    console.log('--- Starting Headless Chrome v1.3 Verification ---');
    const chromePort = 9223;
    const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
        '--headless=new',
        `--remote-debugging-port=${chromePort}`,
        '--no-sandbox',
        '--disable-gpu',
        '--window-size=1600,1200',
        'http://localhost:8089/index.html'
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
        await send('Emulation.setDeviceMetricsOverride', { width: 1600, height: 1200, deviceScaleFactor: 1, mobile: false });

        console.log('Navigating to http://localhost:8089/index.html ...');
        await send('Page.navigate', { url: 'http://localhost:8089/index.html' });

        // Wait for page readyState to be complete
        for (let i = 0; i < 60; i++) {
            const ready = await evaluate("document.readyState === 'complete' && !!document.querySelector('header')");
            if (ready) break;
            await new Promise(r => setTimeout(r, 200));
        }

        // Evaluate helper
        async function evaluate(expression) {
            const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
            if (res.result && res.result.exceptionDetails) {
                throw new Error(`Eval failed: ${JSON.stringify(res.result.exceptionDetails)}`);
            }
            return res.result?.result?.value;
        }

        async function screenshot(filename) {
            const outDir = '/Users/orsonkrennic/proof_gen/test_screenshots';
            if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
            const filePath = `${outDir}/${filename}`;
            const res = await send('Page.captureScreenshot', {
                format: 'png',
                clip: { x: 0, y: 0, width: 1600, height: 1200, scale: 1 }
            });
            fs.writeFileSync(filePath, Buffer.from(res.result.data, 'base64'));
            console.log(`Saved screenshot: ${filePath} (${fs.statSync(filePath).size} bytes)`);
        }

        // Test 1: Check Version Badge
        const pageInfo = await evaluate("({ href: location.href, readyState: document.readyState, title: document.title, bodyLength: document.body ? document.body.innerHTML.length : 0 })");
        console.log('Page info:', pageInfo);

        const versionBadge = await evaluate("document.querySelector('header span.font-mono')?.textContent.trim() || document.querySelector('header')?.innerHTML.slice(0, 300)");
        console.log(`Header Version Badge: "${versionBadge}" (Expected: "v1.3")`);
        if (versionBadge !== 'v1.3') throw new Error(`Wrong version badge: ${versionBadge}`);

        // Test 2: Template 1 Verification
        console.log('\nTesting Template 1 (奴隶身份卡)...');
        await evaluate("switchTemplate('sc')");
        await new Promise(r => setTimeout(r, 200));

        const scWatermarkExists = await evaluate("!!document.querySelector('#sc-card-node .sc-watermark-layer')");
        console.log('Template 1 Watermark Layer present:', scWatermarkExists);
        if (!scWatermarkExists) throw new Error('Watermark layer missing in Template 1');

        // Test Avatar preset switching
        await evaluate("setScAvatarPreset('collar')");
        await new Promise(r => setTimeout(r, 100));
        const collarSrc = await evaluate("document.getElementById('sc-out-photo').src");
        console.log('Template 1 collar preset photo src:', collarSrc);
        if (!collarSrc.includes('avatar_collar_uniform')) throw new Error('Collar preset not applied');

        await evaluate("setScAvatarPreset('noir')");
        await new Promise(r => setTimeout(r, 100));
        const noirSrc = await evaluate("document.getElementById('sc-out-photo').src");
        console.log('Template 1 noir preset photo src:', noirSrc);
        if (!noirSrc.includes('avatar_censored_noir')) throw new Error('Noir preset not applied');

        await screenshot('test_tpl1_noir.png');

        // Test 3: Template 2 Verification
        console.log('\nTesting Template 2 (媚黑身份证)...');
        await evaluate("switchTemplate('bbc')");
        await new Promise(r => setTimeout(r, 200));

        const bbcAssets = await evaluate(`({
            crest: document.querySelector('#bbc-card-node img[alt="Spade Crest"]')?.src,
            stamp: document.querySelector('#bbc-card-node img[alt="Stamp"]')?.src,
            barcode: document.querySelector('#bbc-card-node img[alt="Barcode"]')?.src,
            photo: document.getElementById('bbc-out-photo')?.src
        })`);
        console.log('Template 2 assets:', bbcAssets);
        if (!bbcAssets.crest.includes('crest_gold.svg')) throw new Error('Crest gold SVG not loaded in Template 2');
        if (!bbcAssets.stamp.includes('stamp.svg')) throw new Error('Stamp SVG not loaded in Template 2');
        if (!bbcAssets.barcode.includes('barcode.svg')) throw new Error('Barcode SVG not loaded in Template 2');

        // Test bbc preset avatar
        await evaluate("setBbcAvatarPreset('collar')");
        await new Promise(r => setTimeout(r, 100));
        const bbcCollarSrc = await evaluate("document.getElementById('bbc-out-photo').src");
        console.log('Template 2 collar preset applied:', bbcCollarSrc.includes('avatar_collar_uniform'));

        await screenshot('test_tpl2_gold.png');

        // Test 4: Template 3 Verification
        console.log('\nTesting Template 3 (登记证书协议)...');
        await evaluate("switchTemplate('cert')");
        await new Promise(r => setTimeout(r, 200));

        const certSealStar = await evaluate("!!document.getElementById('cert-stamp-star')");
        console.log('Template 3 Faceted Seal Star present:', certSealStar);
        if (!certSealStar) throw new Error('Faceted Star missing in Template 3 seal');

        // Test cert preset avatar
        await evaluate("setCertAvatarPreset('collar')");
        await new Promise(r => setTimeout(r, 100));
        const certCollarSrc = await evaluate("document.getElementById('cert-out-photo').src");
        console.log('Template 3 collar preset applied:', certCollarSrc.includes('avatar_collar_uniform'));

        await screenshot('test_tpl3_parchment.png');

        // Test 5: Template 4 Verification
        console.log('\nTesting Template 4 (极清双面卡)...');
        await evaluate("switchTemplate('bimbo')");
        await new Promise(r => setTimeout(r, 200));

        // Test bimbo fallen preset
        await evaluate("setBimboPhotoPreset('fallen')");
        await new Promise(r => setTimeout(r, 100));
        const bimboFallenAssets = await evaluate(`({
            photo: document.getElementById('bimbo-out-photo')?.src,
            exhA: document.getElementById('bimbo-out-exh-a')?.src,
            exhB: document.getElementById('bimbo-out-exh-b')?.src,
            titleA: document.getElementById('bimbo-in-exh-a-title')?.value,
            titleB: document.getElementById('bimbo-in-exh-b-title')?.value
        })`);
        console.log('Template 4 fallen preset assets:', bimboFallenAssets);
        if (!bimboFallenAssets.photo.includes('photo_fallen.png')) throw new Error('Photo fallen not applied');
        if (!bimboFallenAssets.exhA.includes('exh_a_macro.png')) throw new Error('EXH A macro not applied');
        if (!bimboFallenAssets.exhB.includes('exh_b_macro.png')) throw new Error('EXH B macro not applied');

        await screenshot('test_tpl4_fallen_front.png');

        // Test 3D Flip
        console.log('Testing 3D Flip to back face...');
        await evaluate("switchBimboSide('back')");
        await new Promise(r => setTimeout(r, 700)); // wait for 3D flip animation
        await screenshot('test_tpl4_fallen_back.png');

        console.log('\n--- ALL HEADLESS CDP VERIFICATIONS PASSED SUCCESSFULLY! ---');
    } finally {
        chrome.kill();
    }
}

run().catch(err => {
    console.error('VERIFICATION ERROR:', err);
    process.exit(1);
});
