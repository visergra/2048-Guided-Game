window.onload = function() {
  game = new Game2048();
  renderTiles();
  document.addEventListener("keydown", moveListeners);
  loadSounds();

};


function loadSounds() {
  ion.sound({
    sounds: [{
      name: "snap"
    }, {
      name: "tap"
    }],

    path: "../lib/ion.sound-3.0.7/sounds/",
    preload: true,
    volume: 100.0
  });
}

function renderTiles() {
  game.board.forEach(function(row, rowIndex) {
    row.forEach(function(cell, cellIndex) {
      if (cell) {
        var tileContainer = document.getElementById("tile-container");
        var newTile = document.createElement("div");

        newTile.classList = "tile val-" + cell;
        newTile.classList += " tile-position-" + rowIndex + "-" + cellIndex;
        newTile.innerHTML = (cell);

        tileContainer.appendChild(newTile);
      }
    });
  });
}

function resetTiles() {
  var tilesContainer = document.getElementById("tile-container");
  var tiles = tilesContainer.getElementsByClassName("tile");

  Array.prototype.slice.call(tiles).forEach(function(tile) {
    tilesContainer.removeChild(tile);
  });
}

function updateScore() {
  var score = game.score;
  var scoreContainer = document.getElementsByClassName("js-score");

  Array.prototype.slice.call(scoreContainer).forEach(function(span) {
    span.innerHTML = score;
  });
}

function gameStatus() {
  if (game.won) {
    var gameBoardDiv = document.getElementById("game-board");
    var clearFixDiv = document.querySelector("#game-board > div.clearfix");
    var newDivGameOver = document.createElement("div");
    newDivGameOver.setAttribute('id', 'game-over');

    var newPResultGame = document.createElement("p");
    newPResultGame.setAttribute('id', 'result-game');

    var newPResultScore = document.createElement("p");
    newPResultScore.setAttribute('id', 'result-score');

    newDivGameOver.appendChild(newPResultGame);
    newDivGameOver.appendChild(newPResultScore);
    gameBoardDiv.insertBefore(newDivGameOver, clearFixDiv);
    document.getElementById("game-over").classList = "show-won";
    document.getElementById("result-game").innerHTML = "Game Over You Win!";
    document.getElementById("result-score").innerHTML = "Score " + game.score;
  } else if (game.lost) {
    var gameBoardDiv = document.getElementById("game-board");
    var clearFixDiv = document.querySelector("#game-board > div.clearfix");
    var newDivGameOver = document.createElement("div");
    newDivGameOver.setAttribute('id', 'game-over');

    var newPResultGame = document.createElement("p");
    newPResultGame.setAttribute('id', 'result-game');

    var newPResultScore = document.createElement("p");
    newPResultScore.setAttribute('id', 'result-score');

    newDivGameOver.appendChild(newPResultGame);
    newDivGameOver.appendChild(newPResultScore);
    gameBoardDiv.insertBefore(newDivGameOver, clearFixDiv);

    document.getElementById("game-over").classList = "show-lost";
    document.getElementById("result-game").innerHTML = "Game Over You Lost!";
    document.getElementById("result-score").innerHTML = "Score " + game.score;
  }
}


function moveListeners(event) {
  var keys = [37, 38, 39, 40];

  if (keys.indexOf(event.keyCode) < 0)
    return;

  switch (event.keyCode) {
    case 37:
      game.move("left");
      break;
    case 38:
      game.move("up");
      break;
    case 39:
      game.move("right");
      break;
    case 40:
      game.move("down");
      break;
  }

  resetTiles();
  renderTiles();
  updateScore();
  gameStatus();
}
