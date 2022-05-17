package com.example.socialNetwork.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.socialNetwork.dto.CommentDTO;
import com.example.socialNetwork.entity.CommentEntity;
import com.example.socialNetwork.service.IUserService;


@Component
public class CommentConverter {
	
	@Autowired
	private IUserService userService;

	@Autowired
	private UserConverter userConverter;

	
	
	public CommentEntity toEntity(CommentDTO dto) {
		CommentEntity entity = new CommentEntity();
		entity.setContent(dto.getContent());
		entity.setUser(userConverter.toEntity(userService.findById(dto.getUser().getId())));
//		entity.setCreatedDate(null);
		return entity;
	}
	
	public CommentDTO toDto(CommentEntity entity) {
		CommentDTO dto = new CommentDTO();
		dto.setId(entity.getId());
		dto.setContent(entity.getContent());
		dto.setUser(userConverter.toDTO(entity.getUser()));
		return dto;
	}
	
	
//	public ImageEntity toEntity(ImageEntity entity, ImageDTO dto) {
//		String path = dto.getPath();
//		return entity;
//	}
}
