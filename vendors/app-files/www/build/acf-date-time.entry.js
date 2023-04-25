import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';

const acfDateTimeCss = ":host{display:block}";

const AcfDateTime = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // Cached values (used to prevent infinite date change events).
    this.currentDateStrings = [];
    this.data = undefined;
    this.dateStrings = [];
  }
  componentWillLoad() {
  }
  dateChange(ev) {
    if ('ION-DATETIME' !== ev.target.tagName) {
      return;
    }
    if (this.data.attrs.data.code) {
      var JS = document.createElement('script');
      JS.text = `async function dateTimeSubmit(data) { ${this.data.attrs.data.code} }`;
      document.body.appendChild(JS);
      setTimeout(() => {
        var fn = window['dateTimeSubmit'];
        if (typeof fn === "function")
          fn(ev.detail.value);
      }, 300);
    }
  }
  render() {
    return (h(Host, null, h("ion-datetime", { onIonChange: (e) => this.dateChange(e), presentation: "date", multiple: true, showDefaultButtons: true }, h("span", { slot: "title" }, "Select Appointment Date"))));
  }
  get host() { return getElement(this); }
};
AcfDateTime.style = acfDateTimeCss;

export { AcfDateTime as acf_date_time };
