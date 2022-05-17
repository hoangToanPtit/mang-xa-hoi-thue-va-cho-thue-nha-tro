package com.example.socialNetwork.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.example.socialNetwork.entity.CommentEntity;

public class CommentDTO {
	private Long id;
	private String content;
	private Date createdDate;
	private Date modifiedDate;
	
	private List<CommentDTO> commentsReply = new ArrayList<>();
	private CommentEntity parentsComment;
	
	private UserDTO user;
	private PostDTO post;
	
	
	public CommentDTO() {
		// TODO Auto-generated constructor stub
	}
	
	
//	getter and setter
	public Long getId() {
		return id;
	}
	public String getContent() {
		return content;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public Date getModifiedDate() {
		return modifiedDate;
	}
	public List<CommentDTO> getCommentsReply() {
		return commentsReply;
	}
	public CommentEntity getParentsComment() {
		return parentsComment;
	}
	public UserDTO getUser() {
		return user;
	}
	public PostDTO getPost() {
		return post;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	public void setCommentsReply(List<CommentDTO> commentsReply) {
		this.commentsReply = commentsReply;
	}
	public void setParentsComment(CommentEntity parentsComment) {
		this.parentsComment = parentsComment;
	}
	public void setUser(UserDTO user) {
		this.user = user;
	}
	public void setPost(PostDTO post) {
		this.post = post;
	}
	
	
	
	
}
