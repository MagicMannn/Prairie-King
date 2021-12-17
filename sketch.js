var playerSpawned = false;
var player;
var bulletL;
var bulletR;
var bulletU;
var bulletD;
var spd = 4;
var borderDrawn = false;
var bulletSpd = 7;
var countE = 30;
var eSpawns = 0;
var enemy;
var enemy2;
var enemy3;
var spawnRate = 100;
var direction;
var lives = 3;
var level = 0;
var gOver = false;
var enemies;
var onMenu = true;
var pickUpS = false;
var fireRate = 30;
var shotsFired = 0;
var shotsFiredSH = 0;
var coffeeIsUp = false;
var title;
var screenDrawn = false;
var enemySpd = 4.4;
var coinCount = 0;
var infoDrawn = false;
var life;
var coinIcon;
var transition = false;
var levelWin = 25;


// image variables
var playerI;
var bushI;
var rocksI;
var grassI;
var bulletI;
var enemyI;
var menuI;
var lifeI;
var extraLifeI;
var shotGunI;
var coinI;
var coffeeI;


var enemySpawnLocationX = [-50, 450, 950, 450];
var enemySpawnLocationY = [450, -50, 450, 950];
//-1
//-2
function setup()
{

  createCanvas(900, 900);
  background(220);
  //preloads the images for game
  playerI = loadImage('Sprites/PrairieKing.png');
  bushI = loadImage('Sprites/bush.png');
  rocksI = loadImage('Sprites/rocks.png');
  grassI = loadImage('Sprites/ground.png');
  bulletI  = loadImage('Sprites/bullet.png');
  enemyI = loadImage('Sprites/enemy.png');
  menuI = loadImage('Sprites/menuI.png');
  lifeI = loadImage('Sprites/lifeIcon.png');
  extraLifeI = loadImage('Sprites/extraLife.png');
  shotGunI = loadImage('Sprites/shotgun.png');
  coinI = loadImage('Sprites/coin.png');
  coffeeI = loadImage('Sprites/coffee.png');


//defines all groups for game
  bushes = new Group();
  bullets = new Group();
  enemies = new Group();
  players = new Group();
  rocks = new Group();
  shotGuns = new Group();
  coffees = new Group();
  coins = new Group();
  extraLives = new Group();
  titleElements = new Group();
  drops = new Group();



}

function draw()
{
  background(220);

  drawLevel();
  //checks if the person is on the menue then if they are runs the title screen function
  if (onMenu == true && screenDrawn == false)
    {
      startScreen();
    }

  drawSprites();
  //displays info like life count and coins
  if (infoDrawn == false)
  {
    infoDisplay();

  }
  if (onMenu == false)
  {
    textSize(42);
    fill(255);
    text('Level: '+ (level), 750, 50);


  }

  if (onMenu == false)
  {
    numberDisplay();
  }

}


//creates background
function drawGrass()
{
  var grass = createSprite(450, 450);
  grass.addImage(grassI);


}
//cretes a sprite for the player
function spawnPlayer()
{

  player = createSprite(450, 450);
  player.setCollider('rectangle', 0, 0, 50, 50);
  player.addImage(playerI);
  players.add(player);

  playerSpawned = true;
}

function infoDisplay()
{
  // for (var i = 0; i < 10; i++)
  // {
    life = createSprite(35, 30)
    life.addImage(lifeI);
    coinIcon = createSprite(35, 90);
    coinIcon.addImage(coinI);
    var enemyIcon = createSprite(35, 140);
    enemyIcon.addImage(enemyI);


  // }
  infoDrawn = true;




}
function numberDisplay()
{
  textSize(32);
  fill(255)
  text('x '+lives, 70, 45);
  text('x '+coinCount, 70, 100);
  text('x '+countE, 70, 150);


}


