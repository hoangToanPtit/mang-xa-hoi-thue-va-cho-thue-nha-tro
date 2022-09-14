let headers = new Headers();
headers.append("Content-Type", "application/json");

const urlLogin = "http://localhost:8081/api/login";
const urlInfo = "http://localhost:8081/api/profiles";

const form_login = document.querySelector('.login');
const userName = form_login.querySelector('input[name="username"]');
const password = form_login.querySelector('input[name="pass"]');
const btn_login = form_login.querySelector('input[name="btn_login"]');

console.log(btn_login);


btn_login.addEventListener('click', async() => {
    const user = {};
    user.userName = userName.value;
    user.password = password.value;
    console.log(user);
    const res = await  fetch(urlLogin, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: headers
    })
    const auth = await res.text();
    console.log(auth);
    if(auth=="Server Error"){
		document.querySelector('.err').style.display='block';
	
	}
    
    if(auth!='Server Error'){
        localStorage.setItem('authorization', auth);
        headers.append('authorization', auth);
        const resp = await  fetch(urlInfo, {
            method: 'GET',
            headers: headers
        })

        const user = await resp.json();
        /*console.log(user);*/
        
        
        location.href='http://localhost:8081/home';
    }
})
