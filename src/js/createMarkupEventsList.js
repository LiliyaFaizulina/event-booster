export function createMarkupEventsList({ arr }) {
  return arr.reduce(
    (acc, { id, imageUrl, name }) =>
      acc +
      `<li class="eventcards__item" data-id='{{id}}'>
        <a href="#" class="eventcards__link">
          <img
            class="eventcards__img"
            src='{{imageUrl}}'
            alt='{{name}}'
            width="267px"
            height="337px"
            loading = "lazy"
          />
          <img
            class="eventcards__decoration"
            src="./images/svg/card-decoration.svg"
            alt="card-decoration1"
          />
          <div class="eventcards__content">
            <h3 class="eventcards__name">'{{name}}'</h3>
            <p class="eventcards__date">'{{localDate}}'</p>
            <a href="#" class="eventcards__location" id='{{id}}'>
              <svg class="eventcards__location-icon" width="8" height="10">
                <use href="./images/svg/sprite.svg#ic_location"></use>
              </svg>
              Palace of Ukraine</a
            >
          </div>
        </a>
      </li>`,
    ''
  );
}
