import{r as o,c as i,h as e}from"./index-C64-WZAi.js";const n='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");nav{font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:0.875rem;position:relative}nav ol{align-items:center;display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0.625rem 0}nav ol li .crumb a{color:var(--modus-link-color, #217cbb);cursor:pointer;text-decoration:none}nav ol li .crumb a:hover{text-decoration:underline}nav ol li .crumb a:active{color:var(--modus-breadcrumb-item-active-color, #6c757d);text-decoration:none}nav ol li .crumb.underline a{text-decoration:underline}nav ol li .crumb .divider{color:var(--modus-breadcrumb-divider-color, #6c757d);cursor:default;padding:0 0.5rem}nav ol li .last-crumb{color:var(--modus-breadcrumb-item-active-color, #6c757d)}',s=n,l=class{constructor(a){o(this,a),this.crumbClick=i(this,"crumbClick",7),this.ariaLabel=void 0,this.crumbs=[],this.underlineLinks=void 0}render(){return e("nav",{key:"dd4973ca7376fe9f3a407c1b2b2a7df5aa4dee03","aria-label":this.ariaLabel||void 0},e("ol",{key:"c4f4f45b97aaccef1d87ce26d9fa55621416d386"},this.crumbs.map((a,r)=>e("li",{key:a.id},r<this.crumbs.length-1?e("span",{class:`crumb ${this.underlineLinks?"underline":""}`},e("a",{onClick:()=>this.crumbClick.emit(a)},a.display),e("span",{class:"divider"},">")):e("span",{class:"last-crumb","aria-current":"page"},a.display)))))}};l.style=s;export{l as modus_breadcrumb};
