package com.example.socialNetwork.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialNetwork.dto.RoleDTO;
import com.example.socialNetwork.service.IRoleService;

@RestController
public class RoleAPI {
	
	@Autowired
	private IRoleService roleService;
	
	@PostMapping(value = "/roles")
	public RoleDTO postMethodName(@RequestBody RoleDTO role) {
		return roleService.save(role);
	}


	
}
