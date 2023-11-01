// gameState 1

//Vars for candy count game
var candies = [];
var candyImages = [];
var canMakeCandy = true;
var whichCandy;
var userGuess;
var alive;
var answerPromptExists;

class Candy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        if (type == 0) { //snickers
            this.width = 120;
            this.height = 40;
        }
        if (type == 1) { //skittles
            this.width = 90;
            this.height = 45;
        }
        if (type == 2) { //kitkat
            this.width = 120;
            this.height = 45;
        }
        if (type == 3) { //lolipop
            this.width = 40;
            this.height = 80;
        }
        this.yvel = Math.floor(Math.random() * 21) / 10 + 1.5;
        this.xvel = Math.floor(Math.random() * 7) - 3;
    }

    move(timeScalar) { //timeScalar stabilizes physics for different frame rates
        if (this.x <= 0 || this.x >= c.width - this.width) {
            this.xvel *= -1;
        }
        /* To make it even harder
        if (this.y <= 0 || this.y >= c.height - this.height) {
            this.yvel *= -1;
        }
        */
        this.x += this.xvel * timeScalar;
        this.y += this.yvel * timeScalar;
    }
}

function candyCountingGame() {
    candies = [];
    startTime = Date.now();
    prevTime = Date.now();
    deltaTime = 0;
    timer = Math.round(1000 * (Date.now() - startTime)) / 1000;
    var timeToMakeCandy = 200; //Determines the spawn rate of the candy
    askQuestion = false;
    answeredQuestion = false;
    alive = true;

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
    var question = "How many " + whichCandy + " appear?"
    // const prompt = document.createElement("p");
    // const question = document.createTextNode("How many " + whichCandy + " appear?");
    // prompt.append(question);

    const questionDiv = document.getElementById("questionDiv");
    // questionDiv.appendChild(prompt);
    answerPromptExists = false;

    var runGame = (e) => { //Right now there's only 1 gamemode, but later change this to do different things based on the gameState variable.
        if (true) {
            deltaTime = Date.now() - prevTime;
            window.cancelAnimationFrame(requestID);
            clear(e);
            timer = Math.round(1000 * (Date.now() - startTime)) / 1000;
            if (askQuestion) {
                if (answeredQuestion) {
                    ctx.fillColor = "black";
                    ctx.font = "60px comic sans";
                    if (whichCandy == "snickers") {
                        if (userGuess == snickersCount) {
                            ctx.fillText("CORRECT!", 600, 300);
                            promptNextMinigame()
                        }
                        else {
                            ctx.fillText("WRONG!", 600, 300);
                            alive = false;
                        }
                    }
                    else if (whichCandy == "skittles") {
                        if (userGuess == skittlesCount) {
                            ctx.fillText("Correct!", 600, 300);
                            promptNextMinigame()
                        }
                        else {
                            ctx.fillText("WRONG!", 600, 300);
                            alive = false;
                        }
                    }
                    else if (whichCandy == "kitkats") {
                        if (userGuess == kitkatCount) {
                            ctx.fillText("CORRECT!", 600, 300);
                            promptNextMinigame()
                        }
                        else {
                            ctx.fillText("WRONG!", 600, 300);
                            alive = false;
                        }
                    }
                    else if (whichCandy == "lolipops") {
                        if (userGuess == lolipopCount) {
                            ctx.fillText("CORRECT!", 600, 300);
                            promptNextMinigame()
                        }
                        else {
                            ctx.fillText("WRONG!", 600, 300);
                            alive = false;
                        }
                    }
                        if (answerPromptExists) {
        deleteAnswerPrompt();
    }
                    // if (alive) {
                    //     setTimeout(() => {
                    //         gameState++;
                    //     }, 5000);
                    // }
                    //Stop game here

                }
            }
            else {
                if (timer < 2000) {
                    ctx.font = "60px comic sans";
                    ctx.fillText(question, 350, 300);
                }
                else if (canMakeCandy && timer < 14000 && timer > 2000) {
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
        }
        //console.log("running game");
        requestID = window.requestAnimationFrame(runGame);
    }

    runGame();
}

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
}

function deleteAnswerPrompt() {
    const element = document.getElementById("answerPrompt");
    element.remove();
    answerPromptExists = false;
}

function storeAnswer(e) {
    e.preventDefault();

    //don't think it's necessary to do anything extra/with FormData for this, but
    //I could be wrong and have to change this later.
    userGuess = document.getElementById("guess").value;
    answeredQuestion = true;
    console.log(document.getElementById("guess").value);
}