let playerx;
let player0;
let count_x = 0;
let count_0 = 0;
let turn = 'x';
let over = false;

let win = new Audio('sounds/win_audio.mp3');
let tap_audio = new Audio('sounds/tap-audio.mp3');
let start_audio = new Audio('sounds/start-audio.mp3');
let reset_newgame = new Audio('sounds/reset-newgame-audio.mp3');

// winning pattenes...
let rule =[[0,1,2,0,45,0],
           [3,4,5,0,140,0],
           [6,7,8,0,235,0],
           [0,3,6,-95,140,90],
           [1,4,7,0,140,90],
           [2,5,8,95,140,90],
           [0,4,8,0,140,45],
           [2,4,6,0,140,-45]];
  
// winner checking logic...         
const checkwin = () =>{
  for(let i of rule)
  {
    if((boxes[i[0]].innerHTML == boxes[i[1]].innerHTML && boxes[i[1]].innerHTML == boxes[i[2]].innerHTML)&&(boxes[i[0]].innerHTML != ""))
    {
      if(turn == 'o')
      {
        document.querySelector(".board").innerHTML = `Winner ${playerx}`;
        count_x+=1;
        document.querySelector(".x-count").innerHTML = `${playerx} ${count_x}`;
      }
      else{
        document.querySelector(".board").innerHTML = `Winner ${player0}`;
        count_0+=1;
        document.querySelector(".o-count").innerHTML = `${player0} ${count_0}`;
      }
      win.play();
      document.querySelector(".bar").style.transform = `translatex(${i[3]}px) translatey(${i[4]}px) rotate(${i[5]}deg)`;
      document.querySelector(".bar").style.width = "260px";
      over = true;
    }
  }
}
let count = 0;
let boxes = document.querySelectorAll(".box");
boxes.forEach((e)=>{
  e.addEventListener("click",()=>{
    if(!over)
    {
      if(turn == 'x' && e.innerHTML=="")
      {
        tap_audio.play();
        count++;
        e.innerHTML = "X";
        e.style.color = `rgb(${239},${81},${17})`;
        turn = 'o';
      }
      else if(e.innerHTML == "")
      {
        tap_audio.play();
        count++;
        e.innerHTML = "O";
        e.style.color = "white";
        turn = 'x';
      }
    checkwin();
    if(count==9 && !over)
    {
      document.querySelector(".board").innerHTML = "Draw";
    }
  }
  })
});

// Reset button logic...
document.querySelector(".reset").addEventListener("click",()=>{
  boxes.forEach((e)=>{
    
    reset_newgame.play();
    
    e.innerHTML = "";
    over = false;
    turn = 'x';
    document.querySelector(".board").innerHTML = "";
    document.querySelector(".bar").style.width = "0";
    
    document.querySelector(".board").innerHTML = `${playerx} VS ${player0}`;
    
    count = 0;
  })
});

//New Game button logic...
document.querySelector(".new-game").addEventListener("click",()=>{
    boxes.forEach((e)=>{
      
    reset_newgame.play();
      
    e.innerHTML = "";
    
    count_x = 0;
    count_0 = 0;
    
    document.querySelector(".x-count").innerHTML = "";
    document.querySelector(".o-count").innerHTML = "";
    
    document.querySelector(".board").innerHTML = "";
    
    document.querySelector(".bar").style.width = "0px";
    
    document.querySelector(".board").style.border = "none";
    
    document.querySelector(".reset-newgame").style.opacity = "0";
    
    over = false;
    turn = 'x';
    
    document.querySelector(".container2").style.left = "7.5%";
    
    document.querySelector("#player1").value = "";
    document.querySelector("#player2").value = "";
    
    document.querySelector(".container2").style.opacity = '1';
    
    document.querySelector(".inner-container").style.opacity = "0";
    
    count = 0;
  })
});

//play button logic...
document.querySelector(".play").addEventListener("click",()=>{
  
  let player1 = document.querySelector("#player1").value;
let player2 = document.querySelector("#player2").value;
  if(player1!="" && player2!="")
  {
  start_audio.play();
  
  playerx = document.querySelector("#player1").value;
  player0 = document.querySelector("#player2").value;
  
  document.querySelector(".x-count").innerHTML = `${playerx} ${count}`;
  document.querySelector(".o-count").innerHTML = `${player0} ${count}`;
  
  document.querySelector(".container2").style.left = "-100%";
 
  document.querySelector(".board").style.border = "2px solid white";
  
  document.querySelector(".reset").style.opacity = "1";
  document.querySelector(".new-game").style.opacity = "1";
  document.querySelector(".reset-newgame").style.opacity = "1";
  
  document.querySelector(".inner-container").style.opacity = "1";
  
  document.querySelector(".board").innerHTML = `${playerx} VS ${player0}`;
  
  document.querySelector(".container2").style.opacity = '0';
  }
  else
  {
    alert("Please fill this required field");
  }
});