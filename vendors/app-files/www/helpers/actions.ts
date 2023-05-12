import { presentAlert, presentActionSheet, presentModal, dismissModal, presentPopover } from '../helpers/utils';
import { state } from '../services/store';
import { Preferences } from '@capacitor/preferences';
import { Browser } from '@capacitor/browser';
import { processTokens } from "../helpers/tokens";
import { authBiometrics } from '../services/biometrics';

export async function runAction(data?) {

    switch (data.action) {
        case 'none':
           console.log('no action');
          break;
        case 'custom':
          console.log('custom action', data);
          const root = document.querySelector('app-root');
          (root as any).emitActionEvent(data.data.custom_action, data)
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

          if ( data.data.transient_data === '1' ) {
            state.api = data.api;
            state.detail = data;
          }
      
          const path = data.data.path ? processTokens( data.data.path, data.api) : '';
           routerPush(data.data.route + path, data.data.router_animation);
          break;
        case 'external_url':
          await Browser.open({ url: processTokens( data.data.external_url, data.api) });
          break;
        case 'close_modal':
            dismissModal();
          break;
        case 'router_back':
            routerBack();
          break;
        case 'auth_null':

          const popover = document.querySelector('ion-popover');
          if(popover) {
            popover.dismiss();
          }

          await Preferences.remove({ key: 'auth' });
          routerPush('/', 'root');
          state.auth = false;
          break;
        case 'save_preferences':
          await Preferences.set({ key: data.key, value: data.value });
          break;
        case 'biometric_auth':
          const bio = await authBiometrics();
          console.log('biometric_auth', bio);
          state.data = {...state.data, ...{login: true}}
          //state.auth = true;
          if (bio ) {
            setTimeout(() => {
                routerPush('/', 'root');
            }, 500);
          }
          
          break
        default:
          break;
    }
    
}

function routerPush(route, direction = 'forward') {
    const router = document.querySelector('ion-router');
    router.push(route, direction as any);
}

function routerBack() {
    const router = document.querySelector('ion-router');
    router.back();
}