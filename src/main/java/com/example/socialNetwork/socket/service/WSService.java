package com.example.socialNetwork.socket.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.socialNetwork.dto.CommentDTO;
import com.example.socialNetwork.dto.NotificationDTO;
import com.example.socialNetwork.socket.model.LikeSocket;
import com.example.socialNetwork.socket.model.ResponseMessage;

@Service
public class WSService {

    private final SimpMessagingTemplate messagingTemplate;
//    private final NotificationServiceSocket notificationService;

    @Autowired
    public WSService(SimpMessagingTemplate messagingTemplate, NotificationServiceSocket notificationServiceSocket) {
        this.messagingTemplate = messagingTemplate;
//        this.notificationService = notificationService;
    }

    public void notifyFrontend(final CommentDTO comment) {
//        ResponseMessage response = new ResponseMessage(message);
//        notificationService.sendGlobalNotification();

        messagingTemplate.convertAndSend("/topic/messages", comment);
    }

    
    public void notifyFrontendLike(final LikeSocket like) {
      messagingTemplate.convertAndSend("/topic/likes", like);
    }    
    
    
    public void notifyFrontendNoti(final NotificationDTO noti) {
        messagingTemplate.convertAndSend("/topic/notifications", noti);
    }    
    
    
    public void notifyUser(final String id, final String message) {
        ResponseMessage response = new ResponseMessage(message);

//        notificationService.sendPrivateNotification(id);
        messagingTemplate.convertAndSendToUser(id, "/topic/private-messages", response);
    }
    

}
