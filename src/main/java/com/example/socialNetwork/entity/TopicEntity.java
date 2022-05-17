package com.example.socialNetwork.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "topic")
public class TopicEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private ETopic name;

	
	// topic has N posts
	@OneToMany(mappedBy = "topic")
	private List<PostEntity> posts = new ArrayList<>();


	public Long getId() {
		return id;
	}


	public ETopic getName() {
		return name;
	}


	public List<PostEntity> getPosts() {
		return posts;
	}


	public void setName(ETopic name) {
		this.name = name;
	}


	public void setPosts(List<PostEntity> posts) {
		this.posts = posts;
	}
	
	
	
}
