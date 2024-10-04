import{r as t,c as i,h as d}from"./index-BkOlHltm.js";const a=o=>d("div",{class:`modus-radio-button ${o.disabled?"disabled":""}`},d("div",{class:`radio ${o.size}`,tabIndex:0,onClick:()=>o.handleButtonClick(o.id),onKeyDown:e=>o.handleKeydown(e,o.id)},d("input",{id:`radio-${o.id}`,checked:o.checked,disabled:o.disabled,name:o.name,type:"radio"}),d("span",{class:"checkmark"}),d("label",{htmlFor:`radio-${o.id}`},o.label))),s='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");div.modus-radio-group{display:flex;flex-direction:column;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";margin:0;padding:0;position:relative}.modus-radio-button{display:inline-block}.modus-radio-button .radio{align-items:center;display:inline-flex;height:2rem;outline:none}.modus-radio-button .radio input{display:none}.modus-radio-button .radio .checkmark{background-color:var(--modus-radio-btn-bg, #fff);border:0.125rem solid var(--modus-radio-btn-border-color, #90939f);border-radius:50%;height:0.75rem;position:absolute;transition:background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;width:0.75rem}.modus-radio-button .radio.small .checkmark{border:0.125rem solid var(--modus-radio-btn-border-color, #90939f);height:0.625rem;width:0.625rem}.modus-radio-button .radio.small input:checked~.checkmark::after{height:0.38rem;left:0.15rem;top:0.125rem;width:0.38rem}.modus-radio-button .radio.small:focus .checkmark{outline:0.125rem solid var(--modus-radio-btn-focus-color, #3db0ee);outline-offset:0.0625rem}.modus-radio-button .radio.small label{font-size:0.625rem;margin-left:1.25rem}.modus-radio-button .radio .checkmark::after{background:var(--modus-radio-btn-selected-border-color, #217cbb);border-radius:90%;content:"";display:none;forced-color-adjust:none;height:0.44rem;left:0.155rem;position:absolute;top:0.155rem;width:0.44rem}.modus-radio-button .radio input:checked~.checkmark{background-color:var(--modus-radio-btn-bg, #fff);border-color:var(--modus-radio-btn-selected-border-color, #217cbb)}.modus-radio-button .radio input:checked~.checkmark::after{display:block}.modus-radio-button .radio label{color:var(--modus-radio-btn-label-color, #464b52);font-size:0.75rem;margin-left:1.925rem}.modus-radio-button .radio:active .checkmark{background-color:var(--modus-radio-btn-selected-border-color, #217cbb);border-color:var(--modus-radio-btn-selected-border-color, #217cbb)}.modus-radio-button .radio:hover .checkmark{border-color:var(--modus-radio-btn-hover-border-color, #217cbb)}.modus-radio-button .radio:focus .checkmark{border-color:var(--modus-radio-btn-hover-border-color, #217cbb);outline:0.1875rem solid var(--modus-radio-btn-focus-color, #3db0ee);outline-offset:0.125rem}.modus-radio-button.disabled{opacity:var(--modus-radio-btn-disabled-opacity, 0.3);pointer-events:none}',n=s,c=class{constructor(o){t(this,o),this.buttonClick=i(this,"buttonClick",7),this.ariaLabel=void 0,this.checkedId=void 0,this.name=void 0,this.radioButtons=[],this.size="medium"}componentWillLoad(){this.radioButtons.forEach(o=>{this.checkedId=o.checked?o.id:this.checkedId})}handleButtonClick(o){this.setCheckedIdAndUpdateRadioButtons(o),this.buttonClick.emit(this.checkedId)}handleButtonKeydown(o,e){o.code==="Enter"&&this.handleButtonClick(e)}setCheckedIdAndUpdateRadioButtons(o){this.checkedId=o,this.radioButtons.forEach(e=>{e.checked=e.id===this.checkedId})}render(){return d("div",{key:"70f3b4f61ab1787271891923198db83eca0a67cb",class:"modus-radio-group","aria-label":this.ariaLabel},this.radioButtons.map(o=>d(a,{size:this.size,checked:o.checked,disabled:o.disabled,label:o.label,name:this.name,id:o.id,handleButtonClick:e=>this.handleButtonClick(e),handleKeydown:(e,r)=>this.handleButtonKeydown(e,r)})))}static get watchers(){return{checkedId:["setCheckedIdAndUpdateRadioButtons"]}}};c.style=n;export{c as modus_radio_group};
