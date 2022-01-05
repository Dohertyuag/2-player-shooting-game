let startBtn = document.querySelector("#start-btn")
let p1 = document.querySelector("#player1")
let p2 = document.querySelector("#player2")
const matchOver = document.getElementById("match-over")


let array1 = []                 //this array will store the attacks from player1 to player2 //  p1->p2
let array2 = []                 //this array will store the attacks from player2 to player1 //  p2->p1

let sum1 = 0                    //this variable will store the sum of all damage sone to player2 by player1 // p1->p2
let sum2 = 0                    //this variable will store the sum of all damage sone to player1 by player2 // p2->p1

let p1Wins = 0                  //number of wins
let p2Wins = 0                  //number of wins

let isMatchOver = false

let i = 0                       // counter for keeping count of array elements and adding them efficiently


startBtn.addEventListener("click", function () {
    if (isMatchOver === false) {
        fightOngoing()
    }
    else {
        console.log("Game over! Please reload.")
        return
    }
})

function fightOngoing() {
    calculateDamage()
    //temporary
    // if (sum1 > 95 || sum2 > 95) {
    //     console.log(array1)
    //     console.log(array2)
    //     console.log("Sum1 :" + sum1)
    //     console.log("Sum2 :" + sum2)
    // }
    //temporary

    whoWon()
    resetDamages()
    checkIsMatchOver()
}

function calculateDamage() {
    for (let k = 0; (sum1 < 102 && sum2 < 102); k++) {
        array1.push(getRandomDamage())
        array2.push(getRandomDamage())

        sum1 = sum1 + array1[i]
        sum2 = sum2 + array2[i]
        i++
    }

}

function resetDamages() {
    i = 0               // setting counter of array elements to 0 because a new array will be used for next match
    array1 = []
    array2 = []
    sum1 = 0
    sum2 = 0
}

//checking which player won the round
function whoWon() {
    if (sum1 >= 100 && sum1 > sum2) {           //p1 wins
        p1Wins++
        p1.textContent = `Player 1 - Won [${p1Wins}] times`
    }
    else if (sum2 >= 100 && sum2 > sum1) {      //p2 wins
        p2Wins++
        p2.textContent = `Player 2 - Won [${p2Wins}] times`
    }
    else{
        p1Wins++
        p2Wins++
        p1.textContent = `Player 1 - Won [${p1Wins}] times`
        p2.textContent = `Player 2 - Won [${p2Wins}] times`
    }
}

// getting a random number from 0-5 and returning it to fill array randomly
function getRandomDamage() {
    let randomNumber = Math.floor(Math.random() * 6)
    return randomNumber
}

//checking if the match is over - either one p1 or p2 must have won 3 matches
//displaying the result of the match - winner is announced
function checkIsMatchOver() {
    if (p1Wins === 3 || p2Wins === 3) {
        matchOver.textContent = (p1Wins === 3 ? "Player 1 has won!" : "Player 2 has won!")
        isMatchOver = true
        gameOver()
    }
}

//confetti shower after game is over
function gameOver(){
    const start = () => {
        setTimeout(function() {
            confetti.start()
        }, 200); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
    };

    //  Stop
    const stop = () => {
        setTimeout(function() {
            confetti.stop()
        }, 3000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
    };

    start();
    stop();
    window.setTimeout(function(){location.reload()},5500)   //reload timeset to 5.5 seconds after game over
}