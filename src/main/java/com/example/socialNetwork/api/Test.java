package com.example.socialNetwork.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {
	@GetMapping(value = "/abc")
	public String getMethodName() {
		return "abcdeeesfeef";
	}

}
