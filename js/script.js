'use strict'

const tabHeaders = document.querySelectorAll('.tabheader__item');
const tabHeadersParent = document.querySelector('.tabheader__items');
const tabContents = document.querySelectorAll('.tabcontent');

hideTabContent();
showTabContent();

function hideTabContent () {
    tabContents.forEach(item => {
        item.style.display = 'none'
    })

    tabHeaders.forEach(item => {
        item.classList.remove('tabheader__item_active')
    })
}

function showTabContent (i = 0) {
        tabHeaders[i].classList.add('tabheader__item_active')
        tabContents[i].style.display = 'block'
    

}