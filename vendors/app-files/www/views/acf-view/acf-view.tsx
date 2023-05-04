import { Component, Host, h, ComponentInterface, Prop, Element, State } from '@stencil/core';
import { Preferences } from '@capacitor/preferences';
import { renderLeftButtons, renderRightButtons, renderTitle } from '../../helpers/toolbar';
import { renderComponent, visibility } from '../../helpers/content';
import { state, onChange } from '../../services/store';

//import { TextZoom } from '@capacitor/text-zoom';

/**
 * The ACF View component.
 * 
 * @export
 * @class AcfView
 * @implements {ComponentInterface}
 * @since 1.0.0
 * @version 1.0.0
 */
@Component({
  tag: 'acf-view',
  styleUrl: 'acf-view.css',
})
export class AcfView implements ComponentInterface {
  //@Element() el: HTMLElement;
  @Element() host: HTMLAcfViewElement;

  @Prop() data: any;
  @State() api = [];
  @State() props = {};
  @State() attrs: any;
  @State() loaded = false;

  pathdata = [];
  prefs = [];

  /**
   * Runs code before the view renders.
   * @returns void
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  componentWillLoad(): void {
    // TextZoom.get().then((e)=> {
    //   console.log('TextZoom', e);
    // })

    this.loadView();
  }

  /**
   * Runs code after the view renders.
   * @returns {Promise<void>}
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  componentDidLoad(): void {
    const attr: any = this.data ? this.data.attrs.data : null;

    console.log('app data', state.data);
    console.log('view data', this.data);
    console.log('state prefs', state.preferences);

    this.style();

    this.runCode(attr.code_ondidload);
  }

  /**
   * Runs code before the view renders.
   * @returns void
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  async loadView(): Promise<void> {
    // Add code to the view
    this.addCode();

    // Get the view's attributes
    const attr: any = this.data ? this.data.attrs.data : null;

    // Get the view's API
    this.api = state.api;

    // Load the view's preferences
    if (attr && attr.preferences) {
      await this.loadPreferences(attr.preferences);
    }

    // Load the view's props
    if (attr && attr.path) {
      const pathslug = window.location.pathname.replace(attr.view_route, '');
      const path = this.parsePath(attr.path);
      const loc = this.parsePath(pathslug);

      path.segments.map((item, key) => {
        this.props[item] = loc.segments[key];
      });
    }

    // Update the view's API when it changes
    onChange('api', value => {
      setTimeout(() => {
        this.api = { ...value };
      }, 100);
    });

    // Run code before the view loads
    await this.runCode(attr.code_onwillload);

    // Set the view as loaded
    this.loaded = true;
  }

  /**
   * Runs custom javascript code.
   * 
   * @param code 
   * @returns any
   * 
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  async runCode(code: string): Promise<any> {
    if (code !== '') {
      const method = new Function('data', 'appp', 'bp', code);
      const rsp = await method(this.data, (window as any).appp, (window as any).bp);
      return rsp === undefined || rsp === null ? this.data : rsp;
    } else {
      return this.data;
    }
  }

  /**
   * Adds javascript script code to the view.
   * 
   * @returns void
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  addCode(): void {
    if (this.data && this.data.attrs.data.javascript !== '') {
      var JS = document.createElement('script');
      JS.text = this.data.attrs.data.javascript;
      this.host.appendChild(JS);
    }
  }

  /**
   * Loads the view's preferences.
   * Preferences are stored in the Capacitor Preferences plugin.
   *
   * @param preferences
   * @returns
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  async loadPreferences(preferences: string): Promise<void> {
    const prefsArray = preferences.split(',');

    prefsArray.map(async (pref: string) => {
      const { value } = await Preferences.get({ key: pref.trim() });

      if (value !== null) {
        //items[`${pref.trim()}`] = JSON.parse(value);
        state.preferences[`${pref.trim()}`] = JSON.parse(value);
      }
    });
  }

  /**
   * Removes the prefix segments from the path segments.
   * - null when the path segments do not start with the passed prefix,
   * - the path segments after the prefix otherwise.
   *
   * @param prefix
   * @param segments
   * @returns
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  removePrefix(prefix: string[], segments: string[]): string[] {
    if (prefix.length > segments.length) {
      return null;
    }
    if (prefix.length <= 1 && prefix[0] === '') {
      return segments;
    }
    for (let i = 0; i < prefix.length; i++) {
      if (prefix[i] !== segments[i]) {
        return null;
      }
    }
    if (segments.length === prefix.length) {
      return [''];
    }
    return segments.slice(prefix.length);
  }

  /**
   * Parses the path into segments and query string.
   * 
   * @param path 
   * @returns object with segments and query string
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  parsePath(path: string | undefined | null): { segments: string[]; queryString: string; } {
    let segments = [''];
    let queryString: string;

    if (path != null) {
      const qsStart = path.indexOf('?');
      if (qsStart > -1) {
        queryString = path.substring(qsStart + 1);
        path = path.substring(0, qsStart);
      }

      segments = path
        .split('/')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      if (segments.length === 0) {
        segments = [''];
      }
    }

    return { segments, queryString };
  }

  /**
   * Navigates to the passed route.
   * 
   * @param route 
   * @returns void
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  navchange(route: string): void {
    const router = document.querySelector('ion-router');
    router.push(route, 'root');
  }

  /**
   * Sets the view's style.
   * 
   * @returns void
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  style(): void {
    const attrs: any = this.data.attrs.data;

    this.host.id = 'view-' + attrs.id;

    // const content = this.host.querySelector(`#view-content`);
    // const innerScroll = content.shadowRoot.querySelector('.inner-scroll');
    // if ( 'background_image_file' in attrs && ( attrs.background_image_file !== null || attrs.background_image_file !== '' ) ) {
    //   (innerScroll as any).style.background = `url(${attrs.background_image_file})`;
    //   (innerScroll as any).style.backgroundSize = attrs.background_size;
    //   (innerScroll as any).style.backgroundPosition = attrs.background_position;
    // }

    // Gotta set shadow dom styles via css part.  ${attrs.background_size}
    var css = `
    #${this.host.id} #content-wrap {
      display: ${attrs.display};
      flex-direction: ${attrs.flex_flex_direction};
      flex-wrap: ${attrs.flex_flex_wrap};
      align-items: ${attrs.flex_align_items};
      justify-content: ${attrs.flex_justify_content};
      height: ${'flex' === attrs.display ? '100%' : 'auto'}
    }
    `;

    var styleDiv = document.createElement('style');
    styleDiv.innerHTML = css;
    this.host.appendChild(styleDiv);
  }

  /**
   * Renders the view's tabs.
   * 
   * @param item 
   * @returns any
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  renderTab(item: { route: any; icon: string; label: string }): any {
    if (visibility(item, this.api)) {
      return (
        <ion-tab-button tab="tab-speaker" onClick={() => this.navchange(item.route)}>
          <ion-icon name={item.icon} aria-hidden="true"></ion-icon>
          {item.label !== '' && <ion-label>{item.label}</ion-label>}
        </ion-tab-button>
      );
    }
  }

  /**
   * Renders the view.
   * 
   * @returns jsx
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  render() {
    return (
      <Host>
        {this.data && this.data.attrs.data.hide_toolbar !== '1' && (
          <ion-header>
            <ion-toolbar color={this.data && this.data.attrs.data.toolbar_color}>
              <ion-buttons slot="start">
                {this.data.attrs.data.left_buttons.length > 0 && this.data.attrs.data.left_buttons.map((button: any) => renderLeftButtons(button, this.api))}
              </ion-buttons>
              <ion-title innerHTML={this.data && renderTitle(this.data)}></ion-title>
              <ion-buttons slot="end">
                {this.data.attrs.data.right_buttons.length > 0 && this.data.attrs.data.right_buttons.map((button: any) => renderRightButtons(button, this.api))}
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
        )}

        <ion-content id="view-content" color={this.data && this.data.attrs.data.background}>
          <div id="content-wrap">{this.loaded && this.data && this.data.innerBlocks.map((block: any) => renderComponent(block, this.api, this.props))}</div>
        </ion-content>

        {(state.data as any).tabbar && (state.data as any).tabbar.length > 0 && '0' === this.data.attrs.data.hide_tabbar && (
          <ion-tab-bar slot="bottom" color={(state.data as any).tabbar[0].attrs.data.color}>
            {(state.data as any).tabbar[0].attrs.data.tabs.map((item: any) => this.renderTab(item))}
          </ion-tab-bar>
        )}
      </Host>
    );
  }
}
