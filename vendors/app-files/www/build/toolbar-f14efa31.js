import { l as h } from './index-6c5afe2f.js';
import { r as runAction } from './actions-ae62ed66.js';

/**
 * Render the toolbar left buttons
 *
 * @param button
 * @param api
 * @returns any | jsx
 * @since 1.0.0
 * @version 1.0.0
 */
function renderLeftButtons(button, api) {
  switch (button.type) {
    case 'back_button':
      return (h("ion-back-button", { text: button.label }));
    case 'menu_button':
      return (h("ion-menu-button", null));
    case 'close_button':
      return (h("ion-button", { onClick: (e) => runAction({ action: 'close_modal', data: button, ev: e, api: api }) },
        '0' !== button.icon && h("ion-icon", { slot: "start", name: button.icon }),
        '0' === button.icon && button.label));
    case 'button':
      return (h("ion-button", { onClick: (e) => runAction({ action: button.action, data: button, ev: e, api: api }) },
        '0' !== button.icon && h("ion-icon", { slot: "start", name: button.icon }),
        '0' === button.icon && button.label));
    default:
      return '';
  }
}
/**
 * Render the toolbar right buttons
 *
 * @param button
 * @param api
 * @returns any | jsx
 * @since 1.0.0
 * @version 1.0.0
 */
function renderRightButtons(button, api) {
  switch (button.type) {
    case 'button':
      return (h("ion-button", { onClick: (e) => runAction({ action: button.action, data: button, ev: e, api: api }) },
        '0' !== button.icon && h("ion-icon", { slot: "start", name: button.icon }),
        '0' === button.icon && button.label));
    default:
      return '';
  }
}
/**
 * Render the toolbar title
 *
 * @param data
 * @returns any
 * @since 1.0.0
 * @version 1.0.0
 */
function renderTitle(data) {
  if (data.attrs.data.logo_file) {
    return (`<img src=${data.attrs.data.logo_file} style="height:40px; margin-top: 4px;"/>`);
  }
  else {
    return data.attrs.data.title;
  }
}

export { renderTitle as a, renderRightButtons as b, renderLeftButtons as r };
