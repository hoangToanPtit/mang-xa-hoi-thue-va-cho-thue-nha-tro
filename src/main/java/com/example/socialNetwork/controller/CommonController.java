package com.example.socialNetwork.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonController {

	@GetMapping("/")
    public String homepage() {
        return "index";
    }
	
//	@GetMapping("/home")
//    public String homepage2() {
//        return "index";
//    }
	
	@GetMapping("/login")
    public String login() {
        return "login";
    }
	
	@GetMapping("/signup")
    public String signup() {
        return "signup";
    }
	
	@GetMapping("/home")
    public String home() {
        return "home";
    }
	
	@GetMapping("/profile")
    public String profile() {
        return "profile";
    }
}
