var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var bullet, bulletImg;
var bulletGroup, zombieGroup;
var score = 0;
var lives = 5;
var gamestate ="play";
var bullets = 100;
var heart1,heart2,heart3;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")
  bulletImg = loadImage("assets/bullet.png");


  bgImg = loadImage("assets/bg.jpeg");

  heart1 = loadImage("assets/heart_1.png");
  heart2 = loadImage("assets/heart_2.png");
  heart3 = loadImage("assets/heart_3.png");
  bulletGroup = new Group();
  zombieGroup = new Group();
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4;
  
   player.setCollider("rectangle",0,0,300,300);
   player.debug = false;

}

function draw() {
  background(0);
  
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
    bullet = createSprite(displayWidth-1150,player.y-30,20,10)
    bullet.addImage(bulletImg);
    bullet.scale = 0.2
    bullet.velocityX = 20
    bulletGroup.add(bullet)
    bullet.debug = false;
    bullet.setCollider("rectangle", 0,0,50,120)
    player.addImage(shooter_shooting);
    bullets-=1;
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      score+=5;
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
    }
  }
}
if(zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      lives-=1;

      zombieGroup[i].destroy();
      
    }
  }
}
if(bullets===0){
  gamestate="bulletfinish"
}
if(score>=100){
 gamestate="won";
}
if(lives<=0){
 gamestate="lose";
}
if(keyDown("UP_ARROW")){
  player.y=player.y-30;
}
if(keyDown("DOWN_ARROW")){
  player.y=player.y+30;
}
if(keyDown("RIGHT_ARROW")){
  player.x=player.x+30;
}
if(keyDown("LEFT_ARROW")){
  player.x=player.x-30;
}

//calling the function to spawn zombies
enemy();

drawSprites();
textSize(20);
  fill("yellow"); 
  text("Score: "+score,windowWidth-200,50); 
  text("Lives: "+lives,windowWidth-200,80);

}



//creating function to spawn zombies
function enemy(){
  if(frameCount%100===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(200,600),40,40) 

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombieGroup.add(zombie);
    zombie.debug = false;
    zombie.setCollider("rectangle",0,0,400,700)
   
    zombie.lifetime = 400
   
  }

}
