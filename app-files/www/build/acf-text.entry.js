import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { p as processTokens } from './tokens-e7de6c68.js';
import { f as formatText } from './utils-9417d402.js';
import './global-e1c7e609.js';
import './store-a75d6c94.js';
import './index-7106c220.js';
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

const acfTextCss = ":host{display:block}";

const AcfText = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.data = undefined;
    this.api = undefined;
  }
  componentWillLoad() {
  }
  processRender() {
    const attr = this.data.attrs.data;
    const style = {
      margin: '0px',
      paddingTop: attr.padding_padding_top + 'px',
      paddingBottom: attr.padding_padding_bottom + 'px',
      paddingLeft: attr.padding_padding_left + 'px',
      paddingRight: attr.padding_padding_right + 'px',
      fontSize: attr.font_size + 'px',
      fontWeight: attr.font_weight,
      fontStyle: attr.font_style,
      textAlign: attr.alignment,
      textShadow: `${attr.text_shadow_y_coord}px ${attr.text_shadow_x_coord}px ${attr.text_shadow_blur}px ${attr.text_shadow_text_shadow_color}`,
      color: `var(--ion-color-${attr.color})`,
      backgroundColor: `var(--ion-color-${attr.background})`,
      //whiteSpace: 'pre-wrap'
    };
    const text = processTokens(attr.text, this.api) || attr.text;
    return (h("div", { style: style, innerHTML: formatText(attr, text) }));
  }
  render() {
    return (h(Host, null, this.data && this.processRender()));
  }
  get el() { return getElement(this); }
};
AcfText.style = acfTextCss;

export { AcfText as acf_text };
