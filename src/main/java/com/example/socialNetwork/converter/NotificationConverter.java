package com.example.socialNetwork.converter;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.socialNetwork.dto.NotificationDTO;
import com.example.socialNetwork.entity.NotificationEntity;
import com.example.socialNetwork.entity.UserEntity;
import com.example.socialNetwork.service.IPostService;
import com.example.socialNetwork.service.IUserService;


@Component
public class NotificationConverter {
	
	@Autowired
	private IPostService postService;
	
	@Autowired
	private IUserService userService;
	
	public NotificationEntity toEntity(NotificationDTO dto) {
		NotificationEntity entity = new NotificationEntity();
		entity.setContent(dto.getContent());
		entity.setStatus(dto.getStatus());
		entity.setPost(postService.getEntity(dto.getPost().getId()));
		entity.setReceiver(new UserEntity(dto.getReceiver().getId()));
		entity.setSender(new UserEntity(dto.getSender().getId()));
		return entity;
	}
	
	public NotificationDTO toDto(NotificationEntity entity) {
		NotificationDTO dto = new NotificationDTO();
		dto.setId(entity.getId());
		dto.setContent(entity.getContent());
		dto.setStatus(entity.getStatus());
		dto.setSender(userService.findById(entity.getSender().getId()));
		dto.setReceiver(userService.findById(entity.getReceiver().getId()));
		dto.setPost(postService.getById(entity.getPost().getId()));
		dto.getSender().setAvt(userService.getAvt(dto.getSender().getId()));
		
		SimpleDateFormat smp = new SimpleDateFormat("dd/MM/yyyy");
		if(entity.getCreatedDate()!=null)
			dto.setCreatedDate(smp.format(entity.getCreatedDate()));
		if(entity.getModifiedDate()!=null)
			dto.setModifiedDate(smp.format(entity.getModifiedDate()));

		return dto;
	}
	
	public NotificationEntity toEntity(NotificationDTO dto, NotificationEntity entity) {
		if(dto.getContent()!=null) {
			entity.setContent(dto.getContent());
		}
		if(dto.getStatus()!= entity.getStatus()) {
			entity.setStatus(dto.getStatus());
		}
		return entity;
	}
}
