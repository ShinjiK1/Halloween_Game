// Halloween game by Shinji, Kevin and Selena



var gameState = 0; //Different value for each mode, we will run the code for the mode that corresponds to each value.
var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var startButton = document.getElementById("buttonStart");

const request = new Request("https://v2.jokeapi.dev/joke/Spooky?blacklistFlags=nsfw,religious,racist,sexist,explicit&type=twopart");
var question = "";
var punchline = "";

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
