'use strict';
let optionArr = ['narwhal', 'triceratops', 'rhino', 'mouflon', 'lizard', 'dragon', 'unicorn', 'markhor', 'chameleon'];
let allAnimal=[];
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
}
selectItem();
function selectItem() {
    let parent = document.getElementById('select');
    let option;
    for (let i = 0; i < optionArr.length; i++) {
      option=document.createElement('option');
      option.textContent=optionArr[i];
      parent.appendChild(option);

    } 
     show_keyWord();

}
 function show_keyWord() {
    let templete= $('.photo-template') 
  for (let l = 0; l < allAnimal.length; l++) {
    if( this.keyword==='narwhal'){
           
        templete.find('img').attr('src', this.image_url).hide();
    }

//   templete.find('img').attr('src', this.image_url).hide();
  }
   
}

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
        });
};
$(() => Animal.readJson());
console.log('allAnimal');

console.log(allAnimal);
// var select =document.getElementById('select');
// var opt =document.getElementsByTagName('option');
// select.addEventListener('click',(event)=>{
//     console.log(event);

// });
