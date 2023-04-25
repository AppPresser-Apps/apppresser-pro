import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';

const apppAttachmentCss = "appp-attachment{display:block}";

const ApppAttachment = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
ApppAttachment.style = apppAttachmentCss;

export { ApppAttachment as appp_attachment };
