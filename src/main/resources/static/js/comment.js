
const url_comment = "http://localhost:8081/api/comments";


function addEventForBtnComment(posts){

    posts.forEach(e => {
        const comment_icon = document.getElementById(`p${e.id}`).querySelector('.uil-comment-dots');
        const btn_close_chat_box = document.getElementById(`p${e.id}`).querySelector('.btn-close-chat-box');
        comment_icon.addEventListener('click', () =>{
            document.getElementById(`p${e.id}`).querySelector('.chat-box').classList.toggle('none');
        })
        btn_close_chat_box.addEventListener('click', () => {
            document.getElementById(`p${e.id}`).querySelector('.chat-box').classList.add('none');
        })
    })
}

function renderComment(e, userCur){
    const chat_block = document.getElementById(`p${e.id}`).querySelector('.chat-block');
    chat_block.innerHTML = '';
    const url_img = "http://localhost:8081/api/images";
    e.comments.forEach(c => {
        // console.log(`${url_img}/${c.user.avt.id}`);
        if(userCur==null || userCur.id!=c.user.id){
            chat_block.innerHTML =  `${chat_block.innerHTML}
                <li class="mar-btm">
                    <div class="media-left profile-photo">
                        <img src="${url_img}/${c.user.avt.id}" class="img-circle img-sm" alt="Profile Picture">
                    </div>
                    <div class="media-body pad-hor">
                        <div class="speech">
                            <a href="#" class="media-heading">${c.user.fullName}</a>
                            <p>${c.content}</p>
                            <p class="speech-time">
                            <i class="fa fa-clock-o fa-fw"></i>09:23AM
                            </p>
                        </div>
                    </div>
                </li>
            `
        } else {
            chat_block.innerHTML =  `${chat_block.innerHTML}
                <li class="mar-btm">
                    <div class="media-right profile-photo">
                        <img src="${url_img}/${c.user.avt.id}" class="img-circle img-sm" alt="Profile Picture">
                    </div>
                    <div class="media-body pad-hor speech-right">
                        <div class="speech">
                            <a href="#" class="media-heading">${c.user.fullName}</a>
                            <p>${c.content}</p>
                            <p class="speech-time">
                            <i class="fa fa-clock-o fa-fw"></i>09:23AM
                            </p>
                        </div>
                    </div>
                </li>
            `
        }
    })
}


function sendComment(posts){
    posts.forEach((e) => {

        const input_chat = document.getElementById(`p${e.id}`).querySelector('.input-chat');
        const btn_send_chat = document.getElementById(`p${e.id}`).querySelector('.btn-send-chat');
        // console.log(btn_send_chat);
        btn_send_chat.addEventListener('click', async()=> {
            let text = input_chat.value;
            input_chat.value = '';
            // console.log(text);
    
            let h = new Headers();
            h.append("Content-Type", "application/json");
            h.append('authorization', localStorage.getItem('authorization'));
            
            const comment = {};
            comment.content = text;
            comment.post = {};
            comment.post.id = e.id;

            const res = await fetch(url_comment, {
                method: 'POST',
                headers: h,
                body: JSON.stringify(comment)
            })
    
            const newComment = await res.json();
            // console.log("newComment:", newComment);
            // console.log(document.getElementById(`p${e.id}`).querySelector('.wrap-comment'));
            
            await sendMessage(newComment);
            // sendLike({"postId":1, "userId":2});

            
            const res2 = await fetch(`http://localhost:8081/api/comments/users/${e.id}`, {
                method: 'GET',
                headers: h
            })

            const userIdInCommentBox = await res2.json();
            userIdInCommentBox.forEach(async(el) => {
                console.log("vao comment r");
                console.log(userIdInCommentBox);
                if(el != currentUser.id && e.authorUser.id != el){
                     // notifications
                    const notification = {
                        sender : {
                            id: currentUser.id,
                            fullName: currentUser.fullName,
                            avt: currentUser.avt
                        },
                        receiver : {
                            id: el
                        },
                        post : e,
                        content : "đã bình luận về bài viết \""+e.title.toUpperCase()+"\" mà bạn đang quan tâm",
                        status: 1
                    }

                    const res1 = await fetch(`http://localhost:8081/api/notifications`, {
                        method: 'POST',
                        body: JSON.stringify(notification),
                        headers: h
                    })
                    const noti = await res1.json();
                    console.log(notification);
                    sendNotification(notification);
                } else if(el != currentUser.id && e.authorUser.id == el){
                     // notifications
                     const notification = {
                        sender : {
                            id: currentUser.id,
                            fullName: currentUser.fullName,
                            avt: currentUser.avt
                        },
                        receiver : {
                            id: el
                        },
                        post : e,
                        content : "đã bình luận về bài viết \""+e.title.toUpperCase()+"\" của bạn",
                        status: 1
                    }

                    const res1 = await fetch(`http://localhost:8081/api/notifications`, {
                        method: 'POST',
                        body: JSON.stringify(notification),
                        headers: h
                    })
                    const noti = await res1.json();
                    console.log(notification);
                    sendNotification(notification);
                }
            })
        })
    })
}

// function showMessageOutput(messageOutput) {

//     console.log(messageOutput);
// }

// let headers = new Headers();
// headers.append("Content-Type", "application/json");

// "content":"comment 1",
// "post": {
//     "id": 1
// }


// "comments": [
//     {
//         "id": 1,
//         "content": "comment 1",
//         "createdDate": null,
//         "modifiedDate": null,
//         "commentsReply": [],
//         "parentsComment": null,
//         "user": {
//             "id": 3,
//             "email": "abc",
//             "userName": "ht",
//             "password": null,
//             "fullName": "ht",
//             "dob": "04/10/2001",
//             "phone": "094",
//             "facebook": "face",
//             "instagram": "inta",
//             "avt": null,
//             "roles": [],
//             "follower": [],
//             "followedUser": [],
//             "likedPosts": [],
//             "savedPost": [],
//             "posts": [],
//             "authorities": []
//         },
//         "post": null
//     }