const wordbasket_start = document.getElementById('wordbasket_start');
const wordbasket_left = document.getElementById('wordbasket_left');
const wordbasket_right = document.getElementById('wordbasket_right');
const wordBasket = document.getElementById('wordBasket');
const box = document.getElementById('gameBox');
const game_result = document.getElementById('game_result');
let words_basket_array = [
  ['Customer Focus', 'Customer Foam Cleanser', 'Customer Foous' , 'Costomer Focns', 'Customr Focus' ],
  ['Agility', 'Ability', 'Aqility' , 'Angry', 'Agilty' ],
  ['Collaboration', 'Collavoration', 'Conaboration' , 'Colaboration', 'Cullaboration' ],
  ['Passion', 'Fashion', 'Fassion' , 'Pession', 'Psasion' ],
  ['Sustainability', '5ustionability', 'Sustianability' , 'Sostatinablity', 'Sustainablity' ]
]; 

var track = document.getElementsByClassName('track');
let score = 0;
var type = ["apple"];
var good = ["good","bad"];

// document.getElementById('score').innerHTML = score;

// var gameBox = document.getElementById('gameBox');

// build tree and game layout
function buildGame() {  
  for(var i=0;i<track.length;i++){
  
  function buildBlocks(){
    var block = document.createElement('div');
    block.className = "block";
    var fruit = document.createElement('div');
    fruit.className = "fruit orange ghost";
    
    track[i].appendChild(block).appendChild(fruit)
  }
    buildBlocks()
    buildBlocks()
    buildBlocks()
    buildBlocks()    
    buildBlocks()    
  }
}


function over(){
    var f = document.querySelectorAll('.top')
    for(var j=0;j<f.length;j++) {
      f[j].remove(f[j]);
    }
  }  

function moveFruit() {
  if(score == 25) {
    score = 0;
    // document.getElementById('score').innerHTML = score;
    over();       
clearInterval(runGame);
    game_result.style.display = 'block';
    game_result.innerText = 'Great job!';          

  }
  if(score == -10) {

    game_result.style.display = 'block';
    game_result.innerText = 'You made ' + score + ' mistakes. You can try again!';
   

    score = 0;
    // document.getElementById('score').innerHTML = score
            
    // clear fruit for next game
    over();        
    clearInterval(runGame);  
    // alert('YOU LOSE!\r\rBE SAD.  :(')   
  }  
  
  var fruit = document.querySelectorAll('.top');
  for(var i=0;i< fruit.length; i++) {
    var dest = fruit[i].parentElement.nextSibling;
    
    // scoring and removing fruit
    if(!dest){
      var block = fruit[i].parentElement;
      var wordBasket = document.getElementById('wordBasket');
      
      if(Math.floor(block.offsetLeft) == Math.floor(wordBasket.offsetLeft)) {
        if(fruit[i].classList.contains("good")){
          score++;
          // document.getElementById('score').innerHTML = score;
          fruit[i].remove(fruit[i]);          
        } else {
          score--;
          // document.getElementById('score').innerHTML = score
          fruit[i].remove(fruit[i]);
        }
        
      } else {
        if(fruit[i].classList.contains("good")){
            score--;
            // document.getElementById('score').innerHTML = score        
        }
            fruit[i].remove(fruit[i]);                
      }      
    } else {
      dest.appendChild(fruit[i]);
    }    
  }
  
  // add new fruit
  var fruit = document.createElement('div');



  let correctness = (Math.random() < 0.5 ? "good" : "bad");

  fruit.className = "fruit "+type[0]+" "+ correctness+" top";

  if(correctness == "good"){
    fruit.innerText = words_basket_array[0][0];
  }
  else{
    fruit.innerText = words_basket_array[1][2];
  }

    



  // random fruit color
// var colorOne = 'hsla(' + (Math.floor(Math.random()*360)) + ', 100%, 50%, 1)';
// var colorTwo = 'hsla(' + (Math.floor(Math.random()*360)) + ', 100%, 50%, 1)';
// fruit.style.background = "radial-gradient(circle at 60% 25%,"+colorOne+","+colorTwo+")"
    track[Math.floor(Math.random()*track.length)].firstChild.appendChild(fruit)
}

    var runGame = setInterval(moveFruit,  600);

// click a start button
wordbasket_start.addEventListener('click', function(e){
  game_result.style.display = 'none';
  over(); 
  buildGame();
});

function getcoordinates(){
 var b = wordBasket.getBoundingClientRect();  
  var bx = box.getBoundingClientRect();
  var x = bx.width / 5;
}


// moving basket from keyboard;
window.addEventListener('keyup',function(e){
  b = wordBasket.getBoundingClientRect();
  bx = box.getBoundingClientRect();
  x = bx.width / 5;    
  if(e.keyCode == 37) {
    if(b.left - x > 0) {
      wordBasket.style.left = wordBasket.offsetLeft - x + "px";  
    }
    else {
      wordBasket.style.left = "0px";      
    }   
  }

  if(e.keyCode == 39) {
    if(wordBasket.offsetLeft + b.width < bx.width) {
      wordBasket.style.left = wordBasket.offsetLeft + x + "px"; 
    }    
  }
});

// moving basket using arrows buttons
wordbasket_left.addEventListener('click', function(e){
   getcoordinates();
    if(b.left - x > 0) {
      wordBasket.style.left = wordBasket.offsetLeft - x + "px"  
    }
    else {     
       wordBasket.style.left = "0px";      
    }   
});
wordbasket_right.addEventListener('click', function(e){
 getcoordinates();    
     if(wordBasket.offsetLeft + b.width < bx.width) {      
      wordBasket.style.left = wordBasket.offsetLeft + x + "px";          
    }    
});