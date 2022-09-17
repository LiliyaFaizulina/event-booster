const btnSelectEl = document.querySelector('.search__select');
const searchListEl = document.querySelector('.search__list');
const searchItemsEl = document.querySelectorAll('.search__option');
const inputHiddenEl = document.querySelector('.option__input--hidden');

btnSelectEl.addEventListener('click', onBtnSelect);

// клик по кнопке селект
function onBtnSelect() {
  searchListEl.classList.toggle('search__list--visible');
  btnSelectEl.classList.toggle('search__select--active');
}

searchItemsEl.forEach(searchItem => {
  searchItem.addEventListener('click', onSearchItem);

  // клик по пункту со списка
  function onSearchItem(e) {
    e.stopPropagation();

    btnSelectEl.textContent = this.textContent;
    searchListEl.classList.remove('search__list--visible');
    btnSelectEl.classList.remove('search__select--active');
    inputHiddenEl.value = this.dataset.value;
  }
});

// клик за пределами списка
document.addEventListener('click', onClickDocument);

function onClickDocument(e) {
  if (e.target !== btnSelectEl) {
    searchListEl.classList.remove('search__list--visible');
    btnSelectEl.classList.remove('search__select--active');
  }
}

// нажатие Esc
document.addEventListener('keyup', onKeyUp);

function onKeyUp(e) {
  if (e.key === 'Escape') {
    searchListEl.classList.remove('search__list--visible');
    btnSelectEl.classList.remove('search__select--active');
  }
}
