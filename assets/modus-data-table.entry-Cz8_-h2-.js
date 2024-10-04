import{r as v,c as h,h as i}from"./index-CX5ZXOlR.js";import{M as m}from"./ModusIconMap-11e94e00-DReWjjVz.js";import"./IconChevronLeft-f85188e7-C56Dk1W3.js";import"./IconChevronRight-de7de2e8-LiZrR9a4.js";import"./IconClose-9751af6c-u6Q7v7sb.js";import"./IconExpand-27433628-BwtrBpXN.js";import"./IconVisibilityOn-4d4ac4d9-B3gFNcbN.js";class u{static convertToTColumns(e){return e==null?void 0:e.map(o=>{var s,n,a,l,c,d,r;return{align:(s=o.align)!==null&&s!==void 0?s:"left",display:(n=o.display)!==null&&n!==void 0?n:o,id:(c=(a=o.id)!==null&&a!==void 0?a:(l=o.display)===null||l===void 0?void 0:l.toLocaleLowerCase())!==null&&c!==void 0?c:o.toLocaleLowerCase(),readonly:(d=o.readonly)!==null&&d!==void 0?d:!1,width:(r=o.width)!==null&&r!==void 0?r:""}})}static convertToTRows(e,o){return e!=null&&e.length&&!Array.isArray(e[0])?e:e==null?void 0:e.map(s=>{var n,a;const l={_id:(n=s._id)!==null&&n!==void 0?n:"",_selected:(a=s._selected)!==null&&a!==void 0?a:!1};return s.forEach((c,d)=>{l[o[d].id]=c}),l})}static sortData(e,o,s){const n=[...e];return s==="asc"?n.sort((a,l)=>a[o]._type==="badge"?a[o].text>l[o].text?1:-1:a[o]._type==="link"?a[o].display>l[o].display?1:-1:a[o]>l[o]?1:-1):n.sort((a,l)=>a[o]._type==="badge"?a[o].text>l[o].text?-1:1:a[o]._type==="link"?a[o].display>l[o].display?-1:1:a[o]>l[o]?-1:1)}}const g=t=>{var e,o,s;return i("svg",{"data-test-id":"iconSortAZ",class:`${t.pressed?"pressed":""}`,fill:(e=t.color)!==null&&e!==void 0?e:"currentColor",height:(o=t.size)!==null&&o!==void 0?o:16,onClick:t.onClick,viewBox:"0 0 32 32",width:(s=t.size)!==null&&s!==void 0?s:16},i("path",{d:"M17.658 14.94a.997.997 0 0 0 1.281-.598L20.155 11h3.69l1.216 3.342a1 1 0 1 0 1.878-.684l-4-11a.999.999 0 0 0-1.878 0l-4 11a1 1 0 0 0 .597 1.282zM22 5.926 23.118 9h-2.236L22 5.926zM26 28h-5.919l6.7-8.375A1.002 1.002 0 0 0 26 18h-8a1 1 0 1 0 0 2h5.919l-6.7 8.375A1.002 1.002 0 0 0 18 30h8a1 1 0 1 0 0-2zm-14.766-5H9V3a1 1 0 1 0-2 0v20H4.766a.86.86 0 0 0-.782.492c-.146.304-.107.655.074.876l3.264 5.085c.165.207.413.326.678.326s.513-.119.709-.369l3.203-4.999a.862.862 0 0 0 .104-.919.86.86 0 0 0-.782-.492z"}))},k=t=>{var e,o,s;return i("svg",{"data-test-id":"iconSortZA",class:`${t.pressed?"pressed":""}`,width:(e=t.size)!==null&&e!==void 0?e:16,height:(o=t.size)!==null&&o!==void 0?o:16,fill:(s=t.color)!==null&&s!==void 0?s:"currentColor",onClick:t.onClick,viewBox:"0 0 32 32"},i("path",{d:"M17.658 14.94a.997.997 0 0 0 1.281-.598L20.155 11h3.69l1.216 3.342a1 1 0 1 0 1.878-.684l-4-11a.999.999 0 0 0-1.878 0l-4 11a1 1 0 0 0 .597 1.282zM22 5.926 23.118 9h-2.236L22 5.926zM26 28h-5.919l6.7-8.375A1.002 1.002 0 0 0 26 18h-8a1 1 0 1 0 0 2h5.919l-6.7 8.375A1.002 1.002 0 0 0 18 30h8a1 1 0 1 0 0-2zM8.678 2.547c-.33-.414-.995-.457-1.387.043L4.088 7.589a.862.862 0 0 0-.104.919.86.86 0 0 0 .782.492H7v20a1 1 0 1 0 2 0V9h2.234a.86.86 0 0 0 .782-.492c.146-.304.106-.655-.074-.876L8.678 2.547z"}))};function p(t){return t==null?void 0:t.replace(/\w\S*/g,e=>e.charAt(0).toUpperCase()+e.substring(1).toLowerCase()).replace(/\s+/g," ")}const f=t=>{const e=t.sortState.direction!=="none"?i("modus-tooltip",{position:"bottom",text:`${t.sortState.direction==="asc"?"Sort descending":"Remove sort"}`},i("div",{class:"icon-container"},i("div",{class:"sort-icon"},t.sortState.direction==="asc"?i(g,{size:"16"}):i(k,{size:"16"})))):null,o=i("div",{style:{width:"16px"}});return i("th",{class:`${t.sortOptions.canSort?"can-sort":""}`,onClick:()=>t.onColumnHeaderClick(t.column.id)},i("div",{class:`column-header align-${t.column.align}`},t.column.align==="right"&&t.sortState.columnId!==t.column.id&&o,t.column.align==="right"&&t.sortState.columnId===t.column.id&&t.sortState.direction==="none"&&o,t.column.align==="right"&&t.sortState.columnId===t.column.id&&e,i("div",null,p(t.column.display)),t.column.align==="left"&&t.sortState.columnId===t.column.id&&e,t.column.align==="center"&&t.sortState.columnId===t.column.id&&i("div",{style:{position:"relative"}},i("div",{style:{display:"flex",justifyContent:"flex-end",position:"absolute"}},e))))},y=t=>i("div",{class:"cell-link",onClick:()=>t.onLinkClick(t.link)},t.link.display),C=t=>i("div",{class:"cell-badge"},i("modus-badge",{color:t.badge.color,type:t.badge.type},t.badge.text)),S=t=>i("modus-dropdown",{"toggle-element-id":`dropdownToggle-${t.rowId}`,"animate-list":t.animateDropdown,customPlacement:{left:-194},showDropdownListBorder:!1},i("div",{class:"row-action",id:`dropdownToggle-${t.rowId}`,slot:"dropdownToggle"},i(m,{icon:"more_vertical",size:"24"})),i("div",{slot:"dropdownList"},i("div",{class:"list-container"},i("div",{class:"items-container"},t.actions.map(e=>i("div",{class:"action-item",onClick:()=>t.onRowActionClick(e._id,t.rowId)},i("div",{class:"action-item-content"},e.display.icon&&i(m,{icon:e.display.icon,size:"16"}),i("div",{class:"display-text"},e.display.text)))))))),_='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");table{border:0.0625rem var(--modus-table-border-color, #b7b9c3) solid;border-collapse:collapse;width:100%}table th{background-color:var(--modus-table-header-bg, #f1f1f6);border:0.0625rem var(--modus-table-header-border-color, #b7b9c3) solid;color:var(--modus-table-header-color, #464b52);font-size:0.875rem;font-weight:600;min-height:3rem}table th.can-sort{cursor:pointer}table th .column-header{display:flex;flex-direction:row;justify-content:center;min-height:1.25rem;padding:0 0.5rem}table th .column-header.align-left,table th .column-header.align-right{justify-content:space-between}table th .column-header.align-center{justify-content:center}table th .column-header .icon-container{align-items:center;display:flex;height:1rem;justify-content:center}table th .column-header .icon-container .sort-icon{border-radius:0.25rem;display:flex;padding:0.25rem}table th .column-header .icon-container .sort-icon:hover{background-color:var(--modus-btn-icon-only-dark-hover-bg, #e0e1e9)}table th .column-header .icon-container .sort-icon:hover svg path{fill:var(--modus-btn-icon-only-dark-hover-color, #353a40)}table th .column-header .icon-container .sort-icon:active{background-color:var(--modus-btn-icon-only-dark-active-bg, #cbcdd6)}table th .column-header .icon-container .sort-icon:active svg path{fill:var(--modus-btn-icon-only-dark-active-color, #2b2a37)}table th .column-header .icon-container .sort-icon svg path{fill:var(--modus-btn-icon-only-dark-color, #252a2e)}table tr{color:var(--modus-table-color, #464b52);font-size:0.875rem;height:3rem}table tr td{background-color:var(--modus-table-bg, #fff);border:0.0625rem var(--modus-table-border-color, #b7b9c3) solid;padding:0 0.5rem}table tr td.align-center{text-align:center}table tr td.align-center div{display:flex;height:100%;justify-content:center;width:100%}table tr td.align-left{text-align:left}table tr td.align-right{text-align:right}table tr td.readonly{background-color:var(--modus-table-readonly-bg, #e0e1e9);color:var(--modus-table-readonly-color, #464b52)}table tr td.selected{background-color:var(--modus-table-selected-bg, #dcedf9)}table tr td .cell-link{color:var(--modus-link-color, #217cbb);cursor:pointer;display:inline-block;font-weight:600}table tr td .cell-link:hover{text-decoration:underline}table tr td .cell-badge{align-items:center;display:flex;justify-content:center}table.borderless{border:none !important}table.cell-borderless th,table.cell-borderless td{border:none !important}table.row-stripe tr{border-bottom:0.0625rem var(--modus-table-border-color, #b7b9c3) solid}table.size-small th,table.size-small tr{height:2rem}modus-dropdown .row-action{border-radius:50%;cursor:pointer;padding:0.125rem;transition:background-color 0.15s ease-in-out}modus-dropdown .row-action svg{fill:var(--modus-btn-icon-only-dark-color, #252a2e)}modus-dropdown .row-action:hover{background-color:var(--modus-btn-icon-only-dark-hover-bg, #e0e1e9)}modus-dropdown .row-action:hover svg path{fill:var(--modus-btn-icon-only-dark-hover-color, #353a40)}modus-dropdown .row-action:active{background-color:var(--modus-btn-icon-only-dark-active-bg, #cbcdd6)}modus-dropdown .row-action:active svg path{fill:var(--modus-btn-icon-only-dark-active-color, #2b2a37)}modus-dropdown .list-container{position:relative;top:-6px}modus-dropdown .list-container .items-container{display:inline-block;position:sticky;width:200px}modus-dropdown .list-container .items-container .action-item{height:1.5rem;padding:0.5rem;text-align:left;user-select:none;width:200px}modus-dropdown .list-container .items-container .action-item .action-item-content{align-items:center;background-color:var(--modus-list-item-bg, #fff);border:0.0625rem solid var(--modus-list-item-border-color, #e0e1e9);color:var(--modus-list-item-color, #252a2e);display:flex;height:1.5rem;justify-content:flex-start;overflow:hidden;padding:0.5rem 1rem}modus-dropdown .list-container .items-container .action-item .action-item-content svg{margin-right:0.5rem}modus-dropdown .list-container .items-container .action-item .action-item-content svg path{fill:var(--modus-btn-icon-only-dark-color, #252a2e)}modus-dropdown .list-container .items-container .action-item .action-item-content .display-text{display:block;font-size:1rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}modus-dropdown .list-container .items-container .action-item:hover .action-item-content{background-color:var(--modus-list-item-hover-bg, #e0e1e9)}',w=_,x=class{constructor(t){v(this,t),this.cellLinkClick=h(this,"cellLinkClick",7),this.rowDoubleClick=h(this,"rowDoubleClick",7),this.selection=h(this,"selection",7),this.sort=h(this,"sort",7),this.rowActionClick=h(this,"rowActionClick",7),this.classBySize=new Map([["small","size-small"],["large","size-large"]]),this.columns=void 0,this.data=void 0,this.displayOptions={animateRowActionsDropdown:!1,borderless:!0,cellBorderless:!0,rowStripe:!1,size:"large"},this.rowActions=[],this.selectionOptions={canSelect:!1,checkboxSelection:!1},this.sortOptions={canSort:!1,serverSide:!1},this.allSelected=!1,this.sortState={columnId:"",direction:"none"}}dataChanged(t,e){var o;this.originalData=(o=this.originalData)!==null&&o!==void 0?o:u.convertToTRows(e,this.columns)}componentWillLoad(){this.convertColumnsAndRows(),this.updateAllSelected()}componentDidLoad(){this.originalData=u.convertToTRows(this.data,this.columns)}componentWillUpdate(){this.convertColumnsAndRows()}convertColumnsAndRows(){this.columns=u.convertToTColumns(this.columns),this.data=u.convertToTRows(this.data,this.columns)}emitSelection(){this.selection.emit(this.data.filter(t=>t._selected).map(t=>t._id))}handleCheckboxClick(t){this.data=this.data.map(e=>Object.assign(Object.assign({},e),{_selected:e._id===t?!e._selected:e._selected})),this.updateAllSelected(),this.emitSelection()}handleColumnHeaderClick(t){this.sortOptions.canSort&&(t===this.sortState.columnId?this.sortState=Object.assign(Object.assign({},this.sortState),{direction:this.sortState.direction==="asc"?"desc":this.sortState.direction==="desc"?"none":"asc"}):this.sortState=Object.assign(Object.assign({},this.sortState),{direction:"asc",columnId:t}),this.sort.emit({columnId:this.sortState.columnId,direction:this.sortState.direction}),this.sortOptions.serverSide||(this.data=this.sortState.direction==="none"?this.originalData.map(e=>Object.assign(Object.assign({},e),{_selected:this.data.find(o=>o._id===e._id)._selected})):u.sortData(this.data,this.sortState.columnId,this.sortState.direction),this.updateAllSelected()))}handleHeaderCheckboxClick(t){this.data=this.data.map(e=>Object.assign(Object.assign({},e),{_selected:t})),this.emitSelection()}handleRowClick(t){!this.selectionOptions.canSelect||this.selectionOptions.checkboxSelection||(this.data=this.data.map(e=>Object.assign(Object.assign({},e),{_selected:e._id===t?!e._selected:e._selected})),this.emitSelection())}handleRowDoubleClick(t){this.rowDoubleClick.emit(t)}updateAllSelected(){var t;this.allSelected=(t=this.data)===null||t===void 0?void 0:t.every(e=>e._selected)}render(){var t,e,o;const s=`
      ${this.displayOptions.borderless?"borderless":""}
      ${this.displayOptions.cellBorderless?"cell-borderless":""}
      ${this.displayOptions.rowStripe?"row-stripe":""}
      ${this.classBySize.get(this.displayOptions.size)}
    `;return i("table",{key:"bb903b6dd2d3c5aa025b858f9a26a66ff1248cac",class:s},i("colgroup",{key:"afd0ce04b4c068839824ddc648e42e6241459752"},this.selectionOptions.canSelect&&this.selectionOptions.checkboxSelection&&i("col",{style:{width:"34px"}}),(t=this.columns)===null||t===void 0?void 0:t.map(n=>i("col",{style:{width:n.width}})),!!this.rowActions.length&&i("col",{style:{width:"34px"}})),i("thead",{key:"6f9c407f63ff0817314f3d665bde71ac52c51601"},i("tr",{key:"8947edd43bb022c4d4ad350a10c4cd573fbcd2c1"},this.selectionOptions.canSelect&&this.selectionOptions.checkboxSelection&&i("th",null,i("div",{class:"column-header align-center"},i("modus-checkbox",{checked:this.allSelected,onCheckboxClick:n=>this.handleHeaderCheckboxClick(n.detail)}))),(e=this.columns)===null||e===void 0?void 0:e.map(n=>i(f,{column:n,onColumnHeaderClick:a=>this.handleColumnHeaderClick(a),sortOptions:this.sortOptions,sortState:this.sortState})),!!this.rowActions.length&&i("th",null))),i("tbody",{key:"e9c4b28917968636b3813f9d7561a527ed0a6d86"},(o=this.data)===null||o===void 0?void 0:o.map(n=>{var a;return i("tr",{onClick:()=>this.handleRowClick(n._id),onDblClick:()=>this.handleRowDoubleClick(n._id)},this.selectionOptions.canSelect&&this.selectionOptions.checkboxSelection&&i("td",{class:`align-center ${n._selected?"selected":""}`,onClick:l=>l.stopPropagation(),onDblClick:l=>l.stopPropagation()},i("div",null,i("modus-checkbox",{checked:n._selected,onCheckboxClick:()=>this.handleCheckboxClick(n._id)}))),(a=this.columns)===null||a===void 0?void 0:a.map(l=>{var c,d,r,b;return i("td",{class:`align-${l.align} ${l.readonly?"readonly":""} ${n._selected?"selected":""}`},((c=n[l.id])===null||c===void 0?void 0:c._type)==="link"&&i(y,{link:n[l.id],onLinkClick:()=>this.cellLinkClick.emit(n[l.id])}),((d=n[l.id])===null||d===void 0?void 0:d._type)==="badge"&&i(C,{badge:n[l.id]}),!(!((r=n[l.id])===null||r===void 0)&&r._type)&&((b=n[l.id])===null||b===void 0?void 0:b.toString()))}),!!this.rowActions.length&&i("td",{class:`align-center ${n._selected?"selected":""}`,onClick:l=>l.stopPropagation(),onDblClick:l=>l.stopPropagation()},i(S,{actions:this.rowActions,animateDropdown:this.displayOptions.animateRowActionsDropdown,onRowActionClick:(l,c)=>this.rowActionClick.emit({actionId:l,rowId:c}),rowId:n._id})))})))}static get watchers(){return{data:["dataChanged"]}}};x.style=w;export{x as modus_data_table};
