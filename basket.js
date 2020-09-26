'use strict';
const wordbasket_start = document.getElementById('wordbasket_start');
const wordBasket = document.getElementById('wordBasket');
const gameBasketBox = document.getElementById('gameBasketBox');
const basket_result = document.getElementById('basket_result');
const track = document.getElementsByClassName('track');
const game_field = document.getElementById('game_field');
const close_popup_basket = document.getElementById('close_popup_basket'); 
const basket_overlay = document.getElementById('basket_overlay');
const wordbasket_restart = document.getElementById('wordbasket_restart');
const basket_message = document.getElementById('basket_message');
let play_array = [];
let wordBasketBuilt = false;
let runWordBasket;
let b_basket = wordBasket.getBoundingClientRect();  
let bx_basket = gameBasketBox.getBoundingClientRect();
let x_basket = bx_basket.width / 5;
let max_basket;
let correct_catch = 0;
let wrong_words =0;
let xDirection = "";
let player_oldX = 0;
let words_basket_array = [
  ['Customer Focus', 'Customer Foam Cleanser', 'Customer Foous' , 'Costomer Focns', 'Customr Focus' ],
  ['Agility', 'Ability', 'Aqility' , 'Angry', 'Agilty' ],
  ['Collaboration', 'Collavoration', 'Conaboration' , 'Colaboration', 'Cullaboration' ],
  ['Passion', 'Fashion', 'Fassion' , 'Pession', 'Psasion' ],
  ['Sustainability', '5ustionability', 'Sustianability' , 'Sostatinablity', 'Sustainablity' ]
];
// shuffle arrays of words
function shuffle(array) {
  array.sort(function () {
    return Math.random() - 0.5;
  });
}
// get a set of words to show
function getWordsSequence(){
let correctness;
let collected_array = [];
for(let j=0; j< words_basket_array.length; j++){  
  for(let i=0; i< words_basket_array[j].length; i++){
   if(i==0){ 
     correctness = 'correct';
     }
     else{
      correctness = 'wrong';
     }
   let falling_word = document.createElement('div');
   falling_word.innerText = words_basket_array[j][i];

   let flow_position = Math.random() < 0.5 ? 'left' : 'right';
   falling_word.className = 'falling_word  ' +  correctness + ' flow_elements ' + flow_position;
   collected_array.push(falling_word); 
 }
   shuffle(collected_array);
   play_array.push(collected_array);
   collected_array = [];
   }
   shuffle(play_array);
}
function buildBasketGame() {  
  for(let i=0;i<track.length;i++){  
  function buildBasketField(){
    let word_block = document.createElement('div');
    word_block.className = 'word_block';
        
    track[i].appendChild(word_block);
  }
  for (let i=0; i<5; i++){
    buildBasketField();
  }
  }
  wordBasketBuilt = true;
}

function basketOver(){
    let f = document.querySelectorAll('.flow_elements');
    for(let j=0; j < f.length;j++) {
      f[j].remove(f[j]);
    }
    gameBasketBox.removeEventListener('mousemove', getMouseDirection, false);
  } 
// evaluate results
function checkUpBasket(){    
    basket_overlay.style.display = 'block';
    basket_result.style.display = 'block';
    if(correct_catch > 1 && wrong_words ==0) {
      basket_result.className = 'basket_success';
      basket_message.innerHTML = '<p class="basket_done"> Mission 8 Success </p>';
      wordbasket_restart.style.display = 'none';
                
    }
    else {
      basket_result.className = ' ';
      basket_message.innerHTML = '<p class="basket_text">You have catched' + '<br> correct words:  ' + correct_catch + '  of 5; <br> Wrong words: ' +  wrong_words  + '.' + '<br> You can try again!</p>    ';  
      wordbasket_restart.style.display = 'block';
    }    
    correct_catch = 0;  
    wrong_words = 0;  
    clearInterval(runWordBasket);
    basketOver();  
}
// moving words on screen
function moveWords() {
  let falling_word = document.querySelectorAll('.flow_elements');
   if(falling_word.length==0 && play_array.length==0){
     checkUpBasket();
     return false;
   }
  for(let i= 0;i < falling_word.length; i++) {
    let position = falling_word[i].parentElement.nextSibling;
    if(!position){
      let word_block = falling_word[i].parentElement;
      
      if(Math.floor(word_block.offsetLeft) == Math.floor(wordBasket.offsetLeft)) {
        if(falling_word[i].classList.contains('correct')){
          correct_catch++;
            falling_word[i].remove(falling_word[i]);          
        } 
        else {
          wrong_words++;      
          falling_word[i].remove(falling_word[i]);
        }
        
      } else {
            falling_word[i].remove(falling_word[i]);                
      }      
    } else {
      position.appendChild(falling_word[i]);
    }    
  }
    let falling = play_array[0][0]; 
    track[Math.floor(Math.random()*track.length)].firstChild.appendChild(falling);

    play_array[0].splice(0,1);
    if(play_array[0].length==0){
      play_array.splice(0,1);            
    } 
}  
// get coodinates of basket
function getcoordinates(){
   b_basket = wordBasket.getBoundingClientRect();  
   bx_basket = gameBasketBox.getBoundingClientRect();
   x_basket = bx_basket.width / 5;
    max_basket = (bx_basket.width/5) *4;
}
 let bodyElement = document.querySelector('body');
