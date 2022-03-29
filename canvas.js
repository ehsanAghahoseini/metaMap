
let canvas = document.getElementById('mapCanvas');
let ctx = canvas.getContext("2d");
let buffer = document.createElement("canvas").getContext("2d");
let size = 40;

let map = [
    [
        { 'size': [1, 1], 'pos': [0, 0], 'type': 'sell' },
        { 'size': [1, 1], 'pos': [0, 1], 'type': 'free' },
        { 'size': [1, 1], 'pos': [0, 2], 'type': 'sell' },
        { 'size': [1, 1], 'pos': [0, 3], 'type': 'free' },

    ],
    [
        { 'size': [1, 1], 'pos': [1, 0], 'type': 'sell' },
        { 'size': [1, 1], 'pos': [1, 1], 'type': 'free' },
        { 'size': [1, 2], 'pos': [1, 2], 'type': 'sold', 'img': './ghost.png' },
        { 'size': [1, 1], 'pos': [1, 3], 'type': 'free' },

    ],
    [
        { 'size': [1, 1], 'pos': [2, 0], 'type': 'free' },
        { 'size': [1, 1], 'pos': [2, 1], 'type': 'sell' },
        { 'size': [1, 1], 'pos': [2, 3], 'type': 'sell' },
    ],
    [
        { 'size': [1, 1], 'pos': [3, 0], 'type': 'sell' },
        { 'size': [1, 1], 'pos': [3, 1], 'type': 'free' },
        { 'size': [1, 1], 'pos': [3, 2], 'type': 'sell', },
        { 'size': [1, 1], 'pos': [3, 3], 'type': 'free' },

    ],
]


const image = (fileName) => {
    const img = new Image();
    img.src = `./image/${fileName}`;
    return img;
}

const canvasImage = (tile) => {
    buffer.canvas.width = tile.size[0] * size;
    buffer.canvas.height = tile.size[1] * size;
    buffer.fillStyle = '#000000';
    buffer.fillRect(0, 0, tile.size[0] * size, tile.size[1] * size);
    if (tile.type == 'sold') {
        buffer.fillStyle = '#ff3333';
    }
    else if (tile.type == 'sell') {
        buffer.fillStyle = '#cccc00';
    }
    else if (tile.type == 'free') {
        buffer.fillStyle = '#2eb82e';
    }
    buffer.fillRect(0, 0, (tile.size[0] * size) - 1, (tile.size[1] * size) - 1);
    return buffer.canvas
}


const drawMap = () => {
    for (let row in map) {
        for (let column in map[row]) {
            let tile = map[row][column];
            let newImage = canvasImage(tile)
            ctx.drawImage(
                newImage,
                tile['pos'][1] * size,
                tile['pos'][0] * size,
                tile.size[0] * size,
                tile.size[1] * size
            );
        }
    }
}


const clearCanvas = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


const setCanvasSize = () => {
    canvas.height = map.length * size;
    canvas.width = map[0].length * size;
}


const draw = () => {
    setCanvasSize()
    clearCanvas()
    drawMap()
}

setInterval(draw, 1000 / 60);



document.querySelector("canvas").addEventListener('click', (e) => {
    const { x, y } = e.target.getBoundingClientRect();
    const mouseX = e.clientX - x;
    const mouseY = e.clientY - y;
    // console.log(Math.floor(mouseX / size));
    // console.log(Math.floor(mouseY / size));

    for (let row in map) {
        for (let column in map[row]) {
            let tile = map[row][column];
            // console.log(`mo=${Math.floor(mouseX / size)} &   mo = ${Math.floor(mouseY / size)} `)
            // console.log(`po=${tile.pos[0]} &   po = ${tile.pos[1]} `)
            if (
                Math.floor(mouseX / size)   >= tile.pos[0] &&
                Math.floor(mouseX / size)   <= (tile.size[1] + tile.pos[0]) - 1 && 
                Math.floor(mouseY / size)   >= tile.pos[0] && 
                Math.floor(mouseY / size)   <= (tile.size[0] + tile.pos[1]) - 1
            ) {
                console.log(`posX = ${tile.pos[0]} &  posY = ${tile.pos[1]} `)
            }
        }
    }
})

