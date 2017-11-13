/**
 * 子弹制造商
 * **/
var Bullet = function (owner, ctx, dir, type) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.owner = owner; // 子弹的所属者
    this.size = 6; // 子弹大小
    this.type = type; // 1、玩家  2、敌方
    this.dir = dir; // 方向
    this.speed = 4; // 子弹速度
    this.number = 1; // 子弹连发数量
    this.hit = false; // 子弹是否碰撞
    this.isDestroyed = false;// 破坏
    /**
     * 绘制子弹
     * */
    this.draw = function () {
        var POS = {
            bullet: [80, 96]
        };
        this.ctx.drawImage(game.imgAll, POS["bullet"][0] + this.dir * this.size, POS["bullet"][1], this.size, this.size, this.x, this.y, this.size, this.size);
        // this.move();
        console.log('让子弹飞一会。。。', POS["bullet"][0] + this.dir * this.size);
    };
    /**
     * 让子弹飞吧
     * */
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

        this.isHit();
    };
    /**
     * 检查子弹是否打中坦克或者障碍
     * */
    this.isHit = function () {
        if (this.isDestroyed) return;

        // 临界检测
        if (this.x > game.width || this.x < 0) {
            this.isDestroyed = true;
        } else if (this.y > game.height || this.y < 0) {
            this.isDestroyed = true;
        }

    }
};