import{f as o,w as s}from"./p-a190c3e1.js";import{a,s as t}from"./p-62a85bc0.js";import{c as r}from"./p-67e2a233.js";import"./p-28e84784.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const e=()=>{const e=window;e.addEventListener("statusTap",(()=>{o((()=>{const o=document.elementFromPoint(e.innerWidth/2,e.innerHeight/2);if(!o)return;const n=a(o);n&&new Promise((o=>r(n,o))).then((()=>{s((async()=>{n.style.setProperty("--overflow","hidden"),await t(n,300),n.style.removeProperty("--overflow")}))}))}))}))};export{e as startStatusTap}