let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

// $(document).one("keydown", function (e) {
//     console.log(e.key);
//     $("#level-title").text(`Level ${level}`);
//     nextSequence();
// });

$(document).on("keydown touchstart", () => {
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

function checkAnswer(currentColor) {
    if (gamePattern[currentColor] === userPattern[currentColor]) {

        if (userPattern.length === gamePattern.length) {
            setTimeout(() => nextSequence(), 1000);
        }
    } else if (userPattern.length !== gamePattern.length) {
        playSound("wrong");
        $("#level-title").text("You Lose! Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 200);
        startOver();
    }
};

function nextSequence() {
    userPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};

function playSound(name) {
    let color = new Audio("sounds/" + name + ".mp3");
    color.play();
};

function animatePress(currentColor) {
    let $activeColor = $("#" + currentColor);
    $activeColor.addClass("pressed");
    setTimeout(() => $activeColor.removeClass("pressed"), 100);
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};

