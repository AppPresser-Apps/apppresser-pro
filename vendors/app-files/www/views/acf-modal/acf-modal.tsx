import { Component, Host, h, ComponentInterface, Prop } from '@stencil/core';
import { renderLeftButtons, renderRightButtons, renderTitle } from '../../helpers/toolbar';
import { renderComponent } from '../../helpers/content';
import { modalController } from '@ionic/core';

@Component({
  tag: 'acf-modal',
  styleUrl: 'acf-modal.css',
})
export class AcfModal implements ComponentInterface {

  @Prop() data;
  @Prop() api;

  componentWillLoad() {
    console.log('modal', this.data, this.api);
  }

  cancel() {
    modalController.dismiss(null, 'cancel');
  }

  confirm() {
    const input = document.querySelector('ion-input');
    modalController.dismiss(input.value, 'confirm');
  }

  render() {
    return (
      <Host>
      <ion-header>
        <ion-toolbar color={this.data && this.data.attrs.data.toolbar_color}>
       
          <ion-buttons slot="start">
            { this.data && this.data.attrs.data.left_buttons.length > 0 && this.data.attrs.data.left_buttons.map( button => (
              renderLeftButtons(button)
            ))}
          </ion-buttons>
          <ion-title>{this.data && renderTitle(this.data)}</ion-title>
          <ion-buttons slot="end">
            { this.data && this.data.attrs.data.right_buttons.length > 0 && this.data.attrs.data.right_buttons.map( button=> (
              renderRightButtons(button)
            ))}
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

        <ion-content color={ this.data && this.data.attrs.data.background}>
          { this.data && this.data.innerBlocks.map( block => (
              renderComponent(block, this.api)
          ))}

        </ion-content>
      </Host>
    );
  }

}
