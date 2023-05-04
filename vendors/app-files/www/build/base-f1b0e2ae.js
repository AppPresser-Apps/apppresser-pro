import { A as App } from './app-root-ee337c98.js';
import { W as WebPlugin } from './index-0f2ea1ed.js';

// eslint-disable-next-line import/prefer-default-export
class BiometricAuthBase extends WebPlugin {
    addResumeListener(listener) {
        return App.addListener('appStateChange', ({ isActive }) => {
            if (isActive) {
                this.checkBiometry()
                    .then((info) => {
                    listener(info);
                })
                    .catch(console.error);
            }
        });
    }
}

export { BiometricAuthBase as B };
