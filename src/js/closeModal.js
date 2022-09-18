import { addToModalContent } from './openModal';
import refs from './refs';

refs.teamModalOpenBtn.addEventListener('click', onTeamBtnClick);
refs.teamModalCloseBtn.addEventListener('click', remove);
refs.teamModalBackdrop.addEventListener('click', remove);

refs.eventModalCloseBtn.addEventListener('click', closeBtnClick);
refs.eventModalBackdrop.addEventListener('click', closeBtnClick);
refs.eventsList.addEventListener('click', onEventClick);

//! Открывает модалку карточки
function onEventClick(e) {
  const card = e.target.closest('li');
  if (!card) {
    return;
  }
  document.body.classList.add('no-scroll');
  refs.eventModalBackdrop.classList.remove('visually-hidden');
  window.addEventListener('keydown', onModalCloseKey);

  addToModalContent(card.attributes.id.textContent);
}

function onModalCloseKey(e) {
  if (e.key === 'Escape') {
    remove(e);
    closeBtnClick(e);
    window.removeEventListener('keydown', onModalCloseKey);
  }
}

function remove() {
  document.body.classList.remove('no-scroll');
  refs.teamModalBackdrop.classList.add('visually-hidden');
}

function closeBtnClick() {
  document.body.classList.remove('no-scroll');
  refs.eventModalBackdrop.classList.add('visually-hidden');
}

function onTeamBtnClick(e) {
  document.body.classList.add('no-scroll');
  refs.teamModalBackdrop.classList.remove('visually-hidden');
  window.addEventListener('keydown', onModalCloseKey);
}
