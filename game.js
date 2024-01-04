document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("title").textContent = "Hangman Game!";

    let words = [
        "cats",
        "monkeys",
        "sharks",
        "dogs",
        "whales",
        "spiders",
        "ducks"
    ];

    let word = words[Math.floor(Math.random() * words.length)];

    let answerArray = [];
    for (let i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }

    let remainingLetters = word.length;
    let remainingAttempts = 6; // Antal försök

   
    let hangmanDisplay = document.getElementById("hangman-display");
    for (let i = 0; i < 6; i++) {
        let hangmanPart = document.createElement("div");
        hangmanPart.className = "hangman-part";
        hangmanDisplay.appendChild(hangmanPart);
    }

    for (let letter of 'abcdefghijklmnopqrstuvwxyz') {
        let button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", function() {
            guessLetter(letter);
        });
        document.getElementById("buttons-container").appendChild(button);
    }

    document.getElementById('guess-button').addEventListener('click', function() {
        let guessInput = document.getElementById('guess-input');
        let guess = guessInput.value.toLowerCase();

        if (/^[a-zA-Z]$/.test(guess)) {
            guessLetter(guess);
        } else {
            alert("Please enter a valid single letter.");
        }

        guessInput.value = '';
    });

    function guessLetter(guess) {
        if (remainingLetters > 0 && remainingAttempts > 0) {
            let rightGuess = false;

            for (let i = 0; i < word.length; i++) {
                if (word[i] === guess && answerArray[i] === '_') {
                    answerArray[i] = guess;
                    remainingLetters--;
                    rightGuess = true;
                }
            }

            if (!rightGuess) {
                remainingAttempts--;
                updateHangmanDisplay(6 - remainingAttempts);
            }

            updateDisplay();
        }

        if (remainingLetters === 0) {
            endGame(true); 
        }

        if (remainingAttempts === 0) {
            endGame(false); 
        }
    }

    function updateDisplay() {
        document.getElementById("word-display").textContent = answerArray.join(" ");
        document.getElementById("attempts-count").textContent = remainingAttempts;
    }

    function updateHangmanDisplay(partsToShow) {
        let hangmanParts = document.querySelectorAll(".hangman-part");
        for (let i = 0; i < partsToShow; i++) {
            hangmanParts[i].style.display = "block";
        }
    }
    function isLoser() {
        return remainingAttempts === 0;
    }

    function endGame(isWinner) {
        if (isWinner) {
            alert("Well done you! The right word was " + word);
        } else {
            alert("Sorry, you lost. The correct word was " + word);
        }
    
        showGameoverScreen(isWinner ? "Well done you! The right word was " + word : "Sorry, you lost. The correct word was " + word);
     
    }
    

    function showGameoverScreen(message) {
        document.getElementById("gameover-message").textContent = message;
        document.getElementById("gameover-screen").style.display = "flex";
        document.getElementById("restart-button").addEventListener("click", function() {
            resetGame();
            document.getElementById("gameover-screen").style.display = "none";
        });
    }
    
    function resetGame() {
        word = words[Math.floor(Math.random() * words.length)];
        answerArray = [];
        for (let i = 0; i < word.length; i++) {
            answerArray[i] = "_";
        }
        remainingLetters = word.length;
        remainingAttempts = 6;
    
        document.getElementById("title").textContent = "Word guessing game"; 
        updateDisplay();
        updateHangmanDisplay(0);
    }
    
    if (remainingLetters === 0) {
        showGameoverScreen("Well done you! The right word was " + word);
    }
    
    if (isLoser()) {
        showGameoverScreen("Sorry, you lost. The correct word was " + word);
    }

    updateDisplay();
});