// sets the vector of the players y and x postion equal to speed allowing them to move
function movePlayer()
{
  player.velocity.x = 0;
  player.velocity.y = 0;
 if (keyIsDown(65))
 {
   player.velocity.x = -spd;
 }
 if (keyIsDown(68))
 {
   player.velocity.x = spd;
 }
 if (keyIsDown(87))
 {
   player.velocity.y = -spd;
 }
 if (keyIsDown(83))
 {
   player.velocity.y = spd;
 }
//adds collision with the border
 player.collide(bushes);
 player.collide(rocks);

}

//menu
function startScreen()
{
  title = createSprite(450, 450)
  title.addImage(menuI);
  titleElements.add(title);
  screenDrawn = true;



}
// checks if the enemy counter has reached zero and if you are on levels 1 - 5
function checkWin()
{
  if (level < 6 && countE <= 0)
  {

    clearSprites(enemies);
    clearSprites(drops);
    clearSprites(players);
    clearSprites(bullets);


    borderDrawn = false;

    infoDrawn = false;


    for (var i = 0; i < enemies.length; i++)
    {
      enemies[i].remove();

    }




    if (enemies.length <= 0)
    {

      countE = 30;
      eSpawns = 0;
      playerSpawned = false;
      level++;

    }








    }





  }


//checks the level and changes the spawnrate of the enemies according to the difficulty i want
function drawLevel()
{
  if (level == 0)
  {
    //draws the ground sprite and the bushes
    if (borderDrawn == false)
      {
        drawGrass();
        drawBorder();

      }

  }
  else if (level == 1)
  {
    runGame();

    spawnRate = 90
  }
  //this is the level that represents the game over state 
  else if (level == -1)
  {
    for (var i = 0; i < enemies.length-1; i++)
    {
      enemies[i].remove();

    }
    clearSprites(enemies);
    clearSprites(drops);
    clearSprites(players);
    clearSprites(bullets);



    // drawGrass();
    // drawBorder();


    if (enemies.length <= 0)
    {
        resetGame();
        noLoop();
      }




  }



  else if (level == 2)
  {

    runGame();
    if (playerSpawned == false)
    {
      spawnPlayer();
      countE = 35;
    }


    spawnRate = 80
    enemySpd = 4.5

  }

  else if (level == 3)
    {

      runGame();
      if (playerSpawned == false)
      {
        spawnPlayer();
        countE = 45;
      }


      spawnRate = 70;
      enemySpd = 4.6;

    }

    else if (level == 4)
    {

      runGame();
      if (playerSpawned == false)
        {
          spawnPlayer();
          countE = 50;
          console.log("1st")
        }


        spawnRate = 60
        enemySpd = 4.7
      }
      else if (level == 5)
      {

        runGame();
        if (playerSpawned == false)
          {
            spawnPlayer();
            console.log("2nd")
            countE = 2;
          }
          if (countE <= 0)
          {
            countE = 0;
          }
          if (countE <= 100)
          {
            spawnRate = 45;
          }
          else
          {
            spawnRate = 30;
          }

          enemySpd = 4.6
      }


}
//resets all of the variables that make the game run
function resetGame()
{
  borderDrawn = true;
  onMenu = true;
  screenDrawn = false;
  lives = 3;
  gOver = false;
  countE = 30;
  level = 0;
  pickUpS = false;
  fireRate = 30;
  shotsFired = 0;
  shotsFiredSH = 0;
  coffeeIsUp = false;
  infoDrawn = false;
  levelWin = 30;
  eSpawns = 0;
  timerStarted = false;

}

