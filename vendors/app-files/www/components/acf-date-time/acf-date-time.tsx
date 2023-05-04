import { Component, Host, h, ComponentInterface, Prop, State, Element } from '@stencil/core';

@Component({
  tag: 'acf-date-time',
  styleUrl: 'acf-date-time.css',
})
export class AcfDateTime implements ComponentInterface {

  @Element() host: HTMLElement;

  @Prop() data;

  // The value (one or multiple date strings).
  @State() dateStrings: string[] = [];

  // Cached values (used to prevent infinite date change events).
  currentDateStrings: string[] = [];

  componentWillLoad() {

  }

  dateChange(ev) {

    if ( 'ION-DATETIME' !== ev.target.tagName) {
      return;
    }

    if (this.data.attrs.data.code ) {

      var JS = document.createElement('script');
      JS.text = `async function dateTimeSubmit(data) { ${this.data.attrs.data.code} }`;
      document.body.appendChild(JS);

      setTimeout(() => {
        var fn = (window as any)['dateTimeSubmit'];
        if (typeof fn === "function") fn(ev.detail.value);
      }, 300);


    }

  }

  render() {
    return (
      <Host>
        <ion-datetime onIonChange={(e)=> this.dateChange(e)} presentation="date" multiple={true} showDefaultButtons={true}>
            <span slot="title">Select Appointment Date</span>
        </ion-datetime>
      </Host>
    );
  }

}
