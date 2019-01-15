var maze = [];
var walls = [];
var w = 40;
var cols;
var rows;
var current;

function setup() {
  var screen_w = 1800;
  var screen_h = 800;
  createCanvas(screen_w, screen_h);
  cols = floor(screen_w / w);
  rows = floor(screen_h / w);
  createEmptyMaze(cols, rows);
  current = maze[floor(random(maze.length))];
  current.wall = false;
  current.addWallsToList();
  current.visited = true;
}

function draw() {
  background(0);
  showMaze();

  var choice = walls[floor(random(walls.length))];
  if (choice != undefined) {
    console.log(choice);
    if(!choice.visited) {
      choice.wall = false;
      choice.visited = true;
      choice.addWallsToList();
    }
    walls.splice()
  }
}

function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.wall = true;
  this.visited = false;

  this.addWallsToList = function() {
    var top = maze[index(this.x, this.y - 1)];
    var right = maze[index(this.x + 1, this.y)];
    var bottom = maze[index(this.x, this.y + 1)];
    var left = maze[index(this.x - 1, this.y)];
    if (top && top.wall) walls.push(top);
    if (right && right.wall) walls.push(right);
    if (bottom && bottom.wall) walls.push(bottom);
    if (left && left.wall) walls.push(left);
  }

  this.show = function() {
    //noStroke();
    stroke(255);
    if (this.wall) {
      fill(0, 0, 0);
    } else {
      fill(255, 255, 255);
    }
    rect(this.x * w, this.y * w, w, w);
  }
}

function createEmptyMaze(cols, rows) {
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var cell = new Cell(x, y);
      maze.push(cell);
    }
  }
}

function index(x, y) {
  if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
    return -1;
  }
  return x + y * rows;
}

function showMaze() {
  for (var i = 0; i < maze.length; i++) {
    maze[i].show();
  }
}

function checkWall(cell, wall) {
  var top = maze[index(cell.x, cell.y - 1)];
  var right = maze[index(cell.x + 1, cell.y)];
  var bottom = maze[index(cell.x, cell.y + 1)];
  var left = maze[index(cell.x - 1, cell.y)];
  var nb = 0;
  var opposite;

  if (top && top == wall) {
    opposite = bottom;
    nb++;
  }
  if (right && right == wall) {
    opposite = left;
    nb++;
  }
  if (bottom && bottom == wall) {
    opposite = top;
    nb++;
  }
  if (left && left == wall) {
    opposite = right;
    nb++;
  }

  if (nb == 1) {
    opposite.wall = false;
    opposite.visited = true;
    return true;
  }
}








// LOL.