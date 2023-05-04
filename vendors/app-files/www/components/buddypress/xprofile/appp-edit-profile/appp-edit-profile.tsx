import { Component, Host, h, State, Element, Event, EventEmitter, Prop } from '@stencil/core';
import { BuddyPressService } from '../../services/buddypress.service';
import { toastController } from '@ionic/core';
import { Preferences } from '@capacitor/preferences';
//import { App } from '@capacitor/app';
import { FunctionalComponent } from '@ionic/core/dist/types/stencil-public-runtime';

@Component({
  tag: 'appp-edit-profile',
  styleUrl: 'appp-edit-profile.css',
})
export class ApppEditProfile {

  @Element() el: HTMLElement;

  @Prop() data;
  @State() fields: any;
  @State() info;

  private service;

  spinner = false;

  componentWillLoad() {
    this.service = new BuddyPressService({url: this.data.attrs.data.url})
    this.loadFields();
    this.loadInfo();
  }

  async loadInfo() {
    this.info = {};
  }

  @Event({
    eventName: 'profileSaved',
    composed: true,
    bubbles: true,
  }) todoCompleted: EventEmitter;

  profileSavedHandler(event) {
    this.todoCompleted.emit(event);
  }

  async profileAlert(fields) {

    const hasBeenViewed = (await Preferences.get({key: 'hasBeenViewed'})).value;

    if ( hasBeenViewed ) { return ;}

    const name = fields.filter( field => field.name === 'Name' )[0].data.value.raw;

    const alert = document.createElement('ion-alert');
    alert.header = 'Hello, ' + name;
    alert.message = 'Please make sure profile info is correct.';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();

    await Preferences.set({key: 'hasBeenViewed', value: '1'});
  }

  async loadFields() {

    this.spinner = true;

    let fields = await this.service.getProfileFields();

    const exclude = this.data.attrs.data.exclude.split(',');

    fields = fields.filter( item => !exclude.includes(item.name) );

    if ( fields ) {
      this.fields = [...fields];
      this.profileAlert(fields);
      console.log(this.fields)
    }
 
    this.spinner = false;
  }

  async save() {
    const fieldsThatChanged = this.fields.filter(field => {
      const hasChangeProperty = (field as Object).hasOwnProperty('_change');
      const [originalValue] = field.data.value.unserialized;
      return hasChangeProperty && !this.checkEqual(originalValue, field._change);
    });

    console.log('Updating the following fields', fieldsThatChanged.map(field => ({ name: field.name, value: field._change})));

    this.el.querySelector('ion-button').disabled = true;

    const requests = await Promise.all(fieldsThatChanged.map(field => {
      // If null, undefined or empty array, we'll delete
      if (field._change === null || field._change === undefined || (Array.isArray(field._change) && !field._change.length)) {
        return this.service.deleteProfileData(field.id);
      }
      return this.service.saveProfileData(field.id, field._change);
    })).catch(async (err) => {
      console.error('Error updating profile data', err);
      const toast = await toastController.create({ message: `There was an error updating your profile, please try again.`, duration: 3000, position: 'bottom'})
      toast.present();
    });

    // All successful
    if (requests) {
      this.profileSavedHandler(this.fields);
      await this.loadFields();
      const toast = await toastController.create({ message: `Profile updated with success.`, duration: 3000, position: 'top', color: 'dark'})
      toast.present();

      this.successMethod(this.data.attrs.data.javascript, this.fields);
    }

    this.el.querySelector('ion-button').disabled = false;

  }

  // Runs javascript code after profile saved;
  async successMethod(code, data) {
    if ( code !== '' ) {
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
        return {type:'email', inputmode: 'email', pattern: '^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$'};
    
      default:
        return {type:'text'};
    }
    
  }

  // TO-DO: refator this, its hard to understand
  fieldMapping: { [key: string]: (props) => FunctionalComponent<any> } = {
    'textbox': (props) => <ion-input {...this.textboxType(props)} {...props}></ion-input>,
    'url': (props) => <ion-input {...props}></ion-input>,
    'telephone': (props) => <ion-input type='tel' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" inputMode='tel' {...props}></ion-input>,
    'number': (props) => <ion-input inputMode='numeric' pattern="[0-9]*" type="number" {...props}></ion-input>,
    'textarea': (props) => <ion-textarea {...props}></ion-textarea>,
    'radio': (props) => <ion-radio-group {...props} value={props.value[0]}>
      {props.options.map(option => <ion-item lines="none">
        <ion-label>{option.name}</ion-label>
        <ion-radio value={option.name}></ion-radio>
      </ion-item>)}
    </ion-radio-group>,
    'multiselectbox': (props) => <ion-select multiple {...props}>
      {props.options.map(option => <ion-select-option value={option.name}>{option.name}</ion-select-option>)}
    </ion-select>,
    'selectbox': (props) => <ion-select {...props} value={props.value[0]}>
      {props.options.map(option => <ion-select-option value={option.name}>{option.name}</ion-select-option>)}
    </ion-select>,
    'membertype': (props) => <ion-select {...props} value={props.value[0]}>
      {props.options.map(option => <ion-select-option value={option.name}>{option.name}</ion-select-option>)}
    </ion-select>,
    'checkbox': (props) => props.options.map(option => [
      <ion-item lines="none">
      <ion-label>{option.name}</ion-label>
      <ion-checkbox onIonChange={(({detail}) =>{
        if (!props.field._change) {
          props.field._change = props.field.data.value.unserialized;
        }
        if (!detail.checked) {
          props.field._change = (props.field._change || []).filter(c => c !== option.name);
        } else {
          props.field._change = [...(props.field._change || []), option.name];
        }
      })} checked={props.value.indexOf(option.name) > -1}></ion-checkbox>
      </ion-item>
    ])
  }

  render() {
    return (
      <Host>
          <ion-list>
            { this.spinner && <ion-spinner></ion-spinner> }
            { this.fields && this.fields.map( field => {

                  // Get the functional template from the field type
                  const FieldFunctionalTemplate = this.fieldMapping[field.type];

                  if (FieldFunctionalTemplate) {

                    // If it has options it probably accepts arrays, so let's pass
                    const value = field.options.length ? field.data.value.unserialized : field.data.value.unserialized[0];

                    return <ion-item>
                      <ion-label position="stacked">{field.name}:</ion-label>
                      <div style={{'max-width': '100%', 'width': '100%', 'color': 'rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.8)'}}>
                        <FieldFunctionalTemplate
                        options={field.options}
                        field={field}
                        value={value}
                        onIonChange={({detail}) => field._change = detail.value} />
                      </div>
                    </ion-item>;

                  } else {
                    console.warn(`No template found for profile field type ${field.type}`, field);
                  }
                })
            }
          </ion-list>
          { this.fields && <div class="ion-padding"><ion-button onClick={() => this.save()} color="primary" expand="block">Save changes</ion-button></div> }   
      </Host>
    );
  }

}
