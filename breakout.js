let board;
let boardWidth=500;
let boardheight=500;
let context;
let playerWidth=80;
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
let ballVelocityX=3;
let ballVelocityY=2;
let ball={
    x:boardWidth/2,
    y:boardheight/2,
    width:ballwidth,
    height:ballheight,
    velocityX:ballVelocityX,
    velocityY:ballVelocityY
}

window.onload=function (){
    board=document.getElementById("board");
    board.width=boardWidth;
    board.height=boardheight;
    context=board.getContext("2d");//used for drawing on board
    //draw initial player
    context.fillStyle="orange";
    context.fillRect(player.x,player.y,player.width,player.height);
    requestAnimationFrame(update);
    document.addEventListener("keydown",movePlayer)
}
function update(){
    requestAnimationFrame(update);
    context.clearRect(0,0,board.width,board.height);
    //player
    context.fillStyle="lightgreen";
    context.fillRect(player.x,player.y,player.width,player.height);
    context.fillStyle="white";
    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
    context.fillRect(ball.x,ball.y,ball.width,ball.height);
    
}
function outOfBounds(newplayerX){
    return (newplayerX<0 || newplayerX+player.width>boardWidth);
}
function movePlayer(evt){
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
