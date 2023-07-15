let currentMoleBurrow;
let currentSkullBurrow;
let score = 0;
let game_load = new Audio("./src/music/game_load.mp3");
let cry_of_hurt = new Audio("./src/music/cry_of_hurt.mp3");
let whack_a_mole = new Audio("./src/music/whack_a_mole.mp3");
let clickedOnCurrentTick = false;
let currentNumber;
let moleIntervalid;
let skullIntervalid;

document.getElementById("starter").addEventListener("click", setGame);

const starter = document.getElementById("starter");
starter.addEventListener("click", () => {
    starter.classList.toggle("hide");
    game_load.play();
    document.getElementById("container").classList.remove("hide");
});

function setGame() {
    score = 0;
    document.getElementById("score").innerText =
        "Your score:" + score.toString();
    for (let i = 0; i < 9; i++) {
        let burrow = document.createElement("div");
        burrow.id = i.toString();
        document.getElementById("container").appendChild(burrow);
        burrow.addEventListener("click", selectBurrow);
    }

    moleIntervalid = setInterval(positionMole, 800);
    skullIntervalid = setInterval(posiitonSkull, 1200);
}
function resetGame() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).remove();
    }
    clearInterval(moleIntervalid);
    clearInterval(skullIntervalid);
}

function getRandomBurrow() {
    let num = Math.floor(Math.random() * 9);
    while (num == currentNumber) {
        num = Math.floor(Math.random() * 9);
    }
    currentNumber = num;
    return num.toString();
}

function positionMole() {
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
    if (this == currentMoleBurrow) {
        whack_a_mole.play();

        if (clickedOnCurrentTick == false) {
            score += 10;
            clickedOnCurrentTick = true;
        }

        if (score > 50) {
            clearInterval(moleIntervalid);
            clearInterval(skullIntervalid);
            moleIntervalid = setInterval(positionMole, 600);
            skullIntervalid = setInterval(posiitonSkull, 1000);
        } else if (score > 300) {
            clearInterval(moleIntervalid);
            clearInterval(skullIntervalid);
            moleIntervalid = setInterval(positionMole, 300);
            skullIntervalid = setInterval(posiitonSkull, 600);
        }
        document.getElementById("score").innerText =
            "Score:" + score.toString();
    } else if (this == currentSkullBurrow) {
        cry_of_hurt.play();
        document.getElementById("score").innerText =
            "Game is over! Your score:" + score.toString();
        starter.classList.toggle("hide");
        document.getElementById("container").classList.toggle("hide");
        resetGame();
    }
}
