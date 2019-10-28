var game_container = document.getElementById("game-container");

const ROWS = 60;
const COLS = 60;

var state = {
    timer: null, 
    x: 0,
    y: 0,
    xx: 1,
    yy: 0,
    trace: [],
    len: 0,
    grid: [],
    dom_grid: [],
}

function init() {
    for(var i = 0; i < ROWS; i++){
        var row_div = document.createElement("div");
        row_div.className = "row";
        state.dom_grid.push([]);
        state.grid.push([]);
        for(var j = 0; j < COLS; j++){
            var col_div = document.createElement("div");
            col_div.className = "col";
            row_div.appendChild(col_div);
            state.dom_grid[i].push(col_div);
            state.grid[i].push(0);
        }
        game_container.appendChild(row_div);
    }

    document.addEventListener("keydown", function(event) {
        if(event.keyCode == 37){
            state.xx = 0;
            state.yy = -1;
        }
        if(event.keyCode == 38){
            state.xx = -1;
            state.yy = 0;
        }
        if(event.keyCode == 39){
            state.xx = 0;
            state.yy = 1;
        }
        if(event.keyCode == 40){
            state.xx = 1;
            state.yy = 0;
        }
        console.log(event.keyCode);
    });
}

function gameTick(){
    var old = state.trace.pop();
    state.x += state.xx;
    state.y += state.yy;
    state.trace.unshift([state.x, state.y]);
    state.grid[old[0]][old[1]] = 0;
    state.grid[state.x][state.y] = 1;
    draw();
    state.timer = setTimeout(gameTick, 100);
}

function startGame(){
    state.x = Math.floor(ROWS/2);
    state.y = Math.floor(COLS/2);
    state.trace = [[state.x, state.y]];
    state.timer = setTimeout(gameTick, 100);
}

function draw(){
    for(var i = 0; i < ROWS; i++){
        for(var j = 0; j < COLS; j++){
            if(state.grid[i][j]){
                state.dom_grid[i][j].setAttribute("active","");
            }
            else{
                state.dom_grid[i][j].removeAttribute("active");
            }
        }
    }
}

init();
startGame();