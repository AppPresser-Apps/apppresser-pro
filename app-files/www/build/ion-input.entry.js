import { r as registerInstance, t as createEvent, i as Build, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { f as closeCircle, g as closeSharp } from './index-6e2e0b09.js';
import { g as getIonMode } from './ionic-global-74a19eaa.js';
import { c as createLegacyFormController } from './index-ca581420.js';
import { j as debounceEvent, i as inheritAriaAttributes, m as inheritAttributes, q as findItemLabel } from './helpers-6885e51a.js';
import { p as printIonWarning } from './index-2ee22356.js';
import { h as hostContext, c as createColorClasses } from './theme-7ef00c83.js';
import { g as getCounterText } from './input.utils-049ec602.js';

const inputIosCss = ".sc-ion-input-ios-h{--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:0.6;--padding-top:0px;--padding-end:0px;--padding-bottom:0px;--padding-start:0px;--background:transparent;--color:initial;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #3880ff);--highlight-color-valid:var(--ion-color-success, #2dd36f);--highlight-color-invalid:var(--ion-color-danger, #eb445a);--highlight-color:var(--highlight-color-focused);display:block;position:relative;width:100%;padding:0 !important;color:var(--color);font-family:var(--ion-font-family, inherit);z-index:2}.legacy-input.sc-ion-input-ios-h{display:flex;flex:1;align-items:center;background:var(--background)}.legacy-input.sc-ion-input-ios-h .native-input.sc-ion-input-ios{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius)}ion-item.sc-ion-input-ios-h:not(.item-label):not(.item-has-modern-input),ion-item:not(.item-label):not(.item-has-modern-input) .sc-ion-input-ios-h{--padding-start:0}ion-item[slot=start].sc-ion-input-ios-h,ion-item [slot=start].sc-ion-input-ios-h,ion-item[slot=end].sc-ion-input-ios-h,ion-item [slot=end].sc-ion-input-ios-h{width:auto}.legacy-input.ion-color.sc-ion-input-ios-h{color:var(--ion-color-base)}.ion-color.sc-ion-input-ios-h{--highlight-color-focused:var(--ion-color-base)}.native-input.sc-ion-input-ios{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:inline-block;position:relative;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;box-sizing:border-box;appearance:none;z-index:1}.native-input.sc-ion-input-ios::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios:-webkit-autofill{background-color:transparent}.native-input.sc-ion-input-ios:invalid{box-shadow:none}.native-input.sc-ion-input-ios::-ms-clear{display:none}.legacy-input.sc-ion-input-ios-h .native-input[disabled].sc-ion-input-ios,.input-disabled.sc-ion-input-ios-h{opacity:0.4}.cloned-input.sc-ion-input-ios{top:0;position:absolute;pointer-events:none}@supports (inset-inline-start: 0){.cloned-input.sc-ion-input-ios{inset-inline-start:0}}@supports not (inset-inline-start: 0){.cloned-input.sc-ion-input-ios{left:0}[dir=rtl].sc-ion-input-ios .cloned-input.sc-ion-input-ios,[dir=rtl].sc-ion-input-ios-h .cloned-input.sc-ion-input-ios,[dir=rtl] .sc-ion-input-ios-h .cloned-input.sc-ion-input-ios{left:unset;right:unset;right:0}}.cloned-input.sc-ion-input-ios:disabled{opacity:1}.legacy-input.sc-ion-input-ios-h .input-clear-icon.sc-ion-input-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.input-clear-icon.sc-ion-input-ios{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:auto;margin-bottom:auto;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;background-position:center;display:flex;align-items:center;justify-content:center;width:30px;height:30px;border:0;outline:none;background-color:transparent;background-repeat:no-repeat;color:var(--ion-color-step-600, #666666);visibility:hidden;appearance:none}.in-item-color.sc-ion-input-ios-h .input-clear-icon.sc-ion-input-ios{color:inherit}.input-clear-icon.sc-ion-input-ios:focus{opacity:0.5}.has-value.sc-ion-input-ios-h .input-clear-icon.sc-ion-input-ios{visibility:visible}.has-focus.sc-ion-input-ios-h{pointer-events:none}.has-focus.sc-ion-input-ios-h input.sc-ion-input-ios,.has-focus.sc-ion-input-ios-h a.sc-ion-input-ios,.has-focus.sc-ion-input-ios-h button.sc-ion-input-ios{pointer-events:auto}.item-label-floating.item-has-placeholder.sc-ion-input-ios-h:not(.item-has-value),.item-label-floating.item-has-placeholder:not(.item-has-value) .sc-ion-input-ios-h{opacity:0}.item-label-floating.item-has-placeholder.sc-ion-input-ios-h:not(.item-has-value).item-has-focus,.item-label-floating.item-has-placeholder:not(.item-has-value).item-has-focus .sc-ion-input-ios-h{transition:opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);opacity:1}.input-wrapper.sc-ion-input-ios{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius);display:flex;position:relative;flex-grow:1;align-items:stretch;height:inherit;min-height:inherit;transition:background-color 15ms linear;background:var(--background)}.native-wrapper.sc-ion-input-ios{display:flex;flex-grow:1;width:100%}.ion-touched.ion-invalid.sc-ion-input-ios-h{--highlight-color:var(--highlight-color-invalid)}.ion-valid.sc-ion-input-ios-h{--highlight-color:var(--highlight-color-valid)}.input-bottom.sc-ion-input-ios{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:5px;padding-bottom:0;display:flex;justify-content:space-between;border-top:var(--border-width) var(--border-style) var(--border-color);font-size:12px}.has-focus.ion-valid.sc-ion-input-ios-h,.ion-touched.ion-invalid.sc-ion-input-ios-h{--border-color:var(--highlight-color)}.input-bottom.sc-ion-input-ios .error-text.sc-ion-input-ios{display:none;color:var(--highlight-color-invalid)}.input-bottom.sc-ion-input-ios .helper-text.sc-ion-input-ios{display:block;color:var(--ion-color-step-550, #737373)}.ion-touched.ion-invalid.sc-ion-input-ios-h .input-bottom.sc-ion-input-ios .error-text.sc-ion-input-ios{display:block}.ion-touched.ion-invalid.sc-ion-input-ios-h .input-bottom.sc-ion-input-ios .helper-text.sc-ion-input-ios{display:none}.input-bottom.sc-ion-input-ios .counter.sc-ion-input-ios{-webkit-margin-start:auto;margin-inline-start:auto;color:var(--ion-color-step-550, #737373);white-space:nowrap;padding-inline-start:16px}.has-focus.sc-ion-input-ios-h input.sc-ion-input-ios{caret-color:var(--highlight-color)}.label-text-wrapper.sc-ion-input-ios{display:flex;align-items:center;max-width:200px;transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}.label-text.sc-ion-input-ios{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.input-wrapper.sc-ion-input-ios input.sc-ion-input-ios{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.input-label-placement-start.sc-ion-input-ios-h .input-wrapper.sc-ion-input-ios{flex-direction:row}.input-label-placement-start.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}.input-label-placement-end.sc-ion-input-ios-h .input-wrapper.sc-ion-input-ios{flex-direction:row-reverse}.input-label-placement-end.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}.input-label-placement-fixed.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}.input-label-placement-fixed.sc-ion-input-ios-h .label-text.sc-ion-input-ios{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.input-label-placement-stacked.sc-ion-input-ios-h .input-wrapper.sc-ion-input-ios,.input-label-placement-floating.sc-ion-input-ios-h .input-wrapper.sc-ion-input-ios{flex-direction:column;align-items:start}.input-label-placement-stacked.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,.input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{transform-origin:left top;max-width:100%}[dir=rtl].sc-ion-input-ios-h -no-combinator.input-label-placement-stacked.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl] .sc-ion-input-ios-h -no-combinator.input-label-placement-stacked.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl].input-label-placement-stacked.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl] .input-label-placement-stacked.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl].sc-ion-input-ios-h -no-combinator.input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl] .sc-ion-input-ios-h -no-combinator.input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl].input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl] .input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{transform-origin:right top}.input-label-placement-stacked.sc-ion-input-ios-h input.sc-ion-input-ios,.input-label-placement-floating.sc-ion-input-ios-h input.sc-ion-input-ios{margin-left:0;margin-right:0;margin-top:1px;margin-bottom:0}.input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{transform:translateY(100%) scale(1)}.input-label-placement-floating.sc-ion-input-ios-h input.sc-ion-input-ios{opacity:0}.has-focus.input-label-placement-floating.sc-ion-input-ios-h input.sc-ion-input-ios,.has-value.input-label-placement-floating.sc-ion-input-ios-h input.sc-ion-input-ios{opacity:1}.input-label-placement-stacked.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,.has-focus.input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,.has-value.input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}.sc-ion-input-ios-h{--border-width:0.55px;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));font-size:inherit}.legacy-input.sc-ion-input-ios-h{--padding-top:10px;--padding-end:8px;--padding-bottom:10px;--padding-start:0}.item-label-stacked.sc-ion-input-ios-h,.item-label-stacked .sc-ion-input-ios-h,.item-label-floating.sc-ion-input-ios-h,.item-label-floating .sc-ion-input-ios-h{--padding-top:8px;--padding-bottom:8px;--padding-start:0px}.input-clear-icon.sc-ion-input-ios ion-icon.sc-ion-input-ios{width:18px;height:18px}.sc-ion-input-ios-h:not(.legacy-input){min-height:44px}.input-label-placement-floating.sc-ion-input-ios-h,.input-label-placement-stacked.sc-ion-input-ios-h{min-height:56px}";

const inputMdCss = ".sc-ion-input-md-h{--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:0.6;--padding-top:0px;--padding-end:0px;--padding-bottom:0px;--padding-start:0px;--background:transparent;--color:initial;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #3880ff);--highlight-color-valid:var(--ion-color-success, #2dd36f);--highlight-color-invalid:var(--ion-color-danger, #eb445a);--highlight-color:var(--highlight-color-focused);display:block;position:relative;width:100%;padding:0 !important;color:var(--color);font-family:var(--ion-font-family, inherit);z-index:2}.legacy-input.sc-ion-input-md-h{display:flex;flex:1;align-items:center;background:var(--background)}.legacy-input.sc-ion-input-md-h .native-input.sc-ion-input-md{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius)}ion-item.sc-ion-input-md-h:not(.item-label):not(.item-has-modern-input),ion-item:not(.item-label):not(.item-has-modern-input) .sc-ion-input-md-h{--padding-start:0}ion-item[slot=start].sc-ion-input-md-h,ion-item [slot=start].sc-ion-input-md-h,ion-item[slot=end].sc-ion-input-md-h,ion-item [slot=end].sc-ion-input-md-h{width:auto}.legacy-input.ion-color.sc-ion-input-md-h{color:var(--ion-color-base)}.ion-color.sc-ion-input-md-h{--highlight-color-focused:var(--ion-color-base)}.native-input.sc-ion-input-md{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:inline-block;position:relative;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;box-sizing:border-box;appearance:none;z-index:1}.native-input.sc-ion-input-md::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-md:-webkit-autofill{background-color:transparent}.native-input.sc-ion-input-md:invalid{box-shadow:none}.native-input.sc-ion-input-md::-ms-clear{display:none}.legacy-input.sc-ion-input-md-h .native-input[disabled].sc-ion-input-md,.input-disabled.sc-ion-input-md-h{opacity:0.4}.cloned-input.sc-ion-input-md{top:0;position:absolute;pointer-events:none}@supports (inset-inline-start: 0){.cloned-input.sc-ion-input-md{inset-inline-start:0}}@supports not (inset-inline-start: 0){.cloned-input.sc-ion-input-md{left:0}[dir=rtl].sc-ion-input-md .cloned-input.sc-ion-input-md,[dir=rtl].sc-ion-input-md-h .cloned-input.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h .cloned-input.sc-ion-input-md{left:unset;right:unset;right:0}}.cloned-input.sc-ion-input-md:disabled{opacity:1}.legacy-input.sc-ion-input-md-h .input-clear-icon.sc-ion-input-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.input-clear-icon.sc-ion-input-md{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:auto;margin-bottom:auto;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;background-position:center;display:flex;align-items:center;justify-content:center;width:30px;height:30px;border:0;outline:none;background-color:transparent;background-repeat:no-repeat;color:var(--ion-color-step-600, #666666);visibility:hidden;appearance:none}.in-item-color.sc-ion-input-md-h .input-clear-icon.sc-ion-input-md{color:inherit}.input-clear-icon.sc-ion-input-md:focus{opacity:0.5}.has-value.sc-ion-input-md-h .input-clear-icon.sc-ion-input-md{visibility:visible}.has-focus.sc-ion-input-md-h{pointer-events:none}.has-focus.sc-ion-input-md-h input.sc-ion-input-md,.has-focus.sc-ion-input-md-h a.sc-ion-input-md,.has-focus.sc-ion-input-md-h button.sc-ion-input-md{pointer-events:auto}.item-label-floating.item-has-placeholder.sc-ion-input-md-h:not(.item-has-value),.item-label-floating.item-has-placeholder:not(.item-has-value) .sc-ion-input-md-h{opacity:0}.item-label-floating.item-has-placeholder.sc-ion-input-md-h:not(.item-has-value).item-has-focus,.item-label-floating.item-has-placeholder:not(.item-has-value).item-has-focus .sc-ion-input-md-h{transition:opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);opacity:1}.input-wrapper.sc-ion-input-md{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius);display:flex;position:relative;flex-grow:1;align-items:stretch;height:inherit;min-height:inherit;transition:background-color 15ms linear;background:var(--background)}.native-wrapper.sc-ion-input-md{display:flex;flex-grow:1;width:100%}.ion-touched.ion-invalid.sc-ion-input-md-h{--highlight-color:var(--highlight-color-invalid)}.ion-valid.sc-ion-input-md-h{--highlight-color:var(--highlight-color-valid)}.input-bottom.sc-ion-input-md{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:5px;padding-bottom:0;display:flex;justify-content:space-between;border-top:var(--border-width) var(--border-style) var(--border-color);font-size:12px}.has-focus.ion-valid.sc-ion-input-md-h,.ion-touched.ion-invalid.sc-ion-input-md-h{--border-color:var(--highlight-color)}.input-bottom.sc-ion-input-md .error-text.sc-ion-input-md{display:none;color:var(--highlight-color-invalid)}.input-bottom.sc-ion-input-md .helper-text.sc-ion-input-md{display:block;color:var(--ion-color-step-550, #737373)}.ion-touched.ion-invalid.sc-ion-input-md-h .input-bottom.sc-ion-input-md .error-text.sc-ion-input-md{display:block}.ion-touched.ion-invalid.sc-ion-input-md-h .input-bottom.sc-ion-input-md .helper-text.sc-ion-input-md{display:none}.input-bottom.sc-ion-input-md .counter.sc-ion-input-md{-webkit-margin-start:auto;margin-inline-start:auto;color:var(--ion-color-step-550, #737373);white-space:nowrap;padding-inline-start:16px}.has-focus.sc-ion-input-md-h input.sc-ion-input-md{caret-color:var(--highlight-color)}.label-text-wrapper.sc-ion-input-md{display:flex;align-items:center;max-width:200px;transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}.label-text.sc-ion-input-md{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.input-wrapper.sc-ion-input-md input.sc-ion-input-md{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.input-label-placement-start.sc-ion-input-md-h .input-wrapper.sc-ion-input-md{flex-direction:row}.input-label-placement-start.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}.input-label-placement-end.sc-ion-input-md-h .input-wrapper.sc-ion-input-md{flex-direction:row-reverse}.input-label-placement-end.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}.input-label-placement-fixed.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}.input-label-placement-fixed.sc-ion-input-md-h .label-text.sc-ion-input-md{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.input-label-placement-stacked.sc-ion-input-md-h .input-wrapper.sc-ion-input-md,.input-label-placement-floating.sc-ion-input-md-h .input-wrapper.sc-ion-input-md{flex-direction:column;align-items:start}.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{transform-origin:left top;max-width:100%}[dir=rtl].sc-ion-input-md-h -no-combinator.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].sc-ion-input-md-h -no-combinator.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{transform-origin:right top}.input-label-placement-stacked.sc-ion-input-md-h input.sc-ion-input-md,.input-label-placement-floating.sc-ion-input-md-h input.sc-ion-input-md{margin-left:0;margin-right:0;margin-top:1px;margin-bottom:0}.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{transform:translateY(100%) scale(1)}.input-label-placement-floating.sc-ion-input-md-h input.sc-ion-input-md{opacity:0}.has-focus.input-label-placement-floating.sc-ion-input-md-h input.sc-ion-input-md,.has-value.input-label-placement-floating.sc-ion-input-md-h input.sc-ion-input-md{opacity:1}.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.has-focus.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.has-value.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}.input-fill-solid.sc-ion-input-md-h{--background:var(--ion-color-step-50, #f2f2f2);--border-color:var(--ion-color-step-500, gray);--border-radius:4px;--padding-start:16px;--padding-end:16px}.input-fill-solid.sc-ion-input-md-h .input-wrapper.sc-ion-input-md{border-bottom:var(--border-width) var(--border-style) var(--border-color)}.has-focus.input-fill-solid.ion-valid.sc-ion-input-md-h,.input-fill-solid.ion-touched.ion-invalid.sc-ion-input-md-h{--border-color:var(--highlight-color)}.input-fill-solid.sc-ion-input-md-h .input-bottom.sc-ion-input-md{border-top:none}@media (any-hover: hover){.input-fill-solid.sc-ion-input-md-h:hover{--background:var(--ion-color-step-100, #e6e6e6);--border-color:var(--ion-color-step-750, #404040)}}.input-fill-solid.has-focus.sc-ion-input-md-h{--background:var(--ion-color-step-150, #d9d9d9);--border-color:var(--ion-color-step-750, #404040)}.input-fill-solid.sc-ion-input-md-h .input-wrapper.sc-ion-input-md{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0px;border-bottom-left-radius:0px}[dir=rtl].sc-ion-input-md-h -no-combinator.input-fill-solid.sc-ion-input-md-h .input-wrapper.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.input-fill-solid.sc-ion-input-md-h .input-wrapper.sc-ion-input-md,[dir=rtl].input-fill-solid.sc-ion-input-md-h .input-wrapper.sc-ion-input-md,[dir=rtl] .input-fill-solid.sc-ion-input-md-h .input-wrapper.sc-ion-input-md{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0px;border-bottom-left-radius:0px}.input-fill-solid.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.has-focus.input-fill-solid.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.has-value.input-fill-solid.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{max-width:calc(100% / 0.75)}.input-fill-outline.sc-ion-input-md-h{--border-color:var(--ion-color-step-300, #b3b3b3);--border-radius:4px;--padding-start:16px;--padding-end:16px}.input-fill-outline.input-shape-round.sc-ion-input-md-h{--border-radius:28px;--padding-start:32px;--padding-end:32px}.has-focus.input-fill-outline.ion-valid.sc-ion-input-md-h,.input-fill-outline.ion-touched.ion-invalid.sc-ion-input-md-h{--border-color:var(--highlight-color)}@media (any-hover: hover){.input-fill-outline.sc-ion-input-md-h:hover{--border-color:var(--ion-color-step-750, #404040)}}.input-fill-outline.has-focus.sc-ion-input-md-h{--border-width:2px;--border-color:var(--highlight-color)}.input-fill-outline.sc-ion-input-md-h .input-bottom.sc-ion-input-md{border-top:none}.input-fill-outline.sc-ion-input-md-h .input-wrapper.sc-ion-input-md{border-bottom:none}.input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{transform-origin:left top;position:absolute;max-width:calc(100% - var(--padding-start) - var(--padding-end))}[dir=rtl].sc-ion-input-md-h -no-combinator.input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].sc-ion-input-md-h -no-combinator.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{transform-origin:right top}.input-fill-outline.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{position:relative;z-index:1}.has-focus.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.has-value.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{transform:translateY(-32%) scale(0.75);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;max-width:calc((100% - var(--padding-start) - var(--padding-end) - 8px) / 0.75)}.input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h input.sc-ion-input-md,.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h input.sc-ion-input-md{margin-left:0;margin-right:0;margin-top:6px;margin-bottom:6px}.input-fill-outline.sc-ion-input-md-h .input-outline-container.sc-ion-input-md{left:0;right:0;top:0;bottom:0;display:flex;position:absolute;width:100%;height:100%}.input-fill-outline.sc-ion-input-md-h .input-outline-start.sc-ion-input-md,.input-fill-outline.sc-ion-input-md-h .input-outline-end.sc-ion-input-md{pointer-events:none}.input-fill-outline.sc-ion-input-md-h .input-outline-start.sc-ion-input-md,.input-fill-outline.sc-ion-input-md-h .input-outline-notch.sc-ion-input-md,.input-fill-outline.sc-ion-input-md-h .input-outline-end.sc-ion-input-md{border-top:var(--border-width) var(--border-style) var(--border-color);border-bottom:var(--border-width) var(--border-style) var(--border-color)}.input-fill-outline.sc-ion-input-md-h .input-outline-notch.sc-ion-input-md{max-width:calc(100% - var(--padding-start) - var(--padding-end))}.input-fill-outline.sc-ion-input-md-h .notch-spacer.sc-ion-input-md{-webkit-padding-end:8px;padding-inline-end:8px;font-size:calc(1em * 0.75);opacity:0;pointer-events:none}.input-fill-outline.sc-ion-input-md-h .input-outline-start.sc-ion-input-md{border-top-left-radius:var(--border-radius);border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:var(--border-radius);-webkit-border-start:var(--border-width) var(--border-style) var(--border-color);border-inline-start:var(--border-width) var(--border-style) var(--border-color);width:calc(var(--padding-start) - 4px)}[dir=rtl].sc-ion-input-md-h -no-combinator.input-fill-outline.sc-ion-input-md-h .input-outline-start.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.input-fill-outline.sc-ion-input-md-h .input-outline-start.sc-ion-input-md,[dir=rtl].input-fill-outline.sc-ion-input-md-h .input-outline-start.sc-ion-input-md,[dir=rtl] .input-fill-outline.sc-ion-input-md-h .input-outline-start.sc-ion-input-md{border-top-left-radius:0px;border-top-right-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-bottom-left-radius:0px}.input-fill-outline.sc-ion-input-md-h .input-outline-end.sc-ion-input-md{-webkit-border-end:var(--border-width) var(--border-style) var(--border-color);border-inline-end:var(--border-width) var(--border-style) var(--border-color);border-top-left-radius:0px;border-top-right-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-bottom-left-radius:0px;flex-grow:1}[dir=rtl].sc-ion-input-md-h -no-combinator.input-fill-outline.sc-ion-input-md-h .input-outline-end.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.input-fill-outline.sc-ion-input-md-h .input-outline-end.sc-ion-input-md,[dir=rtl].input-fill-outline.sc-ion-input-md-h .input-outline-end.sc-ion-input-md,[dir=rtl] .input-fill-outline.sc-ion-input-md-h .input-outline-end.sc-ion-input-md{border-top-left-radius:var(--border-radius);border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:var(--border-radius)}.has-focus.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .input-outline-notch.sc-ion-input-md,.has-value.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .input-outline-notch.sc-ion-input-md,.input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .input-outline-notch.sc-ion-input-md{border-top:none}.sc-ion-input-md-h{--border-width:1px;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));font-size:inherit}.legacy-input.sc-ion-input-md-h{--padding-top:10px;--padding-end:0;--padding-bottom:10px;--padding-start:8px}.item-label-stacked.sc-ion-input-md-h,.item-label-stacked .sc-ion-input-md-h,.item-label-floating.sc-ion-input-md-h,.item-label-floating .sc-ion-input-md-h{--padding-top:8px;--padding-bottom:8px;--padding-start:0}.input-clear-icon.sc-ion-input-md ion-icon.sc-ion-input-md{width:22px;height:22px}.legacy-input.sc-ion-input-md-h .native-input[disabled].sc-ion-input-md,.input-disabled.sc-ion-input-md-h{opacity:0.37}.has-focus.ion-valid.sc-ion-input-md-h,.ion-touched.ion-invalid.sc-ion-input-md-h{--border-color:var(--highlight-color)}.input-bottom.sc-ion-input-md .counter.sc-ion-input-md{letter-spacing:0.0333333333em}.sc-ion-input-md-h:not(.legacy-input){min-height:56px}.input-label-placement-floating.has-focus.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.input-label-placement-stacked.has-focus.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{color:var(--highlight-color)}.has-focus.input-label-placement-floating.ion-valid.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.input-label-placement-floating.ion-touched.ion-invalid.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.has-focus.input-label-placement-stacked.ion-valid.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.input-label-placement-stacked.ion-touched.ion-invalid.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{color:var(--highlight-color)}.input-highlight.sc-ion-input-md{bottom:-1px;position:absolute;width:100%;height:2px;transform:scale(0);transition:transform 200ms;background:var(--highlight-color)}@supports (inset-inline-start: 0){.input-highlight.sc-ion-input-md{inset-inline-start:0}}@supports not (inset-inline-start: 0){.input-highlight.sc-ion-input-md{left:0}[dir=rtl].sc-ion-input-md .input-highlight.sc-ion-input-md,[dir=rtl].sc-ion-input-md-h .input-highlight.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h .input-highlight.sc-ion-input-md{left:unset;right:unset;right:0}}.has-focus.sc-ion-input-md-h .input-highlight.sc-ion-input-md{transform:scale(1)}.in-item.sc-ion-input-md-h .input-highlight.sc-ion-input-md{bottom:0}@supports (inset-inline-start: 0){.in-item.sc-ion-input-md-h .input-highlight.sc-ion-input-md{inset-inline-start:0}}@supports not (inset-inline-start: 0){.in-item.sc-ion-input-md-h .input-highlight.sc-ion-input-md{left:0}[dir=rtl].sc-ion-input-md-h -no-combinator.in-item.sc-ion-input-md-h .input-highlight.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.in-item.sc-ion-input-md-h .input-highlight.sc-ion-input-md,[dir=rtl].in-item.sc-ion-input-md-h .input-highlight.sc-ion-input-md,[dir=rtl] .in-item.sc-ion-input-md-h .input-highlight.sc-ion-input-md{left:unset;right:unset;right:0}}.input-shape-round.sc-ion-input-md-h{--border-radius:16px}";

const Input = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionInput = createEvent(this, "ionInput", 7);
    this.ionChange = createEvent(this, "ionChange", 7);
    this.ionBlur = createEvent(this, "ionBlur", 7);
    this.ionFocus = createEvent(this, "ionFocus", 7);
    this.ionStyle = createEvent(this, "ionStyle", 7);
    this.inputId = `ion-input-${inputIds++}`;
    this.inheritedAttributes = {};
    this.isComposing = false;
    // This flag ensures we log the deprecation warning at most once.
    this.hasLoggedDeprecationWarning = false;
    /**
     * `true` if the input was cleared as a result of the user typing
     * with `clearOnEdit` enabled.
     *
     * Resets when the input loses focus.
     */
    this.didInputClearOnEdit = false;
    this.onInput = (ev) => {
      const input = ev.target;
      if (input) {
        this.value = input.value || '';
      }
      this.emitInputChange(ev);
    };
    this.onChange = (ev) => {
      this.emitValueChange(ev);
    };
    this.onBlur = (ev) => {
      this.hasFocus = false;
      this.emitStyle();
      if (this.focusedValue !== this.value) {
        /**
         * Emits the `ionChange` event when the input value
         * is different than the value when the input was focused.
         */
        this.emitValueChange(ev);
      }
      this.didInputClearOnEdit = false;
      this.ionBlur.emit(ev);
    };
    this.onFocus = (ev) => {
      this.hasFocus = true;
      this.focusedValue = this.value;
      this.emitStyle();
      this.ionFocus.emit(ev);
    };
    this.onKeydown = (ev) => {
      this.checkClearOnEdit(ev);
    };
    this.onCompositionStart = () => {
      this.isComposing = true;
    };
    this.onCompositionEnd = () => {
      this.isComposing = false;
    };
    this.clearTextInput = (ev) => {
      if (this.clearInput && !this.readonly && !this.disabled && ev) {
        ev.preventDefault();
        ev.stopPropagation();
        // Attempt to focus input again after pressing clear button
        this.setFocus();
      }
      this.value = '';
      this.emitInputChange(ev);
    };
    this.hasFocus = false;
    this.color = undefined;
    this.accept = undefined;
    this.autocapitalize = 'off';
    this.autocomplete = 'off';
    this.autocorrect = 'off';
    this.autofocus = false;
    this.clearInput = false;
    this.clearOnEdit = undefined;
    this.counter = false;
    this.counterFormatter = undefined;
    this.debounce = undefined;
    this.disabled = false;
    this.enterkeyhint = undefined;
    this.errorText = undefined;
    this.fill = undefined;
    this.inputmode = undefined;
    this.helperText = undefined;
    this.label = undefined;
    this.labelPlacement = 'start';
    this.legacy = undefined;
    this.max = undefined;
    this.maxlength = undefined;
    this.min = undefined;
    this.minlength = undefined;
    this.multiple = undefined;
    this.name = this.inputId;
    this.pattern = undefined;
    this.placeholder = undefined;
    this.readonly = false;
    this.required = false;
    this.shape = undefined;
    this.spellcheck = false;
    this.step = undefined;
    this.size = undefined;
    this.type = 'text';
    this.value = '';
  }
  debounceChanged() {
    const { ionInput, debounce, originalIonInput } = this;
    /**
     * If debounce is undefined, we have to manually revert the ionInput emitter in case
     * debounce used to be set to a number. Otherwise, the event would stay debounced.
     */
    this.ionInput = debounce === undefined ? originalIonInput !== null && originalIonInput !== void 0 ? originalIonInput : ionInput : debounceEvent(ionInput, debounce);
  }
  disabledChanged() {
    this.emitStyle();
  }
  /**
   * Update the item classes when the placeholder changes
   */
  placeholderChanged() {
    this.emitStyle();
  }
  /**
   * Update the native input element when the value changes
   */
  valueChanged() {
    const nativeInput = this.nativeInput;
    const value = this.getValue();
    if (nativeInput && nativeInput.value !== value && !this.isComposing) {
      /**
       * Assigning the native input's value on attribute
       * value change, allows `ionInput` implementations
       * to override the control's value.
       *
       * Used for patterns such as input trimming (removing whitespace),
       * or input masking.
       */
      nativeInput.value = value;
    }
    this.emitStyle();
  }
  componentWillLoad() {
    this.inheritedAttributes = Object.assign(Object.assign({}, inheritAriaAttributes(this.el)), inheritAttributes(this.el, ['tabindex', 'title', 'data-form-type']));
  }
  connectedCallback() {
    const { el } = this;
    this.legacyFormController = createLegacyFormController(el);
    this.emitStyle();
    this.debounceChanged();
    if (Build.isBrowser) {
      document.dispatchEvent(new CustomEvent('ionInputDidLoad', {
        detail: this.el,
      }));
    }
  }
  componentDidLoad() {
    this.originalIonInput = this.ionInput;
    const nativeInput = this.nativeInput;
    if (nativeInput) {
      // TODO: FW-729 Update to JSX bindings when Stencil resolves bug with:
      // https://github.com/ionic-team/stencil/issues/3235
      nativeInput.addEventListener('compositionstart', this.onCompositionStart);
      nativeInput.addEventListener('compositionend', this.onCompositionEnd);
    }
  }
  disconnectedCallback() {
    if (Build.isBrowser) {
      document.dispatchEvent(new CustomEvent('ionInputDidUnload', {
        detail: this.el,
      }));
    }
    const nativeInput = this.nativeInput;
    if (nativeInput) {
      nativeInput.removeEventListener('compositionstart', this.onCompositionStart);
      nativeInput.removeEventListener('compositionend', this.onCompositionEnd);
    }
  }
  /**
   * Sets focus on the native `input` in `ion-input`. Use this method instead of the global
   * `input.focus()`.
   *
   * Developers who wish to focus an input when a page enters
   * should call `setFocus()` in the `ionViewDidEnter()` lifecycle method.
   */
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  /**
   * Returns the native `<input>` element used under the hood.
   */
  getInputElement() {
    return Promise.resolve(this.nativeInput);
  }
  /**
   * Emits an `ionChange` event.
   *
   * This API should be called for user committed changes.
   * This API should not be used for external value changes.
   */
  emitValueChange(event) {
    const { value } = this;
    // Checks for both null and undefined values
    const newValue = value == null ? value : value.toString();
    // Emitting a value change should update the internal state for tracking the focused value
    this.focusedValue = newValue;
    this.ionChange.emit({ value: newValue, event });
  }
  /**
   * Emits an `ionInput` event.
   */
  emitInputChange(event) {
    const { value } = this;
    this.ionInput.emit({ value, event });
  }
  shouldClearOnEdit() {
    const { type, clearOnEdit } = this;
    return clearOnEdit === undefined ? type === 'password' : clearOnEdit;
  }
  getValue() {
    return typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString();
  }
  emitStyle() {
    if (this.legacyFormController.hasLegacyControl()) {
      this.ionStyle.emit({
        interactive: true,
        input: true,
        'has-placeholder': this.placeholder !== undefined,
        'has-value': this.hasValue(),
        'has-focus': this.hasFocus,
        'interactive-disabled': this.disabled,
      });
    }
  }
  checkClearOnEdit(ev) {
    if (!this.shouldClearOnEdit()) {
      return;
    }
    /**
     * Clear the input if the control has not been previously cleared during focus.
     * Do not clear if the user hitting enter to submit a form.
     */
    if (!this.didInputClearOnEdit && this.hasValue() && ev.key !== 'Enter') {
      this.value = '';
      this.emitInputChange(ev);
    }
    this.didInputClearOnEdit = true;
  }
  hasValue() {
    return this.getValue().length > 0;
  }
  /**
   * Renders the helper text or error text values
   */
  renderHintText() {
    const { helperText, errorText } = this;
    return [h("div", { class: "helper-text" }, helperText), h("div", { class: "error-text" }, errorText)];
  }
  renderCounter() {
    const { counter, maxlength, counterFormatter, value } = this;
    if (counter !== true || maxlength === undefined) {
      return;
    }
    return h("div", { class: "counter" }, getCounterText(value, maxlength, counterFormatter));
  }
  /**
   * Responsible for rendering helper text,
   * error text, and counter. This element should only
   * be rendered if hint text is set or counter is enabled.
   */
  renderBottomContent() {
    const { counter, helperText, errorText, maxlength } = this;
    /**
     * undefined and empty string values should
     * be treated as not having helper/error text.
     */
    const hasHintText = !!helperText || !!errorText;
    const hasCounter = counter === true && maxlength !== undefined;
    if (!hasHintText && !hasCounter) {
      return;
    }
    return (h("div", { class: "input-bottom" }, this.renderHintText(), this.renderCounter()));
  }
  renderLabel() {
    const { label } = this;
    if (label === undefined) {
      return;
    }
    return (h("div", { class: "label-text-wrapper" }, h("div", { class: "label-text" }, this.label)));
  }
  /**
   * Renders the border container
   * when fill="outline".
   */
  renderLabelContainer() {
    const mode = getIonMode(this);
    const hasOutlineFill = mode === 'md' && this.fill === 'outline';
    if (hasOutlineFill) {
      /**
       * The outline fill has a special outline
       * that appears around the input and the label.
       * Certain stacked and floating label placements cause the
       * label to translate up and create a "cut out"
       * inside of that border by using the notch-spacer element.
       */
      return [
        h("div", { class: "input-outline-container" }, h("div", { class: "input-outline-start" }), h("div", { class: "input-outline-notch" }, h("div", { class: "notch-spacer", "aria-hidden": "true" }, this.label)), h("div", { class: "input-outline-end" })),
        this.renderLabel(),
      ];
    }
    /**
     * If not using the outline style,
     * we can render just the label.
     */
    return this.renderLabel();
  }
  renderInput() {
    const { disabled, fill, readonly, shape, inputId, labelPlacement } = this;
    const mode = getIonMode(this);
    const value = this.getValue();
    const inItem = hostContext('ion-item', this.el);
    const shouldRenderHighlight = mode === 'md' && fill !== 'outline' && !inItem;
    return (h(Host, { class: createColorClasses(this.color, {
        [mode]: true,
        'has-value': this.hasValue(),
        'has-focus': this.hasFocus,
        [`input-fill-${fill}`]: fill !== undefined,
        [`input-shape-${shape}`]: shape !== undefined,
        [`input-label-placement-${labelPlacement}`]: true,
        'in-item': inItem,
        'in-item-color': hostContext('ion-item.ion-color', this.el),
        'input-disabled': disabled,
      }) }, h("label", { class: "input-wrapper" }, this.renderLabelContainer(), h("div", { class: "native-wrapper" }, h("input", Object.assign({ class: "native-input", ref: (input) => (this.nativeInput = input), id: inputId, disabled: disabled, accept: this.accept, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, min: this.min, max: this.max, minLength: this.minlength, maxLength: this.maxlength, multiple: this.multiple, name: this.name, pattern: this.pattern, placeholder: this.placeholder || '', readOnly: readonly, required: this.required, spellcheck: this.spellcheck, step: this.step, size: this.size, type: this.type, value: value, onInput: this.onInput, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeydown }, this.inheritedAttributes)), this.clearInput && !readonly && !disabled && (h("button", { "aria-label": "reset", type: "button", class: "input-clear-icon", onPointerDown: (ev) => {
        /**
         * This prevents mobile browsers from
         * blurring the input when the clear
         * button is activated.
         */
        ev.preventDefault();
      }, onClick: this.clearTextInput }, h("ion-icon", { "aria-hidden": "true", icon: mode === 'ios' ? closeCircle : closeSharp })))), shouldRenderHighlight && h("div", { class: "input-highlight" })), this.renderBottomContent()));
  }
  // TODO FW-2764 Remove this
  renderLegacyInput() {
    if (!this.hasLoggedDeprecationWarning) {
      printIonWarning(`ion-input now requires providing a label with either the "label" property or the "aria-label" attribute. To migrate, remove any usage of "ion-label" and pass the label text to either the "label" property or the "aria-label" attribute.

Example: <ion-input label="Email"></ion-input>
Example with aria-label: <ion-input aria-label="Email"></ion-input>

For inputs that do not render the label immediately next to the input, developers may continue to use "ion-label" but must manually associate the label with the input by using "aria-labelledby".

Developers can use the "legacy" property to continue using the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.`, this.el);
      if (this.legacy) {
        printIonWarning(`ion-input is being used with the "legacy" property enabled which will forcibly enable the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.

Developers can dismiss this warning by removing their usage of the "legacy" property and using the new input syntax.`, this.el);
      }
      this.hasLoggedDeprecationWarning = true;
    }
    const mode = getIonMode(this);
    const value = this.getValue();
    const labelId = this.inputId + '-lbl';
    const label = findItemLabel(this.el);
    if (label) {
      label.id = labelId;
    }
    return (h(Host, { "aria-disabled": this.disabled ? 'true' : null, class: createColorClasses(this.color, {
        [mode]: true,
        'has-value': this.hasValue(),
        'has-focus': this.hasFocus,
        'legacy-input': true,
        'in-item-color': hostContext('ion-item.ion-color', this.el),
      }) }, h("input", Object.assign({ class: "native-input", ref: (input) => (this.nativeInput = input), "aria-labelledby": label ? label.id : null, disabled: this.disabled, accept: this.accept, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, min: this.min, max: this.max, minLength: this.minlength, maxLength: this.maxlength, multiple: this.multiple, name: this.name, pattern: this.pattern, placeholder: this.placeholder || '', readOnly: this.readonly, required: this.required, spellcheck: this.spellcheck, step: this.step, size: this.size, type: this.type, value: value, onInput: this.onInput, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeydown }, this.inheritedAttributes)), this.clearInput && !this.readonly && !this.disabled && (h("button", { "aria-label": "reset", type: "button", class: "input-clear-icon", onPointerDown: (ev) => {
        /**
         * This prevents mobile browsers from
         * blurring the input when the clear
         * button is activated.
         */
        ev.preventDefault();
      }, onClick: this.clearTextInput }, h("ion-icon", { "aria-hidden": "true", icon: mode === 'ios' ? closeCircle : closeSharp })))));
  }
  render() {
    const { legacyFormController } = this;
    return legacyFormController.hasLegacyControl() ? this.renderLegacyInput() : this.renderInput();
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "debounce": ["debounceChanged"],
    "disabled": ["disabledChanged"],
    "placeholder": ["placeholderChanged"],
    "value": ["valueChanged"]
  }; }
};
let inputIds = 0;
Input.style = {
  ios: inputIosCss,
  md: inputMdCss
};

export { Input as ion_input };
