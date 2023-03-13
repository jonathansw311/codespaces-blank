const ends = document.querySelector('body');//sets up for scores out of the div
const gameContainer = document.querySelector(".game");
let cardPicks=0;// keeps track of how many guesses
let id=0;//initializes id for card div
let curScore = 0;//initializes high score
let draw = {};//initializes object for card draw
let cardsMatched = 0;//keeps track of how many cards have been matched
let first = true;//lets us know if this is the first time a card has been picked
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div.  I added a container to the outside of the cards to show a white outer edge
    //thinking about it I probably just could have used a white border instead of putting a color on top of a white div
    const newDiv = document.createElement("div");
    const outerDiv = document.createElement('div');
    outerDiv.classList.add("cContainer");
    const outer = document.querySelector('.game');
    outer.append(outerDiv);
  
    
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color, "card");
    newDiv.setAttribute('id', id)// adds an id to each card
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    // gameContainer.append(newDiv);
    outerDiv.append(newDiv);
    id++;//increments the card #id plus one for the next loop;
    
    
    //the following five paragraphs of code create the five layers of divs requred for the back of the card styling
    const innerDivZero = document.createElement('div');
    innerDivZero.classList.add('innerDivZero');
    newDiv.append(innerDivZero);
    
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('innerDivOne');
    newDiv.append(innerDiv);
  
    const innerDivTwo = document.createElement('div');
    innerDivTwo.classList.add('innerDivTwo');
    newDiv.append(innerDivTwo);
  
    const innerDivThree = document.createElement('div');
    innerDivThree.classList.add('innerDivThree');
    newDiv.append(innerDivThree);
  
    const innerDivFour = document.createElement('div');
    innerDivFour.classList.add('innerDivFour');
    newDiv.append(innerDivFour);
    updateScore(curScore);
  }}
 
  
  
  
 



// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  
  
  const cardColor=event.target.classList.item(0);//gets color of selected card
  const cardId=event.target.id;//gets id of selectted card
  let same = false;//same lets us know if we have clicked the same card.  default is no
  if (cardId === Object.keys(draw)[0]){console.log("we have a same card match")//checks to see if we have clicked the same card
   same = sameCard();//runs same card function, and returns true
  };
  draw[cardId]= cardColor//puts id and color into an object
   if (!same){//as long as the same card has not been drawn
   event.target.style.backgroundColor=cardColor;}//sets the background color to the card color
  if(same){draw = {};}//if the same card has been run, the object is cleared
  
  //the following five paragraphs are for css styling of the card.  the back of the card is made up of five divs
  //these divs are turned on and off by adding a class of "clicked".  when the card is not "click" the back of the card is 
  //shown showing the back fo the card design.  when the card is "clicked" the card color is changed to the front
  const innerDiv0 = event.target.querySelector(".innerDivZero");
  innerDiv0.classList.toggle('clicked');
  

  const innerDiv1 = event.target.querySelector(".innerDivOne");
  innerDiv1.classList.toggle('clicked');
  

  const innerDiv2 = event.target.querySelector(".innerDivTwo");
  innerDiv2.classList.toggle('clicked');
  

  const innerDiv3 = event.target.querySelector(".innerDivThree");
  innerDiv3.classList.toggle('clicked');
  

  const innerDiv4 = event.target.querySelector(".innerDivFour");
  innerDiv4.classList.toggle('clicked');
 
if(!same){//does not run matchOrNot function if we are in a same card condition
  matchOrNot();}//matchOrNot function is run
same = false;  //sets same card property back to false
}

// when the DOM loads
createDivsForColors(shuffledColors);

