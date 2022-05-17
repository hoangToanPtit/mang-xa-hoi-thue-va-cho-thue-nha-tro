
let profileHeaders = new Headers();
profileHeaders.append("Content-Type", "application/json");
profileHeaders.append('authorization', localStorage.getItem('authorization'));



const urlMyProfile = "http://localhost:8081/api/users";
const url_img = "http://localhost:8081/api/images";


const btn_edit_profile = document.querySelector('.profile .information .btn-edit-profile');
const form_edit_profile = document.querySelector('.wrap-edit-profile');
const btn_save_edited_profile = document.querySelector('.wrap-edit-profile .btn-save-info');
const btn_cancel_edit_profile = document.querySelector('.wrap-edit-profile .btn-cancel');
const feeds = document.querySelector('.feeds');
// let currentUser = null;
// currentUser = null;
// console.log(btn_cancel_edit_profile);

var arrSavedPost=null;


// form edit profile
const edit_inputs = form_edit_profile.querySelectorAll('input');
btn_edit_profile.addEventListener('click', () => {
    form_edit_profile.style.display = 'grid';
    edit_inputs.forEach(e => {
        e.value = currentUser[e.name];
    })
})

btn_save_edited_profile.addEventListener('click', async()=>{
    const user = {};
    edit_inputs.forEach(e => {
        user[e.name] = e.value;
    })
    console.log(user);

    const res = await  fetch("http://localhost:8081/api/users", {
        method: 'PUT',
        headers: profileHeaders,
        body: JSON.stringify(user)
    });

    currentUser = await res.json();
    // console.log(myProfile);
    renderInfor(currentUser);
    form_edit_profile.style.display = 'none';

})


btn_cancel_edit_profile.addEventListener('click', () => {
    form_edit_profile.style.display = 'none';

})




//  =========== render data for porfile ==========
const btn_post_prf = document.querySelector('.information .btn_post_prf');
const btn_view_saved_post = document.querySelector('.information .btn_view_saved_post');
console.log(btn_post_prf);

(async ()=> {
    try{
        const res = await  fetch("http://localhost:8081/api/users", {
            method: 'GET',
            headers: profileHeaders
        });
        // const user = await res.json();
        currentUser = await res.json();
    
        if(currentUser.roles[0].name=='ROLE_LANDLORD'){
            btn_view_saved_post.style.display = 'none';
        }

        if(currentUser.savedPost!=null){
            arrSavedPost = currentUser.savedPost.map(e=> {
                return `p${e.id}`;
            })
        }

        renderInfor(currentUser);
        renderMyPost(currentUser.posts);
        // console.log(myProfile.posts);
    
        btn_post_prf.addEventListener('click', async()=>{
            btn_post_prf.classList.add('active');
            btn_view_saved_post.classList.remove('active');
            await renderMyPost(currentUser.posts);
        });
    

        // my saved post
        btn_view_saved_post.addEventListener('click', async() => {
            btn_view_saved_post.classList.add('active');
            // if(currentUser.savedPost!=null){
            //     renderMyPost(currentUser.savedPost);
            // }
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
                renderMySavedPost(savedPost);
            } catch(error){
                location.href='http://127.0.0.1:5500/view/home.html';
            }

            btn_post_prf.classList.remove('active');
        })


    } catch(error){
        location.href='http://127.0.0.1:5500/view/home.html';
    }

})();

// ${url_img}/${userCur.avt.id}
// function renderMyPost();
function renderMyPost(posts){
    // console.log(posts);
    posts.sort((a, b) => b.id-a.id);
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
        editPost(e);
        savePost(e.id);
    })

    addEventForBtnComment(posts);
    sendComment(posts);


    const slide_item = document.querySelectorAll('.slider');
    slide_item.forEach(e => {
        buildSlider(e);
    });



    console.log("arrsavedpost:", arrSavedPost);

    document.querySelectorAll('.feed').forEach(e=> {
        addEventBtnEditBox(e);
        
        if(arrSavedPost.includes(e.id)){
            clickBtnSave(e);
        }
    })


    document.querySelectorAll('.feed').forEach(e=> {
        e.querySelector('.btn_save').style.display = 'none';
    })

}

function renderMySavedPost(posts){
    // console.log(posts);
    posts.sort((a, b) => b.id-a.id);
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
        editPost(e);
        savePost(e.id);
    })

    addEventForBtnComment(posts);
    sendComment(posts);


    const slide_item = document.querySelectorAll('.slider');
    slide_item.forEach(e => {
        buildSlider(e);
    });



    console.log("arrsavedpost:", arrSavedPost);

    document.querySelectorAll('.feed').forEach(e=> {
        addEventBtnEditBox(e);
        
        if(arrSavedPost.includes(e.id)){
            clickBtnSave(e);
        }
    })

    
}



