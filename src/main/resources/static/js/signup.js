const url_sign_up = "http://localhost:8081/api/signup";
const headers = new Headers();
headers.append("Content-Type", "application/json");

const err = document.querySelectorAll('.err');
const input_el = document.querySelectorAll('input');
const btn_role = document.querySelectorAll('.select-role div');

input_el.forEach((e, i) => {
  if(i>=6) return;
  e.addEventListener('blur', ()=>{
    if(e.value ==''){
      err[i].textContent = "*Bắt buộc";
    }
  })
  e.addEventListener('focus', () => {
    err[i].textContent = "";
  })
});

input_el[5].addEventListener('blur', () => {
  if(input_el[5].value!="" && input_el[5].value!=input_el[4].value){
    err[5].textContent="*Nhắc lại mật khẩu không chính xác"
  }
  else if (input_el[5].value!="" && input_el[5].value==input_el[4].value){
    err[5].textContent=""
  }
})


input_el[6].addEventListener('click', async() => {
  if(checkSignUP()==0){
    const user = {};
    user.fullName = input_el[0].value;
    user.dob = input_el[1].value;
    user.email = input_el[2].value;
    user.userName = input_el[3].value;
    user.password = input_el[4].value;
    user.avt = {
      id : 1
    }
    if(btn_role[0].classList.value.includes('active')){
      user.roles = [{name: "ROLE_LANDLORD"}];
    }
    if(btn_role[1].classList.value.includes('active')){
      user.roles = [{name: "ROLE_TENANT"}];
    }

    console.log(user);

    const res = await  fetch(url_sign_up, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(user)
    })

    const newUser = await res.json();
    console.log(newUser);

    if(newUser.status!=null){
      console.log(newUser.status);
      err[3].textContent = "*Tên đăng nhập đã tồn tại";
    }else{
      location.href='http://127.0.0.1:5500/view/login.html';
    }

  }
})


function checkSignUP(){
  let bl = 0;
  err.forEach(e => {
    if(e.textContent !== ''){
      bl=1;
    } 
  })

  input_el.forEach(e => {
    if(e.value == '') bl=1
  })

  if(!btn_role[0].classList.value.includes('active') 
    && !btn_role[1].classList.value.includes('active')){
      bl=1
      err[6].textContent = "*Bắt buộc";
    } else{
      err[6].textContent = "";
    }

  return bl;
} 

btn_role.forEach(e => {
  e.addEventListener('click', () => {
    btn_role.forEach(el=> {
      el.classList.remove('active');
    })
    e.classList.toggle('active');
  })
})