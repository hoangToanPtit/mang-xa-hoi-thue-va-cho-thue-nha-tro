package com.example.socialNetwork.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialNetwork.dto.CommentDTO;
import com.example.socialNetwork.dto.PostDTO;
import com.example.socialNetwork.dto.UserDTO;
import com.example.socialNetwork.service.ICommentSevice;
import com.example.socialNetwork.service.IUserService;


@RestController
public class CommentAPI {

	@Autowired
	private ICommentSevice commentSevice;	
	
	@Autowired
	private IUserService userService;	
	

	@PostMapping(value = "/api/comments")
	public CommentDTO postMethodName(@RequestHeader("authorization") String token, @RequestBody CommentDTO model) {
		UserDTO userDto = userService.getInfoByToken(token);
		model.setUser(userDto);
		CommentDTO res = commentSevice.save(model);
		res.getUser().setAvt(userService.getAvt(res.getUser().getId()));
		return res;
	}

	@GetMapping(value = "/api/comments/users/{postId}")
	public List<Long> getUserReceiveNoti(@PathVariable Long postId) {
		return commentSevice.getUserInCommentBox(postId);
	}
}
