import { Component, ComponentInterface, Host, h, Prop, State, Element } from '@stencil/core';
import { processValue } from '../../helpers/tokens';

@Component({
  tag: 'app-iframe',
  styleUrl: 'app-iframe.css',
})
export class AppIframe implements ComponentInterface {

  @Element() el: HTMLElement;

  @Prop() data;
  @State() loading = true;

  @State() url;

  componentWillLoad(): void | Promise<void> {
    this.processURL();
  }

  // Runs javascript code.
  async runCode(e, code) {
    if ( code !== '' ) {
      const method = new Function('iframe', 'appp', 'bp', code);
      await method(e, (window as any).appp, (window as any).bp);
    } 
  }

  processURL() {

    const obj = this.data.url_parameters;
    let newObj = {};

    let url = this.data.url;

    // TODO: Rework this how mess. 
    // Redo objectToUrlParams to use url.searchParams.set, this will fix 
    // issue if user adds param to url in iframe an then adds the same param in the parameters field

    const urlvalues = url.split(' : ');
    if ( urlvalues.length && urlvalues.length >= 2 ) {
      url = processValue( urlvalues[0], urlvalues[1]  );
    }

    console.log(url)

    Object.keys(obj).map((elm) => {

      if ( obj[elm] ) {
      
        const values = obj[elm].split(' : ');

        if ( values.length && values.length >= 2 ) {
          newObj[elm] = processValue( values[0], values[1] + ' : ' + values[2] );
        } else {
          newObj[elm] = obj[elm];
        }

      } 
    
    });

    Object.keys(newObj).map( (item) => {
      console.log(url)
      url = new URL(url);
      url.searchParams.set(item, newObj[item]);
    });

    this.url = url;

    this.el.style.height = `${this.data.height || 100}vh`;

    const iframe = document.createElement('iframe');

    iframe.src = this.url;
    iframe.style.height = `${this.data.height || 100}vh`;
    iframe.style.display = 'none';
    iframe.style.border = 'none';
  
    this.el.append(iframe);

    iframe.onload = (e)=> {
      console.log(e)
      this.runCode(e, this.data.onload);
      (e.target as any).style.display = 'block';

      this.loading = false;
    }
  }

  render() {
    return (
      <Host>
        { this.loading && <ion-spinner></ion-spinner>}
      </Host>
    );
  }

}
