<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<div ng-class="['app-bar', menuColorScheme]">
    <a class="app-bar-element">
        <ul class="app-bar-menu">
            <li>
                <a href="" class="dropdown-toggle">
                    <img class="ci-menu" src="<c:url value="/resources/img"/>/openops_ci_head_wht_org.png"
                         alt="Openscale(c)"/>
                    <img class="ci-menu" src="<c:url value="/resources/img"/>/openops_ci_txt_vdi_wht_org.png"
                         alt="OpenOpsVdi"/>
                </a>
                <ul class="d-menu" data-role="dropdown">
                    <li><a ng-href="#">
                        <spring:message code="label.whatis" text="WHAT_IS"/>
                    </a></li>
                    <li><a ng-href="#dd">
                        <spring:message code="label.desktop.delivery" text="DESKTOP_DELIVERY"/>
                    </a></li>
                    <li><a ng-href="#architecture">
                        <spring:message code="label.architecture" text="SYSTEM ARCHITECTURE"/>
                    </a></li>
                    <li class="divider"></li>
                    <li><a href="" class="dropdown-toggle"><spring:message code="s.others" text="OTHERS"/></a>
                        <ul class="d-menu" data-role="dropdown">
                            <li><a href="">Case Study</a></li>
                            <li><a href="">Open source</a></li>
                            <li><a href="">License &amp; Pricing</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <a href="" class="dropdown-toggle">
                    <span class="mif-file-text icon"></span>
                    <spring:message code="s.documentation" text="DOCUMENTATION"/>
                </a>
                <ul class="d-menu" data-role="dropdown">
                    <li><a href="">
                        <span class="mif-space-shuttle"></span>
                        <spring:message code="s.quickstart" text="QUICKSTART"/>
                    </a></li>
                    <li>
                        <a href="" class="dropdown-toggle">
                            <span class="mif-cabinet"></span>
                            <spring:message code="s.documentation.guide" text="DOCUMENTATION"/>
                        </a>
                        <ul class="d-menu" data-role="dropdown">
                            <li><a href="">
                                <span class="mif-user"></span>
                                <spring:message code="s.user.personal" text="PERSONAL_USER"/>
                            </a></li>
                            <li><a href="">
                                <span class="mif-users"></span>
                                <spring:message code="s.user.enterprise" text="ENTERPRISE_USER"/>
                            </a></li>
                            <li><a href="">
                                <span class="mif-user-check"></span>
                                <spring:message code="s.admin.enterprise" text="ENTERPRISE_ADMIN"/>
                            </a></li>
                        </ul>
                    </li>
                    <li><a href="">
                        <span class="mif-embed2"></span>
                        <spring:message code="s.developer" text="DEVELOPER"/>
                    </a></li>
                    <li><a href="#troubleshoot">
                        <span class="mif-user-check"></span>
                        <spring:message code="s.troubleshoot" text="TROUBLESHOOT"/>
                    </a></li>
                </ul>
            </li>
            <li><a ng-click="redirectManageVdis()">
                <span class="mif-display"></span>
                MyVDI
            </a></li>
            <li><a href="">
                <spring:message code="s.support" text="SUPPORT"/>
            </a></li>
            <li><a href="">
                <spring:message code="s.help" text="HELP"/>
            </a></li>
        </ul>

        <div id="quickAuthC1" class="app-bar-element place-right" ng-hide="authorized">
            <a id="quickAuthC2" class="dropdown-toggle fg-white"><span class="mif-enter"></span></a>
            <div id="quickAuthC3" class="app-bar-drop-container bg-white fg-dark place-right" data-role="dropdown" data-no-close="true">
                <div class="padding20">
                    <form name="form" novalidate>
                        <div class="input-control modern text iconic" data-role="input">
                            <input type="text" ng-model="user.email" name="username" username/>
                            <span class="informer">
							<spring:message code="label.username" text="INFORM_USERNAME"/>
						</span>
                            <span class="placeholder text-default">
							<spring:message code="placeholder.username" text="PLACEHOLDER_USERNAME"/>
						</span>
                            <span class="icon mif-user"></span>
                        </div>
                        <span class="text-default fg-red" ng-show="form.username.$pending.username">
						<spring:message code="msg.username.pending" text="CHECKING_USERNAME"/>
					</span>
                        <span class="text-default fg-red" ng-show="form.username.$error.username">
						<spring:message code="msg.username.error" text="WRONG USERNAME"/>
					</span>
                        <div class="input-control modern text iconic" data-role="input">
                            <input type="password"
                                   ng-model="user.pw"
                                   name="pw"
                                   ng-required="true"
                                   ng-minlength="6"
                                   ng-maxlength="64"
                            />
                            <span class="informer">
							<spring:message code="label.password" text="INFORM_PASSWORD"/>
						</span>
                            <span class="placeholder">
							<spring:message code="placeholder.password" text="PLACEHOLDER_PASSWORD"/>
						</span>
                            <span class="icon mif-lock"></span>
                            <button class="button helper-button reveal">
                                <span class="mif-looks"></span>
                            </button>
                        </div>
                        <span class="text-small text-italic fg-red" ng-show="form.pw.$invalid">
						<spring:message code="msg.password.invalid" text="PASSWORD(6~64) CHARS"/>
					</span>

                        <label class="input-control checkbox small-check">
                            <input type="checkbox" checked type="checkbox">
                            <span class="check"></span>
                            <span class="caption text-default">
						<spring:message code="label.rememberme" text="LABEL_REMEMBERME"/>
					</span>
                        </label>
                        <div class="form-actions">
                            <button class="image-button primary" ng-click="processSignin()">
                                <spring:message code="s.signin" text="SIGNIN"/>
                                <span class="icon mif-enter bg-darkCobalt"></span>
                            </button>
                            <p class="text-default"><spring:message code="msg.pleasesignup" text="MSG_PLEASESIGNUP"/></p>
                            <button class="image-button" ng-click="redirectSignup()">
                                <spring:message code="s.signup" text="SIGNUP"/>
                                <span class="icon mif-user-plus"></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- User information -->
        <div class="app-bar-element place-right" ng-show="authorized">
            <a class="dropdown-toggle fg-white">
                <span class="mif-user"></span>
                {{user.name}}  <!--<br/>{{user.email}}<br/>{{user.phone}}-->
            </a>
            <div class="app-bar-drop-container bg-lighterGray fg-dark place-right" data-role="dropdown" data-no-close="true">
                <div class="padding10" style="min-width:20rem; line-height:1rem;">
                    <p class="text-default"><span class="mif-mail"></span> {{user.email}}</p>
                    <p class="text-default"><span class="mif-phone"></span> {{user.phone}}</p>

                    <button class="image-button fg-white bg-darkCobalt" ng-click="redirectManageVdis()">
                        VDI관리
                        <span class="icon mif-display bg-darkCobalt"></span>
                    </button>
                    <button class="image-button fg-white bg-darkerGray" ng-click="processSignout()">
                        Logout
                        <span class="icon mif-exit bg-darkerGray"></span>
                    </button>

                </div>
            </div>
        </div>
        <div class="app-bar-element place-right">
            <a class="dropdown-toggle fg-white"><span class="mif-earth2"></span></a>
            <div class="app-bar-drop-container bg-white fg-dark place-right" data-role="dropdown" data-no-close="true">
                <div class="padding10 width10">
                    Display language
                    <div data-role="group">
                        <div ng-repeat="entry in supportedLocales">
                            <a class="text-default"
                               ng-click="changeLocale(
						   entry.locale,
						   entry.language,
						   '<c:url value="/resources/img/flag"/>/' + entry.locale + '.png'
					   )">
                                <img class="flag-small" ng-src="<c:url value="/resources/img/flag"/>/{{entry.locale}}.png"
                                     alt="{{entry.locale}}"/> {{entry.language}}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="app-bar-divider place-right"></div>
        <a class="app-bar-element place-right" href="http://www.openscale.co.kr">
            <img class="ci-menu2" src="<c:url value="/resources/img"/>/openscale_ci_1.png"
                 alt="OpenScale(c)"/>
        </a>
    </a>
</div>
