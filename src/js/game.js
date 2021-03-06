/**
 * 坦克大战
 * */
(function () {
    window.onload = function () {
        game.init();
    };

    var game = window.game = {
        width: 416,
        height: 416,
        stage: null, // 舞台
        ctx: '', //2d
        frameRate: 20,// 帧率
        map: null,// 地图
        tank1: null,
        imgAll: new Image(),
        keys: [],// 记录按键
        bulletArray: [], // 子弹
        init: function () {
            this.stage = document.getElementById('stage');
            this.ctx = this.stage.getContext("2d");
            this.stage.width = this.width;
            this.stage.height = this.height;
            this.stage.style.cssText = "background-color:#000";
            this.imgAll.src = 'http://127.0.0.1:3000/images/tankAll.gif';
            this.map = new Map(this.ctx);
            this.tank1 = new PlayTank(this.ctx);

            game.map.init();

            this.imgAll.onload = function () {
                game.map.draw();
                game.startGame();
            };
        },
        startGame: function () {
            setInterval(this.gameLoop, this.frameRate);
        },
        gameLoop: function () {
            game.ctx.clearRect(0, 0, game.width, game.height);
            game.tank1.draw();
            game.map.draw();
            // game.geZi();
            keyEvent();
            drawAll();
        },
        /**
         * 画格子
         * */
        geZi: function () {
            this.ctx.strokeStyle = '#888888';
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = '#fff';
            this.ctx.font = "10px serif";
            this.ctx.textAlign = "center";
            var z = 0, r = 0;
            for (var i = 0; i < this.width; i += 16) {
                this.ctx.beginPath();
                this.ctx.moveTo(i + 16, this.height);
                this.ctx.lineTo(i + 16, 0);
                this.ctx.fillText((z++).toString(), i + 8, 12, 16);

                this.ctx.moveTo(this.width, i + 16);
                this.ctx.lineTo(0, i + 16);
                this.ctx.fillText((r++).toString(), 8, i + 12, 16);
                this.ctx.stroke();
            }
        }
    };
})();

// 解决卡顿
function keyEvent () {
    if (game.keys.includes(87)) {
        game.tank1.dir = UP;
        game.tank1.move();
        sendInfo();
    } else if (game.keys.includes(83)) {
        game.tank1.dir = DOWN;
        game.tank1.move();
        sendInfo();
    } else if (game.keys.includes(65)) {
        game.tank1.dir = LEFT;
        game.tank1.move();
        sendInfo();
    } else if (game.keys.includes(68)) {
        game.tank1.dir = RIGHT;
        game.tank1.move();
        sendInfo();
    }
}

function sendInfo () {
    if (GetQueryString('send')) {
        var json = {k: game.keys, x: game.tank1.x, y: game.tank1.y};
        socket.emit('data', JSON.stringify(json));
    }
}

function drawBullet () {
    if (game.bulletArray != null && game.bulletArray.length > 0) {
        for (var i = 0; i < game.bulletArray.length; i++) {
            var bulletObj = game.bulletArray[i];
            if (bulletObj.isDestroyed) {
                bulletObj.owner.isShooting = false;
                game.bulletArray.splice(i, 1);
                i--;
            } else {
                bulletObj.draw();
            }
        }
    }
}

function drawAll () {
    drawBullet();
}

$(document).keydown(function (e) {
    var keyCode = e.keyCode;
    if (!game.keys.includes(keyCode)) {
        if (keyCode == 87) {
            game.keys.push(keyCode);
            game.tank1.dir = UP;
        } else if (keyCode == 83) {
            game.keys.push(keyCode);
            game.tank1.dir = DOWN;
        } else if (keyCode == 65) {
            game.keys.push(keyCode);
            game.tank1.dir = LEFT;
        } else if (keyCode == 68) {
            game.keys.push(keyCode);
            game.tank1.dir = RIGHT;
        }
    }
    if (e.keyCode == 32) {
        game.tank1.shoot();
    }
});
$(document).keyup(function (e) {
    var index = game.keys.indexOf(e.keyCode);
    if (index > -1) {
        game.keys.splice(index, 1);
    }
    var json = {k: [], x: game.tank1.x, y: game.tank1.y};
    socket.emit('data', JSON.stringify(json));
});


function GetQueryString (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
