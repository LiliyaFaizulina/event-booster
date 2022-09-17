import { createMarkupEventsList } from './js/createMarkupEventsList';
import { EventsAPI } from './js/eventsAPI';
import { onEventClick } from './js/openModal';
import { closeModal } from './js/closeModal';
import * as module from './js/preloader';
import { onPaginationClick, renderPagination } from './js/pagination';

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};

const paginationListRef = document.querySelector('.pagination__list');

const eventsApi = new EventsAPI();

renderPagination(50);

paginationListRef.addEventListener('click', onPaginationClick);
