import { r as registerPlugin } from './index-0b091f9f.js';

const Preferences = registerPlugin('Preferences', {
    web: () => import('./web-c5590046.js').then(m => new m.PreferencesWeb()),
});

export { Preferences as P };
