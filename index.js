 let player1,computer,player2,currentPlayer;
 let gameScorePlayer1 = 0;
 let gameScorePlayer2 = 0;
  
 const gameBoard = (function(){
    let board = [
        ['','',''],
        ['','',''],
        ['','','']
    ]

    
    const checkValidity = position =>{
        switch(position){
          case 0:
            return board[0][0] === '' ? true : false;
      
          break;
          case 1: 
            return board[0][1] === '' ? true : false;
      
          break;
          case 2: 
            return board[0][2] === '' ? true : false;
      
          break;
          case 3: 
            return board[1][0] === '' ? true : false;
      
          break;
          case 4: 
            return board[1][1] === '' ? true : false;
      
          break;
          case 5: 
            return board[1][2] === '' ? true : false;
      
          break;
          case 6: 
            return board[2][0] === '' ? true : false;
      
          break;
          case 7: 
            return board[2][1] === '' ? true : false;
      
          break;
          case 8: 
            return board[2][2] === '' ? true : false;
          break;
        }
      }
      const isValid = (position)=>{
        return checkValidity(position) ? true : false;
      }
      const isFull = ()=>{
        return board.every(row =>{
          return row.every(cell => cell != '')
       })   
     }
    const fillArray = (mark,position) =>{
        const boardElement = document.querySelector('#game_container');
        if(!isValid(position))  return;
        
        boardElement.children[position].textContent = mark.toUpperCase();
        switch(position){
          case 0:
            board[0][0] = mark;
          break;
          case 1: 
            board[0][1] = mark;
          break;
          case 2: 
            board[0][2] = mark;
          break;
          case 3: 
            board[1][0] = mark;
          break;
          case 4: 
            board[1][1] = mark;
          break;
          case 5: 
            board[1][2] = mark;
          break;
          case 6: 
            board[2][0] = mark;
          break;
          case 7: 
            board[2][1] = mark;
          break;
          case 8: 
            board[2][2] = mark;
          break;
        }
      
    }
     
    const winRow = mark =>{
        
        let markCounter = 0;
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[i][j] === mark){
                    markCounter++;
                }
            }
            if(markCounter === 3) return true; 
                markCounter = 0;
        }
        return false;
    }
    const winColumn = mark => {
         
        let markCounter = 0;
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[j][i] === mark){
                    markCounter++;
                }
            }
            if(markCounter === 3) return true; 
                markCounter = 0;
        }
        return false;
    }
    const winDiagonal = mark =>{
        
        let markCounter = 0;
        let diagonal1 = 0;
        let diagonal2 = 2;
        let i = 0;
        let j = 0;
        while(i < board.length){
            if(board[diagonal1][diagonal1] === mark){
                markCounter++;
            }
            diagonal1++;
            i++;
        }
        if(markCounter === 3){
            return true;
        }    
        markCounter = 0;
        diagonal1 = 0;
        while(j < board.length){
            if(board[diagonal1][diagonal2] === mark){
                markCounter++;
            }
            diagonal1++;
            diagonal2--;
            j++;
        }
        if(markCounter === 3){
            return true
        }
        return false;
    }
    const win = mark =>{
        return (winRow(mark) || winColumn(mark) || winDiagonal(mark)) ? true : false;
    }
    const clearBoard = ()=>{
       const boardCells = document.querySelectorAll('#game_container div');
       boardCells.forEach(cell => {cell.textContent = ''});
       board =  board.map(row => {
            return row.map(cell => '')
        })
       
    }
    const getBoard = ()=> board;
    return {
        win,
        fillArray,
        isFull,
        winRow,
        clearBoard,
        
    }

 })() 
  
 
 
 const players = (name,mark)=>{
     return {
         name,
         mark
     }
 }
  
 
