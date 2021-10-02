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
    // TODO: Mouse event listener
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));

    this.canvas.addEventListener("touchstart", (e) => {
      const { left, top } = this.canvas.getBoundingClientRect();
      const [{ pageX, pageY }] = e.touches;

      this.onMouseDown({ offsetX: pageX - left, offsetY: pageY - top });
    });
    this.canvas.addEventListener("touchmove", (e) => {
      const { left, top } = this.canvas.getBoundingClientRect();
      const [{ pageX, pageY }] = e.touches;

      this.onMouseMove({ offsetX: pageX - left, offsetY: pageY - top });
    });
    this.canvas.addEventListener("touchend", (e) => {
      const { left, top } = this.canvas.getBoundingClientRect();
      const [{ pageX, pageY }] = e.changedTouches;

      this.onMouseUp({ offsetX: pageX - left, offsetY: pageY - top });
    });
  }
  onMouseDown(e) {
    this.current = this.getPiece(e);
    this.current.lastPos = { x: this.current.x, y: this.current.y };

    const index = this.board.indexOf(this.current);
    if (index > -1) {
      this.board.splice(index, 1);
      this.board.push(this.current);
    }

    this.mouse.x = e.offsetX - this.current.x;
    this.mouse.y = e.offsetY - this.current.y;
  }
  onMouseMove(e) {
    this.clearHover();
    const hoveredPiece = this.getPiece(e);
    if (hoveredPiece) {
      if (hoveredPiece !== this.current) hoveredPiece.isHover = true;
      document.body.style.cursor = this.current ? "grabbing" : "grab";
    } else {
      document.body.style.cursor = "default";
    }

    if (!this.current) return;

    this.current.x = e.offsetX - this.mouse.x;
    this.current.y = e.offsetY - this.mouse.y;
  }
  onMouseUp(e) {
    if (!this.current.lastPos) return;

    const nextPiece = this.getPiece(e);

    const { x: tempX, y: tempY } = this.current.lastPos;

    this.current.x = nextPiece.x;
    this.current.y = nextPiece.y;

    nextPiece.x = tempX;
    nextPiece.y = tempY;

    this.current = null;

    this.clearHover();
  }
  getPiece({ offsetY, offsetX }) {
    for (let i = 0; i < this.board.length; i++)
      if (Utility.inRect({ x: offsetX, y: offsetY }, this.board[i]))
        return this.board[i];

    return null;
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

    this.board.forEach((piece) => {
      if (piece.x === piece.mask.x && piece.y === piece.mask.y)
        piece.isMatched = true;
      else piece.isMatched = false;

      piece.draw();
    });

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
