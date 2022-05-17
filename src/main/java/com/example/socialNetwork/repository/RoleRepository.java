package com.example.socialNetwork.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.socialNetwork.entity.ERole;
import com.example.socialNetwork.entity.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity, Long>{
	Optional<RoleEntity> findByName(ERole name);
}
