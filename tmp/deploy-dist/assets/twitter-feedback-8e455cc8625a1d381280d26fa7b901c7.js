"use strict"
define("twitter-feedback/app",["exports","twitter-feedback/resolver","ember-load-initializers","twitter-feedback/config/environment"],function(e,t,r,a){Object.defineProperty(e,"__esModule",{value:!0})
var n=Ember.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:t.default});(0,r.default)(n,a.default.modulePrefix),e.default=n}),define("twitter-feedback/appfiles/application/route",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({})}),define("twitter-feedback/appfiles/application/template",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"su8ALScf",block:'{"symbols":[],"statements":[[1,[18,"outlet"],false]],"hasEval":false}',meta:{moduleName:"twitter-feedback/appfiles/application/template.hbs"}})}),define("twitter-feedback/appfiles/index/controller",["exports","twitter-feedback/config/environment","ember-concurrency"],function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Controller.extend({session:Ember.inject.service("session"),tweets:[],recentHash:[],addRecentHash:function(e){var t=this.get("recentHash")
e&&!t.includes(e)&&(console.log(t.length),t.length>=10&&t.popObject(),t.unshiftObject(e),this.get("session").setVariable("recentHash",t),this.set("recentHash",t))},authorizeTask:(0,r.task)(regeneratorRuntime.mark(function e(){var r
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Ember.$.ajax({type:"GET",url:t.default.hostURL+"/oauth2/token"})
case 2:r=e.sent,console.log(r,JSON.parse(r).access_token),this.get("session").setSession(JSON.parse(r))
case 5:case"end":return e.stop()}},e,this)})),getTweetsTask:(0,r.task)(regeneratorRuntime.mark(function e(r){var a,n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=this.get("session").getSession().authorization,e.prev=1,e.next=4,Ember.$.ajax({type:"GET",url:t.default.hostURL+"/search/tweets",dataType:"json",data:{q:r},headers:{Authorization:a}})
case 4:n=e.sent,this.addRecentHash(r),e.next=11
break
case 8:e.prev=8,e.t0=e.catch(1),console.log("show error to dashboard")
case 11:if(n){e.next=15
break}return this.set("tweets",[]),console.log("show error to dashboard"),e.abrupt("return","")
case 15:if(!("errors"in n)){e.next=23
break}if(89!==n.errors[0].code){e.next=20
break}throw"Invalid session"
case 20:console.log("show error to dashboard")
case 21:e.next=24
break
case 23:"statuses"in n?this.set("tweets",n.statuses||[]):this.set("tweets",[])
case 24:case"end":return e.stop()}},e,this,[[1,8]])})),tweetsTask:(0,r.task)(regeneratorRuntime.mark(function e(t,r){var a
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("called",t,r),t){e.next=4
break}return this.set("tweets",[]),e.abrupt("return")
case 4:if((a=(this.get("session").getSession()||{}).authorization)&&!r){e.next=18
break}return e.next=8,this.get("authorizeTask").perform()
case 8:return e.prev=8,e.next=11,this.get("getTweetsTask").perform(t)
case 11:e.next=16
break
case 13:e.prev=13,e.t0=e.catch(8)
case 16:e.next=26
break
case 18:return e.prev=18,e.next=21,this.get("getTweetsTask").perform(t)
case 21:e.next=26
break
case 23:e.prev=23,e.t1=e.catch(18)
case 26:case"end":return e.stop()}},e,this,[[8,13],[18,23]])})),actions:{recentTweets:function(e){this.set("search",e),this.get("tweetsTask").perform(e)}}})}),define("twitter-feedback/appfiles/index/route",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({setupController:function(e){this._super.apply(this,arguments),e.set("recentHash",e.get("session").getVariable("recentHash",[]))}})}),define("twitter-feedback/appfiles/index/template",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"oW9odMa1",block:'{"symbols":["tweet","index","recent"],"statements":[[6,"nav"],[9,"class","navbar navbar-expand-lg navbar-light bg-light nav-bar-blue"],[7],[0,"\\n        "],[6,"div"],[9,"class","container"],[7],[0,"\\n            "],[6,"button"],[9,"class","navbar-toggler"],[9,"type","button"],[9,"data-toggle","collapse"],[9,"data-target","#navbarSupportedContent"],[9,"aria-controls","navbarSupportedContent"],[9,"aria-expanded","false"],[9,"aria-label","Toggle navigation"],[7],[0,"\\n                "],[6,"span"],[9,"class","navbar-toggler-icon"],[7],[8],[0,"\\n            "],[8],[0,"\\n            \\n            "],[6,"div"],[9,"class","collapse navbar-collapse"],[9,"id","navbarSupportedContent"],[7],[0,"\\n                "],[6,"form"],[9,"class","form-inline my-2 my-lg-0 float-left"],[3,"action",[[19,0,[]],[25,"perform",[[19,0,["tweetsTask"]],[19,0,["search"]]],null]],[["on"],["submit"]]],[7],[0,"\\n                    "],[1,[25,"input",null,[["class","type","value","placeholder","data-action","aria-label"],["form-control mr-sm-2","text",[19,0,["search"]],"Search","grow","Search"]]],false],[0,"\\n                    "],[2," <button class=\\"btn btn-outline-success my-2 my-sm-0\\" type=\\"submit\\">Search</button> "],[0,"\\n                "],[8],[0,"\\n            "],[8],[0,"\\n        "],[8],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","container container-margin"],[7],[0,"\\n        "],[6,"div"],[9,"class","row"],[7],[0,"\\n            "],[6,"div"],[9,"class","col-4"],[7],[0,"\\n                "],[6,"div"],[9,"class","card"],[7],[0,"\\n                    "],[6,"div"],[9,"class","card-body"],[7],[0,"\\n                        "],[6,"h4"],[9,"class","card-title"],[7],[0,"Recently used your hastags"],[8],[0,"\\n                        "],[6,"ul"],[9,"class","list-group"],[7],[0,"\\n"],[4,"each",[[19,0,["recentHash"]]],null,{"statements":[[0,"                            "],[6,"li"],[9,"class","list-group-item"],[7],[0,"\\n                                "],[6,"span"],[9,"class","oi oi-fork"],[7],[8],[0,"\\n                                "],[6,"a"],[9,"href","javascript:void;"],[3,"action",[[19,0,[]],"recentTweets",[19,3,[]]]],[7],[1,[19,3,[]],false],[8],[0,"\\n                            "],[8],[0,"\\n"]],"parameters":[3]},{"statements":[[0,"                            "],[6,"li"],[9,"class","list-group-item"],[7],[0,"\\n                                No recent search\\n                            "],[8],[0,"\\n"]],"parameters":[]}],[0,"                        "],[8],[0,"\\n                    "],[8],[0,"\\n                "],[8],[0,"\\n            "],[8],[0,"\\n            "],[6,"div"],[9,"class","col-8"],[7],[0,"\\n                "],[6,"ul"],[9,"class","list-group tweet-lists"],[7],[0,"\\n                    "],[6,"li"],[9,"class","list-group-item"],[7],[0,"\\n                        "],[6,"h4"],[7],[0,"Latest "],[1,[20,["tweets","length"]],false],[8],[0,"\\n                    "],[8],[0,"\\n"],[4,"if",[[19,0,["tweetsTask","isIdle"]]],null,{"statements":[[4,"each",[[19,0,["tweets"]]],null,{"statements":[[0,"                    "],[6,"li"],[9,"class","list-group-item"],[7],[0,"\\n                        "],[6,"img"],[9,"class","figure figure-img"],[10,"src",[26,[[19,1,["user","profile_image_url_https"]]]]],[9,"alt",""],[7],[8],[0,"\\n                        "],[6,"div"],[9,"class","figure figure-div"],[7],[0,"\\n                            "],[6,"p"],[9,"class","tweets"],[7],[1,[19,1,["text"]],false],[8],[0,"\\n                            "],[6,"small"],[9,"class","float-right"],[7],[1,[25,"moment",[[19,1,["created_at"]]],null],false],[8],[0,"\\n                        "],[8],[0,"\\n                    "],[8],[0,"\\n"]],"parameters":[1,2]},{"statements":[[0,"                    "],[6,"li"],[9,"class","list-group-item"],[7],[0,"No Tweets found"],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"                    "],[6,"li"],[9,"class","list-group-item"],[7],[0,"Loading..."],[8],[0,"\\n"]],"parameters":[]}],[0,"                "],[8],[0,"\\n            "],[8],[0,"\\n        "],[8],[0,"\\n    "],[8]],"hasEval":false}',meta:{moduleName:"twitter-feedback/appfiles/index/template.hbs"}})}),define("twitter-feedback/appfiles/session/service",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Service.extend({init:function(){this.getVariablesFromLocalStorage()},sessionObject:null,storageVariables:{},setSession:function(e){var t=e.access_token,r=e.token_type,a=r+" "+t,n={access_token:t,token_type:r,authorization:a}
this.set("sessionObject",n),window.localStorage.setItem("session",JSON.stringify(n))},getSession:function(){var e=this.get("sessionObject")
if(null===e){var t=window.localStorage.getItem("session")
t&&"null"!==t&&(e=JSON.parse(t),this.set("sessionObject",e))}return e},setVariable:function(e,t){var r=this.get("storageVariables")
return r[e]=t,this.set("storageVariable",r),this.setVariblesIntoLocalStorage(r),t},setVariblesIntoLocalStorage:function(e){window.localStorage.setItem("storageVariables",JSON.stringify(e||{}))},getVariable:function(e,t){var r=this.get("storageVariables")
return e in r||this.setVariable(e,t),r[e]||t},getVariablesFromLocalStorage:function(){var e=window.localStorage.getItem("storageVariables")||"{}"
e&&"null"!==e?e=JSON.parse(e):"null"===e&&(e={}),this.set("storageVariables",e)}})}),define("twitter-feedback/helpers/app-version",["exports","twitter-feedback/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,r){function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return t.hideSha?n.match(r.versionRegExp)[0]:t.hideVersion?n.match(r.shaRegExp)[0]:n}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=a
var n=t.default.APP.version
e.default=Ember.Helper.helper(a)}),define("twitter-feedback/helpers/cancel-all",["exports","ember-concurrency/-helpers"],function(e,t){function r(e){var r=e[0]
return r&&"function"==typeof r.cancelAll||Ember.assert("The first argument passed to the `cancel-all` helper should be a Task or TaskGroup (without quotes); you passed "+r,!1),(0,t.taskHelperClosure)("cancelAll",[r,a])}Object.defineProperty(e,"__esModule",{value:!0}),e.cancelHelper=r
var a="the 'cancel-all' template helper was invoked"
e.default=Ember.Helper.helper(r)}),define("twitter-feedback/helpers/moment",["exports"],function(e){function t(e){var t=r(e,1),a=t[0]
return moment(a).fromNow()}Object.defineProperty(e,"__esModule",{value:!0}),e.momentjs=t
var r=function(){function e(e,t){var r=[],a=!0,n=!1,i=void 0
try{for(var s,o=e[Symbol.iterator]();!(a=(s=o.next()).done)&&(r.push(s.value),!t||r.length!==t);a=!0);}catch(e){n=!0,i=e}finally{try{!a&&o.return&&o.return()}finally{if(n)throw i}}return r}return function(t,r){if(Array.isArray(t))return t
if(Symbol.iterator in Object(t))return e(t,r)
throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()
e.default=Ember.Helper.helper(t)}),define("twitter-feedback/helpers/perform",["exports","ember-concurrency/-helpers"],function(e,t){function r(e,r){return(0,t.taskHelperClosure)("perform",e,r)}Object.defineProperty(e,"__esModule",{value:!0}),e.performHelper=r,e.default=Ember.Helper.helper(r)}),define("twitter-feedback/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("twitter-feedback/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("twitter-feedback/helpers/task",["exports"],function(e){function t(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t]
return r}return Array.from(e)}function r(e){return Array.isArray(e)?e:Array.from(e)}function a(e){var a=r(e),n=a[0],i=a.slice(1)
return n._curry.apply(n,t(i))}Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Helper.helper(a)}),define("twitter-feedback/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","twitter-feedback/config/environment"],function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0})
var a=r.default.APP,n=a.name,i=a.version
e.default={name:"App Version",initialize:(0,t.default)(n,i)}}),define("twitter-feedback/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("twitter-feedback/initializers/data-adapter",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("twitter-feedback/initializers/ember-concurrency",["exports","ember-concurrency"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-concurrency",initialize:function(){}}}),define("twitter-feedback/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("twitter-feedback/initializers/export-application-global",["exports","twitter-feedback/config/environment"],function(e,t){function r(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var r
if("undefined"!=typeof window)r=window
else if("undefined"!=typeof global)r=global
else{if("undefined"==typeof self)return
r=self}var a,n=t.default.exportApplicationGlobal
a="string"==typeof n?n:Ember.String.classify(t.default.modulePrefix),r[a]||(r[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete r[a]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=r,e.default={name:"export-application-global",initialize:r}}),define("twitter-feedback/initializers/injectStore",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("twitter-feedback/initializers/store",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("twitter-feedback/initializers/transforms",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"transforms",before:"store",initialize:function(){}}}),define("twitter-feedback/instance-initializers/ember-data",["exports","ember-data/instance-initializers/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("twitter-feedback/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("twitter-feedback/router",["exports","twitter-feedback/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
r.map(function(){}),e.default=r}),define("twitter-feedback/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("twitter-feedback/config/environment",["ember"],function(e){try{var t="twitter-feedback/config/environment",r=document.querySelector('meta[name="'+t+'"]').getAttribute("content"),a=JSON.parse(unescape(r)),n={default:a}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(e){throw new Error('Could not read config from meta tag with name "'+t+'".')}}),runningTests||require("twitter-feedback/app").default.create({name:"twitter-feedback",version:"0.0.0+703553f2"})
