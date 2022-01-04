const canvas = document.getElementById("canvas1");
const btnRestart = document.getElementById("btn-restart");
const ctx = canvas.getContext("2d"); // allow use of canvas methods
canvas.width = 600;
canvas.height = 400;

// GLOBAL VARIABLES

let spacePressed = false;
let angle = 0; // make bird move while idle
let hue = 0; // cycle through red, green and blue color spectrum
let frame = 0;
let score = 0;
let gamespeed = 1; // parallax effect

const gradient = ctx.createLinearGradient(0, 0, 7, 50);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.9", "#fff");

const background = new Image();
background.src = "landscape.png";
const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function handleBackground() {
  if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
  // background scrolled all the way to left then move it righ
  else BG.x1 -= gamespeed;
  if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
  else BG.x2 -= gamespeed;
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear entire canvas between every frame of animation
  //ctx.fillRect(10, canvas.height - 90, 50, 50); // create player as a rectangle
  handleBackground();
  handleObstacles();
  handleParticles();
  bird.update();
  bird.draw();
  ctx.fillStyle = "black";
  ctx.font = "90px Monospace";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);
  handleCollisions();
  if (handleCollisions()) return;
  requestAnimationFrame(animate); // create animation loop
  angle += 0.1;
  hue += 1;
  frame++;
}

animate();

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") spacePressed = true;
});
window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePressed = false;
  bird.frameX = 0;
});

const bang = new Image();
bang.src = "bang.png  ";

function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      ctx.drawImage(bang, bird.x - 20, bird.y - 20, 80, 80);
      ctx.font = "30px Monospace";
      ctx.fillStyle = "black";
      ctx.fillText(
        "Game Over, your score is " + score,
        90,
        canvas.height / 2 - 10
      );
      btnRestart.classList.add("show-restart");
      return true;
    }
  }
}
