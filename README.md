# 🐕 The Gregory App

A fun, animated website dedicated to Gregory - the best dog ever!

## Features

- ✨ Beautiful animated design with floating paw prints
- 📸 Photo gallery section (link to Google Photos)
- 🎨 AI Avatar gallery section
- 🎬 Weekly highlights video section
- 🏆 Family photo leaderboard
- 📱 PWA support - add to home screen!
- 🐾 Fun easter eggs (click Gregory!)

## Quick Setup

### 1. Add Your Google Photos Album

1. Open your shared album in Google Photos
2. Click "Share" and copy the link
3. In `index.html`, find this line:
   ```html
   <a href="#" class="btn btn-primary" id="googlePhotosBtn">
   ```
4. Replace `#` with your album link

### 2. Add Real Photos

Replace the placeholder cards in the gallery with actual images:

```html
<div class="gallery-item">
    <img src="photos/gregory1.jpg" alt="Gregory">
</div>
```

### 3. Add Gregory's Profile Photo

Replace the hero image placeholder:

```html
<div class="hero-image" id="heroImage">
    <img src="photos/gregory-hero.jpg" alt="Gregory">
</div>
```

### 4. Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push this folder to the repository
3. Go to Settings → Pages → Deploy from main branch
4. Your site will be live at `https://yourusername.github.io/repository-name`

## Customization

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #6366f1;      /* Main purple */
    --accent: #f59e0b;       /* Gold accent */
    --background: #0f0f23;   /* Dark background */
}
```

### Update Family Members

Edit the leaderboard section in `index.html` with your family members' names.

### Add YouTube Videos

Replace the video placeholder with a YouTube embed:

```html
<div class="video-container">
    <iframe 
        src="https://www.youtube.com/embed/PLAYLIST_ID?list=YOUR_PLAYLIST"
        frameborder="0"
        allowfullscreen>
    </iframe>
</div>
```

## PWA Icons

Add your own app icons:

1. Create a 192x192 and 512x512 PNG of Gregory
2. Save them in the `icons/` folder
3. The app will use these when added to home screen

## Enjoy! 🐾

Made with ❤️ for Gregory
