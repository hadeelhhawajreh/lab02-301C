'use strict';
let allAnimal = [];
let allOptions = [];
function Animal(animalObj) {
    this.title = animalObj.title;
    this.keyword = animalObj.keyword;
    this.description = animalObj.description;
    this.horns = animalObj.horns;
    this.image_url = animalObj.image_url;
    allAnimal.push(this);
}
Animal.prototype.render = function () {
    // let templete = $('.photo-template').clone();
    // $('main').append(templete);
    // templete.find('h2').text(this.title);
    // templete.find('img').attr('src', this.image_url);
    // templete.find('p').text(this.description);
    // templete.removeClass('photo-template');
    // templete.attr('class', this.keyword);
    let templete = $('.photo-template').html();
    let sections = Mustache.render(templete, this);
    $('main').append(sections);
}

function addSection() {
    $('main').append(`<template class="photo-template">
    <section class="{{keyword}}">
        <h2 >{{title}}</h2>
        <img src="{{image_url}}" alt="">
        <p>{{description}}</p>
        <p>{{horns}}</p>
    </section>

</template>`);
}

// allAnimal.forEach((element) => {
//     if (!allOptions.includes(element.keyword)) {
//         allOptions.push(element.keyword);
//     }
//     return uniqueKeyArr;
// });

// function selectItem() {
//     allOptions.forEach(element => {
//         let option = $(`<option value="${element}"> ${element}</option>`);
//         $('select').append(option);
//     });

// console.log('aaaaaaaaaaaa');
// console.log(allOptions);

// selectItem();
let readJson = () => {
    allAnimal = [];
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let animal_create = new Animal(element);
                if (!allOptions.includes(element.keyword)) {
                    let option = $(`<option value="${element.keyword}"> ${element.keyword}</option>`);
                    $('select').append(option);
                    allOptions.push(element.keyword);
                }
                animal_create.render();
            });

        });
};
let readJson2 = () => {
    // allAnimal=[];

    const ajaxSettings = {

        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-2.json', ajaxSettings)

        .then(data => {
            data.forEach(element => {
                allAnimal = [];
                let animal_create = new Animal(element);
                if (!allOptions.includes(element.keyword)) {

                    let option = $(`<option value="${element.keyword}"> ${element.keyword}</option>`);
                    $('select').append(option);
                    allOptions.push(element.keyword);
                }
                animal_create.render();
            });
        });
};
$(() => readJson());
// $(() =>  readJson2());

$('#pageOne').click(() => {
    $('select').empty();
    allAnimal=[];
    allOptions=[];
    $('select').append(`<option value="default">Filter by Keyword</option>`);
    $('section').remove();
    addSection();
    allOptions = [];
    allAnimal = [];
    readJson();
});

$('#pageTwo').click(() => {
    $('select').empty();
    allAnimal=[];
    allOptions=[];
    
    $('select').append(`<option value="default">Filter by Keyword</option>`);
      $('section').remove();
    addSection();
    readJson2();
});

console.log('allAnimal');
$(document).ready(function () {
    $('select').on('change', changeing);
    function changeing(event) {
        let show = event.target.value;
        console.log(show);
        $('section').hide();
        if (show === 'default') {
            $('section').fadeIn();
        }
        else {
            $(`.${show}`).fadeIn(1000);
        }
    };
});


    $('#sort2').click( function () {
        $('main').empty();
        addSection();
        sortTitle();
        
        allAnimal.forEach(element => {
            element.render();
        });
    });
    $('#sort').click( function () {
        $('main').empty();
        addSection();
        sortHorns();
        allAnimal.forEach(element => {
            element.render();
        });
    });

function sortTitle() {

    allAnimal.sort( (a,b) => {
      if(a.title.toUpperCase() > b.title.toUpperCase()){
        return 1;
      } else {
        return -1;
      }
      return 0;
    });
  
  }





  function sortHorns() {
    allAnimal.sort((a, b) => {
      return Number(a.horns) - Number(b.horns);
    });
  
  }
  