import{e as o,w as t,r,h as e,H as i,c as s}from"./p-1485d14b.js";import{g as a}from"./p-ed6788ce.js";import{f as n,p as l,g as p}from"./p-240a7c9a.js";import{a as d}from"./p-cb8464c3.js";import"./p-13dd2f5b.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const A=(r,e)=>{o((()=>{const o=d(0,1-(r.scrollTop-(r.scrollHeight-r.clientHeight-10))/10,1);t((()=>{e.style.setProperty("--opacity-scale",o.toString())}))}))};let f=class{constructor(o){r(this,o),this.translucent=!1,this.checkCollapsibleFooter=()=>{if("ios"!==a(this))return;const{collapse:o}=this,t="fade"===o;if(this.destroyCollapsibleFooter(),t){const o=this.el.closest("ion-app,ion-page,.ion-page,page-inner"),t=o?n(o):null;if(!t)return void l(this.el);this.setupFadeFooter(t)}},this.setupFadeFooter=async o=>{const t=this.scrollEl=await p(o);this.contentScrollCallback=()=>{A(t,this.el)},t.addEventListener("scroll",this.contentScrollCallback),A(t,this.el)}}componentDidLoad(){this.checkCollapsibleFooter()}componentDidUpdate(){this.checkCollapsibleFooter()}destroyCollapsibleFooter(){this.scrollEl&&this.contentScrollCallback&&(this.scrollEl.removeEventListener("scroll",this.contentScrollCallback),this.contentScrollCallback=void 0)}render(){const{translucent:o,collapse:t}=this,r=a(this);return e(i,{role:"contentinfo",class:{[r]:!0,[`footer-${r}`]:!0,"footer-translucent":o,[`footer-translucent-${r}`]:o,[`footer-collapse-${t}`]:void 0!==t}},"ios"===r&&o&&e("div",{class:"footer-background"}),e("slot",null))}get el(){return s(this)}};f.style={ios:"ion-footer{display:block;position:relative;order:1;width:100%;z-index:10}ion-footer ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom, 0)}.footer-ios ion-toolbar:first-of-type{--border-width:0.55px 0 0}@supports (backdrop-filter: blur(0)){.footer-background{left:0;right:0;top:0;bottom:0;position:absolute;backdrop-filter:saturate(180%) blur(20px)}.footer-translucent-ios ion-toolbar{--opacity:.8}}.footer-ios.ion-no-border ion-toolbar:first-of-type{--border-width:0}.footer-collapse-fade ion-toolbar{--opacity-scale:inherit}",md:'ion-footer{display:block;position:relative;order:1;width:100%;z-index:10}ion-footer ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom, 0)}.footer-md::before{left:0;top:-2px;bottom:auto;background-position:left 0 top 0;position:absolute;width:100%;height:2px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==");background-repeat:repeat-x;content:""}[dir=rtl] .footer-md::before,:host-context([dir=rtl]) .footer-md::before{left:unset;right:unset;right:0}[dir=rtl] .footer-md::before,:host-context([dir=rtl]) .footer-md::before{background-position:right 0 top 0}.footer-md.ion-no-border::before{display:none}'};export{f as ion_footer}