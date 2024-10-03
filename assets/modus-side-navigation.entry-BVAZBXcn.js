import{r as p,c as m,h as l,g as f}from"./index-Y87iKhnt.js";import{I as _}from"./IconChevronLeft-f85188e7-DrAI8Hab.js";const x=({data:e,itemSelected:i,tabIndex:t})=>e!=null&&e.length?e==null?void 0:e.map(({id:a,disabled:s,selected:n,label:o,menuIcon:v,children:d,onSideNavItemClicked:r,options:h})=>{const c=h?Object.fromEntries(h):{},u=d!=null&&d.length?{showExpandIcon:!0,disableSelection:!0}:{};return l("modus-side-navigation-item",Object.assign({id:a,disabled:s,selected:n||i===a,label:o,menuIcon:v,onSideNavItemClicked:g=>r&&r(g)},u,{tabIndex:t},c))}):null,b='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");:host{display:block}.side-nav-panel{background-color:var(--modus-side-navigation-bg, #fff);box-shadow:1px 0 4px rgba(36, 35, 45, 0.3);height:100%;min-width:4rem !important;position:absolute;transition:all 0.2s ease-out 0s;width:4rem;z-index:1029}.side-nav-panel.expanded{overflow:hidden;transition:all 0.25s ease-in 0s !important;width:16rem}.side-nav-panel:not(.expanded) .side-nav-level:not(.center){display:none}.side-nav-panel .side-nav-level{position:absolute;transition:all 0.4s linear 0s;width:100%}.side-nav-panel .side-nav-level:not(.center){opacity:0;transition-duration:0.25s}.side-nav-panel .side-nav-level .side-nav-menu{height:100%;margin:0%;padding:0%;transition:all 0.4s linear 0s;width:100%}.side-nav-panel .side-nav-level .collapse:not(.show){display:none}.side-nav-panel .side-nav-level .collapsing{height:0;opacity:0;position:relative;transition:height 0.25s ease-in 0s}.side-nav-panel .side-nav-level .level-heading{color:var(--modus-side-navigation-item-color, #252a2e);display:flex;flex-direction:column;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;padding-left:1.25rem}.side-nav-panel .side-nav-level .level-heading svg.icon-chevron-left-thick{padding-right:1rem}.side-nav-panel .side-nav-level .level-heading svg.icon-chevron-left-thick path{fill:var(--modus-side-navigation-item-chevron-color, #252a2e)}.side-nav-panel .side-nav-level .level-heading:focus{border:none;outline:none}.side-nav-panel .side-nav-level .level-heading p{align-items:center;display:flex;margin-block-end:0}.side-nav-panel .side-nav-level .level-heading p a{padding-left:1rem}.side-nav-panel .side-nav-level .level-heading h4{margin-block-end:1em}.side-nav-panel .side-nav-level .level-heading a{color:var(--modus-side-navigation-link-color, #217cbb);cursor:pointer;font-size:0.875rem !important}.side-nav-panel .side-nav-level .level-heading a:hover{text-decoration:underline}.side-nav-panel .side-nav-level.left .side-nav-menu{transform:translateX(-100%)}.side-nav-panel .side-nav-level.center .side-nav-menu{transform:translate(0%)}.side-nav-panel .side-nav-level.right .side-nav-menu{transform:translate(100%)}@media (prefers-reduced-motion){.side-nav-level,.side-nav-menu,.side-nav-panel{transition-duration:0s !important}.side-nav-level.expanded,.side-nav-menu.expanded,.side-nav-panel.expanded{transition-duration:0s !important}}',L=b,C=class{constructor(e){p(this,e),this.sideNavExpand=m(this,"sideNavExpand",7),this._callbackQueue=[],this._children={},this._minWidth="4rem",this._retainFocus=!1,this.reflow=i=>{},this.collapseOnClickOutside=!0,this.data=void 0,this.maxWidth="256px",this.mode="overlay",this.expanded=!1,this.targetContent=void 0,this._navigationLevels=[]}componentDidRender(){var e;!((e=this._callbackQueue)===null||e===void 0)&&e.length&&this._callbackQueue.forEach(i=>i&&i()),this._callbackQueue=[]}componentWillLoad(){this.handleExpandedChange(this.expanded),this.initializeLevelInfo(this.data)}documentClickHandler(e){!this.collapseOnClickOutside||this.element.contains(e.target)||e.defaultPrevented||(this.expanded=!1)}getNextLevel(e){var i;if(!((i=this._navigationLevels)===null||i===void 0)&&i.length){const t=this._navigationLevels[this._navigationLevels.length-1].children;return t==null?void 0:t.find(a=>a.id===e)}return null}gotoNextLevel(e){var i;if(!((i=this._navigationLevels)===null||i===void 0)&&i.length){const t=this.getNextLevel(e);if(t!=null&&t.children){const a=[...this._navigationLevels||[]];return a.push(Object.assign(Object.assign({},t),{levelPosition:"right"})),this._navigationLevels=[...a],this.expanded=!0,this._callbackQueue.push(()=>{const s=[...this._navigationLevels];s.forEach((n,o)=>{o===s.length-2?n.levelPosition="left":o===s.length-1&&(n.levelPosition="center")}),this._navigationLevels=[...s],this._retainFocus=!0}),!0}}return!1}gotoPreviousLevel(){var e,i;if(!(!((e=this._navigationLevels)===null||e===void 0)&&e.length)||((i=this._navigationLevels)===null||i===void 0?void 0:i.length)===1)return!1;const t=[...this._navigationLevels];return t.forEach((a,s)=>{t.length>1?s===t.length-2?a.levelPosition="center":s===t.length-1&&(a.levelPosition="right"):a.levelPosition="center"}),this._navigationLevels=[...t],this._callbackQueue.push(()=>{this._timeout=setTimeout(()=>{t.pop(),this._navigationLevels=[...t],this._retainFocus=!0,clearTimeout(this._timeout)},250)}),!0}handleItemAdded(e){var i;!((i=e.detail)===null||i===void 0)&&i.id&&(this._children[e.detail.id]=e.detail,this._children[e.detail.id].expanded=this.expanded),this.itemChanged(e)}handleItemRemoved(e){var i;!((i=e.detail)===null||i===void 0)&&i.id&&delete this._children[e.detail.id],this.itemChanged(e)}handleItemFocus(e){this.setFocusItem(e.detail.id)}handleItemClick(e){this.gotoNextLevel(e.detail.id)||(this._itemSelected&&(this._children[this._itemSelected].selected=!1,this._itemSelected=null),this._itemSelected=e.detail.selected?e.detail.id:null)}handleDataChange(e){this.initializeLevelInfo(e)}handleExpandedChange(e){var i;const t=()=>{Object.values(this._children).forEach(o=>o.expanded=e)},a=()=>{this.setTargetContentMargin(e,this.mode,this.targetContent)},s=()=>{var o;(o=this.sideNavExpand)===null||o===void 0||o.emit(this.expanded)},n=(i=this._levelsContainerRef)===null||i===void 0?void 0:i.querySelector(".side-nav-level.center .level-heading");n?e?(n.classList.remove("collapse"),n.classList.add("collapsing"),n.style.height="0",this._timeout=setTimeout(()=>{n.classList.remove("collapsing"),n.classList.add("show"),n.style.height="",clearTimeout(this._timeout),t(),s()},150),n.style.height=`${n.scrollHeight}px`,a()):(t(),n.style.height=`${n.getBoundingClientRect().height}px`,this.reflow(n),n.classList.add("collapsing"),this._timeout=setTimeout(()=>{n.classList.remove("show"),n.classList.remove("collapsing"),n.classList.add("collapse"),clearTimeout(this._timeout),s()},300),n.style.height="0px",a()):(t(),a(),s())}handleModeChange(e){this.setTargetContentMargin(this.expanded,e,this.targetContent)}handleTargetChange(e){this.setTargetContentMargin(this.expanded,this.mode,e)}handleBackClick(e){var i;const t=(i=e.code)===null||i===void 0?void 0:i.toUpperCase();t?(t==="ENTER"||t==="SPACE")&&this.gotoPreviousLevel():this.gotoPreviousLevel(),e.stopPropagation()}handleKeyDown(e){var i,t;if(e.defaultPrevented)return;const a=e.code.toUpperCase();let s=!1;if(!(e.altKey||!this._firstChild)){switch(a){case"SPACE":case"ENTER":e.stopPropagation();break;case"ARROWDOWN":const n=(i=this._children[this._itemInFocus])===null||i===void 0?void 0:i.nextElementSibling;n==null||n.focusItem(),s=!0;break;case"ARROWUP":const o=(t=this._children[this._itemInFocus])===null||t===void 0?void 0:t.previousElementSibling;o==null||o.focusItem(),s=!0;break;case"ARROWRIGHT":this.expanded&&this.gotoNextLevel(this._itemInFocus);break;case"ARROWLEFT":this.expanded&&this.gotoPreviousLevel();break}s&&(e.preventDefault(),e.stopPropagation())}}handleLevelsContainerRef(e){this._levelsContainerRef=e,this._retainFocus&&e.focus(),this._retainFocus=!1}handleLevelHeadingRef(e){e==null||e.focus()}initializeLevelInfo(e){e!=null&&e.length?this._navigationLevels=[{id:null,label:null,children:e,levelPosition:"center"}]:this._navigationLevels=null}itemChanged(e){const i=Object.keys(this._children);this._firstChild=i[0],e.preventDefault(),e.stopPropagation()}setTargetContentMargin(e,i,t){const a=document.querySelector(t);a&&(a.style.marginLeft=e&&i==="push"?this.maxWidth:this._minWidth)}setFocusItem(e){this._itemInFocus=e}render(){return l("nav",{key:"bdeaa37cdf3b1f0b39999fd1a79d4b9f46e095e3",class:`side-nav-panel${this.expanded?" expanded":""}`,style:{width:this.expanded?this.maxWidth:null},onKeyDown:e=>this.handleKeyDown(e),"aria-label":"side navigation"},this.data?l("div",{tabindex:-1,ref:e=>this.handleLevelsContainerRef(e)},this._navigationLevels.map((e,i)=>l("div",{class:`side-nav-level ${e.levelPosition}`,"aria-hidden":e.levelPosition!=="center"?"true":null},i!==0&&l("div",Object.assign({class:"level-heading"},e.levelPosition==="center"?{tabindex:0,ref:t=>this.handleLevelHeadingRef(t)}:{}),l("p",null,l(_,{size:"24"}),l("a",{tabIndex:0,onClick:t=>this.handleBackClick(t),onKeyDown:t=>this.handleBackClick(t)},"Back")),l("h4",null,e.label)),l("div",null,l("ul",{class:"side-nav-menu",role:"tree"},l(x,{data:e.children,itemSelected:this._itemSelected,tabIndex:e.levelPosition==="center"?void 0:-1})))))):l("div",{class:"side-nav-level center"},l("ul",{class:"side-nav-menu",role:"tree"},l("slot",null))))}get element(){return f(this)}static get watchers(){return{data:["handleDataChange"],expanded:["handleExpandedChange"],mode:["handleModeChange"],targetContent:["handleTargetChange"]}}};C.style=L;export{C as modus_side_navigation};
