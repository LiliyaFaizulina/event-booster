import { EventsAPI } from './eventsAPI';

const infoObj = new EventsAPI();
const smallPic = document.querySelector('.modal__small-pic');
const poster = document.querySelector('.modal__big-pic');
const eventInfo = document.querySelector('.js-info');
const eventTimedate = document.querySelector('.js-when');
const eventPointPlace = document.querySelector('.js-where');
const eventPointPlaceAddress = document.querySelector('.js-where-place');
const eventFace = document.querySelector('.js-who');

export function addToModalContent(id) {
  console.log(id);
  infoObj.getEvent(id).then(response => {
    console.log(response.data._embedded.events[0]);
    const { images, name, dates, _embedded } =
      response.data._embedded.events[0];
    smallPic.src = images[0].url;
    poster.src = images[8].url;
    eventInfo.textContent = name;
    eventTimedate.textContent = `${
      dates.start.localDate
    }, ${dates.start.localTime.slice(0, 5)}, (${dates.timezone})`;
    const { address, city, country } = _embedded.venues[0];
    eventPointPlace.textContent = `${city.name}, ${country.name}, `;
    eventPointPlaceAddress.textContent = `${address.line1}`;
    eventFace.textContent = _embedded.attractions.map(e => e.name).join(', ');
  });
}

addToModalContent;
