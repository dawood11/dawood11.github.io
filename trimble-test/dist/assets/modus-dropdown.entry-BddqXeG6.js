import{r as b,c as w,h as t,g as v}from"./index-DmR7bow2.js";const y='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");:host{font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";position:relative}:host .dropdown.disabled{pointer-events:none}:host .dropdown:hover{cursor:pointer}:host .dropdown-list{border-collapse:collapse;border-radius:0.25rem;display:none;max-height:200px;max-width:300px;opacity:1;overflow-x:hidden;overflow-y:auto;position:absolute;transition:opacity 0.2s ease-in-out;z-index:1}:host .dropdown-list.animate-list{display:block;opacity:0;visibility:hidden}:host .dropdown-list.visible{display:block;opacity:1;visibility:visible}:host .dropdown-list.list-border{border:1px solid var(--modus-dropdown-list-border-color, #6a6e79)}:host .dropdown-list.top{bottom:0}:host .dropdown-list.right{top:0}:host .dropdown-list.left{right:0;top:0}',C=y,k=class{constructor(e){b(this,e),this.dropdownClose=w(this,"dropdownClose",7),this.classByPlacement=new Map([["top","top"],["right","right"],["bottom","bottom"],["left","left"]]),this.dropdownToggleClicked=!1,this.animateList=!1,this.ariaLabel=void 0,this.customPlacement=void 0,this.disabled=void 0,this.placement="bottom",this.showDropdownListBorder=!0,this.toggleElementId=void 0,this.visible=void 0}componentDidRender(){if(this.toggleElement=this.el.querySelector(`#${this.toggleElementId}`),!this.toggleElement)throw Error("matching element not found for toggle-element-id");this.disabled&&this.toggleElement.setAttribute("disabled",String(this.disabled))}documentClickHandler(e){if(this.dropdownToggleClicked||e.target.closest(`#${this.toggleElementId}`)){this.dropdownToggleClicked=!1;return}this.visible&&this.hideDropdown()}documentKeyDownHandler(e){if(e.key==="Enter"||e.key===" "){if(this.disabled)return;if(this.dropdownToggleClicked||e.target.closest(`#${this.toggleElementId}`)){this.dropdownToggleClicked=!1;return}else this.hideDropdown()}e.key==="Escape"&&this.visible&&(this.hideDropdown(),this.dropdownToggleClicked=!1)}onDisabledChange(e){this.toggleElement.setAttribute("disabled",String(e))}hideDropdown(){this.visible=!1,this.dropdownClose.emit()}handleDropdownClick(e){this.disabled||(e.target.closest(`#${this.toggleElementId}`)?this.visible=!this.visible:this.visible=!1,this.visible?this.dropdownToggleClicked=!0:this.dropdownClose.emit())}render(){var e,o,i,s,l,d,n,r,a,h,c;const p=`dropdown-list ${this.visible?"visible":"hidden"} ${this.showDropdownListBorder?"list-border":""} ${this.animateList?"animate-list":""} ${this.classByPlacement.get(this.placement)}`,m=this.placement==="right"?`${(e=this.toggleElement)===null||e===void 0?void 0:e.offsetWidth}px`:"unset",g=`${!((o=this.toggleElement)===null||o===void 0)&&o.offsetWidth?(i=this.toggleElement)===null||i===void 0?void 0:i.offsetWidth:0}px`,f={dropdown:!0,disabled:this.disabled};return t("div",{key:"e32fb0fe72497f32e7a90b2e48767c383ef57622","aria-label":this.ariaLabel||void 0,class:f,onClick:u=>this.handleDropdownClick(u)},t("slot",{key:"0a031d19e07eec95f2d24de69ab4decc03adc3e4",name:"dropdownToggle"}),t("div",{key:"237ea451c9d1ce9422fd606f7f35fd59625c140e",class:p,style:{top:!((s=this.customPlacement)===null||s===void 0)&&s.top?`${(l=this.customPlacement)===null||l===void 0?void 0:l.top}px`:"",right:!((d=this.customPlacement)===null||d===void 0)&&d.right?`${(n=this.customPlacement)===null||n===void 0?void 0:n.right}px`:"",left:!((r=this.customPlacement)===null||r===void 0)&&r.left?`${(a=this.customPlacement)===null||a===void 0?void 0:a.left}px`:m,bottom:!((h=this.customPlacement)===null||h===void 0)&&h.bottom?`${(c=this.customPlacement)===null||c===void 0?void 0:c.bottom}px`:"","min-width":g}},t("slot",{key:"7d2041fcc99fd43f1109f11e8330e8df006c07c3",name:"dropdownList"})))}get el(){return v(this)}static get watchers(){return{disabled:["onDisabledChange"]}}};k.style=C;export{k as modus_dropdown};
