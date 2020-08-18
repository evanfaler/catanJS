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

setupControlPanel()



//CONTROL PANEL SETUP
function setupControlPanel(){
  //Regenerate hex map button and reroll numbers
  var rgnBtn = document.getElementById("rgnBtn");
  rgnBtn.addEventListener("click", (event) => {
    gb = new GameBoard(2)
    gb.render()
  })

  //Gamepiece selection tray
  var ctrlPanel = document.getElementById("ctrlPanel");

  console.log("Control Panel Width = " + ctrlPanel.offsetWidth)

  const pieceArr = ["settlement", "city"]

  for (var i = 1; i <= 4; i++) { //loop through each player
    const div = document.createElement('div');
    div.id = "pieceContainer_" + i;
    div.className = "pieceContainer"

    for (var j = 0; j < pieceArr.length; j++) { //loop through each game piece
      const img = document.createElement("img");
      img.src = "img/structures/" + pieceArr[j] + "_" + i + ".png"
      img.id = pieceArr[j] + "_" + i
      //TODO: make image size more dynamic for control panel
      img.height = "100"
      img.width = "100"
      div.appendChild(img)

      img.addEventListener('click', (e) => {
          gb.awaitPlacement(img.id)
      });
    }

    ctrlPanel.appendChild(div)
  }
}
