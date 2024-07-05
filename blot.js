// Welcome to Blot!
// Check out this guide to learn how to program in Blot
// https://blot.hackclub.com/editor?guide=start

// Set the document dimensions
const width = 250;
const height = 250;
setDocDimensions(width, height);

let finalLines = [];


let seed = Math.random();

function random() {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function drawPetal(x, y, radius, angle) {
  const numPoints = 10;
  const petal = [];
  for (let i = 0; i <= numPoints; i++) {
    const theta = i * Math.PI / numPoints;
    const px = x + radius * Math.cos(theta) * Math.cos(angle) - radius * Math.sin(theta) * Math.sin(angle);
    const py = y + radius * Math.cos(theta) * Math.sin(angle) + radius * Math.sin(theta) * Math.cos(angle);
    petal.push([px, py]);
  }
  for (let i = numPoints; i >= 0; i--) {
    const theta = i * Math.PI / numPoints;
    const px = x - radius * Math.cos(theta) * Math.cos(angle) - radius * Math.sin(theta) * Math.sin(angle);
    const py = y - radius * Math.cos(theta) * Math.sin(angle) + radius * Math.sin(theta) * Math.cos(angle);
    petal.push([px, py]);
  }
  finalLines.push(petal);
}


function drawFlower(x, y, numPetals, petalRadius) {
  const angleStep = 2 * Math.PI / numPetals;
  for (let i = 0; i < numPetals; i++) {
    const angle = i * angleStep;
    const randomizedRadius = petalRadius * (0.75 + random() * 0.5); // Randomize radius
    drawPetal(x, y, randomizedRadius, angle);
  }
}


const numPetals = 8;
const petalRadius = 50;
drawFlower(width / 2, height / 2, numPetals, petalRadius);

const centerRadius = 10;
const centerCircle = [];
for (let i = 0; i < 2 * Math.PI; i += 0.1) {
  centerCircle.push([
    width / 2 + centerRadius * Math.cos(i),
    height / 2 + centerRadius * Math.sin(i)
  ]);
}
finalLines.push(centerCircle);

drawLines(finalLines);
