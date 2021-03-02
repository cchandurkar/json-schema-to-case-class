(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"/sMN":function(t){t.exports=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","definitions":{"address":{"type":"object","properties":{"street_address":{"type":"string"},"city":{"type":"string"},"state":{"type":"string"},"zip":{"type":"integer"}},"required":["street_address","city","state"]}},"type":"object","properties":{"billing_address":{"$ref":"#/definitions/address"},"shipping_address":{"$ref":"#/definitions/address"}}}')},0:function(t,e,n){t.exports=n("zUnb")},"9tW+":function(t){t.exports=JSON.parse('{"$id":"https://example.com/geographical-location.schema.json","$schema":"http://json-schema.org/draft-07/schema#","title":"Longitude and Latitude Values","description":"A geographical coordinate.","required":["latitude","longitude","city"],"type":"object","properties":{"latitude":{"type":"number","minimum":-90,"maximum":90},"longitude":{"type":"number","minimum":-180,"maximum":180},"city":{"type":"string","pattern":"/^[A-Za-z . ,\'-]+$/"}}}')},N04n:function(t){t.exports=JSON.parse('{"$id":"https://example.com/person.schema.json","$schema":"http://json-schema.org/draft-07/schema#","title":"Person","type":"object","properties":{"firstName":{"type":"string","description":"The person\'s first name."},"lastName":{"type":"string","description":"The person\'s last name."},"age":{"description":"Age in years which must be equal to or greater than zero.","type":"integer","minimum":0}}}')},PTGK:function(t){t.exports=JSON.parse('{"$id":"https://example.com/person.schema.json","$schema":"http://json-schema.org/draft-07/schema#","title":"Person","type":"object","properties":{"numbers":{"type":"array","items":{"type":"string","enum":["one","two","three"]}}}}')},crnd:function(t,e){function n(t){return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}))}n.keys=function(){return[]},n.resolve=n,t.exports=n,n.id="crnd"},"dy/h":function(t){t.exports=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"http://example.com/product.schema.json","title":"Product","description":"A product from Acme\'s catalog","type":"object","properties":{"productId":{"description":"The unique identifier for a product","type":"integer"},"productName":{"description":"Name of the product","type":"string"},"price":{"description":"The price of the product","type":"number","exclusiveMinimum":0},"tags":{"description":"Tags for the product","type":"array","items":{"type":"string"},"minItems":1,"uniqueItems":true},"dimensions":{"type":"object","properties":{"length":{"type":"number"},"width":{"type":"number"},"height":{"type":"number"}},"required":["length","width","height"]}},"required":["productId","productName","price"]}')},kiQV:function(t){t.exports=JSON.parse('{"a":"1.2.0"}')},qCvv:function(t){t.exports=JSON.parse('{"$id":"https://example.com/person.schema.json","$schema":"http://json-schema.org/draft-07/schema#","title":"Person","type":"object","properties":{"personId":{"type":"integer","description":"The person\'s id."},"transactions":{"type":"array","items":{"type":"object","properties":{"txId":{"type":"integer","description":"Transaction Id."},"txTime":{"type":"number","description":"Transaction Id."},"txType":{"type":"string","enum":["DEBIT","CREDIT","VOID"]}}}}},"required":["personId","transactions"]}')},zUnb:function(t,e,n){"use strict";n.r(e);var o=n("fXoL");const i={apiKey:"AIzaSyAp2VU2sIFEKmQ33ShIMhOWqiweghXgUKs",authDomain:"case-class-generator-1e778.firebaseapp.com",databaseURL:"https://case-class-generator-1e778.firebaseio.com",projectId:"case-class-generator-1e778",storageBucket:"case-class-generator-1e778.appspot.com",messagingSenderId:"190471670283",appId:"1:190471670283:web:df2dfd71144cd1988a950e",measurementId:"G-X86BN08K6H"};var a=n("jhN1"),r=n("3Pt+"),c=n("YUcS"),s=n("tk/3"),l=n("QZHh"),p=n("++2Z"),d=n("cdP3"),b=n("OtPg"),g=n("spgP"),u=n("h+eY"),h=n("mrSG"),m=n("z6cu");let f=(()=>{class t{constructor(t){this.http=t}getJSONfromURL(t){return this.http.get(t)}handleError(t){return Object(m.a)(t)}}return t.\u0275fac=function(e){return new(e||t)(o.Qb(s.a))},t.\u0275prov=o.Fb({token:t,factory:t.\u0275fac}),t})();var M=n("+QRC");let O=(()=>{class t{constructor(t){this.meta=t}generateTags(t){t=Object.assign({title:"Case Class Generator",description:"Generate scala case classes from complex JSON schema",image:"https://cchandurkar.github.io/case-class-generator/assets/media/screenshot-101.png",slug:""},t),this.meta.updateTag({name:"twitter:card",content:"summary"}),this.meta.updateTag({name:"twitter:site",content:"@cchandurkar"}),this.meta.updateTag({name:"twitter:title",content:t.title}),this.meta.updateTag({name:"twitter:description",content:t.description}),this.meta.updateTag({name:"twitter:image",content:t.image}),this.meta.updateTag({property:"og:type",content:"website"}),this.meta.updateTag({property:"og:site_name",content:"Case Class Generator"}),this.meta.updateTag({property:"og:title",content:t.title}),this.meta.updateTag({property:"og:description",content:t.description}),this.meta.updateTag({property:"og:image",content:t.image}),this.meta.updateTag({property:"og:url",content:"https://cchandurkar.github.io/case-class-generator"})}}return t.\u0275fac=function(e){return new(e||t)(o.Qb(a.c))},t.\u0275prov=o.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var v=n("kiQV"),C=n("N04n"),x=n("dy/h"),k=n("/sMN"),y=n("9tW+"),L=n("qCvv"),P=n("PTGK"),w=n("pD6V");let _=(()=>{class t{constructor(t){this.analytics=t,this.clearEditor=new o.n,this.fileUploadOutput=new o.n}ngOnInit(){}fileSelected(t){console.log("S",t)}sendAnalytics(t,e={}){return Object(h.a)(this,void 0,void 0,(function*(){this.analytics.logEvent(t,Object.assign({},e))}))}}return t.\u0275fac=function(e){return new(e||t)(o.Jb(u.c))},t.\u0275cmp=o.Db({type:t,selectors:[["app-header"]],inputs:{fileUploadOptions:"fileUploadOptions",fileUploadInput:"fileUploadInput"},outputs:{clearEditor:"clearEditor",fileUploadOutput:"fileUploadOutput"},decls:47,vars:2,consts:[[1,"navbar","navbar-expand-md","navbar-dark","fixed-top","py-1"],["type","button","data-toggle","collapse","data-target","#navbarNavDropdown","aria-controls","navbarNavDropdown","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler","pl-1","pr-3","border-0"],[1,"fas","fa-bars"],["href","javascript:void(0)",1,"navbar-brand","mr-2"],[1,"reserve"],[1,"navbar-nav"],[1,"nav-item","dropdown"],["href","javascript:void(0)","id","navbarDropdown","role","button","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",1,"nav-link","dropdown-toggle"],["aria-labelledby","navbarDropdown",1,"dropdown-menu","position-absolute"],["href","javascript:void(0)","data-toggle","modal","data-target","#exampleModal",1,"dropdown-item"],[1,"fas","fa-link",2,"margin-right","4px"],["for","fileuploadxp","href","javascript:void(0)",1,"dropdown-item","upload-button-container"],["type","file","ngFileSelect","","id","fileuploadxp",3,"options","uploadInput","uploadOutput"],[1,"fas","fa-upload",2,"margin-right","5px"],[1,"dropdown-divider"],["href","javascript:void(0)",1,"dropdown-item",3,"click"],[1,"fas","fa-eraser",2,"margin-right","5px"],["href","javascript:void(0)",1,"navbar-brand","pr-0",2,"margin-left","10px"],["id","navbarNavDropdown",1,"collapse","navbar-collapse","justify-content-end"],[1,"nav-item"],["target","_blank","href","https://www.npmjs.com/package/json-schema-to-case-class",1,"nav-link","nav-git",3,"click"],[1,"fas","fa-cube","mr-1"],["target","_blank","href","https://github.com/cchandurkar/json-schema-to-case-class",1,"nav-link","nav-git",3,"click"],[1,"fab","fa-github","mr-1"],["target","_blank","href","https://github.com/cchandurkar/json-schema-to-case-class/issues",1,"nav-link","nav-git",3,"click"],[1,"fas","fa-bug","mr-1"],["target","_blank","href","https://twitter.com/cchandurkar",1,"nav-link","nav-tweet",3,"click"],[1,"fab","fa-twitter"],["target","_blank","href","https://www.linkedin.com/in/cchandurkar/",1,"nav-link","nav-contact",3,"click"],[1,"fab","fa-linkedin"]],template:function(t,e){1&t&&(o.Mb(0,"nav",0),o.Mb(1,"button",1),o.Kb(2,"i",2),o.Lb(),o.Mb(3,"a",3),o.Mb(4,"span",4),o.kc(5,"case class"),o.Lb(),o.kc(6," Generator( "),o.Lb(),o.Mb(7,"ul",5),o.Mb(8,"li",6),o.Mb(9,"a",7),o.kc(10," File "),o.Lb(),o.Mb(11,"div",8),o.Mb(12,"a",9),o.Kb(13,"i",10),o.kc(14," Import URL "),o.Lb(),o.Mb(15,"label",11),o.Mb(16,"input",12),o.Ub("uploadOutput",(function(t){return e.fileUploadOutput.emit(t)})),o.Lb(),o.Kb(17,"i",13),o.kc(18," Upload File "),o.Lb(),o.Kb(19,"div",14),o.Mb(20,"a",15),o.Ub("click",(function(){return e.clearEditor.emit(null)})),o.Kb(21,"i",16),o.kc(22," Clear Editor "),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Mb(23,"a",17),o.kc(24," ) "),o.Lb(),o.Mb(25,"div",18),o.Mb(26,"ul",5),o.Mb(27,"li",19),o.Mb(28,"a",20),o.Ub("click",(function(){return e.sendAnalytics("Action.URLClicked",{which:"npm"})})),o.Kb(29,"i",21),o.kc(30," NPM Package"),o.Lb(),o.Lb(),o.Mb(31,"li",19),o.Mb(32,"a",22),o.Ub("click",(function(){return e.sendAnalytics("Action.URLClicked",{which:"github"})})),o.Kb(33,"i",23),o.kc(34," GitHub"),o.Lb(),o.Lb(),o.Mb(35,"li",19),o.Mb(36,"a",24),o.Ub("click",(function(){return e.sendAnalytics("Action.URLClicked",{which:"github"})})),o.Kb(37,"i",25),o.kc(38," Report Issues"),o.Lb(),o.Lb(),o.Mb(39,"li",19),o.Mb(40,"a",26),o.Ub("click",(function(){return e.sendAnalytics("Action.URLClicked",{which:"twitter"})})),o.Kb(41,"i",27),o.kc(42," Follow"),o.Lb(),o.Lb(),o.Mb(43,"li",19),o.Mb(44,"a",28),o.Ub("click",(function(){return e.sendAnalytics("Action.URLClicked",{which:"linkedin"})})),o.Kb(45,"i",29),o.kc(46," Connect"),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Lb()),2&t&&(o.zb(16),o.Zb("options",e.fileUploadOptions)("uploadInput",e.fileUploadInput))},directives:[p.b],styles:["nav.navbar[_ngcontent-%COMP%]{background:#41b3a3;box-shadow:2px 2px 3px #c5c5c5}nav.navbar[_ngcontent-%COMP%]   .divider-vertical[_ngcontent-%COMP%]{width:1px;height:30px;margin:auto 8px;background:#3aa092}nav.navbar[_ngcontent-%COMP%]   a.navbar-brand[_ngcontent-%COMP%]{font-family:Roboto Mono,Proxima Nova,sans-serif;color:#fff}nav.navbar[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]{cursor:pointer}nav.navbar[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]{display:none}nav.navbar[_ngcontent-%COMP%]   div.collapse[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:15px;color:#dbe5e4}nav.navbar[_ngcontent-%COMP%]   div.collapse[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#fff}nav.navbar[_ngcontent-%COMP%]   div.collapse[_ngcontent-%COMP%]   i.fab[_ngcontent-%COMP%]{margin-right:5px}"]}),t})();var S=n("ofXK");function U(t,e){if(1&t&&o.Kb(0,"div",76),2&t){const t=o.Wb();o.Zb("innerHTML",t.importFileError,o.fc)}}function T(t,e){1&t&&(o.Mb(0,"span"),o.Kb(1,"i",77),o.Lb())}function I(t,e){1&t&&(o.Mb(0,"span"),o.kc(1,"Import"),o.Lb())}function z(t,e){if(1&t){const t=o.Nb();o.Mb(0,"a",78),o.Ub("click",(function(){o.ec(t);const n=e.index,i=o.Wb();return i.selectedExample=n,i.updateExample()})),o.kc(1),o.Lb()}if(2&t){const t=e.$implicit,n=e.index,i=o.Wb();o.Bb("active",n===i.selectedExample),o.zb(1),o.lc(t[0])}}function N(t,e){if(1&t&&(o.Mb(0,"span",79),o.kc(1),o.Lb()),2&t){const t=o.Wb();o.Bb("shakeit",t.errors.length>0),o.zb(1),o.lc(t.errors.length)}}function j(t,e){if(1&t&&(o.Mb(0,"div",80),o.Mb(1,"div",81),o.Mb(2,"b"),o.kc(3),o.Lb(),o.Lb(),o.Mb(4,"div",82),o.kc(5),o.Lb(),o.Lb()),2&t){const t=e.$implicit;o.zb(3),o.lc(t.title),o.zb(2),o.lc(t.description)}}function A(t,e){if(1&t&&(o.Mb(0,"span",83),o.kc(1),o.Lb()),2&t){const t=o.Wb();o.Bb("shakeit",t.warnings.length>0),o.zb(1),o.lc(t.warnings.length)}}function F(t,e){if(1&t&&(o.Mb(0,"div",80),o.Mb(1,"div",81),o.Mb(2,"b"),o.kc(3),o.Lb(),o.Lb(),o.Mb(4,"div",82),o.kc(5),o.Lb(),o.Lb()),2&t){const t=e.$implicit;o.zb(3),o.lc(t.title),o.zb(2),o.lc(t.description)}}function E(t,e){if(1&t){const t=o.Nb();o.Mb(0,"button",84),o.Ub("click",(function(){o.ec(t);const e=o.Wb();return e.copyToClipboard(e.outputText)})),o.kc(1,"copy"),o.Lb()}}function J(t,e){1&t&&(o.Mb(0,"div",85),o.Mb(1,"div",86),o.Kb(2,"i",87),o.Kb(3,"br"),o.Mb(4,"h4",88),o.kc(5,"Please check errors"),o.Lb(),o.Lb(),o.Lb())}function R(t,e){1&t&&(o.Mb(0,"span"),o.kc(1,"case"),o.Lb())}function D(t,e){if(1&t&&(o.Mb(0,"option",89),o.kc(1),o.jc(2,R,2,0,"span",13),o.Lb()),2&t){const t=e.$implicit;o.bc("value","",t,"Case"),o.zb(1),o.mc("",t," "),o.zb(1),o.Zb("ngIf","default"!==t)}}function Z(t,e){1&t&&(o.Mb(0,"span"),o.kc(1,"case"),o.Lb())}function K(t,e){if(1&t&&(o.Mb(0,"option",89),o.kc(1),o.jc(2,Z,2,0,"span",13),o.Lb()),2&t){const t=e.$implicit;o.bc("value","",t,"Case"),o.zb(1),o.mc("",t," "),o.zb(1),o.Zb("ngIf","default"!==t)}}const G=function(){return{standalone:!0}},V=function(){return["scala"]};let $=(()=>{class t{constructor(t,e,n,i){this.api=t,this.seo=e,this.mediaObserver=n,this.analytics=i,this.appVersion=v.a,this.allowedHosts=["cchandurkar.github.io"],this.allowRunningApp=Object(o.V)()||this.allowedHosts.includes(window.location.host),this.settingsSplitDirection="horizontal",this.options={concurrency:1,allowedContentTypes:["","text/plain","application/json"]},this.dragOver=!1,this.optionSettings={useOptions:"useOptions",useOptionsForAll:"useOptionsForAll",dontUseOptions:"dontUseOptions"},this.config={maxDepth:0,optionSetting:this.optionSettings.useOptions,parseRefs:!0,generateComments:!0,classNameTextCase:"pascalCase",classParamsTextCase:"ignoreCase",topLevelCaseClassName:null,defaultGenericType:"Any",generateValidations:!0,generateEnumerations:!0},this.selectedExample=1,this.examples=[["Simple Schema",C],["Nested Schema",x],["Schema with local references",k],["Schema Validations",y],["Enumerations - String",L],["Enumerations - Array",P]],this.textCases=Object.keys(SchemaConverter.supportedTextCases).map(t=>t.replace("Case","")),this.isImportInProgress=!1,this.importFileURL="",this.importFileSubscription=null,this.importFileError=null,this.inputText=JSON.stringify(this.examples[this.selectedExample][1],null,2),this.inputMode="json",this.inputOptions={useWorker:!0,wrap:!0},this.warnings=[],this.errors=[],this.outputText="",this.outputMode="scala",this.outputOptions={readOnly:!0,highlightActiveLine:!1,showGutter:!1,useWorker:!0},this.outputQueryText="SELECT * FROM ",this.outputQueryMode="pgsql",this.outputQueryOptions={readOnly:!0,highlightActiveLine:!1,showGutter:!1,useWorker:!0},this.textCases.push("ignore"),this.uploadInput=new o.n,this.updateInputText(this.inputText)}ngOnInit(){this.seo.generateTags({})}ngAfterViewInit(){this.mediaObserver.asObservable().subscribe(t=>{this.activeMediaQuery=t[0].mqAlias,this.settingsSplitDirection=["xs","sm"].includes(t[0].mqAlias)?"vertical":"horizontal"})}updateExample(){this.inputText=JSON.stringify(this.examples[this.selectedExample][1],null,2)}jsonIndent(t){this.inputText=JSON.stringify(JSON.parse(this.inputText),null,t)}copyToClipboard(t){if(t){let e=t&&t.length?t.replace("    ","\t"):t;M(e)?this.sendAnalytics("Action.CopyToClipboard"):alert("Could not copy to clipboard. Please select and copy manually.")}}clearDialog(){this.importFileError=null,this.importFileURL=""}clearEditor(){this.updateInputText(""),this.sendAnalytics("Action.ClearEditor")}loadDataFromURL(){this.isImportInProgress=!0,this.importFileURL&&0!=this.importFileURL.trim().length?(null!=this.importFileSubscription&&this.importFileSubscription.unsubscribe(),this.importFileSubscription=this.api.getJSONfromURL(this.importFileURL).subscribe(t=>{this.inputText=JSON.stringify(t,null,2),this.isImportInProgress=!1,this.importFileError=null,this.sendAnalytics("Action.ImportFromURL")},t=>{console.log("ERR",t),this.importFileError="<b>Import Failed</b>:<br />"+t.message,this.isImportInProgress=!1})):(this.importFileError="Please enter the file URL",this.isImportInProgress=!1)}updateInputText(t){this.inputText=t,this.convertJSONschema()}convertJSONschema(){if(!this.allowRunningApp)return this.outputMode="text",void(this.outputText="Failed to initialize the engine. Try reloading the page.\nOr visit: 'https://cchandurkar.github.io/case-class-generator'");if(this.warnings=[],this.errors=[],this.inputText&&0!==this.inputText.trim().length){let e=null;try{e=JSON.parse(this.inputText)}catch(t){return this.errors.push({title:"Invalid JSON",description:"Failed to parse schema. Please check for errors in JSON editor."}),this.outputText="",void(this.outputQueryText="")}(this.inputText.includes("allOf")||this.inputText.includes("anyOf")||this.inputText.includes("oneOf"))&&this.warnings.push({title:"allOf / anyOf / oneOf",description:"Converter currently does not support schema combination using allOf, anyOf or oneOf."}),SchemaConverter.convert(e,this.config).then(t=>{this.outputText=t}),this.sendAnalytics("Convert",{contentLength:this.inputText.length})}else this.outputText="",this.outputQueryText=""}onUploadOutput(t){"rejected"!==t.type||void 0===t.file?(this.dragOver="dragOver"===t.type,"addedToQueue"===t.type&&this.readUploadedFile(t.file.nativeFile,(t,e)=>{t?alert("Could not upload file."):(this.updateInputText(JSON.stringify(e,null,2)),this.sendAnalytics("Action.ImportFromFile"))})):alert("Could not upload file.")}readUploadedFile(t,e){const n=new FileReader;n.onload=t=>{try{e(null,JSON.parse(t.target.result))}catch(t){e(t)}},n.readAsBinaryString(t)}sendAnalytics(t,e={}){return Object(h.a)(this,void 0,void 0,(function*(){this.analytics.logEvent(t,Object.assign({},e))}))}}return t.\u0275fac=function(e){return new(e||t)(o.Jb(f),o.Jb(O),o.Jb(w.g),o.Jb(u.c))},t.\u0275cmp=o.Db({type:t,selectors:[["app-root"]],decls:135,vars:67,consts:[[3,"fileUploadInput","fileUploadOptions","clearEditor","fileUploadOutput"],["id","exampleModal","tabindex","-1","role","dialog","aria-labelledby","exampleModalLabel","aria-hidden","true",1,"modal","fade"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-body"],[1,"form-group"],["for","urlInput"],["type","url","id","urlInput","placeholder","http://example.com/sample.json","required","",1,"form-control","form-control-sm",3,"ngModel","ngModelOptions","ngModelChange"],["id","urlInputHelp",1,"form-text","text-muted"],["class","alert alert-danger","role","alert",3,"innerHTML",4,"ngIf"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"disabled","click"],[4,"ngIf"],[1,"app-container","h-100"],[3,"direction"],["size","75"],["direction","horizontal"],["size","50"],[1,"ml-1","mr-1","mt-1"],[1,"dropdown"],["type","button","id","dropdownMenuButton","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",1,"btn","dropdown-toggle"],["aria-labelledby","dropdownMenuButton",1,"dropdown-menu"],["class","dropdown-item","href","#",3,"active","click",4,"ngFor","ngForOf"],[1,"float-right","formatting-buttons"],[1,"btn","pl-1","pr-1",3,"click"],[1,"fas","fa-indent"],[1,"fas","fa-align-left"],["ngFileDrop","",1,"drop-container",3,"options","uploadInput","uploadOutput"],[1,"input-editor","h-100",3,"text","mode","theme","options","autoUpdateContent","textChange","textChanged"],["direction","vertical"],["size","60",1,"position-relative"],[1,"panel-title"],["class","btn badge badge-danger badge-pill float-right dropdown-toggle","role","button","id","errorDropdownManuLink","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",3,"shakeit",4,"ngIf"],["aria-labelledby","errorDropdownManuLink",1,"dropdown-menu","dropdown-menu-right","error-box","pl-3","pr-3","alert","alert-danger",2,"border-radius","0"],["class","p-2",4,"ngFor","ngForOf"],["class","btn badge badge-warning badge-pill float-right mr-2 dropdown-toggle","role","button","id","warningDropdownManuLink","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",3,"shakeit",4,"ngIf"],["aria-labelledby","warningDropdownManuLink",1,"dropdown-menu","dropdown-menu-right","warning-box","pl-3","pr-3","alert","alert-warning",2,"border-radius","0"],[1,"output-editor-container","h-100"],["type","button","class","btn btn-outline-primary btn-sm btn-clipboard",3,"click",4,"ngIf"],[3,"highlight","languages"],["class","container d-flex","style","height: 80%",4,"ngIf"],["size","25","minSize","25",3,"maxSize"],[1,"output-editor-container"],["novalidate","",1,"options-form",3,"submit"],["for","maxDepthInput"],["type","number","id","maxDepthInput","placeholder","Max Depth",1,"form-control","form-control-sm",3,"ngModel","ngModelOptions","ngModelChange","change"],["id","maxDepthHelp",1,"form-text","text-muted"],[1,"form-check"],[1,"option-settings"],[1,"custom-control","custom-radio"],["type","radio","id","useOptions","name","useOptions",1,"custom-control-input",3,"value","ngModel","ngModelChange","change"],["for","useOptions",1,"custom-control-label"],["type","radio","id","useOptionsForAll","name","useOptions",1,"custom-control-input",3,"value","ngModel","ngModelChange","change"],["for","useOptionsForAll",1,"custom-control-label"],["type","radio","id","dontUseOptions","name","useOptions",1,"custom-control-input",3,"value","ngModel","ngModelChange","change"],["for","dontUseOptions",1,"custom-control-label"],["type","checkbox","id","parseRef",1,"form-check-input",3,"ngModel","ngModelOptions","ngModelChange","change"],["for","parseRef",1,"form-check-label","label-checkbox"],["type","checkbox","id","generateComments",1,"form-check-input",3,"ngModel","ngModelOptions","ngModelChange","change"],["for","generateComments",1,"form-check-label","label-checkbox"],["type","checkbox","id","generateValidations",1,"form-check-input",3,"ngModel","ngModelOptions","ngModelChange","change"],["for","generateValidations",1,"form-check-label","label-checkbox"],["type","checkbox","id","generateEnumerations",1,"form-check-input",3,"ngModel","ngModelOptions","ngModelChange","change"],["for","generateEnumerations",1,"form-check-label","label-checkbox"],["for","textCaseClassName"],["id","textCaseClassName",1,"form-control","form-control-sm",3,"ngModel","ngModelOptions","ngModelChange","change"],[3,"value",4,"ngFor","ngForOf"],["for","textCaseClassParams"],["id","textCaseClassParams",1,"form-control","form-control-sm",3,"ngModel","ngModelOptions","ngModelChange","change"],["for","topCaseClassName"],["type","text","id","topCaseClassName","placeholder","MyCaseClass",1,"form-control","form-control-sm",3,"ngModel","ngModelOptions","ngModelChange","change"],["for","defaultGenericType"],["type","text","id","defaultGenericType",1,"form-control","form-control-sm",3,"ngModel","ngModelOptions","ngModelChange","change"],["type","submit",1,"btn-primary"],[1,"bottom-right","version"],["role","alert",1,"alert","alert-danger",3,"innerHTML"],[1,"fas","fa-spinner","fa-spin"],["href","#",1,"dropdown-item",3,"click"],["role","button","id","errorDropdownManuLink","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",1,"btn","badge","badge-danger","badge-pill","float-right","dropdown-toggle"],[1,"p-2"],[1,"title"],[1,"description","mt-1"],["role","button","id","warningDropdownManuLink","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",1,"btn","badge","badge-warning","badge-pill","float-right","mr-2","dropdown-toggle"],["type","button",1,"btn","btn-outline-primary","btn-sm","btn-clipboard",3,"click"],[1,"container","d-flex",2,"height","80%"],[1,"justify-content-center","align-self-center","w-100",2,"text-align","center"],[1,"fa","fa-7x","fa-exclamation-triangle",2,"color","lightgray"],[1,"mt-2",2,"color","gray"],[3,"value"]],template:function(t,e){1&t&&(o.Mb(0,"app-header",0),o.Ub("clearEditor",(function(){return e.clearEditor()}))("fileUploadOutput",(function(t){return e.onUploadOutput(t)})),o.Lb(),o.Mb(1,"div",1),o.Mb(2,"div",2),o.Mb(3,"div",3),o.Mb(4,"div",4),o.Mb(5,"form"),o.Mb(6,"div",5),o.Mb(7,"label",6),o.kc(8,"JSON File URL:"),o.Lb(),o.Mb(9,"input",7),o.Ub("ngModelChange",(function(t){return e.importFileURL=t})),o.Lb(),o.Mb(10,"small",8),o.kc(11,"Response content-type could be "),o.Mb(12,"code"),o.kc(13,"text"),o.Lb(),o.kc(14," or "),o.Mb(15,"code"),o.kc(16,"text/json"),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.jc(17,U,1,1,"div",9),o.Lb(),o.Mb(18,"div",10),o.Mb(19,"button",11),o.Ub("click",(function(){return e.clearDialog()})),o.kc(20,"Close"),o.Lb(),o.Mb(21,"button",12),o.Ub("click",(function(){return e.loadDataFromURL()})),o.jc(22,T,2,0,"span",13),o.jc(23,I,2,0,"span",13),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Mb(24,"div",14),o.Mb(25,"as-split",15),o.Mb(26,"as-split-area",16),o.Mb(27,"as-split",17),o.Mb(28,"as-split-area",18),o.Mb(29,"div",19),o.Mb(30,"div",20),o.Mb(31,"button",21),o.kc(32),o.Lb(),o.Mb(33,"div",22),o.jc(34,z,2,3,"a",23),o.Lb(),o.Mb(35,"div",24),o.Mb(36,"button",25),o.Ub("click",(function(){return e.jsonIndent(2)})),o.Kb(37,"i",26),o.Lb(),o.Mb(38,"button",25),o.Ub("click",(function(){return e.jsonIndent(0)})),o.Kb(39,"i",27),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Mb(40,"div",28),o.Ub("uploadOutput",(function(t){return e.onUploadOutput(t)})),o.Mb(41,"ace-editor",29),o.Ub("textChange",(function(t){return e.inputText=t}))("textChanged",(function(){return e.convertJSONschema()})),o.Lb(),o.Lb(),o.Lb(),o.Mb(42,"as-split-area",18),o.Mb(43,"as-split",30),o.Mb(44,"as-split-area",31),o.Mb(45,"h6",32),o.Mb(46,"b"),o.kc(47,"Case Class"),o.Lb(),o.Mb(48,"span"),o.jc(49,N,2,3,"span",33),o.Mb(50,"div",34),o.jc(51,j,6,2,"div",35),o.Lb(),o.Lb(),o.Mb(52,"span"),o.jc(53,A,2,3,"span",36),o.Mb(54,"div",37),o.jc(55,F,6,2,"div",35),o.Lb(),o.Lb(),o.Lb(),o.Mb(56,"div",38),o.jc(57,E,2,0,"button",39),o.Mb(58,"pre"),o.Kb(59,"code",40),o.Lb(),o.jc(60,J,6,0,"div",41),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Mb(61,"as-split-area",42),o.Mb(62,"div",43),o.Mb(63,"h5"),o.Mb(64,"b"),o.kc(65,"Settings"),o.Lb(),o.Lb(),o.Kb(66,"hr"),o.Mb(67,"form",44),o.Ub("submit",(function(){return e.convertJSONschema()})),o.Mb(68,"div",5),o.Mb(69,"label",45),o.kc(70,"Nested objects depth"),o.Lb(),o.Mb(71,"input",46),o.Ub("ngModelChange",(function(t){return e.config.maxDepth=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"maxDepth",config:e.config})})),o.Lb(),o.Mb(72,"small",47),o.kc(73,"Put 0 for no limit on depth."),o.Lb(),o.Lb(),o.Mb(74,"div",5),o.Mb(75,"div",48),o.Mb(76,"div",49),o.Mb(77,"div",50),o.Mb(78,"input",51),o.Ub("ngModelChange",(function(t){return e.config.optionSetting=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"useOptions",config:e.config})})),o.Lb(),o.Mb(79,"label",52),o.kc(80,"Use "),o.Mb(81,"code"),o.kc(82,"Option[]"),o.Lb(),o.kc(83," for optional parameters"),o.Lb(),o.Kb(84,"br"),o.Lb(),o.Mb(85,"div",50),o.Mb(86,"input",53),o.Ub("ngModelChange",(function(t){return e.config.optionSetting=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"useOptionsForAll",config:e.config})})),o.Lb(),o.Mb(87,"label",54),o.kc(88,"Use "),o.Mb(89,"code"),o.kc(90,"Option[]"),o.Lb(),o.kc(91," for all parameters"),o.Lb(),o.Lb(),o.Mb(92,"div",50),o.Mb(93,"input",55),o.Ub("ngModelChange",(function(t){return e.config.optionSetting=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"dontUseOptions",config:e.config})})),o.Lb(),o.Mb(94,"label",56),o.kc(95,"Do not use "),o.Mb(96,"code"),o.kc(97,"Option[]"),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Mb(98,"input",57),o.Ub("ngModelChange",(function(t){return e.config.parseRefs=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"parseRef",config:e.config})})),o.Lb(),o.Mb(99,"label",58),o.kc(100,"Parse references"),o.Lb(),o.Kb(101,"br"),o.Mb(102,"input",59),o.Ub("ngModelChange",(function(t){return e.config.generateComments=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"generateComments",config:e.config})})),o.Lb(),o.Mb(103,"label",60),o.kc(104,"Generate Scaladoc"),o.Lb(),o.Kb(105,"br"),o.Mb(106,"input",61),o.Ub("ngModelChange",(function(t){return e.config.generateValidations=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"generateValidations",config:e.config})})),o.Lb(),o.Mb(107,"label",62),o.kc(108,"Generate Validations"),o.Lb(),o.Kb(109,"br"),o.Mb(110,"input",63),o.Ub("ngModelChange",(function(t){return e.config.generateEnumerations=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"generateEnumerations",config:e.config})})),o.Lb(),o.Mb(111,"label",64),o.kc(112,"Generate Enumerations"),o.Lb(),o.Lb(),o.Lb(),o.Mb(113,"div",5),o.Mb(114,"label",65),o.kc(115,"Text case for class name"),o.Lb(),o.Mb(116,"select",66),o.Ub("ngModelChange",(function(t){return e.config.classNameTextCase=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"classNameTextCase",config:e.config})})),o.jc(117,D,3,3,"option",67),o.Lb(),o.Lb(),o.Mb(118,"div",5),o.Mb(119,"label",68),o.kc(120,"Text case for class parameters"),o.Lb(),o.Mb(121,"select",69),o.Ub("ngModelChange",(function(t){return e.config.classParamsTextCase=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"classParamsTextCase",config:e.config})})),o.jc(122,K,3,3,"option",67),o.Lb(),o.Lb(),o.Mb(123,"div",5),o.Mb(124,"label",70),o.kc(125,"Generated case class name"),o.Lb(),o.Mb(126,"input",71),o.Ub("ngModelChange",(function(t){return e.config.topLevelCaseClassName=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"topLevelCaseClassName",config:e.config})})),o.Lb(),o.Lb(),o.Mb(127,"div",5),o.Mb(128,"label",72),o.kc(129,"Default generic type"),o.Lb(),o.Mb(130,"input",73),o.Ub("ngModelChange",(function(t){return e.config.defaultGenericType=t}))("change",(function(){return e.convertJSONschema(),e.sendAnalytics("Action.SettingChanged",{option:"defaultGenericType",config:e.config})})),o.Lb(),o.Lb(),o.Mb(131,"button",74),o.kc(132,"Generate"),o.Lb(),o.Mb(133,"div",75),o.kc(134),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Lb()),2&t&&(o.Zb("fileUploadInput",e.uploadInput)("fileUploadOptions",e.options),o.zb(9),o.Zb("ngModel",e.importFileURL)("ngModelOptions",o.cc(56,G)),o.zb(8),o.Zb("ngIf",e.importFileError),o.zb(4),o.Zb("disabled",0===e.importFileURL.trim().length||e.isImportInProgress),o.zb(1),o.Zb("ngIf",e.isImportInProgress),o.zb(1),o.Zb("ngIf",!e.isImportInProgress),o.zb(2),o.ac("direction",e.settingsSplitDirection),o.zb(7),o.mc(" Example: ",e.examples[e.selectedExample][0]," "),o.zb(2),o.Zb("ngForOf",e.examples),o.zb(6),o.Bb("active",e.dragOver),o.Zb("options",e.options)("uploadInput",e.uploadInput),o.zb(1),o.Zb("text",e.inputText)("mode",e.inputMode)("theme","textmate")("options",e.inputOptions)("autoUpdateContent",!0),o.zb(8),o.Zb("ngIf",e.errors.length>0),o.zb(2),o.Zb("ngForOf",e.errors),o.zb(2),o.Zb("ngIf",e.warnings.length>0),o.zb(2),o.Zb("ngForOf",e.warnings),o.zb(2),o.Zb("ngIf",e.outputText.length>0),o.zb(2),o.Zb("highlight",e.outputText)("languages",o.cc(57,V)),o.zb(1),o.Zb("ngIf",0===e.outputText.length),o.zb(1),o.ac("maxSize","horizontal"===e.settingsSplitDirection?25:50),o.zb(10),o.Zb("ngModel",e.config.maxDepth)("ngModelOptions",o.cc(58,G)),o.zb(7),o.Zb("value",e.optionSettings.useOptions)("ngModel",e.config.optionSetting),o.zb(8),o.Zb("value",e.optionSettings.useOptionsForAll)("ngModel",e.config.optionSetting),o.zb(7),o.Zb("value",e.optionSettings.dontUseOptions)("ngModel",e.config.optionSetting),o.zb(5),o.Zb("ngModel",e.config.parseRefs)("ngModelOptions",o.cc(59,G)),o.zb(4),o.Zb("ngModel",e.config.generateComments)("ngModelOptions",o.cc(60,G)),o.zb(4),o.Zb("ngModel",e.config.generateValidations)("ngModelOptions",o.cc(61,G)),o.zb(4),o.Zb("ngModel",e.config.generateEnumerations)("ngModelOptions",o.cc(62,G)),o.zb(6),o.Zb("ngModel",e.config.classNameTextCase)("ngModelOptions",o.cc(63,G)),o.zb(1),o.Zb("ngForOf",e.textCases),o.zb(4),o.Zb("ngModel",e.config.classParamsTextCase)("ngModelOptions",o.cc(64,G)),o.zb(1),o.Zb("ngForOf",e.textCases),o.zb(4),o.Zb("ngModel",e.config.topLevelCaseClassName)("ngModelOptions",o.cc(65,G)),o.zb(4),o.Zb("ngModel",e.config.defaultGenericType)("ngModelOptions",o.cc(66,G)),o.zb(4),o.mc(" v",e.appVersion," "))},directives:[_,r.o,r.f,r.g,r.b,r.l,r.e,r.h,S.j,d.c,d.b,S.i,p.a,l.a,b.b,r.j,r.k,r.a,r.m,r.i,r.n],styles:['@charset "UTF-8";.dropdown[_ngcontent-%COMP%]{width:100%}as-split[_ngcontent-%COMP%]{touch-action:pan-y}.app-container[_ngcontent-%COMP%]{padding-top:45px}.drop-container[_ngcontent-%COMP%]{border:2px solid #e5e5e5;height:calc(100% - 50px)}.drop-container[_ngcontent-%COMP%]   .upload-button[_ngcontent-%COMP%]{display:inline-block;border:none;outline:none;cursor:pointer}.formatting-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{color:#9fbbb7}.formatting-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{color:#41b3a3}.drop-container.active[_ngcontent-%COMP%]{border:2px dashed #c5c5c5}.drop-container.active[_ngcontent-%COMP%]   .input-editor[_ngcontent-%COMP%]{background:#e5e5e5}.intro[_ngcontent-%COMP%]{padding:25px;background-color:#fafafa;display:none}.intro[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:#333}.input-editor-container[_ngcontent-%COMP%], .output-editor-container[_ngcontent-%COMP%]{padding:10px}.panel-title[_ngcontent-%COMP%]{background:#fafafa;padding:10px;border-bottom:1px solid #e5e5e5;position:-webkit-sticky;position:sticky;top:0;z-index:999}.input-editor[_ngcontent-%COMP%]{overflow:auto;font-size:13px;font-family:Roboto Mono,Inconsolata,Courier New,sans-serif;background:#fafafa;margin-top:5px}div.toolbar[_ngcontent-%COMP%]{padding:5px}p.title[_ngcontent-%COMP%]{padding:0;color:#333;font-weight:700;margin:0 0 5px}.options-form[_ngcontent-%COMP%] > .form-group[_ngcontent-%COMP%] > .form-check[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] + label.label-checkbox[_ngcontent-%COMP%]:before, .status-box[_ngcontent-%COMP%]{height:16px;width:16px;text-align:center;content:"\xa0";display:inline-block;vertical-align:middle}div.option-settings[_ngcontent-%COMP%]{margin-left:-1.2rem;margin-bottom:10px}.options-form[_ngcontent-%COMP%] > .form-group[_ngcontent-%COMP%] > .form-check[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]{display:none}.options-form[_ngcontent-%COMP%] > .form-group[_ngcontent-%COMP%] > .form-check[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] + label.label-checkbox[_ngcontent-%COMP%]{font-weight:400;cursor:pointer;-moz-user-select:none;-webkit-touch-callout:none;-webkit-user-select:none;-o-user-select:none;user-select:none;margin-left:-20px}.options-form[_ngcontent-%COMP%] > .form-group[_ngcontent-%COMP%] > .form-check[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] + label.label-checkbox[_ngcontent-%COMP%]:before{margin-right:5px;border:1px solid #606060}.options-form[_ngcontent-%COMP%] > .form-group[_ngcontent-%COMP%] > .form-check[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]:checked + label.label-checkbox[_ngcontent-%COMP%]:before{content:"\uf00c";font-family:Font Awesome\\ 5 Free;text-align:center;border:none;background:#9fbbb7;font-size:10px}.table-controls[_ngcontent-%COMP%]   .filter-controls[_ngcontent-%COMP%] > input[type=checkbox][_ngcontent-%COMP%]:checked + label.label-checkbox[_ngcontent-%COMP%]:after{font-weight:400}div.form-group[_ngcontent-%COMP%] > input.form-control[_ngcontent-%COMP%], div.form-group[_ngcontent-%COMP%] > select.form-control[_ngcontent-%COMP%]{border:0;outline:1px solid #e5e5e5;outline-offset:-1px}div.modal-content[_ngcontent-%COMP%]   div.alert[_ngcontent-%COMP%]{border-radius:0;margin-top:10px}div.modal-content[_ngcontent-%COMP%]   div.modal-footer[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{min-width:90px;border-radius:0}div.modal-dialog[_ngcontent-%COMP%] > div.modal-content[_ngcontent-%COMP%]{border-radius:0;font-family:Source Sans Pro}div.modal-dialog[_ngcontent-%COMP%] > div.modal-content[_ngcontent-%COMP%] > div.modal-footer[_ngcontent-%COMP%] > button.btn[_ngcontent-%COMP%]{border-radius:0}div.modal-dialog[_ngcontent-%COMP%] > div.modal-content[_ngcontent-%COMP%] > div.modal-footer[_ngcontent-%COMP%] > button.btn.btn-primary[_ngcontent-%COMP%]{min-width:100px}div.modal-dialog[_ngcontent-%COMP%] > div.modal-content[_ngcontent-%COMP%] > div.modal-body[_ngcontent-%COMP%] > div.alert[_ngcontent-%COMP%]{line-height:20px}.btn-primary[_ngcontent-%COMP%]{background:#41b3a3;cursor:pointer;border:1px solid #3aa092}.btn-primary[_ngcontent-%COMP%]:active{background:#3aa092}.btn-clipboard[_ngcontent-%COMP%]{position:-webkit-sticky;position:sticky;float:right;right:10px;margin-top:-10px;top:50px;color:#9fbbb7;cursor:pointer;border:0;border-radius:.25rem}.btn-clipboard[_ngcontent-%COMP%]:hover{background:#41b3a3;color:#fff}div.bottom[_ngcontent-%COMP%], div.bottom-right[_ngcontent-%COMP%]{position:fixed;bottom:10px}div.bottom-right[_ngcontent-%COMP%]{right:20px}div.version[_ngcontent-%COMP%]{color:grey}div.privacy[_ngcontent-%COMP%], div.version[_ngcontent-%COMP%]{font-size:12px}div.error-box[_ngcontent-%COMP%]{background:#ffeded}div.error-box[_ngcontent-%COMP%], div.warning-box[_ngcontent-%COMP%]{max-width:300px}.shakeit[_ngcontent-%COMP%]{-webkit-animation:shake .82s cubic-bezier(.36,.07,.19,.97) both;animation:shake .82s cubic-bezier(.36,.07,.19,.97) both;transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;perspective:1000px}@-webkit-keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}']}),t})(),q=(()=>{class t{}return t.\u0275mod=o.Hb({type:t,bootstrap:[$]}),t.\u0275inj=o.Gb({factory:function(e){return new(e||t)},providers:[f,{provide:u.b,useValue:v.a},{provide:u.a,useValue:"CaseClassGenerator"},{provide:u.e,useValue:!1},{provide:b.a,useValue:{coreLibraryLoader:()=>n.e(8).then(n.t.bind(null,"ECCn",7)),languages:{scala:()=>n.e(10).then(n.t.bind(null,"n3/M",7)),java:()=>n.e(9).then(n.t.bind(null,"My+Z",7)),sql:()=>n.e(11).then(n.t.bind(null,"3gkP",7))}}}],imports:[[a.a,r.c,s.b,l.b,p.c,b.c,c.a,d.a.forRoot(),g.a.initializeApp(i),u.d]]}),t})();Object(o.S)(),a.e().bootstrapModule(q).catch(t=>console.log(t))}},[[0,0,5]]]);