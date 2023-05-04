import { Component, Host, h } from '@stencil/core';
import { Preferences } from "@capacitor/preferences";
//import { state } from '../../../../services/store';

@Component({
  tag: 'pop-user',
  styleUrl: 'pop-user.css',
})
export class PopUser {

  user;

  async getUser() {
    const userData = (await Preferences.get({key: 'auth'})).value;
    this.user = JSON.parse(userData);
  }

  dismiss() {
    document.querySelector('ion-popover').dismiss({
      'dismissed': true
    });
  }

  render() {
    return (
      <Host>
        <ion-list>
          <ion-item href={ '/members/' + this.user.user_login} onClick={()=> this.dismiss()}>
            <ion-label>Profile</ion-label>
          </ion-item>
          <ion-item href="/members/settings" onClick={()=> this.dismiss()}>
            <ion-label>Account Settings</ion-label>
          </ion-item>
          {/* <ion-item href={'/messages/'} onClick={()=> this.dismiss()}>
            <ion-label>Messages</ion-label>
          </ion-item> */}
        </ion-list>
      </Host>
    );
  }

}