// mouse event handler 
function getMouseDirection(e) {

    if (player_oldX < e.pageX) {
        xDirection = 'right';
    } else {
        xDirection = 'left';
    }
    player_oldX = e.pageX;
    getcoordinates();
let track_index = Math.floor(e.pageX / x_basket)-1;
if(track_index< 0){
   track_index= 0;
}
if(track_index>10){
   track_index =10;
}
 let offset = track_index * x_basket;
  wordBasket.style.left = offset + 'px';                 
}
function basketNewgame(){
 getWordsSequence();
  if(wordBasketBuilt ==false){  
   buildBasketGame();
  }
  else{
     basket_result.style.display = 'none'; 
     basket_overlay.style.display = 'none';
  }
  gameBasketBox.addEventListener('mousemove', getMouseDirection, false);
  runWordBasket = setInterval(moveWords,  800);
}
// events
// touch evnt handler
function getTouchBasket(event){
 let xCoordinate = event.touches[0].clientX;
let width = screen.width/2;
  getcoordinates(); 

   if(xCoordinate<=width){

       
     if(wordBasket.offsetLeft + b_basket.width < bx_basket.width) {      
      wordBasket.style.left = wordBasket.offsetLeft + x_basket + "px";          
    } 
   }
  else {

  	    if(b_basket.left - x_basket > 0) {
      wordBasket.style.left = wordBasket.offsetLeft - x_basket + 'px';  
    }
    else {     
       wordBasket.style.left = '0';      
    }  
}
}
// click a start button
wordbasket_start.addEventListener('click', function(e){
basketNewgame();
});
// moving basket from keyboard;
window.addEventListener('keyup',function(e){
  b_basket = wordBasket.getBoundingClientRect();
  bx_basket = gameBasketBox.getBoundingClientRect();
  x_basket = bx_basket.width / 5;    
  if(e.keyCode == 37) {
    if(b_basket.left - x_basket > 0) {
       let offset = wordBasket.offsetLeft - x_basket;
      if(offset < 0){
        wordBasket.style.left = '0'; 
      }
      else{
         wordBasket.style.left = offset + 'px'; 
      } 
    }
    else {
      wordBasket.style.left = '0';      
    }   
  }
  if(e.keyCode == 39) {
    if(wordBasket.offsetLeft + b_basket.width < bx_basket.width) {
      wordBasket.style.left = wordBasket.offsetLeft + x_basket + 'px'; 
    }    
  }
});
close_popup_basket.addEventListener('click', function(e){
basket_overlay.style.display = 'none';
});
// bodyElement.addEventListener('touchstart', getTouchBasket, true);
// restart game if fail
wordbasket_restart.addEventListener('click', function(e){
basketNewgame();
});
let event = null;
document.addEventListener("touchstart", function (e) {
    event = e;
});
document.addEventListener("touchmove", function (e) {
    if (event) {
        if (e.touches[0].pageY - event.touches[0].pageY >0){
        	if(b_basket.left - x_basket > 0) {
      wordBasket.style.left = wordBasket.offsetLeft - x_basket + 'px';  
    }
    else {     
       wordBasket.style.left = '0';      
    }  
        
      }
        else{
        	if(wordBasket.offsetLeft + b_basket.width < bx_basket.width) {         
            wordBasket.style.left = wordBasket.offsetLeft + x_basket + "px";          
            } 

            else{
    
            wordBasket.style.left =b_basket.width*4 + "px";   	
            }
        }
   }
 });
 document.addEventListener("touched", function (e) {
    event = null;
 });