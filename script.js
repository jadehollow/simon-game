let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;
let bestLevel = 0;

// $(document).one("keydown", function (e) {
//     console.log(e.key);
//     $("#level-title").text(`Level ${level}`);
//     nextSequence();
// });

$(".start-button").on("click touchstart", () => {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function () {
    let $userChosenColor = $(this).attr("id");
    userPattern.push($userChosenColor);
    playSound($userChosenColor);
    animatePress($userChosenColor);
    checkAnswer(userPattern.length - 1);
});

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

playSound = (name) => {
    let color = new Audio("sounds/" + name + ".mp3");
    color.play();
};

animatePress = (currentColor) => {
    let $activeColor = $("#" + currentColor);
    $activeColor.addClass("pressed");
    setTimeout(() => $activeColor.removeClass("pressed"), 100);
};

startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
};

updateLevelText = () => {
	bestLevel = Math.max(level, bestLevel);
	$("h3").text(`Current Level: ${level} // Best Level: ${bestLevel}`);
};
