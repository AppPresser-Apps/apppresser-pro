import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { g as getIonMode } from './ionic-global-74a19eaa.js';

const listIosCss = "ion-list{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:block;contain:content;list-style-type:none}ion-list.list-inset{transform:translateZ(0);overflow:hidden}.list-ios{background:var(--ion-item-background, var(--ion-background-color, #fff))}.list-ios.list-inset{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:16px;margin-bottom:16px;border-radius:10px}.list-ios.list-inset ion-item:last-child{--border-width:0;--inner-border-width:0}.list-ios.list-inset+ion-list.list-inset{margin-top:0}.list-ios-lines-none .item-lines-default{--inner-border-width:0px;--border-width:0px}.list-ios-lines-full .item-lines-default{--inner-border-width:0px;--border-width:0 0 0.55px 0}.list-ios-lines-inset .item-lines-default{--inner-border-width:0 0 0.55px 0;--border-width:0px}ion-card .list-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}";

const listMdCss = "ion-list{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:block;contain:content;list-style-type:none}ion-list.list-inset{transform:translateZ(0);overflow:hidden}.list-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:8px;padding-bottom:8px;background:var(--ion-item-background, var(--ion-background-color, #fff))}@supports (inset-inline-start: 0){.list-md>.input:last-child::after{inset-inline-start:0}}@supports not (inset-inline-start: 0){.list-md>.input:last-child::after{left:0}[dir=rtl] .list-md>.input:last-child::after,:host-context([dir=rtl]) .list-md>.input:last-child::after{left:unset;right:unset;right:0}}.list-md.list-inset{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:16px;margin-bottom:16px;border-radius:2px}.list-md.list-inset ion-item:first-child{--border-radius:2px 2px 0 0}.list-md.list-inset ion-item:last-child{--border-radius:0 0 2px, 2px;--border-width:0;--inner-border-width:0}.list-md.list-inset+ion-list.list-inset{margin-top:0}.list-md-lines-none .item-lines-default{--inner-border-width:0px;--border-width:0px}.list-md-lines-full .item-lines-default{--inner-border-width:0px;--border-width:0 0 1px 0}.list-md-lines-inset .item-lines-default{--inner-border-width:0 0 1px 0;--border-width:0px}ion-card .list-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}";

const List = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.lines = undefined;
    this.inset = false;
  }
  /**
   * If `ion-item-sliding` are used inside the list, this method closes
   * any open sliding item.
   *
   * Returns `true` if an actual `ion-item-sliding` is closed.
   */
  async closeSlidingItems() {
    const item = this.el.querySelector('ion-item-sliding');
    if (item === null || item === void 0 ? void 0 : item.closeOpened) {
      return item.closeOpened();
    }
    return false;
  }
  render() {
    const mode = getIonMode(this);
    const { lines, inset } = this;
    return (h(Host, { role: "list", class: {
        [mode]: true,
        // Used internally for styling
        [`list-${mode}`]: true,
        'list-inset': inset,
        [`list-lines-${lines}`]: lines !== undefined,
        [`list-${mode}-lines-${lines}`]: lines !== undefined,
      } }));
  }
  get el() { return getElement(this); }
};
List.style = {
  ios: listIosCss,
  md: listMdCss
};

export { List as ion_list };
