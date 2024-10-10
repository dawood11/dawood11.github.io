import{r as c,c as a,h as e}from"./index-DW1J9MVx.js";import{g as r}from"./utils-3803a333-Cc9HXbaG.js";import{M as l,I as h,a as m}from"./ModusIconMap-11e94e00-g2pIa7x6.js";import"./IconChevronLeft-f85188e7-Dh_pIGT1.js";import"./IconChevronRight-de7de2e8-C89F5eVh.js";import"./IconClose-9751af6c-B3qvT1M4.js";import"./IconExpand-27433628-Di9RdH_c.js";import"./IconVisibilityOn-4d4ac4d9-tmm-aumq.js";const p='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.accordion-item{background-color:var(--modus-accordion-item-bg, #fff);border-bottom:0.0625rem solid var(--modus-accordion-item-border-color, #cbcdd6);color:var(--modus-accordion-item-color, #252a2e);display:flex;flex-direction:column;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";position:relative}.accordion-item[aria-expanded=true] .header:has(div svg.icon-expand-more){border-left:4px solid var(--modus-accordion-item-expanded-border-left-color, #0063a3);padding-left:12px}.accordion-item:has(div svg.icon-expand-more) .body{box-shadow:4px 0 0 var(--modus-accordion-item-expanded-border-left-color, #0063a3) inset}.accordion-item .header{align-items:center;cursor:pointer;display:inline-flex;font-size:1rem;font-weight:600;height:48px;padding:0 16px}.accordion-item .header .icon{margin-top:4px}.accordion-item .header.disabled{cursor:auto;opacity:0.4}.accordion-item .header.expanded{color:var(--modus-accordion-item-header-expand-color, #252a2e)}.accordion-item .header.expanded:has(div svg.icon-expand-more){background-color:var(--modus-accordion-item-header-expanded-bg, #dcedf9)}.accordion-item .header:hover:not(.disabled){background-color:var(--modus-accordion-item-header-hover-bg, #e0e1e9)}.accordion-item .header.small{font-size:0.875rem;height:32px}.accordion-item .header .chevron-container{align-items:center;display:flex;margin-left:auto;transition:transform 0.2s ease-in-out}.accordion-item .header .chevron-container.reverse{transform:rotate(-180deg)}.accordion-item .header .chevron-container svg path{fill:var(--modus-chevron-color, #6a6e79)}.accordion-item .body{overflow:hidden}.accordion-item .body .body-content{font-size:0.875rem;padding:1rem}.accordion-item .body.collapse:not(.show){display:none}.accordion-item .body.collapsing{height:0;position:relative;transition:all 0.35s ease-out}@media (prefers-reduced-motion: reduce){.accordion-item .body.collapsing{transition:none}}.accordion-item:has(>.body.collapsing) .header:has(div svg.icon-expand-more){background-color:var(--modus-accordion-item-header-expanded-bg, #dcedf9);border-left:4px solid var(--modus-blue);padding-left:12px}',f=p,u=class{constructor(o){c(this,o),this.closed=a(this,"closed",7),this.opened=a(this,"opened",7),this.expandedContentId=r()+"_accordion-item",this.classBySize=new Map([["condensed","small"],["standard","standard"]]),this.reflow=d=>{},this.disabled=void 0,this.expandButtonType="standardArrow",this.expanded=void 0,this.headerText=void 0,this.icon=void 0,this.size="standard"}handleHeaderClick(){this.disabled||(this.chevronContainerRef.classList.toggle("reverse"),this.expanded?(this.accordionBodyRef.style.height=`${this.accordionBodyRef.getBoundingClientRect().height}px`,this.reflow(this.accordionBodyRef),this.accordionBodyRef.classList.add("collapsing"),this.accordionBodyRef.classList.remove("collapse"),this.accordionBodyRef.classList.remove("show"),this.accordionCloseTimeout=setTimeout(()=>{this.accordionBodyRef.classList.remove("collapsing"),this.accordionBodyRef.classList.add("collapse"),clearTimeout(this.accordionCloseTimeout),this.expanded=!1,this.closed.emit()},350),this.accordionBodyRef.style.height=""):(this.accordionBodyRef.classList.remove("collapse"),this.accordionBodyRef.classList.add("collapsing"),this.accordionBodyRef.style.height="0",this.accordionOpenTimeout=setTimeout(()=>{this.accordionBodyRef.classList.remove("collapsing"),this.accordionBodyRef.classList.add("show"),this.accordionBodyRef.classList.add("collapse"),clearTimeout(this.accordionOpenTimeout),this.expanded=!0,this.opened.emit()},350),this.accordionBodyRef.style.height=`${this.accordionBodyRef.scrollHeight}px`))}handleKeydown(o){o.code==="Enter"&&this.handleHeaderClick()}renderIcon(){return e("span",{class:"icon"},e(l,{icon:this.icon}))}render(){const o=`${this.classBySize.get(this.size)}`,d=`${this.disabled?"disabled":""}`,s=`${this.expanded?"expanded":""}`,t=`body ${o} collapse${this.expanded?" show":""}`,n=`header ${o} ${d} ${s}`;return e("div",{key:"e9f9be8a4b01ce99791b4c0dee521d09a1566fa1","aria-disabled":this.disabled?"true":void 0,"aria-expanded":this.expanded?"true":void 0,class:"accordion-item"},e("div",{key:"38a8ede0acd1b7fbeba51e978043546e759ef5f3",class:n,role:"button","aria-expanded":this.expanded?"true":"false","aria-controls":this.expandedContentId,onClick:()=>this.handleHeaderClick(),onKeyDown:i=>this.handleKeydown(i),tabIndex:this.disabled?-1:0},this.icon?this.renderIcon():null,e("span",{key:"e0d8001a9b079cfa636399c8551bcfb3de0a390c",class:"title"},this.headerText),e("div",{class:`chevron-container ${this.expanded?"reverse":""} `,ref:i=>this.chevronContainerRef=i},this.expandButtonType=="circleArrow"?e(h,{size:"24"}):e(m,{size:"24"}))),e("div",{key:"de48ff60b9911986e912528d85ae99511a14c0cf",id:this.expandedContentId,class:t,ref:i=>this.accordionBodyRef=i},e("div",{key:"825eca44853644c0070f10bf4c3252a25222e32f",class:"body-content"},e("slot",{key:"a8b5ca36212184a2f85e650cd40ad5baafa47358"}))))}};u.style=f;export{u as modus_accordion_item};
