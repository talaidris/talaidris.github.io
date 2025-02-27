
// Name: Tala Idris
// Student Number:400571015
// Date created: February 13 2025
// Description: JavaScript file for JavaScript assignment.

window.addEventListener("load", function (event) {

    // adding in variables
    let player1, color1, player2, color2, rounds;
    let playerSymbol = "X";
    let gameEnded = false;
    let p1Score = 0;
    let p2Score = 0;
    let round = 0;
    let score = document.getElementById("score-display");
    let playerName = document.getElementById("player-name");
    let home = document.getElementById("homescreen");
    let game = document.getElementById("gamescreen");
    let help = this.document.getElementById("helpscreen");
    let winner = document.getElementById("winner-display");


    game.style.display = "none";
    help.style.display = "none";

    //play button reveals game screen and resets player information
    document.getElementById("playbutton").addEventListener("click", function (event) {
        player1 = document.getElementById("name1").value;
        player2 = document.getElementById("name2").value;
        color1 = document.getElementById("favcolor1").value;
        color2 = document.getElementById("favcolor2").value;
        rounds = document.getElementById("round-choices").value;
        console.log(rounds)

        if (!player1 || !player2 || !color1 || !color2) {
            document.getElementById("fill-alert").innerHTML = "Please fill in all sections.";
            return;
        };
        game.style.display = "block";
        home.style.display = "none";
        playerName.innerHTML = player1 + "'s turn";
        playerName.style.color = color1;
        document.getElementById("reset").style.display = "inline";

    });


    const winOptions = [
        [1, 2, 3], [4, 5, 6],
        [7, 8, 9], [1, 4, 7],
        [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];


    //funcion checks if current player won the round and if the game is over
    function checkWinner() {

        for (let i = 0; i < winOptions.length; i++) {
            if (document.getElementById(winOptions[i][0]).innerHTML === playerSymbol &&
                document.getElementById(winOptions[i][1]).innerHTML === playerSymbol &&
                document.getElementById(winOptions[i][2]).innerHTML === playerSymbol) {

                document.getElementById(winOptions[i][0]).classList.add("win");
                document.getElementById(winOptions[i][1]).classList.add("win");
                document.getElementById(winOptions[i][2]).classList.add("win");

                gameEnded = true;
                round += 1;
                console.log(round);
                winner.innerHTML = (playerSymbol === "X") ? (player1 + " wins!") : (player2 + " wins!");
                playerName.innerHTML = "";
                p1Score = (playerSymbol === "X") ? p1Score + 1 : p1Score;
                p2Score = (playerSymbol === "O") ? p2Score + 1 : p2Score;
                score.innerHTML = player1 + "'s score: " + p1Score + " , " + player2 + "'s score: " + p2Score;

                if (round === parseInt(rounds)) {
                    gameEnded = true;
                    winner.innerHTML = (p1Score > p2Score) ? (player1 + " wins the game!") : (player2 + " wins the game!");
                    document.getElementById("reset").style.display = "none";
                };
            };
        };
    };


    // function checks if the round ended in a tie and if the game is over
    function checkTie() {
        for (let i = 1; i <= 9; i++) {
            if (document.getElementById(i.toString()).innerHTML === "") {
                return false;
            };
        };

        if (!gameEnded) {
            gameEnded = true;
            winner.innerHTML = "It's a tie!";
            playerName.innerHTML = ("");
            round += 1;

            if (round === parseInt(rounds)) {
                gameEnded = true;
                winner.innerHTML = (p1Score > p2Score) ? (player1 + " wins the game!") : (player2 + " wins the game!");
                document.getElementById("reset").style.display = "none"
            };
        };
        return true;
    };


    // for loop that runs the actual game
    for (let i = 1; i <= 9; i++) {
        document.getElementById(i.toString()).addEventListener("click", function (event) {
            if (this.innerHTML === "" && !gameEnded) {
                this.style.color = (playerSymbol === "X") ? color1 : color2;
                playerName.innerHTML = (playerSymbol === "X") ? (player2 + "'s turn") : (player1 + "'s turn");
                playerName.style.color = (playerSymbol === "X") ? color2 : color1;
                this.innerHTML = playerSymbol;
                this.classList.add(playerSymbol.toLowerCase());

                checkWinner();
                if (!gameEnded) {
                    checkTie();
                };

                playerSymbol = (playerSymbol === "X") ? "O" : "X";
            };
        });
    };


    //opens the help menu
    document.getElementById("helpbutton").addEventListener("click", function (event) {
        help.style.display = "block";
        game.style.display = "none";
    })

    // returns from help menu
    document.getElementById("backbutton").addEventListener("click", function (event) {
        help.style.display = "none";
        game.style.display = "block";
    })


    //resets the grid for the next round
    document.getElementById("reset").addEventListener("click", function (event) {
        for (let i = 1; i <= 9; i++) {
            document.getElementById(i.toString()).innerHTML = "";
            document.getElementById(i.toString()).classList.remove("x");
            document.getElementById(i.toString()).classList.remove("o");
            document.getElementById(i.toString()).classList.remove("win");
        };

        playerName.innerHTML = (player1 + "'s turn");
        winner.innerHTML = "";
        gameEnded = false;
        playerSymbol = "X";
        playerName.style.color = color1;
    });


    // resets the entire game and sends players back to home screen
    document.getElementById("new-game").addEventListener("click", function (event) {
        for (let i = 1; i <= 9; i++) {
            document.getElementById(i.toString()).innerHTML = "";
            document.getElementById(i.toString()).classList.remove("x");
            document.getElementById(i.toString()).classList.remove("o");
            document.getElementById(i.toString()).classList.remove("win");
        };
        winner.innerHTML = "";
        score.innerHTML = "";
        playerName.innerHTML = "";
        gameEnded = false;
        p1Score = 0;
        p2Score = 0;
        playerSymbol = "X";
        round = 0;

        home.style.display = "flex";
        game.style.display = "none";
    });

});