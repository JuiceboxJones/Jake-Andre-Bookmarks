'use strict';

function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);


function handleSubmitForm(){
  $('.add-bookmark').submit(event => {
    event.preventDefault();
    console.log(event.currentTarget);
  });}

function handleExpand(){

}

function handleDelete(){

}

function handleMinimize(){

}

function handleVisitLink(){

}

function handleFilter(){

}


function main(){
//nest event listeners for page ready
  handleSubmitForm();

}

$(main);



console.log('connected');