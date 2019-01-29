/* global api */
// eslint-disable-next-line no-unused-vars
'use strict';

const store = (function(){
  // TESTING
  const bookmarks = [{
    title: 'Google', 
    rating: 4, 
    url: 'https://www.google.com', 
    description: 'popular search engine', 
    expanded: false
  }];

  const addBookmark = function(bookmark) {
    try {
      this.bookmarks.push(bookmark);
    } catch(e) {
      console.log(e.message);
    }
  };

  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndUpdate = function(id, newData){
    const item = this.bookmarks.find(item => item.id === id);
    Object.assign(item, newData);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

// change to rating filter
  const toggleCheckedFilter = function() {
    this.hideCheckedItems = !this.hideCheckedItems;
  };

  const setItemIsEditing = function(id, isEditing) {
    const item = this.findById(id);
    item.isEditing = isEditing;
  };



  return {
    // remember to make bookmarks an empty array
    bookmarks,
    findAndUpdate,
    addBookmark,
    findById,
    findAndDelete,
    setItemIsEditing,
    errors: {title: false, url: false},
    createBookmark: false
  };
  
}());