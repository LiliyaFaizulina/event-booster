import { EventsAPI } from './eventsAPI';
import { createMarkupEventsList } from './createMarkupEventsList';

const paginationListRef = document.querySelector('.pagination__list');
const cardListRef = document.querySelector('.eventcards__list');

const eventsApi = new EventsAPI();

paginationListRef.addEventListener('click', onPaginationClick);

function createMarkupPagination(totalPages) {
  const markup = [
    `<li class="pagination__item">
            <button class="pagination__btn js-current-btn" type="button">1</button>
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

function renderPagination(totalPages) {
  paginationListRef.innerHTML = createMarkupPagination(totalPages);
}

function onPaginationClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  // очистить контейнер;
  cardListRef.innerHTML = '';
  // запустить спинер;

  [...e.currentTarget.children]
    .find(elem => elem.classList.contains('js-current-btn'))
    .classList.remove('js-current-btn');

  const currentBtn = e.target;
  const currentLi = currentBtn.closest('li');
  currentLi.classList.add('js-current-btn');
  const currentBtnText = Number(currentBtn.textContent);

  if (currentLi.nextElementSibling.classList.contains('rest')) {
    currentLi.insertAdjacentHTML('afterend', createPagElem(currentBtnText + 1));
  }

  eventsApi.setPage(currentBtnText - 1);

  eventsApi.getEvents().then(response => {
    console.log(response.data);
    // функция рендера картинок;
    cardListRef.insertAdjacentHTML(
      'beforeend',
      createMarkupEventsList(response.data)
    );
    // остановка спинера;
  });
}

function createPagElem(num) {
  return `<li class="pagination__item">
            <button class="pagination__btn" type="button">${num}</button>
          </li>`;
}
