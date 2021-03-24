// we create an array of colors and at each step, add in a new color to the gamePattern array.
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// when calling the click function on the class btn, don't forget to use a period
$(".btn").on("click", function(e) {
    console.log(e);
    var userChosenColor = e.target.id;
    // Also could've done this: var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // also want to play a sound when they click something
    playSound(userChosenColor);
    // and play the animation as well
    animateFlash(userChosenColor);
});

// The nextSequence function generates a random color to be added into the sequence
function nextSequence() {
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber];

    // add in the random color
    gamePattern.push(randomChosenColor);

    // Animate the flash for the color
    animateFlash(randomChosenColor);
    // also play sound when that color is selected
    playSound(randomChosenColor);
    
}

// refactored code to make a play sound function since I use it twice
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

// I decided to use both methods for flashing because it looks better
function animateFlash(color) {
    // use the # to select the id of the button and use the fading features for the flash animation
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);

    // use our pressed class for animation
    $("#" + color).addClass("pressed");
    // and then remove it after a certain amount of time for the flash effect
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 100);
}