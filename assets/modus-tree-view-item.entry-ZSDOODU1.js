import{r as w,c as r,h as s,g as y}from"./index-B_LCcD6u.js";import{M as x}from"./ModusIconMap-11e94e00-DcfIODtd.js";import{T as S}from"./modus-content-tree.constants-b1c2cf71-Ddv897wd.js";import"./IconChevronLeft-f85188e7-euCT3vxT.js";import"./IconChevronRight-de7de2e8-CHGaBy5_.js";import"./IconClose-9751af6c-B7b8go7o.js";import"./IconExpand-27433628-Dt5uqsd5.js";import"./IconVisibilityOn-4d4ac4d9-GVZh8wi6.js";const D='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.tree-item{align-items:center;background-color:var(--modus-tree-view-item-bg, #fff);border:0.0625rem solid var(--modus-tree-view-item-border-color, #e0e1e9);color:var(--modus-tree-view-item-color, #252a2e);cursor:pointer;display:flex;fill:var(--modus-tree-view-item-color, #252a2e);flex-direction:row;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:1rem;justify-content:space-between;min-height:2.375rem;width:100%}.tree-item svg path{fill:var(--modus-tree-view-item-color, #252a2e)}.tree-item .icon-chevron-right-thick path,.tree-item .icon-chevron-down-thick path{fill:var(--modus-chevron-color, #90939f)}.tree-item.borderless{border:none}.tree-item.disabled{color:var(--modus-tree-view-item-disabled-color, rgba(37, 42, 46, 0.3019607843));cursor:default !important}.tree-item.disabled svg path{fill:var(--modus-tree-view-item-disabled-color, rgba(37, 42, 46, 0.3019607843))}.tree-item.drop-allow{box-shadow:0 -2px 0 var(--modus-tree-view-item-drag-border-color, #217cbb) !important}.tree-item.drop-block{box-shadow:0 -2px 0 var(--modus-tree-view-item-drag-error-border-color, #da212c) !important}.tree-item .d-none{display:none !important}.tree-item .hidden{visibility:hidden}.tree-item:hover:not(.disabled){background-color:var(--modus-tree-view-item-hover-bg, #e0e1e9)}.tree-item .icon-slot{align-items:center;display:flex;justify-content:center;margin-left:0.3rem;width:1.5rem}.tree-item .icon-slot.drag-icon{cursor:grab !important;width:1rem}.tree-item .icon-slot.drag-icon svg{height:1rem;width:1rem}.tree-item .icon-slot .inline-flex{display:inline-flex}.tree-item .icon-slot .rotate-right{transform:rotate(-90deg)}.tree-item .label-slot{overflow:hidden;padding-left:0.5rem;padding-right:0.5rem;text-overflow:ellipsis;white-space:nowrap;width:100%}.tree-item.large{min-height:2.875rem}.tree-item.selected{background-color:var(--modus-tree-view-item-selected-bg, #dcedf9);border-color:var(--modus-tree-view-item-selected-border-color, #dcedf9)}.tree-item.small{font-size:0.75rem;min-height:1.875rem}.tree-item-container{display:flex;flex-direction:column;position:relative}.tree-item-container.selected-indicator::before{box-shadow:inset 0.3rem 0 0 0 var(--modus-tree-view-item-selected-indicator-color, #217cbb);content:"";height:100%;left:0;position:absolute;right:0;width:0.3rem;z-index:5}.tree-item-group{display:none;margin:0;padding:0;width:100%}.tree-item-group.expanded{display:block}.tree-item.is-children{border-bottom:none;border-top:none}.tree-item.expanded{border-bottom:none}.tree-item.is-last-child{border-bottom:0.0625rem solid var(--modus-tree-view-item-border-color, #e0e1e9)}',E=D;var L=function(e,t){var i={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(i[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var d=0,n=Object.getOwnPropertySymbols(e);d<n.length;d++)t.indexOf(n[d])<0&&Object.prototype.propertyIsEnumerable.call(e,n[d])&&(i[n[d]]=e[n[d]]);return i};const O=class{constructor(e){w(this,e),this.checkboxClick=r(this,"checkboxClick",7),this.itemLabelChange=r(this,"itemLabelChange",7),this.itemClick=r(this,"itemClick",7),this.itemSelectionChange=r(this,"itemSelectionChange",7),this.itemExpandToggle=r(this,"itemExpandToggle",7),this.itemAdded=r(this,"itemAdded",7),this.actionClick=r(this,"actionClick",7),this.SLOT_COLLAPSE_ICON="collapseIcon",this.SLOT_DRAG_ICON="dragIcon",this.SLOT_EXPAND_ICON="expandIcon",this.SLOT_ITEM_ICON="itemIcon",this.SLOT_LABEL="label",this.CustomSlot=t=>{var{name:i,className:n,defaultContent:d,display:a=!0}=t,l=L(t,["name","className","defaultContent","display"]);const c=!this.slots.has(i)&&d;return s("div",Object.assign({},l,{class:`${n||""} ${a?"":"d-none"}`}),s("slot",{name:i,onSlotchange:()=>this.handleDefaultSlotChange()}),c&&d)},this.disabled=void 0,this.draggableItem=void 0,this.droppableItem=void 0,this.editable=void 0,this.label=void 0,this.nodeId=void 0,this.tabIndexValue=0,this.actions=void 0,this.isLastChild=void 0,this.isExpanded=void 0,this.isChildren=void 0,this.childrenIds=void 0,this.forceUpdate={},this.slots=new Map}handleActionBarClick(e){const t=e.detail.actionId;this.actionClick.emit({actionId:t}),e.stopPropagation(),e.preventDefault()}connectedCallback(){this.options&&this.options.onItemAdd(this.element)}componentDidRender(){this.refLabelInput&&this.editable&&this.refLabelInput.focusInput(),this.element.querySelectorAll("modus-tree-view-item").forEach(t=>{t.setChildren()})}async setChildren(){this.isChildren=!0}componentWillLoad(){this.itemAdded.emit(this.element),this.handleDefaultSlotChange()}disconnectedCallback(){var e;(e=this.options)===null||e===void 0||e.onItemDelete(this.nodeId)}async focusItem(){this.refItemContent.focus()}async focusCheckbox(){this.refCheckbox&&this.refCheckbox.focusCheckbox()}getChildrenIds(){return Array.from(this.element.children).map(e=>e.nodeId).filter(e=>e)}handleCheckboxClick(e){if(this.shouldHandleEvent(e)){const{onCheckboxSelection:t,hasItemChecked:i}=this.options;t(this.nodeId),this.checkboxClick.emit(i(this.nodeId))}}handleDefaultKeyDown(e,t){switch(e.code){case"Space":case"Enter":t(),e.preventDefault();break}}handleDefaultSlotChange(){const e=this.element.querySelectorAll("[slot]"),t=new Map;let i=e.length!==this.slots.size;e.forEach(n=>{t.set(n.slot,!0),i=!this.slots.get(n.slot)||i}),i&&(this.slots=new Map(t))}handleDrag(e){if(this.shouldHandleEvent(e)){e.preventDefault();const t=this.refItemContent.cloneNode(!0);this.options.onItemDrag(this.nodeId,t,e)}}handleDragKeyDown(e){const t=this.refItemContent.cloneNode(!0);this.options.onItemDragClick(this.nodeId,t,e)}handleExpandToggle(e){if(this.shouldHandleEvent(e)){const{onItemExpandToggle:t,hasItemExpanded:i}=this.options;t(this.nodeId),this.isExpanded=i(this.nodeId),this.itemExpandToggle.emit(i(this.nodeId))}}handleFocus(){const{onItemFocus:e,hasItemFocus:t}=this.options||{};t(this.nodeId)||e(this.nodeId)}handleItemClick(e){if(!e.defaultPrevented&&this.shouldHandleEvent(e)){const{onItemSelection:t,hasItemSelected:i}=this.options;t(this.nodeId,e),this.itemClick.emit(i(this.nodeId)),e.ctrlKey||this.itemSelectionChange.emit({isSelected:i(this.nodeId),nodeId:this.nodeId})}}handleKeyDownTreeItem(e){if(!e.defaultPrevented)switch(e.code){case"Space":this.handleExpandToggle(e),e.preventDefault(),e.stopPropagation();break;case"Enter":this.draggableItem||(this.handleItemClick(e),e.stopPropagation());break}}handleLabelInputClick(e){e.stopPropagation()}handleLabelInputBlur(){this.updateLabelInput()}handleLabelInputKeyDown(e){switch(e.code){case"Enter":e.preventDefault(),this.itemLabelChange.emit(this.refLabelInput.value),this.updateLabelInput();break}}handlePropDisabledChange(e){var t;(t=this.options)===null||t===void 0||t.onItemUpdate({nodeId:this.nodeId,disabled:e})}handlePropNodeIdChange(e,t){var i;(i=this.options)===null||i===void 0||i.onItemUpdate({nodeId:e},{nodeId:t})}handleRefItemContent(e){var t;this.refItemContent=e,(t=this.options)===null||t===void 0||t.onItemUpdate({nodeId:this.nodeId,content:e})}handleTreeSlotChange(){var e,t;const i=this.getChildrenIds(),n=this.childrenIds&&i?this.childrenIds.length!==i.filter(d=>this.childrenIds.includes(d)).length:((e=this.childrenIds)===null||e===void 0?void 0:e.length)!==(i==null?void 0:i.length);if(this.options){const{onItemUpdate:d,multiCheckboxSelection:a,onCheckboxSelection:l}=this.options;d({nodeId:this.nodeId,children:[...i]}),!((t=this.childrenIds)===null||t===void 0)&&t.length&&this.childrenIds.length!==(i==null?void 0:i.length)&&a&&l(this.nodeId,!0)}this.childrenIds=n?[...i]:this.childrenIds}async initTreeViewItem(e){var t;this.options=Object.assign({},e),this.handleTreeSlotChange(),this.updateComponent(),this.setDraggableState((t=this===null||this===void 0?void 0:this.options)===null||t===void 0?void 0:t.draggable),this.tabIndexValue=this.options.disableTabbing?-1:this.tabIndexValue}rootOptions(){var e;if(this.options){const{checkboxSelection:t,multiCheckboxSelection:i,showSelectionIndicator:n,size:d,borderless:a,draggable:l,getLevel:c,hasItemSelected:u,hasItemDisabled:m,hasItemIndeterminate:f,hasItemExpanded:h,hasItemChecked:I}=this.options,g=u(this.nodeId),p=I(this.nodeId),b=f(this.nodeId),v=h(this.nodeId),C=c(this.nodeId),o=m(this.nodeId),k=n(this.nodeId);return{selected:g,checked:p,indeterminate:b,expanded:v,expandable:!!(!((e=this.childrenIds)===null||e===void 0)&&e.length),level:C,checkboxSelection:t,multiCheckboxSelection:i,size:d,borderless:a,draggable:l,isDisabled:o,selectionIndicator:k}}else return{level:1}}shouldHandleEvent(e){return e&&e.stopPropagation(),this.options&&!this.options.hasItemDisabled(this.nodeId)}async updateComponent(){this.forceUpdate=Object.assign({},this.forceUpdate)}updateLabelInput(){this.refLabelInput&&(this.label=this.refLabelInput.value),this.refLabelInput=null,this.editable=!1}setDraggableState(e=!1){this.draggableItem===!1||this.droppableItem===!1||e&&(this.draggableItem=this.droppableItem=e)}render(){var e;const{selected:t,checked:i,indeterminate:n,expanded:d,expandable:a,level:l,checkboxSelection:c,multiCheckboxSelection:u,size:m,borderless:f,isDisabled:h,selectionIndicator:I}=this.rootOptions(),g=Object.assign(Object.assign({"aria-level":l,"aria-selected":t?"true":"false","aria-disabled":h?"true":"false"},a?{"aria-expanded":d?"true":"false"}:{}),{role:"treeitem"}),p=`${S.get(m||"standard")}`,b=h?-1:this.tabIndexValue,v=`tree-item ${this.isExpanded?"expanded":""} ${this.isChildren?"is-children":""} ${this.isLastChild&&!this.isExpanded?"is-last-child":""}${t?"selected":""} ${p} ${h?"disabled":""} ${f?"borderless":""}`,C=`tree-item-group ${p} ${d?"expanded":""}`;return s("li",Object.assign({key:"6c11727312a9da9c698a000ab499d77d17a9083a"},g,{class:`tree-item-container${I?" selected-indicator":""}`}),s("div",{key:"6f3daf03326c867f89339979e0dbc3589f38fb47",class:v,onFocus:()=>this.handleFocus(),onClick:o=>this.handleItemClick(o),onKeyDown:o=>this.handleKeyDownTreeItem(o),ref:o=>this.handleRefItemContent(o),tabindex:b},s(this.CustomSlot,{key:"c5862d02088a56b58eda0f58967944f536064af5",className:`icon-slot drag-icon${this.draggableItem?"":" hidden"}`,defaultContent:s(x,{icon:"drag_indicator"}),name:this.SLOT_DRAG_ICON,tabIndex:0,onKeyDown:o=>this.handleDragKeyDown(o),onMouseDown:o=>this.handleDrag(o)}),s("div",{key:"fca4f08e7c9e600565393430fb6a4c06e596f5d6","aria-disabled":"true",style:{paddingLeft:`${(l-1)*.5}rem`}}),s("div",{key:"6f70897cb5a9b19216d74fef3f95f4c106d77b36",class:`icon-slot${a?"":" hidden"}`,onClick:o=>this.handleExpandToggle(o),onKeyDown:o=>this.handleDefaultKeyDown(o,()=>this.handleExpandToggle(o)),tabindex:a?b:-1},s(this.CustomSlot,{key:"c325d754b884eec3f09e9623b103b21294a62a8b",className:"inline-flex rotate-right",defaultContent:s(x,{icon:"expand_more",size:"24"}),display:!d,name:this.SLOT_EXPAND_ICON}),s(this.CustomSlot,{key:"0101249dad0c21887710576bbfa6aec421ae30c0",className:"inline-flex",defaultContent:s(x,{icon:"expand_more",size:"24"}),display:d,name:this.SLOT_COLLAPSE_ICON})),(c||u)&&s("div",{class:"icon-slot"},s("modus-checkbox",{checked:i,disabled:h,indeterminate:n,onClick:o=>this.handleCheckboxClick(o),onKeyDown:o=>this.handleDefaultKeyDown(o,()=>this.handleCheckboxClick(o)),ref:o=>this.refCheckbox=o})),s(this.CustomSlot,{key:"e2b0c1e315d41073cb1ec06933995f64a7c5e069",className:"icon-slot",name:this.SLOT_ITEM_ICON,display:this.slots.has(this.SLOT_ITEM_ICON)}),s("div",{key:"81f47cde801b841baa8310b8435ec5fd6bab4c67",role:"heading","aria-level":l,class:"label-slot"},s(this.CustomSlot,{key:"18694abbccdb3365fc2e2593b5c3498c6e1c4992",role:"button",name:this.SLOT_LABEL,defaultContent:this.editable?s("modus-text-input",{size:m=="large"?"large":"medium",autoFocusInput:!0,tabindex:0,ref:o=>this.refLabelInput=o,value:this.label,onClick:o=>this.handleLabelInputClick(o),onBlur:()=>this.handleLabelInputBlur(),onKeyDown:o=>this.handleLabelInputKeyDown(o)}):this.label})),((e=this.actions)===null||e===void 0?void 0:e.length)>0&&s("modus-action-bar",{"visible-item-count":3,actions:this.actions})),s("ul",{key:"0e292621106abf629c6441e7f58a7d56966352ae",class:C,role:"tree"},s("slot",{key:"fcb02e793b87978ef21d4a6af0f7d82f1c1f2d23",onSlotchange:()=>this.handleTreeSlotChange()})))}get element(){return y(this)}static get watchers(){return{disabled:["handlePropDisabledChange"],nodeId:["handlePropNodeIdChange"]}}};O.style=E;export{O as modus_tree_view_item};
