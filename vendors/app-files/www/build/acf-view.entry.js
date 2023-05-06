import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { P as Preferences } from './index-c532d7cb.js';
import { r as renderLeftButtons, a as renderTitle, b as renderRightButtons } from './toolbar-743c1d21.js';
import { v as visibility, r as renderComponent } from './content-42412ca5.js';
import { s as state, o as onChange } from './store-a75d6c94.js';
import './index-0f2ea1ed.js';
import './global-e1c7e609.js';
import './actions-5653ed67.js';
import './utils-9417d402.js';
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
import './tokens-e7de6c68.js';
import './index-7106c220.js';

const acfViewCss = ":host{display:block}ion-popover::part(content){min-width:70% !important}";

const AcfView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.pathdata = [];
    this.prefs = [];
    this.data = undefined;
    this.api = [];
    this.props = {};
    this.attrs = undefined;
    this.loaded = false;
  }
  /**
   * Runs code before the view renders.
   * @returns void
   * @memberof AcfView
   * @since 1.0.0
   * @version 1.0.0
   */
  componentWillLoad() {
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
  componentDidLoad() {
    const attr = this.data ? this.data.attrs.data : null;
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
  async loadView() {
    // Add code to the view
    this.addCode();
    // Get the view's attributes
    const attr = this.data ? this.data.attrs.data : null;
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
        this.api = Object.assign({}, value);
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
  async runCode(code) {
    if (code !== '') {
      const method = new Function('data', 'appp', 'bp', code);
      const rsp = await method(this.data, window.appp, window.bp);
      return rsp === undefined || rsp === null ? this.data : rsp;
    }
    else {
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
  addCode() {
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
  async loadPreferences(preferences) {
    const prefsArray = preferences.split(',');
    prefsArray.map(async (pref) => {
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
  removePrefix(prefix, segments) {
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
  parsePath(path) {
    let segments = [''];
    let queryString;
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
  navchange(route) {
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
  style() {
    const attrs = this.data.attrs.data;
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
  renderTab(item) {
    if (visibility(item, this.api)) {
      return (h("ion-tab-button", { tab: "tab-speaker", onClick: () => this.navchange(item.route) }, h("ion-icon", { name: item.icon, "aria-hidden": "true" }), item.label !== '' && h("ion-label", null, item.label)));
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
    return (h(Host, null, this.data && this.data.attrs.data.hide_toolbar !== '1' && (h("ion-header", null, h("ion-toolbar", { color: this.data && this.data.attrs.data.toolbar_color }, h("ion-buttons", { slot: "start" }, this.data.attrs.data.left_buttons.length > 0 && this.data.attrs.data.left_buttons.map((button) => renderLeftButtons(button, this.api))), h("ion-title", { innerHTML: this.data && renderTitle(this.data) }), h("ion-buttons", { slot: "end" }, this.data.attrs.data.right_buttons.length > 0 && this.data.attrs.data.right_buttons.map((button) => renderRightButtons(button, this.api)))))), h("ion-content", { id: "view-content", color: this.data && this.data.attrs.data.background }, h("div", { id: "content-wrap" }, this.loaded && this.data && this.data.innerBlocks.map((block) => renderComponent(block, this.api, this.props)))), state.data.tabbar && state.data.tabbar.length > 0 && '0' === this.data.attrs.data.hide_tabbar && (h("ion-tab-bar", { slot: "bottom", color: state.data.tabbar[0].attrs.data.color }, state.data.tabbar[0].attrs.data.tabs.map((item) => this.renderTab(item))))));
  }
  get host() { return getElement(this); }
};
AcfView.style = acfViewCss;

export { AcfView as acf_view };
