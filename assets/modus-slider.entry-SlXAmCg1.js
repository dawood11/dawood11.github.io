import{r as i,c as d,h as s}from"./index-ptaIuowM.js";import{g as a}from"./utils-3803a333-Cc9HXbaG.js";const o='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.modus-slider{display:flex;flex-direction:column;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";height:1.5rem;justify-content:center}.modus-slider .slider{appearance:none;background:var(--modus-slider-range-bg, #0063a3);border-radius:0.5rem;height:0.5rem}.modus-slider label{color:var(--modus-body-color, #252a2e);font-size:0.75rem;margin-bottom:0.25rem}.modus-slider label span{color:var(--modus-body-color, #252a2e);margin:0.25rem}.modus-slider .slider::-webkit-slider-thumb{appearance:none;background:#fff;border:0.125rem solid var(--modus-slider-thumb-border-color, #217cbb);border-radius:50%;cursor:pointer;height:1rem;transition:0.2s background;width:1rem}.modus-slider .slider::-webkit-slider-thumb:hover{background:var(--modus-slider-thumb-border-color, #217cbb)}.modus-slider .slider::-moz-range-thumb{background:#fff;border:0.125rem solid var(--modus-slider-thumb-border-color, #217cbb);border-radius:50%;cursor:pointer;height:1rem;transition:0.2s background;width:1rem}.modus-slider .slider::-moz-range-thumb:hover{background:var(--modus-slider-thumb-border-color, #217cbb)}.modus-slider.disabled{opacity:0.9;pointer-events:none}.modus-slider.disabled .slider{background-color:var(--modus-slider-range-disabled-bg, #e0e1e9)}.modus-slider.disabled .slider::-webkit-slider-thumb{background:var(--modus-slider-thumb-disabled-bg, #cbcdd6);border-color:var(--modus-slider-thumb-disabled-border-color, #b7b9c3)}@media (forced-colors: active){.slider{border:1px solid transparent}}',l=o,t=class{constructor(r){i(this,r),this.valueChange=d(this,"valueChange",7),this.valueInput=d(this,"valueInput",7),this.sliderId=a()+"_slider",this.ariaLabel=void 0,this.disabled=!1,this.label=void 0,this.maxValue=100,this.minValue=0,this.value=void 0}handleOnChange(r){const e=r.currentTarget.value;this.value=e,this.valueChange.emit(e)}handleOnInput(r){const e=r.currentTarget.value;this.value=e,this.valueInput.emit(e)}render(){const r=`modus-slider ${this.disabled?"disabled":""}`;return s("div",{key:"782fe8cb09fcf6164192a27cdf43a70aedbf4c46","aria-disabled":this.disabled?"true":void 0,"aria-label":this.ariaLabel||void 0,class:r},this.label&&s("label",{htmlFor:this.sliderId},this.label),s("input",{key:"8d64f9df8ce9a5b871856dbd13b9404c3b797b91",class:"slider",disabled:this.disabled,id:this.sliderId,max:this.maxValue,min:this.minValue,onChange:e=>this.handleOnChange(e),onInput:e=>this.handleOnInput(e),type:"range",value:this.value}))}};t.style=l;export{t as modus_slider};
