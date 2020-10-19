'use strict';
function Animal(animalObj) {
    this.title = animalObj.title;
    this.keyword = animalObj.keyword;
    this.description = animalObj.description;
    this.horns = animalObj.horns;
    this.image_url = animalObj.image_url;
}
Animal.prototype.render = function () {
    let templete = $('.photo-template').clone();
    $('main').append(templete);
    templete.find('h2').text(this.title);
    templete.find('img').attr('src', this.image_url);
    templete.find('p').text(this.description);
    templete.removeClass('.photo-template');
}
Animal.readJson = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('/data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let animal_create = new Animal(element);
                animal_create.render();
            });
        });
};
$(() => Animal.readJson());