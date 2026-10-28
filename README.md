# Arya Patole — Creative Portfolio

## Open locally
Open `index.html` in Chrome or another modern browser. No build tools required. For local development you can also run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Deploy
Upload all files and the `assets/` directory to a GitHub repository and import the repository into Vercel as a static site. No build command is needed.

## Customize
- `index.html`: text, project names/descriptions, navigation, and contact details.
- `style.css`: color palette, layouts, animation styling.
- `script.js`: interactive cursor, tilt cards, HUD particle reveal.
- `assets/arya-portrait.jpg`: replace with a high-quality portrait of Arya.
- `assets/neoclassical-reference.jpg` and `assets/scrapbook-reference.jpg`: supplied mood-board references, clearly labeled as inspiration.

**Important:** The hero is a cinematic 2.5D portrait effect (photo + parallax-ready scene + particle assembly), **not** a reconstructed photorealistic 3D human mesh. A genuine rotatable 3D likeness requires a separately modeled/scanned and approved `.glb` or `.gltf` character asset, ideally made using multi-view photos or a 3D scan. The current design avoids inventing facial geometry from a single photo.

**Before publishing:** Replace `hello@example.com` in the contact button with your real contact email. Add genuine project case study URLs and original screenshots when available. Project cards currently open informative previews rather than claiming completed case studies.

All interaction code is vanilla JavaScript; fonts load from Google Fonts when online. Reduced-motion preferences are respected.

## NEW: Interactive 3D hero scene
Click **EXPLORE 3D** in the hero to view the WebGL character, rotate by dragging, or switch back to Arya's actual portrait. The 3D scene contains neon blue/green assembling cubes, a glowing machine platform, cinematic lighting and animated character entrance.

**Critical likeness limitation:** `models/arya_patole_3d.glb` is a deliberately simplified **placeholder mannequin** made from 3D geometry. It is **not** a realistic 3D reconstruction of Arya Patole, and should be replaced with a professionally scanned or modeled, approved likeness GLB. The original real portrait is still included in the photo view.

3D modules: `scene.js`, `character-animation.js`, `particle-system.js`, `hud-platform.js`. Three.js is loaded from a CDN and needs internet access.

**Run using a local web server**, not `file://`, because browsers restrict loading ES modules and GLB files from disk. In the extracted folder run `python -m http.server 8000` and open `http://localhost:8000`. Static deployment on Vercel also works.

## UPDATED — Multi-angle character references
The `references/` folder now includes the supplied 360-degree head sheets and the editorial skin-texture PDF. Read `CHARACTER_MODEL_SPEC.md` for exact character production requirements. **The `.glb` has NOT been upgraded to a photorealistic likeness**; it remains the previous mannequin until a genuine model is created externally and placed at `models/arya_patole_3d.glb`.
