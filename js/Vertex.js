class Vertex {
  constructor(q, r){
    this.q = q;  //rotated 60deg axis
    this.r = r;  //vertical axis
    this.owner = null;
    this.structureType = null; //Options of null, settlement or city
  }

  render(ctx, size){
    if(this.structureType != null){
      //render structure of apropriate color
      const img = new Image();
      img.src = "img/structures/" + this.structureType + "_" + this.owner + ".png"

      //scale img to match resource aspect ratio
      const h = 0.25 * size;
      var w
      if(this.structureType == "settlement"){
        w = 1.5 * h;
      } else {
        w = 2 * h;
      }

      img.onload = function() {
        ctx.drawImage(img, 750, 750, w, h)
      }
    } else {
      console.log("No structure on vertex. Nothing to render!")
    }
  }

  highlight(){

  }

}
