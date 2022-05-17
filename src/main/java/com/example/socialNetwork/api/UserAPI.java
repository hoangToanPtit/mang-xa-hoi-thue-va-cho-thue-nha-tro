package com.example.socialNetwork.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialNetwork.dto.PostDTO;
import com.example.socialNetwork.dto.UserDTO;
import com.example.socialNetwork.service.ICommentSevice;
import com.example.socialNetwork.service.IPostService;
import com.example.socialNetwork.service.IUserService;
import com.example.socialNetwork.service.impl.JwtService;

@RestController
public class UserAPI {
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private IUserService userService;	
	
	@Autowired
	private ICommentSevice commentSevice;

	@Autowired
	private IPostService postService;

	@PostMapping(value = "/api/login")
	public ResponseEntity<String> postMethodName(@RequestBody  UserDTO model) {
		//TODO: process POST request
	    String result = "";
	    HttpStatus httpStatus = null;
	    try {
	    	UserDTO userDTO = userService.checkLogin(model);
	      if (userDTO!=null) {
	        result = jwtService.generateTokenLogin(userDTO);
	        httpStatus = HttpStatus.OK;
	      } else {
	        result = "Wrong userId and password";
	        httpStatus = HttpStatus.BAD_REQUEST;
	      }
	    } catch (Exception ex) {
	      result = "Server Error";
	      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
	    }
	    System.out.println(jwtService.getUsernameFromToken(result));
	    System.out.println(jwtService.getUseIdFromToken(result));
		return new ResponseEntity<String>(result, httpStatus);
	}

	@GetMapping(value = "/api/profiles")
	public UserDTO getProfile(@RequestHeader("authorization") String token) {
//		System.out.println("token: " + token);
		return userService.getInfoByToken(token);
	}
	
	@PostMapping(value = "/api/signup")
	public UserDTO createNew(@RequestBody UserDTO model) {
		return userService.save(model);
	}

	
	@GetMapping(value = "/api/allusers")
	public List<UserDTO> getMethodName() {
		return userService.findAll();
	}

	@GetMapping(value = "/api/users")
	public UserDTO getUserById(@RequestHeader("authorization") String token) {
		Long id = jwtService.getUseIdFromToken(token);
		
		UserDTO user = userService.findById(id);
		for (PostDTO postDTO : user.getPosts()) {
			postDTO.setLike(postService.countLike(postDTO.getId()));
			postDTO.getAuthorUser().setAvt(userService.getAvt(postDTO.getAuthorUser().getId()));
			postDTO.setComments(commentSevice.findAllOfPost(postDTO.getId()));
		}
		
		for(PostDTO postDTO: user.getSavedPost()) {
			postDTO.setLike(postService.countLike(postDTO.getId()));
			postDTO.getAuthorUser().setAvt(userService.getAvt(postDTO.getAuthorUser().getId()));
			postDTO.setComments(commentSevice.findAllOfPost(postDTO.getId()));
		}
		
		return user;
	}

	
	@PutMapping(value = "/api/users")
	public UserDTO putMethodName(@RequestHeader("authorization") String token, @RequestBody UserDTO model) {
		Long id = jwtService.getUseIdFromToken(token);
		model.setId(id);
		UserDTO user = userService.save(model);
		user = userService.findById(user.getId());
		for (PostDTO postDTO : user.getPosts()) {
//			postDTO.setImages(imageService.findAllInPost(postDTO.getId()));
			postDTO.setComments(commentSevice.findAllOfPost(postDTO.getId()));
		}
		return user;
	}
	
	@DeleteMapping(value = "/api/users")
	public void deleteMethodName(@RequestBody Long[] ids) {
		userService.delete(ids);
	}

	
	@DeleteMapping(value = "/api/users/posts/{postId}")
	public void deleteSavedPost(@PathVariable Long postId, @RequestHeader("authorization") String token) {
		Long id = jwtService.getUseIdFromToken(token);
		userService.deleteSavedPost(postId, id);
	}
	
	@GetMapping(value = "/api/users/posts/{postId}")
	public void savePost(@PathVariable Long postId, @RequestHeader("authorization") String token) {
		Long id = jwtService.getUseIdFromToken(token);
		userService.savePost(postId, id);
	}

	
	@GetMapping(value = "/api/users/likedPosts/{postId}")
	public Long likePost( @RequestHeader("authorization") String token, @PathVariable Long postId) {
		Long id = jwtService.getUseIdFromToken(token);
		userService.likePost(postId, id);
		return id;
	}
	
	@DeleteMapping(value = "/api/users/likedPosts/{postId}")
	public Long unlikePost(@PathVariable Long postId, @RequestHeader("authorization") String token) {
		Long id = jwtService.getUseIdFromToken(token);
		userService.unlikePost(postId, id);
		return id;
	}
	
}
