import{r as l,h as s,H as n}from"./index-DaFYpnQF.js";const d='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.modus-progress-bar{display:flex;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";height:1rem;outline:0.0625rem solid var(--modus-progress-border-color, #6a6e79);overflow:hidden;position:relative;width:100%}.modus-progress-bar.default-background-color{background-color:var(--modus-progress-bg, #fff)}.modus-progress-bar .progress{display:flex;font-size:0.75rem;forced-color-adjust:none;justify-content:center;overflow:hidden;transition:width 0.6s ease}.modus-progress-bar .progress.default-color{background-color:var(--modus-progress-bar-bg, #0063a3)}.modus-progress-bar .progress.default-text-color{color:#fff}.modus-progress-bar .progress.indeterminate{animation:indeterminate-animation 1.5s infinite linear;background-color:var(--modus-progress-bar-bg, #0063a3);height:100%;overflow:hidden;position:relative;width:100%}.modus-progress-bar.small{height:0.5rem}.modus-progress-bar.compact{height:0.25rem}@keyframes indeterminate-animation{0%{left:-50%;width:50%}50%{left:25%;width:50%}100%{left:100%;width:50%}}',m=d,c=class{constructor(e){l(this,e),this.classBySize=new Map([["default","default"],["small","small"],["compact","compact"]]),this.ariaLabel=void 0,this.backgroundColor=void 0,this.color=void 0,this.maxValue=100,this.minValue=0,this.mode="determinate",this.size="default",this.text=void 0,this.textColor=void 0,this.value=0}getProgressStyle(e){return{backgroundColor:this.color,color:this.textColor,width:this.mode==="determinate"?`${e}%`:"100%"}}getProgressBarStyle(){return{backgroundColor:this.backgroundColor}}render(){const e=(this.value-this.minValue)/(this.maxValue-this.minValue)*100,r=this.backgroundColor?"":"default-background-color",o=this.color?"":"default-color",t=this.textColor?"":"default-text-color",a=`
      modus-progress-bar
      ${r}
      ${this.classBySize.get(this.size)}
     `,i=`progress ${o} ${t} ${this.mode==="indeterminate"?"indeterminate":"determinate"}`;return s(n,{key:"6b8160b6afd54531d4b4f85fdd35063bb3ec6da8","aria-label":this.ariaLabel,"aria-valuemax":this.mode==="determinate"?this.maxValue:null,"aria-valuemin":this.mode==="determinate"?this.minValue:null,"aria-valuenow":this.mode==="determinate"?this.value:null,role:"progressbar"},s("div",{key:"e02f6f771594ec9aeb4cd79e387b1f9cb411121d",class:a,style:this.getProgressBarStyle()},s("div",{key:"4e9d595b956160dcf2f1fb78ceca3ec0638425e2",class:i,style:this.getProgressStyle(e)},this.size==="default"&&this.mode==="determinate"&&this.text)))}};c.style=m;export{c as modus_progress_bar};
