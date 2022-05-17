package com.example.socialNetwork.converter;

import java.text.SimpleDateFormat;

import org.springframework.stereotype.Component;

import com.example.socialNetwork.dto.UserDTO;
import com.example.socialNetwork.entity.UserEntity;
@Component
public class UserConverter {
	
	
	public UserEntity toEntity(UserDTO dto) {
		UserEntity entity = new UserEntity();
		entity.setUserName(dto.getUserName());
		entity.setEmail(dto.getEmail());
		entity.setPassword(dto.getPassword());
		entity.setFullName(dto.getFullName());
		entity.setNickName(dto.getNickName());
		entity.setDob(dto.fgetDob());
		entity.setPhone(dto.getPhone());
		entity.setFacebook(dto.getFacebook());
		entity.setInstagram(dto.getInstagram());
		return entity;
	}
	
	public UserDTO toDTO(UserEntity entity) {
		UserDTO dto = new UserDTO();
		dto.setUserName(entity.getUserName());
		dto.setId(entity.getId());
		dto.setEmail(entity.getEmail());
		dto.setPassword(entity.getPassword());
		dto.setFullName(entity.getFullName());
		dto.setNickName(entity.getNickName());
		SimpleDateFormat smf = new SimpleDateFormat("dd/MM/yyyy");
		dto.setDob(smf.format(entity.getDob()));
		dto.setPhone(entity.getPhone());
		dto.setFacebook(entity.getFacebook());
		dto.setInstagram(entity.getInstagram());
		return dto;
	}
	
	public UserEntity toEntity(UserDTO dto, UserEntity entity) {
		String userName = dto.getUserName();
		String email = dto.getEmail();
		String password = dto.getPassword();
		String fullname = dto.getFullName();
		String nickname = dto.getNickName();
		String dob = dto.getDob();
		String phone = dto.getPhone();
		String facebook = dto.getFacebook();
		String instagram = dto.getInstagram();
		
		
		if(facebook !=null) entity.setFacebook(facebook);
		if(instagram!=null) entity.setInstagram(instagram);
		if(userName!=null) entity.setEmail(userName);
		if(email!=null) entity.setEmail(email);
		if(password!=null) entity.setPassword(password);
		if(fullname!=null) entity.setFullName(fullname);
		if(nickname!=null) entity.setNickName(nickname);
		if(dob!=null) entity.setDob(dto.fgetDob());
		if(phone!=null) entity.setPhone(phone);

		
		return entity;
	}
}
