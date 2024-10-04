import{r,h as t}from"./index-BkOlHltm.js";import{o as m,m as u,u as c,D as h,B as b,n as a}from"./modus-table.constants-c083d0c0-5UzQ9bNQ.js";const p='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.columns-visibility-menu{display:flex;flex-direction:column}.columns-visibility-menu .column-visibility-header{color:var(--modus-primary, #019aeb);font-size:0.875rem;font-weight:700;line-height:18px;margin:12px;margin-bottom:5px}.columns-visibility-menu .column-visibility-content{overflow:auto}.columns-visibility-menu .column-visibility-item{padding:5px 5px 5px 12px}.columns-visibility-menu .column-visibility-item:focus,.columns-visibility-menu .column-visibility-item:hover{background:var(--modus-group-item-hover-bg, #e0e1e9);outline:none}.columns-visibility-menu .column-visibility-item:last-child{margin-bottom:10px}.columns-visibility-menu .column-visibility-buttons-container{display:flex;justify-content:flex-end;margin-bottom:12px;margin-right:12px}modus-button{padding:12px 0 0 12px}',f=p,y=class{constructor(i){r(this,i),this.refItemContent=[],this.getAllLeafColumns=void 0,this.columnsVisibility=void 0,this.showDropdown=void 0,this.menuIconContainerRef=void 0,this.toggleDropdown=void 0,this.maxHeight=void 0,this.columnsVisibilityState=new Map}componentWillLoad(){this.initializeVisibilityState()}applyColumnsVisibility(){this.getAllLeafColumns().forEach(i=>{this.columnsVisibilityState.has(i.id)&&i.toggleVisibility(this.columnsVisibilityState.get(i.id))}),this.toggleDropdown(!this.showDropdown),this.menuIconContainerRef.focus()}closeDropdown(){this.columnsVisibilityState=new Map,this.toggleDropdown(!this.showDropdown),this.menuIconContainerRef.focus()}handleApplyKeyDown(i){i.key.toLowerCase()===m&&!i.shiftKey&&this.toggleDropdown(!1)}handleColumnItemKeyDown(i,o){let e;const n=(l,d)=>{this.refItemContent[l]?this.refItemContent[l].focus():n(d?l+1:l-1,d)},s=i.key.toLowerCase();s===u||s===c?this.toggleColumnVisibility(o):s===h?(e=o+1<this.refItemContent.length?o+1:this.refItemContent.length-1,n(e,!0),i.preventDefault()):s===b&&(e=o-1>=0?o-1:0,n(e,!1),i.preventDefault())}handleRefColumnItemContent(i,o,e){e||(this.refItemContent[o]=i)}initializeVisibilityState(){this.getAllLeafColumns().forEach(i=>{var o,e,n,s;const l=(e=(o=this.columnsVisibility)===null||o===void 0?void 0:o.requiredColumns)===null||e===void 0?void 0:e.includes(i.id),d=(s=(n=this.columnsVisibility)===null||n===void 0?void 0:n.hiddenColumns)===null||s===void 0?void 0:s.includes(i.id);!l&&d&&i.toggleVisibility(!1)})}toggleColumnVisibility(i){const o=this.refItemContent[i].children[0].shadowRoot.children;o[o.length-1].click()}checkIfRequiredColumn(i){var o,e;return(e=(o=this.columnsVisibility)===null||o===void 0?void 0:o.requiredColumns)===null||e===void 0?void 0:e.includes(i)}renderColumnsChecklist(){const i=(o,e)=>({key:o,tabIndex:this.checkIfRequiredColumn(o)?-1:0,ref:n=>{this.handleRefColumnItemContent(n,e,this.checkIfRequiredColumn(o))},onClick:()=>this.toggleColumnVisibility(e),onKeyDown:n=>this.handleColumnItemKeyDown(n,e)});return this.getAllLeafColumns().map((o,e)=>{var n,s;return t("div",Object.assign({},i(o.id,e),{class:"column-visibility-item"}),t("modus-checkbox",{ariaLabel:o.columnDef.header,label:o.columnDef.header,checked:o.getIsVisible(),onCheckboxClick:l=>this.columnsVisibilityState.set(o.id,l.detail),disabled:(s=(n=this.columnsVisibility)===null||n===void 0?void 0:n.requiredColumns)===null||s===void 0?void 0:s.includes(o.id),stopPropagation:!0}))})}renderCancelApplyButtons(){return t("div",{class:"column-visibility-buttons-container"},t("modus-button",{size:"small",buttonStyle:"outline",onClick:()=>this.closeDropdown()},"Cancel"),t("modus-button",{size:"small",onClick:()=>this.applyColumnsVisibility(),onKeyDown:i=>this.handleApplyKeyDown(i)},"Apply"))}render(){return t("div",{key:"7357d1c0c3efb961c410ee2191f516673ff1fe31",class:"columns-visibility-menu",style:{maxHeight:this.maxHeight||"60dvh"}},t("div",{key:"156fc3b9d58040a473f888d81f9e6a00021aac3b",class:"column-visibility-header"},this.columnsVisibility.title||"Columns"),t("div",{key:"588ed7b5939c4bced93b593032584c852208cd02",class:"column-visibility-content"},this.renderColumnsChecklist()),this.renderCancelApplyButtons())}};y.style=f;const v=i=>{var o,e,n;return t("svg",{class:`icon-horizontal-ellipsis ${i.pressed?"pressed":""}`,fill:(o=i.color)!==null&&o!==void 0?o:"currentColor",height:(e=i.size)!==null&&e!==void 0?e:16,onClick:i.onClick?()=>i.onClick():null,viewBox:"0 0 24 24",width:(n=i.size)!==null&&n!==void 0?n:16},t("path",{d:"M10.59 10.59c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Zm7 0c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Zm-14 0c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Z"}))},w='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.dropdown-menu-container{display:inline-block;padding-left:12px;position:relative}.dropdown-menu-container .dropdown-menu-icon{border-radius:3px;cursor:pointer;display:flex;padding:4px}.dropdown-menu-container .dropdown-menu-icon svg{fill:var(--modus-icon-colour, #252a2e)}.dropdown-menu-container .dropdown-menu-icon:hover{background:var(--modus-group-item-hover-bg, #e0e1e9)}.dropdown-menu-container .dropdown-menu{background-color:var(--modus-group-item-bg, #fff);border:1px solid var(--modus-group-item-border-color, #e0e1e9);box-shadow:0 0 4px var(--modus-card-shadow-color, rgba(54, 53, 69, 0.3019607843));display:none;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";position:absolute;right:0;top:28px;width:240px;z-index:99}.dropdown-menu-container .dropdown-menu.visible{display:block}',C=w,g=class{constructor(i){r(this,i),this.context=void 0,this.show=!1}handleClickOutside(i){i.composedPath().find(e=>e.className==="dropdown-menu-container")||(this.show=!1)}handleIconKeyDown(i){const o=i.key.toLowerCase();o===u||o===c?(this.show=!0,i.preventDefault()):o===a&&(this.show=!1,i.preventDefault())}handleDropdownKeyDown(i){i.key.toLowerCase()===a&&(this.show=!1,this.menuIconContainerRef.focus(),i.preventDefault())}render(){const{tableInstance:{getAllLeafColumns:i},toolbarOptions:o,maxHeight:e}=this.context;return t("div",{key:"aab90de74a93625cd6dad906d014cc3afed51693",class:"dropdown-menu-container"},t("div",{key:"e9d0bb984aa0442278b86acee7d5d124232f1cf0",tabIndex:0,class:"dropdown-menu-icon",onClick:()=>this.show=!this.show,onKeyDown:n=>this.handleIconKeyDown(n),ref:n=>this.menuIconContainerRef=n},t(v,{key:"54f8128ab8b0150fe952f159b2f1578941844624",size:"20"})),(o==null?void 0:o.columnsVisibility)&&t("div",{onKeyDown:n=>this.handleDropdownKeyDown(n),class:`dropdown-menu ${this.show?"visible":""}`},t("modus-table-columns-visibility",{getAllLeafColumns:i,columnsVisibility:o==null?void 0:o.columnsVisibility,showDropdown:this.show,menuIconContainerRef:this.menuIconContainerRef,toggleDropdown:n=>this.show=n,maxHeight:e})))}};g.style=C;export{y as modus_table_columns_visibility,g as modus_table_dropdown_menu};
