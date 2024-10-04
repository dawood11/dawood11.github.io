import{r as i,c as s,h as o,H as d,g as c}from"./index-Csztsnsr.js";import{M as l}from"./ModusIconMap-11e94e00-CfL4IIXs.js";import{I as u}from"./icon-close-f75c05f5-CBFpzPdL.js";import"./IconChevronLeft-f85188e7-BlsufsGG.js";import"./IconChevronRight-de7de2e8-D2E3csmL.js";import"./IconClose-9751af6c-HfY6x2x7.js";import"./IconExpand-27433628-CSP3So3i.js";import"./IconVisibilityOn-4d4ac4d9-D_O36dB_.js";const p='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.apps-menu{background-color:var(--modus-body-bg, #fff);border:0.0625rem solid var(--modus-navbar-popup-border-color, #cbcdd6);border-radius:0.25rem;box-shadow:0 0 8px rgba(36, 35, 45, 0.3);color:var(--modus-body-color, #252a2e);display:flex;flex-direction:column;max-width:384px;padding:0;position:absolute;right:0;top:48px;z-index:100;align-items:flex-start;background-color:var(--modus-navbar-popup-bg, #fff);cursor:default;max-height:605px;overflow-y:auto;padding:0.5rem;width:max-content}.apps-menu.reverse{left:0}.apps-menu .app-div{width:100%}.apps-menu .app{border-color:var(--modus-navbar-popup-border-color, #464b52);border-radius:0.25rem;box-sizing:border-box;color:var(--modus-body-color, #252a2e);cursor:default;display:flex;padding:0.25rem;text-decoration:none;width:100%}.apps-menu .app:hover{background-color:var(--modus-navbar-icon-hover-bg, #e0e1e9);cursor:pointer}.apps-menu .app:active{background-color:var(--modus-navbar-icon-active-bg, #cbcdd6)}.apps-menu .app:not(:last-child){margin-bottom:0.5rem}.apps-menu .app img{margin-right:0.75rem}.apps-menu .app .right{align-self:center}.apps-menu .app .right .name{font-size:0.875rem;font-weight:600}.apps-menu .app .right .description{font-size:0.75rem}.apps-menu .category{border-top:0.0625rem solid var(--modus-navbar-popup-border-color, #464b52);color:var(--modus-body-color, #252a2e);font-size:0.75rem;font-weight:600;margin-top:0.5rem;padding-bottom:0.625rem;padding-top:1.125rem}',m=p,b=class{constructor(e){i(this,e),this.appOpen=s(this,"appOpen",7),this.apps=void 0,this.reverse=void 0}clickAppHandler(e,t){e.preventDefault(),window.open(t.url,"_blank"),this.appOpen.emit(t)}render(){var e;const t=this.reverse?"reverse":"";return o("div",{key:"43839464e5f074c69989af7647bc6a228cd8d150",class:`apps-menu ${t}`,onClick:r=>r.preventDefault()},(e=this.apps)===null||e===void 0?void 0:e.map(r=>o("div",{class:"app-div"},r.showCategory?o("div",{class:"category"},r.category):null,o("a",{class:"app",href:r.url,onClick:a=>this.clickAppHandler(a,r)},o("img",{src:r.logoUrl,alt:"",height:"32",width:"32"}),o("div",{class:"right"},o("div",{class:"name"},r.name),r.description?o("div",{class:"description"},r.description):null)))))}};b.style=m;const f='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.button-menu{background-color:var(--modus-body-bg, #fff);border:0.0625rem solid var(--modus-navbar-popup-border-color, #cbcdd6);border-radius:0.25rem;box-shadow:0 0 8px rgba(36, 35, 45, 0.3);color:var(--modus-body-color, #252a2e);display:flex;flex-direction:column;max-width:384px;padding:0;position:absolute;right:0;top:48px;z-index:100;background-color:var(--modus-navbar-popup-bg, #fff);cursor:default;padding:0;top:0;width:max-content}.button-menu.reverse{left:0}',v=f,h=class{constructor(e){i(this,e),this.reverse=void 0}render(){const e={"button-menu":!0,reverse:this.reverse};return o("div",{key:"f2c30b9f9d38f8c21ba788e911aff0c9957f086e",class:e},o("slot",{key:"dc21504ecdbd172d93c260e8613d7cf1169b2f39"}))}};h.style=v;const g=Object.freeze({position:"fixed",top:"0px",left:"0px",height:"0px"}),y=Object.freeze({childList:!0}),x='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.main-menu{background-color:var(--modus-body-bg, #fff);border:0.0625rem solid var(--modus-navbar-popup-border-color, #cbcdd6);border-radius:0.25rem;box-shadow:0 0 8px rgba(36, 35, 45, 0.3);color:var(--modus-body-color, #252a2e);display:flex;flex-direction:column;max-width:384px;padding:0;position:absolute;right:0;top:48px;z-index:100;background-color:var(--modus-navbar-popup-bg, #fff);border:unset;border-radius:0 0 0.125rem 0.125rem;box-sizing:border-box;clip-path:inset(0 -10px -10px -10px);cursor:default;max-width:616px;min-width:248px;padding:0;width:max-content}',w=x,k=class{constructor(e){i(this,e),this.observer=null,this.updateContainerLayout=()=>{var t;const r=(t=this.parentNavbar)===null||t===void 0?void 0:t.getBoundingClientRect();if(!r)return;const a=window.innerHeight-r.bottom,n=Math.min(a,window.innerHeight);this.containerLayout=Object.assign(Object.assign({},this.containerLayout),{top:`${r.bottom}px`,left:`${r.left}px`,height:`${n}px`})},this.parentNavbar=void 0,this.containerLayout=g}componentDidLoad(){this.updateContainerLayout(),this.addSubscriptions()}disconnectedCallback(){this.removeSubscriptions()}addSubscriptions(){window.addEventListener("resize",this.updateContainerLayout),window.addEventListener("scroll",this.updateContainerLayout),this.connectDOMObserver()}removeSubscriptions(){window.removeEventListener("resize",this.updateContainerLayout),window.removeEventListener("scroll",this.updateContainerLayout),this.disconnectDOMObserver()}connectDOMObserver(){this.observer=new MutationObserver(this.updateContainerLayout),this.observer.observe(document.body,y)}disconnectDOMObserver(){this.observer&&this.observer.disconnect()}render(){const e=Object.assign({},this.containerLayout);return o("div",{key:"1c3546ded6eac4952dfe92c5f8699cf3a9796558",class:"main-menu",style:e,onClick:t=>t.preventDefault()},o("slot",{key:"dd81397f315bd7c173767c20d88cff829cb6a45c"}))}};k.style=w;const M='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.notifications-menu{background-color:var(--modus-body-bg, #fff);border:0.0625rem solid var(--modus-navbar-popup-border-color, #cbcdd6);border-radius:0.25rem;box-shadow:0 0 8px rgba(36, 35, 45, 0.3);color:var(--modus-body-color, #252a2e);display:flex;flex-direction:column;max-width:384px;padding:0;position:absolute;right:0;top:48px;z-index:100;background-color:var(--modus-navbar-popup-bg, #fff);cursor:default;width:max-content}.notifications-menu.reverse{left:0}',O=M,C=class{constructor(e){i(this,e),this.reverse=void 0}render(){const e=this.reverse?"reverse":"";return o("div",{key:"531acef768a44cdbe68018635b96512adb05becf",class:`notifications-menu ${e}`,onClick:t=>t.preventDefault()},o("slot",{key:"c8b94931af47161572850fff2d104b0a70307d57"}))}};C.style=O;const _='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.profile-menu{background-color:var(--modus-body-bg, #fff);border:0.0625rem solid var(--modus-navbar-popup-border-color, #cbcdd6);border-radius:0.25rem;box-shadow:0 0 8px rgba(36, 35, 45, 0.3);color:var(--modus-body-color, #252a2e);display:flex;flex-direction:column;max-width:384px;padding:0;position:absolute;right:0;top:48px;z-index:100;align-items:center;background-color:var(--modus-navbar-popup-bg, #fff);cursor:default;padding:0;width:19rem}.profile-menu .user{align-items:center;display:flex;flex-direction:column;justify-content:center;padding:1rem 1.5rem 0 1.5rem}.profile-menu .user .avatar,.profile-menu .user .initials{background-color:var(--modus-navbar-icon-color, #252a2e);border-radius:50%;height:6rem;margin-bottom:1rem;user-select:none;width:6rem}.profile-menu .user .initials{align-items:center;color:var(--modus-navbar-profile-icon-initials-color, #fff);display:flex;font-size:1.5rem;font-weight:600;justify-content:center}.profile-menu .user .user-details{align-items:center;display:flex;flex-direction:column;justify-content:center;margin-bottom:1rem;max-width:16rem}.profile-menu .user .user-details .username{font-size:1rem;font-weight:600;overflow-wrap:break-word;text-align:center;width:fit-content}.profile-menu .user .user-details .email{font-size:0.75rem;overflow-wrap:anywhere;text-align:center}.profile-menu.profile-menu-blue .user .avatar,.profile-menu.profile-menu-blue .user .initials{background-color:#b7b9c3;color:var(--modus-navbar-blue-profile-icon-initials-color, #0e416c)}.profile-menu .links{cursor:pointer;margin-bottom:0.75rem;max-width:19rem;user-select:none;width:100%}.profile-menu .links .link-item{align-items:center;display:flex;flex-direction:row;white-space:normal;word-wrap:break-word}.profile-menu .links .icon{align-items:center;display:flex;justify-content:center;margin-right:1rem}.profile-menu .sign-out{background-color:var(--modus-navbar-profile-menu-sign-out-background-color, #f1f1f6);user-select:none;width:100%}.profile-menu .sign-out div{color:var(--modus-blue, #0063a3);cursor:pointer;font-size:0.875rem;padding:0.625rem 1rem}@media (hover: hover){.profile-menu .sign-out div:hover{text-decoration:underline}}.profile-menu.reverse{left:0}',N=_,S=class{constructor(e){i(this,e),this.linkClick=s(this,"linkClick",7),this.signOutClick=s(this,"signOutClick",7),this.avatarUrl=void 0,this.email=void 0,this.initials=void 0,this.links=void 0,this.signOutText="Sign out",this.reverse=void 0,this.username=void 0,this.variant="default"}signOutKeydownHandler(e){e.code==="Enter"&&this.signOutClick.emit()}render(){var e;const t=this.reverse?"reverse":"",r=this.variant==="default"?"":`profile-menu-${this.variant}`;return o("div",{key:"950336bb8022523f5d9d82b680b1f93627394c66",class:`profile-menu ${t} ${r}`,onClick:a=>a.preventDefault()},o("div",{key:"3ade3406c483372cdd6ff51e8ec076c3de2a0abe",class:"user"},this.avatarUrl?o("img",{class:"avatar",src:this.avatarUrl,alt:"Avatar"}):o("span",{class:"initials"},this.initials),o("div",{key:"3fab86cf79860d4d8a450d67657747a2ff980469",class:"user-details"},o("div",{key:"c6bbb2a6a57ec589696042009fc681907852e693",class:"username"},this.username),o("div",{key:"e7badf44abd0124cd3e3ff7632e878212a9bdb97",class:"email"},this.email))),!((e=this.links)===null||e===void 0)&&e.length?o("modus-list",{class:"links"},this.links.map(a=>o("modus-list-item",{borderless:!0,onItemClick:()=>this.linkClick.emit(a.id)},o("div",{class:"link-item"},a.icon&&o("div",{class:"icon"},o(l,{icon:a.icon,size:"24"})),a.display)))):null,o("slot",{key:"4056c5fcd4b8180ce1db6424b4b6a28657ba3497"}),o("div",{key:"85a779b160a7cba9e63053d122a363e70e19f721",class:"sign-out",onClick:()=>this.signOutClick.emit(),onKeyDown:a=>this.signOutKeydownHandler(a),tabIndex:0},o("div",{key:"1d7400ca1ae72f7b056f93ac95daf283461badd5"},this.signOutText)))}};S.style=N;const z='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");:host{display:block}.overlay-wrapper{display:flex;flex-shrink:0;gap:45px}.overlay-wrapper .search-box{display:flex;flex-grow:2;justify-content:center}.overlay-wrapper .search-box modus-text-input{display:block;margin-left:1rem;max-width:764px;min-width:185px;width:100%}.overlay-wrapper .navbar-button{justify-content:end;padding-right:1rem}@media screen and (width <= 576px){.overlay-wrapper .navbar-button{padding-right:0.5rem}}',L=z,D=class{constructor(e){i(this,e),this.close=s(this,"close",7),this.search=s(this,"search",7)}componentDidRender(){var e;(e=this.modusTextInput)===null||e===void 0||e.focusInput()}render(){return o(d,{key:"e7e2f6c0a27303b1e13ee3ba5636408e074a6686"},o("div",{key:"dc742d0a964a7e1ca15dafb931b42fd322abc915",class:"overlay-wrapper"},o("div",{key:"c2038d34335710412d41aa8e84955ad9b2cec947",class:"search-box"},o("modus-text-input",{key:"6ff64e9b3537ca1fdca5ae8807cc5ee8b0237558",placeholder:"Search",size:"large",type:"search",clearable:!0,onValueChange:e=>this.search.emit(e.detail),"include-search-icon":!0,ref:e=>this.modusTextInput=e})),o("div",{key:"aeab44ccf9ac551b03c8487dcd0b718a673bdf65",class:"navbar-button","data-test-id":"close-button"},o("span",{key:"c841a0b80c58edbb2dc2237a730df3a3859ffd8f",class:"navbar-button-icon",role:"button",tabIndex:0,onKeyDown:e=>e.code==="Enter"&&this.close.emit(),onClick:()=>this.close.emit()},o(u,{key:"34697a8894bd5ac23eed9ce45147cd2825635bbc",size:"24"})))))}get element(){return c(this)}};D.style=L;export{b as modus_navbar_apps_menu,h as modus_navbar_button_menu,k as modus_navbar_main_menu,C as modus_navbar_notifications_menu,S as modus_navbar_profile_menu,D as modus_navbar_search_overlay};
