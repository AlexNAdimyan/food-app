'use strict'
document.addEventListener('DOMContentLoaded', () => {
    //tab start
    const tabHeaders = document.querySelectorAll('.tabheader__item');
    const tabHeadersParent = document.querySelector('.tabheader__items');
    const tabContents = document.querySelectorAll('.tabcontent');



    function hideTabContent () {
        tabContents.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show')
        })

        tabHeaders.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent (i = 0) {
        tabHeaders[i].classList.add('tabheader__item_active')
        tabContents[i].classList.add('show')
        tabContents[i].classList.remove('hide')

    }

    hideTabContent();
    showTabContent();

    tabHeadersParent.addEventListener('click', (e) => {
        if (e.target && e.target.matches('.tabheader__item')) {
            tabHeaders.forEach((item, index) => {
                if (e.target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            })
        }
    })
    // tab end

    // timer start

    const deadline = '2024-09-20 19:00'

    const setZero = n => n >= 0 && n < 10 ? `0${n}` : n;

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const total = Date.parse(endtime) - Date.parse(new Date())
        if (total <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(total / (1000 * 60 * 60 * 24));
            hours = Math.floor(total / (1000 * 60 * 60) % 24)
            minutes = Math.floor((total / 1000 / 60) % 60)
            seconds = Math.floor((total / 1000) % 60)
        }
        return { total, days, hours, minutes, seconds, }
    }

    function setTimer(selector, endtime) {
        const timer = document.querySelector(selector);
        const daysElem = timer.querySelector('#days')
        const hoursElem = timer.querySelector('#hours')
        const minutesElem = timer.querySelector('#minutes')
        const secondsElem = timer.querySelector('#seconds')


        const timerID = setInterval(updateTimer, 1000)
        
        updateTimer()

        function updateTimer() {
            const {total, days, hours, minutes, seconds} = getTimeRemaining(endtime);
            daysElem.innerHTML = setZero(days);
            hoursElem.innerHTML = setZero(hours);
            minutesElem.innerHTML = setZero(minutes);
            secondsElem.innerHTML = setZero(seconds);

            if (total.total <= 0) {
                clearInterval(timerID)
            }

        }    
    }

    setTimer('.timer', deadline)


    // timer end

    // modal start
    
    const modalTrrigger = document.querySelectorAll('[data-modal-trigger]');
    const closeModalTrigger = document.querySelector('[data-modal-close]');
    const modal = document.querySelector('.modal');
    
    function openModal() {
        modal.classList.remove('hide')
        modal.classList.add('show')
        document.body.style.overflowY = 'hidden'
        clearTimeout(modalTimer)
    };

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflowY = 'auto';

    };
    closeModalTrigger.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.matches('.show')) {
            closeModal()
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target && e.target === modal) {
            closeModal()
        }
    })
    
    modalTrrigger.forEach(item => item.addEventListener('click', openModal));

    const modalTimer = setTimeout(openModal, 60000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)



    // modal end

    // menu start



    class Menu {
        constructor(image, title, text, price) {
            this.image = image
            this.title = title
            this.text = text
            this.price = price
        }

        render() {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu__item')

            menuItem.innerHTML = `
                <img src="${this.image}" alt="vegy">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `
            return menuItem
        }
    }

    class FitnessMenu extends Menu{
        constructor() {
            super(
                "img/tabs/vegy.jpg",
                'Меню "Фитнес"',
                'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
                229
            )
        }
    }


    class PremiumMenu extends Menu{
        constructor() {
            super(
                "img/tabs/elite.jpg",
                'Меню "Премиум"',
                'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
                550
            )
        }
    }

    class PostMenu extends Menu{
        constructor() {
            super(
                "img/tabs/post.jpg",
                'Меню "Постное"',
                'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
                430
            )
        }
    }   



    const menuContainer = document.querySelector('[data-container]');

 
    const fitnessMenu = new FitnessMenu()
    const premiumMenu = new PremiumMenu()
    const postMenu = new PostMenu()

    
    menuContainer.appendChild(fitnessMenu.render())
    menuContainer.appendChild(premiumMenu.render())
    menuContainer.appendChild(postMenu.render())


    // menu end
})