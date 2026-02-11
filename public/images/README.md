# Images Directory

This directory contains all static images for the e-commerce site.

## Folder Structure

- **`hero/`** - Hero section images
  - `phone.png` - Main hero phone image (transparent background, 9:16 aspect ratio)

- **`products/`** - Product images
  - Place product images here when ready
  - Format: Use descriptive filenames (e.g., `xiaomi-13-pro-black.jpg`)

- **`placeholders/`** - Placeholder images
  - Temporary images for development

## Image Guidelines

### Hero Phone Image
- **Location**: `hero/phone.png`
- **Format**: PNG with transparent background
- **Aspect Ratio**: 9:16 (portrait)
- **Recommended Size**: 800-1200px width
- **Purpose**: Main hero section animation

### Product Images
- **Format**: JPG or PNG
- **Aspect Ratio**: 1:1 (square) recommended
- **Recommended Size**: 800x800px minimum
- **Naming**: Use product slug or SKU in filename

## Notes

- All images in `/public` are served statically by Next.js
- Use Next.js `Image` component for optimization
- Images are referenced as `/images/...` in code
