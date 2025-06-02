let board;
let boardWidth=500;
let boardheight=500;
let context;
let playerWidth=80;
let playerheight=10;
let player={
    x:boardWidth/2-playerWidth/2,
    y:boardheight-playerheight-5,
    width:playerWidth,
    height:playerheight
}
window.onload=function (){
    board=document.getElementById("board");
    board.width=boardWidth;
    board.height=boardheight;
    context=board.getContext("2d");//used for drawing on board
    //draw initial player
    context.fillStyle="orange";
    context.fillRect(player.x,player.y,player.width,player.height);
}