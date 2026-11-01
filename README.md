# High-Fidelity Identity & Submission Certificate Workshop

<p align="center">
  <b>CR80 Standard (300 PPI) · Pure Client-Side Privacy · Multi-Template Generator</b>
</p>

<p align="center">
  <a href="README.md"><b>English</b></a> |
  <a href="README.zh-CN.md"><b>简体中文</b></a> |
  <a href="README.zh-TW.md"><b>繁體中文</b></a> |
  <a href="README.ja.md"><b>日本語</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Resolution-300_PPI_(1011×638)-red.svg?style=flat-square" alt="Resolution" />
  <img src="https://img.shields.io/badge/Privacy-100%25_Client--Side-brightgreen.svg?style=flat-square" alt="Privacy" />
  <img src="https://img.shields.io/badge/i18n-zh--CN_|_zh--TW_|_en_|_ja-blue.svg?style=flat-square" alt="i18n" />
  <img src="https://img.shields.io/badge/Architecture-Modular_HTML5_%2B_ES6-orange.svg?style=flat-square" alt="Architecture" />
</p>

---

## 📖 Overview

**High-Fidelity Identity & Submission Certificate Workshop** is a lightweight, responsive web application for creating and rendering stylized identification cards, submission contracts, and certificates. 

Built with pure vanilla web technologies (HTML5, TailwindCSS, ES6 modules), it requires **zero backend servers**, guarantees **100% client-side privacy**, and renders physical print-standard assets at **300 PPI (1011 × 638 px for CR80 cards, 850 × 1200 px for A4 certificates)**.

---

## ✨ Key Features

- **🔒 100% Client-Side Privacy & Offline Capability**:
  All uploaded photos, form inputs, and exported graphics are processed strictly within the browser memory via the HTML5 Canvas API. Zero images or personal data are ever uploaded to any external server.
- **💎 300 PPI Ultra-HD Physical Print Standard**:
  Standardized to real-world ID card dimensions (**85.6 mm × 54.0 mm** @ 300 PPI = **1011 × 638 px**), supporting both 1X standard and 2X ultra-high definition export.
- **🌐 Full i18n Internationalization**:
  Supports **English**, **Simplified Chinese**, **Traditional Chinese**, and **Japanese**. Automatically detects device language from `navigator.languages` with automatic fallback to English for non-listed locales.
- **🎨 4 Unique Preset Templates**:
  - **Template 1: Slave Identity Card (奴隶身份卡)**: Grid texture background, holographic authorization sticker, ID badges, and submission vows.
  - **Template 2: Spade Resident Card (身份证)**: Deep purple wave banner, 5-star gold crest, 18 customizable obedience checkboxes, "YES MASTER" badge, and barcode.
  - **Template 3: Submission Certificate (登记证书协议)**: Vintage parchment texture, dual decorative borders, rotatable official red seal, dynamic vector QR code, and formal clause list.
  - **Template 4: Double-Sided Bimbo ID Card (极清双面识别卡)**: Double-sided layout with front subject profile (measurements, traits, signature) and back conduct rules (11 guidelines, Exhibit A/B photo slots, custom QR code, batch & merged long-image export).
- **🎲 Multi-Language Creative Persona Bank**:
  Preset personas for each template across all 4 languages. Roll the dice (🎲) to load creative presets without overwriting existing photos.
- **💾 Automatic Draft Autosave & Restore**:
  Integrated debounced `localStorage` autosave engine to ensure form edits are seamlessly restored upon refreshing or returning.
- **📱 Responsive Mobile & Touch Viewport**:
  Segmented switch between form editing and full-screen card preview on mobile devices, with smooth touch zoom and panning.

---

## 🛠️ Tech Stack & Modular Architecture

```
proof_gen/
├── index.html              # Single Page Application entrypoint
├── css/
│   ├── base.css            # Common typography, scrollbars & grid textures
│   ├── tpl1_slave.css      # Template 1 styles (Grid & badges)
│   ├── tpl2_bbc.css        # Template 2 styles (Wave header & crests)
│   ├── tpl3_cert.css       # Template 3 styles (Parchment & seal transform)
│   └── tpl4_bimbo.css      # Template 4 styles (Glassmorphism & double-sided)
├── js/
│   ├── default_assets.js   # Fallback assets & base64 default images
│   ├── export.js           # html2canvas export, clipboard & batch downloader
│   ├── i18n.js             # Internationalization engine & 4-language dictionary
│   ├── personas.js         # Creative persona banks & autosave engine
│   ├── tpl1_slave.js       # Template 1 logic
│   ├── tpl2_bbc.js         # Template 2 logic & checkbox matrix
│   ├── tpl3_cert.js        # Template 3 logic & seal renderer
│   ├── tpl4_bimbo.js       # Template 4 logic & double-sided engine
│   └── app.js              # Viewport controller, touch gestures & routing
├── assets/                 # SVGs, stamps, barcodes & default photos
└── test_suite.js           # 10-step automated verification suite
```

---

## 🚀 Getting Started

### 1. Direct Browser Usage
Because the project uses purely static client-side technologies, you can directly clone and run it with any local static file server:

```bash
# Clone the repository
git clone https://github.com/amberch872/Slut-ID-Generator.git
cd Slut-ID-Generator

# Start a local static server
python3 -m http.server 8080
```

Open `http://localhost:8080` in your web browser.

### 2. Running Verification Suite
Run the comprehensive verification script to validate HTML unique IDs, inline event handlers, resolution standards, and i18n dictionary parity:

```bash
node test_suite.js
```

---

## 📄 Privacy & Disclaimer

1. **Local Execution**: All user-provided images and text strings are processed locally in the user's browser. No data is stored, tracked, or transmitted to any server.
2. **Entertainment Purpose**: This tool is designed for creative, fictional roleplay, and personal entertainment purposes only. It cannot and must not be used to produce fraudulent or official government identification.

---

## ⚖️ License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
