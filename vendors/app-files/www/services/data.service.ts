import { objectToUrlParams } from "../helpers/utils";

//import { Storage } from "@capacitor/storage";

export class DataService {
  constructor() {}

  async getData(url:string = '', params = {}, headers= {}) {
    
    let data = {
      headers: {...headers},
      method: 'GET',
    };

    console.log(`${url}${objectToUrlParams(params)}`);

    try {
      const rsp = await fetch(`${url}${objectToUrlParams(params)}`, data);

      if (rsp.status >= 400) {
        throw rsp.json();
      }

      return await rsp.json();

    } catch (err) {
      window.console.log(err);
      //return err;
    }
  }


}
