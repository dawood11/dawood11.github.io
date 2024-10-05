import{r as n,c as l,h as i,g as r}from"./index-aKSBkonU.js";import{c as a}from"./popper-0fbeff6d-BQBsAJpH.js";const c='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.modus-action-bar{align-items:center;display:flex;gap:0}.modus-action-bar .overflow-menu{display:none;position:absolute;z-index:1}.modus-action-bar .overflow-menu.show{display:block}',h=c,u=class{constructor(e){n(this,e),this.actionBarClick=l(this,"actionBarClick",7),this.showOverflowMenu=!1,this.actions=void 0,this.size="medium",this.visibleItemCount=3}componentWillLoad(){this.processChildren()}componentDidRender(){this.initializePopper()}handleGlobalFocus(e){if(!(e.target instanceof HTMLElement))return;const o=e.target.localName==="modus-tree-view-item";!this.el.contains(e.target)&&!o&&this.showOverflowMenu&&this.closeOverflowMenu()}processChildren(){const e=this.el.querySelectorAll("modus-action-item");if(e.length>0){const o=Array.from(e);this.actions=o.map(t=>({id:t.getAttribute("id"),icon:t.getAttribute("icon"),label:t.textContent.trim()}))}}initializePopper(){this.popperInstance=a(this.overflowButtonElement,this.overflowMenuElement,{placement:"bottom-end"})}handleKeyDown(e,o){e&&e.key!=="Enter"&&e.key!==" "||this.handleButtonClick(e,o)}handleOverflowClick(e){e.preventDefault(),e.stopPropagation(),this.toggleOverflowMenu()}handleOverflowKeyDown(e){e&&e.key!=="Enter"&&e.key!==" "||this.handleOverflowClick(e)}handleButtonClick(e,o){e.preventDefault(),e.stopPropagation(),this.actionBarClick.emit({actionId:o.id}),this.showOverflowMenu&&this.closeOverflowMenu()}toggleOverflowMenu(){this.showOverflowMenu=!this.showOverflowMenu,this.showOverflowMenu&&this.popperInstance.update()}closeOverflowMenu(){this.showOverflowMenu=!1}render(){const e=this.actions.length>this.visibleItemCount?this.actions.slice(0,this.visibleItemCount-1):this.actions,o=this.actions.length>this.visibleItemCount?this.actions.slice(this.visibleItemCount-1):null;return i("div",{key:"e02cb0ae28cefc61170f22ad384fed9cea70af7b",class:"modus-action-bar"},e.map(t=>i("modus-tooltip",{text:t.label},i("modus-button",{"icon-only":t.icon,buttonStyle:"borderless",color:"secondary",size:this.size,onClick:s=>this.handleButtonClick(s,t),onKeyDown:s=>this.handleKeyDown(s,t)},t.label))),this.actions.length>this.visibleItemCount&&i("modus-button",{ref:t=>this.overflowButtonElement=t,"icon-only":"more_vertical",buttonStyle:"borderless",color:"secondary",size:this.size,onClick:t=>this.handleOverflowClick(t),onKeyDown:t=>this.handleOverflowKeyDown(t)}),this.showOverflowMenu&&i("div",{style:{width:"200px",display:this.showOverflowMenu?"block":"none"},class:"overflow-menu",ref:t=>this.overflowMenuElement=t},i("modus-list",null,o.map(t=>i("modus-list-item",{size:this.size==="small"?"condensed":"standard",onClick:s=>this.handleButtonClick(s,t),onKeyDown:s=>this.handleKeyDown(s,t),leftIcon:t.icon},t.label)))))}get el(){return r(this)}};u.style=h;export{u as modus_action_bar};
