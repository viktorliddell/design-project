(function ($, undefined) {
  $(function () {
    $('.fullpage').fullpage({
      scrollOverflow: true,
      scrollOverflowOptions: {
        click: false
      },
      menu: '.menu',
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'lastPage'],
      afterRender: function () {
        $('.projects__last').html($('.projects__slides').length);
      },
      afterSlideLoad: function (section, origin, destination) {
        $('.projects__first').html(++destination.index);
      }
    });

    $(document).on('click', '.scroll-down', function () {
      fullpage_api.moveSectionDown();
    });

    $('.main-menu__link').on('click', closeMenu)
    $('.main-menu__btn').on('click', closeMenu)

    $(document).on('click', '.fixed__hamburger', openMenu);
    $(document).on('click', '.main-menu__close', closeMenu);
    $(document).on('click', '.projects__mini a', changeImg);
    $(document).on('input', '.calc', changeInput);

    function changeImg(event) {
      event.preventDefault();
      $('.projects__big img').attr('src', $(this).attr('data-src'));
    }

    function changeInput(event) {
      event.preventDefault();
      $(this).find('.calc__range output').val($(this).find('.calc__range input').val());
    }

    function openMenu(event) {
      $('.main-menu').addClass('main-menu--active');
    }

    function closeMenu(event) {
      $('.main-menu').removeClass('main-menu--active');
    }

    // Калькулятор
    $('.calculator__form').find('input').on('input', function() {
      var price = 5000

      var building = $('input[name=building]:checked').val()
      var location = $('input[name=location]:checked').val()
      var type = $('input[name=type]:checked').val()
      var range = $('.calc__range input').val()

      if ($('.calc__range').css('display') == 'none') {
        range = $('.calc__square').val()
      }

      var result = price * building * location * type * range

      $('.calc__result').find('span').text(result)
    })

    // Открытые модального окна
    $('.fixed__btn, .main-menu__btn').on('click', function() {
      $('.modal').css('display', 'block')
    })

    // Закрытие модального окна
    $('.modal__close').find('a').on('click', function() {
      $('.modal').css('display', 'none')
    })

    // Проверка инпута имени на пустоту
    $('.rf').each(function() {
      // Объявляем переменные (форма и кнопка отправки)
      var form = $(this),
        btn = form.find('.form__submit')

      // Добавляем каждому проверяемому полю, указание что поле пустое
      form.find('.rfield').addClass('empty_field')

      // Функция проверки полей формы
      function checkInput() {
        form.find('.rfield').each(function () {
          if ($(this).val() != '' && $(this).val().length >= 3) {
            // Если поле не пустое удаляем класс-указание
            $(this).removeClass('empty_field');
          } else {
            // Если поле пустое добавляем класс-указание
            $(this).addClass('empty_field');
          }
        })
      }

      // Проверка в режиме реального времени
      setInterval(function () {
        // Запускаем функцию проверки полей на заполненность
        checkInput()
        // Считаем к-во незаполненных полей
        var sizeEmpty = form.find('.empty_field').length
        // Вешаем условие-тригер на кнопку отправки формы
        if (sizeEmpty > 0) {
          if (btn.hasClass('form__disabled')) {
            return false
          } else {
            btn.addClass('form__disabled')
          }
        } else {
          btn.removeClass('form__disabled')
        }
      }, 500)

      // Отправка формы
      form.submit(function() {
        var form_data = $(this).serialize()

          $.ajax({
            type: 'POST',
            url: 'send.php',
            data: form_data,
            success: function() {
              $('.modal').css({
                'display': 'none'
              })
            },
            error: function() {
              $('.modal').css({
                'display': 'none'
              })
            }
          })
        
        form.find('.rfield').each(function() {
          $(this).val('')
        })

        return false
      })
    })
  })
})(jQuery);