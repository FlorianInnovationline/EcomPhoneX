# PWA & app icons (Android / iOS)

Add these files so “Add to Home Screen” and install prompts work with your own icon:

- **icon-192.png** – 192×192 px (Android home screen, Chrome)
- **icon-512.png** – 512×512 px (Android splash, high-DPI)

Use your logo or brand mark; keep important content within the central 80% for maskable icons.

**Generate from a logo or image:**
- [RealFaviconGenerator](https://realfavicongenerator.net/) – upload an image, get all sizes
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) – generates maskable icons
- Or use `app/icon.svg` as a base and export 192×192 and 512×512 from your design tool

Until these files exist, the app still works; the browser may use a default icon when installing.
