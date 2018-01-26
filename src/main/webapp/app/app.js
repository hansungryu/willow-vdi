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

    //var app = angular.module("vd1", ['ngRoute']);

    var app = angular.module('vd1',[
        'ng',
        'ngRoute',
        'ngSanitize',
        'ngCookies',
        'ngAnimate'
    ]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", angularAMD.route({
                title: 'Home',
                bodyClassName: 'bg-white',
                controller: 'homeController',
                controllerUrl: 'home/controller/homeController'
            }))
            .otherwise({redirectTo: "/"});
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
