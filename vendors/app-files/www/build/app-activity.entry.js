import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import './index-7c8dd725.js';
import { B as BuddyPressService } from './buddypress.service-d28dd3ea.js';
import { p as processTokens, s as split_rule } from './tokens-4662bc6d.js';
import { s as state } from './store-b76a13b4.js';
import { m as modalController } from './overlays-ef00d22b.js';
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
import './utils-bf14ef3c.js';
import './index-c532d7cb.js';
import './index-0f2ea1ed.js';
import './global-e1c7e609.js';
import './index-7106c220.js';
import './framework-delegate-c3343c4d.js';
import './index-2ee22356.js';

const appActivityCss = ":host{display:block}";

const AppActivity = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.loadMoreDisabled = true;
    this.defaults = {
      type: ['activity_update'],
      page: 1,
      per_page: 20
    };
    this.data = undefined;
    this.props = undefined;
    this.filter = undefined;
    this.items = undefined;
    this.spinner = true;
    // Process block options to filter BuddyPress Activity stream.
    let filter = {};
    if (this.data.attrs.data.group_id !== '') {
      const g_id = processTokens(this.data.attrs.data.group_id, state.api);
      filter = { group_id: g_id };
    }
    if (this.data.attrs.data.user_id !== '') {
      // Process route prop for single activity id.
      const rules = split_rule(this.data.attrs.data.user_id);
      if ('prop' === rules[0]) {
        filter = { user_id: this.props[rules[1]] };
      }
      else {
      }
    }
    // filter for user id includes.
    if (this.data.attrs.data.include !== '') {
      // Process route prop for single activity id.
      const rules = split_rule(this.data.attrs.data.include);
      if ('prop' === rules[0]) {
        filter = { include: [parseInt(this.props[rules[1]])] };
      }
      else {
        // const a_ids = processTokens( this.data.attrs.data.include, state.api);
        // filter = {include: [a_ids]};
      }
    }
    if ('activity_types' in this.data.attrs.data && this.data.attrs.data.activity_types !== '') {
      const array = this.data.attrs.data.activity_types.split(',').map(item => item.trim());
      filter['type'] = array;
    }
    this.filter = Object.assign({}, filter);
    this.args = Object.assign(Object.assign({}, this.defaults), this.filter);
  }
  componentWillLoad() {
    this.service = new BuddyPressService({ url: this.data.attrs.data.url });
    this.getActivity();
  }
  async getActivity() {
    const activity = await this.service.getActivity(this.args);
    console.log(activity);
    if ('data' in activity && activity.data.status >= 400) {
      console.log(activity.data.status);
      this.debugAlert(JSON.stringify(activity));
      this.items = [...[]];
    }
    else {
      this.items = [...activity];
    }
    this.spinner = false;
    this.loadMoreDisabled = false;
  }
  async loadMore(event) {
    this.args.page = this.args.page + 1;
    const activity = await this.service.getActivity(this.args);
    if (activity) {
      this.items = [...this.items, ...activity];
    }
    event.target.complete();
  }
  async debugAlert(message) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Debug';
    alert.message = message;
    alert.buttons = ['close'];
    alert.backdropDismiss = false;
    document.body.appendChild(alert);
    await alert.present();
  }
  //item deleted.
  async deleteActivity(e) {
    const items = this.items.filter(item => { return item.id !== e.detail; });
    this.items = [...items];
  }
  async reload() {
    this.getActivity();
  }
  async postModal(args, data) {
    const modal = await modalController.create({
      component: 'app-post-form',
      cssClass: 'post-modal-class',
      componentProps: { item: { api: this.data.attrs.data.url }, args: args, data: data },
      backdropDismiss: false
    });
    await modal.present();
  }
  render() {
    return (h(Host, null, this.spinner ? h("ion-spinner", null) : null, (!this.spinner && this.items && this.items.length <= 0 && !this.loadMoreDisabled) ? h("ion-item", null, h("ion-label", null, "No recent activity.")) : null, this.items && this.items.map(item => h("activity-item", { key: item.id, item: item, options: this.data })), h("ion-infinite-scroll", { disabled: this.loadMoreDisabled, threshold: "200px", id: "infinite-scroll", onIonInfinite: (e) => this.loadMore(e) }, h("ion-infinite-scroll-content", { loadingSpinner: "crescent" }))));
  }
  get el() { return getElement(this); }
};
AppActivity.style = appActivityCss;

export { AppActivity as app_activity };
