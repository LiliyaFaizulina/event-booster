const modalBtnOpen = document.querySelector('.js-open-modal-team');
const backdrop = document.querySelector('.backdrop');
const elementModal = document.querySelector('.team-modal');
const modalCloseBtn = document.querySelector('.modal-button');

//! Открытие модалки
modalBtnOpen.addEventListener('click', function (e) {
  document.body.classList.add('no-scroll');
  elementModal.classList.remove('visually-hidden');
  backdrop.classList.remove('visually-hidden');
  window.addEventListener('keydown', onModalCloseKey);
});

function onModalCloseKey(e) {
  if (e.key === 'Escape') {
    remove(e);
    window.removeEventListener('keydown', onModalCloseKey);
  }
}

modalCloseBtn.addEventListener('click', remove);

backdrop.addEventListener('click', remove);

function remove() {
  document.body.classList.remove('no-scroll');
  elementModal.classList.add('visually-hidden');
  backdrop.classList.add('visually-hidden');
}
