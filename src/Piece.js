class Piece {
  constructor({ ctx, x, y, width, height, image, rotate, mask }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.image = image;

    this.rotate = rotate;

    this.mask = mask;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.drawImage(
      this.image,
      this.mask.x,
      this.mask.y,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
