


async function getNotification(){
    let h = new Headers();
    h.append("Content-Type", "application/json");
    h.append('authorization', localStorage.getItem('authorization'));

    const res = await fetch(`http://localhost:8081/api/notifications`, {
        method: 'GET',
        headers: h
    })

    let count = 0;

    const notifications = await res.json();
    notifications.forEach(e => {
        if(e.status == 1){
            count++;
        }
        pushNotification(e);
    });

    const countNew = document.querySelector('.notification-count');
    if(count == 0){
        countNew.style.display = 'none';
    }else{
        countNew.style.display = 'block';
        countNew.textContent = count;
    }
}

function pushNotification(noti){
    const noti_box = document.querySelector('.notifications-popup .notification-content');
    if(noti_box!=null){
        let html = `
        <div class="notifi">
            <div class="profile-photo">
                <img src="${url_img}/${noti.sender.avt.id}" alt="">
            </div>
            <div class="notification-body">
                <b>${noti.sender.fullName}</b> ${noti.content}
                <small class="text-muted">${noti.modifiedDate}</small>
            </div>
        </div>
        `

        noti_box.insertAdjacentHTML('afterbegin', html);
        const noti_item = noti_box.querySelector('.notifi:first-child');
        noti_item.addEventListener('click', (event)=> {
            
            event.stopPropagation();
            viewNotification(noti.post.id);
        })
    }
}

async function viewNotification(postId){
    let h = new Headers();
    h.append("Content-Type", "application/json");
    h.append('authorization', localStorage.getItem('authorization'));

    const res = await  fetch(`http://localhost:8081/api/posts/${postId}`, {
        method: 'GET',
        headers: headers
    })
    const post = await res.json();
    console.log(post);
    
    document.querySelector('.notifications-popup').classList.add('none');
    const feeds = document.querySelector('.feeds');
    feeds.innerHTML = '';
    renderNewPost(post);
    feeds.querySelector('.chat-box').classList.remove('none');
    document.querySelector('.quick-search').classList.add('none');
    window.removeEventListener('scroll', autoLoadPost);
}