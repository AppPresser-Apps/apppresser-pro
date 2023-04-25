import { r as registerInstance, t as createEvent, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import './index-7c8dd725.js';
import { s as state } from './store-b76a13b4.js';
import { B as BuddyPressService } from './buddypress.service-c2cdbfd6.js';
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
import './index-7106c220.js';
import './utils-d99cd4f7.js';
import './index-6dc587d2.js';
import './index-0b091f9f.js';
import './global-e1c7e609.js';
import './framework-delegate-c3343c4d.js';
import './index-2ee22356.js';

const activityItemCss = "activity-item{display:block}.activity-actions{display:flex;width:50%;justify-content:space-between}.activity-inner{font-weight:400}";

const ActivityItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.favActivityEvent = createEvent(this, "favActivityEvent", 7);
    this.item = {};
    this.options = undefined;
    this.data = undefined;
  }
  componentWillLoad() {
    this.data = this.item;
    this.bpService = new BuddyPressService({ url: this.data.api });
  }
  componentDidLoad() {
    //this.blockClicksOnGamipressBadges();
    //this.checkLinks();
  }
  async postModal(item) {
    const modal = await modalController.create({
      component: 'app-post-form',
      cssClass: 'post-modal-class',
      componentProps: { item: item, reply: true },
      backdropDismiss: false
    });
    await modal.present();
  }
  async viewProfile(e, data) {
    e.stopPropagation();
    const router = await document.querySelector("ion-router");
    router.push("/members/" + data.user_id);
  }
  viewActivityItem_(_e, _data) {
  }
  presentPopover(e, activity_id) {
    e.stopPropagation();
    const popover = Object.assign(document.createElement("ion-popover"), {
      component: "pop-activity",
      componentProps: { item: this.data, activity: activity_id },
      cssClass: "activity-pop",
      event: e,
      translucent: true,
    });
    document.body.appendChild(popover);
    return popover.present();
  }
  async viewActivityItem(e, item) {
    e.stopPropagation();
    const router = await document.querySelector("ion-router");
    router.push("/activity/" + item.id);
  }
  async goToRoute(e, link) {
    e.stopPropagation();
    const router = await document.querySelector("ion-router");
    router.push(link);
  }
  processClick(e, type) {
    e.stopPropagation();
    if ("favorite" === type) {
      const is_fav = this.data.favorited ? false : true;
      this.updateFavoriteEvent(this.data.id, is_fav);
    }
    if ("reply" === type) {
      this.postModal(this.data);
    }
  }
  async favActivity(e) {
    if (this.data.id === e.detail.id) {
      console.log('fav event handler', e.detail);
      this.data.favorited = e.detail.value;
      this.data = Object.assign({}, this.data);
    }
  }
  async updateFavoriteEvent(id, value) {
    this.favActivityEvent.emit({ id: id, value: value });
    await this.bpService.favActivity(id);
  }
  async checkLinks() {
    var links = this.el.querySelector('.activity-action').querySelectorAll('a');
    links.forEach(el => el.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (el.classList.contains('router-link')) {
        const router = await document.querySelector("ion-router");
        router.push(el.getAttribute("href"));
      }
    }));
  }
  render() {
    return (h(Host, null, this.data &&
      [h("ion-item", { lines: "full", onClick: (e) => this.viewActivityItem(e, this.data) }, h("ion-avatar", { onClick: (e) => this.viewProfile(e, this.data), slot: "start", style: {
            width: "46px",
            height: "46px",
            alignSelf: "flex-start",
            marginTop: "16px",
          } }, h("ion-img", { src: this.data.user_avatar.full })), h("div", { style: { width: "100%", padding: "10px 0" } }, h("div", { class: "activity-header" }, h("span", { style: { fontSize: "14px", fontWeight: "700" }, innerHTML: this.data.display_name }), this.data.user_type === "artist" && (h("span", { class: "chip" }, "ARTIST")), state.auth && (h("ion-icon", { style: { float: "right" }, slot: "end", name: "chevron-down-outline", onClick: (e) => this.presentPopover(e, this.data.id) }))), h("div", { class: "activity-action", style: { color: "#615e5e", fontSize: "12px" } }, h("span", { style: { fontSize: "13px" }, innerHTML: this.data.activity_action ? this.data.activity_action.action + ' - ' : '' }), h("span", { style: { fontSize: "14px" } }, " @", this.data.username, " - "), h("span", null, this.data.time_since)), h("p", { id: "activity-content", style: { fontSize: "13px", fontWeight: "500" }, innerHTML: this.data.content.rendered }), this.data.html && h("p", { id: "activity-html", style: { fontSize: "13px", fontWeight: "500" }, innerHTML: this.data.html }), (this.data.attachments && this.data.attachments.length > 0) && h("attachments-scroller", { items: this.data.attachments }), this.data.type === 'joined_group' &&
          h("p", { style: { fontSize: "13px", fontWeight: "500" } }, this.data.activity_action.action, " ", h("a", { onClick: (e) => this.goToRoute(e, '/groups/' + this.data.activity_action.slug) }, this.data.activity_action.name)), this.data.type === 'new_member' &&
          h("p", { style: { fontSize: "13px", fontWeight: "500" } }, this.data.activity_action.action), this.data.type === 'created_group' &&
          h("p", { style: { fontSize: "13px", fontWeight: "500" } }, this.data.activity_action.action, " ", h("a", { onClick: (e) => this.goToRoute(e, '/groups/' + this.data.activity_action.slug) }, this.data.activity_action.name)), h("div", { class: "activity-actions" }, this.data.can_comment && this.options.attrs.data.icon !== '0' && h("ion-icon", { name: this.options.attrs.data.icon, onClick: (e) => this.processClick(e, "reply") }), this.options.attrs.data.favoriting !== '1' && this.data.can_favorite && h("ion-icon", { name: this.data.favorited ? "heart" : "heart-outline", onClick: (e) => this.processClick(e, "favorite") })))), h("div", null, this.options.attrs.data.icon !== '0' && h("activity-replies", { parentid: this.data.id, data: this.options }))
      ]));
  }
  get el() { return getElement(this); }
};
ActivityItem.style = activityItemCss;

export { ActivityItem as activity_item };
