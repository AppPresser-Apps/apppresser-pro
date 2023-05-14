import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { e as processValue } from './tokens-e7de6c68.js';
import './global-e1c7e609.js';
import './store-a75d6c94.js';
import './index-7106c220.js';

const appIframeCss = ":host{display:block}";

const AppIframe = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.data = undefined;
    this.loading = true;
    this.url = undefined;
  }
  componentWillLoad() {
    this.processURL();
  }
  // Runs javascript code.
  async runCode(e, code) {
    if (code !== '') {
      const method = new Function('iframe', 'appp', 'bp', code);
      await method(e, window.appp, window.bp);
    }
  }
  processURL() {
    const obj = this.data.url_parameters;
    let newObj = {};
    let url = this.data.url;
    // TODO: Rework this how mess. 
    // Redo objectToUrlParams to use url.searchParams.set, this will fix 
    // issue if user adds param to url in iframe an then adds the same param in the parameters field
    const urlvalues = url.split(' : ');
    if (urlvalues.length && urlvalues.length >= 2) {
      url = processValue(urlvalues[0], urlvalues[1]);
    }
    console.log(url);
    Object.keys(obj).map((elm) => {
      if (obj[elm]) {
        const values = obj[elm].split(' : ');
        if (values.length && values.length >= 2) {
          newObj[elm] = processValue(values[0], values[1] + ' : ' + values[2]);
        }
        else {
          newObj[elm] = obj[elm];
        }
      }
    });
    Object.keys(newObj).map((item) => {
      console.log(url);
      url = new URL(url);
      url.searchParams.set(item, newObj[item]);
    });
    this.url = url;
    this.el.style.height = `${this.data.height || 100}vh`;
    const iframe = document.createElement('iframe');
    iframe.src = this.url;
    iframe.style.height = `${this.data.height || 100}vh`;
    iframe.style.display = 'none';
    iframe.style.border = 'none';
    this.el.append(iframe);
    iframe.onload = (e) => {
      console.log(e);
      this.runCode(e, this.data.onload);
      e.target.style.display = 'block';
      this.loading = false;
    };
  }
  render() {
    return (h(Host, null, this.loading && h("ion-spinner", null)));
  }
  get el() { return getElement(this); }
};
AppIframe.style = appIframeCss;

export { AppIframe as app_iframe };
