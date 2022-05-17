

// const urlPost = "http://localhost:8081/api/posts";
// const url_img = "http://localhost:8081/api/images";

const btn_open_form_new_post = document.querySelectorAll('.btn_new_post');
    
btn_open_form_new_post.forEach(ele => {
    ele.addEventListener('click', () => {
        console.log('click');
        addEventForNewBox();
    })
})

function addEventForNewBox(){
    const btn_pre = document.querySelector('.wrap-new-post .btn-pre');
    const btn_next = document.querySelector('.wrap-new-post .btn-next');
    const btn_cancel = document.querySelector('.wrap-new-post .btn-cancel');
    const wrap_new_post = document.querySelector('.wrap-new-post');
    const field_sets = wrap_new_post.querySelectorAll('.fieldset');
    const lis_in_progress_bar = wrap_new_post.querySelectorAll('.progress-bar li');
    
    const input_text = wrap_new_post.querySelectorAll('input[type="text"]');
    const input_select = wrap_new_post.querySelectorAll('select');
    const input_radio_room_type = wrap_new_post.querySelectorAll('input[name="roomType"]');
    const input_radio_gender = wrap_new_post.querySelectorAll('input[name="gender"]');
    const input_textarea = wrap_new_post.querySelectorAll('textarea');
    
    const input_utilities = wrap_new_post.querySelectorAll('.util-item');
    
    const view_images = wrap_new_post.querySelector('.view-images');
    
    wrap_new_post.style.display = 'grid';
    
    
    // ========== new post ============================

    const new_post_type_room = document.getElementsByName('roomType');
    console.log("select", new_post_type_room);
    new_post_type_room.forEach(e => {
        e.addEventListener('click', ()=> {
            new_post_type_room.forEach(i=>{
                i.closest("div").classList.remove('active');
            })

            e.closest("div").classList.toggle('active');
        })

    })

    // console.log(currentUser.roles[0]);
    if(currentUser.roles[0].name=='ROLE_LANDLORD'){
        // clg
        document.querySelector('.wrap-new-post .info-field h3').textContent = 'THÔNG TIN PHÒNG CHO THUÊ';
        document.querySelector('.wrap-new-post .new-type-room').style.display = 'none';
    }
    
    
    let images = [];
    
    
    input_utilities.forEach(e => {
        e.addEventListener('click', ()=>{
            e.classList.toggle('active');
            console.log(e.attributes[1].value);
        })
    })
    
    
    i = 0;
    field_sets[0].style.display = 'block';
    lis_in_progress_bar[0].classList.add('active');
    
    btn_cancel.addEventListener('click', () => {
        field_sets.forEach(fl => {
            fl.style.display = 'none';
        })
        lis_in_progress_bar.forEach(li => {
            li.classList.remove('active');
        })
        wrap_new_post.style.display = 'none';
        i=0;
    })

    
    btn_next.addEventListener('click', async() => {
        if(i<3){
            i++;
            if(i==3){
                btn_next.textContent = 'Đăng';
                btn_next.style.backgroundColor = "lightblue";
            }
            field_sets[i-1].style.display = 'none';
            field_sets[i].style.display = 'block';
            lis_in_progress_bar[i].classList.add('active');
    
        }
        else if(i==3){
    
            // get value
            const  newPst= {};
            input_select.forEach(e => {
                newPst[e.name] = e.options[e.selectedIndex].text;
                e.querySelector('option').selected = true;
            })
    
            input_text.forEach(e => {
                newPst[e.name] = e.value;
                e.value = '';
            })
    
            input_textarea.forEach(e => {
                newPst[e.name] = e.value;
                e.value = '';
            }) 
    
            if(currentUser.roles[0].name=='ROLE_LANDLORD'){
                newPst['topic']= {
                    name: 'CHO_THUE'
                }
                newPst['roomType'] = 'Phòng cho thuê';
            }

            input_radio_room_type.forEach(e => {
                if(e.checked){
                    newPst[e.name] = e.value;
                    e.checked = false;
                    if(e.value == 'Phòng cho thuê' && currentUser.roles[0]=='ROLE_TENANT'){
                        newPst['topic'] = {
                            name: "GIOI_THIEU"
                        }
                    }else if(e.value == 'Phòng cho thuê' && currentUser.roles[0]=='ROLE_LANDLORD'){
                        newPst['topic'] = {
                            name: "CHO_THUE"
                        }
                    }else if(e.value == 'Phòng ở ghép'){
                        newPst['topic'] = {
                            name: "TIM_NGUOI_O_GHEP"
                        }
                    }else if(e.value == 'Phòng nhượng lại'){
                        newPst['topic'] = {
                            name: "NHUONG_PHONG_TRO"
                        }
                    }
                }
            })
            input_radio_gender.forEach(e => {
                if(e.checked){
                    newPst[e.name] = e.value;
                    e.checked = false;
                }
            })
    
            input_utilities.forEach(e => {
                if(e.classList.contains('active')){
                    newPst[e.attributes[1].value] = "1";
                    e.classList.remove('active');
                }else{
                    newPst[e.attributes[1].value] = "0";
                }
            })
    
    
            // newPst['topic'] = {
            //     name : "Topic2"
            // }
            
            console.log("newpost", newPst);
    
            // call api
            let h = new Headers();
            h.append("Content-Type", "application/json");
            h.append('authorization', localStorage.getItem('authorization'));
            const res = await fetch("http://localhost:8081/api/posts", {
                method: 'POST',
                headers: h,
                body: JSON.stringify(newPst)
            })
    
            const newPost = await res.json();
            // add images
            await images.forEach(async(e) => {
                await fetch(`${url_img}/${newPost.id}`, {
                    method: 'PUT',
                    headers: h,
                    body: JSON.stringify(e)
                })
            })
    
            view_images.innerHTML = '';
    
            newPost.images = images;
            console.log(newPost);
            // refresh form new post
            i=0;
            field_sets.forEach(e => {
                e.style.display = 'none';  
            });
            field_sets[0].style.display = 'block';
            lis_in_progress_bar.forEach(e => {
                e.classList.remove('active');
            })
            lis_in_progress_bar[0].classList.add('active');
    
            wrap_new_post.style.display = 'none';
            renderNewPost(newPost);
        }
    })
    
    btn_pre.addEventListener('click', () => {
        if(i>0){
            i--;
            field_sets[i+1].style.display = 'none';
            field_sets[i].style.display = 'block';
            lis_in_progress_bar[i+1].classList.remove('active');
            lis_in_progress_bar[i].classList.add('active');
            btn_next.textContent = 'Next';
        }
    })
    
    
    // ==== upload images ==========
    
    const wrap_images_upload = document.querySelectorAll('.wrap-new-post .wrap-upload-image');
    wrap_images_upload.forEach(e => {
        uploadImage(e, images);
    })

}



