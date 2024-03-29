import { r as registerInstance, t as createEvent, l as h, m as Host, q as getElement } from './index-6c5afe2f.js';
import { g as getIonMode } from './ionic-global-74a19eaa.js';
import { f as findClosestIonContent, d as disableContentScrollY, r as resetContentScrollY } from './index-721de5a3.js';
import { c as createLegacyFormController } from './index-ca581420.js';
import { e as clamp, j as debounceEvent, i as inheritAriaAttributes, n as renderHiddenInput, o as getAriaLabel } from './helpers-6885e51a.js';
import { p as printIonWarning } from './index-2ee22356.js';
import { i as isRTL } from './index-9b5bcea1.js';
import { c as createColorClasses, h as hostContext } from './theme-7ef00c83.js';

const rangeIosCss = ":host{--knob-handle-size:calc(var(--knob-size) * 2);--margin:8px;display:flex;position:relative;flex:3;align-items:center;font-family:var(--ion-font-family, inherit);user-select:none;z-index:2}:host(.range-disabled){pointer-events:none}::slotted(ion-label){flex:initial}::slotted(ion-icon[slot]){font-size:24px}.range-slider{position:relative;flex:1;width:100%;height:var(--height);contain:size layout style;cursor:grab;touch-action:pan-y}:host(.range-pressed) .range-slider{cursor:grabbing}.range-pin{position:absolute;background:var(--ion-color-base);color:var(--ion-color-contrast);text-align:center;box-sizing:border-box}.range-knob-handle{top:calc((var(--height) - var(--knob-handle-size)) / 2);-webkit-margin-start:calc(0px - var(--knob-handle-size) / 2);margin-inline-start:calc(0px - var(--knob-handle-size) / 2);position:absolute;width:var(--knob-handle-size);height:var(--knob-handle-size);text-align:center}@supports (inset-inline-start: 0){.range-knob-handle{inset-inline-start:0}}@supports not (inset-inline-start: 0){.range-knob-handle{left:0}[dir=rtl] .range-knob-handle,:host-context([dir=rtl]) .range-knob-handle{left:unset;right:unset;right:0}}[dir=rtl] .range-knob-handle,:host-context([dir=rtl]) .range-knob-handle{left:unset}.range-knob-handle:active,.range-knob-handle:focus{outline:none}.range-bar-container{border-radius:var(--bar-border-radius);top:calc((var(--height) - var(--bar-height)) / 2);position:absolute;width:100%;height:var(--bar-height)}@supports (inset-inline-start: 0){.range-bar-container{inset-inline-start:0}}@supports not (inset-inline-start: 0){.range-bar-container{left:0}[dir=rtl] .range-bar-container,:host-context([dir=rtl]) .range-bar-container{left:unset;right:unset;right:0}}[dir=rtl] .range-bar-container,:host-context([dir=rtl]) .range-bar-container{left:unset}.range-bar{border-radius:var(--bar-border-radius);position:absolute;width:100%;height:var(--bar-height);background:var(--bar-background);pointer-events:none}.range-knob{border-radius:var(--knob-border-radius);top:calc(50% - var(--knob-size) / 2);position:absolute;width:var(--knob-size);height:var(--knob-size);background:var(--knob-background);box-shadow:var(--knob-box-shadow);z-index:2;pointer-events:none}@supports (inset-inline-start: 0){.range-knob{inset-inline-start:calc(50% - var(--knob-size) / 2)}}@supports not (inset-inline-start: 0){.range-knob{left:calc(50% - var(--knob-size) / 2)}[dir=rtl] .range-knob,:host-context([dir=rtl]) .range-knob{left:unset;right:unset;right:calc(50% - var(--knob-size) / 2)}}[dir=rtl] .range-knob,:host-context([dir=rtl]) .range-knob{left:unset}:host(.range-pressed) .range-bar-active{will-change:left, right}:host(.in-item){width:100%}:host(.in-item[slot=start]),:host(.in-item[slot=end]){width:auto}:host(.in-item) ::slotted(ion-label){align-self:center}.range-wrapper{display:flex;position:relative;flex-grow:1;align-items:center;height:inherit}:host(.range-disabled) .label-text-wrapper{opacity:0.3}::slotted([slot=label]){max-width:200px;pointer-events:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}.native-wrapper{display:flex;flex-grow:1;align-items:center}:host(.range-label-placement-start) .range-wrapper{flex-direction:row}:host(.range-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:var(--margin);margin-inline-end:var(--margin);margin-top:0;margin-bottom:0}:host(.range-label-placement-end) .range-wrapper{flex-direction:row-reverse}:host(.range-label-placement-end) .label-text-wrapper{-webkit-margin-start:var(--margin);margin-inline-start:var(--margin);-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:var(--margin);margin-inline-end:var(--margin);margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host{--knob-border-radius:50%;--knob-background:#ffffff;--knob-box-shadow:0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12);--knob-size:26px;--bar-height:4px;--bar-background:var(--ion-color-step-900, #e6e6e6);--bar-background-active:var(--ion-color-primary, #3880ff);--bar-border-radius:2px;--height:42px;--margin:16px}:host(.legacy-range){-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:8px;padding-bottom:8px}:host(.ion-color) .range-bar-active,:host(.ion-color) .range-tick-active{background:var(--ion-color-base)}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:var(--margin);margin-inline-end:var(--margin);margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:var(--margin);margin-inline-start:var(--margin);-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-has-pin){padding-top:20px}.range-bar-active{bottom:0;width:auto;background:var(--bar-background-active)}.range-bar-active.has-ticks{border-radius:0;-webkit-margin-start:-2px;margin-inline-start:-2px;-webkit-margin-end:-2px;margin-inline-end:-2px}.range-tick{-webkit-margin-start:-2px;margin-inline-start:-2px;border-radius:0;position:absolute;top:17px;width:4px;height:8px;background:var(--ion-color-step-900, #e6e6e6);pointer-events:none}.range-tick-active{background:var(--bar-background-active)}.range-pin{transform:translate3d(0,  28px,  0) scale(0.01);-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:8px;padding-bottom:8px;display:inline-block;position:relative;top:-20px;min-width:28px;transition:transform 120ms ease;background:transparent;color:var(--ion-text-color, #000);font-size:12px;text-align:center}.range-knob-pressed .range-pin,.range-knob-handle.ion-focused .range-pin{transform:translate3d(0,  0,  0) scale(1)}:host(.range-disabled){opacity:0.5}";

