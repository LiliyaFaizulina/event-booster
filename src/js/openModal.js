import { EventsAPI } from './eventsAPI';

const infoObj = new EventsAPI();

export function addToModalContent(id) {
  console.log(id);
  infoObj.getEvent(id).then(response => {
    console.log(response.data._embedded.events[0]);
  });
}
