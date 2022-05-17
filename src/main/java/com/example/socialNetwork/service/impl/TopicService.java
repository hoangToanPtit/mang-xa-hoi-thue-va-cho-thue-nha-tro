package com.example.socialNetwork.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.socialNetwork.converter.TopicConverter;
import com.example.socialNetwork.dto.TopicDTO;
import com.example.socialNetwork.entity.ETopic;
import com.example.socialNetwork.entity.TopicEntity;
import com.example.socialNetwork.repository.TopicRepository;
import com.example.socialNetwork.service.ITopicService;

@Service
public class TopicService implements ITopicService{
	
	@Autowired
	private TopicRepository topicRepository;
	
	@Autowired
	private TopicConverter topicConverter;

	@Override
	public TopicDTO save(TopicDTO topicDTO) {
		TopicEntity topicEntity = topicConverter.toEntity(topicDTO);
		topicEntity = topicRepository.save(topicEntity);
		return topicConverter.toDto(topicEntity);
	}

	@Override
	public TopicEntity getTopicEntity(TopicDTO topicDTO) {
		TopicEntity topicEntity = topicRepository.findByName(topicDTO.getName()).get();
		if(topicDTO.getId()!=null && topicDTO.getId()!=topicEntity.getId()) return null;
		return topicEntity;
	}

	@Override
	public List<TopicDTO> findAll() {
		List<TopicDTO> results = new ArrayList<>();
		List<TopicEntity> entities = topicRepository.findAll();
		for (TopicEntity item: entities) {
			TopicDTO topicDTO = topicConverter.toDto(item);
			results.add(topicDTO);
		}
		return results;
	}

	@Override
	public List<TopicDTO> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TopicDTO findByName(ETopic name) {
		return topicConverter.toDto(topicRepository.findByName(name).get());
	}


	
}
