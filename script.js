window.onload = function () {
    setGame();
};

function setGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.createElement("div");
        square.id = i.toString();
    }
    setInterval(setMole, 1000);
}
