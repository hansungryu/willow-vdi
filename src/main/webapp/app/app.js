define(['angularAMD', 'angular-route','angular-sanitize','angular-cookies','angular-animate'], function (angularAMD) {

    var regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var regexpPhone = /^[0-9]{10,12}$/;
    var regexpPw = /^.{6,64}$/;
    //var regexpPlainName= /^[A-Za-z0-9]{1,255}$/;
    var regexpIpAddr= /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;

    var colorDepths = [
        {'id': '16', 'label': '16bit (Fastest)'},
        {'id': '24', 'label': '24bit'},
        {'id': '32', 'label': '32bit (Best Quality)'}
    ];

    var definedRoutes = [];

    var currentVdi = null;
    var DEBUG = true;
    var supportedLocales = [
        {locale: 'en_US', language: 'English(US)'},
//	{locale: 'zh_CN', language: '中文(中国)'},
//	{locale: 'ja_JP', language: '日本語'},
//	{locale: 'de_DE', language: 'Deutsch'},
//	{locale: 'es_ES', language: 'español(ES)'},
//	{locale: 'ru_RU', language: 'Русский'},
        {locale: 'ko_KR', language: '한국어'}
    ];

    //var app = angular.module("vd1", ['ngRoute']);

    var app = angular.module('vd1',[
        'ng',
        'ngRoute',
        'ngSanitize',
        'ngCookies',
        'ngAnimate'
    ]);

    app.config(function ($routeProvider,$locationProvider) {

        $locationProvider
            .html5Mode({
                enables: true,
                requireBase: false,
                rewriteLinks: false
            }).hashPrefix('')
        ;

        $routeProvider
            .when("/", angularAMD.route({
                title: 'Home',
                bodyClassName: 'bg-white',
                controller: 'homeController',
                controllerUrl: 'home/controller/homeController',
                templateUrl: 'tile/static',
            }))
            .otherwise({redirectTo: "/"});
    });

    app.service('svc',[
    '$q',
    function($q){
        // 뭐하는짓이냐
        // return{
        // 	isAuthenticated: function(){
        // 		return false;
        // 	},
        // 	getAuthStat: function(){
        //
        // 	}
        // }
    }
    ]);

    app.factory('fac',[
    '$http',
    '$q',
    function($http,$q){
        var appName = '';
        return {
            getAppName: function(){ return appName; },
            setAppName: function(newName){ appName = newName; },
            getTile: function(item){
                return $http({
                    method: 'GET',
                    url: 'tile/' + item,
                    timeout: 2000,
                    async: true,
                    cache: false,
                    headers: { 'Accept': 'application/html' , 'Pragma': 'no-cache'}
                });
            },
            // 여러개의 Tile URL을 Transaction 조건으로 모두 받거나 혹은 모두 실패처리
            // 반환값이 response[] 형태에 주의
            getTiles: function(target){
                var deferred = $q.defer();
                var items = [].concat(target);
                var tasks = [];

                angular.forEach(items, function(item) {
                    tasks.push(
                        $http({
                            method: 'GET',
                            url: 'tile/' + item,
                            async: true,
                            cache: false,
                            headers: {'Accept': 'application/html', 'Pragma': 'no-cache'}
                        })
                    );
                });

                $q.all(tasks).then(
                    function(results){ deferred.resolve(results); },
                    function(errors){ deferred.reject(errors); },
                    function(updates){ deferred.update(updates); }
                );
                return deferred.promise;
            },
            // Web Service를 JSON형태로 가져올때
            // TODO: Validating처리
            getJson: function(item){
                return $http({
                    method: 'GET',
                    url: 'rest/' + item,
                    async: true,
                    cache: false,
                    headers: { 'Accept': 'application/json' , 'Pragma': 'no-cache'}
                });
            },
            closeDialog: function(dialogId){if($('#'+dialogId).length) metroDialog.close('#'+dialogId);},
            closeAllDialogs: function(){$("[id^=dialog]").each(function(){metroDialog.close('#'+$(this).attr('id'));});},
            openDialog: function(dialogId){
                this.closeAllDialogs();
                if($('#'+dialogId).length) metroDialog.open('#'+dialogId);
            },
            debugAjaxResponse: function(res){
                if(DEBUG) console.debug(
                    'data:' + res.data
                    + '\nstatus: ' + res.status
                    // +'\nheaders: '+res.headers
                    + '\nconfig: ' + JSON.stringify(res.config)
                    + '\nstatusText: ' + res.statusText
                    + '\nxhrStatus: ' + res.xhrStatus
                );
            }
        };
    }]);

    app.run([
        'fac',
        '$rootScope',
        '$location',
        '$route',
        function(fac,$rootScope,$location,$route){
        //function($rootScope,$location,$route){
            if(DEBUG) console.debug("Initializing...");

            // Initializing $rootScope variables
            $rootScope.authorized = false;

            // 모든 Angular Route의 목록을 정리
            if(!definedRoutes.length){
                angular.forEach($route.routes,function(config,route){
                    // console.log("config = %o",config);
                    // console.log("route = %o",route);
                    definedRoutes.push(route);
                });
                definedRoutes = $.unique(definedRoutes);
            }

            // Routing시 걸러낼 동작들
            // 1. 정의되지 않은 Routing경로 : 동작무효
            // 2. 인증이 필요한 페이지로의 강제 Routing발생 : index page로 강제전환
            //     근데 이거 디버그할때 무지 불편하네 쩝..
            $rootScope.$on('$routeChangeStart',function(event,next,current){
                var nextPath = next.$$route.originalPath;
                if(DEBUG && next.data) console.debug("Location [" + nextPath + "] authRequired = " + next.data.authRequired + ", authorized = " + $rootScope.authorized);
                if(definedRoutes.indexOf(nextPath) == -1 ){
                    if(DEBUG) console.debug("NOT defined path");
                    event.preventDefault();
                }
                if(next.data && next.data.authRequired && !$rootScope.authorized){
                    $location.path("/index");
                }
            });

            // Modifying Title
            $rootScope.$on('$routeChangeSuccess', function(event,current,previous) {
                //$rootScope.title = fac.getAppName() + ": " + current.$$route.title;
                $rootScope.title = current.$$route.title;
                $rootScope.bodyClassName = current.$$route.bodyClassName || '';
            });


        }
    ]);

    return angularAMD.bootstrap(app);
});


