import { d as dismissModal, p as presentModal, a as presentActionSheet, b as presentPopover, c as presentAlert } from './utils-9417d402.js';
import { s as state } from './store-a75d6c94.js';
import { P as Preferences } from './index-6dc587d2.js';
import { r as registerPlugin } from './index-0b091f9f.js';
import { p as processTokens } from './tokens-e7de6c68.js';

const Browser = registerPlugin('Browser', {
    web: () => import('./web-b940a692.js').then(m => new m.BrowserWeb()),
});

const name = "@aparajita/capacitor-biometric-auth";
const version = "4.0.0";
const info = {
	name: name,
	version: version
};

var BiometryType;
(function (BiometryType) {
    /**
     * No biometry is available
     */
    BiometryType[BiometryType["none"] = 0] = "none";
    /**
     * iOS Touch ID is available
     */
    BiometryType[BiometryType["touchId"] = 1] = "touchId";
    /**
     * iOS Face ID is available
     */
    BiometryType[BiometryType["faceId"] = 2] = "faceId";
    /**
     * Android fingerprint authentication is available
     */
    BiometryType[BiometryType["fingerprintAuthentication"] = 3] = "fingerprintAuthentication";
    /**
     * Android face authentication is available
     */
    BiometryType[BiometryType["faceAuthentication"] = 4] = "faceAuthentication";
    /**
     * Android iris authentication is available
     */
    BiometryType[BiometryType["irisAuthentication"] = 5] = "irisAuthentication";
})(BiometryType || (BiometryType = {}));
/**
 * If the `authenticate()` method throws an exception, the error object
 * contains a .code property which will contain one of these strings,
 * indicating what the error was.
 *
 * See https://developer.apple.com/documentation/localauthentication/laerror
 * for a description of each error code.
 */
var BiometryErrorType;
(function (BiometryErrorType) {
    BiometryErrorType["none"] = "";
    BiometryErrorType["appCancel"] = "appCancel";
    BiometryErrorType["authenticationFailed"] = "authenticationFailed";
    BiometryErrorType["invalidContext"] = "invalidContext";
    BiometryErrorType["notInteractive"] = "notInteractive";
    BiometryErrorType["passcodeNotSet"] = "passcodeNotSet";
    BiometryErrorType["systemCancel"] = "systemCancel";
    BiometryErrorType["userCancel"] = "userCancel";
    BiometryErrorType["userFallback"] = "userFallback";
    BiometryErrorType["biometryLockout"] = "biometryLockout";
    BiometryErrorType["biometryNotAvailable"] = "biometryNotAvailable";
    BiometryErrorType["biometryNotEnrolled"] = "biometryNotEnrolled";
    BiometryErrorType["noDeviceCredential"] = "noDeviceCredential";
})(BiometryErrorType || (BiometryErrorType = {}));
class BiometryError {
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }
}

const kBiometryTypeNameMap = {
    [BiometryType.none]: '',
    [BiometryType.touchId]: 'Touch ID',
    [BiometryType.faceId]: 'Face ID',
    [BiometryType.fingerprintAuthentication]: 'Fingerprint Authentication',
    [BiometryType.faceAuthentication]: 'Face Authentication',
    [BiometryType.irisAuthentication]: 'Iris Authentication'
};
/**
 * Return a human-readable name for a BiometryType.
 */
// eslint-disable-next-line import/prefer-default-export
function getBiometryName(type) {
    return kBiometryTypeNameMap[type] || '';
}

console.log(`loaded ${info.name} v${info.version}`);
const proxy = registerPlugin('BiometricAuthNative', {
    web: async () => import('./web-dda90fa1.js').then((module) => new module.BiometricAuthWeb()),
    ios: async () => import('./native-514f4693.js').then((module) => new module.BiometricAuthNative(proxy)),
    android: async () => import('./native-514f4693.js').then((module) => new module.BiometricAuthNative(proxy))
});

/**
 * Check if biometrics is available
 *
 * @returns boolean
 */
async function checkBioMetrics() {
  if ('web' === state.data.device.platform) {
    await proxy.setBiometryType('faceId');
  }
  const bio = await proxy.checkBiometry();
  console.log('bio', bio);
  return bio.isAvailable;
}
/**
 * Authenticate with biometrics
 *
 * @returns boolean
 */
async function authBiometrics() {
  if ('web' === state.data.device.platform) {
    await proxy.setBiometryType('faceId');
  }
  try {
    await proxy.authenticate({
      reason: 'Log into app.',
      cancelTitle: 'Cancel This',
    });
    console.log('bioauth successful');
    updateResumeTime();
    state.biometric = false;
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}
/**
 * Resume biometrics check after 5 minutes
 */
function resumeBioMetrics() {
  console.log('resumeBioMetrics');
  checkResumeTime();
}
async function checkResumeTime() {
  const { value } = await Preferences.get({ key: 'resumetimestamp' });
  if (value) {
    console.log('resumetimestampsssss', parseInt(value));
    const diff = timestamp_diff(parseInt(value), 5);
    if (diff > 1) {
      updateResumeTime();
      const bio = checkBioMetrics();
      if (bio) {
        state.biometric = true;
      }
    }
  }
  else {
    updateResumeTime();
  }
}
/**
 * Update resume time
 */
async function updateResumeTime() {
  const timestamp = Date.now();
  await Preferences.set({ key: 'resumetimestamp', value: `${timestamp}` });
  console.log(timestamp);
}
/**
 * Get timestamp difference in minutes
 *
 * @param timestamp
 * @param _diff
 * @returns number
 */
function timestamp_diff(timestamp, _diff) {
  const today = Date.now();
  var difference = today - timestamp;
  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;
  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;
  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;
  var secondsDifference = Math.floor(difference / 1000);
  console.log('difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ');
  console.log(Math.round(((today - timestamp) % 3600000) / 60000));
  return Math.round(((today - timestamp) % 3600000) / 60000);
}

async function runAction(data) {
  switch (data.action) {
    case 'none':
      console.log('no action');
      break;
    case 'custom':
      console.log('custom action', data);
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
    case 'biometric_auth':
      const bio = await authBiometrics();
      console.log('biometric_auth', bio);
      state.data = Object.assign(Object.assign({}, state.data), { login: true });
      state.auth = bio;
      setTimeout(() => {
        routerPush('/', 'root');
      }, 500);
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

export { BiometryType as B, resumeBioMetrics as a, BiometryErrorType as b, checkBioMetrics as c, BiometryError as d, getBiometryName as g, runAction as r };
