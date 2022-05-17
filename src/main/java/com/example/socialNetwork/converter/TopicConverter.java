package com.example.socialNetwork.converter;

import org.springframework.stereotype.Component;

import com.example.socialNetwork.dto.TopicDTO;
import com.example.socialNetwork.entity.TopicEntity;

@Component
public class TopicConverter {

	public TopicEntity toEntity(TopicDTO dto) {
		TopicEntity entity = new TopicEntity();
		entity.setName(dto.getName());
		return entity;
	}
	
	public TopicDTO toDto(TopicEntity entity) {
		TopicDTO dto = new TopicDTO();
		dto.setId(entity.getId());
		dto.setName(entity.getName());
		return dto;
	}
	
	public TopicEntity toEntity(TopicDTO dto, TopicEntity entity) {
		if(dto.getName()!=null) entity.setName(dto.getName());
		return null;
	}
}
