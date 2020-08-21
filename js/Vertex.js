class Vertex extends GamePiece{
  constructor(q, r){
    const img = new Image() //starts out as empty image.
    super(q, r, img)
    this.owner = null;
    this.structureType = null; //Options of null, settlement or city
  }

  imgDims(scale) {
    var hFactor
    var wFactor
    if(this.structureType == "settlement"){
      hFactor = 0.268
      wFactor = 1.472
    } else if (this.structureType == "city") {
      hFactor = 0.346
      wFactor = 1.528
    } else {//default to square aspect ratio
      hFactor = 0.4
      wFactor = 1.0
    }

    const h = hFactor * scale
    const dims = new Point(wFactor * h, h)

		return dims
	}

  imgAnchorPoint(scale){
    const dims = this.imgDims(scale)
    var p
    if(this.structureType == "settlement"){
      p = new Point(0.607 * dims.x, 0.419 * dims.y)
    } else if (this.structureType == "city") {
      //TODO: Add city anchor point calc
      p = new Point(0.573 * dims.x, 0.326 * dims.y)
    } else { //default to centered anchor
      p = new Point(0.5 * dims.x, 0.5 * dims.y)
    }

    return p
	}

  highlight(){ //Function to highlight available

  }

}
