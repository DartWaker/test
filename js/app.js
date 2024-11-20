gsap.registerPlugin(ScrollTrigger);

// Убираем ScrollSmoother на мобильных устройствах для повышения производительности
if (ScrollTrigger.isTouch !== 1) {
  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.5, // Плавность прокрутки для ПК
    effects: true // Включаем эффекты для ПК
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Дожидаемся полной загрузки контента
  window.onload = () => {
    // Анимация для секции hero
    gsap.fromTo('.hero-section', { opacity: 1 }, {
      opacity: 0,
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'center',
        end: 'bottom',
        scrub: true
      }
    });

    // Упрощенная анимация для левых элементов галереи
    let itemsL = gsap.utils.toArray('.gallery__left .gallery__item');
    itemsL.forEach(item => {
      gsap.fromTo(item, { opacity: 0, x: -30 }, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',  // Элемент должен появляться, когда он появляется на экране
          end: 'top center',
          scrub: true,
          // Убираем задержку при первом скролле
          onEnter: () => {
            if (ScrollTrigger.isTouch !== 1) {
              gsap.to(item, { opacity: 1, x: 0 });
            }
          },
          // Убираем исчезновение при выходе с экрана
          onLeave: () => {
            if (ScrollTrigger.isTouch !== 1) {
              gsap.to(item, { opacity: 1, x: 0 });  // Не скрываем элемент
            }
          }
        }
      });
    });

    // Упрощенная анимация для правых элементов галереи
    let itemsR = gsap.utils.toArray('.gallery__right .gallery__item');
    itemsR.forEach(item => {
      gsap.fromTo(item, { opacity: 0, x: 30 }, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',  // Элемент должен появляться, когда он появляется на экране
          end: 'top center',
          scrub: true,
          // Убираем задержку при первом скролле
          onEnter: () => {
            if (ScrollTrigger.isTouch !== 1) {
              gsap.to(item, { opacity: 1, x: 0 });
            }
          },
          // Убираем исчезновение при выходе с экрана
          onLeave: () => {
            if (ScrollTrigger.isTouch !== 1) {
              gsap.to(item, { opacity: 1, x: 0 });  // Не скрываем элемент
            }
          }
        }
      });
    });

    // Инициализация ScrollTrigger на старте для ускорения первой загрузки
    ScrollTrigger.refresh();

    // Убираем лишние обновления ScrollTrigger, чтобы улучшить производительность
    // gsap.ticker.add(() => {
    //   ScrollTrigger.update();
    // });

    // Функция для обновления процента загрузки
    let images = document.images;
    let totalImages = images.length;
    let loadedImages = 0;

    function updateLoadingPercentage() {
      let percentage = Math.round((loadedImages / totalImages) * 100);
      document.getElementById('loading-percentage').textContent =
        percentage + '%';

      // Скрываем прелоадер, когда загрузка достигнет 100%
      if (loadedImages === totalImages) {
        document.getElementById('preloader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
      }
    }

    // Если на странице нет изображений, скрываем прелоадер сразу
    if (totalImages === 0) {
      updateLoadingPercentage(); // Сразу показываем 100%
      document.getElementById('preloader').style.display = 'none';
      document.getElementById('content').style.display = 'block';
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
  };
});
