import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'appp-attachment',
  styleUrl: 'appp-attachment.css',
})
export class ApppAttachment {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
