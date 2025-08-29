let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let btns = ["btn1", "btn2", "btn3", "btn4"];

let highScore = localStorage.getItem("highScore") || 0;
document.querySelector("#highScore").innerText = `High Score: ${highScore}`;

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function() {
        btn.classList.remove("gameflash");
    }, 100);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 100);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}  |  HighestScore: ${highScore}`;
    //random button choose

    let randIdx = Math.floor(Math.random() *  btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    document.querySelector("#highScore").innerText = `High Score: ${level}`;


    gameSeq.push(randColor);
    console.log(gameSeq);

    gameflash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
        console.log("same value");
    } else {
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }
        document.querySelector("#highScore").innerText = `High Score: ${highScore}`;

        h2.innerHTML = `GameOver! You Scored <b>${level}</b><br>Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);

let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    document.querySelector("#highScore").innerText = `Highest Score: ${highScore}`;
}
