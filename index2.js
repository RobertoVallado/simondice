//VARIABLES
var buttonColour = ["purple", "blue", "red", "yellow"];
var gamePattern = [];
var playerPattern = [];

var start = false;
var level = 0;

$(".monkey").hide();
//DOCUMENT LISTENER
$(document).keyup(function(event) {
  if (event.code === 'Space' && !start) {
    nextSequence();
    start = true;
    $(".monkey").hide();
    $("#container1").show();
  } else {
    $("#title").html("Space bar to start!");
    playSound("blip");
    setTimeout(blink1, 1000);
    setTimeout(removeblink, 2000);
  };
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("game_over");
    $("body").addClass("game-over");
    $("#title").text("GAME OVER! Press Space-bar to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#container1").hide();
    $(".monkey").show();
    startOver();
  }

}

//FUNCTIONS
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#title").html("Simon says: Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColour[randomNumber];
  gamePattern.push(randomChosenColour);

  for (let i = 0; i < gamePattern.length; i++) {
    var timerLog = [i] + "000";
    setTimeout(function() {
      $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
      console.log(timerLog);

    }, timerLog);
  }

  // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // playSound(randomChosenColour);
};

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};
//Blinks
function blink1() {
  $("#title").addClass("blink");
}

function removeblink() {
  $("#title").removeClass("blink");
}

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
};
