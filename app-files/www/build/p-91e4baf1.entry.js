import{r as i,h as s,d as t,H as r}from"./p-a190c3e1.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const o=class{constructor(s){i(this,s),this.onClick=()=>((i,s,t,r,o)=>{const n=this.el.closest("ion-nav");if(n)if("forward"===s){if(void 0!==t)return n.push(t,r,{skipIfBusy:!0,animationBuilder:o})}else if("root"===s){if(void 0!==t)return n.setRoot(t,r,{skipIfBusy:!0,animationBuilder:o})}else if("back"===s)return n.pop({skipIfBusy:!0,animationBuilder:o});return Promise.resolve(!1)})(0,this.routerDirection,this.component,this.componentProps,this.routerAnimation),this.component=void 0,this.componentProps=void 0,this.routerDirection="forward",this.routerAnimation=void 0}render(){return s(r,{onClick:this.onClick})}get el(){return t(this)}};export{o as ion_nav_link}