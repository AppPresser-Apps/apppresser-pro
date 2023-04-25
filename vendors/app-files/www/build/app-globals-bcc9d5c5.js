import { i as initialize } from './ionic-global-74a19eaa.js';
import './index-7c8dd725.js';
import { s as setupConfig } from './config-af47d636.js';

const appGlobalScript = () => {
  setupConfig({
    mode: 'ios',
    spinner: 'crescent'
  });
};

const globalScripts = () => {
  appGlobalScript();
  initialize();
};

export { globalScripts as g };
