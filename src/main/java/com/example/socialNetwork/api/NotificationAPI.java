package com.example.socialNetwork.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialNetwork.dto.NotificationDTO;
import com.example.socialNetwork.service.INotificationService;
import com.example.socialNetwork.service.impl.JwtService;

@RestController
public class NotificationAPI {
	
	@Autowired
	private INotificationService notificationService;	
	
	@Autowired
	private JwtService jwtService;
	
	@PostMapping(value = "/api/notifications")
	public NotificationDTO createNoti(@RequestBody NotificationDTO model) {
		NotificationDTO notiDTO = notificationService.save(model);
		return notiDTO;
	}
	
	@PutMapping(value = "/api/notifications")
	public NotificationDTO updateNoti(@RequestBody NotificationDTO model) {
		NotificationDTO notiDTO = notificationService.save(model);
		return notiDTO;
	}
	
	@DeleteMapping(value = "/api/notifications/{id}")
	public void deleteMethodName(@PathVariable Long id) {
		List<Long> ids = new ArrayList<Long>();
		ids.add(id);
		notificationService.delete(ids);
	}
	
	@GetMapping(value = "/api/notifications")
	public List<NotificationDTO> getMethodName(@RequestHeader("authorization") String token) {
		Long id = jwtService.getUseIdFromToken(token);
		return notificationService.findAllNotiForUser(id);
	}
	

	@DeleteMapping(value = "/api/notifications")
	public void deleteNotifications(@RequestHeader("authorization") String token) {
		Long receiverId = jwtService.getUseIdFromToken(token);
		notificationService.deleteNotification(receiverId);
	}
}
