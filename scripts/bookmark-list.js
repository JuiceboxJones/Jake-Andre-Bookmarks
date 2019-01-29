'use strict';

/* global store, api */

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
    let expandedInfo = '';
    if(bookmark.expanded === true){
      expandedInfo = `<p>Description:${bookmark.desc}</p>
      <button id='delete'>🗑️</button>`;
    }

    for(let i = 0; i < bookmark.rating; i++) {
      ratingStars += '★';
    }

    return `
      <li class="minimized" data-id='${bookmark.id}'>
        <p>${bookmark.title} <button id="expand">${bookmark.expanded ? '➖': '➕'}</button></p>
        <p>Rating: ${ratingStars}</p>
        ${expandedInfo}
      </li>
    `;
  };

  const generateBookmarkPage = function(bookmarkItems) {
    const items = bookmarkItems.map(item => generateBookmarkHtml(item));

    return items.join('');
  };

  const render = function() {
    let bookmarks = store.bookmarks.filter(item => item.rating > store.minimumRating);
    const html = generateBookmarkPage(bookmarks);
    console.log('it works!');
    $('#js-bookmarks').html(html);
  };
  
  
  const handleSubmitForm = function (){
    $('.add-bookmark').submit(event => {
      event.preventDefault();
      let form = $(event.target).serializeJson();
      api.createBookmark(form)
        .then(newBookmark => {
          if(typeof newBookmark === 'undefined'){
            throw new TypeError('error');
          }
          store.addBookmark(newBookmark);
          render();
        });
      
    });};

  const expandBookmark = function(element) {
    let id = element.data('id');
    let bookmark = store.bookmarks.find(element => element.id === id);
    bookmark.expanded = !bookmark.expanded;
  };

  const deleteBookmark = function(element) {
    let id = element.data('id');
    api.deleteBookmark(id);
    store.findAndDelete(id);
  };

  const filterByRating = function(rating) {
    store.minimumRating = rating;
  };
  
  const handleBookmarkControls = function() {
    $('#js-bookmarks')
      // expand button
      .on('click', '#expand', event => {
        const element = $(event.currentTarget).closest('li');
        expandBookmark(element);
        
        render();
      })
      // minimize button
      .on('click', '.btn-minimize', event => {
        render();
      })
      // delete button
      .on('click', '#delete', event => {
        const element = $(event.currentTarget).closest('li');
        deleteBookmark(element);
        render();
      });
  };
  
  const handleFilter = function (){
    $('#filter-by-rating').on('change', event => {
      filterByRating(event.currentTarget.value);
      render();
    });
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