package com.example.socialNetwork.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.socialNetwork.entity.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity, Long>{
	
	List<ImageEntity> findAllByPostId(Long post_id);
}
