import { r as registerInstance, l as h } from './index-6c5afe2f.js';
import { s as state } from './store-b76a13b4.js';
import { B as BuddyPressService } from './buddypress.service-dea6451c.js';
import './index-7106c220.js';
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
import './index-6dc587d2.js';
import './index-0b091f9f.js';
import './global-e1c7e609.js';

const replyItemCss = "reply-item{display:block}.activity-reply-content p{margin:4px 0px 10px 0;font-size:12px}reply-item ion-icon{font-size:13px}";

const ReplyItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.item = undefined;
    this.data = undefined;
  }
  componentWillLoad() {
    this.bpService = new BuddyPressService({ url: this.item.api });
    this.data = this.item;
  }
  presentModal() {
    const modalElement = document.createElement('ion-modal');
    modalElement.component = 'app-login';
    modalElement.backdropDismiss = false;
    // present the modal.
    document.body.appendChild(modalElement);
    return modalElement.present();
  }
  processClick(e, type) {
    e.stopPropagation();
    if (!state.auth) {
      this.presentModal();
    }
    else {
      if ('favorite' === type) {
        const is_fav = this.data.favorited ? false : true;
        this.updateFavoriteEvent(this.item.id, 'favorited', is_fav);
      }
    }
  }
  updateFavoriteHandler(event) {
    console.log(event);
    if (this.item.id === event[0]) {
      this.data.favorited = event[2];
      this.data = Object.assign({}, this.data);
    }
  }
  async updateFavoriteEvent(id, key, value) {
    //const action = value ? 'activity_favorite' : 'activity_remove_favorite';
    this.updateFavoriteHandler([id, key, value]);
    await this.bpService.favActivity(id);
  }
  presentPopover(e, activity_id) {
    e.stopPropagation();
    const popover = Object.assign(document.createElement('ion-popover'), {
      component: 'pop-activity',
      componentProps: { item: this.data, activity: activity_id },
      cssClass: 'activity-pop',
      event: e,
      translucent: true
    });
    document.body.appendChild(popover);
    return popover.present();
  }
  render() {
    return (this.data && h("ion-item", null, h("div", { slot: "start", style: { 'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'align-self': 'flex-start' } }, h("ion-avatar", { style: { width: '28px', height: '28px', alignSelf: 'flex-start', marginTop: '16px' } }, h("ion-img", { src: this.data.user_avatar.full }))), h("div", { style: { width: '100%', padding: '10px 0' } }, h("div", { class: "activity-header" }, h("span", { style: { fontSize: '13px', fontWeight: '700' } }, this.data.display_name), h("span", { style: { fontSize: '13px' } }, " @", this.data.username), state.auth && h("ion-icon", { style: { float: 'right' }, slot: "end", name: "chevron-down-outline", onClick: (e) => this.presentPopover(e, this.data.id) })), (this.data.attachments && this.data.attachments.length > 0) && h("attachments-scroller", { items: this.data.attachments }), h("div", { class: "activity-reply-content", innerHTML: this.data.content.rendered }), h("div", { class: "activity-actions" }, h("ion-icon", { name: this.data.favorited ? 'heart' : 'heart-outline', onClick: (e) => this.processClick(e, 'favorite') })))));
  }
};
ReplyItem.style = replyItemCss;

export { ReplyItem as reply_item };
