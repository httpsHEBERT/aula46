var lua;
var nave, naveParada, naveCima, naveBaixo, naveEsquerda, naveDireita;
var velocimetroV, velocimetroH, velocimetroImg;
var combustivel = 100;

function preload(){

  lua = loadImage("Images/cenario/lua.png");

  naveParada = loadAnimation("Images/nave/vertical/nave1.png");
  naveCima = loadAnimation("Images/nave/vertical/nave1.png", "Images/nave/vertical/nave2.png", "Images/nave/vertical/nave3.png");
  naveBaixo = loadAnimation("Images/nave/vertical/nave3.png", "Images/nave/vertical/nave2.png", "Images/nave/vertical/nave1.png");
  naveEsquerda = loadAnimation("Images/nave/horizontal/naveEsquerda1.png", "Images/nave/horizontal/naveEsquerda2.png")
  naveDireita = loadAnimation("Images/nave/horizontal/naveDireita1.png", "Images/nave/horizontal/naveDireita2.png")

  naveCima.looping = false;
  naveBaixo.looping = false;
  naveEsquerda.looping = false;
  naveDireita.looping = false;

  velocimetroImg = loadImage("Images/cenario/velocimetro.png");
}

function setup(){

    createCanvas(windowWidth, windowHeight-4);

    nave = createSprite(width-100, 80);
    nave.addAnimation("parada", naveParada);
    nave.frameDelay = 10;
    nave.scale = 0.5;

    velocimetroV = createSprite(80, 85);
    velocimetroV.addImage(velocimetroImg);
    velocimetroV.scale = 0.3;

    velocimetroH = createSprite(230, 85);
    velocimetroH.addImage(velocimetroImg);
    velocimetroH.scale = 0.3;
}

function draw(){

    background(lua);
    drawSprites();

    movimento();
    velocidade();
    mostrarCombustivel();
}

function movimento(){

    nave.velocityY += 0.2;


    if(combustivel > 1){
       
        //cima


        if(keyDown("w") || keyDown("UP_ARROW")){
            nave.velocityY -= 0.5;
            combustivel -= 0.5;
        }

        if(keyWentDown("w") || keyWentDown("UP_ARROW")){
            nave.addAnimation("cima", naveCima);
            nave.changeAnimation("cima");
        }

        //esquerda

        if(keyDown("a") || keyDown("LEFT_ARROW")){
            nave.velocityX -= 0.5;
            combustivel -= 0.5;
        }

        if(keyWentDown("a") || keyWentDown("LEFT_ARROW")){
            nave.addAnimation("esquerda", naveEsquerda);
            nave.changeAnimation("esquerda");
        }

        //direita

        if((keyDown("d") || keyDown("RIGHT_ARROW")) && combustivel > 0){
            nave.velocityX += 0.5;
            combustivel -= 0.5;
        }

        if(keyWentDown("d") || keyWentDown("RIGHT_ARROW")){
            nave.addAnimation("direita", naveDireita);
            nave.changeAnimation("direita");
        }
    }

    //up 

    if(keyWentUp("w") || keyWentUp("UP_ARROW")){
        nave.addAnimation("baixo", naveBaixo);
        nave.changeAnimation("baixo");
    }

    if(keyWentUp("a") || keyWentUp("LEFT_ARROW")){
        nave.changeAnimation("parada");
    }

    if(keyWentUp("d") || keyWentUp("RIGHT_ARROW")){
        nave.changeAnimation("parada");
    }  

}

function velocidade(){

    //velocidade vertical

    let velY = nave.velocityY.toFixed(0);

    textSize(30);
    textAlign(CENTER);

    if(velY < 0){
        fill("lightGreen");
    }else{
        fill("gray");
    }

    text(velY*(-1), velocimetroV.x, velocimetroV.y+40);

    //velocidade horizontal

    let velX = nave.velocityX.toFixed(0);

    if(velX != 0){
        fill("lightGreen");
    }else{
        fill("gray");
    }

    text(velX*(-1), velocimetroH.x, velocimetroH.y+40);
}

function mostrarCombustivel(){

    fill("red");

    rect(30, 200, combustivel*2.5, 20);

    text(Math.round(combustivel), 500, 100);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}