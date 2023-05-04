import { Component, Host, h, Prop } from '@stencil/core';
import { modalController } from '@ionic/core';

@Component({
  tag: 'attachments-scroller',
  styleUrl: 'attachments-scroller.css',
})
export class AttachmentsScroller {

  @Prop() items;

  componentWillLoad() {

  }

  async openAttachment(e, item) {
    e.stopPropagation();

    const modal = await modalController.create({
      component: 'attachment-modal',
      cssClass: 'attachment-modal',
      componentProps: { item : item }
    });
    await modal.present();
    

  }

  render() {
    return (
      <Host class="scroller">
        <div class="scroll-element-wrap">
        { this.items.map(item => (
            <div class="scroll-element" style={{'width': '210px', 'cursor': 'pointer'}} onClick={(e)=> this.openAttachment(e, item)}>
              <div class="scroll-element-image" style={{'background-image': `url(${ item })` }}>
              </div>
            </div>
        )) }
        <div style={{padding: '6px'}}></div>
        </div>
      </Host>
    );
  }

}
