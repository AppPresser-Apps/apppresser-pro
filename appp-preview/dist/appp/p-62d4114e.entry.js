import{r as t,d as i,h as s,H as e,c as r}from"./p-1485d14b.js";import{g as o}from"./p-ed6788ce.js";import{f as n}from"./p-cb8464c3.js";let h=class{constructor(s){t(this,s),this.ionImgWillLoad=i(this,"ionImgWillLoad",7),this.ionImgDidLoad=i(this,"ionImgDidLoad",7),this.ionError=i(this,"ionError",7),this.inheritedAttributes={},this.onLoad=()=>{this.ionImgDidLoad.emit()},this.onError=()=>{this.ionError.emit()}}srcChanged(){this.addIO()}componentWillLoad(){this.inheritedAttributes=n(this.el,["draggable"])}componentDidLoad(){this.addIO()}addIO(){void 0!==this.src&&("undefined"!=typeof window&&"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"isIntersecting"in window.IntersectionObserverEntry.prototype?(this.removeIO(),this.io=new IntersectionObserver((t=>{t[t.length-1].isIntersecting&&(this.load(),this.removeIO())})),this.io.observe(this.el)):setTimeout((()=>this.load()),200))}load(){this.loadError=this.onError,this.loadSrc=this.src,this.ionImgWillLoad.emit()}removeIO(){this.io&&(this.io.disconnect(),this.io=void 0)}render(){const{loadSrc:t,alt:i,onLoad:r,loadError:n,inheritedAttributes:h}=this,{draggable:d}=h;return s(e,{class:o(this)},s("img",{decoding:"async",src:t,alt:i,onLoad:r,onError:n,part:"image",draggable:a(d)}))}get el(){return r(this)}static get watchers(){return{src:["srcChanged"]}}};const a=t=>{switch(t){case"true":return!0;case"false":return!1;default:return}};h.style=":host{display:block;object-fit:contain}img{display:block;width:100%;height:100%;object-fit:inherit;object-position:inherit}";export{h as ion_img}