import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { a as processImage, p as processTokens } from './tokens-e7de6c68.js';
import './global-e1c7e609.js';
import './store-a75d6c94.js';
import './index-7106c220.js';

const acfCardCss = ":host{display:block}";

const AcfCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.data = undefined;
    this.api = undefined;
  }
  componentWillLoad() {
  }
  processRender() {
    const style = {
      background: '#efefef',
      backgroundImage: this.data.attrs.data.token ? `url(${processImage(this.data.attrs.data.token, this.api)})` : `url(${this.data.attrs.data.header_image})`,
      height: this.data.attrs.data.image_height + 'px',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
    return (h("ion-card", { href: "#" }, h("div", { style: style }), h("ion-card-header", null, h("ion-card-subtitle", null, processTokens(this.data.attrs.data.sub_title, this.api) || this.data.attrs.data.sub_title), h("ion-card-title", { style: { fontSize: `${this.data.attrs.data.title_size}px` }, innerHTML: processTokens(this.data.attrs.data.title, this.api) || this.data.attrs.data.title })), this.data.attrs.data.content !== '' && h("ion-card-content", { innerHTML: processTokens(this.data.attrs.data.content, this.api) || this.data.attrs.data.content })));
  }
  render() {
    return (h(Host, null, this.data && this.processRender()));
  }
  get el() { return getElement(this); }
};
AcfCard.style = acfCardCss;

export { AcfCard as acf_card };
