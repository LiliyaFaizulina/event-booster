import { EventsAPI } from './eventsAPI';

const paginationListRef = document.querySelector('.pagination__list');

const eventsApi = new EventsAPI();

paginationListRef.addEventListener('click', onPaginationClick);

function createMarkupPagination(totalPages) {
  const item = `<li class="pagination__item">
            <button class="pagination__btn" type="button">${i}</button>
          </li>`;
  const markup = [
    `<li class="pagination__item">
            <button class="pagination__btn js-current-btn" type="button">1</button>
          </li>`,
  ];
  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i += 1) {
      markup.push(item);
      if (i > 5) {
        markup.push(`<li class="pagination__item">...</li>`);
        break;
      }
    }
  }
  if (totalPages > 7) {
    markup.push(`<li class="pagination__item">
            <button class="pagination__btn" type="button">${totalPages}</button>
          </li>`);
  }
  return markup.join('');
}

function renderPagination(totalPages) {
  paginationListRef.innerHTML = createMarkupPagination(totalPages);
}

function onPaginationClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  [...e.currentTarget.children]
    .find(elem => elem.classList.contains('js-current-btn'))
    .classList.remove('js-current-btn');

  const currentPage = e.target;
  currentPage.closest('li').classList.add('js-current-btn');
  const page = currentPage.textContent;
  eventsApi.setPage(page);

  eventsApi.getEvents().then(response => {
    console.log(response.data);
  });
}