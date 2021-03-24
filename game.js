// we create an array of colors and at each step, add in a new color to the gamePattern array.
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


$(".btn").on("click", function(e) {
    console.log(e);
    var userChosenColor = e.target.id;
    console.log(userChosenColor);
});



// The nextSequence function generates a random color to be added into the sequence
function nextSequence() {
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber];

    // add in the random color
    gamePattern.push(randomChosenColor);

    // Animate the flash for the color
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // also play sound when that color is selected
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