// function render info in profile fage
function renderInfor(user) {
    const fullName = document.querySelector('.profile-card .fullName');
    const nickName = document.querySelector('.profile-card .nickname');
    const dob = document.querySelector('.profile-card .dob');
    const phone = document.querySelector('.profile-card .phone');
    const email = document.querySelector('.profile-card .email');

    document.querySelector('.create .profile-photo img').src = `${url_img}/${user.avt.id}`;
    document.querySelector('.create-post .profile-photo img').src = `${url_img}/${user.avt.id}`;

    // console.log(fullName, dob, phone, email);


    fullName.textContent = user.fullName;
    nickName.textContent = user.nickName;
    dob.textContent = user.dob;
    phone.textContent = user.phone;
    email.textContent = user.email;
    if(user.avt!=null){
        document.querySelector('.profile-card .avt').src = `${url_img}/${user.avt.id}`;
    } else{
        document.querySelector('.profile-card .avt').src = `${url_img}/${48}`;

    }
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

// copy from post.js
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


// ========== edit avt =======================
const avt = document.querySelector('.profile-card .avt');
const avt_change_btn = document.querySelector('.profile-card .change-avt');
const avt_input = document.querySelector('.profile-card #input-avt');

console.log(avt.src, avt_change_btn);
avt_input.addEventListener('change', async() => {

    // uploadFile(input_image.files[0]);
    const fd = new FormData();
    fd.append('file', avt_input.files[0]);
    

    // console.log("aut",localStorage.getItem('authorization')); 

    let h = new Headers();
    h.append('authorization', localStorage.getItem('authorization'));
    const res = await  fetch(url_img, {
        method: 'POST',
        headers: h,
        body: fd
    })

    
    const img = await res.json();
    avt.src = `${url_img}/${img.id}`;
    
    const updatedUser = {};
    updatedUser.id = currentUser.id;
    updatedUser.avt = img;

    let hh = new Headers();
    hh.append("Content-Type", "application/json");
    hh.append('authorization', localStorage.getItem('authorization'));
    const resp = await  fetch(`http://localhost:8081/api/users`, {
        method: 'PUT',
        headers: hh,
        body: JSON.stringify(updatedUser)
    })

    window.location.reload();

    const u = await resp.json();
    console.log("da update", u);

})



// ========= edit account ========================
const edit_account_menu_btn = document.querySelector(".btn_menu_edit_account");
const wrap_edit_account = document.querySelector('.wrap-edit-account');
const edit_account_close_btn = wrap_edit_account.querySelector('.edit-account-close-btn');
// const edit_user_name = wrap_edit_account.querySelectorAll('.edit-userName input');
const edit_password = wrap_edit_account.querySelectorAll('.edit-password input');
// const btn_edit_user_name = wrap_edit_account.querySelector(".btn-save-username");
const btn_edit_password = wrap_edit_account.querySelector(".btn-save-password");
// const error_edit_user_name =  wrap_edit_account.querySelector(".error-edit-userName");
const error_edit_password =  wrap_edit_account.querySelectorAll(".error-edit-password");
const noti_sucess = wrap_edit_account.querySelector('.noti-sucess');
edit_account_close_btn.addEventListener('click', () => {
    wrap_edit_account.style.display = 'none';
    noti_sucess.classList.add('none');
    edit_password.forEach(e => {
        e.value='';
    })
    error_edit_password.forEach(e => {
        e.textContent = '';
    })
})

edit_account_menu_btn.addEventListener('click', () => {
    wrap_edit_account.style.display = 'grid';
})

btn_edit_password.addEventListener('click', async() => {
    if(edit_password[0].value=='') error_edit_password[0].textContent="*Bắt buộc";
    else if(edit_password[1].value=='') error_edit_password[1].textContent="*Bắt buộc";
    else if(edit_password[2].value=='') error_edit_password[2].textContent="*Bắt buộc";

    else if(error_edit_password[0].textContent==''
        && error_edit_password[1].textContent==''
        && error_edit_password[2].textContent==''){
            const currPass = edit_password[0].value;
            const newPass = edit_password[1].value;

            let headers = new Headers();
            headers.append("Content-Type", "application/json");

            const urlLogin = "http://localhost:8081/api/login";

            const user = {};
            user.userName = currentUser.userName;
            user.password = currPass;
            console.log(user);
            const res = await  fetch(urlLogin, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: headers
            })
            const auth = await res.text();
            console.log(auth);
            if(auth=='Server Error'){
                error_edit_password[0].textContent="*Mật khẩu hiện tại không chính xác";
            }
            else{
                user.password = newPass;
                const res = await  fetch("http://localhost:8081/api/users", {
                    method: 'PUT',
                    headers: profileHeaders,
                    body: JSON.stringify(user)
                });

                noti_sucess.classList.toggle('none');
            }

    }
})

