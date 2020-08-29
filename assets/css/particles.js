const particles = [];

function setup() {
  /* createCanvas(window.innerWidth, window.innerHeight); */
  createCanvas(window.innerWidth, 300);
  const particlesLength = Math.floor(window.innerWidth / 30);

  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(65, 74, 79);
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.checkParticles(particles.slice(index));
  });
}

class Particle {
  constructor() {
    //position
    this.pos = createVector(random(width), random(height));
    //velocity
    this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    //size of the particle(circle)
    this.size = 10;
  }
  //update movement by adding velocity
  update() {
    this.pos.add(this.vel);
    this.edges();
  }
  //draw single particle
  draw() {
    noStroke();
    fill('rgba(255,255,255,0.5)');
    circle(this.pos.x, this.pos.y, this.size);
  }
  //Detect edges
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  //Connect particles
  checkParticles(particles) {
    particles.forEach((particle) => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

      if (d < 120) {
        stroke('rgba(255,255,255,0.1)');
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
