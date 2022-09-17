import { createMarkupEventsList } from "./createMarkupEventsList";

export function renderingMarkup(array) {
    let markup;
    markup.innerHTML = createMarkupEventsList(array);
    array.value = '';
}