const selectCurrentPlayer = (name)=>{
    if(player1.name === name){
        return player2;
    } else {
        return player1;
    }
}
const game = (function(){
   
    const playGame = (position)=>{
       
               
            gameBoard.fillArray(currentPlayer.mark, position);
            
            if(gameBoard.win(currentPlayer.mark)){
                document.getElementById('winner').textContent = `Winner is ${setWinner(currentPlayer,gameScorePlayer1, gameScorePlayer2)}`;
                document.getElementById('winner').classList.add('animate');
                currentPlayer = player1;
                
                document.querySelectorAll('#game_container div').forEach(cell => cell.removeEventListener('click', fillBoard))
                return;
            }  
              if(gameBoard.isFull()){
                document.getElementById('winner').textContent = 'It\s a draw'
                return;
              }
            currentPlayer = selectCurrentPlayer(currentPlayer.name)
        
    }
    return {
        playGame
    }
})()


function setWinner(winner,scoreKeeperPlayer1, scoreKeeperPlayer2){
  const player1Score = document.querySelector('.player1_score');
  const player2Score = document.querySelector('.player2_score');
  if(winner.name === player1.name){
    scoreKeeperPlayer1++;
    player1Score.textContent = parseInt(player1Score.textContent) + scoreKeeperPlayer1;
    return winner.name.toUpperCase();
  } else {
    scoreKeeperPlayer2++;
    player2Score.textContent = parseInt(player2Score.textContent) + scoreKeeperPlayer2;
    return winner.name.toUpperCase();
  }
}



 

 function fillBoard(){
     
   game.playGame(parseInt(this.getAttribute('data-position')));
   
 }
 function restartTheGame(){
    const winnerDisplayElement = document.getElementById('winner')
    gameBoard.clearBoard();
    document.querySelectorAll('#game_container div').forEach(cell => cell.addEventListener('click', fillBoard));
    winnerDisplayElement.classList.remove('animate');
    winnerDisplayElement.textContent = '';
    

 }
 function selectUserNameAndMark(e){
   e.preventDefault();
   const player1Input = document.getElementById('player1');
   const player2Input = document.getElementById('player2');
   const errorMessage = document.querySelectorAll('.error_message');
   
  if(player1Input.value == player2Input.value){
    const div = document.createElement('div');
    div.textContent = 'Do not choose same name!';
    div.classList.add('same_name')
    document.getElementById('username').appendChild(div);
    document.getElementById('username').insertBefore(div, document.querySelector('#username .d-flex'));
    setTimeout(() => {
        div.remove()
    }, 5000);
    return;
  }

   if(hasValidLength(player1Input.value, player2Input.value,errorMessage)){
      player1 = players(player1Input.value,'x');
      player2 = players(player2Input.value, 'o');
      currentPlayer = player1;
      // remove model
      document.querySelector('.modal_container').style.display = 'none';
      // update player names in ui
      const player1Name = document.querySelector('#player1_name');
      const player2Name = document.querySelector('#player2_name');
      player1Name.textContent = `${player1Input.value.toUpperCase()}(X)`;
      player2Name.textContent =`${player2Input.value.toUpperCase()}(O)`;
   }

    
   
 
 }
 function hasValidLength(player1Value, player2Value,errorMessage){
   if(player1Value.length > 10 && player2Value.length > 10) {
      
    errorMessage.forEach(el => el.style.display = 'block');
    setTimeout(() => {
      errorMessage.forEach(el => el.style.display = 'none'); 
     }, 3000);
     return false
   } else if(player1Value.length > 10){
     const player1 = document.querySelector('.player1_error')
     player1.style.display = 'block';
    setTimeout(() => {
       player1.style.display = 'none';
     }, 3000);
     return false
   } else if(player2Value.length > 10){
     const player2 = document.querySelector('.player2_error')
     player2.style.display = 'block';
    setTimeout(() => {
      player2.style.display = 'none';
     }, 3000);
     return false
   }
    return true

 }
 function loadThePage(){
   document.location.reload();
 }
// listen click even on each cell in board
 document.querySelectorAll('#game_container div').forEach(cell => cell.addEventListener('click', fillBoard));

 document.getElementById('restart').addEventListener('click', restartTheGame)

 document.getElementById('username').addEventListener('submit',selectUserNameAndMark);

 document.getElementById('exit').addEventListener('click',loadThePage);