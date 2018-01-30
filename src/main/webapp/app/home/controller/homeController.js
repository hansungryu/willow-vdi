define(['app'], function (app) {
    app.controller('homeController',[
        '$scope',
        '$rootScope',
        '$sce',
        '$q',
        '$timeout',
        '$compile',
        //'capitalizeFilter',
        'fac',
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
            fac,
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

            $scope.colorDepths = $scope.colorDepths;

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

            // Page로딩 초기화동작
            $scope.$on('$viewContentLoaded',function(){
                if($scope.DEBUG) console.debug("$viewContentLoaded["+$location.path()+"]");
                // 세션검사
                if($cookies.getObject('user')){// 저장된 인증사용자 개체가 있다면
                    $scope.user = $cookies.getObject('user');
                    // 서버상에 현재 인증상태가 유효한지 검사
                    if($scope.getSession()){// 유효하면 인증상태로 전환
                        $scope.authorized = true;
                        // 작업중인 VDI연결 개체를 복구
                        if($cookies.getObject('currentVdi')) $scope.vdi = $cookies.getObject("currentVdi");
                    }else{// Guest이거나 인증이 해제된 상태이면 모든 정보 제거
                        $scope.user = null;
                        $scope.authorized = false;
                        $scope.vdi = {};
                        $cookies.remove("user");
                        $cookies.remove("currentVdi");
                    }
                }
                $scope.changeMenuColorScheme();

                // Path에 따라서
                if($scope.DEBUG) console.debug("[Path]="+$location.path());
                if($scope.DEBUG) console.debug($location.path().split("/")[1]);
                if($scope.authorized){// 로그인된 상태에서 인증이 필요한 route Path에 접근했을 경우
                    switch ($location.path().split("/")[1]) {
                        case "manageVdis":// VDI목록관리
                            if (DEBUG) console.debug("Loading VDI catalog...");
                            $scope.getVdis();
                            break;
                        case "app":// VDI수행App
                            if (DEBUG) console.debug("Loading VDI App...");
                            if($cookies.getObject("currentVdi")) currentVdi = $cookies.getObject("currentVdi");
                            break;
                        default:
                    }
                }
            });


            $scope.changeMenuColorScheme = function(){
                if($scope.authorized) $scope.menuColorScheme = 'navy';
                else $scope.menuColorScheme ='darcula';
            };

            /**	표시 언어를 바꾼다.
             *	TODO: Angular의 기능을 사용치않고, Spring 기반으로 작성하였음.
             * 	이것을 Angular의 기능으로서 구현하는 것이 의미가 있을지는 글쎄...
             * @param newLocale	교체할 로케일명 (ko_KR. en_US...)
             * @param newLang   언어명 ("한국어","English"...)
             * @param iconPath	해당 국가의 국기아이콘 경로
             */
            $scope.changeLocale = function (newLocale, newLang, iconPath) {

                $cookies.put('wwwLocale', newLocale);
                // // Notyjs를 사용하여 알림창을 띄울 경우 아래 코드 참조
                // Prepare notification for notyjs
                // loadingMsgs.push({
                // 	type: 'info',
                // 	layout: 'topRight',
                // 	theme: 'metroui',
                // 	text: 'Locale changed to \'' + newLocale + '\'.',
                // 	timeout: 2000,
                // 	progressBar: true,
                // 	closeWith: ['click', 'button'],
                // 	animation: {
                // 		open: 'noty_effects_open',
                // 		close: 'noty_effects_close'
                // 	},
                // 	id: false,
                // 	force: false,
                // 	killer: false,
                // 	queue: 'global',
                // 	container: false,
                // 	buttons: [],
                // 	titleCount: {
                // 		conditions: []
                // 	},
                // 	modal: false
                // });
                // Prepare notification for MetroUiCss
                loadingMsgs.push({
                    'caption': newLang,
                    'content': 'Locale changed to \'' + newLocale + '\'.',
                    'icon'   : '<img class="flag-small" src="' + iconPath + '"/>',
                    'type'   : 'success',
                    'shadow' : true
                });
                $cookies.putObject('loadingMsgs', loadingMsgs);
                $window.location.reload();
            };


            /**	Tile기반으로 화면을 부분부분 조각내어 동적으로 ajax-load할때 사용.
             * 	AngularJS랑 어울리지 않는것 같아서 현재 사용하지는 않음.
             *	혹시 필요하면 분석해서 사용하3.
             *
             *  (사용법)
             *  만일 /tile/news 로 접근해서 html을 가져온다면
             *	preloadTiles = [ 'news', ... ]
             *	이렇게 preloadTiles에 정의하는 것만으로 자동으로 ajax로 가져온다.
             *	가져온 html의 내용은 $scope.htmlNews에 저장되며 아래와 같이 간단하게 html로 넣을수 있음
             *	<pre>
             *	<div> {{htmlNews}} </div>
             *	</pre>
             *
             * 	근데 Angular라면 ng-include를 동적으로 교체해 넣는 편이 더 좋을지도
             */
            // 모든 타일(스크린의 부분HTML조각)을 읽는다.
            // TODO: 하나의 영역이 조건에 따라 여러 타일들 가운데 하나를 선택할 경우를 대비해 $watch 처리
            angular.forEach($scope.preloadTiles, function (item) {
                fac.getTile(item).then(
                    function (response) {
                        //var rdt = $compile($(response.data))($scope);
                        $scope["html" + capitalizeFilter(item)] = $sce.trustAsHtml(response.data);
                        //$compile(response.data)($scope);
                    }, function (response) {
                        console.log("Error while loading tile [" + response.config.url + "]");
                    }
                );
            });

        }]);
});

