import { Component, Host, h, ComponentInterface, Prop, Element } from '@stencil/core';
import { processTokens, processImage } from "../../helpers/tokens";

@Component({
  tag: 'acf-card',
  styleUrl: 'acf-card.css',
})
export class AcfCard implements ComponentInterface {

  @Element() el: HTMLElement;

  @Prop() data;
  @Prop() api;

  componentWillLoad() {

  }

  processRender() {

    const style = {
      background: '#efefef',
      backgroundImage: this.data.attrs.data.token ? `url(${ processImage( this.data.attrs.data.token, this.api ) })` :  `url(${ this.data.attrs.data.header_image })`,
      height: this.data.attrs.data.image_height + 'px',
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
    }

    return ( 
      <ion-card href="#">
        <div style={style}></div>
        <ion-card-header>
          <ion-card-subtitle>{ processTokens( this.data.attrs.data.sub_title, this.api) || this.data.attrs.data.sub_title }</ion-card-subtitle>
          <ion-card-title style={{fontSize: `${this.data.attrs.data.title_size}px`}} innerHTML={ processTokens( this.data.attrs.data.title, this.api) || this.data.attrs.data.title }></ion-card-title>
        </ion-card-header>

        { this.data.attrs.data.content !== '' &&<ion-card-content innerHTML= { processTokens( this.data.attrs.data.content, this.api) || this.data.attrs.data.content }>
        </ion-card-content> }
      </ion-card>
    );


  }
  

  render() {

    return (
      <Host>
      {this.data && this.processRender()}
      </Host>
    );
  }

}
