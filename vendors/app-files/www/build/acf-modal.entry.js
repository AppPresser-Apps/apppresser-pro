import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';
import { r as renderLeftButtons, a as renderTitle, b as renderRightButtons } from './toolbar-a90bf1b5.js';
import { r as renderComponent } from './content-76200983.js';
import './index-7c8dd725.js';
import { m as modalController } from './overlays-ef00d22b.js';
import './actions-d2c0e63a.js';
import './utils-d99cd4f7.js';
import './store-b76a13b4.js';
import './index-7106c220.js';
import './index-6dc587d2.js';
import './index-0b091f9f.js';
import './global-e1c7e609.js';
import './tokens-4662bc6d.js';
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

const acfModalCss = ":host{display:block}";

const AcfModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.data = undefined;
    this.api = undefined;
  }
  componentWillLoad() {
    console.log('modal', this.data, this.api);
  }
  cancel() {
    modalController.dismiss(null, 'cancel');
  }
  confirm() {
    const input = document.querySelector('ion-input');
    modalController.dismiss(input.value, 'confirm');
  }
  render() {
    return (h(Host, null, h("ion-header", null, h("ion-toolbar", { color: this.data && this.data.attrs.data.toolbar_color }, h("ion-buttons", { slot: "start" }, this.data && this.data.attrs.data.left_buttons.length > 0 && this.data.attrs.data.left_buttons.map(button => (renderLeftButtons(button)))), h("ion-title", null, this.data && renderTitle(this.data)), h("ion-buttons", { slot: "end" }, this.data && this.data.attrs.data.right_buttons.length > 0 && this.data.attrs.data.right_buttons.map(button => (renderRightButtons(button)))))), h("ion-content", { color: this.data && this.data.attrs.data.background }, this.data && this.data.innerBlocks.map(block => (renderComponent(block, this.api))))));
  }
};
AcfModal.style = acfModalCss;

export { AcfModal as acf_modal };
