//Name Spaces
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//Variables
var helicopterIMG, helicopterSprite, packageSprite, packageIMG;
var packageBody,ground;
var box1sprite, box1body, box2sprite, box2body, box3sprite, box3body;

function preload()
{
	//load Images
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	//Package Box
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.19;

	//Helicopter Sprite
	helicopterSprite=createSprite(100, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;

	//ground sprite
	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor = "green";

	//BOXES
	box1sprite= createSprite(370, 625, 10, 70);
	box1sprite.shapeColor = "red";
	box2sprite= createSprite(470, 625, 10, 70);
	box2sprite.shapeColor = "red";
	box3sprite= createSprite(420, 655, 100, 10);
	box3sprite.shapeColor = "red";

	//create Engine and add to World
	engine = Engine.create();
	world = engine.world;

	//create and add package to the WORLD
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);

	//create and add ground to the WORLD
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	World.add(world, ground);

	//create and add Boxes to the WORLD
	box1body = Bodies.rectangle(350, 625, 10, 70);
	box2body = Bodies.rectangle(450, 625, 10, 70);
	box3body = Bodies.rectangle(400, 655, 100, 10);

	//run the engine
	Engine.run(engine);
  
}

function draw() {
 	background(0);
  	rectMode(CENTER);

 	//position of package 
  	packageSprite.y = packageBody.position.y; 

  	//to move the package along with the helicopter
 	if(packageSprite.y<=200){
  	packageSprite.x = helicopterSprite.position.x; 
  	} 	

  	//fix proper positions of sprites
    box1sprite.x = box1body.position.x;
    box1sprite.y = box1body.position.y;

	box2sprite.x = box2body.position.x;
	box2sprite.y = box2body.position.y;
	
	box3sprite.x = box3body.position.x;
	box3sprite.y = box3body.position.y;

	//collision
	packageSprite.collide (groundSprite);
	packageSprite.collide (box1sprite);
	packageSprite.collide (box2sprite);

	//Task completed
	if(packageSprite.collide(box3sprite)){
		fill("white");
		textSize(25);
		textFont("BROADWAY");
		text("YOU DID IT !!", 330, 400);
	}
	//Task failed
  	if(packageSprite.collide(groundSprite)){
		fill("white"); 
		textSize(25);
		textFont("BROADWAY");
		text("YOU FAILED !!", 340, 400);
  	}
	//display output
  	drawSprites();
}

//function for KEY PRESSED
function keyPressed() {
	//DOWN ARROW key makes the package fall to the ground
 if (keyCode === DOWN_ARROW) {
    Matter.Body.setStatic(packageBody, false);
  }
  //movement of the helicopter using RIGHT and LEFT ARROW keys
  if (keyCode === RIGHT_ARROW) {
	helicopterSprite.x += 10;
  }
  if (keyCode === LEFT_ARROW) {
	helicopterSprite.x -= 10;
  }
}
/*
#DhRiTiD
#DD
*/