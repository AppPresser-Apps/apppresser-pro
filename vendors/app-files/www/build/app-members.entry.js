import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';
import { B as BuddyPressService } from './buddypress.service-877a70b5.js';
import { s as state } from './store-b76a13b4.js';
import './utils-2a278bd0.js';
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
import './index-6dc587d2.js';
import './index-0b091f9f.js';
import './global-e1c7e609.js';
import './index-7106c220.js';

const appMembersCss = "app-members{display:block}.chip{background:var(--ion-color-warning);color:var(--ion-color-warning-contrast);margin:0 5px;padding:0 4px;border-radius:4px;font-size:12px;font-weight:600}";

const AppMembers = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.loadMoreDisabled = true;
    this.defaults = {
      page: 1,
      per_page: 20
    };
    this.data = undefined;
    this.filter = undefined;
    this.items = undefined;
    this.spinner = true;
    // Process block options to filter BuddyPress Activity stream.
    let filter = {};
    if (this.data.attrs.data.type !== '') {
      filter = { type: this.data.attrs.data.type };
    }
    this.filter = Object.assign({}, filter);
    this.args = Object.assign(Object.assign({}, this.defaults), this.filter);
  }
  componentWillLoad() {
    this.service = new BuddyPressService({ url: this.data.attrs.data.url });
    this.getMembers();
  }
  async getMembers() {
    const members = await this.service.getMembers(this.args);
    this.items = [...members];
    this.spinner = false;
    this.loadMoreDisabled = false;
  }
  async viewItem(_e, item) {
    console.log(item);
    state.api = item;
    await customElements.whenDefined('ion-router');
    const router = document.querySelector('ion-router');
    router.push(`/members/${item.id}`);
  }
  async loadMore(event) {
    console.log("Begin load more");
    this.args.page = this.args.page + 1;
    const members = await this.service.getMembers(this.args);
    if (members) {
      this.items = [...this.items, ...members];
    }
    event.target.complete();
  }
  render() {
    return (h(Host, null, this.spinner ? h("ion-spinner", null) : null, (!this.spinner && this.items.length < 0 && !this.loadMoreDisabled) ? h("ion-item", null, h("ion-label", null, "No recent activity.")) : null, h("ion-list", null, this.items && this.items.map((item) => (h("ion-item", { key: item.id, detail: true, onClick: (e) => this.viewItem(e, item) }, h("ion-avatar", { slot: "start", style: {
        width: "46px",
        height: "46px",
        alignSelf: "flex-start",
        marginTop: "16px",
      } }, h("ion-img", { src: item.avatar_urls.full })), h("div", { style: { width: "100%", padding: "10px 0" } }, h("div", { class: "activity-header" }, h("span", { style: { fontSize: "13px", fontWeight: "700" }, innerHTML: item.name }), item.member_types[0] === "artist" && (h("span", { class: "chip" }, "ARTIST"))), h("span", { style: { fontSize: "13px" } }, " @", item.mention_name)))))), h("ion-infinite-scroll", { disabled: this.loadMoreDisabled, threshold: "200px", id: "infinite-scroll", onIonInfinite: (e) => this.loadMore(e) }, h("ion-infinite-scroll-content", { loadingSpinner: "crescent" }))));
  }
};
AppMembers.style = appMembersCss;

export { AppMembers as app_members };
