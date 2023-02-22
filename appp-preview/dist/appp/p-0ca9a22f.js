import{f as o,w as s}from"./p-a9088fe3.js";import{a as t,s as a}from"./p-4b2d31e5.js";import{c as r}from"./p-cf7b12f5.js";import"./p-ebeb7ac8.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const e=()=>{const e=window;e.addEventListener("statusTap",(()=>{o((()=>{const o=document.elementFromPoint(e.innerWidth/2,e.innerHeight/2);if(!o)return;const f=t(o);f&&new Promise((o=>r(f,o))).then((()=>{s((async()=>{f.style.setProperty("--overflow","hidden"),await a(f,300),f.style.removeProperty("--overflow")}))}))}))}))};export{e as startStatusTap}