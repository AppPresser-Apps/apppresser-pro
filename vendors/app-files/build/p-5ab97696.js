import{i as o,w as s}from"./p-7ebfe9a9.js";import{a,s as t}from"./p-62a85bc0.js";import{c as r}from"./p-67e2a233.js";import"./p-28e84784.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const e=()=>{const e=window;e.addEventListener("statusTap",(()=>{o((()=>{const o=document.elementFromPoint(e.innerWidth/2,e.innerHeight/2);if(!o)return;const i=a(o);i&&new Promise((o=>r(i,o))).then((()=>{s((async()=>{i.style.setProperty("--overflow","hidden"),await t(i,300),i.style.removeProperty("--overflow")}))}))}))}))};export{e as startStatusTap}