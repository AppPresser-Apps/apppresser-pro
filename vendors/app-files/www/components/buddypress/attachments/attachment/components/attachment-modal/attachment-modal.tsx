import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'attachment-modal',
  styleUrl: 'attachment-modal.css',
})
export class AttachmentModal {

  @Prop() item;
  @Element() el: HTMLElement; 

  dismiss() {
    (this.el.closest('ion-modal') as any).dismiss({
      'dismissed': true
    });
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
          <ion-buttons slot="start">
              <ion-button onClick={()=> this.dismiss()}>
                <ion-icon slot="icon-only" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title></ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content color="darkly">
          <div style={{'height': '100%', 'display': 'flex', 'align-items': 'center'}}><img style={{'width': '100%'}} src={this.item} /></div>
        </ion-content>       
      </Host>
    );
  }

}
