import{r as i,c as n,h as t,F as r}from"./index-BV6uoHa1.js";import{M as a}from"./ModusIconMap-11e94e00-BO6I5Yi1.js";import"./IconChevronLeft-f85188e7-DsV53OQL.js";import"./IconChevronRight-de7de2e8-q58BGHAK.js";import"./IconClose-9751af6c-CabSP6uj.js";import"./IconExpand-27433628-Cl2bQfgs.js";import"./IconVisibilityOn-4d4ac4d9-BFtAlp1d.js";const l='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.modus-tabs{border:solid var(--modus-tab-bottom-line-color, #cbcdd6);border-width:0 0 0.0625rem 0;display:inline-flex;flex-direction:row;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";justify-content:flex-start;width:100%}.modus-tabs.medium{height:48px}.modus-tabs.small{height:32px}.modus-tabs .tab{align-items:center;background-color:transparent;border:solid transparent 0.1875rem;border-radius:0.25rem 0.25rem 0 0;color:var(--modus-tab-color, #252a2e);display:flex;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-weight:600;justify-content:center;overflow:hidden;text-transform:uppercase;text-wrap:none;user-select:none}.modus-tabs .tab .icon{align-items:center;display:flex;flex:0 0 auto;pointer-events:none}.modus-tabs .tab .icon.left-icon{padding-right:0.5rem}.modus-tabs .tab .icon.right-icon{padding-left:0.5rem}.modus-tabs .tab.resizable{width:100%}.modus-tabs .tab.medium{font-size:0.875rem;padding:0 32px}.modus-tabs .tab.small{font-size:0.75rem;padding:0 1rem}.modus-tabs .tab.active{border-color:transparent transparent var(--modus-tab-active-color, #217cbb) transparent;color:var(--modus-tab-active-color, #217cbb)}.modus-tabs .tab:hover{background-color:var(--modus-tab-hover-bg, #dcedf9);color:var(--modus-tab-hover-color, #217cbb);cursor:pointer}',c=l,d=class{constructor(s){i(this,s),this.tabChange=n(this,"tabChange",7),this.classBySize=new Map([["medium","medium"],["small","small"]]),this.fullWidth=!1,this.ariaLabel=void 0,this.size="medium",this.tabs=[]}handleKeyDown(s,e){s.code==="Enter"&&this.handleTabChange(e)}handleTabChange(s){const e=this.tabs.find(o=>o.active);(e==null?void 0:e.id)!==s&&(this.tabs=this.tabs.map(o=>Object.assign(Object.assign({},o),{active:o.id===s})),this.tabChange.emit(s))}renderIconWithText(s,e,o){return t(r,null,e&&t("span",{class:"icon left-icon"},t(a,{icon:e,size:this.size==="small"?"16":"24"})),t("span",{class:"label"},s),o&&t("span",{class:"icon right-icon"},t(a,{icon:o,size:this.size==="small"?"16":"24"})))}renderIconOnly(s){return t("span",{class:"icon"},t(a,{icon:s,size:this.size==="small"?"16":"24"}))}render(){const s=this.tabs.map(e=>t("button",{id:`${e.id}`,class:`tab ${e.active?"active":""} ${this.classBySize.get(this.size)} ${this.fullWidth?"resizable":""} `,onClick:()=>this.handleTabChange(e.id),onKeyDown:o=>this.handleKeyDown(o,e.id)},e.iconOnly?this.renderIconOnly(e.iconOnly):this.renderIconWithText(e.label,e.leftIcon,e.rightIcon)));return t("div",{"aria-label":this.ariaLabel||void 0,class:`modus-tabs ${this.classBySize.get(this.size)}`},s)}};d.style=c;export{d as modus_tabs};