const rangeMdCss = ":host{--knob-handle-size:calc(var(--knob-size) * 2);--margin:8px;display:flex;position:relative;flex:3;align-items:center;font-family:var(--ion-font-family, inherit);user-select:none;z-index:2}:host(.range-disabled){pointer-events:none}::slotted(ion-label){flex:initial}::slotted(ion-icon[slot]){font-size:24px}.range-slider{position:relative;flex:1;width:100%;height:var(--height);contain:size layout style;cursor:grab;touch-action:pan-y}:host(.range-pressed) .range-slider{cursor:grabbing}.range-pin{position:absolute;background:var(--ion-color-base);color:var(--ion-color-contrast);text-align:center;box-sizing:border-box}.range-knob-handle{top:calc((var(--height) - var(--knob-handle-size)) / 2);-webkit-margin-start:calc(0px - var(--knob-handle-size) / 2);margin-inline-start:calc(0px - var(--knob-handle-size) / 2);position:absolute;width:var(--knob-handle-size);height:var(--knob-handle-size);text-align:center}@supports (inset-inline-start: 0){.range-knob-handle{inset-inline-start:0}}@supports not (inset-inline-start: 0){.range-knob-handle{left:0}[dir=rtl] .range-knob-handle,:host-context([dir=rtl]) .range-knob-handle{left:unset;right:unset;right:0}}[dir=rtl] .range-knob-handle,:host-context([dir=rtl]) .range-knob-handle{left:unset}.range-knob-handle:active,.range-knob-handle:focus{outline:none}.range-bar-container{border-radius:var(--bar-border-radius);top:calc((var(--height) - var(--bar-height)) / 2);position:absolute;width:100%;height:var(--bar-height)}@supports (inset-inline-start: 0){.range-bar-container{inset-inline-start:0}}@supports not (inset-inline-start: 0){.range-bar-container{left:0}[dir=rtl] .range-bar-container,:host-context([dir=rtl]) .range-bar-container{left:unset;right:unset;right:0}}[dir=rtl] .range-bar-container,:host-context([dir=rtl]) .range-bar-container{left:unset}.range-bar{border-radius:var(--bar-border-radius);position:absolute;width:100%;height:var(--bar-height);background:var(--bar-background);pointer-events:none}.range-knob{border-radius:var(--knob-border-radius);top:calc(50% - var(--knob-size) / 2);position:absolute;width:var(--knob-size);height:var(--knob-size);background:var(--knob-background);box-shadow:var(--knob-box-shadow);z-index:2;pointer-events:none}@supports (inset-inline-start: 0){.range-knob{inset-inline-start:calc(50% - var(--knob-size) / 2)}}@supports not (inset-inline-start: 0){.range-knob{left:calc(50% - var(--knob-size) / 2)}[dir=rtl] .range-knob,:host-context([dir=rtl]) .range-knob{left:unset;right:unset;right:calc(50% - var(--knob-size) / 2)}}[dir=rtl] .range-knob,:host-context([dir=rtl]) .range-knob{left:unset}:host(.range-pressed) .range-bar-active{will-change:left, right}:host(.in-item){width:100%}:host(.in-item[slot=start]),:host(.in-item[slot=end]){width:auto}:host(.in-item) ::slotted(ion-label){align-self:center}.range-wrapper{display:flex;position:relative;flex-grow:1;align-items:center;height:inherit}:host(.range-disabled) .label-text-wrapper{opacity:0.3}::slotted([slot=label]){max-width:200px;pointer-events:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}.native-wrapper{display:flex;flex-grow:1;align-items:center}:host(.range-label-placement-start) .range-wrapper{flex-direction:row}:host(.range-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:var(--margin);margin-inline-end:var(--margin);margin-top:0;margin-bottom:0}:host(.range-label-placement-end) .range-wrapper{flex-direction:row-reverse}:host(.range-label-placement-end) .label-text-wrapper{-webkit-margin-start:var(--margin);margin-inline-start:var(--margin);-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:var(--margin);margin-inline-end:var(--margin);margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host{--knob-border-radius:50%;--knob-background:var(--bar-background-active);--knob-box-shadow:none;--knob-size:18px;--bar-height:2px;--bar-background:rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.26);--bar-background-active:var(--ion-color-primary, #3880ff);--bar-border-radius:0;--height:42px;--pin-background:var(--ion-color-primary, #3880ff);--pin-color:var(--ion-color-primary-contrast, #fff);--margin:14px;font-size:12px}::slotted([slot=label]){font-size:initial}:host(.legacy-range){-webkit-padding-start:14px;padding-inline-start:14px;-webkit-padding-end:14px;padding-inline-end:14px;padding-top:8px;padding-bottom:8px}:host(.ion-color) .range-bar{background:rgba(var(--ion-color-base-rgb), 0.26)}:host(.ion-color) .range-bar-active,:host(.ion-color) .range-knob,:host(.ion-color) .range-knob::before,:host(.ion-color) .range-pin,:host(.ion-color) .range-pin::before,:host(.ion-color) .range-tick{background:var(--ion-color-base);color:var(--ion-color-contrast)}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:var(--margin);margin-inline-end:var(--margin);margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:var(--margin);margin-inline-start:var(--margin);-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-has-pin){padding-top:28px}.range-bar-active{bottom:0;width:auto;background:var(--bar-background-active)}.range-knob{transform:scale(0.67);transition-duration:120ms;transition-property:transform, background-color, border;transition-timing-function:ease;z-index:2}.range-knob::before{border-radius:50%;position:absolute;width:var(--knob-size);height:var(--knob-size);transform:scale(1);transition:0.267s cubic-bezier(0, 0, 0.58, 1);background:var(--knob-background);content:\"\";opacity:0.13;pointer-events:none}@supports (inset-inline-start: 0){.range-knob::before{inset-inline-start:0}}@supports not (inset-inline-start: 0){.range-knob::before{left:0}[dir=rtl] .range-knob::before,:host-context([dir=rtl]) .range-knob::before{left:unset;right:unset;right:0}}.range-tick{position:absolute;top:calc((var(--height) - var(--bar-height)) / 2);width:var(--bar-height);height:var(--bar-height);background:var(--bar-background-active);z-index:1;pointer-events:none}.range-tick-active{background:transparent}.range-pin{padding-left:0;padding-right:0;padding-top:8px;padding-bottom:8px;border-radius:50%;transform:translate3d(0,  0,  0) scale(0.01);display:inline-block;position:relative;min-width:28px;height:28px;transition:transform 120ms ease, background 120ms ease;background:var(--pin-background);color:var(--pin-color);text-align:center}.range-pin::before{top:3px;-webkit-margin-start:-13px;margin-inline-start:-13px;border-radius:50% 50% 50% 0;position:absolute;width:26px;height:26px;transform:rotate(-45deg);transition:background 120ms ease;background:var(--pin-background);content:\"\";z-index:-1}@supports (inset-inline-start: 0){.range-pin::before{inset-inline-start:50%}}@supports not (inset-inline-start: 0){.range-pin::before{left:50%}[dir=rtl] .range-pin::before,:host-context([dir=rtl]) .range-pin::before{left:unset;right:unset;right:50%}}[dir=rtl] .range-pin::before,:host-context([dir=rtl]) .range-pin::before{left:unset}.range-knob-pressed .range-pin,.range-knob-handle.ion-focused .range-pin{transform:translate3d(0,  -24px,  0) scale(1)}@media (any-hover: hover){.range-knob-handle:hover .range-knob:before{transform:scale(2);opacity:0.13}}.range-knob-handle.ion-activated .range-knob:before,.range-knob-handle.ion-focused .range-knob:before,.range-knob-handle.range-knob-pressed .range-knob:before{transform:scale(2)}.range-knob-handle.ion-focused .range-knob::before{opacity:0.13}.range-knob-handle.ion-activated .range-knob::before,.range-knob-handle.range-knob-pressed .range-knob::before{opacity:0.25}:host(:not(.range-has-pin)) .range-knob-pressed .range-knob,:host(:not(.range-has-pin)) .range-knob-handle.ion-focused .range-knob{transform:scale(1)}:host(.range-disabled) .range-bar-active,:host(.range-disabled) .range-bar,:host(.range-disabled) .range-tick{background-color:var(--ion-color-step-250, #bfbfbf)}:host(.range-disabled) .range-knob{transform:scale(0.55);outline:5px solid #fff;background-color:var(--ion-color-step-250, #bfbfbf)}";

