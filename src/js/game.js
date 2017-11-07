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
        var t = game.tank1;
        // socket.emit('data', {x: t.x, y: t.y, dir: t.dir});
    }
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
});
$(document).keyup(function (e) {
    var index = game.keys.indexOf(e.keyCode);
    if (index > -1) {
        game.keys.splice(index, 1);
    }
    socket.emit('data', []);
});


function GetQueryString (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}