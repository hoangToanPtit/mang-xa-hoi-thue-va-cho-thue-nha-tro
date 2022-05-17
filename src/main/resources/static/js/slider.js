

function buildSlider(slider) {
    // const slider = slider.querySelector(".slider");
    const sliderMain = slider.querySelector('.slider-main');
    const sliderItems = slider.querySelectorAll('.slider-item');
    const nextBtn = slider.querySelector('.slider-next');
    const preBtn = slider.querySelector('.slider-prev');
    const dotItem = slider.querySelectorAll('.slider-dot-item');
    const sliderItemWidth = 588;
    const slideLength = sliderItems.length;

    let positionX = 0;
    let index = 0;
    // sliderMain.style.width = `${slideLength*sliderItemWidth}px`;

    nextBtn.addEventListener('click', () =>{
        // console.log("nextttttt");
        if(index<slideLength-1){
            index++;
            positionX -= sliderItemWidth;
        }else{
            index=0;
            positionX = 0;
        }
        removeActiveDot();
        dotItem[index].classList.add("active");
        sliderMain.style = `transform: translateX(${positionX}px)`;

    });
    preBtn.addEventListener('click', () => {
        if(index>0){
            index--;
            positionX += sliderItemWidth;
        }else{
            index = slideLength-1;
            positionX = -index*sliderItemWidth
        }
        removeActiveDot();
        dotItem[index].classList.add("active");
        sliderMain.style = `transform: translateX(${positionX}px)`;
    });

    dotItem.forEach(item => {
        // console.log(item.classList.value);
        item.addEventListener('click', (e)=> {
            removeActiveDot();
            e.target.classList.add("active");
            const idx = e.target.dataset.index;
            // console.log(idx);
            index=idx;
            positionX = -idx*sliderItemWidth;
            sliderMain.style = `transform: translateX(${positionX}px)`;
        })
    })

    function removeActiveDot(){
        dotItem.forEach(d => {
            d.classList.remove("active");
        })
    }

}
