import{r as d,c as a,h as o,F as c,g as u}from"./index-CL0pXAO9.js";import{I as h}from"./icon-close-f75c05f5-CR2WEXFQ.js";import{I as m,a as f}from"./IconExpand-27433628-DIHlyjek.js";const b=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function p(e){const t=parseInt(e.getAttribute("tabindex"),10);return Number.isNaN(t)?/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)?0:e.tabIndex:t}function y(e){return!(e.disabled||e.ariaHidden==="true"||e.tagName==="INPUT"&&e.type==="hidden"||v(e))}const v=function(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const n=function(i){return e.ownerDocument.querySelectorAll('input[type="radio"][name="'+i+'"]')}(e.name),s=g(n,e.form);return!(!s||s===e)},g=function(e,t){for(let n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]},x=function(e){const t=[],n=[];return e.getAttributeNode?(Array.from(e.querySelectorAll(b)).forEach((s,i)=>{const r=p(s);r===-1||!y(s)||(r===0?t.push(s):n.push({documentOrder:i,tabIndex:r,node:s}))}),n.sort((s,i)=>s.tabIndex===i.tabIndex?s.documentOrder-i.documentOrder:s.tabIndex-i.tabIndex).map(s=>s.node).concat(t)):[]},l=({id:e,ref:t,onFocus:n})=>o("div",{id:e,ref:t,tabindex:"0","aria-hidden":"true",onFocus:s=>n&&n(s)});class C{constructor(t,n){this.tababbleNodes=[],t&&(this.tababbleNodes=x(t)),this.startWrap=n}onStartWrapFocus(){var t;!((t=this.tababbleNodes)===null||t===void 0)&&t.length&&this.tababbleNodes[0].focus()}onEndWrapFocus(){this.startWrap.focus()}}const k='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.modus-modal{align-items:center;background-color:var(--modus-modal-backdrop-bg, rgba(37, 42, 46, 0.7490196078));font-size:0.875rem;height:100%;justify-content:center;left:0;overflow:auto;position:fixed;top:0;width:100%}.modus-modal.visible{display:inline-flex}.modus-modal.hidden{display:none}.modus-modal .content{background-color:var(--modus-modal-bg, #fff);border:1px solid var(--modus-modal-border-color, rgba(0, 0, 0, 0.2));border-radius:0.25rem;color:var(--modus-modal-color, #252a2e);display:flex;fill:var(--modus-modal-color, #252a2e);flex-direction:column;justify-content:center;max-width:650px;min-width:300px;outline:0}.modus-modal .content header{align-items:center;display:flex;font-size:1rem;font-weight:700;height:64px;justify-content:space-between;padding:0 1rem}.modus-modal .content header.scrollable{border-bottom:1px solid var(--modus-modal-divider-color, #e0e1e9)}.modus-modal .content header .icon-close,.modus-modal .content header .icon-expand,.modus-modal .content header .icon-collapse{cursor:pointer}.modus-modal .content header .icon-close path,.modus-modal .content header .icon-expand path,.modus-modal .content header .icon-collapse path{fill:var(--modus-modal-close-color, #252a2e)}.modus-modal .content header .icon-close:hover path,.modus-modal .content header .icon-expand:hover path,.modus-modal .content header .icon-collapse:hover path{opacity:var(--modus-modal-close-hover-opacity, 0.75)}.modus-modal .content .header-buttons{align-items:center;display:flex;gap:0.5rem;justify-content:center}.modus-modal .content .header-buttons div{font-size:0}.modus-modal .content .body{height:auto;max-height:calc(100dvh - 188px);overflow-y:auto;padding:1rem}.modus-modal .content footer{padding:1.25rem 1rem}.modus-modal .content footer.scrollable{border-top:1px solid var(--modus-modal-divider-color, #e0e1e9)}.modus-modal .content footer.has-buttons{align-items:center;display:flex;gap:0.5rem;justify-content:flex-end}.modus-modal.fullscreen{overflow:hidden}.modus-modal.fullscreen .content{height:calc(100% - 64px);max-width:none;width:calc(100% - 64px)}.modus-modal.fullscreen .content .body{flex-grow:1}',B=k,T=class{constructor(e){d(this,e),this.closed=a(this,"closed",7),this.opened=a(this,"opened",7),this.primaryButtonClick=a(this,"primaryButtonClick",7),this.secondaryButtonClick=a(this,"secondaryButtonClick",7),this.ignoreOverlayClick=!1,this.ariaLabel=void 0,this.headerText=void 0,this.primaryButtonAriaLabel=void 0,this.primaryButtonDisabled=void 0,this.primaryButtonText=void 0,this.secondaryButtonAriaLabel=void 0,this.secondaryButtonDisabled=void 0,this.secondaryButtonText=void 0,this.zIndex="1",this.backdrop="default",this.showFullscreenToggle=!1,this.fullscreen=!1,this.isContentScrollable=!1,this.visible=void 0}async close(){return this.visible=!1,this.closed.emit(),Promise.resolve()}async open(){return this.visible=!0,this.opened.emit(),Promise.resolve()}toggleFullscreen(){this.fullscreen=!this.fullscreen}handleModalContentMouseDown(){this.ignoreOverlayClick=!0}documentKeyHandler(e){e.code.toUpperCase()==="ESCAPE"&&this.close()}handleOverlayClick(e){switch(this.backdrop){case"static":return;case"default":if(this.ignoreOverlayClick||!e.target.classList.contains("overlay")){this.ignoreOverlayClick=!1;return}this.close()}}handleEnterKeydown(e,t){e.code==="Enter"&&t()}handlePrimaryClick(){this.primaryButtonDisabled||this.primaryButtonClick.emit()}handleSecondaryClick(){this.secondaryButtonDisabled||this.secondaryButtonClick.emit()}componentDidRender(){this.modalContentRef&&this.startTrapRef&&(this.focusWrapping=new C(this.modalContentRef,this.startTrapRef)),this.modalBodyRef&&(this.resizeObserver=new ResizeObserver(()=>{this.checkContentScrollable()}),this.resizeObserver.observe(this.modalBodyRef)),this.checkContentScrollable()}disconnectedCallback(){this.resizeObserver&&this.resizeObserver.disconnect()}checkContentScrollable(){this.modalContentRef&&(this.isContentScrollable=this.modalBodyRef.scrollHeight>this.modalBodyRef.clientHeight)}renderModal(){return o("div",{class:"content",ref:e=>this.modalContentRef=e,onMouseDown:()=>this.handleModalContentMouseDown()},o(l,{id:"startTrap",ref:e=>this.startTrapRef=e,onFocus:()=>{var e;return(e=this.focusWrapping)===null||e===void 0?void 0:e.onStartWrapFocus()}}),this.renderModalHeader(),o("div",{class:"body",ref:e=>this.modalBodyRef=e},o("slot",null)),this.renderModalFooter(),o(l,{id:"endTrap",onFocus:()=>{var e;return(e=this.focusWrapping)===null||e===void 0?void 0:e.onEndWrapFocus()}}))}renderModalHeader(){return o("header",{class:{scrollable:this.isContentScrollable}},this.headerText,o("div",{class:"header-buttons"},this.showFullscreenToggle&&o("div",{role:"button",tabindex:0,"aria-label":this.fullscreen?"Collapse":"Expand",onClick:()=>this.toggleFullscreen(),onKeyDown:e=>this.handleEnterKeydown(e,()=>this.toggleFullscreen())},this.fullscreen?o(m,{size:"24"}):o(f,{size:"24"})),o("div",{role:"button",tabindex:0,"aria-label":"Close",onClick:()=>this.close(),onKeyDown:e=>this.handleEnterKeydown(e,()=>this.close())},o(h,{size:"24"}))))}renderModalFooter(){return o(c,null,o("footer",{class:{"has-buttons":!!(this.primaryButtonText||this.secondaryButtonText),scrollable:this.isContentScrollable}},this.secondaryButtonText&&o("modus-button",{disabled:this.secondaryButtonDisabled,"button-style":"outline",color:"secondary",ariaLabel:this.secondaryButtonAriaLabel,onButtonClick:()=>this.handleSecondaryClick()},this.secondaryButtonText),this.primaryButtonText&&o("modus-button",{disabled:this.primaryButtonDisabled,color:"primary",ariaLabel:this.primaryButtonAriaLabel,onButtonClick:()=>this.handlePrimaryClick()},this.primaryButtonText),o("slot",{name:"footerContent"})))}render(){return o("div",{key:"dfda165b390622411602b7ffa6afca91bc35fb87","aria-hidden":this.visible?void 0:"true","aria-label":this.visible&&this.ariaLabel||void 0,"aria-modal":this.visible?"true":void 0,class:`modus-modal ${this.fullscreen?"fullscreen":""} overlay ${this.visible?"visible":"hidden"}`,onClick:e=>this.handleOverlayClick(e),role:this.visible?"dialog":void 0,style:{zIndex:this.zIndex}},this.renderModal())}get el(){return u(this)}};T.style=B;export{T as modus_modal};
