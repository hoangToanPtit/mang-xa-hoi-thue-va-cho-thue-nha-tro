package com.example.socialNetwork.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.socialNetwork.converter.RoleConverter;
import com.example.socialNetwork.converter.UserConverter;
import com.example.socialNetwork.dto.ImageDTO;
import com.example.socialNetwork.dto.PostDTO;
import com.example.socialNetwork.dto.RoleDTO;
import com.example.socialNetwork.dto.UserDTO;
import com.example.socialNetwork.entity.PostEntity;
import com.example.socialNetwork.entity.RoleEntity;
import com.example.socialNetwork.entity.UserEntity;
import com.example.socialNetwork.repository.UserRepository;
import com.example.socialNetwork.service.IImageService;
import com.example.socialNetwork.service.IPostService;
import com.example.socialNetwork.service.IRoleService;
import com.example.socialNetwork.service.IUserService;


@Service
public class UserService implements IUserService{
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserConverter userConverter;	
	
	@Autowired
	private RoleConverter roleConverter;		
	
	@Autowired
	private IRoleService roleService;

	@Autowired
	private IPostService postService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private IImageService imageService;
	
	@Override
	public UserDTO save(UserDTO userDTO) {
		UserEntity userEntity = new UserEntity();
		if(userDTO.getId()==null) {
			userEntity = userConverter.toEntity(userDTO);
			List<RoleDTO> roledtos = userDTO.getRoles();
			List<RoleEntity> roleEntities = new ArrayList<RoleEntity>();
			for (RoleDTO role : roledtos) {
				roleEntities.add(roleService.getRoleEntity(role));
			}
			userEntity.setRoles(roleEntities);
			if(userDTO.getAvt()!=null)
				userEntity.setAvt(imageService.getById(userDTO.getAvt().getId()));
		} else {
			
			UserEntity oldUserEntity = userRepository.findById(userDTO.getId()).get();
			userEntity = userConverter.toEntity(userDTO, oldUserEntity);
			if(userDTO.getAvt()!=null)
				userEntity.setAvt(imageService.getById(userDTO.getAvt().getId()));	
		}
		userEntity = userRepository.save(userEntity);

		UserDTO userDto = userConverter.toDTO(userEntity);
		List<RoleEntity> roleEntities = userEntity.getRoles();
		List<RoleDTO> roleDtos = new ArrayList<RoleDTO>();
		for (RoleEntity role : roleEntities) {
			roleDtos.add(roleConverter.toDto(role));
		}
		userDto.setRoles(roleDtos);
		return userDto;
	}

	@Override 
	public void delete(Long[] ids) {
		for(long i: ids) {
			userRepository.deleteById(i);
		}
	}

	@Override
	public List<UserDTO> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<UserDTO> findAll() {
		List<UserDTO> results = new ArrayList<>();
		List<UserEntity> entities = userRepository.findAll();
		for (UserEntity item: entities) {
			UserDTO userDTO = userConverter.toDTO(item);
			if(item.getAvt()!=null)
				userDTO.setAvt(imageService.findById(item.getAvt().getId()));
			List<RoleEntity> roleEntities = item.getRoles();
			List<RoleDTO> roleDtos = new ArrayList<RoleDTO>();
			for (RoleEntity role : roleEntities) {
				roleDtos.add(roleConverter.toDto(role));
			}
			userDTO.setRoles(roleDtos);
			
			results.add(userDTO);
		}
		return results;
	}

	@Override
	public int totalItem() {
		return (int) userRepository.count();
	}

	@Override
	public UserDTO checkLogin(UserDTO userDTO) {
		UserDTO dto 
		= userConverter.toDTO(userRepository.findByUserNameAndPassword(userDTO.getUserName(), userDTO.getPassword()).get());
		
		return dto;
	}

	public UserDTO loadUserByUsername(String username) {
		UserEntity userEntity = userRepository.findByUserName(username).get();
		UserDTO userDto = userConverter.toDTO(userEntity);
		if(userEntity.getAvt()!=null)
			userDto.setAvt(imageService.findById(userEntity.getAvt().getId()));
		List<RoleEntity> roleEntities = userEntity.getRoles();
		List<RoleDTO> roleDtos = new ArrayList<RoleDTO>();
		for (RoleEntity role : roleEntities) {
			roleDtos.add(roleConverter.toDto(role));
		}
		
		userDto.setRoles(roleDtos);
		
		return userDto;
	}

