// Code for draggable divs ===========================================
var draggables = document.querySelectorAll(".draggable")
draggables.forEach(element => {
    makeDraggable(element)
})
document.onmouseup = (mouseEvent => {
    document.onmousemove = null // Remove existing onmousemove actions
})

function makeDraggable(element) {
    element.onmousedown = (mouseDown => {
        element.parentNode.appendChild(element)
        // Get initial coords of mouse
        let initialMouseX = mouseDown.clientX
        let initialMouseY = mouseDown.clientY
        
        // Get sata of element
        let linkedElementsMap = new Map()
        linkedElementsMap.set(element, {"left": element.offsetLeft, "top": element.offsetTop})

        // Get data of linked elements
        if (element.dataset.linked) {
            let ids = element.dataset.linked.split(" ")
            ids.forEach(id => {
                let linkedElement = document.getElementById(id)
                linkedElementsMap.set(linkedElement, {"left": linkedElement.offsetLeft, "top": linkedElement.offsetTop})
            })
        }

        document.onmousemove = (mouseMove => {
            mouseMove.preventDefault()
            // Get difference between current mouse coords and initial
            let offsetX = mouseMove.clientX - initialMouseX
            let offsetY = mouseMove.clientY - initialMouseY

            linkedElementsMap.forEach( (position, element, map) => {
                element.style.left = parseInt(position['left']) + parseInt(offsetX) + "px"
                element.style.top = parseInt(position['top']) + parseInt(offsetY) + "px"
            })
        })
    })
}

function follow(follower, target) {
    let followerId = follower.id
    target.dataset.linked = target.dataset.linked + " " + followerId
}
// End code for draggable divs =======================================