function matchOrNot(){
  if(Object.values(draw)[0]!= undefined && Object.values(draw)[1] != undefined){//if we have two cards loaded in the object
    if (Object.values(draw)[0]=== Object.values(draw)[1])// the two colors match than we have a winning pair
    { 
    match();
    }

    else {//the two colors do not match
        curScore = curScore - 20;//decreases score every time a card is not matched
        updateScore(curScore);//score is updated
        setTimeout(function(){//we have a looser.  a timer is started so we can see what the cards were
        const getId = document.getElementById(Object.keys(draw)[0]);//id of first card is gotten so we can turn that card back over
  
  
  // the following repeading lines of code reset the card from the front back to back with the design on the back shown
  const innerZero = getId.querySelector(".innerDivZero" );
  innerZero.classList.toggle('clicked');
  
  const innerOne = getId.querySelector(".innerDivOne" );
  innerOne.classList.toggle('clicked');

  const innerTwo = getId.querySelector(".innerDivTwo" );
  innerTwo.classList.toggle('clicked');
  
  const innerThree = getId.querySelector(".innerDivThree" );
  innerThree.classList.toggle('clicked');

  const innerFour = getId.querySelector(".innerDivFour" );
  innerFour.classList.toggle('clicked');
  
  const getIdtwo = document.getElementById(Object.keys(draw)[1]);//card id of second card is retreived so we can turn that card back over
  
  const innerZero2 = getIdtwo.querySelector(".innerDivZero");
  innerZero2.classList.toggle('clicked');
    
  const innerOne2 = getIdtwo.querySelector(".innerDivOne");
  innerOne2.classList.toggle('clicked');

  const innerTwo2 = getIdtwo.querySelector(".innerDivTwo" );
  innerTwo2.classList.toggle('clicked');
  
  const innerThree2 = getIdtwo.querySelector(".innerDivThree" );
  innerThree2.classList.toggle('clicked');

  const innerFour2 = getIdtwo.querySelector(".innerDivFour" );
  innerFour2.classList.toggle('clicked');
   document.getElementById(Object.keys(draw)[0]).style.backgroundColor="white"//cards that were selected have their background changed back to white
  document.getElementById(Object.keys(draw)[1]).style.backgroundColor="white"//cards that were selected have their background changed back to white//draw = {}; //our array and object are reset for two more cards
  draw = {}; //our array and object are reset for two more cards
}, 1000);}}}




function sameCard(){
curScore = curScore - 50;//decreases score every time the same card is clicked twice
updateScore(curScore);//updates current score
document.getElementById(Object.keys(draw)[0]).style.backgroundColor="white"
return true;
}


function match(){
  curScore = curScore + 100;//increases score every time a card is clicked
  updateScore(curScore);//current score is updated
  cardsMatched ++;//keeps track of how many cards we have matched to detmine end of game
  draw = {}; 
  if(cardsMatched === 5){//determines if we have won the game
    setTimeout(function(){//we set this time out becuase without it all the cards do now have background colors as soon as the second card is picked
    alert('you won the game!');//lets player know they won the game
  }, 1000);}

}




function updateScore(x){//updates the high score in the game
  const rem =document.querySelector(".curScore");
  if(!first)rem.remove();//checks to see if this is the first time we have run this function as the old score must be removed before we can update with a new one
  first = false;// sets first to false indicating this function has run before
  const scoreDiv = document.createElement('div');//creates new div
  scoreDiv.innerText=(`Your score is: ${x}`);//creates new score
  scoreDiv.classList.add('curScore');//adds hiScore to the class
  ends.append(scoreDiv);//adds high score box to end of the div
  const resetButton = document.createElement('button');//creates button
  resetButton.classList.add('rButton')//adds rButton to class
  resetButton.addEventListener('click', function(){
  document.location.reload();})//reloads the game on click
  resetButton.innerHTML = 'Reset Game!';//labels button element
  scoreDiv.append(resetButton);//adds the reset button
  const authorDiv = document.createElement('div');//creates div for author tag
  authorDiv.innerText=(`created by: jonathan (W)ilson`)//inserts text
  authorDiv.classList.add('author');//adds text
  scoreDiv.append(authorDiv);//inserts into div

}