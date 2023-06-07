"use strict";
const Player = (name, sign)=>{
    const getName =()=>name;
    const getSign =()=>sign.toUpperCase();
    return {getName,getSign};
}

const gameBoard = (() => {
    const board =['','','','','','','','',''];
    const setField = (index,sign)=>{
        if (board[index]!='') return;
        board[index]=sign;
    };
    const getField=(index)=>board[index];
    const reset = () => {
        for (let i=0; i<board.length; i++){
            board[i]='';
        }
    };
    return {setField, getField, reset};
})();

const displayControl =(() => {
    const gameGrid=document.querySelectorAll('.field');
    const restartBtn = document.getElementById('restart');
    const messageSlot = document.getElementById('message');
    
    gameGrid.forEach((field)=>field.addEventListener('click',(e)=>{
        
        if(gameControl.getOver()==true||e.target.textContent!=="") return;
        gameControl.playRound(parseInt(e.target.dataset.index));
        updateGameboard();
        
    }

    ));

    restartBtn.addEventListener('click', (e)=>{
        gameBoard.reset();
        gameControl.reset();
        updateGameboard();
    })

    const updateGameboard=()=>{
        for (let i = 0; i<gameGrid.length;i++){
            gameGrid[i].textContent = gameBoard.getField(i);
        }
    }

    const setResultMessage = (winner) =>{
        console.log({winner});
        if (winner === 'Draw'){
            setMessage('Its a Draw');
        }
        else{
            console.log('here')
            setMessage(`Player: ${winner} won`);
        }
    }
    const setMessage = (message)=>{
        console.log({message})
        messageSlot.textContent=message;
    }
    return {setResultMessage, setMessage};
})();

const gameControl =(()=>{
    const player1 = Player('p1','x');
    const player2 = Player('p2','o');
    let over =false;
    let round = 1;
    const horizontals = [[0,1,2],[3,4,5],[6,7,8]];
    const verticals = [[0,3,6],[1,4,7],[2,5,8]];
    const diagonals = [[0,4,8],[2,4,6]];
    const getActivePlayer = () =>{return round%2 == 1? player1:player2};

    const playRound=(index)=>{
        gameBoard.setField(index, getActivePlayer().getSign());
        checkWinner();
        round++;
        checkDraw();
        if(!over){
            displayControl.setMessage(`${getActivePlayer().getName()}'s turn`)
        }
    }
    const checkDraw = () => {
        if (round == 10){
            over = true;
            displayControl.setResultMessage('Draw');
        }
    }
    const checkWinner = () => {
        let count =0;
        
        for(let i = 0; i<3 ;i++){
            count = 0;
            for(let j=0; j<3; j++){
                if(gameBoard.getField(horizontals[i][j])!=getActivePlayer().getSign()){

                    break;
                }
                count++;
            }
            if(count ==3){
                break;
            }
        }
        if(count<3){
            for(let i = 0; i<3 ;i++){
                count = 0;
                for(let j=0; j<3; j++){
                    if(gameBoard.getField(verticals[i][j])!=getActivePlayer().getSign()){
                        break;
                    }
                    count++;
                }
                if(count ==3){
                    break;
            }
        }
    }
        if(count<3){
            for(let i = 0; i<2 ;i++){
                count = 0;
                for(let j=0; j<3; j++){
                    if(gameBoard.getField(diagonals[i][j])!=getActivePlayer().getSign()){
                        break;
                    }
                    count++;
                }
                if(count ==3){
                    break;
            }
        }
    }
    if(count == 3){
        
        displayControl.setResultMessage(`${getActivePlayer().getName()}`);
        over=true;
    }
}   
    const getOver = () => over;
    const reset = ()=> {
        over = false;
        round =1;
        displayControl.setMessage(`${getActivePlayer().getName()}'s turn`);
    }
    return {getActivePlayer, playRound, getOver,reset};
})();

displayControl.setMessage(`${gameControl.getActivePlayer().getName()}'s turn`);