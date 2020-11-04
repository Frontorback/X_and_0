const EMPTY_CELL = '';
const X_CELL = 'x';
const O_CELL = 'o';
const crossGame = {
board: new Array(9).fill(EMPTY_CELL),

};

crossGame.boardEl = document.querySelector('.cross__board');
crossGame.cellItems = document.querySelectorAll('.cross__board-item');

crossGame.step = function (idxCell, el) {
    if (crossGame.board[idxCell] === EMPTY_CELL) {
        crossGame.board[idxCell] = el;
    }
    else{
        throw new Error('cell is not empty')
    }
}
crossGame.renderItem = function(idxCell, el){
const renderItem = el === X_CELL ? crossGame.createItemX() : crossGame.createItemO();

}

crossGame.createItemO = function() {
    const svgEl = document.createElement('svg');
    const ellipseEl = document.createElement('ellipse');

    svgEl.append(ellipseEl);
    svgEl.className = 'o cross__board-item-el';
    svgEl.setAttribute('viewBox', '0 0 8 12');

    ellipseEl.setAttribute('cx','6');
    ellipseEl.setAttribute('cy','4');
    ellipseEl.setAttribute('rx','3');
    ellipseEl.setAttribute('ry','3');

    return svgEl;

}

crossGame.createItemX = function(){
    const svgEl = document.createElement('svg');
    const line1El = document.createElement('line');
    const line2El = document.createElement('line');

    svgEl.className = 'x cross__board-item-el';
    svgEl.setAttribute('viewBox', '0 0 8 12')

    line1El.className = 'x__line1';
    line1El.setAttribute('x1','3');
    line1El.setAttribute('y1','1');
    line1El.setAttribute('x2','8');
    line1El.setAttribute('y2','6');
    ///x__line1" x1="3" y1="1" x2="8" y2="6"/>
    line2El.className = 'x__line2';
    line2El.setAttribute('x1','3');
    line2El.setAttribute('y1','6');
    line2El.setAttribute('x2','8');
    line2El.setAttribute('y2','1');
    ///x2="3" y2="6" x1="8" y1="1

    svgEl.append(line1El, line2El);
    return svgEl;
}
crossGame.step(0,X_CELL);
crossGame.step(1, O_CELL);
console.log(crossGame);
console.log(crossGame.createItemX());
console.log(crossGame.createItemO())