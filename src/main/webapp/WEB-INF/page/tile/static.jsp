<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<c:url var="imgPath" value="/resources/img"/>

<div class="image-container image-format-hd"
     style="width:100%; height:100%; min-height:12rem; padding:0rem; margin:0rem;">
	<div class="frame" style="min-height:18rem;">
		<div class="bgLandingImage"
	     style="background-image: url('<c:url value="/resources/img/gate_slide_01.jpg"/>');">
			<div style="margin-left:4rem; margin-right:4rem; padding-top:1rem;">
				<div align="center">
					<div class="image-container" align="center" style="height:2rem;">
						<img class="ci-menu" src="${imgPath}/openops_ci_head_wht_org.png"/>
					</div>
					<div class="image-container" align="center" style="height:2rem;">
						<img class="ci-menu" src="${imgPath}/openops_ci_txt_vdi_wht_org.png"/>
					</div>
				</div>
				<hr/>
				<div style="padding-top:2rem; padding-bottom:4rem;">
					<h5 style="margin:0px">
						<b>기업용 VDI</b>는 업무의 효율성과 접근성에도 불구하고
						고가의 구축/유지비용을 감당할수 있는 대기업을 제외하면 선뜻 도입하기 쉽지 않습니다.<br/><br/>
						오픈스케일(주)는 OpenOps Suite의 새로운 제품으로 OpenOps VDI를 개발하였습니다.<br/>
						<b>OpenOps VDI</b>는 다른 OpenOps제품군과 마찬가지로 오픈소스 기반의 솔루션/아키텍처로 구현된 VDI입니다.<br/>
						이는 제품의 라이센스 비용과 유지비를 최소화하여 IT인프라의 비용을 효율적으로 운용할 수 있도록 도와줍니다.<br/>
					</h5>
					<p>
						&nbsp;
						<a ng-href="#signupts">
							<button class="image-button warning block-shadow-warning text-shadow">
								<span class="icon mif-user-plus bg-orange"></span>
								<spring:message code="s.signup" text="SIGNUP"/>
							</button>
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
