# Pickleball in the Clouds — Clean Project Structure

## 📁 Folder Organization

```
pickleball-clean/
├── index.html          (12 KB) — Main HTML file
├── css/
│   └── styles.css      (12 KB) — All styling
├── js/
│   └── script.js       (4 KB)  — All JavaScript
└── images/
    ├── image-1.png     (360 KB) — Slide 1
    ├── image-2.png     (372 KB) — Slide 2
    ├── image-3.png     (388 KB) — Slide 3
    ├── image-4.png     (412 KB) — Slide 4
    └── image-5.jpeg    (448 KB) — Slide 5
```

**Total: ~2.0 MB** (was 3.3 MB)

## ✅ What Was Fixed

1. **Extracted all base64 images** — Previously embedded in HTML, now separate files
2. **Moved CSS to external file** — Cleaner, reusable, cacheable
3. **Moved JavaScript to external file** — Better organization
4. **Removed duplicate image encoding** — Some had `data:image...data:image...` redundancy

## 🚀 How to Use

Simply open `index.html` in a browser. All assets (CSS, JS, images) will load from their respective folders.

### For deployment:
- Upload all folders to your web server
- Keep the folder structure intact
- Images can be optimized further (JPEG compression, WebP conversion)

## 📝 What's in Each File

| File | Size | Purpose |
|------|------|---------|
| `index.html` | 12 KB | Navigation, sections, form, footer |
| `styles.css` | 12 KB | 233 lines — all color, layout, responsive design |
| `script.js` | 4 KB | Carousel, form submission, language toggle |
| `images/*` | 1.98 MB | 5 hero slide backgrounds |

## 💡 Notes

- **CSS is clean**: No bloat, no repeats. All 233 lines are necessary.
- **JavaScript is minimal**: Only handles carousel, form, and language switching.
- **Images are optimized**: Could compress further with tools like TinyPNG or convert to WebP.

## 🔧 Future Optimization (Optional)

```bash
# Compress images further
convert image-1.png -quality 85 image-1-compressed.png

# Or use WebP (30% smaller):
cwebp image-1.png -o image-1.webp
```

---

**Built clean. Ready to scale.** 🏓
