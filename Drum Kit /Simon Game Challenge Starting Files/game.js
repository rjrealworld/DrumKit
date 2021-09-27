var gamePattern=[];
var playerPattern=[];
var colors=["green","red","yellow","blue"];
var level=0;
var gameStart=0;
var check=0;
$(document).keypress(function(){
  if(gameStart===0){
  gameStart=1;
  gamePattern=[];
  playerPattern=[];
  level=0;
  check=0;
  generateRandomNumber();
}
});
$(".btn").click(function()
{
var playerMove=$(this).attr("id");
$("#" + playerMove).addClass("pressed");
setTimeout(function(){
  $("#" + playerMove).removeClass("pressed");
},100);

playerPattern.push(playerMove);

if(check<level)
{
if(playerPattern[check]==gamePattern[check])
{
  playSound(playerMove);
  ++check;
  if(check>=level)
  {  playerPattern=[];
  setTimeout(function(){generateRandomNumber()},500);
}
}
else
{
  wrongAnswer();


}
}
else
{
  playerPattern=[];
  generateRandomNumber();
}
});
function generateRandomNumber()
{
  check=0;
  ++level;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomColour=colors[randomNumber];
  $("." + randomColour).addClass("pressed");
  setTimeout(function(){
  $("." + randomColour).removeClass("pressed");
},100);
  playSound(randomColour);
  gamePattern.push(randomColour);
}
function playSound(name)
{
  var audio=new Audio("sounds/" +name+ ".mp3");
  audio.play();
}
function wrongAnswer()
{
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")
  },100);
  var audio=new Audio("sounds/wrong.mp3");
  audio.play();
  $("h1").text("Game over, press any key to restart");
  gameStart=0;
}
