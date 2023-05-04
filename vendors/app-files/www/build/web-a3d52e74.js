import { W as WebPlugin } from './index-0f2ea1ed.js';
import './global-e1c7e609.js';

class AppWeb extends WebPlugin {
    constructor() {
        super();
        this.handleVisibilityChange = () => {
            const data = {
                isActive: document.hidden !== true,
            };
            this.notifyListeners('appStateChange', data);
            if (document.hidden) {
                this.notifyListeners('pause', null);
            }
            else {
                this.notifyListeners('resume', null);
            }
        };
        document.addEventListener('visibilitychange', this.handleVisibilityChange, false);
    }
    exitApp() {
        throw this.unimplemented('Not implemented on web.');
    }
    async getInfo() {
        throw this.unimplemented('Not implemented on web.');
    }
    async getLaunchUrl() {
        return { url: '' };
    }
    async getState() {
        return { isActive: document.hidden !== true };
    }
    async minimizeApp() {
        throw this.unimplemented('Not implemented on web.');
    }
}

export { AppWeb };
