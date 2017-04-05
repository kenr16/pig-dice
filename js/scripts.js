//business logic
function Player(name, total, pot){
  this.name = name;
  this.total = total;
  this.pot = pot;
}

Player.prototype.addScore = function (counter) {
  this.total += counter;
  this.pot = 0;
};

Player.prototype.checkOne = function (dieRoll) {
  if(dieRoll == 1) {
    this.pot = 0;
    return true;
  }
}

Player.prototype.victory = function () {
  if (this.total >= 100) {
    alert("Victory for " + this.name + "!");
  }
}

function getRandomArbitrary() {
  return Math.floor(Math.random() * (7 - 1)) + 1;
}





// UI Logic

function resetFields() {
  $("#pot1, #roll1, #pot2, #roll2").text(0);
}


$(function(){

  var player1Name = "Player 1";
  var player2Name = "Player 2";
  $(".btn2").toggleClass("hidden");
  $("#player1").toggleClass("selected");
  var Player1 = new Player(player1Name, 0, 0);
  var Player2 = new Player(player2Name, 0, 0);

  //handles changing name
  $("#name-container1 input").change(function(){
    player1Name = $("#name1").val();
    $("#player1 h1").text(player1Name);
  });

  //handles changing name
  $("#name-container2 input").change(function(){
    player2Name = $("#name2").val();
    $("#player2 h1").text(player2Name);
  });

  $("button[name=roll1]").click(function(){ //Player 1 Roll Function
    var dieRoll = parseInt(getRandomArbitrary());
    if (Player1.checkOne(dieRoll) === true) {
      $("#pot1").text(0);
      $("#roll1").text(dieRoll);
      $(".btn").toggleClass("hidden");
      $(".col-xs-5").toggleClass("selected");
    } else {
      $("#roll1").text(dieRoll);
      Player1.pot += dieRoll;
      $("#pot1").text(Player1.pot);
    }
  });

  $("button[name=hold1]").click(function(){ //Player 1 Hold Function
    Player1.addScore(Player1.pot);
    $("#totalscore1").text(Player1.total);
    resetFields();
    $(".btn").toggleClass("hidden");
    $(".col-xs-5").toggleClass("selected");
    var delayMillis = 200; //1 second
    setTimeout(function() {
      Player1.victory();
    }, delayMillis);
  });

// ************************************************
// Player 2 Human Script
// ************************************************
  // $("button[name=roll2]").click(function(){ //Player 2 Roll Function
  //   var dieRoll = parseInt(getRandomArbitrary());
  //   if (Player2.checkOne(dieRoll) === true) {
  //     $("#pot2").text(0);
  //     $("#roll2").text(dieRoll);
  //     $(".btn").toggleClass("hidden");
  //     $(".col-xs-5").toggleClass("selected");
  //   } else {
  //     $("#roll2").text(dieRoll);
  //     Player2.pot += dieRoll;
  //     $("#pot2").text(Player2.pot);
  //   }
  // });
  //
  // $("button[name=hold2]").click(function(){  //Player 2 Hold Function
  //   Player2.addScore(Player2.pot);
  //   $("#totalscore2").text(Player2.total);
  //   Player2.victory();
  //   resetFields();
  //   $(".btn").toggleClass("hidden");
  //   $(".col-xs-5").toggleClass("selected");
  //   var delayMillis = 200; //1 second
  //   setTimeout(function() {
  //     Player2.victory();
  //   }, delayMillis);
  // });
// ************************************************
// End Player 2 Human Script
// ************************************************

//AI Script
  $()//Something Will Happen
    for (var i = 0; i < 2; i ++) { //i is the number of rolls the AI will run through.
      var dieRoll = parseInt(getRandomArbitrary());
      $("#roll2").text(dieRoll);
      Player2.pot += dieRoll;
      $("#pot2").text(Player2.pot);
      var delayMillis = 1000; //1 second delay script
      setTimeout(function() {
        alert("First AI Roll!");
      }, delayMillis);
      delayMillis = 1000;







    }


  //
  //   if (Player2.checkOne(dieRoll) === true) {
  //     $("#pot2").text(0);
  //
  //     $(".btn").toggleClass("hidden");
  //     $(".col-xs-5").toggleClass("selected");
  //   } else {
  //     $("#roll2").text(dieRoll);
  //     Player2.pot += dieRoll;
  //     $("#pot2").text(Player2.pot);
  //   }
  //
  //
  //   Player2.addScore(Player2.pot);
  //   $("#totalscore2").text(Player2.total);
  //   Player2.victory();
  //   resetFields();
  //   $(".btn").toggleClass("hidden");
  //   $(".col-xs-5").toggleClass("selected");
  //   var delayMillis = 200; //1 second
  //   setTimeout(function() {
  //     Player2.victory();
  //   }, delayMillis);
  // });


});

//
//   $("#accountForm").submit(function(e){
//     e.preventDefault();
//
//   });
//