function runGame()
{

  checkWin();
  movePlayer();
  shootGun();
  deleteSprites();
  spawnEnemies();
  powerUpTimer();
  gameOver();



}
//checks if the player is on the menu then if they press space starts the game 
function keyPressed()
{
  if (keyCode === 32 && onMenu == true)
  {
    loop();
    level++;
    spawnPlayer();
    onMenu = false;
    title.remove();
  }

}
//sets the level to the level representing the game over state and removes the player
function gameOver()
{
  if (lives <= 0)
  {
    lives = 0;
    gOver = true;

  }
  if (gOver == true)
  {

    for(var i = 0; i < players.length; i++)
    {
      players[i].remove();

    }
    level = -1;





  }
}
//clears all sprites of the group specified (sometimes works)
function clearSprites(group)
{
  for(var i = 0; i < group.length; i++)
  {

        group[i].remove();


  }


}


// ends the powerUps when certain condtions are met
function powerUpTimer()
{

  if (pickUpS == true)
  {
    if (shotsFiredSH >= 60 - fireRate)
    {
      pickUpS = false;
      shotsFiredSH = 0;

    }
    if (coffeeIsUp == true)
      {
        if (shotsFired >= 50)
        {
          coffeeIsUp = false;
          fireRate = 30;


        }

      }
  }

}


// creates the sprite for the shotgun
function spawnShotGunPickup()
{
  var gunSH = createSprite(random(150, 800), random(100, 800));
  gunSH.addImage(shotGunI);
  shotGuns.add(gunSH);
  drops.add(gunSH);

}
function powerUps()
{


}

// checks for arrow key input and cretes bullet sprites depending on the key pushed
function shootGun()
{
  if(keyIsDown(LEFT_ARROW))
  {
    if(frameCount%fireRate == 0)
    {
      if (pickUpS == true)
      {
        shotGun(-bulletSpd, bulletSpd, -45, 10, -bulletSpd, -bulletSpd,  45 , -10);
        shotsFiredSH++;
      }
      bulletL = createSprite(player.position.x - 45, player.position.y)
      bulletL.addImage(bulletI);
      bulletL.velocity.x = -bulletSpd;
      bullets.add(bulletL);
      bulletL.life = 120;
      shotsFired++;

    }

  }
  else if (keyIsDown(RIGHT_ARROW))
  {
    if(frameCount%fireRate == 0)
    {
      if (pickUpS == true)
      {
        shotGun(bulletSpd, bulletSpd, 45, 10, bulletSpd, -bulletSpd, -45 , -10);
        shotsFiredSH++;
      }
      bulletR = createSprite(player.position.x + 45, player.position.y)
      bulletR.addImage(bulletI);
      bulletR.velocity.x = bulletSpd;
      bullets.add(bulletR);
      bulletR.life = 120;
      shotsFired++;
    }
  }
  else if (keyIsDown(UP_ARROW))
  {
    if(frameCount%fireRate == 0)
    {
      if (pickUpS == true)
      {
        shotGun(bulletSpd, -bulletSpd, 10, -45, -bulletSpd, -bulletSpd, -10 , -45);
        shotsFiredSH++;
      }
      bulletU = createSprite(player.position.x, player.position.y - 45)
      bulletU.addImage(bulletI);
      bulletU.velocity.y = -bulletSpd;
      bullets.add(bulletU);
      bulletU.life = 120;
      shotsFired++;
    }
  }
  else if (keyIsDown(DOWN_ARROW))
  {
    if(frameCount%fireRate == 0)
    {
      if (pickUpS == true)
      {
        shotGun(bulletSpd, bulletSpd, 10, 45, -bulletSpd, bulletSpd, -10 , 45);
        shotsFiredSH++;
      }
      bulletD = createSprite(player.position.x, player.position.y + 45)
      bulletD.addImage(bulletI);
      bulletD.velocity.y = bulletSpd;
      bullets.add(bulletD);
      bulletD.life = 120;
      shotsFired++;


    }
  }
}
//allows the shotgun to work (creates bullets at the diagonals of the direction the player is facing)
function shotGun(velX, velY, spawnX, spawnY, velX2, velY2, spawnX2, spawnY2)
{
  var bulletUL;
  var bulletUR;

  bulletUL = createSprite(player.position.x + spawnX, player.position.y + spawnY)
  bulletUL.addImage(bulletI);
  bulletUL.velocity.y = velY;
  bulletUL.velocity.x = velX;
  bullets.add(bulletUL);
  bulletUL.life = 120;

  bulletUR = createSprite(player.position.x - spawnX2, player.position.y + spawnY2)
  bulletUR.addImage(bulletI);
  bulletUR.velocity.y = velY2;
  bulletUR.velocity.x = velX2;
  bullets.add(bulletUR);
  bulletUR.life = 120;




}

