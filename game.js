// Halloween game by Shinji, Kevin and Selena



var gameState = 0; //Different value for each mode, we will run the code for the mode that corresponds to each value.
var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var startButton = document.getElementById("buttonStart");
var br = document.createElement("br");
var requestID;
//var questionPrompt;
//var guess;

var startTime;
var prevTime;
var deltaTime;
var timer;

var askQuestion;
var answeredQuestion;
var answerPromptExists;

//Vars for candy count game
var candies = [];
var candyImages = [];
var canMakeCandy = true;
var whichCandy;
var userGuess;

const request = new Request("https://v2.jokeapi.dev/joke/Spooky?blacklistFlags=nsfw,religious,racist,sexist,explicit&type=twopart");
var question = "";
var punchline = "";

function beginMinigame() {
    //guess.value = ""
    //questionPrompt.innerHTML = ""
    switch (gameState) {
        case 1:
            candyCountingGame()
            break
        case 2:
            ghostThinkingGame()
            break
    }
}

function nextMinigame() {
    clear()
    gameState++;
    beginMinigame()
    startButton.style.visibility = "hidden"
}

function promptNextMinigame() {
    startButton.style.visibility = "visible"
}

var setup = function() {
    //createAnswerPrompt()
    //questionPrompt = document.getElementById("questionPrompt")
    //guess = document.getElementById("guess")
    startButton.innerHTML = "Next Game"
    startButton.removeEventListener("click", setup)
    startButton.addEventListener("click", nextMinigame)

    nextMinigame()
}
startButton.addEventListener("click", setup)


fetch(request)
   .then((response) => {
      if (response.status === 200) {
         return response.json();
      } else {
         throw new Error("Something went wrong on API server!");
      }
   })
   .then((response) => {
      console.log(response);
      question = response.setup;
      punchline = response.delivery;
      console.log(question, punchline);
   })
   .catch((error) => {
      console.error(error);
   });

var clear = (e) => {
    ctx.clearRect(0, 0, c.width, c.height);
};

function createAnswerPrompt() {

    // Create a form dynamically
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("id", "answerPrompt");

    // Create an input element for the users guess
    var guess = document.createElement("input");
    guess.setAttribute("type", "text");
    guess.setAttribute("id", "guess");
    guess.setAttribute("name", "guess");
    guess.setAttribute("placeholder", "?????");

    // create a submit button
    var s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");

    // Append the guess input to the form
    form.appendChild(guess);

    // // Inserting a line break
    // form.appendChild(br.cloneNode());

    // Append the submit button to the form
    form.appendChild(s);

    document.getElementById("questionDiv").appendChild(form);
    form.addEventListener('submit', storeAnswer);
    answerPromptExists = true;
}

function deleteAnswerPrompt() {
    const element = document.getElementById("answerPrompt");
    element.remove();
    answerPromptExists = false;
}

/* Probably not needed
function onSuccess(response) {
    console.log(response);
    console.log(response.json());
    return response.json();
}

function onError(data) {
    console.error(data);
}

function sendForm(currentForm) {
    return fetch(action, setOptions(currentForm));
}

function onSubmit(e) {
    e.preventDefault();
    const { currentTarget } = event;
    sendForm(currentTarget)
        .then(response => onSuccess(response, currentTarget))
        .catch(onError);
}
*/

function storeAnswer(e) {
    e.preventDefault();

    //don't think it's necessary to do anything extra/with FormData for this, but
    //I could be wrong and have to change this later.
    userGuess = document.getElementById("guess").value;
    answeredQuestion = true;
    console.log(document.getElementById("guess").value);
}



