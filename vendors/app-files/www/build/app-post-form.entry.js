import { r as registerInstance, t as createEvent, l as h } from './index-6c5afe2f.js';
import './index-7c8dd725.js';
import { B as BuddyPressService } from './buddypress.service-c23bcea2.js';
import { s as state } from './store-a75d6c94.js';
import { A as AttachmentStore } from './state-9b24d0d5.js';
import { l as loadingController } from './overlays-ef00d22b.js';
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
import './utils-9417d402.js';
import './index-c532d7cb.js';
import './index-0f2ea1ed.js';
import './global-e1c7e609.js';
import './index-7106c220.js';
import './framework-delegate-c3343c4d.js';
import './index-2ee22356.js';

const appPostFormCss = "app-post-form{display:block}.post-form{padding:16px;background:#efefef}.loading-wrapper.sc-ion-loading-ios{padding-top:0px !important;padding-bottom:0px !important;padding-inline-end:19px !important}";

const AppPostForm = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.activityReply = createEvent(this, "activityReply", 7);
    this.activityPost = createEvent(this, "activityPost", 7);
    this.activityReload = createEvent(this, "activityReload", 7);
    this.posting = false;
    this.placeholder = 'Post a status update...';
    this.reply = false;
    this.item = undefined;
    this.args = undefined;
    this.data = undefined;
  }
  componentWillLoad() {
    console.log(this.item, this.data);
    this.placeholder = this.reply ? 'Post a reply...' : this.placeholder;
    this.bpService = new BuddyPressService({ url: this.item.api });
  }
  async activityPostEvent(item) {
    console.log(this.reply);
    if (!this.reply) {
      this.activityPost.emit(item);
    }
    if (this.reply) {
      this.activityReply.emit({ item: item, parent: this.item.id });
    }
  }
  async dismissLoader() {
    const loader = await document.querySelector('ion-loading');
    loader.dismiss();
  }
  async dismissModal() {
    const modal = await document.querySelector('ion-modal');
    modal.dismiss({
      'dismissed': true
    });
  }
  async addActivity() {
    var _a;
    if ('' !== this.content && !this.posting) {
      const loading = await loadingController.create({ message: '', cssClass: 'ion-loading-spinner' });
      setTimeout(() => {
        loading.present();
      }, 50);
      this.posting = true;
      // 'id'                => $r['id'],
      // 2680	                'content'           => $comment_content,
      // 2681	                'component'         => buddypress()->activity->id,
      // 2682	                'type'              => 'activity_comment',
      // 2683	                'primary_link'      => $r['primary_link'],
      // 2684	                'user_id'           => $r['user_id'],
      // 2685	                'item_id'           => $activity_id,
      // 2686	                'secondary_item_id' => $r['parent_id'],
      // 2687	                'hide_sitewide'     => $is_hidden,
      // 2688	                'error_type'        => $r['error_type']
      const args = Object.assign({ content: this.content }, (_a = this.args) !== null && _a !== void 0 ? _a : { component: 'activity', context: 'edit', type: 'activity_update' });
      //console.log(this.args, args);
      if (this.reply) {
        args['type'] = 'activity_comment';
        args['primary_item_id'] = this.item.id;
      }
      let activity;
      if (AttachmentStore.attachments.length > 0) {
        args['attachments'] = AttachmentStore.attachments;
        if (!this.content) {
          args['content'] = '<span></span>';
        }
        activity = await this.bpService.uploadAttachmentActivity(args);
      }
      else {
        activity = await this.bpService.addActivity(args);
      }
      console.log('reply', this.reply, activity);
      if (activity && !activity.hasOwnProperty('error')) {
        const items = [activity[0], ...state.activity];
        if (!this.reply) {
          state.activity = [...items];
          this.activityPostEvent(activity);
          state.activity_item = [];
          this.activityReload.emit();
          const router = document.querySelector('ion-router');
          router.push('/activity/' + (this.reply ? activity[0].primary_item_id : activity[0].id));
        }
        else {
          console.log('reply');
          this.activityReply.emit({ item: activity[0], parent: this.item.id });
        }
      }
      AttachmentStore.attachments = [];
      this.posting = false;
      this.dismissLoader();
      this.dismissModal();
    }
  }
  updateContent(e) {
    this.content = e.target.value;
  }
  get postingToGroup() {
    var _a;
    return ((_a = this.args) === null || _a === void 0 ? void 0 : _a.component) === 'groups';
  }
  get groupName() {
    var _a;
    return (_a = this.data) === null || _a === void 0 ? void 0 : _a.api.name;
  }
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", null, h("ion-buttons", { slot: "start" }, h("ion-button", { onClick: () => this.dismissModal() }, h("ion-icon", { slot: "icon-only", name: "close" }))), h("ion-title", null), h("ion-buttons", { slot: "end" }, h("ion-button", { style: { width: '80px' }, fill: "clear", color: "primary", onClick: () => this.addActivity() }, "Post")))),
      h("ion-content", null, h("div", { class: "post-form" }, h("ion-textarea", { style: { fontSize: '14px' }, rows: 4, cols: 10, placeholder: this.placeholder, onIonChange: (e) => this.updateContent(e) })), this.postingToGroup && h("div", { class: "ion-padding-top ion-padding-start", style: { fontSize: '12px' } }, h("ion-icon", { name: "return-down-back-outline" }), " posting to ", this.groupName), this.reply && h("div", { class: "ion-padding-top ion-padding-start", style: { fontSize: '12px' } }, h("ion-icon", { name: "return-down-back-outline" }), " replying to ", this.item.display_name), h("attachments-grid", null)),
      h("ion-footer", null, h("ion-toolbar", null, h("ion-buttons", { slot: "start" }, h("attachment-button", null))))
    ];
  }
};
AppPostForm.style = appPostFormCss;

export { AppPostForm as app_post_form };
