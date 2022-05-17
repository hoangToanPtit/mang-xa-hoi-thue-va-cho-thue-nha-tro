

function savePost(postId){
    const feed = document.getElementById(`p${postId}`);
    let id = feed.id.slice(1);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('authorization', localStorage.getItem('authorization'));
    const urlUser = "http://localhost:8081/api/users/posts";


    // console.log("id:"+id);
    const btn_save = feed.querySelector('.btn_save');

    btn_save.addEventListener('click', () => {
        if(currentUser!=null){
            btn_save.classList.toggle('fa-bookmark-o');
            btn_save.classList.toggle('fa-bookmark');
    
            if(btn_save.classList.value.includes('fa-bookmark-o')){
                // console.log("click nut da luwu");

                let size = 650;
                const minimize = setInterval(() => {
                    size-=10;
                    if(size<=10) size=0;
                    feed.style.height = `${size}px`;
                    if(size==0){
                        clearInterval(minimize);
                        feed.classList.add('none');
                    } 
                        
                }, 3);

                let arrSavedPostTmp = [];
                arrSavedPost.forEach(el => {
                    if(el!=`p${postId}`){
                        arrSavedPostTmp.push(el);
                    }
                });
                arrSavedPost = arrSavedPostTmp;

                console.log("save: ", arrSavedPost);

                // setTimeout(() => {
                //     feed.classList.add('none');
                // }, 1000);

                const res = fetch(`${urlUser}/${id}`, {
                    method: 'DELETE',
                    headers: headers
                })  
                
                 
            }else {
                const res = fetch(`${urlUser}/${id}`, {
                    method: 'GET',
                    headers: headers
                })  
            }
        }else{
            console.log("dang nhap de luu bai viet");
        }
    })

}

function clickBtnSave(feed){
    const btn_save = feed.querySelector('.btn_save');
    btn_save.classList.remove('fa-bookmark-o');
    btn_save.classList.add('fa-bookmark');
}