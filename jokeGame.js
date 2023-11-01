const request = new Request("https://v2.jokeapi.dev/joke/Spooky?blacklistFlags=nsfw,religious,racist,sexist,explicit&type=twopart");
var question = "";
var punchline = "";

function tellJokeGame() {
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
        ctx.fillColor = "black";
        ctx.font = "30px comic sans";
        ctx.fillText(question, 50, 200, 1350)
        ctx.fillText(punchline, 50, 400, 1350)
        promptNextMinigame()
    })
    .catch((error) => {
        console.error(error);
    });

}

function recallJokeGame() {
    document.getElementById("questionPrompt").innerHTML = "What was the punchline to the joke told in the first game?"
    createAnswerPrompt()
    document.getElementById("submit").onclick = (event) => {
        if (document.getElementById("guess").value == punchline) {
            ctx.fillText("CORRECT!", 600, 300);
            document.getElementById("questionPrompt").innerHTML = ""
            deleteAnswerPrompt()
            promptNextMinigame()
        }
    }
    
}