// Drawing on canvas1_1
let ctx = document.getElementById('canvas1_1').getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(20, 20, 50, 50);

// Drawing on canvas1_2
ctx = document.getElementById('canvas1_2').getContext('2d');
ctx.fillStyle = 'green';
ctx.beginPath();
ctx.arc(50, 50, 30, 0, 2 * Math.PI);
ctx.fill();

// Drawing on canvas1_3
ctx = document.getElementById('canvas1_3').getContext('2d');
ctx.strokeStyle = 'blue';
ctx.lineWidth = 5;
ctx.strokeRect(10, 10, 70, 70);

// Similarly for canvas2_1, canvas2_2, and canvas2_3 and canvas3_1, canvas3_2, and canvas3_3

// Just as an example:
ctx = document.getElementById('canvas2_1').getContext('2d');
ctx.fillStyle = 'yellow';
ctx.fillRect(30, 30, 50, 50);

ctx = document.getElementById('canvas3_1').getContext('2d');
ctx.fillStyle = 'purple';
ctx.fillRect(40, 40, 50, 50);
