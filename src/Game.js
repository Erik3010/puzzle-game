class Game {
  constructor({ canvas, ctx }) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.board = [];

    this.size = 4;

    this.images = ["assets/image3.jpg"];

    this.loadedImages = [];

    // this.image = new Image();
    // this.image.src = "assets/image.jpg";
    // this.image.onload = this.init.bind(this);
  }
  async init() {
    await this.loadImages();

    this.generateBoard();

    this.update();
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

    console.log(this.board);
  }
  update() {
    this.board.forEach((board) => board.draw());
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
}
