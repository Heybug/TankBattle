// 坦克及子弹的四个方向
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

/**
 * 坦克制造商
 * */
var Tank = function () {
    this.x = 0;
    this.y = 0;
    this.size = 32; // 坦克的大小
    this.dir = UP; // 方向0：上 1：下 2：左3：右
    this.speed = 2; // 坦克的速度
    this.frame = 0; // 控制敌方坦克切换方向的时间
    this.hit = false;  // 是否碰到墙或者坦克
    this.isAI = false;  // 是否自动
    this.isShooting = false; // 子弹是否在运行中
    this.bullet = null; // 子弹
    this.shootRate = 0.6; // 射击的概率
    this.isDestroyed = false;
    this.skin = [
        [0, 0],
        [32, 0],
        [64, 0],
        [96, 0]
    ];
    /**
     * 射击
     * */
    this.shoot = function () {
        if (game.bulletArray.length > 0) return;

        var tempX, tempY;
        this.bullet = new Bullet(this, this.ctx, this.dir, 1);
        if (this.dir == UP) {
            tempX = this.x + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
            tempY = this.y - this.bullet.size;
        } else if (this.dir == DOWN) {
            tempX = this.x + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
            tempY = this.y + this.size;
        } else if (this.dir == LEFT) {
            tempX = this.x - this.bullet.size;
            tempY = this.y + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
        } else if (this.dir == RIGHT) {
            tempX = this.x + this.size;
            tempY = this.y + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
        }

        this.bullet.x = tempX;
        this.bullet.y = tempY;
        this.bullet.draw();
        this.isShooting = true;
        game.bulletArray.push(this.bullet);
    };
    /**
     * 老司机要开坦克了
     * */
    this.move = function () {
        this.isHit();

        if (!this.hit) {
            this.tempX = this.x;
            this.tempY = this.y;

            if (this.dir === UP) {
                this.tempY -= this.speed;
            } else if (this.dir === DOWN) {
                this.tempY += this.speed;
            } else if (this.dir === RIGHT) {
                this.tempX += this.speed;
            } else if (this.dir === LEFT) {
                this.tempX -= this.speed;
            }
            this.x = this.tempX;
            this.y = this.tempY;
        }
    };
    /**
     * 检查老司机有没碰瓷
     * */
    this.isHit = function () {
        if (this.dir == UP && this.y + this.speed <= this.speed) {
            this.hit = true;
        } else if (this.dir == DOWN && this.y >= game.height - this.size + this.speed) {
            this.hit = true;
        } else if (this.dir == RIGHT && this.x >= game.width - this.size + this.speed) {
            this.hit = true;
        } else if (this.dir == LEFT && this.x <= 0) {
            this.hit = true;
        }

        if (!this.hit) {
            // 坦克附近的障碍坐标
            var mapIndexX = 0, mapIndexY = 0, za1 = 0, za2 = 0, za3 = 0;

            if (this.dir === UP) {
                mapIndexX = funInt(this.x / 16);
                mapIndexY = funInt((this.y - this.speed) / 16);
                za1 = getMap(mapIndexY, mapIndexX);
                za2 = getMap(mapIndexY, funInt((this.x + this.size / 2) / 16));
                za3 = getMap(mapIndexY, funInt((this.x + this.size) / 16));
            } else if (this.dir === DOWN) {
                mapIndexX = funInt((this.x) / 16);
                mapIndexY = funInt((this.y + this.size + 2) / 16);
                za1 = getMap(mapIndexY, mapIndexX);
                za2 = getMap(mapIndexY, funInt((this.x + this.size / 2) / 16));
                za3 = getMap(mapIndexY, funInt((this.x + this.size) / 16));
            } else if (this.dir === LEFT) {
                mapIndexX = funInt((this.x - 3) / 16);
                mapIndexY = funInt((this.y) / 16);
                za1 = getMap(mapIndexY, mapIndexX);
                za2 = getMap(funInt((this.y + this.size / 2) / 16), mapIndexX);
                za3 = getMap(funInt((this.y + this.size) / 16), mapIndexX);
            } else if (this.dir === RIGHT) {
                mapIndexX = funInt((this.x + this.size + 2) / 16);
                mapIndexY = funInt((this.y) / 16);
                za1 = getMap(mapIndexY, mapIndexX);
                za2 = getMap(funInt((this.y + this.size / 2) / 16), mapIndexX);
                za3 = getMap(funInt((this.y + this.size) / 16), mapIndexX);
            }
            if (za1 || za2 || za3) {
                this.hit = true;
            }
        }
    }
};

/**
 * 玩家坦克
 * */
var PlayTank = function (context) {
    this.ctx = context;
    this.lives = 3;//生命值
    this.isProtected = true;//是否受保护
    this.protectedTime = 500;//保护时间
    this.offsetX = 0;//坦克2与坦克1的距离
    this.speed = 2;//坦克的速度
    this.x = 250;
    this.y = game.height - this.size;

    this.draw = function () {
        this.hit = false;
        this.ctx.drawImage(game.imgAll, this.skin[this.dir][0], this.skin[this.dir][1], this.size, this.size, this.x, this.y, this.size, this.size);
        // this.ctx.fillStyle = "rgb(200,0,0)";
        // this.ctx.fillRect(this.x, this.y, this.size, this.size);
    };
};
PlayTank.prototype = new Tank();