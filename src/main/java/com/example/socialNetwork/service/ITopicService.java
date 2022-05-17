package com.example.socialNetwork.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.example.socialNetwork.dto.TopicDTO;
import com.example.socialNetwork.entity.ETopic;
import com.example.socialNetwork.entity.TopicEntity;

public interface ITopicService {
	TopicDTO save(TopicDTO topicDTO);
	List<TopicDTO> findAll();
	List<TopicDTO> findAll(Pageable pageable);
	TopicDTO findByName(ETopic name);
	TopicEntity getTopicEntity(TopicDTO topicDTO);
}
