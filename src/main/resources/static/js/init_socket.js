var stompClient = null;
// let currentUser = null;
// var notificationCount = 0;
connect();

function connect() {
    var socket = new SockJS('http://localhost:8081/our-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        // updateNotificationDisplay();
        stompClient.subscribe('/topic/messages', function (message) {
            showMessage(JSON.parse(message.body));
        });

        stompClient.subscribe('/topic/likes', function (message) {
            showLike(JSON.parse(message.body));
            console.log("like post",JSON.parse(message.body));
        });

        stompClient.subscribe('/topic/notifications', function (message) {
            // showLike(JSON.parse(message.body));
            console.log("thong baos", currentUser);
            console.log(JSON.parse(message.body));
            showNotification(JSON.parse(message.body));
        });

        stompClient.subscribe('/user/topic/private-messages', function (message) {
            // showMessage(JSON.parse(message.body).content);

            console.log(JSON.parse(message.body).content);
        });

        // stompClient.subscribe('/topic/global-notifications', function (message) {
        //     notificationCount = notificationCount + 1;
        //     updateNotificationDisplay();
        // });

        // stompClient.subscribe('/user/topic/private-notifications', function (message) {
        //     notificationCount = notificationCount + 1;
        //     updateNotificationDisplay();
        // });
    });
}

function showMessage(message) {
    // console.log("nhan: ", message.post);
    const chat_block = document.getElementById(`p${message.post.id}`).querySelector('.chat-block');
    if(currentUser!=null && currentUser.id == message.user.id){
        let html = `
        <li class="mar-btm">
            <div class="media-right profile-photo">
                <img src="${url_img}/${message.user.avt.id}" class="img-circle img-sm" alt="Profile Picture">
            </div>
            <div class="media-body pad-hor speech-right">
                <div class="speech">
                    <a href="#" class="media-heading">${message.user.fullName}</a>
                    <p>${message.content}</p>
                    <p class="speech-time">
                    <i class="fa fa-clock-o fa-fw"></i>09:23AM
                    </p>
                </div>
            </div>
        </li>
        `
        chat_block.insertAdjacentHTML('beforeend', html);
    }
     else{
        let html = `
        <li class="mar-btm">
            <div class="media-left profile-photo">
                <img src="${url_img}/${message.user.avt.id}" class="img-circle img-sm" alt="Profile Picture">
            </div>
            <div class="media-body pad-hor">
                <div class="speech">
                    <a href="#" class="media-heading">${message.user.fullName}</a>
                    <p>${message.content}</p>
                    <p class="speech-time">
                    <i class="fa fa-clock-o fa-fw"></i>09:23AM
                    </p>
                </div>
            </div>
        </li>
        `
        chat_block.insertAdjacentHTML('beforeend', html);
    }
   
}

function showLike(message){
    const feed = document.getElementById(`p${message.postId}`);
    const btn_likes = feed.querySelector('.btn-heart');
    const like_number = feed.querySelector('.like-number');
    // console.log(feed);
    if(feed!=null){
        if(message.status==1){
            like_number.textContent = eval(like_number.textContent)+1;
            if(currentUser!=null && currentUser.id == message.userId){
                    
                    btn_likes.classList.add('fa');
                    btn_likes.classList.add('fa-heart');
                    btn_likes.classList.remove('uil');
                    btn_likes.classList.remove('uil-heart');
            }
        }else{
            like_number.textContent = eval(like_number.textContent)-1;
            if(currentUser!=null && currentUser.id == message.userId){
                    btn_likes.classList.remove('fa');
                    btn_likes.classList.remove('fa-heart');
                    btn_likes.classList.add('uil');
                    btn_likes.classList.add('uil-heart');
            }
        }
    }
}


function showNotification(message){
    console.log("thong baos 2", message.sender);

    const notification_popup = document.querySelector('.notifications-popup .notification-content');
    if(notification_popup!=null && currentUser.id==message.receiver.id ){
        console.log("tb");
        let html = `
        <div class="notifi">
            <div class="profile-photo">
                <img src="${url_img}/${message.sender.avt.id}" alt="">
            </div>
            <div class="notification-body">
                <b>${message.sender.fullName}</b> ${message.content}
                <small class="text-muted">2 hours ago</small>
            </div>
        </div>
        `
        notification_popup.insertAdjacentHTML('afterbegin', html);

        const countNew = document.querySelector('.notification-count');
        countNew.style.display = 'block';
        countNew.textContent = eval(countNew.textContent)+1;

        const noti_item = notification_popup.querySelector('.notifi:first-child');
        noti_item.addEventListener('click', (event)=> {
            event.stopPropagation();
            viewNotification(message.post.id);
        })
    }
}

function sendMessage(comment) {
    console.log("sending message");
    stompClient.send("/ws/message", {}, JSON.stringify(comment));
}

function sendLike(comment) {
    console.log("sending message");
    stompClient.send("/ws/likes", {}, JSON.stringify(comment));
}

function sendNotification(comment) {
    console.log("sending message");
    stompClient.send("/ws/notifications", {}, JSON.stringify(comment));
}

function sendPrivateMessage(comment) {
    console.log("sending private message");
    stompClient.send("/ws/private-message", {}, JSON.stringify(comment));
}
