import { Component, ComponentInterface, h, Prop, State, getAssetPath } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot implements ComponentInterface {

  @Prop() url: string;
  @Prop() appUrl: string;

  @State() mode: string = 'ios';

  componentWillLoad() {
    console.log(this.url);
    console.log(this.appUrl);
  }

  selected(mode) {
    return mode === this.mode ? 'dark' : 'primary'
  }

  switchMode(mode) {
    this.mode = null;
    setTimeout(() => {
      console.log(mode);
      this.mode = mode;
    }, 50);
    
  }

  render() {
    return (
    <ion-app>
     <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button>
              <img style={{'height': '30px'}} src={getAssetPath(`assets/appp-icon.png`)}></img>
            </ion-button>
          </ion-buttons>
          <ion-title>Preview</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={()=> this.switchMode('ios')}>
              <ion-icon name="logo-apple" color={this.selected('ios')}></ion-icon>
            </ion-button>
            <ion-button onClick={()=> this.switchMode('md')}>
              <ion-icon name="logo-android" color={this.selected('md')}></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen="true">
        <div style={{'height': 'calc( 100% - 44px)', 'display':'flex', 'justify-content': 'center', 'align-items': 'center'}}>
          <iframe style={{'width': '375px', 'height': '667px', 'border':'1px solid #e6e4e4'}} src={`${this.appUrl}&mode=${this.mode}`}></iframe>
        </div>
      </ion-content>
        {/* <ion-router useHash={false}>
          <ion-route url="/" component="app-home" componentProps={{mode: 'ios'}} />
        </ion-router>
        <ion-nav /> */}
      </ion-app>
    );
  }
}
