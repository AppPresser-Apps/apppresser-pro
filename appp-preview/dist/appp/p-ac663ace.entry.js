import{r as t,e as o,h as i,H as s,d as a}from"./p-a9088fe3.js";import{g as r}from"./p-2f6e21fc.js";import{c as n,h as e}from"./p-0e4de1d0.js";let l=class{constructor(i){t(this,i),this.ionCollapsedClick=o(this,"ionCollapsedClick",7),this.itemsBeforeCollapse=1,this.itemsAfterCollapse=1,this.breadcrumbsInit=()=>{this.setBreadcrumbSeparator(),this.setMaxItems()},this.resetActiveBreadcrumb=()=>{const t=this.getBreadcrumbs().find((t=>t.active));t&&this.activeChanged&&(t.active=!1)},this.setMaxItems=()=>{const{itemsAfterCollapse:t,itemsBeforeCollapse:o,maxItems:i}=this,s=this.getBreadcrumbs();for(const t of s)t.showCollapsedIndicator=!1,t.collapsed=!1;void 0!==i&&s.length>i&&o+t<=i&&s.forEach(((i,a)=>{a===o&&(i.showCollapsedIndicator=!0),a>=o&&a<s.length-t&&(i.collapsed=!0)}))},this.setBreadcrumbSeparator=()=>{const{itemsAfterCollapse:t,itemsBeforeCollapse:o,maxItems:i}=this,s=this.getBreadcrumbs(),a=s.find((t=>t.active));for(const r of s){const n=void 0!==i&&0===t?r===s[o]:r===s[s.length-1];r.last=n,r.separator=void 0!==r.separator?r.separator:!n||void 0,!a&&n&&(r.active=!0,this.activeChanged=!0)}},this.getBreadcrumbs=()=>Array.from(this.el.querySelectorAll("ion-breadcrumb")),this.slotChanged=()=>{this.resetActiveBreadcrumb(),this.breadcrumbsInit()}}onCollapsedClick(t){const o=this.getBreadcrumbs().filter((t=>t.collapsed));this.ionCollapsedClick.emit(Object.assign(Object.assign({},t.detail),{collapsedBreadcrumbs:o}))}maxItemsChanged(){this.resetActiveBreadcrumb(),this.breadcrumbsInit()}componentWillLoad(){this.breadcrumbsInit()}render(){const{color:t,collapsed:o}=this,a=r(this);return i(s,{class:n(t,{[a]:!0,"in-toolbar":e("ion-toolbar",this.el),"in-toolbar-color":e("ion-toolbar[color]",this.el),"breadcrumbs-collapsed":o})},i("slot",{onSlotchange:this.slotChanged}))}get el(){return a(this)}static get watchers(){return{maxItems:["maxItemsChanged"],itemsBeforeCollapse:["maxItemsChanged"],itemsAfterCollapse:["maxItemsChanged"]}}};l.style={ios:":host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;flex-wrap:wrap;align-items:center}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator ion-icon{color:var(--ion-color-contrast)}:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator{background:rgba(var(--ion-color-contrast-rgb), 0.11)}:host(.in-toolbar){padding-left:20px;padding-right:20px;padding-top:0;padding-bottom:0;justify-content:center}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){:host(.in-toolbar){padding-left:unset;padding-right:unset;-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px}}",md:":host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;flex-wrap:wrap;align-items:center}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator ion-icon{color:var(--ion-color-contrast)}:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator{background:rgba(var(--ion-color-contrast-rgb), 0.11)}:host(.in-toolbar){padding-left:8px;padding-right:8px;padding-top:0;padding-bottom:0}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){:host(.in-toolbar){padding-left:unset;padding-right:unset;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px}}"};export{l as ion_breadcrumbs}