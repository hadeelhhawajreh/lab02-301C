'use strict';
let allAnimal = [];
let optionArr = ['narwhal', 'narwhal', 'giraffe', 'triceratops', 'rhino', 'mouflon', 'lizard', 'dragon', 'unicorn', 'markhor', 'chameleon', 'narwhal', 'narwhal', 'triceratops', 'rhino', 'mouflon', 'lizard', 'dragon', 'unicorn', 'markhor', 'chameleon'];
var pageNumber='data/page-1.json';
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
     let sections=Mustache.render(templete,this);
     $('main').append(sections);
}

function addSection(){
    $('main').append(`  <template class="photo-template">

    <section> //main container 
      <h2>{{title}}</h2>
      <img src="{{image_url}}" alt="">
      <p>{{description}}</p>
      <p>{{horns}}</p>
    </section>

  </template>`);
}
let uniqueKeyArr = [];
optionArr.forEach((ele) => {
    if (!uniqueKeyArr.includes(ele)) {
        uniqueKeyArr.push(ele);
    }
});

function selectItem() {
    uniqueKeyArr.forEach(element => {
        let option = $(`<option value="${element}"> ${element}</option>`);
        console.log(option);
        $('select').append(option);
    });
};

console.log(uniqueKeyArr);

Animal.readJson = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let animal_create = new Animal(element);
                animal_create.render();
            });
            selectItem();

        });
};
Animal.readJson2 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-2.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let animal_create = new Animal(element);
                animal_create.render();
            });
            selectItem();
        });
};
$(() => Animal.readJson());
$(() => Animal.readJson2());

console.log('allAnimal');

console.log(allAnimal);

$(document).ready(function () {
    $('select').on('change', changeing);
    function changeing(event) {
        let show = event.target.value;
        console.log(show);
        $('main').hide();
        $(`.${show}`).fadeIn(1000);
    };
});
$(()=>{
    $('#sort').click(function(){
        allAnimal.sort((a,b)=>{
            if(a.horns>b.horns)
            return a-b;
        });
    });

});
