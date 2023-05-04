import { Component, Host, h, Element } from '@stencil/core';
import { ApppAvatarService } from '../../services/appp-avatar-service';

@Component({
  tag: 'appp-avatar-button',
  styleUrl: 'appp-avatar-button.css',
})
export class ApppAvatarButton {

  private apppAvatarService = new ApppAvatarService();
  @Element() el: HTMLElement;

  componentDidLoad() {
  }

  render() {
    return (
      <Host>
        <span style={{'cursor': 'pointer'}} onClick={() => this.apppAvatarService.promptEditAvatar()}>
          <slot></slot>
        </span>

      </Host>
    );
  }

}
