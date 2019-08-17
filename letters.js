function Letter(letter) {
    this.letter = letter;
    this.guessed = false;

    this.showLetter = function () {
        if (this.guessed === true) {
            return this.letter;
        }
        else {
            return "_";
        }
    }

    this.verifyLetter = function (guess) {
        if (guess.toUpperCase() === this.letter ||
            guess.toLowerCase() === this.letter) {
            this.guessed = true;
        }
        else {
            return false;
        }
    }
}

module.exports = Letter;