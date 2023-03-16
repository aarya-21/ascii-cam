const density = "Ñ@#W$9876543210?!abc;:+=-,._                 ";
//const density = '                  .:░▒▓█.';
//const density = '       .:-i|=+%O#@';

//let cat;
let video;
let asciiDiv;
var button;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(96, 54);
  video.hide();
  asciiDiv= createDiv();
  asciiDiv.id('ascii-div');
}

function screenshot(){
  console.log('I clicked the button');
  let div = document.getElementById('ascii-div');
  html2canvas(div)
    .then(function(canvas) {
      console.log('hello!!!');
      return Canvas2Image.saveAsJPEG(canvas);
    })
}

  function draw(){
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0);
  video.loadPixels();
    let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));

      const c = density.charAt(charIndex)
      if (c == ' ') asciiImage += '&nbsp;'
      else asciiImage += c;
    }
    asciiImage +='</br>'
  }
  asciiDiv.html(asciiImage)
}
