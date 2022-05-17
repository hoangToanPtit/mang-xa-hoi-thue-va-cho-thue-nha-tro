package com.example.socialNetwork.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.example.socialNetwork.dto.ImageDTO;
import com.example.socialNetwork.dto.UserDTO;

public interface IUserService {
	UserDTO save(UserDTO userDTO);
	void delete(Long[] ids);
	List<UserDTO> findAll(Pageable pageable);
	List<UserDTO> findAll();
	UserDTO findById(Long id);
	UserDTO checkLogin(UserDTO userDTO);
	UserDTO getInfoByToken(String token);
	ImageDTO getAvt(Long id);
	int totalItem();
	Boolean checkUserName(String userName); 
	void savePost(Long  postId, Long userId);
	void deleteSavedPost(Long  postId, Long userId);
	void likePost(Long  postId, Long userId);
	void unlikePost(Long  postId, Long userId);
}
