/**
 * Name: Tala Idris
 * Student Number:400571015
 * 
 * Name: Azeen Saba
 * Student Number: 400520177
 * 
 * Date created: February 26 2025
 * Description: JavaScript file for Canvas assignment.
 */


window.addEventListener("load", function (event) {

    // initializing basics
    let c = document.getElementById("testCanvas");
    let ctx = c.getContext("2d");

    let drawingHistory = [];
    let userPainting = false;
    let currentStroke = null;
    let currentColor = "black";
    let currentSize = 5;
    let currentShape = null;

    // basic "shape" class that is used for all shapes
    class Shape {
        constructor(x, y, color, size) {
            this.x = x;
            this.y = y;
            this.color = color;
            if (size === 5) {
                this.size = size + 15;
            } else if (size === 15) {
                this.size = size + 25;
            } else if (size === 25) {
                this.size = size + 35;
            } else {
                this.size = size;
            }
            this.type = 'shape';
        }
    }

    // circle class
    class Circle extends Shape {
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = this.color;
            ctx.stroke();
        }
    }

    // star class
    class Star extends Shape {
        draw() {
            const spikes = 5;
            const outerRadius = this.size / 2;
            const innerRadius = outerRadius / 2;
            const rotation = (Math.PI / 2) * 3;

            ctx.beginPath();
            ctx.moveTo(this.x, this.y - outerRadius);

            for (let i = 0; i < spikes; i++) {

                const x = this.x + Math.cos(rotation + (i * Math.PI * 2) / spikes) * outerRadius;
                const y = this.y + Math.sin(rotation + (i * Math.PI * 2) / spikes) * outerRadius;
                ctx.lineTo(x, y);

                const ix = this.x + Math.cos(rotation + ((i + 0.5) * Math.PI * 2) / spikes) * innerRadius;
                const iy = this.y + Math.sin(rotation + ((i + 0.5) * Math.PI * 2) / spikes) * innerRadius;
                ctx.lineTo(ix, iy);
            }

            ctx.closePath();
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.stroke();
        }
    }

    // rectangle class
    class Rectangle extends Shape {
        draw() {
            const halfSize = this.size / 2;

            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.strokeRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
            ctx.fillRect(this.x - halfSize, this.y - halfSize, this.size, this.size);
        }
    }

    loadDrawingHistory();


    // getting size, shape/stylus, and colour choices
    document.getElementById("smallSize").addEventListener("click", function (event) {
        currentSize = 5;
    })
    document.getElementById("medSize").addEventListener("click", function (event) {
        currentSize = 15;
    })
    document.getElementById("largeSize").addEventListener("click", function (event) {
        currentSize = 25;
    })

    document.getElementById("star").addEventListener("click", function (event) {
        currentShape = Star;
    })
    document.getElementById("circle").addEventListener("click", function (event) {
        currentShape = Circle;
    })
    document.getElementById("rectangle").addEventListener("click", function (event) {
        currentShape = Rectangle;
    })
    document.getElementById("stylus").addEventListener("click", function (event) {
        currentShape = null;
    })

    let colorButtons = document.querySelectorAll(".color");
    colorButtons.forEach(button => {
        button.addEventListener("click", function () {
            currentColor = this.style.backgroundColor;
        });
    });


    // draw shape on canvas/ start of stroke
    c.addEventListener('mousedown', function (event) {
        if (currentShape) {
            const x = event.offsetX;
            const y = event.offsetY;
            const shape = new currentShape(x, y, currentColor, currentSize);
            drawingHistory.push(shape);
            saveDrawingHistory();
            redrawCanvas();
        } else {
            userPainting = true;
            currentStroke = {
                type: 'stroke',
                color: currentColor,
                size: currentSize,
                points: [{ x: event.offsetX, y: event.offsetY }],
            };
            drawingHistory.push(currentStroke);
            saveDrawingHistory();
        }
    });

    // continue drawing stroke on canvas
    c.addEventListener('mousemove', function (event) {
        if (userPainting) {
            const point = { x: event.offsetX, y: event.offsetY };
            currentStroke.points.push(point);
            redrawCanvas();
        }
    });

    // end drawing stroke on canvas
    c.addEventListener('mouseup', function (event) {
        userPainting = false;
        currentStroke = null;
        saveDrawingHistory();
    });
    c.addEventListener('mouseout', function (event) {
        userPainting = false;
        currentStroke = null;
        saveDrawingHistory();
    });

    // undo button
    document.getElementById("undo").addEventListener("click", function (event) {
        if (drawingHistory.length > 0) {
            drawingHistory.pop();
            saveDrawingHistory();
            redrawCanvas()
        }
    });

    // clear button
    document.getElementById("clearCanvas").addEventListener("click", function () {
        ctx.clearRect(0, 0, c.width, c.height);
        drawingHistory = []
        saveDrawingHistory();
    });

    // function that redraws all elements on the canvas
    function redrawCanvas() {
        ctx.clearRect(0, 0, c.width, c.height);

        drawingHistory.forEach(item => {
            if (item.type === 'stroke') {
                ctx.save();

                ctx.strokeStyle = item.color;
                ctx.lineWidth = item.size;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                ctx.beginPath();
                ctx.moveTo(item.points[0].x, item.points[0].y);
                item.points.forEach(point => {
                    ctx.lineTo(point.x, point.y);
                });
                ctx.stroke();

                ctx.restore();
            } else if (item.type === 'shape') {
                ctx.save();
                item.draw();
                ctx.restore();
            }
        });
    }

    // function to save the drawing history in local storage
    function saveDrawingHistory() {
        const historyToSave = drawingHistory.map(item => {
            if (item.type === 'shape') {
                return { ...item, shapeType: item.constructor.name };
            }
            return item;
        });
        localStorage.setItem('drawingHistory', JSON.stringify(historyToSave));
    }

    // function to load the drawing history from local storage
    function loadDrawingHistory() {
        const savedHistory = localStorage.getItem('drawingHistory');
        if (savedHistory) {
            drawingHistory = JSON.parse(savedHistory, (key, value) => {
                if (value.type === 'shape') {
                    switch (value.shapeType) {
                        case 'Circle':
                            return new Circle(value.x, value.y, value.color, value.size);
                        case 'Star':
                            return new Star(value.x, value.y, value.color, value.size);
                        case 'Rectangle':
                            return new Rectangle(value.x, value.y, value.color, value.size);
                        default:
                            return value;
                    }
                }
                return value;
            });
            redrawCanvas();
        }
    }
});
