import{g as t,a as o,c as e}from"./p-7ebfe9a9.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
class n{constructor(){this.m=new Map}reset(t){this.m=new Map(Object.entries(t))}get(t,o){const e=this.m.get(t);return void 0!==e?e:o}getBoolean(t,o=!1){const e=this.m.get(t);return void 0===e?o:"string"==typeof e?"true"===e:!!e}getNumber(t,o){const e=parseFloat(this.m.get(t));return isNaN(e)?void 0!==o?o:NaN:e}set(t,o){this.m.set(t,o)}}const i=new n,r="ionic:",s="ionic-persist-config",a=(t,o)=>{return"string"==typeof t&&(o=t,t=void 0),(e=t,c(e)).includes(o);var e},c=(t=window)=>{if(void 0===t)return[];t.Ionic=t.Ionic||{};let o=t.Ionic.platforms;return null==o&&(o=t.Ionic.platforms=d(t),o.forEach((o=>t.document.documentElement.classList.add(`plt-${o}`)))),o},d=t=>{const o=i.get("platform");return Object.keys(w).filter((e=>{const n=null==o?void 0:o[e];return"function"==typeof n?n(t):w[e](t)}))},u=t=>!!f(t,/iPad/i)||!(!f(t,/Macintosh/i)||!p(t)),l=t=>f(t,/android|sink/i),p=t=>b(t,"(any-pointer:coarse)"),m=t=>v(t)||h(t),v=t=>!!(t.cordova||t.phonegap||t.PhoneGap),h=t=>{const o=t.Capacitor;return!!(null==o?void 0:o.isNative)},f=(t,o)=>o.test(t.navigator.userAgent),b=(t,o)=>{var e;return null===(e=t.matchMedia)||void 0===e?void 0:e.call(t,o).matches},w={ipad:u,iphone:t=>f(t,/iPhone/i),ios:t=>f(t,/iPhone|iPod/i)||u(t),android:l,phablet:t=>{const o=t.innerWidth,e=t.innerHeight,n=Math.min(o,e),i=Math.max(o,e);return n>390&&n<520&&i>620&&i<800},tablet:t=>{const o=t.innerWidth,e=t.innerHeight,n=Math.min(o,e),i=Math.max(o,e);return u(t)||(t=>l(t)&&!f(t,/mobile/i))(t)||n>460&&n<820&&i>780&&i<1400},cordova:v,capacitor:h,electron:t=>f(t,/electron/i),pwa:t=>{var o;return!(!(null===(o=t.matchMedia)||void 0===o?void 0:o.call(t,"(display-mode: standalone)").matches)&&!t.navigator.standalone)},mobile:p,mobileweb:t=>p(t)&&!m(t),desktop:t=>!p(t),hybrid:m};let g;const O=o=>o&&t(o)||g,y=(t={})=>{if("undefined"==typeof window)return;const n=window.document,d=window,u=d.Ionic=d.Ionic||{},l={};t._ael&&(l.ael=t._ael),t._rel&&(l.rel=t._rel),t._ce&&(l.ce=t._ce),o(l);const p=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},(t=>{try{const o=t.sessionStorage.getItem(s);return null!==o?JSON.parse(o):{}}catch(t){return{}}})(d)),{persistConfig:!1}),u.config),(t=>{const o={};return t.location.search.slice(1).split("&").map((t=>t.split("="))).map((([t,o])=>[decodeURIComponent(t),decodeURIComponent(o)])).filter((([t])=>{return t.substr(0,(o=r).length)===o;var o})).map((([t,o])=>[t.slice(r.length),o])).forEach((([t,e])=>{o[t]=e})),o})(d)),t);i.reset(p),i.getBoolean("persistConfig")&&((t,o)=>{try{t.sessionStorage.setItem(s,JSON.stringify(o))}catch(t){return}})(d,p),c(d),u.config=i,u.mode=g=i.get("mode",n.documentElement.getAttribute("mode")||(a(d,"ios")?"ios":"md")),i.set("mode",g),n.documentElement.setAttribute("mode",g),n.documentElement.classList.add(g),i.getBoolean("_testing")&&i.set("animated",!1);const m=t=>{var o;return null===(o=t.tagName)||void 0===o?void 0:o.startsWith("ION-")},v=t=>["ios","md"].includes(t);e((t=>{for(;t;){const o=t.mode||t.getAttribute("mode");if(o){if(v(o))return o;m(t)&&console.warn('Invalid ionic mode: "'+o+'", expected: "ios" or "md"')}t=t.parentElement}return g}))};export{a,i as c,O as g,y as i}