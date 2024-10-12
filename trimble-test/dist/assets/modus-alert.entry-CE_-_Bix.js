import{r as c,c as n,h as e}from"./index-7e5rOppg.js";import{I as d,a as p,b as u}from"./icon-warning-efe847ec-TqldqKNB.js";import{I as m}from"./icon-error-a454e0da-68UQbZHL.js";import{I as h}from"./icon-close-f75c05f5-CDWK7olj.js";const v='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");div.alert{align-items:center;border:1px solid;border-left-width:0.75rem;border-radius:4px;box-sizing:border-box;display:flex;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";min-height:56px;padding:1rem;position:relative}div.alert.type-error{background-color:var(--modus-alert-danger-bg, rgba(255, 245, 228, 0.5));border-color:var(--modus-alert-danger-border-color, #da212c);color:var(--modus-alert-danger-color, #252a2e)}div.alert.type-error ::slotted(a){color:var(--modus-alert-danger-link-color, #a01820)}div.alert.type-error .icon-check-circle path,div.alert.type-error .icon-error path,div.alert.type-error .icon-info path,div.alert.type-error .icon-warning path{fill:var(--modus-alert-danger-color, #252a2e)}div.alert.with-action-button{padding:12px 16px}div.alert.type-info{background-color:var(--modus-alert-primary-bg, rgba(220, 237, 249, 0.5));border-color:var(--modus-alert-primary-border-color, #0063a3);color:var(--modus-alert-primary-color, #252a2e)}div.alert.type-info ::slotted(a){color:var(--modus-alert-primary-link-color, #003b61)}div.alert.type-info .icon-check-circle path,div.alert.type-info .icon-error path,div.alert.type-info .icon-info path,div.alert.type-info .icon-warning path{fill:var(--modus-alert-primary-color, #252a2e)}div.alert.type-success{background-color:var(--modus-alert-success-bg, rgba(224, 236, 207, 0.5));border-color:var(--modus-alert-success-border-color, #006638);color:var(--modus-alert-success-color, #252a2e)}div.alert.type-success ::slotted(a){color:var(--modus-alert-success-link-color, #002414)}div.alert.type-success .icon-check-circle path,div.alert.type-success .icon-error path,div.alert.type-success .icon-info path,div.alert.type-success .icon-warning path{fill:var(--modus-alert-success-color, #252a2e)}div.alert.type-warning{background-color:var(--modus-alert-warning-bg, rgba(251, 212, 215, 0.5));border-color:var(--modus-alert-warning-border-color, #e49325);color:var(--modus-alert-warning-color, #252a2e)}div.alert.type-warning ::slotted(a){color:var(--modus-alert-warning-link-color, #b16f16)}div.alert.type-warning .icon-check-circle path,div.alert.type-warning .icon-error path,div.alert.type-warning .icon-info path,div.alert.type-warning .icon-warning path{fill:var(--modus-alert-warning-icon-color, #e49325)}div.alert .icon{display:flex}div.alert .message{color:var(--modus-body-color);font-size:0.875rem;font-weight:700}div.alert .icon-check-circle,div.alert .icon-error,div.alert .icon-info,div.alert .icon-warning{margin-right:8px}div.alert .alert-buttons-container{align-items:center;display:flex;margin-left:auto}div.alert .action-button{display:flex;margin-right:2px}div.alert .icon-close-container{cursor:pointer;display:flex}div.alert .icon-close-container .icon-close path{fill:var(--modus-alert-close-color, #252a2e)}div.alert .icon-close-container .icon-close:hover{opacity:var(--modus-alert-close-hover-opacity, 0.5)}',b=v,y=class{constructor(r){c(this,r),this.dismissClick=n(this,"dismissClick",7),this.actionClick=n(this,"actionClick",7),this.classByType=new Map([["error","type-error"],["info","type-info"],["success","type-success"],["warning","type-warning"]]),this.infoTypes=["info"],this.ariaLabel=void 0,this.buttonAriaLabel=void 0,this.buttonText=void 0,this.dismissible=void 0,this.message=void 0,this.type="info"}elementKeyupHandler(r){switch(r.code){case"Escape":if(!this.dismissible)return;this.dismissClick.emit();break}}render(){var r,i,t;const o="24",s={alert:!0,"with-action-button":this.dismissible&&((r=this.buttonText)===null||r===void 0?void 0:r.length)>0||((i=this.buttonText)===null||i===void 0?void 0:i.length)>0},l=this.classByType.get(this.type);return l!=null&&(s[l]=!0),e("div",{key:"c1d861251fff5cfa3e970765429a24404e582e10","aria-label":this.ariaLabel||void 0,class:s,role:"alert"},e("div",{key:"5c7546082d84df03af93bcbdfffc6d127c2a4bc5",class:"icon"},this.type==="error"?e(m,{size:o}):null,this.infoTypes.includes(this.type)?e(d,{size:o}):null,this.type==="success"?e(p,{size:o}):null,this.type==="warning"?e(u,{size:o}):null),e("div",{key:"e3bca83bcc33abef318e70ef37a2b90b9c1b639a",class:"message"},this.message&&this.message.length>300?`${this.message.substring(0,300)}...`:this.message,e("slot",{key:"d67596a04d1b9f98792ddb9f2e376c18ae81cb7f"})),e("div",{key:"a498829a55c77818e0ac980e82fa313779af2223",class:"alert-buttons-container"},((t=this.buttonText)===null||t===void 0?void 0:t.length)>0&&e("modus-button",{class:"action-button",buttonStyle:"outline",color:"secondary",size:"medium",ariaLabel:this.buttonAriaLabel,onButtonClick:()=>this.actionClick.emit(),onKeyDown:a=>this.handleKeyDown(a,"action")},this.buttonText),this.dismissible&&e("div",{class:"icon-close-container","aria-label":"Dismiss alert",role:"button",tabIndex:0,onClick:()=>this.dismissClick.emit(),onKeyDown:a=>this.handleKeyDown(a,"dismiss")},e(h,{size:"18"}))))}handleKeyDown(r,i){if(r.key.toUpperCase()==="ENTER"){if(i==="dismiss"){this.dismissClick.emit();return}this.actionClick.emit()}}};y.style=b;export{y as modus_alert};
