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
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "role")
public class RoleEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private ERole name;

	// role of user
	@ManyToMany(mappedBy = "roles")
	private List<UserEntity> users = new ArrayList<>();
	
//	@ManyToMany
//	@JoinTable(name ="user_role",
//	joinColumns = @JoinColumn(name = "role_id"),
//	inverseJoinColumns = @JoinColumn(name = "user_id"))
//	private List<UserEntity> users = new ArrayList<>();

	// getter and setter
	public Long getId() {
		return id;
	}

	public ERole getName() {
		return name;
	}

	public void setName(ERole name) {
		this.name = name;
	}

	public List<UserEntity> getUsers() {
		return users;
	}

	public void setUsers(List<UserEntity> users) {
		this.users = users;
	}

}
