class NumberTile extends GamePiece{
	constructor(q, r, val){
		if(val != null){	//Checking for null value due to desert.
			var img = new Image();
	    img.src = "img/numTiles/" + val + ".png"
		} else {
			img = null
		}

		super(q, r, img)

		this.val = val;

		//set color
		if(val == 6 || val == 8){
			this.color = "#ED2E07"
		} else if (val == null){
			this.color = null
		} else {
			this.color = "#000000"
		}

		//set frequency rating
		if(val == 2 || val == 12){
			this.rating = 1
		} else if (val == 3 || val == 11) {
			this.rating = 2
		} else if (val == 4 || val == 10) {
			this.rating = 3
		} else if (val == 5 || val == 9) {
			this.rating = 4
		} else if (val == 6 || val == 8) {
			this.rating = 5
		} else {
			this.rating = null
		}

	}

	imgDims(scale) {
		const h = 0.4 * scale //height is percent of hex radius
		const dims = new Point(h, h)
		return dims
	}

	imgAnchorPoint(scale){
		const dims = this.imgDims(scale)
		const p = new Point(- 0.3 * scale, dims.y / 2) //draw to right of hexTile center
		return p
	}

	// render(ctx, xyLoc, size) {
	// 	if(this.val != null){
  //     const img = new Image();
  //     img.src = "img/numTiles/" + this.val + ".png"
  //     const h = 0.4 * size; //height of number tile.
  //     img.onload = function () {
  //       ctx.drawImage(img, xyLoc.x + 0.3 * size, xyLoc.y - h / 2, h, h)
  //     }
  //   }
	// }
}
