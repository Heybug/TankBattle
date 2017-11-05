/**坦克**/
var Tank = function (ctx) {
    this.x = 10;
    this.y = 10;
    this.ctx = ctx;
    this.lives = 3;//生命值
    this.isProtected = true;//是否受保护
    this.protectedTime = 500;//保护时间
    this.offsetX = 0;//坦克2与坦克1的距离
    this.speed = 6;//坦克的速度
    this.skin = 0; // 皮肤
    this.move = function () {
        this.skin = tankSkin[fx];
        if (fx == UP && this.y > 0) {
            this.y -= this.speed;
        } else if (fx == DOWN && this.y < HEIGHT - TANK_SIZE) {
            this.y += this.speed;
        } else if (fx == LEFT && this.x > 0) {
            this.x -= this.speed;
        } else if (fx == RIGHT && this.x < WIDTH - TANK_SIZE) {
            this.x += this.speed;
        }
    };
    this.draw = function () {
        this.ctx.drawImage(img, this.skin[0], this.skin[1], 26, 26, this.x, this.y, TANK_SIZE, TANK_SIZE);
        this.move();
    };

};