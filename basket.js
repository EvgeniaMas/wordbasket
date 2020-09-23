'use strict';
const wordbasket_start = document.getElementById('wordbasket_start');
const wordbasket_left = document.getElementById('wordbasket_left');
const wordbasket_right = document.getElementById('wordbasket_right');
const wordBasket = document.getElementById('wordBasket');
const gameBasketBox = document.getElementById('gameBasketBox');
const game_result = document.getElementById('game_result');
let words_basket_array = [
  ['Customer Focus', 'Customer Foam Cleanser', 'Customer Foous' , 'Costomer Focns', 'Customr Focus' ],
  ['Agility', 'Ability', 'Aqility' , 'Angry', 'Agilty' ],
  ['Collaboration', 'Collavoration', 'Conaboration' , 'Colaboration', 'Cullaboration' ],
  ['Passion', 'Fashion', 'Fassion' , 'Pession', 'Psasion' ],
  ['Sustainability', '5ustionability', 'Sustianability' , 'Sostatinablity', 'Sustainablity' ]
]; 
let track = document.getElementsByClassName('track');
let score = 0;
let word_count =1;
let max_word_count =  words_basket_array.length;
let corect = ['corect','wrong'];
let b_coordinate = wordBasket.getBoundingClientRect();
let bx_basket = gameBasketBox.getBoundingClientRect();
let x_basket = bx_basket.width / 5; 

function buildGame() {  
  for(let i=0; i< track.length; i++){
  
  function buildBlocks(){
    let block = document.createElement('div');
    block.className = 'block';
    let falling_word = document.createElement('div');
    falling_word.className = 'falling_word';
    
    track[i].appendChild(block).appendChild(falling_word)
  }
    buildBlocks()
    buildBlocks()
    buildBlocks()
    buildBlocks()    
    buildBlocks()    
  }
}


function over(){
    let f = document.querySelectorAll('.top')
    for(let j=0;j<f.length;j++) {
      f[j].remove(f[j]);
    }
  }  

function moveFruit() {
  if(score == 25) {
    score = 0;
    // document.getElementById('score').innerHTML = score;
    over();       
    // clearInterval(runGame);
    game_result.style.display = 'block';
    game_result.innerText = 'Great job!';          

  }
  if(score == -10) {

    game_result.style.display = 'block';
    game_result.innerText = 'You made ' + score + ' mistakes. You can try again!';
   

    score = 0;
    // document.getElementById('score').innerHTML = score
            
    // clear falling_word for next game
    over();        
    // clearInterval(runGame);  
   
  }  
  
  let falling_word = document.querySelectorAll('.top');
  for(let i=0;i< falling_word.length; i++) {
    let dest = falling_word[i].parentElement.nextSibling;
    
    // scoring and removing falling_word
    if(!dest){
      let block = falling_word[i].parentElement;
      let wordBasket = document.getElementById('wordBasket');
      
      if(Math.floor(block.offsetLeft) == Math.floor(wordBasket.offsetLeft)) {
        if(falling_word[i].classList.contains('correct')){
          score++;
          // document.getElementById('score').innerHTML = score;
          falling_word[i].remove(falling_word[i]);          
        } else {
          score--;
          // document.getElementById('score').innerHTML = score
          falling_word[i].remove(falling_word[i]);
        }
        
      } else {
        if(falling_word[i].classList.contains('correct')){
            score--;
            // document.getElementById('score').innerHTML = score        
        }
            falling_word[i].remove(falling_word[i]);                
      }      
    } else {
      dest.appendChild(falling_word[i]);
    }    
  }
  
  // add new falling_word
  falling_word = document.createElement('div');



  let correctness = (Math.random() < 0.5 ? 'correct' : 'wrong');

  falling_word.className = 'falling_word  ' +   ' word_view  '   + '  '  + correctness + ' ' + 'top';

  if(correctness == 'correct'){
    falling_word.innerText = words_basket_array[0][0];
  }
  else{
    falling_word.innerText = words_basket_array[1][2];
  }

    



  // random falling_word color
// let colorOne = 'hsla(' + (Math.floor(Math.random()*360)) + ', 100%, 50%, 1)';
// let colorTwo = 'hsla(' + (Math.floor(Math.random()*360)) + ', 100%, 50%, 1)';
// falling_word.style.background = "radial-gradient(circle at 60% 25%,"+colorOne+","+colorTwo+")"
    track[Math.floor(Math.random()*track.length)].firstChild.appendChild(falling_word)
}

    let runGame = setInterval(moveFruit,  600);

// click a start button
wordbasket_start.addEventListener('click', function(e){
  game_result.style.display = 'none';
  over(); 
  buildGame();
});

function getcoordinates(){
  b_coordinate = wordBasket.getBoundingClientRect();  
  bx_basket = gameBasketBox.getBoundingClientRect();
  x_basket = bx_basket.width / 5;
}


// moving basket from keyboard;
window.addEventListener('keyup',function(e){
  b_coordinate = wordBasket.getBoundingClientRect();
  bx_basket = gameBasketBox.getBoundingClientRect();
  x_basket = bx_basket.width / 5;    
  if(e.keyCode == 37) {
    if(b_coordinate.left - x_basket > 0) {
      wordBasket.style.left = wordBasket.offsetLeft - x_basket + 'px';  
    }
    else {
      wordBasket.style.left = '0';      
    }   
  }

  if(e.keyCode == 39) {
    if(wordBasket.offsetLeft + b_coordinate.width < bx_basket.width) {
      wordBasket.style.left = wordBasket.offsetLeft + x_basket + 'px'; 
    }    
  }
});

// moving basket using arrows buttons
wordbasket_left.addEventListener('click', function(e){
   getcoordinates();
    if(b_coordinate.left - x_basket > 0) {
      wordBasket.style.left = wordBasket.offsetLeft - x_basket + 'px'  
    }
    else {     
       wordBasket.style.left = '0';      
    }   
});
wordbasket_right.addEventListener('click', function(e){
 getcoordinates();    
     if(wordBasket.offsetLeft + b_coordinate.width < bx_basket.width) {      
      wordBasket.style.left = wordBasket.offsetLeft + x_basket + 'px';          
    }    
});