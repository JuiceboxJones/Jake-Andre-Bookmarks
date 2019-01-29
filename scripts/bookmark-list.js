'use strict';

const bookmarkList = (function() {
  const generateBookmarkHtml = function() {
    return `
      <li class="minimized">
        <p>Title:<button>Expand</button></p>
        <p>Rating:</p>
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
    return JSON.stringify(o);
  };

  return {
    render, bindEventListeners
  };
}());