class GamePiece {
  constructor(q, r, img) {
    this.q = q; //rotated 60deg axis
    this.r = r; //vertical axis
    this.img = img;
  }

  //resolve and index are optional.  Used for initial draw of hex tiles and num
  //tiles.
  render(ctx, scale, resolve, index) {
    if (this.img != null){
      var xyLoc = this.locXY()
      xyLoc.scale(scale)
      const canvasOrigin = new Point(ctx.canvas.width / 2, ctx.canvas.height / 2);
      xyLoc.x = canvasOrigin.x + xyLoc.x
    	xyLoc.y = canvasOrigin.y + xyLoc.y

      const anchor = this.imgAnchorPoint(scale);
      const imgSize = this.imgDims(scale);

      //Check if image is loaded.  If it is, go ahead and draw it.
      //If not, add listener for load and draw after.
      //For initial draw of hex and number tiles, a promise is used
      //to ensure that the hex tiles are drawn before the num tiles.
      //resolve function is called once hex tile is loaded and drawn.
      var isLoaded = this.img.complete && this.img.naturalHeight !== 0;
      if(isLoaded){
        ctx.drawImage(this.img, xyLoc.x - anchor.x, xyLoc.y - anchor.y, imgSize.x, imgSize.y)
        if(typeof resolve !== 'undefined') {
          setTimeout(function() {
            resolve(index)
          }, 0);
        }
      } else {
        this.img.onload = function() {
          ctx.drawImage(this, xyLoc.x - anchor.x, xyLoc.y - anchor.y, imgSize.x, imgSize.y)

          if(typeof resolve !== 'undefined') {
            setTimeout(function() {
              resolve(index)
            }, 0);
          }
        }
      }
    }
  }

  imgDims(scale) {
    //OVERRIDE THIS METHOD
    //EACH RESOURCE IS UNIQUE
    throw "You must override the imgDims function when extending the GamePiece Class!"
  }


  imgAnchorPoint(scale){
    //DEFAULT IS CENTER OF IMAGE
    //OVERRIDE AS REQUIRED.
    const dims = this.imgDims(scale)
    const p = new Point(dims.x / 2, dims.y / 2)

    return p
  }

  get s(){
  	return (-this.q - this.r);
  }

  locQR(){
   return new Point(this.q, this.r)
  }

  locXY(){
   const x = Math.sqrt(3)*this.q + (Math.sqrt(3) / 2) * this.r
   const y = (3 / 2) * this.r
   var p = new Point(x, y)
   return p
  }
}
