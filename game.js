// we create an array of colors and at each step, add in a new color to the gamePattern array.
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var randomChosenColor = buttonColors[nextSequence()];

// add in the random color
gamePattern.push(randomChosenColor);

function nextSequence() {
    var randomNumber = Math.floor((Math.random() * 4));

    return randomNumber;
}

