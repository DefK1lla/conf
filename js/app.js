document.addEventListener('DOMContentLoaded', () => {
    // Fixed header
    const header = document.querySelector('.header__content');
    let introHeight = document.querySelector('.intro').clientHeight;

    window.addEventListener('scroll', function () {
        let scrollPos = this.pageYOffset;

        if (scrollPos > introHeight) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed')
        }

    });

    // Menu
    let menuBtn = document.querySelector('.menu__btn'),
        menu = document.querySelector('.menu__list'),
        menuLine = document.querySelector('.menu__btn-line');

    menuBtn.addEventListener('click', function () {
        menuLine.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Smooth scroll
    const links = document.querySelectorAll('.anchor');

    let elementId, elementOffset;

    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            menu.classList.remove('active');
            menuLine.classList.remove('active');

            elementId = link.getAttribute('href');
            elementOffset = document.querySelector(elementId).getBoundingClientRect().top;

            window.scrollBy({
                top: elementOffset,
                behavior: "smooth"
            });


        });
    });

    // Popup
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';  // Получаем размер скроллбара
    let lockPaddings = document.querySelectorAll('.lock-padding');   // Элементы с position: fixed

    let popups = document.querySelectorAll('.popup'),
        popupLinks = document.querySelectorAll('.popup-link'),
        curentPopup,
        body = document.querySelector('body');

    popupLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            if (curentPopup) {
                curentPopup.classList.remove('open');
            }

            curentPopup = document.querySelector(this.dataset.popup);
            curentPopup.classList.add('open');
            body.classList.add('scroll-lock');  // Отключаем скролл

            // Убираем дёргание при открытии попапа
            body.style.paddingRight = lockPaddingValue;
            lockPaddings.forEach(function (elem) {
                elem.style.paddingRight = lockPaddingValue;
            });
        });
    });


    let popupClose = document.querySelectorAll('.popup-close');

    popupClose.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            if ((!e.target.closest('.popup__content') && !e.target.closest('.popup__speaker')) || e.target.closest('.popup__close')) {
                popups.forEach(function (item) {
                    item.classList.remove('open');
                });

                setTimeout(() => {
                    body.classList.remove('scroll-lock');

                    // Убираем дёргание при закрытии попапа
                    body.style.paddingRight = '0px';
                    lockPaddings.forEach(function (elem) {
                        elem.style.paddingRight = '0px';
                    });
                }, 400);
            }
        });
    });

    // AOS animation
    AOS.init({
        // Global settings:
        disable: 'phone', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 130, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 750, // values from 0 to 3000, with step 50ms
        easing: 'linear', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
});
