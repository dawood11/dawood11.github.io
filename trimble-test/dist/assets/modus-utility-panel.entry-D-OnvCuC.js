import{r as s,c as a,h as t,F as l,g as i}from"./index-DfRQ9eJw.js";const o='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");:host{--panel-padding:1rem}.utility-panel{background-color:var(--modus-utility-panel-bg, #fff);box-shadow:0 0 10px rgba(0, 0, 0, 0.5);color:var(--modus-utility-panel-color, #000);height:100%;position:absolute;right:-324px;top:0;transition:right 0.3s ease-out;width:312px}.utility-panel.open{right:0;transition:right 0.3s ease-out}.utility-panel .overlay{height:100%;position:absolute;right:0;top:0;width:100%}.utility-panel .panel-content{display:flex;flex-direction:column;height:100%}.utility-panel .panel-content .panel-header,.utility-panel .panel-content .panel-footer{align-items:center;display:flex;height:50px;padding:0 var(--panel-padding)}.utility-panel .panel-content .panel-body{flex:1;overflow:auto;padding:var(--panel-padding)}.utility-panel .panel-content hr{border:none;border-top:1px solid #cbcdd6;margin:0}',d=o,r=class{constructor(e){s(this,e),this.panelOpened=a(this,"panelOpened",7),this.panelClosed=a(this,"panelClosed",7),this.handlePanelClose=()=>{this.closePanel()},this.expanded=!1,this.pushContent=!1,this.targetContent=void 0}handleExpandedChange(e){e?this.openPanel():this.closePanel()}async openPanel(){this.panelOpened.emit(),this.pushContent&&this.adjustContent()}async closePanel(){this.panelClosed.emit(),this.pushContent&&this.adjustContent()}adjustContent(){const e=document.querySelector(this.targetContent);e&&(e.style.transition="margin-right 0.2s ease-out",this.expanded?e.style.marginRight="312px":e.style.marginRight="0")}hasSlotContent(e){return!!this.el.querySelector(`[slot="${e}"]`)}render(){const e=this.hasSlotContent("header"),n=this.hasSlotContent("footer");return t("div",{key:"5b6407fdf464a29dffef00e9b0972c795a05318e",class:{"utility-panel":!0,open:this.expanded,overlay:!this.pushContent}},t("div",{key:"57df595135741093fe21fa4400053f2f34763393",class:"panel-content"},e&&t(l,null,t("div",{class:"panel-header","aria-labelledby":"header"},t("slot",{name:"header"})),t("hr",null)),t("div",{key:"cfd3e968d9d78ceb0d1a2f04c923747d55ba034f",class:"panel-body","aria-labelledby":"body"},t("slot",{key:"59cb2bc025128a8bea72f2804ec66b4f8630cab8",name:"body"})),n&&t(l,null,t("hr",null),t("div",{class:"panel-footer","aria-labelledby":"footer"},t("slot",{name:"footer"})))))}get el(){return i(this)}static get watchers(){return{expanded:["handleExpandedChange"]}}};r.style=d;export{r as modus_utility_panel};
