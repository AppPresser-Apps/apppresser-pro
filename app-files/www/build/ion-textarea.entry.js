import { r as registerInstance, t as createEvent, i as Build, h as writeTask, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { g as getIonMode } from './ionic-global-74a19eaa.js';
import { c as createLegacyFormController } from './index-ca581420.js';
import { j as debounceEvent, i as inheritAriaAttributes, m as inheritAttributes, q as findItemLabel } from './helpers-6885e51a.js';
import { p as printIonWarning } from './index-2ee22356.js';
import { c as createColorClasses, h as hostContext } from './theme-7ef00c83.js';
import { g as getCounterText } from './input.utils-049ec602.js';

const textareaIosCss = ".sc-ion-textarea-ios-h{--background:initial;--color:initial;--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:0.6;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--border-radius:0;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #3880ff);--highlight-color-valid:var(--ion-color-success, #2dd36f);--highlight-color-invalid:var(--ion-color-danger, #eb445a);--highlight-color:var(--highlight-color-focused);display:block;position:relative;width:100%;color:var(--color);font-family:var(--ion-font-family, inherit);white-space:pre-wrap;z-index:2;box-sizing:border-box}.legacy-textarea.sc-ion-textarea-ios-h{flex:1;background:var(--background)}.legacy-textarea.ion-color.sc-ion-textarea-ios-h{color:var(--ion-color-base)}.sc-ion-textarea-ios-h:not(.legacy-textarea){--padding-bottom:8px}.ion-color.sc-ion-textarea-ios-h{--highlight-color-focused:var(--ion-color-base);background:initial}ion-item.sc-ion-textarea-ios-h,ion-item .sc-ion-textarea-ios-h{align-self:baseline}ion-item.sc-ion-textarea-ios-h:not(.item-label),ion-item:not(.item-label) .sc-ion-textarea-ios-h{--padding-start:0}ion-item[slot=start].sc-ion-textarea-ios-h,ion-item [slot=start].sc-ion-textarea-ios-h,ion-item[slot=end].sc-ion-textarea-ios-h,ion-item [slot=end].sc-ion-textarea-ios-h{width:auto}.native-textarea.sc-ion-textarea-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:block;position:relative;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;box-sizing:border-box;resize:none;appearance:none;z-index:1}.native-textarea.sc-ion-textarea-ios::placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.legacy-textarea.sc-ion-textarea-ios-h .textarea-legacy-wrapper.sc-ion-textarea-ios::after{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius)}.native-textarea.sc-ion-textarea-ios,.legacy-textarea.sc-ion-textarea-ios-h .textarea-legacy-wrapper.sc-ion-textarea-ios::after{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;grid-area:1/1/2/2;word-break:break-word}.legacy-textarea.sc-ion-textarea-ios-h .native-textarea[disabled].sc-ion-textarea-ios,.textarea-disabled.sc-ion-textarea-ios-h{opacity:0.4}.cloned-input.sc-ion-textarea-ios{top:0;position:absolute;pointer-events:none}@supports (inset-inline-start: 0){.cloned-input.sc-ion-textarea-ios{inset-inline-start:0}}@supports not (inset-inline-start: 0){.cloned-input.sc-ion-textarea-ios{left:0}[dir=rtl].sc-ion-textarea-ios .cloned-input.sc-ion-textarea-ios,[dir=rtl].sc-ion-textarea-ios-h .cloned-input.sc-ion-textarea-ios,[dir=rtl] .sc-ion-textarea-ios-h .cloned-input.sc-ion-textarea-ios{left:unset;right:unset;right:0}}.cloned-input.sc-ion-textarea-ios:disabled{opacity:1}.legacy-textarea[auto-grow].sc-ion-textarea-ios-h .cloned-input.sc-ion-textarea-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}[auto-grow].sc-ion-textarea-ios-h .cloned-input.sc-ion-textarea-ios{height:100%}[auto-grow].sc-ion-textarea-ios-h .native-textarea.sc-ion-textarea-ios{overflow:hidden}.item-label-floating.item-has-placeholder.sc-ion-textarea-ios-h:not(.item-has-value),.item-label-floating.item-has-placeholder:not(.item-has-value) .sc-ion-textarea-ios-h{opacity:0}.item-label-floating.item-has-placeholder.sc-ion-textarea-ios-h:not(.item-has-value).item-has-focus,.item-label-floating.item-has-placeholder:not(.item-has-value).item-has-focus .sc-ion-textarea-ios-h{transition:opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);opacity:1}.textarea-wrapper.sc-ion-textarea-ios{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:0px;padding-bottom:0px;border-radius:var(--border-radius);display:flex;position:relative;flex-grow:1;align-items:flex-start;height:inherit;min-height:inherit;transition:background-color 15ms linear;background:var(--background)}.native-wrapper.sc-ion-textarea-ios{display:flex;flex-grow:1;width:100%;height:100%}.has-focus.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios{caret-color:var(--highlight-color)}.native-wrapper.sc-ion-textarea-ios textarea.sc-ion-textarea-ios{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0px;padding-inline-end:0px;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom)}.native-wrapper.sc-ion-textarea-ios,.textarea-legacy-wrapper.sc-ion-textarea-ios{display:grid;min-width:inherit;max-width:inherit;min-height:inherit;max-height:inherit}.native-wrapper.sc-ion-textarea-ios::after,.textarea-legacy-wrapper.sc-ion-textarea-ios::after{white-space:pre-wrap;content:attr(data-replicated-value) \" \";visibility:hidden}.native-wrapper.sc-ion-textarea-ios::after{padding-left:0;padding-right:0;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;border-radius:var(--border-radius);grid-area:1/1/2/2;word-break:break-word}.ion-touched.ion-invalid.sc-ion-textarea-ios-h{--highlight-color:var(--highlight-color-invalid)}.ion-valid.sc-ion-textarea-ios-h{--highlight-color:var(--highlight-color-valid)}.textarea-bottom.sc-ion-textarea-ios{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:5px;padding-bottom:0;display:flex;justify-content:space-between;border-top:var(--border-width) var(--border-style) var(--border-color);font-size:12px}.has-focus.ion-valid.sc-ion-textarea-ios-h,.ion-touched.ion-invalid.sc-ion-textarea-ios-h{--border-color:var(--highlight-color)}.textarea-bottom.sc-ion-textarea-ios .error-text.sc-ion-textarea-ios{display:none;color:var(--highlight-color-invalid)}.textarea-bottom.sc-ion-textarea-ios .helper-text.sc-ion-textarea-ios{display:block;color:var(--ion-color-step-550, #737373)}.ion-touched.ion-invalid.sc-ion-textarea-ios-h .textarea-bottom.sc-ion-textarea-ios .error-text.sc-ion-textarea-ios{display:block}.ion-touched.ion-invalid.sc-ion-textarea-ios-h .textarea-bottom.sc-ion-textarea-ios .helper-text.sc-ion-textarea-ios{display:none}.textarea-bottom.sc-ion-textarea-ios .counter.sc-ion-textarea-ios{-webkit-margin-start:auto;margin-inline-start:auto;color:var(--ion-color-step-550, #737373);white-space:nowrap;padding-inline-start:16px}.label-text-wrapper.sc-ion-textarea-ios{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0px;padding-inline-end:0px;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);max-width:200px;transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}.label-text.sc-ion-textarea-ios{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.textarea-wrapper.sc-ion-textarea-ios textarea.sc-ion-textarea-ios{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.textarea-label-placement-start.sc-ion-textarea-ios-h .textarea-wrapper.sc-ion-textarea-ios{flex-direction:row}.textarea-label-placement-start.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}.textarea-label-placement-end.sc-ion-textarea-ios-h .textarea-wrapper.sc-ion-textarea-ios{flex-direction:row-reverse}.textarea-label-placement-end.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}.textarea-label-placement-fixed.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}.textarea-label-placement-fixed.sc-ion-textarea-ios-h .label-text.sc-ion-textarea-ios{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.textarea-label-placement-stacked.sc-ion-textarea-ios-h .textarea-wrapper.sc-ion-textarea-ios,.textarea-label-placement-floating.sc-ion-textarea-ios-h .textarea-wrapper.sc-ion-textarea-ios{flex-direction:column;align-items:start}.textarea-label-placement-stacked.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,.textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{transform-origin:left top;-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0px;padding-inline-end:0px;padding-top:0px;padding-bottom:0px;max-width:100%}[dir=rtl].sc-ion-textarea-ios-h -no-combinator.textarea-label-placement-stacked.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl] .sc-ion-textarea-ios-h -no-combinator.textarea-label-placement-stacked.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl].textarea-label-placement-stacked.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl] .textarea-label-placement-stacked.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl].sc-ion-textarea-ios-h -no-combinator.textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl] .sc-ion-textarea-ios-h -no-combinator.textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl].textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl] .textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{transform-origin:right top}.textarea-label-placement-stacked.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios,.textarea-label-placement-floating.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios,.textarea-label-placement-stacked[auto-grow].sc-ion-textarea-ios-h .native-wrapper.sc-ion-textarea-ios::after,.textarea-label-placement-floating[auto-grow].sc-ion-textarea-ios-h .native-wrapper.sc-ion-textarea-ios::after{-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-end:0px;margin-inline-end:0px;margin-top:8px;margin-bottom:0px}.textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{transform:translateY(100%) scale(1)}.textarea-label-placement-floating.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios{opacity:0}.has-focus.textarea-label-placement-floating.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios,.has-value.textarea-label-placement-floating.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios{opacity:1}.textarea-label-placement-stacked.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,.has-focus.textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,.has-value.textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}.sc-ion-textarea-ios-h{--border-width:0.55px;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));--padding-top:10px;--padding-end:0px;--padding-bottom:8px;--padding-start:0px;font-size:inherit}.legacy-textarea.sc-ion-textarea-ios-h{--padding-top:10px;--padding-end:8px;--padding-bottom:10px;--padding-start:0}.item-label-stacked.sc-ion-textarea-ios-h,.item-label-stacked .sc-ion-textarea-ios-h,.item-label-floating.sc-ion-textarea-ios-h,.item-label-floating .sc-ion-textarea-ios-h{--padding-top:8px;--padding-bottom:8px;--padding-start:0px}.sc-ion-textarea-ios-h:not(.legacy-textarea){min-height:44px}.textarea-label-placement-floating.sc-ion-textarea-ios-h,.textarea-label-placement-stacked.sc-ion-textarea-ios-h{--padding-top:0px;min-height:56px}";

const textareaMdCss = ".sc-ion-textarea-md-h{--background:initial;--color:initial;--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:0.6;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--border-radius:0;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #3880ff);--highlight-color-valid:var(--ion-color-success, #2dd36f);--highlight-color-invalid:var(--ion-color-danger, #eb445a);--highlight-color:var(--highlight-color-focused);display:block;position:relative;width:100%;color:var(--color);font-family:var(--ion-font-family, inherit);white-space:pre-wrap;z-index:2;box-sizing:border-box}.legacy-textarea.sc-ion-textarea-md-h{flex:1;background:var(--background)}.legacy-textarea.ion-color.sc-ion-textarea-md-h{color:var(--ion-color-base)}.sc-ion-textarea-md-h:not(.legacy-textarea){--padding-bottom:8px}.ion-color.sc-ion-textarea-md-h{--highlight-color-focused:var(--ion-color-base);background:initial}ion-item.sc-ion-textarea-md-h,ion-item .sc-ion-textarea-md-h{align-self:baseline}ion-item.sc-ion-textarea-md-h:not(.item-label),ion-item:not(.item-label) .sc-ion-textarea-md-h{--padding-start:0}ion-item[slot=start].sc-ion-textarea-md-h,ion-item [slot=start].sc-ion-textarea-md-h,ion-item[slot=end].sc-ion-textarea-md-h,ion-item [slot=end].sc-ion-textarea-md-h{width:auto}.native-textarea.sc-ion-textarea-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:block;position:relative;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;box-sizing:border-box;resize:none;appearance:none;z-index:1}.native-textarea.sc-ion-textarea-md::placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.legacy-textarea.sc-ion-textarea-md-h .textarea-legacy-wrapper.sc-ion-textarea-md::after{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius)}.native-textarea.sc-ion-textarea-md,.legacy-textarea.sc-ion-textarea-md-h .textarea-legacy-wrapper.sc-ion-textarea-md::after{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;grid-area:1/1/2/2;word-break:break-word}.legacy-textarea.sc-ion-textarea-md-h .native-textarea[disabled].sc-ion-textarea-md,.textarea-disabled.sc-ion-textarea-md-h{opacity:0.4}.cloned-input.sc-ion-textarea-md{top:0;position:absolute;pointer-events:none}@supports (inset-inline-start: 0){.cloned-input.sc-ion-textarea-md{inset-inline-start:0}}@supports not (inset-inline-start: 0){.cloned-input.sc-ion-textarea-md{left:0}[dir=rtl].sc-ion-textarea-md .cloned-input.sc-ion-textarea-md,[dir=rtl].sc-ion-textarea-md-h .cloned-input.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h .cloned-input.sc-ion-textarea-md{left:unset;right:unset;right:0}}.cloned-input.sc-ion-textarea-md:disabled{opacity:1}.legacy-textarea[auto-grow].sc-ion-textarea-md-h .cloned-input.sc-ion-textarea-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}[auto-grow].sc-ion-textarea-md-h .cloned-input.sc-ion-textarea-md{height:100%}[auto-grow].sc-ion-textarea-md-h .native-textarea.sc-ion-textarea-md{overflow:hidden}.item-label-floating.item-has-placeholder.sc-ion-textarea-md-h:not(.item-has-value),.item-label-floating.item-has-placeholder:not(.item-has-value) .sc-ion-textarea-md-h{opacity:0}.item-label-floating.item-has-placeholder.sc-ion-textarea-md-h:not(.item-has-value).item-has-focus,.item-label-floating.item-has-placeholder:not(.item-has-value).item-has-focus .sc-ion-textarea-md-h{transition:opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);opacity:1}.textarea-wrapper.sc-ion-textarea-md{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:0px;padding-bottom:0px;border-radius:var(--border-radius);display:flex;position:relative;flex-grow:1;align-items:flex-start;height:inherit;min-height:inherit;transition:background-color 15ms linear;background:var(--background)}.native-wrapper.sc-ion-textarea-md{display:flex;flex-grow:1;width:100%;height:100%}.has-focus.sc-ion-textarea-md-h textarea.sc-ion-textarea-md{caret-color:var(--highlight-color)}.native-wrapper.sc-ion-textarea-md textarea.sc-ion-textarea-md{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0px;padding-inline-end:0px;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom)}.native-wrapper.sc-ion-textarea-md,.textarea-legacy-wrapper.sc-ion-textarea-md{display:grid;min-width:inherit;max-width:inherit;min-height:inherit;max-height:inherit}.native-wrapper.sc-ion-textarea-md::after,.textarea-legacy-wrapper.sc-ion-textarea-md::after{white-space:pre-wrap;content:attr(data-replicated-value) \" \";visibility:hidden}.native-wrapper.sc-ion-textarea-md::after{padding-left:0;padding-right:0;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;border-radius:var(--border-radius);grid-area:1/1/2/2;word-break:break-word}.ion-touched.ion-invalid.sc-ion-textarea-md-h{--highlight-color:var(--highlight-color-invalid)}.ion-valid.sc-ion-textarea-md-h{--highlight-color:var(--highlight-color-valid)}.textarea-bottom.sc-ion-textarea-md{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:5px;padding-bottom:0;display:flex;justify-content:space-between;border-top:var(--border-width) var(--border-style) var(--border-color);font-size:12px}.has-focus.ion-valid.sc-ion-textarea-md-h,.ion-touched.ion-invalid.sc-ion-textarea-md-h{--border-color:var(--highlight-color)}.textarea-bottom.sc-ion-textarea-md .error-text.sc-ion-textarea-md{display:none;color:var(--highlight-color-invalid)}.textarea-bottom.sc-ion-textarea-md .helper-text.sc-ion-textarea-md{display:block;color:var(--ion-color-step-550, #737373)}.ion-touched.ion-invalid.sc-ion-textarea-md-h .textarea-bottom.sc-ion-textarea-md .error-text.sc-ion-textarea-md{display:block}.ion-touched.ion-invalid.sc-ion-textarea-md-h .textarea-bottom.sc-ion-textarea-md .helper-text.sc-ion-textarea-md{display:none}.textarea-bottom.sc-ion-textarea-md .counter.sc-ion-textarea-md{-webkit-margin-start:auto;margin-inline-start:auto;color:var(--ion-color-step-550, #737373);white-space:nowrap;padding-inline-start:16px}.label-text-wrapper.sc-ion-textarea-md{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0px;padding-inline-end:0px;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);max-width:200px;transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}.label-text.sc-ion-textarea-md{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.textarea-wrapper.sc-ion-textarea-md textarea.sc-ion-textarea-md{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.textarea-label-placement-start.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md{flex-direction:row}.textarea-label-placement-start.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}.textarea-label-placement-end.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md{flex-direction:row-reverse}.textarea-label-placement-end.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}.textarea-label-placement-fixed.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0}.textarea-label-placement-fixed.sc-ion-textarea-md-h .label-text.sc-ion-textarea-md{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.textarea-label-placement-stacked.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md,.textarea-label-placement-floating.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md{flex-direction:column;align-items:start}.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{transform-origin:left top;-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0px;padding-inline-end:0px;padding-top:0px;padding-bottom:0px;max-width:100%}[dir=rtl].sc-ion-textarea-md-h -no-combinator.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].sc-ion-textarea-md-h -no-combinator.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{transform-origin:right top}.textarea-label-placement-stacked.sc-ion-textarea-md-h textarea.sc-ion-textarea-md,.textarea-label-placement-floating.sc-ion-textarea-md-h textarea.sc-ion-textarea-md,.textarea-label-placement-stacked[auto-grow].sc-ion-textarea-md-h .native-wrapper.sc-ion-textarea-md::after,.textarea-label-placement-floating[auto-grow].sc-ion-textarea-md-h .native-wrapper.sc-ion-textarea-md::after{-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-end:0px;margin-inline-end:0px;margin-top:8px;margin-bottom:0px}.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{transform:translateY(100%) scale(1)}.textarea-label-placement-floating.sc-ion-textarea-md-h textarea.sc-ion-textarea-md{opacity:0}.has-focus.textarea-label-placement-floating.sc-ion-textarea-md-h textarea.sc-ion-textarea-md,.has-value.textarea-label-placement-floating.sc-ion-textarea-md-h textarea.sc-ion-textarea-md{opacity:1}.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.has-focus.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.has-value.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}.textarea-fill-solid.sc-ion-textarea-md-h{--background:var(--ion-color-step-50, #f2f2f2);--border-color:var(--ion-color-step-500, gray);--border-radius:4px;--padding-start:16px;--padding-end:16px}.textarea-fill-solid.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md{border-bottom:var(--border-width) var(--border-style) var(--border-color)}.has-focus.textarea-fill-solid.ion-valid.sc-ion-textarea-md-h,.textarea-fill-solid.ion-touched.ion-invalid.sc-ion-textarea-md-h{--border-color:var(--highlight-color)}.textarea-fill-solid.sc-ion-textarea-md-h .textarea-bottom.sc-ion-textarea-md{border-top:none}@media (any-hover: hover){.textarea-fill-solid.sc-ion-textarea-md-h:hover{--background:var(--ion-color-step-100, #e6e6e6);--border-color:var(--ion-color-step-750, #404040)}}.textarea-fill-solid.has-focus.sc-ion-textarea-md-h{--background:var(--ion-color-step-150, #d9d9d9);--border-color:var(--ion-color-step-750, #404040)}.textarea-fill-solid.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0px;border-bottom-left-radius:0px}[dir=rtl].sc-ion-textarea-md-h -no-combinator.textarea-fill-solid.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.textarea-fill-solid.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md,[dir=rtl].textarea-fill-solid.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md,[dir=rtl] .textarea-fill-solid.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0px;border-bottom-left-radius:0px}.textarea-fill-solid.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.has-focus.textarea-fill-solid.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.has-value.textarea-fill-solid.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{max-width:calc(100% / 0.75)}.textarea-fill-outline.sc-ion-textarea-md-h{--border-color:var(--ion-color-step-300, #b3b3b3);--border-radius:4px;--padding-start:16px;--padding-end:16px}.textarea-fill-outline.textarea-shape-round.sc-ion-textarea-md-h{--border-radius:28px;--padding-start:32px;--padding-end:32px}.has-focus.textarea-fill-outline.ion-valid.sc-ion-textarea-md-h,.textarea-fill-outline.ion-touched.ion-invalid.sc-ion-textarea-md-h{--border-color:var(--highlight-color)}@media (any-hover: hover){.textarea-fill-outline.sc-ion-textarea-md-h:hover{--border-color:var(--ion-color-step-750, #404040)}}.textarea-fill-outline.has-focus.sc-ion-textarea-md-h{--border-width:2px;--border-color:var(--highlight-color)}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-bottom.sc-ion-textarea-md{border-top:none}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md{border-bottom:none}.textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{transform-origin:left top;position:absolute;max-width:calc(100% - var(--padding-start) - var(--padding-end))}[dir=rtl].sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{transform-origin:right top}.textarea-fill-outline.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{position:relative;z-index:1}.has-focus.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.has-value.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{transform:translateY(-32%) scale(0.75);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;max-width:calc(\n    (100% - var(--padding-start) - var(--padding-end) - 8px) / 0.75\n  )}.textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h textarea.sc-ion-textarea-md,.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h textarea.sc-ion-textarea-md,.textarea-fill-outline.textarea-label-placement-stacked[auto-grow].sc-ion-textarea-md-h .native-wrapper.sc-ion-textarea-md::after,.textarea-fill-outline.textarea-label-placement-floating[auto-grow].sc-ion-textarea-md-h .native-wrapper.sc-ion-textarea-md::after{-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-end:0px;margin-inline-end:0px;margin-top:12px;margin-bottom:0px}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-container.sc-ion-textarea-md{left:0;right:0;top:0;bottom:0;display:flex;position:absolute;width:100%;height:100%}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-start.sc-ion-textarea-md,.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-end.sc-ion-textarea-md{pointer-events:none}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-start.sc-ion-textarea-md,.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-notch.sc-ion-textarea-md,.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-end.sc-ion-textarea-md{border-top:var(--border-width) var(--border-style) var(--border-color);border-bottom:var(--border-width) var(--border-style) var(--border-color)}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-notch.sc-ion-textarea-md{max-width:calc(100% - var(--padding-start) - var(--padding-end))}.textarea-fill-outline.sc-ion-textarea-md-h .notch-spacer.sc-ion-textarea-md{-webkit-padding-end:8px;padding-inline-end:8px;font-size:calc(1em * 0.75);opacity:0;pointer-events:none}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-start.sc-ion-textarea-md{border-top-left-radius:var(--border-radius);border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:var(--border-radius);-webkit-border-start:var(--border-width) var(--border-style) var(--border-color);border-inline-start:var(--border-width) var(--border-style) var(--border-color);width:calc(var(--padding-start) - 4px)}[dir=rtl].sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-start.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-start.sc-ion-textarea-md,[dir=rtl].textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-start.sc-ion-textarea-md,[dir=rtl] .textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-start.sc-ion-textarea-md{border-top-left-radius:0px;border-top-right-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-bottom-left-radius:0px}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-end.sc-ion-textarea-md{-webkit-border-end:var(--border-width) var(--border-style) var(--border-color);border-inline-end:var(--border-width) var(--border-style) var(--border-color);border-top-left-radius:0px;border-top-right-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-bottom-left-radius:0px;flex-grow:1}[dir=rtl].sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-end.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-end.sc-ion-textarea-md,[dir=rtl].textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-end.sc-ion-textarea-md,[dir=rtl] .textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-end.sc-ion-textarea-md{border-top-left-radius:var(--border-radius);border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:var(--border-radius)}.has-focus.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .textarea-outline-notch.sc-ion-textarea-md,.has-value.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .textarea-outline-notch.sc-ion-textarea-md,.textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .textarea-outline-notch.sc-ion-textarea-md{border-top:none}.sc-ion-textarea-md-h{--border-width:1px;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));--padding-top:18px;--padding-end:0px;--padding-bottom:8px;--padding-start:0px;font-size:inherit}.legacy-textarea.sc-ion-textarea-md-h{--padding-top:10px;--padding-end:0;--padding-bottom:11px;--padding-start:8px;margin-left:0;margin-right:0;margin-top:8px;margin-bottom:0}.item-label-stacked.sc-ion-textarea-md-h,.item-label-stacked .sc-ion-textarea-md-h,.item-label-floating.sc-ion-textarea-md-h,.item-label-floating .sc-ion-textarea-md-h{--padding-top:8px;--padding-bottom:8px;--padding-start:0}.textarea-bottom.sc-ion-textarea-md .counter.sc-ion-textarea-md{letter-spacing:0.0333333333em}.sc-ion-textarea-md-h:not(.legacy-textarea){min-height:56px}.textarea-label-placement-floating.sc-ion-textarea-md-h,.textarea-label-placement-stacked.sc-ion-textarea-md-h{--padding-top:0px}.textarea-label-placement-floating.has-focus.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.textarea-label-placement-stacked.has-focus.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{color:var(--highlight-color)}.has-focus.textarea-label-placement-floating.ion-valid.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.textarea-label-placement-floating.ion-touched.ion-invalid.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.has-focus.textarea-label-placement-stacked.ion-valid.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.textarea-label-placement-stacked.ion-touched.ion-invalid.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{color:var(--highlight-color)}.textarea-highlight.sc-ion-textarea-md{bottom:-1px;position:absolute;width:100%;height:2px;transform:scale(0);transition:transform 200ms;background:var(--highlight-color)}@supports (inset-inline-start: 0){.textarea-highlight.sc-ion-textarea-md{inset-inline-start:0}}@supports not (inset-inline-start: 0){.textarea-highlight.sc-ion-textarea-md{left:0}[dir=rtl].sc-ion-textarea-md .textarea-highlight.sc-ion-textarea-md,[dir=rtl].sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md{left:unset;right:unset;right:0}}.has-focus.sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md{transform:scale(1)}.in-item.sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md{bottom:0}@supports (inset-inline-start: 0){.in-item.sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md{inset-inline-start:0}}@supports not (inset-inline-start: 0){.in-item.sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md{left:0}[dir=rtl].sc-ion-textarea-md-h -no-combinator.in-item.sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.in-item.sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md,[dir=rtl].in-item.sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md,[dir=rtl] .in-item.sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md{left:unset;right:unset;right:0}}.textarea-shape-round.sc-ion-textarea-md-h{--border-radius:16px}";

const Textarea = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionChange = createEvent(this, "ionChange", 7);
    this.ionInput = createEvent(this, "ionInput", 7);
    this.ionStyle = createEvent(this, "ionStyle", 7);
    this.ionBlur = createEvent(this, "ionBlur", 7);
    this.ionFocus = createEvent(this, "ionFocus", 7);
    this.inputId = `ion-textarea-${textareaIds++}`;
    /**
     * `true` if the textarea was cleared as a result of the user typing
     * with `clearOnEdit` enabled.
     *
     * Resets when the textarea loses focus.
     */
    this.didTextareaClearOnEdit = false;
    this.inheritedAttributes = {};
    // This flag ensures we log the deprecation warning at most once.
    this.hasLoggedDeprecationWarning = false;
    // `Event` type is used instead of `InputEvent`
    // since the types from Stencil are not derived
    // from the element (e.g. textarea and input
    // should be InputEvent, but all other elements
    // should be Event).
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
    this.onFocus = (ev) => {
      this.hasFocus = true;
      this.focusedValue = this.value;
      this.focusChange();
      this.ionFocus.emit(ev);
    };
    this.onBlur = (ev) => {
      this.hasFocus = false;
      this.focusChange();
      if (this.focusedValue !== this.value) {
        /**
         * Emits the `ionChange` event when the textarea value
         * is different than the value when the textarea was focused.
         */
        this.emitValueChange(ev);
      }
      this.didTextareaClearOnEdit = false;
      this.ionBlur.emit(ev);
    };
    this.onKeyDown = (ev) => {
      this.checkClearOnEdit(ev);
    };
    this.hasFocus = false;
    this.color = undefined;
    this.autocapitalize = 'none';
    this.autofocus = false;
    this.clearOnEdit = false;
    this.debounce = undefined;
    this.disabled = false;
    this.fill = undefined;
    this.inputmode = undefined;
    this.enterkeyhint = undefined;
    this.maxlength = undefined;
    this.minlength = undefined;
    this.name = this.inputId;
    this.placeholder = undefined;
    this.readonly = false;
    this.required = false;
    this.spellcheck = false;
    this.cols = undefined;
    this.rows = undefined;
    this.wrap = undefined;
    this.autoGrow = false;
    this.value = '';
    this.counter = false;
    this.counterFormatter = undefined;
    this.errorText = undefined;
    this.helperText = undefined;
    this.label = undefined;
    this.labelPlacement = 'start';
    this.legacy = undefined;
    this.shape = undefined;
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
   * Update the native input element when the value changes
   */
  valueChanged() {
    const nativeInput = this.nativeInput;
    const value = this.getValue();
    if (nativeInput && nativeInput.value !== value) {
      nativeInput.value = value;
    }
    this.runAutoGrow();
    this.emitStyle();
  }
  connectedCallback() {
    const { el } = this;
    this.legacyFormController = createLegacyFormController(el);
    this.emitStyle();
    this.debounceChanged();
    if (Build.isBrowser) {
      document.dispatchEvent(new CustomEvent('ionInputDidLoad', {
        detail: el,
      }));
    }
  }
  disconnectedCallback() {
    if (Build.isBrowser) {
      document.dispatchEvent(new CustomEvent('ionInputDidUnload', {
        detail: this.el,
      }));
    }
  }
  componentWillLoad() {
    this.inheritedAttributes = Object.assign(Object.assign({}, inheritAriaAttributes(this.el)), inheritAttributes(this.el, ['data-form-type', 'title', 'tabindex']));
  }
  componentDidLoad() {
    this.originalIonInput = this.ionInput;
    this.runAutoGrow();
  }
  /**
   * Sets focus on the native `textarea` in `ion-textarea`. Use this method instead of the global
   * `textarea.focus()`.
   */
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  /**
   * Returns the native `<textarea>` element used under the hood.
   */
  getInputElement() {
    return Promise.resolve(this.nativeInput);
  }
  emitStyle() {
    if (this.legacyFormController.hasLegacyControl()) {
      this.ionStyle.emit({
        interactive: true,
        textarea: true,
        input: true,
        'interactive-disabled': this.disabled,
        'has-placeholder': this.placeholder !== undefined,
        'has-value': this.hasValue(),
        'has-focus': this.hasFocus,
      });
    }
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
  runAutoGrow() {
    if (this.nativeInput && this.autoGrow) {
      writeTask(() => {
        var _a;
        if (this.textareaWrapper) {
          // Replicated value is an attribute to be used in the stylesheet
          // to set the inner contents of a pseudo element.
          this.textareaWrapper.dataset.replicatedValue = (_a = this.value) !== null && _a !== void 0 ? _a : '';
        }
      });
    }
  }
  /**
   * Check if we need to clear the text input if clearOnEdit is enabled
   */
  checkClearOnEdit(ev) {
    if (!this.clearOnEdit) {
      return;
    }
    /**
     * Clear the textarea if the control has not been previously cleared
     * during focus.
     */
    if (!this.didTextareaClearOnEdit && this.hasValue()) {
      this.value = '';
      this.emitInputChange(ev);
    }
    this.didTextareaClearOnEdit = true;
  }
  focusChange() {
    this.emitStyle();
  }
  hasValue() {
    return this.getValue() !== '';
  }
  getValue() {
    return this.value || '';
  }
  // TODO: FW-2876 - Remove this render function
  renderLegacyTextarea() {
    if (!this.hasLoggedDeprecationWarning) {
      printIonWarning(`ion-textarea now requires providing a label with either the "label" property or the "aria-label" attribute. To migrate, remove any usage of "ion-label" and pass the label text to either the "label" property or the "aria-label" attribute.

Example: <ion-textarea label="Comments"></ion-textarea>
Example with aria-label: <ion-textarea aria-label="Comments"></ion-textarea>

For textareas that do not render the label immediately next to the input, developers may continue to use "ion-label" but must manually associate the label with the textarea by using "aria-labelledby".

Developers can use the "legacy" property to continue using the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.`, this.el);
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
        'legacy-textarea': true,
      }) }, h("div", { class: "textarea-legacy-wrapper", ref: (el) => (this.textareaWrapper = el) }, h("textarea", Object.assign({ class: "native-textarea", "aria-labelledby": label ? label.id : null, ref: (el) => (this.nativeInput = el), autoCapitalize: this.autocapitalize, autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, disabled: this.disabled, maxLength: this.maxlength, minLength: this.minlength, name: this.name, placeholder: this.placeholder || '', readOnly: this.readonly, required: this.required, spellcheck: this.spellcheck, cols: this.cols, rows: this.rows, wrap: this.wrap, onInput: this.onInput, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeyDown }, this.inheritedAttributes), value))));
  }
  renderLabel() {
    const { label } = this;
    if (label === undefined) {
      return;
    }
    return (h("div", { class: "label-text-wrapper" }, h("div", { class: "label-text" }, this.label)));
  }
  /**
   * Renders the border container when fill="outline".
   */
  renderLabelContainer() {
    const mode = getIonMode(this);
    const hasOutlineFill = mode === 'md' && this.fill === 'outline';
    if (hasOutlineFill) {
      /**
       * The outline fill has a special outline
       * that appears around the textarea and the label.
       * Certain stacked and floating label placements cause the
       * label to translate up and create a "cut out"
       * inside of that border by using the notch-spacer element.
       */
      return [
        h("div", { class: "textarea-outline-container" }, h("div", { class: "textarea-outline-start" }), h("div", { class: "textarea-outline-notch" }, h("div", { class: "notch-spacer", "aria-hidden": "true" }, this.label)), h("div", { class: "textarea-outline-end" })),
        this.renderLabel(),
      ];
    }
    /**
     * If not using the outline style,
     * we can render just the label.
     */
    return this.renderLabel();
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
    return (h("div", { class: "textarea-bottom" }, this.renderHintText(), this.renderCounter()));
  }
  renderTextarea() {
    const { inputId, disabled, fill, shape, labelPlacement } = this;
    const mode = getIonMode(this);
    const value = this.getValue();
    const inItem = hostContext('ion-item', this.el);
    const shouldRenderHighlight = mode === 'md' && fill !== 'outline' && !inItem;
    return (h(Host, { class: createColorClasses(this.color, {
        [mode]: true,
        'has-value': this.hasValue(),
        'has-focus': this.hasFocus,
        [`textarea-fill-${fill}`]: fill !== undefined,
        [`textarea-shape-${shape}`]: shape !== undefined,
        [`textarea-label-placement-${labelPlacement}`]: true,
        'textarea-disabled': disabled,
      }) }, h("label", { class: "textarea-wrapper" }, this.renderLabelContainer(), h("div", { class: "native-wrapper", ref: (el) => (this.textareaWrapper = el) }, h("textarea", Object.assign({ class: "native-textarea", ref: (el) => (this.nativeInput = el), id: inputId, disabled: disabled, autoCapitalize: this.autocapitalize, autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, minLength: this.minlength, maxLength: this.maxlength, name: this.name, placeholder: this.placeholder || '', readOnly: this.readonly, required: this.required, spellcheck: this.spellcheck, cols: this.cols, rows: this.rows, wrap: this.wrap, onInput: this.onInput, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeyDown }, this.inheritedAttributes), value)), shouldRenderHighlight && h("div", { class: "textarea-highlight" })), this.renderBottomContent()));
  }
  render() {
    const { legacyFormController } = this;
    return legacyFormController.hasLegacyControl() ? this.renderLegacyTextarea() : this.renderTextarea();
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "debounce": ["debounceChanged"],
    "disabled": ["disabledChanged"],
    "value": ["valueChanged"]
  }; }
};
let textareaIds = 0;
Textarea.style = {
  ios: textareaIosCss,
  md: textareaMdCss
};

export { Textarea as ion_textarea };
