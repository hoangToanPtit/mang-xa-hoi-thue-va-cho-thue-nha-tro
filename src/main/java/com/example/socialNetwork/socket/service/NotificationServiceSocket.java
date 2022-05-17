package com.example.socialNetwork.socket.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.socialNetwork.socket.model.ResponseMessage;

@Service
public class NotificationServiceSocket {
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NotificationServiceSocket(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendGlobalNotification() {
        ResponseMessage message = new ResponseMessage("Global Notification");

        messagingTemplate.convertAndSend("/topic/global-notifications", message);
    }

    public void sendPrivateNotification(final String userId) {
        ResponseMessage message = new ResponseMessage("Private Notification");

        messagingTemplate.convertAndSendToUser(userId,"/topic/private-notifications", message);
    }
    
//    public void sendPrivateMessage(final String postId) {
//        ResponseMessage message = new ResponseMessage("Private Notification");
//
//        messagingTemplate.convertAndSendToUser(postId,"/topic/private-notifications", message);
//    }
}
