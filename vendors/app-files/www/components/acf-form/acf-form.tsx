import { Component, Host, h, ComponentInterface, Prop, Element, State } from '@stencil/core';
import { renderComponent } from '../../helpers/content';
import { runAction } from '../../helpers/actions';
import { Preferences } from '@capacitor/preferences';
import { z } from 'zod';
import { state } from '../../services/store';
import { processOptions, processHidden } from '../../helpers/tokens';
//import { post } from '../../services/http';

@Component({
  tag: 'acf-form',
  styleUrl: 'acf-form.css',
})
export class AcfForm implements ComponentInterface {
  @Element() el: HTMLElement;

  @Prop() data;
  @State() innerBlocks;

  formdata = {};

  button: HTMLIonButtonElement;

  componentWillLoad() {
    this.processInnerBlocks();
  }

  componentDidLoad() {
    setTimeout(() => {
      this.buttonEvent();
      this.el.id = this.data.attrs.data.form_name;
    }, 100);
  }

  /**
   * Adds process form event listener to form builder button.
   */
  buttonEvent() {
    this.button = this.el.querySelector('ion-button');

    if (this.button) {
      this.button.addEventListener('click', async () => {
        this.processForm();
      });
    }
  }

  /**
   * Process form fields on submit.
   */
  processForm() {
    /**
     * Process text inputs
     */
    const inputs = this.el.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) {
      switch (inputs[i].type) {
        case 'hidden':
          if (inputs[i].name) {
            this.formdata[inputs[i].name] = processHidden(inputs[i].value, inputs);
          }
          break;

        default:
          const inputData = this.data.innerBlocks.filter(item => inputs[i].name === item.attrs.data.input_name);
          const validate = inputData[0].attrs.data.input_validation && '1' === inputData[0].attrs.data.input_validation ? true : false;
          const required = inputData[0].attrs.data.input_required && '1' === inputData[0].attrs.data.input_required ? true : false;

          if (('' !== inputs[i].value && validate) || required) {
            this.validNote(inputs[i], inputs[i].parentElement.parentElement.parentElement.parentElement.parentElement, inputData);
          } else {
            if (inputs[i].name) {
              this.formdata[inputs[i].name] = inputs[i].value;
            }
          }
          break;
      }
    }

    /**
     * Process textarea
     */
    const textarea = this.el.querySelectorAll('textarea');

    for (let i = 0; i < textarea.length; i++) {
      const inputData = this.data.innerBlocks.filter(item => textarea[i].name === item.attrs.data.input_name);
      const required = inputData[0].attrs.data.input_required && '1' === inputData[0].attrs.data.input_required ? true : false;

      if (required) {
        this.validNote(textarea[i], textarea[i].parentNode.parentNode.parentNode, inputData);
      }

      if (textarea[i].name) {
        this.formdata[textarea[i].name] = textarea[i].value;
      }
    }

    /**
     * Process checkboxes
     */
    const checkboxes = this.el.querySelectorAll('ion-checkbox');

    for (let i = 0; i < checkboxes.length; i++) {
      const checked = checkboxes[i].classList.contains('checkbox-checked');

      const parent = checkboxes[i].parentNode.parentNode.parentNode;
      const name = checkboxes[i].name;
      const inputData = this.data.innerBlocks.filter(item => name === item.attrs.data.input_name);
      const required = inputData[0].attrs.data.checkbox_required && '1' === inputData[0].attrs.data.checkbox_required ? true : false;

      checkboxes[i]['type'] = 'checkbox';
      checkboxes[i]['value'] = checked;

      if (required) {
        this.validNote(checkboxes[i], parent, inputData);
      }

      if (checkboxes[i].name) {
        this.formdata[checkboxes[i].name] = checked ? '1' : null;
      }
    }

    /**
     * Process Selects
     */
    const selects = this.el.querySelectorAll('ion-select');

    for (let i = 0; i < selects.length; i++) {
      const name = selects[i].id;
      const inputData = this.data.innerBlocks.filter(item => name === item.attrs.data.input_name);
      const required = inputData.length && inputData[0].attrs.data.select_required && '1' === inputData[0].attrs.data.select_required ? true : false;

      selects[i]['type'] = 'select';

      if (required) {
        this.validNote(selects[i], selects[i].parentNode.parentNode, inputData);
      }

      if (selects[i].name) {
        this.formdata[selects[i].name] = selects[i].value;
      }
    }

