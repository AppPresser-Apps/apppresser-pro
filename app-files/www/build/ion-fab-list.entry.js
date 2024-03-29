import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { g as getIonMode } from './ionic-global-74a19eaa.js';

const fabListCss = ":host{margin-left:0;margin-right:0;margin-top:66px;margin-bottom:66px;display:none;position:absolute;top:0;flex-direction:column;align-items:center;min-width:56px;min-height:56px}:host(.fab-list-active){display:flex}::slotted(.fab-button-in-list){margin-left:0;margin-right:0;margin-top:8px;margin-bottom:8px;width:40px;height:40px;transform:scale(0);opacity:0;visibility:hidden}:host(.fab-list-side-top) ::slotted(.fab-button-in-list),:host(.fab-list-side-bottom) ::slotted(.fab-button-in-list){margin-left:0;margin-right:0;margin-top:5px;margin-bottom:5px}:host(.fab-list-side-start) ::slotted(.fab-button-in-list),:host(.fab-list-side-end) ::slotted(.fab-button-in-list){-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:5px;margin-inline-end:5px;margin-top:0;margin-bottom:0}::slotted(.fab-button-in-list.fab-button-show){transform:scale(1);opacity:1;visibility:visible}:host(.fab-list-side-top){top:auto;bottom:0;flex-direction:column-reverse}:host(.fab-list-side-start){-webkit-margin-start:66px;margin-inline-start:66px;-webkit-margin-end:66px;margin-inline-end:66px;margin-top:0;margin-bottom:0;flex-direction:row-reverse}@supports (inset-inline-start: 0){:host(.fab-list-side-start){inset-inline-end:0}}@supports not (inset-inline-start: 0){:host(.fab-list-side-start){right:0}:host-context([dir=rtl]):host(.fab-list-side-start),:host-context([dir=rtl]).fab-list-side-start{left:unset;right:unset;left:0}}:host(.fab-list-side-end){-webkit-margin-start:66px;margin-inline-start:66px;-webkit-margin-end:66px;margin-inline-end:66px;margin-top:0;margin-bottom:0;flex-direction:row}@supports (inset-inline-start: 0){:host(.fab-list-side-end){inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.fab-list-side-end){left:0}:host-context([dir=rtl]):host(.fab-list-side-end),:host-context([dir=rtl]).fab-list-side-end{left:unset;right:unset;right:0}}";

const FabList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.activated = false;
    this.side = 'bottom';
  }
  activatedChanged(activated) {
    const fabs = Array.from(this.el.querySelectorAll('ion-fab-button'));
    // if showing the fabs add a timeout, else show immediately
    const timeout = activated ? 30 : 0;
    fabs.forEach((fab, i) => {
      setTimeout(() => (fab.show = activated), i * timeout);
    });
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { class: {
        [mode]: true,
        'fab-list-active': this.activated,
        [`fab-list-side-${this.side}`]: true,
      } }, h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "activated": ["activatedChanged"]
  }; }
};
FabList.style = fabListCss;

export { FabList as ion_fab_list };
