const canvas = document.querySelector('canvas');
const bar = document.querySelector('#bar');
const ctx = canvas.getContext('2d');
const download = document.querySelector("#download");

const canvasX = canvas.offsetLeft;
const canvasY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasX;
canvas.height = window.innerHeight - canvasY;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;
let lineWidth = 5;
let startX;
let startY;

bar.addEventListener('change', e => {
    if(e.target.id === 'color') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
});

bar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

const draw = (e) => {
    if(!isDrawing) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isDrawing = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

download.addEventListener('click', function (e) {
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
    link.delete;
  });