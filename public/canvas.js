let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')

//Getting the goober images
let goobers = [
    './goobers/crabman.png',
    './goobers/cyclops.png',
    './goobers/flower.png',
    './goobers/lion.png',
    './goobers/lizardman.png',
    './goobers/monk.png',
    './goobers/monke.png',
    './goobers/turtle.png'
]
//Defining a starting mouse position
let mouse = {
    x: undefined,
    y: undefined
}
//Creating a reusable class for storing Goober images
class Goober {
    constructor(image,x,y,xVelocity,yVelocity){
        this.image = image

        this.xPosition = x;
        this.yPosition = y;
        
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        
        this.widthScale = 1;
        this.heightScale = 1;
    }
    //Defining how the goobers will be drawn on screen
    draw = () => {
        context.drawImage(this.image,this.xPosition,this.yPosition,this.image.width * this.widthScale, this.image.height * this.heightScale)
    }
    //Creating a function that shrinks the goober image
    shrink = () => {
        //Conditional for making sure the scale doesn't revert to negative values
        if(this.widthScale <= 0 || this.heightScale <= 0) {
            return
        }

        this.widthScale -= 0.015
        this.heightScale -= 0.015
    }
    //Redrawing the images every frame of their existence in the list, moving them, and making sure they bounce off the walls of the screen
    update = () => {
        if(this.xPosition + this.image.width > innerWidth || this.xPosition - this.image.width < 0) {
            this.xVelocity *= -1
        }
        if(this.yPosition + this.image.height > innerHeight || this.yPosition - this.image.height < 200 - (this.image.height / 2)) {
            this.yVelocity *= -1
        }

        this.xPosition += this.xVelocity
        this.yPosition += this.yVelocity

        this.draw()
        this.shrink()
    }
}
//Creating nodes for the Goobers to sit in
class GooberNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}
//Doubly-linked list for the Goober Nodes
class GooberLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addToBack(value) {
        let newGoober = value;
        if(this.head === null) {
            this.head = newGoober;
            this.tail = newGoober;
        } else {
            this.tail.next = newGoober;
            newGoober.previous = this.tail;
            this.tail = newGoober;
        }
        return `Added new Goober ${newGoober} to Goober List.`
    }

    size() {
        let count = 0;
        let runner = this.head
        while(runner) {
            count++
            runner = runner.next
        }
        return count
    }

    removeFront() {
        if(this.head === null) {
            return undefined
        }

        if(this.head === this.tail) {
            let temp = this.head
            while(this.head.value.image.width > 0 && this.head.value.image.height > 0) {
                this.head.value.shrink()
            }
            this.head = null;
            this.tail = null;
            return temp.value
        }
        let temp = this.head;
        this.head = this.head.next;
        this.next = null
        temp.next = null;
    }
    //This function is where the Goober update method actually gets called
    drawGoobers(runner = this.head) {
        if(runner === null) {
            return
        }

        if(runner.next) {
            runner.value.update()
            return this.drawGoobers(runner.next)
        } else {
            runner.value.update()
            return
        }
    }
}

let gooberList = new GooberLinkedList()

//Creating fresh goobers regularly
const freshGoobers = () => {
    let image = new Image()
    image.src = goobers[Math.floor(Math.random() * goobers.length)]

    xOrigin = 0 + image.width
    yOrigin = innerHeight - image.height;
    xVelocity = (Math.random() * 15)
    yVelocity = ((Math.random() - 1) * 15)

    
    gooberList.addToBack(new GooberNode(new Goober(image,xOrigin,yOrigin,xVelocity,yVelocity)))
}

//Creating an animate function to be called every frame
const animate = () => {
    requestAnimationFrame(animate)
    context.clearRect(0,0,innerWidth,innerHeight)
    
    if(gooberList.size() < 550) {
        freshGoobers()
    }
    console.log(gooberList.size())
    gooberList.drawGoobers()
    removeExcess()
}

//Setting the mouse position and creating new goobers on mouse move
const mouseGoobers = (evt) => {
    mouse.x = evt.x
    mouse.y = evt.y

    let image = new Image()
    image.src = goobers[Math.floor(Math.random() * goobers.length)]
    let xPosition = mouse.x
    let yPosition = mouse.y

    let xOrigin = 0 + image.width
    let yOrigin = innerHeight - image.height

    let xDirection = xPosition - xOrigin
    let yDirection = yPosition - yOrigin

    let vector = Math.sqrt(xDirection**2 + yDirection**2)

    let xVelocity = (xDirection / vector) * 25
    let yVelocity = (yDirection / vector) * 25

    gooberList.addToBack(new GooberNode(new Goober(image,xOrigin,yOrigin,xVelocity,yVelocity)))
}
//Removing excess goobers to reduce CPU strain
const removeExcess = () => {
    while(gooberList.size() >= 500) {
        gooberList.removeFront()
    }
}

canvas.addEventListener('mousemove', mouseGoobers)
console.log(mouse)
animate()