// gameState 2
// What number is the ghost thinking of?

function ghostThinkingGame2() {
    // Set up form
    document.getElementById("questionPrompt").innerHTML = "What is the ghost thinking about?"
    createAnswerPrompt()

    const wordArray = `apples autumn bats black bones boo broom cackle candy cat cauldron costumes creepy doorbell Dracula eerie excitement fall flashlight Frankenstein frighten games ghosts ghoul goblin graveyard Halloween haunted house hoot howl jack-o-lantern mask monster moonlight mummy night October orange owl party potion prank pumpkins safety scare shadows skeleton skull spell spider spirit spooky sweets treat trick vampire web werewolf wigs witch zombie`
    .split(" ")

    // Choose a random word
    var word = wordArray[Math.floor(Math.random() * wordArray.length)]
    // Set the size of the text
    var wordWidth = 100;
    var wordHeight = 20;
    ctx.font = `${wordHeight}px serif`
    ctx.textBaseline = "top" // draw text from the top

    let images = []

    // Randomly generate the text on the canvas
    for (let i = 0; i < word.length; i++) {
        var randomX = Math.floor(Math.random() * (ctx.canvas.clientWidth - wordWidth))
        var randomY = Math.floor(Math.random() * (ctx.canvas.clientHeight - wordHeight))
        ctx.fillText(word.charAt(i), randomX, randomY)

        // Convert canvas coords to world coords
        var canvasBoundingBox = c.getBoundingClientRect()
        var worldX = canvasBoundingBox.x + randomX
        var worldY = canvasBoundingBox.y + randomY
        console.log(worldX, worldY)
        // Create an image at the world coords
        var image = document.createElement("img")
        images.push(image)
        image.className = "draggable"
        makeDraggable(image)
        var imageWidth = 120
        var imageHeight = 150
        image.style.left = `${worldX}px`
        image.style.top = `${worldY - imageHeight / 2}px`
        image.style.height = `${imageHeight}px`
        image.style.width = `${imageWidth}px`
        image.src = "ghost.png"
        document.body.appendChild(image)
    }

    // Add listener for submitting
    document.getElementById("guess").onchange = (event) => {
        if ((event.target.value).trim() == word.trim()) {
            console.log("correct")
            images.forEach(image => {
                image.remove()
            });
            clear()
            ctx.fillColor = "black";
            ctx.font = "60px comic sans";
            ctx.textBaseline = "bottom"
            ctx.fillText("CORRECT!", 600, 300);
            document.getElementById("questionPrompt").innerHTML = ""
            deleteAnswerPrompt()
            promptNextMinigame()
        } else {
            document.getElementById("questionPrompt").innerHTML = "Incorrect"
        }
    }
}
