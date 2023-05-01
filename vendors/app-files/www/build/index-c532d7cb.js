import { r as registerPlugin } from './index-0f2ea1ed.js';

const Preferences = registerPlugin('Preferences', {
    web: () => import('./web-519c8d82.js').then(m => new m.PreferencesWeb()),
});

export { Preferences as P };
