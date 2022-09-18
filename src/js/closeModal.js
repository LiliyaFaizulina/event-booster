import { addToModalContent } from './openModal';
import refs from './refs';

refs.teamModalOpenBtn.addEventListener('click', onTeamBtnClick);
refs.teamModalBackdrop.addEventListener('click', closeModal);

refs.eventsList.addEventListener('click', onEventClick);
refs.eventModalBackdrop.addEventListener('click', closeModal);

//! Открывает модалку карточки
function onEventClick(e) {
  const card = e.target.closest('li');
  if (!card) {
    return;
  }
  document.body.classList.add('no-scroll');
  refs.eventModalBackdrop.classList.remove('visually-hidden');
  window.addEventListener('keydown', closeModal);

  addToModalContent(card.attributes.id.textContent);
}

function onTeamBtnClick() {
  document.body.classList.add('no-scroll');
  refs.teamModalBackdrop.classList.remove('visually-hidden');
  window.addEventListener('keydown', closeModal);
}

function closeModal(e) {
  if (
    e.target.classList.contains('backdrop') ||
    e.target.nodeName === 'BUTTON' ||
    e.key === 'Escape'
  ) {
    document.body.classList.remove('no-scroll');
    refs.eventModalBackdrop.classList.add('visually-hidden');
    refs.teamModalBackdrop.classList.add('visually-hidden');
    window.removeEventListener('keydown', closeModal);
  }
}