//draws all of the sprites necessary for the border (ignore this part it is just the same code repeated a lot)
function drawBorder()
  {
    var bush = createSprite(35, 35);
    bush.setCollider('rectangle', 0, 0, 75, 75);
    bush.addImage(bushI);
    bushes.add(bush);
    bush.immovable = true;
    var bush1 = createSprite(35, 35 + 75);
    bush1.setCollider('rectangle', 0, 0, 75, 75);
    bush1.addImage(bushI);
    bushes.add(bush1);
    bush1.immovable = true;
    var bush2 = createSprite(35, 35 + 75*2);
    bush2.setCollider('rectangle', 0, 0, 75, 75);
    bush2.addImage(bushI);
    bushes.add(bush2);
    bush2.immovable = true;
    var bush3 = createSprite(35, 35 + 75*3);
    bush3.setCollider('rectangle', 0, 0, 75, 75);
    bush3.addImage(bushI);
    bushes.add(bush3);
    bush3.immovable = true;
    var bush4 = createSprite(35, 35 + 75*4);
    bush4.setCollider('rectangle', 0, 0, 75, 75);
    bush4.addImage(bushI);
    bushes.add(bush4);
    bush4.immovable = true;
    var bush5 = createSprite(35, 37 + 75 * 11);
    bush5.setCollider('rectangle', 0, 0, 75, 75);
    bush5.addImage(bushI);
    bushes.add(bush5);
    bush5.immovable = true;
    var bush6 = createSprite(35, 37 + 75*10);
    bush6.setCollider('rectangle', 0, 0, 75, 75);
    bush6.addImage(bushI);
    bushes.add(bush6);
    bush6.immovable = true;
    var bush7 = createSprite(35, 37 + 75 * 9);
    bush7.setCollider('rectangle', 0, 0, 75, 75);
    bush7.addImage(bushI);
    bushes.add(bush7);
    bush7.immovable = true;
    var bush8 = createSprite(35, 37 + 75 * 8);
    bush8.setCollider('rectangle', 0, 0, 75, 75);
    bush8.addImage(bushI);
    bushes.add(bush8);
    bush8.immovable = true;
    var bush9 = createSprite(35, 37 + 75* 7);
    bush9.setCollider('rectangle', 0, 0, 75, 75);
    bush9.addImage(bushI);
    bushes.add(bush9);
    bush9.immovable = true;
    var bush10 = createSprite(35, 37 + 75 * 9);
    bush10.setCollider('rectangle', 0, 0, 75, 75);
    bush10.addImage(bushI);
    bushes.add(bush10);
    bush10.immovable = true;
    var bush11 = createSprite(862, 35);
    bush11.setCollider('rectangle', 0, 0, 75, 75);
    bush11.addImage(bushI);
    bushes.add(bush11);
    bush11.immovable = true;
    var bush12 = createSprite(862, 35 + 75);
    bush12.setCollider('rectangle', 0, 0, 75, 75);
    bush12.addImage(bushI);
    bushes.add(bush12);
    bush12.immovable = true;
    var bush13 = createSprite(862, 35 + 75*2);
    bush13.setCollider('rectangle', 0, 0, 75, 75);
    bush13.addImage(bushI);
    bushes.add(bush13);
    bush13.immovable = true;
    var bush14 = createSprite(862, 35 + 75*3);
    bush14.setCollider('rectangle', 0, 0, 75, 75);
    bush14.addImage(bushI);
    bushes.add(bush14);
    bush14.immovable = true;
    var bush15 = createSprite(862, 35 + 75*4);
    bush15.setCollider('rectangle', 0, 0, 75, 75);
    bush15.addImage(bushI);
    bushes.add(bush15);
    bush15.immovable = true;
    var bush16 = createSprite(862, 37 + 75 * 11);
    bush16.setCollider('rectangle', 0, 0, 75, 75);
    bush16.addImage(bushI);
    bushes.add(bush16);
    bush16.immovable = true;
    var bush17 = createSprite(862, 37 + 75*10);
    bush17.setCollider('rectangle', 0, 0, 75, 75);
    bush17.addImage(bushI);
    bushes.add(bush17);
    bush17.immovable = true;
    var bush18 = createSprite(862, 37 + 75 * 9);
    bush18.setCollider('rectangle', 0, 0, 75, 75);
    bush18.addImage(bushI);
    bushes.add(bush18);
    bush18.immovable = true;
    var bush19 = createSprite(862, 37 + 75 * 8);
    bush19.setCollider('rectangle', 0, 0, 75, 75);
    bush19.addImage(bushI);
    bushes.add(bush19);
    bush19.immovable = true;
    var bush20 = createSprite(862, 37 + 75* 7);
    bush20.setCollider('rectangle', 0, 0, 75, 75);
    bush20.addImage(bushI);
    bushes.add(bush20);
    bush20.immovable = true;
    var bush21 = createSprite(862, 37 + 75 * 9);
    bush21.setCollider('rectangle', 0, 0, 75, 75);
    bush21.addImage(bushI);
    bushes.add(bush21);
    bush21.immovable = true;
    var bush22 = createSprite(35 + 75, 35);
    bush22.setCollider('rectangle', 0, 0, 75, 75);
    bush22.addImage(bushI);
    bushes.add(bush22);
    bush22.immovable = true;
    var bush23 = createSprite(35 + 75*2, 35);
    bush23.setCollider('rectangle', 0, 0, 75, 75);
    bush23.addImage(bushI);
    bushes.add(bush23);
    bush23.immovable = true;
    var bush24 = createSprite(35 + 75*3, 35);
    bush24.setCollider('rectangle', 0, 0, 75, 75);
    bush24.addImage(bushI);
    bushes.add(bush24);
    bush24.immovable = true;
    var bush25 = createSprite(35 + 75*4, 35);
    bush25.setCollider('rectangle', 0, 0, 75, 75);
    bush25.addImage(bushI);
    bushes.add(bush25);
    bush25.immovable = true;
    var bush26 = createSprite(37 + 75*10, 35);
    bush26.setCollider('rectangle', 0, 0, 75, 75);
    bush26.addImage(bushI);
    bushes.add(bush26);
    bush26.immovable = true;
    var bush27 = createSprite(37 + 75*9, 35);
    bush27.setCollider('rectangle', 0, 0, 75, 75);
    bush27.addImage(bushI);
    bushes.add(bush27);
    bush27.immovable = true;
    var bush28 = createSprite(37 + 75*8, 35);
    bush28.setCollider('rectangle', 0, 0, 75, 75);
    bush28.addImage(bushI);
    bushes.add(bush28);
    bush28.immovable = true;
    var bush29 = createSprite(37 + 75*7, 35);
    bush29.setCollider('rectangle', 0, 0, 75, 75);
    bush29.addImage(bushI);
    bushes.add(bush29);
    bush29.immovable = true;
    var bush30 = createSprite(35 + 75, 862);
    bush30.setCollider('rectangle', 0, 0, 75, 75);
    bush30.addImage(bushI);
    bushes.add(bush30);
    bush30.immovable = true;
    var bush31 = createSprite(35 + 75*2, 862);
    bush31.setCollider('rectangle', 0, 0, 75, 75);
    bush31.addImage(bushI);
    bushes.add(bush31);
    bush31.immovable = true;
    var bush32 = createSprite(35 + 75*3, 862);
    bush32.setCollider('rectangle', 0, 0, 75, 75);
    bush32.addImage(bushI);
    bushes.add(bush32);
    bush32.immovable = true;
    var bush33 = createSprite(35 + 75*4, 862);
    bush33.setCollider('rectangle', 0, 0, 75, 75);
    bush33.addImage(bushI);
    bushes.add(bush33);
    bush33.immovable = true;
    var bush34 = createSprite(37 + 75*10, 862);
    bush34.setCollider('rectangle', 0, 0, 75, 75);
    bush34.addImage(bushI);
    bushes.add(bush34);
    bush34.immovable = true;
    var bush35 = createSprite(37 + 75*9, 862);
    bush35.setCollider('rectangle', 0, 0, 75, 75);
    bush35.addImage(bushI);
    bushes.add(bush35);
    bush35.immovable = true;
    var bush36 = createSprite(37 + 75*8, 862);
    bush36.setCollider('rectangle', 0, 0, 75, 75);
    bush36.addImage(bushI);
    bushes.add(bush36);
    bush36.immovable = true;
    var bush37 = createSprite(37 + 75*7, 862);
    bush37.setCollider('rectangle', 0, 0, 75, 75);
    bush37.addImage(bushI);
    bushes.add(bush37);
    bush37.immovable = true;


    var rock = createSprite(35, 449);
    rock.addImage(rocksI);
    rocks.add(rock);
    var rock1 = createSprite(448, 37);
    rocks.add(rock1);
    rock1.rotation -= 90;
    rock1.addImage(rocksI);
    var rock2 = createSprite(863, 449);
    rocks.add(rock2)
    rock2.addImage(rocksI);
    var rock3 = createSprite(448, 863);
    rocks.add(rock3)
    rock3.rotation -= 270;
    rock3.addImage(rocksI);





    borderDrawn = true;
  }


