import{r as i,h as s,H as l,g as u}from"./index-BLVjpRyF.js";const b='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");:host{align-items:center;background-color:var(--modus-toolbar-bg, #fff);border-radius:4px;bottom:20px;box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.2);display:flex;padding:1px;position:fixed;right:20px;z-index:9999}modus-button{margin:2px !important}',d=b,c=class{constructor(o){i(this,o),this.ariaLabel=void 0,this.disabled=void 0}createButton(o){const r="modus-button",t=o.getAttribute("icon-only"),e=o.getAttribute("aria-label")||"button",n=o.textContent?o.textContent.trim():"";return s("modus-button",{ariaLabel:e,"button-style":"borderless",color:"secondary",class:r,disabled:this.disabled,"icon-only":t},n)}renderButtons(){return Array.from(this.host.children).map(t=>{if(t.tagName==="MODUS-BUTTON")return this.createButton(t);if(t.tagName==="MODUS-TOOLTIP"){const e=t.children[0],n=t.getAttribute("text"),a=t.getAttribute("position");if(e&&e.tagName==="MODUS-BUTTON")return s("modus-tooltip",{text:n,position:a},this.createButton(e))}else return s("modus-divider",null)})}render(){return s(l,{key:"e4df2e713914a285bba30e91f31523a86427eb77","aria-label":this.ariaLabel||void 0,role:"toolbar"},this.renderButtons())}get host(){return u(this)}};c.style=d;export{c as modus_toolbar};
