require.config({
    baseUrl: "app",

    // alias libraries paths.  Must set 'angular'
    paths: {
        'jquery' : '../webjars/jquery/3.1.1/jquery.min',
        'jquery-ui' : '../webjars/jquery-ui/1.12.1/jquery-ui.min',
        'select2' : '../webjars/select2/4.0.3/js/select2.min',
        'metro' : '../webjars/metro/3.0.17/build/js/metro.min',
        'guacamole' : '../resources/js/vendor/guacamole/guacamole.min',
        'angular': '../webjars/angularjs/1.6.2/angular',
        'angular-cookies': '../webjars/angularjs/1.6.2/angular-cookies',
        'angular-sanitize': '../webjars/angularjs/1.6.2/angular-sanitize',
        'angular-route': '../webjars/angularjs/1.6.2/angular-route',
        'angular-animate': '../webjars/angularjs/1.6.2/angular-animate',
        'angularAMD': '../webjars/angularAMD/0.2.1-1/angularAMD.min'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angular':{
            deps:['jquery','jquery-ui','select2','metro','guacamole'],
            exports:'angular'
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'select2': {
            deps: ['jquery']
        },
        'metro': {
            deps: ['jquery']
        },
        'guacamole': {
            deps: ['jquery']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angularAMD': {
            deps: ['angular']
        }
    },

    // kick start application
    deps: ['app']
});

