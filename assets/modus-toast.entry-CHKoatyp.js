import{r as e,c as r,h as s,g as i}from"./index-Db5QQ8lN.js";import{I as c}from"./icon-error-a454e0da-CMCAnryw.js";import{b as d,I as t,a as l}from"./icon-warning-efe847ec-9K-KWsBx.js";import{I as n}from"./icon-help-e7581158-Dz1BbLkY.js";import{I as m}from"./IconClose-9751af6c-Cb66AN3T.js";const u='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.modus-toast{align-items:center;background-color:var(--modus-toast-bg, #fff);border:0.0625rem solid transparent;border-radius:0.25rem;box-shadow:0 0 8px rgba(36, 35, 45, 0.3);color:var(--modus-toast-color, #252a2e);display:flex;flex-direction:row;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:0.875rem;height:2.6875rem;padding:0 1rem;width:370px}.modus-toast .icon{align-items:center;display:flex;justify-content:center;min-width:1.125rem}.modus-toast .text{margin:0 0.5rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.modus-toast .close{background-color:transparent;border:0;margin-left:auto;margin-top:2px}.modus-toast .close .icon-close{height:18px;width:18px}.modus-toast .close:hover svg{cursor:pointer}.modus-toast .close:hover svg path{opacity:0.5}.modus-toast.primary{background-color:var(--modus-toast-primary-bg, #0063a3);border-color:var(--modus-toast-primary-bg, );color:var(--modus-toast-primary-color, #fff)}.modus-toast.primary .close svg path{fill:var(--modus-toast-primary-color, var(--modus-toast-color, #252a2e))}.modus-toast.primary svg:not(.icon-close) path{fill:var(--modus-toast-primary-color, )}.modus-toast.secondary{background-color:var(--modus-toast-secondary-bg, #252a2e);border-color:var(--modus-toast-secondary-bg, );color:var(--modus-toast-secondary-color, #fff)}.modus-toast.secondary .close svg path{fill:var(--modus-toast-secondary-color, var(--modus-toast-color, #252a2e))}.modus-toast.secondary svg:not(.icon-close) path{fill:var(--modus-toast-secondary-color, )}.modus-toast.success{background-color:var(--modus-toast-success-bg, #006638);border-color:var(--modus-toast-success-bg, );color:var(--modus-toast-success-color, #fff)}.modus-toast.success .close svg path{fill:var(--modus-toast-success-color, var(--modus-toast-color, #252a2e))}.modus-toast.success svg:not(.icon-close) path{fill:var(--modus-toast-success-color, )}.modus-toast.danger{background-color:var(--modus-toast-danger-bg, #ab1f26);border-color:var(--modus-toast-danger-bg, );color:var(--modus-toast-danger-color, #fff)}.modus-toast.danger .close svg path{fill:var(--modus-toast-danger-color, var(--modus-toast-color, #252a2e))}.modus-toast.danger svg:not(.icon-close) path{fill:var(--modus-toast-danger-color, )}',p=u,g=class{constructor(o){e(this,o),this.dismissClick=r(this,"dismissClick",7),this.iconByType=new Map([["danger",s(d,{size:"18"})],["dark",s(t,{size:"18"})],["default",s(t,{size:"18"})],["primary",s(t,{size:"18"})],["secondary",s(n,{size:"18"})],["success",s(l,{size:"18"})],["tertiary",s(t,{size:"18"})],["warning",s(c,{size:"18"})]]),this.classByType=new Map([["danger","danger"],["dark","dark"],["default","default"],["primary","primary"],["secondary","secondary"],["success","success"],["tertiary","tertiary"],["warning","warning"]]),this.ariaLabel=void 0,this.dismissible=void 0,this.delay=15e3,this.role="status",this.showIcon=!0,this.type="default"}delayChanged(o){clearTimeout(this.timerId),this.timerId=setTimeout(()=>{this.dismissElement()},o)}dismissElement(){this.dismissClick.emit(),this.el.remove()}componentDidLoad(){this.delay>0&&(this.timerId=setTimeout(()=>{this.dismissElement()},this.delay))}disconnectedCallback(){clearTimeout(this.timerId)}render(){const o=this.iconByType.get(this.type),a=`modus-toast ${this.classByType.get(this.type)}`;return s("div",{key:"389c51c386e5c42f8f72372a49c2a2b38d345d47","aria-label":this.ariaLabel||void 0,class:a,role:this.role},this.showIcon&&s("div",{class:"icon"},o),s("span",{key:"e3c14ce7ad60e00eb862a7ef5fabe136fcc2709d",class:"text"},s("slot",{key:"4810e746413dfa5e8c99c39d4b46fa8b8637ba7a"})),this.dismissible&&s("button",{type:"button",class:"close",onClick:()=>this.dismissElement(),"aria-label":"Dismiss"},s(m,{size:"18"})))}get el(){return i(this)}static get watchers(){return{delay:["delayChanged"]}}};g.style=p;export{g as modus_toast};
