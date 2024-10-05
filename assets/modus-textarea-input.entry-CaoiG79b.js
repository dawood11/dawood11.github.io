import{r as n,c as s,h as t}from"./index-B0InPXwt.js";import{I as l}from"./icon-close-f75c05f5-DTNsG8UT.js";import{g as u}from"./utils-3803a333-Cc9HXbaG.js";const d='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.modus-textarea-input{border-radius:4px;display:inline-flex;flex-direction:column;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";width:100%}.modus-textarea-input label{color:var(--modus-input-label-color, #464b52);font-size:0.75rem;font-weight:700;margin-bottom:0.25rem}.modus-textarea-input label span{color:var(--modus-input-border-color, #6a6e79);margin:0.25rem}.modus-textarea-input .label-container{display:inline-block;margin-bottom:0.25rem}.modus-textarea-input .label-container .required{bottom:0.0625rem;color:var(--modus-input-validation-error-color, #da212c);margin-left:0.25rem;position:relative}.modus-textarea-input .input-container{align-items:center;background-color:var(--modus-input-bg, #fff);border:0.0625rem solid var(--modus-input-border-color, #6a6e79);border-radius:4px;box-sizing:border-box;display:flex;flex-direction:row;margin:0;min-height:4.5rem;padding-bottom:2px;padding-top:2px;position:relative;width:100%}.modus-textarea-input .input-container textarea{background-color:transparent;border:none;color:var(--modus-input-color, #252a2e);font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:0.75rem;min-height:4rem;outline:none;padding:0 0.5rem;resize:none;resize:vertical;width:100%}.modus-textarea-input .input-container textarea::placeholder{color:var(--modus-input-hint-text-color, #a3a6b1)}.modus-textarea-input .input-container:hover{cursor:text}.modus-textarea-input .input-container:focus-within{border-color:var(--modus-input-border-active-color, #217cbb);box-shadow:0 0 0 1px var(--modus-input-border-active-color, #217cbb)}.modus-textarea-input .input-container.error{border-color:var(--modus-input-validation-error-color, #da212c);box-shadow:0 0 0 1px var(--modus-input-validation-error-color, #da212c)}.modus-textarea-input .input-container.valid{border-color:var(--modus-input-validation-success-color, #006638);box-shadow:0 0 0 1px var(--modus-input-validation-success-color, #006638)}.modus-textarea-input .input-container.large{min-height:5rem}.modus-textarea-input .input-container.large textarea{font-size:0.875rem;padding:0 1rem}.modus-textarea-input .input-container:has(textarea[readonly]){background-color:var(--modus-input-readonly-bg, #e0e1e9);border-color:transparent}.modus-textarea-input .sub-text{font-size:0.6875rem;margin-top:0.25rem}.modus-textarea-input .sub-text.helper{color:var(--modus-input-label-color, #464b52);font-weight:600}.modus-textarea-input .sub-text.error{color:var(--modus-input-validation-error-color, #da212c)}.modus-textarea-input .sub-text.valid{color:var(--modus-input-validation-success-color, #006638)}.modus-textarea-input span.required{color:var(--modus-input-validation-error-color, #da212c)}.modus-textarea-input.large{font-size:0.875rem;height:48px}.modus-textarea-input.disabled{pointer-events:none}.modus-textarea-input.disabled .input-container{background-color:var(--modus-input-disabled-bg, #e0e1e9);border:0.0625rem solid transparent}',c=d,h=class{constructor(i){n(this,i),this.valueChange=s(this,"valueChange",7),this.inputId=u()+"_textarea_input",this.classBySize=new Map([["medium","medium"],["large","large"]]),this.ariaLabel=void 0,this.autocorrect=void 0,this.autoFocusInput=void 0,this.clearable=!1,this.disabled=void 0,this.enterkeyhint=void 0,this.errorText=void 0,this.helperText=void 0,this.label=void 0,this.maxLength=void 0,this.minLength=void 0,this.placeholder=void 0,this.readOnly=void 0,this.rows=3,this.required=void 0,this.size="medium",this.spellcheck=void 0,this.textAlign="left",this.validText=void 0,this.value=void 0}async focusInput(){this.textInput.focus()}handleClearKeyDown(i){i.key!=="Enter"&&i.key!==" "||this.handleClear()}handleClear(){this.textInput.value=null,this.value=null,this.valueChange.emit(null)}handleOnInput(i){const r=i.currentTarget.value;this.value=r,this.valueChange.emit(r)}get inputAutocorrect(){return this.autocorrect===!0?"on":this.autocorrect===!1?"off":this.autocorrect}render(){var i;const r=this.size==="large"?"24":"16",a=this.clearable&&!this.readOnly&&!!this.value,o=()=>{const e=[];return a&&e.push("has-right-icon"),e.push(`text-align-${this.textAlign}`),e.join(" ")};return t("div",{class:(()=>{const e=[];return e.push("modus-textarea-input"),this.disabled&&e.push("disabled"),e.join(" ")})()},this.label||this.required?t("div",{class:"label-container"},this.label?t("label",{htmlFor:this.inputId},this.label):null,this.required?t("span",{class:"required"},"*"):null):null,t("div",{class:`input-container ${this.errorText?"error":this.validText?"valid":""} ${this.classBySize.get(this.size)}`,onClick:()=>this.textInput.focus(),part:"input-container"},t("textarea",{id:this.inputId,"aria-invalid":!!this.errorText,"aria-label":this.ariaLabel,"aria-required":(i=this.required)===null||i===void 0?void 0:i.toString(),autocorrect:this.autocorrect,class:o(),disabled:this.disabled,enterkeyhint:this.enterkeyhint,maxlength:this.maxLength,minlength:this.minLength,onInput:e=>this.handleOnInput(e),placeholder:this.placeholder,readonly:this.readOnly,ref:e=>this.textInput=e,rows:this.rows,spellcheck:this.spellcheck,tabIndex:0,value:this.value,autofocus:this.autoFocusInput}),a&&t("span",{class:"icons clear",tabIndex:0,onKeyDown:e=>this.handleClearKeyDown(e),onClick:()=>this.handleClear(),role:"button","aria-label":"Clear entry"},t(l,{size:r}))),this.errorText?t("label",{class:"sub-text error"},this.errorText):this.validText?t("label",{class:"sub-text valid"},this.validText):this.helperText?t("label",{class:"sub-text helper"},this.helperText):null)}};h.style=c;export{h as modus_textarea_input};
