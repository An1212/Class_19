var tower, towerImg;
var door, doorImg, doorGrp;
var climber, climberImg, climbergrp;
var ghost, ghostImg;
var invisibleBlock, invisibleBlockGrp;
 var gameState= "play";
var spookySound;

function preload(){
 towerImg= loadImage("tower.png");
  doorImg= loadImage("door.png");
  climberImg= loadImage("climber.png");
 ghostImg= loadImage("ghost-standing.png");
  spookySound= loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600)
  tower= createSprite(300,300,10,10);
  tower.addImage(towerImg);
  tower.velocityY= 1;
  
  ghost= createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale= 0.3;
  
   doorGrp= new Group();
  climbergrp= new Group();
  invisibleBlockGrp= new Group();
  
  spookySound.loop();
}

function draw(){
  background(0)
  if(gameState=== "play"){
  if(tower.y>400){
    tower.y= 300;
  }
  
  if(keyDown(RIGHT_ARROW)){
    ghost.x= ghost.x+3;
  }
  
  
  if(keyDown(LEFT_ARROW)){
    ghost.x= ghost.x-3;
  }
  
  
  if(keyDown("space")){
    ghost.velocityY= -5;
  }
  ghost.velocityY= ghost.velocityY+0.8;
  
  spawnDoors();
  
  if(climbergrp.isTouching(ghost)){
   ghost.velocityY= 0; 
  }
    if(ghost.isTouching(invisibleBlockGrp)|| ghost.y>600){

      gameState= "end";
      ghost.destroy();
    }
  drawSprites();
  }
  if(gameState=== "end"){
    stroke("red")
    fill("yellow")
    textSize(30)
    text("GAME OVER", 230,250);
  }
}

function spawnDoors(){
  
  if(frameCount % 240===0){
    door= createSprite(200,50,10,10);
    door.addImage(doorImg);
    door.x= Math.round(random(120,400));
    door.velocityY= 1;
    doorGrp.add(door);
    door.lifetime= 800;
    
    climber= createSprite(200,100,10,10);
    climber.addImage(climberImg);
    climber.x= door.x;
    climber.velocityY= 1;
    climber.lifetime= 800;
    climbergrp.add(climber);
    
    ghost.depth= door.depth;
    ghost.depth+=1;
    
    invisibleBlock= createSprite(200,115,10,10)
    invisibleBlock.width= climber.width;
    invisibleBlock.height= 2;
    invisibleBlock.x= door.x;
    invisibleBlock.velocityY= 1;
    invisibleBlock.debug= true;
    invisibleBlockGrp.add(invisibleBlock);
  }
  
}