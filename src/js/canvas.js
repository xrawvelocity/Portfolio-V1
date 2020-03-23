
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const wave = {
  y: canvas.height /2,
  length: 0.01,
  amplitude: 75,
  frequency: 0.012
};

const strokeColor = {
  h: 0,
  s: 100,
  l: 50
};

const bgColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.02
};


let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos) {
  strokeColor.h = Math.floor(scroll_pos / (document.body.offsetHeight - 700) * 255)
  
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});

window.addEventListener('resize', animate(),false)



let increment = wave.frequency;
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(${bgColor.r},${bgColor.g},${bgColor.b},${bgColor.a})`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.beginPath();
  c.moveTo(0,canvas.height /2);

  for(let i = 0; i < canvas.width; i++){
    c.lineTo(i, wave.y + Math.cos(i * wave.length + increment) * wave.amplitude * Math.cos(increment));
  }
  c.strokeStyle = `hsl(${Math.abs(strokeColor.h)}, ${strokeColor.s}%, ${strokeColor.l}%)`;
  c.stroke();
  
  increment += wave.frequency;
  
}

animate();