package com.example.socialNetwork.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.socialNetwork.dto.ImageDTO;
import com.example.socialNetwork.dto.PostDTO;
import com.example.socialNetwork.entity.ImageEntity;
import com.example.socialNetwork.service.impl.PostService;

@Component
public class ImageConverter {
	
	@Autowired
	private PostService postService;
	
//	@Autowired
//	private PostConverter postConverter; 
	
	public ImageEntity toEntity(ImageDTO dto) {
		ImageEntity entity = new ImageEntity();
		entity.setPath(dto.getPath());
		if(dto.getPost()!=null) entity.setPost(postService.getEntity(dto.getPost().getId()));
//		entity.setPost(postConverter.toEntity(dto.getPost()));
		return entity;
	}
	
	public ImageDTO toDto(ImageEntity entity) {
		ImageDTO dto = new ImageDTO();
		dto.setId(entity.getId());
		dto.setPath(entity.getPath());
//		if(entity.getPost()!=null) dto.setPost(postConverter.toDto(entity.getPost()));
		return dto;
	}
	
	
	public ImageEntity toEntity(ImageEntity entity, ImageDTO dto) {
		String path = dto.getPath();
		PostDTO  postDto = dto.getPost();
		if(path!=null) entity.setPath(dto.getPath());
		if(postDto!=null) entity.setPost(postService.getEntity(dto.getPost().getId()));
		return entity;
	}
	
}
