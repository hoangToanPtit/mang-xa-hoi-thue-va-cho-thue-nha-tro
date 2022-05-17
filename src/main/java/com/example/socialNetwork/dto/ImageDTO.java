package com.example.socialNetwork.dto;

public class ImageDTO {
	private Long id;
	private String path;
	private PostDTO post;

	public ImageDTO() {
		// TODO Auto-generated constructor stub
	}
	
	
	
	public ImageDTO(Long id) {
		super();
		this.id = id;
	}



	public ImageDTO(String path) {
		super();
		this.path = path;
	}


	public ImageDTO(String path, PostDTO post) {
		super();
		this.path = path;
		this.post = post;
	}

	// getter and setter
	public Long getId() {
		return id;
	}

	public String getPath() {
		return path;
	}

	public PostDTO getPost() {
		return post;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public void setPost(PostDTO post) {
		this.post = post;
	}

}
