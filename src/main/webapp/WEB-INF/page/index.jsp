<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<c:url var="contextPath" value="/"/>
<c:set var="wwwbase" value="${contextPath}"/>
<c:url var="pathResource" value="/resources"/>
<c:set var="pathCss" value="${pathResource}/css"/>
<c:set var="pathImage" value="${pathResource}/img"/>
<c:set var="pathJs" value="${pathResource}/js"/>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi"/>
    <meta name="mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="description" content="Openscale VD1 SPA">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
    <meta name="author" content="John Doe">

    <link rel="icon" type="image/png" href="${pathImage}/openops_ci_head_wht_org.png"/>
    <link rel="apple-touch-icon" type="image/png" href="${pathImage}/openops_ci_head_wht_org.png"/>
    <link rel="shortcut icon" href="${pathImage}/favicon.png">

    <link rel="stylesheet" href="webjars/select2/4.0.3/css/select2.min.css">
    <link rel="stylesheet" href="webjars/metro/3.0.17/build/css/metro.css">
    <link rel="stylesheet" href="webjars/metro/3.0.17/build/css/metro-colors.css">
    <link rel="stylesheet" href="webjars/metro/3.0.17/build/css/metro-schemes.css">
    <link rel="stylesheet" href="webjars/metro/3.0.17/build/css/metro-icons.css">
    <link rel="stylesheet" href="webjars/metro/3.0.17/build/css/metro-responsive.css">
    <link rel="stylesheet" href="webjars/metro/3.0.17/build/css/metro-rtl.css">
    <link rel="stylesheet" href="${pathCss}/noty.css">
    <link rel="stylesheet" href="${pathCss}/openopsvdi.css"/>
    <!-- Web application -->
    <%-- minify
        <link rel="stylesheet" type="text/css" href="openopsvdi.min.css">
        <script type="text/javascript" src="openopsvdi.min.js"></script>
     --%>

    <title ng-bind="title"></title>

</head>
<%--<body ng-controller="homeController" ng-class="bodyClassName">--%>
<body  ng-class="bodyClassName">
<div ng-include='"tile/mainmenu"'></div>
<div ng-view></div>
index4

<script data-main="${pathJs}/main.js" src="webjars/requirejs/2.3.5/require.min.js"></script>
<%--<!-- Utility libraries -->
<script type="text/javascript" src="webjars/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript" src="webjars/jquery-ui/1.12.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="webjars/select2/4.0.3/js/select2.min.js"></script>
<script type="text/javascript" src="webjars/metro/3.0.17/build/js/metro.min.js"></script>
<!-- AngularJS -->
<script type="text/javascript" src="webjars/angularjs/1.6.2/angular.js"></script>
<script type="text/javascript" src="webjars/angularjs/1.6.2/angular-cookies.js"></script>
<script type="text/javascript" src="webjars/angularjs/1.6.2/angular-sanitize.js"></script>
<script type="text/javascript" src="webjars/angularjs/1.6.2/angular-route.js"></script>
<script type="text/javascript" src="webjars/angularjs/1.6.2/angular-animate.js"></script>
<!-- Web application -->
&lt;%&ndash;<script type="text/javascript" src="openopsvdi.min.js"></script>&ndash;%&gt;
<script type="text/javascript" src="/app/app.js"></script>
<script type="text/javascript" src="/app/home/controller/homeController.js"></script>--%>
</body>
</html>