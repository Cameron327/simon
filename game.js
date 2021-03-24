// we create an array of colors and at each step, add in a new color to the gamePattern array.
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// also create a started variable
var started = false;
var level = 0;

// starting the game after the ENTER key is pressed
$(document).keypress(function(e) {
    if (e.key === "Enter" && started === false){
        // when game starts, change the h1 to say what level we are on. Don't really need this since we already do it in the beginning of 
        // calling nextSequence
        // $("h1").html("Level " + level);

        started = true;
        nextSequence();
    }
});



// call this when a user clicks a button
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


    // call check answer after a user has clicked
    checkAnswer(userClickedPattern.length - 1);
});

// The nextSequence function generates a random color to be added into the sequence
function nextSequence() {

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    // Always start the game by initializing an empty userClickedPattern array
    userClickedPattern = [];

    level++;
    // we have the initial update to the h1 right when the game starts and then we use this one now for the rest of the game
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber];

    // add in the random color
    gamePattern.push(randomChosenColor);

    // animate flash for every color in the gamePattern array for each round instead of just flashing the most recently added one
    // do this by using the gamePattern array
    // Also need to implement delay for each animation
    // ****For some reason, I can't get this for loop to call the 2 animate functions because the parameter is undefined?
    // for (var i = 0; i < gamePattern.length; i++) {
    //     console.log("Before timeout");
    //     setTimeout(function () {
    //         console.log(gamePattern);
    //         console.log(gamePattern[i]);
    //         // Animate the flash for the color
    //         animateFlash(gamePattern[i]);
    //         // also play sound when that color is selected
    //         playSound(gamePattern[i]);
    //     }, 900);
    // }

    // For now, we will just animate the most recently added color to the game pattern
    // Animate the flash for the color
    animateFlash(gamePattern[gamePattern.length-1]);
    // also play sound when that color is selected
    playSound(gamePattern[gamePattern.length-1]);
    
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

// create a check answer function
// current level is the most recent index of the most recent clicked color. And this function would be called everytime a user clicks on a button.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Correct");

        // If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){

            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 900);
        }
    } else {
        console.log("Incorrect");
        // when the user gets the pattern wrong, play the "wrong" sound and flash the backgroud red
        playSound("wrong");
        
        // red background flash
        $("body").addClass("game-over");
        setTimeout(function () {
           $("body").removeClass("game-over"); 
        }, 200);

        // change the header too
        $("h1").html("Game Over, Press ENTER to Restart");

        startOver();
    }
}

// a start over function after the user gets it wrong
function startOver() {
    level = 0;
    gamePattern = [];

    // when we set this variable to false, the user will be allowed to start the game with ENTER again
    started = false;
}

// Add in a button to test what the incorrect sound sounds like that the user can click.
// Also implement something that doesn't call the incorrect sound when the game didn't even start yet (use an if statement or something in the keypress section).