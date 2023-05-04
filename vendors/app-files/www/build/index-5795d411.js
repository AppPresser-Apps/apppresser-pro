import { r as registerPlugin } from './index-0f2ea1ed.js';

const App = registerPlugin('App', {
    web: () => import('./web-a3d52e74.js').then(m => new m.AppWeb()),
});

export { App as A };
