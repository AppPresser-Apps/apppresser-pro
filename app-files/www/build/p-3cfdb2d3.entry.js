import{f as o,w as t,r as i,h as e,H as r,d as s}from"./p-a190c3e1.js";import{g as a}from"./p-ac8f2b47.js";import{f as n,p as l,g as p}from"./p-62a85bc0.js";import{c as d}from"./p-e6a49ace.js";import{j as f}from"./p-67e2a233.js";import"./p-28e84784.js";import"./p-924f3f49.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const c=(i,e)=>{o((()=>{const o=f(0,1-(i.scrollTop-(i.scrollHeight-i.clientHeight-10))/10,1);t((()=>{e.style.setProperty("--opacity-scale",o.toString())}))}))},A=class{constructor(o){i(this,o),this.keyboardCtrl=null,this.checkCollapsibleFooter=()=>{if("ios"!==a(this))return;const{collapse:o}=this,t="fade"===o;if(this.destroyCollapsibleFooter(),t){const o=this.el.closest("ion-app,ion-page,.ion-page,page-inner"),t=o?n(o):null;if(!t)return void l(this.el);this.setupFadeFooter(t)}},this.setupFadeFooter=async o=>{const t=this.scrollEl=await p(o);this.contentScrollCallback=()=>{c(t,this.el)},t.addEventListener("scroll",this.contentScrollCallback),c(t,this.el)},this.keyboardVisible=!1,this.collapse=void 0,this.translucent=!1}componentDidLoad(){this.checkCollapsibleFooter()}componentDidUpdate(){this.checkCollapsibleFooter()}connectedCallback(){this.keyboardCtrl=d((o=>{this.keyboardVisible=o}))}disconnectedCallback(){this.keyboardCtrl&&this.keyboardCtrl.destroy()}destroyCollapsibleFooter(){this.scrollEl&&this.contentScrollCallback&&(this.scrollEl.removeEventListener("scroll",this.contentScrollCallback),this.contentScrollCallback=void 0)}render(){const{translucent:o,collapse:t}=this,i=a(this),s=this.el.closest("ion-tabs"),n=null==s?void 0:s.querySelector(":scope > ion-tab-bar");return e(r,{role:"contentinfo",class:{[i]:!0,[`footer-${i}`]:!0,"footer-translucent":o,[`footer-translucent-${i}`]:o,"footer-toolbar-padding":!(this.keyboardVisible||n&&"bottom"===n.slot),[`footer-collapse-${t}`]:void 0!==t}},"ios"===i&&o&&e("div",{class:"footer-background"}),e("slot",null))}get el(){return s(this)}};A.style={ios:"ion-footer{display:block;position:relative;order:1;width:100%;z-index:10}ion-footer.footer-toolbar-padding ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom, 0)}.footer-ios ion-toolbar:first-of-type{--border-width:0.55px 0 0}@supports (backdrop-filter: blur(0)){.footer-background{left:0;right:0;top:0;bottom:0;position:absolute;backdrop-filter:saturate(180%) blur(20px)}.footer-translucent-ios ion-toolbar{--opacity:.8}}.footer-ios.ion-no-border ion-toolbar:first-of-type{--border-width:0}.footer-collapse-fade ion-toolbar{--opacity-scale:inherit}",md:'ion-footer{display:block;position:relative;order:1;width:100%;z-index:10}ion-footer.footer-toolbar-padding ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom, 0)}.footer-md::before{top:-2px;bottom:auto;background-position:left 0 top 0;position:absolute;width:100%;height:2px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==");background-repeat:repeat-x;content:""}@supports (inset-inline-start: 0){.footer-md::before{inset-inline-start:0}}@supports not (inset-inline-start: 0){.footer-md::before{left:0}[dir=rtl] .footer-md::before,:host-context([dir=rtl]) .footer-md::before{left:unset;right:unset;right:0}}[dir=rtl] .footer-md::before,:host-context([dir=rtl]) .footer-md::before{background-position:right 0 top 0}.footer-md.ion-no-border::before{display:none}'};export{A as ion_footer}