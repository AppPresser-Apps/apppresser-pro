import { Preferences } from '@capacitor/preferences';

export const apppresser = {
  // Refresh auth, gets and saves udated user data.
  refreshAuth: async (url) => {
    console.log('auth refresh');

    const { value } = await Preferences.get({ key: 'auth' });

    const auth = JSON.parse(value);

    const headers = { 'Authorization': `Bearer ${auth.token}`, 'Content-Type': 'application/json' };

    var request = new Request(url, {
      method: 'POST',
      headers: new Headers(headers)
    });

    const response = await fetch(request);
    const rsp = await response.json();
    console.log(rsp);
    await Preferences.set({ key: 'auth', value: JSON.stringify(rsp) });

  },
 // Sets a preference in the app preferences.
  setPreference: async (key, value) => {
    console.log(key, value);
    await Preferences.set({ key: key, value: JSON.stringify(value) });
  },
  // Gets a preference from the app preferences.
  getPreference: async key => {
    console.log(key);
    const { value } = await Preferences.get({ key: key });
    return value ? JSON.parse( value ): false;
  },
  // Removes a preference in the app preferences.
  removePreference: async key => {
    console.log(key);
    return await Preferences.remove({ key: key });
  },
  // Adjust the devices text zoom settings.
  textSize: async value => {
    console.log(value);
  },
  openDB: async () => {
    await customElements.whenDefined('app-root');
    const root = document.querySelector('app-root');
    const db = await root.openDatabase();
    return db;
  },
  // Update and reload inputs by passing the input name from the field in the app builder.
  updateInput: async (input, value?) => {
    await customElements.whenDefined('app-input');
    const inputElement = document.querySelector(`#${input}`) as HTMLAppInputElement;
    if ( inputElement ) {
      await inputElement.updateInput(input, value);
    }
    
  },
  // Reeload inputs by passing the input name from the field in the app builder.
  reloadInput: async (input) => {
    await customElements.whenDefined('app-input');
    const inputElement = document.querySelector(`#${input}`) as HTMLAppInputElement;
    if ( inputElement ) {
      await inputElement.reloadInput(input);
    }
  }, 
  alert: async (data)=> {
    console.log(data);
    const alert = document.createElement('ion-alert');
    alert.header = data.header || '';
    alert.subHeader = data.subheader || '';
    alert.message = data.message || '';
    alert.buttons = data.buttons || ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  },
  router: {
    push: async (route, animation: any = 'push')=> {
      if (route) {
        await customElements.whenDefined('ion-router');
        const el = document.querySelector('ion-router');
        if (el) {
          el.push(route, animation);
        }
        
      }      
    },
    back: async ()=> {
      console.log('router back');
      await customElements.whenDefined('ion-router');
      const el = document.querySelector('ion-router');
      if (el) {
        el.back();
      }
    }
  },
  repeater: {
    reload: async (id)=> {
      if (id) {
        const el = document.querySelector(`#${id}`) as any;
        if (el) {
          await el.reload();
        }

        return;
        
      }
      
    },
    filter: async (id, query)=> {
      if (id) {
        const el = document.querySelector(`#${id}`) as any;
        if (el) {
          await el.filter(query);
        }
        
      }
      
    }
  }
};