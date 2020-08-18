//Board Class
//stores tiles, settlements, roads, robber etc.
class GameBoard {
	constructor(radius){
		this.radius = radius
		this.canvas = document.getElementById("gameCanvas");
		this.ctx = this.canvas.getContext("2d");
		this.dpr = window.devicePixelRatio || 1;
		this.awaitingPlacement = false;
		this.currentPiece = null;
		this.imgID = ""
		this.init()
		this.placedPieces = []
	}

	init() {
		this.setupCanvas()
		this.generateHexTiles()

		//get cursor location when over canvas.
		// this.canvas.addEventListener("mousemove", (event) => {
		// 	const rect = this.canvas.getBoundingClientRect();
		// 	const p = new Point(event.clientX - rect.left, event.clientY - rect.top)
		// 	console.log("Cursor Coords: (" + p.x + ", " + p.y + ")")
		// })
	}

	setupCanvas(){
		//Make canvas fill container
		const w = document.getElementById('canvasContainer').clientWidth;
		const h = document.getElementById('canvasContainer').clientHeight;
		// this.canvas.width = w;
		this.canvas.style.width = parseInt(w) + "px"
		// this.canvas.height = h;
		this.canvas.style.height = parseInt(h) + "px"

		// Get the size of the canvas in CSS pixels.
		const rect = this.canvas.getBoundingClientRect();
		// Give the canvas pixel dimensions of their CSS
		// size * the device pixel ratio.
		this.canvas.width = rect.width * this.dpr;
		this.canvas.height = rect.height * this.dpr;
		var ctx = this.canvas.getContext('2d');
		// Scale all drawing operations by the dpr, so you
		// don't have to worry about the difference.
		//this.ctx.scale(this.dpr, this.dpr);

		//fill canvas with solid color for background color
		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "#59bfff";
		this.ctx.fill();
	}

	//Creates hexes
	generateHexTiles() {
		this.hexTiles = []

		//resources and ratings arrays
		//values are quantity of items remaining.
		var resources = this._generateResources();
		var ratings = this._generateRatings();

		//Returns random key from object and lowers qty remaining
		var randObjPop = function (obj) {
			var keys = Object.keys(obj);
			var r = keys[ keys.length * Math.random() << 0];
			while(obj[r] === 0){
				r = keys[ keys.length * Math.random() << 0];
			}
			obj[r]--
			return r;
		};

		var range = this.radius;
		for(let q = - this.radius; q <= this.radius; q++) {
			//range increasing
			if (q <= 0) {
				for (let r = this.radius; r >= this.radius - range; r--) {
					const rsrc = resources.pop()
					const rate = getRating(rsrc)
					this.hexTiles.push(new HexTile(q, r, rsrc, rate))
				}
				if (q == 0) {
					range--
				} else {
					range++
				}
			}
			if (q > 0) {
				for (let r = - this.radius; r <= - this.radius + range; r++) {
					const rsrc = resources.pop()
					const rate = getRating(rsrc)
					this.hexTiles.push(new HexTile(q, r, rsrc, rate))
				}
				range--
			}
		}

		function getRating(res) {
			if (res != "desert") {
				return ratings.pop()
			} else {
				return null
			}
		}
	}

	render() {
		const hexSize = this.getHexSize()
		//Loop through hexs and render.  Promise used to ensure hex tiles are drawn
		//first, followed by number tiles on top.
		const hexLength = this.hexTiles.length
		for (var i = 0; i < hexLength; i++) {
			var promise = new Promise((resolve, reject) => {
				this.hexTiles[i].render(this.ctx, hexSize, resolve, i)
			})
			promise.then((val) => {
				this.hexTiles[val].numberTile.render(this.ctx, hexSize)
			})
		}
	}

	getCanvasOrigin(){
		var w = this.canvas.width
		var h = this.canvas.height
		return new Point(w/2, h/2) //divide by 2 because canvas was scaled up x2 for less blur
	}

	getHexSize(){
		var canvasMargin = this.canvas.height * 0.05
		var hexRows = 2 * this.radius + 1
		var boardHeight = this.canvas.height - (2 * canvasMargin)
		//(rows - 0.5)*(3/4*hexHeight)+hexHeight = boardHeight...solve for hexHeight
		var hexHeight = (8 * boardHeight) / (6 * hexRows + 5)
		var hexSize = hexHeight / 2
		return hexSize
	}

	awaitPlacement(imgID){
		//Add imgID variable to canvas
		//becomes accessible in _placePiece through this keyword
		this.canvas.imgID = imgID
		//Add listener to canvas for object placement
		if(this.awaitingPlacement){
			console.log("already awaiting placement...")
			this.canvas.removeEventListener("click", this._placePiece)
			this.canvas.addEventListener("click", this._placePiece)
		} else {
			this.canvas.addEventListener("click", this._placePiece)
			this.awaitingPlacement = true;
		}
	}

	_placePiece(event) {
		const p = gb._getEventLocOnCanvas(event)

		var v = new Vertex(p.x, p.y)
		const img = new Image()
		img.src = "img/structures/" + this.imgID + ".png"
		v.owner = this.imgID.charAt(this.imgID.length - 1)
		v.structureType = this.imgID.substring(0, this.imgID.length - 2)
		v.img = img

		gb.placedPieces.push(v)

		v.render(gb.ctx, gb.getHexSize())

		//keyword "this" is gb.canvas here.
		this.removeEventListener("click", gb._placePiece)
		gb.awaitingPlacement = false;
	}


	_generateResources() {
		var resources = []

		//resource frequency information
		const rObj = {
			grain: 4,
			wood: 4,
			wool: 4,
			ore: 3,
			brick: 3,
			desert: 1
		}

		Object.keys(rObj).forEach(key => {
			for(let i = 0; i < rObj[key]; i++){
				resources.push(key)
			}
		})

		resources.shuffle()

		return resources
	}

	_generateRatings() {
		var ratings = [];

		const rObj = {
			"2": 1,
			"3": 2,
			"4": 2,
			"5": 2,
			"6": 2,
			"8": 2,
			"9": 2,
			"10": 2,
			"11": 2,
			"12": 1
		}

		Object.keys(rObj).forEach(key => {
			for(let i = 0; i < rObj[key]; i++){
				ratings.push(key)
			}
		})

		ratings.shuffle()

		return ratings
	}

	_getEventLocOnCanvas(event){
		const rect = this.canvas.getBoundingClientRect();
		var p = new Point(event.clientX - rect.left, event.clientY - rect.top)

		//Convert clicked coords to q and r coords
		const canvasOrigin = new Point(this.canvas.width / 4, this.canvas.height / 4);
		p.x = p.x - canvasOrigin.x
		p.y = p.y - canvasOrigin.y
		p.scale(2 / this.getHexSize())
		p = this._XYtoQR(p)

		return p
	}

	_XYtoQR(p){
		const r = (2 / 3) * p.y
		const q = (p.x / Math.sqrt(3)) - r / 2
		return new Point(q, r)
	}
}
