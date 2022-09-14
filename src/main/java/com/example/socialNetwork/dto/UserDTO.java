package com.example.socialNetwork.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class UserDTO {



	private Long id;
	private String email;
	private String userName;
	private String password;
	private String fullName;
	private String nickName;
	private String dob;
	private String phone;
	private String facebook;
	private String instagram;
	private ImageDTO avt;
	
	private List<RoleDTO> roles = new ArrayList<>();

	private List<UserDTO> follower = new ArrayList<>();
	private List<UserDTO> followedUser = new ArrayList<>();

	private List<PostDTO> likedPosts = new ArrayList<>();
	private List<PostDTO> savedPost = new ArrayList<>();
	private List<PostDTO> posts = new ArrayList<>();

	public UserDTO() {
	}

	public UserDTO(String email, String userName, String password, String fullName, String dob, String phone, List<RoleDTO> roles) {
		super();
		this.email = email;
		this.userName = userName;
		this.password = password;
		this.fullName = fullName;
		this.dob = dob;
		this.phone = phone;
		this.roles = roles;
	}

	public UserDTO(Long id) {
		this.id = id;
	}

	
	@Override
	public String toString() {
		return "UserDTO [id=" + id + ", email=" + email + ", userName=" + userName + ", password=" + password
				+ ", fullName=" + fullName + ", dob=" + dob + ", phone=" + phone + ", facebook=" + facebook
				+ ", instagram=" + instagram + ", avt=" + avt + ", roles=" + roles + ", follower=" + follower
				+ ", followedUser=" + followedUser + ", likedPosts=" + likedPosts + ", savedPost=" + savedPost
				+ ", posts=" + posts + "]";
	}
	
	
	
	public UserDTO(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}

	// getter and setter
	public Long getId() {
		return id;
	}

	public String getUserName() {
		return userName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getFullName() {
		return fullName;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public Date fgetDob() {
		SimpleDateFormat smf = new SimpleDateFormat("dd/MM/yyy");
		try {
			return smf.parse(dob);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	public String getDob() {
		return dob;
	}


	public List<UserDTO> getFollower() {
		return follower;
	}

	public List<UserDTO> getFollowedUser() {
		return followedUser;
	}

	public List<PostDTO> getLikedPosts() {
		return likedPosts;
	}

	public List<PostDTO> getSavedPost() {
		return savedPost;
	}

	public List<PostDTO> getPosts() {
		return posts;
	}

	public void setId(Long id) {
		this.id = id;
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

	public void setDob(String dob) {
		this.dob = dob;
	}



	public String getFacebook() {
		return facebook;
	}

	public String getInstagram() {
		return instagram;
	}

	public ImageDTO getAvt() {
		return avt;
	}

	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}

	public void setInstagram(String intagram) {
		this.instagram = intagram;
	}

	public void setAvt(ImageDTO avt) {
		this.avt = avt;
	}

	public void setFollower(List<UserDTO> follower) {
		this.follower = follower;
	}

	public void setFollowedUser(List<UserDTO> followedUser) {
		this.followedUser = followedUser;
	}

	public void setLikedPosts(List<PostDTO> likedPosts) {
		this.likedPosts = likedPosts;
	}

	public void setSavedPost(List<PostDTO> savedPost) {
		this.savedPost = savedPost;
	}

	public void setPosts(List<PostDTO> posts) {
		this.posts = posts;
	}

	public String getPhone() {
		return phone;
	}

	public List<RoleDTO> getRoles() {
		return roles;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setRoles(List<RoleDTO> roles) {
		this.roles = roles;
	}



	public List<GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		for (RoleDTO role : roles) {
			authorities.add(new SimpleGrantedAuthority(role.getName().toString()));
		}
		return authorities;
	}


}
