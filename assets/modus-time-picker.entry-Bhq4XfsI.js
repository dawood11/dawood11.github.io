import{r as u,c as d,h as s,g as m}from"./index-DCGKiUwf.js";const c=/^(1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm])$/,l=/^(2[0-3]|[01]?[0-9]):([0-5][0-9])$/,p=/[\d:apm\s]/gi,h=/[\d:]/gi;class f{constructor(e){this.hasAmPm=!1,this.hasAmPm=e}autoFormatTimeInput(e,t){if(!e||!t)return e;const n=this.getAutoFormatString();let i=e;if(n.length>e.length&&n[e.length]!=="x"){i=e+n[e.length];const a=i.toUpperCase();a&&i!==a&&(i=a)}return i}formatTimeDisplay(e){if(!e)return null;const t=this.processTimeRegex(e,l);if(t)if(this.hasAmPm){const n=parseInt(t[0]),i=parseInt(t[1]);return this.create12HourTimeString(n,i)}else return e;return null}setTimeOnDate(e=new Date,t){const n=new Date(e),i=this.processTimeRegex(t,l);if(i){const a=parseInt(i[0]),o=parseInt(i[1]);a>=0&&a<=23&&(o===0||o>0)&&n.setHours(a,o)}return n}keyIsValidTimeCharacter(e,t=null){return!!(t!=null?new RegExp(t):new RegExp(this.hasAmPm?p:h)).test(e)}parseTimeDisplay(e){var t;if(!e)return null;const n=this.processTimeRegex(e,this.hasAmPm?c:l);if(n)if(this.hasAmPm){const i=parseInt(n[0]),a=parseInt(n[1]),o=(t=n[2])===null||t===void 0?void 0:t.toUpperCase();return this.create24HourTimeString(i,a,o)}else return e;return null}create24HourTimeString(e,t,n){let i=e;return n==="AM"?i=e-e===12?12:0:n==="PM"&&(i=e+e!==12?12:0),i>=0&&i<=23&&(t===0||t>0)?`${this.pad(i)}:${this.pad(t)}`:null}create12HourTimeString(e,t){let n="AM",i=e;return e===0?i=e+12:e===12?n="PM":e>12&&(i=e-12,n="PM"),i&&i<=12&&(t===0||t>0)?`${this.pad(i)}:${this.pad(t)} ${n}`:null}getAutoFormatString(){return this.hasAmPm?"xx:xx xM":"xx:xx"}processTimeRegex(e,t){const i=new RegExp(t).exec(e);return(i==null?void 0:i.length)>1?(i.shift(),i):null}pad(e){return e<10?`0${e}`:e.toString()}}const g='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.modus-time-picker{box-sizing:border-box;display:inline-flex;flex-direction:row;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";position:relative;width:100%}.modus-time-picker .time-input-wrapper{display:flex;flex-direction:column;width:100%}.modus-time-picker button{background:0;border:0;cursor:pointer;margin:0;padding:0}.modus-time-picker label{color:var(--modus-input-label-color, #464b52);margin-bottom:0.25rem}.modus-time-picker .label-container{display:flex}.modus-time-picker .label-container label{font-size:0.75rem;font-weight:700}.modus-time-picker .label-container span.required{bottom:0.0625rem;color:var(--modus-input-validation-error-color, #da212c);margin-left:0.25rem;position:relative}.modus-time-picker .input-container{align-items:center;background-color:var(--modus-input-bg, #fff);border:0.0625rem solid var(--modus-input-border-color, #6a6e79);border-radius:4px;box-sizing:border-box;display:flex;flex-direction:row;height:2rem;position:relative;width:100%}.modus-time-picker .input-container input{background-color:transparent;background-position:right calc(0.375em + 0.1875rem) center;background-repeat:no-repeat;background-size:calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);border:none;color:var(--modus-input-color, #252a2e);font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:0.75rem;outline:none;padding:0 0.5rem;padding-right:calc(1.5em + 0.75rem);width:100%}.modus-time-picker .input-container input::placeholder{color:var(--modus-input-hint-text-color, #a3a6b1)}.modus-time-picker .input-container:hover{cursor:text}.modus-time-picker .input-container:focus-within{border-color:var(--modus-input-border-active-color, #217cbb);box-shadow:0 0 0 1px var(--modus-input-border-active-color, #217cbb)}.modus-time-picker .input-container.error{border-color:var(--modus-input-validation-error-color, #da212c);box-shadow:0 0 0 1px var(--modus-input-validation-error-color, #da212c)}.modus-time-picker .input-container.valid{border-color:var(--modus-input-validation-success-color, #006638);box-shadow:0 0 0 1px var(--modus-input-validation-success-color, #006638)}.modus-time-picker .input-container.large{height:3rem}.modus-time-picker .input-container.large input{font-size:0.875rem;padding:0 1rem}.modus-time-picker .input-container.large:focus-within,.modus-time-picker .input-container.large.error,.modus-time-picker .input-container.large.valid{height:2.9375rem}.modus-time-picker .input-container:has(input[readonly]){background-color:var(--modus-input-readonly-bg, #e0e1e9);border-color:transparent}.modus-time-picker .sub-text{font-size:0.75rem;margin-top:0.25rem}.modus-time-picker .sub-text.helper{color:var(--modus-input-label-color, #464b52);display:block;font-weight:600;margin:0}.modus-time-picker .sub-text.error{color:var(--modus-input-validation-error-color, #da212c)}.modus-time-picker .sub-text.valid{color:var(--modus-input-validation-success-color, #006638)}.modus-time-picker.large{font-size:0.875rem;height:48px}.modus-time-picker.disabled{pointer-events:none}.modus-time-picker.disabled .input-container{background-color:var(--modus-input-disabled-bg, #e0e1e9);border-color:transparent}.modus-time-picker.disabled .input-container input{background-color:transparent;border-radius:0;color:var(--modus-input-disabled-color, #a3a6b1);height:100%}',b=g,x=class{constructor(r){u(this,r),this.timeInputBlur=d(this,"timeInputBlur",7),this.valueChange=d(this,"valueChange",7),this.classBySize=new Map([["medium","medium"],["large","large"]]),this._maxLength=5,this.ampm=void 0,this.allowedCharsRegex=void 0,this.ariaLabel=void 0,this.autoFormat=void 0,this.autoFocusInput=void 0,this.disabled=void 0,this.disableValidation=void 0,this.errorText=void 0,this.helperText=void 0,this.label=void 0,this.min=void 0,this.max=void 0,this.placeholder=void 0,this.readOnly=void 0,this.required=void 0,this.size="medium",this.validText=void 0,this.value=void 0,this._timeDisplay=void 0}handleAmPmChange(r){this.handleAmPmDependencies(r)}handleValueChange(r){this._isEditing||(this._timeDisplay=this._formatter.formatTimeDisplay(r)),this.valueChange.emit({value:r,inputString:this._timeDisplay})}componentWillLoad(){this.handleAmPmDependencies(this.ampm),this._timeDisplay=this._formatter.formatTimeDisplay(this.value)}async focusInput(){this._timeInput.focus()}handleBlur(){var r;this._isEditing=!1;const e=(r=this._timeInput)===null||r===void 0?void 0:r.value;this.validateTimeInput(e),this.timeInputBlur.emit({value:this.value,inputString:e})}handleDefaultKeyDown(r,e){const t=r.code.toUpperCase();(t==="ENTER"||t==="SPACE")&&e()}handleInputChange(r){var e;r.stopPropagation(),r.preventDefault(),this._isEditing=!0;const t=(e=r.currentTarget)===null||e===void 0?void 0:e.value;this._timeDisplay=this._formatter.autoFormatTimeInput(t,this.autoFormat),this.value=this._formatter.parseTimeDisplay(this._timeDisplay)}handleInputKeyPress(r){const e=r.key,t=this._formatter.keyIsValidTimeCharacter(e,this.allowedCharsRegex);return t||r.preventDefault(),t}clearValidation(){this.errorText=null}getAriaControls(){return{"aria-invalid":!!this.errorText,"aria-label":this.ariaLabel||void 0,"aria-required":this.required}}handleAmPmDependencies(r){this._formatter=new f(r),this._maxLength=r?8:5}validateTimeInput(r){if(!this.disableValidation)if(!r)this.required?this.errorText="Required":this.clearValidation();else if(!this.value)this.errorText="Invalid time";else if(this.min||this.max){const e=new Date,t=this._formatter.setTimeOnDate(e,this.min),n=this._formatter.setTimeOnDate(e,this.max),i=this._formatter.setTimeOnDate(e,this.value);this.min&&i<t?this.errorText="Time input is lesser than minimum time allowed":this.max&&i>n?this.errorText="Time input is greater than maximum time allowed":this.clearValidation()}else this.clearValidation()}renderTimeInput(){const r=this.getAriaControls();return s("input",Object.assign({},r,{id:"time-input","aria-label":(this.label?null:this.ariaLabel)||void 0,"aria-placeholder":this.placeholder,disabled:this.disabled,onInput:e=>this.handleInputChange(e),placeholder:this.placeholder,readonly:this.readOnly,ref:e=>this._timeInput=e,tabIndex:0,type:"text",value:this._timeDisplay,autofocus:this.autoFocusInput,onBlur:()=>this.handleBlur(),maxLength:this._maxLength,onKeyPress:e=>this.handleInputKeyPress(e)}))}renderSubText(){return this.errorText?s("label",{class:"sub-text error"},this.errorText):this.validText?s("label",{class:"sub-text valid"},this.validText):null}render(){return s("div",{key:"c344689b86d18990cc4c003e77a3cd1837586aed",class:{"modus-time-picker":!0,disabled:this.disabled}},s("div",{key:"75eb15def70838fdf3c2f3cb7e5fcd42e6b173d4",class:"time-input-wrapper"},this.label||this.required?s("div",{class:"label-container"},this.label?s("label",{htmlFor:"time-input"},this.label):null,this.required?s("span",{class:"required"},"*"):null,this.helperText?s("label",{class:"sub-text helper"},this.helperText):null):null,s("div",{key:"4870c5600280829e12db2c44efbe5d69139ab161",class:`input-container ${this.errorText?"error":this.validText?"valid":""} ${this.classBySize.get(this.size)}`},this.renderTimeInput()),this.renderSubText()),s("div",{key:"4f8ee49d018277ec22755451e9f2d45889497312",class:"time-zone-wrapper"},s("slot",{key:"11e3d8d2626a7bc5c72696ca019690874ececf7a",name:"timeZone"})))}get element(){return m(this)}static get watchers(){return{ampm:["handleAmPmChange"],value:["handleValueChange"]}}};x.style=b;export{x as modus_time_picker};
