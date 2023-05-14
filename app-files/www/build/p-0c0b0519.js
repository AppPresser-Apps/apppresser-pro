/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
class t{constructor(t,e,s,i,r){this.id=e,this.name=s,this.disableScroll=r,this.priority=1e6*i+e,this.ctrl=t}canStart(){return!!this.ctrl&&this.ctrl.canStart(this.name)}start(){return!!this.ctrl&&this.ctrl.start(this.name,this.id,this.priority)}capture(){if(!this.ctrl)return!1;const t=this.ctrl.capture(this.name,this.id,this.priority);return t&&this.disableScroll&&this.ctrl.disableScroll(this.id),t}release(){this.ctrl&&(this.ctrl.release(this.id),this.disableScroll&&this.ctrl.enableScroll(this.id))}destroy(){this.release(),this.ctrl=void 0}}class e{constructor(t,e,s,i){this.id=e,this.disable=s,this.disableScroll=i,this.ctrl=t}block(){if(this.ctrl){if(this.disable)for(const t of this.disable)this.ctrl.disableGesture(t,this.id);this.disableScroll&&this.ctrl.disableScroll(this.id)}}unblock(){if(this.ctrl){if(this.disable)for(const t of this.disable)this.ctrl.enableGesture(t,this.id);this.disableScroll&&this.ctrl.enableScroll(this.id)}}destroy(){this.unblock(),this.ctrl=void 0}}const s="backdrop-no-scroll",i=new class{constructor(){this.gestureId=0,this.requestedStart=new Map,this.disabledGestures=new Map,this.disabledScroll=new Set}createGesture(e){var s;return new t(this,this.newID(),e.name,null!==(s=e.priority)&&void 0!==s?s:0,!!e.disableScroll)}createBlocker(t={}){return new e(this,this.newID(),t.disable,!!t.disableScroll)}start(t,e,s){return this.canStart(t)?(this.requestedStart.set(e,s),!0):(this.requestedStart.delete(e),!1)}capture(t,e,s){if(!this.start(t,e,s))return!1;const i=this.requestedStart;let r=-1e4;if(i.forEach((t=>{r=Math.max(r,t)})),r===s){this.capturedId=e,i.clear();const s=new CustomEvent("ionGestureCaptured",{detail:{gestureName:t}});return document.dispatchEvent(s),!0}return i.delete(e),!1}release(t){this.requestedStart.delete(t),this.capturedId===t&&(this.capturedId=void 0)}disableGesture(t,e){let s=this.disabledGestures.get(t);void 0===s&&(s=new Set,this.disabledGestures.set(t,s)),s.add(e)}enableGesture(t,e){const s=this.disabledGestures.get(t);void 0!==s&&s.delete(e)}disableScroll(t){this.disabledScroll.add(t),1===this.disabledScroll.size&&document.body.classList.add(s)}enableScroll(t){this.disabledScroll.delete(t),0===this.disabledScroll.size&&document.body.classList.remove(s)}canStart(t){return void 0===this.capturedId&&!this.isDisabled(t)}isCaptured(){return void 0!==this.capturedId}isScrollDisabled(){return this.disabledScroll.size>0}isDisabled(t){const e=this.disabledGestures.get(t);return!!(e&&e.size>0)}newID(){return this.gestureId++,this.gestureId}},r=(t,e,s,i)=>{const r=n(t)?{capture:!!i.capture,passive:!!i.passive}:!!i.capture;let o,h;return t.__zone_symbol__addEventListener?(o="__zone_symbol__addEventListener",h="__zone_symbol__removeEventListener"):(o="addEventListener",h="removeEventListener"),t[o](e,s,r),()=>{t[h](e,s,r)}},n=t=>{if(void 0===o)try{const e=Object.defineProperty({},"passive",{get:()=>{o=!0}});t.addEventListener("optsTest",(()=>{}),e)}catch(t){o=!1}return!!o};let o;
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const h=t=>t instanceof Document?t:t.ownerDocument,c=t=>{let e=!1,s=!1,n=!0,o=!1;const c=Object.assign({disableScroll:!1,direction:"x",gesturePriority:0,passive:!0,maxAngle:40,threshold:10},t),d=c.canStart,v=c.onWillStart,m=c.onStart,f=c.onEnd,p=c.notCaptured,b=c.onMove,y=c.threshold,w=c.passive,_=c.blurOnStart,S={type:"pan",startX:0,startY:0,startTime:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,currentTime:0,event:void 0,data:void 0},D=((t,e,s)=>{const i=s*(Math.PI/180),r="x"===t,n=Math.cos(i),o=e*e;let h=0,c=0,a=!1,u=0;return{start(t,e){h=t,c=e,u=0,a=!0},detect(t,e){if(!a)return!1;const s=t-h,i=e-c,l=s*s+i*i;if(l<o)return!1;const d=Math.sqrt(l),v=(r?s:i)/d;return u=v>n?1:v<-n?-1:0,a=!1,!0},isGesture:()=>0!==u,getDirection:()=>u}})(c.direction,c.threshold,c.maxAngle),M=i.createGesture({name:t.gestureName,priority:t.gesturePriority,disableScroll:t.disableScroll}),g=()=>{e&&(o=!1,b&&b(S))},E=()=>!!M.capture()&&(e=!0,n=!1,S.startX=S.currentX,S.startY=S.currentY,S.startTime=S.currentTime,v?v(S).then(G):G(),!0),G=()=>{_&&(()=>{if("undefined"!=typeof document){const t=document.activeElement;(null==t?void 0:t.blur)&&t.blur()}})(),m&&m(S),n=!0},k=()=>{e=!1,s=!1,o=!1,n=!0,M.release()},x=t=>{const s=e,i=n;k(),i&&(a(S,t),s?f&&f(S):p&&p(S))},L=((t,e,s,i,n)=>{let o,c,a,u,l,d,v,m=0;const f=i=>{m=Date.now()+2e3,e(i)&&(!c&&s&&(c=r(t,"touchmove",s,n)),a||(a=r(i.target,"touchend",b,n)),u||(u=r(i.target,"touchcancel",b,n)))},p=i=>{m>Date.now()||e(i)&&(!d&&s&&(d=r(h(t),"mousemove",s,n)),v||(v=r(h(t),"mouseup",y,n)))},b=t=>{w(),i&&i(t)},y=t=>{_(),i&&i(t)},w=()=>{c&&c(),a&&a(),u&&u(),c=a=u=void 0},_=()=>{d&&d(),v&&v(),d=v=void 0},S=()=>{w(),_()},D=(e=!0)=>{e?(o||(o=r(t,"touchstart",f,n)),l||(l=r(t,"mousedown",p,n))):(o&&o(),l&&l(),o=l=void 0,S())};return{enable:D,stop:S,destroy:()=>{D(!1),i=s=e=void 0}}})(c.el,(t=>{const e=l(t);return!(s||!n)&&(u(t,S),S.startX=S.currentX,S.startY=S.currentY,S.startTime=S.currentTime=e,S.velocityX=S.velocityY=S.deltaX=S.deltaY=0,S.event=t,(!d||!1!==d(S))&&(M.release(),!!M.start()&&(s=!0,0===y?E():(D.start(S.startX,S.startY),!0))))}),(t=>{e?!o&&n&&(o=!0,a(S,t),requestAnimationFrame(g)):(a(S,t),D.detect(S.currentX,S.currentY)&&(D.isGesture()&&E()||X()))}),x,{capture:!1,passive:w}),X=()=>{k(),L.stop(),p&&p(S)};return{enable(t=!0){t||(e&&x(void 0),k()),L.enable(t)},destroy(){M.destroy(),L.destroy()}}},a=(t,e)=>{if(!e)return;const s=t.currentX,i=t.currentY,r=t.currentTime;u(e,t);const n=t.currentX,o=t.currentY,h=(t.currentTime=l(e))-r;if(h>0&&h<100){const e=(o-i)/h;t.velocityX=(n-s)/h*.7+.3*t.velocityX,t.velocityY=.7*e+.3*t.velocityY}t.deltaX=n-t.startX,t.deltaY=o-t.startY,t.event=e},u=(t,e)=>{let s=0,i=0;if(t){const e=t.changedTouches;if(e&&e.length>0){const t=e[0];s=t.clientX,i=t.clientY}else void 0!==t.pageX&&(s=t.pageX,i=t.pageY)}e.currentX=s,e.currentY=i},l=t=>t.timeStamp||Date.now();export{i as GESTURE_CONTROLLER,c as createGesture}