import { Component, Host, h, Prop, State, Method } from '@stencil/core';
import { BuddyPressService } from '../../services/buddypress.service';
import { renderComponent } from '../../../../helpers/content';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
})
export class AppProfile {

  @Prop() data;
  @Prop() props;
  @State() api;

  private service;

  spinner = true

  componentWillLoad() {
    this.service = new BuddyPressService({url: this.data.attrs.data.url})
    this.getMembers();
  }

  async getMembers() {
    const members = await this.service.getMembers({include: [this.props[':id']]});
    this.api = {...members[0]};
    this.spinner = false;
  }

  @Method()
  async reload(data) {
    this.api = {...data};
  }

  render() {
    return (
      <Host>
        { this.api && this.data.innerBlocks.map( item => (
              renderComponent(item, this.api)
            ) )
        }
      </Host>
    );
  }

}
