let currentMoleBurrow;
let currentSkullBurrow;
let score = 0;
let gameOver = false;
let game_load = new Audio("game_load.mp3");

window.onload = function () {
    setGame();
    game_load.play();
};

function setGame() {
    for (let i = 0; i < 9; i++) {
        let burrow = document.createElement("div");
        burrow.id = i.toString();
        document.getElementById("container").appendChild(burrow);
        burrow.addEventListener("click", selectBurrow);
    }
    if (score < 150) {
        setInterval(positionMole, 1000);
        setInterval(posiitonSkull, 2000);
    } else if (score < 300) {
        setInterval(positionMole, 7000);
        setInterval(posiitonSkull, 1000);
    }
}

function getRandomBurrow() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}
function positionMole() {
    if (gameOver) {
        return;
    }
    if (currentMoleBurrow) {
        currentMoleBurrow.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./src/mole.png";
    let num = getRandomBurrow();
    if (currentSkullBurrow && currentSkullBurrow.id == num) {
        return;
    }
    currentMoleBurrow = document.getElementById(num);
    currentMoleBurrow.appendChild(mole);
}
function posiitonSkull() {
    if (gameOver) {
        return;
    }
    if (currentSkullBurrow) {
        currentSkullBurrow.innerHTML = "";
    }
    let skull = document.createElement("img");
    skull.src = "./src/skull.png";
    let num = getRandomBurrow();
    if (currentMoleBurrow && currentMoleBurrow.id == num) {
        return;
    }
    currentSkullBurrow = document.getElementById(num);
    currentSkullBurrow.appendChild(skull);
}
function selectBurrow() {
    getRandomBurrow();
    if (gameOver) {
        return;
    }
    if (this == currentMoleBurrow) {
        score += 10;
        document.getElementById("score").innerText =
            "Score:" + score.toString();
    } else if (this == currentSkullBurrow) {
        document.getElementById("score").innerText =
            "Game is over! Your score:" + score.toString();
        gameOver = true;
    }
}
