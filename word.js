const Letter = require("./letters.js");

function Word(currentWord) {
    this.currentWord = currentWord;
    this.letters = [];

    this.showLetters = function () {
        let wordArray = this.currentWord.split("");
        for (let i = 0; i < wordArray.length; i++) {
            let newLetter = new Letter(wordArray[i]);
            this.letters.push(newLetter);
        }
    }

    this.guessWord = function (guess) {
        this.letters.forEach(letter => {
            letter.verifyLetter(guess);
        });
    }
    this.update = function () {
        let shownWord = "";
        this.letters.forEach(letter => {
            shownWord += letter.showLetter() + " ";
        });
        return shownWord;
    }
}

module.exports = Word;