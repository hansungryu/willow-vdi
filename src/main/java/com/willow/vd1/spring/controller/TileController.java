package com.willow.vd1.spring.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Tile을 반환하는 Controller.
 * 사용자의 명시적인 URI호출로써 반환되는 일은 없으며, ajax call에 의해 HTML part를 반환.
 */
@Controller
@RequestMapping("/tile")
public class TileController extends Abstract{

    /**
     * Get main menu model and view.
     *
     * @return the model and view
     */
    @GetMapping("/mainmenu")
    public ModelAndView getMainMenu(){
        logger.info("APPBAR");
        return new ModelAndView("tile/mainmenu", "defaultMessage", "auth?");
    }

    /**
     * Get static model and view.
     *
     * @return the model and view
     */
    @GetMapping("/static")
    public ModelAndView getStatic(){
        logger.info("STATIC");
        return new ModelAndView("tile/static", "defaultMessage", "auth?");
    }
}
