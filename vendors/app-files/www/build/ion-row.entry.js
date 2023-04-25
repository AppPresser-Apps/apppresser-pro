import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';
import { g as getIonMode } from './ionic-global-74a19eaa.js';

const rowCss = ":host{display:flex;flex-wrap:wrap}";

const Row = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { class: getIonMode(this) }, h("slot", null)));
  }
};
Row.style = rowCss;

export { Row as ion_row };
