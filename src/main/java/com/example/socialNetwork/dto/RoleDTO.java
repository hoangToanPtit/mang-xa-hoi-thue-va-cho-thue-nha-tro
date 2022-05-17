package com.example.socialNetwork.dto;

import com.example.socialNetwork.entity.ERole;

public class RoleDTO {
	private Long id;
	private ERole name;
	
	public RoleDTO() {
		// TODO Auto-generated constructor stub
	}

	
	
	public RoleDTO(ERole name) {
		super();
		this.name = name;
	}



	public Long getId() {
		return id;
	}

	public ERole getName() {
		return name;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(ERole name) {
		this.name = name;
	}
	
	
}
