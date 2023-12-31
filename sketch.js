let nParticles = 100;
let particles = [];
let particleSize = 100;
let maxCounter = 150;
let lines = [];

function checkCollisions() {
  lines = [];
  for (let i = 0; i < nParticles; i++) {
    for (var j = 0; j < nParticles; j++) {
      if (i != j) {
        let distance = p5.Vector.dist(
          particles[i].position,
          particles[j].position
        );
        if (distance < particleSize) {
          if (particles[i].counter === 0) {
            particles[i].direction.rotate(Math.random());
            particles[i].counter = maxCounter;
          }
          if (particles[j].counter === 0)
            particles[j].direction.rotate(Math.random());
          particles[j].counter = maxCounter;
        }
        lines.push([particles[i].position, particles[j].position, distance]);
      }
    }
  }
}

function createParticle() {
  let particle = {};
  particle.position = createVector(random(width), random(height));
  particle.direction = createVector(Math.random(), Math.random());
  particle.update = function () {
    this.position.add(this.direction);
    if (this.position.x > width || this.position.x < 0)
      this.position.x = random(width); // Regenerate x position
    if (this.position.y > height || this.position.y < 0)
      this.position.y = random(height); // Regenerate y position
    if (this.counter > 0) this.counter -= 1;
  };
  particle.counter = 0;
  return particle;
}

function setup() {
  createCanvas(600, 600);

  stroke(0, 80);
  fill(0, 90);
  for (let i = 0; i < nParticles; i++) particles.push(createParticle());
}

function draw() {
  background(0);
  checkCollisions();
  for (let i = 0; i < nParticles; i++) {
    particles[i].update();
    // ellipse(particles[i].position.x, particles[i].position.y, 10);
  }
  for (let i = 0; i < lines.length; i++) {
    let color = map(lines[i][2], 0, particleSize, 0, 255);
    stroke(244, 124, 36, 7);
    line(lines[i][0].x, lines[i][0].y, lines[i][1].x, lines[i][1].y);
  }
}
