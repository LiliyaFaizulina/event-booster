!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){r[e]=t},t.parcelRequired7c6=o),o.register("l3CR8",(function(t,n){e(t.exports,"onBtnSelect",(function(){return c})),e(t.exports,"onDocumentClick",(function(){return a})),e(t.exports,"onSearchItemClick",(function(){return l}));var r=o("4Nugj");function c(){r.default.searchList.classList.toggle("search__list--visible"),r.default.btnSelect.classList.toggle("search__select--active"),document.addEventListener("keydown",a)}function l(e){r.default.btnSelect.textContent=e.target.textContent,r.default.inputHidden.value=e.target.dataset.value;var t=new Event("input");r.default.searchForm.dispatchEvent(t),r.default.btnSelect.classList.add("search__select--selected"),r.default.searchList.classList.remove("search__list--visible"),r.default.btnSelect.classList.remove("search__select--active"),document.removeEventListener("keydown",a)}function a(e){e.target===r.default.btnSelect&&"Escape"!==e.key||(r.default.searchList.classList.remove("search__list--visible"),r.default.btnSelect.classList.remove("search__select--active"))}})),o.register("4Nugj",(function(t,n){e(t.exports,"default",(function(){return r}));var r={rejectModalBackdrop:document.querySelector(".js-reject-backdrop"),rejectCloseBtn:document.querySelector(".wrapper__button"),eventsList:document.querySelector(".eventcards__list"),paginationList:document.querySelector(".pagination__list"),teamModalOpenBtn:document.querySelector(".js-open-modal-team"),teamModalBackdrop:document.querySelector(".js-backdrop"),teamModalCloseBtn:document.querySelector(".modal-button"),eventModalBackdrop:document.querySelector(".js-modal-backdrop"),eventModalCloseBtn:document.querySelector(".close-button"),eventContentWrapper:document.querySelector(".js-event-modal"),btnSelect:document.querySelector(".search__select"),searchList:document.querySelector(".search__list"),searchItems:document.querySelectorAll(".search__option"),inputHidden:document.querySelector(".option__input--hidden"),searchForm:document.querySelector(".search__form"),searchInput:document.querySelector(".js-search-input")}})),o("l3CR8")}();
//# sourceMappingURL=index.8b59b4ec.js.map
