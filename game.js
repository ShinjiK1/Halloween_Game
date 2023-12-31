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

function beginMinigame() {
    //guess.value = ""
    //questionPrompt.innerHTML = ""
    switch (gameState) {
        case 1:
            tellJokeGame()
            break
        case 2:
            ghostThinkingGame()
            break
        case 3: 
            ghostThinkingGame2()
            break
        case 4:
            candyCountingGame(1);
            break
        case 5:
            recallJokeGame()
            break
        case 6:
            candyCountingGame(2)
            break
        case 7:
            candyCountingGame(3)
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
    s.setAttribute("id", "submit")
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
    console.log("Created");
}

function deleteAnswerPrompt() {
    const element = document.getElementById("answerPrompt");
    element.remove();
    answerPromptExists = false;
    console.log("Deleted");
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