	public UserDTO loadUserByIdAndUserName(Long id, String username) {
		UserEntity userEntity = userRepository.findByIdAndUserName(id, username).get();
		
		UserDTO userDto = userConverter.toDTO(userEntity);
		if(userEntity.getAvt()!=null)
			userDto.setAvt(imageService.findById(userEntity.getAvt().getId()));
		List<RoleEntity> roleEntities = userEntity.getRoles();
		List<RoleDTO> roleDtos = new ArrayList<RoleDTO>();
		for (RoleEntity role : roleEntities) {
			System.out.println("role: " + role.getName());
			roleDtos.add(roleConverter.toDto(role));
		}
		userDto.setRoles(roleDtos);
		
		return userDto;
	}

	@Override
	public UserDTO getInfoByToken(String token) {
		Long id = jwtService.getUseIdFromToken(token);
		if(id==null) return null;
		UserEntity userEntity = userRepository.findById(id).get();
		UserDTO userDto = userConverter.toDTO(userEntity);
		if(userEntity.getAvt()!=null)
			userDto.setAvt(new ImageDTO(userEntity.getAvt().getId()));
		List<RoleEntity> roleEntities = userEntity.getRoles();
		List<RoleDTO> roleDtos = new ArrayList<RoleDTO>();
		for (RoleEntity role : roleEntities) {
			roleDtos.add(roleConverter.toDto(role));
		}
		userDto.setRoles(roleDtos);
//		userDto.setId(null);
		userDto.setPassword(null);
		
		List<PostEntity> likePostEntity =  userEntity.getLikedPosts();
		List<PostDTO> likePost = new ArrayList<PostDTO>();
		for (PostEntity p : likePostEntity) {
			likePost.add(new PostDTO(p.getId()));
		}
		userDto.setLikedPosts(likePost);
		
		return userDto;
	}

	@Override
	public UserDTO findById(Long id) {
		UserEntity userEntity = userRepository.findById(id).get();
		UserDTO userDto = userConverter.toDTO(userEntity);
		
		List<PostEntity> likePostEntity =  userEntity.getLikedPosts();
		List<PostDTO> likePost = new ArrayList<PostDTO>();
		for (PostEntity p : likePostEntity) {
			likePost.add(new PostDTO(p.getId()));
		}
		userDto.setLikedPosts(likePost);
		
		if(userEntity.getAvt()!=null)
			userDto.setAvt(imageService.findById(userEntity.getAvt().getId()));
		List<RoleEntity> roleEntities = userEntity.getRoles();
		List<RoleDTO> roleDtos = new ArrayList<RoleDTO>();
		for (RoleEntity role : roleEntities) {
			roleDtos.add(roleConverter.toDto(role));
		}
		userDto.setRoles(roleDtos);
//		userDto.setId(null);
		userDto.setPassword(null);
		
		
		List<PostEntity> postEntities = userEntity.getPosts();
		List<PostDTO> postDtos = new ArrayList<PostDTO>();
		for (PostEntity post : postEntities) {
//			System.out.println(post.getId());
			postDtos.add(postService.getById(post.getId()));
		}
		for (PostDTO postDTO : postDtos) {
			postDTO.setImages(imageService.findAllInPost(postDTO.getId()));
		}
		userDto.setPosts(postDtos);
		
		
		List<PostEntity> savedPostEntities = userEntity.getSavedPost();
		List<PostDTO> savedPostDtos = new ArrayList<PostDTO>();
		for (PostEntity post : savedPostEntities) {
//			System.out.println(post.getId());
			savedPostDtos.add(postService.getById(post.getId()));
		}
		for (PostDTO sp : savedPostDtos) {
			sp.setImages(imageService.findAllInPost(sp.getId()));
		}
		userDto.setSavedPost(savedPostDtos);
		
		return userDto;
	}

	@Override
	public ImageDTO getAvt(Long id) {
		UserEntity userEntity = userRepository.findById(id).get();
		return imageService.findById(userEntity.getAvt().getId());
	}

	@Override
	public Boolean checkUserName(String userName) {
		if(userRepository.findByUserName(userName)!=null) return true;
		return false;
	}

	@Override
	public void savePost(Long postId, Long userId) {
		userRepository.insertSavePost(postId,  userId);
	}

	@Override
	public void deleteSavedPost(Long postId, Long userId) {
		userRepository.deleteSavePost(postId,  userId);
		
	}

	@Override
	public void likePost(Long postId, Long userId) {
		userRepository.insertLikePost(postId, userId);
	}

	@Override
	public void unlikePost(Long postId, Long userId) {
		userRepository.deleteLikePost(postId,  userId);
	}

}
