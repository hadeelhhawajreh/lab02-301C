'use strict';
let allAnimal = [];
let optionArr = ['narwhal', 'narwhal', 'triceratops', 'rhino', 'mouflon', 'lizard', 'dragon', 'unicorn', 'markhor', 'chameleon', 'narwhal', 'narwhal', 'triceratops', 'rhino', 'mouflon', 'lizard', 'dragon', 'unicorn', 'markhor', 'chameleon'];

function Animal(animalObj) {
    this.title = animalObj.title;
    this.keyword = animalObj.keyword;
    this.description = animalObj.description;
    this.horns = animalObj.horns;
    this.image_url = animalObj.image_url;
    allAnimal.push(this);
}
Animal.prototype.render = function () {
    let templete = $('.photo-template').clone();
    $('main').append(templete);
    templete.find('h2').text(this.title);
    templete.find('img').attr('src', this.image_url);
    templete.find('p').text(this.description);
    templete.removeClass('photo-template');
    templete.attr('class', this.keyword);
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
$(() => Animal.readJson());
console.log('allAnimal');

console.log(allAnimal);

$(document).ready(function () {
    $('select').on('change', changeing);
    function changeing(event) {
        let show = event.target.value;
        console.log(show);
        $('div').hide();
        $(`.${show}`).fadeIn(1000);
    };
});