
let balls = []
for (let i=0; i <= 100; i +=1) {

    let color = ["red", "white"]
    let select = Math.floor(Math.random() * color.length)
    let points = Math.floor(Math.random() * 101)
    balls[i] = [color[select], points]
}

console.log(balls)
let score = 0

function redball(){
    let choice = prompt("pick a ball from 0-100")
    if (choice == null) {
        alert("you gave up HAHAHAHA")
        alert("final score: " + score)
    }
    else if (balls[choice][0] != "red") {
        score = score + balls[choice][1]
        alert("ball color: " + balls[choice][0] + " points: " + balls[choice][1])

        redball()
    }
    else {
        score = score - balls[choice][1]
        alert("ball color: " + balls[choice][0] + " points: " + balls[choice][1])
        alert("final score: " + score)
    }
}

redball()

