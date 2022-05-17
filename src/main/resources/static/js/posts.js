


window.addEventListener('scroll', autoLoadPost);

function autoLoadPost(){
    console.log("add event scroll for win dow");
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && end==0){
        console.log("add event scroll for win dow");
        renderPost();
    }
}



// window.innerHeight

let headers = new Headers();
headers.append("Content-Type", "application/json");

const urlPost = "http://localhost:8081/api/posts";
const url_img = "http://localhost:8081/api/images";
var currentPage = -1;
var size = 3;
var end = 0;
var feeds = null;
var currentUser = null;
var arrSavedPost = null;
var menu_item_home = null;



(async() => {
    
    currentUser =  await getUser();
    
    // console.log(currentUser.role[0]);

    if(currentUser.roles[0].name=='ROLE_LANDLORD'){
        document.querySelector('.menu-quick-search-item').style.display = 'flex';
        document.querySelector('.menu-search-item').style.display = 'none';
        document.querySelector('.saved_post_btn_menu').style.display = 'none';
        document.querySelector('.left .sidebar').style.marginTop = '3rem';
    }

    if(currentUser.savedPost!=null){
        arrSavedPost = currentUser.savedPost.map(e=> {
            return `p${e.id}`;
        })
    }

    
    const tagName = document.querySelector('.profile .fullName');
    // console.log("tagnaem", currentUser.fullName);
    // tagName.textContent = localStorage.getItem('fullName');
    tagName.textContent = currentUser.fullName;
    document.querySelector('.profile .profile-photo img').src = `${url_img}/${currentUser.avt.id}`;
    document.querySelector('.create .profile-photo img').src = `${url_img}/${currentUser.avt.id}`;
    document.querySelector('.create-post .profile-photo img').src = `${url_img}/${currentUser.avt.id}`;
    
    feeds = document.querySelector('.feeds');
    menu_item_home = document.querySelector('.menu-item-home');
    console.log("home item:", menu_item_home);
    renderPost();
    if(menu_item_home!=null){
        menu_item_home.addEventListener('click', ()=>{
            document.querySelector('.quick-search').classList.remove('none');
            feeds.innerHTML = '';
            currentPage = -1;
            renderPost();
            window.removeEventListener('scroll', autoLoadQuickSearch);
            // window.addEventListener('scroll', autoLoadPost);
            window.addEventListener('scroll', autoLoadPost);
        })
        menu_item_home.addEventListener('click', renderPost);
    }
    getNotification();


    // saved posts in home page
    const save_btn_menu = document.querySelector('.saved_post_btn_menu');

    save_btn_menu.addEventListener('click', async()=>{
        // console.log(currentUser.savedPost);
        // renderSavedPost(currentUser.savedPost);
        let hd = new Headers();
        hd.append("Content-Type", "application/json");
        hd.append('authorization', localStorage.getItem('authorization'));
        try{
            const res = await  fetch("http://localhost:8081/api/posts/savedPosts", {
                method: 'GET',
                headers: hd
            })
            const savedPost = await res.json();
            currentUser.savedPost = savedPost;
            if(currentUser.savedPost!=null){
                arrSavedPost = currentUser.savedPost.map(e=> {
                    return `p${e.id}`;
                })
            }
            console.log("ssave", savedPost);
            // return user;
            renderSavedPost(savedPost);
        } catch(error){
            location.href='http://127.0.0.1:5500/view/home.html';
        }
        window.removeEventListener('scroll', autoLoadPost);
    })
    
})()




