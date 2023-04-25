import { d as dismissModal, p as presentModal, a as presentActionSheet, b as presentPopover, c as presentAlert } from './utils-d99cd4f7.js';
import { s as state } from './store-b76a13b4.js';
import { P as Preferences } from './index-6dc587d2.js';
import { r as registerPlugin } from './index-0b091f9f.js';
import { p as processTokens } from './tokens-4662bc6d.js';

const Browser = registerPlugin('Browser', {
    web: () => import('./web-b940a692.js').then(m => new m.BrowserWeb()),
});

async function runAction(data) {
  switch (data.action) {
    case 'none':
      console.log('no action');
      break;
    case 'custom':
      const root = document.querySelector('app-root');
      root.emitActionEvent(data.data.custom_action, data);
      break;
    case 'alert':
      presentAlert(data.data.alert_message);
      break;
    case 'popover':
      presentPopover(data);
      break;
    case 'action_sheet':
      presentActionSheet(data);
      break;
    case 'modal':
      presentModal(data);
      break;
    case 'router_push':
      if (data.data.transient_data === '1') {
        state.api = data.api;
        state.detail = data;
      }
      const path = data.data.path ? processTokens(data.data.path, data.api) : '';
      routerPush(data.data.route + path, data.data.router_animation);
      break;
    case 'external_url':
      await Browser.open({ url: processTokens(data.data.external_url, data.api) });
      break;
    case 'close_modal':
      dismissModal();
      break;
    case 'router_back':
      routerBack();
      break;
    case 'auth_null':
      const popover = document.querySelector('ion-popover');
      if (popover) {
        popover.dismiss();
      }
      await Preferences.remove({ key: 'auth' });
      routerPush('/', 'root');
      state.auth = false;
      break;
    case 'save_preferences':
      await Preferences.set({ key: data.key, value: data.value });
      break;
    default:
      break;
  }
}
function routerPush(route, direction = 'forward') {
  const router = document.querySelector('ion-router');
  router.push(route, direction);
}
function routerBack() {
  const router = document.querySelector('ion-router');
  router.back();
}

export { runAction as r };
