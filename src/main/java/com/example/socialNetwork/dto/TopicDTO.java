package com.example.socialNetwork.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.socialNetwork.entity.ETopic;

public class TopicDTO {
	private Long id;
	private ETopic name;
	private List<PostDTO> posts = new ArrayList<>();
	
	public Long getId() {
		return id;
	}
	public ETopic getName() {
		return name;
	}
	public List<PostDTO> getPosts() {
		return posts;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setName(ETopic name) {
		this.name = name;
	}
	public void setPosts(List<PostDTO> posts) {
		this.posts = posts;
	}
	
	
}
