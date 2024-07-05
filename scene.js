const width = 125;
const height = 125;

setDocDimensions(width, height);

function generateRandomSeed() {
  return Math.floor(Math.random() * 10000);
}

// Set the random seed
const seed = generateRandomSeed();
bt.setRandSeed(seed); //Set Random Seed


function drawTree(x, y, height) {
  const treeLines = [];
  

  const trunkWidth = height / 20;
  treeLines.push([
    [x, y],
    [x, y + height / 5],
    [x + trunkWidth, y + height / 5],
    [x + trunkWidth, y],
    [x, y]
  ]);
  

  const leavesWidth = height / 5;
  treeLines.push([
    [x - leavesWidth / 2, y + height / 5],
    [x + trunkWidth + leavesWidth / 2, y + height / 5],
    [x + trunkWidth / 2, y + height / 5 + height / 2],
    [x - leavesWidth / 2, y + height / 5]
  ]);
  
  return treeLines;
}


function drawHouse(x, y, width, height) {
  const houseLines = [];
  

  houseLines.push([
    [x, y],
    [x, y + height],
    [x + width, y + height],
    [x + width, y],
    [x, y]
  ]);
  

  houseLines.push([
    [x, y + height],
    [x + width / 2, y + height + width / 2],
    [x + width, y + height],
    [x, y + height]
  ]);
  
  return houseLines;
}


