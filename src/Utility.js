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

    // result.forEach((_, index) => {
    //   const randomIndex = Utility.random(0, length - 1);

    //   [result[index], result[randomIndex]] = [
    //     result[randomIndex],
    //     result[index],
    //   ];
    // });

    // return result;
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
}
