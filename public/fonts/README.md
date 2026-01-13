# Custom Fonts

Place your custom font files here (.woff2, .woff, .otf, .ttf).

Then update the `@font-face` declarations in `src/app/globals.css`:

```css
@font-face {
  font-family: 'YourDisplayFont';
  src: url('/fonts/your-display-font.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'YourBodyFont';
  src: url('/fonts/your-body-font.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

And update the CSS variables:

```css
:root {
  --font-display: 'YourDisplayFont', Georgia, serif;
  --font-body: 'YourBodyFont', system-ui, sans-serif;
}
```