async function renderPost(){
    currentPage++;
    console.log("currentPage:" + currentPage);
    const res = await  fetch(`${urlPost}/${currentPage}/${size}`, {
        method: 'GET',
        headers: headers
    })
    const posts = await res.json();
    console.log(posts);
    if(posts.length==0) end=1;
    if(currentPage==0)
        feeds.innerHTML = '';
    await posts.reverse().forEach(e => {
        let html =
        `
        <!-- ---------Test Feed 1--------- -->
        <div class="feed" id="p${e.id}">
            <div class="head">
                <div class="user">
                    <div class="profile-photo">
                        <img src="${url_img}/${e.authorUser.avt.id}" alt="">
                    </div>
                    <div class="ingo">
                        <h3>${e.authorUser.fullName}</h3>
                        <small>${e.province}, ${e.createdDate}</small>
                    </div>
                </div>
                <span class="edit">
                    <i class="uil uil-ellipsis-h"></i>
                </span>
            </div>
            <div class="photo photo_cus">
                
                <!----------------- slider ---------->
                    <div class="slider">
                        <i class="fa fa-angle-left slider-prev"></i>
                        <ul class="slider-dots">
                            
                        </ul>
                        <div class="slider-wrapper">
                            <div class="slider-main">
                            
                            </div>
                        </div>
                        <i class="fa fa-angle-right slider-next"></i>
                        </div>
                    <!-- end of slider -->

            </div>

            
            <div class="action-button">
                <div class="interaction-buttons">
                    <span><i class="uil uil-heart btn-heart"></i></span>
                    <small class="like-number" style="font-size: 0.9rem;">${e.like}</small>
                    </div>
                    <div class="bookmark">
                    <span><i class="fa fa-bookmark-o btn_save" aria-hidden="true"></i></span>
                    <span><i class="uil uil-comment-dots" id=${e.id}></i></span>

                </div>
            </div>

           




            <!-- ========chat box========= -->
            <div class="none chat-box">
                <div class="col-md-12 col-lg-6">
                    <div class="panel">
                        <!--Heading-->
                        <div class="panel-heading">
                            <div class="panel-control">
                                <div class="btn-group">
                                    <button type="button" class="btn-close-chat-box" data-toggle="dropdown"><i class="uil uil-multiply"></i></button>
                                </div>
                            </div>
                            <h3 class="panel-title">Trò chuyện</h3>
                        </div>
                
                        <!--Widget body-->
                        <div id="demo-chat-body" class="collapse in">
                            <div class="nano has-scrollbar" style="height:400px">
                                <div class="nano-content pad-all" tabindex="0" style="right: -17px;">
                                    <ul class="list-unstyled media-block chat-block">
                                        <li class="mar-btm">
                                            <div class="media-left profile-photo">
                                                <img src="../images/profile-11.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">John Doe</a>
                                                    <p>Hello Lucy, how can I help you today ?</p>
                                                    <p class="speech-time">
                                                    <i class="fa fa-clock-o fa-fw"></i>09:23AM
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-right profile-photo">
                                                <img src="../images/profile-12.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor speech-right">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">Lucy Doe</a>
                                                    <p>Hi, I want to buy a new shoes.</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:23AM
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-left profile-photo">
                                                <img src="../images/profile-1.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">John Doe</a>
                                                    <p>Shipment is free. You\'ll get your shoes tomorrow!</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:25
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-right profile-photo">
                                                <img src="../images/profile-8.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor speech-right">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">Lucy Doe</a>
                                                    <p>Wow, that\'s great!</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:27
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-right profile-photo">
                                                <img src="../images/profile-5.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor speech-right">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">Lucy Doe</a>
                                                    <p>Ok. Thanks for the answer. Appreciated.</p>
                                                    <p class="speech-time">
                                                    <i class="fa fa-clock-o fa-fw"></i> 09:28
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-left profile-photo">
                                                <img src="../images/profile-15.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">John Doe</a>
                                                    <p>You are welcome! <br> Is there anything else I can do for you today?</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:30
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-right profile-photo">
                                                <img src="../images/profile-16.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor speech-right">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">Lucy Doe</a>
                                                    <p>Nope, That's it.</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:31
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-left profile-photo">
                                                <img src="../images/profile-19.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">John Doe</a>
                                                    <p>Thank you for contacting us today</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:32
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            <div class="nano-pane"><div class="nano-slider" style="height: 141px; transform: translate(0px, 0px);"></div></div></div>
                
                            <!--Widget footer-->
                            <div class="panel-footer">
                                <!-- <div class="row"> -->
                                    <div class="col-xs-9">
                                        <input class="input-chat" type="text" placeholder="Viết bình luận của bạn" class="form-control chat-input">
                                    </div>
                                    <div class="col-xs-3 btn-send-chat">
                                        <img src="../images/icons8-send-64.png" alt="">
                                    </div>
                                <!-- </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- ========end of chat box========= -->


            <!-- ====== Comment========= -->
                <div class="none comment-box" >
                    <div class="new-comment">
                        <div class="avt">
                            <img src="../images/profile-1.jpg" alt="">
                        </div>
                        <div class="new-comment-input">
                            <input type="text" name="" id="" placeholder="NHap vao binh luan cua ban">
                            
                            <div class="btn-send-comment"><i class="uil uil-message"></i></div>
                        </div>
                    </div>

                    <div class="wrap-comment">
                        <div class="comment">
                            <div class="avt">
                                <img src="../images/profile-1.jpg" alt="">
                            </div>
                            
                            <div class="wrap-text">
                                <div class="info">
                                    <h4>Nguyen Van Toan</h4>
                                    <span>2h ago</span>
                                </div>
                                <div class="content">
                                    <p>Con phong khong ban oi</p>
                                </div>
                            </div>
                            
                            <div class="btn-rep">
                                <button>Phản hồi</button>
                            </div>
                        </div>

                    </div>


                </div>

                        
                        

                <!-- ====== End of Comment========= -->



            <div>
                <p class="post-title">${e.title.toUpperCase()}</p>
            </div>
            <div class="post-location">
                <img src="../images/icons8-location-48.png" alt="">
                <p>${e.houseNumber}, ${e.streetName}, ${e.wards}, ${e.district}, ${e.province}</p>
            </div>
            <div class="post-rent-price">
                GIÁ THUÊ: <span>${formatNumberToPrice(e.rentPrice)}</span> VND/Phòng<br>
            </div>

            <div class="post-info-top">
                <div class="post-info-top-item post-amount-room">
                    <p>SỐ PHÒNG</p>
                    <span>${e.amount}</span>
                </div>
                <div class="post-info-top-item post-size">
                    <p>DIỆN TÍCH</p>
                    <span>${e.size} M2</span>
                </div>
                <div class="post-info-top-item post-capacity">
                    <p>SỨC CHỨA</p>
                    <span>${e.capacity}
                        <img src="../images/icons8-male-50.png" alt="">
                        <img src="../images/icons8-female-50.png" alt="">
                    </span>
                </div>
                <div class="post-info-top-item post-deposit" >
                    <p>ĐẶT CỌC</p>
                    <span>${e.deposit/1000}K</span>
                </div>
            </div>

            <div class="post-info-second">
                <div class="post-info-second-item post-amount-room">
                    <img src="../images/icons8-light-80.png" alt="">
                    <span>${e.electricityPrice/1000}k</span>
                </div>
                <div class="post-info-second-item post-size">
                    <img src="../images/icons8-water-50.png" alt="">
                    <span>${e.waterPrice/1000}k</span>
                </div>
                <div class="post-info-second-item post-capacity">
                    <img src="../images/icons8-wi-fi-32.png" alt="">
                    <span>${e.internetPrice/1000}k</span>
                </div>
                <div class="post-info-second-item post-deposit" >
                    <img src="../images/icons8-motorbike-64.png" alt="">
                    <span>${e.parkingFee/1000}k</span>
                </div>
            </div>

            <div class="post-contact none">
                <h5>Liên lạc: </h5> <p>${e.phoneNumber}</p>
            </div>

            <div class="post-description none">
                <h5>Chi tiết</h5>
                <p>${e.description}</p>
            </div>

            
           
            <div class="none post-uitls field search-util-room util-room">
                <div class="title">
                    <h5>Tiện ích</h5>
                </div>

                <div class="input" style="width: 450px;">
                    <div class="util-item " name="conditioner">
                        <img src="../images/air-conditioner.png" alt="">
                        <p>Máy lạnh</p>
                    </div>
                    <div class="util-item " name="privateWc">
                        <img src="../images/wc.png" alt="">
                        <p>WC riêng</p>
                    </div>
                    <div class="util-item " name="parking">
                        <img src="../images/icons8-motorbike-64.png" alt="">
                        <p>Chỗ để xe</p>
                    </div>
                    <div class="util-item" name="wifi">
                        <img src="../images/icons8-wi-fi-50.png" alt="">
                        <p> Wifi/4G </p>
                    </div>
                    <div class="util-item" name="freedom">
                        <img src="../images/icons8-clock-50.png" alt="">
                        <p>Giờ tự do</p>
                    </div>
                    <div class="util-item" name="keyy">
                        <img src="../images/icons8-heart-key-24.png" alt="">
                        <p>Khóa riêng</p>
                    </div>
                    <div class="util-item" name="bed">
                        <img src="../images/icons8-bed-50.png" alt="">
                        <p>Giường</p>
                    </div>
                    <div class="util-item" name="kitchen">
                        <img src="../images/icons8-kitchenwares-50.png" alt="">
                        <p>Nhà bếp</p>
                    </div>
                    <div class="util-item" name="pet">
                        <img src="../images/icons8-dog-jump-64.png" alt="">
                        <p>Thú cưng</p>
                    </div>
                    <div class="util-item" name="guard">
                        <img src="../images/icons8-police-50.png" alt="">
                        <p>An ninh</p>
                    </div>
                    <div class="util-item" name="refrigerator">
                        <img src="../images/icons8-fridge-50.png" alt="">
                        <p>Tủ lạnh</p>
                    </div>
                    <div class="util-item" name="tablee">
                        <img src="../images/icons8-table-50.png" alt="">
                        <p>Bàn học</p>
                    </div>
                    <div class="util-item" name="windoww">
                        <img src="../images/icons8-open-window-50.png" alt="">
                        <p>Cửa sổ</p>
                    </div>
                    <div class="util-item" name="waterHeater">
                        <img src="../images/icons8-hotel-64.png" alt="">
                        <p>Máy nước nóng</p>
                    </div>
                    <div class="util-item" name="closet">
                        <img src="../images/icons8-closet-50.png" alt="">
                        <p>Tủ đồ</p>
                    </div>
                </div>    
            </div>

            <div class="post-up-down">Xem thêm <i class="fa fa-angle-down" aria-hidden="true"></i></div>
            <!-- <i class="fa fa-angle-up" aria-hidden="true"></i> -->  
        </div>
        <!-- ---------End of Test Feed 1--------- -->

        `;

        feeds.insertAdjacentHTML('beforeend', html);

        const topice = feeds.querySelector('.feed:last-child .user .ingo small');
        
        if(e.topic.name=="CHO_THUE"){
            topice.textContent = `${topice.textContent} - Cho thuê nhà trọ`;
        }else if(e.topic.name=="GIOI_THIEU"){
            topice.textContent = `${topice.textContent} - Giới thiệu phòng trọ`;
        }else if(e.topic.name=="TIM_NGUOI_O_GHEP"){
            topice.textContent = `${topice.textContent} - Tìm người ở ghép`;
        }else if(e.topic.name=="NHUONG_PHONG_TRO"){
            topice.textContent = `${topice.textContent} - Nhượng phòng trọ`;
        }


        const utilities = feeds.querySelectorAll('.feed:last-child .util-room  .util-item');
        utilities.forEach(el => {
            if(e[el.attributes[1].value]==1)
                el.classList.add('active');
        })

        const genders = feeds.querySelectorAll('.feed:last-child .post-capacity img');
        if(e.gender=="Nam"){
            genders[1].style.display = "none";
        } else if(e.gender=="Nữ"){
            genders[0].style.display = "none";
        }

        const images = feeds.querySelector('.feed:last-child .photo .slider-main');
        const images_dot = feeds.querySelector('.feed:last-child .slider-dots');
        // console.log([images]);
        const img_html = e.images.map( (img, i) => {
            if(i==0){
                images_dot.innerHTML = '';
                images_dot.insertAdjacentHTML('beforeend', `
                    <li class="slider-dot-item active" data-index="${i}"></li>
                `);
            }else{
                images_dot.insertAdjacentHTML('beforeend', `
                    <li class="slider-dot-item" data-index="${i}"></li>
                `);
            }

            return `
            <div class="slider-item">
            <img
              src="${url_img}/${img.id}"
              alt=""
            />
            </div>
            `;
        })

        images.innerHTML = img_html.join('\n');
        

        renderComment(e, currentUser)


        const btn_like = feeds.querySelector('.feed:last-child .btn-heart');
        if(currentUser!=null){
            currentUser.likedPosts.forEach(p => {
                if(p.id==e.id){
                    btn_like.classList.add('fa');
                    btn_like.classList.add('fa-heart');
                    btn_like.classList.remove('uil');
                    btn_like.classList.remove('uil-heart');
                }
            }) 
        }

        if(currentUser.id == e.authorUser.id){
            feeds.querySelector('.feed:last-child .btn_save').style.display = 'none';
        }
       
    });
    
    posts.forEach(e => {
        upDownContentPost(e.id);
        addEventForBtnLike(e);
        savePost(e.id);
    })

    await addEventForBtnComment(posts);
    await sendComment(posts);


    const slide_item = document.querySelectorAll('.slider');
    slide_item.forEach(e => {
        buildSlider(e);
    })

    document.querySelectorAll('.feed').forEach(e=> {
        // addEventBtnEditBox(e);
        
        if(arrSavedPost.includes(e.id)){
            clickBtnSave(e);
        }
    })

    if(currentUser.roles[0].name=='ROLE_LANDLORD'){
        document.querySelectorAll('.feed').forEach(e=> {
            e.querySelector('.btn_save').style.display = 'none';
        })
    }

}




