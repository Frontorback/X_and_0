const EMPTY_CELL = "";
const X_CELL = "x";
const o_CELL = "o";

const crossGame =  {
    board : new Array(9).fill(EMPTY_CELL) 
};
crossGame.boardEl = document.querySelector('.cross__board');
crossGame.cellItem = crossGame.boardEl.querySelectorAll('.cross__board-item');

crossGame.render = function(indexCell, el){
    const render = el === X_CELL ? crossGame.createItemX() : crossGame.createItemO();
    crossGame.cellItem[indexCell].append(render);
}
crossGame.step = function (indexCell, el){
     if (crossGame.board[indexCell] === EMPTY_CELL) {
         crossGame.board[indexCell] = el;
         crossGame.render(indexCell, el);
     }
     else {
         throw new Error('not empty');
     }
}

crossGame.createItemO = function() {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg','svg');
    const ellipseEl = document.createElementNS('http://www.w3.org/2000/svg','ellipse');

    svgEl.append(ellipseEl);
    svgEl.setAttribute('class','o cross__board-item-el');
    svgEl.setAttribute('viewBox', '0 0 8 12');

    ellipseEl.setAttribute('cx','6');
    ellipseEl.setAttribute('cy','4');
    ellipseEl.setAttribute('rx','3');
    ellipseEl.setAttribute('ry','3');

    return svgEl;

}

crossGame.createItemX = function(){
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
    return svgEl;
}

crossGame.isWin = function(expectedEl) {

    const verif = [];
    const {board} = crossGame;

    for (i = 0 ; i < 3; i++) {
        
        const row = [

            board[3*i],
            board[3*i+1],
            board[3*i+2]
        ];
        const column = [

            board[i],
            board[i+3],
            board[i+6]
        ];
        verif.push(row, column);
    }
console.log(verif);
}
console.log(crossGame);
crossGame.isWin();


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
function clickByItem (idx) {
    
        console.log('clickByItem', idx);
    
}


//crossGame.step(0, X_CELL);
//crossGame.step(1, o_CELL);
//crossGame.step(4, X_CELL);
