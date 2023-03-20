import{w as e,r,e as i,f as s,h as t,d as n,H as o}from"./p-a9088fe3.js";import{a as h,g as f}from"./p-2f6e21fc.js";import{g as a}from"./p-2f802871.js";import{I as l,p as c,b as p,g}from"./p-4b2d31e5.js";import{t as d,c as m,a as u,g as v,r as x}from"./p-cf7b12f5.js";import{h as y}from"./p-b29e1ab6.js";import{c as b}from"./p-909924eb.js";import"./p-ebeb7ac8.js";import"./p-924f3f49.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const w=e=>{const r=e.querySelector("ion-spinner"),i=r.shadowRoot.querySelector("circle"),s=e.querySelector(".spinner-arrow-container"),t=e.querySelector(".arrow-container"),n=t?t.querySelector("ion-icon"):null,o=b().duration(1e3).easing("ease-out"),h=b().addElement(s).keyframes([{offset:0,opacity:"0.3"},{offset:.45,opacity:"0.3"},{offset:.55,opacity:"1"},{offset:1,opacity:"1"}]),f=b().addElement(i).keyframes([{offset:0,strokeDasharray:"1px, 200px"},{offset:.2,strokeDasharray:"1px, 200px"},{offset:.55,strokeDasharray:"100px, 200px"},{offset:1,strokeDasharray:"100px, 200px"}]),a=b().addElement(r).keyframes([{offset:0,transform:"rotate(-90deg)"},{offset:1,transform:"rotate(210deg)"}]);if(t&&n){const e=b().addElement(t).keyframes([{offset:0,transform:"rotate(0deg)"},{offset:.3,transform:"rotate(0deg)"},{offset:.55,transform:"rotate(280deg)"},{offset:1,transform:"rotate(400deg)"}]),r=b().addElement(n).keyframes([{offset:0,transform:"translateX(2px) scale(0)"},{offset:.3,transform:"translateX(2px) scale(0)"},{offset:.55,transform:"translateX(-1.5px) scale(1)"},{offset:1,transform:"translateX(-1.5px) scale(1)"}]);o.addAnimation([e,r])}return o.addAnimation([h,f,a])},k=(r,i,s=200)=>{if(!r)return Promise.resolve();const t=d(r,s);return e((()=>{r.style.setProperty("transition",`${s}ms all ease-out`),void 0===i?r.style.removeProperty("transform"):r.style.setProperty("transform",`translate3d(0px, ${i}, 0px)`)})),t},j=async(e,r)=>{const i=e.querySelector("ion-refresher-content");if(!i)return Promise.resolve(!1);await new Promise((e=>m(i,e)));const s=e.querySelector("ion-refresher-content .refresher-pulling ion-spinner"),t=e.querySelector("ion-refresher-content .refresher-refreshing ion-spinner");return null!==s&&null!==t&&("ios"===r&&h("mobile")&&void 0!==e.style.webkitOverflowScrolling||"md"===r)};let S=class{constructor(e){r(this,e),this.ionRefresh=i(this,"ionRefresh",7),this.ionPull=i(this,"ionPull",7),this.ionStart=i(this,"ionStart",7),this.appliedStyles=!1,this.didStart=!1,this.progress=0,this.pointerDown=!1,this.needsCompletion=!1,this.didRefresh=!1,this.lastVelocityY=0,this.animations=[],this.nativeRefresher=!1,this.state=1,this.pullMin=60,this.pullMax=this.pullMin+60,this.closeDuration="280ms",this.snapbackDuration="280ms",this.pullFactor=1,this.disabled=!1}disabledChanged(){this.gesture&&this.gesture.enable(!this.disabled)}async checkNativeRefresher(){const e=await j(this.el,f(this));if(e&&!this.nativeRefresher){const e=this.el.closest("ion-content");this.setupNativeRefresher(e)}else e||this.destroyNativeRefresher()}destroyNativeRefresher(){this.scrollEl&&this.scrollListenerCallback&&(this.scrollEl.removeEventListener("scroll",this.scrollListenerCallback),this.scrollListenerCallback=void 0),this.nativeRefresher=!1}async resetNativeRefresher(e,r){this.state=r,"ios"===f(this)?await k(e,void 0,300):await d(this.el.querySelector(".refresher-refreshing-icon"),200),this.didRefresh=!1,this.needsCompletion=!1,this.pointerDown=!1,this.animations.forEach((e=>e.destroy())),this.animations=[],this.progress=0,this.state=1}async setupiOSNativeRefresher(r,i){this.elementToTransform=this.scrollEl;const t=r.shadowRoot.querySelectorAll("svg");let n=.16*this.scrollEl.clientHeight;const o=t.length;e((()=>t.forEach((e=>e.style.setProperty("animation","none"))))),this.scrollListenerCallback=()=>{(this.pointerDown||1!==this.state)&&s((()=>{const r=this.scrollEl.scrollTop,s=this.el.clientHeight;if(r>0){if(8===this.state){const t=u(0,r/(.5*s),1);return void e((()=>{i.style.setProperty("opacity",(1-t).toString())}))}return}this.pointerDown&&(this.didStart||(this.didStart=!0,this.ionStart.emit()),this.pointerDown&&this.ionPull.emit());const h=this.didStart?30:0,f=this.progress=u(0,(Math.abs(r)-h)/n,1);var a,l;8===this.state||1===f?(this.pointerDown&&(a=i,l=this.lastVelocityY,e((()=>{a.style.setProperty("--refreshing-rotation-duration",l>=1?"0.5s":"2s"),a.style.setProperty("opacity","1")}))),this.didRefresh||(this.beginRefresh(),this.didRefresh=!0,y({style:"light"}),this.pointerDown||k(this.elementToTransform,`${s}px`))):(this.state=2,((r,i,s)=>{e((()=>{r.forEach(((e,r)=>{const t=r*(1/i),n=u(0,(s-t)/(1-t),1);e.style.setProperty("opacity",n.toString())}))}))})(t,o,f))}))},this.scrollEl.addEventListener("scroll",this.scrollListenerCallback),this.gesture=(await import("./p-0b857c77.js")).createGesture({el:this.scrollEl,gestureName:"refresher",gesturePriority:31,direction:"y",threshold:5,onStart:()=>{this.pointerDown=!0,this.didRefresh||k(this.elementToTransform,"0px"),0===n&&(n=.16*this.scrollEl.clientHeight)},onMove:e=>{this.lastVelocityY=e.velocityY},onEnd:()=>{this.pointerDown=!1,this.didStart=!1,this.needsCompletion?(this.resetNativeRefresher(this.elementToTransform,32),this.needsCompletion=!1):this.didRefresh&&s((()=>k(this.elementToTransform,`${this.el.clientHeight}px`)))}}),this.disabledChanged()}async setupMDNativeRefresher(r,i,s){const t=v(i).querySelector("circle"),n=this.el.querySelector("ion-refresher-content .refresher-pulling-icon"),o=v(s).querySelector("circle");null!==t&&null!==o&&e((()=>{t.style.setProperty("animation","none"),s.style.setProperty("animation-delay","-655ms"),o.style.setProperty("animation-delay","-655ms")})),this.gesture=(await import("./p-0b857c77.js")).createGesture({el:this.scrollEl,gestureName:"refresher",gesturePriority:31,direction:"y",threshold:5,canStart:()=>8!==this.state&&32!==this.state&&0===this.scrollEl.scrollTop,onStart:e=>{this.progress=0,e.data={animation:void 0,didStart:!1,cancelled:!1}},onMove:i=>{if(i.velocityY<0&&0===this.progress&&!i.data.didStart||i.data.cancelled)i.data.cancelled=!0;else{if(!i.data.didStart){i.data.didStart=!0,this.state=2,e((()=>this.scrollEl.style.setProperty("--overflow","hidden")));const s=((e,r,i)=>"scale"===e?((e,r)=>{const i=r.clientHeight,s=b().addElement(e).keyframes([{offset:0,transform:`scale(0) translateY(-${i}px)`},{offset:1,transform:"scale(1) translateY(100px)"}]);return w(e).addAnimation([s])})(r,i):((e,r)=>{const i=r.clientHeight,s=b().addElement(e).keyframes([{offset:0,transform:`translateY(-${i}px)`},{offset:1,transform:"translateY(100px)"}]);return w(e).addAnimation([s])})(r,i))((e=>{const r=e.previousElementSibling;return null!==r&&"ION-HEADER"===r.tagName?"translate":"scale"})(r),n,this.el);return i.data.animation=s,s.progressStart(!1,0),this.ionStart.emit(),void this.animations.push(s)}this.progress=u(0,i.deltaY/180*.5,1),i.data.animation.progressStep(this.progress),this.ionPull.emit()}},onEnd:r=>{if(!r.data.didStart)return;if(this.gesture.enable(!1),e((()=>this.scrollEl.style.removeProperty("--overflow"))),this.progress<=.4)return void r.data.animation.progressEnd(0,this.progress,500).onFinish((()=>{this.animations.forEach((e=>e.destroy())),this.animations=[],this.gesture.enable(!0),this.state=1}));const i=a([0,0],[0,0],[1,1],[1,1],this.progress)[0],s=(e=>b().duration(125).addElement(e).fromTo("transform","translateY(var(--ion-pulling-refresher-translate, 100px))","translateY(0px)"))(n);this.animations.push(s),e((async()=>{n.style.setProperty("--ion-pulling-refresher-translate",100*i+"px"),r.data.animation.progressEnd(),await s.play(),this.beginRefresh(),r.data.animation.destroy(),this.gesture.enable(!0)}))}}),this.disabledChanged()}async setupNativeRefresher(e){if(this.scrollListenerCallback||!e||this.nativeRefresher||!this.scrollEl)return;this.setCss(0,"",!1,""),this.nativeRefresher=!0;const r=this.el.querySelector("ion-refresher-content .refresher-pulling ion-spinner"),i=this.el.querySelector("ion-refresher-content .refresher-refreshing ion-spinner");"ios"===f(this)?this.setupiOSNativeRefresher(r,i):this.setupMDNativeRefresher(e,r,i)}componentDidUpdate(){this.checkNativeRefresher()}async connectedCallback(){if("fixed"!==this.el.getAttribute("slot"))return void console.error('Make sure you use: <ion-refresher slot="fixed">');const e=this.el.closest(l);e?m(e,(async()=>{const r=e.querySelector(p);this.scrollEl=await g(null!=r?r:e),this.backgroundContentEl=await e.getBackgroundElement(),await j(this.el,f(this))?this.setupNativeRefresher(e):(this.gesture=(await import("./p-0b857c77.js")).createGesture({el:e,gestureName:"refresher",gesturePriority:31,direction:"y",threshold:20,passive:!1,canStart:()=>this.canStart(),onStart:()=>this.onStart(),onMove:e=>this.onMove(e),onEnd:()=>this.onEnd()}),this.disabledChanged())})):c(this.el)}disconnectedCallback(){this.destroyNativeRefresher(),this.scrollEl=void 0,this.gesture&&(this.gesture.destroy(),this.gesture=void 0)}async complete(){this.nativeRefresher?(this.needsCompletion=!0,this.pointerDown||x((()=>x((()=>this.resetNativeRefresher(this.elementToTransform,32)))))):this.close(32,"120ms")}async cancel(){this.nativeRefresher?this.pointerDown||x((()=>x((()=>this.resetNativeRefresher(this.elementToTransform,16))))):this.close(16,"")}getProgress(){return Promise.resolve(this.progress)}canStart(){return!(!this.scrollEl||1!==this.state||this.scrollEl.scrollTop>0)}onStart(){this.progress=0,this.state=1,this.memoizeOverflowStyle()}onMove(e){if(!this.scrollEl)return;const r=e.event;if(void 0!==r.touches&&r.touches.length>1)return;if(0!=(56&this.state))return;const i=Number.isNaN(this.pullFactor)||this.pullFactor<0?1:this.pullFactor,s=e.deltaY*i;if(s<=0)return this.progress=0,this.state=1,this.appliedStyles?void this.setCss(0,"",!1,""):void 0;if(1===this.state){if(this.scrollEl.scrollTop>0)return void(this.progress=0);this.state=2}if(r.cancelable&&r.preventDefault(),this.setCss(s,"0ms",!0,""),0===s)return void(this.progress=0);const t=this.pullMin;this.progress=s/t,this.didStart||(this.didStart=!0,this.ionStart.emit()),this.ionPull.emit(),s<t?this.state=2:s>this.pullMax?this.beginRefresh():this.state=4}onEnd(){4===this.state?this.beginRefresh():2===this.state&&this.cancel()}beginRefresh(){this.state=8,this.setCss(this.pullMin,this.snapbackDuration,!0,""),this.ionRefresh.emit({complete:this.complete.bind(this)})}close(e,r){setTimeout((()=>{this.state=1,this.progress=0,this.didStart=!1,this.setCss(0,"0ms",!1,"")}),600),this.state=e,this.setCss(0,this.closeDuration,!0,r)}setCss(r,i,s,t){this.nativeRefresher||(this.appliedStyles=r>0,e((()=>{if(this.scrollEl&&this.backgroundContentEl){const e=this.scrollEl.style,n=this.backgroundContentEl.style;e.transform=n.transform=r>0?`translateY(${r}px) translateZ(0px)`:"",e.transitionDuration=n.transitionDuration=i,e.transitionDelay=n.transitionDelay=t,s?e.overflow="hidden":this.restoreOverflowStyle()}})))}memoizeOverflowStyle(){if(this.scrollEl){const{overflow:e,overflowX:r,overflowY:i}=this.scrollEl.style;this.overflowStyles={overflow:null!=e?e:"",overflowX:null!=r?r:"",overflowY:null!=i?i:""}}}restoreOverflowStyle(){if(void 0!==this.overflowStyles&&void 0!==this.scrollEl){const{overflow:e,overflowX:r,overflowY:i}=this.overflowStyles;this.scrollEl.style.overflow=e,this.scrollEl.style.overflowX=r,this.scrollEl.style.overflowY=i,this.overflowStyles=void 0}}render(){const e=f(this);return t(o,{slot:"fixed",class:{[e]:!0,[`refresher-${e}`]:!0,"refresher-native":this.nativeRefresher,"refresher-active":1!==this.state,"refresher-pulling":2===this.state,"refresher-ready":4===this.state,"refresher-refreshing":8===this.state,"refresher-cancelling":16===this.state,"refresher-completing":32===this.state}})}get el(){return n(this)}static get watchers(){return{disabled:["disabledChanged"]}}};S.style={ios:"ion-refresher{left:0;top:0;display:none;position:absolute;width:100%;height:60px;pointer-events:none;z-index:-1}[dir=rtl] ion-refresher,:host-context([dir=rtl]) ion-refresher{left:unset;right:unset;right:0}ion-refresher.refresher-active{display:block}ion-refresher-content{display:flex;flex-direction:column;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{transform-origin:center;transition:200ms;font-size:30px;text-align:center}[dir=rtl] .refresher-pulling-icon,:host-context([dir=rtl]) .refresher-pulling-icon,[dir=rtl] .refresher-refreshing-icon,:host-context([dir=rtl]) .refresher-refreshing-icon{transform-origin:calc(100% - center)}.refresher-pulling-text,.refresher-refreshing-text{font-size:16px;text-align:center}ion-refresher-content .arrow-container{display:none}.refresher-pulling ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{transform:rotate(180deg)}.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{transform:scale(0)}.refresher-native .refresher-pulling-text,.refresher-native .refresher-refreshing-text{display:none}.refresher-ios .refresher-pulling-icon,.refresher-ios .refresher-refreshing-icon{color:var(--ion-text-color, #000)}.refresher-ios .refresher-pulling-text,.refresher-ios .refresher-refreshing-text{color:var(--ion-text-color, #000)}.refresher-ios .refresher-refreshing .spinner-lines-ios line,.refresher-ios .refresher-refreshing .spinner-lines-small-ios line,.refresher-ios .refresher-refreshing .spinner-crescent circle{stroke:var(--ion-text-color, #000)}.refresher-ios .refresher-refreshing .spinner-bubbles circle,.refresher-ios .refresher-refreshing .spinner-circles circle,.refresher-ios .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-color, #000)}ion-refresher.refresher-native{display:block;z-index:1}ion-refresher.refresher-native ion-spinner{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){ion-refresher.refresher-native ion-spinner{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.refresher-native .refresher-refreshing ion-spinner{--refreshing-rotation-duration:2s;display:none;animation:var(--refreshing-rotation-duration) ease-out refresher-rotate forwards}.refresher-native .refresher-refreshing{display:none;animation:250ms linear refresher-pop forwards}.refresher-native ion-spinner{width:32px;height:32px;color:var(--ion-color-step-450, #747577)}.refresher-native.refresher-refreshing .refresher-pulling ion-spinner,.refresher-native.refresher-completing .refresher-pulling ion-spinner{display:none}.refresher-native.refresher-refreshing .refresher-refreshing ion-spinner,.refresher-native.refresher-completing .refresher-refreshing ion-spinner{display:block}.refresher-native.refresher-pulling .refresher-pulling ion-spinner{display:block}.refresher-native.refresher-pulling .refresher-refreshing ion-spinner{display:none}.refresher-native.refresher-completing ion-refresher-content .refresher-refreshing-icon{transform:scale(0) rotate(180deg);transition:300ms}@keyframes refresher-pop{0%{transform:scale(1);animation-timing-function:ease-in}50%{transform:scale(1.2);animation-timing-function:ease-out}100%{transform:scale(1)}}@keyframes refresher-rotate{from{transform:rotate(0deg)}to{transform:rotate(180deg)}}",md:"ion-refresher{left:0;top:0;display:none;position:absolute;width:100%;height:60px;pointer-events:none;z-index:-1}[dir=rtl] ion-refresher,:host-context([dir=rtl]) ion-refresher{left:unset;right:unset;right:0}ion-refresher.refresher-active{display:block}ion-refresher-content{display:flex;flex-direction:column;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{transform-origin:center;transition:200ms;font-size:30px;text-align:center}[dir=rtl] .refresher-pulling-icon,:host-context([dir=rtl]) .refresher-pulling-icon,[dir=rtl] .refresher-refreshing-icon,:host-context([dir=rtl]) .refresher-refreshing-icon{transform-origin:calc(100% - center)}.refresher-pulling-text,.refresher-refreshing-text{font-size:16px;text-align:center}ion-refresher-content .arrow-container{display:none}.refresher-pulling ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{transform:rotate(180deg)}.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{transform:scale(0)}.refresher-native .refresher-pulling-text,.refresher-native .refresher-refreshing-text{display:none}.refresher-md .refresher-pulling-icon,.refresher-md .refresher-refreshing-icon{color:var(--ion-text-color, #000)}.refresher-md .refresher-pulling-text,.refresher-md .refresher-refreshing-text{color:var(--ion-text-color, #000)}.refresher-md .refresher-refreshing .spinner-lines-md line,.refresher-md .refresher-refreshing .spinner-lines-small-md line,.refresher-md .refresher-refreshing .spinner-crescent circle{stroke:var(--ion-text-color, #000)}.refresher-md .refresher-refreshing .spinner-bubbles circle,.refresher-md .refresher-refreshing .spinner-circles circle,.refresher-md .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-color, #000)}ion-refresher.refresher-native{display:block;z-index:1}ion-refresher.refresher-native ion-spinner{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;width:24px;height:24px;color:var(--ion-color-primary, #3880ff)}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){ion-refresher.refresher-native ion-spinner{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}ion-refresher.refresher-native .spinner-arrow-container{display:inherit}ion-refresher.refresher-native .arrow-container{display:block;position:absolute;width:24px;height:24px}ion-refresher.refresher-native .arrow-container ion-icon{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;left:0;right:0;bottom:-4px;position:absolute;color:var(--ion-color-primary, #3880ff);font-size:12px}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){ion-refresher.refresher-native .arrow-container ion-icon{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}ion-refresher.refresher-native.refresher-pulling ion-refresher-content .refresher-pulling,ion-refresher.refresher-native.refresher-ready ion-refresher-content .refresher-pulling{display:flex}ion-refresher.refresher-native.refresher-refreshing ion-refresher-content .refresher-refreshing,ion-refresher.refresher-native.refresher-completing ion-refresher-content .refresher-refreshing,ion-refresher.refresher-native.refresher-cancelling ion-refresher-content .refresher-refreshing{display:flex}ion-refresher.refresher-native .refresher-pulling-icon{transform:translateY(calc(-100% - 10px))}ion-refresher.refresher-native .refresher-pulling-icon,ion-refresher.refresher-native .refresher-refreshing-icon{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;border-radius:100%;padding-left:8px;padding-right:8px;padding-top:8px;padding-bottom:8px;display:flex;border:1px solid var(--ion-color-step-200, #ececec);background:var(--ion-color-step-250, #ffffff);box-shadow:0px 1px 6px rgba(0, 0, 0, 0.1)}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){ion-refresher.refresher-native .refresher-pulling-icon,ion-refresher.refresher-native .refresher-refreshing-icon{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){ion-refresher.refresher-native .refresher-pulling-icon,ion-refresher.refresher-native .refresher-refreshing-icon{padding-left:unset;padding-right:unset;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px}}"};export{S as ion_refresher}