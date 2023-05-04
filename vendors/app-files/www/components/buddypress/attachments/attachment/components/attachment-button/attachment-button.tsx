import { Component, Host, h } from '@stencil/core';
import { ApppAttachmentService } from '../../services/attachment-service';

@Component({
  tag: 'attachment-button',
  styleUrl: 'attachment-button.css',
})
export class AttachmentButton {

  private AttachmentService = new ApppAttachmentService();

  render() {
    return (
      <Host>
        <ion-button onClick={() => this.AttachmentService.promptAttachment()}><ion-icon name="camera" color="medium"></ion-icon></ion-button>
      </Host>
    );
  }

}
