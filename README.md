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
  <img src="https://img.shields.io/badge/Version-v2.1-blueviolet.svg?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/Resolution-300_PPI_(1011×638)-red.svg?style=flat-square" alt="Resolution" />
  <img src="https://img.shields.io/badge/Privacy-100%25_Client--Side-brightgreen.svg?style=flat-square" alt="Privacy" />
  <img src="https://img.shields.io/badge/i18n-zh--CN_|_zh--TW_|_en_|_ja-blue.svg?style=flat-square" alt="i18n" />
  <img src="https://img.shields.io/badge/Architecture-Modular_HTML5_%2B_ES6-orange.svg?style=flat-square" alt="Architecture" />
</p>

---

## 📖 Overview

**High-Fidelity Identity & Submission Certificate Workshop** is a lightweight, responsive web application for creating and rendering stylized identification cards, submission contracts, certificates, and intimate erotic postcards. 

Built with pure vanilla web technologies (HTML5, TailwindCSS, ES6 modules), it requires **zero backend servers**, guarantees **100% client-side privacy**, and renders physical print-standard assets at **300 PPI (1011 × 638 px for CR80 cards and postcards, 850 × 1200 px for A4 certificates)**.

---

## ✨ Key Features

- **🔒 100% Client-Side Privacy & Offline Capability**:
  All uploaded photos, form inputs, and exported graphics are processed strictly within the browser memory via the HTML5 Canvas API and local JSZip engine. Zero images or personal data are ever uploaded to any external server.
- **💎 300 PPI Ultra-HD Physical Print Standard**:
  Standardized to real-world ID card and postcard dimensions (**85.6 mm × 54.0 mm** @ 300 PPI = **1011 × 638 px**), supporting 1X, 2X, and 3X ultra-high definition export.
- **🌐 Full i18n Internationalization**:
  Supports **English**, **Simplified Chinese**, **Traditional Chinese**, and **Japanese**. Automatically detects device language from `navigator.languages` with automatic fallback to English for non-listed locales.
- **🎨 5 Unique Preset Templates**:
  - **Template 1: Slave Identity Card (奴隶身份卡)**: Grid texture background, holographic authorization sticker, ID badges, and submission vows.
  - **Template 2: Spade Resident Card (身份证)**: Deep purple wave banner, 5-star gold crest, 18 customizable obedience checkboxes, "YES MASTER" badge, and barcode.
  - **Template 3: Submission Certificate (登记证书协议)**: Vintage parchment texture, dual decorative borders, rotatable official red seal, dynamic vector QR code, and formal clause list.
  - **Template 4: Double-Sided Bimbo ID Card (极清双面识别卡)**: Double-sided layout with front subject profile (measurements, traits, signature) and back conduct rules (11 guidelines, Exhibit A/B photo slots, custom QR code, batch & merged long-image export).
  - **Template 5: Kinky Postcard (母畜明信片 / Kinky Postcard System) (v2.0)**: Dual-sided vintage erotic postcard layout. The front features full-bleed poster portraits, Polaroid border, or postal frame styles with noir/sepia/cyber film filters and gilded ribbons. The back features an authentic French `CARTE POSTALE` cardstock design with 6-digit postcode box grid, split-column layout, handwritten calligraphy message connected to the Inspiration Library, 6 vector erotic postal stamps (with custom image upload support), wavy cancellation lines, dynamic date postmark, ruled recipient/sender address fields, and dual-side ZIP archive export.
- **💌 Comprehensive Postcard Dispatch System (v2.0)**:
  Fully aligned with and expanding upon classic erotic e-card aesthetics (`bennadel/Kinky-eCards`). Features custom postmark dates, 6 precision vector stamps (wax heart, leather paddle, cuffs, collar, kiss, devil), kiss/paw/wax decorative signature seals, and 100% client-side ZIP packaging containing separate front/back PNGs and dispatch manifest.
- **🔄 Pure CSS 3D Dual-Sided Flip Animation (v1.1 & v2.0)**:
  Both Template 4 and Template 5 feature fluid, hardware-accelerated 3D flip card interaction using pure CSS transforms (`preserve-3d`, `backface-visibility: hidden`), allowing intuitive inspection of both front and back card faces without page lag.
