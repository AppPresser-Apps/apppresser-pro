import { r as registerInstance, l as h } from './index-6c5afe2f.js';
import { B as BuddyPressService } from './buddypress.service-d28dd3ea.js';
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
import './store-b76a13b4.js';
import './index-7106c220.js';
import './index-c532d7cb.js';
import './index-0f2ea1ed.js';
import './global-e1c7e609.js';

const activityRepliesCss = "activity-replies{display:block}.activity-replies{overflow:hidden}.activity-replies ion-item{--background:transparent !important}.activity-replies ion-item>div{padding-left:20px}.activity-replies ion-item:last-child{margin-bottom:-0.55px}";

const ActivityReplies = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.data = undefined;
    this.parentid = 0;
    this.replies = [];
    this.spinner = false;
  }
  componentWillLoad() {
    this.bpService = new BuddyPressService({ url: this.data.attrs.data.url });
    this.getReplies();
  }
  activityReplyHandler(event) {
    console.log('reply event handler', event.detail);
    if (event.detail.parent === this.parentid) {
      const replies = [...this.replies];
      this.replies = [];
      setTimeout(() => {
        this.replies = [...[event.detail.item], ...replies];
      }, 0);
    }
  }
  //reply deleted.
  async deleteReply(e) {
    console.log('delete event handler', e.detail);
    const rplys = this.replies.filter(item => { return e.detail !== item.id; });
    this.replies = [...rplys];
  }
  async getReplies() {
    this.spinner = true;
    const args = {
      include: [this.parentid],
      display_comments: 'threaded'
    };
    const rsp = await this.bpService.getActivity(args);
    const item = rsp;
    this.spinner = false;
    if (item.length > 0 && 'comments' in item[0]) {
      const comments = item[0].comments.reverse();
      this.replies = [...comments];
    }
  }
  render() {
    return [
      h("div", { class: "activity-replies-wrap bottom-border" }, this.spinner && h("div", { class: "ion-spinner" }, h("ion-spinner", { name: "crescent" })), h("div", { class: "activity-replies" }, h("ion-list", { lines: "full" }, this.replies && this.replies.map(item => (h("reply-item", { key: item.id, item: item }))))))
    ];
  }
};
ActivityReplies.style = activityRepliesCss;

export { ActivityReplies as activity_replies };
