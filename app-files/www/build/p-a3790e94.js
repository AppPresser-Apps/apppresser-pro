import{c as o}from"./p-a02acbc6.js";import{g as t}from"./p-1085cdbc.js";import"./p-67e2a233.js";import"./p-924f3f49.js";import"./p-7ebfe9a9.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const i=(i,a)=>{var r,n,s;const c="40px",e="back"===a.direction,p=a.leavingEl,b=t(a.enteringEl),l=b.querySelector("ion-toolbar"),f=o();if(f.addElement(b).fill("both").beforeRemoveClass("ion-page-invisible"),e?f.duration((null!==(r=a.duration)&&void 0!==r?r:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):f.duration((null!==(n=a.duration)&&void 0!==n?n:0)||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform",`translateY(${c})`,"translateY(0px)").fromTo("opacity",.01,1),l){const t=o();t.addElement(l),f.addAnimation(t)}if(p&&e){f.duration((null!==(s=a.duration)&&void 0!==s?s:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)");const i=o();i.addElement(t(p)).onFinish((o=>{1===o&&i.elements.length>0&&i.elements[0].style.setProperty("display","none")})).fromTo("transform","translateY(0px)",`translateY(${c})`).fromTo("opacity",1,0),f.addAnimation(i)}return f};export{i as mdTransitionAnimation}