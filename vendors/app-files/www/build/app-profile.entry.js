import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';
import { B as BuddyPressService } from './buddypress.service-877a70b5.js';
import { r as renderComponent } from './content-9f66df1d.js';
import './utils-2a278bd0.js';
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
import './index-6dc587d2.js';
import './index-0b091f9f.js';
import './global-e1c7e609.js';
import './actions-8b022832.js';
import './tokens-4662bc6d.js';

const appProfileCss = ":host{display:block}";

const AppProfile = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.spinner = true;
    this.data = undefined;
    this.props = undefined;
    this.api = undefined;
  }
  componentWillLoad() {
    this.service = new BuddyPressService({ url: this.data.attrs.data.url });
    this.getMembers();
  }
  async getMembers() {
    const members = await this.service.getMembers({ include: [this.props[':id']] });
    this.api = Object.assign({}, members[0]);
    this.spinner = false;
  }
  async reload(data) {
    this.api = Object.assign({}, data);
  }
  render() {
    return (h(Host, null, this.api && this.data.innerBlocks.map(item => (renderComponent(item, this.api)))));
  }
};
AppProfile.style = appProfileCss;

export { AppProfile as app_profile };
