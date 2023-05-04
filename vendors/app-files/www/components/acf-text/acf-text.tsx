import { Component, Host, h, ComponentInterface, Element, Prop } from '@stencil/core';
import { processTokens } from "../../helpers/tokens";
import { formatText } from '../../helpers/utils';

@Component({
  tag: 'acf-text',
  styleUrl: 'acf-text.css',
})
export class AcfText implements ComponentInterface {

  @Element() el: HTMLElement;

  @Prop() data;
  @Prop() api;

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
    }

    const text = processTokens( attr.text, this.api) || attr.text;

    return (
        
        <div style={style} innerHTML={ formatText(attr, text) }></div>
        
    )
}

  render() {
    return (
      <Host>
        {this.data && this.processRender()}
      </Host>
    );
  }

}
