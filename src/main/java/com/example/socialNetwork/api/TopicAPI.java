package com.example.socialNetwork.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialNetwork.dto.TopicDTO;
import com.example.socialNetwork.entity.ETopic;
import com.example.socialNetwork.service.ITopicService;

@RestController
public class TopicAPI {

	@Autowired
	private ITopicService topicService;
	
	@PostMapping(value = "/api/topics")
	public TopicDTO postMethodName(@RequestBody TopicDTO model) {
		return topicService.save(model);
	}
	
	@GetMapping(value = "/api/topics")
	public List<TopicDTO> getMethodName() {
		return topicService.findAll();
	}

	@GetMapping(value = "/api/topics/{topic}")
	public TopicDTO getMethodName(@PathVariable ETopic topic) {
		return topicService.findByName(topic);
		
	}
}