// upload image 
function uploadImage(wrap_imgs, images){
    const btn_choose_image = wrap_imgs.querySelector('.wrap-upload-image .add-image');
    const input_image = wrap_imgs.querySelector('.wrap-upload-image .input-image');
    const view_images = wrap_imgs.querySelector('.view-images');
    console.log(input_image);
    
    btn_choose_image.addEventListener('click', () =>{
        console.log("abc", input_image.value);
    })
    
    console.log("image exit", images);
    view_images.innerHTML='';
    images.forEach(im =>{
        let html = `
        <div class="wrap-img">
            <img src="${url_img}/${im.id}" alt="">
            <span class="${im.id}"><i class="uil uil-times"></i></span>
        </div>
        `;
        view_images.insertAdjacentHTML('beforeend', html);
        let wrap_img = wrap_imgs.querySelector('.view-images .wrap-img:last-child'); 
        addEventForBtnDeleteImage(wrap_img, im, images);
    })

    


    input_image.addEventListener('change', async() => {
        
        let html = `
            <div class="wrap-img">
                <img src="../images/loading.png" alt="">
                <span><i class="uil uil-times"></i></span>
            </div>
        `;
    
        view_images.insertAdjacentHTML('beforeend', html);

        // uploadFile(input_image.files[0]);
        const fd = new FormData();
        fd.append('file', input_image.files[0]);
        
        let h = new Headers();
        h.append('authorization', localStorage.getItem('authorization'));
        const res = await  fetch(url_img, {
            method: 'POST',
            headers: h,
            body: fd
        })
    
        const img = await res.json();
        console.log('imgnnn', img);
        images.push(img);


        // add btn delete
        let wrap_img = wrap_imgs.querySelector('.view-images .wrap-img:last-child'); 
        await addEventForBtnDeleteImage(wrap_img, img, images);
    
    })
}


