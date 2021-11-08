var tower, towerImg;
var door, doorImg, doorsGroup
var climber, climberImg, climbersGroup;
var ghost, ghostImg, ghostImg2;
var invisibleblock, invisibleblockGroup;
var gameState = "play";
var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600)
  
 tower = createSprite(300,600);
 tower.addImage("tower", towerImg);
 tower.velocityY = 1
  
  ghost = createSprite(200, 200, 50, 50)
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleblockGroup = new Group();
  
  
  
  spookySound.loop();
  
  
  
}
function draw(){
background("black");
 
 if(gameState === "play"){
   
 
  
 if(tower.y>500){
   tower.y = 300
 } 
  
  
 if(keyDown("space")){
   ghost.velocityY = -2
   
 }
   
 if(keyDown("right_arrow")){
   ghost.x = ghost.x +3;
 }
  
   if(keyDown("left_arrow")){
   ghost.x = ghost.x -3;
 }
   if(invisibleblockGroup.isTouching(ghost) || ghost.y > 600){
     ghost.destroy();
    gameState =  "end";
   }
  
    ghost.velocityY = ghost.velocityY+0.8;
  
   if(climbersGroup.isTouching(ghost)){
     ghost.velocityY = 0;
   }
  
 spawnDoors();
drawSprites()  
   
}
  if(gameState === "end"){
    stroke("red");
    fill("red")
    textSize(50);
    text("Game Over",190, 250);
  }
     }
function spawnDoors(){
if(frameCount % 240 === 0){
  var door = createSprite(200, -50);
  var climber = createSprite(200, 10);
  invisibleblock = createSprite(200,15);
  invisibleblock.width = climber.width;
  invisibleblock.height = 2;
  invisibleblock.x = door.x
  invisibleblock.debug = false;
  invisibleblock.velocityY = 1;
  door.x = Math.round(random(120, 400));
  climber.x = door.x;
  door.addImage("door", doorImg);
  climber.addImage(climberImg);
  climber.velocityY = 1;
  door.velocityY = 1;
  
  
  // le damos profundidad al ghost
  ghost.depth = door.depth;
  ghost.depth = ghost.depth+1;
  
  doorsGroup.add(door);
  door.lifetime = 800
  climbersGroup.add(climber);
  climber.lifetime = 800
  invisibleblockGroup.add(invisibleblock);
   invisibleblock.lifetime = 800;
}
  
}
