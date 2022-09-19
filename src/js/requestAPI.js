const formEl = document.querySelector('.search__form');
const inputSearchEl = document.querySelector('input.search__input');
const inputHiddenEl = document.querySelector('.option__input--hidden');

// прослушивание формы по инпуту
formEl.addEventListener('input', onFormEl);

function onFormEl(e) {
  e.preventDefault();
  const {
    elements: { search, countryId },
  } = e.currentTarget;

  console.log(search.value);
  console.log(countryId.value);

  if (countryId.value !== '') {
    eventsAPI.setCountryCode(countryId.value);
  }

  eventsAPI
    .getEvents(search.value)
    .then(response => {
      return response.data._embedded.events;
    })
    .then(data => {
      renderEventsList(data);
    })
    .catch(err => {
      // alert('NO RESULTS!!!!');
      console.log(err.message);
    });
}

// создание инпута на форме по клику на список стран

const liEls = document.querySelectorAll('.search__option');
liEls.forEach(liEl => {
  liEl.addEventListener('click', onListEl);

  function onListEl() {
    const event = new Event('input');
    console.log('1');
    formEl.dispatchEvent(event);
  }
});
