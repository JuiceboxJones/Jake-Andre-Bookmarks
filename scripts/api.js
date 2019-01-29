'use strict';
/*
const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jake-andre/bookmarks';
  
  function listApiFetch(...args) {
    let error = false;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // Valid HTTP response but non-2xx status - let's flag an error!
          error = true;
        }
        // In either case, parse the JSON stream:
        return res.json();
      })
      .then(data => {
        // If error was flagged, throw an error with the JSON message
        if (error) throw new Error(data.message);
        // Otherwise, return the data (all promise chains 
        // return promise objects)
        return data;
      })
      .catch(err => alert(err.message));
  }


  const getBookmark = function() {
    const url = `${BASE_URL}`;
    return listApiFetch(url);
    //return Promise.resolve('A successful response!');
  };

  const createBookmark = function(name){
    const url = `${BASE_URL}`;
    let error = false;
    return listApiFetch(url,
      { method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({name})
      });
  };

  const updateBookmark = function(id, updateData){
    const url = `${BASE_URL}/${id}`;
    return listApiFetch(url, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateData)
    });
  };

  const deleteBookmark = function(id){
    const url = `${BASE_URL}/${id}`;
    return listApiFetch(url, {
      method: 'DELETE'
    });
  };
  */