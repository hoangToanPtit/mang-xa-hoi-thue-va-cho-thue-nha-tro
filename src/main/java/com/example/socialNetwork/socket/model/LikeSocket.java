package com.example.socialNetwork.socket.model;

public class LikeSocket {
	private Long postId;
	private Long userId;
	private int status;
	
	
	public LikeSocket() {
		super();
	}
	

	
	public LikeSocket(Long postId, Long userId, int status) {
		super();
		this.postId = postId;
		this.userId = userId;
		this.status = status;
	}



	public int getStatus() {
		return status;
	}



	public void setStatus(int status) {
		this.status = status;
	}



	public Long getPostId() {
		return postId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setPostId(Long postId) {
		this.postId = postId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	
}
