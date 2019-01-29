'use strict';
/* global bookmarkList, store, api */

function main() {
  //nest event listeners for page ready
  console.log('connected');
  bookmarkList.bindEventListeners();
}

$(main);


