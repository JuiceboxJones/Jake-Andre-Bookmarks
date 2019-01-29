/* global api */
// eslint-disable-next-line no-unused-vars
'use strict';

const STORE = { 
  bookmarks: [{
    title: 'Google', 
    rating: 4, 
    url: 'https://www.google.com', 
    description: 'popular search engine', 
    expanded: false
  }],
  errors: {title: false, url: false},
  createBookmark: false};


const store = (function(){
  
  const addItem = function(item) {
    try {
      this.items.push(item);
    } catch(e) {
      console.log(e.message);
    }
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndUpdate = function(id, newData){
    const item = this.items.find(item => item.id === id);
    Object.assign(item, newData);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
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
    bookmarks: [],
    findAndUpdate,
    addItem,
    findById,
    findAndDelete,
    setItemIsEditing,
  };
  
}());