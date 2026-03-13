let board;
let context;
let ballImg;
let score = 0;
let gameOverFlag = false;

let ball = {
    x: 0,
    y: 0,
    width: 100,
    height: 100
};

let hoopArray = [];
let maxHoops = 5;
let hoopWidth = 130;
let hoopHeight = 70;
let hoopX = 525;

let startingSpacing = 500;
let minSpacing = 300;
let maxSpacing = 400;

let velocityX = -2;
let velocityY = 0;
let gravity = 0.3;
let jumping = false;
let jumpStrength = -6;

window.onload = function () {
    board = document.getElementById("board");
    context = board.getContext("2d");
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    setInterval(placeHoops, 1500);
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveBall);
};

function resizeCanvas() {
    board.width = window.innerWidth;
    board.height = window.innerHeight;

    ball.x = board.width / 30;
    ball.y = board.height / 2.5;

    ballImg = new Image();
    ballImg.onload = drawStuff;
    ballImg.src = "fdball-removebg-preview.png";
}

function drawHoop(x, y, width, height, rotation) {
    let hoopOuterRadiusX = width / 2;
    let hoopOuterRadiusY = height / 2;

    let hoopInnerRadiusX = hoopOuterRadiusX - 20;
    let hoopInnerRadiusY = hoopOuterRadiusY - 20;

    context.save();

    context.shadowColor = "rgba(0, 0, 0, 0.5)";
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;

    context.translate(x + hoopOuterRadiusX, y + hoopOuterRadiusY);
    context.rotate(rotation * Math.PI / 180);
    context.translate(-(x + hoopOuterRadiusX), -(y + hoopOuterRadiusY));

    context.beginPath();
    context.ellipse(x + hoopOuterRadiusX, y + hoopOuterRadiusY, hoopOuterRadiusX, hoopOuterRadiusY, 0, 0, Math.PI * 2);
    context.fillStyle = "rgb(215, 60, 60)";
    context.fill();

    context.beginPath();
    context.ellipse(x + hoopOuterRadiusX, y + hoopOuterRadiusY, hoopInnerRadiusX, hoopInnerRadiusY, 0, 0, Math.PI * 2);
    context.clip();
    context.clearRect(x, y, width, height);

    context.restore();
}

function placeHoops() {
    if (hoopArray.length < maxHoops) {
        let minPosY = 200;
        let maxPosY = board.height - hoopHeight - 200;
        let hoopY = Math.random() * (maxPosY - minPosY) + minPosY;
        let spacing = startingSpacing - (hoopArray.length * (startingSpacing - minSpacing) / maxHoops);
        let rotation = Math.random() * 20 - 10;
        let hoop1 = {
            x: hoopX + hoopArray.length * spacing,
            y: hoopY,
            width: hoopWidth,
            height: hoopHeight,
            rotation: rotation
        };
        hoopArray.push(hoop1);
    }
}

function drawStuff() {
    context.clearRect(0, 0, board.width, board.height);
    for (let i = 0; i < hoopArray.length; i++) {
        let hoop = hoopArray[i];
        drawHoop(hoop.x, hoop.y, hoop.width, hoop.height, hoop.rotation);
    }
    context.drawImage(ballImg, ball.x, ball.y, ball.width, ball.height);
    context.fillStyle = "white";
    context.font = "bold 100px Arial";
    context.textAlign = "center";
    context.fillText(score, board.width / 2, 200);
}

function update() {
    if (!gameOverFlag) {
        requestAnimationFrame(update);
        for (let i = 0; i < hoopArray.length; i++) {
            hoopArray[i].x += velocityX;
            if (hoopArray[i].x + hoopArray[i].width < 0) {
                gameOver();
            }
        }
        if (jumping) {
            velocityY = jumpStrength;
            jumping = false;
        }
        ball.y += velocityY;
        velocityY += gravity;
        if (ball.y <= 0 || ball.y + ball.height >= board.height) {
            if (hoopMissed) {
                gameOver();
            } else {
                resetGame();
            }
        }
        checkHoopCollision();
        drawStuff();
    }
}

function gameOver() {
    document.getElementById("finalScore").innerText = score;
    document.getElementById("gameOverScreen").style.display = "flex";
    gameOverFlag = true;
}

function restartGame() {
    document.getElementById("gameOverScreen").style.display = "none";
    gameOverFlag = false;
    resetGame();
    update();
}

function resetGame() {
    ball.x = board.width / 30;
    ball.y = board.height / 2.5;
    hoopArray = [];
    score = 0;
    velocityY = 0;
    hoopMissed = false;
}

function moveBall(e) {
    if ((e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX")) {
        jumping = true;
    }
}

function checkHoopCollision() {
    hoopMissed = true;
    for (let i = 0; i < hoopArray.length; i++) {
        let hoop = hoopArray[i];
        let ballCenterX = ball.x + ball.width / 2;
        let ballCenterY = ball.y + ball.height / 2;
        let hoopCenterX = hoop.x + hoop.width / 2;
        let hoopCenterY = hoop.y + hoop.height / 2;
        let distance = Math.sqrt(Math.pow(ballCenterX - hoopCenterX, 2) + Math.pow(ballCenterY - hoopCenterY, 2));
        let hoopInnerRadiusX = hoop.width / 2 - 20;
        let hoopInnerRadiusY = hoop.height / 2 - 20;
        if (distance < hoopInnerRadiusX && ball.y < hoopCenterY) {
            score++;
            hoopArray.splice(i, 1);
            hoopMissed = false;
        }
        if (ballCenterX === hoopCenterX && ballCenterY > hoopCenterY) {
            gameOver();
        }
    }
}