function addEventForBtnDeleteImage(wrap_img, img, images){
    
    const imgDom = wrap_img.querySelector('img');
    const btn_delete_img = wrap_img.querySelector('span');
    console.log(imgDom);
    btn_delete_img.id = `${img.id}`;
    imgDom.src = `${url_img}/${img.id}`;
    console.log(imgDom.src);

    btn_delete_img.addEventListener('click', ()=>{
        console.log("image cur", images);

        wrap_img.style.display = 'none';
        deleteImage(btn_delete_img.id);

        let images_tmp = []; 
        images.forEach((e,i) => {
            if(e.id!=btn_delete_img.id){
                images_tmp.push(e);
            }
        })

        console.log(images_tmp);
        images = images_tmp;
        console.log(images);

    })
}



// delete images 
async function deleteImage(imageId){
    console.log("iabc", imageId);
    let h = new Headers();
    h.append('authorization', localStorage.getItem('authorization'));
    const res = await  fetch(`${url_img}/${imageId}`, {
        method: 'DELETE',
        headers: h
    })
};

// reder new posts

function renderNewPost(e) {
    const feeds = document.querySelector('.middle .feeds');
    let html = feeds.innerHTML;
    html =   `
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
                <p>${e.houseNumber}, ${e.streetName}, ${e.streetName}, ${e.wards}, ${e.district}, ${e.province}</p>
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
        // ${html}
    // feeds.innerHTML = html;
    feeds.insertAdjacentHTML('afterbegin', html);
    
    const topice = feeds.querySelector('.feed:first-child .user .ingo small');
        
        if(e.topic.name=="CHO_THUE"){
            topice.textContent = `${topice.textContent} - Cho thuê nhà trọ`;
        }else if(e.topic.name=="GIOI_THIEU"){
            topice.textContent = `${topice.textContent} - Giới thiệu phòng trọ`;
        }else if(e.topic.name=="TIM_NGUOI_O_GHEP"){
            topice.textContent = `${topice.textContent} - Tìm người ở ghép`;
        }else if(e.topic.name=="NHUONG_PHONG_TRO"){
            topice.textContent = `${topice.textContent} - Nhượng phòng trọ`;
        }


    const utilities = feeds.querySelectorAll('.feed:first-child .util-room  .util-item');
    utilities.forEach(el => {
        if(e[el.attributes[1].value]==1)
        el.classList.add('active');
    });
    

    const genders = feeds.querySelectorAll('.feed:first-child .post-capacity img');
    if(e.gender=="Nam"){
        genders[1].style.display = "none";
    } else if(e.gender=="Nữ"){
        genders[0].style.display = "none";
    }

    const images_dot = feeds.querySelector('.feed:first-child .slider-dots');
    const images = feeds.querySelector('.feed:first-child .photo .slider-main');
    console.log([images]);
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

    upDownContentPost(e.id);
    addEventForBtnLike(e);
    addEventForBtnComment([e]);
    sendComment([e]);
    savePost(e.id);
    const slider = feeds.querySelector('.feed:first-child .slider');
    buildSlider(slider);
}








// ===== edit post =======
function addEventForEditBox(newPst_edit){
    
    const btn_pre_edit = document.querySelector('.wrap-new-post-edit .btn-pre');
    const btn_next_edit = document.querySelector('.wrap-new-post-edit .btn-next');
    const btn_cancel_edit = document.querySelector('.wrap-new-post-edit .btn-cancel');
    const wrap_new_post_edit = document.querySelector('.wrap-new-post-edit');
    // const btn_open_form_new_post_edit = document.querySelectorAll('.btn_new_post');
    const field_sets_edit = wrap_new_post_edit.querySelectorAll('.fieldset');
    const lis_in_progress_bar_edit = wrap_new_post_edit.querySelectorAll('.progress-bar li');
    
    const input_text_edit = wrap_new_post_edit.querySelectorAll('input[type="text"]');
    const input_select_edit = wrap_new_post_edit.querySelectorAll('select');
    const input_radio_room_type_edit = wrap_new_post_edit.querySelectorAll('input[name="roomType"]');
    const input_radio_gender_edit = wrap_new_post_edit.querySelectorAll('input[name="gender"]');
    const input_textarea_edit = wrap_new_post_edit.querySelectorAll('textarea');
    
    const input_utilities_edit = wrap_new_post_edit.querySelectorAll('.util-item');
    
    const view_images_edit = wrap_new_post_edit.querySelector('.view-images');
    
   
    
    
    input_utilities_edit.forEach(e => {
        e.addEventListener('click', ()=>{
            e.classList.toggle('active');
        })
    })
    
    
    let i_edit = 0;
    field_sets_edit[0].style.display = 'block';
    lis_in_progress_bar_edit[0].classList.add('active');
    
    btn_cancel_edit.addEventListener('click', () => {
        field_sets_edit.forEach(fl => {
            fl.style.display = 'none';
        })
        lis_in_progress_bar_edit.forEach(li => {
            li.classList.remove('active');
        })
        btn_next_edit.textContent = 'Next';
        field_sets_edit[0].style.display = 'block';
        lis_in_progress_bar_edit[0].classList.add('active');
        wrap_new_post_edit.style.display = 'none';
        i_edit=0;
    })
    
    
    btn_next_edit.addEventListener('click', async() => {
        if(i_edit<3){
            i_edit++;
            if(i_edit==3){
                btn_next_edit.textContent = 'Lưu';
                btn_next_edit.style.backgroundColor = "lightblue";
            }
            field_sets_edit[i_edit-1].style.display = 'none';
            field_sets_edit[i_edit].style.display = 'block';
            lis_in_progress_bar_edit[i_edit].classList.add('active');
    
        }
        else if(i_edit==3){
    
            // get value
            // newPst_edit.id = post.id;
            input_select_edit.forEach(e => {
                newPst_edit[e.name] = e.options[e.selectedIndex].text;
                e.querySelector('option').selected = true;
            })
    
            input_text_edit.forEach(e => {
                newPst_edit[e.name] = e.value;
                e.value = '';
            })
    
            input_textarea_edit.forEach(e => {
                newPst_edit[e.name] = e.value;
                e.value = '';
            }) 
    

            if(currentUser.roles[0].name=='ROLE_LANDLORD'){
                newPst_edit['topic']= {
                    name: 'CHO_THUE'
                }
                newPst_edit['roomType'] = 'Phòng cho thuê';
            }

            input_radio_room_type_edit.forEach(e => {
                if(e.checked){
                    newPst_edit[e.name] = e.value;
                    e.checked = false;
                    if(e.value == 'Phòng cho thuê' && currentUser.roles[0]=='ROLE_TENANT'){
                        newPst_edit['topic'] = {
                            name: "GIOI_THIEU"
                        }
                    }else if(e.value == 'Phòng cho thuê' && currentUser.roles[0]=='ROLE_LANDLORD'){
                        newPst_edit['topic'] = {
                            name: "CHO_THUE"
                        }
                    }else if(e.value == 'Phòng ở ghép'){
                        newPst_edit['topic'] = {
                            name: "TIM_NGUOI_O_GHEP"
                        }
                    }else if(e.value == 'Phòng nhượng lại'){
                        newPst_edit['topic'] = {
                            name: "NHUONG_PHONG_TRO"
                        }
                    }
                }
            })


            // input_radio_room_type_edit.forEach(e => {
            //     if(e.checked){
            //         newPst_edit[e.name] = e.value;
            //         e.checked = false;
            //     }
            // })
            input_radio_gender_edit.forEach(e => {
                if(e.checked){
                    newPst_edit[e.name] = e.value;
                    e.checked = false;
                }
            })
    
            input_utilities_edit.forEach(e => {
                if(e.classList.contains('active')){
                    newPst_edit[e.attributes[1].value] = "1";
                    e.classList.remove('active');
                }else{
                    newPst_edit[e.attributes[1].value] = "0";
                }
            })
    
    
            // newPst_edit['topic'] = {
            //     name : "Topic2"
            // }
            // newPst['authorUser'] = {
            //     id : 1
            // }
            console.log("newpost:", newPst_edit);
    
            // call api
            let h = new Headers();
            h.append("Content-Type", "application/json");
            h.append('authorization', localStorage.getItem('authorization'));
            const res = await fetch(`http://localhost:8081/api/posts/${newPst_edit.id}`, {
                method: 'PUT',
                headers: h,
                body: JSON.stringify(newPst_edit)
            })
    
            // const newPost_edit = await res.json();
            


            // add images
            let images_edit = [];
            view_images_edit.querySelectorAll('span').forEach( el => {
                let ig = {};
                ig.id = el.id;
                images_edit.push(ig);
            })

            await images_edit.forEach(async(e) => {
                await fetch(`${url_img}/${newPst_edit.id}`, {
                    method: 'PUT',
                    headers: h,
                    body: JSON.stringify(e)
                })
            })
    
            view_images_edit.innerHTML = '';
    
            newPst_edit.images = images_edit;
            console.log(newPst_edit);
            // refresh form new post
            i_edit=0;
            field_sets_edit.forEach(e => {
                e.style.display = 'none';  
            });
            field_sets_edit[0].style.display = 'block';
            lis_in_progress_bar_edit.forEach(e => {
                e.classList.remove('active');
            })
            lis_in_progress_bar_edit[0].classList.add('active');
    
            wrap_new_post_edit.style.display = 'none';
            // renderNewPost(newPst_edit);
            editPostDom(newPst_edit);
        }
    })
    
    
    btn_pre_edit.addEventListener('click', () => {
        if(i_edit>0){
            i_edit--;
            field_sets_edit[i_edit+1].style.display = 'none';
            field_sets_edit[i_edit].style.display = 'block';
            lis_in_progress_bar_edit[i_edit+1].classList.remove('active');
            lis_in_progress_bar_edit[i_edit].classList.add('active');
            btn_next_edit.textContent = 'Next';
        }
    })


}

