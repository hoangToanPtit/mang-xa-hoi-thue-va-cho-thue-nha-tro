package com.example.socialNetwork.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.socialNetwork.entity.CommentEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, Long>{
	List<CommentEntity> findAllByPostId(Long post_id);
	
	@Modifying
	@Transactional
	@Query(value = "select distinct(user_id) from comment where post_id=?1", nativeQuery = true)
	List<Long> getUserCommentInPost(Long postId);
	
}
