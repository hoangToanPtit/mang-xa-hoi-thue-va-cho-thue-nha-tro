package com.example.socialNetwork.converter;

import org.springframework.stereotype.Component;

import com.example.socialNetwork.dto.RoleDTO;
import com.example.socialNetwork.entity.RoleEntity;

@Component
public class RoleConverter {
	public RoleEntity toEntity(RoleDTO dto) {
		RoleEntity entity = new RoleEntity();
		entity.setName(dto.getName());
		return entity;
	}
	
	public RoleDTO toDto(RoleEntity entity) {
		RoleDTO dto = new RoleDTO();
		dto.setId(entity.getId());
		dto.setName(entity.getName());
		return dto;
	}
	
	
	public RoleEntity toEntity(RoleDTO dto, RoleEntity entity) {
		if(dto.getName()!=null) entity.setName(dto.getName());
		return entity;
	}
	
}
