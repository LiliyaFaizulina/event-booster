import { createMarkupEventsList } from './createMarkupEventsList';

export function render(array) {
  markup.innerHTML = createMarkupEventsList(array);
}
