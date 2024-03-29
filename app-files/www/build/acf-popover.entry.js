import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';
import { r as renderComponent } from './content-9488f805.js';
import './actions-21958fd0.js';
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
import './tokens-e7de6c68.js';

const acfPopoverCss = ":host{display:block}";

const AcfPopover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.data = undefined;
  }
  componentWillLoad() {
    console.log('popover', this.data);
  }
  dismissPopover(_e) {
    const pop = document.querySelector('ion-popover');
    pop.dismiss();
  }
  render() {
    return (h(Host, null, h("ion-content", null, this.data && this.data.innerBlocks.map(block => (renderComponent(block))))));
  }
};
AcfPopover.style = acfPopoverCss;

export { AcfPopover as acf_popover };
