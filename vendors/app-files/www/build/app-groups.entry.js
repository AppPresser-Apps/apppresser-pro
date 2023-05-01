import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';
import { B as BuddyPressService } from './buddypress.service-a7d444f0.js';
import { s as state } from './store-b76a13b4.js';
import './utils-bf14ef3c.js';
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
import './index-c532d7cb.js';
import './index-0f2ea1ed.js';
import './global-e1c7e609.js';
import './index-7106c220.js';

const appGroupsCss = ":host{display:block}";

const AppGroups = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.loadMoreDisabled = true;
    this.defaults = {
      page: 1,
      per_page: 20
    };
    this.data = undefined;
    this.groupid = undefined;
    this.filter = undefined;
    this.items = undefined;
    this.spinner = true;
    this.args = Object.assign(Object.assign({}, this.defaults), this.filter);
  }
  componentWillLoad() {
    this.service = new BuddyPressService({ url: this.data.attrs.data.url });
    this.getGroups();
  }
  async getGroups() {
    const groups = await this.service.getGroups(this.args);
    this.items = [...groups];
    this.spinner = false;
    this.loadMoreDisabled = false;
    console.log(groups);
  }
  async viewItem(_e, item) {
    console.log(item);
    state.api = item;
    await customElements.whenDefined('ion-router');
    const router = document.querySelector('ion-router');
    router.push(`/groups/${item.id}`);
  }
  async loadMore(event) {
    console.log("Begin load more");
    this.args.page = this.args.page + 1;
    const groups = await this.service.getGroups(this.args);
    if (groups) {
      this.items = [...this.items, ...groups];
    }
    event.target.complete();
  }
  render() {
    return (h(Host, null, this.spinner ? h("ion-spinner", null) : null, (!this.spinner && this.items.length < 0 && !this.loadMoreDisabled) ? h("ion-item", null, h("ion-label", null, "No recent activity.")) : null, h("ion-list", null, this.items && this.items.map((item) => (h("ion-item", { key: item.id, detail: true, onClick: (e) => this.viewItem(e, item) }, h("ion-avatar", { slot: "start", style: {
        width: "46px",
        height: "46px",
        alignSelf: "flex-start",
        marginTop: "16px",
      } }, h("ion-img", { src: item.avatar_urls.full })), h("div", { style: { width: "100%", padding: "10px 0" } }, h("div", { class: "activity-header" }, h("span", { style: { fontSize: "13px", fontWeight: "700" }, innerHTML: item.name })), h("span", { style: { fontSize: "13px" } }, item.description.raw)))))), h("ion-infinite-scroll", { disabled: this.loadMoreDisabled, threshold: "200px", id: "infinite-scroll", onIonInfinite: (e) => this.loadMore(e) }, h("ion-infinite-scroll-content", { loadingSpinner: "crescent" }))));
  }
};
AppGroups.style = appGroupsCss;

export { AppGroups as app_groups };
