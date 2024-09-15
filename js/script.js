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
})