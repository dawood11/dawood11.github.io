import{r as a,h as o}from"./index-BV6uoHa1.js";const r='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");div.badge{align-items:center;background-color:var(--modus-badge-primary-bg, #0063a3);border-radius:4px;color:var(--modus-badge-primary-color, #fff);display:inline-flex;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:0.75rem;font-weight:700;height:20px;padding:0 7px;position:relative}div.badge.color-danger{background-color:var(--modus-badge-danger-bg, #da212c);color:var(--modus-badge-danger-color, #fff)}div.badge.color-dark{background-color:var(--modus-badge-dark-bg, #252a2e);color:var(--modus-badge-dark-color, #fff)}div.badge.color-secondary{background-color:var(--modus-badge-secondary-bg, #6a6e79);color:var(--modus-badge-secondary-color, #fff)}div.badge.color-success{background-color:var(--modus-badge-success-bg, #006638);color:var(--modus-badge-success-color, #fff)}div.badge.color-tertiary{background-color:var(--modus-badge-tertiary-bg, #cbcdd6);color:var(--modus-badge-tertiary-color, #252a2e)}div.badge.color-warning{background-color:var(--modus-badge-warning-bg, #fbad26);color:var(--modus-badge-warning-color, #252a2e)}div.badge.type-text{background-color:unset;color:var(--modus-badge-text-primary, #0063a3)}div.badge.type-text.color-danger{color:var(--modus-badge-text-danger, #da212c)}div.badge.type-text.color-dark{color:var(--modus-badge-text-dark, #252a2e)}div.badge.type-text.color-secondary{color:var(--modus-badge-text-secondary, #6a6e79)}div.badge.type-text.color-success{color:var(--modus-badge-text-success, #006638)}div.badge.type-text.color-tertiary{color:var(--modus-badge-text-tertiary, #cbcdd6)}div.badge.type-text.color-warning{color:var(--modus-badge-text-warning, #e49325)}div.badge.type-counter{border-radius:20px}div.badge.size-small{border-radius:2px;font-size:0.625rem;height:14px;padding:0 4px}div.badge.size-small.type-counter{border-radius:14px}div.badge.size-large{font-size:1rem;height:28px;padding:0 12px}div.badge.size-large.type-counter{border-radius:28px}@media (forced-colors: active){.badge{outline:1px solid transparent}}',d=r,s=class{constructor(e){a(this,e),this.classByColor=new Map([["danger","color-danger"],["dark","color-dark"],["primary","color-primary"],["secondary","color-secondary"],["success","color-success"],["tertiary","color-tertiary"],["warning","color-warning"]]),this.classBySize=new Map([["small","size-small"],["medium","size-medium"],["large","size-large"]]),this.classByType=new Map([["counter","type-counter"],["default","type-default"],["text","type-text"]]),this.ariaLabel=void 0,this.color="primary",this.size="medium",this.type="default"}render(){const e=`badge ${this.classByColor.get(this.color)} ${this.classBySize.get(this.size)} ${this.classByType.get(this.type)}`;return o("div",{key:"3d67a735e88171cdb16e4d2b3254fed8532fa039","aria-label":this.ariaLabel||void 0,class:e,role:"status"},o("slot",{key:"e60c8c096a0f4e36e60b3dd5f5d04ce495d2fe65"}))}};s.style=d;export{s as modus_badge};
