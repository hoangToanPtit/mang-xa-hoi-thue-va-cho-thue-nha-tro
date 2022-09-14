package com.example.socialNetwork.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.socialNetwork.converter.NotificationConverter;
import com.example.socialNetwork.dto.NotificationDTO;
import com.example.socialNetwork.entity.NotificationEntity;
import com.example.socialNetwork.repository.NotificationRepository;
import com.example.socialNetwork.service.INotificationService;

@Service
public class NotificationService implements INotificationService{
	
	@Autowired
	private NotificationConverter notificationConverter;
	
	@Autowired
	private NotificationRepository notificationRepository;
	

	@Override
	public NotificationDTO save(NotificationDTO notificationDTO) {
		NotificationEntity notiEntity = new NotificationEntity();
		if(notificationDTO.getId()==null) {
			notiEntity = notificationConverter.toEntity(notificationDTO);
		}else {
			NotificationEntity oldNotiEntity = notificationRepository.findById(notificationDTO.getId()).get();
			notiEntity = notificationConverter.toEntity(notificationDTO, oldNotiEntity);
			
		}
		notiEntity = notificationRepository.save(notiEntity);
		
		NotificationDTO notiDto = notificationConverter.toDto(notiEntity);
		
		return notiDto;
	}

	
	@Override
	public void delete(List<Long> ids) {
		for(long i: ids) {
			notificationRepository.deleteById(i);
		}
	}

	@Override
	public List<NotificationDTO> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<NotificationDTO> findAll() {
		List<NotificationDTO> results = new ArrayList<>();
		List<NotificationEntity> entities = notificationRepository.findAll();
		for (NotificationEntity item: entities) {
			NotificationDTO notiDto = notificationConverter.toDto(item);
			results.add(notiDto);
		}
		return results;
	}
	
	@Override
	public List<NotificationDTO> findAllNotiForUser(Long userId) {
		List<NotificationDTO> results = new ArrayList<>();
		List<NotificationEntity> entities = notificationRepository.findALLOfUser(userId);
		for (NotificationEntity item: entities) {
			NotificationDTO notiDto = notificationConverter.toDto(item);
			results.add(notiDto);
		}
		return results;
	}

	@Override
	public int totalItem() {
		// TODO Auto-generated method stub
		return 0;
	}


	@Override
	public void deleteNotification(Long receiverId) {
		notificationRepository.deleteNotifications(receiverId);
	}


	@Override
	public void deleteNotificationByPostId(Long postId) {
		// TODO Auto-generated method stub
		notificationRepository.deleteNotificationByPostID(postId);
	}

}
