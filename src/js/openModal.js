import { EventsAPI } from './eventsAPI';

const infoObj = new EventsAPI();
const smallPic = document.querySelector('.modal__small-pic');
const poster = document.querySelector('.modal__big-pic');
const eventInfo = document.querySelector('.js-info');
const eventTimedate = document.querySelector('.js-when');
const eventPointPlace = document.querySelector('.js-where');
const eventMapPoint = document.querySelector('.modal__map-point');
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
    console.log(response.data._embedded.events[0]);
    const { images, name, info, dates, _embedded, priceRanges, url } =
      response.data._embedded.events[0];
    const { address, city, country, location } = _embedded.venues[0];
    const posterBestSize = images.filter(
      image => image.ratio === '3_2' || image.ratio === '4_3'
    );
    poster.src = posterBestSize.find(
      image => image.height === Math.max(...posterBestSize.map(e => e.height))
    ).url;

    smallPic.src = images[0].url;
    eventInfo.textContent = info ? info : name;
    eventTimedate.textContent = `${dates.start.localDate} ${
      dates.start.localTime ? dates.start.localTime.slice(0, 5) : ''
    } ${dates.timezone ? dates.timezone : ''}`;
    eventPointPlace.textContent = `${city.name}, ${country.name}, ${
      address.line1 ? address.line1 : ''
    }`;
    eventMapPoint.href = `https://www.google.com/maps/search/${location.latitude}+${location.longitude}`;
    eventFace.textContent = _embedded.attractions.map(e => e.name).join(', ');
    buyTicketBtn.forEach(btn => (btn.href = url));
    moreAboutEvent.href = `https://www.google.com/search?q=${eventFace.textContent}+${city.name}+${dates.start.localDate}`;

    if (priceRanges) {
      priceRanges.forEach(({ type, currency, min, max }) => {
        if (type === 'standard' && min === max) {
          firstPriceText.textContent = `${type} ${
            min || max
          } ${currency}`.toUpperCase();
        } else if (type === 'standard') {
          firstPriceText.textContent =
            `${type} ${min}-${max} ${currency}`.toUpperCase();
        } else if (type === 'VIP' && min === max) {
          secondPriceText.textContent = `${type} ${
            min || max
          } ${currency}`.toUpperCase();
        } else if (type === 'VIP') {
          firstPriceText.textContent =
            `${type} ${min}-${max} ${currency}`.toUpperCase();
        } else {
          secondPriceItem.classList.add('visually-hidden');
        }
      });
    } else {
      firstPriceInfo.textContent =
        'Currently price info is absent. Click "Buy tickets" for more information';
    }
  });
}
