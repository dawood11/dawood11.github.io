import{r as o,h as s}from"./index-Csa51zTE.js";import{M as a,b as i,c as t}from"./ModusIconMap-11e94e00-BwDU-3Aj.js";import"./IconChevronLeft-f85188e7-JgAW4C_c.js";import"./IconChevronRight-de7de2e8-DBT2c9n9.js";import"./IconClose-9751af6c-D48oQ6Nu.js";import"./IconExpand-27433628-BK2V9g7q.js";import"./IconVisibilityOn-4d4ac4d9-B_eU3_Yg.js";const n='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.modus-message{align-items:center;border-radius:0.25rem;display:flex;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:0.875rem;padding:0.5rem}.modus-message .icon{align-items:center;display:flex;margin-right:0.5rem}.modus-message.info{background-color:var(--modus-message-info-bg, #dcedf9);color:var(--modus-message-info-color, #0063a3)}.modus-message.info svg path{fill:var(--modus-message-info-color, #0063a3) !important}.modus-message.question{background-color:var(--modus-message-question-bg, #f1f1f6);color:var(--modus-message-question-color, #6a6e79)}.modus-message.question svg path{fill:var(--modus-message-question-color, #6a6e79) !important}@media (forced-colors: active){.modus-message{border:1px solid transparent}}',r=n,m=class{constructor(e){o(this,e),this.classByType=new Map([["info","info"],["question","question"]]),this.ariaLabel=void 0,this.icon=void 0,this.type="info"}render(){const e=`modus-message ${this.classByType.get(this.type)}`;return s("div",{key:"dd6016df199cc6bdec85e3ed234ecf6caac71270","aria-label":this.ariaLabel||void 0,class:e,role:"note"},s("span",{key:"d5fdb22343015cde0bbee4310a6ea79ef4962c43",class:"icon"},this.icon?s(a,{icon:this.icon,size:"18"}):this.type==="info"?s(i,{size:"18"}):this.type==="question"?s(t,{size:"18"}):null),s("span",{key:"c2295954d69d9660192c6094d6751321845bc0ab",class:"message"},s("slot",{key:"c615fc24a81859e9ac8fe450468f03d4cb5fd608"})))}};m.style=r;export{m as modus_message};
