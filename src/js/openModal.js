import { EventsAPI } from './eventsAPI';

const infoObj = new EventsAPI();
const smallPic = document.querySelector('.modal__small-pic');
const poster = document.querySelector('.modal__big-pic');
const eventInfo = document.querySelector('.js-info');
const eventTimedate = document.querySelector('.js-when');
const eventPointPlace = document.querySelector('.js-where');
const eventPointPlaceAddress = document.querySelector('.js-where-place');
const eventFace = document.querySelector('.js-who');
const firstPriceInfo = document.querySelector('.js-first-price');
const firstPriceText = document.querySelector('.js-first-price .js-price-text');
const secondPriceItem = document.querySelector('.js-second-priceItem');
const secondPriceText = document.querySelector(
  '.js-second-price .js-price-text'
);
const buyTicketBtn = document.querySelectorAll('.modal__list-btn');
const moreAboutEvent = document.querySelector('.moreinfo-link');

export function addToModalContent(id) {
  infoObj.getEvent(id).then(response => {
    //console.log(response.data._embedded.events[0]);
    const { images, name, dates, _embedded, priceRanges, url } =
      response.data._embedded.events[0];
    smallPic.src = images[8].url;
    poster.src = images[8].url;
    eventInfo.textContent = name;
    eventTimedate.textContent = `${
      dates.start.localDate
    }, ${dates.start.localTime.slice(0, 5)}, (${dates.timezone})`;
    const { address, city, country } = _embedded.venues[0];
    eventPointPlace.textContent = `${city.name}, ${country.name}, `;
    eventPointPlaceAddress.textContent = `${address.line1}`;
    eventFace.textContent = _embedded.attractions.map(e => e.name).join(', ');

    function shortPriceInfo() {
      if (priceRanges) {
        for (const { type, currency, min, max } of priceRanges) {
          if (type === 'standard' && min === max) {
            return (firstPriceText.textContent = `${type} ${
              min || max
            } ${currency}`.toUpperCase());
          } else if (type === 'standard') {
            return (firstPriceText.textContent =
              `${type} ${min}-${max} ${currency}`.toUpperCase());
          }
        }
      }
      return (firstPriceInfo.textContent = 'Currently price info is absent');
    }

    function optionPriceInfo() {
      if (priceRanges) {
        for (const { type, currency, min, max } of priceRanges) {
          if (type === 'VIP' && min === max) {
            return (secondPriceText.textContent = `${type} ${
              min || max
            } ${currency}`.toUpperCase());
          } else if (type === 'VIP') {
            return (firstPriceText.textContent =
              `${type} ${min}-${max} ${currency}`.toUpperCase());
          }
        }
      }
      secondPriceItem.classList.add('visually-hidden');
    }

    shortPriceInfo();
    optionPriceInfo();

    buyTicketBtn.forEach(btn => (btn.href = url));
    moreAboutEvent.href = `https://www.google.com/search?q=${eventFace.textContent}+${city.name}+${dates.start.localDate}`;
    //infoObj.getEvents().then(r => console.log(r));
  });
}
