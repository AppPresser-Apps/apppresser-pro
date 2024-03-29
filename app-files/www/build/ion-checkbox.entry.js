import { r as registerInstance, t as createEvent, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { g as getIonMode } from './ionic-global-74a19eaa.js';
import { c as createLegacyFormController } from './index-ca581420.js';
import { i as inheritAriaAttributes, n as renderHiddenInput, o as getAriaLabel } from './helpers-6885e51a.js';
import { p as printIonWarning } from './index-2ee22356.js';
import { c as createColorClasses, h as hostContext } from './theme-7ef00c83.js';

const checkboxIosCss = ":host{--checkbox-background-checked:var(--ion-color-primary, #3880ff);--border-color-checked:var(--ion-color-primary, #3880ff);--checkmark-color:var(--ion-color-primary-contrast, #fff);--checkmark-width:1;--transition:none;display:inline-block;position:relative;cursor:pointer;user-select:none;z-index:2}:host(.in-item){width:100%;height:100%}:host(.in-item[slot=start]:not(.legacy-checkbox)),:host(.in-item[slot=end]:not(.legacy-checkbox)){width:auto}:host(.legacy-checkbox){width:var(--size);height:var(--size)}:host(.ion-color){--checkbox-background-checked:var(--ion-color-base);--border-color-checked:var(--ion-color-base);--checkmark-color:var(--ion-color-contrast)}:host(.legacy-checkbox) label{top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;appearance:none;outline:none;display:flex;align-items:center;opacity:0}@supports (inset-inline-start: 0){:host(.legacy-checkbox) label{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.legacy-checkbox) label{left:0}:host-context([dir=rtl]):host(.legacy-checkbox) label,:host-context([dir=rtl]).legacy-checkbox label{left:unset;right:unset;right:0}}:host(.legacy-checkbox) label::-moz-focus-inner{border:0}.checkbox-wrapper{display:flex;flex-grow:1;align-items:center;height:inherit;cursor:inherit}.label-text-wrapper{pointer-events:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.native-wrapper{display:flex;align-items:center}.checkbox-icon{border-radius:var(--border-radius);position:relative;transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--checkbox-background);box-sizing:border-box}:host(.legacy-checkbox) .checkbox-icon{display:block;width:100%;height:100%}:host(:not(.legacy-checkbox)) .checkbox-icon{width:var(--size);height:var(--size)}.checkbox-icon path{fill:none;stroke:var(--checkmark-color);stroke-width:var(--checkmark-width);opacity:0}:host(.checkbox-justify-space-between) .checkbox-wrapper{justify-content:space-between}:host(.checkbox-justify-start) .checkbox-wrapper{justify-content:start}:host(.checkbox-justify-end) .checkbox-wrapper{justify-content:end}:host(.checkbox-label-placement-start) .checkbox-wrapper{flex-direction:row}:host(.checkbox-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-end) .checkbox-wrapper{flex-direction:row-reverse}:host(.checkbox-label-placement-end) .label-text-wrapper{-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.checkbox-checked) .checkbox-icon,:host(.checkbox-indeterminate) .checkbox-icon{border-color:var(--border-color-checked);background:var(--checkbox-background-checked)}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{opacity:1}:host(.checkbox-disabled){pointer-events:none}:host{--border-radius:50%;--border-width:1px;--border-style:solid;--border-color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.23);--checkbox-background:var(--ion-item-background, var(--ion-background-color, #fff));--size:26px}:host(.checkbox-disabled){opacity:0.3}:host(.in-item.legacy-checkbox){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:10px;margin-bottom:9px;display:block;position:static}:host(.in-item.legacy-checkbox[slot=start]){-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:8px;margin-bottom:8px}";

const checkboxMdCss = ":host{--checkbox-background-checked:var(--ion-color-primary, #3880ff);--border-color-checked:var(--ion-color-primary, #3880ff);--checkmark-color:var(--ion-color-primary-contrast, #fff);--checkmark-width:1;--transition:none;display:inline-block;position:relative;cursor:pointer;user-select:none;z-index:2}:host(.in-item){width:100%;height:100%}:host(.in-item[slot=start]:not(.legacy-checkbox)),:host(.in-item[slot=end]:not(.legacy-checkbox)){width:auto}:host(.legacy-checkbox){width:var(--size);height:var(--size)}:host(.ion-color){--checkbox-background-checked:var(--ion-color-base);--border-color-checked:var(--ion-color-base);--checkmark-color:var(--ion-color-contrast)}:host(.legacy-checkbox) label{top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;appearance:none;outline:none;display:flex;align-items:center;opacity:0}@supports (inset-inline-start: 0){:host(.legacy-checkbox) label{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.legacy-checkbox) label{left:0}:host-context([dir=rtl]):host(.legacy-checkbox) label,:host-context([dir=rtl]).legacy-checkbox label{left:unset;right:unset;right:0}}:host(.legacy-checkbox) label::-moz-focus-inner{border:0}.checkbox-wrapper{display:flex;flex-grow:1;align-items:center;height:inherit;cursor:inherit}.label-text-wrapper{pointer-events:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.native-wrapper{display:flex;align-items:center}.checkbox-icon{border-radius:var(--border-radius);position:relative;transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--checkbox-background);box-sizing:border-box}:host(.legacy-checkbox) .checkbox-icon{display:block;width:100%;height:100%}:host(:not(.legacy-checkbox)) .checkbox-icon{width:var(--size);height:var(--size)}.checkbox-icon path{fill:none;stroke:var(--checkmark-color);stroke-width:var(--checkmark-width);opacity:0}:host(.checkbox-justify-space-between) .checkbox-wrapper{justify-content:space-between}:host(.checkbox-justify-start) .checkbox-wrapper{justify-content:start}:host(.checkbox-justify-end) .checkbox-wrapper{justify-content:end}:host(.checkbox-label-placement-start) .checkbox-wrapper{flex-direction:row}:host(.checkbox-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-end) .checkbox-wrapper{flex-direction:row-reverse}:host(.checkbox-label-placement-end) .label-text-wrapper{-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}:host(.checkbox-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.checkbox-checked) .checkbox-icon,:host(.checkbox-indeterminate) .checkbox-icon{border-color:var(--border-color-checked);background:var(--checkbox-background-checked)}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{opacity:1}:host(.checkbox-disabled){pointer-events:none}:host{--border-radius:calc(var(--size) * .125);--border-width:2px;--border-style:solid;--border-color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.51);--checkmark-width:3;--checkbox-background:var(--ion-item-background, var(--ion-background-color, #fff));--transition:background 180ms cubic-bezier(0.4, 0, 0.2, 1);--size:18px}.checkbox-icon path{stroke-dasharray:30;stroke-dashoffset:30}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{stroke-dashoffset:0;transition:stroke-dashoffset 90ms linear 90ms}:host(.checkbox-disabled){opacity:0.3}:host(.in-item.legacy-checkbox){margin-left:0;margin-right:0;margin-top:18px;margin-bottom:18px;display:block;position:static}:host(.in-item.legacy-checkbox[slot=start]){-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:36px;margin-inline-end:36px;margin-top:18px;margin-bottom:18px}";

const Checkbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionChange = createEvent(this, "ionChange", 7);
    this.ionFocus = createEvent(this, "ionFocus", 7);
    this.ionBlur = createEvent(this, "ionBlur", 7);
    this.ionStyle = createEvent(this, "ionStyle", 7);
    this.inputId = `ion-cb-${checkboxIds++}`;
    this.inheritedAttributes = {};
    // TODO(FW-3100): remove this
    // This flag ensures we log the deprecation warning at most once.
    this.hasLoggedDeprecationWarning = false;
    /**
     * Sets the checked property and emits
     * the ionChange event. Use this to update the
     * checked state in response to user-generated
     * actions such as a click.
     */
    this.setChecked = (state) => {
      const isChecked = (this.checked = state);
      this.ionChange.emit({
        checked: isChecked,
        value: this.value,
      });
    };
    this.toggleChecked = (ev) => {
      ev.preventDefault();
      this.setFocus();
      this.setChecked(!this.checked);
      this.indeterminate = false;
    };
    this.onFocus = () => {
      this.ionFocus.emit();
    };
    this.onBlur = () => {
      this.ionBlur.emit();
    };
    this.color = undefined;
    this.name = this.inputId;
    this.checked = false;
    this.indeterminate = false;
    this.disabled = false;
    this.value = 'on';
    this.labelPlacement = 'start';
    this.justify = 'space-between';
    this.legacy = undefined;
  }
  // TODO(FW-3100): remove this
  connectedCallback() {
    this.legacyFormController = createLegacyFormController(this.el);
  }
  componentWillLoad() {
    this.emitStyle();
    // TODO(FW-3100): remove check
    if (!this.legacyFormController.hasLegacyControl()) {
      this.inheritedAttributes = Object.assign({}, inheritAriaAttributes(this.el));
    }
  }
  styleChanged() {
    this.emitStyle();
  }
  emitStyle() {
    const style = {
      'interactive-disabled': this.disabled,
    };
    // TODO(FW-3100): remove this
    if (this.legacyFormController.hasLegacyControl()) {
      style['checkbox-checked'] = this.checked;
    }
    this.ionStyle.emit(style);
  }
  setFocus() {
    if (this.focusEl) {
      this.focusEl.focus();
    }
  }
  // TODO(FW-3100): run contents of renderCheckbox directly instead
  render() {
    const { legacyFormController } = this;
    return legacyFormController.hasLegacyControl() ? this.renderLegacyCheckbox() : this.renderCheckbox();
  }
  renderCheckbox() {
    const { color, checked, disabled, el, getSVGPath, indeterminate, inheritedAttributes, inputId, justify, labelPlacement, name, value, } = this;
    const mode = getIonMode(this);
    const path = getSVGPath(mode, indeterminate);
    renderHiddenInput(true, el, name, checked ? value : '', disabled);
    return (h(Host, { class: createColorClasses(color, {
        [mode]: true,
        'in-item': hostContext('ion-item', el),
        'checkbox-checked': checked,
        'checkbox-disabled': disabled,
        'checkbox-indeterminate': indeterminate,
        interactive: true,
        [`checkbox-justify-${justify}`]: true,
        [`checkbox-label-placement-${labelPlacement}`]: true,
      }) }, h("label", { class: "checkbox-wrapper" }, h("input", Object.assign({ type: "checkbox", checked: checked ? true : undefined, disabled: disabled, id: inputId, onChange: this.toggleChecked, onFocus: () => this.onFocus(), onBlur: () => this.onBlur(), ref: (focusEl) => (this.focusEl = focusEl) }, inheritedAttributes)), h("div", { class: {
        'label-text-wrapper': true,
        'label-text-wrapper-hidden': el.textContent === '',
      } }, h("slot", null)), h("div", { class: "native-wrapper" }, h("svg", { class: "checkbox-icon", viewBox: "0 0 24 24", part: "container" }, path)))));
  }
  // TODO(FW-3100): remove this
  renderLegacyCheckbox() {
    if (!this.hasLoggedDeprecationWarning) {
      printIonWarning(`ion-checkbox now requires providing a label with either the default slot or the "aria-label" attribute. To migrate, remove any usage of "ion-label" and pass the label text to either the component or the "aria-label" attribute.

Example: <ion-checkbox>Label</ion-checkbox>
Example with aria-label: <ion-checkbox aria-label="Label"></ion-checkbox>

Developers can use the "legacy" property to continue using the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.`, this.el);
      if (this.legacy) {
        printIonWarning(`ion-checkbox is being used with the "legacy" property enabled which will forcibly enable the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.
Developers can dismiss this warning by removing their usage of the "legacy" property and using the new checkbox syntax.`, this.el);
      }
      this.hasLoggedDeprecationWarning = true;
    }
    const { color, checked, disabled, el, getSVGPath, indeterminate, inputId, name, value } = this;
    const mode = getIonMode(this);
    const { label, labelId, labelText } = getAriaLabel(el, inputId);
    const path = getSVGPath(mode, indeterminate);
    renderHiddenInput(true, el, name, checked ? value : '', disabled);
    return (h(Host, { "aria-labelledby": label ? labelId : null, "aria-checked": `${checked}`, "aria-hidden": disabled ? 'true' : null, role: "checkbox", class: createColorClasses(color, {
        [mode]: true,
        'in-item': hostContext('ion-item', el),
        'checkbox-checked': checked,
        'checkbox-disabled': disabled,
        'checkbox-indeterminate': indeterminate,
        'legacy-checkbox': true,
        interactive: true,
      }) }, h("svg", { class: "checkbox-icon", viewBox: "0 0 24 24", part: "container" }, path), h("label", { htmlFor: inputId }, labelText), h("input", { type: "checkbox", "aria-checked": `${checked}`, disabled: disabled, id: inputId, onChange: this.toggleChecked, onFocus: () => this.onFocus(), onBlur: () => this.onBlur(), ref: (focusEl) => (this.focusEl = focusEl) })));
  }
  getSVGPath(mode, indeterminate) {
    let path = indeterminate ? (h("path", { d: "M6 12L18 12", part: "mark" })) : (h("path", { d: "M5.9,12.5l3.8,3.8l8.8-8.8", part: "mark" }));
    if (mode === 'md') {
      path = indeterminate ? (h("path", { d: "M2 12H22", part: "mark" })) : (h("path", { d: "M1.73,12.91 8.1,19.28 22.79,4.59", part: "mark" }));
    }
    return path;
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "checked": ["styleChanged"],
    "disabled": ["styleChanged"]
  }; }
};
let checkboxIds = 0;
Checkbox.style = {
  ios: checkboxIosCss,
  md: checkboxMdCss
};

export { Checkbox as ion_checkbox };
