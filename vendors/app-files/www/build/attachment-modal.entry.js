import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';

const attachmentModalCss = "attachment-modal{display:block}.attachment-modal{--background:rgba(0,0,0,0.7)}";

const AttachmentModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.item = undefined;
  }
  dismiss() {
    this.el.closest('ion-modal').dismiss({
      'dismissed': true
    });
  }
  render() {
    return (h(Host, null, h("ion-header", null, h("ion-toolbar", null, h("ion-buttons", { slot: "start" }, h("ion-button", { onClick: () => this.dismiss() }, h("ion-icon", { slot: "icon-only", name: "close" }))), h("ion-title", null))), h("ion-content", { color: "darkly" }, h("div", { style: { 'height': '100%', 'display': 'flex', 'align-items': 'center' } }, h("img", { style: { 'width': '100%' }, src: this.item })))));
  }
  get el() { return getElement(this); }
};
AttachmentModal.style = attachmentModalCss;

export { AttachmentModal as attachment_modal };
