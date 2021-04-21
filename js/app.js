/* eslint-disable no-undef */
'use strict';


let allImagesData = [];
let notRepeated = [];
let dataSourcePageNumber = 1;


function Gallery(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  allImagesData.push(this);
}



Gallery.prototype.render = function (){
  let template = $('.photo-template').html();
  let gallaryTemplate = Mustache.render(template,this);
  $('section').append(gallaryTemplate);
};



const ajaxsettings ={
  method:'get',
  datatype:'json'
};


let pageData = function(){
  $.ajax(`./data/page-${dataSourcePageNumber}.json`,ajaxsettings)
    .then(data =>{
      data.forEach((element) => {
        let animalImage = new Gallery(element);
        animalImage.render();
        notRepeated = [];
        if(!notRepeated.includes(animalImage.keyword)){
          notRepeated.push(animalImage.keyword);
          $('select').append(`<option class="options" value="${animalImage.keyword}"> ${animalImage.keyword.toUpperCase()} </option>`);
        }
      });
    });


  $('select').on('change',function(){
    let select = $(this).val();
    $('div').hide();
    $(`.${select}`).show();
  });
};

pageData();

$('#page1').on('click',() =>{
  $('section').empty();
  $('options').empty();
  dataSourcePageNumber =1;
  notRepeated = [];
  pageData();

});

$('#page2').on('click',() =>{
  $('section').empty();
  $('options').empty();
  dataSourcePageNumber =2;
  notRepeated = [];
  pageData();
  
  // $.ajax('./data/page-2.json',ajaxsettings)
  //   .then(data1 =>{
  //     data1.forEach((element) => {
  //       let animalImage = new Gallery(element);
  //       animalImage.render();
  //       console.log(animalImage.keyword);
  //       if(!notRepeated2.includes(animalImage.keyword)){
  //         notRepeated2.push(animalImage.keyword);
  //         $('select').append(`<option value="${animalImage.keyword}"> ${animalImage.keyword.toUpperCase()} </option>`);
  //       }
  //     });
  //   });


  // $('.selectItem').on('change',function(){
  //   let select = $(this).val();
  //   $('div').hide();
  //   $(`.${select}`).show();
  // });
});
