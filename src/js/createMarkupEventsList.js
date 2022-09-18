import refs from './refs';

export function renderEventsList(array) {
  refs.eventsList.innerHTML = createMarkupEventsList(array);
}

function createMarkupEventsList(events) {
  return events.reduce(
    (acc, { id, images, name, dates, _embedded: { venues } }) => {
      const {
        location: { latitude, longitude },
        name: locationName,
      } = venues[0];
      return (
        acc +
        `<li class="eventcards__item js-anim"  id="${id}">
        <a href="#" class="eventcards__link">
          <img
            class="eventcards__img"
            src="${images[0].url}"
            alt="${name}"
            width="267"
            height="337"
            loading="lazy"
          />
          <img
            class="eventcards__decoration"
            src="./images/svg/card-decoration.svg"
            alt="card-decoration1"
          />
          <div class="eventcards__content">
            <h3 class="eventcards__name">${name}</h3>
            <p class="eventcards__date">${dates.start.localDate}</p>
            <a href="https://maps.google.com?saddr=Location&daddr=${latitude},${longitude}" class="eventcards__location">
              <svg class="eventcards__location-icon" width="8" height="10">
                <use href="./images/svg/sprite.svg#ic_location"></use>
              </svg>
              ${locationName}
            </a>
          </div>
        </a>
      </li>`
      );
    },
    ''
  );
}
