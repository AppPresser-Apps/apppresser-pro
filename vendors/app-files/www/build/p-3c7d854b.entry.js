import{r as t,f as i,h as s,H as e}from"./p-7ebfe9a9.js";import{B as o}from"./p-8d0d50e8.js";import"./p-78d67758.js";import"./p-dd8c7f8a.js";import"./p-d7663053.js";import"./p-9b3d931a.js";import"./p-67e2a233.js";import"./p-28e84784.js";import"./p-f03d831c.js";import"./p-42947fc3.js";import"./p-c8e2e9a8.js";import"./p-94c4dcf6.js";import"./p-2d180048.js";const n=class{constructor(s){t(this,s),this.deleteActivityEvent=i(this,"deleteActivityEvent",7),this.deleteReplyEvent=i(this,"deleteReplyEvent",7),this.activity=void 0,this.item=void 0}componentWillLoad(){this.bpService=new o({url:this.item.api})}async flagActivity(){await this.bpService.flagContent({item:this.activity,action:"activity_flag"}),this.dismissPopover()}async deleteActivity(){(await this.bpService.deleteActivity(this.activity,{id:this.activity,context:"edit"})).hasOwnProperty("deleted")&&(console.log("deleted event",this.item),"activity_comment"===this.item.type?this.deleteReplyEvent.emit(this.activity):this.deleteActivityEvent.emit(this.activity),this.dismissPopover())}async dismissPopover(){(await document.querySelector("ion-popover")).dismiss({dismissed:!0})}render(){return s(e,null,s("ion-list",null,s("ion-item",null,s("ion-icon",{size:"small",slot:"start",name:"flag-outline"}),s("ion-label",{onClick:()=>this.flagActivity()},"Report Content")),this.item.can_delete&&s("ion-item",{lines:"none"},s("ion-icon",{size:"small",slot:"start",name:"close-circle-outline"}),s("ion-label",{onClick:()=>this.deleteActivity()},"Delete"))))}};n.style="pop-activity{display:block}";export{n as pop_activity}