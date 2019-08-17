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

    this.checkLetter = function (guess) {
        if (guess === this.letter) {
            this.guessed = true;
        }
        else {
            return false;
        }
    }
}

module.exports = Letter;