function upDownContentPost(id){
    const up_down_btn = document.getElementById(`p${id}`).querySelector('.post-up-down');
    // console.log("textcontent", up_down_btn.textContent);

    // console.log(up_down_btn);
    const post_description = document.getElementById(`p${id}`).querySelector('.post-description');
    const post_utilities = document.getElementById(`p${id}`).querySelector('.post-uitls');
    const post_contact = document.getElementById(`p${id}`).querySelector('.post-contact');
    up_down_btn.addEventListener('click', ()=>{
        post_description.classList.toggle("none");
        post_utilities.classList.toggle("none");
        post_contact.classList.toggle("none");
        if(up_down_btn.querySelector('i').classList.contains('fa-angle-down')){
            up_down_btn.innerHTML = `
            <div class="post-up-down">Thu gọn <i class="fa fa-angle-up" aria-hidden="true"></i></div>
            `;
        }else{
            up_down_btn.innerHTML = `
            <div class="post-up-down">Xem thêm <i class="fa fa-angle-down" aria-hidden="true"></i></div>
            `;
        }
    })
}



function formatNumberToPrice(cost){
    cost+='';
    let res = '';
    for(let i=cost.length-1; i>=0; i--){
        res = cost[i]+''+res;
        if((cost.length-i)%3==0) res=','+res;
    }
    return res;
}


