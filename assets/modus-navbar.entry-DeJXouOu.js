import{r as I,c,h as n,F as _,H as S,g as T}from"./index-ptaIuowM.js";import{I as D}from"./icon-search-b64c4b4f-BoXKHS5N.js";import{I as L}from"./icon-help-e7581158-BmDz7m6M.js";import{M as N}from"./ModusIconMap-11e94e00-DXVfABvR.js";import"./IconChevronLeft-f85188e7-DPzFQgwr.js";import"./IconChevronRight-de7de2e8-Dk2T6SFC.js";import"./IconClose-9751af6c-D4l0xjLh.js";import"./IconExpand-27433628-BxItHJgI.js";import"./IconVisibilityOn-4d4ac4d9-DUHpMR8a.js";const K=e=>{var o,a,t;return n("svg",{class:`icon-menu ${e.pressed?"pressed":""}`,height:(o=e.size)!==null&&o!==void 0?o:16,width:(a=e.size)!==null&&a!==void 0?a:16,onClick:e.onClick?s=>e.onClick(s):null,viewBox:"0 0 24 24",fill:(t=e.color)!==null&&t!==void 0?t:"currentColor"},n("path",{d:"M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"}))},A=e=>{var o,a,t;return n("svg",{class:`icon-notifications ${e.pressed?"pressed":""}`,height:(o=e.size)!==null&&o!==void 0?o:16,width:(a=e.size)!==null&&a!==void 0?a:16,onClick:e.onClick?s=>e.onClick(s):null,viewBox:"0 0 24 24",fill:(t=e.color)!==null&&t!==void 0?t:"currentColor"},n("path",{d:"M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2Zm9.67-2.69C18.36 15.96 17 13.66 17 10a5 5 0 0 0-4-4.9V4c0-.55-.45-1-1-1s-1 .45-1 1v1.1A5 5 0 0 0 7 10c0 3.66-1.37 5.96-2.67 7.31-.61.64-.16 1.69.72 1.69h13.91c.88 0 1.33-1.05.72-1.69Z"}))},B=e=>{var o,a,t;return n("svg",{class:`icon-apps ${e.pressed?"pressed":""}`,height:(o=e.size)!==null&&o!==void 0?o:16,width:(a=e.size)!==null&&a!==void 0?a:16,onClick:e.onClick?s=>e.onClick(s):null,viewBox:"0 0 24 24",fill:(t=e.color)!==null&&t!==void 0?t:"currentColor"},n("path",{d:"M4 8H8V4H4V8ZM10 20H14V16H10V20ZM4 20H8V16H4V20ZM4 14H8V10H4V14ZM10 14H14V10H10V14ZM16 4V8H20V4H16ZM10 8H14V4H10V8ZM16 14H20V10H16V14ZM16 20H20V16H16V20Z"}))},E=({logos:e,onClick:o})=>{var a,t;const{primary:s,secondary:d}=e||{};return n("div",{"aria-label":"Logo",onClick:o,onKeyDown:r=>{r.key!=="Enter"&&r.key!==" "||o&&o(r)},tabindex:"0",role:"button",class:"product-logo"},s&&n("img",{class:d&&"product-logo-primary",height:(a=s.height)!==null&&a!==void 0?a:"24",src:s.url,alt:"Modus Navbar primary product logo","data-test-id":"primary-logo"}),d&&n("img",{class:s&&"product-logo-secondary",height:(t=d.height)!==null&&t!==void 0?t:"24",src:d.url,alt:"Modus Navbar secondary product logo","data-test-id":"secondary-logo"}))},z=({buttons:e,reverse:o,onClick:a,onKeyDown:t,openButtonMenuId:s})=>(e||[]).map((l,r)=>{var u;return n("div",{onClick:v=>a(v,l),onKeyDown:v=>t(v,l)},n("modus-dropdown",{"toggle-element-id":"navbar-button-"+r,showDropdownListBorder:!1},n("div",{class:"navbar-button",id:"navbar-button-"+r,slot:"dropdownToggle"},n("span",{class:"navbar-button-icon",role:"button",tabIndex:0},n("modus-tooltip",{text:(u=l.tooltip)===null||u===void 0?void 0:u.text,position:"bottom"},n("div",{class:"icon-button"},n(N,{icon:l.icon,size:"24",pressed:s===l.id}))))),!l.hideMenu&&n("modus-navbar-button-menu",{slot:"dropdownList",reverse:o},n("slot",{name:l.id}))))}),U=({itemSelect:e,options:o,reverse:a,selectedItem:t})=>{const s=a?"rtl":"ltr",d="navbar-dropdown",l=r=>{e(r)};return n("modus-dropdown",{"toggle-element-id":d},n("modus-button",{"aria-label":o.ariaLabel,"button-style":"borderless",color:"secondary",id:d,slot:"dropdownToggle","show-caret":!0},t==null?void 0:t.text),n("modus-list",{dir:s,slot:"dropdownList"},o.items.map(r=>n("modus-list-item",{key:r.value,onItemClick:()=>l(r),selected:r===t},r.text))))},Z='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");nav{align-items:center;background-color:var(--modus-navbar-bg, #fff);display:flex;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";height:56px}nav.reverse{flex-direction:row-reverse}nav.shadow{box-shadow:0 0 4px rgba(36, 35, 45, 0.3)}nav .badge{border-radius:50%;color:white;height:22px;position:absolute;right:2px;top:2px;width:22px}nav .icon-search,nav .icon-notifications,nav .icon-help,nav .icon-apps,nav .icon-menu,nav .icon-close,nav .icon-button svg{border-radius:0.25rem;padding:0.75rem}nav .icon-search path,nav .icon-notifications path,nav .icon-help path,nav .icon-apps path,nav .icon-menu path,nav .icon-close path,nav .icon-button svg path{fill:var(--modus-navbar-icon-color, #252a2e)}nav .icon-search:hover:not(.pressed),nav .icon-notifications:hover:not(.pressed),nav .icon-help:hover:not(.pressed),nav .icon-apps:hover:not(.pressed),nav .icon-menu:hover:not(.pressed),nav .icon-close:hover:not(.pressed),nav .icon-button svg:hover:not(.pressed){background-color:var(--modus-navbar-icon-hover-bg, #e0e1e9)}nav .icon-search:hover:not(.pressed) path,nav .icon-notifications:hover:not(.pressed) path,nav .icon-help:hover:not(.pressed) path,nav .icon-apps:hover:not(.pressed) path,nav .icon-menu:hover:not(.pressed) path,nav .icon-close:hover:not(.pressed) path,nav .icon-button svg:hover:not(.pressed) path{fill:var(--modus-navbar-icon-hover-color, #3c444a)}nav .icon-search:active,nav .icon-search.pressed,nav .icon-notifications:active,nav .icon-notifications.pressed,nav .icon-help:active,nav .icon-help.pressed,nav .icon-apps:active,nav .icon-apps.pressed,nav .icon-menu:active,nav .icon-menu.pressed,nav .icon-close:active,nav .icon-close.pressed,nav .icon-button svg:active,nav .icon-button svg.pressed{background-color:var(--modus-navbar-icon-active-bg, #cbcdd6)}nav .icon-search:active path,nav .icon-search.pressed path,nav .icon-notifications:active path,nav .icon-notifications.pressed path,nav .icon-help:active path,nav .icon-help.pressed path,nav .icon-apps:active path,nav .icon-apps.pressed path,nav .icon-menu:active path,nav .icon-menu.pressed path,nav .icon-close:active path,nav .icon-close.pressed path,nav .icon-button svg:active path,nav .icon-button svg.pressed path{fill:var(--modus-navbar-icon-active-color, #0e1012)}nav .main-menu-button{padding:0 0.5rem}nav .navbar-button{position:relative}nav .navbar-button:hover{cursor:pointer}nav .navbar-button .navbar-button-icon,nav .navbar-button .icon-button,nav .navbar-button modus-tooltip{display:flex}nav .navbar-button-list{display:flex}nav .navbar-logo{padding-inline-end:0.5rem}nav .right,nav .left{align-items:center;display:inline-flex;height:100%}nav .right.expand,nav .left.expand{display:none}nav .right.collapse,nav .left.collapse{display:inline-flex}nav .right.reverse,nav .left.reverse{flex-direction:row-reverse}nav .left img.product-logo-primary{filter:var(--modus-navbar-brand-logo-filter);max-height:32px;padding:0 0.5rem;user-select:none}nav .left img.product-logo-secondary{filter:var(--modus-navbar-brand-logo-filter)}nav .right{margin-left:auto}nav .right.reverse{margin-left:0;margin-right:auto}nav .right .search{align-items:center;display:inline-flex}nav .right .pendo-placeholder{height:40px;width:40px}nav .right .profile-menu{align-items:center;cursor:default;display:inline-flex;height:40px;justify-content:center;margin:0 0.5rem;position:relative;width:40px}nav .right .profile-menu modus-tooltip img.avatar{background-color:var(--modus-navbar-icon-color, #252a2e);border-radius:50%;display:flex;height:32px;max-height:32px;max-width:32px;width:32px}nav .right .profile-menu modus-tooltip .initials{align-items:center;background-color:var(--modus-navbar-icon-color, #252a2e);border-radius:50%;color:var(--modus-navbar-profile-icon-initials-color, #fff);display:flex;font-size:0.875rem;font-weight:600;height:32px;justify-content:center;max-height:32px;max-width:32px;user-select:none;width:32px}nav .right .profile-menu modus-tooltip>:first-child:hover{border:0.25rem solid var(--modus-navbar-icon-hover-bg, #e0e1e9)}nav .right .profile-menu modus-tooltip>:first-child:active,nav .right .profile-menu modus-tooltip>:first-child:focus{border:0.25rem solid var(--modus-navbar-profile-icon-active-border-color, #d6d5db);outline:none}nav .right .profile-menu modus-tooltip:hover{cursor:pointer}nav .overlay{width:100%}nav.nav-blue{background-color:var(--modus-navbar-blue-bg, #0e416c)}nav.nav-blue .icon-search path,nav.nav-blue .icon-notifications path,nav.nav-blue .icon-help path,nav.nav-blue .icon-apps path,nav.nav-blue .icon-menu path,nav.nav-blue .icon-close path,nav.nav-blue .icon-button svg path{fill:var(--modus-navbar-blue-icon-color, #fff)}nav.nav-blue .icon-search:hover:not(.pressed),nav.nav-blue .icon-notifications:hover:not(.pressed),nav.nav-blue .icon-help:hover:not(.pressed),nav.nav-blue .icon-apps:hover:not(.pressed),nav.nav-blue .icon-menu:hover:not(.pressed),nav.nav-blue .icon-close:hover:not(.pressed),nav.nav-blue .icon-button svg:hover:not(.pressed){background-color:var(--modus-navbar-blue-icon-hover-bg, #217cbb);outline:0.0625rem solid var(--modus-navbar-blue-icon-hover-border-color, #019aeb)}nav.nav-blue .icon-search:hover:not(.pressed) path,nav.nav-blue .icon-notifications:hover:not(.pressed) path,nav.nav-blue .icon-help:hover:not(.pressed) path,nav.nav-blue .icon-apps:hover:not(.pressed) path,nav.nav-blue .icon-menu:hover:not(.pressed) path,nav.nav-blue .icon-close:hover:not(.pressed) path,nav.nav-blue .icon-button svg:hover:not(.pressed) path{fill:var(--modus-navbar-blue-icon-hover-color, #fff)}nav.nav-blue .icon-search:active,nav.nav-blue .icon-search.pressed,nav.nav-blue .icon-notifications:active,nav.nav-blue .icon-notifications.pressed,nav.nav-blue .icon-help:active,nav.nav-blue .icon-help.pressed,nav.nav-blue .icon-apps:active,nav.nav-blue .icon-apps.pressed,nav.nav-blue .icon-menu:active,nav.nav-blue .icon-menu.pressed,nav.nav-blue .icon-close:active,nav.nav-blue .icon-close.pressed,nav.nav-blue .icon-button svg:active,nav.nav-blue .icon-button svg.pressed{background-color:var(--modus-navbar-blue-icon-active-bg, #019aeb)}nav.nav-blue .icon-search:active path,nav.nav-blue .icon-search.pressed path,nav.nav-blue .icon-notifications:active path,nav.nav-blue .icon-notifications.pressed path,nav.nav-blue .icon-help:active path,nav.nav-blue .icon-help.pressed path,nav.nav-blue .icon-apps:active path,nav.nav-blue .icon-apps.pressed path,nav.nav-blue .icon-menu:active path,nav.nav-blue .icon-menu.pressed path,nav.nav-blue .icon-close:active path,nav.nav-blue .icon-close.pressed path,nav.nav-blue .icon-button svg:active path,nav.nav-blue .icon-button svg.pressed path{fill:var(--modus-navbar-blue-icon-active-color, #fff)}nav.nav-blue .profile-menu modus-tooltip img.avatar,nav.nav-blue .profile-menu modus-tooltip .initials{background-color:var(--modus-navbar-blue-icon-color, #fff)}nav.nav-blue .profile-menu modus-tooltip .initials{color:var(--modus-navbar-blue-profile-icon-initials-color, #0e416c)}nav.nav-blue .profile-menu modus-tooltip>:first-child:hover{border-color:var(--modus-navbar-blue-icon-hover-bg, #217cbb);border-radius:50%;outline:0.125rem solid var(--modus-navbar-blue-profile-icon-active-border-color, #019aeb)}nav.nav-blue .profile-menu modus-tooltip>:first-child:active,nav.nav-blue .profile-menu modus-tooltip>:first-child:focus{border-color:var(--modus-navbar-blue-profile-icon-active-border-color, #019aeb);border-radius:50%;outline:none}nav.nav-blue .profile-menu modus-tooltip:hover{cursor:pointer}nav .product-logo{display:flex;justify-content:center;user-select:none}@media screen and (width > 576px){nav .product-logo .product-logo-secondary{display:none}}@media screen and (width <= 576px){nav .product-logo .product-logo-primary{display:none}}',P=Z,j=class{constructor(e){I(this,e),this.appsMenuOpen=c(this,"appsMenuOpen",7),this.appsMenuAppOpen=c(this,"appsMenuAppOpen",7),this.buttonClick=c(this,"buttonClick",7),this.helpOpen=c(this,"helpOpen",7),this.dropdownItemSelect=c(this,"dropdownItemSelect",7),this.mainMenuClick=c(this,"mainMenuClick",7),this.notificationsMenuOpen=c(this,"notificationsMenuOpen",7),this.productLogoClick=c(this,"productLogoClick",7),this.profileMenuLinkClick=c(this,"profileMenuLinkClick",7),this.profileMenuOpen=c(this,"profileMenuOpen",7),this.profileMenuSignOutClick=c(this,"profileMenuSignOutClick",7),this.searchChange=c(this,"searchChange",7),this.searchMenuClick=c(this,"searchMenuClick",7),this.SLOT_MAIN="main",this.SLOT_NOTIFICATIONS="notifications",this.SLOT_PROFILE_MENU="profileMenu",this.navAriaLabel=void 0,this.apps=void 0,this.buttons=void 0,this.enableSearchOverlay=void 0,this.logoOptions=void 0,this.dropdownOptions=void 0,this.selectedDropdownItem=void 0,this.profileMenuOptions=void 0,this.reverse=void 0,this.searchTooltip=void 0,this.showAppsMenu=void 0,this.showMainMenu=void 0,this.showNotifications=void 0,this.notificationCount=void 0,this.showPendoPlaceholder=void 0,this.showProfile=!0,this.showSearch=void 0,this.showShadow=void 0,this.showHelp=void 0,this.helpTooltip=void 0,this.helpUrl=void 0,this.variant="default",this.appsMenuVisible=void 0,this.mainMenuVisible=void 0,this.notificationsMenuVisible=void 0,this.profileMenuVisible=void 0,this.slots=[],this.searchOverlayVisible=void 0,this.openButtonMenuId=void 0}async hideMainMenu(){this.mainMenuVisible=!1}documentClickHandler(e){e.defaultPrevented||this.hideMenus()}linkClickHandler(e){e.stopPropagation(),this.profileMenuLinkClick.emit(e.detail)}signOutClickHandler(e){this.profileMenuSignOutClick.emit(e)}componentDidRender(){var e,o,a;(e=this.profileAvatarElement)===null||e===void 0||e.addEventListener("error",()=>{this.profileMenuOptions=Object.assign(Object.assign({},this.profileMenuOptions),{avatarUrl:null})});const t=this.element.querySelectorAll("[slot]"),s=Array.from(t).map(l=>l.slot)||[];(((o=this.slots)===null||o===void 0?void 0:o.length)!==s.length||((a=this.slots)===null||a===void 0?void 0:a.filter(l=>!s.includes(l)).length))&&(this.slots=[...s])}appsMenuClickHandler(e){e.preventDefault(),this.appsMenuToggle()}appsMenuKeydownHandler(e){e.code==="Enter"&&this.appsMenuToggle()}appsMenuToggle(){this.appsMenuVisible?this.appsMenuVisible=!1:(this.hideMenus(),this.appsMenuVisible=!0,this.appsMenuOpen.emit())}handleAppsMenuAppOpen(e){e.stopPropagation(),this.appsMenuAppOpen.emit(e.detail)}mainMenuClickHandler(e){e.preventDefault(),this.mainMenuToggle(e)}mainMenuKeydownHandler(e){e.code==="Enter"&&this.mainMenuToggle(e)}mainMenuToggle(e){var o;!((o=this.slots)===null||o===void 0)&&o.includes(this.SLOT_MAIN)&&(this.mainMenuVisible?this.mainMenuVisible=!1:(this.hideMenus(),this.mainMenuVisible=!0)),this.mainMenuClick.emit(e)}notificationsMenuClickHandler(e){e.preventDefault(),this.notificationsMenuToggle()}notificationsMenuKeydownHandler(e){e.code==="Enter"&&this.notificationsMenuToggle()}notificationsMenuToggle(){this.notificationsMenuVisible?this.notificationsMenuVisible=!1:(this.hideMenus(),this.notificationsMenuVisible=!0,this.notificationsMenuOpen.emit())}profileMenuClickHandler(e){e.preventDefault(),this.profileMenuToggle()}profileMenuKeydownHandler(e){e.code==="Enter"&&this.profileMenuToggle()}profileMenuToggle(){this.profileMenuVisible?this.profileMenuVisible=!1:(this.hideMenus(),this.profileMenuVisible=!0,this.profileMenuOpen.emit())}hideMenus(){this.appsMenuVisible=!1,this.mainMenuVisible=!1,this.notificationsMenuVisible=!1,this.profileMenuVisible=!1,this.openButtonMenuId=void 0}helpMenuClickHandler(e){e.preventDefault(),this.openHelpMenu()}helpMenuKeyHandler(e){e.code!=="Enter"&&e.code!=="Space"||this.openHelpMenu()}openHelpMenu(){this.helpUrl&&window.open(this.helpUrl,"_blank"),this.helpOpen.emit()}searchMenuClickHandler(e){e.preventDefault(),this.enableSearchOverlay?this.searchOverlayVisible=!0:this.searchMenuClick.emit()}searchMenuKeydownHandler(e){e.code==="Enter"&&(this.enableSearchOverlay?this.searchOverlayVisible=!0:this.searchMenuClick.emit())}searchOverlayCloseEventHandler(){this.searchOverlayVisible=!1,setTimeout(()=>{var e;(e=this.searchButton)===null||e===void 0||e.focus()},100)}showButtonMenuById(e){this.buttonClick.emit(e);const o=this.openButtonMenuId===e;this.hideMenus(),this.openButtonMenuId!==e&&!o&&(this.openButtonMenuId=e)}buttonMenuClickHandler(e,o){e.preventDefault(),this.showButtonMenuById(o.id)}buttonMenuKeyDownHandler(e,o){(e.code=="Enter"||e.code=="Space")&&(e.preventDefault(),this.showButtonMenuById(o.id)),e.code=="Escape"&&this.hideMenus()}dropdownItemSelectHandler(e){this.selectedDropdownItem=e,this.dropdownItemSelect.emit(e)}getNotificationCount(){if(!this.notificationCount)return;const e=this.notificationCount;return e<1?"1":e>99?"99+":this.notificationCount.toString()}render(){var e,o,a,t,s,d,l,r,u,v,h,b,f,m,g,M,w,y;const k=this.reverse?"reverse":"",O=this.showShadow?"shadow":"",H=`${this.variant==="default"?"":"nav-"+this.variant}`,x=(e=this.buttons)===null||e===void 0?void 0:e.sort((i,p)=>i.orderIndex-p.orderIndex),V=this.searchOverlayVisible&&n("modus-navbar-search-overlay",{key:"04995c7a7199c193a4d20ccc968deefd4ffca0b2",class:"overlay",onClose:()=>this.searchOverlayCloseEventHandler(),onSearch:i=>this.searchChange.emit(i.detail)}),C=this.getNotificationCount();return n(S,{key:"d2c7648acc9711db474549999b9fb4c3efa49fa6"},n("nav",{key:"72b50d1971fa216089e8a94ce03b4d9dff6be7f3",class:`${k} ${O} ${H}`,"aria-label":this.navAriaLabel},!this.searchOverlayVisible&&n(_,null,n("div",{class:`left ${k}`},this.showMainMenu&&n("div",{class:"navbar-button main-menu-button"},n("span",{class:"navbar-button-icon",role:"button","aria-label":"Toggle navigation",onKeyDown:i=>this.mainMenuKeydownHandler(i),tabIndex:0},n(K,{size:"24",pressed:this.mainMenuVisible,onClick:i=>this.mainMenuClickHandler(i)}))),this.mainMenuVisible&&n("modus-navbar-main-menu",{parentNavbar:this.element},n("slot",{name:this.SLOT_MAIN})),this.logoOptions&&n("div",{class:"navbar-logo"},n(E,{logos:this.logoOptions,onClick:i=>this.productLogoClick.emit(i)})),this.dropdownOptions&&n(U,{itemSelect:i=>this.dropdownItemSelectHandler(i),options:this.dropdownOptions,reverse:this.reverse,selectedItem:this.selectedDropdownItem})),n("div",{class:`right ${k}`},this.showSearch&&n("div",{class:"navbar-button search","data-test-id":"search-menu"},n("modus-tooltip",{text:(o=this.searchTooltip)===null||o===void 0?void 0:o.text,"aria-label":((a=this.searchTooltip)===null||a===void 0?void 0:a.ariaLabel)||void 0,position:"bottom"},n("span",{class:"navbar-button-icon","aria-label":"Search",role:"button",onKeyDown:i=>this.searchMenuKeydownHandler(i),tabIndex:0,id:"search-button",ref:i=>this.searchButton=i},n(D,{size:"24",onClick:i=>this.searchMenuClickHandler(i),pressed:this.searchOverlayVisible})))),n(z,{buttons:x,reverse:this.reverse,openButtonMenuId:this.openButtonMenuId,onKeyDown:(i,p)=>this.buttonMenuKeyDownHandler(i,p),onClick:(i,p)=>this.buttonMenuClickHandler(i,p)}),this.showNotifications&&n("div",{class:"navbar-button","data-test-id":"notifications-menu"},n("span",{class:"navbar-button-icon",role:"button","aria-label":"Notifications",onKeyDown:i=>this.notificationsMenuKeydownHandler(i),tabIndex:0},n(A,{size:"24",onClick:i=>this.notificationsMenuClickHandler(i),pressed:this.notificationsMenuVisible}),C&&n("modus-badge",{class:"badge",color:"danger",size:"medium",type:"counter","aria-label":"Notification badge"},C)),this.notificationsMenuVisible&&n("modus-navbar-notifications-menu",{reverse:this.reverse},n("slot",{name:this.SLOT_NOTIFICATIONS}))),this.showPendoPlaceholder&&n("div",{class:"pendo-placeholder"}),this.showHelp&&n("div",{class:"navbar-button","data-test-id":"help-menu"},n("modus-tooltip",{text:(t=this.helpTooltip)===null||t===void 0?void 0:t.text,"aria-label":((s=this.helpTooltip)===null||s===void 0?void 0:s.ariaLabel)||void 0,position:"bottom"},n("span",{class:"navbar-button-icon",role:"button",onKeyDown:i=>this.helpMenuKeyHandler(i),"aria-label":"Help",onClick:i=>this.helpMenuClickHandler(i),tabIndex:0},n(L,{size:"24"})))),this.showAppsMenu&&n("div",{class:"navbar-button","data-test-id":"apps-menu"},n("span",{class:"navbar-button-icon",role:"button","aria-label":"Apps",onKeyDown:i=>this.appsMenuKeydownHandler(i),tabIndex:0},n(B,{size:"24",pressed:this.appsMenuVisible,onClick:i=>this.appsMenuClickHandler(i)})),this.appsMenuVisible&&n("modus-navbar-apps-menu",{apps:this.apps,reverse:this.reverse,onAppOpen:i=>this.handleAppsMenuAppOpen(i)})),this.showProfile&&n("div",{class:"profile-menu"},n("modus-tooltip",{text:(l=(d=this.profileMenuOptions)===null||d===void 0?void 0:d.tooltip)===null||l===void 0?void 0:l.text,"aria-label":((u=(r=this.profileMenuOptions)===null||r===void 0?void 0:r.tooltip)===null||u===void 0?void 0:u.ariaLabel)||void 0,disabled:this.profileMenuVisible,position:"bottom"},!((v=this.profileMenuOptions)===null||v===void 0)&&v.avatarUrl?n("img",{class:"avatar",height:"32",src:(h=this.profileMenuOptions)===null||h===void 0?void 0:h.avatarUrl,alt:"Modus navbar profile menu avatar",onClick:i=>this.profileMenuClickHandler(i),onKeyDown:i=>this.profileMenuKeydownHandler(i),tabIndex:0,ref:i=>this.profileAvatarElement=i}):n("span",{class:"initials",onClick:i=>this.profileMenuClickHandler(i),onKeyDown:i=>this.profileMenuKeydownHandler(i),tabIndex:0},(b=this.profileMenuOptions)===null||b===void 0?void 0:b.initials)),this.profileMenuVisible&&n("modus-navbar-profile-menu",{"avatar-url":(f=this.profileMenuOptions)===null||f===void 0?void 0:f.avatarUrl,email:(m=this.profileMenuOptions)===null||m===void 0?void 0:m.email,initials:(g=this.profileMenuOptions)===null||g===void 0?void 0:g.initials,links:(M=this.profileMenuOptions)===null||M===void 0?void 0:M.links,reverse:this.reverse,username:(w=this.profileMenuOptions)===null||w===void 0?void 0:w.username,variant:this.variant,"sign-out-text":(y=this.profileMenuOptions)===null||y===void 0?void 0:y.signOutText},n("slot",{name:this.SLOT_PROFILE_MENU}))))),V))}get element(){return T(this)}};j.style=P;export{j as modus_navbar};
