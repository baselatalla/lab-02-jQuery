'use strict';




function Gallery(animal) {
  this.image_url = animal.image_url;
  this.name = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

let $galleryClone;

Gallery.prototype.render = function (){

  $galleryClone = $('.photo-template').clone();
  $('.gallery').append($galleryClone);
  $galleryClone.find('h2').text(this.name);
  $galleryClone.find('img').attr('src', this.image_url);
  $galleryClone.find('p').text(this.description);
  $galleryClone.removeClass('photo-template');
  $galleryClone.attr('class',this.keyword);
};

Gallery.readjson =() =>{

  const ajaxsettings ={
    method:'get',
    datatype:'json'
  };

  let notRepeated=[];

  $.ajax('/data/page-1.json',ajaxsettings)
    .then(data =>{
      data.forEach((element) => {
        let animalImage = new Gallery(element);
        animalImage.render();
        if(notRepeated.includes(animalImage.keyword)!==true){
          notRepeated.push(animalImage.keyword);
          $('.selectItem').append(`<option value="${animalImage.keyword}"> ${animalImage.keyword} </option>`);
        }
      });
    });
};


$(() => Gallery.readjson());

$('.selectItem').on('change',function(event){
  $('.gallery').empty();
  Gallery.read =() =>{

    const ajaxsettings ={
      method:'get',
      datatype:'json'
    };


    $.ajax('/data/page-1.json',ajaxsettings)
      .then(data =>{
        data.forEach((element) => {
          let animalImage = new Gallery(element);
          if(event.target.value === animalImage.keyword){
            animalImage.render();
          }else if(event.target.value ==='default'){
            animalImage.render();
          }});
      });

  };
  $(() => Gallery.read());
});
