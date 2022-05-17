package com.example.socialNetwork.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.example.socialNetwork.dto.NotificationDTO;

public interface INotificationService {
	NotificationDTO save(NotificationDTO notificationDTO);
	void delete(List<Long> ids);
	List<NotificationDTO> findAll(Pageable pageable);
	List<NotificationDTO> findAll();
	List<NotificationDTO> findAllNotiForUser(Long userId);
	int totalItem();
	void deleteNotification(Long receiverId);
}
