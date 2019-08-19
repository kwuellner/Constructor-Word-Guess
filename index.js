const Word = require("./word.js");
const inquirer = require("inquirer");

const wordsToGuess = [
    "Qanun", "Tama", "Shamisen", "Daduk", "Mbira", "Bodhran",
    "Djembe", "Didgeridoo", "Vihuela", "Angklung", "Ocarina"
];

let chalk = require('chalk');

let numGuesses;
let chosenLetters;
let currentWord;
let chosenWord;

function init() {
    chosenLetters = [];
    console.log(chalk.red("\n---------------------------------------------------------------------"));
    console.log(chalk.bold.cyan("Hello! Can You Guess These Musical Instruments From Around The World?"));
    console.log(chalk.red("---------------------------------------------------------------------\n"));
    gameStart();
}

function gameStart() {
    chosenWord = "";
    numGuesses = 15;
    if (chosenLetters.length < wordsToGuess.length) {
        chosenWord = grabWord();
    }
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
            type: "input",
            name: "letterGuessed",
            message: currentWord.update() + (chalk.bold.yellow("\nGuess a letter!") + (chalk.bold.yellow("\n\nRemaining Guesses: ")) + (chalk.red(numGuesses)) + (chalk.bold.yellow("\nLetter Guessed: " + updateLetter.join("")))

            )
        }
    ])
        .then(data => {
            currentWord.letters.forEach(letter => {
                letter.verifyLetter(data.letterGuessed);
                updateLetter.push(letter.showLetter());
            });

            if (numGuesses > 0 && updateLetter.indexOf("_") !== -1) {
                numGuesses--;

                if (numGuesses === 0) {
                    console.log(chalk.red("\n----------------------------------------"));
                    console.log(chalk.bold.cyan("Out of guesses! The correct answer was " + chosenWord));
                    console.log(chalk.red("----------------------------------------\n"));
                    continuePrompt();


                }
                else {
                    guessWord();
                }
            }
            else {
                console.log(chalk.red("\n----------------------------------------"));
                console.log(chalk.bold.cyan("Well done! " + chosenWord + " was correct!"));
                console.log(chalk.red("----------------------------------------\n"));
                continuePrompt();
            }
        });
}

function continuePrompt() {
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "\nWould you like to go another round?",
            choices: ["Yes", "No"]
        }
    ])
        .then(data => {
            if (data.continue === "Yes") {
                init();
            }
            else {
                console.log(chalk.red("\n----------------------------"));
                console.log(chalk.bold.cyan("Thanks for playing!"));
                console.log(chalk.red("----------------------------\n"));
            }
        });
}
init();