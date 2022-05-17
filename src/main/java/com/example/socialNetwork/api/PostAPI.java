package com.example.socialNetwork.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialNetwork.dto.PostConditionDTO;
import com.example.socialNetwork.dto.PostDTO;
import com.example.socialNetwork.dto.ResultDTO;
import com.example.socialNetwork.service.ICommentSevice;
import com.example.socialNetwork.service.IImageService;
import com.example.socialNetwork.service.IPostService;
import com.example.socialNetwork.service.IUserService;
import com.example.socialNetwork.service.impl.JwtService;

@CrossOrigin
@RestController
public class PostAPI {
	@Autowired
	private IPostService postService;	

	@Autowired
	private ICommentSevice commentSevice;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IImageService imageService;	
	
	@Autowired
	private JwtService jwtService;
	

	
	@PostMapping(value = "/api/posts")
	public PostDTO createNew(@RequestBody PostDTO model, @RequestHeader("authorization") String token) {
		Long id = jwtService.getUseIdFromToken(token);
		model.setAuthorUser(userService.findById(id));
		PostDTO postDTO = postService.save(model);
		postDTO.getAuthorUser().setAvt(userService.getAvt(postDTO.getAuthorUser().getId()));
		return postDTO;
	}
	
	@GetMapping(value = "/api/posts")
	public List<PostDTO> getMethodName() {
		List<PostDTO> listPostDTO = postService.findAll();
		for (PostDTO postDTO : listPostDTO) {
			postDTO.getAuthorUser().setAvt(userService.getAvt(postDTO.getAuthorUser().getId()));
			postDTO.setImages(imageService.findAllInPost(postDTO.getId()));
			postDTO.setComments(commentSevice.findAllOfPost(postDTO.getId()));
		}
		return listPostDTO;
	}
	
	@GetMapping(value = "/api/posts/{page}/{size}")
	public List<PostDTO> getMethodNameP(@PathVariable int page, @PathVariable int size) {
		Sort sort = Sort.by("id").descending();
		Pageable pageable = PageRequest.of(page, size, sort);
		List<PostDTO> listPostDTO = postService.findAll(pageable);
		for (PostDTO postDTO : listPostDTO) {
			postDTO.getAuthorUser().setAvt(userService.getAvt(postDTO.getAuthorUser().getId()));
			postDTO.setImages(imageService.findAllInPost(postDTO.getId()));
			postDTO.setComments(commentSevice.findAllOfPost(postDTO.getId()));
		}
		return listPostDTO;
	}

	@GetMapping(value = "/api/posts/{id}")
	public PostDTO getMethodName(@PathVariable Long id) {
		PostDTO postDto =  postService.getById(id);
		postDto.getAuthorUser().setAvt(userService.getAvt(postDto.getAuthorUser().getId()));
		postDto.setImages(imageService.findAllInPost(id));
		postDto.setComments(commentSevice.findAllOfPost(id));
		return postDto;
	}
	
	@PutMapping(value = "/api/posts/{id}")
	public PostDTO putMethodName(@PathVariable Long id, @RequestBody PostDTO model) {
		
		model.setId(id);
		PostDTO res = postService.save(model);
		
		return res;
	}
	
	@DeleteMapping(value = "/api/posts/{id}")
	public void deleteMethodName(@PathVariable Long id) {
		List<Long> ids = new ArrayList<Long>();
		ids.add(id);
		postService.delete(ids);
	}
	
	
	@PostMapping(value = "/api/posts/conditions")
	public List<ResultDTO> search(@RequestBody PostConditionDTO postCondition) {
		List<ResultDTO> listPostDTO = postService.findByCondition(postCondition);
		for (ResultDTO re : listPostDTO) {
			re.getPost().getAuthorUser().setAvt(userService.getAvt(re.getPost().getAuthorUser().getId()));
			re.getPost().setImages(imageService.findAllInPost(re.getPost().getId()));
			re.getPost().setComments(commentSevice.findAllOfPost(re.getPost().getId()));
		}
		return listPostDTO;
	}

	@PostMapping(value = "/api/posts/conditions/quickSearchs")
	public List<ResultDTO> quickSearch(@RequestBody PostConditionDTO postCondition) {
		List<ResultDTO> listPostDTO = postService.quickSearchByCondition(postCondition);
		for (ResultDTO re : listPostDTO) {
			re.getPost().getAuthorUser().setAvt(userService.getAvt(re.getPost().getAuthorUser().getId()));
			re.getPost().setImages(imageService.findAllInPost(re.getPost().getId()));
			re.getPost().setComments(commentSevice.findAllOfPost(re.getPost().getId()));
		}
		return listPostDTO;
	}

	@PostMapping(value = "/api/posts/conditions/quickSearchs/{page}/{size}")
	public List<ResultDTO> quickSearchPage(@RequestBody PostConditionDTO postCondition, @PathVariable int page, @PathVariable int size) {
		Sort sort = Sort.by("id").descending();
		Pageable pageable = PageRequest.of(page, size, sort);
		List<ResultDTO> listPostDTO = postService.quickSearchByConditionPage(pageable, postCondition);
		for (ResultDTO re : listPostDTO) {
			re.getPost().getAuthorUser().setAvt(userService.getAvt(re.getPost().getAuthorUser().getId()));
			re.getPost().setImages(imageService.findAllInPost(re.getPost().getId()));
			re.getPost().setComments(commentSevice.findAllOfPost(re.getPost().getId()));
		}
		return listPostDTO;
	}
	
	
	@GetMapping(value = "/api/posts/savedPosts")
	public List<PostDTO> getSavePost( @RequestHeader("authorization") String token) {
		Long id = jwtService.getUseIdFromToken(token);
		List<PostDTO> listPostDTO = postService.findSavedPosts(id);
		for (PostDTO postDTO : listPostDTO) {
			postDTO.getAuthorUser().setAvt(userService.getAvt(postDTO.getAuthorUser().getId()));
			postDTO.setImages(imageService.findAllInPost(postDTO.getId()));
			postDTO.setComments(commentSevice.findAllOfPost(postDTO.getId()));
		}
		return listPostDTO;
	}
	
}
