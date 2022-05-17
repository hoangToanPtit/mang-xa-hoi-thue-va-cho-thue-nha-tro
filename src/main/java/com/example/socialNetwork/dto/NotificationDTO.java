package com.example.socialNetwork.dto;

public class NotificationDTO {
	protected Long id;
	private String content;
	private int status;
    private UserDTO sender;
    private PostDTO post;
	private UserDTO receiver;
	
	private String createdDate;
	private String modifiedDate;
	
	
	
	public NotificationDTO() {
		super();
	}



	public String getCreatedDate() {
		return createdDate;
	}

	public String getModifiedDate() {
		return modifiedDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public void setModifiedDate(String modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public Long getId() {
		return id;
	}





	public String getContent() {
		return content;
	}





	public int getStatus() {
		return status;
	}





	public UserDTO getSender() {
		return sender;
	}





	public PostDTO getPost() {
		return post;
	}





	public UserDTO getReceiver() {
		return receiver;
	}





	public void setId(Long id) {
		this.id = id;
	}





	public void setContent(String content) {
		this.content = content;
	}





	public void setStatus(int status) {
		this.status = status;
	}





	public void setSender(UserDTO sender) {
		this.sender = sender;
	}





	public void setPost(PostDTO post) {
		this.post = post;
	}





	public void setReceiver(UserDTO receiver) {
		this.receiver = receiver;
	}
	
	
	
}
