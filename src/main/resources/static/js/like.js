
function addEventForBtnLike( post){

    const feed = document.getElementById(`p${post.id}`);
    const btn_likes = feed.querySelector('.btn-heart');
    // console.log(btn_likes);
    

    btn_likes.addEventListener('click', async() => {
        if(currentUser!=null){
            btn_likes.classList.toggle('fa');
            btn_likes.classList.toggle('fa-heart');
            btn_likes.classList.toggle('uil');
            btn_likes.classList.toggle('uil-heart');
            // console.log(e);
            // <i class="fa fa-heart" aria-hidden="true"></i>
            
            if(btn_likes.classList.value.includes("fa-heart")){
                console.log("like post");
                let h = new Headers();
                h.append("Content-Type", "application/json");
                h.append('authorization', localStorage.getItem('authorization'));
        
                const res = await fetch(`http://localhost:8081/api/users/likedPosts/${post.id}`, {
                    method: 'GET',
                    headers: h
                })
                const userId = await res.json();
                const like = {};
                like.postId = post.id;
                like.userId = userId;
                like.status = 1;
                await sendLike(like);
    
                // notifications
                const notification = {
                    sender : {
                        id: currentUser.id,
                        fullName: currentUser.fullName,
                        avt: currentUser.avt
                    },
                    receiver : {
                        id: post.authorUser.id
                    },
                    post : post,
                    content : "đã yêu thích bài viết \""+post.title.toUpperCase()+"\" của bạn",
                    status: 1
                }
                if(currentUser.id!=post.authorUser.id){
                    const res1 = await fetch(`http://localhost:8081/api/notifications`, {
                        method: 'POST',
                        body: JSON.stringify(notification),
                        headers: h
                    })
                    const noti = await res1.json();
                    console.log(noti);
                    
                    sendNotification(notification);    
                }
                
                // if(currentUser.id!=post.authorUser.id){
                //     sendNotification(notification);
                // }
    
            } else {
                console.log("unlike post");
                let h = new Headers();
                h.append("Content-Type", "application/json");
                h.append('authorization', localStorage.getItem('authorization'));
        
                const res = await fetch(`http://localhost:8081/api/users/likedPosts/${post.id}`, {
                    method: 'DELETE',
                    headers: h
                })
                const userId = await res.json();
                const like = {};
                like.postId = post.id;
                like.userId = userId;
                like.status = 0;
                sendLike(like);
            }
        }else{
            console.log("dang nhap di");
        }
    });
    
   
}



// ======================== Socket ====================


// stompClient.subscribe('/topic/like', onMessageReceived);

// // Tell your username to the server
// stompClient.send("/app/like",
//     {},
//     JSON.stringify({id1: 111, id2: 222})
// )




// function onMessageReceived(payload) {
//     var message = JSON.parse(payload.body);
//     console.log(message.id1, message.id2);
// }


// var stompClient = null;
// function setConnected(connected) {
//   document.getElementById("connect").disabled = connected;
//   document.getElementById("disconnect").disabled = !connected;
//   document.getElementById("conversationDiv").style.visibility = connected
//     ? "visible"
//     : "hidden";
//   document.getElementById("response").innerHTML = "";
// }


// function connect() {
//   var socket = new SockJS("http://localhost:8081/gs-guide-websocket");
//   stompClient = Stomp.over(socket);
//   stompClient.connect({}, function (frame) {
//     setConnected(true);
//     console.log("Connected: " + frame);
//     stompClient.subscribe("/topic/messages", function (messageOutput) {
//       showMessageOutput(JSON.parse(messageOutput.body));
//     });
//   });
// }


// function disconnect() {
//   if (stompClient != null) {
//     stompClient.disconnect();
//   }
//   setConnected(false);
//   console.log("Disconnected");
// }


// function sendMessage() {
//   var from = document.getElementById("from").value;
//   var text = document.getElementById("text").value;
//   stompClient.send("/app/chat", {}, JSON.stringify({ from: from, text: text }));
// }


// function showMessageOutput(messageOutput) {
//   var response = document.getElementById("response");
//   var p = document.createElement("p");
//   p.style.wordWrap = "break-word";
//   p.appendChild(
//     document.createTextNode(
//       messageOutput.from +
//         ": " +
//         messageOutput.text +
//         " (" +
//         messageOutput.time +
//         ")"
//     )
//   );
//   response.appendChild(p);
// }
