package com.docker.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class Controller {
	
	@RequestMapping("/welcome")
	public static String welcome() {
		
		return "Welcome to docker container";
	}
}