    /**
     * Process toggles
     */
    const toggles = this.el.querySelectorAll('ion-toggle');
    for (let i = 0; i < toggles.length; i++) {
      const value = toggles[i].querySelector('input');
      const name = toggles[i].id;
      const inputData = this.data.innerBlocks.filter(item => name === item.attrs.data.input_name);
      const required = inputData[0].attrs.data.toggle_required && '1' === inputData[0].attrs.data.toggle_required ? true : false;

      if (required) {
        value.required = true;
        this.validNote(value, toggles[i].parentNode, inputData);
      }
    }

    const isValid = Object.entries(this.formdata).filter(([_key, value]) => value === null);

    if (isValid.length <= 0) {
      this.button.disabled = true;

      if ('database' === this.data.attrs.data.form_type) {
        this.saveForm(this.formdata);
      }

      if ('api' === this.data.attrs.data.form_type) {
        this.submitForm(this.formdata);
      }

      if ('local' === this.data.attrs.data.form_type) {

      }
    }

    /**
     * Disable submit button for 2 seconds.
     */
    setTimeout(() => {
      this.button.disabled = false;
    }, 2000);
  }

  /**
   *
   * @param input Show error notices.
   * @param parent
   * @param inputData
   */
  validNote(input, parent, inputData) {
    const valid = this.validateInput(input, inputData[0].attrs.data);
    const attrs = inputData[0].attrs.data;
    const note = parent.querySelector('ion-note');

    if (valid.success !== false) {
      this.formdata[input.name] = input.value;
      parent.classList.add('ion-valid');
      parent.classList.remove('ion-invalid');
    } else {
      if (input.name) {
        this.formdata[input.name] = null;
      }

      if (attrs[`${attrs.input_type}_required`]) {
        note.innerText = `Required ${attrs.label}`;
      } else {
        note.innerText = attrs[`${attrs.input_type}_validation_error_message`] ?? `Invalid ${attrs.label}`;
      }

      parent.classList.remove('ion-valid');
      parent.classList.add('ion-invalid');
    }
  }

  /**
   * Validate input value.
   * @param input
   * @param attr
   * @returns
   */
  validateInput(input, attr) {
    const string = z.string();
    const number = z.number();
    const email = z.string().email();
    const url = z.string().url();

    if (input && input.hasAttribute('required')) {
      if ('' === input.value) {
        return { success: false };
      }
    }

    switch (input.type) {
      case 'text':
        return string.safeParse(input.value);

      case 'password':
        return string.safeParse(input.value);

      case 'email':
        return email.safeParse(input.value);

      case 'tel':
        const matched = input.value.match(attr.input_validation_pattern);
        return { success: !matched ? false : true };

      case 'url':
        return url.safeParse(input.value);

      case 'number':
        return number.safeParse(parseInt(input.value));

      case 'checkbox':
        return { success: input.value ? true : false };

      case 'select':
        return string.safeParse(input.value);

      case 'hidden':
        if ('timestamp' === input.name) {
          input.value = Date.now();
        }
        return input.value;

      default:
        return { success: false };
    }
  }

  /**
   * Save form to sqlite database.
   * @param formdata
   */
  async saveForm(formdata) {
    const attrs = this.data.attrs.data;

    let row;

    switch (attrs.query_type) {
      case 'insert':
        row = await state.database.insert(attrs, formdata);
        break;
      case 'update':
        row = await state.database.update(attrs, formdata);
        break;

      default:
        break;
    }

    if ('1' === attrs.debug) {
      this.debugAlert(JSON.stringify(row));
    }

    if (row) {
      formdata['form_response'] = row;
      this.responseAlert('success', attrs.success_success_message, formdata);
    } else {
      this.responseAlert('error', attrs.failure_failure_message, {});
    }

    this.responseAction(row, formdata);

    return;
  }

  /**
   * Submit form to external api.
   * @param formdata
   */
  async submitForm(formdata) {

    // Preprocess form data before sending to surver.
    if (this.data.attrs.data.on_submit_code !== '') {
      formdata = await this.onSubmitMethod(this.data.attrs.data.on_submit_code, formdata);
    }

    let postUrl = new URL(this.data.attrs.data.post_url);
    const debug = this.data.attrs.data.debug;
    const action = this.data.attrs.data.success_form_action;
    const headers = this.data.attrs.data.headers;
    const parameters = this.data.attrs.data.parameters;

    const options = {
      method: 'POST',
      headers: {},
      body: formdata
    };
    
    // Set headers.
    headers.map( header => {    
      options.headers[header.key] = header.value;

      // Set body based on content type.
      switch(header.value) {
        case 'application/json':
          options.body = JSON.stringify(formdata);
          break;
        case 'application/x-www-form-urlencoded':
          options.body = new URLSearchParams(formdata);
          break;
      }

     });

     // Set parameters.
    parameters.map( param => {    
      postUrl.searchParams.set(param.key, param.value);
    });

    console.log(postUrl, options);

    try {

      const response = await fetch(postUrl, options);

      const rsp = await response.json();

      console.log('rsp', rsp);

      if ('1' === debug) {
        this.debugAlert(JSON.stringify(rsp));
      }

      if (response.status < 400) {

        if ('custom' === action) {
          this.data.attrs.action = 'custom';
          this.data.attrs.data.custom_action = this.data.attrs.data.success_custom;
          this.data.attrs.response = response;
          this.data.attrs.response.data = rsp;
          runAction(this.data.attrs);
        } else {
          this.responseAlert('success', rsp, formdata);
        }

        const attr = this.data.attrs.data;

        if ('1' === attr.success_save_response) {
          await Preferences.set({
            key: attr.form_name,
            value: JSON.stringify(rsp),
          });
        }

      } else {
        this.responseAlert('error', {}, {});
      }

    } catch (error) {
      console.log(error);
      this.responseAlert('error', {}, {});
    }

    return;
  }

  /**
   * Runs javascript code before form submited;
   * @param code
   * @param data
   * @returns
   */
  async onSubmitMethod(code, data) {
    if (code !== '') {
      const method = new Function('data', code);
      const rsp = await method(data);
      return rsp === undefined || rsp === null ? data : rsp;
    } else {
      return data;
    }
  }

  /**
   * Show alert on form response.
   * @param status
   * @param response
   * @param formdata
   */
  async responseAlert(status, response, formdata) {
    const alert = document.createElement('ion-alert');
    alert.header = '';
    alert.message = 'success' === status ? this.data.attrs.data.success_success_message : this.data.attrs.data.failure_failure_message;
    alert.buttons =
      'success' === status
        ? [
            {
              text: this.data.attrs.data.success_confirm_button,
              role: 'confirm',
              handler: async () => {
                await this.responseAction(response, formdata);
              },
            },
          ]
        : [{ text: this.data.attrs.data.failure_confirm_button, role: 'cancel' }];

    alert.backdropDismiss = false;

    document.body.appendChild(alert);
    await alert.present();

    return;
  }

  /**
   * Run action  on form response.
   * @param response
   * @param formdata
   */
  async responseAction(_response, formdata) {
    const attr = this.data.attrs.data;

    if ('none' !== attr.success_form_action) {
      attr['custom_action'] = attr.success_custom;
      attr['route'] = attr.success_route;
      attr['router_animation'] = attr.success_router_animation;
      attr['form'] = formdata;
      await runAction({ action: attr.success_form_action, data: attr });
    }

    if ('auth' === attr.form_name) {
      state.auth = true;
    }

    return;
  }

  /**
   * Show debug alert on form response.
   * @param message
   */
  async debugAlert(message) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Debug';
    alert.message = message;
    alert.buttons = ['close'];
    alert.backdropDismiss = false;

    document.body.appendChild(alert);
    await alert.present();
  }

  /**
   * Process inner form block to add data.
   * Currently only processes select options.
   */
  async processInnerBlocks() {
    let items = [];

    const map = await this.data.innerBlocks.map(async (item, key) => {
      if ('acf/ion-item' === item.blockName && 'database' === item.attrs.data.select_option_source) {
        const options = await processOptions(this.data.attrs.data, item.attrs.data);
        item.attrs.data['select_options'] = options;
      }

      items[key] = item;
    });

    Promise.all(map).then(_res => {
      this.innerBlocks = [...items];
    });
  }

  render() {
    return (
      <Host>
        <div>
          {this.innerBlocks && this.innerBlocks.map(block => renderComponent(block))}
          {this.data.attrs.data.hidden_inputs.map(item => (
            <input type="hidden" name={item.name} value={item.value}></input>
          ))}
        </div>
      </Host>
    );
  }
}
