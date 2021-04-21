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

let sortedArray =[];

let pageData = function(sortIndex){
  $.ajax(`./data/page-${dataSourcePageNumber}.json`,ajaxsettings)
    .then(data =>{
      $('.selectItem').append('<option  value="default"> Filter by Keyword </option>');
      notRepeated = [];
      sortedArray = data;
      if(sortIndex === 1){
        sortedArray.sort((a,b)=>{
          if (a.title < b.title){
            return -1;
          }
          else if (a.title > b.title) return 1;
          else return 0;
        });}else if(sortIndex === 2){
        sortedArray.sort((a,b)=>{
          if (a.horns < b.horns){
            return -1;
          }
          else if (a.horns > b.horns) return 1;
          else return 0;
        });}
      console.log(data);
      sortedArray.forEach((element) => {
        let animalImage = new Gallery(element);
        animalImage.render();
        if(!notRepeated.includes(animalImage.keyword)){
          notRepeated.push(animalImage.keyword);
          $('.selectItem').append(`<option class="options" value="${animalImage.keyword}"> ${animalImage.keyword.toUpperCase()} </option>`);
        }
      });
    });
  $('.selectItem').on('change',function(){
    let selectItem = $(this).val();
    if (selectItem !== 'default'){
      $('div').hide();
      $(`.${selectItem}`).show();
    }else {$('div').show();}
  });
};


pageData(0);

$('#page1').on('click',() =>{
  $('section').empty();
  $('.selectItem').empty();
  dataSourcePageNumber =1;
  pageData(0);

});

$('#page2').on('click',() =>{
  $('section').empty();
  $('.selectItem').empty();
  dataSourcePageNumber =2;
  pageData(0);

});


$('.selectStoreMethod').on('change', function(){
  let sortType = $(this).val();
  $('section').empty();
  $('.selectItem').empty();
  if(sortType === 'title'){
    pageData(1);
  }else if(sortType === 'horns'){
    $('section').empty();
    $('.selectItem').empty();
    pageData(2);
  } else{pageData(0); }
});
