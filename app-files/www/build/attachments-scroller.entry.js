import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';
import './index-7c8dd725.js';
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
import './framework-delegate-c3343c4d.js';
import './index-2ee22356.js';

const attachmentsScrollerCss = "attachments-scroller{display:block;overflow-x:auto;overflow-y:hidden;width:auto;line-height:var(--lh)}attachments-scroller .border{border-bottom:solid #c8c7cc;border-width:0.55px}attachments-scroller .scroll-element-wrap{display:flex;flex-direction:row;align-items:top}attachments-scroller .scroll-element{margin:0;padding:10px 10px 20px 0px}attachments-scroller .scroll-element-image{height:100px;width:200px;background-color:#ffffff;background-size:cover;background-position:center center;border-radius:6px}attachments-scroller::-webkit-scrollbar{display:none}attachments-scroller{-ms-overflow-style:none;scrollbar-width:none;}";

const AttachmentsScroller = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.items = undefined;
  }
  componentWillLoad() {
  }
  async openAttachment(e, item) {
    e.stopPropagation();
    const modal = await modalController.create({
      component: 'attachment-modal',
      cssClass: 'attachment-modal',
      componentProps: { item: item }
    });
    await modal.present();
  }
  render() {
    return (h(Host, { class: "scroller" }, h("div", { class: "scroll-element-wrap" }, this.items.map(item => (h("div", { class: "scroll-element", style: { 'width': '210px', 'cursor': 'pointer' }, onClick: (e) => this.openAttachment(e, item) }, h("div", { class: "scroll-element-image", style: { 'background-image': `url(${item})` } })))), h("div", { style: { padding: '6px' } }))));
  }
};
AttachmentsScroller.style = attachmentsScrollerCss;

export { AttachmentsScroller as attachments_scroller };
