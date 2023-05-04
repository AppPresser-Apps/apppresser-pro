import { B as BiometricAuthBase } from './base-6f25cd6f.js';
import { B as BiometryType, b as BiometryErrorType } from './actions-11707044.js';
import './index-5795d411.js';
import './index-0f2ea1ed.js';
import './global-e1c7e609.js';
import './utils-bf14ef3c.js';
import './index-7c8dd725.js';
import './utils-31c050e6.js';
import './index-6c5afe2f.js';
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
import './store-b76a13b4.js';
import './index-7106c220.js';
import './index-c532d7cb.js';
import './tokens-4662bc6d.js';

// eslint-disable-next-line import/prefer-default-export
class BiometricAuthNative extends BiometricAuthBase {
    constructor(capProxy) {
        super();
        this.checkBiometry = capProxy.checkBiometry;
        this.authenticate = capProxy.authenticate;
    }
    async checkBiometry() {
        // Never used, satisfy the compiler
        return Promise.resolve({
            isAvailable: true,
            biometryType: BiometryType.none,
            reason: '',
            code: BiometryErrorType.none
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    async authenticate(options) { }
    // eslint-disable-next-line @typescript-eslint/require-await
    async setBiometryType(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type) {
        throw this.unimplemented('setBiometryType is web only');
    }
}

export { BiometricAuthNative };
