  window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
  });





gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

if (ScrollTrigger.isTouch === 1) {
  // Настройки для сенсорных устройств (телефонов)
  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 0.8, // Уменьшена плавность на телефонах для производительности
    effects: false // Отключены эффекты на мобильных
  });
} else {
  // Настройки для устройств с мышью (десктопы)
  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.5, // Плавность для десктопов
    effects: true // Эффекты включены
  });

  gsap.fromTo('.hero-section', { opacity: 1 }, {
    opacity: 0,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'center',
      end: '820',
      scrub: true
    }
  });

  // Анимация для левых элементов галереи
  let itemsL = gsap.utils.toArray('.gallery__left .gallery__item');
  itemsL.forEach(item => {
    gsap.fromTo(item, { opacity: 0, x: -50 }, {
      opacity: 1, x: 0,
      scrollTrigger: {
        trigger: item,
        start: '-850',
        end: '-100',
        scrub: true
      }
    });
  });

  // Анимация для правых элементов галереи
  let itemsR = gsap.utils.toArray('.gallery__right .gallery__item');
  itemsR.forEach(item => {
    gsap.fromTo(item, { opacity: 0, x: 50 }, {
      opacity: 1, x: 0,
      scrollTrigger: {
        trigger: item,
        start: '-750',
        end: 'top',
        scrub: true
      }
    });
  });
}


