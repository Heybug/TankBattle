var x = WIDTH / 2 - TANK_SIZE / 2,
    y = HEIGHT - TANK_SIZE;
x = 100, y = 100;
var img = new Image();
var fx = 0, move = false, s = 2;

// 等级坦克
var tankSkin = [
    [3, 3],
    [35, 3],
    [70, 3],
    [98, 3]
];
(function () {
    window.onload = function () {
        game.init();
        img.src = '../images/tankAll.gif';
        img.onload = function () {
            game.draw();
            map.init();
            setInterval(function () {
                if (move) {
                    game.draw();
                }
            }, 20);
        };

        // var tk = new Tank(game.ctx);
    };

    var game = window.game = {
        stage: null,
        ctx: null,
        init: function () {
            game.stage = document.getElementById('game');
            game.ctx = this.stage.getContext("2d");
            game.stage.width = WIDTH;
            game.stage.height = HEIGHT;
        }
        ,
        draw: function () {
            var skin = tankSkin[fx];
            if (fx == 0 && y > 0) {
                y -= s;
            } else if (fx == 1 && y < HEIGHT - TANK_SIZE) {
                y += s;
            } else if (fx == 2 && x > 0) {
                x -= s;
            } else if (fx == 3 && x < WIDTH - TANK_SIZE) {
                x += s;
            }

            var posIndex = Math.floor(y / TANK_SIZE);
            if (arrZa.length >= posIndex) {
                if (arrZa[posIndex][1] >= y) {
                    // move = false;
                    return;
                }
            }
            game.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            game.ctx.drawImage(img, skin[0], skin[1], 26, 26, x, y, TANK_SIZE, TANK_SIZE);
            // map.init();
            //line();
        }
    }
})();

function line () {
    game.ctx.strokeStyle = '#fff';
    for (var i = 0; i < 800; i += 32) {
        game.ctx.beginPath();
        game.ctx.lineWidth = 1;
        game.ctx.moveTo(i, HEIGHT);
        game.ctx.lineTo(i, 0);
        game.ctx.stroke()
    }
    for (var i = 0; i < 800; i += 32) {
        game.ctx.beginPath();
        game.ctx.lineWidth = 1;
        game.ctx.moveTo(WIDTH, i);
        game.ctx.lineTo(0, i);
        game.ctx.stroke()
    }
}

var arrZa = [];// 障碍地带
var map = {
    pos: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    init: function () {
        this.pos.forEach(function (val1, index1) {
            val1.forEach(function (val2, index2) {
                if (val2 == 1) {
                    // console.log(index1);
                    for (var z = 0; z < 32; z += 16) {
                        game.ctx.drawImage(img, 0, 96, 16, 16, index2 * TANK_SIZE + z, index1 * TANK_SIZE, 16, 16);
                        arrZa.push([index1 * 32, index2 * 32]);
                    }
                    console.log(index1, index2);
                    for (var z = 0; z < 32; z += 16) {
                        game.ctx.drawImage(img, 0, 96, 16, 16, index2 * TANK_SIZE + z, index1 * TANK_SIZE + 16, 16, 16);
                    }
                }
            })
        })
    }
};


var Tank = function (ctx) {
    this.ctx = ctx;
    this.lives = 3;//生命值
    this.isProtected = true;//是否受保护
    this.protectedTime = 500;//保护时间
    this.offsetX = 0;//坦克2与坦克1的距离
    this.speed = 2;//坦克的速度
    this.draw = function () {

    };
    this.move = function () {

    }
};

jQuery(function ($) {
    $(document).keydown(function (e) {
        if (e.keyCode == 87) {
            move = true;
            fx = 0;
        } else if (e.keyCode == 83) {
            move = true;
            fx = 1;
        } else if (e.keyCode == 65) {
            move = true;
            fx = 2;
        } else if (e.keyCode == 68) {
            move = true;
            fx = 3;
        }
    });
    $(document).keyup(function (e) {
        move = false;
    });
});