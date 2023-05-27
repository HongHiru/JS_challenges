const images = [
  'stars.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
];
let chosenImage = images[Math.floor(Math.random() * images.length)];

var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

function resizeCanvas() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
var stars = [];
for (var i = 0; i < 1000; i++) {
  stars.push({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    z: Math.random() * c.width,
    r: Math.random() * 2 + 1,
  });
}

var img1 = new Image();
img1.src = `images/${chosenImage}`;
var img2 = new Image();
img2.src = `images/${chosenImage}`;

let currentImage = img1;
let nextImage = img2;

// var img = new Image();
// img.src = `images/${chosenImage}`;

function draw() {
  ctx.globalAlpha = 1;
  ctx.drawImage(currentImage, 0, 0, c.width, c.height);
  ctx.globalAlpha = alpha;
  ctx.drawImage(nextImage, 0, 0, c.width, c.height);
  ctx.fillStyle = 'white';
  // ctx.drawImage(img, 0, 0, c.width, c.height);
  // ctx.fillStyle = 'white';
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.z -= 5;
    if (star.z <= 0) {
      star.z = c.width;
      star.x = Math.random() * c.width;
      star.y = Math.random() * c.height;
    }
    star.x = (star.x - c.width / 2) * (c.width / star.z) + c.width / 2;
    star.y = (star.y - c.height / 2) * (c.width / star.z) + c.height / 2;
  }
}
setInterval(draw, 50);

let alpha = 0;
function changeBackgroundImage() {
  chosenImage = images[Math.floor(Math.random() * images.length)];

  if (currentImage === img1) {
    currentImage = img2;
    nextImage = img1;
    nextImage.src = `images/${chosenImage}`;
  } else {
    currentImage = img1;
    nextImage = img2;
    nextImage.src = `images/${chosenImage}`;
  }

  alpha = 0;
}

setInterval(changeBackgroundImage, 10000);

function fadeInOut() {
  alpha += 0.1;
  if (alpha > 1) alpha = 1;
}

setInterval(fadeInOut, 100);