/*



var app = angular.module('vd1',[
    'ng',
    'ngSanitize',
    'ngRoute',
    'ngCookies',
    'ngAnimate'
]);

// Wrap all Angular components in an IIFE
(function(){
    app.config(function($routeProvider,$locationProvider) {
        $locationProvider
            .html5Mode({
                enables: true,
                requireBase: false,
                rewriteLinks: false
            }).hashPrefix('')
        ;
        $routeProvider
            .when('/', {
                title: 'Home',
                bodyClassName: 'bg-white',
                //templateUrl   : 'app/home/templates/home.html',
                controller: 'homeController'
                //resolve       : { routeToUserHomePage: routeToUserHomePage }

            }).otherwise({
            redirectTo: '/'
        })
        ;
    });

    app.run([
        //'fac',
        '$rootScope',
        '$location',
        '$route',
        //function(fac,$rootScope,$location,$route){
        function($rootScope,$location,$route){
            if(DEBUG) console.debug("Initializing...");

            // Initializing $rootScope variables
            $rootScope.authorized = false;

            // 모든 Angular Route의 목록을 정리
            if(!definedRoutes.length){
                angular.forEach($route.routes,function(config,route){
                    // console.log("config = %o",config);
                    // console.log("route = %o",route);
                    definedRoutes.push(route);
                });
                definedRoutes = $.unique(definedRoutes);
            }

            // Routing시 걸러낼 동작들
            // 1. 정의되지 않은 Routing경로 : 동작무효
            // 2. 인증이 필요한 페이지로의 강제 Routing발생 : index page로 강제전환
            //     근데 이거 디버그할때 무지 불편하네 쩝..
            $rootScope.$on('$routeChangeStart',function(event,next,current){
                var nextPath = next.$$route.originalPath;
                if(DEBUG && next.data) console.debug("Location [" + nextPath + "] authRequired = " + next.data.authRequired + ", authorized = " + $rootScope.authorized);
                if(definedRoutes.indexOf(nextPath) == -1 ){
                    if(DEBUG) console.debug("NOT defined path");
                    event.preventDefault();
                }
                if(next.data && next.data.authRequired && !$rootScope.authorized){
                    $location.path("/index");
                }
            });

            // Modifying Title
            $rootScope.$on('$routeChangeSuccess', function(event,current,previous) {
                //$rootScope.title = fac.getAppName() + ": " + current.$$route.title;
                $rootScope.title = current.$$route.title;
                $rootScope.bodyClassName = current.$$route.bodyClassName || '';
            });


        }
    ]);

})();*/
