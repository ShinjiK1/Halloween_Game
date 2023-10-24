// Code for draggable divs ===========================================
var draggables = document.querySelectorAll(".draggable")
draggables.forEach(element => {
    element.onmousedown = (mouseDown => {
        element.parentNode.appendChild(element)
        // Get initial coords of mouse
        let initialMouseX = mouseDown.clientX
        let initialMouseY = mouseDown.clientY
        // Get initial coords of element
        let initialElementX = element.offsetLeft
        let initialElementY = element.offsetTop

        document.onmousemove = (mouseMove => {
            // Get difference between current mouse coords and initial
            let offsetX = mouseMove.clientX - initialMouseX
            let offsetY = mouseMove.clientY - initialMouseY

            // Adjust the position of the element
            element.style.left = parseInt(initialElementX) + parseInt(offsetX) + "px"
            element.style.top = parseInt(initialElementY) + parseInt(offsetY) + "px"
        })
    })
})
document.onmouseup = (mouseEvent => {
    document.onmousemove = null // Remove existing onmousemove actions
})
// End code for draggable divs =======================================