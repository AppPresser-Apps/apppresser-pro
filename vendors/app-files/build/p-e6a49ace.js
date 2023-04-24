import{w as l}from"./p-924f3f49.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const o=o=>{let i,e,r;const d=()=>{i=()=>{r=!0,o&&o(!0)},e=()=>{r=!1,o&&o(!1)},null==l||l.addEventListener("keyboardWillShow",i),null==l||l.addEventListener("keyboardWillHide",e)};return d(),{init:d,destroy:()=>{null==l||l.removeEventListener("keyboardWillShow",i),null==l||l.removeEventListener("keyboardWillHide",e),i=e=void 0},isKeyboardVisible:()=>r}};export{o as c}