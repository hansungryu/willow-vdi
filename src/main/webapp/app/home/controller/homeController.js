define(['app'], function (app) {
    app.controller('homeController',[
        '$scope',
        '$rootScope',
        '$sce',
        '$q',
        '$timeout',
        '$compile',
        //'capitalizeFilter',
        //'fac',
        '$route',
        '$cookies',
        '$window',
        '$location',
        '$http',
        function(
            $scope,
            $rootScope,
            $sce,
            $q,
            $timeout,
            $compile,
            //capitalizeFilter,
            //fac,
            $route,
            $cookies,
            $window,
            $location,
            $http
        ) {
            $scope.appName = "OpenOpsVdi";
            $scope.menuColorScheme = 'darcula';
            // $scope.contextPath = ( typeof _contextPath != 'undefined' ) ? _contextPath : '/';


            $scope.notificationTitle = '';
            $scope.notificationBody = '';

            $scope.nextLocation = '';

            $scope.user = {};
            $scope.vdis = [];

            $scope.vdi = {};

            // 인증관련. Angular Local Storage를 쓸까하다 그냥 쿠키로?
            $scope.authorized = false;

            $scope.colorDepths = colorDepths;

            // // Application metadata 설정
            fac.setAppName($scope.appName);
            // $rootScope.title = $scope.appName;

            $scope.openDialog = fac.openDialog;
            $scope.closeDialog = fac.closeDialog;
            $scope.closeAllDialogs = fac.closeAllDialogs;


            // Cookie에 담겨진 초기메시지를 Notify창으로 띄운다.
            angular.forEach($cookies.getObject('loadingMsgs'), function (entry) {
                //new Noty(entry).show();
                $.Notify(entry);
            });
            $cookies.remove('loadingMsgs'); //초기메시지를 비움.

            var loadingMsgs = [];

        }]);
});
/*

app.controller('homeController',[
    '$scope',
    '$rootScope',
    '$sce',
    '$q',
    '$timeout',
    '$compile',
    //'capitalizeFilter',
    //'fac',
    '$route',
    '$cookies',
    '$window',
    '$location',
    '$http',
    function(
        $scope,
        $rootScope,
        $sce,
        $q,
        $timeout,
        $compile,
        //capitalizeFilter,
        //fac,
        $route,
        $cookies,
        $window,
        $location,
        $http
    ) {
        // $scope 관련초기화
        $scope.appName = "OpenOpsVdi";
        $scope.menuColorScheme = 'darcula';
        // $scope.contextPath = ( typeof _contextPath != 'undefined' ) ? _contextPath : '/';


        $scope.notificationTitle = '';
        $scope.notificationBody = '';

        $scope.nextLocation = '';

        $scope.user = {};
        $scope.vdis = [];

        $scope.vdi = {};

        // 인증관련. Angular Local Storage를 쓸까하다 그냥 쿠키로?
        $scope.authorized = false;

        $scope.colorDepths = colorDepths;

        // // Application metadata 설정
        //fac.setAppName($scope.appName);
        // $rootScope.title = $scope.appName;

        /!*$scope.openDialog = fac.openDialog;
        $scope.closeDialog = fac.closeDialog;
        $scope.closeAllDialogs = fac.closeAllDialogs;
*!/

        // Cookie에 담겨진 초기메시지를 Notify창으로 띄운다.
        /!*angular.forEach($cookies.getObject('loadingMsgs'), function (entry) {
            //new Noty(entry).show();
            $.Notify(entry);
        });*!/
        $cookies.remove('loadingMsgs'); //초기메시지를 비움.

        var loadingMsgs = [];

    }]);*/
