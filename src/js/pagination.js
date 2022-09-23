import refs from './refs';

export function renderPagination(totalPages) {
  refs.paginationList.innerHTML = createMarkupPagination(totalPages);
}

export function checkPaginationList(e) {
  const currentBtn = e.target;
  const currentPagEl = currentBtn.closest('li');
  const pagBtns = [...e.currentTarget.children];
  const firstPagEl = refs.paginationList.firstElementChild;
  const lastPagEl = refs.paginationList.lastElementChild;
  const penultPagEl = lastPagEl.previousElementSibling;
  const nextPagEl = currentPagEl.nextElementSibling;
  const prevPagEl = currentPagEl.previousElementSibling;
  const currentBtnText = Number(currentBtn.textContent);
  const firstBtnTxt = Number(firstPagEl.firstElementChild.textContent);
  const lastBtnTxt = Number(lastPagEl.firstElementChild.textContent);
  const restElemMarkup = `<li class="pagination__item rest">...</li>`;
  const maxPagEl = 7;

  pagBtns
    .find(elem => elem.classList.contains('js-current-btn'))
    .classList.remove('js-current-btn');
  currentPagEl.classList.add('js-current-btn');

  if (lastBtnTxt < maxPagEl) {
    return;
  }

  if (currentBtnText !== firstBtnTxt && currentBtnText !== lastBtnTxt) {
    if (nextPagEl.classList.contains('rest')) {
      currentPagEl.insertAdjacentHTML(
        'afterend',
        createPagElem(currentBtnText + 1)
      );
      pagBtns[2].remove();

      if (currentBtnText === 5) {
        pagBtns[1].remove();
        pagBtns[0].insertAdjacentHTML('afterend', restElemMarkup);
      }

      if (currentBtnText === lastBtnTxt - 2) {
        pagBtns[1].insertAdjacentHTML(
          'afterend',
          createPagElem(lastBtnTxt - 4)
        );
        penultPagEl.remove();
      }
    }

    if (prevPagEl.classList.contains('rest')) {
      pagBtns[4].remove();
      currentPagEl.insertAdjacentHTML(
        'beforebegin',
        createPagElem(currentBtnText - 1)
      );
      if (currentBtnText === 3) {
        pagBtns[1].remove();
        penultPagEl.insertAdjacentHTML('beforebegin', createPagElem(5));
      }

      if (currentBtnText === lastBtnTxt - 4) {
        penultPagEl.remove();
        lastPagEl.insertAdjacentHTML('beforebegin', restElemMarkup);
      }
    }
  } else if (
    currentBtnText === firstBtnTxt &&
    nextPagEl.classList.contains('rest')
  ) {
    renderPagination(lastBtnTxt);
  } else if (
    currentBtnText === lastBtnTxt &&
    prevPagEl.classList.contains('rest')
  ) {
    const markup = [createPagElem(firstBtnTxt), restElemMarkup];
    for (let i = lastBtnTxt - 4; i <= lastBtnTxt; i += 1) {
      markup.push(createPagElem(i));
    }
    refs.paginationList.innerHTML = markup.join('');
    refs.paginationList.lastElementChild.classList.add('js-current-btn');
  }
}

function createPagElem(num) {
  return `<li class="pagination__item">
            <button class="pagination__btn" type="button">${num}</button>
          </li>`;
}

function createMarkupPagination(totalPages) {
  const maxPages = 50;
  const markup = [
    `<li class="pagination__item js-current-btn">
            <button class="pagination__btn" type="button">1</button>
          </li>`,
  ];

  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i += 1) {
      markup.push(createPagElem(i));
      if (i > 4) {
        if (totalPages > 6) {
          markup.push(`<li class="pagination__item rest">...</li>`);
        } else {
          markup.push(createPagElem(totalPages));
        }
        break;
      }
    }
  }

  if (totalPages > 6) {
    const lastPage = totalPages > maxPages ? maxPages : totalPages;
    markup.push(createPagElem(lastPage));
  }

  return markup.join('');
}
