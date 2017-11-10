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
            this.imgAll.src = 'http://192.168.50.18:3000/images/tankAll.gif';
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
            keyEvent();
            drawAll();
            // 画格子
            /*game.ctx.strokeStyle = '#888888';
             game.ctx.lineWidth = 1;
             game.ctx.fillStyle = '#fff';
             game.ctx.font = "10px serif";
             game.ctx.textAlign = "center";
             var z = 0, r = 0;
             for (var i = 0; i < game.width; i += 16) {
             game.ctx.beginPath();
             game.ctx.moveTo(i + 16, game.height);
             game.ctx.lineTo(i + 16, 0);
             game.ctx.fillText((z++).toString(), i + 8, 12, 16);

             game.ctx.moveTo(game.width, i + 16);
             game.ctx.lineTo(0, i + 16);
             game.ctx.fillText((r++).toString(), 8, i + 12, 16);
             game.ctx.stroke();
             }*/
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
        let json = {k: game.keys, x: game.tank1.x, y: game.tank1.y};
        socket.emit('data', JSON.stringify(json));
    }
}

function drawBullet () {
    if (this.bulletArray != null && this.bulletArray.length > 0) {
        for (var i = 0; i < this.bulletArray.length; i++) {
            var bulletObj = this.bulletArray[i];
            if (bulletObj.isDestroyed) {
                console.log('t');
                bulletObj.owner.isShooting = false;
                this.bulletArray.splice(i, 1);
                i--;
            } else {
                console.log('f');
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