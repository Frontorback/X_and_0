const EMPTY_CELL = '';
const X_CELL = 'x';
const O_CELL = 'o';

const crossGame = {
    gameEnded: false,
    winner: null,
    board: new Array(9).fill(EMPTY_CELL), 
    currentUser : X_CELL,
    stepEnable : true,
    gameTimer: new Timer(),
    timerX: new Timer(),
    timerO: new Timer(),
    //UserWin: allo(),

};

const timerXEl = document.querySelector('.cross__timer--x');
const timerOEl = document.querySelector('.cross__timer--o');
const timerGameEl = document.querySelector('.cross__timer--game');

timerGameEl.append(crossGame.gameTimer.render());
timerOEl.append(crossGame.timerO.render());
timerXEl.append(crossGame.timerX.render());

timerGameEl.append( crossGame.gameTimer.render());

crossGame.boardEl = document.querySelector('.cross__board');
crossGame.cellItems = crossGame.boardEl.querySelectorAll('.cross__board-item');

crossGame.onAnimationEnd = function () {
    console.log('onAnimationEnd', this);
    const divEl = document.getElementsByClassName('.cross__winner');
    if (crossGame.gameEnded ) {

        return  divEl.style.display = "flex";

        // return function(){
        //     document.querySelectorAll('cross__winner').style.display = 'flex';
        // } 

        
        //return  Winner();    
        
        
    //    return alert('You win');
    }else {
        this.stepEnable = true
    }
}

crossGame.step = function (idxCell, el) {
    crossGame.gameTimer.start();

    console.log('gameTimer', crossGame.gameTimer.getTime());

    if (crossGame.gameEnded){
        throw new Error('Game is already ended');
    } 
    if (!crossGame.stepEnable) {
        return false;
    }

    if (crossGame.board[idxCell] === EMPTY_CELL) {
        crossGame.stepEnable = false;
        crossGame.board[idxCell] = el;
        crossGame.renderItem(
            idxCell,
            el,
            crossGame.onAnimationEnd.bind(crossGame)
             );

        if (crossGame.isWin(el)) {
            crossGame.gameEnded = true;
            crossGame.winner = el;
           // alert('You win');

            return false;
        }
        return true;
    }
    else{
        //throw new Error('cell is not empty')
        return false;
    }
}
crossGame.renderItem = function(idxCell, el, onAnimationEnd){
const renderItem = el === X_CELL ? crossGame.createItemX(onAnimationEnd) : crossGame.createItemO(onAnimationEnd);



crossGame.cellItems[idxCell].append(renderItem);


}

crossGame.createItemO = function(onAnimationEnd) {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg','svg');
    const ellipseEl = document.createElementNS('http://www.w3.org/2000/svg','ellipse');

    svgEl.append(ellipseEl);
    svgEl.setAttribute('class','o cross__board-item-el');
    svgEl.setAttribute('viewBox', '0 0 8 12');

    ellipseEl.setAttribute('cx','6');
    ellipseEl.setAttribute('cy','4');
    ellipseEl.setAttribute('rx','3');
    ellipseEl.setAttribute('ry','3');

    svgEl.addEventListener(
        'animationend',
        onAnimationEnd,
        {
            once: true
        }
    );

    return svgEl;

}

crossGame.createItemX = function(onAnimationEnd){
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg','svg');
    const line1El = document.createElementNS('http://www.w3.org/2000/svg','line');
    const line2El = document.createElementNS('http://www.w3.org/2000/svg','line');

    svgEl.setAttribute('class','x cross__board-item-el');
    svgEl.setAttribute('viewBox', '0 0 8 12')

    line1El.setAttribute('class','x__line1');
    line1El.setAttribute('x1','3');
    line1El.setAttribute('y1','1');
    line1El.setAttribute('x2','8');
    line1El.setAttribute('y2','6');
    ///x__line1" x1="3" y1="1" x2="8" y2="6"/>
    line2El.setAttribute('class','x__line2');
    line2El.setAttribute('x1','3');
    line2El.setAttribute('y1','6');
    line2El.setAttribute('x2','8');
    line2El.setAttribute('y2','1');
    ///x2="3" y2="6" x1="8" y1="1

    
    svgEl.append(line1El, line2El);

    line2El.addEventListener(
        'animationend',
        onAnimationEnd,
         {
            once: true
        }
    );

    return svgEl;
}


crossGame.isWin= function (expectedEl){
    const {board} = crossGame;

    for (let i=0 ; i < 3; i++ ) {
        const row = [

            board[3*i],
            board[3*i+1],
            board[3*i+2]
        ];
        
        if (check(row)) {
            return true;
        }
        const column = [

            board[i],
            board[i+3],
            board[i+6]

        ];

        if(check(column)) {
            return true;
        };
    }

    if (check([board[0], board[4], board [8]])) {
        return true;
    } 

    if (check([board[2], board[4], board [6]])) {
        return true;
    } 

    function check(verifiableItem) {
        return verifiableItem.every(function(el) {
            return el === expectedEl;
        } );
    }
    return false;
}
 crossGame.step(0,X_CELL);
// crossGame.step(1, O_CELL);
// crossGame.step(3,X_CELL);
// crossGame.step(4,O_CELL);

console.log(crossGame.cellItems);

Array.prototype.forEach.call(
    crossGame.cellItems,
    function(cellItem,idx){
        cellItem.addEventListener(
            'click',
            function() {
                return clickByItem(idx);
            },
            
        );
    }
);

crossGame.userStep = function(idxCell) {
    const {currentUser, timerX, timerO} = this;
    const userTimer = {
        [X_CELL]: timerX,
        [O_CELL]: timerO
    }
    if(this.step(idxCell, currentUser)) {
        userTimer[currentUser].pause();
        this.currentUser = [X_CELL, O_CELL].find(function (user) { return user !== currentUser;});
        userTimer[this.currentUser].start();
    }
    
    

}

function clickByItem (idx) {
    
        console.log('clickByItem', idx);
    crossGame.userStep(idx);
}


//console.log(crossGame);
//console.log(crossGame.createItemX());
//console.log(crossGame.createItemO())
crossGame.isWin();










// function Winner () {
   
//     const divEl = document.createElement('div');
//     divEl.classList.add('cross__winner');
//     divEl.innerText = 'You win!';

//     return divEl;
    
    
// }

