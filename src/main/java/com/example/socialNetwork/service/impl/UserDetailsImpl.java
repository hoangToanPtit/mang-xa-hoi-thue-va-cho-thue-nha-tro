//package com.example.socialNetwork.service.impl;
//
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//import java.util.Objects;
//import java.util.stream.Collectors;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import com.example.socialNetwork.dto.UserDTO;
//import com.example.socialNetwork.entity.User;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//public class UserDetailsImpl implements UserDetails {
//  private static final long serialVersionUID = 1L;
//
//  private Long id;
//
//  private String fullName;
//
//  private String email;
//
//  @JsonIgnore
//  private String password;
//
////  private Collection<? extends GrantedAuthority> authorities;
//  private  GrantedAuthority authority;
//  
//  public UserDetailsImpl(Long id, String username, String email, String password,
//		  GrantedAuthority authority) {
//    this.id = id;
//    this.fullName = username;
//    this.email = email;
//    this.password = password;
//    this.authority = authority;
//  }
//
//  public static UserDetailsImpl build(UserDTO user) {
////    List<GrantedAuthority> authorities = user.getRoles().stream()
////        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
////        .collect(Collectors.toList());
//    GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getName().toString());
//    return new UserDetailsImpl(
//        user.getId(), 
//        user.getFullName(), 
//        user.getEmail(),
//        user.getPassword(), 
//        authority);
//  }
//
//
//
//
//  public Long getId() {
//    return id;
//  }
//
//  public String getEmail() {
//    return email;
//  }
//
//  @Override
//  public String getPassword() {
//    return password;
//  }
//
// 
//
//  public String getFullName() {
//	return fullName;
//}
//
//public GrantedAuthority getAuthority() {
//	return authority;
//}
//
//public void setId(Long id) {
//	this.id = id;
//}
//
//public void setFullName(String fullName) {
//	this.fullName = fullName;
//}
//
//public void setEmail(String email) {
//	this.email = email;
//}
//
//public void setPassword(String password) {
//	this.password = password;
//}
//
//public void setAuthority(GrantedAuthority authority) {
//	this.authority = authority;
//}
//
//@Override
//  public boolean isAccountNonExpired() {
//    return true;
//  }
//
//  @Override
//  public boolean isAccountNonLocked() {
//    return true;
//  }
//
//  @Override
//  public boolean isCredentialsNonExpired() {
//    return true;
//  }
//
//  @Override
//  public boolean isEnabled() {
//    return true;
//  }
//
//  @Override
//  public boolean equals(Object o) {
//    if (this == o)
//      return true;
//    if (o == null || getClass() != o.getClass())
//      return false;
//    UserDetailsImpl user = (UserDetailsImpl) o;
//    return Objects.equals(id, user.id);
//  }
//
//	@Override
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//		return null;
//	}
//
//	@Override
//	public String getUsername() {
//		// TODO Auto-generated method stub
//		return fullName;
//	}
//}
