import{r as s,c as i,h as c}from"./index-CYgP052K.js";import{g as a}from"./utils-3803a333-Cc9HXbaG.js";const d=`@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");:host{align-items:center;display:flex}.modus-checkbox{align-items:center;color:var(--modus-checkbox-label-color, #464b52);cursor:pointer;display:inline-flex;flex-direction:row;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:0.875rem;height:1.5rem;margin:0 0.28rem;text-align:center;white-space:nowrap}.modus-checkbox .checkbox{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--modus-checkbox-bg, #fff);background-image:var(--modus-checkbox-checked-bg-image);background-position:center;background-repeat:no-repeat;background-size:contain;border:0.125rem solid var(--modus-checkbox-border-color, #90939f);border-radius:0.25em;flex-shrink:0;height:1rem;margin-top:0.1875em;vertical-align:top;width:1rem}.modus-checkbox .checkbox:checked{background-color:var(--modus-check-selected-bg, #217cbb);background-image:var(--modus-check-checked-bg-image, url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5.8 4.7'%3E%3Cpath fill='%23fff' d='M1.7 4.7.1 3.2C0 3 0 2.7.1 2.5s.5-.2.7 0l.9.9L4.9.2c.2-.2.5-.2.7-.1s.2.5 0 .7L1.7 4.7z'/%3E%3C/svg%3E"));border-color:var(--modus-checkbox-selected-border-color, #217cbb)}.modus-checkbox .checkbox:focus,.modus-checkbox .checkbox:focus-visible{border:0.125rem solid var(--modus-checkbox-selected-border-color, #217cbb) !important;outline:0.125rem solid var(--modus-checkbox-focus-box-shadow-color, #019aeb) !important;outline-offset:2px !important}.modus-checkbox .checkbox:disabled{cursor:default;opacity:var(--modus-checkbox-disabled-opacity, 0.3)}.modus-checkbox .checkbox:indeterminate{background-color:var(--modus-check-selected-bg, #217cbb);background-image:var(--modus-check-bg-image-indeterminate, url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e"));border-color:var(--modus-check-selected-bg, #217cbb)}.modus-checkbox .checkbox.small{border-radius:1.5px;height:0.75rem;width:0.75rem}.modus-checkbox label{align-items:center;display:flex;margin-left:0.5rem}.modus-checkbox label.small{font-size:0.75rem;margin-left:0.25rem}.modus-checkbox label.disabled{opacity:0.3}.modus-checkbox:hover .checkbox:not(.checked):not(.disabled){border:0.125rem solid var(--modus-checkbox-hover-border-color, #217cbb)}.modus-checkbox:active .checkbox:not(.checked):not(.disabled){border:0.125rem solid var(--modus-checkbox-selected-border-color, #217cbb)}@media (forced-colors: active) and (prefers-color-scheme: light){.modus-checkbox .checkbox{forced-color-adjust:none}}`,t=d,r=class{constructor(e){s(this,e),this.checkboxClick=i(this,"checkboxClick",7),this.checkBoxId=a()+"_checkbox",this.ariaLabel=void 0,this.checked=void 0,this.disabled=void 0,this.indeterminate=void 0,this.label=void 0,this.stopPropagation=void 0,this.size="medium"}elementKeydownHandler(e){switch(e.code){case"Enter":this.handleCheckboxClick(e);break;case"Space":this.handleCheckboxClick(e);break}}async focusCheckbox(){this.checkboxInput.focus()}componentDidRender(){this.checkboxInput.indeterminate=this.indeterminate}handleCheckboxClick(e){this.disabled||(this.updateChecked(),this.checkboxClick.emit(this.checked),this.stopPropagation&&(e.stopPropagation(),e.preventDefault()))}updateChecked(){this.checked=!this.checked,this.checkboxInput.checked=this.checked,this.indeterminate=!1}render(){const e=`modus-checkbox ${this.size==="small"?"small":""}`;return c("div",{key:"a44796ddf538bfebb6a586393b928a57f5ee793a",class:e},c("input",{key:"62eec3099b932d9fc161bec37c81b3a6b0822c13",class:`checkbox ${this.size==="small"?"small":""} ${this.disabled?"disabled":""}`,"aria-checked":this.checked?"true":"false","aria-disabled":this.disabled?"true":void 0,"aria-label":this.ariaLabel||void 0,checked:this.checked,disabled:this.disabled,id:this.checkBoxId,ref:o=>this.checkboxInput=o,onChange:o=>{this.handleCheckboxClick(o)},type:"checkbox"}),this.label?c("label",{htmlFor:this.checkBoxId,class:` ${this.disabled?"disabled":""} ${this.size==="small"?"small":""}`},this.label):null)}};r.style=t;export{r as modus_checkbox};
