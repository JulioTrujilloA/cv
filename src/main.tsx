import { createRoot } from 'react-dom/client';
import App from './App';

// Fonts are self-hosted via @fontsource so the browser never needs to make a
// cross-origin request to Google Fonts.  Vite inlines the @font-face rules into
// the CSS bundle and copies the .woff2 files into dist/assets — same origin,
// proper cache headers, no render-blocking network round trips.
// We import per-weight AND per-subset (latin + latin-ext only) to strip out
// Cyrillic, Vietnamese, Greek, etc. @font-face declarations that are never used
// for a portfolio in English — this significantly reduces the CSS bundle size.
import '@fontsource/work-sans/latin-300.css';
import '@fontsource/work-sans/latin-400.css';
import '@fontsource/work-sans/latin-ext-400.css';
import '@fontsource/work-sans/latin-500.css';
import '@fontsource/work-sans/latin-ext-500.css';
import '@fontsource/work-sans/latin-600.css';
import '@fontsource/work-sans/latin-700.css';

import '@fontsource/cormorant-garamond/latin-300.css';
import '@fontsource/cormorant-garamond/latin-300-italic.css';
import '@fontsource/cormorant-garamond/latin-ext-300.css';
import '@fontsource/cormorant-garamond/latin-ext-300-italic.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-700.css';

import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';

import './index.css';
import { config } from './portfolio.config';

// Favicon: the static <link> in index.html points at the site logo
// (public/img/avatar-logo.png) — the template's generated-initials favicon
// was removed on purpose.

// ── GoatCounter analytics (opt-in) ────────────────────────────────────────────
// Free, privacy-respecting, cookie-free. See: https://www.goatcounter.com
if (config.analytics.goatcounterCode) {
  const script = document.createElement('script');
  script.dataset['goatcounter'] =
    `https://${config.analytics.goatcounterCode}.goatcounter.com/count`;
  script.async = true;
  script.src = '//gc.zgo.at/count.js';
  document.head.appendChild(script);
}

createRoot(document.getElementById('root')!).render(<App />);
