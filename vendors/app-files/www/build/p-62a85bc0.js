import{c as o}from"./p-67e2a233.js";import{b as s}from"./p-28e84784.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const a="ion-content",t=".ion-content-scroll-host",e=`${a}, ${t}`,r=o=>"ION-CONTENT"===o.tagName,i=async s=>r(s)?(await new Promise((a=>o(s,a))),s.getScrollElement()):s,n=o=>o.querySelector(t)||o.querySelector(e),m=o=>o.closest(e),c=(o,s)=>r(o)?o.scrollToTop(s):Promise.resolve(o.scrollTo({top:0,left:0,behavior:s>0?"smooth":"auto"})),f=(o,s,a,t)=>r(o)?o.scrollByPoint(s,a,t):Promise.resolve(o.scrollBy({top:a,left:s,behavior:t>0?"smooth":"auto"})),p=o=>s(o,a),h=o=>{if(r(o)){const s=o.scrollY;return o.scrollY=!1,s}return o.style.setProperty("overflow","hidden"),!0},l=(o,s)=>{r(o)?o.scrollY=s:o.style.removeProperty("overflow")};export{t as I,m as a,a as b,f as c,h as d,n as f,i as g,r as i,p,l as r,c as s}