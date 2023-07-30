var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level" + level);
        nextSequence();
        start = true;
    }
})



$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);


});


function startOver(){
    level = 0;
    gamePattern =  [];
    start = false;
}




function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if(gamePattern.length === userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
      }
    } else {
        console.log("Wrong!");

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 1000);
         
        $("level-title").text("Game over! press any key to continue");
        

        startOver();
    }
}





function nextSequence(){

    level++;
    $("#level-title").text("Level" + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);
    
    playSound(randomChosenColour);
   
}

function playSound(name){
       
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function(){
        
        $("#" + currentColour).removeClass("pressed");
    
    },100);

}
