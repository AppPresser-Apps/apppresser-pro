import { B as BiometricAuthBase } from './base-cfa98543.js';
import { B as BiometryType, a as BiometryErrorType, g as getBiometryName, b as BiometryError } from './app-root-3a9a939a.js';
import './index-0f2ea1ed.js';
import './global-e1c7e609.js';
import './index-6c5afe2f.js';
import './store-b76a13b4.js';
import './index-7106c220.js';
import './index-c532d7cb.js';
import './toolbar-7ada3329.js';
import './actions-a25fe53a.js';
import './utils-bf14ef3c.js';
import './index-7c8dd725.js';
import './utils-31c050e6.js';
import './animation-6410f855.js';
import './helpers-6885e51a.js';
import './index-5aa6aa3e.js';
import './ios.transition-f8c322b0.js';
import './index-0fa2abb2.js';
import './md.transition-131fa152.js';
import './cubic-bezier-1ddfda32.js';
import './index-20a27e5b.js';
import './ionic-global-74a19eaa.js';
import './config-af47d636.js';
import './index-ed30b664.js';
import './hardware-back-button-fa04d6e9.js';
import './overlays-ef00d22b.js';
import './framework-delegate-c3343c4d.js';
import './index-2ee22356.js';
import './tokens-4662bc6d.js';
import './content-13f7c228.js';

// eslint-disable-next-line import/prefer-default-export
class BiometricAuthWeb extends BiometricAuthBase {
    constructor() {
        super(...arguments);
        this.biometryType = BiometryType.none;
    }
    async checkBiometry() {
        return Promise.resolve({
            isAvailable: this.biometryType !== BiometryType.none,
            biometryType: this.biometryType,
            reason: '',
            code: BiometryErrorType.none
        });
    }
    async authenticate(options) {
        return this.checkBiometry().then(({ isAvailable, biometryType }) => {
            if (isAvailable) {
                if (
                // eslint-disable-next-line no-alert
                confirm((options === null || options === void 0 ? void 0 : options.reason) ||
                    `Authenticate with ${getBiometryName(biometryType)}?`)) {
                    return;
                }
                throw new BiometryError('User cancelled', BiometryErrorType.userCancel);
            }
            throw new BiometryError('Biometry not available', BiometryErrorType.biometryNotAvailable);
        });
    }
    async setBiometryType(type) {
        if (typeof type === 'undefined') {
            return Promise.resolve();
        }
        if (typeof type === 'string') {
            // eslint-disable-next-line no-prototype-builtins
            if (BiometryType.hasOwnProperty(type)) {
                // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                this.biometryType = BiometryType[type];
            }
        }
        else {
            this.biometryType = type;
        }
        return Promise.resolve();
    }
}

export { BiometricAuthWeb };
