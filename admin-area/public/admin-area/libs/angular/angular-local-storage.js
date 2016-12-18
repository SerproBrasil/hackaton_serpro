
/**
 * An Angular module that gives you access to the browsers local storage
 * @version v0.2.8 - 2016-05-02
 * @link https://github.com/grevory/angular-local-storage
 * @author grevory <greg@gregpike.ca>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
!function(a,b){var c=b.isDefined,d=b.isUndefined,e=b.isNumber,f=b.isObject,g=b.isArray,h=b.extend,i=b.toJson;b.module("LocalStorageModule",[]).provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/"},this.defaultToCookie=!0,this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(a){return this.prefix=a,this},this.setStorageType=function(a){return this.storageType=a,this},this.setDefaultToCookie=function(a){return this.defaultToCookie=!!a,this},this.setStorageCookie=function(a,b){return this.cookie.expiry=a,this.cookie.path=b,this},this.setStorageCookieDomain=function(a){return this.cookie.domain=a,this},this.setNotify=function(a,b){return this.notify={setItem:a,removeItem:b},this},this.$get=["$rootScope","$window","$document","$parse","$timeout",function(a,b,j,k,l){function m(c){if(c||(c=b.event),r.setItem&&v(c.key)){var d=u(c.key);l(function(){a.$broadcast("LocalStorageModule.notification.changed",{key:d,newvalue:c.newValue,storageType:o.storageType})})}}var n,o=this,p=o.prefix,q=o.cookie,r=o.notify,s=o.storageType;j?j[0]&&(j=j[0]):j=document,"."!==p.substr(-1)&&(p=p?p+".":"");var t=function(a){return p+a},u=function(a){return a.replace(new RegExp("^"+p,"g"),"")},v=function(a){return 0===a.indexOf(p)},w=function(){try{var c=s in b&&null!==b[s],d=t("__"+Math.round(1e7*Math.random()));return c&&(n=b[s],n.setItem(d,""),n.removeItem(d)),c}catch(e){return o.defaultToCookie&&(s="cookie"),a.$broadcast("LocalStorageModule.notification.error",e.message),!1}}(),x=function(b,c){if(c=d(c)?null:i(c),!w&&o.defaultToCookie||"cookie"===o.storageType)return w||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:"cookie"}),D(b,c);try{n&&n.setItem(t(b),c),r.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:o.storageType})}catch(e){return a.$broadcast("LocalStorageModule.notification.error",e.message),D(b,c)}return!0},y=function(b){if(!w&&o.defaultToCookie||"cookie"===o.storageType)return w||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),E(b);var c=n?n.getItem(t(b)):null;if(!c||"null"===c)return null;try{return JSON.parse(c)}catch(d){return c}},z=function(){var b,c;for(b=0;b<arguments.length;b++)if(c=arguments[b],!w&&o.defaultToCookie||"cookie"===o.storageType)w||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:c,storageType:"cookie"}),F(c);else try{n.removeItem(t(c)),r.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:c,storageType:o.storageType})}catch(d){a.$broadcast("LocalStorageModule.notification.error",d.message),F(c)}},A=function(){if(!w)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),[];var b=p.length,c=[];for(var d in n)if(d.substr(0,b)===p)try{c.push(d.substr(b))}catch(e){return a.$broadcast("LocalStorageModule.notification.error",e.Description),[]}return c},B=function(b){var c=p?new RegExp("^"+p):new RegExp,d=b?new RegExp(b):new RegExp;if(!w&&o.defaultToCookie||"cookie"===o.storageType)return w||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),G();if(!w&&!o.defaultToCookie)return!1;var e=p.length;for(var f in n)if(c.test(f)&&d.test(f.substr(e)))try{z(f.substr(e))}catch(g){return a.$broadcast("LocalStorageModule.notification.error",g.message),G()}return!0},C=function(){try{return b.navigator.cookieEnabled||"cookie"in j&&(j.cookie.length>0||(j.cookie="test").indexOf.call(j.cookie,"test")>-1)}catch(c){return a.$broadcast("LocalStorageModule.notification.error",c.message),!1}}(),D=function(b,c,h){if(d(c))return!1;if((g(c)||f(c))&&(c=i(c)),!C)return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var k="",l=new Date,m="";if(null===c?(l.setTime(l.getTime()+-864e5),k="; expires="+l.toGMTString(),c=""):e(h)&&0!==h?(l.setTime(l.getTime()+24*h*60*60*1e3),k="; expires="+l.toGMTString()):0!==q.expiry&&(l.setTime(l.getTime()+24*q.expiry*60*60*1e3),k="; expires="+l.toGMTString()),b){var n="; path="+q.path;q.domain&&(m="; domain="+q.domain),j.cookie=t(b)+"="+encodeURIComponent(c)+k+n+m}}catch(o){return a.$broadcast("LocalStorageModule.notification.error",o.message),!1}return!0},E=function(b){if(!C)return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var c=j.cookie&&j.cookie.split(";")||[],d=0;d<c.length;d++){for(var e=c[d];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(t(b)+"=")){var f=decodeURIComponent(e.substring(p.length+b.length+1,e.length));try{return JSON.parse(f)}catch(g){return f}}}return null},F=function(a){D(a,null)},G=function(){for(var a=null,b=p.length,c=j.cookie.split(";"),d=0;d<c.length;d++){for(a=c[d];" "===a.charAt(0);)a=a.substring(1,a.length);var e=a.substring(b,a.indexOf("="));F(e)}},H=function(){return s},I=function(a,b,d,e){e=e||b;var g=y(e);return null===g&&c(d)?g=d:f(g)&&f(d)&&(g=h(g,d)),k(b).assign(a,g),a.$watch(b,function(a){x(e,a)},f(a[b]))};w&&(b.addEventListener?b.addEventListener("storage",m,!1):b.attachEvent&&b.attachEvent("onstorage",m));var J=function(){for(var a=0,c=b[s],d=0;d<c.length;d++)0===c.key(d).indexOf(p)&&a++;return a};return{isSupported:w,getStorageType:H,set:x,add:x,get:y,keys:A,remove:z,clearAll:B,bind:I,deriveKey:t,underiveKey:u,length:J,defaultToCookie:this.defaultToCookie,cookie:{isSupported:C,set:D,add:D,get:E,remove:F,clearAll:G}}}]})}(window,window.angular);
//# sourceMappingURL=angular-local-storage.min.js.map