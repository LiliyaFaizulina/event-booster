import refs from './js/refs';
import { EventsAPI } from './js/eventsAPI';
import { renderEventsList } from './js/createMarkupEventsList';
import { onTeamBtnClick, closeModal, onEventClick } from './js/modals';
import { checkPaginationList, renderPagination } from './js/pagination';
import { onScrollTracking } from './js/animate';
import { onBtnSelect, onSearchItemClick, onDocumentClick } from './js/select';

const eventsAPI = new EventsAPI();

refs.teamModalOpenBtn.addEventListener('click', onTeamBtnClick);
refs.teamModalBackdrop.addEventListener('click', closeModal);
refs.eventsList.addEventListener('click', onEventClick);
refs.eventModalBackdrop.addEventListener('click', closeModal);
refs.rejectModalBackdrop.addEventListener('click', closeModal);
refs.paginationList.addEventListener('click', onPaginationClick);
refs.btnSelect.addEventListener('click', onBtnSelect);
refs.searchList.addEventListener('click', searchByCountyCode);
refs.searchInput.addEventListener('change', searchByQuery);
document.addEventListener('click', onDocumentClick);
//preloader
window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};

eventsAPI.getEventsByCountry().then(resp => {
  const {
    _embedded: { events },
    page: { totalPages },
  } = resp.data;
  renderEventsList(events);
  onScrollTracking();
  renderPagination(totalPages);
});

function onPaginationClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  refs.eventsList.innerHTML = '';

  checkPaginationList(e);

  eventsAPI.setPage(Number(e.target.textContent) - 1);

  eventsAPI
    .getEvents()
    .then(response => {
      renderEventsList(response.data._embedded.events);
      //отслеживание скролла
      onScrollTracking();
    })
    .catch(err => {
      console.log(err.message);
    });
}

function searchByCountyCode(e) {
  const countryCode = e.target.dataset.value;
  refs.inputHidden.value = countryCode;
  onSearchItemClick(e);
  eventsAPI
    .getEventsByCountry(countryCode)
    .then(resp => {
      console.log(resp.data);
      if (!resp.data._embedded) {
        throw new Error('Sorry! Bad request');
      }
      const {
        _embedded: { events },
        page: { totalPages },
      } = resp.data;

      renderEventsList(events);
      onScrollTracking();
      renderPagination(totalPages);
    })
    .catch(err => {
      console.log(refs.rejectModalBackdrop);
      refs.eventsList.innerHTML = '';
      refs.paginationList.innerHTML = '';
      document.body.classList.add('no-scroll');
      refs.rejectModalBackdrop.classList.remove('visually-hidden');
      window.addEventListener('keydown', closeModal);
    });
}

function searchByQuery(e) {
  const query = e.target.value;
  eventsAPI
    .getEvents(query)
    .then(resp => {
      console.log(resp.data);
      if (!resp.data._embedded) {
        throw new Error('Sorry! Bad request');
      }
      const {
        _embedded: { events },
        page: { totalPages },
      } = resp.data;

      renderEventsList(events);
      onScrollTracking();
      renderPagination(totalPages);
    })
    .catch(err => {
      console.log(refs.rejectModalBackdrop);
      refs.eventsList.innerHTML = '';
      refs.paginationList.innerHTML = '';
      document.body.classList.add('no-scroll');
      refs.rejectModalBackdrop.classList.remove('visually-hidden');
      window.addEventListener('keydown', closeModal);
    });
}
