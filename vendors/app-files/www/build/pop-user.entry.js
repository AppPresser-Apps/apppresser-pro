import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';
import { P as Preferences } from './index-6dc587d2.js';
import './index-0b091f9f.js';
import './global-e1c7e609.js';

const popUserCss = "pop-user{display:block}";

const PopUser = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async getUser() {
    const userData = (await Preferences.get({ key: 'auth' })).value;
    this.user = JSON.parse(userData);
  }
  dismiss() {
    document.querySelector('ion-popover').dismiss({
      'dismissed': true
    });
  }
  render() {
    return (h(Host, null, h("ion-list", null, h("ion-item", { href: '/members/' + this.user.user_login, onClick: () => this.dismiss() }, h("ion-label", null, "Profile")), h("ion-item", { href: "/members/settings", onClick: () => this.dismiss() }, h("ion-label", null, "Account Settings")))));
  }
};
PopUser.style = popUserCss;

export { PopUser as pop_user };
