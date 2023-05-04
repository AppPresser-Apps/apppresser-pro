import { alertController, actionSheetController, modalController, popoverController } from '@ionic/core';
import { state } from '../services/store';
import { format } from 'date-fns';
//import { formatInTimeZone } from 'date-fns-tz';

/**
 * Present an alert
 * 
 * @param message 
 * @returns void
 * @since 1.0.0
 * @version 1.0.0
 */
export async function presentAlert(message: string): Promise<void> {
  const alert = await alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    subHeader: 'Subtitle',
    message: message,
    buttons: ['OK']
  });

  await alert.present();
 
}

/**
 * Present an action sheet
 * 
 * @param options 
 * @returns void
 * @since 1.0.0
 * @version 1.0.0
 */
export async function presentActionSheet(options?): Promise<void> {
 
  const action_sheets = 'action_sheets' in state.data ? state.data['action_sheets'] : [];

  const blocks = (action_sheets as any).filter(function(obj) {
    return obj.blockName === 'acf/action-sheet' && obj.attrs.data.name === options.data.action_sheet;
  })
  .map(function(obj) {
    return obj;
  });

 

  if ( blocks.length > 0) {

    const block = blocks[0].attrs.data;

    let buttons = [];

    block.action_buttons.map( item => {
      buttons.push({
        text: item.text,
        role: item.role,
        data: {data: state.database},
        handler: ()=> { 
          if ('custom' === item.action ) {
            const root = document.querySelector('app-root');
            (root as any).emitActionEvent(item.function, state)
          }
        }
      });
    });

    buttons.push({
      text: block.cancel_button_title,
      role: 'cancel',
    })

    const actionSheet = await actionSheetController.create({
      header: block.header,
      subHeader: block.subheader,
      cssClass: 'my-custom-class',
      buttons: buttons
    });
    await actionSheet.present();

  }
}

export const cancel = ()=> {
  console.log('modal');
}

/**
 * Present a modal
 * 
 * @param options 
 * @returns void
 * @since 1.0.0
 * @version 1.0.0
 */
export async function presentModal(options?): Promise<void> {

  const block = state.data['modals'].filter(function(obj) {
      return obj.blockName === 'acf/modal' && obj.attrs.data.modal_name === options.data.modal_item;
    })
    .map(function(obj) {
      return obj;
    });
  
    const modal = await modalController.create({
      component: 'acf-modal',
      componentProps: {data: block[0], api: options.api}
    });

    modal.present();

}

/**
 * Dismiss a modal
 * 
 * @returns void
 * @since 1.0.0
 * @version 1.0.0
 */
export function dismissModal(): void {
  modalController.dismiss(null, 'cancel');
}

export async function presentPopover(options?) {

  const block = state.data['popovers'].filter(function(obj) {
      return obj.blockName === 'acf/popover' && obj.attrs.data.name === options.data.popover;
    })
    .map(function(obj) {
      return obj;
    });
  
    const popover = await popoverController.create({
      component: 'acf-popover',
      componentProps: {data: block[0]},
      event: options.ev
    });

    popover.present();

}

/**
 * Convert a string to a DOM element
 * 
 * @param params 
 * @param prefix 
 * @returns string
 * @since 1.0.0
 * @version 1.0.0
 */
export function objectToUrlParams(params, prefix = '?'): string {
  return  Object.keys(params).length !== 0 ?  prefix + serializeToPhpQuery(params) : '';
}

export function serializeToPhpQuery(object, prefix = '') {
  let str = [], p;
  for (p in object) {
    if (object.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = object[p];
      str.push((v !== null && typeof v === "object") ?
        serializeToPhpQuery(v, k) :
        k + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

/**
 * Convert a string to a DOM element
 * 
 * @param timestamp 
 * @returns string
 * @since 1.0.0
 * @version 1.0.0
 */
export function formatDate(timestamp): string {
  const dt = format(timestamp, 'MMM do y p');
  return dt;
}

/**
 * Convert a string to a DOM element foramt text and then return the string.
 * 
 * @param data 
 * @param text 
 * @returns any
 * @since 1.0.0
 * @version 1.0.0
 */
export function formatText(data, text): any {

  let f_text = text;

  switch (data.formatting) {
    case 'none':
        f_text = f_text;
        break;
    case 'date':
      try {

        // Get the time zone set on the user's device
        //const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Use date-fns-tz to convert from UTC to a zoned time
        //const localtime = formatInTimeZone(userTimeZone, timestamp, 'yyyy-MM-dd HH:mm:ss');
        //const localdate = new Date(parseInt(localtime))

        const timestamp = new Date(parseInt(text));
        f_text = format(timestamp, data.date_format ?? 'MMM do y p');

      } catch (error) {
        console.log('date format', error);
        f_text = f_text;
      }
      break;

    case 'styles':
      let doc = convertToHTML(text);

      Array.from(doc.body.querySelectorAll('*')).forEach(el => {
        el.removeAttribute("style");
      });

      f_text = doc.body.innerHTML;
      break;

    case 'uppercase':
      f_text = text.toUpperCase();
      break;

    case 'lowercase':
      f_text = text.toLowerCase();
        break;
  }


  return f_text;

}

/**
 * Convert a string to a DOM element
 * 
 * @param string 
 * @returns Document
 * @since 1.0.0
 * @version 1.0.0
 */
function convertToHTML(string): Document {
  let parser = new DOMParser();
  return parser.parseFromString(string, 'text/html');
}