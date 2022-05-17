package com.example.socialNetwork.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.example.socialNetwork.dto.PostConditionDTO;
import com.example.socialNetwork.dto.PostDTO;
import com.example.socialNetwork.dto.ResultDTO;
import com.example.socialNetwork.entity.PostEntity;

public interface IPostService {
	PostDTO save(PostDTO postDTO);
	void delete(List<Long> ids);
	List<PostDTO> findAll(Pageable pageable);
	List<PostDTO> findAll();
	List<ResultDTO> findByCondition(PostConditionDTO postCondition);
	List<ResultDTO> quickSearchByCondition(PostConditionDTO postCondition);
	List<ResultDTO> quickSearchByConditionPage(Pageable pageable, PostConditionDTO postCondition);
	List<PostDTO> findSavedPosts(Long userId);
	int totalItem();
	PostDTO getById(Long id);
	PostEntity getEntity(Long id);
	int countLike(Long postId);
}
