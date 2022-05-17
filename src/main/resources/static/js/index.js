// SIDE BAR 
const menuItems = document.querySelectorAll('.menu-item');

//  Messages
const messagesNotification = document.querySelector('#messages-notification');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

// Theme
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span')
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const bg1 = document.querySelector('.bg-1');
const bg2 = document.querySelector('.bg-2');
const bg3 = document.querySelector('.bg-3');

// ====================== SIDE BAR ========================
// remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', async() => {
        changeActiveItem();
        item.classList.add('active');

        if(item.id != 'notifications'){
            document.querySelector('.notifications-popup').classList.add('none');
        } else {
            let h = new Headers();
            h.append("Content-Type", "application/json");
            h.append('authorization', localStorage.getItem('authorization'));

            const res = await fetch(`http://localhost:8081/api/notifications`, {
                method: 'DELETE',
                headers: h
            })
            document.querySelector('.notifications-popup').classList.remove('none');
            document.querySelector('#notifications .notification-count').textContent = "0";
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})

// ====================== Message ========================
// searches chats
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(chat => {
        let name = chat.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            chat.style.display = 'flex';
        } else {
            chat.style.display = 'none';
        }
    })
}


// search chat
messageSearch.addEventListener('keyup', searchMessage);



// hightlight messages card when message menu item is clicked
if(messagesNotification!=null){
    messagesNotification.addEventListener('click', () => {
        
        messages.style.boxShadow = '0 0 1rem var(--color-primary)';
        messagesNotification.querySelector('.notification-count').style.display = 'none';
        setTimeout(() => {
            messages.style.boxShadow = 'none';
        }, 2000)
    
    })

}

const btn_quick_search_menu = document.querySelector('.menu-quick-search-item');
let quick_search_box_idx = document.querySelector('.quick-search');
if(btn_quick_search_menu!=null){
    btn_quick_search_menu.addEventListener('click', ()=>{
        // let quick_search_box = document.querySelector('.quick-search');
        quick_search_box_idx.style.boxShadow = '0 0 1rem var(--color-primary)';
    })
}

const btn_menu = document.querySelectorAll('.sidebar .menu-item');
btn_menu.forEach(e => {
    // console.log(e.classList.value());
    if(!e.classList.value.includes('menu-quick-search-item')){
        e.addEventListener('click', ()=>{
            quick_search_box_idx.style.boxShadow = '0 0 0rem var(--color-primary)';
        })
    }
})

//===================================== THEME/DISPLAY CUSTOMIZATION

// opend modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';

}

// close modal
const closeThemeModal = (e) => {
    if(e.target.classList.contains('customize-theme')){
        themeModal.style.display = 'none';
    }
}

// close modal
themeModal.addEventListener('click', closeThemeModal);

theme.addEventListener('click', openThemeModal);




// ====================Fonts========================

// remove active class from spans or font size selectors
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}

fontSizes.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');

        if(size.classList.contains('font-size-1')){
            fontSize = '10px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '5.4rem');
        } else if(size.classList.contains('font-size-2')){
            fontSize = '13px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '-7rem');
        } else if(size.classList.contains('font-size-3')){
            fontSize = '16px';
            root.style.setProperty('----sticky-top-left', '-2rem');
            root.style.setProperty('----sticky-top-right', '-17rem');
        } else if(size.classList.contains('font-size-4')){
            fontSize = '19px';
            root.style.setProperty('----sticky-top-left', '-5rem');
            root.style.setProperty('----sticky-top-right', '-25rem');
        } else if(size.classList.contains('font-size-5')){
            fontSize = '22px';
            root.style.setProperty('----sticky-top-left', '12rem');
            root.style.setProperty('----sticky-top-right', '-35rem');
        }
        // change font size of the root html element
        document.querySelector('html').style.fontSize = fontSize;
    })

})

// remove active class from colors
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

// change primary colors 
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primaryHue;
        changeActiveColorClass();

        if(color.classList.contains('color-1')){
            primaryHue = 252;
        } else if(color.classList.contains('color-2')){
            primaryHue = 52;
        } else if(color.classList.contains('color-3')){
            primaryHue = 352;
        } else if(color.classList.contains('color-4')){
            primaryHue = 152;
        } else if(color.classList.contains('color-5')){
            primaryHue = 202;
        }
        color.classList.add('active');

        root.style.setProperty('--primary-color-hue', primaryHue);
    })

})


// change background
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// change background color
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

bg1.addEventListener('click', () => {
    bg1.classList.add('active');
    bg2.classList.remove('active');
    bg3.classList.remove('active');
    window.location.reload();
})
bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    bg2.classList.add('active');
    bg1.classList.remove('active');
    bg3.classList.remove('active');
    changeBG();
})
bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    bg3.classList.add('active');
    bg1.classList.remove('active');
    bg2.classList.remove('active');
    changeBG();
})






