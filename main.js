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

//Testing out vertexes
// var v = new Vertex(0, 0)
// const img = new Image()
// img.src = "img/structures/city_4.png"
// v.structureType = "city"
// v.img = img
//
// v.render(gb.ctx, gb.getHexSize())

var rgnBtn = document.getElementById("rgnBtn");
rgnBtn.addEventListener("click", (event) => {
  gb = new GameBoard(2)
  gb.render()
})


//get cursor location when over canvas.
gb.canvas.addEventListener("mousedown", (event) => {
	const rect = gb.canvas.getBoundingClientRect();
	var p = new Point(event.clientX - rect.left, event.clientY - rect.top)

  //Convert clicked coords to q and r coords
  const canvasOrigin = new Point(gb.canvas.width / 4, gb.canvas.height / 4);
  p.x = p.x - canvasOrigin.x
  p.y = p.y - canvasOrigin.y
  p.scale(2 / gb.getHexSize())
  p = convertXYtoQR(p)

  var v = new Vertex(p.x, p.y)
  const img = new Image()
  img.src = "img/structures/settlement_4.png"
  v.structureType = "settlement"
  v.img = img

  v.render(gb.ctx, gb.getHexSize())
})

function convertXYtoQR(p){
  const r = (2 / 3) * p.y
  const q = (p.x / Math.sqrt(3)) - r / 2
  return new Point(q, r)
}
