import { Preferences } from "@capacitor/preferences";

export const buddypress = {
    root: async ()=> {
        await customElements.whenDefined('app-root');
        return document.querySelector('app-root');
    },
    joinGroup: async (id)=> {

        const root = await buddypress.root();
        const api = await root.getApi() as any;

        const baseUrl = api.api;
        const headers = { ...await getAuthHeaders(), 'Content-Type': 'application/json' };
        const userId = await getUserId();
    
        var request = new Request(`${baseUrl}/wp-json/buddypress/v1/groups/${id}/members?user_id=${userId}`, {
          method: 'POST',
          headers: new Headers(headers),
        });

        const rsp = await fetch(request);

        if (rsp.status >= 400) {
          throw rsp.json();
        } else {   
          api.is_user_member = true;
          await root.setApi(api);
        }

  
    },
    leaveGroup: async (id)=> {
        const root = await buddypress.root();
        const api = await root.getApi() as any;

        const baseUrl = api.api;
        const headers = { ...await getAuthHeaders(), 'Content-Type': 'application/json' };
        const userId = await getUserId();
    
        var request = new Request(`${baseUrl}/wp-json/buddypress/v1/groups/${id}/members/${userId}`, {
          method: 'DELETE',
          headers: new Headers(headers),
        });

        const rsp = await fetch(request);

        if (rsp.status >= 400) {
          throw rsp.json();
        } else {
          const data = await rsp.json();
  
          if (data.removed) {
            api.is_user_member = false;
            await  root.setApi(api);
          }
        }
    },
    follow: async (id)=> {
      console.log(id)

      const root = await buddypress.root();
      const api = await root.getApi() as any;

      const baseUrl = api.api;
      const headers = { ...await getAuthHeaders(), 'Content-Type': 'application/json' };
      const rsp = await bapi(baseUrl, headers, 'POST', `/wp-json/buddypress/v1/friends/follow?user_id=${id}`);

      if (rsp.status >= 400) {
        throw await rsp;
      } else {
        const data = await rsp;

        if (data.is_confirmed) {
          api.friendship_status = true;
          api.friendship_status_slug = 'is_friend';

          await customElements.whenDefined('app-profile');
          const el = document.querySelector('app-profile');
          await el.reload(api);

        }
      }

    },
    unfollow: async (id)=> {
      console.log(id)

      const root = await buddypress.root();
      const api = await root.getApi() as any;

      const baseUrl = api.api;
      const headers = { ...await getAuthHeaders(), 'Content-Type': 'application/json' };
      const rsp = await bapi(baseUrl, headers, 'POST', `/wp-json/buddypress/v1/friends/unfollow?user_id=${id}`);

      if (rsp.status >= 400) {
        throw await rsp;
      } else {
        const data = await rsp;

        if (data.is_confirmed) {
          api.friendship_status = false;
          api.friendship_status_slug = 'not_friend';

          await customElements.whenDefined('app-profile');
          const el = document.querySelector('app-profile');
          await el.reload(api);

        }
      }
    },
    addActivity: async (data)=> {
      console.log(data);
      await customElements.whenDefined('app-activity');
      const el = document.querySelector('app-activity');
      await el.postModal();
    },
    addGroupActivity: async (id, data?)=> {
      console.log(id, data);
      await customElements.whenDefined('app-activity');
      const el = document.querySelector('app-activity');
      await el.postModal({
        component: 'groups',
        type: 'activity_update',
        primary_item_id: id
        }, data);
    }
}

async function bapi(baseUrl, headers, method, path) {

  var request = new Request(`${baseUrl}${path}`, {
    method: method,
    headers: new Headers(headers),
  });

  const rsp = await fetch(request);

  if (rsp.status >= 400) {
    throw await rsp.json();
  } else {
    return await rsp.json();
  }

}

async function getUserId() {
  const userData = (await Preferences.get({key: 'auth'})).value;

  return JSON.parse(userData)?.user_id;
}

async function getAuthHeaders() {
  const userData = (await Preferences.get({key: 'auth'})).value;
  const token = userData ? await JSON.parse(userData).token : false;
  return token ? { 'Authorization': `Bearer ${token}`} : {};
}