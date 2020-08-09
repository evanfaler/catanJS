class HexTile extends GamePiece{
  constructor(q, r, resource, rate){
    var img = new Image();
    img.src = "img/resources/" + resource + ".png"

    super(q, r, img);

    this.resource = resource;
    this.numberTile = new NumberTile(q, r, rate)
  }

//overrided imgDims function
imgDims(size) {
  const w = Math.sqrt(3) * size;
  const h = 2 * size;
  const p = new Point(w, h)
  return p;
}

};
