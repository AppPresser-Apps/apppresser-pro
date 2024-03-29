import { A as App } from './index-51faf1fd.js';
import { W as WebPlugin } from './index-0b091f9f.js';

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
