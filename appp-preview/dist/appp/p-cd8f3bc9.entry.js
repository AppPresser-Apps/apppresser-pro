import{r as t,d as o,h as e,H as r,c as i}from"./p-1485d14b.js";import{g as s,a as n}from"./p-ed6788ce.js";import{C as a,a as p,d as c}from"./p-a82126d5.js";import{r as h,g as d,b as v}from"./p-cb8464c3.js";import{B as l,p as f,a as g,j as m,d as u,e as x}from"./p-7b9300a1.js";import{g as w}from"./p-0e4de1d0.js";import{d as b}from"./p-72c5c685.js";import{c as k}from"./p-11ace40b.js";import"./p-add30d46.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const y=(t,o,e)=>{const r=o.getBoundingClientRect(),i=r.height;let s=r.width;return"cover"===t&&e&&(s=e.getBoundingClientRect().width),{contentWidth:s,contentHeight:i}},P=(t,o)=>o&&"ION-ITEM"===o.tagName?t.findIndex((t=>t===o)):-1,D=t=>{const o=d(t).querySelector("button");o&&h((()=>o.focus()))},T=(t,o,e,r,i,s,n,a,p,c,h)=>{var d;let v={top:0,left:0,width:0,height:0};switch(s){case"event":if(!h)return p;v={top:h.clientY,left:h.clientX,width:1,height:1};break;case"trigger":default:const t=h,o=c||(null===(d=null==t?void 0:t.detail)||void 0===d?void 0:d.ionShadowTarget)||(null==t?void 0:t.target);if(!o)return p;const e=o.getBoundingClientRect();v={top:e.top,left:e.left,width:e.width,height:e.height}}const l=W(n,v,o,e,r,i,t),f=j(a,n,v,o,e),g=l.top+f.top,m=l.left+f.left,{arrowTop:u,arrowLeft:x}=N(n,r,i,g,m,o,e,t),{originX:w,originY:b}=$(n,a,t);return{top:g,left:m,referenceCoordinates:v,arrowTop:u,arrowLeft:x,originX:w,originY:b}},$=(t,o,e)=>{switch(t){case"top":return{originX:I(o),originY:"bottom"};case"bottom":return{originX:I(o),originY:"top"};case"left":return{originX:"right",originY:L(o)};case"right":return{originX:"left",originY:L(o)};case"start":return{originX:e?"left":"right",originY:L(o)};case"end":return{originX:e?"right":"left",originY:L(o)}}},I=t=>{switch(t){case"start":return"left";case"center":return"center";case"end":return"right"}},L=t=>{switch(t){case"start":return"top";case"center":return"center";case"end":return"bottom"}},N=(t,o,e,r,i,s,n,a)=>{const p={arrowTop:r+n/2-o/2,arrowLeft:i+s-o/2},c={arrowTop:r+n/2-o/2,arrowLeft:i-1.5*o};switch(t){case"top":return{arrowTop:r+n,arrowLeft:i+s/2-o/2};case"bottom":return{arrowTop:r-e,arrowLeft:i+s/2-o/2};case"left":return p;case"right":return c;case"start":return a?c:p;case"end":return a?p:c;default:return{arrowTop:0,arrowLeft:0}}},W=(t,o,e,r,i,s,n)=>{const a={top:o.top,left:o.left-e-i},p={top:o.top,left:o.left+o.width+i};switch(t){case"top":return{top:o.top-r-s,left:o.left};case"right":return p;case"bottom":return{top:o.top+o.height+s,left:o.left};case"left":return a;case"start":return n?p:a;case"end":return n?a:p}},j=(t,o,e,r,i)=>{switch(t){case"center":return O(o,e,r,i);case"end":return A(o,e,r,i);case"start":default:return{top:0,left:0}}},A=(t,o,e,r)=>{switch(t){case"start":case"end":case"left":case"right":return{top:-(r-o.height),left:0};case"top":case"bottom":default:return{top:0,left:-(e-o.width)}}},O=(t,o,e,r)=>{switch(t){case"start":case"end":case"left":case"right":return{top:-(r/2-o.height/2),left:0};case"top":case"bottom":default:return{top:0,left:-(e/2-o.width/2)}}},C=(t,o,e,r,i,s,n,a,p,c,h,d,v=0,l=0,f=0)=>{let g,m=v,u=e,x=o,w=c,b=h,k=!1,y=!1;const P=d?d.top+d.height:s/2-a/2,D=d?d.height:0;let T=!1;return u<r+p?(u=r,k=!0,w="left"):n+r+u+p>i&&(y=!0,u=i-n-r,w="right"),P+D+a>s&&("top"===t||"bottom"===t)&&(P-a>0?(x=P-a-D-(f-1),m=x+a,b="bottom",T=!0):g=r),{top:x,left:u,bottom:g,originX:w,originY:b,checkSafeAreaLeft:k,checkSafeAreaRight:y,arrowTop:m,arrowLeft:l,addPopoverBottomClass:T}},X=(t,o)=>{var e;const{event:r,size:i,trigger:s,reference:n,side:a,align:p}=o,c=t.ownerDocument,h="rtl"===c.dir,v=c.defaultView.innerWidth,l=c.defaultView.innerHeight,f=d(t),g=f.querySelector(".popover-content"),m=f.querySelector(".popover-arrow"),u=s||(null===(e=null==r?void 0:r.detail)||void 0===e?void 0:e.ionShadowTarget)||(null==r?void 0:r.target),{contentWidth:x,contentHeight:w}=y(i,g,u),{arrowWidth:b,arrowHeight:P}=(t=>{if(!t)return{arrowWidth:0,arrowHeight:0};const{width:o,height:e}=t.getBoundingClientRect();return{arrowWidth:o,arrowHeight:e}})(m),D=T(h,x,w,b,P,n,a,p,{top:l/2-w/2,left:v/2-x/2,originX:h?"right":"left",originY:"top"},s,r),$="cover"===i?0:5,I="cover"===i?0:25,{originX:L,originY:N,top:W,left:j,bottom:A,checkSafeAreaLeft:O,checkSafeAreaRight:X,arrowTop:Y,arrowLeft:z,addPopoverBottomClass:E}=C(a,D.top,D.left,$,v,l,x,w,I,D.originX,D.originY,D.referenceCoordinates,D.arrowTop,D.arrowLeft,P),H=k(),S=k(),V=k();return S.addElement(f.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),V.addElement(f.querySelector(".popover-wrapper")).fromTo("opacity",.01,1),H.easing("ease").duration(100).beforeAddWrite((()=>{"cover"===i&&t.style.setProperty("--width",`${x}px`),E&&t.classList.add("popover-bottom"),void 0!==A&&g.style.setProperty("bottom",`${A}px`);let o=`${j}px`;O&&(o=`${j}px + var(--ion-safe-area-left, 0)`),X&&(o=`${j}px - var(--ion-safe-area-right, 0)`),g.style.setProperty("top",`calc(${W}px + var(--offset-y, 0))`),g.style.setProperty("left",`calc(${o} + var(--offset-x, 0))`),g.style.setProperty("transform-origin",`${N} ${L}`),null!==m&&(((t,o=!1,e,r)=>!(!e&&!r||"top"!==t&&"bottom"!==t&&o))(a,D.top!==W||D.left!==j,r,s)?(m.style.setProperty("top",`calc(${Y}px + var(--offset-y, 0))`),m.style.setProperty("left",`calc(${z}px + var(--offset-x, 0))`)):m.style.setProperty("display","none"))})).addAnimation([S,V])},Y=t=>{const o=d(t),e=o.querySelector(".popover-content"),r=o.querySelector(".popover-arrow"),i=k(),s=k(),n=k();return s.addElement(o.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),n.addElement(o.querySelector(".popover-wrapper")).fromTo("opacity",.99,0),i.easing("ease").afterAddWrite((()=>{t.style.removeProperty("--width"),t.classList.remove("popover-bottom"),e.style.removeProperty("top"),e.style.removeProperty("left"),e.style.removeProperty("bottom"),e.style.removeProperty("transform-origin"),r&&(r.style.removeProperty("top"),r.style.removeProperty("left"),r.style.removeProperty("display"))})).duration(300).addAnimation([s,n])},z=(t,o)=>{var e;const{event:r,size:i,trigger:s,reference:n,side:a,align:p}=o,c=t.ownerDocument,h="rtl"===c.dir,v=c.defaultView.innerWidth,l=c.defaultView.innerHeight,f=d(t),g=f.querySelector(".popover-content"),m=s||(null===(e=null==r?void 0:r.detail)||void 0===e?void 0:e.ionShadowTarget)||(null==r?void 0:r.target),{contentWidth:u,contentHeight:x}=y(i,g,m),w=T(h,u,x,0,0,n,a,p,{top:l/2-x/2,left:v/2-u/2,originX:h?"right":"left",originY:"top"},s,r),b="cover"===i?0:12,{originX:P,originY:D,top:$,left:I,bottom:L}=C(a,w.top,w.left,b,v,l,u,x,0,w.originX,w.originY,w.referenceCoordinates),N=k(),W=k(),j=k(),A=k(),O=k();return W.addElement(f.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),j.addElement(f.querySelector(".popover-wrapper")).duration(150).fromTo("opacity",.01,1),A.addElement(g).beforeStyles({top:`calc(${$}px + var(--offset-y, 0px))`,left:`calc(${I}px + var(--offset-x, 0px))`,"transform-origin":`${D} ${P}`}).beforeAddWrite((()=>{void 0!==L&&g.style.setProperty("bottom",`${L}px`)})).fromTo("transform","scale(0.8)","scale(1)"),O.addElement(f.querySelector(".popover-viewport")).fromTo("opacity",.01,1),N.easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).beforeAddWrite((()=>{"cover"===i&&t.style.setProperty("--width",`${u}px`),"bottom"===D&&t.classList.add("popover-bottom")})).addAnimation([W,j,A,O])},E=t=>{const o=d(t),e=o.querySelector(".popover-content"),r=k(),i=k(),s=k();return i.addElement(o.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),s.addElement(o.querySelector(".popover-wrapper")).fromTo("opacity",.99,0),r.easing("ease").afterAddWrite((()=>{t.style.removeProperty("--width"),t.classList.remove("popover-bottom"),e.style.removeProperty("top"),e.style.removeProperty("left"),e.style.removeProperty("bottom"),e.style.removeProperty("transform-origin")})).duration(150).addAnimation([i,s])};let H=class{constructor(e){t(this,e),this.didPresent=o(this,"ionPopoverDidPresent",7),this.willPresent=o(this,"ionPopoverWillPresent",7),this.willDismiss=o(this,"ionPopoverWillDismiss",7),this.didDismiss=o(this,"ionPopoverDidDismiss",7),this.didPresentShorthand=o(this,"didPresent",7),this.willPresentShorthand=o(this,"willPresent",7),this.willDismissShorthand=o(this,"willDismiss",7),this.didDismissShorthand=o(this,"didDismiss",7),this.parentPopover=null,this.popoverIndex=V++,this.coreDelegate=a(),this.inline=!1,this.focusDescendantOnPresent=!1,this.presented=!1,this.hasController=!1,this.keyboardClose=!0,this.backdropDismiss=!0,this.showBackdrop=!0,this.translucent=!1,this.animated=!0,this.triggerAction="click",this.size="auto",this.dismissOnSelect=!1,this.reference="trigger",this.side="bottom",this.arrow=!0,this.isOpen=!1,this.keyboardEvents=!1,this.onBackdropTap=()=>{this.dismiss(void 0,l)},this.onLifecycle=t=>{const o=this.usersElement,e=S[t.type];if(o&&e){const r=new CustomEvent(e,{bubbles:!1,cancelable:!1,detail:t.detail});o.dispatchEvent(r)}},this.configureTriggerInteraction=()=>{const{trigger:t,triggerAction:o,el:e,destroyTriggerInteraction:r}=this;r&&r();const i=this.triggerEl=void 0!==t?document.getElementById(t):null;i&&(this.destroyTriggerInteraction=((t,o,e)=>{let r=[];switch(o){case"hover":let t;r=[{eventName:"mouseenter",callback:async o=>{o.stopPropagation(),t&&clearTimeout(t),t=setTimeout((()=>{h((()=>{e.presentFromTrigger(o),t=void 0}))}),100)}},{eventName:"mouseleave",callback:o=>{t&&clearTimeout(t);const r=o.relatedTarget;r&&r.closest("ion-popover")!==e&&e.dismiss(void 0,void 0,!1)}},{eventName:"click",callback:t=>t.stopPropagation()},{eventName:"ionPopoverActivateTrigger",callback:t=>e.presentFromTrigger(t,!0)}];break;case"context-menu":r=[{eventName:"contextmenu",callback:t=>{t.preventDefault(),e.presentFromTrigger(t)}},{eventName:"click",callback:t=>t.stopPropagation()},{eventName:"ionPopoverActivateTrigger",callback:t=>e.presentFromTrigger(t,!0)}];break;case"click":default:r=[{eventName:"click",callback:t=>e.presentFromTrigger(t)},{eventName:"ionPopoverActivateTrigger",callback:t=>e.presentFromTrigger(t,!0)}]}return r.forEach((({eventName:o,callback:e})=>t.addEventListener(o,e))),t.setAttribute("data-ion-popover-trigger","true"),()=>{r.forEach((({eventName:o,callback:e})=>t.removeEventListener(o,e))),t.removeAttribute("data-ion-popover-trigger")}})(i,o,e))},this.configureKeyboardInteraction=()=>{const{destroyKeyboardInteraction:t,el:o}=this;t&&t(),this.destroyKeyboardInteraction=(t=>{const o=async o=>{var e;const r=document.activeElement;let i=[];const s=null===(e=o.target)||void 0===e?void 0:e.tagName;if("ION-POPOVER"===s||"ION-ITEM"===s){try{i=Array.from(t.querySelectorAll("ion-item:not(ion-popover ion-popover *):not([disabled])"))}catch(t){}switch(o.key){case"ArrowLeft":await t.getParentPopover()&&t.dismiss(void 0,void 0,!1);break;case"ArrowDown":o.preventDefault();const e=((t,o)=>t[P(t,o)+1])(i,r);void 0!==e&&D(e);break;case"ArrowUp":o.preventDefault();const s=((t,o)=>t[P(t,o)-1])(i,r);void 0!==s&&D(s);break;case"Home":o.preventDefault();const n=i[0];void 0!==n&&D(n);break;case"End":o.preventDefault();const a=i[i.length-1];void 0!==a&&D(a);break;case"ArrowRight":case" ":case"Enter":if(r&&r.hasAttribute("data-ion-popover-trigger")){const t=new CustomEvent("ionPopoverActivateTrigger");r.dispatchEvent(t)}}}};return t.addEventListener("keydown",o),()=>t.removeEventListener("keydown",o)})(o)},this.configureDismissInteraction=()=>{const{destroyDismissInteraction:t,parentPopover:o,triggerAction:e,triggerEl:r,el:i}=this;o&&r&&(t&&t(),this.destroyDismissInteraction=((t,o,e,r)=>{let i=[];const s=d(r).querySelector(".popover-content");switch(o){case"hover":i=[{eventName:"mouseenter",callback:o=>{document.elementFromPoint(o.clientX,o.clientY)!==t&&e.dismiss(void 0,void 0,!1)}}];break;case"context-menu":case"click":default:i=[{eventName:"click",callback:o=>{o.target.closest("[data-ion-popover-trigger]")!==t?e.dismiss(void 0,void 0,!1):o.stopPropagation()}}]}return i.forEach((({eventName:t,callback:o})=>s.addEventListener(t,o))),()=>{i.forEach((({eventName:t,callback:o})=>s.removeEventListener(t,o)))}})(r,e,i,o))}}onTriggerChange(){this.configureTriggerInteraction()}onIsOpenChange(t,o){!0===t&&!1===o?this.present():!1===t&&!0===o&&this.dismiss()}connectedCallback(){f(this.el)}componentWillLoad(){this.popoverId=this.el.hasAttribute("id")?this.el.getAttribute("id"):`ion-popover-${this.popoverIndex}`,this.parentPopover=this.el.closest(`ion-popover:not(#${this.popoverId})`),void 0===this.alignment&&(this.alignment="ios"===s(this)?"center":"start")}componentDidLoad(){const{parentPopover:t,isOpen:o}=this;!0===o&&h((()=>this.present())),t&&v(t,"ionPopoverWillDismiss",(()=>{this.dismiss(void 0,void 0,!1)})),this.configureTriggerInteraction()}async presentFromTrigger(t,o=!1){this.focusDescendantOnPresent=o,await this.present(t),this.focusDescendantOnPresent=!1}getDelegate(t=!1){if(this.workingDelegate&&!t)return{delegate:this.workingDelegate,inline:this.inline};const o=this.inline=null!==this.el.parentNode&&!this.hasController;return{inline:o,delegate:this.workingDelegate=o?this.delegate||this.coreDelegate:this.delegate}}async present(t){if(this.presented)return;void 0!==this.currentTransition&&await this.currentTransition;const o=Object.assign(Object.assign({},this.componentProps),{popover:this.el}),{inline:e,delegate:r}=this.getDelegate(!0);this.usersElement=await p(r,this.el,this.component,["popover-viewport"],o,e),await b(this.usersElement),this.keyboardEvents||this.configureKeyboardInteraction(),this.configureDismissInteraction(),this.currentTransition=g(this,"popoverEnter",X,z,{event:t||this.event,size:this.size,trigger:this.triggerEl,reference:this.reference,side:this.side,align:this.alignment}),await this.currentTransition,this.currentTransition=void 0,this.focusDescendantOnPresent&&m(this.el,this.el)}async dismiss(t,o,e=!0){void 0!==this.currentTransition&&await this.currentTransition;const{destroyKeyboardInteraction:r,destroyDismissInteraction:i}=this;e&&this.parentPopover&&this.parentPopover.dismiss(t,o,e),this.currentTransition=u(this,t,o,"popoverLeave",Y,E,this.event);const s=await this.currentTransition;if(s){r&&(r(),this.destroyKeyboardInteraction=void 0),i&&(i(),this.destroyDismissInteraction=void 0);const{delegate:t}=this.getDelegate();await c(t,this.usersElement)}return this.currentTransition=void 0,s}async getParentPopover(){return this.parentPopover}onDidDismiss(){return x(this.el,"ionPopoverDidDismiss")}onWillDismiss(){return x(this.el,"ionPopoverWillDismiss")}render(){const t=s(this),{onLifecycle:o,popoverId:i,parentPopover:a,dismissOnSelect:p,side:c,arrow:h,htmlAttributes:d}=this,v=n("desktop"),l=h&&!a;return e(r,Object.assign({"aria-modal":"true","no-router":!0,tabindex:"-1"},d,{style:{zIndex:`${2e4+this.overlayIndex}`},id:i,class:Object.assign(Object.assign({},w(this.cssClass)),{[t]:!0,"popover-translucent":this.translucent,"overlay-hidden":!0,"popover-desktop":v,[`popover-side-${c}`]:!0,"popover-nested":!!a}),onIonPopoverDidPresent:o,onIonPopoverWillPresent:o,onIonPopoverWillDismiss:o,onIonPopoverDidDismiss:o,onIonBackdropTap:this.onBackdropTap}),!a&&e("ion-backdrop",{tappable:this.backdropDismiss,visible:this.showBackdrop,part:"backdrop"}),e("div",{class:"popover-wrapper ion-overlay-wrapper",onClick:p?()=>this.dismiss():void 0},l&&e("div",{class:"popover-arrow",part:"arrow"}),e("div",{class:"popover-content",part:"content"},e("slot",null))))}get el(){return i(this)}static get watchers(){return{trigger:["onTriggerChange"],triggerAction:["onTriggerChange"],isOpen:["onIsOpenChange"]}}};const S={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillLeave",ionPopoverDidDismiss:"ionViewDidLeave"};let V=0;H.style={ios:':host{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;--offset-x:0px;--offset-y:0px;left:0;right:0;top:0;bottom:0;display:flex;position:fixed;align-items:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}:host(.popover-nested){pointer-events:none}:host(.popover-nested) .popover-wrapper{pointer-events:auto}:host(.overlay-hidden){display:none}.popover-wrapper{opacity:0;z-index:10}.popover-content{display:flex;position:absolute;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px;display:flex;flex-direction:column;overflow:hidden}:host(.popover-nested.popover-side-left){--offset-x:5px}:host(.popover-nested.popover-side-right){--offset-x:-5px}:host(.popover-nested.popover-side-start){--offset-x:5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-start),:host-context([dir=rtl]).popover-nested.popover-side-start{--offset-x:-5px}:host(.popover-nested.popover-side-end){--offset-x:-5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-end),:host-context([dir=rtl]).popover-nested.popover-side-end{--offset-x:5px}:host{--width:200px;--max-height:90%;--box-shadow:none;--backdrop-opacity:var(--ion-backdrop-opacity, 0.08)}:host(.popover-desktop){--box-shadow:0px 4px 16px 0px rgba(0, 0, 0, 0.12)}.popover-content{border-radius:10px}:host(.popover-desktop) .popover-content{border:0.5px solid var(--ion-color-step-100, #e6e6e6)}.popover-arrow{display:block;position:absolute;width:20px;height:10px;overflow:hidden}.popover-arrow::after{left:3px;top:3px;border-radius:3px;position:absolute;width:14px;height:14px;transform:rotate(45deg);background:var(--background);content:"";z-index:10}[dir=rtl] .popover-arrow::after,:host-context([dir=rtl]) .popover-arrow::after{left:unset;right:unset;right:3px}:host(.popover-bottom) .popover-arrow{top:auto;bottom:-10px}:host(.popover-bottom) .popover-arrow::after{top:-6px}:host(.popover-side-left) .popover-arrow{transform:rotate(90deg)}:host(.popover-side-right) .popover-arrow{transform:rotate(-90deg)}:host(.popover-side-top) .popover-arrow{transform:rotate(180deg)}:host(.popover-side-start) .popover-arrow{transform:rotate(90deg)}:host-context([dir=rtl]):host(.popover-side-start) .popover-arrow,:host-context([dir=rtl]).popover-side-start .popover-arrow{transform:rotate(-90deg)}:host(.popover-side-end) .popover-arrow{transform:rotate(-90deg)}:host-context([dir=rtl]):host(.popover-side-end) .popover-arrow,:host-context([dir=rtl]).popover-side-end .popover-arrow{transform:rotate(90deg)}@supports (backdrop-filter: blur(0)){:host(.popover-translucent) .popover-content,:host(.popover-translucent) .popover-arrow::after{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);backdrop-filter:saturate(180%) blur(20px)}}',md:":host{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;--offset-x:0px;--offset-y:0px;left:0;right:0;top:0;bottom:0;display:flex;position:fixed;align-items:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}:host(.popover-nested){pointer-events:none}:host(.popover-nested) .popover-wrapper{pointer-events:auto}:host(.overlay-hidden){display:none}.popover-wrapper{opacity:0;z-index:10}.popover-content{display:flex;position:absolute;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px;display:flex;flex-direction:column;overflow:hidden}:host(.popover-nested.popover-side-left){--offset-x:5px}:host(.popover-nested.popover-side-right){--offset-x:-5px}:host(.popover-nested.popover-side-start){--offset-x:5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-start),:host-context([dir=rtl]).popover-nested.popover-side-start{--offset-x:-5px}:host(.popover-nested.popover-side-end){--offset-x:-5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-end),:host-context([dir=rtl]).popover-nested.popover-side-end{--offset-x:5px}:host{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}.popover-content{border-radius:4px;transform-origin:left top}[dir=rtl] .popover-content,:host-context([dir=rtl]) .popover-content{transform-origin:right top}.popover-viewport{transition-delay:100ms}"};export{H as ion_popover}