function deleteSprites()
{
  //removes any sprites that collide with the specified sprite
  bushes.overlap(bullets, collect);
  rocks.overlap(bullets, collect);
  enemies.collide(bushes);
  if (player.overlap(enemies))
  {

    lives--;
  }
  players.overlap(enemies, collect);
  player.overlap(shotGuns, pickupSH);
  player.overlap(extraLives, pickupEL);
  player.overlap(coffees, pickupCof)
  player.overlap(coins, collectCoin)
  enemies.overlap(bullets, killEnemy);

}
function pickupSH(collector, collected)
{
  pickUpS = true;
  shotsFiredSH = 0;
  collected.remove();


}
function pickupEL(collector, collected)
{
  lives++;

  collected.remove();

}
function collect(collector, collected)
{
    collected.remove();
}
function collectCoin(collector, collected)
{
  collected.remove();
  coinCount++;
}


function killEnemy(collector, collected)
{
  //sets the chance for powerups to spawn on enemy deaths
  countE--;
  if (level == 5)
    {
      countE += 2;
    }

  var index = int(random(1,30));
  var lifeIndex = int(random(1, 100));
  var coffeeIndex = int(random(1, 25));
  var coinIndex = int(random(1,15));
  if (index == 1)
  {
    spawnShotGunPickup();

  }
  if (lifeIndex == 1)
  {
    spawnExtraLife();

  }
  if (coffeeIndex == 1)
  {
    spawnCoffee();

  }
  if (coinIndex == 1)
  {
    spawnCoin();

  }
  collected.remove();
  collector.remove();

}
function spawnCoin()
{
  var coin = createSprite(random(150, 800), random(100, 800));
  coin.addImage(coinI);
  coins.add(coin);
  drops.add(coin);

}
function spawnExtraLife()
{
  var lifeE = createSprite(random(150, 800), random(100, 800));
  lifeE.addImage(extraLifeI);
  extraLives.add(lifeE);
  drops.add(lifeE);
}
function pickupCof(collector, collected)
{
  fireRate -= 5;
  if (fireRate <= 0)
    {
      fireRate = 1;

    }
  console.log(fireRate);
  shotsFired = 0;
  coffeeIsUp = true;
  collected.remove();

}
function spawnCoffee()
{
  var cof = createSprite(random(150, 800), random(100, 800));
  cof.addImage(coffeeI);
  coffees.add(cof);
  drops.add(cof);

}

