import{u as t,q as e}from"./p-cb8464c3.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const o=o=>{let f,l,d,p=10*-u,m=0;const v=o.getBoolean("animated",!0)&&o.getBoolean("rippleEffect",!0),h=new WeakMap,w=e=>{p=t(e),x(e)},T=()=>{clearTimeout(d),d=void 0,f&&(k(!1),f=void 0)},b=t=>{f||D(n(t),t)},x=t=>{D(void 0,t)},D=(t,o)=>{if(t&&t===f)return;clearTimeout(d),d=void 0;const{x:n,y:c}=e(o);if(f){if(h.has(f))throw new Error("internal error");f.classList.contains(r)||E(f,n,c),k(!0)}if(t){const e=h.get(t);e&&(clearTimeout(e),h.delete(t));const o=i(t)?0:a;t.classList.remove(r),d=setTimeout((()=>{E(t,n,c),d=void 0}),o)}f=t},E=(t,e,o)=>{m=Date.now(),t.classList.add(r);const n=v&&c(t);n&&n.addRipple&&(j(),l=n.addRipple(e,o))},j=()=>{void 0!==l&&(l.then((t=>t())),l=void 0)},k=t=>{j();const e=f;if(!e)return;const o=s-Date.now()+m;if(t&&o>0&&!i(e)){const t=setTimeout((()=>{e.classList.remove(r),h.delete(e)}),s);h.set(e,t)}else e.classList.remove(r)},q=document;q.addEventListener("ionGestureCaptured",T),q.addEventListener("touchstart",(e=>{p=t(e),b(e)}),!0),q.addEventListener("touchcancel",w,!0),q.addEventListener("touchend",w,!0),q.addEventListener("pointercancel",T,!0),q.addEventListener("mousedown",(e=>{const o=t(e)-u;p<o&&b(e)}),!0),q.addEventListener("mouseup",(e=>{const o=t(e)-u;p<o&&x(e)}),!0),q.addEventListener("contextmenu",(t=>{x(t)}),!0)},n=t=>{if(!t.composedPath)return t.target.closest(".ion-activatable");{const e=t.composedPath();for(let t=0;t<e.length-2;t++){const o=e[t];if(!(o instanceof ShadowRoot)&&o.classList.contains("ion-activatable"))return o}}},i=t=>t.classList.contains("ion-activatable-instant"),c=t=>{if(t.shadowRoot){const e=t.shadowRoot.querySelector("ion-ripple-effect");if(e)return e}return t.querySelector("ion-ripple-effect")},r="ion-activated",a=200,s=200,u=2500;export{o as startTapClick}