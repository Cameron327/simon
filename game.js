// we create an array of colors and at each step, add in a new color to the gamePattern array.
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// when calling the click function on the class btn, don't forget to use a period
$(".btn").on("click", function(e) {
    console.log(e);
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);

    // also want to play a sound when they click something
    playSound(userChosenColor);
});

nextSequence();

// The nextSequence function generates a random color to be added into the sequence
function nextSequence() {
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber];

    // add in the random color
    gamePattern.push(randomChosenColor);

    // Animate the flash for the color
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // also play sound when that color is selected
    playSound(randomChosenColor);
    
}

// refactored code to make a play sound function since I use it twice
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}