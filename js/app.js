gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Установка плавного прокручивания только для ПК
if (ScrollTrigger.isTouch !== 1) {
  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.5, // Плавность прокрутки
    effects: true // Включены эффекты
  });
}

// Анимация для секции hero
gsap.fromTo('.hero-section', { opacity: 1 }, {
  opacity: 0,
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'center',
    end: '820',
    scrub: true
  }
});

// Анимация для левых элементов галереи с проверкой на мобильные устройства
let itemsL = gsap.utils.toArray('.gallery__left .gallery__item');
itemsL.forEach(item => {
  gsap.fromTo(item, { opacity: 0, x: -50 }, {
    opacity: 1, x: 0,
    scrollTrigger: {
      trigger: item,
      start: '-850',
      end: '-100',
      scrub: true,
      // Ограничение анимации на мобильных устройствах
      onEnter: () => { if (ScrollTrigger.isTouch === 1) gsap.to(item, { opacity: 1, x: 0 }); }
    }
  });
});

// Анимация для правых элементов галереи с проверкой на мобильные устройства
let itemsR = gsap.utils.toArray('.gallery__right .gallery__item');
itemsR.forEach(item => {
  gsap.fromTo(item, { opacity: 0, x: 50 }, {
    opacity: 1, x: 0,
    scrollTrigger: {
      trigger: item,
      start: '-750',
      end: 'top',
      scrub: true,
      // Ограничение анимации на мобильных устройствах
      onEnter: () => { if (ScrollTrigger.isTouch === 1) gsap.to(item, { opacity: 1, x: 0 }); }
    }
  });
});
