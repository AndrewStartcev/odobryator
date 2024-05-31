$(function () {
  $("#slider-range-contribution").slider({
    range: "min",
    value: 5000,
    min: 1000,
    max: 100000,
    step: 1000,
    slide: function (event, ui) {
      contribution = ui.value;
      $("#contribution").val(ui.value.toLocaleString('ru-RU') + ' ₽');
    }
  });
  $("#slider-range-time").slider({
    range: "min",
    value: 14,
    min: 7,
    max: 365,
    step: 1,
    slide: function (event, ui) {
      time = ui.value;
      $("#time").val(ui.value + ' дней');
    }
  });
  $("#contribution").val($("#slider-range-contribution").slider("value").toLocaleString('ru-RU') + ' ₽');
  $("#time").val($("#slider-range-time").slider("value") + ' дней');



  // Проверка наличия поля "Серия и номер паспорта" и применение маски
  if ($('input[name="seriy"]').length) {
    $('input[name="seriy"]').mask('00 00 000000', { placeholder: "12 34 123456" });
  }

  // Проверка наличия поля "Код подразделения" и применение маски
  if ($('input[name="code_p"]').length) {
    $('input[name="code_p"]').mask('000 000', { placeholder: "123 456" });
  }

  // Проверка наличия поля "Номер карты" и применение маски
  if ($('.form__input[name="card_number"]').length) {
    $('.form__input[name="card_number"]').mask('0000 0000 0000 0000', { placeholder: "____ ____ ____ ____" });
  }

  // Проверка наличия поля "Срок действия" и применение маски
  if ($('.form__input[name="expiry_date"]').length) {
    $('.form__input[name="expiry_date"]').mask('00/00', { placeholder: "MM/YY" });
  }

  // Проверка наличия поля "CVV" и применение маски
  if ($('.form__input[name="cvv"]').length) {
    $('.form__input[name="cvv"]').mask('000', { placeholder: "___" });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const burgerBtn = document.querySelector('.header__burger');
  const menu = document.querySelector('.menu');
  const menuLinks = document.querySelectorAll('.header__list li a');
  const mobileBtn = document.querySelector('.header__btn-mobile');

  if (burgerBtn) {
    // При клике на бургер меняем классы у меню и кнопки бургера
    burgerBtn.addEventListener('click', function () {
      burgerBtn.classList.toggle('header__burger__close');
      menu.classList.toggle('menu__open');
    });

    // При клике на пункт меню закрываем меню
    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        burgerBtn.classList.remove('header__burger__close');
        menu.classList.remove('menu__open');
      });
    });

    // При клике на кнопку "Оставить заявку" закрываем меню
    mobileBtn.addEventListener('click', function () {
      burgerBtn.classList.remove('header__burger__close');
      menu.classList.remove('menu__open');
    });
  }



  // ======== Маска для телефона ===============
  var phoneInputs = document.querySelectorAll('input[type="tel"]');

  var getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, '');
  }

  var onPhonePaste = function (e) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    var pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      var pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  var onPhoneInput = function (e) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
      var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }
  var onPhoneKeyDown = function (e) {
    var inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  }
  for (var phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
  }


  /*================ Динамический Адаптив =============================*/

  function dynamicAdapt(type) {
    this.type = type;
  }

  dynamicAdapt.prototype.init = function () {
    const _this = this;
    this.оbjects = [];																				// Массив объектов.
    this.daClassname = "_dynamic_adapt_";
    this.nodes = document.querySelectorAll("[data-da]");											// Массив DOM-элементов.
    for (let i = 0; i < this.nodes.length; i++) {													// Наполнение оbjects объектами.
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }
    this.arraySort(this.оbjects);
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {					// Массив уникальных медиа-запросов.
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    });
    for (let i = 0; i < this.mediaQueries.length; i++) {											// Навешивание слушателя на медиа-запрос и вызов обработчика
      const media = this.mediaQueries[i];															// при первом запуске.
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];
      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {			// Массив объектов с подходящим брейкпоинтом.
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    }
  };

  dynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        if (оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
      }
    }
  };

  dynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }
    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
  }

  dynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }

  dynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  };

  dynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === "first" || b.place === "last") {
            return -1;
          }
          if (a.place === "last" || b.place === "first") {
            return 1;
          }
          return a.place - b.place;
        }
        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === "first" || b.place === "last") {
            return 1;
          }
          if (a.place === "last" || b.place === "first") {
            return -1;
          }
          return b.place - a.place;
        }
        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };
  const da = new dynamicAdapt("max");
  da.init();

});
