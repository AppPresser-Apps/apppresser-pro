import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';
import { A as AttachmentStore } from './state-9b24d0d5.js';
import './index-7106c220.js';

const attachmentsGridCss = "attachments-grid{display:block}";

const AttachmentsGrid = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  removeAttachment(image) {
    const filtered = AttachmentStore.attachments.filter(item => image !== item);
    AttachmentStore.attachments = [...filtered];
  }
  formatImage(item) {
    return URL.createObjectURL(item);
  }
  render() {
    return (h(Host, null, h("div", { style: { 'display': 'flex', 'padding': '15px 10px' } }, AttachmentStore.attachments.map(item => (h("div", { style: { 'width': '120px', 'height': '120px', 'margin': '0 5px', 'border-radius': '6px', 'background-image': `url(${this.formatImage(item)})`, 'background-size': 'cover', 'background-position': 'center' } }, h("div", { style: { 'padding': '5px', 'height': '44px', 'width': '44px' }, onClick: () => this.removeAttachment(item) }, h("div", { style: { 'height': '18px', 'width': '18px', 'background-color': 'rgba(0,0,0, 0.5)', 'border-radius': '50%', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center' } }, h("ion-icon", { name: "close", color: "light" })))))))));
  }
};
AttachmentsGrid.style = attachmentsGridCss;

export { AttachmentsGrid as attachments_grid };
