import { Component, Host, h } from '@stencil/core';
import { AttachmentStore } from "../../services/state";

@Component({
  tag: 'attachments-grid',
  styleUrl: 'attachments-grid.css',
})
export class AttachmentsGrid {

  removeAttachment( image ) {
    const filtered = AttachmentStore.attachments.filter( item => image !== item );
    AttachmentStore.attachments = [...filtered];
  }

  formatImage(item) {
    return URL.createObjectURL(item);
  }

  render() {
    return (
      <Host>
        <div style={{'display': 'flex', 'padding': '15px 10px'}}>
        { AttachmentStore.attachments.map( item => (
          <div style={{'width': '120px', 'height': '120px', 'margin': '0 5px', 'border-radius': '6px', 'background-image': `url(${this.formatImage(item)})`, 'background-size': 'cover', 'background-position': 'center'}}>
            <div style={{'padding': '5px', 'height': '44px', 'width': '44px'}} onClick={() => this.removeAttachment(item)}>
              <div style={{'height': '18px', 'width': '18px', 'background-color': 'rgba(0,0,0, 0.5)', 'border-radius': '50%', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center'}}>
                <ion-icon name="close" color="light"></ion-icon>
              </div>
            </div>
          </div>
        ))}
        </div>
      </Host>
    );
  }

}
