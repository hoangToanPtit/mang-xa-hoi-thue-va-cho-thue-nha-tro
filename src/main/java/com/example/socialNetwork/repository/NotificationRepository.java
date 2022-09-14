package com.example.socialNetwork.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.socialNetwork.entity.NotificationEntity;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long>{
	
	@Modifying
	@Transactional
	@Query(value = "select * from notification where receiver=?1", nativeQuery = true)
	List<NotificationEntity> findALLOfUser(Long userId);
	
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE notification SET status= 0 where receiver=?1", nativeQuery = true)
	void deleteNotifications(Long receiverId);
	
	@Modifying
	@Transactional
	@Query(value = "delete from notification where post=?1", nativeQuery = true)
	void deleteNotificationByPostID(Long postId);
}
