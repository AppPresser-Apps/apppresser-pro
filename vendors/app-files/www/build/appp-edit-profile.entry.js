import { r as registerInstance, t as createEvent, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { B as BuddyPressService } from './buddypress.service-c2cdbfd6.js';
import './index-7c8dd725.js';
import { P as Preferences } from './index-6dc587d2.js';
import { t as toastController } from './overlays-ef00d22b.js';
import './utils-d99cd4f7.js';
import './store-b76a13b4.js';
import './index-7106c220.js';
import './utils-31c050e6.js';
import './animation-6410f855.js';
import './helpers-6885e51a.js';
import './index-5aa6aa3e.js';
import './ios.transition-f8c322b0.js';
import './index-0fa2abb2.js';
import './md.transition-131fa152.js';
import './cubic-bezier-1ddfda32.js';
import './index-20a27e5b.js';
import './ionic-global-74a19eaa.js';
import './config-af47d636.js';
import './index-ed30b664.js';
import './hardware-back-button-fa04d6e9.js';
import './index-0b091f9f.js';
import './global-e1c7e609.js';
import './framework-delegate-c3343c4d.js';
import './index-2ee22356.js';

const apppEditProfileCss = ":host{display:block}appp-edit-profile .in-item{max-width:100% !important}";

const ApppEditProfile = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.todoCompleted = createEvent(this, "profileSaved", 7);
    this.spinner = false;
    // TO-DO: refator this, its hard to understand
    this.fieldMapping = {
      'textbox': (props) => h("ion-input", Object.assign({}, this.textboxType(props), props)),
      'url': (props) => h("ion-input", Object.assign({}, props)),
      'telephone': (props) => h("ion-input", Object.assign({ type: 'tel', pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}", inputMode: 'tel' }, props)),
      'number': (props) => h("ion-input", Object.assign({ inputMode: 'numeric', pattern: "[0-9]*", type: "number" }, props)),
      'textarea': (props) => h("ion-textarea", Object.assign({}, props)),
      'radio': (props) => h("ion-radio-group", Object.assign({}, props, { value: props.value[0] }), props.options.map(option => h("ion-item", { lines: "none" }, h("ion-label", null, option.name), h("ion-radio", { value: option.name })))),
      'multiselectbox': (props) => h("ion-select", Object.assign({ multiple: true }, props), props.options.map(option => h("ion-select-option", { value: option.name }, option.name))),
      'selectbox': (props) => h("ion-select", Object.assign({}, props, { value: props.value[0] }), props.options.map(option => h("ion-select-option", { value: option.name }, option.name))),
      'membertype': (props) => h("ion-select", Object.assign({}, props, { value: props.value[0] }), props.options.map(option => h("ion-select-option", { value: option.name }, option.name))),
      'checkbox': (props) => props.options.map(option => [
        h("ion-item", { lines: "none" }, h("ion-label", null, option.name), h("ion-checkbox", { onIonChange: (({ detail }) => {
            if (!props.field._change) {
              props.field._change = props.field.data.value.unserialized;
            }
            if (!detail.checked) {
              props.field._change = (props.field._change || []).filter(c => c !== option.name);
            }
            else {
              props.field._change = [...(props.field._change || []), option.name];
            }
          }), checked: props.value.indexOf(option.name) > -1 }))
      ])
    };
    this.data = undefined;
    this.fields = undefined;
    this.info = undefined;
  }
  componentWillLoad() {
    this.service = new BuddyPressService({ url: this.data.attrs.data.url });
    this.loadFields();
    this.loadInfo();
  }
  async loadInfo() {
    this.info = {};
  }
  profileSavedHandler(event) {
    this.todoCompleted.emit(event);
  }
  async profileAlert(fields) {
    const hasBeenViewed = (await Preferences.get({ key: 'hasBeenViewed' })).value;
    if (hasBeenViewed) {
      return;
    }
    const name = fields.filter(field => field.name === 'Name')[0].data.value.raw;
    const alert = document.createElement('ion-alert');
    alert.header = 'Hello, ' + name;
    alert.message = 'Please make sure profile info is correct.';
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    await alert.present();
    await Preferences.set({ key: 'hasBeenViewed', value: '1' });
  }
  async loadFields() {
    this.spinner = true;
    let fields = await this.service.getProfileFields();
    const exclude = this.data.attrs.data.exclude.split(',');
    fields = fields.filter(item => !exclude.includes(item.name));
    if (fields) {
      this.fields = [...fields];
      this.profileAlert(fields);
      console.log(this.fields);
    }
    this.spinner = false;
  }
  async save() {
    const fieldsThatChanged = this.fields.filter(field => {
      const hasChangeProperty = field.hasOwnProperty('_change');
      const [originalValue] = field.data.value.unserialized;
      return hasChangeProperty && !this.checkEqual(originalValue, field._change);
    });
    console.log('Updating the following fields', fieldsThatChanged.map(field => ({ name: field.name, value: field._change })));
    this.el.querySelector('ion-button').disabled = true;
    const requests = await Promise.all(fieldsThatChanged.map(field => {
      // If null, undefined or empty array, we'll delete
      if (field._change === null || field._change === undefined || (Array.isArray(field._change) && !field._change.length)) {
        return this.service.deleteProfileData(field.id);
      }
      return this.service.saveProfileData(field.id, field._change);
    })).catch(async (err) => {
      console.error('Error updating profile data', err);
      const toast = await toastController.create({ message: `There was an error updating your profile, please try again.`, duration: 3000, position: 'bottom' });
      toast.present();
    });
    // All successful
    if (requests) {
      this.profileSavedHandler(this.fields);
      await this.loadFields();
      const toast = await toastController.create({ message: `Profile updated with success.`, duration: 3000, position: 'top', color: 'dark' });
      toast.present();
      this.successMethod(this.data.attrs.data.javascript, this.fields);
    }
    this.el.querySelector('ion-button').disabled = false;
  }
  // Runs javascript code after profile saved;
  async successMethod(code, data) {
    if (code !== '') {
      const method = new Function('data', code);
      await method(data);
    }
  }
  // Quick way to compare inputs (it can be arrays)
  checkEqual(value1, value2) {
    if (Array.isArray(value1)) {
      return JSON.stringify(value1) === JSON.stringify(value2);
    }
    return value1 === value2;
  }
  textboxType(props) {
    switch (props.field.name) {
      case 'Email':
        return { type: 'email', inputmode: 'email', pattern: '^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$' };
      default:
        return { type: 'text' };
    }
  }
  render() {
    return (h(Host, null, h("ion-list", null, this.spinner && h("ion-spinner", null), this.fields && this.fields.map(field => {
      // Get the functional template from the field type
      const FieldFunctionalTemplate = this.fieldMapping[field.type];
      if (FieldFunctionalTemplate) {
        // If it has options it probably accepts arrays, so let's pass
        const value = field.options.length ? field.data.value.unserialized : field.data.value.unserialized[0];
        return h("ion-item", null, h("ion-label", { position: "stacked" }, field.name, ":"), h("div", { style: { 'max-width': '100%', 'width': '100%', 'color': 'rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.8)' } }, h(FieldFunctionalTemplate, { options: field.options, field: field, value: value, onIonChange: ({ detail }) => field._change = detail.value })));
      }
      else {
        console.warn(`No template found for profile field type ${field.type}`, field);
      }
    })), this.fields && h("div", { class: "ion-padding" }, h("ion-button", { onClick: () => this.save(), color: "primary", expand: "block" }, "Save changes"))));
  }
  get el() { return getElement(this); }
};
ApppEditProfile.style = apppEditProfileCss;

export { ApppEditProfile as appp_edit_profile };
