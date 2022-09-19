import { addToModalContent } from './eventContent';
import refs from './refs';

export function onEventClick(e) {
  const card = e.target.closest('li');
  if (!card) {
    return;
  }
  document.body.classList.add('no-scroll');
  refs.eventModalBackdrop.classList.remove('visually-hidden');
  window.addEventListener('keydown', closeModal);

  addToModalContent(card.attributes.id.textContent);
}

export function onTeamBtnClick() {
  document.body.classList.add('no-scroll');
  refs.teamModalBackdrop.classList.remove('visually-hidden');
  window.addEventListener('keydown', closeModal);
}

export function closeModal(e) {
  if (
    e.target.classList.contains('backdrop') ||
    e.target.nodeName === 'BUTTON' ||
    e.key === 'Escape'
  ) {
    document.body.classList.remove('no-scroll');
    refs.eventModalBackdrop.classList.add('visually-hidden');
    refs.teamModalBackdrop.classList.add('visually-hidden');
    refs.rejectModalBackdrop.classList.add('visually-hidden');
    window.removeEventListener('keydown', closeModal);
  }
}
