import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';
import { P as Preferences } from './index-c532d7cb.js';
import './index-0f2ea1ed.js';
import './global-e1c7e609.js';

const apppAvatarCss = ":host{display:block}";

const ApppAvatar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.height = '30px';
    this.width = '30px';
    this.avatarUrl = undefined;
    this.displayName = undefined;
  }
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
    return (h(Host, null, h("ion-avatar", { slot: "start", style: { width: this.width, height: this.height } }, h("img", { src: this.avatarUrl }))));
  }
};
ApppAvatar.style = apppAvatarCss;

export { ApppAvatar as appp_avatar };
