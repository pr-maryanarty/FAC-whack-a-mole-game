let currentMoleBurrow;
let currentSkullBurrow;
let score = 0;
let gameOver = false;
let game_load = new Audio("./src/music/game_load.mp3");
let cry_of_hurt = new Audio("./src/music/cry_of_hurt.mp3");
let whack_a_mole = new Audio("./src/music/whack_a_mole.mp3");
let clickedOnCurrentTick = false;
let currentNumber;
// let clickedTick = document.getElementById(clickedTick);
// clickedTick.classList.toggle("true");

document.getElementById("starter").addEventListener("click", setGame);

// window.onload = function () {
//     setGame();
//     game_load.play();
//     game_load.preload = "auto";
// };

const starter = document.getElementById("starter");
starter.addEventListener("click", () => {
    starter.classList.toggle("hide");
});

function setGame() {
    for (let i = 0; i < 9; i++) {
        let burrow = document.createElement("div");
        burrow.id = i.toString();
        document.getElementById("container").appendChild(burrow);
        burrow.addEventListener("click", selectBurrow);
    }
    if (score < 150) {
        setInterval(positionMole, 800);
        setInterval(posiitonSkull, 1000);
    } else if (score < 300) {
        setInterval(positionMole, 700);
        setInterval(posiitonSkull, 1000);
    }
}

function getRandomBurrow() {
    // if new num equals old num, rerandom
    // or until new number does not get different to old number rerandom
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
    clickedOnCurrentTick = false;
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
    // currentNumber = num
    // return
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
        whack_a_mole.play();

        if (clickedOnCurrentTick == false) {
            score += 10;
            clickedOnCurrentTick = true;
        }

        document.getElementById("score").innerText =
            "Score:" + score.toString();
    } else if (this == currentSkullBurrow) {
        cry_of_hurt.play();
        document.getElementById("score").innerText =
            "Game is over! Your score:" + score.toString();
        gameOver = true;
    }
}
