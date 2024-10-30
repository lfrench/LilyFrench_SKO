let pics = [];
let positions = [];
let speeds = [];
let minDistance = 150; // Minimum distance between images
let jpgFiles = ["data/NP1.jpg", "data/NP2.jpg", "data/NP3.jpg", "data/NP4.jpg", "data/NP5.jpg", "data/NP6.jpg"];

function preload() {
  pics.push(loadImage("data/B1.png"));
  pics.push(loadImage("data/B2.png"));
  pics.push(loadImage("data/B3.png"));
  pics.push(loadImage("data/B4.png"));
  pics.push(loadImage("data/B5.png"));
  pics.push(loadImage("data/B6.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);


  for (let i = 0; i < pics.length; i++) {
    let position;
    let isValidPosition;

    // Keep generating a new position until it's far enough from other images
    do {
      isValidPosition = true;
      position = {
        x: random(width - pics[i].width),
        y: random(height - pics[i].height)
      };
      for (let j = 0; j < positions.length; j++) {
        let d = dist(position.x, position.y, positions[j].x, positions[j].y);
        if (d < minDistance) {
          isValidPosition = false;
          break;
        }
      }
    } while (!isValidPosition);

    positions.push(position);
    speeds.push({
      xSpeed: random(-5, 5),
      ySpeed: random(-5, 5)
    });
  }
}

function draw() {
  background(255, 0, 0); // Redraw background to clear previous frame

  // Draw the word "SKO" in white
  textSize(650);
  fill(255);
  text("SKO", 20, 650);

  for (let i = 0; i < pics.length; i++) {
    image(pics[i], positions[i].x, positions[i].y);
    positions[i].x += speeds[i].xSpeed;
    positions[i].y += speeds[i].ySpeed;

    // Bounce off the edges
    if (positions[i].x < 0) {
      positions[i].x = 0;
      speeds[i].xSpeed *= -1;
    }
    if (positions[i].x > width - pics[i].width) {
      positions[i].x = width - pics[i].width;
      speeds[i].xSpeed *= -1;
    }
    if (positions[i].y < 0) {
      positions[i].y = 0;
      speeds[i].ySpeed *= -1;
    }
    if (positions[i].y > height - pics[i].height) {
      positions[i].y = height - pics[i].height;
      speeds[i].ySpeed *= -1;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < pics.length; i++) {
    if (mouseX > positions[i].x && mouseX < positions[i].x + pics[i].width && mouseY > positions[i].y && mouseY < positions[i].y + pics[i].height) {
      let jpgPath = jpgFiles[i];
      window.open(jpgPath, '_blank'); // Open the new image in a new tab
      break;
    }
  }
}
