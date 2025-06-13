package com.demo.ficticia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;

@Controller
public class HomeController {

    @GetMapping({ "/", "/home" })
    public String home(Authentication authentication, Model model) {
        String username = authentication.getName();
        model.addAttribute("username", username);
        return "home";
    }
}
