'use strict';

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    //return JSON.stringify(o);
    return o;
  }
});


const bookmarkList = (function() {
  const generateBookmarkHtml = function(bookmark) {
    let ratingStars = '';
    for(let i = 0; i < bookmark.rating; i++) {
      ratingStars += '★';
    }

    return `
      <li class="minimized">
        <p>${bookmark.title} <button>Expand</button></p>
        <p>Rating: ${ratingStars}</p>
      </li>
    `;
  };

  const generateBookmarkPage = function(bookmarkItems) {
    const items = bookmarkItems.map(item => generateBookmarkHtml(item));

    return items.join('');
  };

  const render = function() {
    const html = generateBookmarkPage(store.bookmarks);
    console.log('it works!');
    $('#js-bookmarks').html(html);
  };
  
  
  const handleSubmitForm = function (){
    $('.add-bookmark').submit(event => {
      event.preventDefault();
      let form = $(event.target).serializeJson();
      console.log(form);

      store.addBookmark(form);
      render();
    });}
  
  const handleBookmarkControls = function() {
    $('.bookmark')
      // expand button
      .on('click', '.btn-expand', event => {
        render();
      })
      // minimize button
      .on('click', '.btn-minimize', event => {
        render();
      })
      // delete button
      .on('click', '.btn-delete', event => {
        render();
      });
  };
  
  const handleFilter = function (){
  
  };

  const bindEventListeners = function() {
    handleBookmarkControls();
    handleSubmitForm();
    handleFilter();
  };

  const serializeJson = function(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    //return JSON.stringify(o);
    return o;
  };

  return {
    render, bindEventListeners
  };
}());