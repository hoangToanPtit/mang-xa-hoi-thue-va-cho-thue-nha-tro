package com.example.socialNetwork.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.socialNetwork.converter.RoleConverter;
import com.example.socialNetwork.dto.RoleDTO;
import com.example.socialNetwork.entity.RoleEntity;
import com.example.socialNetwork.repository.RoleRepository;
import com.example.socialNetwork.service.IRoleService;

@Service
public class RoleService implements IRoleService{

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private RoleConverter roleConverter;

	@Override
	public RoleDTO save(RoleDTO roleDTO) {
		RoleEntity roleEntity = roleConverter.toEntity(roleDTO);
		roleEntity = roleRepository.save(roleEntity);
		return roleConverter.toDto(roleEntity);
	}

	@Override
	public RoleEntity getRoleEntity(RoleDTO roleDTO) {
		RoleEntity roleEntity = roleRepository.findByName(roleDTO.getName()).get();
		if(roleDTO.getId()!=null && roleDTO.getId()!= roleEntity.getId()) return null;
		return roleEntity;
	}
	
	
	
	
}
