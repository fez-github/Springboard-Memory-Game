//Objectives:
  //[Done!]Add timer.
      //[Done!]Make sure it stops when the player has finished the game.[Add Points]
  //[Done!]Add separate difficulties.
      //[Done!]First must figure out how to only load a portion of the array items.
  //[Done!]Add different symbols onto colors.
      //Or just use images.

const gameContainer = document.getElementById("game");
const startButton = document.querySelector('input[name="startButton"');
const totalMatches = document.querySelector('input[name="totalMatches"')
const gameTimer = document.querySelector('#timerValue');
let points = 0;
let clickCount = 0;
let firstColor;
let interval;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "black",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "black"
];

startButton.addEventListener('click',activateTimer);

function activateTimer(event)
{
  let shuffledColors = shuffle(shortenArray(COLORS,totalMatches.value));
  points = shuffledColors.length / 2;
  createDivsForColors(shuffledColors);

  let timer = 0;
  interval = setInterval(function() 
  {
      //console.log(timer);
      timer++;
      gameTimer.innerText = timer.toString();
      //console.log('gameTimer Text: ' + timer.toString());
    
  },1000)
  //The game has started.  Hide line containing elements for starting the game.
  event.target.parentElement.style.visibility = 'hidden';
}
//Take a random element and add it to a new array.  Added twice to simulate pulling both values.
//Remove each element from the array once it's added to the new one.
function shortenArray(array,count){
  let tempArray = [];
  for(let i = 0; i<count;i++){
    let index = Math.floor(Math.random() * array.length)
    let temp = array[index];
    tempArray.push(temp);
    tempArray.push(temp);
    array.splice(index,1);
    array.splice(array.indexOf(temp),1);
  }
  return tempArray;
}


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    console.log(index);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    //newDiv.classList.add(color);
    newDiv.colorName = color;
    newDiv.solved = false;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  // Check to see if 2 objects were clicked.
  if(clickCount < 2 && event.target.classList == '')
  {
    event.target.classList.toggle(event.target.colorName);
    clickCount++;
    //Store color of this item to compare it later.
    if(clickCount < 2){
      firstColor = event.target;
    }
    else
    {
      //Check if 2 colors match.  If not, wait 1 second before both colors return to normal.
      //Also check if all cards have been cleared.
      if(event.target.colorName == firstColor.colorName){
        setTimeout(function (){
          firstColor.solved = true;
          event.target.solved = true;
          points--;
          clickCount = 0;
          winCheck();
        },1000)
      }
      else
      {
        //Colors didn't match.  Reset classes.
        setTimeout(function () {
          event.target.classList.toggle(event.target.colorName);
          firstColor.classList.toggle(firstColor.colorName);
          clickCount = 0;
        },1000)
      }
    }
  }
}

//Check if all points had been deducted, then stop game.
function winCheck()
{
  if(points == 0)
  {
    clearInterval(interval);
    alert('Congratulations!  You won!')
  }
};
