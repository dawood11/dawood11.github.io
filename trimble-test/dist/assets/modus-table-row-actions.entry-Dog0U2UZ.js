import{r as u,c as d,h as i,F as h,H as w}from"./index-WUpoemBa.js";const f='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");modus-table-row-actions{align-items:center;display:flex;gap:8px;justify-content:center}',m=f,v=class{constructor(t){u(this,t),this.overflowRowActions=d(this,"overflowRowActions",7),this.row=void 0,this.context=void 0}handleMoreButtonClick(t,e){const{left:n,top:o,height:l}=this.overflowButtonRef.getBoundingClientRect();this.overflowRowActions.emit({componentId:this.context.componentId,actions:e,position:{x:n,y:o+l},row:this.row,onClose:()=>this.overflowButtonRef.focusButton()}),t.preventDefault()}handleMoreButtonKeydown(t,e){t.key.toLowerCase()==="enter"&&(this.handleMoreButtonClick(t,e),t.preventDefault())}handleActionButtonClick(t,e){const{rowActionClick:n}=this.context;n.emit({actionId:e,row:this.row.original}),t.preventDefault()}handleActionButtonKeydown(t,e){t.key.toLowerCase()==="enter"&&(this.handleActionButtonClick(t,e),t.preventDefault())}render(){const{rowActions:t}=this.context;let e,n;return t&&(e=t.filter(o=>!o.isOverflow),n=t.filter(o=>o.isOverflow)),i(w,{key:"8350a91bfd70d6399a0e1792ac3c00b429b9c5ad"},e==null?void 0:e.map(({label:o,icon:l,id:r,isDisabled:c=()=>!1})=>{const a=c(this.row.original);return i("modus-button",{class:"row-actions","button-style":"borderless",color:"secondary","icon-only":l,size:"small",ariaLabel:o,disabled:a,onKeyDown:s=>this.handleActionButtonKeydown(s,r),onClick:s=>a?s.preventDefault():this.handleActionButtonClick(s,r)})}),(n==null?void 0:n.length)>0&&i(h,null,i("modus-button",{ref:o=>this.overflowButtonRef=o,class:"row-actions-menu-button","button-style":"borderless",color:"secondary","icon-only":"more_vertical",ariaLabel:"overflow button",size:"small",onKeyDown:o=>this.handleMoreButtonKeydown(o,n),onClick:o=>this.handleMoreButtonClick(o,n)})))}};v.style=m;export{v as modus_table_row_actions};
