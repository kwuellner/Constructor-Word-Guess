const Word = require("./word.js");
const inquirer = require("inquirer");

const wordsToGuess = [
    "Qanun", "Tama", "Shamisen", "Daduk", "Mbira", "Bodhran",
    "Djembe", "Didgeridoo", "Vihuela", "Angklung", "Ocarina"
];

let numGuesses;
let chosenLetters;
let currentWord;
let chosenWord;

function init() {
    chosenLetters = [];
    console.log("Hello! Welcome to Word Guess: Musical Instruments Around The World Edition");
    console.log("----------------------------------------/n");
    gameStart();
}

function gameStart() {
    chosenWord = "";
    numGuesses = 15;
    if (chosenLetters.length < wordsToGuess.length) {
        chosenWord = grabWord();
    }
    // if won
    else {
        console.log("Well done! You know a lot of instruments!");
        continuePrompt();
    }
    if (chosenWord) {
        currentWord = new Word(chosenWord);
        currentWord.showLetters();
        guessWord();
    }
}

function grabWord() {
    let random = Math.floor(Math.random() * wordsToGuess.length);
    let randomWord = wordsToGuess[random];
    if (chosenLetters.indexOf(randomWord) === -1) {
        chosenLetters.push(randomWord);
        return randomWord;
    }
    else {
        return grabWord();
    }
}

function guessWord() {
    let updateLetter = [];
    inquirer.prompt([
        {
            name: "letterGuessed",
            message: currentWord.update() + "\nGuess a letter!" + "\nRemaining Guesses: " + numGuesses
        }
    ])
        .then(data => {
            currentWord.letters.forEach(letter => {
                letter.verifyLetter(data.letterGuessed);
                updateLetter.push(letter.grabCharacter());
            });
            if (numGuesses > 0 && updateLetter.indexOf("_") !== -1) {
                numGuesses--;
                if (numGuesses === 0) {
                    console.log("No more guesses! Better luck next time!");
                    continuePrompt();
                }
                else {
                    guessWord();
                }
            }
            else {
                console.log("Well done! You guessed correctly!");
                console.log(currentWord.update());
                startGame();
            }
        });
}

function continuePrompt() {
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "Try again?",
            choices: ["Yes", "No"]
        }
    ])
        .then(data => {
            if (data.continue === "Yes") {
                init();
            }
            else {
                console.log("Thanks for playing!");
            }
        });
}
init();