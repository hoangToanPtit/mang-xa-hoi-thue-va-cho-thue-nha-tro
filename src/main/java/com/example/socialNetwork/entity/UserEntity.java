package com.example.socialNetwork.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class UserEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique=true, nullable=false)
	private String userName;
	
	@Column(nullable=false)
	private String email;
	
	@Column(nullable=false)
	private String password;
	
	@Column(nullable=false)
	private String fullName;
	
	@Column
	private String nickName;
	
	@Column
	private Date dob;
	
	@Column
	private String phone;
	
	public void setId(Long id) {
		this.id = id;
	}


	@Column
	private String facebook;
	
	@Column
	private String instagram;
	
	
//	@OneToOne(cascade = CascadeType.ALL)
	// image avt
	@OneToOne()
	@JoinColumn(name = "avt", referencedColumnName = "id")
    private ImageEntity avt;
	
	//Role
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name ="user_role",
	joinColumns = @JoinColumn(name = "user_id"),
	inverseJoinColumns = @JoinColumn(name = "role_id"))
	private List<RoleEntity> roles = new ArrayList<>();
	
//	@ManyToMany(mappedBy = "users")
//	private List<RoleEntity> roles = new ArrayList<>();

	//Follow users
	@ManyToMany(mappedBy = "followedUser")
	private List<UserEntity> follower = new ArrayList<>();
	
	@ManyToMany()
	@JoinTable(name ="user_follower",
	joinColumns = @JoinColumn(name = "user_id"),
	inverseJoinColumns = @JoinColumn(name = "follower_id"))
	private List<UserEntity> followedUser = new ArrayList<>();
	
	//Like posts
	@ManyToMany(mappedBy = "userLikes")
	private List<PostEntity> likedPosts = new ArrayList<>();

	
	//Save posts
	@ManyToMany(mappedBy = "userSaves")
	private List<PostEntity> savedPost = new ArrayList<>(); 
	
	
	//Create posts
	@OneToMany(mappedBy = "authorUser")
	private List<PostEntity> posts = new ArrayList<>();



	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
	private List<CommentEntity> comments = new ArrayList<>();
	
	
//	notification
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "receiver")
	private List<NotificationEntity> notifications = new ArrayList<>();
	
	
	
	
	
	
	
	
	public List<NotificationEntity> getNotifications() {
		return notifications;
	}


	public void setNotifications(List<NotificationEntity> notifications) {
		this.notifications = notifications;
	}


	public UserEntity() {
		super();
	}


	public UserEntity(Long id) {
		super();
		this.id = id;
	}


	public String getNickName() {
		return nickName;
	}


	public List<CommentEntity> getComments() {
		return comments;
	}


	public void setNickName(String nickName) {
		this.nickName = nickName;
	}


	public void setComments(List<CommentEntity> comments) {
		this.comments = comments;
	}


	public Long getId() {
		return id;
	}


	public String getUserName() {
		return userName;
	}


	public String getEmail() {
		return email;
	}


	public String getPassword() {
		return password;
	}


	public String getFullName() {
		return fullName;
	}


	public Date getDob() {
		return dob;
	}


	public String getPhone() {
		return phone;
	}




	public List<RoleEntity> getRoles() {
		return roles;
	}


	public List<UserEntity> getFollower() {
		return follower;
	}


	public List<UserEntity> getFollowedUser() {
		return followedUser;
	}


	public List<PostEntity> getLikedPosts() {
		return likedPosts;
	}


	public List<PostEntity> getSavedPost() {
		return savedPost;
	}


	public List<PostEntity> getPosts() {
		return posts;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public void setFullName(String fullName) {
		this.fullName = fullName;
	}


	public void setDob(Date dob) {
		this.dob = dob;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}



	public String getFacebook() {
		return facebook;
	}


	public String getInstagram() {
		return instagram;
	}


	public ImageEntity getAvt() {
		return avt;
	}


	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}


	public void setInstagram(String intagram) {
		this.instagram = intagram;
	}


	public void setAvt(ImageEntity avt) {
		this.avt = avt;
	}


	public void setRoles(List<RoleEntity> roles) {
		this.roles = roles;
	}


	public void setFollower(List<UserEntity> follower) {
		this.follower = follower;
	}


	public void setFollowedUser(List<UserEntity> followedUser) {
		this.followedUser = followedUser;
	}


	public void setLikedPosts(List<PostEntity> likedPosts) {
		this.likedPosts = likedPosts;
	}


	public void setSavedPost(List<PostEntity> savedPost) {
		this.savedPost = savedPost;
	}


	public void setPosts(List<PostEntity> posts) {
		this.posts = posts;
	}


	@Override
	public String toString() {
		return "UserEntity [id=" + id + ", userName=" + userName + ", email=" + email + ", password=" + password
				+ ", fullName=" + fullName + "]";
	}


	
	


}
