package com.example.socialNetwork.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.socialNetwork.entity.UserEntity;


public interface UserRepository extends JpaRepository<UserEntity, Long>{
	Optional<UserEntity> findByEmailAndPassword(String email, String password);
	Optional<UserEntity> findByUserNameAndPassword(String userName, String password);
	Optional<UserEntity> findByIdAndUserName(Long id, String userName);
	Optional<UserEntity> findByUserName(String userName);
	
	@Modifying
	@Transactional
	@Query(value = "insert into  post_save values(?1, ?2)", nativeQuery = true)
	void insertSavePost(Long post_id, Long user_id);
	
	@Modifying
	@Transactional
	@Query(value = "insert into  post_like values(?1, ?2)", nativeQuery = true)
	void insertLikePost(Long post_id, Long user_id);
	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM post_save WHERE (post_id = ? and user_id = ?);", nativeQuery = true)
	void deleteSavePost(Long post_id, Long user_id);
	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM post_like WHERE (post_id = ? and user_id = ?);", nativeQuery = true)
	void deleteLikePost(Long post_id, Long user_id);
}
