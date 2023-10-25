// Halloween game by Shinji, Kevin and Selena



var gameState = 0; //Different value for each mode, we will run the code for the mode that corresponds to each value.
var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var startButton = document.getElementById("buttonStart");
var br = document.createElement("br");
var requestID;

var startTime;
var prevTime;
var deltaTime;
var timer;

var askQuestion;
var answeredQuestion;

//Vars for candy count game
var candies = [];
var candyImages = [];
var canMakeCandy = true;
var whichCandy;
var userGuess;

const request = new Request("https://v2.jokeapi.dev/joke/Spooky?blacklistFlags=nsfw,religious,racist,sexist,explicit&type=twopart");
var question = "";
var punchline = "";

class Candy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        if (type == 0) { //snickers
            this.width = 160;
            this.height = 50;
        }
        if (type == 1) { //skittles
            this.width = 120;
            this.height = 60;
        }
        if (type == 2) { //kitkat
            this.width = 150;
            this.height = 60;
        }
        if (type == 3) { //lolipop
            this.width = 50;
            this.height = 100;
        }
        this.yvel = Math.floor(Math.random() * 15) / 10 + 1;
        this.xvel = Math.floor(Math.random() * 7) - 3;
    }

    move(timeScalar) { //timeScalar stabilizes physics for different frame rates
        if (this.x <= 0 || this.x >= c.width - this.width) {
            this.xvel *= -1;
        }
        this.x += this.xvel * timeScalar;
        this.y += this.yvel * timeScalar;
    }
}

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

var startGame = (e) => {
    clear(e);
    candies = [];
    startTime = Date.now();
    prevTime = Date.now();
    deltaTime = 0;
    timer = Math.round(1000 * (Date.now() - startTime)) / 1000;
    var timeToMakeCandy = 300;
    askQuestion = false;
    answeredQuestion = false;

    var snickersImg = new Image();
    var skittlesImg = new Image();
    var kitkatImg = new Image();
    var lolipopImg = new Image();
    snickersImg.src = "snickers.jpg";
    skittlesImg.src = "skittles.jpg";
    kitkatImg.src = "kitkat.jpg";
    lolipopImg.src = "lolipop.jpg";
    var snickersCount = 0;
    var skittlesCount = 0;
    var kitkatCount = 0;
    var lolipopCount = 0;

    candyImages.push(snickersImg);
    candyImages.push(skittlesImg);
    candyImages.push(kitkatImg);
    candyImages.push(lolipopImg);

    candyRNG = Math.floor(Math.random() * 4);
    if (candyRNG == 0) {
        whichCandy = "snickers";
    }
    else if (candyRNG == 1) {
        whichCandy = "skittles";
    }
    else if (candyRNG == 2) {
        whichCandy = "kitkats";
    }
    else if (candyRNG == 3) {
        whichCandy = "lolipops";
    }
    const prompt = document.createElement("p");
    const question = document.createTextNode("How many " + whichCandy + " appear?");
    prompt.append(question);

    const questionDiv = document.getElementById("questionDiv");
    questionDiv.appendChild(prompt);


    var runGame = (e) => { //Right now there's only 1 gamemode, but later change this to do different things based on the gameState variable.
        deltaTime = Date.now() - prevTime;
        window.cancelAnimationFrame(requestID);
        clear(e);
        timer = Math.round(1000 * (Date.now() - startTime)) / 1000;
        if (askQuestion) {
            if (answeredQuestion) {
                if (whichCandy == "snickers") {
                    if (userGuess == snickersCount) {
                        console.log("CORRECT!");
                    }
                    else {
                        console.log("WRONG!");
                    }
                }
                else if (whichCandy == "skittles") {
                    if (userGuess == skittlesCount) {
                        console.log("CORRECT!");
                    }
                    else {
                        console.log("WRONG!");
                    }
                }
                else if (whichCandy == "kitkats") {
                    if (userGuess == kitkatCount) {
                        console.log("CORRECT!");
                    }
                    else {
                        console.log("WRONG!");
                    }
                }
                else if (whichCandy == "lolipops") {
                    if (userGuess == lolipopCount) {
                        console.log("CORRECT!");
                    }
                    else {
                        console.log("WRONG!");
                    }
                }
                //Stop game here
                
            }
        }
        else {
            if (canMakeCandy && timer < 12000) {
                candyRNG = Math.floor(Math.random() * 4);
                if (candyRNG == 0) {
                    candies.push(new Candy(Math.floor(Math.random() * 1100), 0, 0)); //Make these constructors a bit better later
                    snickersCount++;
                }
                else if (candyRNG == 1) {
                    candies.push(new Candy(Math.floor(Math.random() * 1100), 0, 1));
                    skittlesCount++;
                }
                else if (candyRNG == 2) {
                    candies.push(new Candy(Math.floor(Math.random() * 1100), 0, 2));
                    kitkatCount++;
                }
                else if (candyRNG == 3) {
                    candies.push(new Candy(Math.floor(Math.random() * 1100), 0, 3));
                    lolipopCount++;
                }
                canMakeCandy = false;
                setTimeout(() => {
                    canMakeCandy = true;
                }, timeToMakeCandy);
            }
            console.log(candies);
            for (var i = 0; i < candies.length; i++) {
                //ctx.fillStyle = "black";
                //ctx.fillRect(candies[i].x, candies[i].y, candies[i].width, candies[i].height);
                candies[i].move(deltaTime / 10000);
                ctx.drawImage(candyImages[candies[i].type], candies[i].x, candies[i].y, candies[i].width, candies[i].height);
            }
            for (var i = candies.length - 1; i >= 0; i--) {
                if (candies[i].y > c.height) {
                    candies.splice(i, 1);
                }
            }
        }
        if (timer > 15000 && askQuestion == false) {
            askQuestion = true;
            createAnswerPrompt();
        }
        //console.log("running game");
        requestID = window.requestAnimationFrame(runGame);
    }

    runGame(e);
}

function createAnswerPrompt() {

    // Create a form dynamically
    var form = document.createElement("form");
    form.setAttribute("method", "post");

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

    // Inserting a line break
    form.appendChild(br.cloneNode());

    // Append the submit button to the form
    form.appendChild(s);

    document.getElementById("questionDiv").appendChild(form);
    form.addEventListener('submit', storeAnswer);
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


startButton.addEventListener("click", startGame);
