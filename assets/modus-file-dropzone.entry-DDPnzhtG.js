import{r as t,c as l,h as i,H as n}from"./index-r316mLu9.js";const a=e=>{var o,r,s;return i("svg",{class:`upload-cloud ${e.pressed?"pressed":""}`,fill:(o=e.color)!==null&&o!==void 0?o:"currentColor",height:(r=e.size)!==null&&r!==void 0?r:16,onClick:e.onClick,viewBox:"0 0 24 24",width:(s=e.size)!==null&&s!==void 0?s:16},i("path",{d:"M19.93 11.12c.04-.29.07-.57.07-.87C20 6.8 17.2 4 13.75 4c-2.53 0-4.7 1.5-5.68 3.66-.42-.1-.86-.16-1.32-.16C3.57 7.5 1 10.07 1 13.25S3.57 19 6.75 19H19c2.21 0 4-1.79 4-4a3.99 3.99 0 0 0-3.07-3.88Zm-4.41 1.31h-1.96V17c0 .27-.22.5-.5.5h-2.11c-.27 0-.5-.23-.5-.5v-4.57H8.48c-.23 0-.35-.28-.18-.44l3.35-3.35c.2-.2.51-.2.71 0l3.35 3.35c.16.16.05.44-.18.44Z"}))},d=e=>{var o,r,s;return i("svg",{class:`icon-cancel ${e.pressed?"pressed":""}`,fill:(o=e.color)!==null&&o!==void 0?o:"currentColor",height:(r=e.size)!==null&&r!==void 0?r:16,onClick:e.onClick,viewBox:"0 0 32 32",width:(s=e.size)!==null&&s!==void 0?s:16},i("path",{d:"M21.3027,10.6973a1.503,1.503,0,0,0-2.1211,0L16,13.8789l-3.1821-3.1816a1.5,1.5,0,0,0-2.1211,2.1211L13.8789,16l-3.1821,3.1816a1.5012,1.5012,0,0,0,0,2.1211,1.5363,1.5363,0,0,0,2.1211,0L16,18.1211l3.1816,3.1816a1.5,1.5,0,1,0,2.1211-2.1211L18.1211,16l3.1816-3.1816A1.5012,1.5012,0,0,0,21.3027,10.6973Z"}),i("path",{d:"M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12.0134,12.0134,0,0,1,16,28Z"}))},h='@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");.modus-file-dropzone{color:var(--modus-body-color, #252a2e);display:flex;flex-direction:column;font-family:"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"}.modus-file-dropzone input{display:none}.modus-file-dropzone .header{align-items:start;display:flex;flex-direction:column}.modus-file-dropzone .header label{font-size:1.5rem;font-weight:600;margin-bottom:0.5rem}.modus-file-dropzone .header span{margin-bottom:0.5rem}.modus-file-dropzone .dropzone{align-items:center;background-color:var(--modus-file-upload-dropzone-bg, rgba(241, 241, 246, 0.8));border:0.125rem dashed var(--modus-file-upload-dropzone-border-color, #6a6e79);border-radius:0.25rem;color:var(--modus-file-upload-dropzone-color, #6a6e79);display:flex;flex-direction:column;font-weight:600;justify-content:center;padding:0.75rem 1rem}.modus-file-dropzone .dropzone .browse{color:var(--modus-file-upload-dropzone-browse-color, #0063a3);text-decoration:underline}.modus-file-dropzone .dropzone .browse:hover{cursor:pointer}.modus-file-dropzone .dropzone.highlight{background-color:var(--modus-file-upload-dropzone-highlight-bg, #dcedf9);border-color:var(--modus-file-upload-dropzone-highlight-border-color, #0063a3);color:var(--modus-file-upload-dropzone-highlight-color, #0063a3)}.modus-file-dropzone .dropzone.highlight svg{fill:var(--modus-file-upload-dropzone-highlight-color, #0063a3)}.modus-file-dropzone .dropzone.error{background-color:var(--modus-file-upload-dropzone-error-bg, #fbd4d7);border-color:var(--modus-file-upload-dropzone-error-border-color, #ab1f26);color:var(--modus-file-upload-dropzone-error-color, #ab1f26)}.modus-file-dropzone .dropzone.error svg{fill:var(--modus-file-upload-dropzone-error-color, #ab1f26)}.modus-file-dropzone .dropzone .error-messages{align-items:center;display:flex;flex-direction:column}.modus-file-dropzone .dropzone svg{fill:var(--modus-file-upload-dropzone-color, #6a6e79);margin-bottom:0.25rem}',p=h,u=class{constructor(e){t(this,e),this.files=l(this,"files",7),this.onDragLeave=o=>{this.fileDraggedOver=!1,o.preventDefault()},this.onDragOver=o=>{this.error||(this.fileDraggedOver=!0,o.preventDefault())},this.onDrop=o=>{this.fileDraggedOver=!1,o.preventDefault(),this.dropzoneFiles=[...this.dropzoneFiles,...Array.from(o.dataTransfer.files)],this.updateDropzoneState(),this.files.emit([this.dropzoneFiles,this.error]),this.fileInput.value=null},this.onFileChange=()=>{this.dropzoneFiles=[...this.dropzoneFiles,...Array.from(this.fileInput.files)],this.updateDropzoneState(),this.files.emit([this.dropzoneFiles,this.error]),this.fileInput.value=null},this.openBrowse=()=>{this.fileInput.click()},this.updateDropzoneState=()=>{if(!this.multiple&&this.dropzoneFiles.length>1){this.error="maxFileCount",this.errorMessageTop="Multiple files are not allowed.";return}if(this.maxFileCount&&this.maxFileCount<this.dropzoneFiles.length){this.error="maxFileCount",this.errorMessageTop=`You can only upload ${this.maxFileCount} ${this.maxFileCount>1?"files":"file"}.`;return}if(this.dropzoneFiles.some(r=>r.name.length>this.maxFileNameLength)){this.error="maxFileNameLength",this.errorMessageTop=`File name exceeds length limit: ${this.dropzoneFiles.find(r=>r.name.length>this.maxFileNameLength).name}`;return}const o=this.dropzoneFiles.reduce((r,s)=>r+s.size,0);if(this.maxTotalFileSizeBytes&&this.maxTotalFileSizeBytes<o){this.error="maxTotalFileSize",this.errorMessageTop="File exceeds size limit.",this.errorMessageBottom=`You can only upload a total file size of ${this.maxTotalFileSizeBytes} bytes.`;return}this.error=null,this.errorMessageTop="",this.errorMessageBottom=""},this.dropzoneFiles=[],this.error=null,this.fileDraggedOver=!1,this.acceptFileTypes=void 0,this.ariaLabel=void 0,this.description=void 0,this.dropzoneHeight=void 0,this.dropzoneWidth=void 0,this.fileDraggedOverInstructions="Drag files here.",this.includeStateIcon=!0,this.label=void 0,this.instructions="Drag files here or browse to upload.",this.maxFileCount=void 0,this.maxFileNameLength=void 0,this.maxTotalFileSizeBytes=void 0,this.multiple=!0}elementKeydownHandler(e){switch(e.code){case"Enter":this.fileInput.click();break}}async addFile(e){this.dropzoneFiles.push(e),this.updateDropzoneState(),this.files.emit([this.dropzoneFiles,this.error])}async getError(){return this.error}async getFiles(){return this.dropzoneFiles}async removeFile(e){const o=this.dropzoneFiles.find(s=>s.name===e),r=this.dropzoneFiles.indexOf(o);r>-1&&(this.dropzoneFiles.splice(r,1),this.dropzoneFiles=[...this.dropzoneFiles]),this.updateDropzoneState(),this.files.emit([this.dropzoneFiles,this.error])}render(){return i(n,{key:"a28efaad7589a66012dff1179ae68de225276078","aria-label":this.ariaLabel,role:"button"},i("div",{key:"7c7fd3c81b581411a22edab8ede593841d06d630",class:"modus-file-dropzone"},i("input",{key:"3af2cda73276898e5cacdf03d9800e7e2d3e238f",onChange:this.onFileChange,multiple:this.multiple,ref:e=>this.fileInput=e,type:"file",accept:this.acceptFileTypes}),i("div",{key:"eeaa4f3dd26eb355552664b4ba0ddc0478445c18",class:"header"},i("label",{key:"af7d02cc07567f4d4bb0b1742002887454b56b03"},this.label),i("span",{key:"bc7128592d6512f2257f5bca8cb9228c804a4331"},this.description)),i("div",{key:"887d2793101068701278c088ce11afb66e03a645",class:{dropzone:!0,error:!!this.error,highlight:this.fileDraggedOver},onDragLeave:e=>this.onDragLeave(e),onDragOver:e=>this.onDragOver(e),onDrop:e=>this.onDrop(e),style:{height:this.dropzoneHeight,width:this.dropzoneWidth},tabIndex:0},this.includeStateIcon&&(this.error?i(d,{size:"36"}):i(a,{size:"36"})),!this.error&&(this.fileDraggedOver?this.fileDraggedOverInstructions:i("div",{class:"browse",onClick:this.openBrowse},this.instructions)),this.error&&i("div",{class:"error-messages",role:"alert"},this.errorMessageTop&&i("span",null,this.errorMessageTop),this.errorMessageBottom&&i("span",null,this.errorMessageBottom)))))}};u.style=p;export{u as modus_file_dropzone};
