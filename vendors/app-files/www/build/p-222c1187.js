import{h as t}from"./p-7ebfe9a9.js";import{r as n}from"./p-5e9a8ee3.js";function o(o,a){switch(o.type){case"back_button":return t("ion-back-button",{text:o.label});case"menu_button":return t("ion-menu-button",null);case"close_button":return t("ion-button",{onClick:t=>n({action:"close_modal",data:o,ev:t,api:a})},"0"!==o.icon&&t("ion-icon",{slot:"start",name:o.icon}),"0"===o.icon&&o.label);case"button":return t("ion-button",{onClick:t=>n({action:o.action,data:o,ev:t,api:a})},"0"!==o.icon&&t("ion-icon",{slot:"start",name:o.icon}),"0"===o.icon&&o.label);default:return""}}function a(o,a){return"button"===o.type?t("ion-button",{onClick:t=>n({action:o.action,data:o,ev:t,api:a})},"0"!==o.icon&&t("ion-icon",{slot:"start",name:o.icon}),"0"===o.icon&&o.label):""}function e(t){return t.attrs.data.logo_file?`<img src=${t.attrs.data.logo_file} style="height:40px; margin-top: 4px;"/>`:t.attrs.data.title}export{e as a,a as b,o as r}