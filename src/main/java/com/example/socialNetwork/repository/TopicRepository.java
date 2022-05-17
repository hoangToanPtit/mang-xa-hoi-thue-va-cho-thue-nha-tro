package com.example.socialNetwork.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.socialNetwork.entity.ETopic;
import com.example.socialNetwork.entity.TopicEntity;

public interface TopicRepository extends JpaRepository<TopicEntity, Long>{
	Optional<TopicEntity> findByName(ETopic name);
}
