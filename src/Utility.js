class Utility {
  static random(min, max) {
    return ~~(Math.random() * (max - min + 1) + min);
  }
  static generateRandomPos(length) {
    const result = [...Array(length).keys()].map((item) => ({
      x: item % 4,
      y: ~~(item / 4),
    }));

    return Utility.shuffle(result);
  }
  static shuffle(array) {
    const result = JSON.parse(JSON.stringify(array));

    result.forEach((_, index) => {
      const randomIndex = Utility.random(0, array.length - 1);
      [result[index], result[randomIndex]] = [
        result[randomIndex],
        result[index],
      ];
    });

    return result;
  }
  static inRect(position, piece) {
    return (
      position.x > piece.x &&
      position.x < piece.x + piece.width &&
      position.y > piece.y &&
      position.y < piece.y + piece.height
    );
  }
}
