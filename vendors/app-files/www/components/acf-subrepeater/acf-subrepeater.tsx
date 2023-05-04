import { Component, Host, h, ComponentInterface, Prop, State } from '@stencil/core';
import { renderComponent } from '../../helpers/content';

@Component({
  tag: 'acf-subrepeater',
  styleUrl: 'acf-subrepeater.css',
})
export class AcfSubrepeater implements ComponentInterface {

  @Prop() data;
  @Prop() api;

  @State() items;

  componentWillLoad() {
    this.processData();
  }

  processData() {

    const attr = this.data.attrs.data;

    if ('token' === attr.type) {

      if (attr.token) {
        attr.token.replace(/\{{(.*?)}}/g, (_a, b)=> {
          if ( '' !== b ) {
            this.items = [...this.api[b]];
          }
        });
      }

    }

    if ('coded' === attr.type && attr.coded.length) {
      this.items = [...attr.coded];
    }

  }

  render() {
    return (
      <Host>
         {this.items && this.items.map( item => [
            this.data.innerBlocks.map( block => (
              renderComponent(block, item)
            ))
          ])}
      </Host>
    );
  }

}