const Range = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionChange = createEvent(this, "ionChange", 7);
    this.ionInput = createEvent(this, "ionInput", 7);
    this.ionStyle = createEvent(this, "ionStyle", 7);
    this.ionFocus = createEvent(this, "ionFocus", 7);
    this.ionBlur = createEvent(this, "ionBlur", 7);
    this.ionKnobMoveStart = createEvent(this, "ionKnobMoveStart", 7);
    this.ionKnobMoveEnd = createEvent(this, "ionKnobMoveEnd", 7);
    this.rangeId = `ion-r-${rangeIds++}`;
    this.didLoad = false;
    this.noUpdate = false;
    this.hasFocus = false;
    this.inheritedAttributes = {};
    this.contentEl = null;
    this.initialContentScrollY = true;
    // This flag ensures we log the deprecation warning at most once.
    this.hasLoggedDeprecationWarning = false;
    this.clampBounds = (value) => {
      return clamp(this.min, value, this.max);
    };
    this.ensureValueInBounds = (value) => {
      if (this.dualKnobs) {
        return {
          lower: this.clampBounds(value.lower),
          upper: this.clampBounds(value.upper),
        };
      }
      else {
        return this.clampBounds(value);
      }
    };
    this.setupGesture = async () => {
      const rangeSlider = this.rangeSlider;
      if (rangeSlider) {
        this.gesture = (await import('./index-20a27e5b.js')).createGesture({
          el: rangeSlider,
          gestureName: 'range',
          gesturePriority: 100,
          threshold: 0,
          onStart: (ev) => this.onStart(ev),
          onMove: (ev) => this.onMove(ev),
          onEnd: (ev) => this.onEnd(ev),
        });
        this.gesture.enable(!this.disabled);
      }
    };
    this.handleKeyboard = (knob, isIncrease) => {
      const { ensureValueInBounds } = this;
      let step = this.step;
      step = step > 0 ? step : 1;
      step = step / (this.max - this.min);
      if (!isIncrease) {
        step *= -1;
      }
      if (knob === 'A') {
        this.ratioA = clamp(0, this.ratioA + step, 1);
      }
      else {
        this.ratioB = clamp(0, this.ratioB + step, 1);
      }
      this.ionKnobMoveStart.emit({ value: ensureValueInBounds(this.value) });
      this.updateValue();
      this.emitValueChange();
      this.ionKnobMoveEnd.emit({ value: ensureValueInBounds(this.value) });
    };
    this.onBlur = () => {
      if (this.hasFocus) {
        this.hasFocus = false;
        this.ionBlur.emit();
        this.emitStyle();
      }
    };
    this.onFocus = () => {
      if (!this.hasFocus) {
        this.hasFocus = true;
        this.ionFocus.emit();
        this.emitStyle();
      }
    };
    this.ratioA = 0;
    this.ratioB = 0;
    this.pressedKnob = undefined;
    this.color = undefined;
    this.debounce = undefined;
    this.name = this.rangeId;
    this.dualKnobs = false;
    this.min = 0;
    this.max = 100;
    this.pin = false;
    this.pinFormatter = (value) => Math.round(value);
    this.snaps = false;
    this.step = 1;
    this.ticks = true;
    this.activeBarStart = undefined;
    this.disabled = false;
    this.value = 0;
    this.labelPlacement = 'start';
    this.legacy = undefined;
  }
  debounceChanged() {
    const { ionInput, debounce, originalIonInput } = this;
    /**
     * If debounce is undefined, we have to manually revert the ionInput emitter in case
     * debounce used to be set to a number. Otherwise, the event would stay debounced.
     */
    this.ionInput = debounce === undefined ? originalIonInput !== null && originalIonInput !== void 0 ? originalIonInput : ionInput : debounceEvent(ionInput, debounce);
  }
  minChanged() {
    if (!this.noUpdate) {
      this.updateRatio();
    }
  }
  maxChanged() {
    if (!this.noUpdate) {
      this.updateRatio();
    }
  }
  activeBarStartChanged() {
    const { activeBarStart } = this;
    if (activeBarStart !== undefined) {
      if (activeBarStart > this.max) {
        printIonWarning(`Range: The value of activeBarStart (${activeBarStart}) is greater than the max (${this.max}). Valid values are greater than or equal to the min value and less than or equal to the max value.`, this.el);
        this.activeBarStart = this.max;
      }
      else if (activeBarStart < this.min) {
        printIonWarning(`Range: The value of activeBarStart (${activeBarStart}) is less than the min (${this.min}). Valid values are greater than or equal to the min value and less than or equal to the max value.`, this.el);
        this.activeBarStart = this.min;
      }
    }
  }
  disabledChanged() {
    if (this.gesture) {
      this.gesture.enable(!this.disabled);
    }
    this.emitStyle();
  }
  valueChanged() {
    if (!this.noUpdate) {
      this.updateRatio();
    }
  }
  componentWillLoad() {
    /**
     * If user has custom ID set then we should
     * not assign the default incrementing ID.
     */
    if (this.el.hasAttribute('id')) {
      this.rangeId = this.el.getAttribute('id');
    }
    this.inheritedAttributes = inheritAriaAttributes(this.el);
  }
  componentDidLoad() {
    this.originalIonInput = this.ionInput;
    this.setupGesture();
    this.didLoad = true;
  }
  connectedCallback() {
    const { el } = this;
    this.legacyFormController = createLegacyFormController(el);
    this.updateRatio();
    this.debounceChanged();
    this.disabledChanged();
    this.activeBarStartChanged();
    /**
     * If we have not yet rendered
     * ion-range, then rangeSlider is not defined.
     * But if we are moving ion-range via appendChild,
     * then rangeSlider will be defined.
     */
    if (this.didLoad) {
      this.setupGesture();
    }
    this.contentEl = findClosestIonContent(this.el);
  }
  disconnectedCallback() {
    if (this.gesture) {
      this.gesture.destroy();
      this.gesture = undefined;
    }
  }
  getValue() {
    var _a;
    const value = (_a = this.value) !== null && _a !== void 0 ? _a : 0;
    if (this.dualKnobs) {
      if (typeof value === 'object') {
        return value;
      }
      return {
        lower: 0,
        upper: value,
      };
    }
    else {
      if (typeof value === 'object') {
        return value.upper;
      }
      return value;
    }
  }
  // TODO FW-2997 remove this
  emitStyle() {
    if (this.legacyFormController.hasLegacyControl()) {
      this.ionStyle.emit({
        interactive: true,
        'interactive-disabled': this.disabled,
      });
    }
  }
  /**
   * Emits an `ionChange` event.
   *
   * This API should be called for user committed changes.
   * This API should not be used for external value changes.
   */
  emitValueChange() {
    this.value = this.ensureValueInBounds(this.value);
    this.ionChange.emit({ value: this.value });
  }
  onStart(detail) {
    const { contentEl } = this;
    if (contentEl) {
      this.initialContentScrollY = disableContentScrollY(contentEl);
    }
    const rect = (this.rect = this.rangeSlider.getBoundingClientRect());
    const currentX = detail.currentX;
    // figure out which knob they started closer to
    let ratio = clamp(0, (currentX - rect.left) / rect.width, 1);
    if (isRTL(this.el)) {
      ratio = 1 - ratio;
    }
    this.pressedKnob = !this.dualKnobs || Math.abs(this.ratioA - ratio) < Math.abs(this.ratioB - ratio) ? 'A' : 'B';
    this.setFocus(this.pressedKnob);
    // update the active knob's position
    this.update(currentX);
    this.ionKnobMoveStart.emit({ value: this.ensureValueInBounds(this.value) });
  }
  onMove(detail) {
    this.update(detail.currentX);
  }
  onEnd(detail) {
    const { contentEl, initialContentScrollY } = this;
    if (contentEl) {
      resetContentScrollY(contentEl, initialContentScrollY);
    }
    this.update(detail.currentX);
    this.pressedKnob = undefined;
    this.emitValueChange();
    this.ionKnobMoveEnd.emit({ value: this.ensureValueInBounds(this.value) });
  }
  update(currentX) {
    // figure out where the pointer is currently at
    // update the knob being interacted with
    const rect = this.rect;
    let ratio = clamp(0, (currentX - rect.left) / rect.width, 1);
    if (isRTL(this.el)) {
      ratio = 1 - ratio;
    }
    if (this.snaps) {
      // snaps the ratio to the current value
      ratio = valueToRatio(ratioToValue(ratio, this.min, this.max, this.step), this.min, this.max);
    }
    // update which knob is pressed
    if (this.pressedKnob === 'A') {
      this.ratioA = ratio;
    }
    else {
      this.ratioB = ratio;
    }
    // Update input value
    this.updateValue();
  }
  get valA() {
    return ratioToValue(this.ratioA, this.min, this.max, this.step);
  }
  get valB() {
    return ratioToValue(this.ratioB, this.min, this.max, this.step);
  }
  get ratioLower() {
    if (this.dualKnobs) {
      return Math.min(this.ratioA, this.ratioB);
    }
    const { activeBarStart } = this;
    if (activeBarStart == null) {
      return 0;
    }
    return valueToRatio(activeBarStart, this.min, this.max);
  }
  get ratioUpper() {
    if (this.dualKnobs) {
      return Math.max(this.ratioA, this.ratioB);
    }
    return this.ratioA;
  }
  updateRatio() {
    const value = this.getValue();
    const { min, max } = this;
    if (this.dualKnobs) {
      this.ratioA = valueToRatio(value.lower, min, max);
      this.ratioB = valueToRatio(value.upper, min, max);
    }
    else {
      this.ratioA = valueToRatio(value, min, max);
    }
  }
  updateValue() {
    this.noUpdate = true;
    const { valA, valB } = this;
    this.value = !this.dualKnobs
      ? valA
      : {
        lower: Math.min(valA, valB),
        upper: Math.max(valA, valB),
      };
    this.ionInput.emit({ value: this.value });
    this.noUpdate = false;
  }
  setFocus(knob) {
    if (this.el.shadowRoot) {
      const knobEl = this.el.shadowRoot.querySelector(knob === 'A' ? '.range-knob-a' : '.range-knob-b');
      if (knobEl) {
        knobEl.focus();
      }
    }
  }
  // TODO FW-2997 remove this
  renderLegacyRange() {
    if (!this.hasLoggedDeprecationWarning) {
      printIonWarning(`ion-range now requires providing a label with either the label slot or the "aria-label" attribute. To migrate, remove any usage of "ion-label" and pass the label text to either the component or the "aria-label" attribute.

Example: <ion-range><div slot="label">Volume</div></ion-range>
Example with aria-label: <ion-range aria-label="Volume"></ion-range>

Developers can use the "legacy" property to continue using the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.`, this.el);
      if (this.legacy) {
        printIonWarning(`ion-range is being used with the "legacy" property enabled which will forcibly enable the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.

Developers can dismiss this warning by removing their usage of the "legacy" property and using the new range syntax.`, this.el);
      }
      this.hasLoggedDeprecationWarning = true;
    }
    const { el, pressedKnob, disabled, pin, rangeId } = this;
    const mode = getIonMode(this);
    renderHiddenInput(true, el, this.name, JSON.stringify(this.getValue()), disabled);
    return (h(Host, { onFocusin: this.onFocus, onFocusout: this.onBlur, id: rangeId, class: createColorClasses(this.color, {
        [mode]: true,
        'in-item': hostContext('ion-item', el),
        'range-disabled': disabled,
        'range-pressed': pressedKnob !== undefined,
        'range-has-pin': pin,
        'legacy-range': true,
      }) }, h("slot", { name: "start" }), this.renderRangeSlider(), h("slot", { name: "end" })));
  }
  renderRange() {
    const { disabled, el, rangeId, pin, pressedKnob, labelPlacement } = this;
    const mode = getIonMode(this);
    renderHiddenInput(true, el, this.name, JSON.stringify(this.getValue()), disabled);
    return (h(Host, { onFocusin: this.onFocus, onFocusout: this.onBlur, id: rangeId, class: createColorClasses(this.color, {
        [mode]: true,
        'in-item': hostContext('ion-item', el),
        'range-disabled': disabled,
        'range-pressed': pressedKnob !== undefined,
        'range-has-pin': pin,
        [`range-label-placement-${labelPlacement}`]: true,
      }) }, h("label", { class: "range-wrapper", id: "range-label" }, h("div", { class: {
        'label-text-wrapper': true,
        'label-text-wrapper-hidden': !this.hasLabel,
      } }, h("slot", { name: "label" })), h("div", { class: "native-wrapper" }, h("slot", { name: "start" }), this.renderRangeSlider(), h("slot", { name: "end" })))));
  }
  get hasLabel() {
    return this.el.querySelector('[slot="label"]') !== null;
  }
  renderRangeSlider() {
    var _a;
    const { min, max, step, el, handleKeyboard, pressedKnob, disabled, pin, ratioLower, ratioUpper, inheritedAttributes, rangeId, pinFormatter, } = this;
    /**
     * Look for external label, ion-label, or aria-labelledby.
     * If none, see if user placed an aria-label on the host
     * and use that instead.
     */
    let { labelText } = getAriaLabel(el, rangeId);
    if (labelText === undefined || labelText === null) {
      labelText = inheritedAttributes['aria-label'];
    }
    let barStart = `${ratioLower * 100}%`;
    let barEnd = `${100 - ratioUpper * 100}%`;
    const rtl = isRTL(this.el);
    const start = rtl ? 'right' : 'left';
    const end = rtl ? 'left' : 'right';
    const tickStyle = (tick) => {
      return {
        [start]: tick[start],
      };
    };
    if (this.dualKnobs === false) {
      /**
       * When the value is less than the activeBarStart or the min value,
       * the knob will display at the start of the active bar.
       */
      if (this.valA < ((_a = this.activeBarStart) !== null && _a !== void 0 ? _a : this.min)) {
        /**
         * Sets the bar positions relative to the upper and lower limits.
         * Converts the ratio values into percentages, used as offsets for left/right styles.
         *
         * The ratioUpper refers to the knob position on the bar.
         * The ratioLower refers to the end position of the active bar (the value).
         */
        barStart = `${ratioUpper * 100}%`;
        barEnd = `${100 - ratioLower * 100}%`;
      }
      else {
        /**
         * Otherwise, the knob will display at the end of the active bar.
         *
         * The ratioLower refers to the start position of the active bar (the value).
         * The ratioUpper refers to the knob position on the bar.
         */
        barStart = `${ratioLower * 100}%`;
        barEnd = `${100 - ratioUpper * 100}%`;
      }
    }
    const barStyle = {
      [start]: barStart,
      [end]: barEnd,
    };
    const ticks = [];
    if (this.snaps && this.ticks) {
      for (let value = min; value <= max; value += step) {
        const ratio = valueToRatio(value, min, max);
        const ratioMin = Math.min(ratioLower, ratioUpper);
        const ratioMax = Math.max(ratioLower, ratioUpper);
        const tick = {
          ratio,
          /**
           * Sets the tick mark as active when the tick is between the min bounds and the knob.
           * When using activeBarStart, the tick mark will be active between the knob and activeBarStart.
           */
          active: ratio >= ratioMin && ratio <= ratioMax,
        };
        tick[start] = `${ratio * 100}%`;
        ticks.push(tick);
      }
    }
    let labelledBy;
    if (!this.legacyFormController.hasLegacyControl() && this.hasLabel) {
      labelledBy = 'range-label';
    }
    return (h("div", { class: "range-slider", ref: (rangeEl) => (this.rangeSlider = rangeEl) }, ticks.map((tick) => (h("div", { style: tickStyle(tick), role: "presentation", class: {
        'range-tick': true,
        'range-tick-active': tick.active,
      }, part: tick.active ? 'tick-active' : 'tick' }))), h("div", { class: "range-bar-container" }, h("div", { class: "range-bar", role: "presentation", part: "bar" }), h("div", { class: {
        'range-bar': true,
        'range-bar-active': true,
        'has-ticks': ticks.length > 0,
      }, role: "presentation", style: barStyle, part: "bar-active" })), renderKnob(rtl, {
      knob: 'A',
      pressed: pressedKnob === 'A',
      value: this.valA,
      ratio: this.ratioA,
      pin,
      pinFormatter,
      disabled,
      handleKeyboard,
      min,
      max,
      labelText,
      labelledBy,
    }), this.dualKnobs &&
      renderKnob(rtl, {
        knob: 'B',
        pressed: pressedKnob === 'B',
        value: this.valB,
        ratio: this.ratioB,
        pin,
        pinFormatter,
        disabled,
        handleKeyboard,
        min,
        max,
        labelText,
        labelledBy,
      })));
  }
  render() {
    const { legacyFormController } = this;
    return legacyFormController.hasLegacyControl() ? this.renderLegacyRange() : this.renderRange();
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "debounce": ["debounceChanged"],
    "min": ["minChanged"],
    "max": ["maxChanged"],
    "activeBarStart": ["activeBarStartChanged"],
    "disabled": ["disabledChanged"],
    "value": ["valueChanged"]
  }; }
};
const renderKnob = (rtl, { knob, value, ratio, min, max, disabled, pressed, pin, handleKeyboard, labelText, labelledBy, pinFormatter, }) => {
  const start = rtl ? 'right' : 'left';
  const knobStyle = () => {
    const style = {};
    style[start] = `${ratio * 100}%`;
    return style;
  };
  return (h("div", { onKeyDown: (ev) => {
      const key = ev.key;
      if (key === 'ArrowLeft' || key === 'ArrowDown') {
        handleKeyboard(knob, false);
        ev.preventDefault();
        ev.stopPropagation();
      }
      else if (key === 'ArrowRight' || key === 'ArrowUp') {
        handleKeyboard(knob, true);
        ev.preventDefault();
        ev.stopPropagation();
      }
    }, class: {
      'range-knob-handle': true,
      'range-knob-a': knob === 'A',
      'range-knob-b': knob === 'B',
      'range-knob-pressed': pressed,
      'range-knob-min': value === min,
      'range-knob-max': value === max,
      'ion-activatable': true,
      'ion-focusable': true,
    }, style: knobStyle(), role: "slider", tabindex: disabled ? -1 : 0, "aria-label": labelledBy === undefined ? labelText : null, "aria-labelledby": labelledBy !== undefined ? labelledBy : null, "aria-valuemin": min, "aria-valuemax": max, "aria-disabled": disabled ? 'true' : null, "aria-valuenow": value }, pin && (h("div", { class: "range-pin", role: "presentation", part: "pin" }, pinFormatter(value))), h("div", { class: "range-knob", role: "presentation", part: "knob" })));
};
const ratioToValue = (ratio, min, max, step) => {
  let value = (max - min) * ratio;
  if (step > 0) {
    value = Math.round(value / step) * step + min;
  }
  return clamp(min, value, max);
};
const valueToRatio = (value, min, max) => {
  return clamp(0, (value - min) / (max - min), 1);
};
let rangeIds = 0;
Range.style = {
  ios: rangeIosCss,
  md: rangeMdCss
};

export { Range as ion_range };
