window.onload = function () {
  game = new Game2048();
  renderTiles();
};

function renderTiles () {
  game.board.forEach(function(row, rowIndex){
    row.forEach(function (cell, cellIndex) {
      if (cell) {
        var tileContainer = document.getElementById("tile-container");
        var newTile       = document.createElement("div");

        newTile.classList  = "tile val-" + cell;
        newTile.classList += " tile-position-" + rowIndex + "-" + cellIndex;
        newTile.innerHTML  = (cell);

        tileContainer.appendChild(newTile);
      }
    });
  });
}