edit_password[0].addEventListener('focus', ()=>{
    error_edit_password[0].textContent="";
    noti_sucess.classList.add('none');
})
edit_password[1].addEventListener('focus', ()=>{
    error_edit_password[1].textContent="";
    noti_sucess.classList.add('none');

})
edit_password[2].addEventListener('focus', ()=>{
    error_edit_password[2].textContent="";
    noti_sucess.classList.add('none');
})

edit_password[0].addEventListener('blur', ()=>{
    if(edit_password[0].value=='') error_edit_password[0].textContent="*Bắt buộc";

})
edit_password[1].addEventListener('blur', ()=>{
    if(edit_password[1].value=='') error_edit_password[1].textContent="*Bắt buộc";

})
edit_password[2].addEventListener('blur', ()=>{
    if(edit_password[2].value=='') error_edit_password[2].textContent="*Bắt buộc";
    else if(edit_password[1].value!=edit_password[2].value){
        error_edit_password[2].textContent="*Nhắc lại mật khẩu không chính xác";
    }
})




// ================ logout ================
const btn_logout = document.querySelector('.btn_menu_logout');

btn_logout.addEventListener('click', () => {
    localStorage.removeItem('authorization');
    location.href='http://127.0.0.1:5500/view/home.html';
})














// =============== edit post ================
// ====== delete post ===========

function addEventBtnEditBox(feed){
    let btn_edit_box_post = feed.querySelector('.edit');
    let edit_box_post = feed.querySelector('.edit-box');
    let btn_delete_post = edit_box_post.querySelector('.btn_delete_post');
    
    // console.log(btn_delete_post);
    btn_edit_box_post.addEventListener('click', () => {
        edit_box_post.classList.toggle('none');
    })

    btn_delete_post.addEventListener('click', async() => {
        edit_box_post.classList.toggle('none');
        let id = feed.id.slice(1);
        // console.log(id);
        const res = await  fetch(`http://localhost:8081/api/posts/${id}`, {
            method: 'DELETE',
            headers: profileHeaders
        });
        // window.location.reload();
        feed.style.overflow="hidden";
        let height = 700;
        setInterval(() => {
            height -= 30;
            if(height<=0){
                height=0;  
                feed.style.display = 'none';
            } 
            feed.style.height = `${height}px`;
        }, 20);
    })
}








// =========== edit post  =============



function editPost(post){
    
    console.log(`edit${post.id}`);
    const btn_box_edit_post = document.getElementById(`edit${post.id}`);
    console.log(btn_box_edit_post);
    const wrap_new_post_edit = document.querySelector('.wrap-new-post-edit');
    const input_text = wrap_new_post_edit.querySelectorAll('input[type="text"]');
    const input_select = wrap_new_post_edit.querySelectorAll('select');
    const input_radio_room_type = wrap_new_post_edit.querySelectorAll('input[name="roomType"]');
    const input_radio_gender = wrap_new_post_edit.querySelectorAll('input[name="gender"]');
    const input_textarea = wrap_new_post_edit.querySelectorAll('textarea');

    const input_utilities = wrap_new_post_edit.querySelectorAll('.util-item');

    const view_images = wrap_new_post_edit.querySelector('.view-images');

    
    btn_box_edit_post.addEventListener('click', () => {
        addEventForEditBox(post);


        uploadImage(wrap_new_post_edit, post.images);

        wrap_new_post_edit.style.display='grid';

        input_select.forEach(e => {
            e.querySelector('option').textContent= post[e.name];
        })

        input_text.forEach(e=> {
            e.value = post[e.name];
        })

        input_textarea.forEach(e => {
            e.value = post[e.name];
        })



        input_radio_room_type.forEach(e => {
            if(e.value == post[e.name]){
                e.checked = true;
                e.closest('div').classList.add('active');
            }else{
                e.checked = false;
                e.closest('div').classList.remove('active');
            }
        });

        input_radio_gender.forEach(e => {
            if(e.value == post[e.name]){
                e.checked = true;
            } else{
                e.checked = false;
            }
        })

        input_utilities.forEach(e => {
            if(post[e.attributes[1].value] == 1 ){
                e.classList.add('active');
            } else{
                e.classList.remove('active');
            }
        })

    })

}