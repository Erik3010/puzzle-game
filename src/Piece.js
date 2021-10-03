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

    this.isHover = false;
  }
  draw() {
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

    if (!this.isMatched()) this.drawStroke();

    if (this.isHover) this.drawHover();
  }
  drawHover() {
    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.globalAlpha = "0.6";
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "rgb(19, 24, 83)";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.restore();
  }
  drawStroke() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();
    this.ctx.closePath();
  }
  isMatched() {
    return this.x === this.mask.x && this.y === this.mask.y;
  }
}
