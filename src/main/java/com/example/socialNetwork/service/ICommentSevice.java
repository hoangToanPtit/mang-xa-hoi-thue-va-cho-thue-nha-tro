package com.example.socialNetwork.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.example.socialNetwork.dto.CommentDTO;

public interface ICommentSevice {
	CommentDTO save(CommentDTO commentDTO);
	void delete(Long[] ids);
	List<CommentDTO> findAll(Pageable pageable);
	List<CommentDTO> findAll();
	int totalItem();
	CommentDTO getById(Long id);
	List<CommentDTO> findAllOfPost(Long postId);
	List<Long> getUserInCommentBox(Long postId);
}
