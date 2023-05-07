class Character {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.brightness = 0;
  }

  setBrightness(b) {
    this.brightness = b;
  }

  draw(ctx, p) {
    const str = " '\"-~+=%#@";
    let squareSize = parseInt((255 - this.brightness) / 25.6); //0~9
    let hexStringR = p[0].toString(16);
    let hexStringG = p[1].toString(16);
    let hexStringB = p[2].toString(16);
    // console.log(hexStringR + hexStringG + hexStringB);
    ctx.fillStyle = `#000`;
    const centerPosX = (this.x * 2 + this.size) / 2;
    const centerPosY = (this.y * 2 + this.size) / 2;
    // ctx.fillText(char, this.x, this.y);
    // ctx.fillRect(this.x, this.y, squareSize, squareSize);

    // Matrix transformation
    ctx.translate(centerPosX, centerPosY);
    ctx.rotate(Math.PI / 4);
    ctx.translate(-centerPosX, -centerPosY);

    // Rotated rectangle
    ctx.fillRect(
      centerPosX - squareSize / 2,
      centerPosY - squareSize / 2,
      squareSize,
      squareSize
    );
    ctx.translate(centerPosX, centerPosY);
    ctx.rotate(-Math.PI / 4);
    ctx.translate(-centerPosX, -centerPosY);
  }
}

export { Character };
