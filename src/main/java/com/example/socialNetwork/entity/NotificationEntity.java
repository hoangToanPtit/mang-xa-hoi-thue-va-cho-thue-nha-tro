package com.example.socialNetwork.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "notification")
public class NotificationEntity extends AuditEntity{
//	@Id{

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	protected Long id;
	
	@Column
	private String content;
	
	@Column
	private int status;
	
	@OneToOne()
	@JoinColumn(name = "sender", referencedColumnName = "id")
    private UserEntity sender;
	
	
	@OneToOne()
	@JoinColumn(name = "post", referencedColumnName = "id")
    private PostEntity post;
	
//	@ManyToOne
//	@JoinColumn(name = "post", referencedColumnName = "id")
//    private PostEntity post;
	
	@ManyToOne
	@JoinColumn(name= "receiver")
	private UserEntity receiver;


	public Long getId() {
		return id;
	}


	public String getContent() {
		return content;
	}


	public int getStatus() {
		return status;
	}


	public UserEntity getSender() {
		return sender;
	}


	public PostEntity getPost() {
		return post;
	}


	public UserEntity getReceiver() {
		return receiver;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public void setStatus(int status) {
		this.status = status;
	}


	public void setSender(UserEntity sender) {
		this.sender = sender;
	}


	public void setPost(PostEntity post) {
		this.post = post;
	}


	public void setReceiver(UserEntity receiver) {
		this.receiver = receiver;
	}


	@Override
	public String toString() {
		return "NotificationEntity [id=" + id + ", content=" + content + ", status=" + status + ", sender=" + sender
				+ ", post=" + post + ", receiver=" + receiver + "]";
	}
	
	
}