function spawnEnemies()
{
  if (frameCount%spawnRate == 0)
  {
    //randomized the spawn location of enemies between entrances 1-4
    var sPX;
    var sPY;
    var index = int(random(0,4));
    var enemyCount = int(random(1,4));
    var spawnPointX = enemySpawnLocationX[index];
    var spawnPointY = enemySpawnLocationY[index];


    if (index == 0)
    {
      sPX = 0;
      sPY = 50;
      direction = 0;
    }
    else if (index == 1)
    {
      sPX = 50;
      sPY = 0;
      direction = 90;
    }
    else if (index == 2)
    {
      sPX = 0
      sPY = 50
      direction = 180;
    }
    else if (index == 3)
    {
      sPX = 50
      sPY = 0
      direction = 270;
    }

    if (enemyCount == 1)
    {

      enemy = createSprite(spawnPointX, spawnPointY)
      enemies.add(enemy);
      enemy.setCollider('rectangle', 0, 0, 50, 50);
      enemy.addImage(enemyI);


        eSpawns++;

    }
    else if (enemyCount == 2)
    {
      enemy = createSprite(spawnPointX, spawnPointY)
      enemies.add(enemy);
      enemy.setCollider('rectangle', 0, 0, 50, 50);
      enemy.addImage(enemyI);


      enemy2 = createSprite(spawnPointX + sPX, spawnPointY + sPY)
      enemies.add(enemy2);
      enemy2.setCollider('rectangle', 0, 0, 50, 50);
      enemy2.addImage(enemyI);


        eSpawns++;

    }
    else if (enemyCount == 3)
    {
      enemy = createSprite(spawnPointX, spawnPointY)
      enemies.add(enemy);
      enemy.setCollider('rectangle', 0, 0, 50, 50);
      enemy.addImage(enemyI);


      enemy2 = createSprite(spawnPointX + sPX, spawnPointY + sPY)
      enemies.add(enemy2);
      enemy2.setCollider('rectangle', 0, 0, 50, 50);
      enemy2.addImage(enemyI);

      enemy3 = createSprite(spawnPointX - sPX, spawnPointY - sPY)
      enemies.add(enemy3);
      enemy3.setCollider('rectangle', 0, 0, 50, 50);
      enemy3.addImage(enemyI);



        eSpawns++;
    }




  }
  if (enemyCount == 1)
  {
    enemy.setSpeed(enemySpd, direction)

  }
  if (enemyCount == 2)
  {
    enemy.setSpeed(enemySpd, direction)
    enemy2.setSpeed(enemySpd, direction)

  }
  if (enemyCount == 3)
  {
    enemy.setSpeed(enemySpd, direction)
    enemy2.setSpeed(enemySpd, direction)
    enemy3.setSpeed(enemySpd, direction)
  }
  // makes enemies follow the player
  if (eSpawns >= 1 && (player.position.x - enemy.position.x <= 250 ) && (player.position.y - enemy.position.y <= 250))
  {
    for(var i = 0; i < enemies.length; i++)
    {
      enemies.displace(enemies);
      enemies[i].velocity.x = (player.position.x-enemies[i].position.x) / 20;
      enemies[i].velocity.y = (player.position.y-enemies[i].position.y) / 20;
      enemies[i].maxSpeed = enemySpd;
    }

  }


}


//debug stuff

