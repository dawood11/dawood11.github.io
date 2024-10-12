import{r as l,h as i,g as r,c as n}from"./index-DxyYfQe3.js";import{I as d}from"./icon-check-1a61d8f4-DG07MYvt.js";import{M as a}from"./ModusIconMap-11e94e00-D1GsY9gf.js";import"./IconChevronLeft-f85188e7-JcvnE_JL.js";import"./IconChevronRight-de7de2e8-jcNIcQ0j.js";import"./IconClose-9751af6c-BuF-JwZZ.js";import"./IconExpand-27433628-CyzvvdvN.js";import"./IconVisibilityOn-4d4ac4d9-CopZSzCi.js";const c='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");ul{border-radius:0.25rem;display:flex;flex-direction:column;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";list-style:none;margin:0;padding:0;position:relative}',m=c,h=class{constructor(e){l(this,e)}handleKeyDown(e){const o=this.element.children.length;if(e.key.toLowerCase()==="arrowdown"){const s=Array.prototype.indexOf.call(this.element.children,e.target);let t=this.element.children.item((s+1)%o);for(;t!=null&&t.disabled;)t=this.element.children.item((s+2)%o);t==null||t.focusItem(),e.preventDefault()}if(e.key.toLowerCase()==="arrowup"){const s=Array.prototype.indexOf.call(this.element.children,e.target);let t=this.element.children.item((s-1)%o);for(;t!=null&&t.disabled;)t=this.element.children.item((s-2)%o);t==null||t.focusItem(),e.preventDefault()}}render(){return i("ul",{key:"736a3b1e1b49cfef17e38f3cf46461dbd3f688ef",part:"list-items",onKeyDown:e=>this.handleKeyDown(e)},i("slot",{key:"185e7bdd4c8d27b9d0c78af47db1ea4a76685608"}))}get element(){return r(this)}};h.style=m;const f='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");li{align-items:center;background-color:var(--modus-list-item-bg, #fff);border:1px solid var(--modus-list-item-border-color, #e0e1e9);border-radius:4px;box-sizing:border-box;color:var(--modus-list-item-color, #252a2e);display:flex;fill:var(--modus-list-item-color, #252a2e);font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";gap:1rem;justify-content:space-between;min-height:2.5rem;padding:0.375rem 0.75rem}li .text-container{display:flex;flex-direction:column;flex-grow:1;justify-content:center;min-width:0}li .slot{font-size:0.875rem;line-height:1.125rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}li .sub-text{display:block;font-size:0.75rem;line-height:1rem}li .wrap{word-wrap:break-word}li .no-wrap{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}li .icon-check{flex-shrink:0;margin-left:auto}li.borderless,li.borderless:hover:not(.disabled){border:none}li:hover:not(.disabled){background-color:var(--modus-list-item-hover-bg, #e0e1e9);border:1px solid var(--modus-list-item-border-color, #e0e1e9);color:var(--modus-list-item-color, #252a2e);fill:var(--modus-list-item-color, #252a2e)}li.small{gap:0.625rem;min-height:2rem;padding:0.25rem 0.625rem}li.small .slot{font-size:0.75rem;line-height:0.875rem}li.small .sub-text{font-size:0.625rem;line-height:0.75rem}li.large{min-height:3rem;padding:0.625rem 1rem}li.disabled{color:var(--modus-list-item-disabled-color, #b7b9c3);cursor:default;fill:var(--modus-list-item-disabled-color, #b7b9c3)}li.selected{background-color:var(--modus-list-item-selected-bg, #dcedf9);border:1px solid var(--modus-list-item-selected-border-color, #dcedf9);color:var(--modus-list-item-color, #252a2e);fill:var(--modus-list-item-color, #252a2e)}',b=f,u=class{constructor(e){l(this,e),this.itemClick=n(this,"itemClick",7),this.classBySize=new Map([["condensed","small"],["standard","standard"],["large","large"]]),this.borderless=void 0,this.disabled=void 0,this.selected=void 0,this.leftIcon=void 0,this.size="standard",this.subText=void 0,this.wrapSubText=!0,this.type="standard"}async focusItem(){var e;(e=this.listItemRef)===null||e===void 0||e.focus()}handleKeydown(e){e.key.toLowerCase()==="enter"&&!this.disabled&&this.itemClick.emit()}render(){const e=`${this.classBySize.get(this.size)} ${this.disabled?"disabled":""} ${this.selected?"selected":""} ${this.borderless?"borderless":""}`,o=this.size==="condensed"?"16":"24";return i("li",{key:"c97f89b0f60a33c31724c333d530d40099fba009",ref:s=>this.listItemRef=s,class:e,tabIndex:this.disabled?-1:0,onClick:()=>this.disabled?null:this.itemClick.emit(),onKeyDown:s=>this.handleKeydown(s)},this.leftIcon&&i("span",{class:"icon left-icon"},i(a,{icon:this.leftIcon,size:"24"})),i("div",{key:"1056fa568c426956c63dbc77894bf76abd923ad9",class:"text-container"},i("span",{key:"4beca0a38e0455008f30ee42a6eef4750adb9281",class:"slot"},i("slot",{key:"61c9b46b7092fd7a4ea15a2421bb2030b69c89a7"})),this.subText&&i("span",{class:"sub-text "+(this.wrapSubText?"wrap":"no-wrap")},this.subText)),this.selected&&i(d,{size:o}))}};u.style=b;export{h as modus_list,u as modus_list_item};
