import { Camera, CameraSource, CameraResultType } from "@capacitor/camera";
import { actionSheetController, isPlatform } from "@ionic/core";
import { AttachmentStore } from "../services/state";

export class ApppAttachmentService {

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

  async getPhoto(cameraSource: CameraSource) {
    const photo = await Camera.getPhoto({
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: cameraSource
    });

    console.log(photo.webPath);


    const blob = this.b64toBlob(photo.base64String, 'image/jpeg', 512);

    AttachmentStore.attachments = [...AttachmentStore.attachments, blob ];
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
        AttachmentStore.attachments = [...AttachmentStore.attachments, file ];
      }
    });

    fileInput.click();

  }

    //https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
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
