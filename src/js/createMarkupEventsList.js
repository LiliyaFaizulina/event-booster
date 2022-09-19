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
      const poster = images.find(
        image => image.height === Math.max(...images.map(img => img.height))
      ).url;
      return (
        acc +
        `<li class="eventcards__item js-anim"  id="${id}">
        <a href="#" class="eventcards__link">
          <div class="eventcards__thumb">
            <img
              class="eventcards__img"
              src="${poster}"
              alt="${name}"
              width="267"
              height="337"
              loading="lazy"
            />
          </div>
          <div class="eventcards__content">
            <h3 class="eventcards__name">${name}</h3>
            <p class="eventcards__date">${dates.start.localDate}</p>
            <a class="eventcards__location" href="https://maps.google.com?saddr=Location&daddr=${latitude},${longitude}">
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
