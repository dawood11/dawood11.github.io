import{r as u,c as d,h as a,H as c,g as b}from"./index-Bt15QsBU.js";const r="single",h="multiple",l="none",o="selected",f='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");:host{display:flex}:host slot::slotted(modus-button){display:block;margin:0;--btn-border-radius:0;--btn-border-left-width:0.0625rem;--btn-border-right-width:0}:host slot::slotted(modus-button:first-child){--btn-border-radius:0.25rem 0 0 0.25rem}:host slot::slotted(modus-button:last-child){--btn-border-radius:0 0.25rem 0.25rem 0;--btn-border-right-width:0.0625rem}:host slot::slotted(modus-button:only-child){--btn-border-radius:0.25rem}',p=f,g=class{constructor(e){u(this,e),this.buttonGroupClick=d(this,"buttonGroupClick",7),this.buttonSelectionChange=d(this,"buttonSelectionChange",7),this.selectedButtons=[],this.observer=null,this.ariaDisabled=void 0,this.ariaLabel=void 0,this.buttonStyle="outline",this.color="primary",this.disabled=void 0,this.selectionType=l,this.size="medium"}selectionTypeChanged(e){e===l&&(this.selectedButtons.forEach(t=>t.setActive(!1)),this.selectedButtons=[])}disabledChanged(){this.setupButtons(!0)}sizeChanged(){this.setupButtons()}componentWillLoad(){this.setupButtons()}componentDidLoad(){this.observer=new MutationObserver(this.handleMutations.bind(this)),this.observer.observe(this.host,{subtree:!0,attributes:!0,attributeFilter:[o]})}disconnectedCallback(){var e;(e=this.observer)===null||e===void 0||e.disconnect()}handleSlotChange(){this.setupButtons()}handleButtonClick(e){const t=e.target;if(this.selectionType!==l){switch(this.selectionType){case r:this.toggleSingleSelect(t);break;case h:this.toggleMultiSelect(t);break}this.buttonSelectionChange.emit(this.selectedButtons),this.buttonGroupClick.emit({button:t,isSelected:this.selectedButtons.includes(t)})}}handleMutations(e){for(const t of e)t.type==="attributes"&&t.attributeName===o&&this.setupButtons()}handleButtonSelection(e,t){t?(e.setActive(!0),this.selectedButtons.push(e)):(e.setActive(!1),this.selectedButtons.includes(e)&&(this.selectedButtons=this.selectedButtons.filter(i=>i!==e)))}setupButtons(e){customElements.whenDefined("modus-button").then(()=>{const t=this.host.querySelectorAll("modus-button");this.renderButtons(t,e)})}renderButtons(e,t){const i=this.determineButtonType();let n=!1;e.forEach(s=>{t?(s.ariaDisabled=this.ariaDisabled,s.disabled=this.disabled):(s.ariaDisabled=s.ariaDisabled||this.ariaDisabled,s.disabled=s.disabled||this.disabled),s.buttonStyle=this.buttonStyle,s.color=this.color,s.size=this.size,s.type=i,s.hasAttribute(o)&&!n&&this.selectionType==r?(this.handleButtonSelection(s,s.getAttribute(o)!=="false"),n=!0):s.hasAttribute(o)&&this.selectionType==h?this.handleButtonSelection(s,s.getAttribute(o)!=="false"):this.handleButtonSelection(s,!1)})}determineButtonType(){return this.selectionType===l?"button":"toggle"}toggleMultiSelect(e){const t=this.selectedButtons.includes(e);e.setActive(!t),this.selectedButtons=t?this.selectedButtons.filter(i=>i!==e):[...this.selectedButtons,e]}toggleSingleSelect(e){const t=this.selectedButtons.includes(e);this.selectedButtons.forEach(i=>i.setActive(!1)),this.selectedButtons=t?[]:[e],t||e.setActive(!0)}render(){return a(c,{key:"20aec0bddc1da17b8e61d51602a5078dd49be591","aria-label":this.ariaLabel,"aria-disabled":this.ariaDisabled?this.ariaDisabled:this.disabled?"true":void 0,role:"group"},a("slot",{key:"d9aedf10849ff87c9fcd3fce51af47db48faaf93"}))}get host(){return b(this)}static get watchers(){return{selectionType:["selectionTypeChanged"],disabled:["disabledChanged"],buttonStyle:["sizeChanged"],color:["sizeChanged"],size:["sizeChanged"]}}};g.style=p;export{g as modus_button_group};
