class Game {
  constructor({ canvas, ctx }) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.board = [];

    this.size = 4;

    this.images = ["assets/image3.jpg"];

    this.loadedImages = [];

    this.mouse = { x: 0, y: 0 };
    this.current = null;

    // this.image = new Image();
    // this.image.src = "assets/image.jpg";
    // this.image.onload = this.init.bind(this);
  }
  async init() {
    await this.loadImages();

    this.generateBoard();

    this.listener();

    this.update();
  }
  listener() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.current = this.getPiece(e);
      this.current.lastPos = { x: this.current.x, y: this.current.y };

      const index = this.board.indexOf(this.current);
      if (index > -1) {
        this.board.splice(index, 1);
        this.board.push(this.current);
      }

      this.mouse.x = e.offsetX - this.current.x;
      this.mouse.y = e.offsetY - this.current.y;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.current) return;

      this.current.x = e.offsetX - this.mouse.x;
      this.current.y = e.offsetY - this.mouse.y;

      this.clearHover();
      const hoveredPiece = this.getPiece(e);
      hoveredPiece.isHover = true;
    });

    this.canvas.addEventListener("mouseup", (e) => {
      const nextPiece = this.getPiece(e);

      const { x: tempX, y: tempY } = this.current.lastPos;

      this.current.x = nextPiece.x;
      this.current.y = nextPiece.y;

      nextPiece.x = tempX;
      nextPiece.y = tempY;

      this.current = null;

      this.clearHover();
    });
  }
  getPiece({ offsetY, offsetX }) {
    for (let i = 0; i < this.board.length; i++)
      if (Utility.inRect({ x: offsetX, y: offsetY }, this.board[i]))
        return this.board[i];

    return null;
    // const y = Math.floor(offsetY / (this.canvas.height / this.size));
    // const x = Math.floor(offsetX / (this.canvas.width / this.size));

    // return this.board.find((piece) => piece.id === `${y}|${x}`);
  }
  generateBoard() {
    const randomPosition = Utility.generateRandomPos(this.size * this.size);

    this.board = Array(this.size * this.size)
      .fill()
      .map((_, index) => {
        const width = this.canvas.width / this.size;
        const height = this.canvas.height / this.size;

        return new Piece({
          ctx: this.ctx,
          width,
          height,
          id: `${~~(index / this.size)}|${index % this.size}`,
          x: (index % this.size) * width,
          y: ~~(index / this.size) * height,
          rotate: Utility.random(0, 3),
          image: this.loadedImages[0],
          mask: {
            x: randomPosition[index].x * width,
            y: randomPosition[index].y * height,
          },
        });
      });
  }
  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.board.forEach((board) => board.draw());

    requestAnimationFrame(this.update.bind(this));
  }
  async loadImages() {
    const images = this.images.map(this.loadImage);
    this.loadedImages = await Promise.all(images);

    this.resizeCanvas();
  }
  loadImage(imageUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => resolve(image);
      image.onerror = () => reject();
    });
  }
  resizeCanvas() {
    const [{ width, height }] = this.loadedImages;

    this.canvas.width = width;
    this.canvas.height = height;
  }
  clearHover() {
    this.board.forEach((piece) => (piece.isHover = false));
  }
}
