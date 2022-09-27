# Mạng xã hội thuê và cho thuê nhà trọ

## 1. Ý tưởng cho hệ thống
- Lý do chọn đề tài: Nhà trọ luôn là vấn đề mà các sinh viên đi học xa nhà phải lo lắng. Việc tìm được một nhà trọ
đáp ứng được nhu cầu cá nhân, tìm bạn ở ghép, nhượng lại phòng trọ,…đều là những việc tốn rất nhiều thời gian và 
công sức, đôi khi còn không thực hiện được. Do đó mình muốn xây dựng một trang mạng xã hội giúp đỡ mọi người giải 
quyết những vấn đề xoay quanh chủ đề nhà trọ.

- Mục tiêu: Xây dựng một trang mạng xã hội để mọi người tham gia có thể giới thiệu những nhà trọ mình biết hoặc 
mình có, chia sẻ, trao đổi hỗ trợ nhau giải quyết nhu cầu cá nhân về vấn đề nhà trọ.


## 2. Các chức năng cơ bản của hệ thống

a. Chức năng chung:
+ Đăng ký tài khoản, đăng nhập, đăng xuất.
+ Quản lý thông tin cá nhân.
+ Quản lý các bài viết trên trang cá nhân của mình.
+ Yêu thích, bình luận các bài viết.

b. Chủ nhà trọ:
+ Đăng các bài viết giới thiệu, tìm người cho thuê nhà trọ của mình.

c. Người thuê trọ:
+ Đăng các bài viết với chủ để: giới thiệu nhà trọ, tìm người ở ghép, nhượng phòng trọ.
+ Tìm kiếm, theo dõi các tài khoản chủ nhà trọ.
+ Tìm kiếm các bài viết chủ đề: giới thiệu cho thuê, tìm người ở ghép, nhượng phòng, theo các tiêu chí như: địa điểm, mức giá,…
+ Lưu các bài viết có nội dung hữu ích với nhu cầu của mình.



## 3. Công nghệ sử dụng
+ Frontend: HTML, CSS, Javascript (có sử dụng một mã nguồn mở link ở mục 6)
+ Backend: Spring boot, Spring Data JPA, Mysql, websocket



## 4. Một số biểu đồ trong quá trình phân tích thiết kế hệ thống

a. Lược đồ use case cho từng đối tượng

<img width="500" alt="image" src="https://user-images.githubusercontent.com/85030010/192330836-509bd3a3-be96-4afe-9829-aee35dc00b40.png">

<img width="500" alt="image" src="https://user-images.githubusercontent.com/85030010/192331207-3d6e7b1f-a741-4b10-8195-461706bd4fea.png">

<img width="500" alt="image" src="https://user-images.githubusercontent.com/85030010/192331303-7ede75af-54b4-4faf-a175-de1e1770d8e4.png">

b. Mối quan hệ giữa các thực thể

<img width="500" alt="image" src="https://user-images.githubusercontent.com/85030010/192323989-743a7dc5-6799-44f6-86cf-978007d306ae.png">

<img width="500" alt="image" src="https://user-images.githubusercontent.com/85030010/192325666-2450d08b-ca6a-4bbc-a5ae-fbbd49b79b7a.png">

c. Lược đồ ER

<img width="500" alt="image" src="https://user-images.githubusercontent.com/85030010/192326129-b10d71b7-f5f5-493b-a4e6-90ce3964e99c.png">

<img width="500" alt="image" src="https://user-images.githubusercontent.com/85030010/192326399-ff99cca8-1c6e-4c11-987c-a8d3bda0ad2b.png">

d. Lược đồ EER

<img width="500" alt="image" src="https://user-images.githubusercontent.com/85030010/192326520-bf57e513-204d-43d5-9d71-6fa9fb03e700.png">



## 5. Video demo project

link: https://drive.google.com/file/d/12v_chMVjZ4N4rBkq2SdlFwbqn6rteKbT/view?usp=sharing


## 6. Kết quả đã và chưa đạt được

a. Kết quả đã đạt được:
+ Hoàn thành môi trường riêng cho từng 3 đối tượng chính: người thuê trọ, chủ nhà trọ, người tìm kiếm nhà trọ.
+ Hoàn thành một số chức năng cơ bản của mạng xã hội: đăng bài, yêu thích, trò chuyện.
+ Hoàn thành các tính năng riêng cho mục đích tìm kiếm nhà trọ: lưu tin, tìm kiếm nhanh, tìm kiếm chi tiết.

b. Kết quả chưa đạt được:
+ Chức năng tìm kiếm chi tiết chưa hoàn thiện được 100% ở khía cạnh tìm kiếm theo địa chỉ.



## 7. Một số link tham khảo trong quá trình tạo project
+ Giao diện (sử dụng mã nguồn mở) https://www.youtube.com/watch?v=AiFfDjmd0jU&list=WL&index=17&t=301s 
+ Socket: https://www.callicoder.com/spring-boot-websocket-chat-example/
   https://github.com/JayaramachandranAugustin/ChatApplication
+ Spring security + JWT: https://www.bezkoder.com/spring-boot-jwt-authentication/
+ Upload file: https://www.callicoder.com/spring-boot-file-upload-download-rest-api-example/

