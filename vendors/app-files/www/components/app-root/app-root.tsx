import { Component, h, ComponentInterface, State, Method, Listen, Build, Element } from '@stencil/core';
import { state } from '../../services/store';
import { Preferences } from '@capacitor/preferences';
import { renderLeftButtons, renderRightButtons, renderTitle } from '../../helpers/toolbar';
import { renderComponent } from '../../helpers/content';
//import { Database } from '../../services/db';
import { DatabaseService } from '../../services/db.service';
import { Device } from '@capacitor/device';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';
import { buddypress } from '../../functions/bp-functions';
import { apppresser } from '../../functions/appp-functions';
import { resumeBioMetrics, checkBioMetrics } from '../../services/biometrics';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot implements ComponentInterface  {

  @Element() el: HTMLElement;

  @State() data;

  biometrics: boolean = true;

  componentWillLoad() {

    const mode = Build.isDev ? 'dev mode' : 'production';
    console.log(`I'm running in ${mode}`);

    this.loadJS();

    this.getApp();

    setTimeout(async () => {
      await this.authenticate();
      const db = new DatabaseService();
      await db.initialize();
      await db.load();
      console.log('DatabaseService', state.database);
      SplashScreen.hide();

      if ( this.biometrics ) {
        App.addListener('resume', ()=> {
          this.resume();
        });
  
      }

    }, 500);
   
  }

  resume = () => {
    resumeBioMetrics();
  }

  async loadJS() {
    (window as any).bp = buddypress;
    (window as any).appp = apppresser;
  }

  @Method()
  async openDatabase() {
    console.log('openDatabase', state.database);
    //await db.deleteDb();
    return state.database;
  }

  @Method()
  async setTransient(name?, data?) {
    if (name) {
      state.transients[name] = data;
      state.transients = {...state.transients};
    }
  }

  @Method()
  async getTransient(name?) {
    return name && state.transients[name] ? await state.transients[name] : undefined;

    // if (name && state.transients[name]) {
    //   return await state.transients[name];
    // } else {
    //   return;
    // }
  }

  @Method()
  async setApi(data?) {
    if (data) {
      state.api = {...data};
    }
  }

  @Method()
  async getApi() {
    if (state.api) {
      return await state.api;
    } else {
      return;
    }
  }

  @Listen('ionRouteWillChange', {target: 'window'})
  dismissPopover(e) {
    const popover = document.querySelector('ion-popover');
    if(popover) {
      popover.dismiss();
    };
    const alert = document.querySelector('ion-alert');
    if(alert) {
      alert.dismiss();
    }
    const modal = document.querySelector('ion-modal');
    if(modal) {
      modal.dismiss();
    }

    console.log(e)
}


  async authenticate() {
    const { value } = await Preferences.get({ key: 'auth' });
    state.auth = value ? true : false;
  }

  @Method()
  async emitActionEvent(event, data?) {
    //console.log('action', event, data);
    var fn = (window as any)[event];
    if (typeof fn === "function") fn(data);
  }

  async getApp() {

    const info = await Device.getInfo();
    let data;

    if ( 'web' === info.platform ) {
      const rsp = await  fetch( this.getQueryVariable("url") );
      data = await rsp.json();
    } else {
      const rsp = await fetch( '/assets/app.json' );
      data = await rsp.json();
    }

    data['device'] = info;

    const globals = data.theme_globals;
    for (const key in globals ) {
      document.documentElement.style.setProperty(key, globals[key]);
    }

    const colors = data.theme_colors;
    for (const key in colors ) {
        this.appp_create_style_from_properties(key);
        for (const color in colors[key] ) {
          document.documentElement.style.setProperty(color, colors[key][color]);
        }
    }
    this.data = {...data};
    state.data = {...data};

    //this.renderSideMenu();
  }

  appp_create_style_from_properties(prop) {

    const css = `.ion-color-${prop} {
         --ion-color-base: var(--ion-color-${prop});
         --ion-color-base-rgb: var(--ion-color-${prop}-rgb);
         --ion-color-contrast: var(--ion-color-${prop}-contrast);
         --ion-color-contrast-rgb: var(--ion-color-${prop}-contrast-rgb);
         --ion-color-shade: var(--ion-color-${prop}-shade);
         --ion-color-tint: var(--ion-color-${prop}-tint);
     }`
 
     var style = document.createElement('style')
     style.innerText = css
     document.head.appendChild(style)
 }

  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    } 
  }

  renderSideMenu() {

    if ( this.data.side_menu ) {

      const attr = this.data.side_menu.attrs.data;

      if (this.data && attr.javascript !== '' ) {
        var JS = document.createElement('script');
        JS.text = attr.javascript;
        this.el.appendChild(JS);
      }

      const prefsArray = attr.preferences.split(',');
 
      prefsArray.map( async pref => {
     
        const { value } = await Preferences.get({ key: pref.trim() });
  
        if ( value !== null ) {
          //items[`${pref.trim()}`] = JSON.parse(value);
    
          state.preferences[`${pref.trim()}`] = JSON.parse(value);
        }
  
      });

      return (
        this.data.side_menu.innerBlocks.map( block => (
          renderComponent(block)
      ))
      )
    }
  }

  renderRoute(item) {

    const attr = item.attrs.data;

    if ( 'unauthenticated' === attr.visibility && !state.auth ) {
      return [
        <ion-route url={'data' in item.attrs ? attr.view_route : '/' + item.attrs.id } component="acf-view" componentProps={{data: item}} />,
        attr.path && <ion-route url={'data' in item.attrs ? attr.view_route + attr.path : '/' + item.attrs.id } component="acf-view" componentProps={{data: item}} /> 
      ];
    } 

    if ( 'authenticated' === attr.visibility && state.auth ) {
      return [
        <ion-route url={'data' in item.attrs ? attr.view_route : '/' + item.attrs.id } component="acf-view" componentProps={{data: item}} />,
        attr.path && <ion-route url={'data' in item.attrs ? attr.view_route + attr.path : '/' + item.attrs.id } component="acf-view" componentProps={{data: item}} /> 
      ];
    } 

    if ( 'visible' === attr.visibility ) {
      return [
        <ion-route url={'data' in item.attrs ? attr.view_route : '/' + item.attrs.id } component="acf-view" componentProps={{data: item}} />,
        attr.path && <ion-route url={'data' in item.attrs ? attr.view_route + attr.path : '/' + item.attrs.id } component="acf-view" componentProps={{data: item}} /> 
      ];
    } 

    if ( this.data.app_attrs.biometric_auth && checkBioMetrics() && state.auth && state.biometric  ) {
      return [
        <ion-route-redirect from="/" to={this.data.app_attrs.biometric_auth_view}></ion-route-redirect>
      ];
    }

  }

  @Method()
  async back(){
    await customElements.whenDefined('ion-router');
    const el = document.querySelector('ion-router');
    if (el) {
      console.log('back method', window.history, el);
      el.back();    
    }
  }
  
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          { this.data && this.data['views'].map( item => (
            this.renderRoute(item)
          ))}
        </ion-router>

        <ion-split-pane content-id="main">

          { this.data && <ion-menu content-id="main" type="push" disabled={!this.data.side_menu}>


            { this.data.side_menu && this.data.side_menu.attrs.data.hide_toolbar !== '1' && <ion-header>
              <ion-toolbar color={this.data && this.data.side_menu.attrs.data.toolbar_color}>
                <ion-buttons slot="start">
                  { this.data.side_menu.attrs.data.left_buttons.length > 0 && this.data.side_menu.attrs.data.left_buttons.map( button1 => (
                    renderLeftButtons(button1)
                  ))}
                </ion-buttons>
                <ion-title>{this.data.side_menu.attrs && renderTitle(this.data.side_menu)}</ion-title>
                <ion-buttons slot="end">
                  { this.data.side_menu.attrs.data.right_buttons.length > 0 && this.data.side_menu.attrs.data.right_buttons.map( button => (
                    renderRightButtons(button)
                  ))}
                </ion-buttons>
              </ion-toolbar>
            </ion-header> }

            <ion-content color={ this.data.side_menu && this.data.side_menu.attrs.data.background}>
            {this.renderSideMenu()}
            </ion-content>

          </ion-menu> }

          <ion-nav id="main" swipeGesture={false} />

        </ion-split-pane>
      </ion-app>
    );
  }
}
