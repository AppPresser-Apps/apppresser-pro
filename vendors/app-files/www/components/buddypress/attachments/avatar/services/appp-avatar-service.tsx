import { Camera, CameraSource, CameraResultType } from "@capacitor/camera";
import { Preferences } from "@capacitor/preferences";
import { modalController, actionSheetController, isPlatform } from "@ionic/core";
import { Env } from '@stencil/core';
//import { state } from "../../../../../services/store";

export class ApppAvatarService {

  user_data = null;

  componentWillLoad() {
    this.loadUser();
  }

  async loadUser() {
    const userData = (await Preferences.get({ key: 'auth' })).value;
    this.user_data = JSON.parse(userData);
  }

  async promptEditAvatar() {
    const isWeb = isPlatform('desktop');
    const actionSheet = await actionSheetController.create({
      header: 'Choose an image',
      buttons: [
        { text: 'From Library', handler: () => isWeb ? this.getPhotoFromFileSystem() : this.getPhoto(CameraSource.Photos) },
        { text: 'From Camera', handler: () => this.getPhoto(CameraSource.Camera) }
      ]
    });
    actionSheet.present();
  }

  async getPhoto(cameraSource: CameraSource) {
    const photo = await Camera.getPhoto({
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: cameraSource
    });

    this.openAvatarModal({ avatarUrl: photo.webPath });
  }

  async getPhotoFromFileSystem() {
    // File input to handle file system images
    const fileInput = document.createElement('input');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.setAttribute('type', 'file');
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        this.openAvatarModal({ avatarUrl: url });
      }
    });

    fileInput.click();
  }

  async uploadAvatar(imageBlob: Blob): Promise<{ full: string; thumb: string; }[]> {
    // For web it should be png, for mobile it should be jpeg
    // The extension may be important for the backend, so let's treat it here
    const fileName = imageBlob.type === 'image/png' ? 'image.png' : 'image.jpg';
    const file = new File([imageBlob], fileName, { type: imageBlob.type });

    const formData = new FormData();
    formData.append('context', 'edit');
    formData.append('action', 'bp_avatar_upload');
    formData.append('file', file);

    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.getBaseUrl()}/wp-json/buddypress/v1/members/${this.user_data.user_id}/avatar`, { method: 'POST', headers, body: formData });

    if (response.status >= 400) {
      throw response.json();
    }

    const newAvatar = await response.json();
    this.updateAvatarOnPreferences(newAvatar[0].full);
    return newAvatar;
  }

  async openAvatarModal(props?: any) {
    const modal = await modalController.create({
      componentProps: { ...props },
      component: 'appp-avatar-modal'
    });

    modal.present();
    return modal;
  }

  async updateAvatarOnPreferences(avatarUrl) {
    // Updates on Store/Preferences
    const PreferencesValue = (await Preferences.get({ key: 'auth'})).value;
    const user = JSON.parse(PreferencesValue);

    user.user.avatar_urls.full = avatarUrl;
    user.user.avatar_urls.thumb = avatarUrl;

    Preferences.set({ key: 'auth', value: JSON.stringify(user) });
 
    // May need to refresh members and activity component as well
    // const xprofile = document.querySelector('app-profile');
    // if ( xprofile ) {
    //   xprofile.getUser();
    // }
  }

  private async getAuthHeaders() {
    const token = this.user_data.token;
    return { Authorization: `Bearer ${token}` };
  }

  private getBaseUrl() {
    return Env.api_url;
  }

}
