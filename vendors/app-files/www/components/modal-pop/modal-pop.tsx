import { Component, Host, h, Element, ComponentInterface, Prop } from '@stencil/core';
import { modalController } from '@ionic/core';
import { state } from '../../services/store';

@Component({
  tag: 'modal-pop',
  styleUrl: 'modal-pop.css',
})
export class ModalPop implements ComponentInterface {

  @Element() el : HTMLElement;

  @Prop() modal;
  @Prop() direction = 'open';

  componentWillLoad() {
    this.el.onclick = ()=> {
      this.openModal();
    }
  }

  async openModal() {
    console.log('modal pop');

    const block = state.data['modals'].filter( (obj)=> {
      return obj.blockName === 'acf/modal' && obj.attrs.data.modal_name === this.modal;
    })
    .map(function(obj) {
      return obj;
    });
  
    const modal = await modalController.create({
      component: 'acf-modal',
      componentProps: {data: block[0], api: {}}
    });

    modal.present();

  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
