import { EventsAPI } from './eventsAPI';
import refs from './refs';

const infoObj = new EventsAPI();

export function addToModalContent(id) {
  infoObj.getEvent(id).then(response => {
    console.log(response.data._embedded.events[0]);
    const { images, name, dates, _embedded, priceRanges, url } =
      response.data._embedded.events[0];
    const { address, city, country, location } = _embedded.venues[0];
    const posterBestSize = images.filter(
      image => image.ratio === '3_2' || image.ratio === '4_3'
    );
    refs.poster.src = posterBestSize.find(
      image => image.height === Math.max(...posterBestSize.map(e => e.height))
    ).url;

    refs.smallPic.src = images[0].url;
    refs.eventInfo.textContent = name;
    refs.eventTimedate.textContent = `${dates.start.localDate} ${
      dates.start.localTime ? dates.start.localTime.slice(0, 5) : ''
    } ${dates.timezone ? dates.timezone : ''}`;
    refs.eventPointPlace.textContent = `${city.name}, ${country.name}, ${address.line1}`;
    refs.eventMapPoint.href = `https://www.google.com/maps/search/${location.latitude}+${location.longitude}`;
    refs.eventFace.textContent = _embedded.attractions
      .map(e => e.name)
      .join(', ');
    refs.buyTicketBtn.forEach(btn => (btn.href = url));
    refs.moreAboutEvent.href = `https://www.google.com/search?q=${refs.eventFace.textContent}+${city.name}+${dates.start.localDate}`;

    shortPriceInfo();
    optionPriceInfo();

    function shortPriceInfo() {
      if (priceRanges) {
        for (const { type, currency, min, max } of priceRanges) {
          if (type === 'standard' && min === max) {
            return (refs.firstPriceText.textContent = `${type} ${
              min || max
            } ${currency}`.toUpperCase());
          } else if (type === 'standard') {
            return (refs.firstPriceText.textContent =
              `${type} ${min}-${max} ${currency}`.toUpperCase());
          }
        }
      }
      return (refs.firstPriceInfo.textContent =
        'Currently price info is absent. Click "Buy tickets" for more information');
    }

    function optionPriceInfo() {
      if (priceRanges) {
        for (const { type, currency, min, max } of priceRanges) {
          if (type === 'VIP' && min === max) {
            return (refs.secondPriceText.textContent = `${type} ${
              min || max
            } ${currency}`.toUpperCase());
          } else if (type === 'VIP') {
            return (refs.firstPriceText.textContent =
              `${type} ${min}-${max} ${currency}`.toUpperCase());
          }
        }
      }
      refs.secondPriceItem.classList.add('visually-hidden');
    }

    //infoObj.getEvents().then(r => console.log(r));
  });
}
