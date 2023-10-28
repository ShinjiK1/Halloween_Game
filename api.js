const request = new Request("https://v2.jokeapi.dev/joke/Spooky?blacklistFlags=nsfw,religious,racist,sexist,explicit&type=twopart");
var question;
var punchline;
var mcAnswers = ["", "", "", ""];
var winnerIndex;

const nextBtn = document.getElementById('nextBtn'); 
nextBtn.addEventListener("click", function() {
   console.log("pressed");
   console.log(question);
   console.log(punchline);
   //later change to increment gameState
});

//code for asking the user for the punchline
//gets a random punchline
//use when we need to fill up the multiple choice form
async function getRandomPunchline() {
   const response = await fetch(request);
   if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
   const data = await response.json();
   //console.log(data.delivery);
   return data.delivery;
}

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
}

//should only run once when the game state reaches the one that displays the joke
let setUpPunchlines = (function () {
   let done = false;
   return function () {
      if (!done) {
         done = true;
         console.log("Function Call one time");
         //code for displaying the joke
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
               document.getElementById("q").innerHTML=question;
               document.getElementById("r").innerHTML=punchline;
               winnerIndex = getRandomInt(4);
               console.log(winnerIndex);
               console.log(punchline);
               mcAnswers[winnerIndex] = punchline;
               for(let i = 0; i < 4; i++) {
                  //want mcAnswers to be populated by something other than "" and the answer
                  //console.log("in the for loop");
                  console.log("in the for loop",winnerIndex);
                  if(mcAnswers[i] == "" && i != winnerIndex) {
                     do {
                        getRandomPunchline().then((value) => {
                        console.log(typeof value);
                        mcAnswers[i] = value;
                        });
                     }while(mcAnswers[i]==punchline);
                  }
                  console.log(mcAnswers);
                  //return smth and then in next then, call createMCQS???
               }
            })
            .catch((error) => {
               console.error(error);
            });
      }
   };
})();
setUpPunchlines(); //just having it here for testing

//form for when the user has to recall the punchline 
//call this function when the state changes
function createMCQS() {  
   const jokeGame = document.getElementById('mcqs');
   var MCform = document.createElement("form"); 
   var br = document.createElement("br");
   console.log(mcAnswers);
   MCform.setAttribute("method", "post");
   //Create the labels
   var oneL = document.createElement('label');
   oneL.innerHTML = mcAnswers[0];
   var twoL = document.createElement('label');
   twoL.innerHTML = mcAnswers[1];
   var threeL = document.createElement('label');
   threeL.innerHTML = mcAnswers[2];
   var fourL = document.createElement('label');
   fourL.innerHTML = mcAnswers[3];

   // Create the mcqs
   var one = document.createElement("input");
   one.setAttribute("type", "radio");
   one.setAttribute("id", "one");
   one.setAttribute("name", "mc");
   var two = document.createElement("input");
   two.setAttribute("type", "radio");
   two.setAttribute("id", "two");
   two.setAttribute("name", "mc");
   var three = document.createElement("input");
   three.setAttribute("type", "radio");
   three.setAttribute("id", "three");
   three.setAttribute("name", "mc");
   var four = document.createElement("input");
   four.setAttribute("type", "radio");
   four.setAttribute("id", "four");
   four.setAttribute("name", "mc");

   //use mcAnswers to populate the mc

   // create a submit button
   var s = document.createElement("input");
   s.setAttribute("type", "submit");
   s.setAttribute("value", "Submit");

   // Append the mcqs to the form
   MCform.appendChild(one);
   MCform.appendChild(oneL);
   MCform.appendChild(br);
   
   MCform.appendChild(two);
   MCform.appendChild(twoL);
   MCform.appendChild(br.cloneNode());
   
   MCform.appendChild(three);
   MCform.appendChild(threeL);
   MCform.appendChild(br.cloneNode());
   
   MCform.appendChild(four);
   MCform.appendChild(fourL);
   MCform.appendChild(br.cloneNode());

   // Append the submit button to the form
   MCform.appendChild(s);

   jokeGame.appendChild(MCform);
   MCform.addEventListener('submit', checkMC);
}

//converts winnerIndex to one, two, three or four
//to be used to see if user selected the correct mc answer
function winnerIndexToString(i) {
   if(i == 0) {
      return "one";
   }
   else if(i == 1) {
      return "two";
   }
   else if(i == 2) {
      return "three";
   }
   else {
      return "four";
   }
}

//change the state in this function once we implement that
function checkMC(e) {
   e.preventDefault();
   if(document.getElementById(winnerIndexToString(winnerIndex)).checked) {
      console.log("correct");
   }
   else {//user chose the wrong answer
      console.log("wrong");
   }
}