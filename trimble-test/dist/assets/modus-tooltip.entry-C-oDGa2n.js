import{r as s,h as o,F as n,g as r}from"./index-CkmmIGxO.js";import{c as a}from"./popper-0fbeff6d-BQBsAJpH.js";const p='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.tooltip{background:var(--modus-tooltip-bg, #585c65);border-radius:0.25rem;color:var(--modus-tooltip-color, #fff);display:none;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:0.75rem;max-width:250px;padding:0.25rem 0.5rem;z-index:1}.tooltip[data-show]:not(.hide){display:inline-block}#arrow,#arrow::before{background:inherit;forced-color-adjust:none;height:8px;position:absolute;width:8px}#arrow{visibility:hidden}#arrow::before{content:"";transform:rotate(45deg);visibility:visible}.tooltip[data-popper-placement^=top]>#arrow{bottom:-4px}.tooltip[data-popper-placement^=bottom]>#arrow{top:-4px}.tooltip[data-popper-placement^=left]>#arrow{right:-4px}.tooltip[data-popper-placement^=right]>#arrow{left:-4px}@media (forced-colors: active){.tooltip{border:1px solid transparent}}',h=p,l=class{constructor(e){s(this,e),this.showEvents=["mouseenter","mouseover","focus"],this.hideEvents=["mouseleave","blur","click"],this.showEventsListener=()=>{window.clearTimeout(this.hoverTimer),this.hoverTimer=window.setTimeout(()=>{this.show()},500)},this.hideEventsListener=()=>{this.hide(),window.clearTimeout(this.hoverTimer),this.hoverTimer=void 0},this.ariaLabel=void 0,this.position="top",this.text=void 0,this.disabled=void 0}handlePositionChange(e){this.popperInstance?this.popperInstance.setOptions(t=>Object.assign(Object.assign({},t),{placement:e,modifiers:[...t.modifiers]})):this.initializePopper(e)}onTextChange(e){(e==null?void 0:e.length)>1?this.initializePopper(this.position):this.cleanupPopper()}onDisabledChange(e){e?this.cleanupPopper():this.initializePopper(this.position)}attachEventListeners(){const e=this.element.firstElementChild;e&&(this.showEvents.forEach(t=>{e.addEventListener(t,this.showEventsListener)}),this.hideEvents.forEach(t=>{e.addEventListener(t,this.hideEventsListener)}))}componentDidLoad(){this.tooltipElement=this.element.shadowRoot.querySelector(".tooltip"),this.attachEventListeners()}disconnectedCallback(){this.cleanupPopper(),window.clearTimeout(this.hoverTimer)}initializePopper(e){this.popperInstance&&this.cleanupPopper();const t=this.element.firstElementChild;!t||!this.tooltipElement||(this.popperInstance=a(t,this.tooltipElement,{placement:e,modifiers:[{name:"offset",options:{offset:[0,8]}}]}),this.showEvents.forEach(i=>{t.addEventListener(i,this.showEventsListener)}),this.hideEvents.forEach(i=>{t.addEventListener(i,this.hideEventsListener)}))}cleanupPopper(){var e;const t=this.element.firstElementChild;t&&(this.showEvents.forEach(i=>{t.removeEventListener(i,this.showEventsListener)}),this.hideEvents.forEach(i=>{t.removeEventListener(i,this.hideEventsListener)})),(e=this.popperInstance)===null||e===void 0||e.destroy(),this.popperInstance=null}show(){var e;!this.popperInstance&&((e=this.text)===null||e===void 0?void 0:e.length)>1&&!this.disabled&&this.initializePopper(this.position),this.popperInstance&&(this.tooltipElement.setAttribute("data-show",""),this.popperInstance.setOptions(t=>Object.assign(Object.assign({},t),{modifiers:[...t.modifiers,{name:"eventListeners",enabled:!0}]})),this.popperInstance.update())}hide(){this.popperInstance&&(this.tooltipElement.removeAttribute("data-show"),this.popperInstance.setOptions(e=>Object.assign(Object.assign({},e),{modifiers:[...e.modifiers,{name:"eventListeners",enabled:!1}]})))}render(){var e;const t=this.disabled||!(((e=this.text)===null||e===void 0?void 0:e.length)>1);return o(n,{key:"a0ee64cbe91faed93adc2596116b7ea92f3b6979"},o("slot",{key:"8b53b82a61a67bf958b8d18402c9ecc0d64f95ee"}),o("div",{key:"3a707f878d56c961636010aa06d65c132f360790",tabIndex:-1,class:{tooltip:!0,hide:t},"aria-label":this.ariaLabel||void 0,role:"tooltip"},this.text,o("div",{key:"14b0ae5148bc13345df0732eeb299354ce7e3ae4",id:"arrow","data-popper-arrow":!0})))}get element(){return r(this)}static get watchers(){return{position:["handlePositionChange"],text:["onTextChange"],disabled:["onDisabledChange"]}}};l.style=h;export{l as modus_tooltip};
