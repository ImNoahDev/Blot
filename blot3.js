// Welcome to Blot!
// Check out this guide to learn how to program in Blot
// https://blot.hackclub.com/editor?guide=start

// Set the document dimensions
const width = 500;
const height = 500;
let angleStep = 120
setDocDimensions(width, height);

// Initialize the final lines array
let finalLines = [];

// Generate a random seed
let seed = Math.random();

// Function to generate a random number based on seed
function random() {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Define function to draw a petal with zigzag lines
function drawZigzagPetal(x, y, radius, angle, density) {
  const zigzagLines = [];
  const zigzagHeight = radius * 2;
  const numZigzags = Math.floor(zigzagHeight / density);

  for (let i = 0; i <= numZigzags; i++) {
    const zigzagLine = [];
    const yOffset = i * density - radius;
    const xStart = x - radius;
    const xEnd = x + radius;

    zigzagLine.push([
      xStart * Math.cos(angle) - (y + yOffset) * Math.sin(angle),
      xStart * Math.sin(angle) + (y + yOffset) * Math.cos(angle)
    ]);

    for (let j = 0; j < density; j++) {
      const xZigzag = xStart + (j / density) * (xEnd - xStart);
      const yZigzag = yOffset + ((j % 2 === 0) ? density : -density) / 2;

      zigzagLine.push([
        xZigzag * Math.cos(angle) - (y + yZigzag) * Math.sin(angle),
        xZigzag * Math.sin(angle) + (y + yZigzag) * Math.cos(angle)
      ]);
    }

    zigzagLine.push([
      xEnd * Math.cos(angle) - (y + yOffset) * Math.sin(angle),
      xEnd * Math.sin(angle) + (y + yOffset) * Math.cos(angle)
    ]);

    zigzagLines.push(zigzagLine);
  }

  finalLines.push(...zigzagLines);
}

// Define function to draw the flower
function drawFlower(x, y, numPetals, petalRadius) {
  const angleStep = 2 * Math.PI / numPetals;
  for (let i = 0; i < numPetals; i++) {
    const angle = i * angleStep;
    const randomizedDensity = 5 + random() * 10; // Randomize density
    drawZigzagPetal(x, y, petalRadius, angle, randomizedDensity);
  }
}

// Draw the flower
const numPetals = 8;
const petalRadius = Math.min(width, height) / 3;
drawFlower(width / 2, height / 2, numPetals, petalRadius);

// Encode text in "petal" object using densities
const encodedText = "HELLO";
const textPetal = {
  densities: [],
  text: encodedText
};

for (let i = 0; i < encodedText.length; i++) {
  textPetal.densities.push(5 + random() * 10); // Randomize densities for each character
}

// Draw the encoded text on the build plate
const textWidth = encodedText.length * 20;
const textHeight = 40;
const textX = (width - textWidth) / 2;
const textY = height - 50;

for (let i = 0; i < encodedText.length; i++) {
  const angle = i * angleStep;
  drawZigzagPetal(textX + i * 20 + 10, textY, 10, angle, textPetal.densities[i]);
}

// Draw a center circle
const centerRadius = 10;
const centerCircle = [];
for (let i = 0; i < 2 * Math.PI; i += 0.1) {
  centerCircle.push([
    width / 2 + centerRadius * Math.cos(i),
    height / 2 + centerRadius * Math.sin(i)
  ]);
}
finalLines.push(centerCircle);

// Draw the final lines
drawLines(finalLines);