async function getUser() {
    let hd = new Headers();
    hd.append("Content-Type", "application/json");
    hd.append('authorization', localStorage.getItem('authorization'));
    
    try{
        const res = await  fetch("http://localhost:8081/api/users", {
            method: 'GET',
            headers: hd
        })
        const user = await res.json();
        console.log(user);
        return user;
    } catch(error){
        location.href='http://127.0.0.1:5500/view/home.html';
    }
    return null;
}

// amount: 5
// authorUser: {id: 1, email: 'abc', password: '123', fullName: 'ht', dob: '04/10/2001', …}
// capacity: 3
// comments: []
// createdDate: null
// deposit: 200000
// description: ""
// district: "Thanh trì"
// electricityPrice: 4000
// gender: "Nam"
// houseNumber: "3"
// id: 1
// images: (3) [{…}, {…}, {…}]
// internetPrice: 100000
// modifiedDate: null
// parkingFee: 20000
// phoneNumber: ""
// province: "hà nội"
// rentPrice: 5000000
// roomType: "Phòng cho thuê"
// size: 20
// streetName: "triều khúc"
// title: ""
// topic: {id: 2, name: 'Topic2', posts: Array(0)}
// userLikes: []
// userSaves: []
// wards: "tân triều"
// waterPrice: 50000

