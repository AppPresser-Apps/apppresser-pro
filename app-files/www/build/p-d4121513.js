import{c as o}from"./p-a02acbc6.js";import{g as t}from"./p-4b075db2.js";import"./p-67e2a233.js";import"./p-924f3f49.js";import"./p-a190c3e1.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const i=(i,a)=>{var r,n,p;const s="back"===a.direction,c=a.leavingEl,e=t(a.enteringEl),b=e.querySelector("ion-toolbar"),l=o();if(l.addElement(e).fill("both").beforeRemoveClass("ion-page-invisible"),s?l.duration((null!==(r=a.duration)&&void 0!==r?r:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):l.duration((null!==(n=a.duration)&&void 0!==n?n:0)||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform","translateY(40px)","translateY(0px)").fromTo("opacity",.01,1),b){const t=o();t.addElement(b),l.addAnimation(t)}if(c&&s){l.duration((null!==(p=a.duration)&&void 0!==p?p:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)");const i=o();i.addElement(t(c)).onFinish((o=>{1===o&&i.elements.length>0&&i.elements[0].style.setProperty("display","none")})).fromTo("transform","translateY(0px)","translateY(40px)").fromTo("opacity",1,0),l.addAnimation(i)}return l};export{i as mdTransitionAnimation}