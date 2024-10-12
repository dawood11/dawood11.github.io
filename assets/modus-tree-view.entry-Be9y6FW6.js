import{r as I,c,h,H as g,g as u}from"./index-BV6uoHa1.js";import{T as f}from"./modus-content-tree.constants-b1c2cf71-Ddv897wd.js";const p=({draggingState:e,size:t})=>{if(!e)return null;const{width:i,translation:s,dragContent:n,validTarget:r,targetId:o}=e,d={width:i,transform:`translate(calc(${s.x}px - 10%), calc(${s.y}px - 50%))`,msTransform:`translateX(${s.x}px) translateX(-10%) translateY(${s.y}px) translateY(-50%)`},a=`${f.get(t||"standard")}`,m=`drag-content${o&&!r?" drop-block":" drop-allow"} ${a}`;return h("div",{style:Object.assign({},d),ref:l=>l&&l.appendChild(n),class:m})},b='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.drag-content{cursor:grabbing !important;left:0;opacity:0.9;position:fixed;top:0;z-index:99999}.drag-content .tree-item{align-items:center;background-color:var(--modus-tree-view-item-bg, #fff);border:0.0625rem solid var(--modus-tree-view-item-border-color, #e0e1e9);color:var(--modus-tree-view-item-color, #252a2e);display:flex;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:1rem;height:2.375rem;width:100%}.drag-content .tree-item .icon-slot{visibility:hidden}.drag-content .tree-item.large{height:2.875rem}.drag-content .tree-item.small{font-size:0.75rem;height:1.875rem}.drag-content.drop-allow .tree-item{border:2px dashed var(--modus-tree-view-item-drag-border-color, #217cbb) !important}.drag-content.drop-block .tree-item{border:2px dashed var(--modus-tree-view-item-drag-error-border-color, #da212c) !important}:host{display:block}ul{padding:0}',S=b;var v=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,s=Object.getOwnPropertySymbols(e);n<s.length;n++)t.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(e,s[n])&&(i[s[n]]=e[s[n]]);return i};const x=class{constructor(e){I(this,e),this.itemDrop=c(this,"itemDrop",7),this.itemSelectionChange=c(this,"itemSelectionChange",7),this.itemActionClick=c(this,"itemActionClick",7),this.items={},this.syncItems=[],this.onMouseMove=t=>this.handleItemDragOver(t),this.onMouseUp=()=>this.handleItemDrop(),this.onKeyDown=t=>this.handleArrowKeys(t),this.INITIAL_DRAG_POSITION={x:0,y:0},this.checkboxSelection=void 0,this.checkedItems=[],this.disableTabbing=void 0,this.enableReordering=void 0,this.expandedItems=[],this.multiCheckboxSelection=void 0,this.multiSelection=void 0,this.selectedItems=[],this.size="standard",this.borderless=void 0,this.itemDragState=void 0,this.isDraggingWithKeyboard=void 0}clearItemDropState(){if(!this.itemDragState)return null;const e=this.itemDragState,{targetId:t}=e,i=v(e,["targetId"]);return t&&(this.items[t].content.classList.remove("drop-allow"),this.items[t].content.classList.remove("drop-block")),Object.assign(Object.assign({},i),{targetId:null,validTarget:null})}handleDocumentClick(e){this.element.contains(e.target)||e.defaultPrevented||(this.focusItem=null)}handleItemDragState(e,t){t&&e&&t.itemId===e.itemId||(e?(document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.onMouseUp)):(document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mouseup",this.onMouseUp)))}handleDraggingWithKeyboard(e){e?document.addEventListener("keydown",this.onKeyDown):document.removeEventListener("keydown",this.onKeyDown)}handleItemDragStart(e,t,i){const{clientX:s,clientY:n,currentTarget:r}=i,o=r==null?void 0:r.parentElement,d={x:s,y:n};this.clearItemDropState(),this.itemDragState={dragContent:t,origin:d,translation:d,itemId:e,width:`${o==null?void 0:o.offsetWidth}px`,height:`${o==null?void 0:o.offsetHeight}px`}}handleItemDragStartKeyboard(e,t,i){if(i.code==="Escape"&&this.itemDragState&&(t.style.transform=`translate(${this.INITIAL_DRAG_POSITION.x}px, ${this.INITIAL_DRAG_POSITION.y}px)`,this.clearItemDropState(),this.itemDragState=null),i.code==="Enter")if(this.currentItem=null,this.isDraggingWithKeyboard)this.handleItemDrop(),this.isDraggingWithKeyboard=!1;else{const{currentTarget:s}=i,n=s==null?void 0:s.parentElement,r=n.getBoundingClientRect().x,o=n.getBoundingClientRect().y,d={x:r+40,y:o+20};this.clearItemDropState(),this.itemDragState={dragContent:t,origin:d,translation:d,itemId:e,width:`${n==null?void 0:n.offsetWidth}px`,height:`${n==null?void 0:n.offsetHeight}px`},this.isDraggingWithKeyboard=!0}}handleKeys(e,t=!1){e===1?this.currentItem=this.items[this.getNextNavigableItem(this.currentItem.nodeId,t)]:this.currentItem=this.items[this.getPrevNavigableItem(this.currentItem.nodeId,t)]}handleArrowKeys(e){if(!this.itemDragState)return;const t=e.key==="ArrowUp"?-1:e.key==="ArrowDown"?1:0;if(t===0)return;this.currentItem||(this.currentItem=this.items[this.itemDragState.itemId]),this.handleKeys(t),t==1?(this.currentItem==this.items[this.getNextNavigableItem(this.itemDragState.itemId)]&&this.handleKeys(t),this.currentItem==this.items[this.itemDragState.itemId]&&this.handleKeys(t,!0)):this.currentItem==this.items[this.getNextNavigableItem(this.itemDragState.itemId)]&&this.handleKeys(t,!0);let i=Object.assign({},this.clearItemDropState());if(this.currentItem.nodeId&&this.currentItem.nodeId!==i.itemId){const s=this.getParentIds(this.currentItem.nodeId);i=Object.assign(Object.assign({},i),{targetId:this.currentItem.nodeId}),this.currentItem.element.droppableItem&&!this.isItemDisabled(this.currentItem.nodeId)&&!(s&&s.includes(i.itemId))?(i.validTarget=!0,this.currentItem.content.classList.add("drop-allow")):(i.validTarget=!1,this.currentItem.content.classList.add("drop-block"))}this.itemDragState=Object.assign({},i)}handleItemDragOver(e){if(!this.itemDragState)return;const{clientX:t,clientY:i}=e,s={x:t,y:i},{nodeId:n,element:r,content:o}=this.getItemWithinBounds(t,i)||{};let d=Object.assign(Object.assign({},this.clearItemDropState()),{translation:s});if(n&&n!==d.itemId){const a=this.getParentIds(n);d=Object.assign(Object.assign({},d),{targetId:n}),r.droppableItem&&!this.isItemDisabled(n)&&!(a&&a.includes(d.itemId))?(d.validTarget=!0,o.classList.add("drop-allow")):(d.validTarget=!1,o.classList.add("drop-block"))}this.itemDragState=Object.assign({},d)}handleItemDrop(){var e;if(!this.itemDragState)return;const{itemId:t,targetId:i,validTarget:s}=this.itemDragState;if(t&&s&&t!==i){const{parentId:n,element:r}=this.items[i];if(r){const o=((e=this.items[n])===null||e===void 0?void 0:e.element)||this.element,d=r,a=this.items[this.itemDragState.itemId].element;o.insertBefore(a,d),this.itemDrop.emit(this.items)}}this.clearItemDropState(),this.itemDragState=null}handleItemsProps(e,t){this.syncItems.push(...t||[],...e||[])}handleOptionsProps(){const e=this.getTreeViewItemOptions();Object.values(this.items).forEach(({element:t})=>{t.initTreeViewItem(e)})}handleTreeSlotChange(){Array.from(this.element.children).map(t=>t.nodeId).filter(t=>t).forEach((t,i)=>{this.updateItem({nodeId:t,index:i,parentId:null})})}getItemWithinBounds(e,t){return Object.values(this.items).find(({content:s})=>{const n=s==null?void 0:s.getBoundingClientRect();if(n){const r=t>=n.top&&t<=n.bottom,o=e>=n.left&&e<=n.right;return r&&o}return!1})}getParentIds(e){if(!e)return[];const{parentId:t}=this.items[e];return t?[t,...this.getParentIds(t)]:[]}addItem(e){const t=e,i=e.parentNode;if(t.nodeId){const{children:s,nodeId:n}=i,r=Array.from(s).filter(d=>d.nodeId).indexOf(t),o=this.getLevel(n)+1;this.items[t.nodeId]=Object.assign(Object.assign({},this.items[t.nodeId]),{nodeId:t.nodeId,index:r,element:t,disabled:t.disabled,parentId:n,level:o}),t.initTreeViewItem(this.getTreeViewItemOptions())}}componentDidUpdate(){var e;(e=this.syncItems)===null||e===void 0||e.forEach(t=>this.syncTreeViewItem(t)),this.syncItems=[]}deleteItem(e){const t=this.items[e];let i=[];if(t){t.children.forEach(n=>{delete this.items[n],i.push(n)}),delete this.items[e],i.push(e);const s=n=>n.find(r=>i.includes(r))?n.filter(r=>!i.includes(r)):n;this.checkedItems=s(this.checkedItems),this.selectedItems=s(this.selectedItems),this.expandedItems=s(this.expandedItems),i.includes(this.focusItem)&&(this.focusItem=null)}}getChildrenIds(e,t=!0){var i;const s=(i=this.items[e])===null||i===void 0?void 0:i.children;return s?Array.from(s).map(n=>this.items[n]).sort((n,r)=>n.index-r.index).reduce((n,r)=>(n.push(r.nodeId,...t?this.getChildrenIds(r.nodeId,t):[]),n),[]):[]}getLevel(e){var t;return((t=this.items[e])===null||t===void 0?void 0:t.level)||0}getFirstItem(){const e=this.element.firstElementChild;return e?e.nodeId:null}getLastItem(){const e=this.element.lastElementChild;if(e){const t=e;let i=t.nodeId;return this.isItemExpanded(t.nodeId)&&(i=this.getChildrenIds(t.nodeId,!0).slice(-1)[0]),i}return null}getNavigableChildrenIds(e){let t=[];return e?t=this.getChildrenIds(e,!1):t=Object.values(this.items).filter(i=>!i.parentId).sort((i,s)=>i.index-s.index).map(i=>i.nodeId),t.filter(i=>!this.isItemDisabled(i))}getNextNavigableItem(e,t=!1){if(this.isItemExpanded(e)){const s=this.getNavigableChildrenIds(e);if(s.length)return s[0]}let i=this.items[e];for(;i!=null;){const s=this.getNavigableChildrenIds(i.parentId),n=s.indexOf(i.nodeId),r=t?n+2:n+1,o=s[r];if(o)return o;i=this.items[i.parentId]}return e}getPrevNavigableItem(e,t=!1){const i=this.items[e],s=this.getNavigableChildrenIds(i.parentId),n=s.indexOf(e);if(n===0)return i.parentId||e;let r=t?n-2:n-1;r<0&&(r=0);let o=s[r];for(;this.isItemExpanded(o)&&this.getNavigableChildrenIds(o).length>0;)o=this.getNavigableChildrenIds(o).pop();return o}getTreeViewItemOptions(){return{multiSelection:this.multiSelection,checkboxSelection:this.checkboxSelection,multiCheckboxSelection:this.multiCheckboxSelection,size:this.size,borderless:this.borderless,disableTabbing:this.disableTabbing,draggable:this.enableReordering,getLevel:e=>this.getLevel(e),hasItemFocus:e=>this.isItemInFocus(e),hasItemSelected:e=>this.isItemSelected(e),hasItemDisabled:e=>this.isItemDisabled(e),hasItemExpanded:e=>this.isItemExpanded(e),hasItemChecked:e=>this.isItemChecked(e),hasItemIndeterminate:e=>this.isItemIndeterminate(e),showSelectionIndicator:e=>this.showSelectionIndicator(e),onItemSelection:(e,t)=>this.handleItemSelection(e,t),onCheckboxSelection:(e,t)=>this.handleCheckboxSelection(e,t),onItemExpandToggle:e=>this.handleItemExpand(e),onItemFocus:e=>this.handleItemFocus(e),onItemAdd:e=>this.addItem(e),onItemDelete:e=>this.deleteItem(e),onItemUpdate:(e,t)=>this.updateItem(e,t),onItemDrag:(e,t,i)=>this.handleItemDragStart(e,t,i),onItemDragClick:(e,t,i)=>this.handleItemDragStartKeyboard(e,t,i)}}handleCheckboxSelection(e,t=!1){if(this.items[e].disabled)return;let i=!this.isItemChecked(e),s=[...this.checkedItems],n=[...this.checkedItems,e];if(this.multiCheckboxSelection){if(t){const o=this.getChildrenIds(e,!1);i=o.filter(a=>s.includes(a)).length===o.length,i?s.push(e):s=s.filter(a=>a!==e)}else{const o=this.getChildrenIds(e,!0);i?s.push(e,...o):s=s.filter(d=>d!==e).filter(d=>!o.includes(d)),n.push(...o)}const r=this.getParentIds(e);r.forEach(o=>{const d=this.getChildrenIds(o,!1);d.filter(l=>s.includes(l)).length===d.length?s.push(o):s=s.filter(l=>l!==o)}),n.push(...r)}else s=i?[e]:[];this.checkedItems=[...s],this.syncItems.push(...n,...s)}handleItemAdded(e){this.addItem(e.detail),e.preventDefault(),e.stopPropagation()}handleItemClick(e){const t=e.detail.actionId,i=e.target.getAttribute("node-id");this.itemActionClick.emit({actionId:t,nodeId:i})}handleItemExpand(e){const{children:t}=this.items[e];if(!(t&&t.length))return;const i=!this.isItemExpanded(e);let s=[...this.expandedItems];i?s.push(e):s=s.filter(n=>n!==e),this.expandedItems=[...s],this.syncItems.push(e)}handleItemFocus(e){const{element:t}=this.items[e];this.focusItem=e,t.focusItem()}handleChangeTreeitem(e,t){this.itemSelectionChange.emit({isSelected:e,nodeId:t})}handleItemSelection(e,t){if(this.items[e].disabled)return;const i=this.multiSelection&&t&&(t.shiftKey||t.ctrlKey||t.metaKey),s=!this.isItemSelected(e),n=[...this.selectedItems];let r=[...this.selectedItems];s?i?(r.push(e),this.handleChangeTreeitem(!0,e)):r=[e]:(r=r.filter(o=>o!==e),i&&this.handleChangeTreeitem(!1,e)),this.selectedItems=[...r],this.syncItems.push(...n,...r)}handleKeyDown(e){if(e.defaultPrevented||e.altKey)return;const t=e.code.toUpperCase();let i=!1;if(!this.isDraggingWithKeyboard)switch(t){case"SPACE":this.focusItem&&(this.handleItemExpand(this.focusItem),i=!0);break;case"ENTER":this.focusItem&&(this.handleItemSelection(this.focusItem,e),e.stopPropagation());break;case"ARROWDOWN":const s=this.focusItem?this.getNextNavigableItem(this.focusItem):this.getFirstItem();this.multiSelection&&e.shiftKey&&this.isItemSelected(this.focusItem)&&(this.isItemSelected(s)?this.handleItemSelection(this.focusItem,e):this.handleItemSelection(s,e)),this.handleItemFocus(s),i=!0;break;case"ARROWUP":const n=this.focusItem?this.getPrevNavigableItem(this.focusItem):this.getLastItem();this.multiSelection&&e.shiftKey&&this.isItemSelected(this.focusItem)&&(this.isItemSelected(n)?this.handleItemSelection(this.focusItem,e):this.handleItemSelection(n,e)),this.handleItemFocus(n),i=!0;break;case"ARROWRIGHT":if(this.focusItem)if(this.disableTabbing&&e.shiftKey){const{element:r}=this.items[this.focusItem];r.focusCheckbox()}else this.isItemExpanded(this.focusItem)||this.handleItemExpand(this.focusItem);break;case"ARROWLEFT":this.focusItem&&this.isItemExpanded(this.focusItem)&&this.handleItemExpand(this.focusItem);break;case"TAB":this.disableTabbing&&this.resetFocusItem();break}i&&(e.preventDefault(),e.stopPropagation())}isItemChecked(e){return this.checkedItems.includes(e)}isItemExpanded(e){return this.expandedItems.includes(e)}isItemInFocus(e){return this.focusItem===e}isItemSelected(e){return this.selectedItems.includes(e)}isItemIndeterminate(e){const t=this.getChildrenIds(e);if(t&&this.multiCheckboxSelection){const i=t.filter(s=>this.isItemChecked(s));return i.length>0&&i.length<t.length}return!1}isItemDisabled(e){const{disabled:t}=this.items[e],i=this.getParentIds(e);return t||!!(i!=null&&i.find(s=>this.items[s].disabled))}resetFocusItem(){this.focusItem=null}showSelectionIndicator(e){return this.isItemSelected(e)||!this.isItemExpanded(e)&&!!this.getChildrenIds(e,!0).find(t=>this.isItemSelected(t))}syncTreeViewItem(e){var t,i;(i=(t=this.items[e])===null||t===void 0?void 0:t.element)===null||i===void 0||i.updateComponent()}updateItem(e,t){var i;let s;t&&e.nodeId!==t.nodeId?(s=Object.assign({},this.items[t.nodeId]),delete this.items[t.nodeId]):s=Object.assign({},this.items[e.nodeId]),s.nodeId?(this.items[e.nodeId]=Object.assign(Object.assign({},s),e),(i=e.children)===null||i===void 0||i.forEach(n=>{const r=this.items[n];this.items[n]=Object.assign(Object.assign({},r),{parentId:e.nodeId})})):this.items[e.nodeId]=Object.assign({},e)}render(){return h(g,{key:"69ee9e58cc84b9a445c22cb54d367e665af11ab6"},h("ul",{key:"c801f041c234c5d9c9384cbb68fc1feaf5d403dd",role:"tree",tabindex:this.disableTabbing?0:null,onKeyDown:e=>this.handleKeyDown(e)},h("slot",{key:"ca6f99b9f80e40eba4b00d9232773001e5914c1d",onSlotchange:()=>this.handleTreeSlotChange()})),h(p,{key:"c495bf572e67c72dcbed42d3f4a9e51614a76bb2",draggingState:this.itemDragState},h("div",{key:"3340591945575c86b0086343df86be78e02b3f69",class:"drag-indicator",tabIndex:-1})))}get element(){return u(this)}static get watchers(){return{itemDragState:["handleItemDragState"],isDraggingWithKeyboard:["handleDraggingWithKeyboard"],expandedItems:["handleItemsProps"],selectedItems:["handleItemsProps"],checkedItems:["handleItemsProps"],checkboxSelection:["handleOptionsProps"],disableTabbing:["handleOptionsProps"],multiCheckboxSelection:["handleOptionsProps"],multiSelection:["handleOptionsProps"],size:["handleOptionsProps"],borderless:["handleOptionsProps"],enableReordering:["handleOptionsProps"]}}};x.style=S;export{x as modus_tree_view};
