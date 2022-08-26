let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')

//create rectangles
// context.fillStyle = "rgba(255,0,0,0.3)"
// context.fillRect(100,100,100,100)
// context.fillStyle = "rgba(0,255,0,0.3)"
// context.fillRect(300,600,100,100)

// //create lines
// context.beginPath()
// context.moveTo(50,300)
// context.lineTo(300,100)
// context.lineTo(600,800)
// context.lineTo(1200,400)
// context.strokeStyle = "red"
// context.stroke()

// //create circles/arcs
// for(i = 0; i < 50; i++){
//     let randomX = Math.random() * window.innerWidth
//     let randomY = Math.random() * window.innerHeight

//     context.beginPath()
//     context.arc(randomX,randomY,50,0,Math.PI * 2,false)
//     context.strokeStyle = "purple"
//     context.stroke()
// }
let mouse = {
    x: undefined,
    y: undefined
}


class Circle {
    static count = 0
    constructor(x,y,xVelocity,yVelocity,radius) {
        this.xPosition = x
        this.yPosition = y
        
        this.xVelocity = xVelocity
        this.yVelocity = yVelocity
        
        this.radius = radius
    }

    draw = () => {
        context.beginPath()
        context.arc(this.xPosition,this.yPosition,this.radius,0,Math.PI * 2,false)
        context.strokeStyle = "blue"
        context.stroke()
        context.fillStyle = "aquamarine"
        context.fill()
    }

    update = () => {
        if(this.xPosition + this.radius > innerWidth || this.xPosition - this.radius < 0) {
            this.xVelocity *= -1
        }
        if(this.yPosition + this.radius > innerHeight || this.yPosition - this.radius < 0) {
            this.yVelocity *= -1
        }

        this.xPosition += this.xVelocity
        this.yPosition += this.yVelocity

        if(mouse.x - this.xPosition < 50 && mouse.x - this.xPosition > -50 && mouse.y - this.yPosition < 50 && mouse.y - this.yPosition > -50 && this.radius <= 100) {
            this.radius += 3
        } else {
            if(this.radius > 5) {
                this.radius -= 1
            }
        }

        this.draw()
    }
}

class CircleNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null
    }
}

class DoubleLinkedCircles {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addToBack(value) {
        let newCircle = value;
        if(this.head === null) {
            this.head = newCircle
            this.tail = newCircle
        } else {
            this.tail.next = newCircle
            newCircle.previous = this.tail
            this.tail = newCircle
        }
        return `Added new node ${newCircle} to Circle List.`
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
            this.head = null;
            this.tail = null;
            return temp.value
        }
        for(i = 0; i < 10; i++){
            let temp = this.head;
            this.head = this.head.next
            this.next = null
            temp.next = null
        }
    }

    drawCircles(runner = this.head) {
        if(runner === null){
            return
        }

        if(runner.next) {
            runner.value.update()
            return this.drawCircles(runner.next)
        } else {
            runner.value.update()
            return
        }
    }
}

let circleList = new DoubleLinkedCircles()

for(i = 0; i < 100; i++){
    let radius = 5
    let xPosition = (Math.random() * (innerWidth - radius * 2) + radius)
    let yPosition = (Math.random() * (innerHeight - radius * 2) + radius)
    let xVelocity = ((Math.random() - 0.5) * 10)
    let yVelocity = ((Math.random() - 0.5) * 10)
    
    console.log(circleList)
    circleList.addToBack(new CircleNode(new Circle(xPosition,yPosition,xVelocity,yVelocity,radius)))
}

const animate = () => {
    requestAnimationFrame(animate)
    context.clearRect(0,0,innerWidth,innerHeight)
    
    circleList.drawCircles()
    removeExcess()
}


const mouseCircles = (evt) => {
    mouse.x = evt.x
    mouse.y = evt.y
    console.log(circleList.size())

    for(i = 0; i < 5; i++){
        let xVelocity = ((Math.random() - 0.5) * 10)
        let yVelocity = ((Math.random() - 0.5) * 10)
        let radius = 5
        circleList.addToBack(new CircleNode(new Circle(mouse.x,mouse.y,xVelocity,yVelocity,radius)))
    }
}

const removeExcess = () => {
    if(circleList.size() >= 1000) {
        circleList.removeFront()
    }
}

canvas.addEventListener('mousemove', mouseCircles)
console.log(mouse)
animate()