- **💡 Modular Dedication & Vow Inspiration Library (v1.2 & v2.0)**:
  Integrated modal inspiration catalog organized across 4 distinct thematic scenarios (🐶 Loyal Pet, 💧 Extreme Toy, 👠 Officer Fall, ⚖️ Discipline Rules) in 4 languages. Instantly inserts or appends curated oaths, quotes, and intimate dedications into card and postcard fields with a single click.
- **🏷️ Archival Wave Postmark & 3D Embossed Notary Seal System (v1.2)**:
  Vector SVG overlay engine for all card templates. Features authentic Archival Cancellation Waves (4 distressed wavy lines + circular date/authority seal) and 3D Embossed Notary Seals (36-point scalloped starburst with relief lighting filters). Supports preset anchor positions, custom pan/tilt/rotation, adjustable opacity, and 4 vintage ink tones.
- **🖼️ Remastered Visual Assets & Preset Photo Libraries (v1.3)**:
  Complete visual overhaul for all templates: Template 1 upgraded with high-density millimeter coordinate grid and classified watermark overlay; Template 2 completely rebuilt with a 24K crystal gold vector Queen of Spades crest (`crest_gold.svg`), zero-halo vector stamps, and vector barcodes; Template 3 infused with authentic European vintage parchment texture (`parchment_texture.svg`) and a remastered guilloche security seal with 3D faceted star; Template 4 equipped with macro forensic exhibit assets. All templates feature one-click built-in HD avatar/exhibit preset switchers.
- **🎲 Multi-Language Creative Persona Bank**:
  Preset personas for each template across all 4 languages. Roll the dice (🎲) to load creative presets without overwriting existing photos.
- **💾 Automatic Draft Autosave & Restore**:
  Integrated debounced `localStorage` autosave engine to ensure form edits are seamlessly restored upon refreshing or returning.
- **📱 Mobile PiP Live Preview & Adaptive Input Engine (v2.1)**:
  On mobile devices in Edit mode, a floating Picture-in-Picture (PiP) mini card preview hovers smoothly in the bottom-right corner with zero-latency live visual sync as you type. Features single-tap expansion into full preview, one-tap flip for double-sided templates, and collapse into a sleek translucent pill. Intelligently dims and avoids obstruction when the on-screen virtual keyboard appears. Equipped with a **Character Limit & Overflow Warning Engine** that alerts users in real-time when inputs approach or exceed safe card layout thresholds.
- **🛡️ Zero-Leakage Privacy Banner & Universal Censorship Studio (v2.1)**:
  Every template's photo section features a reassuring `🛡️ 100% Client-Side Offline Processing · Physical Zero-Upload Guarantee` banner, eliminating user hesitation when importing private images. Features a **Rule-of-Thirds 9-Grid Overlay** with touch gesture panning and pinch-to-zoom for precise framing. The unified **Censorship & Privacy Studio** provides 5 censorship styles (Confidential Bar, Succubus Heart, Forensic Barcode, Gaussian Mosaic, and None) with customizable slogan text, horizontal/vertical pan offsets, and tilt rotation sliders.
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
│   ├── tpl4_bimbo.css      # Template 4 styles (Glassmorphism & 3D flip)
│   └── tpl5_postcard.css   # Template 5 styles (Postal paper, stamps & 3D flip)
├── js/
│   ├── default_assets.js   # Fallback assets & base64 default images
│   ├── export.js           # html-to-image export, clipboard & batch downloader
│   ├── i18n.js             # Internationalization engine & 4-language dictionary
│   ├── inspiration.js      # Modular vow & dedication library modal controller
│   ├── jszip.min.js        # Offline pure client-side ZIP bundle packaging
│   ├── personas.js         # Creative persona banks & autosave engine
│   ├── postmark.js         # Archival wave postmark & 3D embossed seal engine
│   ├── tpl1_slave.js       # Template 1 logic
│   ├── tpl2_bbc.js         # Template 2 logic & checkbox matrix
│   ├── tpl3_cert.js        # Template 3 logic & seal renderer
│   ├── tpl4_bimbo.js       # Template 4 logic & double-sided 3D flip engine
│   ├── tpl5_postcard.js    # Template 5 logic (Postcard dispatch & stamps)
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
