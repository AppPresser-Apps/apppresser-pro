import { r as registerInstance, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { r as runAction } from './actions-8b022832.js';
import { d as processOptions, e as processValue, p as processTokens } from './tokens-4662bc6d.js';
import './utils-2a278bd0.js';
import './index-7c8dd725.js';
import './utils-31c050e6.js';
import './animation-6410f855.js';
import './helpers-6885e51a.js';
import './index-5aa6aa3e.js';
import './ios.transition-f8c322b0.js';
import './index-0fa2abb2.js';
import './md.transition-131fa152.js';
import './cubic-bezier-1ddfda32.js';
import './index-20a27e5b.js';
import './ionic-global-74a19eaa.js';
import './config-af47d636.js';
import './index-ed30b664.js';
import './hardware-back-button-fa04d6e9.js';
import './overlays-ef00d22b.js';
import './framework-delegate-c3343c4d.js';
import './index-2ee22356.js';
import './store-b76a13b4.js';
import './index-7106c220.js';
import './index-6dc587d2.js';
import './index-0b091f9f.js';
import './global-e1c7e609.js';

const appInputCss = "app-input{display:block}app-input .in-item{max-width:100% !important}ion-item ion-note{display:none;font-size:14px;color:red;padding-bottom:10px}ion-item.is_valid ion--note{display:none}ion-item.not_valid ion--note{display:block}";

const AppInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.data = undefined;
    this.api = undefined;
    this.state = undefined;
  }
  componentWillLoad() {
    this.el.setAttribute('data-id', this.data.input_name);
    this.loadInput();
  }
  async loadInput() {
    if ('select_option_source' in this.data && 'database' === this.data.select_option_source) {
      const options = await processOptions(this.data, this.data);
      if (options) {
        this.data.select_options = options;
      }
    }
    this.state = Object.assign({}, this.data);
  }
  async updateInput(_input, value) {
    if (value) {
      this.data.select_data_value = value;
      this.reloadInput(_input);
    }
    return;
  }
  async reloadInput(_input) {
    this.state = null;
    setTimeout(() => {
      this.loadInput();
    }, 100);
    return;
  }
  renderInput(attr, api) {
    var _a;
    switch (attr.input_type) {
      case 'input':
        const required = attr.input_required && '1' === attr.input_required ? { ['required']: true } : {};
        switch (attr.input_input_type) {
          case 'textarea':
            const txt_value = processValue(attr.input_data_value_source, attr.input_data_value, attr);
            return [
              h("ion-textarea", Object.assign({ label: "", id: attr.input_name, name: attr.input_name, placeholder: attr.input_placeholder, disabled: '0' === attr.input_disabled ? false : true, readonly: '0' === attr.input_read_only ? false : true, autoGrow: '0' === attr.input_autogrow ? false : true, rows: attr.input_rows, style: { 'white-space': 'pre-line' } }, required, { value: txt_value, erroText: attr.input_validation_error_message })),
            ];
          case 'datetime-local':
            const timestamp = parseInt(processTokens(attr.input_data_value, api));
            // convert timestamp to local UTC date
            let date = timestamp ? new Date(timestamp) : new Date();
            date = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            const time = date.toISOString();
            return [
              h("ion-datetime-button", { class: "date-button", datetime: "datetime" }),
              h("ion-modal", { keepContentsMounted: true }, h("ion-datetime", Object.assign({ label: "", id: "datetime", presentation: "date-time", preferWheel: true, name: attr.input_name, disabled: '0' === attr.input_disabled ? false : true, readonly: '0' === attr.input_read_only ? false : true }, required, { value: time }))),
            ];
          case 'password':
            const pvalue = processValue(attr.input_value_source, attr.input_data_value, attr);
            let ptype = 'password';
            return [
              h("div", { style: { 'z-index': '9999', 'position': 'absolute', 'right': '16px', 'top': '30%' }, onClick: () => this.togglePassword(attr.input_name) }, h("ion-icon", { style: { fontSize: '24px' }, color: "medium", slot: "end", name: "eye-outline" })),
              h("ion-input", Object.assign({ label: "", id: attr.input_name, name: attr.input_name, type: ptype, placeholder: attr.input_placeholder, disabled: '0' === attr.input_disabled ? false : true, readonly: '0' === attr.input_read_only ? false : true, autocomplete: (_a = attr.input_autocomplete) !== null && _a !== void 0 ? _a : 'off', inputmode: attr.input_inputmode }, required, { value: pvalue, onIonChange: e => this.validateInput(e, attr) })),
            ];
          case 'range':
            return (h("ion-range", { id: attr.input_name, label: "", min: attr.input_range_min, max: attr.input_range_max, step: attr.input_step_size, onIonChange: e => runAction({ action: 'custom', data: { custom_action: 'savePreference', key: attr.input_name, value: e.detail.value } }) }));
          default:
            const value = processValue(attr.input_data_value_source, attr.input_data_value, attr);
            this.el.style.width = '100%';
            return [
              h("ion-input", Object.assign({ label: "", id: attr.input_name, name: attr.input_name, type: attr.input_input_type, placeholder: attr.input_placeholder, disabled: '0' === attr.input_disabled ? false : true, readonly: '0' === attr.input_read_only ? false : true }, required, { value: value, onIonChange: e => this.validateInput(e, attr) })),
            ];
        }
      case 'toggle':
        return [
          h("ion-toggle", { label: "", slot: "end", name: attr.input_name, color: attr.toggle_color, value: attr.toggle_value, onIonChange: e => this.validateInput(e, attr) }),
          h("p", { innerHTML: attr.checkbox_description }),
        ];
      case 'select':
        window['event_attr'] = attr;
        const method = new Function('el', attr.select_event_code);
        let value = processValue(attr.select_data_value_source, attr.select_data_value, attr, api);
        const select_required = attr.select_required && '1' === attr.select_required ? { ['required']: true } : {};
        if (value && '1' === attr.select_multiple_select && value !== '') {
          value = value.split(',');
        }
        const customAlertOptions = {
          header: attr.select_placeholder,
          subHeader: '',
          message: '',
          translucent: true,
          id: `select-${attr.input_name}`,
        };
        return [
          h("ion-select", Object.assign({ label: "", id: attr.input_name, name: attr.input_name, value: value, okText: attr.select_ok_text, cancelText: attr.select_cancel_text, placeholder: attr.select_placeholder, interface: attr.select_interface, multiple: '1' === attr.select_multiple_select ? true : false, interfaceOptions: customAlertOptions }, select_required, { onIonFocus: async (e) => await method(e), erroText: attr.input_validation_error_message }), attr.select_options.map(item => (h("ion-select-option", { value: item.value }, item.label)))),
        ];
      case 'checkbox':
        return [
          h("div", { style: { 'display': 'flex', 'align-items': 'center' } }, h("ion-checkbox", { "aria-label": "", id: attr.input_name, name: attr.input_name, slot: "start", color: attr.checkbox_color, value: attr.checkbox_value, onIonChange: e => this.validateInput(e, attr), erroText: attr.input_validation_error_message }), h("p", { style: { display: 'inline', padding: '0 6px' }, innerHTML: `${attr.checkbox_required_text} ${attr.checkbox_description}` })),
        ];
      default:
        break;
    }
  }
  validateInput(e, attr) {
    const parent = e.target.parentElement.parentElement;
    if ('1' === attr.input_validation && '' !== attr.input_validation_pattern) {
      parent.classList.remove('ion-valid');
      parent.classList.remove('ion-invalid');
      const matched = e.detail.value.match(attr.input_validation_pattern);
      if (matched) {
        parent.classList.add('ion-valid');
      }
      else {
        parent.classList.add('ion-invalid');
      }
    }
  }
  togglePassword(e) {
    const input = document.querySelector(`input[name="${e}"]`);
    const attr = input.getAttribute('type');
    const type = attr === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
  }
  render() {
    return h(Host, null, this.state && this.renderInput(this.state, this.api));
  }
  get el() { return getElement(this); }
};
AppInput.style = appInputCss;

export { AppInput as app_input };
