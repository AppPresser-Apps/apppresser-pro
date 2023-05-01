import { r as registerInstance, l as h, m as Host } from './index-6c5afe2f.js';
import { C as CameraSource, a as Camera, b as CameraResultType } from './index-904fce70.js';
import './index-7c8dd725.js';
import { A as AttachmentStore } from './state-9b24d0d5.js';
import { a as isPlatform } from './ionic-global-74a19eaa.js';
import { b as actionSheetController } from './overlays-ef00d22b.js';
import './index-0f2ea1ed.js';
import './global-e1c7e609.js';
import './utils-31c050e6.js';
import './animation-6410f855.js';
import './helpers-6885e51a.js';
import './index-5aa6aa3e.js';
import './ios.transition-f8c322b0.js';
import './index-0fa2abb2.js';
import './md.transition-131fa152.js';
import './cubic-bezier-1ddfda32.js';
import './index-20a27e5b.js';
import './config-af47d636.js';
import './index-ed30b664.js';
import './hardware-back-button-fa04d6e9.js';
import './index-7106c220.js';
import './framework-delegate-c3343c4d.js';
import './index-2ee22356.js';

class ApppAttachmentService {
  async promptAttachment() {
    const isWeb = isPlatform('desktop');
    const actionSheet = await actionSheetController.create({
      header: 'Choose an image',
      buttons: [
        { text: 'From Library', handler: () => isWeb ? this.getPhotoFromFileSystem() : this.getPhoto(CameraSource.Photos) },
        { text: 'From Camera', handler: () => this.getPhoto(CameraSource.Camera) }
      ],
      backdropDismiss: false
    });
    actionSheet.present();
  }
  async getPhoto(cameraSource) {
    const photo = await Camera.getPhoto({
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: cameraSource
    });
    console.log(photo.webPath);
    const blob = this.b64toBlob(photo.base64String, 'image/jpeg', 512);
    AttachmentStore.attachments = [...AttachmentStore.attachments, blob];
  }
  async getPhotoFromFileSystem() {
    // File input to handle file system images
    const fileInput = document.createElement('input');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.setAttribute('type', 'file');
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      console.log(file);
      if (file) {
        const url = URL.createObjectURL(file);
        console.log(url);
        AttachmentStore.attachments = [...AttachmentStore.attachments, file];
      }
    });
    fileInput.click();
  }
  //https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}

const attachmentButtonCss = "attachment-button{display:block}";

const AttachmentButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.AttachmentService = new ApppAttachmentService();
  }
  render() {
    return (h(Host, null, h("ion-button", { onClick: () => this.AttachmentService.promptAttachment() }, h("ion-icon", { name: "camera", color: "medium" }))));
  }
};
AttachmentButton.style = attachmentButtonCss;

export { AttachmentButton as attachment_button };
