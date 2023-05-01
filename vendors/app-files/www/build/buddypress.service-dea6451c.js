import { o as objectToUrlParams } from './utils-bf14ef3c.js';
import { s as state } from './store-b76a13b4.js';
import { P as Preferences } from './index-6dc587d2.js';

/**
 * BuddyPress API Class
 *
 * @public
 */
class BuddyPressService {
  /**
   * create an instance of BuddyPressService.
   */
  constructor(data) {
    this.url = data.url;
  }
  /**
   * Updates the store state for component.
   * @param component
   * @param data
   */
  updateState(component = '', data = []) {
    switch (component) {
      case 'activity':
        state.buddypress.activity = data;
        break;
      case 'user_activity':
        state.buddypress.user_activity = data;
        break;
      case 'activity_item':
        state.buddypress.activity_item = data;
        break;
      case 'members':
        state.buddypress.members = data;
        break;
      case 'groups':
        state.buddypress.groups = data;
        break;
    }
  }
  /**
   * Gets array of BuddyPress user objects.
   *
   * @param  {} params={}
   * @returns Promise
   */
  async getMembers(params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/members${objectToUrlParams(params)}`, {
      method: 'GET',
      headers: new Headers(headers)
    });
    const response = await fetch(request);
    return response.json();
  }
  /**
 * Gets array of BuddyPress groups user objects.
 *
 * @param  {} params={}
 * @returns Promise
 */
  async getGroupMembers(group, params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/${group}/members${objectToUrlParams(params)}`, {
      method: 'GET',
      headers: new Headers(headers)
    });
    const response = await fetch(request);
    return response.json();
  }
  /**
 * Gets array of BuddyPress user objects.
 *
 * @param  {} params={}
 * @returns Promise
 */
  async getMemberByUsername(params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}appp/v1/member${objectToUrlParams(params)}`, {
      method: 'GET',
      headers: new Headers(headers)
    });
    const response = await fetch(request);
    return response.json();
  }
  /**
   * Gets a users xProfile groups and feilds data.
   *
   * @param  {} params={}
   * @returns Promise
   */
  async getxProfile(params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/xprofile/groups${objectToUrlParams(params)}`, {
      method: 'GET',
      headers: new Headers(headers)
    });
    const response = await fetch(request);
    return response.json();
  }
  /**
   * Gets array of BuddyPress activity objects.
   *
   * @param  {} params={}
   * @returns Promise
   */
  async getActivity(params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/activity${objectToUrlParams(params)}`, {
      method: 'GET',
      headers: new Headers(headers)
    });
    const response = await fetch(request);
    return await response.json();
  }
  /**
   * Add activity item.
   *
   * @param  {} params={}
   * @returns Promise
   */
  async addActivity(params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/activity${objectToUrlParams(params)}`, {
      method: 'POST',
      headers: new Headers(headers)
    });
    const rsp = await fetch(request);
    return rsp.json();
  }
  /**
   * Delete activity item.
   *
   * @param  {} params={}
   * @returns Promise
   */
  async deleteActivity(id, params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/activity/${id}${objectToUrlParams(params)}`, {
      method: 'DELETE',
      headers: new Headers(headers)
    });
    const rsp = await fetch(request);
    return rsp.json();
  }
  /**
   * Flag content item.
   *
   * @param  {} params={}
   * @returns Promise
   */
  async flagContent(params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/appp/v1/flag/${objectToUrlParams(params)}`, {
      method: 'POST',
      headers: new Headers(headers)
    });
    const rsp = await fetch(request);
    return rsp.json();
  }
  /**
   * Flavorite / UnFavorite activity item.
   *
   * @param  {} params={}
   * @returns Promise
   */
  async favActivity(id, params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/activity/${id}/favorite${objectToUrlParams(params)}`, {
      method: 'POST',
      headers: new Headers(headers)
    });
    const rsp = await fetch(request);
    return rsp.json();
  }
  /**
   * Gets array of BuddyPress group objects.
   *
   * @param  {} params={}
   * @returns Promise
   */
  async getGroups(params = {}) {
    const baseUrl = this.url;
    const auth = await this.getAuthHeaders();
    const headers = Object.assign(Object.assign({}, auth), { 'Content-Type': 'application/json' });
    if (auth) {
      params['populate_extras'] = true;
    }
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/groups${objectToUrlParams(params)}`, {
      method: 'GET',
      headers: new Headers(headers),
    });
    console.log(request);
    const response = await fetch(request);
    return response.json();
  }
  async moderateUser(params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    let data = {
      headers: headers,
      method: 'POST',
    };
    try {
      const rsp = await fetch(`${baseUrl}/wp-json/buddypress/v1/moderate${objectToUrlParams(params)}`, data);
      return rsp.json();
    }
    catch (err) {
      window.console.log(err);
    }
  }
  async activateUser(key, params = {}) {
    const baseUrl = this.url;
    const headers = { 'Content-Type': 'application/json' };
    let data = {
      headers: headers,
      method: 'PUT',
    };
    try {
      const rsp = await fetch(`${baseUrl}/wp-json/buddypress/v1/signup/activate/${key}/${objectToUrlParams(params)}`, data);
      window.console.log('activate', rsp);
      return rsp.json();
    }
    catch (err) {
      window.console.log('activate', err);
      return err.json();
    }
  }
  async resetPassword(params = {}) {
    const baseUrl = this.url;
    const headers = { 'Content-Type': 'application/json' };
    let data = {
      headers: headers,
      method: 'PUT',
    };
    try {
      const rsp = await fetch(`${baseUrl}/wp-json/appp/v1/reset-password/${objectToUrlParams(params)}`, data);
      window.console.log('reset password', rsp);
      return rsp.json();
    }
    catch (err) {
      window.console.log('reset password', err);
    }
  }
  async getBlockUsers(params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    let data = {
      headers: headers,
      method: 'GET',
    };
    try {
      const rsp = await fetch(`${baseUrl}/wp-json/buddypress/v1/blocked${objectToUrlParams(params)}`, data);
      return rsp.json();
    }
    catch (err) {
      window.console.log(err);
    }
  }
  /**
  * Gets user jwt token from Preferences.
  *
  * @returns String
  */
  async getToken() {
    const data = await Preferences.get({ key: 'auth' });
    if (data.value) {
      const user_obj = JSON.parse(data.value);
      return user_obj.token;
    }
    return false;
  }
  async getUserId() {
    const userData = (await Preferences.get({ key: 'auth' })).value;
    return JSON.parse(userData).user_id;
  }
  async getAuthHeaders() {
    const userData = (await Preferences.get({ key: 'auth' })).value;
    const token = userData ? await JSON.parse(userData).token : false;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
  async getFriendshipRequests(args = {}) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/friends/${objectToUrlParams(Object.assign({ is_confirmed: 0 }, args))}`, {
      method: 'GET',
      headers: new Headers(headers),
    });
    const rsp = await fetch(request);
    return rsp.json();
  }
  async acceptFriendship(friendshipId) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/friends/${friendshipId}`, {
      method: 'PUT',
      headers: new Headers(headers),
    });
    const rsp = await fetch(request);
    return rsp.json();
  }
  async rejectFriendship(friendshipId) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/friends/${friendshipId}`, {
      method: 'DELETE',
      headers: new Headers(headers),
    });
    const rsp = await fetch(request);
    return rsp.json();
  }
  // Get profile fields from current user
  async getProfileFields() {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    const userId = await this.getUserId();
    const params = { fetch_field_data: true, user_id: userId };
    console.log('headers', headers);
    const request = new Request(`${baseUrl}/wp-json/buddypress/v1/xprofile/fields${objectToUrlParams(params)}`, {
      method: 'GET',
      headers: new Headers(headers),
    });
    const rsp = await fetch(request);
    return await rsp.json();
  }
  // DELETE //buddypress/v1/xprofile/<field_id>/data/<user_id>
  async deleteProfileData(fieldId) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    const userId = await this.getUserId();
    const request = new Request(`${baseUrl}/wp-json/buddypress/v1/xprofile/${fieldId}/data/${userId}`, {
      method: 'DELETE',
      headers: new Headers(headers),
    });
    const rsp = await fetch(request);
    const json = await rsp.json();
    // We may want to handle error outside, so let's throw
    if (rsp.status >= 400) {
      throw json;
    }
    return json;
  }
  // POST //buddypress/v1/xprofile/<field_id>/data/<user_id>
  async saveProfileData(fieldId, value) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    const userId = await this.getUserId();
    const request = new Request(`${baseUrl}/wp-json/buddypress/v1/xprofile/${fieldId}/data/${userId}`, {
      method: 'POST',
      headers: new Headers(headers),
      body: JSON.stringify({
        value,
        context: 'edit'
      })
    });
    const rsp = await fetch(request);
    const json = await rsp.json();
    // We may want to handle error outside, so let's throw
    if (rsp.status >= 400) {
      throw json;
    }
    return json;
  }
  async joinGroup(groupId) {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/groups/${groupId}/members`, {
      method: 'POST',
      headers: new Headers(headers),
    });
    const rsp = await fetch(request);
    if (rsp.status >= 400) {
      throw rsp.json();
    }
    return rsp.json();
  }
  async leaveGroup(groupId) {
    const baseUrl = this.url;
    const userId = await this.getUserId();
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/groups/${groupId}/members/${userId}`, {
      method: 'DELETE',
      headers: new Headers(headers),
    });
    const rsp = await fetch(request);
    if (rsp.status >= 400) {
      throw rsp.json();
    }
    return rsp.json();
  }
  async getAchievements(params = { type: 'badges' }) {
    const baseUrl = this.url;
    const userId = await this.getUserId();
    const headers = { 'Content-Type': 'application/json' };
    if (userId) {
      Object.assign(headers, await this.getAuthHeaders());
    }
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/achievements${objectToUrlParams(params)}`, {
      headers: new Headers(headers),
    });
    const rsp = await fetch(request);
    if (rsp.status >= 400) {
      throw rsp.json();
    }
    return rsp.json();
  }
  async getUserAchievements() {
    const userId = await this.getUserId();
    return this.getAchievements({ user: userId, type: 'badges' });
  }
  async getLeaderBoard() {
    const baseUrl = this.url;
    const headers = Object.assign(Object.assign({}, await this.getAuthHeaders()), { 'Content-Type': 'application/json' });
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/leaderboard`, {
      headers: new Headers(headers),
    });
    const rsp = await fetch(request);
    if (rsp.status >= 400) {
      throw rsp.json();
    }
    return rsp.json();
  }
  async uploadAttachmentActivity(params = {}) {
    const baseUrl = this.url;
    const headers = Object.assign({}, await this.getAuthHeaders());
    const formData = new FormData();
    formData.append('context', 'edit');
    formData.append('action', 'bp_activity_attachment_upload');
    if ('attachments' in params) {
      params.attachments.map(imageBlob => {
        const timestamp = Date.now();
        // For web it should be png, for mobile it should be jpeg
        // The extension may be important for the backend, so let's treat it here
        const fileName = imageBlob.type === 'image/png' ? `${timestamp}.png` : `${timestamp}.jpg`;
        const file = new File([imageBlob], fileName, { type: imageBlob.type });
        formData.append('files[]', file);
      });
    }
    delete params['attachments'];
    var request = new Request(`${baseUrl}/wp-json/buddypress/v1/activity${objectToUrlParams(params)}`, {
      method: 'POST',
      headers: new Headers(headers),
      body: formData
    });
    const rsp = await fetch(request);
    return rsp.json();
  }
}

export { BuddyPressService as B };
