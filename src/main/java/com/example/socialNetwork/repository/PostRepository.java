package com.example.socialNetwork.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.socialNetwork.entity.PostEntity;
//@EnableJpaRepositories
public interface PostRepository extends JpaRepository<PostEntity, Long>{
//	List<PostEntity> findAllByUserId(Long user_id);
//	@Query("selct * FROM post g where g.user_id = :userId")
//	List<PostEntity> findAllByUserId(@Param("userId") Long userId);
	
	
	@Transactional
	@Query(value = "select count(user_id) from post_like where post_id = ?1", nativeQuery = true)
	int countLike(Long post_id);
	
	@Transactional
	@Query(value = "select * from post, post_save where post.id = post_save.post_id and post_save.user_id=?1", nativeQuery = true)
	List<PostEntity> findAllSavedPost(Long userId);
}
