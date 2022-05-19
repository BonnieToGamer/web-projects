const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let snek = {
  position: new Vector2(300, 300),
  size: 5,
  color: {
    head: '#000000',
    body: '#5ed1e6'
  },
  body: [
    new Vector2(295, 300),
    new Vector2(290, 300)
  ],
  direction: new Vector2(5, 0)
};

/**
 * Draw's a pixel to the canvas
 * @param {Vector2} vector Position of pixel
 * @param {Number} size Size of pixel
 * @param {String} color Color of pixel
 */
function drawPixel(vector, size, color) {
  ctx.fillStyle = (color) ? color : '#ffffffff';
  ctx.fillRect(vector.x, vector.y, size, size);
}

const delay = 50;
let currentDelay = delay;

function update(progress) {
  // Update the state of the world for the elapsed time since last render
  if (currentDelay -= progress == 0) {
    currentDelay = delay;

    for (let i = snek.body.length; i > 0; i--) {
      snek.body[i] = (i !== 1) ? snek.body[i - 1] : snek.position;
    }
    snek.position.x += snek.direction.x;
  }
}

function draw() {
  // Draw the state of the world
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawPixel(snek.position, snek.size, snek.color.head);
  snek.body.forEach(bodyPos => {
    drawPixel(bodyPos, snek.size, snek.color.body);
  });
}

function loop(timestamp) {
  let progress = timestamp - lastRender

  update(progress)
  draw()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
let lastRender = 0
window.requestAnimationFrame(loop)
