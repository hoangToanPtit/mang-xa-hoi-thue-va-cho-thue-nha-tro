package com.example.socialNetwork.socket.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.example.socialNetwork.dto.CommentDTO;
import com.example.socialNetwork.dto.NotificationDTO;
import com.example.socialNetwork.socket.model.LikeSocket;
import com.example.socialNetwork.socket.model.Message;
import com.example.socialNetwork.socket.model.ResponseMessage;
import com.example.socialNetwork.socket.service.NotificationServiceSocket;


@Controller
public class MessageController {
    @Autowired
    private NotificationServiceSocket notificationServiceSocket;

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public CommentDTO getMessage(final CommentDTO comment) throws InterruptedException {
        notificationServiceSocket.sendGlobalNotification();
        return comment;
    }

    
    @MessageMapping("/likes")
    @SendTo("/topic/likes")
    public LikeSocket getMessage(final LikeSocket like) throws InterruptedException {
        notificationServiceSocket.sendGlobalNotification();
        return like;
    }
    
    
    @MessageMapping("/notifications")
    @SendTo("/topic/notifications")
    public NotificationDTO getMessage(final NotificationDTO noti) throws InterruptedException {
        notificationServiceSocket.sendGlobalNotification();
        return noti;
    }
    
    
    @MessageMapping("/private-message")
    @SendToUser("/topic/private-messages")
    public ResponseMessage getPrivateMessage(final Message message,
                                             final Principal principal) throws InterruptedException {
        notificationServiceSocket.sendPrivateNotification(principal.getName());
        
        return new ResponseMessage(HtmlUtils.htmlEscape(
                "Sending private message to user " + principal.getName() + ": "
                        + message.getMessageContent())
        );
    }
    
    
}
