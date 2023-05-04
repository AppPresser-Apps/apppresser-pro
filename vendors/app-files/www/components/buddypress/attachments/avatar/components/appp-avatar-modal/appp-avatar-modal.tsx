import { Component, Host, h, Element, Prop, State } from '@stencil/core';
import { ApppAvatarService } from '../../services/appp-avatar-service';
import Cropper from 'cropperjs';
import { alertController } from '@ionic/core';

@Component({
  tag: 'appp-avatar-modal',
  styleUrl: 'appp-avatar-modal.css',
})
export class ApppAvatarModal {

  @Prop() avatarUrl;
  @Element() el: HTMLElement;
  @State() range: { min: number; max: number };
  private modal: HTMLIonModalElement;
  private service = new ApppAvatarService();
  private cropper: Cropper;
  private initialRatio: number;

  componentWillLoad() {

    this.modal = this.el.closest('ion-modal');

    // Cleaning things up
    this.modal.onWillDismiss().then(() => {
      this.cropper.destroy();
      URL.revokeObjectURL(this.avatarUrl);
    });

    this.modal.onDidDismiss().then(() => {
      this.el.remove();
    })
  }

  private async loadCropper(e) {

    this.cropper = new Cropper(e.target, {
      viewMode: 3,
      dragMode: 'move',
      autoCropArea: 1,
      restore: false,
      modal: false,
      guides: false,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      aspectRatio: 1,
      initialAspectRatio: 1,
      minContainerHeight: 300,
      minContainerWidth: 300
    });

    //this.cropper.resizeTo()
  }

  async save() {
    const buttons = this.el.querySelectorAll('ion-button');
    buttons.forEach(button => button.disabled = true);

    try {
      await this.service.uploadAvatar(await this.getCroppedImageBlob());
      this.modal.dismiss();
    } catch(err) {
      console.error(err);
    }

    buttons.forEach(button => button.disabled = false);

  }

  private getCroppedImageBlob(): Promise<Blob> {
    return new Promise(resolve => {
      const { width, height } = this.cropper.getCropBoxData();
      this.cropper.getCroppedCanvas({ width, height, imageSmoothingQuality: 'high' }).toBlob(resolve);
    });
  }

  private async showErrorModal(err) {
    console.error(err);
    const alert = await alertController.create({
      message: 'This image format is not supported or could not be loaded.',
      buttons: [{ text: 'Ok '}]
    });
    await alert.present();
    await alert.onDidDismiss();
    this.modal.dismiss();
  }

  private zoomRangeChange({value}) {
    // It seems we need to get the initial ratio (which varies according to the container div)
    // and use it as baseline, else the zoom might not work
    if (!this.initialRatio) {
      const { height, naturalHeight } = this.cropper.getImageData();
      this.initialRatio = height / naturalHeight;
    }
    this.cropper.zoomTo(this.initialRatio + value);
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button onClick={() => this.modal.dismiss()}>
                <ion-icon name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button onClick={() => this.save()} color="secondary" fill="clear" style={{ '--padding-end': '20px', '--padding-start': '20px' }}>Save</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content fullscreen>

          <div style={{'width': '100%', 'height': '100%', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center'}}>
            <div style={{'width': '300px', 'height': '300px'}}>
                <img
                  onLoad={(e) => this.loadCropper(e)}
                  onError={(err) => this.showErrorModal(err)}
                  src={this.avatarUrl} hidden={true}/>
            </div>
          </div>
        </ion-content>
        <ion-footer style={{'border-top': '0.55px solid rgba(0, 0, 0, 0.2)', 'background': '#ffffff'}}>
          <ion-range onIonChange={$event => this.zoomRangeChange($event.detail)} step={0.1} value={0} min={0} max={1} style={{'--knob-size': 'calc(10px * 2)'}}>
            <ion-label slot="start" style={{padding: '0 5px'}}><ion-icon name="remove-circle-outline"></ion-icon></ion-label>
            <ion-label slot="end"  style={{padding: '0 5px'}}><ion-icon name="add-circle-outline"></ion-icon></ion-label>
          </ion-range>
        </ion-footer>
      </Host>
    );
  }

}
