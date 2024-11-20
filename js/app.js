gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Установка плавного прокручивания только для ПК
if (ScrollTrigger.isTouch !== 1) {
  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.5, // Плавность прокрутки
    effects: true // Включены эффекты
  });
} else {
  // Принудительное создание ScrollSmoother для мобильных устройств
  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.5,
    effects: true
  });
}

// Анимация для секции hero
gsap.fromTo('.hero-section', { opacity: 1 }, {
  opacity: 0,
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'center',
    end: '820',
    scrub: true,
    delay: ScrollTrigger.isTouch === 1 ? 0.3 : 0 // Задержка для мобильных устройств
  }
});

// Анимация для левых элементов галереи с улучшениями
let itemsL = gsap.utils.toArray('.gallery__left .gallery__item');
itemsL.forEach(item => {
  gsap.fromTo(item, { opacity: 0, x: -50 }, {
    opacity: 1, 
    x: 0,
    transformOrigin: "center",
    scrollTrigger: {
      trigger: item,
      start: '-850',
      end: '-100',
      scrub: true,
      onEnter: () => { 
        if (ScrollTrigger.isTouch === 1) {
          gsap.to(item, { opacity: 1, x: 0 });
        } else {
          gsap.to(item, { opacity: 1, x: 0, delay: 0.3 }); // Задержка для десктопов
        }
      }
    }
  });
});

// Анимация для правых элементов галереи с улучшениями
let itemsR = gsap.utils.toArray('.gallery__right .gallery__item');
itemsR.forEach(item => {
  gsap.fromTo(item, { opacity: 0, x: 50 }, {
    opacity: 1, 
    x: 0,
    transformOrigin: "center",
    scrollTrigger: {
      trigger: item,
      start: '-750',
      end: 'top',
      scrub: true,
      onEnter: () => { 
        if (ScrollTrigger.isTouch === 1) {
          gsap.to(item, { opacity: 1, x: 0 });
        } else {
          gsap.to(item, { opacity: 1, x: 0, delay: 0.3 }); // Задержка для десктопов
        }
      }
    }
  });
});

// Обновление ScrollTrigger с каждым кадром
gsap.ticker.add(() => {
  ScrollTrigger.update();
});

// Прелоадер и обновление ScrollTrigger после загрузки контента
document.addEventListener('DOMContentLoaded', function () {
  let images = document.images;
  let totalImages = images.length;
  let loadedImages = 0;

  // Функция для обновления процента загрузки
  function updateLoadingPercentage() {
    let percentage = Math.round((loadedImages / totalImages) * 100);
    document.getElementById('loading-percentage').textContent =
      percentage + '%';

    // Скрываем прелоадер, когда загрузка достигнет 100%
    if (loadedImages === totalImages) {
      document.getElementById('preloader').style.display = 'none';
      document.getElementById('content').style.display = 'block';

      // Принудительное обновление ScrollTrigger после скрытия прелоадера
      ScrollTrigger.refresh();
    }
  }

  // Если на странице нет изображений, скрываем прелоадер сразу
  if (totalImages === 0) {
    updateLoadingPercentage(); // Сразу показываем 100%
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('content').style.display = 'block';

    // Принудительное обновление ScrollTrigger
    ScrollTrigger.refresh();
  } else {
    // Слушаем событие загрузки для каждого изображения
    Array.from(images).forEach(function (img) {
      if (img.complete) {
        // Если изображение уже загружено
        loadedImages++;
        updateLoadingPercentage();
      } else {
        // События загрузки и ошибки для изображений
        img.addEventListener('load', function () {
          loadedImages++;
          updateLoadingPercentage();
        });
        img.addEventListener('error', function () {
          loadedImages++;
          updateLoadingPercentage();
        });
      }
    });
  }
});
