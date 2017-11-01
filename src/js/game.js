var x = WIDTH / 2 - TANK_SIZE / 2,
    y = HEIGHT - TANK_SIZE;
var img = new Image();
var fx = 0, move = false, s = 10;

var tankSkin = [
    [3, 3],
    [35, 3],
    [70, 3],
    [98, 3],
];
(function () {
    window.onload = function () {
        game.init();
        img.src = '../images/tankAll.gif';
        img.onload = function () {
            game.draw();
            setInterval(function () {
                move && game.draw();
            }, 20);
        };

        var tk = new Tank(game.ctx);
        console.log(tk);
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
            console.log(x, y);
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

            game.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            game.ctx.save();
            game.ctx.drawImage(img, skin[0], skin[1], 26, 26, x, y, TANK_SIZE, TANK_SIZE);
            game.ctx.restore();
        }
    }
})();

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