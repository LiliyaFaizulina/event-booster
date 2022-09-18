import refs from './js/refs';
import { EventsAPI } from './js/eventsAPI';
import { renderEventsList } from './js/createMarkupEventsList';
import { onEventClick } from './js/openModal';
import { closeModal } from './js/closeModal';
import { checkPaginationList, renderPagination } from './js/pagination';
import { onScrollTracking } from './js/animate';

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};

const eventsAPI = new EventsAPI();

renderPagination(15);

refs.paginationList.addEventListener('click', onPaginationClick);

function onPaginationClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  refs.cardList.innerHTML = '';
  //запуск спинера;

  checkPaginationList(e);

  eventsAPI.setPage(Number(e.target.textContent) - 1);

  eventsAPI
    .getEvents()
    .then(response => {
      renderEventsList(response.data._embedded.events);
      onScrollTracking(); //отслеживание скролла
      // остановка спинера;
    })
    .catch(err => {
      console.log(err.message);
    });
}
