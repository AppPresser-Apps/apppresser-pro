import { r as registerPlugin } from './index-0b091f9f.js';

const App = registerPlugin('App', {
    web: () => import('./web-e531a657.js').then(m => new m.AppWeb()),
});

export { App as A };
