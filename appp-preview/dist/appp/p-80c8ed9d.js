import{e as o,w as s}from"./p-1485d14b.js";import{a as t,s as a}from"./p-240a7c9a.js";import{c as r}from"./p-cb8464c3.js";import"./p-13dd2f5b.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const c=()=>{const c=window;c.addEventListener("statusTap",(()=>{o((()=>{const o=document.elementFromPoint(c.innerWidth/2,c.innerHeight/2);if(!o)return;const n=t(o);n&&new Promise((o=>r(n,o))).then((()=>{s((async()=>{n.style.setProperty("--overflow","hidden"),await a(n,300),n.style.removeProperty("--overflow")}))}))}))}))};export{c as startStatusTap}