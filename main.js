//Object Prototype Additions
//==========================
//Add shuffle function to arrays
Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = this[i]
    this[i] = this[j]
    this[j] = temp
  }
}


//Hexagon logic
//https://www.redblobgames.com/grids/hexagons/
var boardRadius = 2
gb = new GameBoard(boardRadius)
gb.render()
