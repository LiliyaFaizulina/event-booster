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
      if (i > 4) {
        if (totalPages > 5) {
          markup.push(`<li class="pagination__item rest">...</li>`);
        } else {
          markup.push(createPagElem(totalPages));
        }
        break;
      }
    }
  }
  if (totalPages > 6) {
    markup.push(createPagElem(totalPages));
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

  const pagBtns = [...e.currentTarget.children];

  pagBtns
    .find(elem => elem.classList.contains('js-current-btn'))
    .classList.remove('js-current-btn');

  const currentBtn = e.target;
  const currentLi = currentBtn.closest('li');
  currentLi.classList.add('js-current-btn');
  const currentBtnText = Number(currentBtn.textContent);

  if (
    currentLi.nextElementSibling &&
    currentLi.nextElementSibling.classList.contains('rest')
  ) {
    currentLi.insertAdjacentHTML('afterend', createPagElem(currentBtnText + 1));
    paginationListRef.firstElementChild.remove();

    if (currentBtnText === paginationListRef.lastElementChild.textContent - 2) {
      paginationListRef.lastElementChild.previousElementSibling.remove();
    }
  }

  if (!currentLi.previousElementSibling && currentBtnText !== 1) {
    currentLi.insertAdjacentHTML(
      'beforebegin',
      createPagElem(currentBtnText - 1)
    );
    pagBtns[5].remove();

    if (!pagBtns[pagBtns.length - 2].classList.contains('rest')) {
      paginationListRef.lastElementChild.insertAdjacentHTML(
        'beforebegin',
        `<li class="pagination__item rest">...</li>`
      );
    }
  }

  eventsApi.setPage(currentBtnText - 1);

  eventsApi
    .getEvents()
    .then(response => {
      cardListRef.insertAdjacentHTML(
        'beforeend',
        createMarkupEventsList(response.data._embedded.events)
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
