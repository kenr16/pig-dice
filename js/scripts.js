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
  } else {
    return false;
  }
}

Player.prototype.victory = function () {
  if (this.total >= 100) {
    return true;
  } else {
    return false;
  }

}

Player.prototype.roll = function (dieRoll) {
  this.pot += dieRoll;
}

Player.prototype.hold = function () {
  this.addScore(this.pot);
}



function getRandomArbitrary() {
  return Math.floor(Math.random() * (7 - 1)) + 1;
}




// UI Logic

function resetFields() {
  $("#pot1, #roll1, #pot2, #roll2").text(0);
}

$(function(){

//**********************************************
  //Failed attemp to implement a modal:
  // Get the modal
  // var modal = document.getElementById('myModal');
  // // Get the <span> element that closes the modal
  // var span = document.getElementsByClassName("close")[0];
  //     modal.style.display = "block";  //This will open the modal
  //     $("#modalText").text("Hello");
  // // When the user clicks on <span> (x), close the modal
  // span.onclick = function() {
  //     modal.style.display = "none";
  // }
  // // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //     if (event.target == modal) {
  //         modal.style.display = "none";
  //     }
  // }
//*************************************************

  var player1Name = "Player 1";
  var player2Name = "Player 2";
  $(".btn2").toggleClass("hidden");
  $("#player1").toggleClass("selected");
  var Player1 = new Player(player1Name, 0, 0);
  var Player2 = new Player(player2Name, 0, 0);

  //handles changing names
  $("#name-container1 input").change(function(){
    player1Name = $("#name1").val();
    Player1.name = player1Name;
    $("#player1 h1").text(player1Name);
  });

  $("#name-container2 input").change(function(){
    player2Name = $("#name2").val();
    Player2.name = player2Name;
    $("#player2 h1").text(player2Name);
  });

  $("button[name=roll1]").click(function(){ //Player 1 Roll Function
    var dieRoll = parseInt(getRandomArbitrary());
    if (Player1.checkOne(dieRoll) === true) {
      $("#pot1").text(0);
      $("#roll1").text(dieRoll);
      $(".btn").toggleClass("hidden");
      $(".col-xs-5").toggleClass("selected");
      alert("You have rolled a 1.");
      aiScript();             //Disable for single player.
    } else {
      $("#roll1").text(dieRoll);
      Player1.roll(dieRoll);
      $("#pot1").text(Player1.pot);
    }
  });

  $("button[name=hold1]").click(function(){ //Player 1 Hold Function
    Player1.hold();
    $("#totalscore1").text(Player1.total);
    resetFields();
    if (Player1.victory() === true) {
      var delayMillis = 200; //1 second
      setTimeout(function() {
        alert("Victory for " + Player1.name + "!");
      }, delayMillis);
    } else {
      $(".btn").toggleClass("hidden");
      $(".col-xs-5").toggleClass("selected");
      aiScript();
    }
  });
  // ************************************************
  // Smart AI Script
  // ************************************************
    var aiScript = function() {
      alert(Player2.name + "'s turn!");
      var dieRolls = [];

      while (Player2.pot < 20 || Player2.pot <= 25 && (Player1.total + 10) >= (Player2.total + Player2.pot)) {
        if ((Player2.pot+Player2.total) >= 100) {
          break;
        }
        var dieRoll = parseInt(getRandomArbitrary());
        alert(Player2.name + " has rolled a "+ dieRoll + "\nCurrent Pot: " + Player2.pot);

        if (Player2.checkOne(dieRoll) === true) {
          $("#pot2").text(0);
          $("#roll2").text(dieRoll);
          $(".btn").toggleClass("hidden");
          $(".col-xs-5").toggleClass("selected");
          alert("The AI has rolled a 1");
          dieRolls.push(dieRoll);
          return;
        } else {
          $("#roll2").text(dieRoll);
          Player2.roll(dieRoll);
          $("#pot2").text(Player2.pot);
        }
        dieRolls.push(dieRoll);
      }
      alert("The AI has finished with the following rolls: " + dieRolls);

      Player2.hold();
      $("#totalscore2").text(Player2.total);
      resetFields();
      $(".btn").toggleClass("hidden");
      $(".col-xs-5").toggleClass("selected");

      if (Player2.victory() === true) {
        var delayMillis = 200; //1 second
        setTimeout(function() {
          alert("Victory for " + Player2.name + "!");
        }, delayMillis);
        $(".btn").toggleClass("hidden");
        $(".col-xs-5").toggleClass("selected");
      }

    }
  });

  // ************************************************
  // End Smart AI Script
  // ************************************************

// ************************************************
// Dumb AI Script
// ************************************************

//   var aiScript = function() {
//     alert("Player 2's turn");
//     var dieRolls = [];
//       for (var i = 0; i < 2; i ++) {
//         var dieRoll = parseInt(getRandomArbitrary());
//         if (Player2.checkOne(dieRoll) === true) {
//           $("#pot2").text(0);
//           $("#roll2").text(dieRoll);
//           $(".btn").toggleClass("hidden");
//           $(".col-xs-5").toggleClass("selected");
//           alert("The AI has rolled a 1");
//           dieRolls.push(dieRoll);
//           return;
//         } else {
//           $("#roll2").text(dieRoll);
//           Player2.roll(dieRoll);
//           $("#pot2").text(Player2.pot);
//         }
//         dieRolls.push(dieRoll);
//         if (i == 2) {
//           alert("The AI has finished with the following rolls: " + dieRolls);
//         }
//       }
//     Player2.hold();
//     $("#totalscore2").text(Player2.total);
//     resetFields();
//     $(".btn").toggleClass("hidden");
//     $(".col-xs-5").toggleClass("selected");
//
//     if (Player2.victory() === true) {
//       var delayMillis = 200; //1 second
//       setTimeout(function() {
//         alert("Victory for " + Player2.name + "!");
//       }, delayMillis);
//       $(".btn").toggleClass("hidden");
//       $(".col-xs-5").toggleClass("selected");
//     }
//
//   }
// });

// ************************************************
// End Dumb AI Script
// ************************************************


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
  //     Player2.roll(dieRoll);
  //     $("#pot2").text(Player2.pot);
  //   }
  // });
  //
  // $("button[name=hold2]").click(function(){  //Player 2 Hold Function
  //   Player2.hold();
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
