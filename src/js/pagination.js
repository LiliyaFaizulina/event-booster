import { EventsAPI } from './eventsAPI';
import { createMarkupEventsList } from './createMarkupEventsList';

const paginationListRef = document.querySelector('.pagination__list');
const cardListRef = document.querySelector('.eventcards__list');

const eventsApi = new EventsAPI();

paginationListRef.addEventListener('click', onPaginationClick);

function createMarkupPagination(totalPages) {
  const markup = [
    `<li class="pagination__item  js-current-btn">
            <button class="pagination__btn" type="button">1</button>
          </li>`,
  ];
  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i += 1) {
      markup.push(createPagElem(i));
      if (i > 5) {
        markup.push(`<li class="pagination__item rest">...</li>`);
        break;
      }
    }
  }
  if (totalPages > 7) {
    markup.push(createPagElem(totalPages - 1));
  }
  return markup.join('');
}

export function renderPagination(totalPages) {
  paginationListRef.innerHTML = createMarkupPagination(totalPages);
}

export function onPaginationClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  cardListRef.innerHTML = '';

  [...e.currentTarget.children]
    .find(elem => elem.classList.contains('js-current-btn'))
    .classList.remove('js-current-btn');

  const currentBtn = e.target;
  const currentLi = currentBtn.closest('li');
  currentLi.classList.add('js-current-btn');
  const currentBtnText = Number(currentBtn.textContent);

  if (currentLi.nextElementSibling.classList.contains('rest')) {
    currentLi.insertAdjacentHTML('afterend', createPagElem(currentBtnText + 1));
    paginationListRef.firstElementChild.remove();
  }

  eventsApi.setPage(currentBtnText - 1);

  eventsApi
    .getEvents()
    .then(response => {
      cardListRef.insertAdjacentHTML(
        'beforeend',
        createMarkupEventsList(response.data._embedded)
      );
    })
    .catch(err => {
      console.log(err.message);
    });
  // остановка спинера;
}

function createPagElem(num) {
  return `<li class="pagination__item">
            <button class="pagination__btn" type="button">${num}</button>
          </li>`;
}
