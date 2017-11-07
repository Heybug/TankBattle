/**************坦克及子弹的四个方向*****************/
var UP = 0,
    DOWN = 1,
    LEFT = 2,
    RIGHT = 3;

var Tank = function () {
    this.x = 100;
    this.y = 100;
    this.size = 32;//坦克的大小
    this.dir = UP;//方向0：上 1：下 2：左3：右
    this.speed = 1;//坦克的速度
    this.frame = 0;//控制敌方坦克切换方向的时间
    this.hit = false; //是否碰到墙或者坦克
    this.isAI = false; //是否自动
    this.isShooting = false;//子弹是否在运行中
    this.bullet = null;//子弹
    this.shootRate = 0.6;//射击的概率
    this.isDestroyed = false;
    this.tempX = 0;
    this.tempY = 0;
    this.skin = [
        [3, 3],
        [34, 3],
        [67, 3],
        [98, 3]
    ];

    this.move = function () {
        this.tempX = this.x;
        this.tempY = this.y;

        if (this.dir == UP) {
            this.tempY -= this.speed;
        } else if (this.dir == DOWN) {
            this.tempY += this.speed;
        } else if (this.dir == RIGHT) {
            this.tempX += this.speed;
        } else if (this.dir == LEFT) {
            this.tempX -= this.speed;
        }
        this.x = this.tempX;
        this.y = this.tempY;
    };
};

// 玩家
var PlayTank = function (context) {
    this.ctx = context;
    this.lives = 3;//生命值
    this.isProtected = true;//是否受保护
    this.protectedTime = 500;//保护时间
    this.offsetX = 0;//坦克2与坦克1的距离
    this.speed = 2;//坦克的速度

    this.draw = function () {
        this.ctx.drawImage(game.imgAll, this.skin[this.dir][0], this.skin[this.dir][1], this.size, this.size, this.x, this.y, this.size, this.size);
    };
};
PlayTank.prototype = new Tank();