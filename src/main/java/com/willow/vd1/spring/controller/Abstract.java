package com.willow.vd1.spring.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


public class Abstract {
	protected Logger logger = LoggerFactory.getLogger(this.getClass());

	@RequestMapping(value="/**",method= RequestMethod.GET)
	public String getAnythingelse(){
		return "redirect:/404.html";
	}
}
