/**
 * 子弹类
 * **/
var Bullet = function (owner, ctx, dir, type) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.owner = owner; // 子弹的所属者
    this.size = 6; // 子弹大小
    this.type = type; // 1、玩家  2、敌方
    this.dir = dir; // 方向
    this.speed = 6; // 子弹速度
    this.hit = false; // 子弹是否碰撞
    this.number = 1; // 子弹连发数量
    this.isDestroyed = false;

    this.draw = function () {
        this.ctx.fillStyle = "#fff";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        this.ctx.fill();
        this.move();
        console.log('...');
    };
    this.move = function () {
        if (this.dir === UP) {
            this.y -= this.speed;
        } else if (this.dir === DOWN) {
            this.y += this.speed;
        } else if (this.dir === RIGHT) {
            this.x += this.speed;
        } else if (this.dir === LEFT) {
            this.x -= this.speed;
        }
    }
};