import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { A as ApppAvatarService } from './appp-avatar-service-58e1fcfe.js';
import './index-b3330d71.js';
import './index-0b091f9f.js';
import './global-e1c7e609.js';
import './index-6dc587d2.js';
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

const apppAvatarButtonCss = "";

const ApppAvatarButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.apppAvatarService = new ApppAvatarService();
  }
  componentDidLoad() {
  }
  render() {
    return (h(Host, null, h("span", { style: { 'cursor': 'pointer' }, onClick: () => this.apppAvatarService.promptEditAvatar() }, h("slot", null))));
  }
  get el() { return getElement(this); }
};
ApppAvatarButton.style = apppAvatarButtonCss;

export { ApppAvatarButton as appp_avatar_button };
