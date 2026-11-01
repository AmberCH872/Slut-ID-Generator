/**
 * Export and Utility Engine
 */

/**
 * Google Analytics 4 (GA4) Tracking Helpers
 */
function trackEvent(eventName, params = {}) {
    try {
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, params);
        }
    } catch (e) {
        console.warn('[GA4] Event tracking failed:', e);
    }
}

function trackPageView(pagePath, pageTitle) {
    try {
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'page_view', {
                page_path: pagePath,
                page_title: pageTitle,
                page_location: window.location.origin + window.location.pathname + (pagePath.startsWith('/') ? pagePath.slice(1) : pagePath)
            });
        }
    } catch (e) {
        console.warn('[GA4] Pageview tracking failed:', e);
    }
}

function trackDownload(templateId, templateName, buttonName, filename, scaleRatio, side = null) {
    const params = {
        template_id: templateId,
        template_name: templateName,
        button_name: buttonName,
        file_name: filename,
        file_extension: 'png',
        scale: scaleRatio
    };
    if (side) params.card_side = side;

    // 1. GA4 推荐的标准文件下载事件 (file_download)
    trackEvent('file_download', params);
    // 2. 自定义卡片导出专属事件 (card_export)
    trackEvent('card_export', params);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function handleImageUpload(event, targetImgId, callback) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const el = document.getElementById(targetImgId);
        if (el) el.src = e.target.result;
        if (typeof callback === 'function') callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

function updatePhotoTransform(pfx) {
    const zoom = parseFloat(document.getElementById(`${pfx}-in-zoom`)?.value || '1');
    const panX = parseInt(document.getElementById(`${pfx}-in-pan-x`)?.value || '0', 10);
    const panY = parseInt(document.getElementById(`${pfx}-in-pan-y`)?.value || '0', 10);
    const rot = parseInt(document.getElementById(`${pfx}-in-rot`)?.value || '0', 10);

    const elZoom = document.getElementById(`${pfx}-val-zoom`);
    const elPanX = document.getElementById(`${pfx}-val-pan-x`);
    const elPanY = document.getElementById(`${pfx}-val-pan-y`);
    const elRot = document.getElementById(`${pfx}-val-rot`);

    if (elZoom) elZoom.innerText = `${zoom.toFixed(2)}x`;
    if (elPanX) elPanX.innerText = `${panX}px`;
    if (elPanY) elPanY.innerText = `${panY}px`;
    if (elRot) elRot.innerText = `${rot}°`;

    const img = document.getElementById(`${pfx}-out-photo`);
    if (img) {
        img.style.transform = `scale(${zoom}) translate(${panX}px, ${panY}px) rotate(${rot}deg)`;
    }
}

async function triggerExport(node, defaultFilename, scaleRatio, bgColor, originalWidth, originalHeight, templateContext = {}) {
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');

    if (overlay) overlay.classList.remove('hidden');
    if (loadingText) loadingText.innerText = `正在极速渲染 ${Math.round(originalWidth * scaleRatio)}px 极清画质...`;

    try {
        if (typeof htmlToImage === 'undefined') {
            throw new Error('渲染核心库尚未就绪，请检查网络连接');
        }
        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }

        const dataUrl = await htmlToImage.toPng(node, {
            pixelRatio: scaleRatio,
            backgroundColor: bgColor,
            skipFonts: true,
            cacheBust: false,
            width: originalWidth,
            height: originalHeight,
            style: { transform: 'none', position: 'static', margin: '0', left: '0', top: '0' }
        });

        // 1. 直接触发浏览器下载
        const link = document.createElement('a');
        link.download = defaultFilename;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 2. 弹出移动端友好的保存浮层
        openExportModal(dataUrl, defaultFilename, templateContext);
    } catch (err) {
        console.error('导出失败:', err);
        alert('导出卡片提示: ' + (err.message || '渲染失败，建议尝试截图保存'));
    } finally {
        if (overlay) overlay.classList.add('hidden');
    }
}

function openExportModal(dataUrl, filename, templateContext = {}) {
    const modal = document.getElementById('export-modal');
    const previewImg = document.getElementById('modal-preview-img');
    const downloadBtn = document.getElementById('modal-download-btn');
    const bimboTip = document.getElementById('modal-bimbo-tip');

    if (previewImg) previewImg.src = dataUrl;
    if (downloadBtn) {
        downloadBtn.href = dataUrl;
        downloadBtn.download = filename;
        downloadBtn.onclick = () => {
            trackEvent('modal_download_click', {
                file_name: filename,
                button_name: '弹窗立即下载原图'
            });
        };
    }

    if (bimboTip) {
        const isBimboFront = (templateContext.template === 'bimbo' && templateContext.side === 'front');
        bimboTip.classList.toggle('hidden', !isBimboFront);
    }

    if (modal) modal.classList.remove('hidden');
}

function closeExportModal() {
    const modal = document.getElementById('export-modal');
    if (modal) modal.classList.add('hidden');
}

async function copyCardToClipboard(tpl) {
    trackEvent('card_copy_clipboard', {
        template_id: tpl || currentTemplate,
        button_name: '复制到剪贴板'
    });

    let node;
    if (tpl === 'bimbo' || currentTemplate === 'bimbo') {
        node = (bimboCurrentSide === 'front')
            ? document.getElementById('bimbo-front-node')
            : document.getElementById('bimbo-back-node');
    } else {
        node = getActiveCardNode();
    }
    const [w, h] = getActiveCardDimensions();
    let bg = '#ffffff';
    if (tpl === 'slave' || currentTemplate === 'slave') bg = scCurrentBgColor;
    else if (tpl === 'bimbo' || currentTemplate === 'bimbo') bg = '#1f132b';

    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');

    if (overlay) overlay.classList.remove('hidden');
    if (loadingText) loadingText.innerText = '正在生成并复制到剪贴板...';

    try {
        if (!navigator.clipboard?.write || !window.ClipboardItem) {
            throw new Error('当前手机环境不支持直接写入剪贴板图片，请使用【导出原图】按钮保存');
        }

        const blob = await htmlToImage.toBlob(node, {
            pixelRatio: 2,
            backgroundColor: bg,
            skipFonts: true,
            cacheBust: false,
            width: w,
            height: h,
            style: { transform: 'none', position: 'static', margin: '0', left: '0', top: '0' }
        });

        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        alert('已成功复制高清图片到剪贴板！可直接在聊天软件中粘贴发送。');
    } catch (err) {
        console.error(err);
        alert('复制提示: ' + (err.message || '无法写入剪贴板，请直接点击【导出原图】下载保存！'));
    } finally {
        if (overlay) overlay.classList.add('hidden');
    }
}

function quickExportActive() {
    const source = (window.innerWidth < 768) ? 'mobile_bottom_bar' : 'desktop_top_bar';
    trackEvent('quick_export', {
        template_id: currentTemplate,
        trigger_source: source,
        button_name: '快捷导出原图'
    });
    if (currentTemplate === 'slave') exportSc(1);
    else if (currentTemplate === 'bbc') exportBbc(1);
    else if (currentTemplate === 'bimbo') exportBimbo(bimboCurrentSide, 1);
    else exportCert(1);
}
