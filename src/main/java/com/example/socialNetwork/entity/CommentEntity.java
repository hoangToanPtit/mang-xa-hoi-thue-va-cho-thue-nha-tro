package com.example.socialNetwork.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "comment")
public class CommentEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String content;
	
	@Column
	private Date createdDate;
	
	@Column
	private Date modifiedDate;	
	
	
	@OneToMany(mappedBy = "parentsComment")
	private List<CommentEntity> commentsReply = new ArrayList<>();
	
	@ManyToOne()
	@JoinColumn(name= "parents_comment_id")
	private CommentEntity parentsComment;
	
	
	@ManyToOne()
	@JoinColumn(name= "user_id", nullable = false)
	private UserEntity user;
	
	
	@ManyToOne()
	@JoinColumn(name= "post_id", nullable = false)
	private PostEntity post;
	
	
	
	public Long getId() {
		return id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public List<CommentEntity> getCommentsReply() {
		return commentsReply;
	}

	public CommentEntity getParentsComment() {
		return parentsComment;
	}

	public UserEntity getUser() {
		return user;
	}

	public PostEntity getPost() {
		return post;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public void setCommentsReply(List<CommentEntity> commentsReply) {
		this.commentsReply = commentsReply;
	}

	public void setParentsComment(CommentEntity parentsComment) {
		this.parentsComment = parentsComment;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public void setPost(PostEntity post) {
		this.post = post;
	}

	@Override
	public String toString() {
		return "CommentEntity [id=" + id + ", content=" + content + ", createdDate=" + createdDate + ", modifiedDate="
				+ modifiedDate + ", commentsReply=" + commentsReply + ", parentsComment=" + parentsComment + ", user="
				+ user + ", post=" + post + "]";
	}
	
	
}
