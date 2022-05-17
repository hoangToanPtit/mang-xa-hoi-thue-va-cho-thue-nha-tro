package com.example.socialNetwork.service;

import com.example.socialNetwork.dto.RoleDTO;
import com.example.socialNetwork.entity.RoleEntity;

public interface IRoleService {
	RoleDTO save(RoleDTO roleDTO);
	RoleEntity getRoleEntity(RoleDTO roleDTO);
}


