class Piece {
  constructor({ ctx, id, x, y, width, height, image, rotate, mask }) {
    this.ctx = ctx;

    this.id = id;

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

    if (this.isHover) this.hover();
  }
  hover() {
    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.globalAlpha = "0.6";
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#fff";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.restore();
  }
}
