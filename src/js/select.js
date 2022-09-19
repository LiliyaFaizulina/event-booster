import refs from './refs';

refs.btnSelect.addEventListener('click', onBtnSelect);
refs.searchList.addEventListener('click', onSearchItemClick);
document.addEventListener('click', onDocumentClick);

function onBtnSelect() {
  refs.searchList.classList.toggle('search__list--visible');
  refs.btnSelect.classList.toggle('search__select--active');
  document.addEventListener('keydown', onDocumentClick);
}

function onSearchItemClick(e) {
  refs.btnSelect.textContent = e.target.textContent;
  refs.inputHidden.value = e.target.dataset.value;
  refs.btnSelect.classList.add('search__select--selected');
  refs.searchList.classList.remove('search__list--visible');
  refs.btnSelect.classList.remove('search__select--active');
  document.removeEventListener('keydown', onDocumentClick);
}

function onDocumentClick(e) {
  if (e.target !== refs.btnSelect || e.key === 'Escape') {
    refs.searchList.classList.remove('search__list--visible');
    refs.btnSelect.classList.remove('search__select--active');
  }
}
