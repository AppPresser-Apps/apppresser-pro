import { r as registerInstance, t as createEvent, l as h, m as Host } from './index-6c5afe2f.js';
import { B as BuddyPressService } from './buddypress.service-b7221063.js';
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
import './store-a75d6c94.js';
import './index-7106c220.js';
import './index-6dc587d2.js';
import './index-0b091f9f.js';
import './global-e1c7e609.js';

const popActivityCss = "pop-activity{display:block}";

const PopActivity = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.deleteActivityEvent = createEvent(this, "deleteActivityEvent", 7);
    this.deleteReplyEvent = createEvent(this, "deleteReplyEvent", 7);
    this.activity = undefined;
    this.item = undefined;
  }
  ;
  componentWillLoad() {
    this.bpService = new BuddyPressService({ url: this.item.api });
  }
  async flagActivity() {
    await this.bpService.flagContent({
      item: this.activity,
      action: "activity_flag",
    });
    this.dismissPopover();
  }
  async deleteActivity() {
    const delete_item = await this.bpService.deleteActivity(this.activity, { id: this.activity, context: 'edit' });
    if (delete_item.hasOwnProperty('deleted')) {
      console.log('deleted event', this.item);
      if ('activity_comment' === this.item.type) {
        this.deleteReplyEvent.emit(this.activity);
      }
      else {
        this.deleteActivityEvent.emit(this.activity);
      }
      this.dismissPopover();
    }
  }
  async dismissPopover() {
    const modal = await document.querySelector("ion-popover");
    modal.dismiss({
      dismissed: true,
    });
  }
  render() {
    return (h(Host, null, h("ion-list", null, h("ion-item", null, h("ion-icon", { size: "small", slot: "start", name: "flag-outline" }), h("ion-label", { onClick: () => this.flagActivity() }, "Report Content")), this.item.can_delete && (h("ion-item", { lines: "none" }, h("ion-icon", { size: "small", slot: "start", name: "close-circle-outline" }), h("ion-label", { onClick: () => this.deleteActivity() }, "Delete"))))));
  }
};
PopActivity.style = popActivityCss;

export { PopActivity as pop_activity };
