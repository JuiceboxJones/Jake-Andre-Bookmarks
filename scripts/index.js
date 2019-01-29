'use strict';
/* global bookmarkList, store, api */

function main() {
  //nest event listeners for page ready
  console.log('connected');
  bookmarkList.bindEventListeners();

  api.getBookmark()
    .then((items) => {
      items.forEach((item) => store.addBookmark(item));
      bookmarkList.render();
    });
//   bookmarkList.render();
}

$(main);


