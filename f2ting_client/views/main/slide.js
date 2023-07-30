const images = document.querySelectorAll('.slider span');
const sliderContainer = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.leftBtn');
const nextBtn = document.querySelector('.rightBtn');

let current = 0;
const imgSize = images[0].clientWidth;

slider.style.transform = `translateX(${-imgSize * current}px)`;

const goToSlide = (index) => {
    if (index < 0 || index >= images.length) return;
    current = index;
    slider.style.transition = '400ms ease-in-out transform';
    slider.style.transform = `translateX(${-imgSize * current}px)`;
}

prevBtn.addEventListener('click',()=>{
    goToSlide(current - 1);
});

nextBtn.addEventListener('click',()=>{
    goToSlide(current + 1);
});

slider.addEventListener('transitionend', ()=> {
    if (current === images.length - 1) {
       slider.style.transition = 'none';
       current = 0;
       slider.style.transform = `translateX(${-imgSize * current}px)`;
    } else if (current === 0) {
       slider.style.transition = 'none';
       current = images.length - 1;
       slider.style.transform = `translateX(${-imgSize * current}px)`;
    }
});

// 하단바
const dots = document.querySelectorAll('.slider-container ul p');

const activateDot = (index) => {
   dots.forEach(dot => dot.classList.remove('active'));
   if (index >= 0 && index < dots.length) {
       dots[index].classList.add('active');
   }
}

dots.forEach((dot, index) => {
   dot.addEventListener('click', () => {
       goToSlide(index);
   })
})

activateDot(current);

let auto = setInterval(() => {
    goToSlide(current + 1);
}, 3000);

sliderContainer.addEventListener('mouseleave', ()=>{
    auto = setInterval(() => {
        goToSlide(current + 1);
    }, 3000);
});

sliderContainer.addEventListener('mouseenter', ()=>{
    clearInterval(auto);
});