function editPostDom(e){
    const feed = document.getElementById(`p${e.id}`);
    
    let html =   `
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
        `;
        // ${html}
    // feeds.innerHTML = html;
    // feeds.insertAdjacentHTML('afterbegin', html);
    feed.innerHTML = html;
    

    const topice = feed.querySelector('.user .ingo small');
        
    if(e.topic.name=="CHO_THUE"){
        topice.textContent = `${topice.textContent} - Cho thuê nhà trọ`;
    }else if(e.topic.name=="GIOI_THIEU"){
        topice.textContent = `${topice.textContent} - Giới thiệu phòng trọ`;
    }else if(e.topic.name=="TIM_NGUOI_O_GHEP"){
        topice.textContent = `${topice.textContent} - Tìm người ở ghép`;
    }else if(e.topic.name=="NHUONG_PHONG_TRO"){
        topice.textContent = `${topice.textContent} - Nhượng phòng trọ`;
    }

    const utilities = feed.querySelectorAll('.util-room  .util-item');
    utilities.forEach(el => {
        if(e[el.attributes[1].value]==1)
        el.classList.add('active');
    });

    const genders = feeds.querySelectorAll('.feed:last-child .post-capacity img');
    if(e.gender=="Nam"){
        genders[1].style.display = "none";
    } else if(e.gender=="Nữ"){
        genders[0].style.display = "none";
    }
    
    const images = feed.querySelector('.slider-main');
    console.log([images]);
    const img_html = e.images.map( img => {
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
    renderComment(e)
    upDownContentPost(e.id);

    addEventForBtnLike(e);
    addEventForBtnComment([e]);
    sendComment([e]);
    
    const slider = feed.querySelector('.slider');
    buildSlider(slider);
    // editPost(e);
    // window.location.reload();
}


// cop from profile

function editPost(post){
    
    // console.log(`edit${post.id}`);
    const btn_box_edit_post = document.getElementById(`edit${post.id}`);
    // console.log(btn_box_edit_post);
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
            console.log("eêe", post[e.name]);
            if(e.value == post[e.name]){
                e.checked = true;
                e.closest('div').classList.add('active');
            }else{
                e.checked = false;
                e.closest('div').classList.remove('active');
            }
        });

        if(currentUser.roles[0].name=='ROLE_LANDLORD'){
            // clg
            document.querySelector('.wrap-new-post-edit .info-field h3').textContent = 'THÔNG TIN PHÒNG CHO THUÊ';
            document.querySelector('.wrap-new-post-edit .new-type-room').style.display = 'none';
        }

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