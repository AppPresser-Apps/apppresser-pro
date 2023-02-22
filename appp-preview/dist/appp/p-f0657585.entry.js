import{r as t,e as i,h as e,H as n,d as o}from"./p-a9088fe3.js";import{g as r}from"./p-2f6e21fc.js";import{r as s,g as a}from"./p-cf7b12f5.js";import{a as h,b as l,c}from"./p-b29e1ab6.js";import{c as p}from"./p-0e4de1d0.js";let d=class{constructor(e){t(this,e),this.ionChange=i(this,"ionChange",7),this.isScrolling=!1,this.isColumnVisible=!1,this.canExitInputMode=!0,this.isActive=!1,this.items=[],this.color="primary",this.numericInput=!1,this.centerPickerItemInView=(t,i=!0,e=!0)=>{const{el:n,isColumnVisible:o}=this;if(o){const o=t.offsetTop-3*t.clientHeight+t.clientHeight/2;n.scrollTop!==o&&(this.canExitInputMode=e,n.scroll({top:o,left:0,behavior:i?"smooth":void 0}))}},this.inputModeChange=t=>{if(!this.numericInput)return;const{useInputMode:i,inputModeColumn:e}=t.detail;this.setInputModeActive(!(!i||void 0!==e&&e!==this.el))},this.setInputModeActive=t=>{this.isScrolling?this.scrollEndCallback=()=>{this.isActive=t}:this.isActive=t},this.initializeScrollListener=()=>{const{el:t}=this;let i,e=this.activeItem;const n=()=>{s((()=>{i&&(clearTimeout(i),i=void 0),this.isScrolling||(h(),this.isScrolling=!0);const n=t.getBoundingClientRect(),o=t.shadowRoot.elementFromPoint(n.x+n.width/2,n.y+n.height/2);null!==e&&e.classList.remove(g),null===o||o.disabled||(o!==e&&(l(),this.canExitInputMode&&this.exitInputMode()),e=o,o.classList.add(g),i=setTimeout((()=>{this.isScrolling=!1,c();const{scrollEndCallback:t}=this;t&&(t(),this.scrollEndCallback=void 0),this.canExitInputMode=!0;const i=o.getAttribute("data-index");if(null===i)return;const e=parseInt(i,10),n=this.items[e];n.value!==this.value&&this.setValue(n.value)}),250))}))};s((()=>{t.addEventListener("scroll",n),this.destroyScrollListener=()=>{t.removeEventListener("scroll",n)}}))},this.exitInputMode=()=>{const{parentEl:t}=this;null!=t&&(t.exitInputMode(),this.el.classList.remove("picker-column-active"))}}valueChange(){this.isColumnVisible&&this.scrollActiveItemIntoView()}componentWillLoad(){new IntersectionObserver((t=>{var i;if(t[0].isIntersecting){this.isColumnVisible=!0;const t=a(this.el).querySelector(`.${g}`);null==t||t.classList.remove(g),this.scrollActiveItemIntoView(),null===(i=this.activeItem)||void 0===i||i.classList.add(g),this.initializeScrollListener()}else this.isColumnVisible=!1,this.destroyScrollListener&&(this.destroyScrollListener(),this.destroyScrollListener=void 0)}),{threshold:.001}).observe(this.el);const t=this.parentEl=this.el.closest("ion-picker-internal");null!==t&&t.addEventListener("ionInputModeChange",(t=>this.inputModeChange(t)))}componentDidRender(){var t;const{activeItem:i,items:e,isColumnVisible:n,value:o}=this;n&&(i?this.scrollActiveItemIntoView():(null===(t=e[0])||void 0===t?void 0:t.value)!==o&&this.setValue(e[0].value))}async scrollActiveItemIntoView(){const t=this.activeItem;t&&this.centerPickerItemInView(t,!1,!1)}async setValue(t){const{items:i}=this;this.value=t;const e=i.find((i=>i.value===t&&!0!==i.disabled));e&&this.ionChange.emit(e)}get activeItem(){return a(this.el).querySelector(`.picker-item[data-value="${this.value}"]:not([disabled])`)}render(){const{items:t,color:i,isActive:o,numericInput:s}=this,a=r(this);return e(n,{tabindex:0,class:p(i,{[a]:!0,"picker-column-active":o,"picker-column-numeric-input":s})},e("div",{class:"picker-item picker-item-empty"}," "),e("div",{class:"picker-item picker-item-empty"}," "),e("div",{class:"picker-item picker-item-empty"}," "),t.map(((t,i)=>e("button",{tabindex:"-1",class:{"picker-item":!0,"picker-item-disabled":t.disabled||!1},"data-value":t.value,"data-index":i,onClick:t=>{this.centerPickerItemInView(t.target,!0)},disabled:t.disabled},t.text))),e("div",{class:"picker-item picker-item-empty"}," "),e("div",{class:"picker-item picker-item-empty"}," "),e("div",{class:"picker-item picker-item-empty"}," "))}get el(){return o(this)}static get watchers(){return{value:["valueChange"]}}};const g="picker-item-active";d.style={ios:":host{padding-left:16px;padding-right:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host::-webkit-scrollbar{display:none}:host .picker-item{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty,:host .picker-item.picker-item-disabled{scroll-snap-align:none;cursor:default}:host .picker-item.picker-item-disabled{opacity:0.4}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}",md:":host{padding-left:16px;padding-right:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host::-webkit-scrollbar{display:none}:host .picker-item{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty,:host .picker-item.picker-item-disabled{scroll-snap-align:none;cursor:default}:host .picker-item.picker-item-disabled{opacity:0.4}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}:host .picker-item-active{color:var(--ion-color-base)}"};let u=class{constructor(e){t(this,e),this.ionInputModeChange=i(this,"ionInputModeChange",7),this.useInputMode=!1,this.isInHighlightBounds=t=>{const{highlightEl:i}=this;if(!i)return!1;const e=i.getBoundingClientRect();return!(t.clientX<e.left||t.clientX>e.right||t.clientY<e.top||t.clientY>e.bottom)},this.onFocusOut=t=>{const{relatedTarget:i}=t;(!i||"ION-PICKER-COLUMN-INTERNAL"!==i.tagName&&i!==this.inputEl)&&this.exitInputMode()},this.onFocusIn=t=>{const{target:i}=t;if("ION-PICKER-COLUMN-INTERNAL"===i.tagName&&!this.actionOnClick){const t=i;t.numericInput?this.enterInputMode(t,!1):this.exitInputMode()}},this.onClick=()=>{const{actionOnClick:t}=this;t&&(t(),this.actionOnClick=void 0)},this.onPointerDown=t=>{const{useInputMode:i,inputModeColumn:e,el:n}=this;if(this.isInHighlightBounds(t))if(i)this.actionOnClick="ION-PICKER-COLUMN-INTERNAL"===t.target.tagName?e&&e===t.target?()=>{this.enterInputMode()}:()=>{this.enterInputMode(t.target)}:()=>{this.exitInputMode()};else{const i=1===n.querySelectorAll("ion-picker-column-internal.picker-column-numeric-input").length?t.target:void 0;this.actionOnClick=()=>{this.enterInputMode(i)}}else this.actionOnClick=()=>{this.exitInputMode()}},this.enterInputMode=(t,i=!0)=>{const{inputEl:e,el:n}=this;e&&n.querySelector("ion-picker-column-internal.picker-column-numeric-input")&&(this.useInputMode=!0,this.inputModeColumn=t,i?(this.destroyKeypressListener&&(this.destroyKeypressListener(),this.destroyKeypressListener=void 0),e.focus()):(n.addEventListener("keypress",this.onKeyPress),this.destroyKeypressListener=()=>{n.removeEventListener("keypress",this.onKeyPress)}),this.emitInputModeChange())},this.onKeyPress=t=>{const{inputEl:i}=this;if(!i)return;const e=parseInt(t.key,10);Number.isNaN(e)||(i.value+=t.key,this.onInputChange())},this.selectSingleColumn=()=>{const{inputEl:t,inputModeColumn:i,singleColumnSearchTimeout:e}=this;if(!t||!i)return;const n=i.items.filter((t=>!0!==t.disabled));if(e&&clearTimeout(e),this.singleColumnSearchTimeout=setTimeout((()=>{t.value="",this.singleColumnSearchTimeout=void 0}),1e3),t.value.length>=3){const i=t.value.substring(t.value.length-2);return t.value=i,void this.selectSingleColumn()}const o=n.find((({text:i})=>i.replace(/^0+(?=[1-9])|0+(?=0$)/,"")===t.value));if(o)i.setValue(o.value);else if(2===t.value.length){const i=t.value.substring(t.value.length-1);t.value=i,this.selectSingleColumn()}},this.searchColumn=(t,i,e="start")=>{const n="start"===e?/^0+/:/0$/,o=t.items.find((({text:t,disabled:e})=>!0!==e&&t.replace(n,"")===i));o&&t.setValue(o.value)},this.selectMultiColumn=()=>{const{inputEl:t,el:i}=this;if(!t)return;const e=Array.from(i.querySelectorAll("ion-picker-column-internal")).filter((t=>t.numericInput)),n=e[0],o=e[1];let r,s=t.value;switch(s.length){case 1:this.searchColumn(n,s);break;case 2:const i=t.value.substring(0,1);s="0"===i||"1"===i?t.value:i,this.searchColumn(n,s),1===s.length&&(r=t.value.substring(t.value.length-1),this.searchColumn(o,r,"end"));break;case 3:const e=t.value.substring(0,1);s="0"===e||"1"===e?t.value.substring(0,2):e,this.searchColumn(n,s),r=t.value.substring(1===s.length?1:2),this.searchColumn(o,r,"end");break;case 4:const a=t.value.substring(0,1);s="0"===a||"1"===a?t.value.substring(0,2):a,this.searchColumn(n,s);const h=t.value.substring(1===s.length?1:2,t.value.length);this.searchColumn(o,h,"end");break;default:const l=t.value.substring(t.value.length-4);t.value=l,this.selectMultiColumn()}},this.onInputChange=()=>{const{useInputMode:t,inputEl:i,inputModeColumn:e}=this;t&&i&&(e?this.selectSingleColumn():this.selectMultiColumn())},this.emitInputModeChange=()=>{const{useInputMode:t,inputModeColumn:i}=this;this.ionInputModeChange.emit({useInputMode:t,inputModeColumn:i})}}preventTouchStartPropagation(t){t.stopPropagation()}componentWillLoad(){a(this.el).addEventListener("focusin",this.onFocusIn),a(this.el).addEventListener("focusout",this.onFocusOut)}async exitInputMode(){const{inputEl:t,useInputMode:i}=this;i&&t&&(this.useInputMode=!1,this.inputModeColumn=void 0,t.blur(),t.value="",this.destroyKeypressListener&&(this.destroyKeypressListener(),this.destroyKeypressListener=void 0),this.emitInputModeChange())}render(){return e(n,{onPointerDown:t=>this.onPointerDown(t),onClick:()=>this.onClick()},e("input",{"aria-hidden":"true",tabindex:-1,inputmode:"numeric",type:"number",ref:t=>this.inputEl=t,onInput:()=>this.onInputChange(),onBlur:()=>this.exitInputMode()}),e("div",{class:"picker-before"}),e("div",{class:"picker-after"}),e("div",{class:"picker-highlight",ref:t=>this.highlightEl=t}),e("slot",null))}get el(){return o(this)}};u.style={ios:":host{display:flex;position:relative;align-items:center;justify-content:center;width:100%;height:200px;direction:ltr;z-index:0}:host .picker-before,:host .picker-after{position:absolute;width:100%;transform:translateZ(0);z-index:1;pointer-events:none}:host .picker-before{left:0;top:0;height:83px}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host .picker-after{left:0;top:116px;height:84px}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host .picker-highlight{border-radius:8px;left:0;right:0;top:50%;bottom:0;margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;position:absolute;width:calc(100% - 16px);height:34px;transform:translateY(-50%);z-index:-1}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){:host .picker-highlight{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}:host input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host ::slotted(ion-picker-column-internal:first-of-type){text-align:start}:host ::slotted(ion-picker-column-internal:last-of-type){text-align:end}:host ::slotted(ion-picker-column-internal:only-child){text-align:center}:host .picker-before{background:linear-gradient(to bottom, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%)}:host .picker-after{background:linear-gradient(to top, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%)}:host .picker-highlight{background:var(--ion-color-step-150, #eeeeef)}",md:":host{display:flex;position:relative;align-items:center;justify-content:center;width:100%;height:200px;direction:ltr;z-index:0}:host .picker-before,:host .picker-after{position:absolute;width:100%;transform:translateZ(0);z-index:1;pointer-events:none}:host .picker-before{left:0;top:0;height:83px}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host .picker-after{left:0;top:116px;height:84px}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host .picker-highlight{border-radius:8px;left:0;right:0;top:50%;bottom:0;margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;position:absolute;width:calc(100% - 16px);height:34px;transform:translateY(-50%);z-index:-1}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){:host .picker-highlight{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}:host input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host ::slotted(ion-picker-column-internal:first-of-type){text-align:start}:host ::slotted(ion-picker-column-internal:last-of-type){text-align:end}:host ::slotted(ion-picker-column-internal:only-child){text-align:center}:host .picker-before{background:linear-gradient(to bottom, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0) 90%)}:host .picker-after{background:linear-gradient(to top, var(--background, var(--ion-background-color, #fff)) 30%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0) 90%)}"};export{d as ion_picker_column_internal,u as ion_picker_internal}