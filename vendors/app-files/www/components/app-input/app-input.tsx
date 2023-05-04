import { Component, Host, h, ComponentInterface, Prop, Method, Element, State } from '@stencil/core';
import { TextFieldTypes } from '@ionic/core';
import { runAction } from '../../helpers/actions';
import { processTokens, processValue, processOptions } from '../../helpers/tokens';

@Component({
  tag: 'app-input',
  styleUrl: 'app-input.css',
})
export class AppInput implements ComponentInterface {
  @Element() el: HTMLElement;

  @Prop() data;
  @Prop() api;

  @State() state;

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
    this.state = { ...this.data };
  }

  @Method()
  async updateInput(_input, value?) {
    if (value) {
      this.data.select_data_value = value;
      this.reloadInput(_input);
    }

    return;
  }

  @Method()
  async reloadInput(_input) {
    this.state = null;

    setTimeout(() => {
      this.loadInput();
    }, 100);

    return;
  }

  renderInput(attr, api) {
  
    switch (attr.input_type) {
      case 'input':
        const required = attr.input_required && '1' === attr.input_required ? { ['required']: true } : {};

        switch (attr.input_input_type) {
          case 'textarea':
            const txt_value = processValue(attr.input_data_value_source, attr.input_data_value, attr);

            return [
              <ion-textarea
                label=""
                id={attr.input_name}
                name={attr.input_name}
                placeholder={attr.input_placeholder}
                disabled={'0' === attr.input_disabled ? false : true}
                readonly={'0' === attr.input_read_only ? false : true}
                autoGrow={'0' === attr.input_autogrow ? false : true}
                rows={attr.input_rows}
                style={{ 'white-space': 'pre-line' }}
                {...required}
                value={txt_value}
                erroText={attr.input_validation_error_message}
              ></ion-textarea>,
            ];
          case 'datetime-local':
            const timestamp = parseInt(processTokens(attr.input_data_value, api));

            // convert timestamp to local UTC date
            let date = timestamp ? new Date(timestamp) : new Date();
            date = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            const time = date.toISOString();

            return [
              <ion-datetime-button class="date-button" datetime="datetime"></ion-datetime-button>,

              <ion-modal keepContentsMounted={true}>
                <ion-datetime
                  label=""
                  id="datetime"
                  presentation="date-time"
                  preferWheel={true}
                  name={attr.input_name}
                  disabled={'0' === attr.input_disabled ? false : true}
                  readonly={'0' === attr.input_read_only ? false : true}
                  {...required}
                  value={time}
                ></ion-datetime>
              </ion-modal>,
            ];

          case 'password':
            const pvalue = processValue(attr.input_value_source, attr.input_data_value, attr);
            let ptype = 'password';
            return [
              <div style={{ 'z-index': '9999', 'position': 'absolute', 'right': '16px', 'top': '30%' }} onClick={() => this.togglePassword(attr.input_name)}>
                <ion-icon style={{ fontSize: '24px' }} color="medium" slot="end" name="eye-outline"></ion-icon>
              </div>,

              <ion-input
                label=""
                id={attr.input_name}
                name={attr.input_name}
                type={ptype as TextFieldTypes}
                placeholder={attr.input_placeholder}
                disabled={'0' === attr.input_disabled ? false : true}
                readonly={'0' === attr.input_read_only ? false : true}
                autocomplete={attr.input_autocomplete ?? 'off'}
                inputmode={attr.input_inputmode}
                {...required}
                value={pvalue}
                onIonChange={e => this.validateInput(e, attr)}
              ></ion-input>,
            ];

          case 'range':
            return (
              <ion-range
                id={attr.input_name}
                label=""
                min={attr.input_range_min}
                max={attr.input_range_max}
                step={attr.input_step_size}
                onIonChange={e => runAction({ action: 'custom', data: { custom_action: 'savePreference', key: attr.input_name, value: e.detail.value } })}
              ></ion-range>
            );

          default:
            const value = processValue(attr.input_data_value_source, attr.input_data_value, attr);

            this.el.style.width = '100%';

            return [
              <ion-input
                label=""
                id={attr.input_name}
                name={attr.input_name}
                type={attr.input_input_type}
                placeholder={attr.input_placeholder}
                disabled={'0' === attr.input_disabled ? false : true}
                readonly={'0' === attr.input_read_only ? false : true}
                {...required}
                value={value}
                onIonChange={e => this.validateInput(e, attr)}
              ></ion-input>,
            ];
        }

      case 'toggle':

        return [
          <ion-toggle label="" slot="end" name={attr.input_name} color={attr.toggle_color} value={attr.toggle_value} onIonChange={e => this.validateInput(e, attr)}></ion-toggle>,
          <p innerHTML={attr.checkbox_description}></p>,
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
          <ion-select
            label=""
            id={attr.input_name}
            name={attr.input_name}
            value={value}
            okText={attr.select_ok_text}
            cancelText={attr.select_cancel_text}
            placeholder={attr.select_placeholder}
            interface={attr.select_interface}
            multiple={'1' === attr.select_multiple_select ? true : false}
            interfaceOptions={customAlertOptions}
            {...select_required}
            onIonFocus={async e => await method(e)}
            erroText={attr.input_validation_error_message}
          >
            {attr.select_options.map(item => (
              <ion-select-option value={item.value}>{item.label}</ion-select-option>
            ))}
          </ion-select>,
        ];

      case 'checkbox':
        return [
          <div style={{ 'display': 'flex', 'align-items': 'center' }}>
            <ion-checkbox
              aria-label=""
              id={attr.input_name}
              name={attr.input_name}
              slot="start"
              color={attr.checkbox_color}
              value={attr.checkbox_value}
              onIonChange={e => this.validateInput(e, attr)}
              erroText={attr.input_validation_error_message}
            ></ion-checkbox>
            <p style={{ display: 'inline', padding: '0 6px' }} innerHTML={`${attr.checkbox_required_text} ${attr.checkbox_description}`}></p>
          </div>,
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
      } else {
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
    return <Host>{this.state && this.renderInput(this.state, this.api)}</Host>;
  }
}
