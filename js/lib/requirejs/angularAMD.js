define(["angular"],function(){var a,b,c,d={},e=[],f={};return d.bootstrap=function(){a.element(document).ready(function(){a.bootstrap(document,[b])})},d.appname=function(){return b},d.route=function(a){var b;if(a.hasOwnProperty("controllerUrl")?(b=a.controllerUrl,delete a.controllerUrl):"string"==typeof a.controller&&(b=a.controller),b){var c=a.resolve||{};c.__load=["$q","$rootScope",function(a,c){var d=a.defer();return require([b],function(){d.resolve(),c.$apply()}),d.promise}],a.resolve=c}return a},d.processQueue=function(){for(;e.length;){var b,d=e.shift(),g=d.module._invokeQueue;for(b=0;b<g.length;b+=1){var h=g[b],i=h[0],j=h[1],k=h[2];if(f.hasOwnProperty(i)){var l=f[i];l[j].apply(null,k)}else console.error("'"+i+"' not found!!!")}d.module._runBlocks&&angular.forEach(d.module._runBlocks,function(a){c.invoke(a)}),a.module(d.name,[],a.noop)}},d.getCachedProvider=function(b){return"__orig_angular"===b?a:f[b]},d.inject=function(){return c.invoke.apply(null,arguments)},d.getAlternateAngular=function(){var b={},c={};return a.extend(b,a),b.module=function(b,d){if("undefined"==typeof d)return c.hasOwnProperty(b)?void 0:a.module(b);var f=a.module.apply(null,arguments),g={name:b,module:f};return e.push(g),c[b]=f,f},b},function(e){return a=angular,e.config(["$controllerProvider","$compileProvider","$filterProvider","$animateProvider","$provide",function(a,b,c,d,g){f={$controllerProvider:a,$compileProvider:b,$filterProvider:c,$animateProvider:d,$provide:g},e.register={controller:a.register,directive:b.directive,filter:c.register,factory:g.factory,service:g.service,constant:g.constant,value:g.value,animation:d.register}}]),e.run(["$injector",function(a){c=a,f.$injector=c}]),b=e.name,e.ngAMD=d,d}});