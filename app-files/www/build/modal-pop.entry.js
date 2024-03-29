import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import './index-7c8dd725.js';
import { s as state } from './store-a75d6c94.js';
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
import './index-7106c220.js';
import './framework-delegate-c3343c4d.js';
import './index-2ee22356.js';

const modalPopCss = "";

const ModalPop = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.modal = undefined;
    this.direction = 'open';
  }
  componentWillLoad() {
    this.el.onclick = () => {
      this.openModal();
    };
  }
  async openModal() {
    console.log('modal pop');
    const block = state.data['modals'].filter((obj) => {
      return obj.blockName === 'acf/modal' && obj.attrs.data.modal_name === this.modal;
    })
      .map(function (obj) {
      return obj;
    });
    const modal = await modalController.create({
      component: 'acf-modal',
      componentProps: { data: block[0], api: {} }
    });
    modal.present();
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  get el() { return getElement(this); }
};
ModalPop.style = modalPopCss;

export { ModalPop as modal_pop };
