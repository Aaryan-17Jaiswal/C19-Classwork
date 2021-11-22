var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
 
  ghost = createSprite(300,100,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4;



  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {
  background(200);
  //spookySound.loop();
  if(gameState == "play"){
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 10;
    }
  
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 10;
    }
  
    if(keyDown("space")){
      ghost.velocityY = -3;
  }
  ghost.velocityY = ghost.velocityY + 0.8; 


    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end"
  }

    if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0}

    DoorSpawning();
    drawSprites();
  
  }

  if(tower.y > 400){
      tower.y = 300
    }


  if(gameState == "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAMEOVER", 220, 300);
    

  }

}

function DoorSpawning() {

  if(frameCount%240 == 0){
    door = createSprite(200,-50,10,10);
    door.addImage("door", doorImg);
    door.x = Math.round(random(100,400))
    door.velocityY = 1;
    door.lifetime = 600;
    doorsGroup.add(door);
    
  
    climber = createSprite(200,10,10,10)
    climber.addImage("climber", climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 600;
    climbersGroup.add(climber);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
  
    invisibleBlock = createSprite(200,100);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = climber.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 600;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.visible = false;
  
  
  }
}

