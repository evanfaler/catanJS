class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
  	return "(" + this.x + ", " + this.y + ")"
  }

  scale(s) {
  	this.x = this.x * s
  	this.y = this.y * s
  }

}