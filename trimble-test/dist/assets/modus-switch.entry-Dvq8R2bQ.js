import{r as o,c,h as s}from"./index-r316mLu9.js";const d='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.modus-switch{align-items:center;display:inline-flex;flex-direction:row;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:0.875rem;outline:none}.modus-switch.small .switch{height:0.75rem;width:1.625rem}.modus-switch.small .switch .slider{border-radius:8px;height:0.75rem;width:1.625rem}.modus-switch.small .switch .slider::before{height:0.75rem;width:0.75rem}.modus-switch.small .switch.checked .slider::before{transform:translateX(0.875rem)}.modus-switch.small label{font-size:0.75rem}.modus-switch .switch{background-color:var(--modus-switch-bg, #90939f);border:0.125rem var(--modus-switch-border-color, #90939f) solid;border-radius:1rem;height:1rem;position:relative;width:2.25rem}.modus-switch .switch .slider{background-color:var(--modus-switch-bg, #90939f);border-radius:1rem;cursor:pointer;height:1rem;inset:0;position:absolute;top:0;width:2.25rem}.modus-switch .switch .slider::before{background-color:#fff;border-radius:50%;content:"";forced-color-adjust:none;height:1rem;position:absolute;transition:0.1s;width:1rem}.modus-switch .switch.checked{background-color:var(--modus-switch-selected-border-color, #217cbb);border-color:var(--modus-switch-selected-border-color, #217cbb)}.modus-switch .switch.checked .slider{background-color:var(--modus-switch-selected-border-color, #217cbb)}.modus-switch .switch.checked .slider::before{transform:translateX(1.25rem)}.modus-switch .switch:active .slider{background-color:var(--modus-switch-selected-border-color, #217cbb)}.modus-switch:hover .switch{border-color:var(--modus-switch-hover-border-color, #217cbb)}.modus-switch:focus .switch{outline:0.125rem solid var(--modus-switch-focus-box-shadow-color, #019aeb);outline-offset:0.125rem}.modus-switch input{display:none}.modus-switch label{color:var(--modus-switch-label-color, #464b52);margin-bottom:0.01rem;margin-left:0.5rem}.modus-switch.disabled{opacity:var(--modus-check-input-disabled-opacity, 0.3);pointer-events:none}@media (forced-colors: active) and (prefers-color-scheme: light){.slider::before{border:1px solid ButtonText;margin-top:-1px}}',r=d,h=class{constructor(e){o(this,e),this.switchClick=c(this,"switchClick",7),this.ariaLabel=void 0,this.checked=!1,this.disabled=void 0,this.label=void 0,this.size="medium"}elementKeydownHandler(e){switch(e.code){case"Enter":this.handleSwitchClick();break}}elementKeyupHandler(e){switch(e.code){case"Space":this.handleSwitchClick();break}}handleSwitchClick(){this.disabled||(this.updateChecked(),this.switchClick.emit(this.checked))}updateChecked(){this.checked=!this.checked,this.checkboxInput.checked=this.checked}render(){const e=`modus-switch ${this.disabled?"disabled":""} ${this.size}`,i=`switch ${this.checked?"checked":""}`;return s("div",{key:"74e0f4c43bc6858f0a55d65fe3b967cdb955d39b",class:e,onClick:()=>this.handleSwitchClick(),tabIndex:this.disabled?-1:0},s("div",{key:"a68e5bfbee07e56d67014c1e0f6e36403dbdb9e1",class:i},s("span",{key:"7c38ffe05f1baff87ca079f2bef69d5d58791810",class:"slider"})),s("input",{key:"452aed83bbe12daf81fc74eeb2b2538279b0b7d5","aria-checked":String(this.checked),"aria-disabled":this.disabled?"true":void 0,"aria-label":this.ariaLabel||void 0,checked:this.checked,disabled:this.disabled,ref:t=>this.checkboxInput=t,role:"switch",type:"checkbox"}),this.label?s("label",null,this.label):null)}};h.style=r;export{h as modus_switch};
