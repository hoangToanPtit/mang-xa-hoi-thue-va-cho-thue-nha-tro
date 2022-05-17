package com.example.socialNetwork.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "image")
public class ImageEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String path;

	
	@ManyToOne
	@JoinColumn(name= "post_id", nullable = true)
	private PostEntity post;
	
	
	
	
	
	public String getPath() {
		return path;
	}





	public PostEntity getPost() {
		return post;
	}





	public void setPath(String path) {
		this.path = path;
	}





	public void setPost(PostEntity post) {
		this.post = post;
	}





	public Long getId() {
		return id;
	}
}
