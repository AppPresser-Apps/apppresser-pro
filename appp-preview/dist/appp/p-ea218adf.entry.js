import{r as t,e as i,w as o,h as a,H as e,d as r}from"./p-a9088fe3.js";import{g as s,c as n}from"./p-2f6e21fc.js";import{a as d,i as h,d as p,r as l,f as c,p as m}from"./p-4b2d31e5.js";import{C as f,a as b,d as u}from"./p-389f918d.js";import{g,a as w,r as v,e as x}from"./p-cf7b12f5.js";import{KEYBOARD_DID_OPEN as k}from"./p-809bbccf.js";import{p as y}from"./p-ebeb7ac8.js";import{w as D}from"./p-924f3f49.js";import{G as A,B,p as Y,a as C,b as M,d as T,e as j}from"./p-545af5c0.js";import{g as S}from"./p-0e4de1d0.js";import{d as E}from"./p-7f66a899.js";import{c as I}from"./p-909924eb.js";import{g as O}from"./p-2f802871.js";import{createGesture as $}from"./p-0b857c77.js";import"./p-add30d46.js";import"./p-6396c013.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */var P;!function(t){t.Dark="DARK",t.Light="LIGHT",t.Default="DEFAULT"}(P||(P={}));const z={getEngine(){var t;return(null===(t=null==D?void 0:D.Capacitor)||void 0===t?void 0:t.isPluginAvailable("StatusBar"))&&(null==D?void 0:D.Capacitor.Plugins.StatusBar)},supportsDefaultStatusBarStyle(){var t;return!!(null===(t=null==D?void 0:D.Capacitor)||void 0===t?void 0:t.PluginHeaders)},setStyle(t){const i=this.getEngine();i&&i.setStyle(t)},getStyle:async function(){const t=this.getEngine();if(!t)return P.Default;const{style:i}=await t.getInfo();return i}},W=(t,i)=>{if(1===i)return 0;const o=1/(1-i);return t*o+-i*o},L=()=>{!D||D.innerWidth>=768||!z.supportsDefaultStatusBarStyle()||z.setStyle({style:P.Dark})},R=(t=P.Default)=>{!D||D.innerWidth>=768||!z.supportsDefaultStatusBarStyle()||z.setStyle({style:t})},N=async(t,i)=>{"function"==typeof t.canDismiss&&await t.canDismiss(void 0,A)&&(i.isRunning()?i.onFinish((()=>{t.dismiss(void 0,"handler")}),{oneTimeCallback:!0}):t.dismiss(void 0,"handler"))},K=t=>.00255275*2.71828**(-14.9619*t)-1.00255*2.71828**(-.0380968*t)+1,V=(t,i)=>w(400,t/Math.abs(1.1*i),500),F=t=>{const{currentBreakpoint:i,backdropBreakpoint:o}=t,a=void 0===o||o<i,e=a?`calc(var(--backdrop-opacity) * ${i})`:"0",r=I("backdropAnimation").fromTo("opacity",0,e);return a&&r.beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),{wrapperAnimation:I("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:"translateY(100%)"},{offset:1,opacity:1,transform:`translateY(${100-100*i}%)`}]),backdropAnimation:r}},G=t=>{const{currentBreakpoint:i,backdropBreakpoint:o}=t,a=`calc(var(--backdrop-opacity) * ${W(i,o)})`,e=[{offset:0,opacity:a},{offset:1,opacity:0}],r=[{offset:0,opacity:a},{offset:o,opacity:0},{offset:1,opacity:0}],s=I("backdropAnimation").keyframes(0!==o?r:e);return{wrapperAnimation:I("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:`translateY(${100-100*i}%)`},{offset:1,opacity:1,transform:"translateY(100%)"}]),backdropAnimation:s}},_=(t,i)=>{const{presentingEl:o,currentBreakpoint:a}=i,e=g(t),{wrapperAnimation:r,backdropAnimation:s}=void 0!==a?F(i):{backdropAnimation:I().fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),wrapperAnimation:I().fromTo("transform","translateY(100vh)","translateY(0vh)")};s.addElement(e.querySelector("ion-backdrop")),r.addElement(e.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});const n=I("entering-base").addElement(t).easing("cubic-bezier(0.32,0.72,0,1)").duration(500).addAnimation(r);if(o){const t=window.innerWidth<768,i="ION-MODAL"===o.tagName&&void 0!==o.presentingElement,a=g(o),e=I().beforeStyles({transform:"translateY(0)","transform-origin":"top center",overflow:"hidden"}),d=document.body;if(t){const t=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",a=`translateY(${i?"-10px":t}) scale(0.93)`;e.afterStyles({transform:a}).beforeAddWrite((()=>d.style.setProperty("background-color","black"))).addElement(o).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"},{offset:1,filter:"contrast(0.85)",transform:a,borderRadius:"10px 10px 0 0"}]),n.addAnimation(e)}else if(n.addAnimation(s),i){const t=`translateY(-10px) scale(${i?.93:1})`;e.afterStyles({transform:t}).addElement(a.querySelector(".modal-wrapper")).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0) scale(1)"},{offset:1,filter:"contrast(0.85)",transform:t}]);const o=I().afterStyles({transform:t}).addElement(a.querySelector(".modal-shadow")).keyframes([{offset:0,opacity:"1",transform:"translateY(0) scale(1)"},{offset:1,opacity:"0",transform:t}]);n.addAnimation([e,o])}else r.fromTo("opacity","0","1")}else n.addAnimation(s);return n},H=(t,i,o=500)=>{const{presentingEl:a,currentBreakpoint:e}=i,r=g(t),{wrapperAnimation:s,backdropAnimation:n}=void 0!==e?G(i):{backdropAnimation:I().fromTo("opacity","var(--backdrop-opacity)",0),wrapperAnimation:I().fromTo("transform","translateY(0vh)","translateY(100vh)")};n.addElement(r.querySelector("ion-backdrop")),s.addElement(r.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});const d=I("leaving-base").addElement(t).easing("cubic-bezier(0.32,0.72,0,1)").duration(o).addAnimation(s);if(a){const t=window.innerWidth<768,i="ION-MODAL"===a.tagName&&void 0!==a.presentingElement,o=g(a),e=I().beforeClearStyles(["transform"]).afterClearStyles(["transform"]).onFinish((t=>{1===t&&(a.style.setProperty("overflow",""),Array.from(r.querySelectorAll("ion-modal")).filter((t=>void 0!==t.presentingElement)).length<=1&&r.style.setProperty("background-color",""))})),r=document.body;if(t){const t=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",o=`translateY(${i?"-10px":t}) scale(0.93)`;e.addElement(a).keyframes([{offset:0,filter:"contrast(0.85)",transform:o,borderRadius:"10px 10px 0 0"},{offset:1,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"}]),d.addAnimation(e)}else if(d.addAnimation(n),i){const t=`translateY(-10px) scale(${i?.93:1})`;e.addElement(o.querySelector(".modal-wrapper")).afterStyles({transform:"translate3d(0, 0, 0)"}).keyframes([{offset:0,filter:"contrast(0.85)",transform:t},{offset:1,filter:"contrast(1)",transform:"translateY(0) scale(1)"}]);const a=I().addElement(o.querySelector(".modal-shadow")).afterStyles({transform:"translateY(0) scale(1)"}).keyframes([{offset:0,opacity:"0",transform:t},{offset:1,opacity:"1",transform:"translateY(0) scale(1)"}]);d.addAnimation([e,a])}else s.fromTo("opacity","1","0")}else d.addAnimation(n);return d},Z=(t,i)=>{const{currentBreakpoint:o}=i,a=g(t),{wrapperAnimation:e,backdropAnimation:r}=void 0!==o?F(i):{backdropAnimation:I().fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),wrapperAnimation:I().keyframes([{offset:0,opacity:.01,transform:"translateY(40px)"},{offset:1,opacity:1,transform:"translateY(0px)"}])};return r.addElement(a.querySelector("ion-backdrop")),e.addElement(a.querySelector(".modal-wrapper")),I().addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(280).addAnimation([r,e])},U=(t,i)=>{const{currentBreakpoint:o}=i,a=g(t),{wrapperAnimation:e,backdropAnimation:r}=void 0!==o?G(i):{backdropAnimation:I().fromTo("opacity","var(--backdrop-opacity)",0),wrapperAnimation:I().keyframes([{offset:0,opacity:.99,transform:"translateY(0px)"},{offset:1,opacity:0,transform:"translateY(40px)"}])};return r.addElement(a.querySelector("ion-backdrop")),e.addElement(a.querySelector(".modal-wrapper")),I().easing("cubic-bezier(0.47,0,0.745,0.715)").duration(200).addAnimation([r,e])};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */let q=class{constructor(o){t(this,o),this.didPresent=i(this,"ionModalDidPresent",7),this.willPresent=i(this,"ionModalWillPresent",7),this.willDismiss=i(this,"ionModalWillDismiss",7),this.didDismiss=i(this,"ionModalDidDismiss",7),this.ionBreakpointDidChange=i(this,"ionBreakpointDidChange",7),this.didPresentShorthand=i(this,"didPresent",7),this.willPresentShorthand=i(this,"willPresent",7),this.willDismissShorthand=i(this,"willDismiss",7),this.didDismissShorthand=i(this,"didDismiss",7),this.modalIndex=Q++,this.coreDelegate=f(),this.isSheetModal=!1,this.inheritedAttributes={},this.inline=!1,this.gestureAnimationDismissing=!1,this.presented=!1,this.hasController=!1,this.keyboardClose=!0,this.backdropBreakpoint=0,this.handleBehavior="none",this.backdropDismiss=!0,this.showBackdrop=!0,this.animated=!0,this.swipeToClose=!1,this.isOpen=!1,this.keepContentsMounted=!1,this.configureTriggerInteraction=()=>{const{trigger:t,el:i,destroyTriggerInteraction:o}=this;if(o&&o(),void 0===t)return;const a=void 0!==t?document.getElementById(t):null;a?this.destroyTriggerInteraction=((t,i)=>{const o=()=>{i.present()};return t.addEventListener("click",o),()=>{t.removeEventListener("click",o)}})(a,i):y(`A trigger element with the ID "${t}" was not found in the DOM. The trigger element must be in the DOM when the "trigger" property is set on ion-modal.`,this.el)},this.onHandleClick=()=>{const{sheetTransition:t,handleBehavior:i}=this;"cycle"===i&&void 0===t&&this.moveToNextBreakpoint()},this.onBackdropTap=()=>{const{sheetTransition:t}=this;void 0===t&&this.dismiss(void 0,B)},this.onLifecycle=t=>{const i=this.usersElement,o=J[t.type];if(i&&o){const a=new CustomEvent(o,{bubbles:!1,cancelable:!1,detail:t.detail});i.dispatchEvent(a)}}}onIsOpenChange(t,i){!0===t&&!1===i?this.present():!1===t&&!0===i&&this.dismiss()}onTriggerChange(){this.configureTriggerInteraction()}async swipeToCloseChanged(t){this.gesture?this.gesture.enable(t):t&&await this.initSwipeToClose()}breakpointsChanged(t){void 0!==t&&(this.sortedBreakpoints=t.sort(((t,i)=>t-i)))}connectedCallback(){const{configureTriggerInteraction:t,el:i}=this;Y(i),t()}disconnectedCallback(){const{destroyTriggerInteraction:t}=this;t&&t()}componentWillLoad(){const{breakpoints:t,initialBreakpoint:i,swipeToClose:o,el:a}=this;this.inheritedAttributes=x(a,["aria-label","role"]),this.modalId=this.el.hasAttribute("id")?this.el.getAttribute("id"):`ion-modal-${this.modalIndex}`,(this.isSheetModal=void 0!==t&&void 0!==i)&&(this.currentBreakpoint=this.initialBreakpoint),void 0===t||void 0===i||t.includes(i)||y("Your breakpoints array must include the initialBreakpoint value."),o&&y("swipeToClose has been deprecated in favor of canDismiss.\n\nIf you want a card modal to be swipeable, set canDismiss to `true`. In the next major release of Ionic, swipeToClose will be removed, and all card modals will be swipeable by default.")}componentDidLoad(){!0===this.isOpen&&v((()=>this.present())),this.breakpointsChanged(this.breakpoints)}getDelegate(t=!1){if(this.workingDelegate&&!t)return{delegate:this.workingDelegate,inline:this.inline};const i=this.inline=null!==this.el.parentNode&&!this.hasController;return{inline:i,delegate:this.workingDelegate=i?this.delegate||this.coreDelegate:this.delegate}}async checkCanDismiss(t,i){const{canDismiss:o}=this;return void 0===o||("function"==typeof o?o(t,i):o)}async present(){if(this.presented)return;void 0!==this.currentTransition&&await this.currentTransition,this.currentBreakpoint=this.initialBreakpoint;const{inline:t,delegate:i}=this.getDelegate(!0);this.usersElement=await b(i,this.el,this.component,["ion-page"],this.componentProps,t),await E(this.usersElement),o((()=>this.el.classList.add("show-modal"))),this.currentTransition=C(this,"modalEnter",_,Z,{presentingEl:this.presentingElement,currentBreakpoint:this.initialBreakpoint,backdropBreakpoint:this.backdropBreakpoint});const a=void 0!==this.presentingElement&&(this.swipeToClose||void 0!==this.canDismiss);a&&"ios"===s(this)&&(this.statusBarStyle=await z.getStyle(),L()),await this.currentTransition,this.isSheetModal?this.initSheetGesture():a&&await this.initSwipeToClose(),"undefined"!=typeof window&&(this.keyboardOpenCallback=()=>{this.gesture&&(this.gesture.enable(!1),v((()=>{this.gesture&&this.gesture.enable(!0)})))},window.addEventListener(k,this.keyboardOpenCallback)),this.currentTransition=void 0}initSwipeToClose(){var t;if("ios"!==s(this))return;const{el:i}=this,o=this.leaveAnimation||n.get("modalLeave",H),a=this.animation=o(i,{presentingEl:this.presentingElement});if(!c(i))return void m(i);const e=null!==(t=this.statusBarStyle)&&void 0!==t?t:P.Default;this.gesture=((t,i,o,a)=>{const e=.5,r=t.offsetHeight;let s=!1,n=!1,c=null,m=null,f=!0,b=0;const u=$({el:t,gestureName:"modalSwipeToClose",gesturePriority:39,direction:"y",threshold:10,canStart:t=>{const i=t.event.target;if(null===i||!i.closest)return!0;if(c=d(i),c){if(h(c)){const t=g(c);m=t.querySelector(".inner-scroll")}else m=c;return!c.querySelector("ion-refresher")&&0===m.scrollTop}return null===i.closest("ion-footer")},onStart:o=>{const{deltaY:a}=o;f=!c||!h(c)||c.scrollY,n=void 0!==t.canDismiss&&!0!==t.canDismiss,a>0&&c&&p(c),i.progressStart(!0,s?1:0)},onMove:t=>{const{deltaY:a}=t;a>0&&c&&p(c);const s=t.deltaY/r,d=s>=0&&n,h=d?.2:.9999,l=d?K(s/h):s,m=w(1e-4,l,h);i.progressStep(m),m>=e&&b<e?R(o):m<e&&b>=e&&L(),b=m},onEnd:o=>{const d=o.velocityY,h=o.deltaY/r,p=h>=0&&n,m=p?.2:.9999,b=p?K(h/m):h,g=w(1e-4,b,m),v=!p&&(o.deltaY+1e3*d)/r>=e;let x=v?-.001:.001;v?(i.easing("cubic-bezier(0.32, 0.72, 0, 1)"),x+=O([0,0],[.32,.72],[0,1],[1,1],g)[0]):(i.easing("cubic-bezier(1, 0, 0.68, 0.28)"),x+=O([0,0],[1,0],[.68,.28],[1,1],g)[0]);const k=V(v?h*r:(1-g)*r,d);s=v,u.enable(!1),c&&l(c,f),i.onFinish((()=>{v||u.enable(!0)})).progressEnd(v?1:0,x,k),p&&g>m/4?N(t,i):v&&a()}});return u})(i,a,e,(()=>{this.gestureAnimationDismissing=!0,this.animation.onFinish((async()=>{await this.dismiss(void 0,A),this.gestureAnimationDismissing=!1}))})),this.gesture.enable(!0)}initSheetGesture(){const{wrapperEl:t,initialBreakpoint:i,backdropBreakpoint:o}=this;if(!t||void 0===i)return;const a=this.enterAnimation||n.get("modalEnter",_),e=this.animation=a(this.el,{presentingEl:this.presentingElement,currentBreakpoint:i,backdropBreakpoint:o});e.progressStart(!0,1);const{gesture:r,moveSheetToBreakpoint:s}=((t,i,o,a,e,r,s=[],n,d,h)=>{const p={WRAPPER_KEYFRAMES:[{offset:0,transform:"translateY(0%)"},{offset:1,transform:"translateY(100%)"}],BACKDROP_KEYFRAMES:0!==e?[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1-e,opacity:0},{offset:1,opacity:0}]:[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1,opacity:.01}]},l=t.querySelector("ion-content"),c=o.clientHeight;let m=a,f=0,b=!1;const u=r.childAnimations.find((t=>"wrapperAnimation"===t.id)),g=r.childAnimations.find((t=>"backdropAnimation"===t.id)),x=s[s.length-1],k=s[0],y=()=>{t.style.setProperty("pointer-events","auto"),i.style.setProperty("pointer-events","auto"),t.classList.remove("ion-disable-focus-trap")},D=()=>{t.style.setProperty("pointer-events","none"),i.style.setProperty("pointer-events","none"),t.classList.add("ion-disable-focus-trap")};u&&g&&(u.keyframes([...p.WRAPPER_KEYFRAMES]),g.keyframes([...p.BACKDROP_KEYFRAMES]),r.progressStart(!0,1-m),m>e?y():D()),l&&m!==x&&(l.scrollY=!1);const A=i=>{const{breakpoint:o,canDismiss:a,breakpointOffset:n}=i,c=a&&0===o,f=c?m:o,b=0!==f;return m=0,u&&g&&(u.keyframes([{offset:0,transform:`translateY(${100*n}%)`},{offset:1,transform:`translateY(${100*(1-f)}%)`}]),g.keyframes([{offset:0,opacity:`calc(var(--backdrop-opacity) * ${W(1-n,e)})`},{offset:1,opacity:`calc(var(--backdrop-opacity) * ${W(f,e)})`}]),r.progressStep(0)),B.enable(!1),c?N(t,r):b||d(),new Promise((t=>{r.onFinish((()=>{b?u&&g?v((()=>{u.keyframes([...p.WRAPPER_KEYFRAMES]),g.keyframes([...p.BACKDROP_KEYFRAMES]),r.progressStart(!0,1-f),m=f,h(m),l&&m===s[s.length-1]&&(l.scrollY=!0),m>e?y():D(),B.enable(!0),t()})):(B.enable(!0),t()):t()}),{oneTimeCallback:!0}).progressEnd(1,0,500)}))},B=$({el:o,gestureName:"modalSheet",gesturePriority:40,direction:"y",threshold:10,canStart:t=>{const i=t.event.target.closest("ion-content");return m=n(),1!==m||!i},onStart:()=>{b=void 0!==t.canDismiss&&!0!==t.canDismiss&&0===k,l&&(l.scrollY=!1),v((()=>{t.focus()})),r.progressStart(!0,1-m)},onMove:t=>{const i=s.length>1?1-s[1]:void 0,o=1-m+t.deltaY/c,a=void 0!==i&&o>=i&&b,e=a?.95:.9999,n=a&&void 0!==i?i+K((o-i)/(e-i)):o;f=w(1e-4,n,e),r.progressStep(f)},onEnd:t=>{const i=m-(t.deltaY+350*t.velocityY)/c,o=s.reduce(((t,o)=>Math.abs(o-i)<Math.abs(t-i)?o:t));A({breakpoint:o,breakpointOffset:f,canDismiss:b})}});return{gesture:B,moveSheetToBreakpoint:A}})(this.el,this.backdropEl,t,i,o,e,this.sortedBreakpoints,(()=>{var t;return null!==(t=this.currentBreakpoint)&&void 0!==t?t:0}),(()=>this.sheetOnDismiss()),(t=>{this.currentBreakpoint!==t&&(this.currentBreakpoint=t,this.ionBreakpointDidChange.emit({breakpoint:t}))}));this.gesture=r,this.moveSheetToBreakpoint=s,this.gesture.enable(!0)}sheetOnDismiss(){this.gestureAnimationDismissing=!0,this.animation.onFinish((async()=>{this.currentBreakpoint=0,this.ionBreakpointDidChange.emit({breakpoint:this.currentBreakpoint}),await this.dismiss(void 0,A),this.gestureAnimationDismissing=!1}))}async dismiss(t,i){var a;if(this.gestureAnimationDismissing&&i!==A)return!1;if("handler"!==i&&!await this.checkCanDismiss(t,i))return!1;void 0!==this.presentingElement&&(this.swipeToClose||void 0!==this.canDismiss)&&"ios"===s(this)&&R(this.statusBarStyle),"undefined"!=typeof window&&this.keyboardOpenCallback&&window.removeEventListener(k,this.keyboardOpenCallback),void 0!==this.currentTransition&&await this.currentTransition;const e=M.get(this)||[];this.currentTransition=T(this,t,i,"modalLeave",H,U,{presentingEl:this.presentingElement,currentBreakpoint:null!==(a=this.currentBreakpoint)&&void 0!==a?a:this.initialBreakpoint,backdropBreakpoint:this.backdropBreakpoint});const r=await this.currentTransition;if(r){const{delegate:t}=this.getDelegate();await u(t,this.usersElement),o((()=>this.el.classList.remove("show-modal"))),this.animation&&this.animation.destroy(),this.gesture&&this.gesture.destroy(),e.forEach((t=>t.destroy()))}return this.currentBreakpoint=void 0,this.currentTransition=void 0,this.animation=void 0,r}onDidDismiss(){return j(this.el,"ionModalDidDismiss")}onWillDismiss(){return j(this.el,"ionModalWillDismiss")}async setCurrentBreakpoint(t){if(!this.isSheetModal)return void y("setCurrentBreakpoint is only supported on sheet modals.");if(!this.breakpoints.includes(t))return void y(`Attempted to set invalid breakpoint value ${t}. Please double check that the breakpoint value is part of your defined breakpoints.`);const{currentBreakpoint:i,moveSheetToBreakpoint:o,canDismiss:a,breakpoints:e}=this;i!==t&&o&&(this.sheetTransition=o({breakpoint:t,breakpointOffset:1-i,canDismiss:void 0!==a&&!0!==a&&0===e[0]}),await this.sheetTransition,this.sheetTransition=void 0)}async getCurrentBreakpoint(){return this.currentBreakpoint}async moveToNextBreakpoint(){const{breakpoints:t,currentBreakpoint:i}=this;if(!t||null==i)return!1;const o=t.filter((t=>0!==t)),a=o.indexOf(i),e=o[(a+1)%o.length];return await this.setCurrentBreakpoint(e),!0}render(){const{handle:t,isSheetModal:i,presentingElement:o,htmlAttributes:r,handleBehavior:n,inheritedAttributes:d}=this,h=!1!==t&&i,p=s(this),{modalId:l}=this,c=void 0!==o&&"ios"===p,m="cycle"===n;return a(e,Object.assign({"no-router":!0,tabindex:"-1"},r,{style:{zIndex:`${2e4+this.overlayIndex}`},class:Object.assign({[p]:!0,"modal-default":!c&&!i,"modal-card":c,"modal-sheet":i,"overlay-hidden":!0},S(this.cssClass)),id:l,onIonBackdropTap:this.onBackdropTap,onIonModalDidPresent:this.onLifecycle,onIonModalWillPresent:this.onLifecycle,onIonModalWillDismiss:this.onLifecycle,onIonModalDidDismiss:this.onLifecycle}),a("ion-backdrop",{ref:t=>this.backdropEl=t,visible:this.showBackdrop,tappable:this.backdropDismiss,part:"backdrop"}),"ios"===p&&a("div",{class:"modal-shadow"}),a("div",Object.assign({role:"dialog"},d,{"aria-modal":"true",class:"modal-wrapper ion-overlay-wrapper",part:"content",ref:t=>this.wrapperEl=t}),h&&a("button",{class:"modal-handle",tabIndex:m?0:-1,"aria-label":"Activate to adjust the size of the dialog overlaying the screen",onClick:m?this.onHandleClick:void 0,part:"handle"}),a("slot",null)))}get el(){return r(this)}static get watchers(){return{isOpen:["onIsOpenChange"],trigger:["onTriggerChange"],swipeToClose:["swipeToCloseChanged"]}}};const J={ionModalDidPresent:"ionViewDidEnter",ionModalWillPresent:"ionViewWillEnter",ionModalWillDismiss:"ionViewWillLeave",ionModalDidDismiss:"ionViewDidLeave"};let Q=0;q.style={ios:':host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:flex;position:absolute;align-items:center;justify-content:center;outline:none;contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;margin-left:auto;margin-right:auto;position:absolute;width:36px;height:5px;transform:translateZ(0);border:0;background:var(--ion-color-step-350, #c0c0be);cursor:pointer;z-index:11}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){.modal-handle{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.modal-handle::before{padding-left:4px;padding-right:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:36px;height:5px;transform:translate(-50%, -50%);content:""}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){.modal-handle::before{padding-left:unset;padding-right:unset;-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px}}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.4)}:host(.modal-card),:host(.modal-sheet){--border-radius:10px}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:10px}}.modal-wrapper{transform:translate3d(0,  100%,  0)}@media screen and (max-width: 767px){@supports (width: 1px){:host(.modal-card){--height:calc(100% - max(30px, var(--ion-safe-area-top)) - 10px)}}@supports not (width: 1px){:host(.modal-card){--height:calc(100% - 40px)}}:host(.modal-card) .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl]):host(.modal-card) .modal-wrapper,:host-context([dir=rtl]).modal-card .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}:host(.modal-card){--backdrop-opacity:0;--width:100%;align-items:flex-end}:host(.modal-card) .modal-shadow{display:none}:host(.modal-card) ion-backdrop{pointer-events:none}}@media screen and (min-width: 768px){:host(.modal-card){--width:calc(100% - 120px);--height:calc(100% - (120px + var(--ion-safe-area-top) + var(--ion-safe-area-bottom)));--max-width:720px;--max-height:1000px;--backdrop-opacity:0;--box-shadow:0px 0px 30px 10px rgba(0, 0, 0, 0.1);transition:all 0.5s ease-in-out}:host(.modal-card) .modal-wrapper{box-shadow:none}:host(.modal-card) .modal-shadow{box-shadow:var(--box-shadow)}}:host(.modal-sheet) .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl]):host(.modal-sheet) .modal-wrapper,:host-context([dir=rtl]).modal-sheet .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}',md:':host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:flex;position:absolute;align-items:center;justify-content:center;outline:none;contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;margin-left:auto;margin-right:auto;position:absolute;width:36px;height:5px;transform:translateZ(0);border:0;background:var(--ion-color-step-350, #c0c0be);cursor:pointer;z-index:11}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){.modal-handle{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.modal-handle::before{padding-left:4px;padding-right:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:36px;height:5px;transform:translate(-50%, -50%);content:""}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){.modal-handle::before{padding-left:unset;padding-right:unset;-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px}}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:2px;--box-shadow:0 28px 48px rgba(0, 0, 0, 0.4)}}.modal-wrapper{transform:translate3d(0,  40px,  0);opacity:0.01}'};export{q as ion_modal}