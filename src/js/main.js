import $ from '../local_modules/jquery/dist/jquery.min'
import focusVisible from 'focus-visible'
import '../local_modules/inputmask/dist/inputmask.min.js'
import '../local_modules/just-validate/dist/js/just-validate.min'
import Swiper, { Navigation, Pagination } from 'swiper'


Swiper.use([Navigation, Pagination])


$(document).ready(() => {
  // eslint-disable-next-line no-console
  console.log('added focus visible', focusVisible)

  const reviewsSwiper = new Swiper('.reviews__swiper', {
    slidesPerView: 1,
    spaceBetween: 32,
    navigation: {
      nextEl: '.reviews__next',
      prevEl: '.reviews__prev',
    },
    pagination: {
      el: '.reviews__pagination',
      type: 'bullets',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
        slidesPerGroup: 2,
      },
      1152: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      }
    },
  })

  const phoneNumber = $('.form-feedback__input--tel')
  const phoneMask = new Inputmask({
    mask: '+7 (999)-999-99-99',
    showMaskOnHover: false,
  })
  phoneMask.mask(phoneNumber)
  new JustValidate('.form-feedback', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 10,
        strength: {
          custom: '^[A-zА-яЁё]+$'
        }
      },
      tel: {
        required: true,
        function: () => {
          const phone = phoneNumber[0].inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
      confirm: {
        required: true,
      }
    },

    messages: {
      name: {
        minLength: 'Минимальное количество символов в имени: 2',
        maxLength: 'Максимальное количество символов в имени: 10',
        required: 'Как вас зовут?',
        strength: 'Используйте только буквы'
      },
      tel: {
        required: 'Укажите ваш телефон',
        function: 'Неверный номер телефона',
      },
      confirm: {
        required: 'Мы можем не отправить данные без вашего согласия'
      },
    },

    colorWrong: 'red'
  })

  $('.burger').click(function () {
    $(this).toggleClass('active')
    $('.header').toggleClass('menu-opened')
  })

  $('.nav__item').click(function () {
    $('.burger').removeClass('active')
    $('.header').removeClass('menu-opened')
  })

  $(window).resize(() => {
    reviewsSwiper()
  })

  $('.faq__title').click(function () {
    if ($('.faq__list').hasClass('one')) {
      $('.faq__title').not($(this)).removeClass('active')
      $('.faq__answer').not($(this).next()).slideUp(300)
    }
    $(this).toggleClass('active').next().slideToggle(300)
  })

  $('.form-feedback__input').focus(function () {
    $(this).siblings('.form-feedback__placeholder').addClass('form-feedback__placeholder--dirty')
  })

  $('.form-feedback__input').blur(function () {
    if (!$(this).val()) {
      $(this).siblings('.form-feedback__placeholder').removeClass('form-feedback__placeholder--dirty')
    }
  })
})
