
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var background, backgroundImage
function preload(){
  backgroundImage = loadImage("background0.png")
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(400,400)
  monkey = createSprite(80,320,10,10)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1

  
  ground = createSprite(200,320,800,30)
  ground.shapeColor = "black"
  ground.velocityX = -3
  ground.x = ground.width/2
  obstacleGroup = new Group()
  bananaGroup = new Group()

  
}




function draw() {
  if (ground.x<0){
    ground.x = ground.width/2}
 background("white");


  monkey.collide(ground)

 if (keyDown("space")) {
   monkey.velocityY = -12 
 } 
  
  //add gravity
   monkey.velocityY = monkey.velocityY + 0.8
 
  
  spawnObstacles()
  spawnBananas()
    drawSprites()
  text("Score:" + score, 300,50)
  fill("black")
  if (obstacleGroup.isTouching(monkey)){
  monkey.velocityY = 0
  ground.velocityX = 0
  obstacleGroup.setVelocityXEach(0)
  bananaGroup.setVelocityXEach(0)
  obstacleGroup.setLifetimeEach(-1)
  bananaGroup.setLifetimeEach(-1)
   
  }
  if (bananaGroup.isTouching(monkey)) {
  bananaGroup.destroyEach();
    score=score+1;
   
}



  }
function spawnObstacles(){
 if (frameCount % 100 === 0){
    obstacle = createSprite(500,285,10,10)
  obstacle.addImage(obstacleImage)
  obstacle.scale = 0.1
  obstacle.velocityX = -3
  obstacle.lifetime = 200
  obstacleGroup.add(obstacle)
}
}
function spawnBananas(){
   if (frameCount % 100 === 0){
  banana = createSprite(500,100,10,10)
  banana.y = Math.round(random(120,200))
  banana.addImage(bananaImage)
  banana.velocityX = -2
  banana.scale = 0.1
  banana.lifetime = 200
  bananaGroup.add(banana)
}
}