import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// PROVISIONAL typeface (O-09 is OPEN). Subsets are gated by unicode-range, so a
// Persian-only experience never downloads the Latin files.
import '@fontsource-variable/vazirmatn';
import './core/tokens/tokens.css';
import './app/app.css';
import './beats/02-the-between/theBetween.css';

import { App } from './app/App';

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
