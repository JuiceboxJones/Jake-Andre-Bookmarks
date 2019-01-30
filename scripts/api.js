'use strict';
/* global store */

const api = (function () {


  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jake-andre/bookmarks';
  
  // handle all server side errors
  function listApiFetch(...args) {
    let error = false;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = true;
        }
        return res.json();
      })
      .then(data => {
        if (error) throw new Error(data.message);
        store.hideError('');
        return data;
      })
      .catch(err => store.showError(err.message));
  }

  // GET request
  const getBookmark = function() {
    const url = `${BASE_URL}`;
    return listApiFetch(url);
  };

  // POST request 
  const createBookmark = function(obj){
    const url = `${BASE_URL}`;
    let error = false;
    return listApiFetch(url,
      { method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
      });
  };
  
  // DELETE request
  const deleteBookmark = function(id){
    const url = `${BASE_URL}/${id}`;
    return listApiFetch(url, {
      method: 'DELETE'
    });
  };
  
  // UPDATE request
  // const updateBookmark = function(id, updateData){
  //   const url = `${BASE_URL}/${id}`;
  //   return listApiFetch(url, {
  //     method: 'PATCH',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify(updateData)
  //   });
  // };



  return {
    getBookmark,
    createBookmark,
    deleteBookmark
  };
}());
