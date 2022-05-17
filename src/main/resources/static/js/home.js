window.addEventListener('scroll', autoLoadPost);

function autoLoadPost(){
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && end==0){
        renderPost();
    }
}


var currentUser = null;
let headers = new Headers();
headers.append("Content-Type", "application/json");
const urlPost = "http://localhost:8081/api/posts";
const url_img = "http://localhost:8081/api/images";
var currentPage = -1;
var size = 3;
var end = 0;
var feeds = null;

(async() => {
    feeds = document.querySelector('.feeds');
    console.log(feeds);
    await renderPost();
})();






async function renderPost(){
    currentPage++;
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
        // console.log([images]);
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
        
        renderComment(e, currentUser)


        // const btn_like = feeds.querySelector('.feed:last-child .btn-heart');
        // if(currentUser!=null){
        //     currentUser.likedPosts.forEach(p => {
        //         if(p.id==e.id){
        //             btn_like.classList.add('fa');
        //             btn_like.classList.add('fa-heart');
        //             btn_like.classList.remove('uil');
        //             btn_like.classList.remove('uil-heart');
        //         }
        //     }) 
        // }
       
    });
    
    posts.forEach(e => {
        upDownContentPost(e.id);
        addEventForBtnLike(e);
        savePost(e.id);
    })

    await addEventForBtnComment(posts);
    // await sendComment(posts);


    const slide_item = document.querySelectorAll('.slider');
    slide_item.forEach(e => {
        buildSlider(e);
    })

    
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