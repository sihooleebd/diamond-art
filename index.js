import { Character } from "./Character.js";

document.addEventListener("DOMContentLoaded", () => {
  new App();
});

class App {
  constructor() {
    // 서클 준비
    const margin = 15; // 글자 오른쪽, 아래 여백
    const size = 1; // 글자의 가로 크기
    const boxW = size + margin;

    var imgElem = document.querySelector("#image");

    this.chars = [];
    console.log(boxW);

    // 비디오 캡쳐 시작
    var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          // function 의 this와 화살표 함수의 this 가 다름
          video.srcObject = stream;

          video.addEventListener("loadedmetadata", () => {
            for (let y = 0; y < video.videoHeight - boxW; y += boxW) {
              for (let x = 0; x < video.videoWidth - boxW; x += boxW) {
                console.log("a x=" + x + " y=" + y);
                let character = new Character(x, y, size * 0.1);
                this.chars.push(character);

                let character2 = new Character(
                  x + boxW / 2,
                  y + boxW / 2,
                  size * 1.5
                );
                this.chars.push(character2);
              }
            }
          });
        })
        .catch(function (error) {
          console.log("Something went wrong!");
          console.log(error);
          return;
        });
    }

    document
      .querySelector("#start")
      .addEventListener("click", this.startCapture.bind(this), false);
  }

  startCapture() {
    window.requestAnimationFrame(this.captureFrame.bind(this));
  }

  captureFrame(t) {
    window.requestAnimationFrame(this.captureFrame.bind(this));

    var canvas = document.querySelector("#image");
    var video = document.querySelector("#videoElement");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    console.log("canvas w =" + canvas.width + " h=" + canvas.height);

    let ctx = canvas.getContext("2d");
    ctx.translate(video.videoWidth, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // var canvas2 = document.querySelector("#grayImage");
    // let ctx2 = canvas2.getContext("2d");
    // let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    // let pixels = imgData.data;
    // canvas2.width = video.videoWidth;
    // canvas2.height = video.videoHeight;

    // for (var i = 0; i < pixels.length; i += 4) {
    //   let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    //   pixels[i] = lightness;
    //   pixels[i + 1] = lightness;
    //   pixels[i + 2] = lightness;
    // }
    // ctx2.putImageData(imgData, 0, 0);
    // ctx2.drawImage(canvas2, 0, 0, video.videoWidth, video.videoHeight);

    var canvas3 = document.querySelector("#diamondImage");
    let ctx3 = canvas3.getContext("2d");
    canvas3.width = video.videoWidth;
    canvas3.height = video.videoHeight;
    ctx3.beginPath();
    ctx3.fillStyle = "#fafafa";
    ctx3.fillRect(0, 0, canvas3.width, canvas3.height);

    this.chars.forEach((c) => {
      var x = c.x;
      var y = c.y;
      var p = ctx.getImageData(x, y, 1, 1).data;
      c.setBrightness(p[0]);
      c.draw(ctx3, p);
    });
  }
}