//cop from profile
function renderSavedPost(posts){
    // console.log(posts);
    // posts.sort((a, b) => b.id-a.id);
    console.log(posts);
    feeds.innerHTML = '';
    posts.forEach(e => {
        let html=
        `
        <!-- ---------Test Feed 1--------- -->
        <div class="feed" id="p${e.id}">
            <div class="head">
                <div class="user">
                    <div class="profile-photo">
                        <img src="${url_img}/${e.authorUser.avt.id}" alt="">
                    </div>
                    <div class="ingo">
                        <h3>${e.authorUser.fullName}</h3>
                        <small>${e.province}, ${e.createdDate}</small>
                    </div>
                </div>
                <span class="edit">
                    <i class="uil uil-ellipsis-h"></i>
                </span>
                <div class="edit-box none">
                    <ul>
                    <li class="btn_edit_post" id="edit${e.id}">Chỉnh sửa</li>
                    <li class="btn_delete_post">Xóa</li>
                    </ul>
                </div>
            </div>
            <div class="photo photo_cus">
                
                <!----------------- slider ---------->
                    <div class="slider">
                        <i class="fa fa-angle-left slider-prev"></i>
                        <ul class="slider-dots">
                            <li class="slider-dot-item active" data-index="0"></li>
                            <li class="slider-dot-item" data-index="1"></li>
                            <li class="slider-dot-item" data-index="2"></li>
                            <li class="slider-dot-item" data-index="3"></li>
                            <li class="slider-dot-item" data-index="4"></li>
                        </ul>
                        <div class="slider-wrapper">
                            <div class="slider-main">
                            
                            </div>
                        </div>
                        <i class="fa fa-angle-right slider-next"></i>
                        </div>
                    <!-- end of slider -->

            </div>

            
            <div class="action-button">
                <div class="interaction-buttons">
                    <span><i class="uil uil-heart btn-heart"></i></span>
                    <small class="like-number" style="font-size: 0.9rem;">${e.like}</small>
                </div>
                <div class="bookmark">
                <span><i class="fa fa-bookmark-o btn_save" aria-hidden="true"></i></span>
                    <span><i class="uil uil-comment-dots" id=${e.id}></i></span>

                </div>
            </div>






            <!-- ========chat box========= -->
            <div class="none chat-box">
                <div class="col-md-12 col-lg-6">
                    <div class="panel">
                        <!--Heading-->
                        <div class="panel-heading">
                            <div class="panel-control">
                                <div class="btn-group">
                                    <button type="button" class="btn-close-chat-box" data-toggle="dropdown"><i class="uil uil-multiply"></i></button>
                                </div>
                            </div>
                            <h3 class="panel-title">Trò chuyện</h3>
                        </div>
                
                        <!--Widget body-->
                        <div id="demo-chat-body" class="collapse in">
                            <div class="nano has-scrollbar" style="height:400px">
                                <div class="nano-content pad-all" tabindex="0" style="right: -17px;">
                                    <ul class="list-unstyled media-block chat-block">
                                        <li class="mar-btm">
                                            <div class="media-left profile-photo">
                                                <img src="../images/profile-11.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">John Doe</a>
                                                    <p>Hello Lucy, how can I help you today ?</p>
                                                    <p class="speech-time">
                                                    <i class="fa fa-clock-o fa-fw"></i>09:23AM
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-right profile-photo">
                                                <img src="../images/profile-12.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor speech-right">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">Lucy Doe</a>
                                                    <p>Hi, I want to buy a new shoes.</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:23AM
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-left profile-photo">
                                                <img src="../images/profile-1.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">John Doe</a>
                                                    <p>Shipment is free. You\'ll get your shoes tomorrow!</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:25
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-right profile-photo">
                                                <img src="../images/profile-8.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor speech-right">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">Lucy Doe</a>
                                                    <p>Wow, that\'s great!</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:27
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-right profile-photo">
                                                <img src="../images/profile-5.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor speech-right">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">Lucy Doe</a>
                                                    <p>Ok. Thanks for the answer. Appreciated.</p>
                                                    <p class="speech-time">
                                                    <i class="fa fa-clock-o fa-fw"></i> 09:28
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-left profile-photo">
                                                <img src="../images/profile-15.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">John Doe</a>
                                                    <p>You are welcome! <br> Is there anything else I can do for you today?</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:30
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-right profile-photo">
                                                <img src="../images/profile-16.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor speech-right">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">Lucy Doe</a>
                                                    <p>Nope, That's it.</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:31
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mar-btm">
                                            <div class="media-left profile-photo">
                                                <img src="../images/profile-19.jpg" class="img-circle img-sm" alt="Profile Picture">
                                            </div>
                                            <div class="media-body pad-hor">
                                                <div class="speech">
                                                    <a href="#" class="media-heading">John Doe</a>
                                                    <p>Thank you for contacting us today</p>
                                                    <p class="speech-time">
                                                        <i class="fa fa-clock-o fa-fw"></i> 09:32
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            <div class="nano-pane"><div class="nano-slider" style="height: 141px; transform: translate(0px, 0px);"></div></div></div>
                
                            <!--Widget footer-->
                            <div class="panel-footer">
                                <!-- <div class="row"> -->
                                    <div class="col-xs-9">
                                        <input class="input-chat" type="text" placeholder="Viết bình luận của bạn" class="form-control chat-input">
                                    </div>
                                    <div class="col-xs-3 btn-send-chat">
                                        <img src="../images/icons8-send-64.png" alt="">
                                    </div>
                                <!-- </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- ========end of chat box========= -->


            <!-- ====== Comment========= -->
                <div class="none comment-box" >
                    <div class="new-comment">
                        <div class="avt">
                            <img src="../images/profile-1.jpg" alt="">
                        </div>
                        <div class="new-comment-input">
                            <input type="text" name="" id="" placeholder="NHap vao binh luan cua ban">
                            
                            <div class="btn-send-comment"><i class="uil uil-message"></i></div>
                        </div>
                    </div>

                    <div class="wrap-comment">
                        <div class="comment">
                            <div class="avt">
                                <img src="../images/profile-1.jpg" alt="">
                            </div>
                            
                            <div class="wrap-text">
                                <div class="info">
                                    <h4>Nguyen Van Toan</h4>
                                    <span>2h ago</span>
                                </div>
                                <div class="content">
                                    <p>Con phong khong ban oi</p>
                                </div>
                            </div>
                            
                            <div class="btn-rep">
                                <button>Phản hồi</button>
                            </div>
                        </div>

                    </div>


                </div>

                        
                        

                <!-- ====== End of Comment========= -->



            <div>
                <p class="post-title">${e.title.toUpperCase()}</p>
            </div>
            <div class="post-location">
                <img src="../images/icons8-location-48.png" alt="">
                <p>${e.houseNumber}, ${e.streetName}, ${e.wards}, ${e.district}, ${e.province}</p>
            </div>
            <div class="post-rent-price">
                GIÁ THUÊ: <span>${formatNumberToPrice(e.rentPrice)}</span> VND/Phòng<br>
            </div>

            <div class="post-info-top">
                <div class="post-info-top-item post-amount-room">
                    <p>SỐ PHÒNG</p>
                    <span>${e.amount}</span>
                </div>
                <div class="post-info-top-item post-size">
                    <p>DIỆN TÍCH</p>
                    <span>${e.size} M2</span>
                </div>
                <div class="post-info-top-item post-capacity">
                    <p>SỨC CHỨA</p>
                    <span>${e.capacity}
                    <img src="../images/icons8-male-50.png" alt="">
                    <img src="../images/icons8-female-50.png" alt="">
                    </span>
                </div>
                <div class="post-info-top-item post-deposit" >
                    <p>ĐẶT CỌC</p>
                    <span>${e.deposit/1000}K</span>
                </div>
            </div>

            <div class="post-info-second">
                <div class="post-info-second-item post-amount-room">
                    <img src="../images/icons8-light-80.png" alt="">
                    <span>${e.electricityPrice/1000}k</span>
                </div>
                <div class="post-info-second-item post-size">
                    <img src="../images/icons8-water-50.png" alt="">
                    <span>${e.waterPrice/1000}k</span>
                </div>
                <div class="post-info-second-item post-capacity">
                    <img src="../images/icons8-wi-fi-32.png" alt="">
                    <span>${e.internetPrice/1000}k</span>
                </div>
                <div class="post-info-second-item post-deposit" >
                    <img src="../images/icons8-motorbike-64.png" alt="">
                    <span>${e.parkingFee/1000}k</span>
                </div>
            </div>

            <div class="post-contact none">
                <h5>Liên lạc: </h5> <p>${e.phoneNumber}</p>
            </div>

            <div class="post-description none">
                <h5>Chi tiết</h5>
                <p>${e.description}</p>
            </div>
           
            <div class="none post-uitls field search-util-room util-room">
                <div class="title">
                    <h5>Tiện ích</h5>
                </div>

                <div class="input" style="width: 450px;">
                    <div class="util-item " name="conditioner">
                        <img src="../images/air-conditioner.png" alt="">
                        <p>Máy lạnh</p>
                    </div>
                    <div class="util-item " name="privateWc">
                        <img src="../images/wc.png" alt="">
                        <p>WC riêng</p>
                    </div>
                    <div class="util-item " name="parking">
                        <img src="../images/icons8-motorbike-64.png" alt="">
                        <p>Chỗ để xe</p>
                    </div>
                    <div class="util-item" name="wifi">
                        <img src="../images/icons8-wi-fi-50.png" alt="">
                        <p> Wifi/4G </p>
                    </div>
                    <div class="util-item" name="freedom">
                        <img src="../images/icons8-clock-50.png" alt="">
                        <p>Giờ tự do</p>
                    </div>
                    <div class="util-item" name="keyy">
                        <img src="../images/icons8-heart-key-24.png" alt="">
                        <p>Khóa riêng</p>
                    </div>
                    <div class="util-item" name="bed">
                        <img src="../images/icons8-bed-50.png" alt="">
                        <p>Giường</p>
                    </div>
                    <div class="util-item" name="kitchen">
                        <img src="../images/icons8-kitchenwares-50.png" alt="">
                        <p>Nhà bếp</p>
                    </div>
                    <div class="util-item" name="pet">
                        <img src="../images/icons8-dog-jump-64.png" alt="">
                        <p>Thú cưng</p>
                    </div>
                    <div class="util-item" name="guard">
                        <img src="../images/icons8-police-50.png" alt="">
                        <p>An ninh</p>
                    </div>
                    <div class="util-item" name="refrigerator">
                        <img src="../images/icons8-fridge-50.png" alt="">
                        <p>Tủ lạnh</p>
                    </div>
                    <div class="util-item" name="tablee">
                        <img src="../images/icons8-table-50.png" alt="">
                        <p>Bàn học</p>
                    </div>
                    <div class="util-item" name="windoww">
                        <img src="../images/icons8-open-window-50.png" alt="">
                        <p>Cửa sổ</p>
                    </div>
                    <div class="util-item" name="waterHeater">
                        <img src="../images/icons8-hotel-64.png" alt="">
                        <p>Máy nước nóng</p>
                    </div>
                    <div class="util-item" name="closet">
                        <img src="../images/icons8-closet-50.png" alt="">
                        <p>Tủ đồ</p>
                    </div>
                </div>    
            </div>

            <div class="post-up-down">Xem thêm <i class="fa fa-angle-down" aria-hidden="true"></i></div>
            <!-- <i class="fa fa-angle-up" aria-hidden="true"></i> -->  
        </div>
        <!-- ---------End of Test Feed 1--------- -->

        `;

        feeds.insertAdjacentHTML('beforeend', html);


        const topice = feeds.querySelector('.feed:last-child .user .ingo small');
        
        if(e.topic.name=="CHO_THUE"){
            topice.textContent = `${topice.textContent} - Cho thuê nhà trọ`;
        }else if(e.topic.name=="GIOI_THIEU"){
            topice.textContent = `${topice.textContent} - Giới thiệu phòng trọ`;
        }else if(e.topic.name=="TIM_NGUOI_O_GHEP"){
            topice.textContent = `${topice.textContent} - Tìm người ở ghép`;
        }else if(e.topic.name=="NHUONG_PHONG_TRO"){
            topice.textContent = `${topice.textContent} - Nhượng phòng trọ`;
        }


        const utilities = feeds.querySelectorAll('.feed:last-child .util-room  .util-item');
        
        utilities.forEach(el => {
            if(e[el.attributes[1].value]==1)
                el.classList.add('active');
        })

        const genders = feeds.querySelectorAll('.feed:last-child .post-capacity img');
        if(e.gender=="Nam"){
            genders[1].style.display = "none";
        } else if(e.gender=="Nữ"){
            genders[0].style.display = "none";
        }
        
        
        const images_dot = feeds.querySelector('.feed:last-child .slider-dots');
        const images = feeds.querySelector('.feed:last-child .photo .slider-main');
        // console.log([images]);
        const img_html = e.images.map( (img, i) => {
            if(i==0){
                images_dot.innerHTML = '';
                images_dot.insertAdjacentHTML('beforeend', `
                    <li class="slider-dot-item active" data-index="${i}"></li>
                `);
            }else{
                images_dot.insertAdjacentHTML('beforeend', `
                    <li class="slider-dot-item" data-index="${i}"></li>
                `);
            }

            return `
            <div class="slider-item">
            <img
              src="${url_img}/${img.id}"
              alt=""
            />
            </div>
            `;
        })



        images.innerHTML = img_html.join('\n');
        
        
        const btn_like = feeds.querySelector('.feed:last-child .btn-heart');
        if(currentUser!=null){
            currentUser.likedPosts.forEach(p => {
                if(p.id==e.id){
                    btn_like.classList.add('fa');
                    btn_like.classList.add('fa-heart');
                    btn_like.classList.remove('uil');
                    btn_like.classList.remove('uil-heart');
                }
            }) 
        }
       

    });
    
    posts.forEach(e => {
        renderComment(e, currentUser)
        upDownContentPost(e.id);
        addEventForBtnLike(e);
        // editPost(e);
        savePost(e.id);
    })

    addEventForBtnComment(posts);
    sendComment(posts);


    const slide_item = document.querySelectorAll('.slider');
    slide_item.forEach(e => {
        buildSlider(e);
    });

    // let arrSavedPost=[];
    // if(currentUser.savedPost!=null){
    //     arrSavedPost = currentUser.savedPost.map(e=> {
    //         return `p${e.id}`;
    //     })
    // }

    console.log("arrsavedpost:", arrSavedPost);

    document.querySelectorAll('.feed').forEach(e=> {
        // addEventBtnEditBox(e);
        
        if(arrSavedPost.includes(e.id)){
            clickBtnSave(e);
        }
    })

}
