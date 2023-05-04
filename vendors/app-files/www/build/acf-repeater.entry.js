import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { r as renderComponent } from './content-a33d4ccf.js';
import { o as objectToUrlParams } from './utils-bf14ef3c.js';
import { p as processTokens } from './tokens-4662bc6d.js';
import { s as state } from './store-b76a13b4.js';
import './actions-c657bd6a.js';
import './index-c532d7cb.js';
import './index-0f2ea1ed.js';
import './global-e1c7e609.js';
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
import './index-7106c220.js';

//import { Storage } from "@capacitor/storage";
class DataService {
  constructor() { }
  async getData(url = '', params = {}, headers = {}) {
    let data = {
      headers: Object.assign({}, headers),
      method: 'GET',
    };
    console.log(`${url}${objectToUrlParams(params)}`);
    try {
      const rsp = await fetch(`${url}${objectToUrlParams(params)}`, data);
      if (rsp.status >= 400) {
        throw rsp.json();
      }
      return await rsp.json();
    }
    catch (err) {
      window.console.log(err);
      //return err;
    }
  }
}

const acfRepeaterCss = ":host{display:block}";

const AcfRepeater = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataService = new DataService();
    this.data = undefined;
    this.api = undefined;
    this.items = undefined;
    this.innerBlocks = undefined;
    this.spinner = false;
  }
  //private db;
  componentWillLoad() {
    this.fetchData();
  }
  async filter(filter) {
    this.spinner = true;
    this.queryFilter = filter;
    this.fetchData();
    setTimeout(() => {
      this.spinner = false;
    }, 2000);
  }
  async resetFilter() {
    this.queryFilter = null;
    this.fetchData();
  }
  async fetchData() {
    this.items = null;
    this.spinner = true;
    // const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
    // await waitFor(3000);
    const attr = this.data.attrs.data;
    this.el.id = attr.id;
    if ('database' === attr.data_type) {
      try {
        const db = state.database;
        console.log('repeater query', db);
        const rsp = await db.query(this.queryFilter ? this.queryFilter : attr.database_query);
        let blocks = [];
        rsp.map(item => {
          item['attr'] = attr;
          blocks.push(item);
        });
        this.items = [...blocks];
      }
      catch (error) {
        this.spinner = false;
      }
    }
    if ('simple' === attr.data_source.database_type) {
      this.items = [...attr.local_data];
    }
    if ('api' === attr.data_type) {
      let blocks = [];
      let params = {};
      if (Array.isArray(attr.parameters)) {
        attr.parameters.map(param => {
          params[param.key] = processTokens(param.value, this.api);
        });
      }
      let rsp = await this.dataService.getData(attr.api_url, params);
      if (!Array.isArray(rsp)) {
        rsp = [rsp];
      }
      console.log(rsp);
      //const rsp = await fetch( attr.data_source.rest_url + '?_embed');
      //const arr = await rsp.json();
      rsp.map(async (item) => {
        item['attr'] = attr;
        blocks.push(item);
      });
      this.items = [...blocks];
    }
    this.spinner = false;
    return;
  }
  async reload() {
    this.queryFilter = null;
    await this.fetchData();
    return;
  }
  render() {
    return (h(Host, null, h("div", null, this.spinner && h("ion-spinner", null), this.queryFilter && h("p", { class: "ion-text-center", onClick: () => this.resetFilter(), innerHTML: this.data.attrs.data.reset_button_text }), this.items && this.items.length > 0 ? this.items.map(item => [
      this.data.innerBlocks.map(block => (renderComponent(block, item)))
    ]) : h("div", { innerHTML: !this.queryFilter ? this.data.attrs.data.empty_dataset_code : this.data.attrs.data.empty_filter_code }))));
  }
  get el() { return getElement(this); }
};
AcfRepeater.style = acfRepeaterCss;

export { AcfRepeater as acf_repeater };
