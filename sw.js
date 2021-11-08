(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.2.4"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.2.4"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.2.4"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.2.4"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,s),i.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||n(a.precache),r=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:i.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let u;async function f(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(i):i,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,r)}function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;s(873);function y(e){return"string"==typeof e?new Request(e):e}class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=y(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const a=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,a){const n=d(t.url,s);if(t.url===n)return e.match(t,a);const i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(n===d(t.url,s))return e.match(t,a)}(l,i.clone(),["__WB_REVISION__"],h):null;try{await l.put(i,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=y(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class _ extends class{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:a}),i=this._getResponse(n,s,t);return[i,this._awaitComplete(i,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,i;try{n=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:i}),t.destroy(),i)throw i}}{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(_.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,i=e.integrity,r=!i||i===t;if(a=await s.fetch(new Request(e,{integrity:i||t})),t&&r){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==_.copyRedirectedCacheableResponsesPlugin&&(a===_.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(_.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}_.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},_.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class v{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new _({cacheName:i(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}s(80);(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"c8160a6b4e0a3db1df31a747a45f23c2","url":"404.html"},{"revision":"3e77626a330dc5b8e59d7c8a371cd76b","url":"assets/css/styles.917c4ced.css"},{"revision":"c5900a0449bf82b41b2b4e2ccf4ce9b9","url":"assets/js/02a1e558.b92b2d46.js"},{"revision":"2f214c21c0b8f6fb35574763329fd9e6","url":"assets/js/03be7dae.27e9b235.js"},{"revision":"4006d797a22f84627da7123fdc54d277","url":"assets/js/04b3fc6c.e40292b8.js"},{"revision":"ed33f13baba8ce5e86eaddb460319ef4","url":"assets/js/0d71a3f1.decedc33.js"},{"revision":"10cf21e566143a34ee0f1dd7e11e50ea","url":"assets/js/113.9d7f705c.js"},{"revision":"16e92ac5168619756745019174e0bfbb","url":"assets/js/14b133ce.1666522f.js"},{"revision":"6a7a2c794bd481d862b5bdc93730dc8b","url":"assets/js/17896441.72364e8f.js"},{"revision":"2c610e0363a7d973a1066320e8e0fe14","url":"assets/js/18b93cb3.f20b5ebc.js"},{"revision":"2fc4c64dcb8b69130239a06283cee948","url":"assets/js/1a421168.fcc29e52.js"},{"revision":"421480403cce1cf16f8af6cebcac25af","url":"assets/js/1be78505.633012c0.js"},{"revision":"8c42f58da781d2c07eaea7d59a292669","url":"assets/js/22e4d634.6d44f9a9.js"},{"revision":"d080ba943966a4e7d09c40ca03dda164","url":"assets/js/252e2b80.53c54da2.js"},{"revision":"9a28bc8e310b1f8fa1738f39b0039f61","url":"assets/js/27299a3b.c5372d5b.js"},{"revision":"832e99f7170b76c8b6ac9bfa9907719e","url":"assets/js/2ae17008.b9cc5aa7.js"},{"revision":"117145a4d0da90ef4963ebf061603414","url":"assets/js/3793e934.0a8ce2cd.js"},{"revision":"a7ea22b70a80794f62ea94f40a4acbe5","url":"assets/js/407f8801.481c467b.js"},{"revision":"0ff79d2994a833feda5e3b38acb2ca3e","url":"assets/js/4346.61326471.js"},{"revision":"129b5e9ce77a20bc5e87d634abb1e631","url":"assets/js/4351d34b.8b6c9a71.js"},{"revision":"3786454d5a3535c55a9c83f24dfa8790","url":"assets/js/47c825a2.5deca91c.js"},{"revision":"594cb478bcd6f0486c39afc20cb28067","url":"assets/js/494f4f5e.3e8c826d.js"},{"revision":"d101d2a08930b5adda7a02db902b8b6f","url":"assets/js/4e0c07c5.e93353d2.js"},{"revision":"fd7a5e8d86d6403888cae61fd19610d2","url":"assets/js/4ef1ee20.9e7f4009.js"},{"revision":"92af73d825375faaac222d9201f5f81e","url":"assets/js/5131.5e52b87f.js"},{"revision":"4d538875adb3808286a7df02c33321db","url":"assets/js/54071611.08dad4d2.js"},{"revision":"722256ebccad870cde8b422b98af531c","url":"assets/js/54f44165.89a1bc1d.js"},{"revision":"07812209f27f01165f1841c9199bcf55","url":"assets/js/5635425a.35471447.js"},{"revision":"f66248d5b6785de02e58a4554b98e73d","url":"assets/js/5b125e0e.5b5d051d.js"},{"revision":"a38864f647192a7d7e58213c6cafcab5","url":"assets/js/6266f1ba.b962e1b1.js"},{"revision":"2f04530bcaf73d18f47216fcd7b3a1e1","url":"assets/js/63150b11.6e93c027.js"},{"revision":"86d8818f06daf51a6eecbfcead41c34e","url":"assets/js/6445.2d8c90b6.js"},{"revision":"b489501e8a5bd249533695127184f05d","url":"assets/js/651850eb.f33675a2.js"},{"revision":"dcf82211b335bbda95ae46ae81c5464b","url":"assets/js/6608151e.5ac19079.js"},{"revision":"f0f2f9f522116d779fd7601361c3e74e","url":"assets/js/72f058d3.dfb561cd.js"},{"revision":"114ab7336ce257888b4ca96af00ee077","url":"assets/js/79ea3e73.6a13ca82.js"},{"revision":"25f52478e08afb6a6fdabd3b41f36c7f","url":"assets/js/7aeeadd4.07d78816.js"},{"revision":"7174a20e124dd96fe1a39a2222eb7d1d","url":"assets/js/8177.658ae271.js"},{"revision":"b48b4658843356abc5882f9c05f7124f","url":"assets/js/8afa1348.6a701f93.js"},{"revision":"1bffca4358e6dffba470d627112a0625","url":"assets/js/90c91afe.60d07b5c.js"},{"revision":"d5e12ad7056ba7a4646c80af4ed77f8b","url":"assets/js/935f2afb.b28a031f.js"},{"revision":"c11fa3976a9a8c665110502e475c9f8e","url":"assets/js/93f0793d.1ba3a3f8.js"},{"revision":"631e95d49132ab35aa207935232aa85e","url":"assets/js/9903dc99.c964f166.js"},{"revision":"8afef28359b7138c83b1127d7e294a04","url":"assets/js/9e4087bc.c6e02bd8.js"},{"revision":"58fca62e96a1c96ea6f5da1f86c4e041","url":"assets/js/a09c2993.dbb317fd.js"},{"revision":"5ad5c38bfb8f337788e433a82b8c55f4","url":"assets/js/a74b641e.b92351ef.js"},{"revision":"1e51e5b550c6662bc077e3d88590216f","url":"assets/js/a9789633.f846040d.js"},{"revision":"59a3afe52adcf0bf071f734cbbc7ed6b","url":"assets/js/adb64ee2.edd2941c.js"},{"revision":"e8c24509cf81cddbb124ad778ecb9524","url":"assets/js/b647df5a.9a5d07e4.js"},{"revision":"dc19fdec69a9ac6bec33b10243e34860","url":"assets/js/c00c612c.a8f8c9d4.js"},{"revision":"f8209f3a6104c91d70ca7779ae8edd0c","url":"assets/js/c44fa306.44859020.js"},{"revision":"695a9f2f789bd5a0100b84fff16a522d","url":"assets/js/c49413db.391260a3.js"},{"revision":"bdcaa68e67d590a1dd92ccdbe04ce0be","url":"assets/js/c4f5d8e4.33529ff4.js"},{"revision":"b3d9eb9ff711aed54c227b2a3113542c","url":"assets/js/cb5f486b.f5b84e92.js"},{"revision":"6fec6408d1c37704cb756450be3cf135","url":"assets/js/cd9c57cb.3165d7c8.js"},{"revision":"6a0dd9a9693e2babab7edaaf357d71bf","url":"assets/js/d19b9e8a.ed7be306.js"},{"revision":"76d1f16a7c4de69c2ebedf66099c87d1","url":"assets/js/d4836a8e.3396a59f.js"},{"revision":"bf5935364c3f3723552ea4a558dc1a77","url":"assets/js/d720bb60.fffb9703.js"},{"revision":"d9778e87e1db525a3050fba3badca11c","url":"assets/js/df70a34a.72cee309.js"},{"revision":"06c3c8cb937cae2634ae4ee1170cfe5b","url":"assets/js/e1715838.eac91f43.js"},{"revision":"90297bce155e0c20fd3232f8f5fe35a8","url":"assets/js/eabdbf07.952ab5be.js"},{"revision":"c705ba5ee70795a2aaf91a43fbe798a2","url":"assets/js/f0447160.d6d19ca8.js"},{"revision":"615b9f2370744b751cdad5cce12633c8","url":"assets/js/f3212b1e.9ca1d047.js"},{"revision":"5c59d495a7546bc480e9502c8a224b79","url":"assets/js/f546eb96.19da68bb.js"},{"revision":"46eed7330751e5d6e71862cca0437579","url":"assets/js/f97daad0.adf4263c.js"},{"revision":"27accc3b86ddf16b68479f2b43d1ebb4","url":"assets/js/fc80686b.7573b272.js"},{"revision":"b3e3e908eda751378e1fc58da268f136","url":"assets/js/main.6ed80503.js"},{"revision":"71c67a49dfe91431ae02aa4bd66edbf3","url":"assets/js/runtime~main.88d31296.js"},{"revision":"4d579d46efcc2929c1667e711bf0294a","url":"blog/archive/index.html"},{"revision":"eb8461dcad80d8dccdd52371d9fa2805","url":"docs/8.x/getting-started/installation/index.html"},{"revision":"2aa9d409330a1bcedb03031b7df8c938","url":"docs/8.x/getting-started/options/index.html"},{"revision":"89a5fad5b747da625c9172ad52f6e09f","url":"docs/8.x/getting-started/presets/index.html"},{"revision":"a4c478439608ae68ab371408114ec7fc","url":"docs/8.x/getting-started/test-environment/index.html"},{"revision":"3eed6beed4d6b33603e7c5177c1fe328","url":"docs/8.x/guides/absolute-imports/index.html"},{"revision":"c5845abab00308ea988d56f020a1db9d","url":"docs/8.x/guides/angular-ivy/index.html"},{"revision":"ef84a7d7886b8db0c6b0d9045f3a8490","url":"docs/8.x/guides/esm-support/index.html"},{"revision":"aca097fa17e54246bad15da9506aff28","url":"docs/8.x/guides/jsdom-version/index.html"},{"revision":"5fd3e470f3a6607f415ed0b6ecb90fa8","url":"docs/8.x/guides/troubleshooting/index.html"},{"revision":"0d26382d6eb1a18900269573a8769c07","url":"docs/8.x/guides/using-with-babel/index.html"},{"revision":"972d34abea89982a5c0958b90ee7fbe6","url":"docs/8.x/index.html"},{"revision":"acdca5176dd5582181d1c36cb534aa7d","url":"docs/8.x/processing/index.html"},{"revision":"e1b16f9cc98ceaded97edbdab100e367","url":"docs/9.x/getting-started/installation/index.html"},{"revision":"2f3312c2300c06a6a7d5feafad533152","url":"docs/9.x/getting-started/options/index.html"},{"revision":"249dcfad2afb53c66626d165da18f19b","url":"docs/9.x/getting-started/presets/index.html"},{"revision":"bd67fe1a44f3e2bdebdfcf75bfb0910b","url":"docs/9.x/getting-started/test-environment/index.html"},{"revision":"958bf05a04f6de50445f947924e20322","url":"docs/9.x/guides/absolute-imports/index.html"},{"revision":"36c4b3aa7e5fa02601756a1f47a3daef","url":"docs/9.x/guides/angular-ivy/index.html"},{"revision":"9f981d0484738fac0ffcf9b4c0e5fdfa","url":"docs/9.x/guides/esm-support/index.html"},{"revision":"250e16754b819ff19a3e1cac9b6bd2ce","url":"docs/9.x/guides/jsdom-version/index.html"},{"revision":"846d2a07ad801cdcc9e77dcf559f855b","url":"docs/9.x/guides/troubleshooting/index.html"},{"revision":"cd9981f784a2237d1c5e51c70a0eb591","url":"docs/9.x/guides/using-with-babel/index.html"},{"revision":"2c8a2eba7af7b305b4f052fa5fe8ec27","url":"docs/9.x/index.html"},{"revision":"6e4c0fe5874fc7fc434013017dcbb340","url":"docs/9.x/processing/index.html"},{"revision":"b59c3ccbcc87460e6fbf3ba6c568071c","url":"docs/getting-started/installation/index.html"},{"revision":"c46266df2217b33fa6ffeb7d0ba04997","url":"docs/getting-started/options/index.html"},{"revision":"f080612a55d077293dd7727b108b6cef","url":"docs/getting-started/presets/index.html"},{"revision":"ac571c4db9f12eab221f6c1efb9dba3b","url":"docs/getting-started/test-environment/index.html"},{"revision":"cfae46713118a15880b05cec0b3ed45b","url":"docs/guides/absolute-imports/index.html"},{"revision":"71cc015c1cae2fc4efb79d04692ae0e3","url":"docs/guides/angular-ivy/index.html"},{"revision":"7974636693a226ec7fce4f11f8e48fae","url":"docs/guides/esm-support/index.html"},{"revision":"a1eafc05a564f018dd2b38702b85c7d4","url":"docs/guides/jsdom-version/index.html"},{"revision":"c2708784e36b4aa90ef228286f94e525","url":"docs/guides/troubleshooting/index.html"},{"revision":"a675e7010e39449ddfd4a7e4247f3330","url":"docs/guides/using-with-babel/index.html"},{"revision":"43b70ed8d06e6caa1ec881d1b940619c","url":"docs/index.html"},{"revision":"0392bb7c0aa8723256212d0ac55f7082","url":"docs/next/getting-started/installation/index.html"},{"revision":"73eba38a3ae30dddfc526505315dd39d","url":"docs/next/getting-started/options/index.html"},{"revision":"f00137df0f12c743f03395162b4cfcab","url":"docs/next/getting-started/presets/index.html"},{"revision":"a36355a9887882d471e90099ee4aa4b3","url":"docs/next/getting-started/test-environment/index.html"},{"revision":"2cf82263c5481e82c6f787c69a3bf2e0","url":"docs/next/guides/absolute-imports/index.html"},{"revision":"ec7aaf14c7bde047ece15395408ba467","url":"docs/next/guides/angular-13+/index.html"},{"revision":"54c7f8f151763105b2521ab0d01bc237","url":"docs/next/guides/angular-ivy/index.html"},{"revision":"e11274ac9a1189c7585929549153813a","url":"docs/next/guides/esm-support/index.html"},{"revision":"9a47625bd7798f4d843c509e2ce213c8","url":"docs/next/guides/jsdom-version/index.html"},{"revision":"9e1498f7a2bb6a04a1ed68f31f65c5dc","url":"docs/next/guides/troubleshooting/index.html"},{"revision":"df1f9454505a6147d38974787f259af8","url":"docs/next/guides/using-with-babel/index.html"},{"revision":"81d0a5df2d93acf43bb6a05b29534647","url":"docs/next/index.html"},{"revision":"7434196b93a5a36e53c0cc8358987321","url":"docs/next/processing/index.html"},{"revision":"fd588ab70947ce6e9f8b75130976c260","url":"docs/processing/index.html"},{"revision":"b4cf138fb074852f4cb7e3b98959814b","url":"index.html"},{"revision":"39d0f7b81200aacb9b15b16745bd2264","url":"manifest.json"},{"revision":"60e56b60e0d5c42ee4359232ae3c08f1","url":"versions/index.html"},{"revision":"f8389ca1a741a115313bede9ac02e2c0","url":"img/discord.svg"},{"revision":"5e0e02d0c0f021b2037ed926d68ea1be","url":"img/documentation.png"},{"revision":"a83841c50aa67da6144860bd5031cc53","url":"img/github.png"},{"revision":"a2552d19b3538a030407a0191c99cae1","url":"img/logo.svg"},{"revision":"ee83b65c3aed4a45b928a4bebeb97a98","url":"img/pull-request.png"},{"revision":"cce226b035fb4ab5eee43b077db1ba4a","url":"img/troubleshooting.png"}],s=new v({fallbackToNetwork:!0});e.offlineMode&&(s.addToCacheList(t),e.debug&&console.log("[Docusaurus-PWA][SW]: addToCacheList",{precacheManifest:t})),await async function(e){}(),self.addEventListener("install",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: install event",{event:t}),t.waitUntil(s.install(t))})),self.addEventListener("activate",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: activate event",{event:t}),t.waitUntil(s.activate(t))})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const a=t.request.url,n=function(e){const t=[],s=new URL(e,self.location.href);return s.origin!==self.location.origin||(s.search="",s.hash="",t.push(s.href),s.pathname.endsWith("/")?t.push(`${s.href}index.html`):t.push(`${s.href}/index.html`)),t}(a);for(let i=0;i<n.length;i+=1){const r=n[i],c=s.getCacheKeyForURL(r);if(c){const s=caches.match(c);e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:a,possibleURL:r,possibleURLs:n,cacheKey:c,cachedResponse:s}),t.respondWith(s);break}}}})),self.addEventListener("message",(async t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: message event",{event:t});"SKIP_WAITING"===(t.data&&t.data.type)&&self.skipWaiting()}))})()})()})();