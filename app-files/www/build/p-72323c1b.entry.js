import{r as t,h as i,H as s,e as o}from"./p-7ebfe9a9.js";import{P as n}from"./p-d1311ccb.js";import{r as e,a as r,b as a}from"./p-686cd55b.js";import{v as h,d as l}from"./p-50830ef3.js";import{s as p,o as c}from"./p-f03d831c.js";import"./p-d6593782.js";import"./p-2d180048.js";import"./p-78d67758.js";import"./p-dd8c7f8a.js";import"./p-d7663053.js";import"./p-9b3d931a.js";import"./p-67e2a233.js";import"./p-28e84784.js";import"./p-42947fc3.js";const d=class{constructor(i){t(this,i),this.pathdata=[],this.prefs=[],this.data=void 0,this.api=[],this.props={},this.attrs=void 0,this.loaded=!1}componentWillLoad(){this.loadView()}componentDidLoad(){const t=this.data?this.data.attrs.data:null;console.log("app data",p.data),console.log("view data",this.data),console.log("state prefs",p.preferences),this.style(),this.runCode(t.code_ondidload)}async loadView(){this.addCode();const t=this.data?this.data.attrs.data:null;if(this.api=p.api,t&&t.preferences&&await this.loadPreferences(t.preferences),t&&t.path){const i=window.location.pathname.replace(t.view_route,""),s=this.parsePath(t.path),o=this.parsePath(i);s.segments.map(((t,i)=>{this.props[t]=o.segments[i]}))}c("api",(t=>{setTimeout((()=>{this.api=Object.assign({},t)}),100)})),await this.runCode(t.code_onwillload),this.loaded=!0}async runCode(t){if(""!==t){const i=new Function("data","appp","bp",t),s=await i(this.data,window.appp,window.bp);return null==s?this.data:s}return this.data}addCode(){if(this.data&&""!==this.data.attrs.data.javascript){var t=document.createElement("script");t.text=this.data.attrs.data.javascript,this.host.appendChild(t)}}async loadPreferences(t){t.split(",").map((async t=>{const{value:i}=await n.get({key:t.trim()});null!==i&&(p.preferences[`${t.trim()}`]=JSON.parse(i))}))}removePrefix(t,i){if(t.length>i.length)return null;if(t.length<=1&&""===t[0])return i;for(let s=0;s<t.length;s++)if(t[s]!==i[s])return null;return i.length===t.length?[""]:i.slice(t.length)}parsePath(t){let i,s=[""];if(null!=t){const o=t.indexOf("?");o>-1&&(i=t.substring(o+1),t=t.substring(0,o)),s=t.split("/").map((t=>t.trim())).filter((t=>t.length>0)),0===s.length&&(s=[""])}return{segments:s,queryString:i}}navchange(t){document.querySelector("ion-router").push(t,"root")}style(){const t=this.data.attrs.data;this.host.id="view-"+t.id;var i=`\n    #${this.host.id} #content-wrap {\n      display: ${t.display};\n      flex-direction: ${t.flex_flex_direction};\n      flex-wrap: ${t.flex_flex_wrap};\n      align-items: ${t.flex_align_items};\n      justify-content: ${t.flex_justify_content};\n      height: ${"flex"===t.display?"100%":"auto"}\n    }\n    `,s=document.createElement("style");s.innerHTML=i,this.host.appendChild(s)}renderTab(t){if(h(t,this.api))return i("ion-tab-button",{tab:"tab-speaker",onClick:()=>this.navchange(t.route)},i("ion-icon",{name:t.icon,"aria-hidden":"true"}),""!==t.label&&i("ion-label",null,t.label))}render(){return i(s,null,this.data&&"1"!==this.data.attrs.data.hide_toolbar&&i("ion-header",null,i("ion-toolbar",{color:this.data&&this.data.attrs.data.toolbar_color},i("ion-buttons",{slot:"start"},this.data.attrs.data.left_buttons.length>0&&this.data.attrs.data.left_buttons.map((t=>e(t,this.api)))),i("ion-title",{innerHTML:this.data&&r(this.data)}),i("ion-buttons",{slot:"end"},this.data.attrs.data.right_buttons.length>0&&this.data.attrs.data.right_buttons.map((t=>a(t,this.api)))))),i("ion-content",{id:"view-content",color:this.data&&this.data.attrs.data.background},i("div",{id:"content-wrap"},this.loaded&&this.data&&this.data.innerBlocks.map((t=>l(t,this.api,this.props))))),p.data.tabbar&&p.data.tabbar.length>0&&"0"===this.data.attrs.data.hide_tabbar&&i("ion-tab-bar",{slot:"bottom",color:p.data.tabbar[0].attrs.data.color},p.data.tabbar[0].attrs.data.tabs.map((t=>this.renderTab(t)))))}get host(){return o(this)}};d.style=":host{display:block}ion-popover::part(content){min-width:70% !important}";export{d as acf_view}