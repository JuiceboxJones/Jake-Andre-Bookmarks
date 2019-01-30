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

// generate HTML on page for bookmark entries
const bookmarkList = (function() {
  const generateBookmarkHtml = function(bookmark) {
    let ratingStars = '';
    let expandedInfo = '';

    if(bookmark.expanded){
      expandedInfo = `<p class="bookmark-description">Description:${bookmark.desc}</p>
      <a href="${bookmark.url}" target="_blank">Visit site</a>
      <button id='delete'>🗑️</button>`;
    }

    for(let i = 0; i < bookmark.rating; i++) {
      ratingStars += '★';
    }

    return `
      <li class="minimized" data-id='${bookmark.id}'>
        <p class="bookmark-title">${bookmark.title} <button id="expand">${bookmark.expanded ? '➖': '➕'}</button></p>
        <p class="bookmark-rating">Rating: ${ratingStars}</p>
        ${expandedInfo}
      </li>
    `;
  };

  const generateBookmarkPage = function(bookmarkItems) {
    const items = bookmarkItems.map(item => generateBookmarkHtml(item));
    return items.join('');
  };
  
  //render HTML
  const render = function() {
    let bookmarks = store.bookmarks.filter(item => item.rating >= parseInt(store.minimumRating));
    const html = generateBookmarkPage(bookmarks);
    console.log('it works!');
    $('#js-bookmarks').html(html);
  };
  
  //Grab the input info from the forms, convert to json
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
          event.currentTarget.reset();
          $('.hide-bookmark').removeClass('hidden');
          $('#add-bookmark').toggleClass('hidden');
          render();
        });
      
    });};

  //handle the ezpanded features of the bookmarks
  const handleBookmarkControls = function() {
    $('#js-bookmarks')
      // expand button
      .on('click', '#expand', event => {
        const element = $(event.currentTarget).closest('li');
        expandBookmark(element);
        
        render();
      })

      // delete button
      .on('click', '#delete', event => {
        const element = $(event.currentTarget).closest('li');
        deleteBookmark(element);
        render();
      });
  };
  
  const handleToggleForm = function() {
    $('.hide-bookmark').on('click', event => {
      $('#add-bookmark').toggleClass('hidden');
      $(event.currentTarget).addClass('hidden');
    });
  };

  //handle the filter by stars feature
  const handleFilter = function (){
    $('#filter-by-rating').on('change', event => {
      filterByRating(event.currentTarget.value);
      render();
    });
  };

  //feature supporting functions -move to store.js before we finish
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

  const bindEventListeners = function() {
    handleBookmarkControls();
    handleSubmitForm();
    handleFilter();
    handleToggleForm();
  };

  const serializeJson = function(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    //return JSON.stringify(o);
    return o;
  };

  return {
    render, 
    bindEventListeners
  };
}());