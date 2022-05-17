package com.example.socialNetwork.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.socialNetwork.converter.CommentConverter;
import com.example.socialNetwork.dto.CommentDTO;
import com.example.socialNetwork.dto.ImageDTO;
import com.example.socialNetwork.dto.PostDTO;
import com.example.socialNetwork.entity.CommentEntity;
import com.example.socialNetwork.repository.CommentRepository;
import com.example.socialNetwork.service.ICommentSevice;
import com.example.socialNetwork.service.IPostService;


@Service
public class CommentService implements ICommentSevice{

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private CommentConverter commentConverter;
	
	@Autowired
	private IPostService postService;
	
	@Override
	public CommentDTO save(CommentDTO commentDTO) {
		CommentEntity commentEntity = new CommentEntity();
		if(commentDTO.getId() ==null) {
			commentEntity = commentConverter.toEntity(commentDTO);
			commentEntity.setPost(postService.getEntity(commentDTO.getPost().getId()));
			commentEntity.getUser().setId(commentDTO.getUser().getId());
		}
		commentEntity = commentRepository.save(commentEntity);
		
		CommentDTO res = commentConverter.toDto(commentEntity);
		res.setPost(new PostDTO(commentEntity.getPost().getId()));
		return res;
	}

	@Override
	public void delete(Long[] ids) {
		for(long i: ids) {
			commentRepository.deleteById(i);
		}
	}

	@Override
	public List<CommentDTO> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CommentDTO> findAll() {
		List<CommentDTO> results = new ArrayList<>();
		List<CommentEntity> entities = commentRepository.findAll();
		for (CommentEntity entity : entities) {
			CommentDTO commentDto = commentConverter.toDto(entity);
			commentDto.getUser().setAvt(new ImageDTO(entity.getUser().getAvt().getId()));
			results.add(commentDto);
		}
		return results;
	}

	@Override
	public int totalItem() {
		return (int) commentRepository.count();
	}

	@Override
	public CommentDTO getById(Long id) {
		CommentEntity entity = commentRepository.findById(id).get();
		
		return commentConverter.toDto(entity);
	}

	@Override
	public List<CommentDTO> findAllOfPost(Long postId) {
		List<CommentEntity> entities = commentRepository.findAllByPostId(postId);
		List<CommentDTO> dtos = new ArrayList<CommentDTO>();
		for (CommentEntity com : entities) {
			CommentDTO commentDto = commentConverter.toDto(com);
			commentDto.getUser().setAvt(new ImageDTO(com.getUser().getAvt().getId()));
			dtos.add(commentDto);
		}
		return dtos;
	}

	@Override
	public List<Long> getUserInCommentBox(Long postId) {
		return commentRepository.getUserCommentInPost(postId);
	}

}
