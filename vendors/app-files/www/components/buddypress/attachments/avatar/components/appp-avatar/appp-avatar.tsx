import { Component, Host, h, State, Prop } from '@stencil/core';
import { Preferences } from "@capacitor/preferences";
//import { state } from '../../../../../../services/store';

@Component({
  tag: 'appp-avatar',
  styleUrl: 'appp-avatar.css',
})
export class ApppAvatar {

  @Prop() height: string = '30px';
  @Prop() width: string = '30px';
  @State() avatarUrl: string;
  @State() displayName: string;

  componentWillLoad() {
    this.loadProperties();

    // storeChange('user', (data) => {
    //   console.log(data);
    //   this.loadProperties();
    // })
  }

  async loadProperties() {
    const userData = (await Preferences.get({ key: 'auth' })).value;
    const user = JSON.parse(userData);
    this.avatarUrl = user.avatar_urls.thumb;
    this.displayName = user.user_display_name;
  }

  render() {
    return (
      <Host>
        <ion-avatar slot="start" style={{width: this.width, height: this.height}}>
          <img src={this.avatarUrl}></img>
        </ion-avatar>
      </Host>
    );
  }

}
