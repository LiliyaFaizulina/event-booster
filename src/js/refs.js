export default {
  eventsList: document.querySelector('.eventcards__list'),
  paginationList: document.querySelector('.pagination__list'),
  //   for team modal
  teamModalOpenBtn: document.querySelector('.js-open-modal-team'),
  teamModalBackdrop: document.querySelector('.js-backdrop'),
  teamModalCloseBtn: document.querySelector('.modal-button'),
  //for event modal
  eventModalBackdrop: document.querySelector('.js-modal-backdrop'),
  eventModalCloseBtn: document.querySelector('.close-button'),
  //   для записи в модалку
  smallPic: document.querySelector('.modal__small-pic'),
  poster: document.querySelector('.modal__big-pic'),
  eventInfo: document.querySelector('.js-info'),
  eventTimedate: document.querySelector('.js-when'),
  eventPointPlace: document.querySelector('.js-where'),
  eventMapPoint: document.querySelector('.modal__map-point'),
  eventFace: document.querySelector('.js-who'),
  firstPriceInfo: document.querySelector('.js-first-price'),
  firstPriceText: document.querySelector('.js-first-price .js-price-text'),
  secondPriceItem: document.querySelector('.js-second-priceItem'),
  secondPriceText: document.querySelector('.js-second-price .js-price-text'),
  buyTicketBtn: document.querySelectorAll('.modal__list-btn'),
  moreAboutEvent: document.querySelector('.moreinfo-link'),
};
