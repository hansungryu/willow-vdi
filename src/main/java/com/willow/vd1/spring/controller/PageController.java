package com.willow.vd1.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PageController {

    @GetMapping("/")
    public ModelAndView root(){ return index(); }

    @GetMapping("/index")
    public ModelAndView index(){
        System.out.println("aaaaaaaaa");
        //return "index";
        return new ModelAndView("index", "message", "");
    }

    @RequestMapping(value="/aa")      // localhost
    public ModelAndView aa() {
        return new ModelAndView("aa");          // 실제 호출될 /WEB-INF/jsp/viewtest.jsp
    }

}
