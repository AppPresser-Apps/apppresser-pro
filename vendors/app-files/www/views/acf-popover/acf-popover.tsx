import { Component, ComponentInterface, Host, h, Prop, Listen } from '@stencil/core';
import { renderComponent } from '../../helpers/content';

@Component({
  tag: 'acf-popover',
  styleUrl: 'acf-popover.css',
})
export class AcfPopover implements ComponentInterface {

  @Prop() data;

  componentWillLoad() {
    console.log('popover', this.data);
  }

  @Listen('ionRouteDidChange', {target: 'window'})
  dismissPopover(_e) {
    const pop = document.querySelector('ion-popover');
    pop.dismiss();
  }

 
  render() {
    return (
      <Host>
          <ion-content>
          { this.data && this.data.innerBlocks.map( block => (
              renderComponent(block)
          ))}
        </ion-content>
      </Host>
    );
  }

}
