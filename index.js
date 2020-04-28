 
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
      const isEmpty = ()=>{
        return board.every(row =>{
           return  row.every(item => item === '');
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
        console.table(board)
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
        isEmpty,
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
 const player = players('Johongir','x')
 const computer = players('computer', 'o');
 
const selectCurrentPlayer = (name)=>{
    if(player.name === name){
        return computer;
    } else {
        return player;
    }
}
const game = (function(){
    let currentPlayer = player;
    
    const playGame = (position)=>{
       
               
            gameBoard.fillArray(currentPlayer.mark, position);
            
            if(gameBoard.win(currentPlayer.mark)){
                document.getElementById('winner').textContent = `Winner is ${currentPlayer.name}`;
                document.getElementById('winner').classList.add('animate');
                currentPlayer = player;
                console.log(currentPlayer)
                document.querySelectorAll('#game_container div').forEach(cell => cell.removeEventListener('click', fillBoard))
                return;
            }
            currentPlayer = selectCurrentPlayer(currentPlayer.name)
        
    }
    return {
        playGame
    }
})()




 

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
// listen click even on each cell in board
 document.querySelectorAll('#game_container div').forEach(cell => cell.addEventListener('click', fillBoard));

 document.getElementById('restart').addEventListener('click', restartTheGame)