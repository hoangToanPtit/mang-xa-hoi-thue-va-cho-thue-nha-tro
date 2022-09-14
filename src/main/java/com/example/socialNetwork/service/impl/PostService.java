package com.example.socialNetwork.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.socialNetwork.converter.PostConverter;
import com.example.socialNetwork.dto.PostConditionDTO;
import com.example.socialNetwork.dto.PostDTO;
import com.example.socialNetwork.dto.ResultDTO;
import com.example.socialNetwork.entity.PostEntity;
import com.example.socialNetwork.repository.PostRepository;
import com.example.socialNetwork.repository.UserRepository;
import com.example.socialNetwork.service.IPostService;



@Service
public class PostService implements IPostService{
	
	@Autowired
	private PostConverter postConverter;
	
	@Autowired
	private PostRepository postRepository;

	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private TopicService topicService;
	
	
	@Override
	public PostDTO save(PostDTO postDTO) {
		PostEntity postEntity = new PostEntity();
		if(postDTO.getId()==null) {
			postEntity = postConverter.toEntity(postDTO);
			postEntity.setAuthorUser(userRepository.findById(postDTO.getAuthorUser().getId()).get());
			postEntity.setTopic(topicService.getTopicEntity(postDTO.getTopic()));
		}else {
			PostEntity oldPostEntity = postRepository.findById(postDTO.getId()).get();
			postEntity = postConverter.toEntity(postDTO, oldPostEntity);
			
		}
		postEntity = postRepository.save(postEntity);
		PostDTO postDto = postConverter.toDto(postEntity);
	
		postDto.setLike(countLike(postDto.getId()));
		return postDto;
	}

	@Override
	public void delete(List<Long> ids) {
		for(long i: ids) {
			postRepository.deleteById(i);
		}
	}

	@Override
	public List<PostDTO> findAll(Pageable pageable) {
		List<PostDTO> results = new ArrayList<>();
		List<PostEntity> entities = postRepository.findAll(pageable).getContent();
		for (PostEntity item: entities) {
			PostDTO postDTO = postConverter.toDto(item);
			postDTO.getAuthorUser().setPassword(null);
			postDTO.setLike(countLike(postDTO.getId()));
			
			results.add(postDTO);
		}
		return results;
	}

	@Override
	public List<PostDTO> findAll() {
		List<PostDTO> results = new ArrayList<>();
		List<PostEntity> entities = postRepository.findAll();
		for (PostEntity item: entities) {
			PostDTO postDTO = postConverter.toDto(item);
			postDTO.getAuthorUser().setPassword(null);
			postDTO.setLike(countLike(postDTO.getId()));
			
			results.add(postDTO);
		}
		return results;
	}

	@Override
	public int totalItem() {
		return (int) postRepository.count();
	}

	@Override
	public PostEntity getEntity(Long id) {
		return postRepository.findById(id).get();
	}

	@Override
	public PostDTO getById(Long id) {
		PostDTO postDTO = postConverter.toDto(postRepository.findById(id).get());
		postDTO.setLike(countLike(postDTO.getId()));
		return postDTO;
	}

	@Override
	public List<ResultDTO> findByCondition(PostConditionDTO postCondition) {
		List<ResultDTO> results = new ArrayList<>();
		List<PostEntity> entities = postRepository.findAll();
		for (PostEntity item: entities) {
			PostDTO postDTO = postConverter.toDto(item);
			postDTO.setLike(countLike(postDTO.getId()));
			postDTO.getAuthorUser().setPassword(null);
			
			ResultDTO resultDto = new ResultDTO(postDTO, postCondition);
			if(resultDto.getScore()>10) {
				results.add(resultDto);
			}
			Collections.sort(results);
		}
		return results;
	}
	
	
	@Override
	public List<ResultDTO> quickSearchByCondition(PostConditionDTO postCondition) {
		List<ResultDTO> results = new ArrayList<>();
		List<PostEntity> entities = postRepository.findAll();
		for (PostEntity item: entities) {
			PostDTO postDTO = postConverter.toDto(item);
			postDTO.setLike(countLike(postDTO.getId()));
			postDTO.getAuthorUser().setPassword(null);
			
			ResultDTO resultDto = new ResultDTO(postDTO, postCondition);
			if(resultDto.getScore()==100) {
				results.add(resultDto);
			}
//			Collections.sort(results);
		}
		return results;
	}
	
	
	@Override
	public List<ResultDTO> quickSearchByConditionPage(Pageable pageable, PostConditionDTO postCondition) {
		List<ResultDTO> results = new ArrayList<>();
		List<PostEntity> entities = postRepository.findAll(pageable).getContent();
		for (PostEntity item: entities) {
			PostDTO postDTO = postConverter.toDto(item);
			postDTO.setLike(countLike(postDTO.getId()));
			postDTO.getAuthorUser().setPassword(null);
			
			ResultDTO resultDto = new ResultDTO(postDTO, postCondition);
			if(resultDto.getScore()==100) {
				results.add(resultDto);
			}
//			Collections.sort(results);
		}
		return results;
	}

	@Override
	public int countLike(Long postId) {
		return postRepository.countLike(postId);
	}

	@Override
	public List<PostDTO> findSavedPosts(Long userId) {
		List<PostDTO> results = new ArrayList<>();
		List<PostEntity> entities = postRepository.findAllSavedPost(userId);
		for (PostEntity item: entities) {
			PostDTO postDTO = postConverter.toDto(item);
			postDTO.getAuthorUser().setPassword(null);
			postDTO.setLike(countLike(postDTO.getId()));
			
			results.add(postDTO);
		}
		return results;
	}

//	@Override
//	public List<PostDTO> findAll(Long userId) {
//		List<PostDTO> results = new ArrayList<>();
//		List<PostEntity> entities = postRepository.findAllByUserId(userId);
//		for (PostEntity item: entities) {
//			PostDTO postDTO = postConverter.toDto(item);
//			postDTO.getAuthorUser().setPassword(null);
//			postDTO.getAuthorUser().setId(null);
//			results.add(postDTO);
//		}
//		return results;
//	}

}
