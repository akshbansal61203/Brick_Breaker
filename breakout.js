let board;
let boardWidth=500;
let boardheight=500;
let context;
let playerWidth=500;
let playerheight=10;
let playerVelocityx=10;
let player={
    x:boardWidth/2-playerWidth/2,
    y:boardheight-playerheight-5,
    width:playerWidth,
    height:playerheight,
    velocityX:playerVelocityx
}
//ball
let ballwidth=10;
let ballheight=10;
let ballVelocityX=15;
let ballVelocityY=10;
let ball={
    x:boardWidth/2,
    y:boardheight/2,
    width:ballwidth,
    height:ballheight,
    velocityX:ballVelocityX,
    velocityY:ballVelocityY
}
//blocks
let blockArray=[];
let blockWidth=50;
let blockHeight=10;
let blockColumns=8;
let blockRows=3;
let maxBlockRows=10;
let blockCount=0;
//starting block corner left
let blockX=15;
let blockY=45;
let score=0;
let gameOver=false;
window.onload=function (){
    board=document.getElementById("board");
    board.width=boardWidth;
    board.height=boardheight;
    context=board.getContext("2d");//used for drawing on board
    //draw initial player
    context.fillStyle="lightgreen";
    context.fillRect(player.x,player.y,player.width,player.height);
    requestAnimationFrame(update);
    document.addEventListener("keydown",movePlayer)
    //create blocks
    createBlock();
}
function update(){
    requestAnimationFrame(update);
    if(gameOver)return;
    context.clearRect(0,0,board.width,board.height);
    //player
    context.fillStyle="lightgreen";
    context.fillRect(player.x,player.y,player.width,player.height);
    context.fillStyle="white";
    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
    context.fillRect(ball.x,ball.y,ball.width,ball.height);
    if(ball.y<=0){
        ball.velocityY*=-1;
    }else if(ball.x<=0 ||(ball.x+ball.width)>=boardWidth){
        ball.velocityX*=-1;
    }else if((ball.y+ball.height)>=boardheight){
        //game over
        context.font="20px Arial";
        context.fillText("Game Over:Press Space to restart",80,400);
        gameOver=true;
    }
    if(topCollision(ball,player)||bottomCollision(ball,player)){
        ball.velocityY*=-1;
    }else if(leftCollision(ball,player)||rightCollision(ball,player)){
        ball.velocityX*=-1;
    }
    //blocks
    context.fillStyle="skyblue";
    for(let i=0;i<blockArray.length;i++){
        let block=blockArray[i];
        if(!block.break){
            if(topCollision(ball,block)||bottomCollision(ball,block)){
                block.break=true;
                ball.velocityY*=-1;
                blockCount-=1;
                score+=100;
            }else if(leftCollision(ball,block)||rightCollision(ball,block)){
                block.break=true;
                ball.velocityX*=-1;
                blockCount-=1;
                score+=100;
            }
            context.fillRect(block.x,block.y,block.width,block.height);
        }
    }
    //next level
    if(blockCount==0){
        score+=100*blockRows*blockColumns;
        blockRows=Math.min(blockRows+1,maxBlockRows);
        createBlock();
    }
    context.font="20px sans-serif";
    context.fillText(score,10,25);
}
function outOfBounds(newplayerX){
    return (newplayerX<0 || newplayerX+player.width>boardWidth);
}
function movePlayer(evt){
    if(gameOver){
        if(evt.code=="Space"){
            resetGame();
        }
    }
    if(evt.code=="ArrowLeft"){
       let newplayerX=player.x-player.velocityX;
       if(!outOfBounds(newplayerX)){
          player.x=newplayerX;
       };
        
    }else if(evt.code=="ArrowRight"){
        let newplayerX=player.x+player.velocityX;
       if(!outOfBounds(newplayerX)){
          player.x=newplayerX;
       };
    }
}

function detectCollison(a,b){
    return a.x<b.x+b.width &&
    a.x+a.width>b.x &&
    a.y<b.y+b.height &&
    a.y+a.height>b.y;
}

function topCollision(ball,block){
    return detectCollison(ball,block)&&((ball.y+ball.height)>=block.y);
}

function bottomCollision(ball,block){
    return detectCollison(ball,block)&&((block.y+block.height)>=ball.y);
}

function leftCollision(ball,block){
    return detectCollison(ball,block)&&((ball.x+ball.width)>=block.x);
}

function rightCollision(ball,block){
    return detectCollison(ball,block)&&((block.x+block.width)>=ball.x);
}

function createBlock(){
    blockArray=[];
    for(let c=0;c<blockColumns;c++){
        for(let r=0;r<blockRows;r++){
            let block={
                x:blockX+c*blockWidth+c*10,
                y:blockY+r*blockHeight+r*10,
                width:blockWidth,
                height:blockHeight,
                break:false
            }
            blockArray.push(block);
        }
    }
    blockCount=blockArray.length;
}
function resetGame(){
    gameOver=false;
    player={
         x:boardWidth/2-playerWidth/2,
        y:boardheight-playerheight-5,
        width:playerWidth,
        height:playerheight,
        velocityX:playerVelocityx
    }
    ball={
        x:boardWidth/2,
        y:boardheight/2,
        width:ballwidth,
        height:ballheight,
        velocityX:ballVelocityX,
        velocityY:ballVelocityY
    }
    score=0;
    blockArray=[];
    blockRows=3;
    createBlock();
}
