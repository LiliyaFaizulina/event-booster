import { addToModalContent } from './openModal';
const modalBtnOpen = document.querySelector('.js-open-modal-team');
const backdrop = document.querySelector('.js-backdrop');
const backdropModal = document.querySelector('.js-modal-backdrop');
const elementModal = document.querySelector('.team-modal');
const modalCloseBtn = document.querySelector('.modal-button');
const eventModalCloseBtn = document.querySelector('.close-button');
const eventsList = document.querySelector('.eventcards__list');

//! Открытие модалки
modalBtnOpen.addEventListener('click', function (e) {
  document.body.classList.add('no-scroll');
  elementModal.classList.remove('visually-hidden');
  backdrop.classList.remove('visually-hidden');
  window.addEventListener('keydown', onModalCloseKey);
});

eventsList.addEventListener('click', onEventClick);
//! Открывает модалку карточки
function onEventClick(e) {
  const card = e.target.closest('li');
  if (!card) {
    return;
  }
  document.body.classList.add('no-scroll');
  backdropModal.classList.remove('visually-hidden');
  window.addEventListener('keydown', onModalCloseKey);
  // Запустить функцию, которая добавляет данные в разметку
  addToModalContent('Z698xZQpZaAD6'); //(card.attributes.id.textContent);
}

function onModalCloseKey(e) {
  if (e.key === 'Escape') {
    remove(e);
    closeBtnClick(e);
    window.removeEventListener('keydown', onModalCloseKey);
  }
}

modalCloseBtn.addEventListener('click', remove);
eventModalCloseBtn.addEventListener('click', closeBtnClick);

backdrop.addEventListener('click', remove);
backdropModal.addEventListener('click', closeBtnClick);

function remove() {
  document.body.classList.remove('no-scroll');
  elementModal.classList.add('visually-hidden');
  backdrop.classList.add('visually-hidden');
}

function closeBtnClick() {
  document.body.classList.remove('no-scroll');
  backdropModal.classList.add('visually-hidden');
}
