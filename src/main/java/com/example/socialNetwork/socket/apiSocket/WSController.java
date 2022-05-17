package com.example.socialNetwork.socket.apiSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialNetwork.dto.CommentDTO;
import com.example.socialNetwork.socket.model.Message;
import com.example.socialNetwork.socket.service.WSService;

@RestController
public class WSController {

    @Autowired
    private WSService service;

//    @PostMapping("/send-message")
//    public void sendMessage(@RequestBody final Message message) {
//        service.notifyFrontend(message.getMessageContent());
//    }
//
//    @PostMapping("/send-private-message/{id}")
//    public void sendPrivateMessage(@PathVariable final String id,
//                                   @RequestBody final Message message) {
//        service.notifyUser(id, message.getMessageContent());
//    }
    
    @PostMapping("/send-message")
    public void sendMessage(@RequestBody final CommentDTO comment) {
        service.notifyFrontend(comment);
    }

//    @PostMapping("/send-message")
//    public void sendMessage(@RequestBody final CommentDTO comment) {
//        service.notifyFrontend(comment);
//    }
    
    @PostMapping("/send-private-message/{id}")
    public void sendPrivateMessage(@PathVariable final String id,
                                   @RequestBody final Message message) {
        service.notifyUser(id, message.getMessageContent());
    }
    

}
