package com.example.socialNetwork.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.example.socialNetwork.dto.ImageDTO;
import com.example.socialNetwork.entity.ImageEntity;

public interface IImageService {
	ImageDTO save(ImageDTO imageDTO);
	void delete(List<Long> ids);
	List<ImageDTO> findAll(Pageable pageable);
	List<ImageDTO> findAll();
	List<ImageDTO> findAllInPost(Long postId);
	ImageDTO findById(Long id);
	ImageEntity getById(Long id);
	int totalItem();
}
