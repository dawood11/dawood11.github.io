import{r as o,c as t,h as i,g as n}from"./index-BE0d3zOq.js";import{M as a}from"./ModusIconMap-11e94e00-CVinFWOL.js";import"./IconChevronLeft-f85188e7-gH03cjH-.js";import"./IconChevronRight-de7de2e8-CgTwv4kR.js";import"./IconClose-9751af6c-DmOVeLCc.js";import"./IconExpand-27433628-CGcHW5_I.js";import"./IconVisibilityOn-4d4ac4d9-Bg3OTNkw.js";const l='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");:host{display:block}.side-nav-item{align-items:center;background-color:var(--modus-side-navigation-item-bg, #fff);color:var(--modus-side-navigation-item-color, #252a2e);cursor:pointer;display:flex;fill:var(--modus-side-navigation-item-icon-color, #252a2e);height:3rem;position:relative;transition:top, left, height, width, opacity 0.2s ease-out 0s;z-index:1030}.side-nav-item svg path{fill:var(--modus-side-navigation-item-icon-color, #252a2e)}.side-nav-item:hover:not(.disabled):not(.selected){background-color:var(--modus-side-navigation-item-hover-bg, #e0e1e9)}.side-nav-item .menu-icon{align-items:center;display:flex;justify-content:center;padding-left:1.25rem;z-index:1030}.side-nav-item .menu-icon modus-tooltip{height:1.5rem;width:1.5rem}.side-nav-item .menu-icon img{filter:var(--modus-side-navigation-item-icon-filter)}.side-nav-item .menu-text{font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:0.875rem;overflow:hidden;padding-left:1rem;text-overflow:clip;white-space:nowrap}.side-nav-item .level-icon{align-items:center;display:flex;justify-content:center;margin-left:auto;padding:0 2px}.side-nav-item .level-icon svg path{fill:var(--modus-side-navigation-item-chevron-color, #252a2e)}.side-nav-item.expanded{transition:top, left, height, width, opacity 0.25s ease-in 0s}.side-nav-item.expanded .level-icon{padding:0 1rem}.side-nav-item.selected{background-color:var(--modus-side-navigation-item-active-bg, #217cbb);box-shadow:inset 0 0 2px var(--modus-side-navigation-item-active-border-color, #217cbb);color:var(--modus-side-navigation-item-active-color, #fff)}.side-nav-item.selected .menu-icon img{filter:var(--modus-side-navigation-item-icon-active-filter, invert(95%) sepia(100%) saturate(0%) hue-rotate(151deg) brightness(104%) contrast(105%))}.side-nav-item.selected svg path{fill:var(--modus-side-navigation-item-icon-active-color, #fff)}.side-nav-item.disabled{opacity:var(--modus-side-navigation-item-disabled-opacity, 0.3)}',c=l,m=class{constructor(e){o(this,e),this.sideNavItemClicked=t(this,"sideNavItemClicked",7),this.sideNavItemFocus=t(this,"sideNavItemFocus",7),this._sideNavItemAdded=t(this,"_sideNavItemAdded",7),this._sideNavItemRemoved=t(this,"_sideNavItemRemoved",7),this.disabled=!1,this.disableSelection=!1,this.expanded=!1,this.label=void 0,this.menuIcon=void 0,this.selected=!1,this.showExpandIcon=!1}async focusItem(){var e;(e=this._itemRef)===null||e===void 0||e.focus()}connectedCallback(){this._sideNavItemAdded.emit(this.element)}disconnectedCallback(){this._sideNavItemRemoved.emit(this.element)}handleClick(){var e;this.disabled||(this.selected=this.disableSelection?this.selected:!this.selected,(e=this.sideNavItemClicked)===null||e===void 0||e.emit({id:this.element.id,selected:this.selected}))}handleKeyDown(e){(e.code.toUpperCase()==="ENTER"||e.code.toUpperCase()==="SPACE")&&this.handleClick()}render(){const e={"side-nav-item":!0,expanded:this.expanded,selected:this.selected,disabled:this.disabled},d=this.label;return i("modus-tooltip",{key:"86d79a136323525593f0a5af94e08ebe69fce07a",text:d,disabled:this.disabled,position:"right"},i("li",{key:"55dd43616d35edf3d3dc9388d5d3ad7dec3cbb1e",role:"treeitem",ref:s=>this._itemRef=s,tabIndex:this.disabled?-1:0,class:e,onClick:()=>this.handleClick(),onKeyDown:s=>this.handleKeyDown(s),"aria-disabled":this.disabled?"true":null,"aria-label":this.label,"aria-current":this.selected?"true":null,onFocus:()=>this.sideNavItemFocus.emit({id:this.element.id})},i("div",{key:"9f235f37b8caebfdec3a26d237534cc02e1f7af8",class:"menu-icon",onClick:()=>this.sideNavItemFocus.emit({id:this.element.id})},i("slot",{key:"3254cba587a59efc119a647bb374fdec7cf26812",name:"menu-icon"}),this.menuIcon&&i(a,{icon:this.menuIcon,"aria-label":this.label,size:"24"})),this.expanded&&i("div",{class:"menu-text"},this.label),i("div",{key:"522bee5267eaad80c7df73c5469408fbfe9ee619",class:"level-icon"},this.showExpandIcon&&i(a,{icon:"chevron_right",size:this.expanded?"24":"16"}))))}get element(){return n(this)}};m.style=c;export{m as modus_side_navigation_item};
