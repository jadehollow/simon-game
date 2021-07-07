let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;
let bestLevel = 0;

///// To start the game:
$(".start-button").on("click touchstart", () => {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

///// When user clicks a color's button:
$(".play-button").on("click", function () {
    let $userChosenColor = $(this).attr("id");
    userPattern.push($userChosenColor);
    playSound($userChosenColor);
    animatePress($userChosenColor);
    checkAnswer(userPattern.length - 1);
});

///// Check user response against the game's answer:
checkAnswer = (currentColor) => {
    if (gamePattern[currentColor] === userPattern[currentColor]) {

        if (userPattern.length === gamePattern.length) {
            setTimeout(() => nextSequence(), 1000);
        }
    } else if (userPattern.length !== gamePattern.length) {
        playSound("wrong");
        $("#level-title").text("You Lose! Press Start to Play Again");
        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 200);
        startOver();
    }
};

///// Game sequences:
nextSequence = () => {
    updateLevelText();
    userPattern = [];
    level++;
    $("#level-title").text(`Level ${level - 1}`);
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSeq();
};

playSeq = () => {
    let i = 0;
    let seq = setInterval(() => {
      animatePress(gamePattern[i]);
      playSound(gamePattern[i]);
      i++;
      if (i >= gamePattern.length) {
        clearInterval(seq);
      }
    }, 700)
    userPattern = [];
  }

///// Button audio:
playSound = (name) => {
    let color = new Audio("sounds/" + name + ".mp3");
    color.play();
};

///// Animate button:
animatePress = (currentColor) => {
    let $activeColor = $("#" + currentColor);
    $activeColor.addClass("pressed");
    setTimeout(() => $activeColor.removeClass("pressed"), 100);
};

///// Restart the game:
startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
};

///// Change Best Level counter:
updateLevelText = () => {
	bestLevel = Math.max(level, bestLevel);
	$("h3").text(`Current Level: ${level} // Best Level: ${bestLevel}`);
};
