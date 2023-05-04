import '@ionic/core';
import 'jeep-sqlite';

import { setupConfig } from '@ionic/core';

export default () => {
  setupConfig({
    mode: 'ios',
    spinner: 'crescent'
  });
};
