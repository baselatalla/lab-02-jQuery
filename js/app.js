'use strict';




function Gallery(animal) {
  this.image_url = animal.image_url;
  this.name = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}


Gallery.prototype.render = function (){

  let $galleryClone = $('.photo-template').clone();
  $('main').append($galleryClone);
  $galleryClone.find('h2').text(this.name);
  $galleryClone.find('img').attr('src', this.image_url);
  $galleryClone.find('p').text(this.description);
  $galleryClone.removeClass('photo-template');
  $galleryClone.attr('class',this.name);
};

Gallery.readjson =() =>{

  const ajaxsettings ={
    method:'get',
    datatype:'json'
  };

  $.ajax('/data/page-1.json',ajaxsettings)
    .then(data =>{
      data.forEach((element) => {
        let animalImage = new Gallery(element);
        console.log(animalImage);
        animalImage.render();
      });
    });

};

$(() => Gallery.readjson());
