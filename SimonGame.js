var level = 0

started = false;

$(document).click(function() {
  if (!started) {
    $("#title").text("Level " + level);
    started = true;
    nextColor();
  };
});



var colors = ["red", "blue", "green", "yellow"];

var colorPattern = [];

var playerPattern = [];

$(document).keypress(function(event) {
  var choseColor = $("." + event.key).attr("id");
  playerPattern.push(choseColor);
  check(playerPattern.length - 1);
});

function nextColor() {
  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNum];
  colorPattern.push(randomColor);
  var sound = new Audio("sounds/" + randomColor + ".mp3");
  sound.play();
  playAnimation(randomColor);
  level ++;
  playerPattern = [];
};

function check(currentPosition) {
  if (playerPattern[currentPosition] === colorPattern[currentPosition]) {
    console.log("Success");
    if (playerPattern.length === colorPattern.length) {
      setTimeout(function() {
        nextColor();
      }, 1000);
    };
  }
  else {
    var overSound = new Audio("sounds/wrong.mp3");
    overSound.play();
    var gameOver = $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#title").text("GAME OVER! Click to restart");
    startAgain();
  };
};

function startAgain() {
  level = 0;
  colorPattern = [];
  started = false;
};



$(document).keypress(function(event) {
  playSound(event.key);
  playAnimation(event.key);
});

function playSound(key) {
  switch (key) {
    case "w":
      var w_sound = new Audio("sounds/red.mp3");
      w_sound.play();
      break;
    case "a":
      var a_sound = new Audio("sounds/blue.mp3");
      a_sound.play();
      break;
    case "s":
      var s_sound = new Audio("sounds/green.mp3");
      s_sound.play();
      break;
    case "d":
      var d_sound = new Audio("sounds/yellow.mp3");
      d_sound.play();
      break;
    default: console.log(key);
  };
};

function playAnimation(pressed) {
  var buttonPressed = $("." + pressed);
  buttonPressed.addClass("pressed");
  setTimeout(function() {
    buttonPressed.removeClass("pressed");
  }, 100);
};
